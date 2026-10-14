---
title: Alert fixes
type: feature
---

# Alert fixes

zoompilot filters known false Mazda steering alerts and short torque
spikes that can interrupt assistance. Read and act on any alert that appears.
{ .zp-lede }

The fixes run automatically on applicable Mazda hardware. Driver attention
checks remain active.

## what changes

Some Mazda standby states and rough-road torque spikes previously looked
like a steering fault or driver override. zoompilot checks the reported
state and steering response before treating these as a fault.

## if you see an alert

Follow the alert's instructions. **TAKE CONTROL** means take over
immediately. If a fault returns, stop using assistance and investigate
while parked.

[Troubleshooting](../help/troubleshooting.md) ·
[How steering blocks are handled](../technical/steering.md#when-the-car-blocks-steering)
