Implement the "Waves" component from zero: a dense field of parallel flowing lines that sway like silk — each line is a long ribbon following a twisted Perlin flow; when the cursor sweeps across, the lines bend around it like reeds in wind and spring back into place with a tunable bounce; clicking sends a circular shockwave that pushes the lines outward as it travels. Lines brighten toward an accent colour where the field is disturbed, and can render dashed with a per-line phase. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: Waves.jsx (entry, spring-grid simulation, GL setup) and Waves.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="waves">` (plus caller className), position absolute inset 0, overflow hidden, inline `backgroundColor` merged ahead of the caller style — the host typically wraps it in a positioned, sized box. Its only child is a `<canvas class="waves__canvas" aria-hidden="true">`, position absolute inset 0.
- WebGL2: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. One program; silent no-op when the context or program fails.
- Drawing: instanced triangle strips — one instance per line, (samples × 2) vertices per line, no buffers (gl_VertexID/gl_InstanceID). Lines are laid along a rotated axis: spacing px apart (min 2), sampled every 4px; if lines × samples × 2 exceeds 1.6M vertices the sample step grows to fit. The line lattice covers the rotated bounding box plus margin = amplitude × 1.1 + displacement limit + spacing × 2 + 8.
- Canvas pixels = CSS × min(dpr prop || devicePixelRatio, 2). Colour parsing: any CSS colour string through a 1×1 fillStyle probe, cached; fallback white.

## Line flow (vertex shader)

- Rest shape: a 12-gradient hash Perlin twists each point — turn = perlin(rest × frequency + drift) × 12 × twist; local = rest + (cos(turn), sin(turn) × 0.5) × amplitude; frequency = (0.002/scale, 0.0015/scale); drift advances with flow time (flow × 0.025, flow × 0.0075), where flow accumulates dt × speed and variation × 37.1 is added as a seed offset; the Perlin hash also mixes variation × 7919/104729 into the lattice, so `variation` reweaves the whole field.
- Displacement field: a 12px-cell grid (cols/rows = view/12 + 2) holds per-cell 2D displacements in an RG32F texture; the vertex shader samples it with 4×4 bicubic weights (value + slope matrix), and soft-clamps the magnitude with tanh toward a limit = max(12, mouseRadius × 0.5).
- Tangent/normal: bend = wave(v + step) − wave(v − step) plus the sampled slope applied to bend; the unit normal offsets the strip by side × (halfWidth + 1); halfWidth = max(0.5, lineWidth × ratio / 2).

## Interaction field (CPU spring grid)

- Each cell is a damped harmonic oscillator integrated in sub-steps (≤ 16 per frame, ≤ 1/120s or 0.6/omega per step): a = drive − stiffness × p − damping × v; stiffness = omega², damping = 2 × zeta × omega with zeta = 1 − 0.85 × bounce and omega = 4 / (zeta × returnDuration) — `bounce` (0–1) sets overshoot, `returnDuration` the spring time.
- Drive: while the pointer is inside with mouseInteraction, cells within mouseRadius get a push along the smoothed pointer velocity direction, weight smootherstep(1 − dist/radius) × drive, drive = 26000 × tanh(pointerSpeed/1400) × mouseStrength — slow drifts barely move the lines, fast strokes shove them. Pointer position smooths at τ 0.045s, velocity blends at τ 0.06s.
- Click ripples (clickRipple, not reduced motion; max 6, oldest dropped): each ripple expands at 640 px/s with a Gaussian shell width 64px, push = power × exp(−offset² × 2) × smootherstep(dist/56) with offset = (dist − front)/64 and power decaying as (1 − front/range)^(1.5) × omega-normalized; range = max(360, diagonal × 0.55); removed when the front passes range.
- Only the active bounding region of disturbed cells is integrated and re-uploaded (texSubImage2D of the dirty rows); when the peak displacement + velocity drops below 0.02 and nothing drives it, the region is zeroed and the simulation sleeps.

## Fragment pass

- Coverage across the ribbon: clamp(halfWidth + 0.5 − |across|, 0, 1) × min(1, lineWidth); dashed style: phase = (along + flow × 16) / (spacing × 2.6) + a hashed per-line phase, coverage ×= clamp((0.25 − |fract(phase) − 0.5|)/fwidth(phase) + 0.5) — screen-antialiased dashes that travel along the line.
- Energy: the sampled displacement magnitude; heat = smoothstep(0, limit × 0.55, energy) mixes the base alpha 0.62 → 1 and colour → accentColor (default: lineColor, or a luminance-darkened version of it in lightMode).
- Edge fade: smootherstep mask on all four sides with edge = fade × 0.5, × opacity.
- lightMode: the line colour is darkened via linear-space luminance toward a 0.045 target so lines read on light backgrounds.

## Timing & lifecycle

- Intro (2.2s, skipped when intro=false or reduced motion): a reveal band sweeps across the lattice — lines appear where (reveal − |u|)/band > 0 with reveal eased cubically through the first 70% of the intro; amplitude swells in with a smootherstep.
- Loop: while not paused, flow advances and the frame loop keeps running (the field is always gently flowing); paused renders a single frame and stops (also completing the intro). Under prefers-reduced-motion the flow freezes and the loop only continues while the interaction field is settling, the cursor is engaged or ripples are alive.
- Pointer events on window (passive move/down/up/cancel); non-mouse pointerdown snaps the smooth pointer (no cross-screen swoosh); non-mouse up/cancel counts as leaving; documentElement pointerleave clears. visibilitychange resets the clock; IntersectionObserver pauses off-screen; ResizeObserver rebuilds the grid; a dpr prop change re-resizes. Prop changes render one frame immediately.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete program/VAO/texture, force-lose the context when the canvas is detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| lineColor | string | "#ffffff" | Base line colour (any CSS colour string). |
| accentColor | string | - | Colour the lines heat toward when disturbed; falls back to lineColor. |
| backgroundColor | string | "transparent" | Inline background of the root div. |
| lineStyle | "solid" \| "dashed" | "solid" | Solid ribbons or travelling dashes. |
| spacing | number | 10 | Distance between lines in px, min 2. |
| lineWidth | number | 1 | Line width in CSS px, min 0.25. |
| rotation | number | 0 | Field rotation in degrees. |
| amplitude | number | 32 | Rest sway height of the lines, px. |
| scale | number | 1 | Flow zoom, floored at 0.05; higher packs waves tighter. |
| twist | number | 1 | Perlin twist strength, floored at 0. |
| speed | number | 1 | Flow speed; 0 freezes the drift. |
| variation | number | 0 | Deterministic reweave seed for the flow field. |
| mouseInteraction | boolean | true | The cursor bends the lines. |
| mouseRadius | number | 175 | Cursor influence radius in px, min 20. |
| mouseStrength | number | 1 | Cursor push strength, floored at 0. |
| bounce | number | 0.5 | Spring overshoot on release, 0–1. |
| returnDuration | number | 1.4 | Spring return time in seconds, min 0.2. |
| clickRipple | boolean | true | Clicking sends an expanding shockwave (max 6). |
| intro | boolean | true | Lines sweep in on mount (2.2s). |
| fade | number | 0 | Edge fade to transparent, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Darkens the lines for light backgrounds. |
| paused | boolean | false | Renders one static frame and stops. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root (merged after backgroundColor). |

## Delivery & validation

- Deliver the complete content of Waves.jsx and Waves.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: lines flow continuously with the Perlin sway; sweeping the cursor bends them around the path and they spring back with the bounce/returnDuration feel — fast strokes shove harder than slow ones; clicking sends a visible shockwave that brightens lines as it passes and up to 6 coexist; disturbed lines heat toward accentColor; dashed mode travels with per-line phase; spacing/lineWidth/rotation/amplitude/scale/twist/speed/variation/fade/opacity all take effect; backgroundColor shows through the transparent canvas; lightMode reads on white; reduced motion keeps a static weave while the cursor still works; paused freezes everything in one frame; resize rebuilds the grid without stretching; off-screen and hidden tabs stop rendering; unmount leaves no listeners or GL objects; 375 / 768 / 1440 wide without overflow.
