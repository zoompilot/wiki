---
title: How steering works
description: How zoompilot steers a Mazda, from torque limits and low-speed steering to the speed-based tune, steering blocks and MADS.
source: zoompilot develop a7a6df8
---

# How steering works

zoompilot steers your Mazda by asking its power steering motor for torque 100 times a second. It learns how your car responds at each speed and checks what the motor actually applies, so a blocked command does not become a fault.
{ .zp-lede }

## how it works

1. **Command.** The torque controller turns the [driving model](../help/glossary.md#driving-model)'s path into a torque in [counts](../help/glossary.md#counts) for the [EPS](../help/glossary.md#eps) (the power steering motor).
2. **Check.** The [panda](../help/glossary.md#panda) checks every command against the same limits zoompilot uses.
3. **Report.** The EPS reports the torque it applied, and the panda reports any command it refused. zoompilot acts on both.

<div class="diagram">
<svg viewBox="0 0 800 172" role="img" aria-label="The comma device sends a torque command to the panda, which checks it and passes it to the Mazda EPS, which turns the wheels. The EPS reports the torque it applied and the panda reports refused commands back to the device.">
  <defs>
    <marker id="zp-arrow" class="m-dim" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z"/></marker>
    <marker id="zp-arrow-a" class="m-acc" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z"/></marker>
  </defs>
  <rect class="d-box-accent" x="16" y="45" width="170" height="44"/>
  <text class="d-hi" x="101" y="63" text-anchor="middle">comma device</text>
  <text x="101" y="78" text-anchor="middle">torque command</text>
  <rect class="d-box" x="260" y="45" width="150" height="44"/>
  <text class="d-hi" x="335" y="63" text-anchor="middle">panda</text>
  <text x="335" y="78" text-anchor="middle">same limits</text>
  <rect class="d-box" x="480" y="45" width="150" height="44"/>
  <text class="d-hi" x="555" y="63" text-anchor="middle">Mazda EPS</text>
  <text x="555" y="78" text-anchor="middle">applies torque</text>
  <rect class="d-box-stock" x="700" y="45" width="84" height="44"/>
  <text class="d-hi" x="742" y="71" text-anchor="middle">wheels</text>
  <line class="d-flow-accent" x1="186" y1="67" x2="256" y2="67"/>
  <text x="221" y="38" text-anchor="middle">every 10 ms</text>
  <line class="d-flow" x1="410" y1="67" x2="476" y2="67"/>
  <line class="d-flow" x1="630" y1="67" x2="696" y2="67"/>
  <path class="d-flow" d="M335,89 V118 H150 V93"/>
  <text x="243" y="110" text-anchor="middle">refused commands</text>
  <path class="d-flow-accent" d="M555,89 V146 H60 V93"/>
  <text x="308" y="162" text-anchor="middle">torque applied</text>
</svg>
</div>

## torque limits

Every Mazda gets these limits, and the panda enforces them too.

- **Maximum.** 1200 counts at every speed.
- **Rate.** 12 counts per 10 ms, up or down, the EPS's own rate. Full torque takes 1 s.
- **EPS ceiling.** The EPS applies at most about 1148 counts below 18 mph (29 km/h) and 620 from 32 mph (52 km/h). zoompilot caps its command there, so it can warn you ("Turn Exceeds Steering Limit") when the motor is maxed out.
- **Your hands win.** Steer against zoompilot and its allowed torque drops quickly.

## steering down to a stop

A [compatible Mazda EPS (2022+)](car-identification.md#compatible-eps) steers down to a stop, in whichever gen1 Mazda it is fitted. An older EPS gets the same limits and tune, but its firmware adds two lockouts:

- **Minimum speed.** No steering below 28 mph (45 km/h) until you pass 32 mph (52 km/h) again. With cruise on you see "Steer Assist Unavailable Below 28 mph".
- **Hands off.** If the EPS decides your hands are off, it blocks steering: "Steering Assist Temporarily Unavailable", and steering turns off.

## the steering tune

**Speed ranges.** With [Self-Tune](../help/glossary.md#self-tune) on, zoompilot learns the [LAF](../help/glossary.md#laf) and friction for each [speed range](../help/glossary.md#speed-bands) and blends them by speed. Most cars have 7 ranges, from 11 to 89 mph (18 to 144 km/h); the CX-5 2022–25 has 9, from 4 mph (7 km/h). Learned values stay within ±30% (LAF) and ±50% (friction) of the starting values.

**After a reboot.** The device saves what it learned while you drive and restores it at start-up if the car and software match. An update with new starting values restarts learning.

**Starting values.** The CX-5 2022–25 starts from a test car's learned values; older Mazdas with a compatible EPS borrow them. The CX-9 2021–23 and CX-8 2023 share their own. Other cars start from one stock value. The first time zoompilot identifies a Mazda, it turns on Enforce Torque Lateral Control and Self-Tune and picks tune v2.0.

**Tune per model size.** Small and big driving models each keep a tune (v0.0, v1.0 or v2.0): by default v2.0 for small models on a Mazda and v1.0 for big ones. zoompilot's v2.0 is steadier on straights, hands back more smoothly when you let go, and damps swing-back after sharp turns below 32 mph.

## when the car blocks steering

**The EPS blocks ([LKAS_BLOCK](../help/glossary.md#lkas-block)).** On a compatible EPS a block often still lets some torque through, so zoompilot keeps steering. If the EPS applies nothing for 0.2 s against a real request, zoompilot stops asking, then ramps up from zero when the block lifts.

- **Usually silent.** Short blocks, blocks below 12 mph (19 km/h) and the standby after a stop show nothing.
- **Real dropout.** A block that began while moving and lasts 1 s at 12 mph or more shows a small "Steering Assist Temporarily Unavailable" with one chime. Steering stays engaged; steer yourself until it clears.
- **Older EPS.** A block above its minimum speed turns steering off with the same message.

**The car's lane keep is off.** The EPS applies no torque while the car's own [LKAS](../help/glossary.md#lkas) is switched off.

- **MADS on.** Steering pauses. Cruise is unaffected. A comma 4 shows "Lateral Disabled: LKAS is off"; a comma 3X shows it in the screen border. Switch lane keep back on and steering resumes by itself after the EPS re-arms (about 3 s).
- **MADS off.** You see "Invalid LKAS setting", and zoompilot will not engage.

## keeping the steering signal flowing

The EPS expects a steering message every 10 ms. If the stream breaks for about 0.6 s, the EPS faults, and about 5 s later the camera shows "LKAS Fault: Restart the Car" until you restart the car.

The usual cause is the panda refusing commands: after one refusal it accepts only a command near zero. zoompilot prevents this:

- **Matching limits.** Device and panda use identical limits, and zoompilot judges your steering effort cautiously so it stays inside the panda's check.
- **Refusal report.** When the panda refuses a command, zoompilot restarts from zero, which the panda accepts.
- **Camera passthrough.** When zoompilot is not steering, the panda passes the camera's own messages through.

## MADS on Mazda

[MADS](../help/glossary.md#mads) keeps steering on separately from cruise. Cancel and the brake stop cruise but leave steering on, unless **Steering Mode on Brake Pedal** says pause or disengage. The cruise main button turns both off.

**TJA button.** With **Mazda TJA Button** on, the wheel's TJA button switches steering and the main button only controls cruise. If a TJA press arms cruise that was off, zoompilot disarms it. While zoompilot steers with cruise off, the dash shows a white steering wheel.

**Two checks in step.** The device and the panda each decide whether steering is allowed, from the same signals. If they disagree, you see "Steering Blocked by Panda Safety", then "Controls Mismatch: Lateral" turns steering off.

## key numbers

| Value | What it means |
| --- | --- |
| 1200 counts | Maximum steering command. |
| 12 counts per 10 ms | Fastest change, up or down. |
| 1148 to 620 counts | Most the EPS applies, from below 18 mph to 32 mph and up. |
| 28 mph (45 km/h) | Older EPS minimum steering speed. |
| 7 or 9 | Speed ranges learned (9 on the CX-5 2022–25). |
| 0.2 s | No delivery before zoompilot stops asking. |
| 1 s at 12 mph (19 km/h) | Block needed before an alert. |

## settings

Settings → Steering (comma 4: torque control and mads submenus):

- **Enforce Torque Lateral Control.** Runs this torque controller. Keep it on.
- **Customize Torque Params.** **Self-Tune**; **Less Restrict Settings for Self-Tune (Beta)**, which widens the bands to ±100%; and **Torque Control Tune Version** for small and big models.
- **Enable Custom Tuning** and **Manual Real-Time Tuning.** Your own values instead of learned ones. See [Custom steering tuning](../settings/custom-tune.md).
- **Customize MADS.** **Steering Mode on Brake Pedal** and **Mazda TJA Button**.

All steering settings: [Settings reference](../settings/index.md#steering).

??? info "For developers"

    **Code at develop.**

    - Car: `opendbc_repo/opendbc/car/mazda/{values,interface,carcontroller,carstate}.py`.
    - Panda: `opendbc_repo/opendbc/safety/modes/mazda.h` (`MAZDA_EPS_HW_STEERING_LIMITS`, selected by `MazdaSafetyFlags.EPS_HW`, set on every gen1 Mazda).
    - Tune: `openpilot/sunnypilot/selfdrive/controls/lib/latcontrol_torque_v2.py`, `latcontrol_torque_ext_zp.py` (EPS rail as `steer_max`, per-speed interpolation), `steer_limit.py`, `torque_tune.py`, `controls_lateral_zp.py` (per-size tune swap).
    - Learner: `openpilot/sunnypilot/selfdrive/locationd/speed_bin_learner.py`; seeds in `opendbc_repo/opendbc/car/torque_data/speed_dependent.toml`; config in `opendbc_repo/opendbc/sunnypilot/car/lateral_tune.py`.
    - Seed: `openpilot/sunnypilot/selfdrive/car/mazda_torque_seed.py`.
    - MADS: `openpilot/sunnypilot/mads/mads.py`, `opendbc_repo/opendbc/sunnypilot/car/mazda/mads.py`; events in `openpilot/sunnypilot/selfdrive/car/car_specific.py`.

    **Constants.**

    `EPS_STEER_MAX` = `STEER_MAX` = 1200; `STEER_DELTA_UP` = `STEER_DELTA_DOWN` = 12; `STEER_STEP` = 1;
    `STEER_DRIVER_ALLOWANCE` = 15; `STEER_DRIVER_MULTIPLIER` = 15; `STEER_DRIVER_SAMPLES` = 10; `STEER_DRIVER_MARGIN` = 2;
    panda `max_rt_delta` = 384; `TUNE_STEER_MAX` = 800 (`TUNE_SCALE` = 1.5 for params.toml, NNLC and typed values);
    `EPS_CEILING_LOOKUP` = 1148 at 8.0 m/s to 620 at 14.5 m/s;
    `STEER_UNDELIVERED_MIN` = 200; `STEER_UNDELIVERED_FRAMES` = 20; `STEER_UNDELIVERED_ALERT_FRAMES` = 80;
    `STEER_UNDELIVERED_ALERT_MIN_SPEED` = 12 mph; `STEER_UNDELIVERED_ALERT_ORIGIN_SPEED` = 1.0 m/s;
    `LKAS_LIMITS.DISABLE_SPEED` / `ENABLE_SPEED` = 45 / 52 km/h; `LKAS_REARM_T` = 3.0 s; `LKAS_REARM_FAULT_T` = 4.0 s;
    `steerActuatorDelay` = 0.14 s; `MAZDA_STEER_TO_ZERO_TORQUE_TUNE` = 2.0; `TUNE_SWAP_INACTIVE_FRAMES` = 0.5 s;
    `LATERAL_MISMATCH_WARN_FRAMES` = 20; `LATERAL_MISMATCH_DISABLE_FRAMES` = 200.
    CX-5 2022 speed bins: 3.5, 6.5, 9.5, 12.0, 16.4, 21.0, 28.0, 34.5, 37.0 m/s, `min_speed` = 2.0, `seed_version` = 3.
    Default bins: 5 to 40 m/s in 7 ranges.

    **Engineering record.**

    [mazda-lateral.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/mazda-lateral.md) ·
    [lateral-tune.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/lateral-tune.md) ·
    [lateral-tune-roadmap.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/lateral-tune-roadmap.md) ·
    [mads.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/mads.md).
    The measurements and route data live in the private zoompilot-research repository.
