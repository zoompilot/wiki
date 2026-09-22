---
title: Troubleshooting
type: task
description: Fixes for the most common zoompilot problems — dashboard errors, weak steering, will not engage, and more. Pick what you see.
reviewed: 2026-09-09
---

# Troubleshooting

Something is not right? Pick what you see below for the first moves,
then read the full section. For anything else, ask on the
[Discord](https://discord.gg/jFWkHC2uhh) with your release version and a
[route ID](share-a-route.md).
{ .zp-lede }

<div id="zp-triage" markdown="0"></div>

## Before you troubleshoot

Work through these three steps first. They fix most problems.

1. **Update zoompilot.** Run the latest `zoompilot/main` release. Fixes
   go into new releases only.
2. **Check your settings.** Compare against the
   [Settings](../settings/index.md) page. In particular, check that
   torque control, self-tune, and speed-dependent self-tune are on, and
   custom tuning is off.
3. **Remove customizations.** If you patched the code or changed [fork](glossary.md#fork)
   branches, retest on a clean `zoompilot/main` install before you
   report. See [Install](../getting-started/install.md).

## Dashboard errors (cruise, LKAS, or radar)

If your dashboard shows cruise, LKAS, or radar errors, especially with
[alpha longitudinal](../features/alpha-longitudinal.md) on, run the
[ECU reset](ecu-reset.md): park, turn the car completely off for
a minute, then drive again. If the error survives, repeat with
**15 minutes** off. If it survives that too,
[share a route](share-a-route.md) from the drive before you keep driving.

## Cruise blocked after flipping alpha longitudinal

Alpha longitudinal applies its change at a standstill: zoompilot waits
until you are parked, gives the radar back to the car, and then restarts.
After you turn alpha longitudinal **off**, the radar may need a full
ignition cycle to come back cleanly. If cruise stays unavailable:

1. Park and turn the car fully off.
2. Start it again and drive once with zoompilot not engaged.
3. If the error stays, follow the dashboard-error reset above.

See [Alpha longitudinal](../features/alpha-longitudinal.md).

## Weird behavior after switching forks

Factory-reset the device, then install `zoompilot/main` fresh. Stale
settings from a previous fork cause hard-to-explain faults. See
[Install](../getting-started/install.md).

## Steering feels weak or wobbly

- Check that torque control, self-tune, and speed-dependent self-tune are
  on, and custom tune is off. See
  [Settings](../settings/index.md#steering) and
  [First drive](../getting-started/first-drive.md).
- Give self-tune a few drives. Fresh installs start from values learned
  on a CX-5, but your motor still needs some miles.
- CX-9 owners: speed-dependent torque takes longer to learn, because the
  starting values come from a CX-5.

## zoompilot will not engage

Check, in order:

1. **Enable zoompilot** is on. It is the master switch under Settings →
   Toggles. It is on by default. When it is off, zoompilot stays
   passive.
2. The car is in a state that allows engagement: driver door closed,
   seatbelt on, and stock cruise able to set. See
   [First drive](../getting-started/first-drive.md).
3. Your car is supported: find it in the table on
   [Will it work on my car?](../getting-started/supported-cars.md). The
   device identifies your car from its VIN and [EPS](glossary.md#eps) firmware; EPS swaps
   are identified by motor firmware.
4. The engagement conditions for your model are met. The CX-5 steers
   from 0 mph; stock-radar cars keep their stock stop-and-go limits. See
   [Supported cars](../getting-started/supported-cars.md).

## Wrong speed limits on a km/h car

Reading speed limits on cars set to km/h is fixed since 2026.08.25-8.
Update, and check that the nav SD card is inserted for sign reading. See
[Speed-Limit Assist](../features/speed-limit-assist.md).

## Fixed in recent releases

Both alerts below were bugs in older releases. An update to the latest
`zoompilot/main` fixes them.

### "Cruise Fault: Restart the Car" on a cold start

A bug fired this alert falsely on cold starts. It is fixed since
2026.08.25-8: the alert now fires only when the radar genuinely drops out
mid-drive. Update to the latest release. See the
[changelog](../releases/changelog.md).

### False "NO PANDA" flash on screen wake

Fixed in the 2026.08 releases. Update zoompilot.

## Share a route

Most bug reports need a route — the recording of one drive. The steps
to prepare and share one have their own page:
[Share a route](share-a-route.md).

## Where to get more help

- [FAQ](faq.md) — quick answers to common questions
- [zoompilot Discord](https://discord.gg/jFWkHC2uhh) — post your release
  version, car, and route ID.
- [zoompilot issues](https://github.com/zoompilot/zoompilot/issues)
- [How to give feedback](../community/feedback.md)
