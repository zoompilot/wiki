#!/usr/bin/env python3
"""Check every <img>/<source>/<video> path in the built wiki resolves when
the wiki is served under a sub-path (zoompilot.ai/wiki/).

zensical's strict build checks Markdown links, not paths in raw HTML, and a
path with one "../" too many still works at a domain root (pages.dev) but
leaves /wiki/ on zoompilot.ai. Note: zensical rewrites raw `src` paths
relative to the Markdown file (write ../assets/... from docs/features/), but
leaves `poster` as written (write it relative to the page URL).

Usage: check-media.py <built site dir> [base path, default /wiki/]
"""
import pathlib
import posixpath
import re
import sys

root = pathlib.Path(sys.argv[1])
base = sys.argv[2] if len(sys.argv) > 2 else "/wiki/"
media = re.compile(r'<(?:img|source|video)[^>]*?\s(?:src|poster)="([^"#?]+)"')

broken, total = [], 0
for html in root.rglob("*.html"):
    rel = html.relative_to(root).as_posix()
    page = base + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)
    page_dir = page if page.endswith("/") else posixpath.dirname(page) + "/"
    for src in media.findall(html.read_text()):
        if src.startswith(("http:", "https:", "data:", "//")):
            continue
        total += 1
        target = src if src.startswith("/") else posixpath.normpath(posixpath.join(page_dir, src))
        if not target.startswith(base) or not (root / target[len(base):]).exists():
            broken.append(f"{rel}: {src} -> {target}")

for line in broken:
    print("broken media:", line, file=sys.stderr)
print(f"media check: {total} paths, {len(broken)} broken")
sys.exit(1 if broken else 0)
