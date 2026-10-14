---
title: Glossary
type: reference
description: Plain meanings for the zoompilot and Mazda terms the wiki uses, such as EPS, MRCC, ICBM, MADS, alpha longitudinal, speed bands, and the rest.
---

# Glossary

Terms you meet in zoompilot and on Mazdas. For general comma and
openpilot terms, see [comma's docs](https://docs.comma.ai).
{ .zp-lede }

## Mazda and car terms

**EPS**: electric power steering, the motor that turns the front wheels.
{ #eps }

**compatible Mazda EPS (2022+)**: the 2022–25 CX-5 EPS motor, wherever
it is fitted. It steers down to a stop, and zoompilot's steering work and
Mazda alpha longitudinal need it. The code flags it
`STEER_TO_ZERO_EPS`. [EPS swap](../technical/car-identification.md#eps-swap).
{ #compatible-mazda-eps }

**steer to zero**: steering assist down to a stop. On Mazdas it comes with the compatible Mazda EPS (2022+).
{ #steer-to-zero }

**counts**: the raw torque units the EPS uses. The compatible Mazda EPS
(2022+) can apply about 1148 counts at neighborhood speeds, falling to
620 on the highway.
{ #counts }

**MRCC**: Mazda Radar Cruise Control, Mazda's stock adaptive cruise.
{ #mrcc }

**LKAS**: Lane Keeping Assist System, Mazda's stock lane centering.
{ #lkas }

**LKAS_BLOCK**: the Mazda blocking state behind the false "place hands
on wheel" alert on the compatible Mazda EPS (2022+).
{ #lkas-block }

**AEB**: automatic emergency braking. Off while alpha longitudinal is
on, because the radar is off.
{ #aeb }

**FCW**: forward collision warning. Off with AEB under alpha
longitudinal.
{ #fcw }

**BSM**: blind spot monitoring.
{ #bsm }

**nav SD card**: Mazda's navigation card. Needed for car-supplied speed
limits. Downloaded maps don't need it.
{ #nav-sd-card }

**ECU**: electronic control unit, one of the car's many small computers.
{ #ecu }

**firmware**: software built into one of the car's parts, such as the
steering motor.
{ #firmware }

**VIN**: vehicle identification number. zoompilot decodes it to
identify the platform.
{ #vin }

**WMI**: world manufacturer identifier, the first three VIN characters
(JM1, JM3, 3MZ, JM0 on Mazdas).
{ #wmi }

**fingerprint**: identifying your car from its VIN and ECU firmware. It
decides what zoompilot is allowed to do.
{ #fingerprint }

**dashcamOnly**: an upstream status. The car is recognized, but lane
keeping stays off. It clears on supported zoompilot cars.
{ #dashcamonly }

## zoompilot terms

**fork**: a version of a software project with its own changes.
zoompilot is a fork of sunnypilot, which is a fork of openpilot.
{ #fork }

**offroad / onroad**: the device is on while the car is parked
(offroad) or while you drive (onroad). Many settings change only offroad.
{ #offroad-onroad }

**set speed**: the cruise speed shown on your dash. Several zoompilot
features raise or lower it.
{ #set-speed }

**MADS**: Modular Assistive Driving System. Steering can stay engaged
without cruise. On by default. With the default Mazda settings, the
brake pedal and CANCEL stop cruise but leave steering on, and main cruise
off turns both off. The optional TJA-button setting makes TJA the
separate steering switch.
{ #mads }

**UEM**: unified engagement mode. Engaging cruise also turns on
steering, and steering can stay on after cruise cancels.
{ #uem }

**ICBM**: Intelligent Cruise Button Management. zoompilot presses your
cruise buttons until the set speed reaches its target.
It starts on its own when a feature needs it.
{ #icbm }

**SLA**: Speed Limit Assist.
{ #sla }

**SCC**: Smart Cruise Control, the older name for Slow for Curves.
{ #scc }

**alpha longitudinal**: zoompilot controls gas and brakes instead of
Mazda's radar cruise, with the stock radar off. Also called openpilot
longitudinal or op-long.
{ #alpha-longitudinal }

**self-tune**: the background learner that measures your motor's torque
values while you drive.
{ #self-tune }

**speed bands**: the seven speed ranges Self-Tune learns separately,
from parking speeds to highway.
{ #speed-bands }

**LAF**: lateral acceleration factor, how much torque a unit of lateral
acceleration is worth. The main learned number.
{ #laf }

**NNLC**: neural network lateral control. It exists for Mazda, but the
tuned torque controller is the tested path.
{ #nnlc }

**driving model**: the neural network that watches the road camera and
plans the drive. Choose which one runs under **Settings → Models**.
{ #driving-model }

**Jetlink**: runs bigger driving models on a computer or phone connected
to the comma.
{ #jetlink }

**Accelerator Link**: the former name of Jetlink.
{ #accelerator-link }

**panda**: the car-interface board inside the comma device. It enforces
the safety model on the wire.
{ #panda }
