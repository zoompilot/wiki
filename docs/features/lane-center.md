---
title: Lane Center Assist
type: feature
description: An alpha nudge toward the middle of the lane on top of the driving model's steering, with a gauge that shows it working.
---

# Lane Center Assist

Keeps the car centered in its lane. Adds a small correction toward lane
center on top of the model's steering. Alpha, off by default.
{ .zp-lede }

## what it does

- Pushes harder on clear lane lines, backs off when they fade.
- Yields when the model steers around a parked car or cyclist.
- Leaves turns and lane changes to the model.

Works on any car, with a small model or a [jetlink](../jetlink/index.md)
big model.

## turn it on

**Settings → Models**:

- comma 4: **lane center assist**: **off**, **on** or **debug ui**.
- comma 3X: **Lane Center Assist (Alpha)**.

Not available with the Default model.

## what you'll see

- A thin gauge under the torque bar fills blue toward the side it nudges.
- The lane's center line turns from grey to blue as the nudge grows.
- **debug ui** (comma 4) shows the push in cm at the top of the screen. On
  the 3X it is in the developer UI's bottom bar.

Credit: built on sunnypilot's Blendful by James Vecellio-Grant
([sunnypilot#2073](https://github.com/sunnypilot/sunnypilot/pull/2073)).
zoompilot adds the gauge, the comma 4 options and jetlink support.
