# EED Phase 2 — Build-State Indicator Prototype

Interactive HTML prototype for the Fiction Factory editor's viewport build-state communication system.

## Problem

The scene-editor viewport can render two realities — the **real game build** (WYSIWYG) or the **fallback engine app** (generic). Creators need to know which one they're looking at, why, and whether anything is being done about it — without blocking work.

## Prototypes

### [`build-state-prototype-v5.html`](./build-state-prototype-v5.html) — current

The latest interactive prototype incorporates the usability-study findings:

- persistent runtime and reliability communication above the viewport
- automatic fallback-build preparation and explicit build-ready switching
- manual rebuild requests for stale game builds
- context-preserving save-and-switch behavior
- Figma-aligned warning, information, and fallback-engine recovery states
- resizable Editor panels and reusable exported FictionUI assets

**[Open the live Version 5 prototype](https://hyojinyang-ai.github.io/eed-build-state-prototype/build-state-prototype-v5.html)**

### `build-state-unmoderated-test.html`

Self-guided remote comprehension study built around the current V4 prototype. It:

- hides the prototype controls and runs the unavailable-build scenario first, followed by two randomized build-state scenarios
- presents each specific follow-up question on its own screen
- presents neutral tasks before each Editor state
- collects unaided understanding before showing closed response choices
- records exposure time and meaningful prototype clicks
- submits participant responses to the configured Google Drive receiver and downloads a backup JSON file when submission cannot be confirmed

Open it through the GitHub Pages URL or a local web server. Participants submit responses from the final screen. If automatic submission cannot be confirmed, the study downloads a backup JSON file that they can return through your approved research channel.

See `UNMODERATED_TEST_GUIDE.md` for recruitment, sharing, pass criteria, and evidence guidance.

### `build-state-prototype-v2.html`

Full Fiction Factory editor layout with two concept options:

- **Concept 1 — In-viewport overlay**: Build-state chip floats on the canvas alongside Default/Custom/2D controls
- **Concept 2 — Top-bar status chip**: Same chip component placed in the Viewport tab bar

Both concepts use the same chip component:
- Dark pill (Neutral500 `#37383a`) with border (Neutral400 `#484b50`)
- Colored dot: Warning `#f1b41b` / Success `#17c281` / Muted `#555`
- 5 states: Disconnected, Downloading, No build on branch, Build failed + Retry, Build ready + Load
- Auto-load: Build Ready state auto-transitions after 3.5s

### `build-state-prototype.html` (v1, reference)

Simple viewport-only mockup with state switcher.

## Design Tokens (from Figma DS)

| Token | Value | DS Name |
|-------|-------|---------|
| Success | `#17c281` | Functional/Success/Success400 |
| Warning | `#f1b41b` | Functional/Warning/Warning400 |
| Chip bg | `#37383a` | Neutrals/Neutral500 |
| Chip border | `#484b50` | Neutrals/Neutral400 |
| Corner radius | `3px` | cornerRadiusS |

## Viewport Placement Guidelines

Priority order for status placement:
1. **In-viewport overlay** — spatially tied to canvas (Concept 1)
2. **Top-bar chip** — persistent session state (Concept 2)
3. **App-level status bar** — global/operational

Footer inside viewport is NOT recommended.

## Key Decisions

- Yellow, never red
- Build-ready = silent normal state
- Non-blocking always
- Editor keeps working build-or-no-build

## Screenshots

See `screenshots/` folder for all 10 state captures (5 per concept).

## Reference

See `reference/` folder for Fiction Factory editor screenshots and Figma designs.
