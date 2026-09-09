---
name: write-wiki-page
description: Write and reword wiki content in the house register. Use when drafting or editing prose on any page — new sections, rewording, plain-English passes, feature descriptions, card and teaser copy, safety wording. Carries the register rules: everyday words for newcomers on user pages, code terms kept on technical pages, part-precise capability claims, the acronym and abbreviations.md conventions, and the verbatim freeze on comma's safety text.
---

# Write wiki content

## Two audiences

- **User pages** (everything outside `docs/technical/`): a total
  newcomer who has never used openpilot-style software. Everyday words.
  Gloss or link community vocabulary (fork, route, panda) unless the
  device itself shows the word (LKAS, NO PANDA).
- **`docs/technical/`**: an openpilot-literate Mazda owner. Code terms
  may stay. These pages are near-verbatim imports — keep the author's
  voice; change structure and links only.

## The register

Plain, everyday wording. "Comes preconfigured", "stores your settings on
the device" — not "seeds the torque-control stack". Keep exact technical
terms (EPS, ECU, alpha longitudinal) and simplify only the English
around them. Translate dev-speak: "backported" → "goes into new
releases only", "throws errors" → "shows errors".

Short sentences. Active voice. One idea per sentence.

## Working with Nick

- Light touch beats rewrites. Edit the few words that are wrong.
- When Nick dictates wording, his sentence wins — apply it as an exact
  replacement. Small grammar fixes are fine; re-compressing his text is
  not. If two dictations conflict, the latest wins.
- Wording he cares about iterates over a few turns. Don't pre-optimize.

## Facts and claims

- **No boundary claims.** Describe what the system does, never what it
  does not. Scope grows fast; a "doesn't do X" line goes stale into a
  lie. Futures live on the roadmap page only.
- **Name the exact part.** "Mazdas with a 2022-25 CX-5 EPS motor" —
  never "2022+ EPS Mazdas". Car claims keep model-year form
  ("2021-23 CX-9").
- **Never invent facts.** If a claim needs a source you can't verify,
  leave a `TODO(pass-2):` comment naming the source (a CONTRIBUTING.md
  rule). Ground claims in what the reader can see or check on the
  device.
- **State each fact once**, on its canonical page; link from elsewhere.
  Fold stray duplicates into the nearby section that survives.

## Acronyms and abbreviations

- Spell out on first use. An "(ABBR)" parenthetical only pays off when
  the acronym recurs on the same page — otherwise drop it. Card and
  teaser copy spells out with no parenthetical; target pages introduce
  their own acronyms.
- `docs/includes/abbreviations.md` auto-appends sitewide hover tooltips
  on EVERY match on EVERY page. Before adding an entry, grep all pages
  for the bare token — a wrong entry mislabels it everywhere. Keep the
  list short; full terms live in the glossary.

## Safety text

Comma's safety wording is frozen verbatim (the basis, fork-rules, and
Limitations lists on the safety pages). Titles, formatting, and hrefs
may change; rewording the frozen text needs an explicit correctness
case. `!!! danger` is reserved for the alpha-longitudinal radar/AEB
rules; use `!!! warning` / `!!! note` / `!!! tip` elsewhere.

## Construction

- One `#` H1 per page, matching the `title:` frontmatter.
- Admonitions for warnings — never plain bold. Tables for settings and
  comparisons.
- Heavy media (video, screenshots) ships auto-collapsed in
  `<details>`, `preload="metadata"`, `loading="lazy"` — the wiki stays
  light on first load.

## Verify

Structural risk (links, headings, nav) → `wiki-page-lifecycle`. Full
quality pass → `review-wiki-page`. A strict build before push is always
free: `.venv/bin/zensical build --strict`.
