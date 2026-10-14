#!/usr/bin/env python3
"""Render the zoompilot settings panels, or single settings, to PNG for the wiki.

Captures a fresh Mazda install: CarParams for a 2022 CX-5 with a compatible
(steer-to-zero) EPS and blind spot monitoring, every declared param default,
and the one-time Mazda torque-control seed. Alpha Longitudinal is available
but off, as on a new install.

DEVICE=mici (comma 4, default) or DEVICE=tici (comma 3/3X). mici panels are
horizontal scrollers, captured as one panorama; tici panels are vertical
lists, captured as one tall frame at the real panel width.

Run from a zoompilot checkout (the super-repo root, with its .venv):

  cd /path/to/zoompilot
  # every panel into docs/assets/settings/ (mici) or docs/assets/settings/tici/
  DEVICE=mici PYTHONPATH=. .venv/bin/python /path/to/wiki/contrib/capture-settings.py
  # the feature-page shots into docs/assets/settings/features/<device>/
  DEVICE=tici PYTHONPATH=. .venv/bin/python /path/to/wiki/contrib/capture-settings.py --features
  # one setting by its on-screen title (mici card / tici row), cropped
  DEVICE=mici PYTHONPATH=. .venv/bin/python /path/to/wiki/contrib/capture-settings.py \
      --setting "slow for curves: vision" --out /tmp/scc.png [--state alpha]

Release metadata comes from the checkout (version.h and HEAD); override with
VERSION, GIT_BRANCH (default develop) and GIT_COMMIT. Output PNGs are
quantised with pngquant and oxipng when they are on PATH, otherwise saved
with Pillow's optimiser.
"""
import argparse
import datetime
import os
import shutil
import subprocess
import tempfile

DEVICE = os.getenv("DEVICE", "mici")  # mici (comma 4) or tici (comma 3/3X)
assert DEVICE in ("mici", "tici"), DEVICE
BIG_UI = DEVICE == "tici"
os.environ["BIG"] = "1" if BIG_UI else "0"
os.environ.setdefault("SCALE", "0.75" if BIG_UI else "2")

import pyray as rl  # noqa: E402
from pathlib import Path  # noqa: E402
from PIL import Image  # noqa: E402

from openpilot.common.params import Params  # noqa: E402
from openpilot.common.prefix import OpenpilotPrefix  # noqa: E402

WIKI_ASSETS = Path(__file__).resolve().parent.parent / "docs" / "assets" / "settings"
PANEL_DIR = WIKI_ASSETS / "tici" if BIG_UI else WIKI_ASSETS
FEATURE_DIR = WIKI_ASSETS / "features" / DEVICE
SETTLE_FRAMES = 30
MAX_WIDTH = {"panel": 1300 if BIG_UI else 8000, "setting": 1000 if BIG_UI else 640}
TICI_SIDEBAR_WIDTH, TICI_PANEL_MARGIN = 500, 50  # layouts/settings/settings.py
TICI_PANEL_COLOR = rl.Color(41, 41, 41, 255)
TICI_FRAME_HEIGHT = 3200  # logical px; taller than any panel's list

PLATFORM = "MAZDA_CX5_2022"

# Feature-page shots: (file name, state, {device: exact on-screen title}).
# A device without the setting has no entry and is skipped.
FEATURE_SHOTS = [
  ("torque-control", "fresh", {"mici": "enable torque control", "tici": "Enforce Torque Lateral Control"}),
  ("self-tune", "fresh", {"mici": "enable self-tune", "tici": "Self-Tune"}),
  ("tune-version", "fresh", {"mici": "tune version\nsmall models", "tici": "Torque Control Tune Version (Small Models)"}),
  ("lane-change-smoothing", "fresh", {"mici": "lane change\nsmoothing", "tici": "Lane Change Smoothing"}),
  ("slow-for-curves-vision", "fresh", {"mici": "slow for curves: vision", "tici": "Slow for Curves: Vision"}),
  ("slow-for-curves-map", "fresh", {"mici": "slow for curves: map", "tici": "Slow for Curves: Map"}),
  ("speed-limit", "fresh", {"mici": "speed limit mode", "tici": "Speed Limit"}),
  ("alpha-longitudinal", "alpha", {"mici": "alpha longitudinal", "tici": "Alpha Longitudinal"}),
  ("speed-assist", "alpha", {"mici": "speed assist", "tici": "Experimental Mode Speed Assist"}),
  ("lead-follow-assist", "alpha", {"mici": "lead follow assist", "tici": "Experimental Mode Lead Follow Assist"}),
]


