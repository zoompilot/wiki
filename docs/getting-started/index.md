---
title: Start here
type: task
description: Start with zoompilot's defaults, learn the controls, and choose any optional features after your first drive.
---

# Start here

On a supported Mazda, the steering settings are already chosen for you.
You can leave them alone and get to know how the car drives.
{ .zp-lede }

## recommended settings

Keep torque control, Self-Tune and the Firehose driving model on. Leave
custom tuning and Manual Real-Time Tuning off. Self-Tune learns how your
car steers at different speeds as you use it normally; you don't need to
teach it turns or run calibration maneuvers.

Older Mazda steering motors still have a minimum steering speed. If
something you expected is unavailable, [check your car's support](supported-cars.md)
before changing settings or selecting another vehicle.

### on another brand

Your car keeps its sunnypilot support and vehicle-specific controls.
Speed-dependent learning works with torque-based steering: check that
**Settings → Steering → torque control** and **Self-Tune** are available
and on. The Mazda button instructions and radar tradeoffs below do not
apply to every brand.

## first drive

On a Mazda with default settings:

- Turn main cruise on to enable steering once the car and device are ready.
- Set a speed when you want Mazda radar cruise to handle gas and brakes.
- Brake or press CANCEL to stop cruise. Steering stays on.
- Turn main cruise off to turn both off.

The optional TJA-button setting changes these controls. Read
[Driving](driving.md) for the buttons and screen indicators, and
[Safety](../safety.md) before your first drive. Be ready to help steer;
learning cannot give the steering motor more torque than it allows.

## optional features

Try these when you have a feel for the defaults:

- [Slow for Curves](../features/smart-cruise.md) lowers cruise speed before a bend and brings it back afterward. I usually use Vision; Map needs a region downloaded through sunnylink.
- [Speed-Limit Assist](../features/speed-limit-assist.md) adjusts cruise to detected speed limits. I usually prefer to set my speed myself.
- [Lane Change Smoothing](../features/lane-changes.md) makes lane changes less abrupt, at the pace you choose.

All three are optional. You can keep Mazda radar cruise while using them.

[Alpha Longitudinal](../features/alpha-longitudinal.md) is a separate
choice: zoompilot takes over gas and brakes for Experimental Mode. It
turns off Mazda radar, automatic emergency braking and forward collision
warning. Leave it off if you want to keep Mazda radar cruise.

## coming from another fork

You can still use sunnylink for remote settings and maps. On comma 4,
you can also change zoompilot's settings on the device; long-press a
setting for its help text.

Older guides call Slow for Curves “Smart Cruise.” Cruise-button control
(ICBM) now starts when a feature needs it, and speed-dependent learning
runs with Self-Tune. Neither needs a separate switch.

## what you need

Already installed and driving? You can skip this part.

You need a supported car, a comma 3X or comma 4, and the harness for your
car. Use [comma's setup guide](https://comma.ai/setup) for mounting and
hardware. Clones need to match the supported hardware, including the
driver camera.

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
