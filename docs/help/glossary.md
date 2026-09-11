---
title: Glossary
type: reference
description: Plain meanings for every word the zoompilot wiki uses — openpilot, fork, EPS, alpha longitudinal, route, and the rest.
---

# Glossary

Plain meanings for the words this wiki uses. New to all of this? Read
the first section — it covers the words you will meet on almost every
page.
{ .zp-lede }

Every term here has its own link: add `#` and the term to the page
address (for example `glossary/#eps`). Abbreviations shown in
small-caps tooltips across the wiki come from the same list.

## The words you will meet first

**fork** — a copy of a software project that keeps everything its
parent has and adds its own changes. zoompilot is a fork of sunnypilot,
which is a fork of openpilot.
{ #fork }

**engage / disengage** — turn zoompilot's assistance on while you
drive, or off again. You engage with the car's own cruise controls on
the steering wheel.
{ #engage-disengage }

**steer to zero** — steering assist that keeps working at every speed,
all the way down to a stop. On Mazdas it comes with the 2022-25 CX-5
EPS motor.
{ #steer-to-zero }

**upstream** — the projects zoompilot is built from: sunnypilot and,
behind it, openpilot. "Upstream" changes flow down into zoompilot.
{ #upstream }

**set speed** — the cruise speed shown on your dash. Several zoompilot
features raise or lower it for you.
{ #set-speed }

**nag** — a prompt asking you to pay attention or put your hands on
the wheel.
{ #nag }

**offroad / onroad** — the device is on while the car is parked
(offroad), or while you drive (onroad). Many settings can only change
offroad.
{ #offroad-onroad }

## The stack

**openpilot** — the open source driver assistance system by comma.ai.
The base everything here builds on.
{ #openpilot }

**sunnypilot** — a feature-rich fork of openpilot. zoompilot's direct
parent.
{ #sunnypilot }

**zoompilot** — a Mazda-optimized fork of sunnypilot. See
[What is zoompilot?](../getting-started/what-is-zoompilot.md).
{ #zoompilot }

**comma device** — the hardware openpilot runs on: the comma 3
(codename tici), the comma 3X (codename tizi), or the comma four
(codename mici). See [Hardware](../getting-started/hardware.md).
{ #comma-device }

**panda** — the car-interface board inside the comma device. It
enforces the safety model on the wire.
{ #panda }

**jungle** — a [panda jungle](https://comma.ai/shop/panda-jungle):
a test board that takes up to six comma devices or pandas, used to
replay recorded CAN traffic into devices.
{ #jungle }

## Car terms

**ACC** — adaptive cruise control. Keeps a set speed and a gap to the
car ahead.
{ #acc }

**counts** — the raw torque units the EPS speaks. The 2022-25 CX-5 EPS
can apply about 1148 counts at neighborhood speeds, falling to 620 on
the highway.
{ #counts }

**EPS** — electric power steering. The motor that turns the front
wheels. zoompilot's work is keyed to the 2022–25 CX-5 EPS motor; see
[EPS swap](../technical/eps-swap.md).
{ #eps }

**ECU** — electronic control unit: one of the many small computers in
your car. See [ECU reset](ecu-reset.md).
{ #ecu }

**firmware** — the built-in software inside one of the car's parts,
such as the steering motor.
{ #firmware }

**harness** — the wiring kit that connects the comma device to your
car. See [What you need](../getting-started/hardware.md).
{ #harness }

**nav SD card** — Mazda's navigation map card. zoompilot uses it for
speed-sign reading and map data. See
[What you need](../getting-started/hardware.md).
{ #nav-sd-card }

**PCM** — powertrain control module. The car's engine and transmission
computer; it executes gas and brake requests.
{ #pcm }

**MRCC** — Mazda Radar Cruise Control, Mazda's stock adaptive cruise.
{ #mrcc }

**LKAS** — Lane Keeping Assist System, the stock lane centering.
{ #lkas }

**BSM** — blind spot monitoring.
{ #bsm }

**AEB** — automatic emergency braking. Disabled while
[alpha longitudinal](../features/alpha-longitudinal.md) is on, because
the radar is off.
{ #aeb }

**FCW** — forward collision warning. Disabled together with AEB under
alpha longitudinal.
{ #fcw }

**VIN** — vehicle identification number. zoompilot decodes it to
identify the platform. See
[Mazda fingerprinting](../technical/mazda-fingerprinting.md).
{ #vin }

**WMI** — world manufacturer identifier, the first three VIN
characters (JM1, JM3, 3MZ, JM0 on Mazdas).
{ #wmi }

## How zoompilot drives

**fingerprint** — the identification of your car from VIN and ECU
firmware. Decides what zoompilot is allowed to do.
{ #fingerprint }

**steer-to-zero flag** — `STEER_TO_ZERO_EPS`: the flag that marks the
2022-25 CX-5 motor, wherever it is fitted. Unlocks 0 mph steering, the
full torque envelope, and alpha longitudinal.
{ #steer-to-zero-flag }

**torque envelope** — what the EPS may be asked for: 1200/12/12 on the
steer-to-zero motor (scale, units per frame, frame rate), 800/10/25 on
the stock older motor. See
[Mazda lateral](../technical/mazda-lateral.md).
{ #torque-envelope }

**speed bands** — the seven speed ranges the learner tunes separately,
from parking speeds to highway. See
[How it works](../getting-started/how-it-works.md).
{ #speed-bands }

**servo** — a control loop that keeps adjusting until it reaches its
target, like a hand turning a dial until the needle lands. ICBM is a
servo on your cruise buttons.
{ #servo }

**self-tune** — the background learner that measures your motor's
torque values while you drive. See
[Custom tune](../settings/custom-tune.md).
{ #self-tune }

**LAF** — lateral acceleration factor. How much torque a unit of
lateral acceleration is worth; the main learned number.
{ #laf }

**MADS** — Modular Assistive Driving System: steering can stay engaged
without cruise.
{ #mads }

**UEM** — unified engagement mode: one pedal action engages steering
and cruise together.
{ #uem }

**ICBM** — Intelligent Cruise Button Management: zoompilot presses
your cruise buttons for you. See [ICBM](../features/icbm.md).
{ #icbm }

**SLA** — Speed Limit Assist. See
[Speed-Limit Assist](../features/speed-limit-assist.md).
{ #sla }

**SCC** — Smart Cruise Control: the curve- and limit-aware cruise speed
planner. See [Smart Cruise](../features/smart-cruise.md).
{ #scc }

**op-long** — shorthand for openpilot longitudinal: zoompilot commands
gas and brakes itself instead of the stock radar cruise. The
experimental form is
[alpha longitudinal](../features/alpha-longitudinal.md).
{ #op-long }

**dashcamOnly** — an upstream status: the car is recognized, but lane
keeping stays off. It clears on supported zoompilot cars.
{ #dashcamonly }

**alpha longitudinal** — zoompilot's experimental mode: openpilot
drives gas and brakes, the stock radar is off. See
[Alpha longitudinal](../features/alpha-longitudinal.md).
{ #alpha-longitudinal }

**NNLC** — neural network lateral control. Exists for Mazda, but the
tuned torque controller is the tested path.
{ #nnlc }

## Data

**comma connect** — comma's web app for viewing and sharing your
recorded drives, at [connect.comma.ai](https://connect.comma.ai).
{ #comma-connect }

**route** — one drive, as recorded. Identified by an ID like
`5beb9b58bd12b691/0000010a--a51155e496`. Routes open at
[connect.comma.ai](https://connect.comma.ai).
{ #route }

**segment** — a one-minute slice of a route.
{ #segment }

**rlog / qlog** — the full log and its small decimated copy. See
[comma's logging docs](https://docs.comma.ai/concepts/logs/).
{ #rlog-qlog }

**qcamera** — the low-resolution video that comma connect plays.
{ #qcamera }

**LKAS_BLOCK** — the Mazda blocking state behind the false
"place hands on wheel" alert on the 2022-25 CX-5 EPS. See
[Alert fixes](../features/alerts.md).
{ #lkas-block }

**CRZ_INFO** — the Mazda CAN message (0x21b) that carries the
accelerator command. Central to the
[longitudinal record](../technical/mazda-longitudinal.md).
{ #crz-info }

**driving model** — the neural network that watches the road camera
and plans the drive. You can pick which one runs; see
[First drive](../getting-started/first-drive.md).
{ #driving-model }

**branch** — a named version of zoompilot you can install, such as
`zoompilot/main`. See [Install](../getting-started/install.md).
{ #branch }

**DTR** — a community driving model; DTRv6 is a popular pick in the
Models panel. See [First drive](../getting-started/first-drive.md).
{ #dtr }

**Accelerator Link** — the Models-panel toggle that lets the comma run
a big driving model from a Jetson over USB. See
[Testing jetlink](../community/jetlink.md).
{ #accelerator-link }

**jetlink** — the zoompilot project behind Accelerator Link: it
serves a big driving model to the comma from a Jetson. See
[Testing jetlink](../community/jetlink.md).
{ #jetlink }