---
title: Sensors and alerts
type: feature
---

# Sensors and alerts

On a Mazda, zoompilot reads the car's blind-spot, speed-limit and radar
data, and filters known false steering alerts while keeping real faults.
What you get depends on fitted equipment. It all runs automatically.
{ .zp-lede }

## blind spots

Blind-spot information feeds the lane-change system. For an on-screen
warning too, turn on **Settings → Visuals → Show Blind Spot
Warnings**. Lane-change settings that use it are under **Settings →
Steering**.

## speed-limit signs

With a navigation SD card fitted, a supported Mazda supplies speed limits
from its camera/navigation system. Choose **Car** or a source
priority that uses car data in
[Speed-Limit Assist](speed-limit-assist.md#choose-a-source). Downloaded
maps are a separate source and don't need the SD card.

## forward radar

zoompilot reads radar tracks where available; some older radars supply
none. Not every device shows radar targets.
[Alpha Longitudinal](alpha-longitudinal.md) turns the radar off.

## false alert fixes

Some Mazda standby states and rough-road torque spikes used to look like
a steering fault or driver override and interrupt assistance. zoompilot
checks the reported state and the steering response before treating
them as a fault. Driver attention checks stay active.

Treat every alert as real and follow it. **TAKE CONTROL** means
take over immediately. If a fault returns, stop using assistance and
investigate while parked, starting with
[troubleshooting](../help/troubleshooting.md).

[How steering blocks are handled](../technical/steering.md#when-the-car-blocks-steering)
· [Radar readouts](../technical/speed-control.md#radar-readouts)
