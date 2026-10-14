---
title: Speed-Limit Assist
type: feature
---

# Speed-Limit Assist

Speed-Limit Assist uses limits from your car or downloaded maps.
You choose whether it only provides information or changes cruise speed.
{ .zp-lede }

## choose a mode

While parked, open **Settings → Cruise → Speed Limit**.

| Mode | Behaviour |
| --- | --- |
| Off | Does not use speed-limit assistance. |
| Information / info | Uses speed-limit information without changing your cruise speed. |
| Warning / warn | Warns about exceeding the detected limit on displays that support it. |
| Assist | Can adjust cruise speed to the detected limit. Read the confirmation prompt. |

Information is the default. **The comma 4 does not show the same
Information/Warning sign display as the comma 3X.** Assist prompts are
shown when a cruise-speed change is requested.

## choose a source

- **Car:** on a supported Mazda, the car's speed-limit information needs a navigation SD card.
- **Map:** download maps for your region through sunnylink.
- **Car-first or map-first:** use the other source when the preferred one has no limit.
- **Combined:** use the lower limit when both sources provide one.

The source and offset controls are next to the mode setting. Start with
no offset while you learn how the feature behaves.

## when a limit changes

Read the prompt, including the requested speed and button. Confirm only
when the speed is appropriate. While confirmation is pending, the prompt
does not itself change your cruise speed.

Automatic cruise-button control starts when Assist needs it on a
compatible car. There is no separate ICBM switch.

!!! warning "Check the posted limit"

    Signs and map data can be missing, outdated, or wrong. You remain
    responsible for following the actual speed limit and choosing a
    speed safe for the conditions.

## stop using it

Choose **Information** to stop speed adjustments, or **Off** to stop
speed-limit assistance entirely. Make changes while parked.

[Settings reference](../settings/index.md#cruise) ·
[Cruise controls](../using-zoompilot/controls.md) ·
[Technical design](../technical/set-speed.md#speed-limit-sessions)
