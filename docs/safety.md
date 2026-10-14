---
title: Safety
type: reference
description: The safety rules for driving with zoompilot, including the alpha longitudinal radar warning and openpilot's limitations.
---

# Safety

Read these operating limits before your first drive.
{ .zp-lede }

## before you drive

- **Watch the road and be ready to steer and brake.** zoompilot is assistance, not a replacement for the driver.
- **Learn your controls.** On a default Mazda setup, brake and CANCEL stop cruise but leave steering active. Main cruise off turns both off. With the optional TJA-button setting, TJA controls steering separately. [Read the controls](using-zoompilot/controls.md).
- **Keep driver monitoring active.** Make sure the camera can see your face. Respond to attention warnings immediately.
- **Know the limits.** Sharp curves, poor visibility, stopped traffic, and other conditions can defeat assistance. Read the limitations below.

!!! danger "Alpha Longitudinal disables Mazda emergency braking"

    Experimental speed control turns off the car's radar. Automatic
    Emergency Braking (AEB) and Forward Collision Warning (FCW) stop
    working while it is enabled. This mode is optional and off by default.

If a dashboard fault appears, stop using assistance and
[check the fault](help/troubleshooting.md). Do not assume it is a false alert.

## openpilot safety

This section is adapted from comma.ai's
[openpilot safety documentation](https://docs.comma.ai/concepts/safety/)
(MIT).

openpilot is an Adaptive Cruise Control (ACC) and Automated Lane Centering
(ALC) system. Like other ACC and ALC systems, openpilot is a failsafe
passive system. It requires the driver to be alert and to pay attention at
all times.

To assist the driver in maintaining alertness, openpilot includes a driver
monitoring feature that alerts when it detects driver distraction.

However, even with an attentive driver, more effort is needed for the
system to be safe. We repeat: **driver alertness is necessary, but not
sufficient, for openpilot to be used safely**, and openpilot is provided
with no warranty of fitness for any purpose.

openpilot is developed in good faith to be compliant with FMVSS
requirements and to follow industry standards of safety for Level 2
Driver Assistance Systems. In particular, it observes ISO 26262
guidelines, including those from [pertinent documents](https://www.nhtsa.gov/sites/nhtsa.dot.gov/files/documents/13498a_812_573_alcsystemreport.pdf)
released by NHTSA. comma.ai also imposes strict coding guidelines (like
[MISRA C : 2012](https://www.misra.org.uk/what-is-misra/)) on
safety-relevant parts of openpilot, and runs software-in-the-loop,
hardware-in-the-loop, and in-vehicle tests before each software release.

Following Hazard and Risk Analysis and FMEA, two main safety requirements
shape the system:

1. The driver must always be capable of immediately retaking manual
   control of the vehicle, by stepping on the brake pedal or by pressing
   the cancel button.
2. The vehicle must not alter its trajectory too quickly for the driver
   to safely react. While the system is engaged, the actuators are
   constrained to operate within reasonable limits[^1].

!!! warning "zoompilot steering differs from the upstream description"

    The upstream requirements above describe openpilot's control model.
    With zoompilot's default MADS settings, brake and CANCEL leave
    steering active. Use the [controls guide](using-zoompilot/controls.md)
    for your setup. Do not assume cancelling cruise cancels steering.

For safety implementation details, refer to the
[panda safety model](https://github.com/commaai/panda#safety-model) and
[opendbc safety](https://github.com/commaai/opendbc/tree/master/opendbc/safety).

[^1]: For these actuator limits, ISO 11270 and ISO 15622 apply. The
      lateral limits there translate to 0.9 seconds of maximum actuation
      to achieve a 1 m lateral deviation.

## Forks of openpilot

A fork is a copy of openpilot with its own changes. comma.ai states
[these rules](https://docs.comma.ai/concepts/safety/#forks-of-openpilot)
for openpilot forks:

- Do not disable or nerf
  [driver monitoring](https://github.com/commaai/openpilot/tree/master/openpilot/selfdrive/monitoring).
- Do not disable or nerf
  [excessive actuation checks](https://github.com/commaai/openpilot/tree/master/openpilot/selfdrive/selfdrived/helpers.py).
- If a fork modifies any of the code in `opendbc/safety/`, the fork must
  preserve the full
  [safety test suite](https://github.com/commaai/opendbc/tree/master/opendbc/safety/tests),
  and all tests must pass, including any new coverage required by the
  fork's changes.

zoompilot modifies the Mazda safety code to support its features. Safety
changes are discussed openly in the repository and on the
[Discord](https://discord.gg/jFWkHC2uhh). Review the
[safety test suite](https://github.com/zoompilot/opendbc/tree/develop/opendbc/safety/tests)
yourself, and decide what you are comfortable running.

## Limitations

The lists below are adapted from comma.ai's
[openpilot safety documentation](https://docs.comma.ai/concepts/safety/)
(MIT). zoompilot inherits these limitations. They do not reduce your
responsibility as the driver. The lists use two short names: LDW is
lane-departure warning and FCW is forward-collision warning.

### Lane keeping and lane departure

openpilot ALC and LDW do not automatically drive the vehicle. They do not
reduce the attention you must pay. Keep control of the steering wheel and
be ready to correct the steering action at all times.

While changing lanes, openpilot cannot look next to you or check your
blind spot. Only nudge the wheel to initiate a lane change after you have
confirmed it is safe.

Factors that can impact performance include:

- Poor visibility (heavy rain, snow, fog) or weather that interferes with
  sensor operation.
- A road-facing camera that is obstructed, covered, or damaged by mud,
  ice, snow, or similar.
- Obstruction caused by excessive paint or adhesive products (wraps,
  stickers, rubber coating) on the vehicle.
- A device mounted incorrectly.
- Sharp curves such as on-ramps, off-ramps, and intersections. The
  steering torque is limited by design.
- Restricted lanes or construction zones.
- Highly banked roads or strong crosswind.
- Extremely hot or cold temperatures.
- Bright light, such as oncoming headlights or direct sunlight.
- Hills, narrow roads, or winding roads.

### Cruise and collision warning

ACC and FCW do not allow careless or inattentive driving. Pay
close attention to your surroundings, and be prepared to take control at
all times.

Factors that can impact performance include:

- Poor visibility or weather that interferes with sensor operation.
- A road-facing camera or radar that is obstructed, covered, or damaged.
- Approaching a toll booth, a bridge, or a large metal plate.
- Roads with pedestrians or cyclists.
- Traffic signs and stop lights, which openpilot does not detect at this
  time (except speed limits through [Speed-Limit Assist](features/speed-limit-assist.md)
  on zoompilot).
- A posted speed limit below your set speed.
- Vehicles in the same lane that are not moving.
- Situations that need abrupt braking. Deceleration and acceleration are
  limited by design.
- Close cut-ins from vehicles in neighbor lanes.
- Hills, narrow roads, or winding roads.
- Extremely hot or cold temperatures.
- Bright light.
- Interference from other equipment that generates radar waves.

!!! note "Radar and alpha longitudinal"

    The radar cautions above assume the stock radar is active. With
    alpha longitudinal, the radar is off and forward collision warning
    is disabled entirely.

### Driver monitoring

Driver monitoring in openpilot is not an exact measurement of driver
alertness. Factors that can impact performance include:

- Low light, such as at night or in dark tunnels.
- Bright light, such as oncoming headlights or direct sunlight.
- A face partially or completely outside the cabin camera view.
- A cabin camera that is obstructed, covered, or damaged.

Do not rely on driver monitoring to assess your level of attention.

The list above does not cover every situation. **It is the driver's
responsibility to be in control of the vehicle at all times.**

<div class="zp-next" markdown>

- [Install zoompilot](getting-started/install.md)
  Put it on your comma device

</div>
