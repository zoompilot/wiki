---
title: ECU reset
type: task
description: Clear cruise, LKAS, or radar dashboard errors by turning the car fully off — one minute first, then 15 minutes if needed.
reviewed: 2026-09-06
---

# ECU reset

For cruise, LKAS, or radar faults, try a full power-down: one minute
first, then 15 minutes if the fault remains.
{ .zp-lede }

## When to use it

- The dashboard throws cruise, LKAS, or radar errors.
- Cruise stays unavailable after you flipped
  [alpha longitudinal](../features/alpha-longitudinal.md) on or off.
- Something behaved oddly right after switching [forks](glossary.md#fork) or updating.

## The procedure

<div class="zp-steps" markdown>

1. **Park, then turn the car completely off.**
2. **Wait one minute**, then restart and check whether the fault has cleared.
3. **Still there? Wait 15 minutes.** Park and turn the car off again,
   this time for **15 minutes**, so its modules can shut down fully.
   Some radar faults after Alpha Longitudinal need this longer wait.
   [Why the camera can latch a fault](../technical/speed-control.md#fsc-settle-gate).

</div>

## If the error comes back

If a fault persists or returns, stop using assistance and report it:

1. Update to the latest `zoompilot/main` release first.
2. Share a route from that drive, following
   [Share a route](share-a-route.md).
3. Post the route ID and the exact dashboard message on the
   [Discord](https://discord.gg/jFWkHC2uhh).
