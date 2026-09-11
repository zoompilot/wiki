# zoompilot wiki v2 — review, plan, and what changed

Draft of 2026-09-11 on the local branch `v2`. Nothing here is pushed.
Written for Nick, to read before deciding what to merge.

## The short version

- **Audience.** Every page outside Technical is now written for a
  newcomer who has never heard of openpilot, a comma device, or
  zoompilot. Technical pages keep their engineering voice.
- **Structure.** Eight tabs became seven, each with one job:
  Home · Start here · Features · Settings · Help · Technical ·
  Community. The Reference tab (a mix of FAQ, troubleshooting,
  changelog, credits, a maintainer runbook, and the whole technical
  section) is gone. Every moved URL has a 301.
- **A path.** Home and Start here show a numbered six-step path —
  what it is → will it work on my car → what you need → safety →
  install → first drive — and every page on it ends with a *Next step*
  card.
- **Components.** A lede on every page, an *At a glance* box on every
  feature (status, works on, where the switch is, what it needs),
  numbered steps on tasks, settings paths styled like the device, and
  a live style guide for editors.
- **Measured.** High-severity unexplained jargon on reader pages:
  73 → 23. Navigation problems flagged by the inventory (pages nested
  too deep, nav and folder disagreeing, orphans, dead links): 31 → 0.
  Every page passes a 390px no-overflow check in both schemes.
- **Needs you.** Seven facts I could not confirm are listed under
  *Open questions*; nothing was guessed to fill a gap.

## How the review was done

Three new skills (in `.agents/skills/`, local like the others) did the
planning and checking, so the same method can run again:

| Skill | What it does | Scripts |
| --- | --- | --- |
| `wiki-ia-planner` | audit and plan the nav, reader journeys, moves and redirects | `inventory.py` — every page with nav location, type, words, links in/out, plus IA flags |
| `wiki-page-templates` | six page types, the newcomer lens, templates | `newcomer-lint.py` — unexplained jargon, long sentences, repo internals; `first-use-links.py` — links first uses of core terms to the glossary |
| `wiki-design-system` | tokens, components, rules, render verification | `render-check.py` — build, screenshot, and probe pages in both schemes and widths |

Inputs: all 45 pages, `mkdocs.yml`, the theme overrides, 1,464 lines
of `custom.css`, the six widgets, the six existing skills, 204
commits of history, and the live site on zoompilot-wiki.pages.dev.

## Findings, ranked

### Broken or wrong

1. **The phone header collides.** At 390px the wordmark overlaps the
   injected "zoompilot.ai ↗" link — confirmed on the live site. Fixed:
   the link hides below 45em (the footer carries it too).
2. **Pages contradict each other on car support.** Troubleshooting said
   "zoompilot targets Mazdas with a 2022-25 CX-5 EPS"; Supported cars
   says every listed Mazda runs. The FAQ said the CX-5 motor "unlocks
   alpha longitudinal"; Supported cars ticks alpha longitudinal on the
   stock 2017-21 CX-5 and calls the motor "recommended". Fixed on
   Troubleshooting and the FAQ. Still open on the glossary and
   technical/eps-swap — see *Open questions*.
3. **A reader page linked a maintainer file.** Settings linked
   `assets/settings/README.md` (the screenshot capture checklist).
   Moved to CONTRIBUTING.
4. **The site-sync runbook listed a generated file that does not
   exist** (`car-checker-data.js`). Row removed.
5. **The glossary had no entry for "fork", "engage", "upstream", "set
   speed", "harness", "firmware", "servo"** — words on almost every
   page. Added, and every term now has its own anchor
   (`glossary/#eps`).

### Hard to find

6. **Technical notes sat three clicks deep** (Reference → Technical
   notes → page). Now a tab.
7. **Reference was a junk drawer**, and four of its pages lived in
   other folders (FAQ in `community/`, troubleshooting at the root).
   Folded into Help, Community, and Technical; folders now follow tabs.
8. **"Share a route" was the most-linked task** (five pages point to
   it) and lived at the bottom of Troubleshooting. Now its own page;
   Troubleshooting keeps a short section so `#share-a-route` still
   lands.
9. **Feature pages did not say where the switch is.** Alpha
   longitudinal never named Settings → Developer. Every feature page
   now has the device path, the default, and what it needs.
10. **No start path.** Home offered nine equal cards; a newcomer had to
    guess the order.

