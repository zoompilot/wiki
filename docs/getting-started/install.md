---
title: Install zoompilot
type: task
description: Connect your comma to the internet, choose custom software, and enter `zoompilot/main`. No computer is needed.
---

# Install zoompilot

Connect your comma to the internet, choose custom software, and enter
`zoompilot/main`. No computer is needed.
{ .zp-lede }

## before you start

- Your [car is supported](supported-cars.md) and the comma is mounted and connected.
- You have read the [safety and limitations](../safety.md).
- The car is parked and the device has power and internet access.

## switching from other software

A factory reset is recommended to clear settings from the previous
software. **Save your settings and upload any recordings you want to keep
before resetting.** You will need to set up the device again.

On a device already running software, open **Settings → Software** and use
the uninstall/reset option to return to setup. Follow the device's
confirmation screens; wording differs between comma models.

Already running zoompilot? Use [normal updates](../using-zoompilot/updates.md)
instead of resetting.

## install

1. **Power on the comma.** Finish the device setup and connect to Wi-Fi or a hotspot.
2. **Choose custom software** when asked what to install.
3. **Enter the install address:**

    ```text
    zoompilot/main
    ```

4. **Wait for installation and restart.** Keep power and internet connected until setup finishes.
5. **Check Settings → Software.** Confirm you are running zoompilot on `main`.

## check before driving

Leave the default driving model selected. Let any model download finish.
If the screen asks for calibration, follow its instructions; assistance
will not be available until the device is ready.

[Next: first drive →](first-drive.md)

<details>
<summary>Watch the installation on your device</summary>
<figure class="zp-clip">
<video controls preload="none" playsinline src="../../assets/demo/install-comma-3-3x.mp4" aria-label="Install zoompilot on comma 3X"></video>
<figcaption>comma 3X: choose custom software and enter the address.</figcaption>
</figure>
<figure class="zp-clip">
<video controls preload="none" playsinline src="../../assets/demo/install-comma-four.mp4" aria-label="Install zoompilot on comma 4"></video>
<figcaption>comma 4: follow the custom software setup.</figcaption>
</figure>
</details>

If installation fails, note the exact message and see
[Troubleshooting](../help/troubleshooting.md).
