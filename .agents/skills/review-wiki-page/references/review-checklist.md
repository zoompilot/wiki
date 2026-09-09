# Review checklist

## Source (Phase 1)

**Structure**
- Section order follows the reader's job: symptoms/tasks first, mechanics
  (sharing, reporting, configuring) after, help last.
- Fixed-bug history and release notes live under a parent heading that says
  they are fixed — bare symptom-style headings for solved bugs read as open
  problems.
- Heading genre is consistent within a scan path (symptom-style headings on
  a symptom-scanned page; task-style on a task page).
- Long multi-section content pages show the TOC; `hide: toc` is for
  indexes, the homepage, and FAQ only.

**Wording (audience rule from SKILL.md)**
- One idea per sentence, roughly 20 words or fewer — Simplified Technical
  English in spirit.
- Everyday words on user pages; exact technical terms stay verbatim.
- Translate dev-speak: "backported", "throws", "seeds the stack",
  "unhandled". Keep device-visible strings exactly as the screen shows
  them, quotes included ("Cruise Fault: Restart the Car", NO PANDA, LKAS).
- Car capability claims use the motor form: "Mazdas with a 2022-25 CX-5
  EPS" — never "2022+ EPS Mazdas".
- No boundary claims ("zoompilot never..."). Describe what it does.
  Futures live on the roadmap page only.
- Claims are grounded in what the reader can see or check on the device.
- Undefined terms at first use get a plain gloss or a link. Watch the intro:
  it often uses a term the page defines only later (link it forward).

**Links and anchors**
- Inbound sweep before any heading change (see Anchor law in SKILL.md).
- Descriptive link text; no dead anchors; settings deep links use the
  anchor-stable panel H2s (`settings/index.md#device`, `#steering`).
- Cross-page facts stated once — a pass is a good time to fold duplicates,
  but check the other page's inbound links before deleting a section.

**Widgets**
- Labels match the section titles they route to.
- Every page section a reader would scan for is reachable from the widget
  (or deliberately excluded).
- Widget step text matches the page's current facts (versions, sizes,
  toggle names).

## Rendered (Phase 2)

**Structure**
- One `h1`; levels step down without gaps; heading text free of artifacts.
- TOC renders on wide viewports (≥1220px) like sibling pages.
- Skip link present (theme provides it — verify it exists).

**Interactive (when the page has a mount)**
- Buttons: `aria-pressed` maintained; `aria-controls` set; focusable in DOM
  order; `:focus-visible` outline present (verify with the keyboard script,
  not programmatic focus).
- Output region: `role="region"` + `aria-label`, `aria-live="polite"`,
  populated on click AND on Enter/Space.
- Active styling keyed on `[aria-pressed="true"]`, not a JS-only class.

**Page-wide**
- Zero dead in-page anchors.
- Contrast: dark mode accent-on-bg and light mode (force
  `body[data-md-color-scheme="default"]` — the light remap maps `--zp-tint`
  to the deep accent) — AA for text sizes in use.
- 390px: `scrollingElement.scrollWidth` must not exceed the viewport.

**Known-clean (do not re-litigate without a reason)**
- Keyboard path through theme chrome (long but functional), skip link
  existence, AA contrast via token remaps, 390px fit on content pages —
  these passed the 2026-09 sitewide passes. Re-verify only what this pass
  changed.
