Implement the "CursorGrid" component from zero: a WebGL2 background grid whose cells light up around the cursor and decay after it passes — crisp hairline grids (lines, dashes, dots or crosses), optional rounded tiles with gaps, a soft spotlight that brightens the grid near the cursor, expanding click-pulse rings that sweep light across the cells, random ambient twinkles, a centre-out intro reveal and edge fade — with optional children layered above. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ with raw WebGL2 (shaders compiled directly, no renderer helper) as the only technical requirement. Two files only: CursorGrid.jsx (grid state, waves, shaders) and CursorGrid.css (layout). No iframe.
- Root is a `<div class="cursor-grid">` plus className/style: position relative, width 100%, height 100%, overflow hidden. Inside: an aria-hidden `<canvas class="cursor-grid__canvas">` (absolute inset 0, pointer-events none) and, when children are passed, a relative `.cursor-grid__content` wrapper stacking them above the canvas.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth/stencil false; if the context or program fails the component renders nothing. One fullscreen triangle generated from gl_VertexID (no vertex buffers, a bare VAO), uniform locations cached, DPR = min(dpr prop || devicePixelRatio, 2).
- Grid model: cols = ceil(width / cellSize) + 1, rows likewise, offsets re-centering the lattice ((view − cols × size) / 2). Per-cell state lives in Float32Arrays — levels (current brightness), waves (pulse energy), targets (aim), touched (last-touch clock) — rebuilt when the cell count or size changes; brightness is uploaded as an R8 texture (NEAREST, CLAMP_TO_EDGE) with texSubImage2D, only when something changed.
- Colours: color and gridColor are hex strings (3/4-digit expanded, invalid falls back to white); both default to the mode ink — #ffffff on dark, #18181b with lightMode true. Output is premultiplied.

## Interaction & cell physics

- Pointer: window pointermove maps to local coordinates and an inside flag. energize with highlight "area" lights every cell whose centre is within radius px, each aimed at falloff(1 − dist / radius) with the falloff curve linear / smooth (smoothstep) / sharp (cubic); highlight "cell" lights only the cell under the cursor. Targets accumulate by max and stamp the touch clock.
- Rise & decay: cells rise toward their target with an exponential attack (time constant 0.045s) and hold for holdTime ms after the last touch, then decay linearly over fadeDuration ms; sub-0.002 values snap to zero. The pointer position fed to the spotlight is smoothed (time constant 0.07s) and presence eases in and out over 0.25s.
- Click pulses: pointerdown pushes a ring (unless clickPulse is off or reduced motion is on) expanding at pulseSpeed px/s; cells within the ring band — 0.6 cells ahead, 1.4 behind, Gaussian envelope scaled by an outward fade to the far corner — light up as it passes; rings are removed once past the far corner of the view.
- Ambient: with ambient > 0 (and motion allowed) random cells light to 0.25–0.7 at a rate of ambient × cellCount × 0.04 per second.
- Intro: a ring reveal expands from the centre over 1.4s (1 − (1 − t)^2.2 easing) showing the grid outward-in; skipped when intro is false or reduced motion is on.

## Shader

- Grid marks: hairlines between cells at lineWidth px (offset snapped by half a device pixel when the device line width is odd); "dashed" breaks marks into cell-size/6 dashes, "dots" replaces crossings with round dots (radius max(lineWidth × 1.25, 1.2)), "crosses" shortens the marks into plus signs. Resting marks render at gridOpacity, brightened near the cursor by a Gaussian spotlight exp(−d² / radius² × 1.6) × spotlight × presence (up to full white-blend at 0.45 extra).
- Lit cells, two modes: seamless (cellRadius 0 and cellGap 0) draws lines joined across neighbouring lit cells — a lit cell lights the shared borders with its lit neighbours so the glow is continuous; tile mode (either value > 0) draws each lit cell as a rounded box (radius clamped to half the size minus gap) with a border line and a fill at fillOpacity. Lit lines/borders render at maxOpacity.
- Edge fade: with edgeFade > 0, a quintic smoothstep fades everything within that fraction of each edge.
- All alphas combine premultiplied: lit cell over grid mark, both scaled by the edge fade and intro reveal.