def git(*args: str) -> str:
  try:
    return subprocess.check_output(["git", *args], text=True, stderr=subprocess.DEVNULL).strip()
  except (OSError, subprocess.CalledProcessError):
    return ""


def release_metadata() -> dict[str, str]:
  from openpilot.common.version import get_version
  commit = os.getenv("GIT_COMMIT") or git("rev-parse", "HEAD") or "unknown"
  ts = git("show", "-s", "--format=%ct", commit)
  date = datetime.datetime.fromtimestamp(int(ts)) if ts else datetime.datetime.now()
  return {
    "version": os.getenv("VERSION") or get_version(),
    "branch": os.getenv("GIT_BRANCH", "develop"),
    "commit": commit,
    "commit_date_raw": f"'{ts} {date:%Y-%m-%d %H:%M:%S %z}'".replace(" '", "'"),
    "commit_date": date.strftime("%b %d"),
  }


def car_params(alpha_long: bool):
  """CarParams as card writes them for a 2022 CX-5 with a steer-to-zero EPS and BSM."""
  from opendbc.car import gen_empty_fingerprint, structs
  from opendbc.car.car_helpers import interfaces
  from opendbc.car.mazda.values import STEER_TO_ZERO_EPS_FW
  from openpilot.selfdrive.car.helpers import convert_to_capnp

  CI = interfaces[PLATFORM]
  eps = structs.CarParams.CarFw(ecu="eps", fwVersion=sorted(STEER_TO_ZERO_EPS_FW)[0], address=0x730)
  fingerprint = gen_empty_fingerprint()
  fingerprint[0][0x477] = 8  # blind spot monitoring
  CP = CI.get_params(PLATFORM, fingerprint, [eps], alpha_long, False, False)
  CP_SP = CI.get_params_sp(CP, PLATFORM, fingerprint, [eps], alpha_long, False, False)
  return CP, convert_to_capnp(CP_SP)


def setup_params(state: str):
  """state: fresh (new install) or alpha (alpha long on, Experimental Mode on, DEC off)."""
  from openpilot.sunnypilot.selfdrive.car.mazda_torque_seed import seed_mazda_torque_defaults

  params = Params()
  params.clear_all()
  alpha = state == "alpha"
  CP, CP_SP = car_params(alpha)
  params.put("CarParamsPersistent", CP.to_bytes(), block=True)
  params.put("CarParamsSPPersistent", CP_SP.to_bytes(), block=True)

  # manager_init: every declared default, then card's one-time Mazda seed.
  # Blocking writes: a queued default would land after the seed and undo it.
  for k in params.all_keys():
    default = params.get_default_value(k)
    if default is not None and params.get(k) is None:
      params.put(k, default, block=True)
  seed_mazda_torque_defaults(CP, params)

  if alpha:
    params.put_bool("AlphaLongitudinalEnabled", True, block=True)
    params.put_bool("ExperimentalModeConfirmed", True, block=True)
    params.put_bool("ExperimentalMode", True, block=True)
    params.put_bool("DynamicExperimentalControl", False, block=True)

  meta = release_metadata()
  params.put("Version", meta["version"], block=True)
  params.put("GitBranch", meta["branch"], block=True)
  params.put("GitCommit", meta["commit"], block=True)
  params.put("GitCommitDate", meta["commit_date_raw"], block=True)
  params.put("UpdaterCurrentDescription", f"{meta['version']} / {meta['branch']} / {meta['commit'][:7]} / {meta['commit_date']}", block=True)
  params.put("UpdaterTargetBranch", meta["branch"], block=True)
  # No DongleId / HardwareSerial: a fresh, unpaired device shows N/A, and the
  # wiki capture checklist forbids secrets in frame.


