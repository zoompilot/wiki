---
reviewed: 2026-09-09
---

# What is zoompilot?

[zoompilot](https://zoompilot.ai) is a Mazda-optimized fork of
[sunnypilot](https://sunnypilot.ai), which is itself a fork of
[openpilot](https://comma.ai) by comma.ai. A fork starts as a copy of
its parent project, keeping everything the parent has and making its
own changes on top. zoompilot runs on a [comma device](hardware.md) or
an identical clone.

## zoompilot changes

zoompilot keeps openpilot's [safety model](../safety.md) and adds
Mazda-specific work. Today it spans:

1. [**Steering**](../features/steering.md) — the full torque curve of the
   2022-25 CX-5 EPS, learned across seven speed ranges.
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
Full credits are on the [About & credits](../about.md) page.
