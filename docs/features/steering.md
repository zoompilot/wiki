---
title: Steering improvements
type: feature
---

# Steering improvements

zoompilot learns how your car steers at each speed, so it steers more
consistently. Mazdas also get torque limits and a tune matched to their
steering motor.
{ .zp-lede }

## speed-dependent steering

Self-Tune learns your car's steering response and friction for each speed
range and blends them as you drive. Steering adapts over the first few
drives. It works only on cars with torque-based steering. Small and large driving models keep separate tunes.

On a supported Mazda, torque control and Self-Tune are on by default. Leave them on: **Settings → Steering →
torque control** (comma 3X: **Customize Torque Params**). Speed-dependent
learning runs with Self-Tune and has no switch of its own. On other
brands, check that both are available and on.

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

## on Mazda

zoompilot matches its torque limits to the Mazda steering motor's
capacity and uses its own tune (v2.0 for small models). Expect more
assistance at low speed and fewer small corrections on the highway. The
motor still has a limit; steer through sharp curves yourself.

A compatible Mazda EPS (2022+) can assist down to a stop. An older EPS
gets the same tune but stops assisting below about 28 mph (45 km/h).
Model year alone does not identify the motor; zoompilot checks the car's
hardware and firmware. [Check your car](../getting-started/supported-cars.md).

If steering feels wrong, see
[troubleshooting](../help/troubleshooting.md#steering-feels-weak-or-wobbly).

## custom tune

Almost nobody needs this. Leave **Enable Custom Tuning** and **Manual
Real-Time Tuning** off and let Self-Tune learn.

- **Enable Custom Tuning** starts from your own **Lateral Acceleration
  Factor** and **Friction** instead of the car's defaults. Self-Tune still
  learns from there. Higher lateral acceleration steers with less torque;
  higher friction adds torque for small corrections.
- **Manual Real-Time Tuning** steers with your values at every speed,
  ignoring Self-Tune. Changes apply within seconds, even while driving.

Both are under **Settings → Steering** (comma 4: **torque control →
custom tune**). They can make steering worse; to undo, park and turn both
off.

[How steering learns](../technical/steering.md#the-steering-tune)
