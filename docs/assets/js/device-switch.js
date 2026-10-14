/*
 * Device switcher for pages with device screenshots.
 *
 * The wiki documents both supported devices: comma 4 (mici) and comma 3/3X
 * (tici/tizi). Screenshots for both are embedded as .settings-figure-mici /
 * .settings-figure-tici figures (Settings reference, feature pages). This
 * switcher shows one set; the text stays shared because the underlying
 * settings are the same params on both devices.
 *
 * One switch per page. It fills an empty [data-device-switch] placeholder if
 * the page has one (the Settings reference puts it above the panels);
 * otherwise it is inserted before the first device figure. Pages without
 * device figures are left alone.
 *
 * Without JS there is no switch and both sets render stacked with their
 * captions, so the page still works.
 * The choice persists across pages in localStorage (key: zp-settings-device);
 * ?device=mici|tici in the URL wins and is saved.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "zp-settings-device";
  var DEFAULT_DEVICE = "mici";
  var DEVICES = [["mici", "comma 4"], ["tici", "comma 3X"]];
  var FIGURES = ".settings-figure-mici, .settings-figure-tici";

  function valid(d) {
    return d === "mici" || d === "tici";
  }

  function apply(device) {
    document.body.classList.toggle("zp-device-tici", device === "tici");
    var buttons = document.querySelectorAll("[data-device-switch] button[data-device]");
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute("data-device") === device;
      buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function buildSwitch(group) {
    group.classList.add("device-switch");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Which device's screens to show");
    group.textContent = "";
    DEVICES.forEach(function (d) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-device", d[0]);
      btn.textContent = d[1];
      group.appendChild(btn);
    });
    return group;
  }

  function init() {
    var first = document.querySelector(FIGURES);
    var group = document.querySelector("[data-device-switch]");
    if (!first && !group) return;

    if (group) {
      // a page that still ships its own buttons keeps them
      if (!group.querySelector("button[data-device]")) buildSwitch(group);
    } else {
      group = buildSwitch(document.createElement("div"));
      group.setAttribute("data-device-switch", "");
      // before the figure group (or the figure itself) so it reads as its label
      var anchor = first.closest(".zp-setting-shots") || first;
      anchor.parentNode.insertBefore(group, anchor);
    }

    // JS works: mark the page so CSS hides the inactive device's figures.
    document.body.classList.add("zp-device-pick");

    var saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* storage unavailable */ }
    var device = valid(saved) ? saved : DEFAULT_DEVICE;
    var urlDevice = new URLSearchParams(window.location.search).get("device");
    if (valid(urlDevice)) {
      device = urlDevice;
      try {
        window.localStorage.setItem(STORAGE_KEY, device);
      } catch (e) { /* ignore */ }
    }
    apply(device);

    group.addEventListener("click", function (event) {
      var btn = event.target.closest("button[data-device]");
      if (!btn) return;
      device = btn.getAttribute("data-device");
      try {
        window.localStorage.setItem(STORAGE_KEY, device);
      } catch (e) { /* ignore */ }
      apply(device);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
