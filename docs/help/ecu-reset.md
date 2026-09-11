---
title: ECU reset
type: task
description: Clear cruise, LKAS, or radar dashboard errors by turning the car fully off — one minute first, then 15 minutes if needed.
reviewed: 2026-09-06
---

# ECU reset

Your Mazda is run by many small computers, called electronic control
units (ECUs). When one of them shows an error on the dashboard, turning
the car fully off lets it reset. This is the first thing to try.
{ .zp-lede }

## When to use it

- The dashboard throws cruise, LKAS, or radar errors.
- Cruise stays unavailable after you flipped
  [alpha longitudinal](../features/alpha-longitudinal.md) on or off.
- Something behaved oddly right after switching [forks](glossary.md#fork) or updating.

## The procedure

<div class="zp-steps" markdown>

1. **Park, then turn the car completely off.**
2. **Wait one minute**, then start the car and drive again. A short
   power-down clears most one-off faults.
3. **Still there? Wait 15 minutes.** Park and turn the car off again,
   this time for **15 minutes**. Some faults survive a short power-down
   and clear only once the car has sat long enough for its modules to
   shut down fully. The radar fault that [alpha
   longitudinal](../features/alpha-longitudinal.md) can latch is one of
   them; the mechanism is on the
   [technical notes](../technical/mazda-longitudinal.md#fsc-settle-gate).

</div>

## If the error comes back

A fault that survives an ECU reset, or returns every drive, is not a
one-off. Do not keep resetting and driving. Capture evidence instead:

1. Update to the latest `zoompilot/main` release first.
2. Share a route from that drive, following
   [Share a route](share-a-route.md).
3. Post the route ID and the exact dashboard message on the
   [Discord](https://discord.gg/jFWkHC2uhh).
