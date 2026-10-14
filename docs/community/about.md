---
title: About & credits
type: explanation
description: What this wiki is, who builds zoompilot, the projects it stands on, and the licensing notes.
---

# About & credits

Community documentation for [zoompilot](https://zoompilot.ai), maintained
in a public repository and published separately from the driving software.
{ .zp-lede }

## upstream projects

- [openpilot](https://github.com/commaai/openpilot) — the open source
  driver assistance system by comma.ai.
- [sunnypilot](https://github.com/sunnypilot/sunnypilot) — the fork
  zoompilot builds on, by sunnyhaibin and the sunnypilot community.
  [Their documentation](https://github.com/sunnypilot/user-docs) (MIT)
  provided the structure and some adapted content for this wiki.

## zoompilot contributors

- [@zephleggett](https://github.com/zephleggett) (ariste) — lead
  developer and maintainer of zoompilot. Contributions include
  speed-dependent torque tuning and ICBM fixes.
- [@yummydirt](https://github.com/yummydirt) — most of the initial reverse
  engineering for Mazda [alpha longitudinal](../features/alpha-longitudinal.md).
- [@mzdnick](https://github.com/mzdnick) (Nick) — VIN and [EPS](../help/glossary.md#eps)
  [fingerprinting](../help/glossary.md#fingerprint), zoompilot UI branding, cruise fixes.
- The [zoompilot Discord](https://discord.gg/jFWkHC2uhh) community —
  logs, routes, testing, and patience.

## Licensing notes

- zoompilot code derived from openpilot is MIT licensed. Components from
  sunnypilot carry sunnypilot's custom license; see the license files in
  the [zoompilot repository](https://github.com/zoompilot/zoompilot).
- This wiki adapts structure and some content from
  [sunnypilot/user-docs](https://github.com/sunnypilot/user-docs), which
  is MIT licensed. Adapted pages credit the source above.
- The openpilot safety and limitations text on the
  [safety page](../safety.md) comes from the openpilot project (MIT).

## Disclaimers

Mazda, comma.ai, and the sunnypilot project do not endorse zoompilot.
This manual is an independent community publication.
