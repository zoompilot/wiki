# Contributing to the zoompilot wiki

For editors of [zoompilot.ai/wiki](https://zoompilot.ai/wiki/). The site is
built with Zensical (Material for MkDocs syntax) from `docs/`.

## Reader

Someone installing zoompilot. They may be new to openpilot, or have run
openpilot, sunnypilot or another fork. They want to know what zoompilot
adds, whether it suits their car, how to install and set it up, and what
each feature does and why they would turn it on.

## Writing

- **Fork first.** Document what is specific to zoompilot: its features,
  Mazda support, the settings that matter, its controls and its safety
  differences. For general comma or openpilot material, link once to
  [comma's docs](https://docs.comma.ai) or
  [openpilot](https://github.com/commaai/openpilot).
- **Answer first.** Open with the result or action in one or two
  sentences, marked `{ .zp-lede }`. Background and engineering detail go
  after the practical answer.
- **Cut the obvious.** No reassurance, no "this page explains", no
  restating the heading. Put each warning in the one place it belongs;
  the notice that experimental speed control turns off AEB and FCW stays
  prominent wherever that feature is set up.
- **Fewest words that plainly say it.** Short sentences, active voice,
  "you" for the driver, "I" for the maintainer. Lowercase zoompilot,
  openpilot and sunnypilot. No em dashes. Say "compatible Mazda EPS
  (2022+)" for the hardware. Speeds as mph (km/h).
- **Keep conditions.** Never shorten a claim by dropping "on a compatible
  Mazda" or "with default settings" when they matter.
- **Features explain the why.** Each feature section says what it does for
  the driver (1–2 sentences), when you would want it, how to turn it on
  (exact on-device path in bold), the default, and limits worth knowing.
  Link its How-it-works page once. Never guess a default or compatibility
  rule.
- **Fewer pages, fewer links.** Link only where the reader would go next.
  Never link the same page twice on a page or repeat the site navigation
  in body text. No "see also" lists or hub pages of links.
- **Accuracy.** Check behaviour against the software being promoted
  (installs use `zoompilot/main`), not an old wiki page or memory. Record
  source revisions in REVAMP-REVIEW.md, not on reader pages.

Use lists for steps and parallel choices, tables for comparisons, and
plain links for navigation. Don't box ordinary prose; use a collapsible
only for substantial optional detail.

Show a screenshot to help readers find a control or recognise success.
Recheck images when the UI changes, label simulator captures, and remove
obsolete screens. Videos need controls and written steps; never autoplay.

## Components

The markup for each is in the comment headers of
`docs/stylesheets/v2.css`.

- **Lede.** `{ .zp-lede }` on the line after the opening paragraph.
- **At a glance.** `<div class="zp-glance" markdown>` around a list of
  facts, each starting with a **bold** label.
- **Badges.** `<span class="zp-badge zp-badge--alpha">Alpha</span>`; also
  `--experimental`, `--ok` and `--auto`.
- **Device paths.** `` `Settings → Cruise → …`{ .zp-path } ``.
- **Steps.** `<div class="zp-steps" markdown>` around a numbered list.
- **Next step.** `<div class="zp-next" markdown>` cards at the end of a page.
- **Device screenshots.** Each shot is a pair of figures,
  `.settings-figure-mici` (comma 4) and `.settings-figure-tici`
  (comma 3X), usually inside `<div class="zp-setting-shots" markdown="0">`.
  `device-switch.js` shows one set and remembers the choice; without
  JavaScript both render with their captions. Keep both figures when you
  move a section.
- **Settings explorer.** `<div class="zp-panel-cards" data-panel="…">`
  renders a panel from `settings-data.js`, with a `<noscript>` table
  fallback beside it.
- **Diagrams.** Inline SVG in `<div class="diagram">`, using the `d-box`,
  `d-flow`, `d-hi` and related classes so it follows the theme.
- **Admonitions.** `!!! danger` (amber) for the AEB/FCW notice;
  `!!! warning` for other hazards; `??? info "For developers"` for code
  paths and constants on technical pages. Keep them few.

## Structure

| Path | Purpose |
| --- | --- |
| docs/getting-started | Start here, supported cars, driving, how it works |
| docs/safety.md | zoompilot's safety differences |
| docs/features | One page per feature: why, how to turn it on, limits |
| docs/settings | Searchable settings reference |
| docs/help | Troubleshooting, FAQ, glossary |
| docs/technical | Design notes, checked against the code |
| docs/community, docs/releases | Community page, release history |
| docs/jetlink | Imported Jetlink guides (do not edit) |

Add new pages to `mkdocs.yml`. Keep existing URLs valid or add a redirect
in `contrib/_redirects`. Avoid moving feature URLs linked by zoompilot.ai.

**Technical pages** mirror the engineering records in the zoompilot
repository's `docs/zoompilot` by hand. Each page's `source:` front matter
names the commit it was checked against. The daily drift-check workflow
opens a "Wiki drift" issue when those records, or the current release on
zoompilot.ai, move ahead of the wiki.

**Review stamps.** A page that finished a full review pass carries
`reviewed: <date>` in its front matter. `python3 contrib/review-status.py`
lists reviewed pages and those still waiting.

## Settings

`docs/assets/js/settings-data.js` holds setting names, paths and defaults.
Update it against the device UI and params defaults, including comma 4
submenu names where they differ from comma 3X. Update the `<noscript>`
fallback tables alongside it. Don't show old screenshots with removed
settings.

## Imported and generated content

Don't edit `docs/jetlink` directly. The Jetlink repository is the source
of truth for its pages and images. Review its changes, then run:

```sh
python3 contrib/sync-jetlink.py --source ../jetlink --ref <reviewed-commit>
python3 contrib/sync-jetlink.py --check --source ../jetlink
```

The importer records the commit and file hashes in
`contrib/jetlink-import.json` and refuses to overwrite local edits. It
adapts links, expandable sections and comma install instructions to the
main release. Fix product instructions in Jetlink, and wiki-only
adaptations in the importer. Commit the output and manifest together.

The shared header and fonts come from the website:

```sh
python3 contrib/sync-brand.py --source /path/to/zoompilot-site
```

This imports the header rules from `site.css` and the exact WOFF2 fonts,
converting rem values to pixels because the wiki theme has a different
root size. Review `contrib/brand-import.json`, `stylesheets/fonts.css` and
`stylesheets/shared-header.css` together. Put wiki-specific layout in
`stylesheets/manual.css`.

`docs/assets/steering-torque-data.js` is generated by the site repo
(`npm run sync:wiki`); don't edit it. Release history
(`docs/releases/changelog.md`) is edited here: add each release at the top.
Imports are reviewed and committed; they never silently track upstream.

## Check before publishing

```sh
.venv/bin/zensical build --strict
```

Check phone and desktop widths, search, keyboard navigation, collapsibles,
setting filters, the device switch and videos. Walk through new-user
setup, switching from sunnypilot, and adding Jetlink. A successful build
does not verify vehicle behaviour.

Pushing `main` runs the Cloudflare Pages workflow, which builds with
`--strict`, copies `contrib/_headers` and `contrib/_redirects`, and
deploys. Use the agreed review process before pushing.
