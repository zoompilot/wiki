---
title: How zoompilot works
type: reference
---

# How zoompilot works

The comma watches the road, a driving model plans a path, and your car
provides steering and speed control. You supervise the whole drive.
{ .zp-lede }

## camera and driving model

The comma has its own road cameras. A driving model uses their images
to estimate the road ahead. Keep the default model for your first drive;
[Jetlink](../jetlink/index.md) is an optional way to run big models on
another computer or phone.

## steering

On torque-steering cars, zoompilot asks the power-steering motor for
steering force. The motor still has limits. Self-Tune learns how the
car responds at different speeds, helping supported cars steer more
consistently. Mazda also gets tuning matched to its steering hardware.

On an older Mazda EPS, steering assistance stops below about 28 mph
(45 km/h). A compatible Mazda EPS (2022+) can assist down to a stop.
[Steering guide](../features/steering.md).

## cruise speed

In the normal Mazda setup, the car's own radar cruise controls the
accelerator and brakes. Optional curve and speed-limit features can
ask it to change the cruise set speed through cruise-button commands.

[Slow for Curves](../features/smart-cruise.md) uses the model or downloaded
maps. [Speed-Limit Assist](../features/speed-limit-assist.md) uses limits
from the car or maps. You choose which features to enable.

## experimental speed control

Alpha Longitudinal lets zoompilot control acceleration and braking
instead. It requires compatible hardware and is off by default.
It disables Mazda's automatic emergency braking and forward collision
warning. [Read its requirements and limitations](../features/alpha-longitudinal.md).

## your role

Keep watching the road and be ready to steer and brake. Assistance can
make mistakes, and steering may stay active when cruise is cancelled.
[Learn the controls](../using-zoompilot/controls.md).

[Technical notes](../technical/index.md) document the detailed design.
