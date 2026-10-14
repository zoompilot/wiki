# zoompilot wiki

Documentation for [zoompilot](https://zoompilot.ai), a sunnypilot
(openpilot) fork that runs on every car sunnypilot supports, with extra
steering and cruise work for Mazda. Published at
[zoompilot-wiki.pages.dev](https://zoompilot-wiki.pages.dev).

Built with [Zensical](https://zensical.org), the generator by the creators
of Material for MkDocs. Zensical reads the same `mkdocs.yml` and uses its
new `modern` theme look. Content is plain markdown in `docs/`.

## Quick start

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/zensical serve
```

Open http://127.0.0.1:8000. Edits live-reload.

## Preview in a Cloudflare Pages-like environment

Build the site, then serve the static output with wrangler:

```bash
.venv/bin/zensical build
npx wrangler pages dev site
```

## Editing

The manual is organised around setup, daily use, features, settings,
Jetlink, and help. Technical and community pages are secondary references.
See [CONTRIBUTING.md](CONTRIBUTING.md) for writing and validation rules.

Jetlink docs are imported from a reviewed source commit:

```sh
python3 contrib/sync-jetlink.py --source ../jetlink --ref <commit>
python3 contrib/sync-jetlink.py --source ../jetlink --check
```

The website's exact fonts and title-bar styles are imported separately:

```sh
python3 contrib/sync-brand.py --source /path/to/zoompilot-site
```

Generated copies and their manifests are committed together. The Jetlink
import protects local changes. Update the source or importer rather than
editing generated pages directly.

Before review or publication:

```sh
.venv/bin/zensical build --strict
```

## Deploy (Cloudflare Pages — primary)

### GitHub Actions (auto-deploy, the intended path)

`.github/workflows/cloudflare-pages.yml` builds and deploys on every
push to `main`. One-time setup, after the repo is on GitHub:

1. Create a Cloudflare API token with the "Cloudflare Pages: Edit"
   permission (dash.cloudflare.com -> My Profile -> API Tokens).
2. Set the two repo secrets:

   ```bash
   gh secret set CLOUDFLARE_API_TOKEN
   gh secret set CLOUDFLARE_ACCOUNT_ID
   ```

Without the secrets the workflow still builds, and skips the deploy
step with a notice.

### Direct upload with wrangler (fallback)

`wrangler login` once, then:

```bash
.venv/bin/zensical build
npm run deploy
```

`npm run deploy` runs
`wrangler pages deploy site --project-name zoompilot-wiki --branch main`.
Roll back with `npx wrangler pages deployment list` /
`... deployment rollback` if a deploy goes wrong.

### Custom domain

None. The wiki serves from https://zoompilot-wiki.pages.dev
permanently. Attaching a custom domain was declined in 2026-09 (the
`zoompilot.ai` zone lives in a different Cloudflare account), so do
not plan DNS or custom-domain work for this wiki.

### Git integration (alternative)

1. Push this repository to GitHub (for example `zoompilot/wiki`, branch
   `main`).
2. In Cloudflare, create a **Pages** project from that repository.
3. Build settings:
   - Framework preset: `Python`
   - Build command: `pip install -r requirements.txt && zensical build --strict`
   - Build output directory: `site`
4. Set the Python version if needed with the environment variable
   `PYTHON_VERSION` (for example `3.12`).

Note: the "last updated" page stamps from the MkDocs days are gone.
Zensical has no MkDocs plugin runtime yet; native support is planned.

## Deploy (GitHub Pages — alternative)

A ready workflow is at `.github/workflows/gh-pages.yml`. To use it
instead of Cloudflare:

1. In the repository settings, set Pages → Source to **GitHub Actions**.
2. Push to `main`. The workflow builds and publishes the site.

Keep only one deployment target active at a time to avoid confusion.

## Site configuration

Navigation and build settings live in mkdocs.yml. The owner-manual layout
is in docs/stylesheets/manual.css. fonts.css and shared-header.css are
imported from the website; custom.css, v2.css, and site.css provide the
existing theme base. Header and footer integration lives in overrides/.

The local preview reloads when source pages or styles change.
