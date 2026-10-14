---
title: Imported content and syncing
type: reference
---

# Imported content and syncing

The manual's driver guides are hand-written. Jetlink guides, shared
header styles, and fonts are imported from their maintained sources.
{ .zp-lede }

## Jetlink

The Jetlink repository is the source of truth for docs/jetlink and its
images. The importer records the reviewed commit and generated-file hashes.
It refuses to overwrite a local edit. Update product instructions in
Jetlink first; maintain wiki-specific link and release-channel adaptations
in the import script.

## website brand

The website's site.css supplies the shared title-bar rules and the font
files. The brand importer adapts selectors and sizes for the wiki theme.
It records the source revision, so future changes can be reviewed together.
The wiki keeps its own reading layout and navigation.

## existing generated references

Release history, steering charts, and chart data carry
their own generation comments. Preserve those files unless updating the
relevant generator. The hand-written tail of release history can be edited
where its marker permits it.

## editor workflow

Commands, file ownership, link checking, and preview requirements are in
CONTRIBUTING.md in the wiki repository. Imports are reviewed and committed
with their manifests; they do not silently track the latest upstream files.
