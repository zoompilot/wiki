---
title: How Slow for Curves plans
description: How zoompilot picks a curve speed from the camera and the map, when it starts slowing, and how hard it may brake.
source: zoompilot develop a7a6df8
---

# How Slow for Curves plans

[Slow for Curves](../features/smart-cruise.md) plans braking before a bend
and restores speed as it opens, up to the next curve or your set speed.
{ .zp-lede }

1. **It reads the road ahead.** The camera planner uses the path the
   [driving model](../help/glossary.md#driving-model) predicts. The map
   planner uses curve speeds from your downloaded maps.
2. **It gives each bend a speed** at the grip limit below.
3. **It works backward** to the latest point where braking within the
   budget still reaches each bend at its speed.
4. **It starts when it must:** once the braking needed reaches 70% of the
   budget. The spare 30% covers hills and reading errors.
5. **The lowest target wins** among your set speed, both planners and
   [Speed-Limit Assist](../features/speed-limit-assist.md).

Mazda runs the zoompilot planners described here. Every other brand runs
sunnypilot's own Slow for Curves, unchanged.

<div class="diagram">
<svg viewBox="0 0 800 250" role="img" aria-label="A curve on the path ahead, and the speed plan below it: set speed, a ramp down before the curve, a low flat through it, and a ramp back up after">
  <text x="20" y="34">road ahead</text>
  <rect class="d-box-accent" x="400" y="18" width="160" height="52"/>
  <text class="d-hi" x="480" y="48" text-anchor="middle">curve</text>
  <line class="d-lane" x1="400" y1="74" x2="400" y2="118"/>
  <line class="d-lane" x1="560" y1="74" x2="560" y2="118"/>
  <text x="20" y="146">speed</text>
  <line class="d-line-axis" x1="110" y1="230" x2="770" y2="230"/>
  <text x="770" y="246" text-anchor="end">distance</text>
  <path class="d-ceiling" d="M280,150 H400 V205 H560 V150"/>
  <text x="480" y="142" text-anchor="middle">grip limit</text>
  <path class="d-flow-accent" d="M120,150 H280 C330,150 360,205 430,205 H550 C610,205 640,150 700,150 H760"/>
  <text x="150" y="138" text-anchor="middle">set speed</text>
</svg>
</div>

### the grip limit

Sideways pull stays at or under about 2.2 m/s² (about 0.22 g), depending
on the curve's speed: 2.2 m/s² at 35 mph (56 km/h), 2.1 at 55 mph (89 km/h),
2.2 at 70 mph (113 km/h). It rises again at highway speed because banked
highway curves hide some pull. The planner targets 95% of the limit to
allow for lag.

### how far it looks

The camera planner uses the whole predicted path. The model sees far
bends as gentler than they are, so below 50 mph (80 km/h) zoompilot
sharpens them (up to 1.5 times at 110 m). This fades out by 60 mph
(97 km/h).

The first 3 s of path (4 s on the big driving model) is the **near
window**. The model reads it well, so it decides whether you are in a
curve. With your car's own cruise and a set speed under 50 mph, only the
near window may ask for braking past the budget. That fades out by 60 mph.

### in the curve and after

The planner stays on while the near window needs less than your speed
plus 1 m/s (about 2 mph), or the braking needed stays above 30% of the
budget. Then it lets go. Your car's cruise climbs back only as far as the
next slow point ahead.

### the commit hold below 50 mph

Below 50 mph the model can lose a bend it saw, then find it again closer.
So with your car's own cruise, zoompilot remembers a bend that has called
for slowing for 2 s until the near window reaches it. A slower bend replaces it.
The hold also ends if the planner lets go or you pass 50 mph. It never
runs with experimental speed control.

### the map planner

A map target uses the same budget and 70% trigger, and never asks past the
budget. Below 45 mph (72 km/h) it acts at once. Faster, it must first stay
the slowest target ahead for up to 2.5 s (the full 2.5 s from 50 mph,
80 km/h), which filters out the map briefly placing you on a side street.
If the map data drops out, the target lets go at once. At speed, a
returning target waits the full time again.

## how hard it may slow

| Speed control | Braking budget | How it slows |
| --- | --- | --- |
| Your car's own cruise ([MRCC](../help/glossary.md#mrcc)) | 0.75 m/s² | Through the cruise buttons. See [set speed](../technical/set-speed.md). |
| [Experimental speed control](../features/alpha-longitudinal.md) | 1.2 m/s² | It sets the speed directly. See [speed control](../technical/speed-control.md). |

With your car's own cruise, the cruise buttons lower the
[set speed](../help/glossary.md#set-speed) toward the slowest point ahead,
a few mph below your speed at a time. Presses and the cruise's reaction
take time, so it starts braking earlier.

## what you'll notice

- **Back-to-back curves** keep the speed down to the slowest one ahead.
- **Lowest target:** it never asks for less than 12 mph (20 km/h).
- **Pressing the gas** overrides it.

## settings

**Settings → Cruise → Slow for Curves: Vision** and **Settings → Cruise →
Slow for Curves: Map**. Both are off by default and work together. They
turn on only when zoompilot can change your speed (experimental speed
control or cruise-button control).

??? info "For developers"

    Code at develop, under `openpilot/sunnypilot/selfdrive/controls/lib/smart_cruise_control/`:

    - `zoompilot/__init__.py`: `TUNED_BRANDS = ('mazda',)`, `make_smart_cruise_control(CP)`.
    - `zoompilot/vision_controller.py`: `_A_LAT_CURVE_BP = [15.6, 24.6, 31.3]` m/s,
      `_A_LAT_CURVE = [2.2, 2.1, 2.2]`, `_PLAN_MARGIN = 0.95`,
      `_KAPPA_BIAS_D = [0..110]` m to `_KAPPA_BIAS_GAIN = [1.0..1.5]`,
      `_KAPPA_BIAS_V_BP = [22.4, 26.8]`, `_KAPPA_DEPTH_SET_BP = [20.1, 24.6]`,
      `_NEAR_T = 3.0`, `_NEAR_T_BIG = 4.0`, `_IN_CURVE_MARGIN = 1.0`,
      `_RELEASE_FRAC = 0.3`, `_HOLD_V_MAX = 22.4`, `_HOLD_SEEN_T = 2.0`,
      `_ESCALATION_V_BP = [22.4, 26.8]` (set speed).
    - `zoompilot/map_controller.py`: `_CONFIRM_V_BP = [20.1, 22.4]`,
      `_CONFIRM_T = [0., 2.5]`, `_T_FALLBACK = 2.8`.
    - `limits.py`: `COMMIT_FRAC = 0.7`, `_OP_LONG_A_BUDGET = 1.2`,
      `_STOCK_RESPONSE_T = 1.0`, `A_PUB_MIN = -2.0`, `PUB_JERK = 2.0`.
    - `speed_profile.py`: `allowed_speed`, `backward_pass`, `required_decel`,
      `lead_distance`, `min_profile_speed`; `D_FLOOR = 0.5`.
    - Mazda stock plant in `opendbc_repo/opendbc/sunnypilot/car/icbm_actuation_profile.py`:
      `stock_a_budget = 0.75`, `walk_rate = 4.0` mph/s, `track_gap = 8.0` mph
      (default profile: budget 0.5).
    - Source selection (lowest `vTarget` wins) and the ICBM lookahead
      `sccVAheadMin`: `openpilot/sunnypilot/selfdrive/controls/lib/longitudinal_planner.py`.
    - `limits.py` and `speed_profile.py` are shared with the Speed-Limit Assist
      publishers in `controls/lib/speed_limit/`.

    Full engineering record:
    [scc-curve-planning.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/scc-curve-planning.md).
    The measurements and route data live in the private zoompilot-research
    repository.
