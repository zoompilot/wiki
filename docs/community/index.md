---
title: Community
type: reference
description: Get help and report problems, contribute code or docs, follow the roadmap, and the people and projects behind zoompilot.
---

# Community

zoompilot is a community project. Ask and answer questions on Discord,
report problems with a recorded drive, and help with code or this wiki.
{ .zp-lede }

## feedback

The [zoompilot Discord](https://discord.gg/jFWkHC2uhh) is the main
community space: ask setup questions, share how your car drives, and help
new owners.

To report a problem, post in Discord or open a
[GitHub issue](https://github.com/zoompilot/zoompilot/issues) with:

- Car model, year and country, and whether the steering motor is original or swapped.
- comma model and zoompilot version (**Settings → Software**).
- The exact alert or behaviour, and the time it happened in the recording.
- Relevant settings, such as experimental speed control or Jetlink.
- What you expected instead.

For steering, add the speed range and whether Self-Tune was on.
[Share the drive](../help/troubleshooting.md#share-a-drive) if a reviewer
needs it, and only share recordings you are comfortable making public.

If assistance feels wrong, stop using it. Don't keep driving with a fault
to record more examples.

## contributing

The code is at [zoompilot/zoompilot](https://github.com/zoompilot/zoompilot)
on GitHub. Pull requests are welcome; read its
[CONTRIBUTING](https://github.com/zoompilot/zoompilot/blob/main/docs/CONTRIBUTING.md)
first. To set up a development environment or port a car, start with
[comma's guides](https://docs.comma.ai), then the Mazda port in
[How zoompilot identifies your car](../technical/car-identification.md).

To fix this wiki, use the edit icon beside a page title. The wiki's
[CONTRIBUTING.md](https://github.com/zoompilot/wiki/blob/main/CONTRIBUTING.md)
has the workflow and style.

## roadmap

Work in progress happens in the zoompilot repository and on Discord. A
planned feature may not ship; the
[release history](../releases/changelog.md) records what did.

- **Jetlink.** [Operating limits](../jetlink/status.md) separate tested
  platforms from experimental support. Follow the
  [Jetlink repository](https://github.com/zoompilot/jetlink) for updates.
- **Upstream.** [sunnypilot releases](https://github.com/sunnypilot/sunnypilot/releases) ·
  [openpilot roadmap](https://github.com/commaai/openpilot/blob/master/docs/contributing/roadmap.md)

## about and credits

This wiki is community documentation for [zoompilot](https://zoompilot.ai),
maintained in a public repository and published separately from the driving
software.

### upstream projects

- [openpilot](https://github.com/commaai/openpilot): the open source
  driver assistance system by comma.ai.
- [sunnypilot](https://github.com/sunnypilot/sunnypilot): the fork
  zoompilot builds on, by sunnyhaibin and the sunnypilot community.
  [Their documentation](https://github.com/sunnypilot/user-docs) (MIT)
  provided the structure and some adapted content for this wiki.

### zoompilot contributors

- [@zephleggett](https://github.com/zephleggett) (ariste): lead
  developer and maintainer. Contributions include
  speed-dependent torque tuning and ICBM fixes.
- [@yummydirt](https://github.com/yummydirt): most of the initial reverse
  engineering for Mazda [alpha longitudinal](../features/alpha-longitudinal.md).
- [@mzdnick](https://github.com/mzdnick) (Nick): VIN and EPS
  fingerprinting, zoompilot UI branding, cruise fixes.
- The zoompilot Discord community: logs, routes, testing, and patience.

### licensing

- zoompilot code derived from openpilot is MIT licensed. Components from
  sunnypilot carry sunnypilot's custom license; see the license files in
  the zoompilot repository.
- This wiki adapts structure and some content from sunnypilot/user-docs
  (MIT), credited above.

Mazda, comma.ai, and the sunnypilot project do not endorse zoompilot.
This manual is an independent community publication.
