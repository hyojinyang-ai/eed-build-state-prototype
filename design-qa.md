# Version 5 Design QA

## Evidence

- Figma component references:
  - Warning message: https://www.figma.com/design/NBIxN2orkOXwn7m3GszZMa/FictionUI?node-id=5605-1323
  - Information message: https://www.figma.com/design/NBIxN2orkOXwn7m3GszZMa/FictionUI?node-id=5605-1333
  - Error message: https://www.figma.com/design/NBIxN2orkOXwn7m3GszZMa/FictionUI?node-id=5605-1343
  - Desktop error dialog: https://www.figma.com/design/NBIxN2orkOXwn7m3GszZMa/FictionUI?node-id=1143-3299
- Figma captures:
  - `qa/figma-warning-5605-1323.png`
  - `qa/figma-info-5605-1333.png`
  - `qa/figma-error-5605-1343.png`
- Browser-rendered implementation captures:
  - `qa/implementation-warning.png`
  - `qa/implementation-info.png`
  - `qa/implementation-error.png`
  - `qa/v5-fallback-copy.png`
  - `qa/v5-build-ready-2x.png`
  - `qa/v5-stale-details-2x.png`
  - `qa/v5-unavailable-connecting-2x.png`
  - `qa/v5-unavailable-dialog-2x.png`
- Combined Figma-to-implementation comparison: `qa/figma-message-comparison.png`
- Implementation: `build-state-prototype-v5.html`
- Code Connect mapping: `warning.figma.ts`, connecting the warning component to `.canvas-fallback-info`.
- Viewport tested at 1440 × 1000 px, including device scale factor 2 captures.

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- The fallback warning is inside the viewport. The header contains only the compact `Fallback Preview` status next to the cloud control.
- Warning, information, and error messages now follow the referenced Figma system: near-black surface, semantic 1 px border, 4 px radius, compact icon, 12/16 px Nunito Sans copy, and a neutral secondary action where applicable.
- Existing exported Figma SVGs are reused for warning, information, cloud, and unavailable-state imagery. No placeholder graphics were introduced.
- The unavailable dialog now uses the exact Figma-provided window, help, close, and 48 px error-emblem assets from node 1143:3299.
- Meaning never depends on color alone: every state includes an icon and explicit status text.
- The prototype keeps its scenario-specific product copy instead of the generic example text shown in the component references.

## State Verification

- Current game build: no runtime-status text is shown; the cloud details control remains available.
- Fallback preview: header reads `Fallback Preview`; the viewport warning explains that game-specific visuals may differ, these differences are not content errors, and no action is needed.
- Build ready: the viewport information message shows `Build ready · Switch required`, the automatic-build explanation, context-preservation guidance, and `Save and switch`. The action saves unsaved work and begins switching directly; the redundant save-confirmation dialog has been removed.
- Stale: header shows `Stale` and `20 commits behind`; the details popup contains `Does not include latest changes`, its reliability guidance, and `Request new build`.
- Unavailable: the viewport first shows `Connecting`, then the recovery dialog with `Retry fallback engine`.
- Unavailable-dialog geometry was verified at the Figma reference size of 519 × 260 px, with the 30 px white title bar, `#403e40` body, structured error and resolution copy, and compact right-aligned actions.
- Browser console/page errors: none.

## Intentional Differences

- The implementation messages are taller and wider than the Figma component examples because the approved state guidance uses multiple lines and actions.
- The unavailable state retains the larger version 4 recovery dialog and title treatment while adopting the Figma error border, surface, typography, and neutral-button styling.
- The prototype scenario control bar remains outside the product interface for research and demonstration use.

## Comparison History

- Pass 1: verified state transitions and exact requested copy in the browser.
- Pass 2: compared normalized 2× captures against the version 4 reference crops.
- Pass 3: compared warning, information, and error implementations directly against Figma nodes 5605:1323, 5605:1333, and 5605:1343; no significant visual mismatch remained.
- Pass 4: implemented and visually verified the unavailable recovery dialog against Figma node 1143:3299; computed size, surfaces, asset loading, interaction copy, and browser error log passed.

final result: passed
