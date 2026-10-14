---
title: Custom steering tuning
type: reference
---

# Custom steering tuning

For normal use, leave custom tuning and manual real-time tuning off.
Self-Tune learns your steering as you drive.
{ .zp-lede }

## check these first

Before changing numbers, check [recommended settings](recommended.md),
your car's [steering limits](../getting-started/supported-cars.md), and
[troubleshooting](../help/troubleshooting.md#steering-feels-weak-or-wobbly).
If steering feels wrong, share a route for review.

## advanced tuning

The torque-control settings let you replace learned values with fixed
steering-response and friction values. Manual Real-Time Tuning can
force those fixed values over learned tuning. Small and large models
keep separate tunes.

Changes can make steering worse. The [technical tuning notes](../technical/steering.md#the-steering-tune)
explain the controller and measurements for experienced testers.

## return to the recommended setup

While parked, turn **Enable Custom Tuning** and **Manual Real-Time Tuning**
off and leave **Self-Tune** on under Settings → Steering (comma 4:
torque control submenu). Check the on-device explanation if a setting
is unavailable.

[Steering guide](../features/steering.md) · [Settings reference](index.md#steering)
