---
title: Smart Cruise
type: feature
description: Smart Cruise lowers your cruise speed before a curve and brings it back after.
reviewed: 2026-09-05
---

# Smart Cruise (curve speed control)

Cruise control holds one speed, even into a sharp curve. Smart Cruise
looks ahead, lowers your set speed before the curve, and brings your
original speed back after it.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Status** Off out of the box.
- **Works on** Every supported Mazda. With the stock radar cruise
  (MRCC, the default), it changes your set speed through
  [ICBM](icbm.md), so ICBM must be on. With alpha longitudinal,
  zoompilot controls the speed directly.
- **Turn it on** `Settings → Cruise → Smart Cruise Control: Vision`{ .zp-path }
  (curves from the camera) and
  `Settings → Cruise → Smart Cruise Control: Map`{ .zp-path } (curves
  from map data) — see [Settings](../settings/index.md#cruise).
- **Needs** [ICBM](icbm.md) turned on, unless you run alpha
  longitudinal. Map mode also needs the nav SD card. See
  [What you need](../getting-started/hardware.md).
- **What you will notice** The set speed on your dash drops before a
  curve and climbs back after it.

</div>

Smart Cruise reduces your set speed before a curve and resumes your
original speed afterward. It is part of the rebuilt Mazda cruise stack,
together with [ICBM](icbm.md) and
[Speed-Limit Assist](speed-limit-assist.md).

## How it slows for curves

Smart Cruise can use two data sources:

- **Vision** — the driving model estimates the road curvature ahead.
- **Maps** — downloaded map data supplies curve geometry. A map hiccup
  does not trip a false warning.

## Deceleration overshoot

MRCC, the stock radar cruise, is slow to obey a lower set speed: before a
curve the car brakes later than the planner expects and enters the curve
too fast. The optional Deceleration Overshoot toggle compensates — when a
slowdown is coming, zoompilot asks for more deceleration than the model
wants, earlier, so the car gets the deceleration the curve actually needs.

The toggle is marked alpha. If braking into curves feels too strong with
it on, turn the toggle off and report the route in the
[zoompilot Discord](https://discord.gg/jFWkHC2uhh).

## One set speed, one owner

zoompilot rewrote the [sunnypilot](../help/glossary.md#sunnypilot) cruise systems for Mazda so that one
unified system manages your set speed. Speed-limit assist and smart
cruise work the same way whether the stock radar or [openpilot](../help/glossary.md#openpilot) has the gas
and brakes. When a curve or speed zone ends, you get back the exact speed
you set.

## Design details

The full design record is in
[Curve and limit speed planning](../technical/scc-curve-planning.md).
