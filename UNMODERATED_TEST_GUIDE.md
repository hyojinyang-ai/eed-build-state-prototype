# Unmoderated build-state comprehension test

## What is implemented

`build-state-unmoderated-test.html` runs a self-guided study around the current V4 prototype. This is prototype behavior, not evidence that the production Editor preserves context or behaves identically.

The study:

- hides the prototype concept and state controls
- tests Concept A in three fully randomized scenarios: Game build unavailable, Fallback, and Out of sync
- starts the Game build unavailable scenario with a visible Connecting state, then shows the failure dialog after 2.6 seconds
- requires at least seven seconds of observation per scenario
- asks what stood out before showing any answer choices
- uses neutral study framing so participants are not told which interface details to inspect
- captures the participant's team, role, and Editor experience
- presents response choices as three-column, Nunito Sans button cards that reflow on narrower screens
- runs the latest fallback status sequence after the participant opens that scenario
- uses the participant name in the simulated Downloads path and closes that file browser when the backdrop is clicked
- captures state comprehension, one or more intended next actions, per-scenario intrusiveness, a preferred alternative when participants rate the message 4–5, timing, and meaningful prototype clicks
- presents each specific follow-up question on its own screen
- marks all scored questions as required and keeps the spontaneous-notice response and final concerns optional
- includes a final fallback mental-model check and runtime-switch expectation question
- saves progress locally after every scenario
- submits the scored response to a configured Google Drive endpoint, confirms that the file was stored, and downloads a backup JSON response if submission cannot be confirmed

## Share the study

After publishing the files to GitHub Pages, share:

`https://hyojinyangs.github.io/eed-build-state-prototype/build-state-unmoderated-test.html`

Ask each participant to enter their name. Because the exported result contains that name, collect and store the files through an approved research channel with access limited to the study team. Ask participants to use a desktop or laptop and reserve 4–6 minutes.

Configure the Google Drive receiver using `GOOGLE_DRIVE_SUBMISSION_SETUP.md` before sharing the study. When the endpoint is connected, participants select **Submit responses** and the completion screen confirms when the response has been stored. Downloading is optional after a confirmed submission. If the endpoint is missing, blocked, or cannot be confirmed, the study downloads a backup JSON response and tells the participant how to return it manually.

## Collect the responses

1. Create one access-controlled Google Drive folder and connect it using `GOOGLE_DRIVE_SUBMISSION_SETUP.md`.
2. Verify the endpoint with a complete pilot response before inviting participants.
3. After the round, confirm that the folder contains one JSON file per completed participant. The random response ID prevents duplicate filenames even when participants have the same name.
4. Collect manually downloaded backup files through the approved research channel if any participant reports an unconfirmed submission.
5. Attach the collected JSON files to a Codex task to synthesize spontaneous notice, state comprehension, intended action, intrusiveness, and runtime-switch expectations.

Automatic collection requires the configured Google Apps Script endpoint. Because participant names are included, keep the Drive folder restricted to the study team and follow the agreed retention policy.

## Before inviting participants

1. Complete one pilot yourself using the published URL.
2. Confirm that the prototype controls are hidden.
3. If Game build unavailable appears in the randomized order, confirm that it shows Connecting before the unavailable-state failure message.
4. Confirm that **Submit responses** creates a JSON file in the intended Drive folder.
5. Temporarily disable the endpoint and confirm that the backup download path works.
6. Send the study to two internal pilot participants before the main round.

## Suggested sample

Use 10–12 current Editor users for a directional internal pilot. Include content creators and game designers, plus a smaller number of technical artists or developers. Record role and experience when interpreting disagreements. For a quantitative unmoderated round, recruit at least 20 participants and avoid drawing subgroup conclusions unless each subgroup has enough responses.

## Pass criteria

- 80% correctly identify the runtime or build state.
- 80% choose the intended next action.
- 80% understand that editing can continue during fallback and build acquisition.
- No more than 20% treat fallback differences as content errors.
- No more than one participant expects an unexpected loss of work.
- Median intrusiveness for the non-blocking Fallback and Out of sync communication is 2 out of 5 or lower.

Treat the unprompted “What stood out?” response and recorded clicks as the primary evidence of spontaneous notice. Code whether the response mentions the build/runtime condition, the viewport’s limitations, or the supporting communication before participants see the closed answer choices. Use closed state and action answers as comparable comprehension scores. Code the final runtime-switch response separately for expected scene, selection, and unsaved-work preservation.

## Evidence status

- **Implemented:** the self-guided study behavior verified in the local prototype on 15 September 2026.
- **Proposal:** the pass criteria and participant mix above.
- **Research finding:** only conclusions supported by completed participant responses.
- **Open question:** whether the production Editor preserves scene, selection, viewport state, and unsaved work during a real runtime switch.
