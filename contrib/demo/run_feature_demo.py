#!/usr/bin/env python3
"""Record the zoompilot comma 4 (mici) feature demo for zoompilot.ai.

Runs zoompilot's own comma 4 UI on this computer and feeds it scripted
touch input. Params live in a throwaway OpenpilotPrefix set up as a fresh
install on a 2022 Mazda CX-5 (compatible EPS, alpha long available), so the
panels show what that car sees. The app's RECORD=1 mode writes every frame;
a second pass puts the take in a device frame, adds captions and writes the
site files. See README.md in this directory.

Usage (run with the zoompilot checkout's venv):
  <zoompilot>/.venv/bin/python run_feature_demo.py <zoompilot> [--work DIR] [--site DIR] [--compose-only]

  --work          raw take, timeline and webp frames (default /tmp/zp-demo/feature)
  --site          where mici-demo.mp4, -poster.jpg and .webp go (default: none, files stay in --work)
  --compose-only  skip recording, recompose the take already in --work
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import time
import traceback
from pathlib import Path

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("openpilot_dir", type=Path)
ap.add_argument("--work", type=Path, default=Path("/tmp/zp-demo/feature"))
ap.add_argument("--site", type=Path, default=None)
ap.add_argument("--compose-only", action="store_true")
ARGS = ap.parse_args()

OPENPILOT_DIR = ARGS.openpilot_dir.resolve()
WORK = ARGS.work.resolve()
RAW = WORK / "raw.mp4"
TIMELINE = WORK / "timeline.json"
if not (OPENPILOT_DIR / "openpilot" / "selfdrive" / "ui" / "sunnypilot" / "mici").exists():
  sys.exit(f"not a zoompilot checkout: {OPENPILOT_DIR}")
WORK.mkdir(parents=True, exist_ok=True)

FPS = 60
W, H = 536, 240                      # mici UI, logical px
SCREEN_W, SCREEN_H = 1440, 644       # take resolution (SCALE = 1440 / 536)
FONT_DIR = OPENPILOT_DIR / "openpilot" / "selfdrive" / "assets" / "fonts"

# the Mazda this demo stands for (opendbc mazda/interface.py, alpha long on)
VERSION = "2026.003.000"             # sunnypilot/common/version.h
GIT_BRANCH = "develop"
GIT_COMMIT = "a7a6df8e882a4b3451277824fc80d36666fb3dde"
GIT_COMMIT_DATE = "'1791995303 2026-10-14 11:28:23 -0500'"


def log(msg):
  print(f"[demo] {msg}", flush=True)


# =============================================================== record ==
def record():
  # env before any app module loads
  os.environ["RECORD"] = "1"
  os.environ["RECORD_OUTPUT"] = str(RAW)
  os.environ["RECORD_QUALITY"] = "6"         # near-lossless take; compose re-encodes
  os.environ["FPS"] = str(FPS)
  os.environ["SCALE"] = repr(SCREEN_W / W)
  os.environ["OFFSCREEN"] = "1"              # no frame pacing: time below is per frame
  os.environ.pop("BIG", None)
  sys.path.insert(0, str(OPENPILOT_DIR))

  import pyray as rl

  # ------------------------------------------------------------ clock --
  # Every animation advances by frame, not by wall time, so the take is the
  # same however fast this computer renders. rl.get_time/get_frame_time and
  # the time.monotonic calls behind touch timestamps and long-press follow
  # the frame counter.
  class Clock:
    frame = 0
    base = time.monotonic()

    def now(self):
      return self.base + self.frame / FPS

  clock = Clock()

  class TimeProxy:
    def __getattr__(self, name):
      return getattr(time, name)

    def monotonic(self):
      return clock.now()

  rl.get_time = lambda: 1.0 + clock.frame / FPS
  rl.get_frame_time = lambda: 1.0 / FPS

  # ------------------------------------------------------------ input --
  # Same approach as run_install_demo.py: the UI polls these pyray calls,
  # so they report a scripted finger and real mouse input is ignored.
  class Finger:
    x, y = W / 2, H / 2
    down = False
    press_ev = release_ev = False
    shown = False   # draw the touch dot
    alpha = 0.0

    def press(self):
      self.press_ev, self.down, self.shown = True, True, True

    def release(self):
      self.release_ev, self.down = True, False

  F = Finger()
  scale = SCREEN_W / W

  def _touch(slot=0):
    return rl.Vector2(F.x * scale, F.y * scale) if slot == 0 else rl.Vector2(0, 0)

  def _pressed(button):
    if button == 0 and F.press_ev:
      F.press_ev = False
      return True
    return False

  def _released(button):
    if button == 0 and F.release_ev:
      F.release_ev = False
      return True
    return False

  rl.poll_input_events = lambda: None
  rl.get_touch_position = _touch
  rl.is_mouse_button_pressed = _pressed
  rl.is_mouse_button_released = _released
  rl.is_mouse_button_down = lambda button: button == 0 and F.down

  from openpilot.common.prefix import OpenpilotPrefix
  with OpenpilotPrefix():
    setup_params()
    rl.set_config_flags(rl.FLAG_WINDOW_HIDDEN)

    import openpilot.system.ui.lib.application as app_mod
    import openpilot.system.ui.widgets as widgets_mod
    import openpilot.selfdrive.ui.mici.layouts.home as home_mod
    for mod in (app_mod, widgets_mod, home_mod):
      mod.time = TimeProxy()

    from openpilot.system.ui.lib.application import gui_app, MouseEvent, MousePos
    from openpilot.system.ui.lib.scroll_panel2 import GuiScrollPanel2, ScrollState
    from openpilot.selfdrive.ui.ui_state import ui_state
    from openpilot.cereal import messaging
    from opendbc.car.structs import car

    # what the params pass would derive, set before its first run: with
    # has_longitudinal_control still False, that pass clears ExperimentalMode
    ui_state.CP = messaging.log_from_bytes(ui_state.params.get("CarParamsPersistent"), car.CarParams)
    ui_state.has_longitudinal_control = True

    # a parked device on wifi: the home screen's network icon reads deviceState
    pm = messaging.PubMaster(["deviceState"])

    def device_state():
      msg = messaging.new_message("deviceState")
      msg.deviceState.networkType = "wifi"
      msg.deviceState.networkStrength = "great"
      return msg

    gui_app.init_window("zoompilot feature demo", FPS)
    from openpilot.selfdrive.ui.mici.layouts.main import MiciMainLayout
    main_layout = MiciMainLayout()

    timeline = {"fps": FPS, "captions": [], "marks": {}}

    # ------------------------------------------------------ primitives --
    def nframes(sec):
      return max(1, round(sec * FPS))

    def wait(sec):
      for _ in range(nframes(sec)):
        yield

    def until(pred, what, timeout=10.0):
      for _ in range(nframes(timeout)):
        if pred():
          return
        yield
      raise RuntimeError(f"timeout waiting for {what}")

    def caption(text, dur):
      start = clock.frame
      timeline["captions"].append({"text": text, "start": start, "end": start + nframes(dur)})
      log(f"{start / FPS:6.2f}s caption: {text}")

    def mark(name):
      timeline["marks"][name] = clock.frame

    def top():
      return gui_app._nav_stack[-1]

    def title(item):
      return " ".join(str(getattr(item, "text", "") or "").split())

    def find(panel, name, wait_visible=False):
      for item in panel._scroller._items:
        if title(item) == name and (item.is_visible or wait_visible):
          return item
      raise RuntimeError(f"no '{name}' in {type(panel).__name__}: {[title(i) for i in panel._scroller._items]}")

    def settled(panel, coasting=False, y_tol=0.5):
      """Panel in place and not scrolling. coasting: the tail of a fling, under
      80 px/s, counts too (the UI takes taps below 120 px/s)."""
      sc = panel._scroller
      sp = sc.scroll_panel
      still = sp.state == ScrollState.STEADY or (coasting and sp.state == ScrollState.AUTO_SCROLL and abs(sp._velocity) < 80)
      return abs(panel.rect.y) < y_tol and still and not sc.is_auto_scrolling

    def tap(x, y, hold=0.1):
      F.x, F.y, F.shown = x, y, True
      yield from wait(0.08)          # finger lands
      F.press()
      yield
      yield from wait(hold)
      F.release()
      yield
      F.shown = False

    def drag(path):
      F.x, F.y = path[0]
      F.shown = True
      yield from wait(0.06)
      F.press()
      yield
      for x, y in path[1:]:
        F.x, F.y = x, y
        yield
      F.release()
      yield
      F.shown = False

    def tap_item(item, dx=-30, dy=18):
      before = top()
      r = item.rect
      yield from tap(r.x + r.width / 2 + dx, r.y + r.height / 2 + dy)
      return before

    def open_item(item):
      before = yield from tap_item(item)
      yield from until(lambda: top() is not before, f"panel from '{title(item)}'")
      panel = top()
      yield from wait(0.1)  # let it lay out and start sliding in
      yield from until(lambda: settled(panel, y_tol=2.0), "panel to settle")
      log(f"{clock.frame / FPS:6.2f}s opened {type(panel).__name__} from '{title(item)}'")
      return panel

    def back():
      depth = len(gui_app._nav_stack)
      path = [(W / 2 + 6 * t, 40 + 175 * t * t) for t in (i / nframes(0.26) for i in range(nframes(0.26) + 1))]
      yield from drag(path)
      yield from until(lambda: len(gui_app._nav_stack) < depth, "back swipe")
      yield from until(lambda: settled(top()), "panel to settle after back")

    # ------------------------------------------------- swipe planning --
    # Plan each swipe by running the real scroll physics (GuiScrollPanel2)
    # on the synthetic touch path, so the card lands where it is wanted.
    def simulate(path, offset0, content_size):
      sp = GuiScrollPanel2(horizontal=True)
      sp.set_offset(offset0)
      bounds = rl.Rectangle(0, 0, W, H)
      saved = gui_app._mouse_events
      prev = None
      evs = [((path[0]), True, False, True)]
      evs += [(p, False, False, True) for p in path[1:]]
      evs += [(path[-1], False, True, False)]
      try:
        for i in range(len(evs) + 600):
          batch = []
          if i < len(evs):
            (x, y), pr, rel, down = evs[i]
            ev = MouseEvent(MousePos(x, y), 0, pr, rel, down, i / FPS)
            if prev is None or ev[:-1] != prev[:-1]:
              batch.append(ev)
              prev = ev
          gui_app._mouse_events = batch
          sp.update(bounds, content_size)
          if i >= len(evs) and sp.state == ScrollState.STEADY:
            break
      finally:
        gui_app._mouse_events = saved
      return sp.get_offset()

    def ease(t):
      return 4 * t ** 3 if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2

    def swipe_to(panel, item):
      sc = panel._scroller
      cur = sc.scroll_panel.get_offset()
      content_x = item.rect.x - cur
      lo_bound = min(0.0, W - sc.content_size)
      target = max(lo_bound, min(0.0, -(content_x + item.rect.width / 2 - W / 2)))
      delta = target - cur
      if abs(delta) < 3:
        log(f"{clock.frame / FPS:6.2f}s already at '{title(item)}' (offset {cur:.1f}, item x {item.rect.x:.1f})")
        return
      sign = 1 if delta > 0 else -1
      y = 150

      def make(d, n, prof):
        x0, x1 = W / 2 - sign * d / 2, W / 2 + sign * d / 2
        return [(x0 + (x1 - x0) * prof(i / n), y) for i in range(n + 1)]

      if abs(delta) <= 430:
        plans = [(nframes(0.24 + abs(delta) / 2600), ease)]   # drag and stop
      else:
        plans = [(n, lambda t: t) for n in (6, 5, 4)]          # flick and let it coast
      best = None
      for n, prof in plans:
        lo, hi = 20.0, 480.0
        for _ in range(28):
          mid = (lo + hi) / 2
          got = simulate(make(mid, n, prof), cur, sc.content_size)
          if (got - cur) * sign < abs(delta):
            lo = mid
          else:
            hi = mid
        path = make(hi, n, prof)
        err = abs(simulate(path, cur, sc.content_size) - target)
        if best is None or err < best[0]:
          best = (err, path)
        if err < 2:
          break
      yield from drag(best[1])
      yield from until(lambda: settled(panel, coasting=True), "swipe to settle")
      log(f"{clock.frame / FPS:6.2f}s at '{title(item) or type(item).__name__}' "
          f"(offset {sc.scroll_panel.get_offset():.1f}, wanted {target:.1f})")

    # ---------------------------------------------------------- script --
    def script():
      yield from until(lambda: top() is main_layout, "home")
      yield from wait(0.35)

      # 1. home
      caption("zoompilot on the comma 4", 2.8)
      yield from wait(2.5)
      settings = yield from open_item(main_layout._home_layout)

      # 2. steering > torque control
      yield from swipe_to(settings, find(settings, "steering"))
      yield from wait(0.1)
      steering = yield from open_item(find(settings, "steering"))
      torque_btn = find(steering, "torque control")
      yield from swipe_to(steering, torque_btn)
      caption("Already set on a supported Mazda", 3.7)
      yield from wait(1.5)
      mark("poster")
      yield from wait(0.4)
      torque = yield from open_item(torque_btn)
      yield from wait(0.8)

      # 3. tune version
      yield from swipe_to(torque, find(torque, "tune version small models"))
      caption("Updated steering tune", 2.9)
      yield from wait(2.8)

      # 4. self-tune
      yield from swipe_to(torque, find(torque, "self tune"))
      caption("Learns your steering at each speed", 3.1)
      yield from wait(2.8)

      # 5. lane change smoothing: pick a pace
      yield from back()
      lane_change = yield from open_item_after_swipe(steering, "lane change")
      yield from swipe_to(lane_change, find(lane_change, "lane change smoothing"))
      caption("Smoother, slower lane changes", 3.6)
      smoothing = find(lane_change, "lane change smoothing")
      for _ in range(3):  # off -> fast -> medium -> slow
        yield from wait(0.35)
        yield from tap_item(smoothing, dx=-20, dy=10)
      yield from wait(1.2)
      yield from back()
      yield from back()

      # 6. cruise: slow for curves
      cruise = yield from open_item_after_swipe(settings, "cruise")
      vision = find(cruise, "slow for curves: vision")
      yield from swipe_to(cruise, vision)
      caption("Slow for Curves: slows before a curve, then speeds back up", 4.5)
      yield from wait(0.4)
      yield from tap_item(vision)
      yield from wait(0.7)
      curve_map = find(cruise, "slow for curves: map")
      yield from swipe_to(cruise, curve_map)
      yield from wait(0.3)
      yield from tap_item(curve_map)
      yield from wait(0.8)

      # 7. speed limit assist
      speed_limit = yield from open_item_after_swipe(cruise, "speed limit")
      caption("Speed Limit Assist sets cruise to the limit", 3.6)
      mode = find(speed_limit, "speed limit mode")
      for _ in range(2):  # info -> warn -> assist
        yield from wait(0.45)
        yield from tap_item(mode, dx=-20, dy=10)
      yield from wait(1.2)
      yield from back()

      # 8. alpha longitudinal: speed assist, lead follow assist
      alpha = yield from open_item_after_swipe(cruise, "alpha longitudinal")
      assist = find(alpha, "speed assist")
      yield from swipe_to(alpha, assist)
      caption("Speed Assist: reaches your set speed", 3.2)
      yield from wait(0.5)
      yield from tap_item(assist)
      yield from wait(1.8)
      lead = find(alpha, "lead follow assist")
      yield from swipe_to(alpha, lead)
      caption("Lead Follow Assist: keeps your chosen gap", 3.2)
      yield from wait(0.5)
      yield from tap_item(lead)
      yield from wait(1.8)
      yield from back()
      yield from back()

      # 9. models > jetlink
      models = yield from open_item_after_swipe(settings, "models")
      jetlink = find(models, "jetlink", wait_visible=True)
      yield from until(lambda: jetlink.is_visible, "jetlink row (shown once the params pass sees jetlink)")
      yield from swipe_to(models, jetlink)
      caption("Jetlink: run big models on a Mac, iPhone or Jetson", 3.7)
      for _ in range(2):  # off -> usb -> iOS
        yield from wait(0.6)
        yield from tap_item(jetlink, dx=-20, dy=10)
      yield from wait(2.45)  # the caption fades out just before the loop

    def open_item_after_swipe(panel, name):
      item = find(panel, name)
      yield from swipe_to(panel, item)
      yield from wait(0.1)
      return (yield from open_item(item))

    # ------------------------------------------------------------ run --
    steps = script()
    failed = None
    try:
      for _ in gui_app.render():
        ui_state.update()
        if clock.frame % 10 == 0:
          pm.send("deviceState", device_state())
        # touch dot, drawn into the frame (still inside the app's scaled pass)
        F.alpha = min(1.0, F.alpha + 0.25) if F.shown else max(0.0, F.alpha - 0.1)
        if F.alpha > 0:
          r = 9.5 if F.down else 11.0
          c = rl.Vector2(F.x, F.y)
          rl.draw_circle_v(c, r, rl.Color(255, 255, 255, int(105 * F.alpha)))
          rl.draw_ring(c, r - 1.4, r, 0, 360, 48, rl.Color(255, 255, 255, int(200 * F.alpha)))
        try:
          next(steps)
        except StopIteration:
          gui_app.request_close()
        except Exception as e:  # noqa: BLE001
          failed = e
          traceback.print_exc()
          gui_app.request_close()
        clock.frame += 1
    finally:
      timeline["frames"] = clock.frame
      gui_app.close()
    if failed is not None:
      sys.exit(f"recording failed: {failed!r}")
    TIMELINE.write_text(json.dumps(timeline, indent=1))
    log(f"take: {RAW} ({clock.frame} frames, {clock.frame / FPS:.1f}s)")


def setup_params():
  """A fresh install on a 2022 CX-5 that has driven once: CarParams from the
  last drive, card's one-time torque seed, then manager_init's declared
  defaults. Onboarding is done; alpha long and Experimental Mode are on so the
  Speed Assist and Lead Follow Assist rows are live (Dynamic Experimental
  Control stays off: under it they do nothing and grey out)."""
  from openpilot.common.params import Params
  from opendbc.car.structs import car
  from opendbc.car.mazda.values import MazdaFlags
  from openpilot.cereal import custom
  from openpilot.common.version import terms_version, terms_version_sp, training_version, sunnylink_consent_version
  from openpilot.sunnypilot.selfdrive.car.mazda_torque_seed import seed_car_defaults_offroad

  params = Params()
  cp = car.CarParams.new_message(
    brand="mazda", carFingerprint="MAZDA_CX5_2022", flags=int(MazdaFlags.EPS_HW),
    enableBsm=True, steerControlType="torque",
    alphaLongitudinalAvailable=True, openpilotLongitudinalControl=True, pcmCruise=True,
  )
  params.put("CarParamsPersistent", cp.to_bytes(), block=True)
  params.put("CarParamsSPPersistent", custom.CarParamsSP.new_message(intelligentCruiseButtonManagementAvailable=True).to_bytes(), block=True)
  seed_car_defaults_offroad(params)
  for k in params.all_keys():
    default = params.get_default_value(k)
    if default is not None and params.get(k) is None:
      params.put(k, default, block=True)

  params.put("HasAcceptedTerms", terms_version, block=True)
  params.put("HasAcceptedTermsSP", terms_version_sp, block=True)
  params.put("CompletedTrainingVersion", training_version, block=True)
  params.put("CompletedSunnylinkConsentVersion", sunnylink_consent_version, block=True)
  params.put("Version", VERSION, block=True)
  params.put("GitBranch", GIT_BRANCH, block=True)
  params.put("GitCommit", GIT_COMMIT, block=True)
  params.put("GitCommitDate", GIT_COMMIT_DATE, block=True)

  params.put_bool("AlphaLongitudinalEnabled", True, block=True)
  params.put_bool("ExperimentalModeConfirmed", True, block=True)
  params.put_bool("ExperimentalMode", True, block=True)
  params.put_bool("DynamicExperimentalControl", False, block=True)
  log("params: EnforceTorqueControl=%s LiveTorqueParamsToggle=%s TorqueControlTune=%s SpeedLimitMode=%s" % tuple(
    params.get(k) for k in ("EnforceTorqueControl", "LiveTorqueParamsToggle", "TorqueControlTune", "SpeedLimitMode")))


# ============================================================== compose ==
# The look of the previous site demo: the screen at 1440x644 in a dark
# rounded device frame on a near-black 1920x1080 canvas, one Inter caption
# under the frame per step, fading in and out.
OUT_W, OUT_H = 1920, 1080
SX, SY = (OUT_W - SCREEN_W) // 2, 168        # screen top-left
BEZEL = 18
SCREEN_R = 44
CAPTION_CY = 931
CAPTION_SIZE = 58
CAPTION_FADE = 0.3                           # s


def build_canvas():
  import numpy as np
  from PIL import Image, ImageDraw, ImageFilter

  yy, xx = np.mgrid[0:OUT_H, 0:OUT_W].astype(np.float32)
  d = np.sqrt(((xx - OUT_W / 2) / 1.25) ** 2 + (yy - 470) ** 2) / 1000
  glow = np.clip(1 - d, 0, 1) ** 1.6
  bg = np.stack([7 + 8 * glow, 9 + 8 * glow, 11 + 8 * glow], -1)
  bg += np.random.default_rng(1).uniform(-0.5, 0.5, bg.shape)  # dither the gradient
  canvas = Image.fromarray(np.clip(bg + 0.5, 0, 255).astype(np.uint8))

  fx0, fy0 = SX - BEZEL, SY - BEZEL
  fx1, fy1 = SX + SCREEN_W + BEZEL, SY + SCREEN_H + BEZEL
  # soft shadow under the device
  shadow = Image.new("L", canvas.size, 0)
  ImageDraw.Draw(shadow).rounded_rectangle((fx0, fy0 + 14, fx1, fy1 + 14), SCREEN_R + BEZEL, fill=120)
  shadow = shadow.filter(ImageFilter.GaussianBlur(28))
  canvas = Image.composite(Image.new("RGB", canvas.size, (2, 3, 4)), canvas, shadow)

  # body: faint top-lit gradient, 2px edge
  body = np.zeros((fy1 - fy0, fx1 - fx0, 3), np.float32)
  t = np.linspace(0, 1, fy1 - fy0)[:, None]
  shade = np.clip(1 - t / 0.35, 0, 1)
  body[...] = np.stack([12 + 9 * shade, 14 + 9 * shade, 16 + 9 * shade], -1)
  body_img = Image.fromarray(body.astype(np.uint8))
  mask = Image.new("L", body_img.size, 0)
  ImageDraw.Draw(mask).rounded_rectangle((0, 0, body_img.width - 1, body_img.height - 1), SCREEN_R + BEZEL, fill=255)
  canvas.paste(body_img, (fx0, fy0), mask)
  ImageDraw.Draw(canvas).rounded_rectangle((fx0, fy0, fx1 - 1, fy1 - 1), SCREEN_R + BEZEL, outline=(40, 42, 45), width=2)
  ImageDraw.Draw(canvas).rounded_rectangle((SX, SY, SX + SCREEN_W - 1, SY + SCREEN_H - 1), SCREEN_R, fill=(0, 0, 0))

  # screen mask (4x supersampled for smooth corners)
  ss = 4
  m = Image.new("L", (SCREEN_W * ss, SCREEN_H * ss), 0)
  ImageDraw.Draw(m).rounded_rectangle((0, 0, SCREEN_W * ss - 1, SCREEN_H * ss - 1), SCREEN_R * ss, fill=255)
  m = m.resize((SCREEN_W, SCREEN_H), Image.LANCZOS)
  return np.asarray(canvas).copy(), np.asarray(m).astype(np.float32) / 255


def caption_layer(text):
  """(alpha, top) of a centred caption strip, alpha shape (h, OUT_W)."""
  import numpy as np
  from PIL import Image, ImageDraw, ImageFont
  font = ImageFont.truetype(str(FONT_DIR / "Inter-Regular.ttf"), CAPTION_SIZE)
  strip_h = 110
  img = Image.new("L", (OUT_W, strip_h), 0)
  draw = ImageDraw.Draw(img)
  x0, y0, x1, y1 = draw.textbbox((0, 0), text, font=font, anchor="ms")
  w = x1 - x0
  # centre on the cap height so lines with and without descenders sit alike
  cap_top = draw.textbbox((0, 0), "H", font=font, anchor="ms")[1]
  baseline = strip_h // 2 - cap_top / 2
  draw.text(((OUT_W - w) / 2 - x0, baseline), text, font=font, fill=255, anchor="ms")
  return np.asarray(img).astype(np.float32) / 255, CAPTION_CY - strip_h // 2


CAPTION_RGB = (236, 237, 240)


def compose(site):
  import numpy as np
  from PIL import Image

  tl = json.loads(TIMELINE.read_text())
  fps = tl["fps"]
  canvas, screen_mask = build_canvas()
  mask3 = screen_mask[..., None]
  canvas_screen = canvas[SY:SY + SCREEN_H, SX:SX + SCREEN_W].astype(np.float32)
  edge = screen_mask < 0.999          # only blend the rounded corners

  caps = []
  for c in tl["captions"]:
    alpha, top = caption_layer(c["text"])
    caps.append((c["start"], c["end"], alpha, top))
  # never two captions at once: cut each at the next one's start
  for i in range(len(caps) - 1):
    if caps[i][1] > caps[i + 1][0]:
      caps[i] = (caps[i][0], caps[i + 1][0], *caps[i][2:])

  fade_n = CAPTION_FADE * fps
  color = np.array(CAPTION_RGB, np.float32)

  out_mp4 = WORK / "mici-demo.mp4"
  dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(RAW), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         stdout=subprocess.PIPE)
  enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
                          "-s", f"{OUT_W}x{OUT_H}", "-r", str(fps), "-i", "-",
                          "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
                          "-movflags", "+faststart", str(out_mp4)], stdin=subprocess.PIPE)
  frame_bytes = SCREEN_W * SCREEN_H * 3
  poster_frame = tl["marks"].get("poster")
  idx = 0
  while True:
    buf = dec.stdout.read(frame_bytes)
    if len(buf) < frame_bytes:
      break
    scr = np.frombuffer(buf, np.uint8).reshape(SCREEN_H, SCREEN_W, 3)
    out = canvas.copy()
    region = scr.copy()
    region[edge] = (scr[edge] * mask3[edge] + canvas_screen[edge] * (1 - mask3[edge])).astype(np.uint8)
    out[SY:SY + SCREEN_H, SX:SX + SCREEN_W] = region
    for start, end, alpha, top in caps:
      if start <= idx < end:
        f = min(1.0, (idx - start) / fade_n, (end - idx) / fade_n)
        f = f * f * (3 - 2 * f)
        a = (alpha * f)[..., None]
        strip = out[top:top + alpha.shape[0]].astype(np.float32)
        out[top:top + alpha.shape[0]] = (strip * (1 - a) + color * a + 0.5).astype(np.uint8)
    if idx == poster_frame:
      Image.fromarray(out).resize((1440, 810), Image.LANCZOS).save(WORK / "mici-demo-poster.jpg", quality=90)
    enc.stdin.write(out.tobytes())
    idx += 1
  enc.stdin.close()
  enc.wait()
  dec.wait()
  log(f"composed {idx} frames -> {out_mp4} ({out_mp4.stat().st_size / 1e6:.2f} MB)")

  # animated webp, as the previous one: 960x540, 15 fps
  frames_dir = WORK / "webp-frames"
  shutil.rmtree(frames_dir, ignore_errors=True)
  frames_dir.mkdir()
  subprocess.run(["ffmpeg", "-v", "error", "-i", str(out_mp4), "-vf", "fps=15,scale=960:540:flags=lanczos",
                  str(frames_dir / "f%04d.png")], check=True)
  frames = sorted(frames_dir.glob("f*.png"))
  out_webp = WORK / "mici-demo.webp"
  subprocess.run(["img2webp", "-loop", "0", "-min_size", "-lossy", "-q", "60", "-m", "6", "-d", "67",
                  *map(str, frames), "-o", str(out_webp)], check=True, stdout=subprocess.DEVNULL)
  log(f"webp: {out_webp} ({out_webp.stat().st_size / 1e6:.2f} MB, {len(frames)} frames)")

  if site is not None:
    for name in ("mici-demo.mp4", "mici-demo-poster.jpg", "mici-demo.webp"):
      shutil.copyfile(WORK / name, site / name)
    log(f"copied to {site}")


if __name__ == "__main__":
  if not ARGS.compose_only:
    record()
  compose(ARGS.site.resolve() if ARGS.site else None)
