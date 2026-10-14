# zoompilot wiki editorial review

Reviewed 2026-10-14 against the local wiki, the public zoompilot.ai and
zoompilot.ai/jetlink pages, the local Jetlink setup and daily-use guides,
and Claude memories recording the author's site decisions.

The wiki already has useful material. Its main problem is the order and
amount of information presented to a driver. It introduces the software's
ancestry, steering hardware, tuning, and experimental modes before making
the ordinary setup and driving experience clear. Several pages also
disagree about support and setup.

Use the Jetlink docs as the documentation model: choose the relevant
guide, check requirements, follow a short sequence, check the result,
and find help by symptom. Keep detailed explanations available through
links or optional sections.

## What works in your writing

The website leads with a driver-visible result, then gives the mechanism
if needed. Feature descriptions say what changes on the road. Installation
is one instruction and an address. The tone is direct, personal where
appropriate, and specific rather than promotional.

The Jetlink docs make this more useful for setup:

- Each guide serves a specific reader and task.
- Requirements are concrete and appear before instructions.
- Steps use the exact names the reader sees on screen.
- Defaults remove decisions: “Leave Big Model at its default.”
- Instructions include an observable result, such as a green icon.
- Troubleshooting pairs a symptom with a first action.
- Optional settings and background sit below the main task or in folds.
- Experimental status and limitations are explicit.

Your saved site preferences reinforce this: fewer containers, soft tags,
one heading per section, a restrained type scale, lowercase section
headings, and no redundant summaries. Apply the structure to the wiki
without making every page repeat the same introduction.

## Fix these before polishing the layout

| Priority | Evidence | Change |
| --- | --- | --- |
| First | Home and Supported cars say every sunnypilot car is supported; Comparison says zoompilot supports one brand and tells other owners to use upstream. | Establish one support statement and use it throughout. Distinguish software compatibility from Mazda-specific improvements and validation. |
| First | The wiki Jetlink guide uses Docker, `jetson-trt`, and Accelerator Link. The current repo guides use platform-specific installers, `develop`, and Jetlink settings. | Replace the old tester procedure with a short overview linking to the maintained Jetlink guides. Preserve its URL. |
| First | Wiki feature pages require the ICBM toggle and describe Deceleration Overshoot. The site's unreleased notes describe automatic ICBM and the replacement curve tune. | State which release or branch a guide covers. Check names, paths, and defaults against that version; do not publish unreleased instructions as released behaviour. |
| First | Alpha longitudinal's wiki path is Developer; the website describes Cruise. | Verify the path per device and documented version before changing it. |
| First | First drive and Safety say brake/cancel leave steering active, but the adapted upstream safety section says brake/cancel return manual control without explaining the difference. | Make the zoompilot control behaviour explicit next to the inherited text. Verify any TJA-button configuration separately. |
| Next | Hardware and FAQ imply a Mazda nav SD card is required for map-based curve control; the website instructs users to download maps in sunnylink. | Separate Mazda sign recognition from downloaded map data. Verify dependencies instead of treating them as one requirement. |
| Next | Home and Install display an August build stamp; the public site lists a September release. | Refresh from the documented release or remove the stamp from the getting-started path. Keep release details in one maintained location. |
| Next | First drive recommends named model alternatives before showing controls; several feature claims are absolute. | Lead with defaults and controls. Qualify claims such as “full strength,” “knows the speed limit,” “real faults stay,” and instant handover with their actual limits. |

These are documentation findings, not a certification of vehicle behaviour.
Memories and unreleased notes identify likely drift; the documented
release and its tested UI must settle the final wording.

## Organise around the reader's questions

The landing page should answer these in order:

1. What does zoompilot do?
2. What changes compared with openpilot or sunnypilot?
3. Will it work with my car and existing device?
4. What must I install or change?
5. How do I turn assistance on and off?
6. Which extras can I try later?

Offer two simple text links near the start: **New to comma?** and
**Already using openpilot or sunnypilot?** They can point to sections in
one setup guide. A newcomer needs hardware and physical installation;
an existing user needs compatibility, reset implications, installation,
defaults, and control differences. Neither needs to read six separate
pages before seeing the complete setup sequence.

Keep a compact primary navigation: **Start here · Features · Settings ·
Help**. Keep Technical and Community accessible through the sidebar or
footer. Put Comparison near the beginning, where people decide whether
to switch, rather than after First drive.

## Suggested opening copy

> zoompilot helps your car steer and manage cruise speed. It builds on
> sunnypilot, with extra steering and cruise improvements for Mazda.
> You stay responsible for steering, braking, and watching the road.

Primary link: **Set up zoompilot**. Secondary link: **Check your car**.

After the support statement is verified, add a short line explaining
that other supported sunnypilot cars can run zoompilot, while feature
availability varies by car. Do not make readers decode “fork,”
“EPS-limited,” or “alpha longitudinal” to understand the introduction.

