Implement the "MagnetLines" component from zero: a field of magnetic lines — a dense grid of short bars, each one a tiny compass needle that swings toward the cursor with springy inertia, ripples outward (the pointer's influence reaches distant lines later than near ones), and spins a full turn with a bright flash band whenever you click, as if a pulse wave rolled through the field. Four response modes (orbit tangent, attract, spiral, and a dipole field), three silhouettes (plain line, arrow, two-tone needle), an optional rainbow that hues by heading, per-line seeded scatter so the field never looks mechanically aligned, and an optional idle mode where a ghost cursor keeps wandering through when you're not around. A tilt option projects the whole grid into perspective. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: MagnetLines.jsx (entry, simulation, GLSL) and MagnetLines.css. No runtime dependencies. No iframe.
- Root is `<div class="magnet-lines">` (position relative, width/height 100%, overflow hidden) receiving className/style; inside are `<canvas class="magnet-lines__canvas" aria-hidden="true">` (absolutely positioned by JS, pointer-events none) and a hidden `<span class="magnet-lines__probe">` used to measure CSS-size strings for lineWidth/lineHeight. Passing containerSize (number or CSS size) switches the root to a square variant (aspect-ratio 1/1, height auto, overflow visible) whose canvas may overflow with a computed pad.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; missing context renders nothing. Canvas DPR = min(devicePixelRatio, maxDevicePixelRatio clamp 0.5–3). Geometry: one 4-vertex strip per instance with per-instance attributes centre vec2 and state vec4 (angle, emphasis, flash, visibility), state uploaded per frame from a Float32Array.
- Grid: spacing (default 30px) derives columns = width/spacing and rows = height/spacing; explicit rows/columns win (one derives the other from the aspect ratio); each clamped 1–400, and the product is capped at 30000 instances by shrinking both axes together. lineWidth/lineHeight accept numbers or CSS size strings (resolved through the probe span); defaults 2px × 18px.
- Tilt: tiltX/tiltY (−70–70°) build a perspective matrix; with a tilt the field tiles virtually — cells are culled against the perspective hull each layout, depth clamps at 4 and lines fade out with smoothstep as they recede (scale falloff from half to full depth), while the canvas grows a pad so near lines don't clip. Untilted fields lay out exactly over the container. ResizeObserver + window resize relayout; cell state (angles, velocities) migrates across relayouts by grid coordinates so lines never snap.

## Field models

- Each line's rest angle = baseAngle (degrees, default −10) + 90° + a seeded scatter jitter (column/row integer hash → ±1 × scatter × 90°), so the field sits at a slightly scattered rest pose.
- Goal angle from the (possibly virtual) cursor position: orbit aims perpendicular to the bearing (tangent circles); attract aims straight at it; spiral adds 45°; dipole uses the dipole field formula around the cursor's heading (3(m·r̂)r̂ − m̂), with the heading easing toward the pointer's motion direction when it moves faster than 40 px/s.
- reach blends goal and rest by distance: fully influenced within reach × 0.55, fully at rest beyond reach, smootherstep between.
- Spring per line: stiffness = (6 + 42 × (1 − inertia)²)² (inertia 0 snaps instantly), damping = 2√stiffness × (1 − 0.75 × bounce), integrated in 240 Hz sub-steps; angles wrap to the shape's period (180° for plain lines, 360° for arrow/needle) and snap to the goal below a threshold.
- Ripple: each line tracks a delayed cursor — the delay grows with distance (ripple/900 s per px), eased per line, so the swing spreads outward as a wave.
- Emphasis: exp(−d²/radius²) × intro reveal — near lines stretch to (1 + stretch × emphasis) × length and take full brightness; radius defaults 200px (≥ 1).
- Idle: with idle on and the pointer unseen or gone > 1.2 s, a virtual cursor wanders a slow Lissajous path (cos/sin mixtures of 0.37/0.21/0.53 rad-s, 32% of the smaller dimension) and the field follows it.

## Click pulse & intro

- Click (clickPulse, inside the field, not reduced motion): a pulse spawns at the point — its wavefront rolls outward at 520 px/s; as the front passes a line, that line spins exactly one full turn (eased smootherstep over 0.34 s) and flashes with a Gaussian band (~60 px wide) whose brightness fades over the pulse's life (distance/520 + 0.34 + 0.1 s, capped at 6 s). Up to 6 pulses overlap; each line adds all their spins/flashes.
- Intro: a reveal wave starts at the field origin at speed max(700 px/s, farthest/1.1 s); each line spins in from its rest pose over 0.65 s and fades in at twice that rate, so the field sweeps awake from the centre.
- Flash also lifts alpha (flash × 0.6) and emphasis brightens: alpha mixes (1 − fade) → 1 by emphasis (fade default 0.65 dims far lines), all premultiplied and feathered at the container edges when edgeFade > 0 (smoothstep zones at 34%/44% of width/height).

## Shapes & colour

- Silhouettes are analytic anti-aliased SDFs in the fragment shader: line (capsule with rounded ends), arrow (shaft capsule plus a triangular head sized from lineWidth/lineLength), needle (rhombus whose north half is tinted with the accent colour).
- lineColor parses 3/6-digit hex, rgb()/rgba(), or any CSS colour via a canvas probe; default near-white. accentColor defaults to a rose tone for needles and colour-mixes by emphasis (only when explicitly set does a plain line mix toward it). rainbow replaces colour by a spectrum sampled at fract(angle/period), tone-clamped from the base colour's lightness (0.42–0.66).
- The whole render blends premultiplied alpha; far/tiled depth and edge fades multiply through.

## Performance & lifecycle

- The frame loop sleeps when settled: no intro, no pulses, no wandering ghost, cursor target arrived and every spring below the snap threshold — and wakes on pointer moves, clicks, resizes, visibility and prop updates. IntersectionObserver + visibilitychange suspend/resume.
- Shaders compile with KHR_parallel_shader_compile when present (the loop waits); webglcontextlost freezes, webglcontextrestored bumps a generation that rebuilds all GL state. Unmount cancels the frame, disconnects observers, removes listeners, retires the program (deferring deletion until parallel compile finishes), deletes buffers/VAO and drops the context when the canvas detaches. Same-page instances are independent.
- Reduced motion: springs snap instantly (no inertia), intro and click pulses are disabled, the wandering ghost is off; lines still aim at the pointer.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| spacing | number | 30 | Grid cell size in px when rows/columns are not given, ≥ 4. |
| rows | number | - | Explicit row count, 1–400; derives columns from the aspect ratio. |
| columns | number | - | Explicit column count, 1–400; derives rows from the aspect ratio. |
| containerSize | number \| string | - | Makes the field square (number = px, string = CSS size) instead of filling the container. |
| lineColor | string | "#efefef" | Base colour of every line; any CSS colour. |
| accentColor | string | - | Second colour mixed in by emphasis; needles default to a rose tone. |
| lineWidth | number \| string | 2 | Thickness in px (or CSS size), ≥ 0.25. |
| lineHeight | number \| string | 18 | Length in px (or CSS size), ≥ 1. |
| baseAngle | number | -10 | Rest angle in degrees before the 90° upright offset and scatter. |
| mode | "orbit" \| "attract" \| "spiral" \| "dipole" | "orbit" | How lines respond to the cursor: tangent, direct, 45° twist, or dipole field. |
| shape | "line" \| "arrow" \| "needle" | "line" | Silhouette of each cell. |
| rainbow | boolean | false | Hues every line by its heading instead of a fixed colour. |
| radius | number | 200 | Cursor-falloff radius in px for stretch/brightness, ≥ 1. |
| fade | number | 0.65 | How much far-from-cursor lines dim, 0–1. |
| edgeFade | number | 0 | Feather zone at the container edges, 0–1. |
| stretch | number | 0.4 | Extra length near the cursor, 0–2. |
| reach | number | 0 | Distance beyond which lines rest instead of reacting, in px. |
| scatter | number | 0 | Per-line seeded rest-angle jitter, 0–1 (±90° at full). |
| inertia | number | 0.35 | Spring lag; 1 is sluggish, 0 snaps instantly, 0–1. |
| bounce | number | 0.3 | Spring overshoot, 0–1. |
| ripple | number | 0.3 | How much the cursor's influence ripples outward with distance. |
| clickPulse | boolean | true | Clicks spin every line a full turn with a travelling flash band. |
| intro | boolean | true | A reveal wave spins the field awake from the centre on mount. |
| idle | boolean | false | A ghost cursor wanders the field when you're away. |
| tiltX | number | 0 | Perspective tilt around the x axis, −70–70°. |
| tiltY | number | 0 | Perspective tilt around the y axis, −70–70°. |
| maxDevicePixelRatio | number | 2 | DPR ceiling, clamped 0.5–3. |
| className | string | "" | Extra class names for the field. |
| style | CSSProperties | - | Inline styles for the field. |

## Delivery & validation

- Deliver the complete content of MagnetLines.jsx and MagnetLines.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: every line swings toward the cursor with inertia and settles; ripple makes distant lines react later than close ones; clicking spins each line a full turn under a travelling flash and overlapping clicks stack; orbit/attract/spiral/dipole give visibly different fields (dipole flips around the pointer's heading); line/arrow/needle render crisply with the needle's rose north half; rainbow hues by heading; scatter keeps rest poses irregular; radius/fade/stretch/reach/edgeFade behave; inertia 0 snaps and 1 drags; bounce overshoots; containerSize gives a square field; tiltX/tiltY project perspective with depth fade and no clipping; CSS-size strings for lineWidth/lineHeight measure correctly; idle keeps the field alive when the pointer leaves; reduced motion snaps lines without pulses or intro; the loop sleeps when everything settles; relayouts keep angles continuous; canvas tracks its container at 375 / 768 / 1440 wide without overflow; unmount leaves no listeners, observers or frame loop; same-page instances are independent.
