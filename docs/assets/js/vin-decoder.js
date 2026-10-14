/*
 * Mazda VIN decoder for docs/technical/car-identification.md.
 *
 * Decodes a VIN or VIN prefix exactly the way the brand matcher's
 * first stage does (match_fw_to_car_fuzzy): WMI from positions 1-3,
 * model line from positions 4-5, model year from position 10. The
 * decode table in this file mirrors the page's VIN decode table
 * (opendbc car/mazda/values.py: the WMI enum and the per-platform
 * chassis_codes / years sets). It never runs fuzzy matching: like the
 * matcher, an unknown WMI or an unmatched platform is a final answer,
 * not a guess.
 *
 * Everything runs in the browser; the VIN never leaves the page.
 *
 * Loaded site-wide through extra_javascript; it exits immediately on
 * pages without the mount.
 */
(function () {
  "use strict";

  var mount = document.getElementById("zp-vin-decoder");
  if (!mount) return;

  /* year codes shared by the platform table (position 10) */
  var YEARS = {
    C: 2012, D: 2013, E: 2014, F: 2015, G: 2016,
    H: 2017, J: 2018, K: 2019, L: 2020,
    M: 2021, N: 2022, P: 2023, R: 2024, S: 2025
  };

  /* decodable WMIs. JM0 is handled apart: it carries no model year
   * and never decodes through the platform table. */
  var WMIS = {
    JM1: "Japan-built passenger car",
    JM3: "Japan-built crossover",
    JM7: "Japan-built crossover (export)",
    "3MZ": "Mexico-built passenger car"
  };

  /* the platform table. Order matters only for readability; the
   * (WMI, chassis, year code) keys are disjoint. */
  var PLATFORMS = [
    { wmis: ["JM3", "JM7"], chassis: "KE", codes: "CDEFG",
      name: "CX-5 2012–2016", kind: "cx5ke" },
    { wmis: ["JM3", "JM7"], chassis: "KF", codes: "HJKLM",
      name: "CX-5 2017–2021", kind: "cx5old" },
    { wmis: ["JM3", "JM7"], chassis: "TC", codes: "GHJKL",
      name: "CX-9 2016–2020", kind: "cx9old" },
    { wmis: ["JM1", "3MZ"], chassis: "BN", codes: "HJ",
      name: "Mazda 3 2017–2018", kind: "mazda3" },
    { wmis: ["JM1"], chassis: "GL", codes: "HJKLM",
      name: "Mazda 6 2017–2021", kind: "mazda6" },
    { wmis: ["JM3", "JM7"], chassis: "TC", codes: "MNPS",
      name: "CX-9 2021–2023 (export to 2025)", kind: "cx9" },
    { wmis: ["JM3", "JM7"], chassis: "KF", codes: "NPRS",
      name: "CX-5 2022–2025", kind: "cx5" }
  ];

  function clean(raw) {
    return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  }

  function validChars(v) {
    return /^[A-HJ-NPR-Z0-9]+$/.test(v); /* VINs have no I, O or Q */
  }

  function findPlatform(wmi, line, yearCode) {
    for (var i = 0; i < PLATFORMS.length; i++) {
      var p = PLATFORMS[i];
      if (p.chassis === line && p.codes.indexOf(yearCode) !== -1 &&
          p.wmis.indexOf(wmi) !== -1) return p;
    }
    return null;
  }

  /* verdict builders: each returns { pill, cls, body } where body is
   * HTML already scoped to this page's links */
  function verdictFor(v) {
    if (v.length === 0) return null;

    if (!validChars(v)) {
      return { cls: "bad", pill: "Not a valid VIN",
        body: "VINs use the letters A to Z except I, O and Q, and " +
              "the digits 0 to 9. Check for a typo." };
    }

    var wmi = v.slice(0, 3);

    if (wmi === "JM0") {
      return { cls: "info", pill: "Export VIN — decodes by firmware",
        body: "Export VINs (JM0, Oceania) carry no model year, so the " +
              "VIN cannot name a platform. If firmware matching does " +
              "not place the car, identification falls to the " +
              "EPS-swap fallback: a recognized steer-to-zero EPS at " +
              "0x730, plus an engine ECU at 0x7e0 whose firmware names " +
              "exactly one platform. If that is your car, ask in the " +
              '<a href="https://discord.gg/jFWkHC2uhh">Discord</a> ' +
              "with the EPS firmware version." };
    }

    if (!WMIS[wmi]) {
      return { cls: "bad", pill: "Unknown WMI",
        body: "This first triple does not match the Mazda table " +
              "(JM1, JM3, JM7, 3MZ, JM0). Either it is not a Mazda, or it " +
              "is not a VIN." };
    }

    if (v.length < 10) {
      return { cls: "info", pill: WMIS[wmi],
        body: "Keep going: the decode also reads the model line " +
              "(positions 4–5) and the model year (position 10), so " +
              "it needs at least 10 characters." };
    }

    var line = v.slice(3, 5);
    var yearCode = v.charAt(9);
    if (!(yearCode in YEARS)) {
      return { cls: "bad", pill: "No platform matches",
        body: "The year code “" + yearCode + "” is outside the table, " +
              "so no Mazda platform decodes from this VIN. A decodable " +
              "WMI that names no platform is a final answer: the " +
              "matcher never second-guesses it." };
    }
    var p = findPlatform(wmi, line, yearCode);
    if (!p) {
      return { cls: "bad", pill: "No platform matches",
        body: "WMI " + WMIS[wmi] + ", model line “" + line + "”, year " +
              YEARS[yearCode] + ": no Mazda platform in the table " +
              "matches all three. Another chassis code, or a year " +
              "outside it — and the matcher never second-guesses that." };
    }

    if (p.kind === "cx5") {
      return { cls: "good", pill: "Full support — primary target",
        body: "<strong>" + p.name + ".</strong> Every zoompilot " +
              "feature. This model ships with the compatible Mazda " +
              "EPS (2022+), and zoompilot confirms it from the EPS " +
              "firmware: steering works down to a stop, and alpha " +
              "longitudinal is available (radar and AEB off while it " +
              "is on). A car that reports older EPS firmware keeps the " +
              "28 mph (45 km/h) steering floor. See " +
              '<a href="../../getting-started/supported-cars/">supported ' +
              "cars</a> and " +
              '<a href="../../features/steering/">steering</a>.' };
    }
    if (p.kind === "cx9") {
      return { cls: "good", pill: "Full support",
        body: "<strong>" + p.name + ".</strong> The stock CX-9 EPS " +
              "gets the same steering tune and torque limit as the " +
              "2022 motor, but stops assisting below 28 mph (45 km/h) " +
              "and gets no alpha longitudinal. A compatible Mazda EPS " +
              "(2022+) swapped in steers down to a stop and makes " +
              "alpha longitudinal available (radar and AEB off while " +
              "it is on). See " +
              '<a href="../../getting-started/supported-cars/">supported ' +
              "cars</a> and " +
              '<a href="#eps-swap">the EPS swap</a>.' };
    }
    /* older platforms: they run on the stock motor above its floor */
    if (p.kind === "cx5old" || p.kind === "cx9old" || p.kind === "cx5ke") {
      return { cls: "mid", pill: "Supported — steering above 28 mph",
        body: "<strong>" + p.name + ".</strong> zoompilot runs on the " +
              "stock motor with the same steering tune and torque " +
              "limit as the 2022 motor, above 28 mph (45 km/h). With " +
              "a compatible Mazda EPS (2022+) swapped in, steering " +
              "works down to a stop and alpha longitudinal becomes " +
              "available" + (p.kind === "cx5old" ? "" :
              " if zoompilot also detects the G46L radar") +
              " (radar and AEB off while it is on). See " +
              '<a href="../../getting-started/supported-cars/">supported ' +
              "cars</a> and " +
              '<a href="#eps-swap">the EPS swap</a>.' };
    }
    /* community-reported platforms: fewer test miles */
    if (p.kind === "mazda3" || p.kind === "mazda6") {
      return { cls: "mid", pill: "Reported working — community drives",
        body: "<strong>" + p.name + ".</strong> Community drives " +
              "report zoompilot runs on the stock motor above 28 mph " +
              "(45 km/h); fewer test miles than the CX-5 and CX-9. " +
              "A compatible Mazda EPS (2022+) swap adds steering down " +
              "to a stop and alpha longitudinal (radar and AEB off " +
              "while it is on). See " +
              '<a href="../../getting-started/supported-cars/">supported ' +
              "cars</a>." };
    }
  }

  function render(v) {
    var out = mount.querySelector(".zp-vin-out");
    var v9 = verdictFor(v);
    out.hidden = !v9;
    if (!v9) return;
    out.className = "zp-vin-out zp-vin-" + v9.cls;
    out.innerHTML = '<span class="zp-vin-pill">' + v9.pill + "</span>" +
      '<p class="zp-vin-body">' + v9.body + "</p>";
  }

  var input = mount.querySelector("input");
  input.addEventListener("input", function () {
    var v = clean(input.value);
    if (v !== input.value) input.value = v;
    render(v);
  });
})();
