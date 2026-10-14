---
title: Will it work on my car?
type: task
---

# Will it work on my car?

zoompilot runs on the cars sunnypilot supports. Mazda gets extra steering
and cruise work, but capabilities depend on the equipment fitted.
{ .zp-lede }

## every sunnypilot car

Use the [full car list](https://github.com/zoompilot/zoompilot/blob/main/docs/CARS.md)
to check the exact model, year, required factory equipment, and cable kit.
Supported torque-steering cars across brands can benefit from speed-dependent learning.
The capabilities below are specific to Mazda.

## Mazda compatibility

The table shows requirements for low-speed steering and experimental speed
control. **An older stock EPS can still assist at higher speeds.**

| Model | Year | Steer-to-zero | Alpha longitudinal |
| :---: | :---: | :---: | :---: |
| CX-5 | 2022–2025 | compatible EPS | compatible EPS + radar |
| CX-5 | 2017–2021 | with EPS swap | with EPS swap + radar |
| CX-5 | 2012–2016 | with EPS swap | with EPS swap + G46L radar |
| CX-8 | 2023 | compatible EPS | compatible EPS + radar |
| CX-9 | 2021–2023 | with EPS swap | with EPS swap + radar |
| CX-9 | 2016–2020 | with EPS swap | hardware check required |
| Mazda 3 | 2017–2018 | with EPS swap | hardware check required |
| Mazda 6 | 2017–2020 | with EPS swap | hardware check required |

**Steer-to-zero** means steering assistance can remain available down to a
stop. It needs a compatible Mazda EPS (2022+), fitted at the factory to
the 2022–25 CX-5 and the 2023 CX-8. Regional variants can differ, so the
software checks the actual steering firmware, not just the model year.

The software recognises additional older Mazda platforms beyond the full
published car list. These have less validation than the main CX-5/CX-9
platforms. Ask before buying hardware for one. Mazda 6 VIN recognition
also includes 2021, but its platform documentation lists 2017–20;
confirm a 2021 car with support rather than assuming coverage.

## older Mazda with its original steering motor

You do not need a swap for the higher-speed steering improvements.
An older EPS stops assisting below about **28 mph (45 km/h)**.
The car's own cruise control retains its normal speed and stop-and-go limits.

An EPS swap may add low-speed steering. It is an advanced hardware
modification, not part of normal setup. [Read about EPS swaps](../technical/car-identification.md#eps-swap).

## experimental speed control

Alpha Longitudinal requires a compatible Mazda EPS (2022+), which can
assist down to a stop, and a radar version the software supports. The device
checks compatibility before offering it. A table entry describes software
eligibility, not equal testing on every car.

!!! danger "Emergency braking disabled"

    Alpha Longitudinal turns off Mazda's radar, automatic emergency
    braking, and forward collision warning. It is optional and off by
    default. Read [the feature guide](../features/alpha-longitudinal.md).

## not sure about your car?

Ask in [Discord](https://discord.gg/jFWkHC2uhh) with the model, year,
country, comma model, and whether the steering motor is original.
Do not select a different vehicle to bypass compatibility checks.

[Next: what you need →](hardware.md)
