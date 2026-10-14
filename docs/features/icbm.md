---
title: Automatic cruise-button control
type: feature
---

# Automatic cruise-button control

zoompilot can send cruise-button commands to your car to change its set
speed. This system is called ICBM. It runs automatically when needed.
{ .zp-lede }

## no separate setup

On a compatible car, ICBM starts when a feature needs it:

- Slow for Curves while the car's own cruise controls acceleration and braking.
- Speed-Limit Assist in Assist mode.
- Custom cruise-speed increments.

There is no ICBM on/off switch. Enable the feature you want while parked.

## what you will notice

The dashboard set speed changes as if you had pressed the steering-wheel
buttons. After a curve, zoompilot restores your original set speed.
Press a speed button yourself to interrupt an automatic adjustment.

To stop automatic changes, turn off the features requesting them.
[Steering and cruise controls](../using-zoompilot/controls.md) explains how
to cancel cruise or turn all assistance off.

## custom button steps

Under **Settings → Cruise**, open **custom increments** on comma 4, or
**Custom ACC Speed Increments** on comma 3X. You can choose how far a
short press or held press changes the set speed.

[Slow for Curves](smart-cruise.md) ·
[Speed-Limit Assist](speed-limit-assist.md) ·
[ICBM technical notes](../technical/set-speed.md)
