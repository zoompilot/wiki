---
title: Experimental Mode assists
description: How Speed Assist and Lead Follow Assist help Experimental Mode reach your set speed and your chosen following distance.
source: zoompilot develop a7a6df8
---

# Experimental Mode assists

In Experimental Mode, set speed is a maximum. **Speed Assist** can raise
the model's speed on a clear road; **Lead Follow Assist** can close an
excess gap behind a steady car. Both are off by default.
{ .zp-lede }

openpilot's planner takes the lowest of the model's acceleration, the
following-distance controller's and the cruise controller's. Both assists
adjust only the model's value, so the set speed stays a hard ceiling.

1. **Speed Assist** runs when no car is ahead. It lifts the model toward your target
   speed: the set speed, or a lower limit from [Slow for Curves](../features/smart-cruise.md)
   or [Speed-Limit Assist](../features/speed-limit-assist.md). It closes the gap in
   about 6 s, at most 0.8 m/s².
2. **Speed Assist gives the speed back.** The model keeps speed it did not choose,
   so added speed would carry into the next bend. Speed Assist reads the model's
   plan and works out how fast the car may go and still ease gently into each bend,
   stop or slowdown ahead. Over that limit it hands back what it added, never more,
   at up to 0.6 m/s².
3. **Lead Follow Assist** runs behind a steady car. It lifts the model toward the
   following-distance controller, which holds your **Driving Personality** gap. It
   fades in as the extra gap grows from 3 m to 10 m, and can at most match that
   controller, so it never follows closer or speeds up harder than chill mode would.
4. **The model keeps the last word.** Both assists fade out as the model starts to
   brake, so the car settles where the model pushes back.

## what you'll notice

- **Clear road.** The extra speed builds within a second or two and holds.
- **Bends and stops.** The added speed comes off a few seconds before the model's own
  slowdown. Speed Assist never makes the car slower than the model alone, and never
  adds speed that would take a bend past 1.0 m/s² of sideways acceleration.
- **Behind a car.** The model matches the lead's speed but mostly ignores the gap.
  Lead Follow Assist closes extra gap beyond your following distance, up to a cap
  per personality:

| Driving Personality | Most added | Gap it closes to (steady speeds) |
| --- | --- | --- |
| Aggressive | 0.5 m/s² | 1.25 s plus 6 m |
| Standard | 0.4 m/s² | 1.45 s plus 6 m |
| Relaxed | 0.3 m/s² | 1.75 s plus 6 m |

- **Low speed.** Both fade in between about 11 mph (18 km/h) and 18 mph (29 km/h), so
  stop-and-go stays the model's.
- **Limit.** Some driving models plan a slowdown as soon as they pass their own
  pace. Speed Assist reads that as a real slowdown, so it closes only part of the gap.

## when they step aside

Both cut out fast and stay off for 3 s after the cause clears for: a collision
warning, a predicted hard brake, a forced slowdown (for example when you are not
responding), your foot on either pedal, or a lane change.

- **Speed Assist** also stands down whenever a car is ahead.
- **Lead Follow Assist** also stands down when the lead changes (a cut-in or a new
  car), is below 80% confidence, is slower than about 11 mph (18 km/h), brakes, or is
  forecast to slow by 1 m/s within 3 s. It also waits out a stop or slowdown in the
  model's plan, the model braking, or a bend over 1.0 m/s², then builds back up over 2 s.

## requirements and settings

You need [experimental speed control](../features/alpha-longitudinal.md)
(**Alpha Longitudinal**) and Experimental Mode on, and **Dynamic Experimental
Control** off: while it is on, both assists do nothing and their switches are
greyed out.

Open **Settings → Cruise**. On comma 4 the switches are under **alpha longitudinal**;
on comma 3X they are at the top of Cruise.

- **Experimental Mode Speed Assist** (**speed assist** on comma 4).
- **Experimental Mode Lead Follow Assist** (**lead follow assist** on comma 4).
- **Driving Personality**: sets the following distance and Lead Follow Assist's cap.

I tested both assists in simulation against recorded drives.
On-road feedback is welcome.

??? info "For developers"

    Code: `openpilot/sunnypilot/selfdrive/controls/lib/e2e_set_speed/controller.py`
    (Speed Assist, param `ExperimentalModeSetSpeed`) and
    `openpilot/sunnypilot/selfdrive/controls/lib/e2e_lead_gap/controller.py`
    (Lead Follow Assist, param `ExperimentalModeLeadGap`). Both are chained in
    `LongitudinalPlannerSP.update_e2e_target`
    (`openpilot/sunnypilot/selfdrive/controls/lib/longitudinal_planner.py`), called
    from the host planner right after the e2e candidate is built. Speed Assist learns
    how much lift reached the car from `delivered()`, called at publish. Telemetry:
    `longitudinalPlanSP.zoompilot.e2eSetSpeed` and `.e2eLeadGap`.

    Speed Assist: `TAU = 6 s`, `FLOOR_MAX = 0.8`, `MIN_SPEED / FULL_SPEED = 5 / 8 m/s`,
    `GAIN_BP = [-0.2, -0.05]`, `TAPER_DROP = 1.5 m/s`, `CURVE_LAT_ACCEL = 1.0`,
    `A_DEC = 0.4`, `LOOK_T = 2 s`, `SLOWING_DROP = 0.5 m/s`, `BOUND_TAU = 1 s`,
    `SHED_RATE = 0.038 /s`, `GIVE_T = 2 s`, `GIVE_MAX = 0.6`, `BOOST_RATE = 0.5 m/s³`,
    `HAZARD_FALL = 2.4 m/s³`, `HOLD_TIME = 3 s`.

    Lead Follow Assist: boost = authority × gain × weight × min(`CAP`, min(a_mpc,
    a_cruise) − a_model). `GAP_BP = [3, 10] m`, `SPEED_BP = [5, 8] m/s`,
    `CAP = 0.5 / 0.4 / 0.3`, `GAIN_BP = [-0.4, -0.1]`, `BOOST_RISE = 0.25 m/s³`,
    `AUTHORITY_RISE / FALL = 0.5 / 4 per s` (a lead change or lost lead drops it to 0
    at once), `LEAD_JUMP = 3 m`, `LEAD_PROB = 0.8`, `LEAD_MIN_SPEED = 5 m/s`.

    Both reset and pass the model through when off, outside e2e, or while DEC is
    active. Engineering records:
    [e2e-set-speed.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/e2e-set-speed.md),
    [e2e-lead-gap.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/e2e-lead-gap.md)
    (partly stale: it still describes the older "Set Speed Nudge"). The measurements
    and route data live in the private zoompilot-research repository.
