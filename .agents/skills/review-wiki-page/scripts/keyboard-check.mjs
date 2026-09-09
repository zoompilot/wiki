#!/usr/bin/env node
// Real-keyboard probe for the review-wiki-page skill.
// Usage: node keyboard-check.mjs <url> <selector> [maxTabs]
//   url       page URL on the local static server
//   selector  CSS selector of the interactive element to reach (e.g. "#zp-triage button")
//   maxTabs   cap on Tab presses before giving up (default 80)
// Walks real Tab key events until the selector has focus, reports the
// :focus-visible state, then fires Enter and Space and reports activation.
// See ../references/cdp-gotchas.md — synthetic focus lies; only these
// dispatchKeyEvent calls tell the truth.
import { spawn } from "node:child_process";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = Number(process.env.ZP_PROBE_PORT || 9346);
const URL_ = process.argv[2];
const SELECTOR = process.argv[3];
const MAX_TABS = Number(process.argv[4] || 80);
if (!URL_ || !SELECTOR) { console.error("usage: keyboard-check.mjs <url> <selector> [maxTabs]"); process.exit(2); }

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--no-first-run",
  `--user-data-dir=/tmp/zp-kbd-${PORT}-${Date.now()}`,
  "--window-size=1280,900",
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
  return r.result?.result?.value;
};
async function key(k) {
  const code = k === "Tab" ? 9 : k === "Enter" ? 13 : 32;
  const text = k === "Enter" ? "\r" : k === " " ? " " : undefined;
  const base = { key: k, code: k === " " ? "Space" : k === "Tab" ? "Tab" : "Enter", windowsVirtualKeyCode: code, nativeVirtualKeyCode: code };
  await send("Input.dispatchKeyEvent", { type: "keyDown", ...base, ...(text ? { text, unmodifiedText: text } : {}) });
  await send("Input.dispatchKeyEvent", { type: "keyUp", ...base });
}

await send("Page.enable");
await send("Page.navigate", { url: URL_ }); await sleep(400);
await send("Page.navigate", { url: `${URL_}${URL_.includes("?") ? "&" : "?"}v=${Date.now()}` }); await sleep(1000);

// Tab-walk until the selector has focus. Focus moves between keyDown and
// keyUp, so press one Tab at a time and re-check.
const before = await evalJs(`(() => ({ matches: document.querySelectorAll(${JSON.stringify(SELECTOR)}).length }))()`);
const trail = [];
let reached = false;
for (let i = 0; i < MAX_TABS; i++) {
  await key("Tab");
  const stop = await evalJs(`(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return "body";
    const cls = typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\\s+/)[0] : "";
    return el.tagName + cls + " :: " + (el.textContent || "").trim().slice(0, 25);
  })()`);
  trail.push(stop);
  reached = await evalJs(`(() => !!document.activeElement && document.activeElement.matches(${JSON.stringify(SELECTOR)}))()`);
  if (reached) break;
}

const focusState = reached ? await evalJs(`(() => {
  const el = document.activeElement;
  const cs = getComputedStyle(el);
  return {
    element: el.tagName + " :: " + el.textContent.trim().slice(0, 30),
    matchesFocusVisible: el.matches(":focus-visible"),
    outline: [cs.outlineStyle, cs.outlineWidth, cs.outlineColor],
    boxShadow: cs.boxShadow,
  };
})()`) : { notReached: true, lastStops: trail.slice(-5) };

// Enter on the reached element
const enterResult = reached ? await (async () => {
  await key("Enter"); await sleep(250);
  return evalJs(`(() => {
    const el = document.activeElement;
    const ctrl = el.getAttribute("aria-controls");
    const panel = ctrl ? document.getElementById(ctrl) : null;
    return {
      ariaPressed: el.getAttribute("aria-pressed"),
      panelHidden: panel ? panel.hidden : null,
      panelChildren: panel ? panel.children.length : null,
    };
  })()`);
})() : null;

// Space on the NEXT element matching the selector
const spaceResult = await (async () => {
  const moved = await evalJs(`(() => {
    const els = [...document.querySelectorAll(${JSON.stringify(SELECTOR)})];
    if (els.length < 2) return false;
    els[1].focus();
    return els[1] === document.activeElement;
  })()`);
  if (!moved) return { skipped: "fewer than two matches" };
  await key(" "); await sleep(250);
  return evalJs(`(() => {
    const el = document.activeElement;
    const ctrl = el.getAttribute("aria-controls");
    const panel = ctrl ? document.getElementById(ctrl) : null;
    return {
      ariaPressed: el.getAttribute("aria-pressed"),
      panelHidden: panel ? panel.hidden : null,
      panelChildren: panel ? panel.children.length : null,
    };
  })()`);
})();

console.log(JSON.stringify({ url: URL_, selector: SELECTOR, matches: before?.matches, tabStops: trail.length,
  focusState, enterResult, spaceResult }, null, 2));
ws.close(); chrome.kill(); process.exit(0);
