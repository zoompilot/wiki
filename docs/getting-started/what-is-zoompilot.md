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

## What zoompilot changes

zoompilot keeps openpilot's [safety model](../safety.md) and adds
Mazda-specific work. Today it spans:

1. **Steering** — the full torque curve of the 2022-25 CX-5 EPS, learned
   across seven speed ranges. Known false Mazda alerts are gone. Real
   faults stay active. See [Steering improvements](../features/steering.md)
   and [Alert fixes](../features/alerts.md).
2. **Cruise** — three features work together on your set speed:
   [ICBM](../features/icbm.md), Speed-Limit Assist, and Smart Cruise. See
   [Smart Cruise](../features/smart-cruise.md).
3. **Sensors** — the forward radar, blind-spot monitors, and speed-limit
   signs are wired into openpilot. See
   [Sensor readouts](../features/sensor-readouts.md).
4. **Alpha longitudinal** — openpilot drives gas and brakes instead of the
   stock radar cruise. Work in progress, with real trade-offs. See
   [Alpha longitudinal](../features/alpha-longitudinal.md).

Every feature has its own page — see [Features](../features/index.md).

## Who builds it

zoompilot is a community project. Alex Frutkin
([@yummydirt](https://github.com/yummydirt)) did the reverse engineering
and implementation for alpha longitudinal. Contributors including
[@mzdnick](https://github.com/mzdnick) added VIN and EPS fingerprinting.
The source lives at [github.com/zoompilot/zoompilot](https://github.com/zoompilot/zoompilot).
Full credits are on the [About & credits](../about.md) page.
