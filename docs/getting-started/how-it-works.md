---
title: How zoompilot works
reviewed: 2026-09-09
---

# How zoompilot works

This page follows one drive from camera to wheels, and shows what
zoompilot changes on the way. No prior openpilot knowledge needed.

## The stack

openpilot is software that runs on a comma device. The device sits on
the car's camera harness, which gives it access to the car's network.
Its own road camera watches the road, and a neural network model reads
it. The planners — one for steering (lateral), one for speed
(longitudinal) — turn what the model sees into steering and speed
requests. The car's own computers do the
physical work: the electric power steering (EPS) motor turns the
wheel, and the powertrain control module (PCM) manages speed.

<div class="diagram">
<svg viewBox="0 0 800 228" role="img" aria-label="Module diagram, two rows: the comma device's own road camera feeds the driving model, and the model feeds two chains. Steering: the lateral planner and torque controller steer the Mazda EPS. Speed: the longitudinal planner's target flows through ICBM, a button servo that walks the dash set speed, to the MRCC radar, which runs its own ACC loop and drives the PCM for gas and brakes; under alpha longitudinal the planner drives the PCM directly. Radar, speed signs from the car's LKAS camera, and blind spots feed the planners. Self-tune learns the EPS motor.">
  <defs>
    <marker id="zp-arrow" class="m-dim" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z"/></marker>
    <marker id="zp-arrow-a" class="m-acc" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z"/></marker>
  </defs>
  <rect class="d-box" x="20" y="32" width="100" height="48"/>
  <text class="d-hi" x="70" y="52" text-anchor="middle">road camera</text>
  <text x="70" y="68" text-anchor="middle">on the device</text>
  <line class="d-flow" x1="124" y1="56" x2="150" y2="56"/>
  <rect class="d-box" x="154" y="32" width="130" height="48"/>
  <text class="d-hi" x="219" y="52" text-anchor="middle">driving model</text>
  <text x="219" y="68" text-anchor="middle">vision</text>
  <line class="d-flow" x1="288" y1="56" x2="314" y2="56"/>
  <rect class="d-box" x="318" y="32" width="140" height="48"/>
  <text class="d-hi" x="388" y="52" text-anchor="middle">lateral planner</text>
  <text x="388" y="68" text-anchor="middle">where in the lane</text>
  <line class="d-flow" x1="462" y1="56" x2="488" y2="56"/>
  <rect class="d-box" x="492" y="32" width="115" height="48"/>
  <text class="d-hi" x="549" y="52" text-anchor="middle">torque controller</text>
  <text x="549" y="68" text-anchor="middle">7 learned bands</text>
  <line class="d-flow" x1="611" y1="56" x2="637" y2="56"/>
  <rect class="d-box" x="641" y="32" width="80" height="48"/>
  <text class="d-hi" x="681" y="52" text-anchor="middle">EPS</text>
  <text x="681" y="68" text-anchor="middle">steering</text>
  <line class="d-flow" x1="219" y1="84" x2="219" y2="128"/>
  <rect class="d-box" x="190" y="132" width="140" height="48"/>
  <text class="d-hi" x="260" y="152" text-anchor="middle">longitudinal planner</text>
  <text x="260" y="168" text-anchor="middle">how fast, how far</text>
  <line class="d-flow" x1="334" y1="156" x2="356" y2="156"/>
  <rect class="d-box" x="360" y="132" width="100" height="48"/>
  <text class="d-hi" x="410" y="152" text-anchor="middle">ICBM</text>
  <text x="410" y="168" text-anchor="middle">button servo</text>
  <line class="d-flow" x1="464" y1="156" x2="486" y2="156"/>
  <rect class="d-box" x="490" y="132" width="110" height="48"/>
  <text class="d-hi" x="545" y="152" text-anchor="middle">MRCC radar</text>
  <text x="545" y="168" text-anchor="middle">stock cruise</text>
  <line class="d-flow" x1="604" y1="156" x2="626" y2="156"/>
  <rect class="d-box" x="630" y="132" width="100" height="48"/>
  <text class="d-hi" x="680" y="152" text-anchor="middle">PCM</text>
  <text x="680" y="168" text-anchor="middle">gas · brakes</text>
  <path class="d-flow-accent" style="stroke-dasharray: 5 4" d="M260,184 V212 H680 V184"/>
  <text class="d-acc" x="470" y="206" text-anchor="middle">alpha longitudinal</text>
  <path class="d-flow-accent" d="M681,84 V102 H549 V84"/>
  <text class="d-acc" x="615" y="96" text-anchor="middle">learned values</text>
  <line class="d-flow-accent" x1="166" y1="156" x2="186" y2="156"/>
  <text class="d-acc" x="100" y="144" text-anchor="middle">radar · blind spots</text>
  <text class="d-acc" x="100" y="160" text-anchor="middle">speed signs (LKAS)</text>
