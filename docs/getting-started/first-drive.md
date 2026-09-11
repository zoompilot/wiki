---
title: First drive
type: path
description: The recommended zoompilot setup, what to check before you engage, and what to expect on your first drive.
reviewed: 2026-09-06
---

# First drive

A fresh install is ready to drive. This page covers the few choices
worth making first, what to check before you turn zoompilot on, and
what to expect on the road.
{ .zp-lede }

## Recommended setup

This is the recommended setup from Zeph
([@zephleggett](https://github.com/zephleggett)), zoompilot's lead
developer and maintainer.

<div class="zp-steps" markdown>

1. **Pick a driving model.** The driving model is the neural network
   that watches the road camera and plans the drive. New installs
   default to Firehose, also Zeph's pick. DTRv6 is a community
   favorite, and CD210 works well with
   [alpha longitudinal](../features/alpha-longitudinal.md).
2. **Trust the learned tune.** Keep self-tune on. Keep custom tune and
   manual real-time off. The learned values are better than hand
   tuning. On Mazdas with a 2022-25 CX-5 [EPS](../help/glossary.md#eps), a fresh install already
   has the steering toggles on — see [Install](install.md).

</div>

## Before you engage

To engage is to turn zoompilot's assistance on while you drive.

- Clean the windscreen in front of the road camera.
- Mount the device high and centered on the windshield.
- Make sure driver monitoring can see your face.
- Read the [safety page](../safety.md). Know how to take over: turn the
  cruise off with its main button. With
  [MADS](../help/glossary.md#mads), on by default, the brake
  pedal and the cancel button stop cruise control but leave steering
  on.

## Engaging

zoompilot engages like openpilot: set the cruise with the stock steering
wheel controls while driving above the minimum speed. On Mazdas with a
2022-25 CX-5 EPS the minimum speed is 0 mph, so the car can steer from
a stop.

What to expect on a first drive:

- Steering should feel confident at low speed and calm on the highway.
  The speed-dependent torque learns your specific motor over the first
  drives.
- Self-tune keeps improving the steering in the background. You do not
  need to touch anything.
- Nags — the prompts that ask you to pay attention or hold the wheel —
  stay honest. zoompilot suppresses the known false alerts, like the
  "place hands on wheel" warning on a 2022-25 CX-5 EPS. See
  [Alert fixes](../features/alerts.md).
- If anything feels wrong, turn the cruise off and read the
  [troubleshooting page](../help/troubleshooting.md).

## After the drive

Check [How to give feedback](../community/feedback.md) to report how the
car drives. Driving feedback with routes attached is the most useful
contribution there is. A route is one recorded drive — see
[Share a route](../help/share-a-route.md).

<div class="zp-next" markdown>

- [Features](../features/index.md)
  What each part of zoompilot does on the road
- [Settings](../settings/index.md)
  Every switch, and what it changes

</div>
