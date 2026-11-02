---
title: Set Speed Assist
description: How Set Speed Assist brings the driving model up to your set speed and following distance without taking any slowdown away from it.
source: zoompilot develop f68e2a1ef5
---

# Set Speed Assist

With Alpha Longitudinal, the driving model drives the gas and brakes, and
your set speed is a maximum. **Set Speed Assist** helps the model reach
that set speed and your following distance. It never makes the car slower
than the model alone would. It is on by default.
{ .zp-lede }

## why it exists

The model has no set-speed input and keeps its own following distance. In
our logs it cruised a median 5.5 mph under the set speed on a clear road,
and behind a lead it followed about 57 m further back than openpilot's
following-distance controller on aggressive.

## how it works

openpilot's planner takes the lowest of three answers: the model's
acceleration, the following-distance controller's and the cruise
controller's. Without help the model's lower answer wins, so the car runs
at the model's pace.

Set Speed Assist lifts the model's answer toward what the other two would
do, and never lowers it:

1. **The target** is the lower of the following-distance controller (which
   holds your **Driving Personality** gap) and the cruise controller (your
   set speed, or a lower target from [Slow for Curves](../features/smart-cruise.md)
   or [Speed-Limit Assist](../features/speed-limit-assist.md)).
2. **The pace** is stock adaptive cruise's: up to about 1.75 m/s² at low speed,
   down to 0.65 m/s² at highway speed, and gentler still as the gap to the
   target speed closes.
3. **The model keeps the last word.** The lift fades out as the model eases
   off its own acceleration or its throttle, and falls away within a
   fraction of a second when the model brakes. Every slowdown is the
   model's.
4. **Bends.** The lift fades out where the road ahead bends at more than
   0.6 m/s² of sideways acceleration at the current speed, and is gone by
   1.0 m/s².

## what you'll notice

- **Clear road.** The car settles at your set speed instead of a few mph
  under it.
- **Behind a car.** It follows at your Driving Personality distance
  instead of hanging back.
- **Lights, stops, curves.** No change: the model slows as it would
  without the assist.
- **Low speed.** It fades in between about 11 mph (18 km/h) and 18 mph
  (29 km/h), so stop-and-go stays the model's.
- **Lane changes.** It stands aside until the lane change finishes.

## switching it

Hold the car's follow-distance button, long press the comma 4 home
screen, or tap the comma 3X onroad button. An alert confirms each switch,
and a gauge icon shows while it is on. The setting is **Set Speed Assist**
in **Settings → Cruise** (comma 4: under **alpha longitudinal**).

??? info "For developers"

    Code: `openpilot/sunnypilot/selfdrive/controls/lib/e2e_set_speed/controller.py`
    (param `ExperimentalModeSetSpeed`), called from
    `LongitudinalPlannerSP.update_e2e_target`. Telemetry:
    `longitudinalPlanSP.zoompilot.e2eSetSpeed`.

    `e2e = a_model + lift`, `lift -> gain * fade * max(0, floor - a_model)`, where
    `floor = min(a_mpc, a_cruise, approach_accel(v_ego, v_target))`. `gain` ramps
    with the model's own acceleration (`GAIN_BP = [-0.3, -0.1]`), its throttle
    probability, and speed (`5 / 8 m/s`); `fade` with lateral acceleration ahead
    over 10 s (`FADE_LAT_BP = [0.6, 1.0]`). The lift rises at upstream's cruise
    jerk and falls at `2.4 m/s³`. `APPROACH_V = [1.5, 1.75, 1.45, 1.05, 0.85, 0.65]`
    over `[0, 4, 9, 14, 18, 25] m/s`.

    It replaced Speed Assist and Lead Follow Assist on 2026-10-27; a lift that could
    go negative made the car pump on straight roads. Engineering record:
    [e2e-set-speed.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/e2e-set-speed.md).
