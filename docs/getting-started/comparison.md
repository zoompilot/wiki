---
title: Which fork, and why
type: explanation
description: zoompilot, sunnypilot, and openpilot side by side on a supported Mazda — what each does, what you give up, and who should run which.
---

# Which fork, and why

Three driver-assistance projects can run on a
[comma device](hardware.md) in a Mazda:
[openpilot](../help/glossary.md#openpilot), [sunnypilot](../help/glossary.md#sunnypilot), and zoompilot. Each one is built on the one
before it. This page shows what each does on a supported Mazda, and
who should run which.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Any brand of car** Run [openpilot](https://github.com/commaai/openpilot).
  It is the base everything else builds on.
- **A supported car, and you want ICBM or Smart Cruise** Run
  [sunnypilot](https://github.com/sunnypilot/sunnypilot).
- **A supported Mazda** Run zoompilot. The details are
  [below](#who-should-run-what).

</div>

zoompilot is a [fork](../help/glossary.md#fork) of [sunnypilot](https://github.com/sunnypilot/sunnypilot),
which is a fork of [openpilot](https://github.com/commaai/openpilot).
A fork is a copy of a project that keeps everything its parent has and
adds its own changes. So zoompilot keeps every sunnypilot feature, and
adds the Mazda work on top.

This page is the deep version of the
[comparison on zoompilot.ai](https://zoompilot.ai); every zoompilot
row has a measurement record behind it on this wiki.

## Side by side

| What you get on a supported Mazda | openpilot | sunnypilot | zoompilot |
| --- | :-: | :-: | :-: |
| Lane keeping and adaptive cruise on the 2022-25 CX-5 | ✓ | ✓ | ✓ |
| Cruise buttons pressed for you ([ICBM](../features/icbm.md)) | — | ✓ | ✓ |
| Slows for curves and speed limits ([Smart Cruise](../features/smart-cruise.md), [Speed-Limit Assist](../features/speed-limit-assist.md)) | — | ✓ | ✓ |
| Steering tuned separately for seven speed ranges | — | — | ✓ |
| Steering force that follows the motor's measured limit at each speed | — | — | ✓ |
| Steering commands per frame (more means faster response) | 10 | 10 | 12 |
| Steers down to a stop on the 2022-25 CX-5 motor, measured | — | — | ✓ |
| Steers down to a stop after an EPS swap, with your car's own specs | — | — | ✓ |
| Recognizes a swapped-in motor by itself (VIN + EPS firmware) | — | — | ✓ |
| Controls the gas and brakes on a Mazda ([alpha longitudinal](../features/alpha-longitudinal.md)) | — | — | experimental |
| Uses the Mazda radar, blind-spot monitors, and speed-sign camera | — | — | ✓ |
| Fixes known false Mazda alerts | — | — | ✓ |

EPS is electric power steering: the motor that turns the front wheels.
An EPS swap fits the 2022-25 CX-5 motor into an older Mazda.

## What the rows mean

**The shared rows.** [Upstream](../help/glossary.md#upstream) openpilot already drives the 2022-25
CX-5. It caps every steering command at one flat 800 counts — the
motor's raw torque unit — sends at most 10 commands per frame, and asks
for lane keeping only above 25 mph. That [envelope](../help/glossary.md#torque-envelope) is safe, but it
belongs to a spec sheet, not to the measured steering rack in your car.

**The sunnypilot rows.** ICBM, Speed-Limit Assist, and Smart Cruise
are sunnypilot features. zoompilot inherits them and reworks their
Mazda parts — ICBM is rebuilt as a button [servo](../help/glossary.md#servo) measured against the
car's own cruise computer, for example. On an EPS swap, sunnypilot
reaches steer-to-zero one way: select the CX-5 2022-25 platform by
hand. That applies the CX-5 steering ratio, wheelbase, and mass to a
car that is not a CX-5. See [ICBM](../features/icbm.md) and
[Smart Cruise](../features/smart-cruise.md).

**The zoompilot rows.** Everything else comes from measuring the car.
The torque curve follows the EPS's real ceiling, which falls from about
1148 counts in town to 620 on the highway. The seven learned speed
bands replace one setting for all speeds. Fingerprinting — identifying
the car when zoompilot starts — reads the VIN and the EPS firmware.
That is how a swapped-in 2022-25 CX-5 EPS motor gets recognized, and
why the swap row above stays matched to your car's own specs. See
[steering](../features/steering.md) and
[fingerprinting](../technical/mazda-fingerprinting.md).

**Alpha longitudinal** is zoompilot's experimental full cruise control.
While it is on, the stock radar is silenced and automatic emergency
braking (AEB) is off. That is a real trade, and it is written down
everywhere the feature is. See [safety](../safety.md).

## What you give up

- **Car coverage.** Upstream supports many makes and models. zoompilot
  supports one brand: the Mazda platforms in its list. Steer-to-zero
  follows the 2022-25 CX-5 EPS, factory-fitted or swapped in; every
  other Mazda in the list runs on its stock motor's envelope. If your
  car is not one of them, run upstream — see
  [supported cars](supported-cars.md).
- **Maturity.** zoompilot is a young fork with a narrow focus. Upstream
  has thousands of car-miles of broad testing that a young fork cannot
  claim.
- **AEB while alpha longitudinal is on.** The radar is the trade. Do
  not run alpha longitudinal if that is not acceptable to you.

## Who should run what

- **Any brand of car** → openpilot. It is the upstream everything else
  builds on.
- **A supported car, and you want ICBM or Smart Cruise** → sunnypilot.
- **A supported Mazda** → zoompilot. Every Mazda in the list runs; the
  2022-25 CX-5 EPS adds steer-to-zero wherever it is fitted, factory or
  swapped. Alpha longitudinal follows that motor too. That motor is the
  case this whole wiki measures.

Stock Mazda cruise and lane keeping return as soon as zoompilot is off.
To leave zoompilot, factory-reset the device, or enter another fork's
URL under the custom software option. See [Install](install.md).

<div class="zp-next" markdown>

- [Will it work on my car?](supported-cars.md)
  The Mazdas zoompilot runs on
- [How zoompilot works](how-it-works.md)
  One drive, from camera to wheels

</div>