</svg>
</div>

zoompilot rewrites how this stack drives a Mazda — wiring in Mazda
sensors, adding a custom steering torque tune, and enabling alpha
longitudinal.

## Steering

The EPS motor is what turns the front wheels.
openpilot does not move the steering wheel directly — it asks the EPS
for torque, many times a second, and the motor delivers what it can.

Two facts about the 2022-25 CX-5 EPS motor shaped zoompilot's steering
work:

- **The motor is stronger than stock openpilot assumes.** openpilot
  caps its request at one conservative value for all speeds. At low
  speeds the EPS can deliver up to 44% more, and zoompilot uses it.
  See [Steering improvements](../features/steering.md).
- **The motor behaves differently at every speed.** Its output scale
  even drops from 1200 to 800 counts near 32 mph. One fixed steering
  tune cannot fit both parking lots and highways.

zoompilot's answer is a speed-dependent torque tune. Driving is sorted
into seven speed bands, from parking speeds to
highway. For each band, [**self-tune**](../reference/glossary.md)
measures two numbers — the torque gain and the friction — and keeps a
separate steering tune per band.
Fresh installs start from a tune learned on a real CX-5, then refine it
to your motor.

The motor's firmware also decides what zoompilot may do. The 2022-25
CX-5 EPS motor is the only one that may steer from 0 mph. zoompilot checks which motor
your Mazda has by reading the car's firmware. The result is the
[steer-to-zero flag](../technical/mazda-fingerprinting.md), and it is
why [EPS swaps](../technical/eps-swap.md) work: an older Mazda with
that motor gets the same treatment.

## Speed

With stock software, Mazda's radar cruise computer — the MRCC radar —
controls speed, and openpilot cannot command the gas and brakes. zoompilot's
[ICBM](../features/icbm.md) servo presses the cruise buttons so the dash
set speed follows the plan; the radar does the rest on its own. zoompilot
adds its cruise features on top of this: [curve slowdowns](../features/smart-cruise.md),
[speed-limit awareness](../features/speed-limit-assist.md), and a
[cruise arbiter](../technical/cruise-arbiter.md) that keeps your set
speed yours. Dismiss a speed-limit change once, and it
stays dismissed until the limit on the road actually changes.

[Alpha longitudinal](../features/alpha-longitudinal.md) removes the
middleman: zoompilot's own planner drives gas and brakes directly. That
is the experimental mode. It comes with a hard trade-off — the radar
goes dark, and with it automatic emergency braking and forward
collision warning. Read that page before enabling it.

## Sensors

Supported Mazdas carry sensors that stock openpilot does not use.
zoompilot wires them in. The forward radar reports up to four cars
ahead. The blind-spot monitor data backs the optional safety checks on
automatic lane changes. The car's LKAS camera reads speed-limit signs
and feeds [Speed-Limit Assist](../features/speed-limit-assist.md). See
[Sensor readouts](../features/sensor-readouts.md).

## You

The driver — you — are in control of the car at all times. zoompilot
is only a driver assist — not a replacement for an attentive driver. Engage zoompilot
with the stock steering-wheel cruise controls while driving. On Mazdas
with a 2022-25 CX-5 EPS, your car can steer down to a standstill.
Cancel cruise control at any time and the car is fully yours again.
The device's driver-monitoring camera watches your attention, and
warns then disengages if it finds you aren't paying attention to the
road. Read the [safety page](../safety.md) before your first drive.

## Where to go next

- [Supported cars](supported-cars.md) — which Mazdas have the motor
  this page is about
- [Install](install.md) — put zoompilot on a comma device
- [First drive](first-drive.md) — recommended settings
- [Features](../features/index.md) — what each change does on the road
- [Technical notes](../technical/index.md) — the measurement record
  behind every claim on this page
