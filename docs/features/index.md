---
title: Using the features
type: hub
---

# Using the features

Start with the defaults. Add a feature when there's something you want
the car to do differently.
{ .zp-lede }

## already working

[Steering improvements](steering.md) learn how your car responds at
different speeds. Supported Mazdas have torque control and Self-Tune on
by default, along with a tune matched to the steering motor.

Mazda [sensors and alert fixes](sensors-and-alerts.md) run automatically
where the car has the equipment. You don't need to enable a package of
Mazda tweaks.

## things to try

| If you want… | Use… |
| --- | --- |
| Cruise to slow before bends and return to your speed afterward | [Slow for Curves](smart-cruise.md) |
| Cruise to follow detected speed limits | [Speed-Limit Assist](speed-limit-assist.md) |
| Less abrupt lane changes | [Lane Change Smoothing](lane-changes.md) |
| A gentle pull toward the middle of the lane | [Lane Center Assist](lane-center.md) (alpha) |

These work with Mazda radar cruise. You don't need Alpha Longitudinal
for them. Other brands keep sunnypilot's vehicle-specific support.

## model-controlled gas and brakes

[Alpha Longitudinal](alpha-longitudinal.md) lets the driving model handle
acceleration and braking. On Mazda it disables
radar, automatic emergency braking and forward collision warning. Read
the tradeoffs before enabling it; the steering improvements don't need it.

[Set Speed Assist](alpha-longitudinal.md#set-speed-assist), on by
default, helps the model reach your set speed and your chosen following
distance.

[Jetlink](../jetlink/index.md) runs larger driving models on a connected
computer or phone. It's optional, and can also be used while keeping
Mazda radar cruise.
