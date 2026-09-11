---
title: Steering improvements
type: feature
description: How zoompilot gets more steering out of your Mazda's steering motor, tuned for every speed and learned while you drive.
reviewed: 2026-09-07
---

# Steering improvements

zoompilot steers your Mazda with the full strength of its steering
motor. It tunes the steering separately for every speed, from parking
lots to the highway, and learns your car while you drive. You do not
need to adjust anything.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Status** <span class="zp-badge zp-badge--ok">On by default</span>
  on Mazdas with a 2022-25 CX-5 steering motor (EPS)
- **Works on** Every supported Mazda. Steering down to a stop needs the
  2022-25 CX-5 EPS motor, factory-fitted or swapped in.
- **Settings** `Settings → Steering`{ .zp-path } — Self-Tune,
  Speed-Dependent Self-Tune, and Enforce Torque Lateral Control. Leave
  them on. See [Settings](../settings/index.md#steering).
- **What you will notice** Confident steering at low speed, fewer
  wobbles on the highway, and better steering over your first drives.

</div>

zoompilot reverse-engineered the Mazda steering hardware — the electric
power steering (EPS) motor — and asks it for what it can actually
deliver. The approach is data-driven: every constant is measured, logged,
and validated against thousands of miles of driving.

## The speed-dependent tune

Stock [openpilot](../help/glossary.md#openpilot) uses one lateral acceleration factor for all speeds.
zoompilot encodes the EPS's full torque curve instead. The result is more
confident steering in neighborhoods and fewer wobbles on the highway.

One tune cannot follow the motor across speeds, so zoompilot learns
across **seven distinct speed ranges** and applies the right one for your
current speed.

Self-tune does the learning in the background. Fresh installs on Mazdas
with a 2022-25 CX-5 EPS start from values learned on a real CX-5, so
the car steers well from day one and improves from there.

<div id="zp-torque-live" markdown="1">
![EPS torque response across speed: stock openpilot holds one factor at every speed, while zoompilot keeps a learned tune per band and steps down at the cliff near 32 mph, where the measured EPS scale steps from 1200 to 800 counts](../assets/steering-torque.svg)
</div>

*One corner demand, held constant. Stock openpilot asks for the same
torque at every speed — short of the wheel in parking lots, pushy on the
highway. zoompilot learns a tune per band and rescales exactly at the
cliff. The two response lines are schematic; the cliff position, the
scale step, and the band boundaries are measured. Numbers:
[Lateral tune](../technical/lateral-tune.md).*

## Rate-matched commands

zoompilot asks for the EPS's maximum of **12 units per frame**, up from
stock openpilot's 10. Torque ramps up faster, so the car reacts to
curves sooner.

## Factory-matched specs

The steering ratio, vehicle mass, wheelbase, and lag are set to Mazda's
real figures, then refined against driving data.

## Steering to zero

On a 2022-25 CX-5 EPS motor — factory-fitted, or swapped into an older
Mazda — zoompilot steers down to 0 mph. [Fingerprinting](../help/glossary.md#fingerprint) identifies the
motor either way. See [Supported cars](../getting-started/supported-cars.md).

## Design details

The full evidence and design record lives in the technical section:

- [Mazda lateral: evidence and design notes](../technical/mazda-lateral.md)
- [Lateral tune: v2 torque controller](../technical/lateral-tune.md)
- Tempted to tune by hand? Read [Custom tune](../settings/custom-tune.md)
  first.
