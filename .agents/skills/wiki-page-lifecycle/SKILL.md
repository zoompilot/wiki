---
name: wiki-page-lifecycle
description: Create, move, rename, or retire wiki pages without breaking links. Use for any structural change to docs/ — adding a page (nav registration in mkdocs.yml), moving a page between sections, changing a slug or path, deleting a page, adding contrib/_redirects entries, or updating section index card grids. Slugs are load-bearing: zoompilot.ai deep-links into this wiki, so every move needs a redirect and a link sweep.
---

# Change the wiki's page structure

Structural changes only: new pages, moves, renames, retirements, nav
edits. For rewording prose use `write-wiki-page`; for a full quality
pass on one page use `review-wiki-page`.

## Create a page

1. **Write the file** at `docs/<section>/<name>.md`. Follow the page
   template in `CONTRIBUTING.md`: `title:` frontmatter matching the
   single `#` H1, short intro paragraph, cross-link both ways with the
   paired `technical/` page where one exists. Stamp content pages with
   `reviewed: YYYY-MM` (current month).
2. **Register it in `nav`** in `mkdocs.yml`. A page outside `nav` is
   unreachable, and nothing in the build validates nav entries — a typo
   here ships silently. Nav is fully hand-ordered; the section's
   `index.md` comes first in its entry (`navigation.indexes`).
3. **Add the section index card.** Every multi-page section has an
   `index.md` with `hide: toc` and a Material grid-cards block; the new
   page needs a card there. Two traps:
   - The `---` rule inside a card is indented 4 spaces; the wrong indent
     silently breaks the grid.
   - `:material-*:` icons are allowed only on the homepage and section
     cards, and the theme bundles a *subset* of them — before using a
     name no existing card uses, check the `.icons` directory under the
     installed theme in `.venv` (`find .venv -type d -name .icons`).
     A dead icon name renders as literal text with no build warning.
4. **Build and ship** (see below).

## Move or rename a page

Slugs are load-bearing: zoompilot.ai deep-links wiki paths (notably
`/features/...`). A bare move breaks the site.

1. Add the 301 to `contrib/_redirects` *before* pushing. Cloudflare
   Pages syntax; write every rule twice — with and without trailing
   slash:

   ```
   /settings/explorer/ /settings/ 301
   /settings/explorer  /settings/ 301
   ```

2. Repoint inbound links: `grep -rn "<old-slug>" docs/ --include='*.md'`
   — plus `mkdocs.yml`, the section index cards, and any JS widget with
   hardcoded hrefs.
3. Move the file, update `nav`, update the section index cards.

Heading renames have their own hazard — the anchor law in
`review-wiki-page`: reordering sections is safe, retitling breaks
inbound `page.md#anchor` links and JS-widget hrefs.

## Retire a page

Never just delete. Keep the URL working:

- Redirect to the nearest surviving page, or to the external canonical
  page (docs.comma.ai for generic how-tos) — `contrib/_redirects` holds
  the precedents.
- Update `nav`, section index cards, and inbound links.
- Delete the file only once the redirect exists and inbound links are
  repointed.

## Build and ship

```bash
.venv/bin/zensical build --strict   # bare `zensical` is not on PATH
```

Strict fails on broken internal links and warns on omitted, not-found,
and absolute-linked pages. Cross-page anchors warn too — read the whole
warning block, don't grep it away.

```bash
git status --short        # Nick runs parallel sessions — spot foreign edits
git fetch origin
```

Commit only the files this change touched (never `git add -A`), message
in the repo style: lowercase one-line `Area: what changed`. Push
directly if the remote is unmoved; otherwise `git pull --rebase` first.
Push to main auto-deploys via GitHub Actions.
