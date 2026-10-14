---
title: How zoompilot identifies your car
description: How zoompilot names your Mazda from its parts and VIN, and how it spots a compatible Mazda EPS (2022+) wherever it is fitted.
source: zoompilot develop a7a6df8
---

# How zoompilot identifies your car

zoompilot identifies the car at startup to select its measurements and
features. On Mazda, it also checks for a compatible Mazda EPS (2022+),
including a swapped one.
{ .zp-lede }

## how it works

1. **Part firmware.** zoompilot reads the [firmware](../help/glossary.md#firmware) versions of the car's [ECUs](../help/glossary.md#ecu). If they match one known model, that is the answer.
2. **VIN.** If not, it reads the [VIN](../help/glossary.md#vin). The [WMI](../help/glossary.md#wmi) (characters 1 to 3), model line (4 and 5) and model year (10) must all name the same single model. An ambiguous VIN gives no match.
3. **Export cars.** JM0 VINs (Australia, New Zealand) have no model year, so they cannot be decoded. For these only, two parts must agree: a compatible Mazda [EPS](../help/glossary.md#eps) (2022+), and an engine computer whose firmware names exactly one model.

The VIN step matters most after a motor swap, because a donor EPS reports another model's firmware.

## compatible eps

zoompilot reads the EPS firmware on every Mazda. If it is one of three known versions, the car has a compatible Mazda EPS (2022+), whatever the model or year. If the EPS does not answer, zoompilot assumes the factory motor: compatible on the CX-5 2022–25 and CX-8 2023.

The torque limit, steering tune and steering delay are the same on every Mazda EPS. A compatible one changes only these:

- **Minimum steering speed.** It steers down to a stop. An older one stops below 28 mph (45 km/h) and returns above 32 mph (52 km/h).
- **Experimental speed control.** [Alpha Longitudinal](../features/alpha-longitudinal.md) is offered only with a compatible motor and a supported radar.
- **Steering dropouts.** If the motor stops applying torque, zoompilot stops asking after 0.2 s. Above 12 mph (19 km/h) you see "Steering Assist Temporarily Unavailable", but steering stays on.
- **Speed-band starting values.** See below.

## eps swap

Some owners fit a compatible Mazda EPS (2022+) to an older Mazda.

- **What it unlocks.** Steering down to a stop, and eligibility for Alpha Longitudinal. The CX-5 2012–16 and CX-9 2016–20 also need zoompilot to detect the G46L radar.
- **What it does not do.** It does not turn Alpha Longitudinal on. That stays off until you enable it, and it disables Mazda's [AEB](../help/glossary.md#aeb) and [FCW](../help/glossary.md#fcw) while on. It does not raise the torque limit.
- **Check the part, not the year.** zoompilot checks the EPS firmware, so model year alone does not confirm a donor part. Some 2022–25 CX-5s report an older firmware that does not count.
- **Starting values.** Base steering values still come from your car's model. The [speed bands](../help/glossary.md#speed-bands) start from the CX-5 2022–25's learned values on a swapped CX-5 2012–21, CX-9 2016–20, Mazda 3 or Mazda 6. A CX-9 2021+ starts from values learned on a swapped CX-9. [Self-tune](../help/glossary.md#self-tune) then learns your car.

This wiki gives no mechanical, wiring or alignment instructions. Ask in [Discord](https://discord.gg/jFWkHC2uhh) about your car and donor part, with its firmware version.

## dashcam-only

No Mazda is dashcam-only. The Mazda code never sets [dashcamOnly](../help/glossary.md#dashcamonly): every recognised Mazda uses the same EPS hardware, and zoompilot's limits are measured on it. An older motor keeps its 28 mph (45 km/h) floor instead.

## what you'll notice

- **Below the floor.** With an older motor, you see a low-speed steering warning under 28 mph (45 km/h).
- **CX-8.** The CX-8 2023 has no VIN code zoompilot reads, so it is recognised by firmware alone.
- **JM0 cars.** Their clusters show the set speed slightly high. zoompilot uses the number your cluster shows.
- **Wrong car.** Turn steering off and [share a route](../help/share-a-route.md).

<details markdown="1">
<summary id="key-numbers">VIN codes and steering threshold</summary>

| Value | What it means |
| --- | --- |
| JM1 | Japan-built cars: Mazda 3, Mazda 6. |
| JM3 | Japan-built crossovers for North America. |
| JM7 | Japan-built crossovers for export markets. Same model and year codes as JM3. |
| 3MZ | Mexico-built Mazda 3. |
| JM0 | Australia and New Zealand exports. No model year, so only the swap check applies. |
| 28 mph (45 km/h) | Steering floor of an older EPS. |

| Model | Model line | Years (code) | WMIs |
| --- | --- | --- | --- |
| CX-5 | KE | 2012–16 (C to G) | JM3, JM7 |
| CX-5 | KF | 2017–21 (H to M) | JM3, JM7 |
| CX-5 | KF | 2022–25 (N to S) | JM3, JM7 |
| CX-9 | TC | 2016–20 (G to L) | JM3, JM7 |
| CX-9 | TC | 2021–23 (M, N, P), export 2025 (S) | JM3, JM7 |
| Mazda 3 | BN | 2017–18 (H, J) | JM1, 3MZ |
| Mazda 6 | GL | 2017–21 (H to M) | JM1 |

</details>

## vin decoder

Enter a VIN or its first 10 characters. Decoding runs in your browser;
the VIN stays on this page.

<style>
  .zp-vin { margin: 1.4em 0 1.8em; }
  .zp-vin input {
    width: 100%; max-width: 34rem;
    padding: 0.55rem 0.8rem;
    font-family: var(--md-code-font-family, ui-monospace, monospace);
    font-size: 0.95em; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--zp-ink);
    background: var(--zp-card);
    border: 1px solid var(--zp-card-line);
    border-radius: 8px;
  }
  .zp-vin input:focus {
    outline: none;
    border-color: var(--zp-paint);
  }
  .zp-vin-out {
    margin-top: 0.9rem; max-width: 42rem;
    padding: 0.85rem 1rem;
    background: var(--zp-card);
    border: 1px solid var(--zp-card-line);
    border-radius: 10px;
  }
  .zp-vin-pill {
    display: inline-block;
    padding: 0.15rem 0.6rem;
    font-size: 0.72em; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    border: 1px solid var(--zp-card-line);
    border-radius: 99px;
    color: var(--zp-dim);
  }
  .zp-vin-good .zp-vin-pill {
    color: var(--zp-paint-hi);
    border-color: var(--zp-paint);
    background: color-mix(in srgb, var(--zp-paint) 16%, transparent);
  }
  .zp-vin-mid .zp-vin-pill { color: var(--zp-warn); border-color: var(--zp-warn); }
  .zp-vin-info .zp-vin-pill { color: var(--zp-tint); border-color: var(--zp-tint); }
  .zp-vin-body {
    margin: 0.6rem 0 0.1rem;
    color: var(--zp-dim);
  }
</style>

<div id="zp-vin-decoder" class="zp-vin">
  <input type="text" autocomplete="off" autocapitalize="characters"
         spellcheck="false" aria-label="VIN or VIN prefix"
         placeholder="VIN or first 10 characters">
  <div class="zp-vin-out" hidden aria-live="polite"></div>
</div>

## settings

- **Settings → Vehicle.** Leave it on automatic. A forced selection applies that model's measurements to your car, and it does not unlock features: the EPS check still reads your motor.

??? info "For developers"

    - Brand matcher: `opendbc_repo/opendbc/car/mazda/values.py`, `platform_from_vin` and `match_fw_to_car_fuzzy`. It runs after upstream's exact and generic fuzzy firmware match (`opendbc/car/fw_versions.py`, `match_fw_to_car`).
    - Platform table: `MazdaPlatformConfig.wmis`, `chassis_codes`, `years` per `CAR` entry. `MAZDA_CX8_2023` has none.
    - EPS check: `CarInterface._get_params` in `interface.py`. `STEER_TO_ZERO_EPS_FW` = KBST-3210X-A-00, KSD5-3210X-C-00, K0A1-3210X-A-00. Unread EPS falls back to `STEER_TO_ZERO_PLATFORMS` = {MAZDA_CX5_2022, MAZDA_CX8_2023}. Otherwise `minSteerSpeed = LKAS_LIMITS.DISABLE_SPEED` (45 kph) and `MazdaFlags.LEGACY_FW_EPS`.
    - `MazdaSafetyFlags.EPS_HW` is set on every Mazda: panda's `MAZDA_EPS_HW_STEERING_LIMITS` (1200, 12/12) apply to both firmwares. `steerActuatorDelay = 0.14` for all.
    - `alphaLongitudinalAvailable = steer_to_zero and (Bus.radar in DBC[candidate] or g46l_radar)`. `MAZDA_CX5_KE` and `MAZDA_CX9` have no radar bus.
    - Non-delivery latch: `STEER_UNDELIVERED_FRAMES = 20`, alert after 80 more frames above `STEER_UNDELIVERED_ALERT_MIN_SPEED` (12 mph); `steerTempUnavailable` becomes `steerTempUnavailableSilent` (`sunnypilot/selfdrive/car/car_specific.py`).
    - Speed bands: `torque_data/speed_dependent.toml`, `requires_steer_to_zero` read by `get_speed_dep_config_for_car` (`opendbc/sunnypilot/car/lateral_tune.py`). Base values: `params.toml` via `substitute.toml` (MAZDA_CX9_2021), `TORQUE_TUNES` for MAZDA_CX5_2022.
    - JM0: `MazdaFlagsSP.OCEANIA_CLUSTER`, cluster speed = held / 0.98 + 1 km/h. A selected platform that disagrees with the VIN logs `platformBundleVinMismatch`.
    - Engineering record: https://github.com/zoompilot/zoompilot/blob/develop/docs/zoompilot/mazda-fingerprinting.md. Measurements and route data live in the private zoompilot-research repository.
