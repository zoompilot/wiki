---
title: Start here
type: task
description: zoompilot is a sunnypilot fork that runs on every car sunnypilot supports, with extra steering and cruise work for Mazda. Install it from `zoompilot/main`.
---

# Start here

zoompilot is a sunnypilot fork. It runs on every car sunnypilot supports,
adds speed-dependent steering learning for torque-steering cars, and adds
Mazda steering tuning and cruise work.
{ .zp-lede }

Read [Safety](../safety.md) before your first drive.

## coming from openpilot, sunnypilot or another fork

Keep your comma and harness. What changes:

| Area | On zoompilot |
| --- | --- |
| Steering | On torque-steering cars, Self-Tune learns how your car steers per speed range. Mazda also gets tuning matched to its steering hardware. |
| Low-speed steering on Mazda | A compatible Mazda EPS (2022+) assists down to a stop. An older EPS stops below about 28 mph (45 km/h). |
| Brake and CANCEL | End cruise but leave steering on (MADS, on by default). |
| Cruise | Optional Slow for Curves and Speed-Limit Assist. Cruise-button control starts on its own when a feature needs it. |
| Lane changes | Optional smoothing and road-edge blocking. |
| Models | Firehose by default. Jetlink can run larger models. |

From sunnypilot: ICBM cruise-button control has no switch of its own,
Smart Cruise is now Slow for Curves, and speed-dependent learning runs with
Self-Tune.

## what you need

- A comma 3X or comma 4. Clones work only if they match that hardware, including the driver camera.
- The harness for your car, from the [comma shop](https://comma.ai/shop). Mount it with [comma's setup guide](https://comma.ai/setup).
- A car on the [supported cars](supported-cars.md) list.

Optional: a Mazda navigation SD card (speed limits from the car's sign
recognition), maps downloaded through sunnylink (map-based curve slowdowns
and speed limits), or a computer or phone for [Jetlink](../jetlink/index.md).

## install

1. Connect the comma to Wi-Fi or a hotspot.
2. Choose **custom software**.
3. Enter:

    ```text
    zoompilot/main
    ```

4. After it restarts, **Settings → Software** shows zoompilot on `main`.

Coming from another fork? Factory reset first with **Settings → Software →
uninstall/reset**, after saving any settings or recordings you want.

<details>
<summary>Watch the installation</summary>
<figure class="zp-clip">
<video controls preload="none" playsinline src="../assets/demo/install-comma-3-3x.mp4" aria-label="Install zoompilot on comma 3X"></video>
<figcaption>comma 3X: choose custom software and enter the address.</figcaption>
</figure>
<figure class="zp-clip">
<video controls preload="none" playsinline src="../assets/demo/install-comma-four.mp4" aria-label="Install zoompilot on comma 4"></video>
<figcaption>comma 4: follow the custom software setup.</figcaption>
</figure>
</details>

## recommended settings

On a supported Mazda, MADS, torque control, Self-Tune and the Firehose
model are on by default. Leave them on and keep custom tuning and Manual
Real-Time Tuning off. Alpha Longitudinal is off by default: on Mazda it
turns off automatic emergency braking and forward collision warning.

After your first drive, turn these on one at a time, while parked:

| Setting | Why |
| --- | --- |
| **Settings → Cruise → Slow for Curves: Vision** | Slows cruise for curves the camera sees, then resumes your set speed. [Limits](../features/smart-cruise.md). |
| **Settings → Cruise → Slow for Curves: Map** | Slows for curves in map data. Download your region in sunnylink first. |
| **Settings → Steering → Lane Change Smoothing** | Slower, smoother lane changes at the pace you pick. [Limits](../features/lane-changes.md). |
| **Settings → Steering → Block Lane Change: Road Edge Detection** | Blocks lane changes toward a road edge the model sees. |

[Speed-Limit Assist](../features/speed-limit-assist.md) and
[experimental speed control](../features/alpha-longitudinal.md) are optional.

## first drive

What differs from stock on a Mazda with default settings:

- **Main cruise switch on** turns steering on once the car and device are ready. Setting a speed starts cruise.
- **Brake or CANCEL** ends cruise. Steering stays on.
- **Main cruise switch off** turns both off. Practice this where it is safe.
- The screen shows steering and cruise separately. A set speed does not mean steering is active.
- Self-Tune adapts over the first few drives. Nothing to tune.

[Driving](driving.md) covers brake behaviour and the Mazda TJA button
option.
