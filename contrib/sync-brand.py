#!/usr/bin/env python3
"""Import the website's header rules and exact font files into the wiki.

Run with --source /path/to/zoompilot-site after reviewing a website change.
Only selectors, token names, and rem units are adapted for the wiki theme.
The website uses a 16px root; Material uses 20px, so header units are fixed
to the website's computed sizes to prevent shifts between the two sites.
"""
import argparse
import hashlib
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
  parser = argparse.ArgumentParser(description=__doc__)
  parser.add_argument("--source", type=Path, required=True)
  args = parser.parse_args()
  source = (args.source / "site.css").read_text()
  def pixels(name):
    value = re.search(rf"--{name}:\s*([0-9.]+)rem", source)
    if not value:
      raise SystemExit(f"Website token --{name} is missing or no longer uses rem; review the adapter.")
    return f"{float(value[1]) * 16:g}px"
  rules = source[source.index(".topbar {"):source.index("/* ================= hero:")]
  rules = re.sub(r"/\*.*?\*/", "", rules, flags=re.S)
  # Convert only lengths, retaining em tracking and separator spacing.
  rules = re.sub(r"([0-9.]+)rem", lambda m: f"{float(m[1]) * 16:g}px", rules)
  for old, new in [
    (".topbar nav", ".zp-site-nav"),
    (".topbar .id", ".zp-site-id"),
    (".topbar", ".zp-sitebar"),
    ("var(--edge)", "var(--zp-site-edge)"),
    ("var(--hair)", "var(--zp-hair)"),
    ("var(--body)", "var(--md-text-font-family)"),
    ("var(--text)", "var(--md-default-fg-color)"),
    ("var(--faint)", "var(--zp-faint)"),
    ("var(--fs-label)", pixels("fs-label")),
  ]:
    rules = rules.replace(old, new)
  css = """/* Generated from zoompilot/site site.css by contrib/sync-brand.py.
 * Edit the template in that script, not this file. */
.zp-header {
  --zp-site-edge: max(SITE_GUTTER, calc((100vw - SITE_COLUMN) / 2));
  /* the site's bar is part of the page: not sticky, no plate, the
   * canvas glow runs behind it */
  position: relative;
  background: transparent;
  border: 0;
  box-shadow: none;
}
.zp-sitebar { box-sizing: border-box; width: 100%; line-height: 1.6; }
.zp-site-id { margin: 0; padding: 0; font-weight: 400; white-space: nowrap; }
.zp-site-nav { margin: 0; padding: 0; font-family: var(--md-text-font-family); font-weight: 400; }
""" + rules + """
/* ---- wiki adaptation: everything below keeps the bar's geometry equal
 * to the site's at every width. The wordmark sits at the column edge and
 * the bar is one 64.5px row wherever the site's is; the wiki's extra
 * controls (menu, search, paint) live inside the nav row, so
 * they can never move the wordmark. ---- */
.zp-header .zp-site-id a,
.zp-header .zp-site-id .sep {
  font: inherit;
  letter-spacing: inherit;
}
.zp-site-nav a,
.zp-menu {
  line-height: 1.6;
  text-decoration: none;
}
.zp-site-nav a[aria-current="page"] {
  color: var(--md-default-fg-color);
}
/* the manual's page list, below the width where the sidebar shows */
.zp-menu {
  display: none;
  cursor: pointer;
  color: var(--md-default-fg-color);
}
/* search and paint: small faint icons after github and discord,
 * no taller than the nav's line box */
.zp-header .md-header__tools {
  display: inline-flex;
  align-items: center;
  align-self: center;
  gap: 8px;
  margin-left: 9.6px;
  height: 20px;
}
.zp-header .md-header__tools .md-header__option,
.zp-header .md-header__tools .md-header__paints,
.zp-header .md-header__tools .md-search {
  display: flex;
  align-items: center;
  width: auto;
  margin: 0;
}
.zp-header .md-header__tools .md-header__button,
.zp-header .md-search__button {
  display: grid;
  place-items: center;
  width: 20px;
  min-width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  font-size: 0;
  line-height: 20px;
  background: transparent;
  color: var(--zp-faint);
}
.zp-header .md-header__tools .md-header__button:hover,
.zp-header .md-search__button:hover {
  color: var(--md-default-fg-color);
}
.zp-header .md-header__tools svg {
  width: 16px;
  height: 16px;
}
.zp-header .md-search__button::before {
  position: static;
  width: 16px;
  height: 16px;
  margin: 0;
}
.zp-header .md-search__button::after {
  display: none;
}
/* the theme's own toggle keeps one of its two labels hidden */
.zp-header .md-header__tools [hidden] {
  display: none;
}
/* the sections live in the bar, so the theme's second row of tabs goes
 * (navigation.tabs stays on: it scopes the sidebar to one section) */
.md-tabs {
  display: none;
}
/* the theme's sidebar sat under a sticky header; it now starts with the
 * page */
.md-sidebar {
  top: 0;
}

/* below the width where the theme hides the sidebar, the page list
 * opens from "menu", the nav's first item */
@media screen and (max-width: 76.234375em) {
  .zp-menu { display: block; }
}
/* the wiki's nav is longer than the site's: drop sections in rank order
 * before the row runs out, so the bar stays one 64.5px row as long as
 * possible and wraps under the wordmark only where the site's does.
 * Every section stays in the menu. Widths are measured, not guessed:
 * see "Shared header" in the README. */
@media screen and (max-width: 76.234375em) {
  .zp-site-nav a[data-rank="late"] { display: none; }
}
@media screen and (max-width: NAV_DROP_MID) {
  .zp-site-nav a[data-rank="mid"] { display: none; }
}
@media screen and (max-width: NAV_DROP_CORE) {
  .zp-site-nav a[data-rank="core"] { display: none; }
}
@media screen and (max-width: NAV_DROP_FIRST) {
  .zp-site-nav a[data-rank="first"] { display: none; }
}
"""
  # The site's footer: the paint line, then credits, links and sign-off in
  # the same column as the bar.
  foot = source[source.index("/* ================= footer"):source.index("/* ================= reading comfort")]
  foot = re.sub(r"/\*.*?\*/", "", foot, flags=re.S)
  foot = re.sub(r"([0-9.]+)rem", lambda m: f"{float(m[1]) * 16:g}px", foot)
  for old, new in [
    (".paintline", ".zp-paintline"),
    (".foot-links", ".zp-foot-links"),
    (".foot ", ".zp-foot "),
    (".foot{", ".zp-foot{"),
    ("var(--edge)", "var(--zp-site-edge)"),
    ("var(--accent)", "var(--zp-tint)"),
    ("var(--mono)", "var(--md-code-font-family)"),
    ("var(--fs-small)", pixels("fs-small")),
    ("var(--fs-label)", pixels("fs-label")),
  ]:
    foot = foot.replace(old, new)
  foot = re.sub(r"var\(--p(\w+)\)", r"var(--zp-p\1)", foot)
  jet_line = re.search(r'\[data-site="jetlink"\] \.paintline\s*\{([^}]+)\}', source)
  if not jet_line:
    raise SystemExit("Website jetlink paint line is missing; review the adapter.")
  css += """
/* ---- the site's footer (overrides/main.html, block footer). The theme's
 * own footer keeps only prev/next, which belongs to the page; its meta
 * row and stripe give way to this. ---- */
.zp-foot { --zp-site-edge: max(SITE_GUTTER, calc((100vw - SITE_COLUMN) / 2)); color: var(--md-typeset-color, var(--zp-dim)); }
.zp-foot a { color: var(--md-default-fg-color); text-decoration: underline; text-decoration-color: var(--zp-hair-strong); text-underline-offset: 3px; }
.zp-foot a:hover { text-decoration-color: var(--zp-tint); }
.zp-foot p { margin: 0; }
.zp-foot .zp-warn strong { color: var(--zp-warn); font-weight: 600; }
body[data-md-color-scheme="default"] .zp-foot .zp-warn strong { color: var(--zp-warn-ink); }
.md-footer { background: transparent; }
.md-footer::before, .md-footer-meta { display: none; }
""" + foot + """
.zp-paintline { margin-top: 48px; }
body[data-zp-site="jetlink"] .zp-paintline {""" + jet_line[1].replace("var(--paint-lo)", "var(--zp-paint-lo)").replace("var(--paint-hi)", "var(--zp-paint-hi)") + """}
"""
  # jetlink's green, as zoompilot.ai/jetlink wears it, for the wiki's
  # Jetlink pages (body[data-zp-site="jetlink"], set in overrides/main.html).
  jet = re.search(r':root\[data-site="jetlink"\]\s*\{([^}]+)\}', source)
  if not jet:
    raise SystemExit("Website jetlink paint block is missing; review the adapter.")
  decls = dict(re.findall(r"--([\w-]+):\s*([^;]+);", jet[1]))
  try:
    css += f"""
/* ---- jetlink pages: the jetlink site's green (site.css
 * :root[data-site="jetlink"]), so moving between zoompilot.ai/jetlink
 * and its guides here keeps one color. No paint picker: the jetlink site
 * has none. ---- */
body[data-zp-site="jetlink"] {{
  --zp-paint: {decls["paint"]};
  --zp-paint-hi: {decls["paint-hi"]};
  --zp-paint-lo: {decls["paint-lo"]};
  --zp-tint: {decls["accent"]};
  --zp-paint-t: {decls["accent"]};
  --zp-paint-ink: {decls["cta-text"]};
  --zp-btn-grad: linear-gradient(180deg, var(--zp-paint-hi), var(--zp-paint) 55%, var(--zp-paint-lo));
}}
body[data-zp-site="jetlink"][data-md-color-scheme="slate"] {{
  --md-default-bg-color: {decls["bg"]};
  --zp-hair: color-mix(in srgb, var(--zp-tint) 26%, transparent);
}}
body[data-zp-site="jetlink"][data-md-color-scheme="default"] {{
  --zp-tint: {decls["paint-lo"]};
  --zp-deep: {decls["paint-lo"]};
}}
body[data-zp-site="jetlink"] .md-container {{
  background:
    radial-gradient(80rem 42rem at 74% -12rem, {decls["glow"].replace("var(--paint-hi)", "var(--zp-paint-hi)")}, transparent 70%) no-repeat,
    var(--md-default-bg-color);
}}
body[data-zp-site="jetlink"] .md-header__paints {{
  display: none;
}}
"""
  except KeyError as missing:
    raise SystemExit(f"Website jetlink token --{missing.args[0]} is missing; review the adapter.")
  css = css.replace("SITE_GUTTER", pixels("gutter")).replace("SITE_COLUMN", pixels("col"))
  # Viewport widths below which each rank of wiki section links drops,
  # measured so the wiki's row holds as long as the site's does.
  for token, value in [("NAV_DROP_MID", "919.98px"), ("NAV_DROP_CORE", "789.98px"),
                       ("NAV_DROP_FIRST", "619.98px")]:
    css = css.replace(token, value)
  target = ROOT / "docs/stylesheets/shared-header.css"
  target.write_text(css)
  font_faces = "\n\n".join(re.findall(r"@font-face\s*\{[^}]+\}", source))
  font_faces = font_faces.replace('url("fonts/', 'url("../assets/fonts/')
  font_faces += """
:root {
  --md-text-font: "Inter";
  --md-code-font: "JetBrains Mono";
  --md-text-font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  --md-code-font-family: "JetBrains Mono", ui-monospace, monospace;
}
"""
  (ROOT / "docs/stylesheets/fonts.css").write_text(font_faces)
  fonts = ROOT / "docs/assets/fonts"
  fonts.mkdir(exist_ok=True)
  files = {}
  for name in re.findall(r'fonts/([^"\)]+)', source[:source.index(":root")]):
    shutil.copyfile(args.source / "fonts" / name, fonts / name)
    files[name] = hashlib.sha256((fonts / name).read_bytes()).hexdigest()
  commit = subprocess.check_output(["git", "-C", str(args.source), "rev-parse", "HEAD"], text=True).strip()
  record = {"repository": "https://github.com/zoompilot/site", "commit": commit,
            "source_css_sha256": hashlib.sha256(source.encode()).hexdigest(), "fonts": files}
  (ROOT / "contrib/brand-import.json").write_text(json.dumps(record, indent=2) + "\n")
  print(f"Imported website header and {len(files)} fonts from {commit[:12]}")


if __name__ == "__main__":
  main()
