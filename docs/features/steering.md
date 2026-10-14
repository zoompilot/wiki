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
steering control. Cars that steer by angle use a different system.

## what you need to do

On supported Mazdas, torque control and self-tune are on by default. Leave
them on: **Settings → Steering → torque control** (comma 3X: **Customize
Torque Params**). Speed-dependent learning runs with self-tune; there is no
separate switch for it.

<div class="zp-setting-shots" markdown="0">
<figure class="setting-shot settings-figure-mici">
  <div class="zp-shot-imgs">
    <img src="../../assets/settings/features/mici/torque-control.png" alt="enable torque control, on" width="640" height="300" loading="lazy">
    <img src="../../assets/settings/features/mici/self-tune.png" alt="enable self-tune, on" width="640" height="300" loading="lazy">
    <img src="../../assets/settings/features/mici/tune-version.png" alt="tune version small models, v2.0" width="640" height="300" loading="lazy">
  </div>
  <figcaption><span class="zp-shot-device">comma 4: </span>Settings → Steering → torque control</figcaption>
</figure>
<figure class="setting-shot settings-figure-tici">
  <div class="zp-shot-imgs">
    <img src="../../assets/settings/features/tici/torque-control.png" alt="Enforce Torque Lateral Control, on" width="1000" height="105" loading="lazy">
    <img src="../../assets/settings/features/tici/self-tune.png" alt="Self-Tune, on" width="1000" height="105" loading="lazy">
    <img src="../../assets/settings/features/tici/tune-version.png" alt="Torque Control Tune Version (Small Models), v2.0" width="1000" height="105" loading="lazy">
  </div>
  <figcaption><span class="zp-shot-device">comma 3X: </span>Settings → Steering → Customize Torque Params</figcaption>
</figure>
</div>

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

Small and large driving models keep separate learned tunes; no manual
transfer is needed.

If steering feels wrong, take control and check
[Troubleshooting](../help/troubleshooting.md#steering-feels-weak-or-wobbly).

[How steering learns](../technical/steering.md#the-steering-tune)
