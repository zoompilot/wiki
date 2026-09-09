---
name: site-sync
description: Land zoompilot releases and keep the wiki and the zoompilot.ai site in step. Use when a release lands, when handling a "Wiki drift" GitHub issue, for anything touching the generated files (changelog.md, steering-torque assets, route-library.md), and after editing the supported-cars table — the npm run sync:wiki two-repo flow, its hand-edit guard, and the drift watchdog.
---

# Sync the wiki with the zoompilot.ai site

Runbook of record: `docs/reference/site-sync.md`. This skill is the
working flow around it. The sync script lives in the SITE repo
(`scripts/sync-wiki.mjs`, run as `npm run sync:wiki` from the site repo
root) and touches both repos.

## Generated files — never hand-edit

- `docs/releases/changelog.md` (from the site's `src/data/changelog.js`)
- `docs/assets/steering-torque.svg` and
  `docs/assets/steering-torque-data.js`
- `docs/technical/route-library.md` (aggregated from `technical/` pages)

Each carries a "Generated … do not edit" banner. Hand edits are lost on
the next sync — or halt it (see the guard below). Fix the source in the
site repo instead.

Exception: the changelog's `## Upstream release notes` tail is
hand-written, and sync never touches it.

## Land a release

1. Read the release notes on zoompilot.ai — they exist only there; the
   zoompilot repo's own CHANGELOG is upstream-only.
2. Transcribe the release into the site repo's `src/data/changelog.js`.
3. From the site repo root: `npm run sync:wiki`.
4. Check the wiki diff: `docs/releases/changelog.md` regenerated, the
   hand-written tail untouched.
5. Commit and push BOTH repos. The wiki push auto-deploys.

## The sync guard

Sync fingerprints every generated file. If one was hand-edited, the run
stops and names the file. Never blindly force: port the intended change
into the site-repo source first, then `npm run sync:wiki -- --force`
overwrites on purpose.

## Supported-cars table (the reverse direction)

The FIRST table of `docs/getting-started/supported-cars.md`
(Model / Year / Steer-to-zero / Alpha longitudinal) is a sync SOURCE:
the site renders it from JSON and runs the only car checker. The rest of
that page is untouched by the script. After editing the table, run
`npm run sync:wiki` or the site's copy lags.

## Drift issues

`.github/workflows/drift-check.yml` runs daily
(`.github/scripts/drift-check.mjs`) and opens or updates one
"Wiki drift:" issue with two halves:

- zoompilot.ai's current release vs the changelog → land the release
  (above).
- `docs/zoompilot` commits in the zoompilot repo vs this repo's
  `docs/technical/` mirror → refresh the mirrored pages.

Dry-run locally: `node .github/scripts/drift-check.mjs` (without REPO
set, no issue is opened).

Known stale row: `docs/reference/site-sync.md` lists
`assets/js/car-checker-data.js` as generated; that file does not exist.

## Ship

Commit each repo separately, only the files the change touched, message
style `Area: what changed`. Push both; the wiki push deploys.
