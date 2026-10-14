---
title: Safety
type: reference
description: The rules for driving with zoompilot, starting with what experimental speed control turns off and how to take over.
---

# Safety

zoompilot is experimental driver assistance with no warranty. You stay the
driver and use it at your own risk.
{ .zp-lede }

!!! danger "Experimental speed control turns off the radar, AEB and FCW"

    Alpha longitudinal (Experimental speed control) turns off the car's
    radar, so Automatic Emergency Braking (AEB) and Forward Collision Warning
    (FCW) stop working. It is off by default.
    [Experimental speed control](features/alpha-longitudinal.md).

## the rules

- **Watch the road, hands ready.** zoompilot assists; it does not drive the car. Steer and brake yourself whenever you need to, without waiting for an alert.
- **Brake and CANCEL don't turn steering off.** On a Mazda with default settings, they cancel cruise and leave steering on. Main cruise off turns both off. With **Mazda TJA Button** on, TJA turns steering off. This differs from openpilot. [How to take over](getting-started/driving.md#take-over).
- **Keep driver monitoring working.** The camera must see your face. Respond to attention warnings right away.
- **Dashboard faults are real.** If a cruise, radar or camera fault appears, stop using assistance and [check the fault](help/troubleshooting.md).
- **Know where it struggles.** Sharp curves can exceed the steering available. Poor visibility and stopped traffic can defeat assistance. It can't check your blind spot, so confirm a lane change is safe before starting it.

## fork safety

zoompilot modifies the Mazda safety code for its features. Safety
changes are discussed openly in the repository and on Discord. Review the
[safety test suite](https://github.com/zoompilot/opendbc/tree/develop/opendbc/safety/tests)
and decide what you are comfortable running.

openpilot's safety model and full list of limitations also apply:
[openpilot safety](https://github.com/commaai/openpilot/blob/master/docs/SAFETY.md).