def setup_ui_state():
  from openpilot.selfdrive.ui.ui_state import ui_state

  ui_state.params = Params()
  ui_state.started = False
  ui_state.update_params()
  ui_state.is_metric = False
  ui_state.is_sp_release = False
  return ui_state


# ---- widget tree helpers -------------------------------------------------

def _norm(s: str) -> str:
  return " ".join(s.split()).lower()


def widget_title(w) -> str | None:
  if BIG_UI:
    from openpilot.system.ui.widgets.list_view import ListItem
    return w.title if isinstance(w, ListItem) else None
  from openpilot.selfdrive.ui.mici.widgets.button import BigButton
  return w.text if isinstance(w, BigButton) else None


def _children(o):
  from openpilot.system.ui.widgets import Widget
  vals = list(vars(o).values()) if hasattr(o, "__dict__") else []
  out = []
  while vals:
    v = vals.pop()
    if isinstance(v, Widget):
      out.append(v)
    elif isinstance(v, (list, tuple, set)):
      vals.extend(v)
    elif isinstance(v, dict):
      vals.extend(v.values())
    elif callable(v) and getattr(v, "__closure__", None):
      # sub-panels opened by a click callback live only in its closure
      vals.extend(c.cell_contents for c in v.__closure__ if _cell_ok(c))
    elif hasattr(v, "items") and isinstance(getattr(v, "items", None), list) and not isinstance(v, type):
      vals.extend(v.items)  # tici AlphaLongitudinalToggles
  return out


def _cell_ok(cell) -> bool:
  try:
    cell.cell_contents
    return True
  except ValueError:
    return False


def find_setting(root, title: str):
  """Return (container, item): the nearest renderable layout holding the item titled `title`."""
  want = _norm(title)
  seen: set[int] = set()
  stack = [root]
  matches = []
  while stack:
    o = stack.pop()
    if id(o) in seen:
      continue
    seen.add(id(o))
    scroller = getattr(o, "_scroller", None)
    for item in getattr(scroller, "_items", None) or []:
      t = widget_title(item)
      if t is not None and _norm(t) == want:
        matches.append((o, item))
    stack.extend(_children(o))
  # a submenu button can share its title with the switch inside (mici
  # "alpha longitudinal"): prefer the switch
  for o, item in matches:
    if hasattr(item, "_checked"):
      return o, item
  return matches[0] if matches else (None, None)


# ---- rendering -----------------------------------------------------------

def render_widget(widget, frames=SETTLE_FRAMES, parent=None):
  """Render a layout at its full content size; return (PIL image, scale).

  `parent`: the panel a sub-panel belongs to. On the device the parent keeps
  updating while its sub-panel is open (it gates the sub-panel's controls),
  so run its state update each frame too."""
  from openpilot.system.ui.lib.application import gui_app

  scale = gui_app._scale
  if hasattr(widget, "_trigger_animate_in"):
    widget._trigger_animate_in = False
  if hasattr(widget, "_pos_filter"):
    widget._pos_filter.x = 0.0

  # Keep alpha opaque: blend RGB normally, keep dst alpha (1.0 from clear)
  GL_FUNC_ADD = 0x8006
  rl.rl_set_blend_factors_separate(0x0302, 0x0303, 0x0000, 0x0001, GL_FUNC_ADD, GL_FUNC_ADD)

  pad_x, pad_y = (TICI_PANEL_MARGIN, 25) if BIG_UI else (0, 0)
  bg = TICI_PANEL_COLOR if BIG_UI else rl.BLACK

  def render_pass(rt, w, h, n):
    rect = rl.Rectangle(pad_x, pad_y, w - 2 * pad_x, h - 2 * pad_y)
    for _ in range(n):
      if parent is not None:
        parent._update_state()
      rl.begin_texture_mode(rt)
      rl.clear_background(bg)
      rl.rl_push_matrix()
      rl.rl_scalef(scale, scale, 1.0)
      rl.begin_blend_mode(rl.BLEND_CUSTOM_SEPARATE)
      widget.render(rect)
      rl.end_blend_mode()
      rl.rl_pop_matrix()
      rl.end_texture_mode()
      rl.begin_drawing()
      rl.end_drawing()

  # Lay out at the device's panel size first so the scroller sizes its content,
  # then re-render on a frame big enough for all of it: wider for the mici
  # one-card-per-screen scrollers, taller for the tici lists.
  base_w = gui_app.width - TICI_SIDEBAR_WIDTH if BIG_UI else gui_app.width
  base_h = gui_app.height
  warm = rl.load_render_texture(int(base_w * scale), int(base_h * scale))
  render_pass(warm, base_w, base_h, frames)
  rl.unload_render_texture(warm)

  content_w, content_h = base_w, base_h
  scroller = getattr(widget, "_scroller", None)
  if BIG_UI:
    # lists lay out from the top, so render tall and trim the empty tail below
    content_h = TICI_FRAME_HEIGHT
  elif scroller is not None and getattr(scroller, "_content_size", 0) > content_w:
    content_w = scroller._content_size
  content_w = int(content_w + 4)
  content_w += content_w % 2
  content_h = int(content_h + 4)
  content_h += content_h % 2

  rt = rl.load_render_texture(int(content_w * scale), int(content_h * scale))
  if hasattr(widget, "_pos_filter"):
    widget._pos_filter.x = 0.0
  render_pass(rt, content_w, content_h, frames)

  image = rl.load_image_from_texture(rt.texture)
  rl.image_flip_vertical(image)
  with tempfile.TemporaryDirectory() as tmp:
    path = os.path.join(tmp, "frame.png")
    rl.export_image(image, path)
    img = Image.open(path).convert("RGB")
    img.load()
  rl.unload_image(image)
  rl.unload_render_texture(rt)

  if BIG_UI:
    # trim the empty tail below the last row
    bbox = Image.eval(img, lambda p: 0 if abs(p - 41) < 3 else 255).getbbox()
    if bbox:
      img = img.crop((0, 0, img.width, min(img.height, bbox[3] + int(40 * scale))))
  return img, scale


