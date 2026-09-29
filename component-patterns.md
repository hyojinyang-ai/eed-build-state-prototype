# Component Patterns

Reusable UI patterns from the build-state prototype. Copy the HTML/CSS snippets into your prototype.

## Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- **Nunito Sans** — all Fiction Factory editor UI
- **Inter** — prototype control bar only (not part of the editor)

---

## Status Dots

Colored circles indicating build state.

### Small (6px) — footer
```css
.footer-build-dot {
  width: 6px; height: 6px; border-radius: 50%;
  flex-shrink: 0;
}
.footer-build-dot.green-bright { background: #71efb2; }
.footer-build-dot.yellow { background: var(--warning); }
.footer-build-dot.red { background: #e05252; }
```

### Medium (8px) — header build widget
```css
.bw-status-dot {
  width: 8px; height: 8px; border-radius: 100px;
  flex-shrink: 0;
}
.bw-status-dot.green { background: #71efb2; }
.bw-status-dot.yellow { background: var(--warning); }
.bw-status-dot.red { background: #e05252; }
.bw-status-dot.spinner {
  background: transparent;
  border: 1.5px solid var(--processing);
  border-top-color: transparent;
  animation: bw-spin 1s linear infinite;
}
```

### Spinner Animation
```css
@keyframes bw-spin {
  to { transform: rotate(360deg); }
}
```

---

## Status Labels

```css
.bw-status-label {
  font-size: 12px;
  font-family: 'Nunito Sans', sans-serif;
  color: #a5a5a5;
  letter-spacing: 0.84px;
  white-space: nowrap;
}

.footer-build-label {
  font-size: 10px;
  font-family: 'Nunito Sans', sans-serif;
  color: #a5a5a5;
  letter-spacing: 0.3px;
}
```

---

## Out of Sync Chip

Dark pill with rotating sync icon. Used alongside green "Ready" dot + label.

```css
.oos-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 10px;
  background: #37383a;
  border: 1px solid #484b50;
  border-radius: 3px;
  font-size: 11px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 500;
  color: #a5a5a5;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.oos-chip .oos-icon {
  display: inline-flex;
  animation: bw-spin 2s linear infinite;
}
```

### Sync Icon SVG
```html
<span class="oos-icon">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 6a4.5 4.5 0 0 1 7.7-3.2M10.5 6a4.5 4.5 0 0 1-7.7 3.2"
          stroke="#a5a5a5" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M9.5 1.5v1.8h-1.8M2.5 10.5V8.7h1.8"
          stroke="#a5a5a5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</span>
```

### Usage (all concepts)
```html
<!-- Green ready dot + label, then oos chip -->
<span class="bw-status-dot green"></span>
<span class="bw-status-label">Ready</span>
<span class="oos-chip" style="margin-left:8px;">
  <span class="oos-icon"><!-- sync SVG --></span>
  out of synch
</span>
```

---

## Cloud Button

Blue pill button with wifi/cloud icon. Triggers details dropdown.

```css
.bw-ip-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  background: var(--bg-accent-primary);  /* #1d7bbf */
  border-radius: 3px;
  cursor: default;
  margin: 0 2px;
}
```

### Cloud Icon SVG
```html
<span class="bw-ip-btn" onclick="toggleBuildDetails(this)">
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
    <path d="M2.5 8C1.5 7 1.5 5.5 2.5 4.5c1-1 2-1.5 4.5-1.5s3.5.5 4.5 1.5c1 1 1 2.5 0 3.5"
          stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M4.5 7.5c-.5-.5-.5-1.5 0-2C5 5 5.5 4.5 7 4.5s2 .5 2.5 1c.5.5.5 1.5 0 2"
          stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="7" cy="8.5" r="1.2" fill="#fff"/>
  </svg>
</span>
```

---

## Chevron Trigger

Small down-arrow next to cloud button. Also triggers details dropdown.

```html
<span class="build-details-trigger"
      style="cursor:pointer;color:#777;font-size:8px;margin-left:2px;"
      onclick="toggleBuildDetails(this)">
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M2 3l2 2.5L6 3" stroke="currentColor" stroke-width="1.2"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</span>
```

