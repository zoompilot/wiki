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

These work with Mazda radar cruise. You don't need Alpha Longitudinal
for them. Other brands keep sunnypilot's vehicle-specific support.

## model-controlled gas and brakes

[Alpha Longitudinal](alpha-longitudinal.md) lets the driving model handle
acceleration and braking in Experimental Mode. On Mazda it disables
radar, automatic emergency braking and forward collision warning. Read
the tradeoffs before enabling it; the steering improvements don't need it.

Experimental Mode comes with Speed Assist and Lead Follow Assist enabled
in the next release. They help it reach your set speed and follow a
steady car at your chosen distance.

[Jetlink](../jetlink/index.md) runs larger driving models on a connected
computer or phone. It's optional, and can also be used while keeping
Mazda radar cruise.
