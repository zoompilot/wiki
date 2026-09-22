---
title: Features
type: hub
description: What zoompilot adds to your Mazda — steering, cruise, sensors, alert fixes, and the experimental alpha longitudinal mode.
hide:
  - toc
---

# Features

What zoompilot adds to your Mazda, one page per feature. Each page says
what the feature does for you, whether it is on out of the box, and
where its switch is on the device.
{ .zp-lede }

<p class="zp-group">steering</p>

<div class="grid cards" markdown>

- :material-steering: __Steering improvements__ <span class="zp-badge zp-badge--ok">On by default</span>

    ---

    The full torque curve of the 2022-25 CX-5 steering motor, learned
    across seven speed ranges.

    [Open the page](steering.md)

- :material-bell-alert: __Alert fixes__ <span class="zp-badge zp-badge--auto">Automatic</span>

    ---

    Known false Mazda alerts are gone. Real faults stay active.

    [Open the page](alerts.md)

</div>

<p class="zp-group">cruise</p>

<div class="grid cards" markdown>

- :material-road-variant: __Smart Cruise__

    ---

    Slows your set speed before a curve and resumes it after.

    [Open the page](smart-cruise.md)

- :material-speedometer: __Speed-Limit Assist__

    ---

    Shows the speed limit, and can adjust your cruise speed when you
    pass a speed sign. You choose the offset.

    [Open the page](speed-limit-assist.md)

- :material-button-pointer: __ICBM__ <span class="zp-badge zp-badge--alpha">Alpha</span>

    ---

    Runs your cruise set speed through the car's own cruise buttons.

    [Open the page](icbm.md)

</div>

<p class="zp-group">see the road</p>

<div class="grid cards" markdown>

- :material-radar: __Sensor readouts__

    ---

    The forward radar, blind-spot monitors, and speed signs, wired into
    [openpilot](../help/glossary.md#openpilot).

    [Open the page](sensor-readouts.md)

</div>

<p class="zp-group">experimental</p>

<div class="grid cards" markdown>

- :material-car-cruise-control: __Alpha longitudinal__ <span class="zp-badge zp-badge--experimental">Experimental</span>

    ---

    openpilot controls gas and brakes directly, instead of Mazda's stock
    radar cruise. Turns the car's radar, and with it automatic emergency
    braking, off. Work in progress.

    [Open the page](alpha-longitudinal.md)

</div>

## Out of the box

What a fresh install does before you change anything, and what each
feature needs.

| Feature | Out of the box | Needs |
| --- | --- | --- |
| [Steering](steering.md) | On, on Mazdas with a 2022-25 CX-5 EPS | — |
| [Alert fixes](alerts.md) | Always active | — |
| [Smart Cruise](smart-cruise.md) | Off | ICBM on, with the stock radar cruise. Map mode: the nav SD card |
| [Speed-Limit Assist](speed-limit-assist.md) | Information: shows the limit | Sign reading: the nav SD card. Assist mode: ICBM or alpha longitudinal |
| [ICBM](icbm.md) | Off | — (needed by Smart Cruise and Speed-Limit Assist's Assist mode on stock cruise) |
| [Sensor readouts](sensor-readouts.md) | Blind-spot warnings on screen: off | Speed signs: the nav SD card |
| [Alpha longitudinal](alpha-longitudinal.md) | Off | Recommended: a 2022-25 CX-5 EPS |

Every switch behind these features lives on the
[Settings](../settings/index.md) page — searchable, filterable by panel,
with each panel's settings screens for both devices.
