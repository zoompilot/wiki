---
title: What you need
type: path
description: The comma device and Mazda cable kit zoompilot runs on, which clones work, and the optional extras.
---

# What you need

zoompilot is software, so it needs something to run on: a comma device
and a cable kit that connects it to your Mazda. Both come from comma.ai,
the company that makes [openpilot](../help/glossary.md#openpilot).
{ .zp-lede }

## The comma device

A comma device is a small computer with its own cameras. It mounts high
on the inside of your windshield, watches the road, and talks to your
car. zoompilot runs on a **comma 3X** or a **comma four**.

A hardware clone of either also works, but only if the clone is
identical. Some clones omit parts that zoompilot needs, such as a driver
monitoring camera — the camera that checks you are watching the road.
Those clones are not supported.

## The Mazda kit

The parts for a supported Mazda are one kit from the
[comma shop](https://comma.ai/shop). The kit ships with a comma four; a
comma 3X or an identical clone works in its place:

- 1 Mazda connector
- 1 OBD-C cable (2 ft)
- 1 comma four
- 1 comma power v3
- 1 harness box
- 1 mount

You will see this wiring called the **harness**: it connects the device
to your car.

## Optional extras

| Item | Why | Needed for |
| --- | --- | --- |
| Nav SD card | Lets the LKAS camera read speed-limit signs and supplies map data. The cheapest way to unlock features your hardware already supports | [Speed-Limit Assist](../features/speed-limit-assist.md) sign reading, map-based Smart Cruise |
| Chestnut eGPU | External GPU for big driving models | Large models that no longer fit on-device |
| Jetson Orin Nano Super | Dev board that runs a big driving model, linked to the comma over USB | [Testing jetlink](../community/jetlink.md) |

The LKAS camera is your Mazda's own camera behind the windshield — the
one its lane-keeping system uses. The nav SD card is Mazda's navigation
map card, which goes in your car's own SD card slot.

## Fitting it in the car

comma.ai documents the physical install at
[comma.ai/setup](https://comma.ai/setup). Pick your Mazda model and
follow the harness guide. When the device is mounted and powered, you
are ready for the software.

<div class="zp-next" markdown>

- [Safety rules](../safety.md)
  Read these before you install
- [Install zoompilot](install.md)
  If you have already read the safety page

</div>
