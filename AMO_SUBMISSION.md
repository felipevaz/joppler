# Joppler AMO Submission Draft

## Add-on metadata

- Name: `Joppler`
- Version: `1.2.0`
- Summary: `Clip web pages into Joplin-friendly Markdown with one tap.`
- License: `MIT` (inherited from the upstream Markdown Clipper codebase)
- Category: `Productivity`
- Firefox for Android compatibility: `Yes`
- Firefox desktop compatibility: `Yes`
- Data collection: `No data collection`

## Description

Joppler is a mobile-first fork of Markdown Clipper that clips web pages into Joplin-friendly Markdown with fewer taps.

It defaults to Defuddle, formats the clipped header so Joplin can use the first line as the note title, and offers a native share-sheet path on Android with clipboard copy as fallback.

## Permissions

- `activeTab`
- `storage`
- `clipboardWrite`

## Data collection declaration

Joppler does not collect or transmit user data.

The manifest explicitly declares `data_collection_permissions.required = ["none"]`.

## Notes for review

- No remote code.
- No external service dependency.
- Uses the existing open-source Markdown conversion pipeline from the upstream add-on.
- The Android path is optimized for one-tap clipping and sharing.
- The package no longer contains stray `.DS_Store` files.
- The visible result page no longer uses dynamic `innerHTML`.

## Suggested store text

### Short description

Clip web pages into Joplin-friendly Markdown with one tap.

### Full description

Joppler is a mobile-first web clipper for Firefox that turns web pages into Markdown that fits Joplin better.

It starts each clip with a title line Joplin can use immediately, keeps the source metadata in the body instead of YAML frontmatter, and gives you a native share-sheet path on Android so you can send the clip onward with fewer taps.

The result is designed to reduce the number of taps between reading a page and getting it into Joplin.

## Suggested screenshots

1. Clip result screen showing `Share to Joplin` and `Copy to clipboard`.
2. Settings screen with the mobile-first header options.
3. Example clipped page with the Joplin-style title line.

## Source package

- Source folder: `/Users/felipevaz/Documents/joppler/joppler`
- Packaged XPI: `/Users/felipevaz/Documents/joppler/joppler-1.2.0.xpi`
- GitHub repo: `https://github.com/felipevaz/joppler`

## AMO fields to paste

- Name: `Joppler`
- Summary: `Clip web pages into Joplin-friendly Markdown with one tap.`
- Description: Use the full description above.
- Source code: `https://github.com/felipevaz/joppler`
- License: `MIT`
- Category: `Productivity`
- Supported platforms: `Firefox for Android`, `Firefox desktop`
