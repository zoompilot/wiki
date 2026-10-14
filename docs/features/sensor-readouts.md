---
title: Mazda sensors
type: feature
---

# Mazda sensors

zoompilot reads supported Mazda sensor information, including blind-spot
status and speed limits. Availability depends on the equipment fitted.
{ .zp-lede }

## blind spots

Blind-spot information can be used by the lane-change system. Optional
screen warnings live under **Settings → Visuals → Show Blind Spot Warnings**.
Related lane-change settings are under **Settings → Steering**.

Always check the lane yourself; a clear indicator cannot prove it is safe.

## speed-limit signs

A supported Mazda can supply speed limits from its own camera/navigation
system when a navigation SD card is fitted. Choose **Car** or a source
priority using car data in [Speed-Limit Assist](speed-limit-assist.md).

Downloaded maps are a separate source and do not require Mazda's SD card.

## forward radar

zoompilot reads radar tracks where supported; some older radars supply
none. Radar-target displays are not available on every device.

!!! danger "Experimental speed control"

    Alpha Longitudinal turns the Mazda radar off. Automatic emergency
    braking and forward collision warning stop working while it is on.

[Feature overview](index.md) · [Technical notes](../technical/speed-control.md#radar-readouts)
