---
title: Experimental speed control
type: feature
---

# Experimental speed control

Alpha Longitudinal lets zoompilot control acceleration and braking
instead of Mazda's own radar cruise. It is experimental and off by default.
{ .zp-lede }

!!! danger "Emergency braking and collision warning are disabled"

    Alpha Longitudinal turns off the Mazda radar. Automatic Emergency
    Braking (AEB) and Forward Collision Warning (FCW) stop working while
    it is enabled. You must be ready to steer and brake at all times.

The normal setup uses the car's own cruise control and supports Slow for
Curves and Speed-Limit Assist. Only try Alpha Longitudinal if you accept
losing the safety features above.

## compatible cars

The current software requires a compatible Mazda EPS (2022+), which can
assist down to a stop, and a supported radar version. An EPS swap may
provide this on an older Mazda. Model year alone is not enough; zoompilot
checks the fitted hardware before offering the setting.

[Check your car](../getting-started/supported-cars.md). Do not force a
different vehicle selection to expose the setting.

## enable while parked

1. Open **Settings → Cruise**.
2. On **comma 4**, open **alpha longitudinal**. On **comma 3X**, the controls are at the top of Cruise.
3. Enable **Alpha Longitudinal** and read the confirmation in full.
4. Let the device restart and finish setup. Follow any **Remain parked** message and wait until it is ready.

## choose the driving behaviour

The related controls are in the same Cruise section:

| Setting | What it does |
| --- | --- |
| Experimental Mode | Lets the driving model plan acceleration and braking, including responses to lights and signs. Mistakes should be expected; the set speed is an upper bound. |
| Dynamic Experimental Control | Switches between normal and Experimental Mode behaviour automatically. |
| Speed Assist | Can gently raise speed toward the set speed when the road ahead is clear. Off by default. |
| Lead Follow Assist | Can reduce an unnecessarily large gap behind a steady car toward the selected following distance. Off by default. |

Speed Assist and Lead Follow Assist have no effect while Dynamic
Experimental Control is on. Leave the optional assists off while first
learning the mode.

## limitations

The model may drive below the set speed, miss a stop, or handle a
lead car incorrectly. Do not rely on it to stop for a light or sign.
Be ready to brake yourself, including after stopping.

## turn it off

Park, open the same Cruise section, and disable Alpha Longitudinal.
Let the restart finish. If the car's cruise or radar remains unavailable,
follow [dashboard-error troubleshooting](../help/troubleshooting.md#dashboard-errors-cruise-lkas-or-radar).
Do not assume the radar has recovered while a fault remains.

[Technical design](../technical/speed-control.md) · [Credits](../community/about.md#zoompilot-contributors)
