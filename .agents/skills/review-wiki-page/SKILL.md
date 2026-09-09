---
name: review-wiki-page
description: Full review pass on a wiki page — readability, accessibility, and ease-of-understanding for a new reader. Reviews the markdown source AND the rendered page (build + headless-Chrome CDP probes), ranks findings, applies the fixes, rebuilds, verifies, commits, and pushes. Use whenever the user asks to review, audit, sweep, critique, or "do a pass on" any docs/ page, or to check a page's readability, accessibility (a11y), or newcomer clarity — even if they only name the page without saying "review".
---

# Review a wiki page

Run a full review pass on one page of this wiki: readability, accessibility,
and ease-of-understanding, judged as an inexperienced reader. Then fix what
was found, verify, and ship it.

## Baked-in defaults (Nick-approved 2026-09-09 — do not re-ask)

- **Apply everything.** The deliverable is findings *and* applied fixes,
  including structural changes (section reordering, grouping). Nick reviews
  the diff after the push.
- **Rendered checks always run.** Build the site and probe the live page;
  the static source view is never the whole review.
- **Audience rule.** Pages outside `docs/technical/`: judge every word for a
  total newcomer who has never used openpilot-style software — gloss or link
  community vocabulary (fork, route, nag, panda) unless the device itself
  shows the word (LKAS, NO PANDA). Pages inside `docs/technical/`: an
  openpilot-literate Mazda owner; code vocabulary may stay.
- **End with commit and push** under the standing push grant (see *Git* below).
- Still stop and ask only for destructive actions or genuine scope changes.

Report the ranked findings in the final message regardless — the findings
must survive in chat even though the fixes already landed.

## Phase 0 — pick the page (only if not given)

Prefer pages that have been patched incrementally but never swept as a
whole. Signal: `git log --oneline -5 -- <file>` shows only wording/link
commits, no full-pass commit. Interactive pages (settings, troubleshooting,
vin decoder) drift fastest — check their JS against the page first.

## Phase 1 — source review

Read the whole page plus any JS widget and CSS it uses. Work through
`references/review-checklist.md`. The load-bearing rules:

- **Anchor law.** Renaming a heading breaks its anchor. Before touching any
  heading, sweep inbound links:
  `grep -rn "<page-stem>.md#" docs/ --include='*.md' | grep -v site/`
  and remember the page's own JS widgets link by anchor too. Reordering
  sections is safe; retitling is not.
- **Register.** Plain everyday words on user pages; keep exact technical
  terms (EPS, alpha longitudinal, ECU) and simplify only the English around
  them. Dev-speak gets translated: "backported" → "goes into new releases
  only", "throws errors" → "shows errors".
- **JS drift.** If the page has a widget (triage wizard, settings explorer,
  device switch, vin decoder), compare its labels, data, and hrefs against
  the current page sections. Drift here is a functional bug, not a style
  issue — the troubleshooting wizard once couldn't route to three sections.
- Bump the `reviewed:` frontmatter stamp to the current month when the pass
  completes.

## Phase 2 — rendered checks

Build and serve, then run the bundled probes. Exact recipe:

```bash
# check Nick's servers first — 8123/8000 are his; never reuse a live one
lsof -nP -iTCP:8123 -iTCP:8000 -sTCP:LISTEN

.venv/bin/zensical build        # bare `zensical` is not on PATH

# serve as its OWN background task (a background task owns its process group)
cd site && python3 -m http.server 8123
```

Then, per page (mount = the page's interactive root, if any):

```bash
node .agents/skills/review-wiki-page/scripts/rendered-check.mjs \
  "http://127.0.0.1:8123/<page-path>/" "#zp-triage"

node .agents/skills/review-wiki-page/scripts/keyboard-check.mjs \
  "http://127.0.0.1:8123/<page-path>/" "#zp-triage button"
```

The scripts handle cache-busting and the throwaway first navigation
themselves. Read `references/cdp-gotchas.md` before debugging any probe
result — most "failures" are known false alarms (focus-visible, sticky
sidebars, scheme attribute on `body`).

**Stop the server when done** (TaskStop its task). Never leave servers
running.

## Phase 3 — findings and fixes

Rank findings: functional gaps (drift, broken links) first, then
screen-reader semantics, then page architecture (order, grouping), then
wording. Apply them all. Established fixes, already proven in this repo:

- Widget aria: `aria-pressed` toggle buttons, `aria-controls` to a
  labelled output `role="region"` with `aria-live="polite"`, a
  `:focus-visible` outline in custom.css matching the `.chip` pattern, and
  CSS keying active state on `[aria-pressed="true"]`.
- Architecture: symptom/job-first section order, task mechanics (share,
  report, configure) after content, fixed-bug history grouped under a
  "Fixed in recent releases"-style parent so it doesn't read as open
  problems.
- `hide: toc` belongs on indexes, the homepage, and FAQ — not on long
  content pages.

## Phase 4 — verify

Rebuild and re-run both probes against the changed page. Must pass: heading
outline as intended, no dead anchors page-wide, all inbound anchors still
resolve, widget targets resolve, aria states update on click and on Enter,
TOC renders like sibling pages at ≥1220px width.

## Phase 5 — git

```bash
git status --short          # foreign edits? Nick runs parallel sessions
git fetch origin
```

Commit **only the files this pass touched** (never `git add -A`), lowercase
one-line message in the repo style: `Area: what changed`. Push directly if
the remote is unmoved; if it moved, `git pull --rebase` first (committing
only own files keeps the rebase clean). Push to main auto-deploys via
GitHub Actions.

## References

- `references/review-checklist.md` — the full source and rendered checklists.
  Read it in Phase 1.
- `references/cdp-gotchas.md` — why probes lie, and the exact workarounds.
  Read it before debugging any probe output, and before writing any NEW
  probe code.
- `scripts/rendered-check.mjs`, `scripts/keyboard-check.mjs` — the probes
  themselves; each takes a URL (plus a selector) and prints JSON.
