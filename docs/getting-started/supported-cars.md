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
Supported torque-steering cars across brands can benefit from
speed-dependent steering learning. Mazda gets additional hardware-specific
tuning. The Mazda capabilities below do not apply to every car.

## Mazda compatibility

The table describes steering down to a stop and eligibility for experimental
speed control. **It is not a list of cars that need a hardware swap to run
zoompilot.** Older stock steering firmware can assist at higher speeds.

| Model | Year | Steer-to-zero | Alpha longitudinal |
| :---: | :---: | :---: | :---: |
| CX-5 | 2022–2025 | compatible firmware | compatible firmware + radar |
| CX-5 | 2017–2021 | with compatible swap | with compatible swap + radar |
| CX-5 | 2012–2016 | with compatible swap | with compatible swap + G46L radar |
| CX-8 | 2023 | compatible firmware | compatible firmware + radar |
| CX-9 | 2021–2023 | with compatible swap | with compatible swap + radar |
| CX-9 | 2016–2020 | with compatible swap | hardware check required |
| Mazda 3 | 2017–2018 | with compatible swap | hardware check required |
| Mazda 6 | 2017–2020 | with compatible swap | hardware check required |

**Steer-to-zero** means steering assistance can remain available down to a
stop. Compatible firmware is normally found in the 2022–25 CX-5 and
2023 CX-8 steering system. Regional variants can differ; the software
checks the actual steering firmware, not just the model year.

The software recognises additional older Mazda platforms beyond the full
published car list. These have less validation than the main CX-5/CX-9
platforms. Ask before buying hardware for one. Mazda 6 VIN recognition
also includes 2021, but its platform documentation lists 2017–20;
confirm a 2021 car with support rather than assuming coverage.

## older Mazda with its original steering motor

You do not need a swap for the higher-speed steering improvements.
Older firmware stops assisting below about **28 mph (45 km/h)**.
The car's own cruise control retains its normal speed and stop-and-go limits.

A compatible swap may add low-speed steering. It is an advanced hardware
modification, not part of normal setup. [Read about EPS swaps](../technical/eps-swap.md).

## experimental speed control

Alpha Longitudinal requires steering firmware that supports assistance
down to a stop and a radar version the software supports. The device
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
