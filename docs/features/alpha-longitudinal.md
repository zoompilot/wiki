---
title: Alpha Longitudinal
type: feature
description: When to use Experimental Mode instead of Mazda radar cruise, what is already configured, and how to switch back.
---

# Alpha Longitudinal

Alpha Longitudinal lets zoompilot handle gas and brakes instead of Mazda
radar cruise. Use it if you want to try Experimental Mode, where the
driving model can respond to traffic lights and stop signs. It can miss
them, so be ready to brake.
{ .zp-lede }

!!! danger "Mazda radar and emergency braking are disabled"

    Alpha Longitudinal turns off Mazda's radar, automatic emergency braking
    (AEB) and forward collision warning. They stay off even if you turn
    Experimental Mode off.

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

**In the next release**, Experimental Mode, Speed Assist and Lead Follow
Assist are on by default. On an older release, check those switches in
the same Cruise section. If it still has Dynamic Experimental Control,
turn that off to use the assists.

## choose the driving behaviour

I recommend leaving Experimental Mode and both assists on. The model
handles acceleration and braking, including attempts to stop for lights
and signs. Your set speed is a maximum, not a promise that it will drive
at that speed.

Performance depends on the driving model. It may miss a stop, follow
poorly, or move forward again after stopping. Keep watching the road and
be ready to take over.

### speed assist

Helps Experimental Mode reach your set speed on a clear road. It backs
off for planned stops, bends and slowdowns. It does not force the model
to reach the set speed in every situation.

### lead follow assist

Helps close an unnecessarily large gap behind a steady car. Your
**Driving Personality** sets the following distance. It backs off when
the lead changes or slows; stop-and-go remains the model's job.

### assist settings { #turn-on-the-assists }

Both switches are in the same Cruise section. They need Experimental
Mode. You can turn either off if you prefer; new installs on the next
release already have them on.

[How the assists work](../technical/experimental-mode-assists.md)

## turning Experimental Mode off

zoompilot keeps this choice. Use the Experimental Mode switch in the UI,
long-press the home screen on comma 4, or long-press your car's
follow-distance button.

With Experimental Mode off, Alpha Longitudinal behaves more like ordinary
cruise, using vision instead of Mazda's radar. If that is what you want,
I would keep Mazda radar cruise rather than give up radar and AEB for it.
Turning Experimental Mode off does **not** turn Alpha Longitudinal off.

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
