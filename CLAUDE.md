# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive HTML prototype for the Fiction Factory (King game editor) viewport build-state communication system. Part of the EED Phase 2 initiative — helping creators understand whether they're looking at the real game build or a fallback engine app.

## Architecture

This is a **static HTML prototype** — no build tools, no dependencies, no package.json. Just open the HTML files in a browser. All CSS, JS, and markup are inline in each HTML file.

### File Structure

- `build-state-prototype-v5.html` — **Current prototype.** Runtime-reliability prototype with automatic fallback build preparation, direct save-and-switch behavior, stale-build recovery, Figma-aligned messaging, and resizable Editor panels.
- `build-state-prototype-v4.html` — V4 reference. Full Fiction Factory editor layout with 3 concepts (A/C/D) and 5 build states.
- `build-state-prototype-v3.html` — V3 reference. 5 concepts across 5 states.
- `build-state-prototype-v2.html` — V2 reference. Two concepts (in-viewport overlay vs top-bar chip).
- `build-state-prototype.html` — V1 reference. Simple viewport-only mockup.
- `design-tokens.css` — Shared FictionUI design tokens extracted from Figma. Import or copy into new prototypes.
- `component-patterns.md` — Reusable component specs: chips, dots, buttons, dropdowns, interactions.
- `reference/` — Fiction Factory editor screenshots and Figma design exports
- `screenshots/` — V1/V2 state captures
- `screenshots-v4-all-states-2026-08-28/` — V4 state captures across all concepts
- `assets/figma-icons/` — 211 PNGs exported from FictionUI Figma library with manifest.json

## Design System

### Source
FictionUI Figma file: `https://www.figma.com/design/NBIxN2orkOXwn7m3GszZMa/FictionUI?node-id=70-3&m=dev`

### Fonts
- **Inter** (400-700) — prototype control bar UI
- **Nunito Sans** (400-700) — Fiction Factory editor UI

Import via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Design Tokens
All tokens are defined in `design-tokens.css` and documented in `component-patterns.md`. Key token groups:

