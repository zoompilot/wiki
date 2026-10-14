---
title: Steering improvements
type: feature
---

# Steering improvements

zoompilot learns how supported cars respond at different speeds to help
them steer more consistently. Mazda also gets enhanced tuning matched
to its steering hardware.
{ .zp-lede }

## which cars benefit

Speed-dependent learning works on supported cars using torque-based
steering control. It learns the response at different speeds instead
of using one average for the whole drive. It is not limited to Mazda.

Cars that control steering by angle use a different system. This
particular torque-learning feature does not apply to them.

## what you need to do

On supported Mazdas, leave **Settings → Steering → Self-Tune** and
**Enforce Torque Lateral Control** on. Speed-dependent learning runs with
Self-Tune; there is no separate switch for it.

On other brands, check that torque control and Self-Tune are available
and enabled before expecting these improvements. Keep custom tuning
and manual real-time tuning off for normal use.
[Recommended settings](../settings/recommended.md).

## what you may notice

- More steering assistance at low speeds where the motor allows it.
- Fewer small corrections on the highway.
- Steering that adapts over the first few drives.

The car still limits how much steering assistance is available. Steer
through sharp curves yourself whenever needed.

## steering at low speed

A compatible Mazda EPS (2022+) can assist down to a stop. An older EPS
stops assisting below about 28 mph (45 km/h), even though it gets the
steering tune at higher speeds.

A model year alone does not identify every steering motor. zoompilot
checks the car's hardware and firmware. [Check your car](../getting-started/supported-cars.md).

## how it learns

Self-Tune learns the steering response across seven speed ranges. Small
and large driving models keep separate tunes. You do not need to copy
values between models or adjust them by hand.

If steering feels wrong, take control and check
[Troubleshooting](../help/troubleshooting.md#steering-feels-weak-or-wobbly).

<details markdown="1">
<summary>Measurements and controller design</summary>

[Steering evidence](../technical/steering.md) ·
[Torque tuning](../technical/steering.md#the-steering-tune) ·
[Custom tuning](../settings/custom-tune.md)

</details>
