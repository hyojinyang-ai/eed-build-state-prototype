// url=https://www.figma.com/design/NBIxN2orkOXwn7m3GszZMa/FictionUI?node-id=709-29286
// source=build-state-prototype-v5.html
// component=canvas-fallback-info
import figma from 'figma'

export default {
  example: figma.code`
    <span class="canvas-fallback-info visible" role="status" aria-live="polite">
      <span class="canvas-warning-content">
        <span class="canvas-warning-icon" aria-hidden="true"></span>
        <span class="canvas-fallback-text"></span>
      </span>
    </span>
  `,
  id: 'viewport-warning',
  metadata: { nestable: true },
}
