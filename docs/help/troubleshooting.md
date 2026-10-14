---
title: Troubleshooting
type: task
description: Fixes by symptom, resetting the car's modules, and sharing a drive for help.
---

# Troubleshooting

Find what you see below. Take control first and investigate while parked.
{ .zp-lede }

## dashboard errors (cruise, LKAS, or radar)

1. Take control and park safely.
2. Note the exact message and follow your car manual for it.
3. [Reset the car's modules](#ecu-reset).
4. If the fault stays or returns, stop using assistance and [share a drive](#share-a-drive).

A restart that clears a warning does not prove the cause is fixed.

## cruise blocked after flipping alpha longitudinal

The change applies while parked and restarts zoompilot. Wait for setup
to finish. If cruise stays unavailable after you turn alpha longitudinal
off, reset the car's modules (below) and check for faults before
engaging again.

## steering feels weak or wobbly

- In **Settings → Steering**, torque control and Self-Tune should be on,
  custom tuning and manual real-time tuning off.
- Self-Tune needs several drives to adapt.
- Check you are above your car's
  [minimum steering speed](../getting-started/supported-cars.md).

If it still feels wrong, share a drive instead of changing tuning values.

## zoompilot will not engage

1. Read the alert. Calibration and model downloads must finish first.
2. Check **Settings → Toggles → Enable sunnypilot** is on. It is
   zoompilot's master switch.
3. Check the seatbelt, doors, lane-keeping switch, and normal cruise conditions.
4. With alpha longitudinal, follow any **Remain parked** message until setup is ready.

Note the exact message if it still won't engage.

## wrong speed limits on a km/h car

Check the units and source in **Settings → Cruise → Speed Limit**.
Car-supplied Mazda limits need the navigation SD card. Map limits need
maps for your region. If a limit is wrong, don't accept it: drive to the
posted limit and share the drive with the location.

## weird behavior after switching forks

Old settings can carry over. Save what you need, factory-reset the
device, and install `zoompilot/main` again from
[Start here](../getting-started/index.md).

## Jetlink icon orange or model unavailable

See [Jetlink troubleshooting](../jetlink/troubleshooting.md).

## reset the car's modules { #ecu-reset }

Use this for cruise, LKAS, or radar faults, for cruise that stays
unavailable after flipping alpha longitudinal, or for odd behavior right
after switching forks or updating.

<div class="zp-steps" markdown>

1. **Park, then turn the car completely off.**
2. **Wait one minute**, then restart and check whether the fault cleared.
3. **Still there? Turn it off for 15 minutes** so its modules shut down
   fully. Some radar faults after alpha longitudinal need the longer wait.
   [Why the camera can latch a fault](../technical/speed-control.md#fsc-settle-gate).

</div>

If the fault comes back, stop using assistance, update to the latest
`zoompilot/main`, then share a drive from it with the exact dashboard
message.

## share a drive

Upload a drive's full logs and send me its route ID with the time of the
problem.

!!! warning "A public route is public"

    Anyone with the route ID can see its location, speed, timestamps,
    and video. Start and stop in public places, not at home or work.

<figure class="zp-route-video">
<video controls preload="none" playsinline poster="../../assets/demo/share-a-route-poster.jpg" aria-label="How to upload full logs and share a route in comma connect">
<source src="../../assets/demo/share-a-route.mp4" type="video/mp4">
<a href="../assets/demo/share-a-route.mp4">Download the route-sharing video</a>.
</video>
<figcaption>Sharing a route in comma connect.</figcaption>
</figure>

Keep the comma powered and online while uploads finish.

1. Open [comma connect](https://connect.comma.ai) and choose the drive.
2. Open **Files**. Under **All logs**, request any remaining logs.
3. Open **View upload queue** and wait for every raw log to upload. Video alone is not enough.
4. Open **More info** and turn on **Preserved**, then **Public access**.
5. Copy the **route ID** and post it in your help thread.

### share the device instead

To avoid a public route, ask the reviewer for their email and share the
device from comma connect's device settings. **This grants access to
every route on the device.** Share only with someone you trust, and
still send the route ID.

## other device problems

For booting, Wi-Fi, comma connect, or uninstalling, see
[comma's docs](https://docs.comma.ai).

## where to get more help

Post in [Discord](https://discord.gg/jFWkHC2uhh) with your car, comma
model, software version, the exact alert, whether you use alpha
longitudinal or Jetlink, and a route ID with the time of the problem.
Help comes from the community.
