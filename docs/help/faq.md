---
title: Frequently asked questions
type: reference
---

# Frequently asked questions

Quick answers about hardware, setup, and daily use.
{ .zp-lede }

## before you start

### Is my Mazda supported?

Check the [compatibility guide](../getting-started/supported-cars.md).
Year, region, steering firmware, and radar can affect the features you get.

### What about other car brands?

zoompilot runs on sunnypilot-supported cars. Mazda-specific changes do
not apply to every brand. Check the full car list before installing.

### How much does zoompilot cost?

The software is free and open source. You need a supported comma device
and your car's cable kit. [Hardware](../getting-started/hardware.md).

### Do I need Jetlink?

No. The comma runs its own driving model. [Jetlink](../jetlink/index.md)
is an optional way to run larger models on another computer or phone.

### Why do I need a nav SD card?

For car-supplied speed-limit information on supported Mazdas. Downloaded
maps for curve slowdowns and map speed limits are separate; they do not
require Mazda's SD card.

### Is zoompilot affiliated with Mazda, comma.ai, or sunnypilot?

No. It is a community project. Those organisations do not endorse or
support zoompilot. [About & credits](../community/about.md).

## installing and updating

### How do I install or update zoompilot?

Install using `zoompilot/main`. For normal updates, use Settings → Software.
[Install](../getting-started/install.md) · [Update](../using-zoompilot/updates.md).

### I switched forks. Should I factory reset?

A reset is recommended to clear old settings. Save settings and upload
recordings you need before resetting.

### Do fresh installs need tuning?

No manual tuning is needed. Keep the default model and learned steering.
[Recommended setup](../settings/recommended.md).

### Where did the ICBM and speed-dependent switches go?

Cruise-button control starts automatically when a feature needs it.
Speed-dependent learning follows Self-Tune. Neither needs a separate switch.

## on the road

### Does pressing the brake turn steering off?

On a Mazda with default settings, no. Brake and CANCEL stop cruise but
leave steering active. Main cruise off turns both off. The optional
TJA-button setting changes this. [Read the controls](../using-zoompilot/controls.md).

### Why does cruise speed change by itself?

Slow for Curves and Speed-Limit Assist can change it when enabled.
[Understand the screen](../using-zoompilot/screen.md).

### What is experimental mode?

It lets the driving model plan acceleration and braking, including
responses to lights and signs. It can make mistakes. On Mazda it needs
[experimental speed control](../features/alpha-longitudinal.md), which
disables automatic emergency braking and forward collision warning.

### Will it drain my car's battery?

The comma has an offroad shutdown timer, configurable under
Settings → Device → Max Time Offroad. The default is 30 hours; external
Jetlink computers have their own power behaviour. Check your installation
if you park for long periods.

## your data

### Does zoompilot upload my drives?

Route uploads are enabled by default. Driver-camera recording and
microphone recording are off by default. See [Privacy](privacy.md)
before changing recording or sharing settings.

### How do I share a route?

[Watch the video and follow the steps](share-a-route.md). Upload all full
logs, preserve the route, then choose who can access it.

### How can I help?

[Share useful feedback](../community/feedback.md), report issues, or
[contribute](../community/contribute.md).
