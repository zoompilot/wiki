---
title: Technical notes
---

# Technical notes

These pages are the engineering record behind the fork. They document the
reasoning behind zoompilot's constants and design choices, kept out of
the code comments on purpose.
{ .zp-lede }

!!! note "Written for openpilot readers"

    These pages use openpilot's own vocabulary — lateral, longitudinal,
    CAN frames, panda safety. New to all of this? Start with
    [How zoompilot works](../getting-started/how-it-works.md), then the
    [feature pages](../features/index.md), which say the same things in
    plain words.

These are design records and measurements from specific revisions.
They may describe earlier settings or availability rules. For current
setup, use the [feature guides](../features/index.md),
[compatibility](../getting-started/supported-cars.md), and
[controls](../using-zoompilot/controls.md).

The private research repository holds analysis scripts and recorded logs.
The [route library](route-library.md) indexes citations in these notes.

## Lateral (steering)

- [Mazda lateral: evidence and design notes](mazda-lateral.md) — the 2022
  EPS detection and flag, the "1200/12/12 envelope", speed-dependent
  STEER_MAX, LKAS_BLOCK and the non-delivery latch, and the camera
  ERR_BIT_1 history.
- [EPS swap](eps-swap.md) — what the swap unlocks for an older Mazda,
  and how zoompilot sees a swapped car. The owner-facing side of the
  steering story.
- [Lateral tune: v2 torque controller](lateral-tune.md) — the v0/v1/v2
  lineage, v2 mechanisms and how they are attributed, the steer-limit
  classifier, the speed-bin learner with its cache, and the acceptance
  numbers for the next on-car pass.

## Longitudinal (cruise)

- [Mazda longitudinal (alpha long)](mazda-longitudinal.md) — radar
  takeover and hand-back, the CRZ_INFO checksum, stop-and-go, MRCC state
  semantics, and alpha-long availability.
- [Cruise arbiter](cruise-arbiter.md) — setpoint ownership, SLA sessions,
  dismiss semantics, and the reconciler.
- [ICBM](icbm.md) — the button servo, actuation profiles, fast mode, and
  the restore quiet window.
- [Curve and limit speed planning](scc-curve-planning.md) — model
  curvature range bias, the highway near-window horizon, publish_ramp and
  the op-long budget, and map retain logic.

## Identification

- [Mazda fingerprinting](mazda-fingerprinting.md) — a VIN decode table
  and the EPS-swap fallback.

## Evidence

- [Route library](route-library.md) — every route citation in these
  pages, with the claim each one backs. Generated from the pages above;
  a number is only as good as the drive behind it.
