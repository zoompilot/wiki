# Contributing to the zoompilot manual

Write for someone trying to set up or use the product. They may already
use openpilot, or they may be new to comma. Neither should need to learn
controller terminology to follow instructions.

## Writing

- Open with the answer in one or two sentences.
- Use exact device labels in steps and plain language around them.
- Show requirements before steps and the expected result afterward.
- Keep one recommended route prominent. Put optional choices afterward.
- Explain unfamiliar words where they appear; glossary links are backup.
- Distinguish cross-brand steering improvements from additional Mazda work.
- Keep controls, compatibility, and safety implications explicit.
- Do not promise a feature always succeeds. State the relevant limitation.
- Link to the next useful task rather than repeating its instructions.

The manual targets the upcoming main release's experience. Instructions
use `zoompilot/main`. Check the software being promoted before publishing;
do not infer behaviour from an old wiki page or unvalidated memory.
Record source revisions in REVAMP-REVIEW.md, outside the reader pages.

## Structure

| Directory | Purpose |
| --- | --- |
| docs/getting-started | Compatibility, hardware, installation, first drive |
| docs/using-zoompilot | Controls, screen, everyday use, updates |
| docs/features | Benefits, setup, expected behaviour, limitations |
| docs/settings | Recommended setup and searchable reference |
| docs/jetlink | Imported Jetlink guides and assets |
| docs/help | Symptoms, route sharing, privacy, common questions |
| docs/technical | Design records for experienced readers |
| docs/community | Feedback, contributors, maintenance |

Add new pages to mkdocs.yml. Keep existing URLs valid or add redirects
in contrib/_redirects. Avoid moving feature URLs linked by zoompilot.ai.

## Imported content

Do not edit docs/jetlink directly. Review the Jetlink repository changes,
then run:

```sh
python3 contrib/sync-jetlink.py --source ../jetlink --ref <reviewed-commit>
python3 contrib/sync-jetlink.py --check --source ../jetlink
```

The importer records a commit and file hashes in contrib/jetlink-import.json.
It refuses to overwrite local edits. It adapts links, expandable sections,
and comma installation instructions to the manual's main release.
Fix product documentation in Jetlink first, or wiki-only adaptations in
the importer. Commit the generated output and manifest together.

The shared header and fonts come from the website source:

```sh
python3 contrib/sync-brand.py --source /path/to/zoompilot-site
```

This imports header rules from site.css and the exact WOFF2 fonts. It
converts the website's rem values to its computed pixel sizes because
the wiki theme has a different root size. Review contrib/brand-import.json
and the generated stylesheets/fonts.css and shared-header.css together.
Put wiki-specific layout in stylesheets/manual.css.

Existing chart and release-history files retain their generation comments.
Check their documented generator before changing generated content.

## Settings

Update docs/assets/js/settings-data.js against the actual device UI and
params defaults. Include comma 4 submenu names where they differ from
comma 3X. The reference has a matching no-JavaScript fallback; update it
alongside the data. Do not show old screenshots with removed settings.

## Check before publishing

```sh
.venv/bin/zensical build --strict
```

Inspect phone and desktop widths, dark and light themes, search, keyboard
navigation, expandable sections, setting filters, and videos. Walk through
new-user setup, switching from sunnypilot, and adding Jetlink.
A successful build does not verify vehicle behaviour.

Publication is separate from local editing. Pushing main triggers the
Cloudflare Pages workflow; use the agreed review process before doing so.
