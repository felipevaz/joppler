# Joppler AMO Submission Draft

## Add-on metadata

- Name: `Joppler`
- Version: `1.2.0`
- Summary: `Clip web pages into Joplin-friendly Markdown with one tap.`
- License: `MIT` (inherited from the upstream Markdown Clipper codebase)
- Category: `Productivity`
- Firefox for Android compatibility: `Yes`
- Firefox desktop compatibility: `Yes`

## Description

Joppler is a mobile-first fork of Markdown Clipper (https://addons.mozilla.org/en-US/android/addon/markdown-web-clipper/) that clips web pages into Joplin-friendly Markdown with fewer taps.

It defaults to Defuddle, formats the clipped header so Joplin can use the first line as the note title, and offers a native share-sheet path on Android with clipboard copy as fallback.

## Permissions

- `activeTab`
- `storage`
- `clipboardWrite`

## Notes for review

- No remote code.
- No external service dependency.
- Uses the existing open-source Markdown conversion pipeline from the upstream add-on.
- The Android path is optimized for one-tap clipping and sharing.

## Suggested store text

### Short description

Clip web pages into Joplin-friendly Markdown with one tap.

### Full description

Joppler is a mobile-first web clipper for Firefox that turns pages into Markdown that fits Joplin better.

It starts each clip with a title line Joplin can use immediately, keeps the source metadata in the body instead of YAML frontmatter, and gives you a native share-sheet path on Android so you can send the clip onward with fewer taps.

## Suggested screenshots

1. Clip result screen showing `Share to Joplin` and `Copy to clipboard`.
2. Settings screen with the mobile-first header options.
3. Example clipped page with the Joplin-style title line.

## Source package

- Source folder: `/Users/felipevaz/Documents/joppler/joppler`
- Packaged XPI: `/Users/felipevaz/Documents/joppler/joppler-1.2.0.xpi`

