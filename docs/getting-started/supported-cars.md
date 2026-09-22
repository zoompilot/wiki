---
title: Will it work on my car?
type: path
description: The Mazda models and years zoompilot runs on, and how your steering motor changes what it can do.
reviewed: 2026-09-09
---

# Will it work on my car?

Find your Mazda's model and year in the table below, then read across.
The two columns tell you how much of zoompilot your car gets.
{ .zp-lede }

zoompilot steers to zero on any Mazda carrying the 2022-25 CX-5
electric power steering (EPS) motor — factory-fitted, or swapped into
an older Mazda. Steer to zero means the steering assist runs at every
speed, down to a standstill. [Fingerprinting](#how-zoompilot-knows-which-car-you-have) identifies the motor and
turns the capability on by itself.

zoompilot runs on every Mazda platform in its support list: the CX-5,
the CX-8, the CX-9, the Mazda 3, and the Mazda 6. The steering motor your car
carries sets the steering envelope — how the steering behaves — not
whether zoompilot runs.

## Supported Mazda vehicles

The last column is
[alpha longitudinal](../features/alpha-longitudinal.md) — zoompilot's
experimental cruise, which controls the gas and brakes instead of the
stock radar cruise.

| Model | Year | Steer-to-zero | Alpha longitudinal |
| :---: | :---: | :---: | :---: |
| CX-5 | 2022–2025 | ✓ | ✓ |
| CX-5 | 2017–2021 | with swap | ✓ |
| CX-5 | 2016.5 | with swap | ? |
| CX-8 | 2023 | ✓ | ? |
| CX-9 | 2021–2023 | with swap | ✓ |
| CX-9 | 2016–2020 | with swap | ? |
| Mazda 3 | 2017–2018 | with swap | ? |
| Mazda 6 | 2017–2021 | with swap | ? |

<div class="zp-glance" markdown>

- **✓** — Works as the car ships.
- **with swap** — Works once a 2022-25 CX-5 EPS motor is swapped in. See
  [EPS swap](../technical/eps-swap.md).
- **?** — Expected to work, not yet validated on that platform. The
  Mazda 3 and Mazda 6 are community-reported only, with fewer test
  miles than the CX-5 and CX-9.

</div>

Alpha longitudinal includes stop-and-go, so it's recommended to have
an EPS capable of steering to a standstill. On a stock older EPS, the
steering stops below about 28 mph (45 kph) — the motor's low-speed
lockout.

While alpha longitudinal is on, the stock radar and automatic
emergency braking (AEB) are off.

## Have an older Mazda?

Every car in the table runs zoompilot on the steering motor it came
with. Some owners go further and fit the 2022-25 CX-5 motor into an
older Mazda — an EPS swap. zoompilot then gives that car the same
steering as a 2022-25 CX-5. The [EPS swap](../technical/eps-swap.md)
page explains what the swap unlocks and how zoompilot recognizes it.

## How zoompilot knows which car you have

When it starts, zoompilot identifies your car from the vehicle
identification number (VIN) first. Then it reads the EPS firmware —
the built-in software inside the steering motor. The EPS fingerprint tells
zoompilot whether the car can steer to zero. This is how an older Mazda
with a swapped motor gets full steering. The design notes are in
[Mazda fingerprinting](../technical/mazda-fingerprinting.md).

## Parts list for your car

Each car needs a matching harness — the cable kit that connects the
[comma device](hardware.md) to your car. The
[zoompilot car list](https://github.com/zoompilot/zoompilot/blob/develop/docs/CARS.md)
names the parts per car, in the [openpilot](../help/glossary.md#openpilot) support table format.

!!! note "Not sure about your car?"

    Ask in the [zoompilot Discord](https://discord.gg/jFWkHC2uhh). Include
    your model year and, if you can, whether the EPS motor is original.

<div class="zp-next" markdown>

- [What you need](hardware.md)
  The comma device and the Mazda cable kit

</div>
