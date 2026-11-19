# Copilot instructions for the EED build-state prototype

## Project purpose

This repository contains interactive UX prototypes for Fiction Factory Editor build-state and runtime communication. The prototype helps content creators understand whether the viewport is using a game build, whether a usable game build exists, what is happening during a Bazel request, and how to recover from failures without blocking editing.

## Authoritative implementation

- `build-state-prototype-v6.html` is the current prototype and the default file to modify.
- Treat earlier files (`build-state-prototype.html` through `build-state-prototype-v5.html`) as historical references. Do not update them unless the task explicitly asks for an older version.
- `build-state-unmoderated-test.html` and its guide are separate research artifacts. Do not change them as a side effect of Version 6 work.
- The README and `CLAUDE.md` contain useful historical context but may describe Version 5 or earlier behavior. When they conflict with Version 6, the current Version 6 implementation and the rules below take precedence.

## Technical architecture

- This is a static prototype with no framework, package manager, build step, or application backend.
- Markup, styles, and JavaScript live in the HTML files.
- Keep the prototype runnable from a simple static web server and GitHub Pages.
- Reuse assets from `assets/play-button-plugin/` and `assets/figma-icons/`. Do not redraw or replace supplied icons unless the task explicitly requests it.
- Preserve relative asset URLs so local hosting and GitHub Pages both work.
- Use the existing FictionUI tokens, typography, spacing, borders, and dark-theme patterns before introducing new values.

## Version 6 state model

Preserve these scenarios and their interactions:

| Scenario | Internal state | User-facing behavior |
| --- | ---: | --- |
| Ready · Bazel | `0` | Green **Ready** status. The blue cloud action icon requests a new Bazel build. The adjacent disclosure arrow opens Bazel details. |
| Ready · Local | `7` | Green **Ready** status. The gray disconnected-cloud action icon requests a new Bazel build. The adjacent disclosure arrow opens Local details. |
| Fallback scenario | `1` | User-facing status is **Game build not available** with the empty-circle status icon. Do not expose “fallback engine” or “fallback runtime” in user-facing status copy. Use `playbutton-game-build-unavailable.svg` for its action icon. The details panel offers **Request Bazel build**. |
| Build with Bazel — success | `10`, then `11`/`9` | Show **Requesting**, a progress bar, and percentage. When ready, switch automatically while showing **Switching to game build** and reassuring the user that changes are saved. |
| Build with Bazel — fail | `10`, then `3` | Show the same requesting progress first. End at **Game build Failed** while keeping the previous successful build active. Offer **Request Bazel build**. |
| Game build crash | `4` | Show the connection attempt, then return to the normal viewport and automatically open the crash details flyout instead of a centered dialog. |
| Bazel build could not launch | `13` | Show **Trying to launch...** in the viewport for 2.6 seconds, then return to the normal viewport and automatically open the crash details flyout instead of a centered dialog. The toolbar shows **Game build Failed** and its refresh action. |
| Default Build fallback | `14` | Show **Game build not available** with the empty-circle status icon and disconnected-cloud icon. Details use the same fallback copy and ErrorFlyout layout as state `1`. |
| Bazel build crash (mid-session) | `15` | Show the supplied yellow warning icon with **Game build crash** status and a blue connected cloud. The details arrow opens the crash details flyout. |

For states `1`, `3`, `4`, `13`, `14`, and `15`, the details arrow opens the Figma ErrorFlyout design. States `1` and `14` use **Game build not available**, omit Next steps, and offer **select local build** and **Request build**. State `3` uses **Build update failed** and explains that the viewport has not changed; state `13` uses **Game build failed**, while states `4` and `15` use **Game build crashed**. The failure next-step links open the log widget, focus its copy action, open the support channel, or open a local-file picker. The fallback **select local build** button opens the same picker; selecting a file simulates switching to a local build.

Other internal states support transitions and historical scenarios. Do not remove or renumber states unless the task explicitly requires a state-machine change.

## Current UX decisions