## Loop & lifecycle

- Frame loop self-sleeps: requestAnimationFrame continues only while any cell is lit or decaying, pulses exist, the intro is running, presence is transitioning or the smoothed mouse is still gliding; ambient keeps it awake by design. It pauses when the tab is hidden (visibilitychange) or the container is off-screen (IntersectionObserver), and wakes on pointer events, resizes (ResizeObserver rebuilds and redraws) and prop changes (a per-render effect re-draws with the latest settings, rebuilding when cellSize changed).
- prefers-reduced-motion: reduce — intro skipped (grid starts revealed), ambient and click pulses disabled; hover lighting, hold and fade still work.
- Unmount: cancel the frame, disconnect both observers, remove window/document listeners, delete the texture, VAO and program, and lose the GL context when the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cellSize | number | 60 | Grid pitch in px, floored at 8. |
| color | string | - | Lit-cell colour, hex; defaults to the mode ink. |
| gridColor | string | - | Grid mark colour, hex; defaults to the mode ink. |
| radius | number | 140 | Hover lighting radius in px, floored at 1. |
| falloff | "linear" \| "smooth" \| "sharp" | "smooth" | Brightness curve toward the radius edge. |
| highlight | "area" \| "cell" | "area" | Light cells around the cursor or just the one under it. |
| holdTime | number | 400 | Ms a lit cell holds before fading. |
| fadeDuration | number | 800 | Ms of the fade-out, floored at 16. |
| lineWidth | number | 1 | Grid and lit line width in px, floored at 0.25. |
| maxOpacity | number | 1 | Lit line/border opacity, 0–1. |
| fillOpacity | number | 0.06 | Lit cell fill opacity, 0–1. |
| gridOpacity | number | 0.08 | Resting grid opacity, 0–1. |
| gridStyle | "lines" \| "dashed" \| "dots" \| "crosses" | "lines" | Resting grid mark. |
| cellRadius | number | 0 | Lit tile corner radius in px; > 0 switches to tile mode. |
| cellGap | number | 0 | Gap between lit tiles in px; > 0 switches to tile mode. |
| spotlight | number | 0.6 | 0–1, grid brightening around the cursor. |
| clickPulse | boolean | true | Clicks send expanding light rings through the cells. |
| pulseSpeed | number | 600 | Ring expansion speed in px/s, floored at 1. |
| ambient | number | 0 | 0–1, random cells twinkling per second. |
| edgeFade | number | 0.2 | 0–0.5, fraction of each edge faded out. |
| intro | boolean | true | Centre-out ring reveal on mount. |
| lightMode | boolean | false | Dark ink (#18181b) for light backgrounds. |
| dpr | number | - | Overrides the device pixel ratio, clamped to 2. |
| children | ReactNode | - | Content layered above the grid. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of CursorGrid.jsx and CursorGrid.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: cells light around the cursor with each falloff curve and both highlight modes, hold for holdTime and fade over fadeDuration; seamless mode joins lit neighbours into continuous lines while cellRadius/cellGap switch to rounded tiles with borders and fills; dashed, dots and crosses rest styles render; spotlight brightens the grid around the pointer and relaxes on leave; clicks send rings that sweep light outward at pulseSpeed; ambient twinkles randomly; the intro ring expands once from the centre; edge fade softens all four edges; lightMode flips the ink for light stages; custom color/gridColor render; children sit above the canvas and receive pointer events; resizing re-lattices without stale cells; reduced motion skips intro, ambient and pulses but keeps hover lighting; tab hide and off-screen pause the loop; unmount leaves no frame, observers, listeners or GL context; 375 / 768 / 1440 wide without overflow.
