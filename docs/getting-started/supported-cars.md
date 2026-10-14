---
title: Will it work on my car?
type: task
---

# Will it work on my car?

zoompilot runs on every car sunnypilot supports. Mazdas get extra steering
and cruise work, depending on their steering hardware.
{ .zp-lede }

## every sunnypilot car

Check your model, year, required factory equipment and harness in the
[full car list](https://github.com/zoompilot/zoompilot/blob/main/docs/CARS.md).
Torque-steering cars of any brand can use speed-dependent learning. The
rest of this page is Mazda only.

## Mazda compatibility

**An older stock EPS still assists at higher speeds.**

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

**Steer-to-zero** means steering assists down to a stop. It needs a
compatible Mazda EPS (2022+), factory-fitted to the 2022–25 CX-5 and
2023 CX-8. Regional variants differ, so zoompilot checks the steering
firmware, not the model year.

**Older EPS.** You get the higher-speed steering improvements without a
swap, but the EPS stops assisting below about **28 mph (45 km/h)**. The
car's cruise control keeps its own speed and stop-and-go limits. Swapping
in a compatible Mazda EPS (2022+) may add low-speed steering, but it is an
advanced hardware modification, not part of normal setup.
[Car identification](../technical/car-identification.md) covers the
firmware check and EPS swaps.

**Other Mazdas.** zoompilot recognises some older Mazda platforms beyond
the published list, validated less than the CX-5 and CX-9. Ask
before buying hardware for one. Mazda 6 VIN recognition includes 2021, but
its platform documentation lists 2017–20, so confirm a 2021 car first.

## experimental speed control

Alpha Longitudinal needs a compatible Mazda EPS (2022+) and a supported
radar version. The device checks both before offering it. A table
entry means the software allows it, not that every car is equally
tested.

!!! danger "Emergency braking disabled"

    Alpha Longitudinal turns off Mazda's radar, automatic emergency
    braking and forward collision warning. It is off by default. Read [the feature guide](../features/alpha-longitudinal.md).

## not sure about your car?

Ask in [Discord](https://discord.gg/jFWkHC2uhh) with the model, year,
country, comma model, and whether the EPS is original. Don't select
another vehicle to bypass compatibility checks.
