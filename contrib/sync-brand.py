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
  css = """/* Generated from zoompilot/site site.css by contrib/sync-brand.py. */
.zp-header {
  --zp-site-edge: max(SITE_GUTTER, calc((100vw - SITE_COLUMN) / 2));
  border: 0; box-shadow: none;
}
.zp-sitebar { box-sizing: border-box; width: 100%; line-height: 1.6; }
.zp-site-id { margin: 0; padding: 0; font-weight: 400; white-space: nowrap; }
.zp-site-nav { margin: 0; padding: 0; font-family: var(--md-text-font-family); font-weight: 400; }
""" + rules + """
.zp-sitebar { flex-wrap: nowrap; }
.zp-header .zp-site-id a,
.zp-header .zp-site-id .sep {
  font: inherit;
  letter-spacing: inherit;
}
.zp-site-nav { flex-wrap: nowrap; }
.zp-site-nav a { line-height: 1.6; }
.zp-menu { display: none; }
/* Tools sit outside the shared bar's flow and cannot change its height. */
.zp-header .md-header__tools {
  position: absolute;
  top: 20px;
  right: max(16px, calc(var(--zp-site-edge) - 112px));
  height: 24px; gap: 8px;
}
.zp-header .md-header__tools .md-header__button,
.zp-header .md-search__button {
  width: 24px; min-width: 24px; height: 24px;
  padding: 0; margin: 0; line-height: 24px;
}
.zp-header .md-search__button::before { top: 3px; left: 3px; width: 18px; height: 18px; }
@media screen and (max-width: 1152px) {
  .zp-site-nav { display: none; }
  .zp-sitebar { justify-content: flex-start; gap: 12px; padding-inline: 16px; }
  .zp-menu { display: block; width: 24px; height: 24px; cursor: pointer; }
  .zp-header .md-header__tools { right: 16px; }
}
@media screen and (max-width: 380px) {
  .zp-header .md-header__paints { display: none; }
  .zp-site-id .sep { margin-inline: 0.4em; }
}
"""
  css = css.replace("SITE_GUTTER", pixels("gutter")).replace("SITE_COLUMN", pixels("col"))
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