### Confusing for a newcomer

11. **The first line of the home page used two unexplained words** —
    "a Mazda-optimized fork of sunnypilot". The hero now says what
    zoompilot does, what it runs on, and that you stay the driver.
12. **Jargon density.** 73 high-severity first uses with no
    explanation on reader pages (openpilot, EPS, fork, envelope,
    servo…). Now 23; the rest are inside wording you iterated on and
    are listed as a backlog below.
13. **Maintainer text on reader pages** — the settings intro named JS
    files and the capture tool; the sync runbook sat in Reference.
14. **The comparison table spoke engineer** ("EPS-rail-aware limits and
    cliff-exact friction"). Rows now say what the driver gets.
15. **Guides mixed four kinds of page**: a tester guide (jetlink), an
    explanation (custom tune), privacy, and a real task (ECU reset).
    Each went where its reader looks.
16. **Small print.** Admonitions and tables rendered at 12.8px. Lifted
    toward body size.

## The v2 structure

```
Home
Start here        getting-started/  (+ safety.md at the root)
  What is zoompilot? → Will it work on my car? → What you need →
  Safety → Install → First drive │ How zoompilot works · Which fork, and why
Features          features/         (slugs unchanged — zoompilot.ai deep-links them)
Settings          settings/         index · Custom tune
Help              help/             Troubleshooting · ECU reset · Share a route ·
                                    FAQ · Glossary · Privacy
Technical         technical/        unchanged paths, short nav labels
Community         community/        Feedback · Contribute · Test jetlink · Roadmap ·
                  releases/         Release notes · About · Style guide · Site sync
```

### Moves (all 301, with and without trailing slash, in `contrib/_redirects`)

| Old | New |
| --- | --- |
| `/troubleshooting/` | `/help/troubleshooting/` |
| `/how-to/` | `/help/` |
| `/how-to/ecu-reset/` | `/help/ecu-reset/` |
| `/how-to/privacy/` | `/help/privacy/` |
| `/how-to/custom-tune/` | `/settings/custom-tune/` |
| `/how-to/jetlink/` | `/community/jetlink/` |
| `/community/faq/` | `/help/faq/` |
| `/reference/` | `/help/` |
| `/reference/glossary/` | `/help/glossary/` |
| `/reference/site-sync/` | `/community/site-sync/` |
| `/about/` | `/community/about/` |

New pages: `help/index.md`, `help/share-a-route.md`,
`community/style-guide.md`. Retired: `how-to/index.md`,
`reference/index.md`. No `/features/*` slug moved.

## Design

The zoompilot.ai look stays: paint-tinted canvas, the eight CX-5
paints, Inter / JetBrains Mono / Audiowide, pill buttons. v2 adds
`docs/stylesheets/v2.css` (custom.css is untouched) with:

- **Reading rhythm** — body 16.8px at 1.72 line height, heavier H2s
  with a hairline above, readable admonitions and tables.
- **Lede** — the answer-first paragraph, in larger type.
- **At a glance** — label/value rows; stacks on phones.
- **Badges** — On by default, Automatic, Alpha (amber, mirrors the
  device's "(Alpha)"), Experimental (red — alpha longitudinal only).
- **Settings path** — `Settings → Cruise → …` styled as a device chip.
- **Steps** — numbered dots on a rail, for tasks.
- **Journey** — the numbered start path; the safety step wears red.
- **Next step** — end-of-page cards, first one labelled "Next step".
- **Home** — hero, journey, feature tiles, safety band, help and
  go-deeper rows; grids balance themselves (6 → 3 + 3).

Everything is authored in plain markdown (`attr_list`, `md_in_html`,
already enabled). Without CSS it degrades to lists and paragraphs that
still read correctly. All of it is shown live on the style guide page.

## What changed on each page

| Page | Change |
| --- | --- |
| Home | rewritten for newcomers: hero, journey, tiles, safety band, help, go deeper; build stamp span kept for `build_stamp.py` |
| Start here (hub) | journey, "understand it first" cards, five words you will meet |
| What is zoompilot? | lede, three-line openpilot/sunnypilot/zoompilot box, EPS gloss, next step; your intro and lists kept |
| Will it work on my car? | new title and lede, legend as a box, "Have an older Mazda?", clearer fingerprinting section; **first table untouched** (the site sync reads it) |
| What you need | rewritten: what a comma device is, the kit, what "harness" means, extras explained |
| Safety | "In short" box on top, next step; comma's frozen text untouched |
| Install | glance box (before you start, you need, time), numbered steps, branches explained, updates section |
| First drive | lede, steps, "engage" and "nags" explained; your wording kept |
| How zoompilot works | lede and next-step cards only; your "You" section untouched |
| Which fork, and why | short-answer box, plain row labels, glosses; facts unchanged |
| Features (hub) | grouped cards with status badges, "Out of the box" table |
| Each feature page | lede and *At a glance* (status, works on, switch, needs, what you will notice) |
| Settings | driver-first intro, maintainer notes moved to CONTRIBUTING; the per-panel DOM contract is untouched |
| Custom tune | moved under Settings, short-version lede |
| Help (hub), Share a route | new |
| Troubleshooting | lede; car-support contradiction fixed; wizard anchors untouched |
| ECU reset | lede that explains ECUs, numbered steps |
| FAQ | grouped into five topics (anchors unchanged — ids come from the text) |
| Glossary | "words you will meet first", nine new terms, an anchor per term |
| Community (hub) | take part / follow along / for wiki editors |
| Technical pages | "About this page" + collapsed "Code and tests"; author's text unchanged; no front matter added |

## Open questions — facts I could not confirm

1. **Brake pedal and MADS.** First drive and comma's safety text say
   the brake pedal is a way to cancel. The settings data says Steering
   Mode on Brake Pedal defaults to *Remain Active*. On a default
   install, does the brake release steering? New text uses your
   "Cancel cruise control, and the car is fully yours again"; the old
   line in First drive is unchanged.
2. **Smart Cruise on the stock radar.** I wrote that it changes the set
   speed "through ICBM". ICBM is off by default — does a driver have to
   turn ICBM on for Smart Cruise to work on stock cruise?
3. **Alpha longitudinal availability.** Supported cars says the CX-5
   motor is *recommended*; the glossary's steer-to-zero flag entry and
   the EPS swap table still say it *unlocks* / is *not available*
   without it. Which is current?
4. **"The zoompilot author"** on First drive — who? (zeph, you, or
   another?)
5. **Nav SD card** — described as "Mazda's navigation map card, which
   goes in your car's own SD card slot". Right?
6. **Install needs the device online** (Wi-Fi or hotspot) — right for
   every device?
7. **Radar readouts setting** — Sensor readouts names only the
   blind-spot screen setting; is there a switch for the radar readout?

## Before merging

- **Build with Zensical.** v2 was built and screenshot-tested with
  MkDocs + Material 9.7.6 in a cloud sandbox where Zensical could not be
  installed. Run `.venv/bin/zensical build --strict` and
  `zensical serve`, and check the header, search, and the install
  videos (their `src` stays source-relative for Zensical).
- **Drift watchdog.** The technical-header commit touches
  `docs/technical/`, which `drift-check.mjs` reads as the last mirror
  date. Clear any open "Wiki drift" docs item first, or older upstream
  commits stop being flagged.
- **Site sync.** Technical pages still have no front matter. Run
  `npm run sync:wiki` once to confirm the route library regenerates
  cleanly with the new header blocks.
- **zoompilot.ai links.** `/features/*` are unchanged. If the site
  links `/troubleshooting/`, `/about/` or `/reference/...` directly,
  update it — the 301s cover the gap meanwhile.
- **Local skills.** `.agents/` is shared by every branch. `site-sync`
  and `review-wiki-page` name v1 paths (`docs/reference/site-sync.md`,
  `troubleshooting.md`); update them when v2 lands on main.
- **Review stamps.** Existing `reviewed:` dates were kept. Pages whose
  content changed materially (home, Start here, what you need, install,
  the feature pages, FAQ, glossary, share a route) deserve a fresh pass
  before the stamp means "checked against zoompilot/main" again.

## Backlog for a next pass

- The 23 remaining high-severity jargon uses — mostly in text you
  iterated on (`newcomer-lint.py` lists them with suggested glosses).
- 27 sentences over 25 words on reader pages, the same count as v1 (same
  script).
- A 3-card grid on hub pages ends in an orphan at desktop width.
- The Settings page is still ~5,800px tall; a "the four settings that
  matter" block above the explorer would help drivers who never scroll.
- Descriptions (`description:` front matter) now exist on most reader
  pages; Open Graph tags in `overrides/main.html` could use them for
  Discord link previews.
