---
title: Alert fixes
type: feature
description: The false Mazda warnings zoompilot removes, and the real faults it keeps.
reviewed: 2026-09-06
---

# Alert fixes and steering override

Some warnings in the stock [openpilot](../help/glossary.md#openpilot) Mazda support fire when nothing is
wrong. zoompilot removes the known false ones, so the warnings you do
see are real.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Status** <span class="zp-badge zp-badge--auto">Automatic</span>
  Nothing to turn on.
- **Works on** Every supported Mazda. The "place hands on wheel" fix
  is for the 2022-25 CX-5 [EPS](../help/glossary.md#eps) motor.
- **What you will notice** Fewer nags — the prompts that ask you to
  hold the wheel or pay attention — after bumps and on the CX-5 motor.
  Real faults still warn you.

</div>

These changes remove known false alerts in the Mazda port without
touching real fault handling.

## Place hands on wheel alert (2022-25 CX-5 EPS)

Log analysis from many drivers proved that `LKAS_BLOCK` does not actually
disengage steering on the 2022-25 CX-5 EPS. Based on that evidence,
zoompilot disables this false alert.

Real faults stay active. Only the false "place hands on wheel" warning is
suppressed.

## Steering override hysteresis

zoompilot adds the same override filter used by Tesla and Rivian. A
pothole or rough patch no longer trips a phantom takeover request, so the
system does not nag you to hold the wheel after a bump.

## Other upstream alert improvements

These arrive with the [sunnypilot](../help/glossary.md#sunnypilot) and openpilot syncs:

- Softer driver monitoring nags.
- The "openpilot unavailable" flash at startup is fixed.
- The false `NO PANDA` flash on screen wake is gone.
- The bogus "Cruise Fault: Restart the Car" on a cold start is gone. The
  fault alert now fires only when the radar genuinely drops out
  mid-drive. See [Troubleshooting](../help/troubleshooting.md).
