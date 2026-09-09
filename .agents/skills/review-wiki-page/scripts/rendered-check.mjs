#!/usr/bin/env node
// Rendered-page probe for the review-wiki-page skill.
// Usage: node rendered-check.mjs <url> [mountSelector]
//   url            page URL on the local static server (e.g. http://127.0.0.1:8123/troubleshooting/)
//   mountSelector  optional CSS selector of the page's interactive root (e.g. "#zp-triage")
// Prints one JSON blob. See ../references/cdp-gotchas.md before debugging output.
import { spawn } from "node:child_process";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = Number(process.env.ZP_PROBE_PORT || 9345);
const URL_ = process.argv[2];
const MOUNT = process.argv[3] || null;
if (!URL_) { console.error("usage: rendered-check.mjs <url> [mountSelector]"); process.exit(2); }

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--no-first-run",
  `--user-data-dir=/tmp/zp-probe-${PORT}-${Date.now()}`,
  "--window-size=1280,2400",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const p = (await r.json()).find((x) => x.type === "page");
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("chrome devtools endpoint never came up");
}

const ws = new WebSocket(await getWsUrl());
await new Promise((r) => (ws.onopen = r));
let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) => new Promise((res) => {
  const id = ++msgId; pending.set(id, res);
  ws.send(JSON.stringify({ id, method, params }));
});
const evalJs = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? "eval error");
  return r.result?.result?.value;
};

await send("Page.enable");
// throwaway nav (first nav reports innerWidth=1), then the real one, cache-busted
await send("Page.navigate", { url: URL_ }); await sleep(400);
await send("Page.navigate", { url: `${URL_}${URL_.includes("?") ? "&" : "?"}v=${Date.now()}` }); await sleep(1200);

const result = await evalJs(`(async () => {
  const out = {};
  out.title = document.title;
  out.viewport = [window.innerWidth, window.innerHeight];

  out.headings = [...document.querySelectorAll("main h1, main h2, main h3, main h4")]
    .map((h) => Number(h.tagName.slice(1)) + "|" + h.textContent.replace(/¶/g, "").trim().slice(0, 60));

  const toc = document.querySelector(".md-sidebar--secondary");
  if (toc) {
    const r = toc.getBoundingClientRect();
    out.toc = { links: toc.querySelectorAll("a").length, display: getComputedStyle(toc).display,
      visibleAtViewport: r.width > 0 && r.height > 0 };
  } else out.toc = { links: 0, display: "missing" };

  out.skipLink = !!document.querySelector("a.md-skip, .md-skip");

  out.deadAnchors = [...document.querySelectorAll("main a[href^='#']")]
    .filter((a) => a.getAttribute("href").length > 1)
    .filter((a) => !document.getElementById(a.getAttribute("href").slice(1)))
    .map((a) => a.getAttribute("href"));

  const mountSel = ${JSON.stringify(MOUNT)};
  const mount = mountSel ? document.querySelector(mountSel) : null;
  out.mount = { found: !!mount };
  if (mount) {
    const btns = [...mount.querySelectorAll("button")];
    out.mount.buttons = btns.map((b) => b.textContent.trim().slice(0, 50));
    out.mount.aria = {
      pressed: btns.map((b) => b.getAttribute("aria-pressed")),
      controls: btns.map((b) => b.getAttribute("aria-controls")),
      groupRole: mount.querySelector("[role]")?.getAttribute("role") ?? null,
    };
    // activate the first button and describe the aftermath
    if (btns[0]) {
      btns[0].click();
      const ctrl = btns[0].getAttribute("aria-controls");
      const panel = ctrl ? document.getElementById(ctrl) : mount.querySelector("[aria-live]");
      out.mount.afterClick = {
        firstPressed: btns[0].getAttribute("aria-pressed"),
        othersPressed: btns.slice(1).every((b) => b.getAttribute("aria-pressed") === "false"),
        panel: panel ? { hidden: panel.hidden, live: panel.getAttribute("aria-live"),
          role: panel.getAttribute("role"), label: panel.getAttribute("aria-label"),
          children: panel.children.length } : null,
        panelLinksResolve: panel ? [...panel.querySelectorAll("a[href^='#']")]
          .every((a) => !!document.getElementById(a.getAttribute("href").slice(1))) : null,
      };
      out.mount.pressedColor = getComputedStyle(btns[0]).color;
    }
  }

  // per-scheme contrast pair for the active interactive text (if any)
  const probe = out.mount ? mount.querySelector("button") : document.querySelector("a");
  const schemes = {};
  if (probe) {
    for (const s of ["slate", "default"]) {
      document.body.setAttribute("data-md-color-scheme", s);
      // the theme transitions background-color; read after it settles
      schemes[s] = await new Promise((res) => setTimeout(() => {
        let el = probe, bg = null;
        while (el) {
          const c = getComputedStyle(el).backgroundColor;
          if (c && c !== "transparent" && !/rgba?\\(0,\\s*0,\\s*0(?:,\\s*0)?\\)/.test(c)) { bg = c; break; }
          el = el.parentElement;
        }
        res({ fg: getComputedStyle(probe).color, bg: bg ?? "none" });
      }, 250));
    }
    document.body.removeAttribute("data-md-color-scheme");
  }
  out.schemePairs = schemes;
  return out;
})()`);

function contrastRatio(fg, bg) {
  // Accepts rgb()/rgba() ints, color(srgb ...) floats, and oklab(...) —
  // the theme's tokens resolve to all three in computed styles.
  const parse = (c) => {
    c = (c || "").trim();
    let m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(c);
    if (m) return { r: +m[1] / 255, g: +m[2] / 255, b: +m[3] / 255, a: m[4] === undefined ? 1 : +m[4] };
    m = /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/.exec(c);
    if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
    m = /oklab\(([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)(?:\s*\/\s*([\d.]+))?\)/.exec(c);
    if (m) {
      const [L, A, B] = [+m[1], +m[2], +m[3]];
      const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
      const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
      const s_ = L - 0.0894841775 * A - 1.291485548 * B;
      const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
      const lin = [
        4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
      ].map((v) => Math.min(1, Math.max(0, v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)));
      return { r: lin[0], g: lin[1], b: lin[2], a: m[4] === undefined ? 1 : +m[4] };
    }
    return null;
  };
  const f = parse(fg), b = parse(bg);
  if (!f || !b || f.a < 1 || b.a < 1) return null; // translucent: judge by hand
  const lum = (c) => {
    const ch = [c.r, c.g, c.b].map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  };
  const l1 = lum(f), l2 = lum(b);
  return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
}
for (const s of ["slate", "default"]) {
  const p = result.schemePairs?.[s];
  result.schemePairs[s] = { ...p, contrastAA_normalText: p ? contrastRatio(p.fg, p.bg) : null };
}

// mobile width
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await sleep(700);
result.mobile390 = await evalJs(`(() => ({
  scrollWidth: document.scrollingElement.scrollWidth,
  overflows: document.scrollingElement.scrollWidth > window.innerWidth,
}))()`);
await send("Emulation.clearDeviceMetricsOverride");

console.log(JSON.stringify(result, null, 2));
ws.close(); chrome.kill(); process.exit(0);
