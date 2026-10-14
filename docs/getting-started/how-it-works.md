---
title: How zoompilot works
type: reference
---

# How zoompilot works

The comma watches the road, a driving model plans a path, and your car
steers and controls speed. You supervise the whole drive.
{ .zp-lede }

## camera and driving model

The comma's road cameras feed a driving model that estimates the road
ahead. [Jetlink](../jetlink/index.md) can run big models on another
computer or phone instead.

## steering

zoompilot asks the power-steering motor for force, within its limits.
Self-Tune learns how the car responds at each speed, and Mazdas get a tune
matched to their steering hardware. An older Mazda EPS
stops assisting below about 28 mph (45 km/h); a compatible Mazda EPS
(2022+) assists down to a stop. [How steering works](../technical/steering.md).

## cruise speed

Normally the Mazda's own radar cruise controls gas and brakes. [Slow for Curves](../features/smart-cruise.md)
(model or downloaded maps) and
[Speed-Limit Assist](../features/speed-limit-assist.md) (limits from the
car or maps) can change the set speed by pressing the cruise buttons for
you. Both are optional.

## experimental speed control

[Alpha Longitudinal](../features/alpha-longitudinal.md) lets zoompilot
accelerate and brake instead. It needs compatible hardware, is off by
default, and disables Mazda's automatic emergency braking and forward
collision warning.

## your role

Watch the road and be ready to steer and brake. Steering can stay on when
you cancel cruise. [How to take over](driving.md#take-over).
