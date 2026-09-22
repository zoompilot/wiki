---
title: Wiki style guide
type: reference
description: For wiki editors — the page types and building blocks the zoompilot wiki uses, each shown live with its markdown.
---

# Wiki style guide

For wiki editors. Every page is one of six types, built from a small
set of blocks. This page shows each block live, with the markdown that
makes it. The writing rules live in `CONTRIBUTING.md`.
{ .zp-lede }

## Who we write for

The reader of every page outside Technical has never heard of
openpilot, a comma device, or zoompilot. They may land on any page from
a search. So each page:

- **opens with the answer** — the lede, one or two plain sentences;
- **explains each new word the first time it appears**, in the sentence
  itself (a hover tooltip does not count: phones cannot hover);
- **shows where things are on the device** — the settings path;
- **ends with the next step**.

Technical pages are the exception. Their reader knows openpilot, and
their text stays close to the zoompilot repository's own notes.

## Page types

| Type | Answers | Where | Built from |
| --- | --- | --- | --- |
| hub | What is in this section? | each section's first page | lede, card groups |
| path | What do I do next on the way to driving? | Start here | lede, content, next step |
| feature | What does it do for me, and how do I turn it on? | Features | lede, at a glance, sections, next step |
| task | How do I do this? | Help, install | lede, at a glance, steps, next step |
| reference | Look it up | Settings, FAQ, glossary | lede, scannable body |
| technical | Why is the code like this? | Technical | about this page, collapsed source list |

Set the type in front matter: `type: feature`.

## Lede

The first paragraph after the title, in larger type. It answers the
page's question with no jargon.

Cruise control holds one speed, even into a sharp curve. Smart Cruise
looks ahead, lowers your set speed before the curve, and brings your
original speed back after it.
{ .zp-lede }

```markdown
Cruise control holds one speed, even into a sharp curve. Smart Cruise
looks ahead, lowers your set speed before the curve, and brings your
original speed back after it.
{ .zp-lede }
```

## At a glance

Facts a reader scans for, in label–value rows. Used on feature pages
(status, works on, turn it on, needs) and task pages (before you
start, you need, time). Drop any row you cannot source — never guess.

<div class="zp-glance" markdown>

- **Status** <span class="zp-badge zp-badge--alpha">Alpha</span> Off
  out of the box.
- **Works on** Every supported Mazda.
- **Turn it on** `Settings → Cruise → Smart Cruise Control: Vision`{ .zp-path }
- **Needs** Map mode needs the nav SD card.

</div>

```markdown
<div class="zp-glance" markdown>

- **Status** <span class="zp-badge zp-badge--alpha">Alpha</span> Off
  out of the box.
- **Works on** Every supported Mazda.
- **Turn it on** `Settings → Cruise → Smart Cruise Control: Vision`{ .zp-path }
- **Needs** Map mode needs the nav SD card.

</div>
```

## Badges

<span class="zp-badge zp-badge--ok">On by default</span>
<span class="zp-badge zp-badge--auto">Automatic</span>
<span class="zp-badge">Default</span>
<span class="zp-badge zp-badge--alpha">Alpha</span>
<span class="zp-badge zp-badge--experimental">Experimental</span>

```html
<span class="zp-badge zp-badge--ok">On by default</span>
<span class="zp-badge zp-badge--auto">Automatic</span>
<span class="zp-badge">Default</span>
<span class="zp-badge zp-badge--alpha">Alpha</span>
<span class="zp-badge zp-badge--experimental">Experimental</span>
```

Use `--experimental` only for alpha longitudinal and anything else
that turns a safety system off.

## Settings path

Whenever a page names a setting, show where it is:
`Settings → Developer → Alpha Longitudinal`{ .zp-path }.

```markdown
`Settings → Developer → Alpha Longitudinal`{ .zp-path }
```

Names and defaults come from the settings data the Settings page is
built from — copy them exactly as the device shows them.

## Steps

Numbered steps on a rail, for tasks. Start each step with the action
in bold.

<div class="zp-steps" markdown>

1. **Park, then turn the car completely off.**
2. **Wait one minute**, then start the car and drive again.
3. **Still there? Wait 15 minutes.** Some faults clear only after the
   car's modules shut down fully.

</div>

```markdown
<div class="zp-steps" markdown>

1. **Park, then turn the car completely off.**
2. **Wait one minute**, then start the car and drive again.

</div>
```

## Journey

The numbered start path, on the home page and Start here. Give the
safety step the `zp-journey__safety` class so it stands out.

<div class="zp-journey" markdown>

1. [What is zoompilot?](../getting-started/what-is-zoompilot.md)
   What it is and who makes it.
2. [Safety rules](../safety.md){ .zp-journey__safety }
   What stays your job.
3. [Install](../getting-started/install.md)
   Type one address on the device.

</div>

```markdown
<div class="zp-journey" markdown>

1. [What is zoompilot?](../getting-started/what-is-zoompilot.md)
   What it is and who makes it.
2. [Safety rules](../safety.md){ .zp-journey__safety }
   What stays your job.

</div>
```

## Next step

Closes path, feature, and task pages. The first card is labelled
"Next step"; any others are labelled "Or".

<div class="zp-next" markdown>

- [Install zoompilot](../getting-started/install.md)
  Put it on your comma device
- [Safety](../safety.md)
  The rules first

</div>

```markdown
<div class="zp-next" markdown>

- [Install zoompilot](../getting-started/install.md)
  Put it on your comma device
- [Safety](../safety.md)
  The rules first

</div>
```

## Callouts

Admonitions carry warnings — never plain bold text.

!!! abstract "In short"

    A summary at the top of a long page.

!!! note

    Helpful context.

!!! warning

    A risk that is not the alpha longitudinal radar trade.

!!! danger "Reserved"

    Only for the alpha longitudinal radar and emergency-braking
    warning.

```markdown
!!! abstract "In short"

    A summary at the top of a long page.
```

## Technical page header

Every technical page opens with the same two blocks, so a newcomer who
lands there knows where they are and where the plain-words page is.
The author's text below them is unchanged.

!!! abstract "About this page"

    What the page records, in one sentence. It is the engineering
    record, written for readers who know openpilot. The plain-words
    page is [ICBM](../features/icbm.md).

??? info "Code and tests"

    Code: `path/to/file.py` (what it is). Tests: `path/to/tests/`.

```markdown
!!! abstract "About this page"

    What the page records, in one sentence. It is the engineering
    record, written for readers who know openpilot. The plain-words
    page is [ICBM](../features/icbm.md).

??? info "Code and tests"

    Code: `path/to/file.py` (what it is). Tests: `path/to/tests/`.
```
