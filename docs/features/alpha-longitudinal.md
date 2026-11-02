---
title: Alpha Longitudinal
type: feature
description: When to let the driving model handle gas and brakes instead of Mazda radar cruise, what Set Speed Assist does, and how to switch back.
---

# Alpha Longitudinal

Alpha Longitudinal lets zoompilot handle gas and brakes instead of Mazda
radar cruise. Use it if you want to try Experimental Mode, where the
driving model can respond to traffic lights and stop signs. It can miss
them, so be ready to brake.
{ .zp-lede }

!!! danger "Mazda radar and emergency braking are disabled"

    Alpha Longitudinal turns off Mazda's radar, automatic emergency braking
    (AEB) and forward collision warning. They stay off for as long as
    Alpha Longitudinal is on.

I usually keep Mazda radar cruise for everyday driving. Slow for Curves
and Speed-Limit Assist work with it too. Alpha Longitudinal is optional
and off by default.

## compatible cars

On Mazda, it needs a compatible Mazda EPS (2022+) and a supported radar
version. The device checks the fitted hardware before offering the
setting. [Check your car](../getting-started/supported-cars.md) if it is
unavailable; don't select a different vehicle to unlock it.

## enable while parked

1. Open **Settings → Cruise → alpha longitudinal** on comma 4. On comma 3X, the controls are at the top of **Cruise**.
2. Enable **Alpha Longitudinal** and read the confirmation.
3. Let setup finish and follow any **Remain parked** message before driving.

The driving model always drives in Experimental Mode; chill mode is gone,
as in openpilot. [Set Speed Assist](#set-speed-assist) is on by default.

## what to expect

The model handles gas and brakes, and tries to stop for lights and signs.
Your set speed is a maximum. The model can miss a stop, follow poorly, or
creep forward after stopping. Watch the road and be ready to take over.

## set speed assist { #set-speed-assist }

The driving model cruises a few mph under your set speed and hangs back
from the car ahead. **Set Speed Assist** closes both gaps at stock cruise
pace, up to your set speed and your **Driving Personality** distance. The
model still handles every slowdown, and stop-and-go below about 11 mph.

On by default. To switch it, hold the follow-distance button, long press
home on the comma 4, or tap the onroad button on the 3X. An alert confirms
each switch, and a gauge icon shows while it is on. The setting is in
**Settings → Cruise** (comma 4: **alpha longitudinal**).

[How Set Speed Assist works](../technical/experimental-mode-assists.md){ #turn-on-the-assists }

## turn it off

To return to Mazda radar cruise, park and disable **Alpha Longitudinal**
in the same Cruise section. Let the change finish. If the switch is
unavailable, see [greyed-out settings](../help/troubleshooting.md#setting-unavailable).

If cruise or radar stays unavailable, follow the
[dashboard-error steps](../help/troubleshooting.md#dashboard-errors-cruise-lkas-or-radar).
Do not assume radar or AEB has recovered while a fault remains.

[How Alpha Longitudinal works](../technical/speed-control.md)

Credit: [Alex Frutkin](https://www.linkedin.com/in/alex-frutkin-6380459)
([@yummydirtx](https://github.com/yummydirtx)) did most of the initial
reverse engineering for this feature.