def save_png(img: Image.Image, path: Path, max_width: int):
  if img.width > max_width:
    img = img.resize((max_width, round(img.height * max_width / img.width)), Image.LANCZOS)
  path.parent.mkdir(parents=True, exist_ok=True)
  img.save(path, optimize=True)
  if shutil.which("pngquant"):
    subprocess.run(["pngquant", "--force", "--skip-if-larger", "--quality", "70-95", "--strip",
                    "--output", str(path), str(path)], check=False)
  if shutil.which("oxipng"):
    subprocess.run(["oxipng", "-q", "-o", "4", "--strip", "safe", str(path)], check=False)
  print(f"  {path.name} ({img.width}x{img.height}, {path.stat().st_size // 1024} KB)")


def capture_setting(root, title: str, out: Path) -> bool:
  container, item = find_setting(root, title)
  if container is None:
    print(f"  skip: no {DEVICE} setting titled {title!r}")
    return False
  container.show_event()
  img, scale = render_widget(container, parent=root if container is not root else None)
  r = item.rect
  # tici: stop just inside the row so the list's separator lines stay out
  mx, my = (20, -1) if BIG_UI else (8, 8)
  box = (max(0, int((r.x - mx) * scale)), max(0, int((r.y - my) * scale)),
         min(img.width, int((r.x + r.width + mx) * scale)), min(img.height, int((r.y + r.height + my) * scale)))
  save_png(img.crop(box), out, MAX_WIDTH["setting"])
  return True


# ---- panels --------------------------------------------------------------

