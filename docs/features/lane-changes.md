---
title: Lane changes
type: feature
---

# Lane changes

You can choose a slower lane-change pace and optional road-edge checks.
{ .zp-lede }

## smoother lane changes

Open **Settings → Steering → Lane Change Smoothing** while parked.
Choose a pace, or leave it **Off** for the normal behaviour. Every enabled
pace is slower than Off.

Try one change at a time on a familiar road.

## road-edge checks

**Block Lane Change: Road Edge Detection** asks the model to block a lane
change toward a detected road edge. It is off by default.

The model can misidentify or miss an edge. This check cannot guarantee
that a lane change stays on the road.

## blind-spot information

Supported cars can supply blind-spot information to the lane-change
system. [Mazda sensors](sensor-readouts.md) explains the related settings.

!!! warning "Look before changing lanes"

    A signal or an empty blind-spot indicator does not prove a lane is
    clear. Check mirrors, blind spots, and surrounding traffic yourself.

[Lane-change settings](../settings/index.md#steering)
