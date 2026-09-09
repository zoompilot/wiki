---
name: update-settings-page
description: Update the settings page (/settings/) when upstream settings change. Use when the release watch flags settings drift, a setting appears or changes on the device, a panel is added, or screenshots need regenerating — covers settings-data.js (the hand-edited card source), the per-panel DOM contract the explorer script depends on, and the capture-settings.py simulator screenshot flow.
---

# Update the settings page

The settings page is data-driven: `docs/settings/index.md` supplies the
structure, `docs/assets/js/settings-data.js` supplies the content.

## Where the data lives

`settings-data.js` (`window.ZP_SETTINGS`) is the single hand-edited
source for the card view — NOT generated. When on-device settings
change, edit the entries there to match. The explorer script renders
the cards, the search box, and the panel chips from it.

## The per-panel DOM contract

`settings-explorer.js` walks siblings from each card mount. Keep every
panel in this exact shape, in this order:

```
## Panel H2
<details class="zp-collapse">      <- screenshots, auto-collapsed
  <figure>…comma four strip…</figure>
  <figure>…comma 3/3X shot…</figure>
</details>
intro paragraph
<div class="zp-panel-cards" data-panel="…"></div>
```

Never wrap a mount in another element and never reorder the siblings —
panels collapse by hiding the heading-plus-screenshots siblings of the
mount. Panel H2s are anchor-stable (`/settings/#software` links exist);
retitle one only after sweeping inbound anchors (see
`review-wiki-page`).

Device switcher: the `?device=tici` URL param wins over the
`zp-settings-device` localStorage pick. No-JS readers get both figure
sets stacked — keep figure captions.

## Screenshots

The PNGs are simulator renders, not device photos. Regenerate with
`contrib/capture-settings.py` from a zoompilot clone root
(`PYTHONPATH=. SCALE=4`; `DEVICE=tici` for comma 3/3X, default mici =
comma four). The full procedure, including the photo fallback, lives in
`docs/assets/settings/README.md`.

## New panel checklist

1. Two image files: the comma four strip in `docs/assets/settings/`,
   the comma 3/3X shot in `tici/`.
2. One `<figure>` pair inside the panel's `details.zp-collapse`.
3. Entries in `settings-data.js`.
4. Panel H2 and mount div in the page, in sibling order.

The page's `<noscript>` points readers at `settings_ui.json` and
`params_keys.h` upstream — keep setting names true to the device's
param keys.

## Verify and ship

Build (`.venv/bin/zensical build`), then run the rendered probes from
`review-wiki-page` against `/settings/` (mount
`#zp-settings-controls`). Commit the touched files, push — the push
auto-deploys.
