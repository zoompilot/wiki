---
title: Frequently asked questions
type: reference
---

# Frequently asked questions

Questions about zoompilot. For the comma device, see
[comma's docs](https://docs.comma.ai).
{ .zp-lede }

## before you start

### How much does zoompilot cost?

Nothing; it is open source. You need a supported comma device
and your car's cable kit.

### Which cars does it support?

Every car sunnypilot supports. On a Mazda, year, region, EPS, and radar
decide which extra features you get. Check
[supported cars](../getting-started/supported-cars.md) before installing.

### Which branch do I install?

`zoompilot/main`. Updates arrive through **Settings → Software**.

### Do I need Jetlink?

No. The comma runs its own driving model. [Jetlink](../jetlink/index.md)
is an optional way to run bigger models on a computer or phone.

### Why do I need a nav SD card?

Supported Mazdas read car-supplied speed limits from it. Downloaded maps
for curve slowdowns and map speed limits don't need it.

### Is zoompilot affiliated with Mazda, comma.ai, or sunnypilot?

No. It is a community project, not endorsed or supported by them.

## coming from another fork

### Should I factory reset?

Yes, to clear old settings. Save settings and upload recordings you need
first.

### Do I need to tune anything?

No. Keep the default model and the learned steering.

### Where did the ICBM and speed-dependent switches go?

Cruise-button control (ICBM) starts on its own when a feature needs it.
Speed-dependent learning runs with Self-Tune. Neither has a switch.

### Where did Accelerator Link go?

It is now called Jetlink, under **Settings → Models**.

## on the road

### Does pressing the brake turn steering off?

Not on a Mazda with default settings. Brake and CANCEL stop cruise but
leave steering on. Main cruise off turns both off. The optional TJA-button
setting changes this. [Driving zoompilot](../getting-started/driving.md).

### Why does my set speed change by itself?

Slow for Curves and Speed Limit Assist change it when you turn them on.

### What is Experimental Mode?

The driving model plans acceleration and braking, including stops for
lights and signs. It can make mistakes. On Mazda it needs
[alpha longitudinal](../features/alpha-longitudinal.md), which disables
automatic emergency braking and forward collision warning.

### Will it drain my car's battery?

By default, the comma 3X shuts down 30 hours after the engine goes off
(**Settings → Device → Max Time Offroad**). A Jetlink computer has its
own power behavior.

## privacy and uploads

zoompilot adds no telemetry of its own. It uses openpilot's route
logging and comma connect, covered by
[comma's privacy policy](https://comma.ai/privacy).

| Data | Default | Where |
| --- | --- | --- |
| Small logs and video (qlogs, qcamera) | Uploaded while driving | **Settings → Device → Onroad Uploads** (comma 3X) |
| Full logs and full video | Uploaded only when you request them | The route's **Files** page in comma connect |
| Driver camera | Off | **Settings → Toggles → Record and Upload Driver Camera** |
| Microphone audio | Off | **Settings → Toggles → Record and Upload Microphone Audio** |
| sunnylink backups, maps, remote settings | On | **Settings → sunnylink**. Off stops all sunnylink requests. |

You can delete routes in comma connect. Before you make one public, read
[share a drive](troubleshooting.md#share-a-drive).
