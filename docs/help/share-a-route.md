---
title: Share a route
type: task
description: How to share a recorded drive (a route) from comma connect, so someone can look at a problem with you.
---

# Share a route

A route is the recording of one drive: video, position, speed, and what
zoompilot was doing. When you report a problem, a shared route lets the
people helping you see exactly what happened.
{ .zp-lede }

<div class="zp-glance" markdown>

- **You need** An account on [comma connect](https://connect.comma.ai),
  comma's web app for your recorded drives, with your device paired.
- **Where you get help** The [zoompilot Discord](https://discord.gg/jFWkHC2uhh):
  post the route ID with a short description of the problem.
- **Privacy** A shared route shows where and when you drove. Read
  [Privacy](privacy.md) if you are unsure.

</div>

## Prepare the route

zoompilot records every drive as a route. These steps share nothing on
their own; they make sure the logs — the drive's data files — reach
comma's servers and stay there:

<div class="zp-steps" markdown>

1. **Let the device upload.** Park where you have Wi-Fi, or a strong
   hotspot signal. Keep **Onroad Uploads** on (see
   [Settings](../settings/index.md#device)).
2. **Upload the full logs.** Open [comma connect](https://connect.comma.ai),
   select the route, and open **Files**. Under **All logs**, upload the
   remaining raw logs and wait for the uploads to finish. Reviewers need
   the complete raw logs.
3. **Keep it.** Open **More info** and turn on **Preserved**, so the
   route is not cleaned up.

</div>

Then choose how to share access.

## Share a public route

This is the normal way. It exposes one route and grants no access to
the device.

<div class="zp-steps" markdown>

1. **Make it public.** Open **More info**, turn on **Public access**,
   and copy the **route ID**.
2. **Post it.** Share the route ID on the
   [Discord](https://discord.gg/jFWkHC2uhh) with a short description of
   the problem.

</div>

!!! note "Public routes"

    A public route is visible to anyone who has its ID. It contains GPS
    position, speed, and timestamps. Start and end your drives at public
    places, and share only routes you are comfortable making public.

## Share the device instead

Use this if you would rather not make the route public. A shared
device exposes **all routes on it**, not just one.

1. On [comma connect](https://connect.comma.ai), click the **gear icon**
   on your device.
2. Rename the device to your car and your Discord username, for example
   `2024 CX-5 - mazdanick`. The reviewer then knows which device is
   yours.
3. Share the device with the reviewer's email address, and confirm the
   share. Ask the reviewer for the address in your Discord thread.
4. Copy the **route ID** from the route's **More info** page, and post
   it on the Discord. The reviewer needs the ID to find the drive.

For what the logs contain, see
[comma's logging docs](https://docs.comma.ai/concepts/logs/). This
process is adapted from the
[sunnypilot docs](https://github.com/sunnypilot/user-docs) (MIT).

<div class="zp-next" markdown>

- [Troubleshooting](troubleshooting.md)
  Fixes for the most common problems
- [How to give feedback](../community/feedback.md)
  What makes a report useful

</div>

