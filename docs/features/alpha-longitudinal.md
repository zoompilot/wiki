---
title: Experimental speed control
type: feature
---

# Experimental speed control

Alpha Longitudinal lets zoompilot control acceleration and braking
instead of Mazda's own radar cruise. That enables Experimental Mode,
which can stop for lights and signs. It is experimental and off by default.
{ .zp-lede }

!!! danger "Emergency braking and collision warning are disabled"

    Alpha Longitudinal turns off the Mazda radar. Automatic Emergency
    Braking (AEB) and Forward Collision Warning (FCW) stop working while
    it is on. Be ready to steer and brake at all times.

You don't need it for Slow for Curves or Speed-Limit Assist; both work
with the car's own cruise.

## compatible cars

It needs a compatible Mazda EPS (2022+), which can assist down to a stop,
and a supported radar version. An older Mazda may qualify after an EPS
swap. zoompilot checks the fitted hardware before offering the setting.
[Check your car](../getting-started/supported-cars.md). Do not force a
different vehicle selection to expose it.

## enable while parked

1. Open **Settings → Cruise**.
2. On **comma 4**, open **alpha longitudinal**. On **comma 3X**, the controls are at the top of Cruise.
3. Enable **Alpha Longitudinal** and read the confirmation.
4. Let the device restart and finish setup, following any **Remain parked** message.

<div class="zp-setting-shots" markdown="0">
<figure class="setting-shot settings-figure-mici">
  <div class="zp-shot-imgs">
    <img src="../../assets/settings/features/mici/alpha-longitudinal.png" alt="alpha longitudinal, on" width="640" height="300" loading="lazy">
    <img src="../../assets/settings/features/mici/speed-assist.png" alt="speed assist, off" width="640" height="300" loading="lazy">
    <img src="../../assets/settings/features/mici/lead-follow-assist.png" alt="lead follow assist, off" width="640" height="300" loading="lazy">
  </div>
  <figcaption><span class="zp-shot-device">comma 4: </span>Settings → Cruise → alpha longitudinal</figcaption>
</figure>
<figure class="setting-shot settings-figure-tici">
  <div class="zp-shot-imgs">
    <img src="../../assets/settings/features/tici/alpha-longitudinal.png" alt="Alpha Longitudinal, on" width="1000" height="105" loading="lazy">
    <img src="../../assets/settings/features/tici/speed-assist.png" alt="Experimental Mode Speed Assist, off" width="1000" height="105" loading="lazy">
    <img src="../../assets/settings/features/tici/lead-follow-assist.png" alt="Experimental Mode Lead Follow Assist, off" width="1000" height="105" loading="lazy">
  </div>
  <figcaption><span class="zp-shot-device">comma 3X: </span>Settings → Cruise</figcaption>
</figure>
</div>

## choose the driving behaviour

The related controls are in the same place:

| Setting | What it does |
| --- | --- |
| Experimental Mode | The driving model plans acceleration and braking, including stops for lights and signs. The set speed is a maximum. |
| Dynamic Experimental Control | Switches between chill and Experimental Mode on its own, using Experimental Mode for stops and slowdowns. |
| Driving Personality | Sets the following distance and the gas and brake style. |

The model may drive below the set speed, miss a stop, or handle a lead
car badly. Do not rely on it to stop for lights or signs; be ready to
brake, even after stopping.

## speed assist

In Experimental Mode the model often drives below your set speed on a
clear road. Speed Assist raises it toward your set speed, or a lower limit
from Slow for Curves or Speed-Limit Assist. Turn it on if Experimental
Mode feels slow on open roads.

It works only with no car ahead. It drops the added speed a few
seconds before a planned bend, stop or slowdown, and never adds
speed that would take a bend past 1.0 m/s² of sideways acceleration. With
some driving models it closes only part of the gap.

## lead follow assist

Behind a steady car, the model matches its speed but mostly ignores the
gap. Lead Follow Assist closes extra gap down to your Driving Personality
following distance (Aggressive 1.25 s, Standard 1.45 s, Relaxed 1.75 s,
each plus 6 m), never closer than chill mode. Turn it on if
Experimental Mode hangs back too far in traffic. It stands down when the
lead car changes, brakes, is about to slow, or is slower than about
11 mph (18 km/h).

## turn on the assists

Both are off by default. They need Experimental Mode on and Dynamic
Experimental Control off; while it is on, their switches are greyed out.
Turn on **Settings → Cruise → alpha longitudinal → speed assist** and
**lead follow assist** (comma 3X: **Experimental Mode Speed Assist** and
**Experimental Mode Lead Follow Assist** at the top of Cruise). Leave them
off while you learn Experimental Mode.

Both fade in between about 11 mph (18 km/h) and 18 mph (29 km/h), so
stop-and-go stays the model's. Both stay off until 3 s after a collision
warning, a predicted hard brake, a pedal press or a lane change.
[How the assists work](../technical/experimental-mode-assists.md)

## turn it off

Park, open the same Cruise section, and disable Alpha Longitudinal.
Let the restart finish. If the car's cruise or radar stays unavailable,
see [dashboard errors](../help/troubleshooting.md#dashboard-errors-cruise-lkas-or-radar).
Do not assume the radar has recovered while a fault remains.

[How experimental speed control works](../technical/speed-control.md)

Credit: [Alex Frutkin](https://www.linkedin.com/in/alex-frutkin-6380459)
([@yummydirtx](https://github.com/yummydirtx)) did most of the initial
reverse engineering for this feature.