- Use the exact status copy **Game build not available**. Do not revert to “Game build not ready.”
- Do not expose “fallback” as a user-facing runtime concept. “Fallback” may remain in prototype controls or internal code used by researchers.
- Editing remains available during requests and recoverable failures whenever a usable viewport exists.
- Runtime switching must preserve the open scene/document, selection, viewport context, and edits.
- Changes are auto-saved; do not add a blocking save-confirmation dialog.
- A successful request switches automatically. Do not add a manual “Save and switch” action.
- During requesting and switching, hide redundant source/cloud controls and keep the progress/switching communication clear. While requesting, disable the details arrow and keep the details panel closed; re-enable it after requesting.
- A failed Bazel update must not change the viewport if a previous good build exists.
- The Local “Use Bazel build” toggle must keep the details panel open. When no Bazel build exists, show **There is no available build with Bazel.** and offer **Request Bazel build**.
- Keep the viewport free of persistent warning boxes for these build states.
- Use icon + text + status, never color alone.
- Use plain language. Avoid implementation terms such as “subprocess.”
- Crash/failure recovery should prioritize one clear recovery action, with logs available through progressive disclosure.
- Details popovers close when the user clicks outside. Do not unexpectedly close them when an internal toggle is used.

## Visual rules

- Match the Fiction Factory dark UI and existing Version 6 component styling.
- Keep the Candy Crush Saga icon and build name after the scene selector and Back/Forward arrows whenever the viewport toolbar is visible, across all scenarios.
- Editor UI uses Nunito Sans; the prototype control bar uses Inter.
- Keep status controls fixed-width or spatially stable so label changes do not nudge neighboring toolbar controls.
- Yellow represents warning/not-available states. Red is reserved for crash/error conditions that prevent reliable previewing.
- Ready states use green status indicators.
- Requesting/switching states use visible progress or motion in addition to text.
- Preserve responsive behavior at narrow widths and avoid covering viewport or Timeline controls.
- Preserve accessible names, keyboard-operable buttons, focus behavior, and `aria-live` announcements where present.

## Important Version 6 assets

- Ready · Bazel action: `assets/play-button-plugin/playbutton-ready-bazel.svg`
- Ready · Local action: `assets/play-button-plugin/playbutton-ready-local.svg`
- Game build not available action: `assets/play-button-plugin/playbutton-game-build-unavailable.svg`
- Requesting/switching status: `assets/play-button-plugin/playbutton-building.png`
- Ready status: `assets/play-button-plugin/playbutton-build-ready.png`
- Fallback and default-build fallback status: `assets/figma-icons/v6-build-fallback-status.svg`
- Bazel error and game-build crash status (states `3`, `4`, `13`, `15`), including details headers: `assets/figma-icons/v6-bazel-error-status.svg`
- Disclosure arrow: `assets/play-button-plugin/playbutton-arrow-down.png`

## Implementation guidance

- Make the smallest focused change that satisfies the request.
- Preserve all unrelated scenarios, controls, copy, resizable panels, and prototype instrumentation.
- Search for every occurrence of changed user-facing copy so toolbar, detail panel, overlays, and accessibility labels stay consistent.
- When adding an SVG supplied by a designer, preserve its geometry and colors, give internal IDs unique descriptive names, and store it as an asset rather than duplicating large inline SVG strings.
- Avoid adding dependencies or converting the prototype to a framework unless explicitly requested.
- Do not commit, push, publish, transfer the repository, change visibility, or alter GitHub Pages settings unless explicitly requested.

## Local verification

Run the prototype through a local HTTP server rather than relying only on `file://`:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:4173/build-state-prototype-v6.html
```

Specific states can be loaded with the `state` query parameter, for example:

```text
?state=0   Ready · Bazel
?state=7   Ready · Local
?state=1   Game build not available
?state=4   Game build Crash
```

Before declaring work complete:

1. Check HTML/JavaScript for syntax errors and missing assets.
2. Exercise every scenario affected by the change, including opening and closing its details panel.
3. Verify request progress, success, failure, retry, automatic switching, and Local-toggle behavior when relevant.
4. Check a narrow viewport if layout or messaging changed.
5. Confirm that existing unrelated scenarios still work.
6. Run `git diff --check` and review the final diff.

## Publishing

- GitHub repository: `hyojinyang-ai/eed-build-state-prototype`
- GitHub Pages source: `main`
- Live Version 6 page: `https://hyojinyang-ai.github.io/eed-build-state-prototype/build-state-prototype-v6.html`
- There is no build step. When the user explicitly asks to publish, commit the verified changes and push to `main`, then wait for the GitHub Pages deployment to succeed and verify the live page with a cache-busting query parameter.
