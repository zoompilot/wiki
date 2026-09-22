---
title: What is zoompilot?
type: path
description: zoompilot is free driver-assistance software for Mazda cars. What it is, what it adds, and who makes it.
reviewed: 2026-09-09
---

# What is zoompilot?

zoompilot is free, open-source software that helps your Mazda steer and
manage its cruise speed while you drive. You stay the driver: your
hands stay ready on the wheel, and your eyes stay on the road.
{ .zp-lede }

[zoompilot](https://zoompilot.ai) is a Mazda-optimized fork of
[sunnypilot](https://sunnypilot.ai), which is itself a fork of
[openpilot](https://comma.ai) by comma.ai. A fork starts as a copy of
its parent project, keeping everything the parent has and making its
own changes on top. zoompilot runs on a [comma device](hardware.md) or
an identical clone.

<div class="zp-glance" markdown>

- **openpilot** The base: driver-assistance software by comma.ai that
  steers within your lane and manages speed on many car brands.
- **sunnypilot** A community version of openpilot with extra features.
  zoompilot's direct parent.
- **zoompilot** sunnypilot, plus work made for Mazdas — the changes
  listed below.

</div>

## zoompilot changes

zoompilot keeps openpilot's [safety model](../safety.md) and adds
Mazda-specific work. Today it spans:

1. [**Steering**](../features/steering.md) — the full torque curve of the
   2022-25 CX-5 electric power steering (EPS) motor, learned across
   seven speed ranges. The EPS is the motor that turns the front wheels.
2. [**Alerts**](../features/alerts.md) — known false Mazda alerts are
   gone. Real faults stay active.
3. [**Cruise**](../features/smart-cruise.md) — three features adjust your
   set speed as you drive: Smart Cruise slows for curves, Speed-Limit
   Assist adjusts to speed limit signs, [ICBM](../features/icbm.md)
   presses the cruise buttons. They come from sunnypilot, and zoompilot
   fixes them for Mazda.
4. [**Sensors**](../features/sensor-readouts.md) — the forward radar,
   blind-spot monitors, and traffic sign recognition are wired into
   openpilot.
5. [**Alpha longitudinal**](../features/alpha-longitudinal.md) —
   zoompilot controls gas and brakes instead of the stock Mazda radar
   cruise control. Work in progress, disables Automatic Emergency
   Braking and Forward Collision Warnings.

Every feature has its own page — see [Features](../features/index.md).

## Contributors

zoompilot is a community project.
[@zephleggett](https://github.com/zephleggett) (ariste) is the lead
developer and maintainer of zoompilot. The source lives at
[github.com/zoompilot/zoompilot](https://github.com/zoompilot/zoompilot).
Full credits are on the [About & credits](../community/about.md) page.

<div class="zp-next" markdown>

- [Will it work on my car?](supported-cars.md)
  The Mazdas zoompilot runs on
- [How zoompilot works](how-it-works.md)
  One drive, from camera to wheels

</div>
