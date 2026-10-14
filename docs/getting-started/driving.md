---
title: Driving
type: reference
description: How to turn zoompilot's steering and cruise on and off on a Mazda, what zoompilot adds to the screen, and how updates work.
---

# Driving

On zoompilot, steering and cruise turn on and off separately. Brake and
CANCEL stop cruise but leave steering on. Main cruise off turns both off.
{ .zp-lede }

## engage

1. **Turn the main cruise switch on.** Steering engages when the car and device are ready.
2. **Set cruise.** Cruise holds the selected speed.

Steering still depends on the car's minimum speed, its lane-keeping switch,
and the device showing it available. An older Mazda EPS stops assisting
below about 28 mph (45 km/h). Cruise keeps your car's own minimum-speed and
stop-and-go limits.

## take over

| You do | Steering | Cruise |
| --- | --- | --- |
| Press the brake | Stays on | Cancels |
| Press CANCEL | Stays on | Cancels |
| Turn the main cruise switch off | Turns off | Turns off |

Resume cruise with the car's normal resume control. Steer and brake
yourself whenever you need to; don't wait for an alert or a button.

### mads settings

MADS (Modular Assistive Driving System) controls this, under
**Settings → Steering** (comma 4: the **mads** submenu). The table assumes
the defaults. **Steering on brake** can be remain (default), pause or
disengage; pause resumes steering when you let go of the brake.

### Mazda TJA button

If your car has the physical TJA button, **Mazda TJA Button** (default off)
makes it the only steering switch:

- TJA turns steering on and off.
- Main cruise controls cruise only. Turning it off leaves steering on.
- To turn both off, turn cruise off and press TJA.

Leave it off unless you want separate controls. It can only be changed
while parked.

### other cars

Buttons and minimum speeds vary, and your car may limit the MADS settings.
Don't assume the Mazda table applies.

## on screen

[comma's docs](https://docs.comma.ai) cover the standard screen and device
use. zoompilot adds:

- **Steering and cruise show separately.** A set speed doesn't mean steering is on.
- **Set speed can change on its own.** [Slow for Curves](../features/smart-cruise.md)
  lowers it for a curve and restores it after.
  [Speed Limit Assist](../features/speed-limit-assist.md) can set it to
  the speed limit; its prompt names the new speed and the button that
  confirms it. Accept only when it's safe. On comma 4, the Information and
  Warning modes don't show the same sign display as comma 3X.
- **Torque bar (Mazda).** Turns amber before steering reaches its limit.
  Be ready to steer.
- **Driving Model Loading** shows while the model starts. Wait until
  assistance is available.
- **Alerts.** zoompilot filters known false Mazda steering alerts, so treat
  any alert that does appear as real. **TAKE CONTROL** means take over now.
  [Sensors and alerts](../features/sensors-and-alerts.md).
- **Jetlink icon** on the home button. Pulsing: a model is downloading or
  preparing. Green: ready when parked, active when driving. Orange: read
  the alert. [Using Jetlink](../jetlink/using-jetlink.md).

## updates

`zoompilot/main` is the release. Update from **Settings → Software** while
parked on Wi-Fi; a normal update doesn't need a reset. If a Jetlink release
changes the protocol, update the comma and Jetlink together
([Jetlink updates](../jetlink/releasing.md)).

To switch software, save your settings and upload any recordings you
need, use the uninstall/reset option under **Settings → Software**, then
install the other software.
