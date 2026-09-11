---
title: Install zoompilot
type: task
description: Install zoompilot on a comma device by typing one install URL. No computer needed.
reviewed: 2026-09-06
---

# Install zoompilot

Installing zoompilot means typing one short address, the install URL,
into your [comma device](hardware.md). The device downloads zoompilot and starts it.
There is nothing to configure on a computer.
{ .zp-lede }

<div class="zp-build" markdown>
Install URL: `zoompilot/main` <span class="zp-stamp">· build 393a506e61 · 2026-08-25</span>
</div>

<div class="zp-glance" markdown>

- **Before you start** The comma device is mounted in your car and
  powered — see [What you need](hardware.md). You have read the
  [safety page](../safety.md).
- **You need** The device online for the download — Wi-Fi or a phone
  hotspot.
- **Time** The first boot can take a few minutes.

</div>

!!! warning "Before you install"

    zoompilot is experimental software. You drive the car, follow the law,
    and carry all the risk. Read the [safety page](../safety.md) first.

## Recommended: factory reset first

Factory-reset the device before installing. This clears stale settings
from previous forks — other [openpilot](../help/glossary.md#openpilot)-based software you may have run
before — and prevents odd behavior after switching.

## Install steps

<div class="zp-steps" markdown>

1. **Power on the comma device.** Finish the standard setup until it
   asks for software.
2. **Choose the custom software option.**
3. **Enter this URL:**

    ```
    zoompilot/main
    ```

4. **Let the device download and boot the release.** The first boot
   can take a few minutes.

</div>

That is the whole install.

## Watch the install

<details class="zp-demo">
<summary>Two short clips — the setup, the URL, the download</summary>
<figure class="zp-clip">
  <video controls preload="metadata" playsinline src="../assets/demo/install-comma-3-3x.mp4" aria-label="Demo: installing zoompilot on a comma 3/3X"></video>
  <figcaption>comma 3/3X — choose custom software, type the URL, download</figcaption>
</figure>
<figure class="zp-clip">
  <video controls preload="metadata" playsinline src="../assets/demo/install-comma-four.mp4" aria-label="Demo: installing zoompilot on comma four"></video>
  <figcaption>comma four — slide to install custom software, type the URL, download</figcaption>
</figure>
<p>The clips run the real setup wizard. The typed URL and the download are real.</p>
</details>

## What a fresh install turns on

On Mazdas with a 2022-25 CX-5 [EPS](../help/glossary.md#eps), a fresh install arrives with these
already on:

- Speed-dependent self-tune — zoompilot learns your steering motor as
  you drive
- Steers to a standstill — steering assist all the way down to a stop
- Full range of EPS steering torque — the most steering force the
  motor can give

You can change everything on the device. See
[First drive](first-drive.md) for the recommended settings.

## Branches

A branch is a named version of zoompilot. Almost everyone wants `main`.

| Branch | URL | What it is |
| --- | --- | --- |
| `main` | `zoompilot/main` | Prebuilt releases. Built ahead of time on a real comma device, so installing does not need an hour of compiling on the device. |
| `develop` | `zoompilot/develop` | Daily work. Less tested; use only if you follow development. |

## Updates

zoompilot checks for updates when the device has Wi-Fi. Every release
is prebuilt, so updates install in minutes, not hours of compiling.

## Switching from another fork

You can enter `zoompilot/main` over an existing fork install. A factory
reset is still the cleaner path. If you already run zoompilot, updates
arrive on their own: the device repoints itself on its next start.

<div class="zp-next" markdown>

- [First drive](first-drive.md)
  Recommended settings and your first engagement
- [Troubleshooting](../help/troubleshooting.md)
  If something looks wrong

</div>
