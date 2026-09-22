# Contributing to the wiki

Thank you for improving the zoompilot wiki. This page explains the
workflow and the writing style.

## Workflow

1. Fork or branch the wiki repository.
2. Edit or add pages under `docs/`.
3. If you add a new page, register it in the `nav` section of
   `mkdocs.yml`. Pages outside `nav` are not reachable.
4. Run a strict build and fix anything it reports:

   ```bash
   .venv/bin/zensical build --strict
   ```

5. Open a pull request.

Every page also has an edit icon beside its title, which opens the right
file on GitHub. The header icon and the edit links are both built from
`repo_url` in `mkdocs.yml`; that is the only place the wiki's own
repository URL is written, so a repo move is a one-line change there.

## Review stamps

A page that finished a full review pass carries a stamp in its front
matter, and the theme shows it under the page content:

```yaml
---
title: Page title
reviewed: 2026-09-06
---
```

Stamp a page only after its facts were checked against the `zoompilot`
repository. Write the date of the last finished pass in full
(`2026-09-06`, not `2026-09`). To see which pages carry the stamp and
which are still waiting, run:

```bash
python3 contrib/review-status.py
```

## Who we write for

Every page outside `docs/technical/` is written for a newcomer: a Mazda
owner who has never heard of openpilot, a comma device, or zoompilot,
and who may land on any page from a search. Each page opens with the
answer (the lede), explains each new word the first time it appears,
shows where things are on the device, and ends with the next step.
Technical pages are written for openpilot readers and keep the
author's vocabulary.

## Content rules

- **Simple English.** Short sentences, one idea per sentence. Active
  voice. Everyday words.
- **Safety first.** Anything that can affect safe operation belongs in an
  `admonition` block. Use `!!! danger` for the alpha longitudinal radar
  and AEB warnings, `!!! warning` for other risks, `!!! note` and
  `!!! tip` for helpful context.
- **Link user pages to technical pages.** A feature page explains what a
  driver sees. The matching page in `technical/` explains why the code
  does it. Cross-link both ways.
- **Never invent facts.** Write only what you can source from the
  zoompilot site, the repository, or the Discord. If a page needs facts
  you do not have, leave a `TODO(pass-2):` comment that names the source.
- **Keep migrated pages close to their source.** Pages under
  `docs/technical/` and `docs/how-to/` are near-verbatim imports from the
  zoompilot repository. Change structure or links only, and keep the
  author's voice in the body text.

## Page types and building blocks

Every page is one of six types — hub, path, feature, task, reference,
technical — declared in front matter (`type: feature`). The
[wiki style guide](docs/community/style-guide.md) shows each type's
building blocks live, with their markdown: the lede, the *At a glance*
box, badges, settings paths, steps, the start-path journey, and the
*Next step* cards. The styles live in `docs/stylesheets/v2.css`.

A feature page, for example:

```markdown
---
title: Smart Cruise
type: feature
description: One sentence for link previews and search.
---

# Smart Cruise (curve speed control)

What it does for the reader, in plain words.
{ .zp-lede }

<div class="zp-glance" markdown>

- **Status** Off out of the box.
- **Turn it on** `Settings → Cruise → Smart Cruise Control: Vision`{ .zp-path }

</div>

## Section

Content.

## Design details

- [Matching technical page](../technical/<page>.md)
```

Technical pages mirror the zoompilot repository and carry no front
matter; their short nav labels live in `mkdocs.yml`.

## Structure

| Path | Tab | Purpose |
| --- | --- | --- |
| `docs/index.md` | Home | Landing page and the start path |
| `docs/getting-started/` | Start here | The newcomer path: what it is, car, hardware, install, first drive |
| `docs/safety.md` | Start here | Safety, warnings, limitations (kept at the root: `/safety/` is linked sitewide) |
| `docs/features/` | Features | One page per user-facing feature |
| `docs/settings/` | Settings | Settings reference, custom tune |
| `docs/help/` | Help | Troubleshooting, ECU reset, share a route, FAQ, glossary, privacy |
| `docs/technical/` | Technical | Engineering notes from the main repository |
| `docs/community/` | Community | Feedback, contribute, jetlink testing, roadmap, about, style guide, site sync |
| `docs/releases/` | Community | Changelog (generated) |

Moved or retired pages keep working through 301s in
`contrib/_redirects` (two lines each: with and without the trailing
slash).

## Styling conventions

- Tables for settings and comparisons.
- `admonition` blocks for warnings, never plain bold text.
- Material icons via `:material-...:` shortcodes on the landing page and
  section cards only.
- Every setting a page names carries its device path, styled with
  `{ .zp-path }`. Setting names and defaults come from
  `docs/assets/js/settings-data.js`.

## Updating the settings page

The setting cards on `docs/settings/index.md` are rendered from
`docs/assets/js/settings-data.js`, the single hand-kept source. When a
release changes the on-device settings, edit that file to match the
release's `common/params_keys.h` and `settings_ui.json`. Each panel
keeps the order H2 → collapsed screenshots → intro → card mount; the
explorer script depends on it. The screenshots are simulator renders;
`docs/assets/settings/README.md` has the capture procedure.
- One `#` heading per page; the page `title` frontmatter matches it.