For returning users, a short “Coming from openpilot or sunnypilot?”
section should describe the actual changes: steering behaviour, curve
slowdowns, speed-limit assistance, defaults, and steering staying active
when cruise is cancelled. Link to the detailed comparison afterward.

## Page-by-page direction

| Page | Recommended edit |
| --- | --- |
| Home | Short introduction, two setup entry points, a few driver benefits, help link. Remove the repeated six-page syllabus, technical feature inventory, and build hash from the main reading path. Keep a brief driver-responsibility statement. |
| Start here | Make this a usable setup guide: check compatibility, prepare device, install, check readiness, learn controls. Link out for detail. |
| What is zoompilot? | Keep the practical explanation. Reduce the openpilot/sunnypilot family tree to one paragraph. Move contributors to About. |
| Supported cars | Separate “runs zoompilot” from “gets low-speed steering” and “can use experimental speed control.” Explain whether a hardware swap is optional before discussing how it is detected. |
| Hardware | Split “Already have a comma?” from “Buying your first device?” Keep required parts prominent. Put nav card and external computers under optional extras. Explain Jetlink is optional. |
| Install | Give current users an actionable switching sequence and explain what reset removes. Keep one recommended route prominent; put branch choices and demonstrations below it. |
| First drive | Lead with readiness checks and steering/cruise controls. Keep the default model. Move alternative models and tuning advice to an optional page. Explain visible status and what to do if assistance is unavailable. |
| Features | Group by what the driver wants: steering, slowing for curves, speed limits. Mark optional and experimental functions without making them appear necessary. Include Lane Change Smoothing to match the site. |
| Individual features | Answer: what it does, whether action is needed, how to enable it, what to expect, how to stop it, limitations. Put controller diagrams and numerical comparisons in Technical. |
| Settings | Put recommended setup and a few common tasks above the full explorer. Readers should not need to understand every switch. Retain exact device names in the reference. |
| Help | Use the Jetlink symptom/first-action format. Ask for car, device, version, and the observed problem before requesting logs. |
| Jetlink | Briefly explain the optional benefit and requirements, then link to the repo's platform selector, daily use, and troubleshooting. Maintain installation instructions in one place. |

## Visual direction

Brand cohesion is more than matching colours and fonts. Use the site's
quiet rows, restrained emphasis, and short sections. The current wiki
CSS explicitly retains cards for browsing, whereas your saved site
decisions favour fewer containers. Flatten feature lists and next-step
links where a heading and sentence are enough.

- Give each page one primary task and one clear next link.
- Keep the answer and required action visible before optional detail.
- Use a short checklist for prerequisites and numbered steps for tasks.
- Reserve tables for comparisons, compatibility, and symptoms.
- Keep warnings visible beside the action they affect; never hide
  disabled emergency-braking information inside an optional fold.
- Use screenshots to identify a control or show success, not as a
  gallery of every panel. Label the device and documented version.
- Hide engineering detail in optional sections or link to Technical.
- Keep body text comfortably readable on mobile; do not copy small
  website label sizes into instructions.
- Reduce decorative hero space so users reach the setup decision sooner.

Review the rendered wiki at phone and desktop widths, in both colour
schemes. Check table scrolling, menu discovery, warning prominence,
long setting names, keyboard focus, and the reading order without CSS.
This review inspected source structure and CSS; it does not claim those
rendered checks have passed.

## Plain-language rules

Use **steering** rather than lateral, **speed and braking** rather than
longitudinal, **turn assistance on** rather than engage, and **your car's
cruise control** rather than MRCC in introductory text. Keep exact UI
labels alongside the explanation when a person must find a setting.

For example: **Experimental speed control (Alpha Longitudinal)** can
introduce the feature, followed immediately by its emergency-braking
warning. **Automatic cruise-button control (ICBM)** explains the
mechanism without asking readers to remember the acronym.

Explain terms in the sentence where needed. Glossary links are useful
backup, but should not be required to follow a setup step. Avoid
repeating definitions on the same page.

Replace blanket promises with specific observations: “uses speed limits
from signs and maps” rather than “knows the speed limit”; “more steering
assistance at low speeds” rather than “full strength.” Include the
relevant limitation without burying the useful answer.

## Recommended implementation order

1. Resolve version scope, support contradictions, controls, and stale
   Jetlink guidance.
2. Rewrite Home, Start here, Install, and First drive around the two
   reader paths.
3. Simplify feature pages and add common tasks above Settings.
4. Flatten unnecessary containers and verify rendered layouts.
5. Check each instruction against the documented device/version, run
   the strict build, and check links before publication.

Existing uncommitted wiki edits were left intact. The former local site
checkout was removed according to the 2026-10-13 memory. A fresh clone
attempt failed because the shell could not resolve GitHub, so site tone
was assessed from public pages and saved author preferences rather than
the current private site source. No website or wiki was deployed.


Implementation follow-up: the latest website checkout was subsequently
located in the Claude scratch directory. The revamp now imports its
header rules and fonts directly. See REVAMP-REVIEW.md for sources, changes,
and validation status.
