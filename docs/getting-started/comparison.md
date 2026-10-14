---
title: Coming from openpilot or sunnypilot?
type: explanation
description: You can keep your supported hardware. zoompilot builds on sunnypilot, with speed-dependent steering learning across supported cars and additional Mazda tuning and cruise work.
---

# Coming from openpilot or sunnypilot?

You can keep your supported hardware. zoompilot builds on sunnypilot,
with speed-dependent steering learning across supported cars and
additional Mazda tuning and cruise work.
{ .zp-lede }

## what changes for you

| Area | What to expect in zoompilot |
| --- | --- |
| Steering | Speed-dependent learning on supported torque-steering cars; Mazda also gets tuning matched to its steering hardware. |
| Low-speed steering on Mazda | Compatible steering firmware can assist down to a stop. Older firmware still has a minimum speed. |
| Cruise | Optional Slow for Curves and Speed-Limit Assist. Cruise-button control starts automatically when a feature needs it. |
| Lane changes | Optional smoothing and road-edge checks. |
| Controls | With the default steering settings, cancelling cruise or pressing the brake leaves steering active. |
| Models | Keep the default model for your first drive. Jetlink is an optional way to run larger models. |

Coming from sunnypilot? Many controls will be familiar. The cruise-button
system no longer has its own ICBM switch, and Slow for Curves is the name
used for Smart Cruise. Speed-dependent learning follows Self-Tune.

Coming from openpilot? Read the [steering and cruise controls](../using-zoompilot/controls.md)
before driving. Steering can remain active independently of cruise.

## what stays your responsibility

zoompilot does not drive for you. Check traffic and blind spots, choose a
safe speed, and take over whenever needed. Assistance varies by car.
[Check your car](supported-cars.md) before switching.

!!! danger "Experimental speed control on Mazda"

    Alpha Longitudinal is optional and off by default. It disables the
    car's automatic emergency braking and forward collision warning.
    You do not need it for the normal setup.

## switch software

A factory reset is recommended when moving from another project. Save
your settings and any recordings you need first.

[Install zoompilot →](install.md#switching-from-other-software)

For engineering comparisons and measurements, see
[Technical notes](../technical/index.md).