- **Neutrals**: `--neutral0` (#e9f1f5), `--neutral400` (#484b50), `--neutral500` (#37383a)
- **Semantic**: `--warning` (#f1b41b), `--success` (#17c281), `--processing` (#309ae8)
- **Surfaces**: `--panel-bg` (#303030), `--footer-bg` (#353535), `--viewport-bg` (#4c4c4c)
- **Status dots**: green (#71efb2), yellow (--warning), red (#e05252)

### Design Principles
- Severity is always yellow, never red (except Crash state which uses red)
- Build-ready = silent normal state, no attention needed
- Non-blocking — editor always works regardless of build state
- Dark theme only (matches Fiction Factory editor)

## Build Status Concepts (3)

| Concept | Placement | Description |
|---------|-----------|-------------|
| **A** | Header build widget | Status dot + label + cloud button + chevron in header bar, next to transport controls (play/stop/pause) |
| **C** | Footer | Status dot + label + cloud button + chevron in sticky footer bar |
| **D** | Top-right corner | Replaces header-right icons with status dot + label + cloud button + chevron |

## Build States (5)

| # | State | Dot | Label | Behavior |
|---|-------|-----|-------|----------|
| 0 | **Ready** | green | Ready | Normal state, play button enabled |
| 1 | **Fallback** | yellow | Fallback mode | Play disabled, canvas overlay warning shown |
| 2 | **Requesting Build** | spinner | Requesting build... | Play disabled, auto-transitions to Ready after 3.5s |
| 3 | **Out of Sync** | green dot + chip | Ready + out of synch | Shows green "Ready" alongside dark chip with rotating sync icon |
| 4 | **Crash** | red | Build crashed | Play disabled |

### Interaction Rules
- **Play button**: Disabled (opacity 0.3, pointer-events none) for all non-Ready states (index > 0)
- **Canvas overlay**: Yellow info bar "Rendering may differ from the live game build" shown in all fallback states
- **Cloud button**: Blue pill (#1d7bbf) with wifi/cloud SVG icon, triggers details dropdown
- **Chevron**: Small down-arrow next to cloud button, also triggers details dropdown
- **Details dropdown**: Shows branch info, commit hashes, build URL, toggle, "Request new build" button, version
- **Dropdown positioning**: Opens downward by default; opens upward if trigger is near bottom of screen (rect.bottom > window.innerHeight - 200)

### Concept-Specific Visibility
- **Concept A**: Shows header build widget (status + cloud + chevron), hides footer status
- **Concept C**: Hides header build widget status/cloud/chevron, shows footer build status with cloud + chevron
- **Concept D**: Hides header build widget status/cloud/chevron AND header-right icons, shows header-right build status with cloud + chevron

## Component Patterns

See `component-patterns.md` for detailed specs on:
- Status dots (3 sizes, 4 colors + spinner)
- Dark chips (standard + out-of-sync variant)
- Cloud button (blue pill)
- Details dropdown panel
- Transport controls
- Footer build status bar

## Icons

Icons are exported from the FictionUI Figma library:
- `assets/figma-icons/` — 211 PNGs with `manifest.json` mapping component names to Figma node IDs
- V4 embeds 49 icons as base64 data URIs inline (no external file dependencies)

## Deployment

Hosted via GitHub Pages: `https://hyojinyangs.github.io/eed-build-state-prototype/`

Push to `main` to deploy — no build step required.

## Getting Started (For Team Developers)

### Prerequisites

1. **Install Claude Code** — download from [claude.ai/code](https://claude.ai/code) (CLI, desktop app, or IDE extension for VS Code / JetBrains)
2. **Clone this repo** — `git clone https://github.com/hyojinyangs/eed-build-state-prototype.git`
3. **Open the repo in Claude Code** — `cd eed-build-state-prototype && claude` (CLI) or open the folder in the desktop/IDE app

That's it. Claude Code automatically reads this `CLAUDE.md` file and understands the design system, build states, component patterns, and interaction rules.

### How to Build a Prototype

This project uses a **conversational prototyping workflow** — you describe what you want in natural language and Claude builds it as a single inline HTML file.

**Example prompts:**

- "Create a new build-state prototype with the status in a floating widget at the bottom-right corner"
- "Add a new state called 'Updating' with a blue progress bar and spinner"
- "Move the build status into the viewport toolbar, next to the scene dropdown"
- "Make the details dropdown show a diff view comparing local vs remote commits"
- "Add a concept E where the build status replaces the tab bar title"

**Tips for good results:**

- Reference screenshots or Figma exports when describing layouts — paste or drag images directly into Claude Code
- Say "use the existing design tokens" or "match the V4 style" to keep consistency
- Say "open the prototype" to preview in browser immediately
- Iterate in conversation: "move it 10px left", "make the text smaller", "add a hover state"
- All prototypes are self-contained HTML files — no build tools, no dependencies

### Key files Claude uses automatically:

| File | What Claude reads from it |
|------|---------------------------|
| `CLAUDE.md` | Project context, concepts, states, interaction rules |
| `design-tokens.css` | FictionUI color, spacing, typography values |
| `component-patterns.md` | HTML/CSS/JS snippets for dots, chips, buttons, dropdowns |
| `assets/figma-icons/manifest.json` | Icon names mapped to Figma component IDs |
| `build-state-prototype-v4.html` | Reference implementation to match existing patterns |

### Creating New Prototypes (Manual)

If you prefer to build without Claude Code:

1. Copy `build-state-prototype-v4.html` as a starting point, or start fresh
2. Reference `design-tokens.css` for all color/spacing/typography values
3. Reference `component-patterns.md` for component HTML/CSS patterns
4. Use icons from `assets/figma-icons/` or embed as base64
5. Keep everything inline (CSS + JS + HTML in one file) for easy sharing
6. Test all 5 states across whichever concepts you're exploring
