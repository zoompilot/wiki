---
title: Recommended settings
type: reference
---

# Recommended settings

Keep the default model and learned steering for your first drive.
Afterward, add optional features one at a time while parked.
{ .zp-lede }

## keep the basics

| Setting | Recommendation |
| --- | --- |
| Driving model | Keep the default model, Firehose. |
| Mazda torque control and Self-Tune | Leave on. The Mazda defaults are applied when the car is identified. |
| Custom tuning and Manual Real-Time Tuning | Leave off. |
| Driver monitoring | Keep active and make sure the camera can see your face. |
| Alpha Longitudinal | Leave off for the initial setup. |

Speed-dependent steering learning follows Self-Tune automatically. You do
not need to find a separate switch or enter tuning values.

## optional settings to try next

These are the extra settings Zeph recommends on the website. They are
off by default; you can leave them off if you prefer the normal behaviour.

| You want | Where to look | Before enabling |
| --- | --- | --- |
| Slower cruise speed for curves | Cruise → Slow for Curves: Vision | Read [how it works and its limits](../features/smart-cruise.md). |
| Curve slowdowns using maps | Cruise → Slow for Curves: Map | Download your region through sunnylink. |
| Slower lane changes | Steering → Lane Change Smoothing | Choose a pace and [check lane-change limits](../features/lane-changes.md). |
| A check against lane changes toward the road edge | Steering → Block Lane Change: Road Edge Detection | It depends on the model detecting the edge correctly. |

Automatic cruise-button control starts when a feature needs it. There is
no ICBM switch to enable.

## other options

[Speed-Limit Assist](../features/speed-limit-assist.md),
[experimental speed control](../features/alpha-longitudinal.md), and
[Jetlink](../jetlink/index.md) each have their own guide. None is required
for normal setup.

[All settings →](index.md) · [First drive](../getting-started/first-drive.md)
