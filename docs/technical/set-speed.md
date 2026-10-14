---
title: Who controls the set speed
description: How zoompilot presses your car's cruise buttons for curves and speed limits, and always gives your own set speed back.
source: zoompilot develop a7a6df8
---

# Who controls the set speed

With the car's own radar cruise ([MRCC](../help/glossary.md#mrcc) on a
Mazda), the car keeps the [set speed](../help/glossary.md#set-speed) and
brakes on its own. zoompilot changes that set speed with automatic
cruise-button commands ([ICBM](../help/glossary.md#icbm)): the same +/−
presses your thumb makes. It remembers your set speed while curve and
speed-limit adjustments run.
{ .zp-lede }

- **Your set speed is remembered exactly.** zoompilot keeps its own copy, and the dash walks back to it afterwards: on a Mazda about 4 mph/s (5 taps a second), once the target has held steady for 1 s (without camera lookahead).
- **Your presses win.** zoompilot reads only presses from the wheel, never its own. While you hold + or −, it sends nothing. Within about 1 second, the dash number becomes your new set speed.
- **It does not fight you.** For 3 seconds after a + it will not pull the dash down unless a new, lower curve appears. For 3 seconds after a − it will not raise it.

## when it runs

There is no ICBM switch. It runs on a supported car while a feature that needs it is on:

- **Slow for Curves (vision or map).** Only on stock radar cruise.
- **Speed-Limit Assist on Assist.** Always.
- **Custom ACC Speed Increments.** Always.

ICBM starts or stops only while you are disengaged with no cruise button held. While engaged with ICBM off, the device will not let you turn on a feature that needs it.

<details markdown="1">
<summary>Updating from the old ICBM toggle</summary>

If ICBM was off, the update disables its dependent features once to prevent
unexpected button commands. With stock cruise, both Slow for Curves settings
and custom increments turn off; Speed-Limit Assist changes to Warning.
With experimental speed control, only custom increments turn off;
Speed-Limit Assist stays on and now adjusts the dashboard set speed.

</details>

## speed-limit sessions

With [Speed-Limit Assist](../features/speed-limit-assist.md) on Assist, the limit plus your offset becomes a target the dash can follow.

1. **Prompt.** Half a second after you engage, or when the limit changes, the limit sign shows a blinking arrow and a chime plays. If the dash already shows the limit, the session starts without asking. At 50 mph (80 km/h) and above, a new limit of 50 mph or more applies without a prompt.
2. **Accept.** Press the button the arrow shows. A + raises your set speed to the limit. A − keeps your set speed and caps the car at the limit.
3. **Dismiss.** Press the other button (a normal step), or wait 5 seconds. zoompilot asks again only when the limit changes.
4. **End.** Any press during a session ends it. Your set speed becomes the number the dash settles on.

While a prompt is open, zoompilot will not raise the dash, but curve slowdowns still go through, because a curve cannot wait for your answer.

**Announcements.** "Adjusting to 45 mph" and a chime appear when you accept or when the car's settling speed changes. A limit above your set speed stays quiet.

## slowing before a curve

A Mazda's radar cruise brakes by how far the set speed sits below your current speed: a dash at the curve speed barely brakes, a dash far below brakes hard. When [Slow for Curves](../features/smart-cruise.md) or Speed-Limit Assist asks for braking, zoompilot holds the set speed a measured gap below your speed and follows you down:

- **Gentle braking** (0.5 m/s²) at 45 mph needs about 3.75 mph of gap.
- **A planned curve's maximum** (0.75 m/s², about 0.08 g) needs 10 mph at 45 mph, 7.75 mph at 65 mph.
- **Below 0.15 m/s²** there is no gap; the car coasts.
- **Near the target** the set speed sits no further below it than you are above it, so the car lands on the target, not under it.

Only Mazda has the measured braking table this needs. Other ICBM cars (some Hyundai, Honda and Chrysler models) walk the dash straight to the target.

ICBM never steps below the car's lowest set speed: the car's own value, otherwise 20 mph or 30 km/h. A Mazda holds 30 km/h, which an mph dash shows as 19 mph.

## with experimental speed control

zoompilot brakes for curves itself, so the dash keeps your set speed (or the limit cap) through a curve, with no gap. ICBM runs only for Speed-Limit Assist and custom increments. See [speed control](speed-control.md).

## settings

Under **Settings → Cruise**:

- **Speed Limit → Speed Limit.** Assist starts ICBM.
- **Speed Limit → Speed Limit Offset.** None, Fixed or %, from −30 to +30.
- **Slow for Curves: Vision / Map.** Either starts ICBM on stock radar cruise.
- **Custom ACC Speed Increments.** Starts ICBM; sets **Short Press Increment** (1–10) and **Long Press Increment** (1, 5 or 10).

??? info "For developers"

    Code at develop: `openpilot/sunnypilot/selfdrive/car/cruise_arbiter.py` (press
    classification and the SLA session on non-pcm cars), `cruise_ext.py` (setpoint,
    reconciler, ICBM latch hook), `card_ext.py` (call order, `gate_send_button`),
    `intelligent_cruise_button_management/` (`controller.py` servo, `demand.py` consumer
    table, `icbm_latch.py`, `migration.py`, `helpers.py` minimum set speed),
    `controls/lib/speed_limit/` (`assist_mirror.py`, `speed_limit_assist_zp.py`,
    `helpers.py`), `selfdrived/events_zp.py` (alert text), and
    `opendbc/sunnypilot/car/icbm_actuation_profile.py` (per-brand profile and
    `decel_overshoot` table).

    Constants: `PRE_ACTIVE_GUARD_PERIOD = 5 s`, `DISABLED_GUARD_PERIOD = 0.5 s`,
    `LONG_PRESS_FRAMES = 49`, `DRIVER_DIAL_PERIOD = 1 s`, `CONFIRM_SPEED_THRESHOLD = 80 km/h / 50 mph`,
    `RECONCILE_SETTLE_TIME = 1.0 s`, `RECONCILE_AGREE_KPH = 2 mph`, `INACTIVE_TIMER = 0.4 s`,
    `REACT_TIMER = 0.3 s`, `REACT_DEADBAND = 2` (limiter) / 1 (cruise), `RESTORE_QUIET_TIME = 1.0 s`,
    `DRIVER_PRESS_GRACE_T = 3.0 s`, `FAST_MODE_MIN = 3`, `FAST_STALL_T = 1.5 s`,
    `DECEL_OVERSHOOT_RISE = 10 mph/s`, `DECEL_OVERSHOOT_RELEASE = 3 mph/s`. Mazda profile:
    `tap_rate_hz = 5`, `walk_rate = 4.0`, `stock_a_budget = 0.75`, `track_gap = 8.0`,
    `min_decel = 0.15`, `gap_v` rows at 45 / 65 mph over `decel_bp` 0.15–1.05 m/s².
    Mazda `minimumSetSpeed = 30 km/h` (`opendbc/car/mazda/interface.py`).

    Migration is marked by `IcbmDemandMigrated` (`PERSISTENT | BACKUP`), so restoring a
    backup taken before it runs it again.

    Full engineering records:
    [cruise-arbiter.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/cruise-arbiter.md)
    and [icbm.md](https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/icbm.md).
    The measurements and route data behind them live in the private zoompilot-research
    repository.
