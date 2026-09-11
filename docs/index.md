---
title: Home
description: The owner's manual for zoompilot, free driver-assistance software for Mazda cars. Start here, check your car, install, and drive.
hide:
  - navigation
  - toc
---

<div class="zoom-hero" markdown>

<div class="zoom-copy" markdown>

# zoompilot wiki

<div class="zoom-tagline" markdown>
The owner's manual for zoompilot — driver-assistance software for your Mazda.
</div>

<div class="zoom-lede" markdown>
zoompilot is free, open-source software that helps your Mazda steer and
manage its cruise speed while you drive. It runs on a comma device: a
small computer with its own cameras that mounts behind your windshield.
You stay the driver the whole time. This wiki takes you from "what is
this?" to your first drive.
</div>

<div class="zp-cta-row" markdown>
[Start here →](getting-started/index.md){ .md-button .md-button--primary }
[Will it work on my car?](getting-started/supported-cars.md){ .md-button }
</div>

<div class="zp-build" markdown>
Install URL: `zoompilot/main` <span class="zp-stamp">· build 393a506e61 · 2026-08-25</span>
</div>

</div>

<div class="zoom-deco" aria-hidden="true">
  <svg viewBox="0 0 1188 380">
    <rect class="tile" style="fill:var(--zp-p46v)" transform="translate(110 170) rotate(-7)" x="-52" y="-52" width="104" height="104" rx="19"/>
    <rect class="tile" style="fill:var(--zp-p25d)" transform="translate(300 70) rotate(8)" x="-34" y="-34" width="68" height="68" rx="13"/>
    <rect class="tile" style="fill:var(--zp-p45p)" transform="translate(475 140)" x="-44" y="-44" width="88" height="88" rx="16"/>
    <rect class="tile" style="fill:var(--zp-p42m)" transform="translate(660 60) rotate(10)" x="-60" y="-60" width="120" height="120" rx="22"/>
    <rect class="tile" style="fill:var(--zp-p46g)" transform="translate(850 150) rotate(-4)" x="-38" y="-38" width="76" height="76" rx="14"/>
    <rect class="tile" style="fill:var(--zp-p47c)" transform="translate(1010 60) rotate(7)" x="-46" y="-46" width="92" height="92" rx="17"/>
    <rect class="tile" style="fill:var(--zp-p45b)" transform="translate(1120 200) rotate(-8)" x="-35" y="-35" width="70" height="70" rx="13"/>
    <rect class="tile" style="fill:var(--zp-p41w-hi)" transform="translate(240 300) rotate(4)" x="-28" y="-28" width="56" height="56" rx="10"/>
  </svg>
</div>

</div>

<div class="zp-home-section" markdown>

## From zero to your first drive

Six short pages, in order. Each one ends with a link to the next.

<div class="zp-journey" markdown>

1. [What is zoompilot?](getting-started/what-is-zoompilot.md)
   What it is, what it adds to your Mazda, and who makes it.
2. [Will it work on my car?](getting-started/supported-cars.md)
   The Mazda models and years it runs on.
3. [What you need](getting-started/hardware.md)
   The comma device and the Mazda cable kit.
4. [Safety rules](safety.md){ .zp-journey__safety }
   What stays your job, and the one mode that turns off emergency braking.
5. [Install](getting-started/install.md)
   Type one address on the device. No computer needed.
6. [First drive](getting-started/first-drive.md)
   The recommended setup, and how to turn it on and off.

</div>

</div>

<div class="zp-home-section" markdown>

## What it does on the road

zoompilot builds on the driver assistance your comma device already
gives you, and adds work made for Mazdas.

<div class="zp-tiles" markdown>

- :material-steering: [Steering](features/steering.md)
  Uses the full strength of the 2022-25 CX-5 steering motor, tuned for
  every speed.
- :material-road-variant: [Smart Cruise](features/smart-cruise.md)
  Lowers your cruise speed before a curve, then brings it back.
- :material-speedometer: [Speed-Limit Assist](features/speed-limit-assist.md)
  Reads speed limits and can set your cruise speed to match.
- :material-button-pointer: [Cruise buttons (ICBM)](features/icbm.md)
  Changes your cruise speed by pressing the car's own buttons for you.
- :material-bell-alert: [Fewer false alerts](features/alerts.md)
  Known false Mazda warnings are gone. Real faults stay.
- :material-car-cruise-control: [Alpha longitudinal](features/alpha-longitudinal.md) <span class="zp-badge zp-badge--experimental">Experimental</span>
  zoompilot drives the gas and brakes. Turns emergency braking off.

</div>

[All features →](features/index.md)

</div>

<div class="zp-safety" markdown>

## Safety comes first

- **You are the driver.** zoompilot assists you. It does not replace
  an attentive driver.
- **Take over at any time.** Turn the cruise off with its main button,
  and steering and speed are both yours again. With
  [MADS](help/glossary.md#mads), which is on by default, the brake
  pedal and the cancel button stop cruise control but leave steering
  on.
- **A camera checks that you are watching the road.** If you look
  away, zoompilot warns you, then turns itself off.
- **One mode turns off emergency braking.** Alpha longitudinal turns
  the car's radar off, so automatic emergency braking and forward
  collision warning stop working while it is on.

[Read the safety page :material-shield-alert:](safety.md){ .md-button }

</div>

<div class="zp-home-section" markdown>

## Need help?

<div class="zp-tiles" markdown>

- :material-help-circle: [Troubleshooting](help/troubleshooting.md)
  Dashboard errors, weak steering, will not engage — pick what you see.
- :material-frequently-asked-questions: [FAQ](help/faq.md)
  Cost, updates, uploads, battery, and more quick answers.
- :material-book-open-variant: [Words you'll see](help/glossary.md)
  Plain meanings for EPS, fork, route, and the rest.
- :material-message-text: [Ask on Discord](https://discord.gg/jFWkHC2uhh)
  The zoompilot community. Bring your car, release, and a route.

</div>

[All help pages →](help/index.md) · [Get involved →](community/index.md)

</div>

<div class="zp-home-section" markdown>

## Go deeper

<div class="zp-tiles" markdown>

- :material-chart-timeline-variant: [How zoompilot works](getting-started/how-it-works.md)
  One drive, from camera to wheels.
- :material-source-fork: [Which fork, and why](getting-started/comparison.md)
  zoompilot, sunnypilot, and openpilot side by side.
- :material-flask: [Technical notes](technical/index.md)
  The measurement record behind every change.
- :material-history: [Release notes](releases/changelog.md)
  What changed in every zoompilot build.

</div>

</div>
