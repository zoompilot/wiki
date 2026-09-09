/*
 * Triage wizard for docs/troubleshooting.md.
 *
 * A symptom picker above the full text: pick what you see, get the
 * first moves. It is a shortcut, not a replacement — the hand-written
 * sections below stay the full answer, and everything here links into
 * them. Keep the labels and hrefs in step with the section headings.
 */
(function () {
  "use strict";

  var mount = document.getElementById("zp-triage");
  if (!mount) return;

  var SYMPTOMS = [
    {
      label: "Dashboard errors (cruise, LKAS, radar)",
      steps: [
        "Run the ECU reset: park, car fully off for a minute, drive again.",
        "Still erroring? Repeat with 15 minutes off; a short power-down misses some faults.",
        "Still erroring after that? Update to the latest zoompilot/main first.",
        "Then share a route from the drive, with the exact dash message.",
      ],
      href: "#dashboard-errors-cruise-lkas-or-radar",
      more: "Dashboard errors",
    },
    {
      label: "Cruise blocked after flipping alpha longitudinal",
      steps: [
        "Turning alpha longitudinal off can leave the radar unhappy: park, turn the car fully off, start again.",
        "Drive once with zoompilot not engaged.",
        "Still blocked? Follow the dashboard-error reset.",
      ],
      href: "#cruise-blocked-after-flipping-alpha-longitudinal",
      more: "Cruise blocked",
    },
    {
      label: "Weird behavior after switching forks",
      steps: [
        "Factory-reset the device, then install zoompilot/main fresh.",
        "Stale settings from the old fork cause hard-to-explain faults.",
      ],
      href: "#weird-behavior-after-switching-forks",
      more: "Switching forks",
    },
    {
      label: "Steering feels weak or wobbly",
      steps: [
        "Check Settings → Steering: torque control, self-tune, and speed-dependent self-tune on; custom tuning off.",
        "Give self-tune a few drives — fresh installs start from CX-5 seeds.",
        "CX-9 owners: speed-dependent torque needs longer to learn.",
      ],
      href: "#steering-feels-weak-or-wobbly",
      more: "Weak steering",
    },
    {
      label: "zoompilot will not engage",
      steps: [
        "Check Enable zoompilot (Settings → Toggles) — the master switch.",
        "Engagement needs: door closed, seatbelt on, stock cruise able to set.",
        "Confirm your car is on the supported list.",
      ],
      href: "#zoompilot-will-not-engage",
      more: "Will not engage",
    },
    {
      label: "Wrong speed limits on a km/h car",
      steps: [
        "Update: fixed since 2026.08.25-8.",
        "Check the nav SD card is inserted — sign reading needs it.",
      ],
      href: "#wrong-speed-limits-on-a-kmh-car",
      more: "Speed limits",
    },
    {
      label: "Fixed alerts: Cruise Fault, NO PANDA",
      steps: [
        "Both were bugs in older releases, fixed in the 2026.08 releases.",
        "Update to the latest zoompilot/main.",
      ],
      href: "#cruise-fault-restart-the-car-on-a-cold-start",
      more: "Fixed alerts",
    },
    {
      label: "Something else / need humans",
      steps: [
        "Work through the three 'before you troubleshoot' steps below.",
        "Then post on Discord with release version, car, and a route ID.",
      ],
      href: "#where-to-get-more-help",
      more: "Get more help",
    },
  ];

  mount.innerHTML = "";
  mount.className = "zp-triage";

  var prompt = document.createElement("p");
  prompt.className = "zp-triage-prompt";
  prompt.textContent = "What are you seeing?";
  mount.appendChild(prompt);

  var row = document.createElement("div");
  row.className = "zp-triage-symptoms";
  row.setAttribute("role", "group");
  row.setAttribute("aria-label", "Symptoms");
  var out = document.createElement("div");
  out.className = "zp-triage-out";
  out.id = "zp-triage-out";
  out.setAttribute("role", "region");
  out.setAttribute("aria-label", "Suggested first moves");
  out.setAttribute("aria-live", "polite");

  SYMPTOMS.forEach(function (s) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "zp-triage-btn";
    b.textContent = s.label;
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-controls", "zp-triage-out");
    b.addEventListener("click", function () {
      mount.querySelectorAll(".zp-triage-btn").forEach(function (x) {
        x.setAttribute("aria-pressed", "false");
      });
      b.setAttribute("aria-pressed", "true");
      out.innerHTML = "";
      var ol = document.createElement("ol");
      s.steps.forEach(function (step) {
        var li = document.createElement("li");
        li.textContent = step;
        ol.appendChild(li);
      });
      out.appendChild(ol);
      var more = document.createElement("a");
      more.href = s.href;
      more.textContent = "Full section: " + s.more + " ↓";
      out.appendChild(more);
      out.hidden = false;
    });
    row.appendChild(b);
  });

  mount.appendChild(row);
  out.hidden = true;
  mount.appendChild(out);
})();
