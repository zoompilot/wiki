---
title: Troubleshooting
type: task
---

# Troubleshooting

If assistance behaves unexpectedly, take control and investigate while
parked. Start with the symptom below.
{ .zp-lede }

| Problem | First step |
| --- | --- |
| Dashboard cruise, camera, or radar fault | [Turn assistance off and check the fault](#dashboard-errors-cruise-lkas-or-radar). |
| Assistance will not turn on | [Read the alert and check readiness](#zoompilot-will-not-engage). |
| Steering feels weak or wobbly | [Check the steering settings](#steering-feels-weak-or-wobbly). |
| Odd behaviour after switching software | [Start from a clean setup](#weird-behavior-after-switching-forks). |
| Wrong speed limit | [Check the selected source](#wrong-speed-limits-on-a-kmh-car). |
| Jetlink icon orange or model unavailable | [Jetlink troubleshooting](../jetlink/troubleshooting.md). |

## dashboard errors (cruise, LKAS, or radar)

1. Turn assistance off and park safely.
2. Note the exact fault. Follow any vehicle-manual instructions for it.
3. For a cruise/camera/radar fault after using zoompilot, try the [full power-down procedure](ecu-reset.md).
4. If it persists or returns, stop using assistance and [ask for help](#where-to-get-more-help).

Do not assume a warning is harmless or that a restart repaired the cause.

## cruise blocked after flipping alpha longitudinal

Changes apply while parked and restart zoompilot. Wait for setup to finish.
If cruise remains unavailable after turning experimental speed control off,
turn the car fully off, restart, and check for faults before using assistance.
Use the dashboard-fault procedure above if necessary.

## weird behavior after switching forks

A fork is another version of openpilot-based software. Old settings can
carry over. Save anything you need, factory-reset the device, and install
`zoompilot/main` again. [Installation](../getting-started/install.md).

## steering feels weak or wobbly

- Check **Settings → Steering**: torque control and Self-Tune on, custom tuning and manual real-time tuning off.
- There is no separate Speed-Dependent Self-Tune switch. Learning follows Self-Tune.
- Allow the learned tune time to adapt over several drives.
- Check your car's [low-speed steering limit](../getting-started/supported-cars.md).

If it still feels wrong, turn assistance off and share a route rather
than changing tuning values at random.

## zoompilot will not engage

1. Read the alert. Finish calibration and model downloads first.
2. Check the master **Enable zoompilot** switch under Settings → Toggles (some screens use the sunnypilot name).
3. Check the seatbelt, doors, lane-keeping switch, and normal cruise conditions.
4. Confirm your [car and minimum steering speed](../getting-started/supported-cars.md).
5. If using Alpha Longitudinal, follow any **Remain parked** message until setup is ready.

Record the exact message if assistance remains unavailable.

## wrong speed limits on a km/h car

Check the units and source in **Settings → Cruise → Speed Limit**.
Car-supplied Mazda limits need the navigation SD card. Map limits need
maps for your region. If the displayed or requested limit is wrong, do
not accept it; use the posted limit and [report the location](share-a-route.md).

## share a route

[Upload the full logs and share the drive](share-a-route.md). Include the
time of the problem, your software version, and any settings changed
before it happened.

## where to get more help

[Discord](https://discord.gg/jFWkHC2uhh) · [FAQ](faq.md) ·
[Report a problem](../community/feedback.md) ·
[Update zoompilot](../using-zoompilot/updates.md)
