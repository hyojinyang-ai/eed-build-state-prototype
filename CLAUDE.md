# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive HTML prototype for the Fiction Factory (King game editor) viewport build-state communication system. Part of the EED Phase 2 initiative — helping creators understand whether they're looking at the real game build or a fallback engine app.

## Architecture

This is a **static HTML prototype** — no build tools, no dependencies, no package.json. Just open the HTML files in a browser.

- `build-state-prototype-v2.html` — **Current prototype.** Full Fiction Factory editor layout with two switchable concepts (in-viewport overlay vs top-bar chip) and 5 build states. Contains all CSS, JS, and markup inline.
- `build-state-prototype.html` — V1 reference. Simpler viewport-only mockup.
- `screenshots/` — State captures: `c1-*.png` (Concept 1) and `c2-*.png` (Concept 2)
- `reference/` — Fiction Factory editor screenshots and Figma design exports

## Design Tokens

All styling uses Fiction Factory design system tokens defined as CSS custom properties in `:root`. Key values:
- Warning: `#f1b41b` (Warning400), Success: `#17c281` (Success400)
- Chip: `#37383a` bg / `#484b50` border / `3px` corner radius
- Typography: Nunito (Google Fonts import)
- Severity is always yellow, never red

## Build States (5)

1. **Disconnected** — muted, no active build connection
2. **Downloading** — amber chip + animated progress overlay
3. **No build on branch** — amber chip only
4. **Build failed + Retry** — amber chip with action
5. **Build ready + Load** — green chip with action, auto-loads after 3.5s

## Deployment

Hosted via GitHub Pages: `https://hyojinyangs.github.io/eed-build-state-prototype/build-state-prototype-v2.html`

Push to `main` to deploy — no build step required.
