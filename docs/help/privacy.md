---
title: Privacy
type: explanation
description: What your comma device records on every drive, what uploads, what a shared route shows, and the switches that control it.
---

# Privacy

Your comma records video and driving data. Uploads are enabled by default;
driver-camera and microphone recordings are off by default.
{ .zp-lede }

## What is recorded

A drive is stored as a **route**, cut into one-minute **segments**. Each
segment holds the full internal log (**rlog**), the camera video, and
small **qlog**/**qcamera** copies made for fast upload — the video you
see in [comma connect](https://connect.comma.ai). The file formats are
described in [comma's logging docs](https://docs.comma.ai/concepts/logs/).

## What leaves the device

The device uploads when it has internet, at home Wi-Fi or a hotspot:

| Data | Upload | Controlled by |
| --- | --- | --- |
| qlogs and qcamera video | automatic while **Onroad Uploads** is on | Settings → Device → Onroad Uploads (default **on**) |
| Full raw logs (rlogs) and full video | only when you request it from the route's **Files** page in comma connect | your action, per route |
| Driver camera recording | off by default | Settings → Toggles → Record and Upload Driver Camera |
| Microphone audio | off by default | Settings → Toggles → Record and Upload Microphone Audio |

Turning **Onroad Uploads** off stops automatic uploads. Routes stay on
the device until cleaned up. You can browse and download routes
directly on your network with the **copyparty Service** toggle
(Settings → Developer, needs Show Advanced Controls).

## What a shared route shows

When you make a route public in comma connect, anyone who has its ID
can view it. A route contains **GPS position, speed, and timestamps**,
plus the camera video. A drive's start or end can reveal a home address.

- Start and end your drives at public places.
- Share only routes you are comfortable making public.
- Mark a route **Preserved** so cleanup does not remove it while it is
  being reviewed.

The other way to share is at the device level. A device shared by
email exposes **every route on it**, not just one. See
[Share the device instead](share-a-route.md#share-the-device-instead).

Routes you want gone can be deleted from comma connect.

## What zoompilot itself sends

zoompilot adds no telemetry of its own. It uses openpilot's route logging
and comma connect services. The source is at
[github.com/zoompilot/zoompilot](https://github.com/zoompilot/zoompilot).
