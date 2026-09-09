---
name: deploy-wiki
description: Ship wiki changes and verify the Cloudflare Pages deploy actually happened. Use for deploy questions, "the push didn't publish", manual deploys via npm run deploy, wrangler rollbacks, and previewing the built site locally — including the silent deploy-skip when CI secrets are missing and the manual-deploy _redirects trap.
---

# Deploy and verify

## How deploys run

Push to `main` → `.github/workflows/cloudflare-pages.yml`:

1. `pip install -r requirements.txt`, `npm ci`.
2. `python3 contrib/build_stamp.py` — refreshes the
   `<span class="zp-stamp">` lines in `docs/index.md` and
   `docs/getting-started/install.md` from the zoompilot repo's atom
   feed. On failure the old stamp survives. CI stamps are ephemeral;
   committed stamps change only when the script is run by hand.
3. `zensical build --strict`.
4. Copies `contrib/_headers` AND `contrib/_redirects` into `site/`.
5. `npx wrangler pages deploy site --project-name zoompilot-wiki
   --branch main`.

Live at zoompilot-wiki.pages.dev. `npm run deploy` is a fallback only.

## Verify it actually deployed

A green Actions run is not proof. If the `CLOUDFLARE_API_TOKEN` /
`CLOUDFLARE_ACCOUNT_ID` secrets are missing, CI builds the site, skips
the deploy with a notice, and still exits green. After any
deploy-sensitive push, open the Actions run and confirm the wrangler
step ran — or load the live site and check the change is there.

## Manual fallback — and its trap

`npm run deploy` (after `wrangler login` once) copies ONLY
`contrib/_headers`. It does NOT copy `contrib/_redirects` — a manual
deploy drops every redirect. If a manual deploy is ever necessary:

```bash
.venv/bin/zensical build --strict
cp contrib/_headers contrib/_redirects site/
npm run deploy
```

Prefer letting CI deploy.

## Rollback

```bash
npx wrangler pages deployment list --project-name zoompilot-wiki
npx wrangler pages deployment rollback <deployment-id> \
  --project-name zoompilot-wiki
```

## Preview locally

`.venv/bin/zensical build` — output always goes to `site/`; there is no
`--site-dir` flag. Then `npx wrangler pages dev site` serves it the way
Cloudflare does. Port rules: 8123/8000 may be Nick's live servers —
check `lsof -nP -iTCP:8123 -iTCP:8000 -sTCP:LISTEN` first, use a fresh
port if they are taken, and stop your own server when done.

## Standing rules

- Custom-domain/DNS work is declined (2026-09). Do not plan it.
- One active deploy target: Cloudflare Pages. `gh-pages.yml` is
  dispatch-only — leave it that way.
- Strict build before every push: broken links fail it.
