# Owner's manual revamp: review notes

Prepared 2026-10-14 for local review. No push or deployment performed.
The manual describes the current software intended for the upcoming main
release and consistently installs zoompilot/main.

## Reading paths

- Start here offers new-comma and existing-openpilot/sunnypilot paths.
- Using zoompilot covers steering/cruise controls, screen messages, and updates.
- Features separates normal setup from optional and experimental functions.
- Settings leads with recommended choices and retains a searchable reference.
- Jetlink imports platform setup, daily use, models, limits, and help.
- Help includes the supplied route-sharing video and written steps.
- Technical records and community pages remain available outside the primary header.

## Sources checked

- zoompilot develop: a7a6df8e882a4b3451277824fc80d36666fb3dde.
- Its pinned opendbc: 7c4f2d45c9168dc1cfb1c4281c2414b8148843c6.
- Jetlink: d6c59f31591fb8c7550aec4c442278f951aa49cc (v0.8.6).
- Website source: de7cb17f25d2 (full revision in contrib/brand-import.json).
- Website style decisions in Claude memories; public zoompilot.ai pages.
- Route-sharing procedure: https://community.sunnypilot.ai/t/share-a-route/1916.

The main checkout was on danger-unstable. The checked UI layouts, defaults,
Mazda seeding, ICBM demand, and torque-learning extension had no diff from
the develop revision above. The active opendbc matched develop's pin.

The website checkout was located in the Claude session scratch directory.
The shared header now imports its exact fonts and header rules, with units
adapted to prevent Material's root font size changing the header dimensions.
The public website itself was not modified.

## Important factual corrections

- Speed-dependent learning benefits supported torque-steering cars across
  brands; Mazda also gets hardware-specific tuning.
- ICBM is automatic when a feature requires it; no separate toggle.
- Slow for Curves replaces the Smart Cruise label.
- Self-Tune controls speed-dependent learning; no separate switch.
- Downloaded maps and Mazda's navigation SD card serve separate purposes.
- Mazda Alpha Longitudinal requires compatible steer-to-zero firmware and
  supported radar. Older stock steering firmware alone does not qualify.
- TJA-button mode changes how steering is switched off. The default control
  table now states its assumptions and explains this option separately.
- comma 4's speed-limit Information/Warning display differs from comma 3X.
- Old technical records are identified as historical design evidence,
  rather than current setup instructions.

## Maintenance

- contrib/sync-jetlink.py imports a reviewed commit, adapts links and
  main-release installation, and refuses to overwrite edited imports.
- contrib/jetlink-import.json records the commit and generated file hashes.
- contrib/sync-brand.py imports website header CSS and the same WOFF2 fonts.
- contrib/brand-import.json records its source revision and hashes.
- Existing feature URLs are retained. The old Jetlink tester guide redirects
  to the dedicated section. Direct deployment copies redirects as well as headers.
- Old settings screenshots remain assets but are no longer shown as current UI.
  Capture instructions moved to contrib/capture-settings-notes.md.
- No-JavaScript settings tables are retained alongside the interactive reference.

## Validation

- Strict Zensical build using the same config with an isolated output/cache
  directory to avoid colliding with the user's live preview.
- Deterministic Jetlink regeneration check: 40 imported files.
- Python import scripts compile; settings JavaScript passes syntax checking.
- Built HTML checked for local links, anchors, images, videos, posters,
  stylesheets, scripts, and malformed description metadata.
- User screenshots identified and helped correct the malformed home meta tag
  and Zensical's absolutely positioned, bold header title.

Browser screenshot automation could not run: the sandbox blocked Chromium's
macOS process registration. The final phone/desktop visual pass, dark/light
appearance, keyboard navigation, search, and runtime setting filters remain
for interactive review. No on-device or vehicle validation was performed.

## Suggested review

Open the home page, follow each Start here path, inspect controls and the
experimental warning, search Settings, open the five Jetlink setup guides,
and play the route-sharing video. Resize to a narrow phone width and check
navigation, tables, and warnings. Confirm the intended software promotion
has reached main before publishing the manual.

Header follow-up: the brand bar now uses independent zp-sitebar,
zp-site-id, and zp-site-nav markup rather than Zensical title/tab classes.
Wiki utility buttons are positioned outside that bar’s layout flow, so
they cannot change its baseline or height. The theme header-title scroll
component is not mounted for the fixed website wordmark.
