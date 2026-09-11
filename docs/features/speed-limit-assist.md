---
title: Speed-Limit Assist
type: feature
description: Speed-Limit Assist reads speed limits from signs and maps, shows them, and can set your cruise speed to match.
reviewed: 2026-09-06
---

# Speed-Limit Assist (SLA)

Speed-Limit Assist knows the speed limit where you are driving — from
signs and from map data. It can show the limit, warn you, or set your
cruise speed to match it.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Status** Out of the box it shows the limit (Information mode).
- **Works on** Every supported Mazda.
- **Settings** `Settings → Cruise → Speed Limit Assist Mode`{ .zp-path }
  — Off, Information, Warning, or Assist. Assist changes your set speed
  and needs [ICBM](icbm.md) or [alpha longitudinal](alpha-longitudinal.md). The source and
  offset settings sit next to it — see
  [Settings](../settings/index.md#cruise).
- **Needs** Reading speed signs needs the nav SD card. See
  [What you need](../getting-started/hardware.md).

</div>

Speed-Limit Assist adjusts your cruise speed automatically when you pass
a speed sign. You confirm the change, or let it stick — the behavior is
configurable.

## Where speed limits come from

SLA has two data sources:

- **Speed sign reading** — the LKAS camera reads speed signs. This
  requires a **nav SD card**. See [Hardware](../getting-started/hardware.md).
- **OpenStreetMap data** — speed limits from the map, used with or
  instead of sign reading.

You can add a positive or negative offset, so the car targets a speed
above or below the limit.

## How confirmation works

Confirming a speed limit is one tap, and the answer sticks. While you are
still deciding, a speed limit prompt does not nudge your set speed. This
is part of the unified cruise rewrite: see
[Smart Cruise](smart-cruise.md).

## Design details

- The SLA state machine and its interaction with ICBM:
  [Cruise arbiter](../technical/cruise-arbiter.md)
- How SLA publishes targets to the planner:
  [Curve and limit speed planning](../technical/scc-curve-planning.md)
