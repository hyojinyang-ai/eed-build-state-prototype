# Fiction Factory Editor Design Principles

_Synthesized from the local `fictionfactory-develop` implementation repository and documentation. Checked September 15, 2026._

## Evidence status

The repository does not contain a single, explicitly approved set of Fiction Factory Editor design principles. The principles below are inferred from implemented workflows, product documentation, release notes, and shared visual tokens. They should be treated as evidence-backed working principles, not confirmed organization-wide policy.

## Principles

### 1. Provide immediate visual feedback

Changes should be visible as users make them. Selection and editing context should remain synchronized across the viewport, Hierarchy, Inspector, and related tools.

**Example application (proposal):** When a content creator selects the King Logo in the viewport, the same entity is immediately highlighted in the Hierarchy and its properties appear in the Inspector. Moving it updates the viewport and property values together, so the user never has to wonder which object is being edited.

**Evidence:**

- The Editor is described as supporting “instant, visual feedback.”
- Selecting and manipulating an entity updates the corresponding Hierarchy and Inspector context.

**Sources:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/editor/README.md`
- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/scene-editing-widget.md`

### 2. Keep users productive during background work

Long-running operations such as requesting, preparing, or downloading a build should be non-blocking whenever it is safe. Preserve a usable runtime or editing path while newer resources are obtained.

**Example application (proposal):** While the Editor requests and prepares a new game build, it continues displaying the fallback engine or previously available build. The user can keep editing the open scene, and a compact status communicates progress without blocking the viewport.

**Evidence:**

- When another game build is requested, users can continue running the previously enabled build.
- Remotely stored builds can be reused to reduce waiting time.

**Source:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/play-button-adoption.md`

### 3. Make preview fidelity understandable

Users should be able to tell what the viewport represents and whether it is reliable for visual validation. Controls that change the viewing context—such as runtime, camera, resolution, or platform—should remain visible and understandable.

**Example application (proposal):** The viewport header displays `Ready · Remote` when a remote game build is active and `Fallback · Game visuals may differ` when the fallback engine is active. The fallback message explains that missing or different game-specific visuals are preview limitations rather than content errors.

**Evidence:**

- Game cameras preview views defined by the game project.
- Custom device resolutions support validation across screen sizes and aspect ratios.

**Sources:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/scene-editing-widget.md`
- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/viewport-overlay.md`

### 4. Use familiar creative-tool conventions

Prefer established interaction patterns from graphics editors and 3D tools. Familiar selection, transformation, camera, shortcut, and panel behavior reduces learning effort and prevents surprises.

**Example application (proposal):** Users pan, zoom, select, and transform objects using the same mouse and keyboard conventions they already know from common creative tools. Floating dialogs can be moved by dragging their title bar, while buttons, links, and switches retain standard interaction behavior.

**Evidence:**

- The Scene Editor’s object manipulation follows common graphics-editor behavior.
- Its 3D manipulation model follows conventions used by tools such as Unity.

**Source:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/scene-editing-widget.md`

### 5. Show problems progressively and contextually

Start with a visible, concise signal near the affected workflow. Provide detailed descriptions, timestamps, logs, and recovery actions on demand. Error messages should describe the relevant context and next step.

**Example application (proposal):** If the fallback subprocess cannot start, the viewport first shows a concise `Game build unavailable` state. The centered error dialog explains what failed and offers `Restart the subprocess`; after another failure, users can open the Error Collector, save diagnostic logs, and locate the saved file for support.

**Evidence:**

- Errors and warnings appear first in the Editor status bar.
- Users can open a detailed list with timestamps and descriptions.
- Interactive Preview guidance requires descriptive, context-specific error messages and diagnostic logging.

**Sources:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/log-widget.md`
- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/interactive-preview/live-update-server-guide.md`

### 6. Support different users and working environments

Allow users to adapt the Editor to their workflow, platform, viewing needs, and accessibility requirements without losing consistency across the product.

**Example application (proposal):** A technical artist can resize the viewport and surrounding panels to prioritize scene work, select a custom device resolution, and use a larger interface font. The same build status and recovery actions remain available regardless of the resulting layout.

**Evidence:**

- Editor tabs and layouts can be customized.
- Platform-specific interaction conventions are documented.
- The Editor includes a larger-font accessibility setting.

**Sources:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/customise-editor-ui.md`
- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/working-in-the-editor/fiction-editor-interface/scene-editing-widget.md`
- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/user-documentation/src/docs/gfmd/release-notes/fiction-editor/fiction-editor-20.md`

### 7. Maintain visual and behavioral consistency

Use shared visual tokens and reusable interaction patterns so state, hierarchy, and actions remain recognizable across Editor surfaces.

**Example application (proposal):** The same cloud icon, state label, color meaning, disclosure arrow, and Build Details component are used whether build status appears in the header or footer. `Ready`, `Out of sync`, `Fallback`, and `Unavailable` should not change visual meaning between concepts or pages.

**Evidence:**

- The implementation defines a shared neutral palette and primary blue.
- Editor-specific coding guidelines encourage consistent Qt patterns and shared behavior.

**Sources:**

- `/Users/hyojin.yang/Downloads/fictionfactory-develop/editor/source/themes/qtsass/ds_colors.scss`
- `/Users/hyojin.yang/Downloads/fictionfactory-develop/docs/EditorCodingGuidelines.md`

## Application to build-state experiences

Build-state experiences should:

- Keep editing available whenever it is safe.
- Clearly identify the active runtime and preview reliability.
- Preserve the user’s scene, selection, viewport, and panel context during runtime changes.
- Communicate progress without turning background work into a blocking workflow.
- Warn before a disruptive runtime switch and let the user control its timing.
- Present errors near the affected experience, with a clear recovery action.
- Keep logs and implementation details available through progressive disclosure.
- Remove temporary messages after the state has resolved while retaining an accurate persistent status.

## Validation note

Before adopting these as official Fiction Factory principles, confirm them with the owning product and design teams and compare them with current research, approved decision records, and the latest design-system guidance.
