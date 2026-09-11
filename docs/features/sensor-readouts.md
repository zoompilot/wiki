---
title: Sensor readouts
type: feature
description: The Mazda radar, blind-spot monitors, and speed-sign camera that zoompilot wires into openpilot.
reviewed: 2026-09-09
---

# Sensor readouts

Your Mazda already has a forward radar, blind-spot monitors, and a
camera that reads speed-limit signs. zoompilot lets [openpilot](../help/glossary.md#openpilot) use them.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Works on** Supported Mazdas with these sensors fitted.
- **Settings** Blind-spot warnings on the device screen:
  `Settings → Visuals → Show Blind Spot Warnings`{ .zp-path }, off out
  of the box. Waiting for a clear blind spot before an automatic lane
  change: `Settings → Steering → Auto Lane Change: Delay with Blind Spot`{ .zp-path }.
- **Needs** Speed-sign reading needs the nav SD card.

</div>

Supported Mazdas carry sensors that the stock openpilot port ignores.
zoompilot wires them in.

## Forward radar

zoompilot reads the stock forward radar and shows what it sees: distance,
angle, and closing speed for **up to four cars ahead**. This gives you
visibility into what the radar cruise is tracking.

## Blind-spot monitors

The factory blind-spot monitor data is fed into openpilot. It is used for
optional safety checks on automatic lane changes, so a lane change is not
attempted into an occupied blind spot.

## Speed-limit signs

The LKAS camera reads speed-limit signs and feeds them to
[Speed-Limit Assist](speed-limit-assist.md). This requires a nav SD card.
See [Hardware](../getting-started/hardware.md).

!!! note "Radar and alpha longitudinal"

    If you enable [alpha longitudinal](alpha-longitudinal.md), the car's
    radar is turned off. The radar readouts above do not apply in that
    mode, and [AEB](../help/glossary.md#aeb) and forward collision warning are disabled.