def panel_classes():
  if BIG_UI:
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.steering import SteeringLayout
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.cruise import CruiseLayout
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.models import ModelsLayout
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.display import DisplayLayout
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.visuals import VisualsLayout
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.toggles import TogglesLayoutSP
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.network import NetworkUISP
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.device import DeviceLayoutSP
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.software import SoftwareLayoutSP
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.sunnylink import SunnylinkLayout
    from openpilot.selfdrive.ui.sunnypilot.layouts.settings.developer import DeveloperLayoutSP
    from openpilot.system.ui.lib.wifi_manager import WifiManager

    def network():
      wm = WifiManager()
      wm.set_active(False)
      return NetworkUISP(wm)
    return [
      ("steering", SteeringLayout), ("cruise", CruiseLayout), ("models", ModelsLayout),
      ("display", DisplayLayout), ("visuals", VisualsLayout), ("toggles", TogglesLayoutSP),
      ("network", network), ("device", DeviceLayoutSP), ("software", SoftwareLayoutSP),
      ("sunnylink", SunnylinkLayout), ("developer", DeveloperLayoutSP),
    ]
  # import the SP settings module first: it swaps the upstream toggles,
  # developer and software panels for zoompilot's
  import openpilot.selfdrive.ui.sunnypilot.mici.layouts.settings  # noqa: F401
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.steering import SteeringLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.cruise import CruiseLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.models import ModelsLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.display import DisplayLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.visuals import VisualsLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.toggles import TogglesLayoutMiciSP
  from openpilot.selfdrive.ui.mici.layouts.settings.network.network_layout import NetworkLayoutMici
  from openpilot.selfdrive.ui.mici.layouts.settings.device import DeviceLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.software import SoftwareLayoutSP
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.sunnylink import SunnylinkLayoutMici
  from openpilot.selfdrive.ui.sunnypilot.mici.layouts.developer import DeveloperLayoutMiciSP
  return [
    ("steering", SteeringLayoutMici), ("cruise", CruiseLayoutMici), ("models", ModelsLayoutMici),
    ("display", DisplayLayoutMici), ("visuals", VisualsLayoutMici), ("toggles", TogglesLayoutMiciSP),
    ("network", NetworkLayoutMici), ("device", DeviceLayoutMici), ("software", SoftwareLayoutSP),
    ("sunnylink", SunnylinkLayoutMici), ("developer", DeveloperLayoutMiciSP),
  ]


def build_panels():
  return [(name, factory()) for name, factory in panel_classes()]


def main():
  ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
  ap.add_argument("--features", action="store_true", help="capture the wiki's feature-page setting shots")
  ap.add_argument("--setting", help="capture one setting by its exact on-screen title")
  ap.add_argument("--out", type=Path, help="output file for --setting, or output dir for panels")
  ap.add_argument("--state", choices=("fresh", "alpha"), default="fresh",
                  help="fresh install, or alpha long + Experimental Mode on (DEC off)")
  ap.add_argument("--panels", nargs="*", help="only these panels (by file stem)")
  args = ap.parse_args()

  with OpenpilotPrefix():
    rl.set_config_flags(rl.FLAG_WINDOW_HIDDEN)
    from openpilot.system.ui.lib.application import gui_app

    setup_params("fresh")
    gui_app.init_window("capture_wiki_settings", fps=30)

    def fresh_panels(state):
      setup_params(state)
      setup_ui_state()
      return build_panels()

    if args.setting:
      panels = fresh_panels(args.state)
      out = args.out or Path(_norm(args.setting).replace(" ", "-").replace(":", "") + ".png")
      for _, panel in panels:
        if find_setting(panel, args.setting)[0] is not None:
          capture_setting(panel, args.setting, out)
          break
      else:
        print(f"  skip: no {DEVICE} setting titled {args.setting!r}")
    elif args.features:
      out_dir = args.out or FEATURE_DIR
      print(f"Capturing {DEVICE} feature shots into {out_dir}/")
      for state in ("fresh", "alpha"):
        panels = fresh_panels(state)
        for name, shot_state, titles in FEATURE_SHOTS:
          if shot_state != state:
            continue
          title = titles.get(DEVICE)
          if title is None:
            print(f"  skip: {name} has no {DEVICE} setting")
            continue
          for _, panel in panels:
            if find_setting(panel, title)[0] is not None:
              capture_setting(panel, title, out_dir / f"{name}.png")
              break
          else:
            print(f"  skip: no {DEVICE} setting titled {title!r}")
    else:
      out_dir = args.out or PANEL_DIR
      print(f"Capturing {DEVICE} panels into {out_dir}/")
      for name, panel in fresh_panels("fresh"):
        if args.panels and name not in args.panels:
          continue
        panel.show_event()
        if BIG_UI and name == "network":
          panel._cycle_panel()  # the settings live under Advanced; the Wi-Fi list needs hardware
        img, _ = render_widget(panel)
        save_png(img, out_dir / f"{name}.png", MAX_WIDTH["panel"])

    gui_app.close()


if __name__ == "__main__":
  main()
