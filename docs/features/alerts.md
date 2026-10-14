---
title: Alert fixes
type: feature
---

# Alert fixes

zoompilot filters known false Mazda steering alerts and short torque
spikes that can interrupt assistance. Read and act on any alert that appears.
{ .zp-lede }

## no setup needed

The fixes run automatically on the applicable Mazda hardware. They are
not an option to disable driver attention checks or ignore faults.

## what changes

Some Mazda standby states and rough-road torque spikes previously looked
like a steering fault or driver override. zoompilot checks the reported
state and steering response before treating these as a fault.

## if you see an alert

Follow the alert's instructions. **TAKE CONTROL** means take over
immediately. If a fault returns, stop using assistance and investigate
while parked.

[Screen and alerts](../using-zoompilot/screen.md) ·
[Troubleshooting](../help/troubleshooting.md) ·
[Technical evidence](../technical/mazda-lateral.md)
