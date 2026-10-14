---
title: Mazda steering motor swaps
type: reference
---

# Mazda steering motor swaps

Some owners fit a newer Mazda steering motor to add steering assistance
at low speed. A swap is optional and is not part of normal zoompilot setup.
{ .zp-lede }

## what changes

| Capability | Older stock firmware | Compatible newer firmware |
| --- | --- | --- |
| Steering learning and Mazda tuning | Available on supported hardware. | Available on supported hardware. |
| Minimum steering speed | About 28 mph (45 km/h). | Can assist down to a stop. |
| Experimental speed control | Not offered with the older steering firmware. | Eligible only with a supported radar version too. |

The current software distinguishes steering hardware from firmware.
Older firmware can use the enhanced steering tune at higher speeds;
a swap is primarily about gaining low-speed capability.

## check before buying parts

A 2022–25 CX-5 donor motor may carry the compatible firmware, but model
year alone is not enough to confirm a part. Ask the swap community in
[Discord](https://discord.gg/jFWkHC2uhh) about your exact car and donor part.
This page does not provide mechanical, wiring, alignment, or torque instructions.

An incorrect steering modification can make the car unsafe. Use qualified
help for the physical work.

## after a swap

zoompilot reads the car's identity and steering firmware. Do not force
a CX-5 vehicle selection on a different Mazda: that can apply the wrong
vehicle specifications.

Check the recognised car and any minimum-speed warnings before using
assistance. If recognition is wrong, turn assistance off and
[share a route](../help/share-a-route.md) for review.

!!! danger "Experimental speed control remains optional"

    A compatible swap does not turn Alpha Longitudinal on. Enabling
    that mode disables Mazda automatic emergency braking and forward
    collision warning. Read [the guide](../features/alpha-longitudinal.md).

[Compatibility](../getting-started/supported-cars.md) ·
[Identification design record](mazda-fingerprinting.md)