---

## Details Dropdown Panel

Floating panel with build details. Opens on cloud button or chevron click.

### Structure
```
.build-details-panel
  .bdp-progress-bar         — colored top border bar
  .bdp-branch-row           — branch name
  .bdp-toggle-row           — "Use editor build" toggle
  .bdp-commit-box           — your commit vs build commit hashes
  .bdp-link-row             — link to build URL
  .bdp-footer-row           — "Request new build" button
  .bdp-version              — version number (e.g. v4.0.2)
```

### Key CSS
```css
.build-details-panel {
  display: none;
  position: fixed;
  width: 270px;
  background: #232425;
  border: 1px solid #3a3b3d;
  border-radius: 6px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  z-index: 9999;
  font-family: 'Nunito Sans', sans-serif;
  color: #bfc4cc;
  font-size: 11px;
  overflow: hidden;
}
.build-details-panel.visible { display: block; }
```

### Positioning Logic
```javascript
function toggleBuildDetails(triggerEl) {
  const panel = document.getElementById('build-details-panel');
  // ... build panel HTML ...

  const rect = triggerEl.getBoundingClientRect();

  // Open upward if near bottom of screen
  if (rect.bottom > window.innerHeight - 200) {
    panel.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
    panel.style.top = 'auto';
  } else {
    panel.style.top = (rect.bottom + 4) + 'px';
    panel.style.bottom = 'auto';
  }
  panel.style.left = (rect.left - 100) + 'px';
}
```

---

## Transport Controls (Play/Stop/Pause/Step)

Inside `.build-widget .bw-transport`. Play button gets disabled in non-Ready states.

```css
.bw-btn {
  display: flex; align-items: center; justify-content: center;
  width: 24px; height: 24px;
  color: var(--text-secondary);
}
.bw-btn.dim { opacity: 0.2; }
```

### Play Button Disable Logic
```javascript
const playBtn = document.getElementById('play-btn');
if (index === 0) {
  playBtn.style.opacity = '';
  playBtn.style.pointerEvents = '';
} else {
  playBtn.style.opacity = '0.3';
  playBtn.style.pointerEvents = 'none';
}
```

---

## Canvas Overlay Warning

Yellow info bar shown during fallback states, overlaid on the viewport canvas.

```css
.canvas-fallback-info {
  display: none;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  background: rgba(241,180,27,0.08);
  border: 1px solid rgba(241,180,27,0.15);
  border-radius: 3px;
  font-size: 10px;
  color: #c9a834;
}
.canvas-fallback-info.visible { display: inline-flex; }
```

Text: "Rendering may differ from the live game build"

---

## Footer Build Status Bar

Used by Concept C. Aligned to the sticky footer.

```css
.footer-build-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  height: 100%;
  font-family: 'Nunito Sans', sans-serif;
}
```

---

## Build States Reference

| Index | State | Dot Color | Label | Special Rendering |
|-------|-------|-----------|-------|-------------------|
| 0 | Ready | green (#71efb2) | Ready | Normal, play enabled |
| 1 | Fallback | yellow (#f1b41b) | Fallback mode | Play disabled, canvas warning |
| 2 | Requesting Build | spinner (blue) | Requesting build... | Play disabled, inline spinner, auto-transition 3.5s |
| 3 | Out of Sync | green dot + oos chip | Ready + out of synch | Green "Ready" + dark chip with sync icon |
| 4 | Crash | red (#e05252) | Build crashed | Play disabled |

---

## Concept Visibility Matrix

| Element | Concept A | Concept C | Concept D |
|---------|-----------|-----------|-----------|
| Header status (dot+label) | visible | hidden | hidden |
| Header cloud button | visible | hidden | hidden |
| Header chevron | visible | hidden | hidden |
| Header-right icons | visible | visible | hidden |
| Header-right build status | hidden | hidden | visible |
| Footer build status | hidden | visible | hidden |
| Canvas overlay warning | all fallback states | all fallback states | all fallback states |
