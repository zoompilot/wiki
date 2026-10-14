---
title: How experimental speed control works
description: How zoompilot takes over the Mazda radar to drive gas and brakes, hands it back, and shapes acceleration like the car's own cruise.
source: zoompilot develop a7a6df8
---

# How experimental speed control works

[Experimental speed control](../features/alpha-longitudinal.md) silences
Mazda's radar and sends its messages to control acceleration and braking.
You set speed and engage with the steering-wheel buttons.
{ .zp-lede }

!!! warning "Emergency braking and collision warning are off"

    The car's [automatic emergency braking](../help/glossary.md#aeb) and
    [forward collision warning](../help/glossary.md#fcw) come from the
    radar, so both are off while zoompilot holds it. openpilot brakes at
    most 3.5 m/s² (about 0.36 g). Be ready to brake yourself.

## which cars

- **Steering:** a compatible Mazda [EPS](../help/glossary.md#eps) (2022+),
  factory-fitted or [swapped](car-identification.md#eps-swap). An older EPS
  stops steering below 28 mph (45 km/h).
- **Radar:** the 2022 family's radar, or the older G46L. The CX-5 2012–16
  and CX-9 2016–20 qualify only with a G46L.

The setting appears only when both match. All values here were tuned on a
2022 CX-5. It heads the Cruise panel: **Settings → Cruise → Alpha
Longitudinal** (comma 4: **Settings → Cruise → alpha longitudinal**). It
changes only while offroad (car off, or Force Offroad) and applies at the
next start.

## taking over the radar

<div class="zp-steps" markdown>

1. **Start the car.** The radar runs as normal. With
   [MADS](../help/glossary.md#mads), MAIN gives you steering at once.
2. **Wait for the camera** (see below).
3. **Stop.** The takeover runs only while stopped, with the car's own cruise
   off. You see **Longitudinal Initializing: Remain parked**.
4. **The radar goes quiet.** zoompilot puts it in a diagnostic mode where it
   stops sending, and sends its messages instead.
5. **Ready.** After 1.27 s of radar silence, **Alpha Longitudinal Ready**
   shows. Press SET.

</div>

- **Drove off first:** it takes over at the next stop. SET shows **Park to
  Engage Longitudinal**.
- **The car's own cruise is on:** SET shows **Turn Off Stock Cruise**.
- **The radar refuses, or does not answer in 10 s:** the radar keeps
  control for the drive. SET shows **Longitudinal Initializing Failed:
  Restart the car to retry**.
- **The radar speaks again later:** zoompilot steps back at once with a
  cruise fault, and retries at the next stop.

## the camera start-up wait { #fsc-settle-gate }

After it boots, the front camera checks that the radar is there. If the radar
goes quiet during that check, the camera latches an i-ACTIVSENSE fault that
only a long [power-down](../help/ecu-reset.md) clears. So zoompilot waits
for the camera's "boot finished" signal, then 7 s more. A camera error, or a
gap over 1.5 s in its messages, restarts the count.

## handing the radar back

Every software stop hands the radar back first, moving or stopped. A radar left to recover alone comes back
degraded and blocks cruise until the next ignition.

- **Force Offroad** (**Settings → Device → Enable Always Offroad**): disengage
  first. If the hand-back fails, it stays pending and zoompilot keeps the
  camera fed. Exiting cancels it.
- **Reboot or power off:** goes ahead on any answer, or after 15 s.
- **Ignition off:** the radar recovers on its own.
- **Turning it off while driving:** Force Offroad, switch off, exit. The
  car's cruise is back.

## stop-and-go

- **Stop:** openpilot holds with 1.024 m/s², the car's own value. After a
  few seconds the car's brake hold takes over and zoompilot relaxes. If it
  never does, zoompilot keeps braking.
- **Pull away:** once the plan asks for over 0.25 m/s² for 0.2 s, zoompilot
  sends the car's release signal and ramps up at 1.25 m/s³. Still stopped,
  it climbs for up to 3 s, never past 1.45 m/s².
- **Gas:** releases the hold at once. You never need RES.

## acceleration like the car's own cruise

- **Build:** at most 0.8 m/s³ above 13 mph (22 km/h).
- **Lift-off:** throttle eases off at most 2.0 m/s³ near your speed. Braking
  skips this.
- **Ceiling:** 1.75 m/s² at 9 mph (14 km/h), 1.05 at 31 mph (50 km/h), 0.65
  from 56 mph (90 km/h).

## lead cars

Only the camera sees the car ahead. Instead of assuming a braking car soon
stops braking, zoompilot uses the [driving
model's](../help/glossary.md#driving-model) forecast of its speed. Braking
starts earlier behind a slowing car, not harder. It is always on, with no
setting. If the model's car is over 4 m from the tracked car, openpilot's
own estimate is used. A car under 7 mph (11 km/h) is never assumed to pull
away.

zoompilot also does the radar's other jobs. It reports the lead to the
camera, lights the dash distance bars, and passes on auto high beams.

## buttons, brake and gas

- **MAIN:** turns cruise on and off as usual.
- **CANCEL or brake:** the car cancels and openpilot follows. If openpilot
  drops out first, it waits 0.2 s before pressing CANCEL, because a second
  cancel turns cruise main off.
- **Gas:** overrides without disengaging.

## Speed-Limit Assist and Slow for Curves

- **[Slow for Curves](../features/smart-cruise.md):** the planner slows the
  car itself. The dash set speed does not step down
  ([details](../technical/slow-for-curves.md)).
- **[Speed-Limit Assist](../features/speed-limit-assist.md):** in Assist
  mode, [ICBM](../help/glossary.md#icbm) still moves the dash set speed to
  the limit ([details](../technical/set-speed.md)).

## radar readouts

With the car's own cruise, openpilot combines up to 4 radar tracks with the
camera. With experimental speed control every lead is camera-only. Cars
whose radar sends no tracks (G46L, CX-5 2012–16, CX-9 2016–20) are
camera-only either way.

<details markdown="1">
<summary id="key-numbers">Quick reference: values and thresholds</summary>

| Value | What it means |
| --- | --- |
| 7 s | Camera start-up wait. |
| 1.27 s | Radar silence before control is ready. |
| 10 s | Time the radar gets to answer. |
| 15 s | Longest a reboot waits for the hand-back. |
| 1.024 m/s² | Braking that holds a stop. |
| 1.45 m/s² | Most acceleration to break away. |
| +2.0 / −3.5 m/s² | Limits the [panda](../help/glossary.md#panda) enforces. |

</details>

## settings

**Settings → Cruise → Alpha Longitudinal**, offroad only. Experimental Mode
and its [assists](../technical/experimental-mode-assists.md) sit below it.

??? info "For developers"

    **Code at develop.** `opendbc_repo/opendbc/car/mazda/`: `radar_session.py`
    (`RadarSessionManager`: STOCK, SILENCING, SILENCED, HANDBACK; the driver
    status as `StockEcuState`), `carstate.py` (FSC settle gate, silence guard,
    two-master `accFaulted`, PEDALS cruise state), `longitudinal.py`
    (`StandstillHold`, `AccelShaper`, `AdvertisedLead`), `carcontroller.py`,
    `interface.py` (`alphaLongitudinalAvailable`), `values.py`. Panda:
    `opendbc_repo/opendbc/safety/modes/mazda.h`. Hand-back broker:
    `openpilot/sunnypilot/selfdrive/car/stock_ecu_handback.py`, used by
    `openpilot/sunnypilot/system/hardware/hardwared_ext.py` and
    `openpilot/system/manager/manager.py`. Alerts:
    `openpilot/sunnypilot/selfdrive/selfdrived/events_zp.py`,
    `openpilot/sunnypilot/selfdrive/car/car_specific.py`. Lead forecast:
    `openpilot/sunnypilot/selfdrive/controls/lib/lead_forecast/forecast.py`.

    **Constants.** `FSC_SETTLE_T = 7.0`, `CAM_LANEINFO_FRESH_T = 1.5`,
    `STOCK_RADAR_ALIVE_T = 0.05`, `STOCK_RADAR_GUARD_T = 1.27`,
    `RADAR_UDS_STEP = 50` (2 Hz), `RADAR_SESSION_LIMIT_FRAMES = 10 s`,
    `HANDBACK_WAIT_T = 15.0`, `CANCEL_SETTLE_T = 0.2`,
    `MAIN_OFF_DEBOUNCE_SAMPLES = 10`, `stopAccel = -1.024`,
    `longitudinalActuatorDelay = 0.36`, `RELEASE_ACCEL = 0.25`,
    `RELEASE_DEBOUNCE_FRAMES = 0.2 s`, `RESUME_UNLATCH_LATCHED_FRAMES = 0.18 s`,
    `RESUME_REPULSE_FRAMES = 1.0 s`, `ACCEL_RELEASE_RAMP = 1.25`,
    `ACCEL_BREAKAWAY_MAX = 1.45`, `ACCEL_BREAKAWAY_OVERSHOOT = 0.75`,
    `BREAKAWAY_FRAMES = 3.0 s`, `ACCEL_BUILD_V = [1.25, 0.8]` over
    `[3, 6] m/s`, `ACCEL_LIFT_LIMIT = -2.0`, `ACCEL_CEILING_V =
    [1.5, 1.75, 1.45, 1.05, 0.85, 0.65]` over `[0, 4, 9, 14, 18, 25] m/s`,
    `ACCEL_WINDUP_LIMIT = 4.0`, `ACCEL_WINDDOWN_LIMIT = -10.0`,
    `LEAD_DEBOUNCE_FRAMES = 0.5 s`, `MAZDA_LONG_LIMITS = +2000 / -3500` raw.
    Lead forecast: `SPEEDUP_V_BP = [3, 8]`, `SPEEDUP_A_BP = [-1.0, -0.3]`,
    `MATCH_DIST = 4.0`, `BLEND_RATE = 4.0`, param `LeadForecast` (default 1,
    no UI). The UI comment in `alpha_longitudinal_toggles.py` that card
    requests an onroad cycle on a toggle change is stale: the switch is
    offroad-only and nothing watches it onroad.

    **Engineering records.**
    [mazda-longitudinal.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/mazda-longitudinal.md),
    [force-offroad-alpha-transition.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/force-offroad-alpha-transition.md),
    [lead-forecast.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/lead-forecast.md).
    The measurements and route data live in the private zoompilot-research
    repository.
