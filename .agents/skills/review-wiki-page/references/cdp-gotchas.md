# CDP gotchas — why probes lie

Learned the hard way (2026-09-05 a11y pass, 2026-09-09 troubleshooting
pass). Read before debugging probe output or writing new probe code.

**Chrome boot**
- Path: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
  flags `--headless=new --remote-debugging-port=<port>
  --user-data-dir=/tmp/<unique-profile> --window-size=1280,2400 about:blank`.
  Unique profile per run or Chrome reuses a stale session.
- One CDP harness at a time — they fight over ports. Increment ports
  (9333, 9334, ...) between scripts.
- The first `Page.navigate` after boot reports `innerWidth: 1`. Do a
  throwaway navigate, then navigate again with a cache-busting
  `?v=${Date.now()}`.
- `python3 -m http.server` sends no `Cache-Control`; headless Chrome serves
  stale localhost renders. Always cache-bust.

**Focus and keys**
- Programmatic `.focus()` does NOT match `:focus-visible`. A probe reading
  `outline: none` after `.focus()` is a false alarm. Real check:
  `Input.dispatchKeyEvent` with `type: "keyDown", key: "Tab"` repeatedly,
  then read `document.activeElement` and `el.matches(":focus-visible")`.
- Enter activation needs `type: "keyDown"` **plus** `text: "\r"` and
  `unmodifiedText: "\r"` (then a matching `keyUp`). `rawKeyDown` silently
  never activates buttons. Space needs `text: " "`.
- The theme chrome eats ~30+ Tab stops before main content (header, tabs,
  sidebar). Walk with a high cap; the skip link is the first stop.

**Layout and theme**
- Media-query `em`s resolve against the 16px initial font size — the html
  rem base is 20px on this site but breakpoints don't care. The theme's
  `76.25em` breakpoint is 1220px, not 1525px. Right-rail TOC and the tabs
  bar appear only ≥~1220px. To test wide layouts, force
  `Emulation.setDeviceMetricsOverride` — `--window-size` alone is not
  reliable.
- Sticky/fixed elements report `offsetParent: null` even when visible.
  Visibility check: `getBoundingClientRect()` width/height plus computed
  `display`.
- The color-scheme attribute lives on `body[data-md-color-scheme]`
  (`"slate"` dark, `"default"` light). Setting it on `html` does nothing —
  probes then report dark colors for "light mode" and invite phantom
  contrast bugs.
- Light mode remaps `--zp-tint` to `--zp-deep` on `body`; `--zp-paint-t`
  keeps the light tint for plates that stay dark. Contrast math on tinted
  text must run per scheme.
- Permalinks put a literal `¶` inside heading `textContent` — strip it when
  comparing heading text to anchors.

**Servers**
- Run the http.server as its own background task; a shared task's TaskStop
  kills the whole process group including the server mid-probe.
- 8123 (static) and 8000 (Nick's live serve) are Nick's. Check
  `lsof -nP -iTCP:8123 -iTCP:8000 -sTCP:LISTEN` before starting anything,
  and stop your own server when done.
- Playwright MCP screenshots hang after "fonts loaded"; shell
  `chrome --screenshot` can stall on fonts too. DOM assertions via CDP are
  the reliable path; treat screenshots as best-effort.
