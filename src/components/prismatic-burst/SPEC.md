Implement the "PrismaticBurst" component from zero: a burst of volumetric prismatic light rays radiating through darkness. The burst leans toward the cursor, flares outward in an expanding ring on every click, and can morph between rotating, tumbling and cursor-facing animation modes. Rays are raymarched with layered noise, coloured by a spectral gradient (built-in cosine spectrum or any custom colour list), distorted, twisted, and finished with a 4-level bloom. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: PrismaticBurst.jsx (entry, shaders) and PrismaticBurst.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `prismatic-burst-container` (position relative, width 100%, height 100%, overflow hidden) that receives `className` and merged `style`; the only child is a `<canvas class="prismatic-burst-canvas" aria-hidden="true">` (position absolute, inset 0, width/height 100%). An optional `mixBlendMode` (other than "none") is applied to the canvas inline. The host gives the container its size.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. `webglcontextlost` prevents default; `webglcontextrestored` bumps a React generation counter that re-runs the whole init effect, so a lost context rebuilds itself. If anything fails to build, the component silently renders nothing.
- Four programs: `burst` (the raymarch into a scene target), `downsample` (4-tap box, clamped to 3× encode), `blur` (dual-pass 8-tap gaussian, 4 bloom level pairs), `composite` (bicubic upsample of the scene + weighted bloom 0.42/0.30/0.18/0.10 + edge fade). All draw one big triangle `(-1,-1) (3,-1) (-1,3)`. Offscreen targets use RGBA16F when EXT_color_buffer_float exists (encode 1), else RGBA8 (encode 0.25, decode on composite).
- Resolution: scene = canvas × scale, scale = resolution prop or quality preset (`low` 0.35 / `medium` 0.5 / `high` 0.7), clamped 0.2–1; bloom levels are CSS size ÷ 2ⁿ. Canvas DPR = min(dpr || devicePixelRatio, 2). An adaptive governor watches frame intervals: over 20 slow frames (>1/40s) it multiplies the scale by 0.85 down to 0.5; after 180 quick frames (<1/55s) it climbs back ×1.1 — heavy content keeps its frame rate.
- Gradient texture: 1px-tall RGBA strip, one texel per colour (up to 64), sampled from CSS strings via a 1px canvas probe; LINEAR + clamp. Empty list → the shader's built-in `1 + cos(depth·3 + vec3(0,1,2))` spectrum.

## Raymarch (burst pass)

- Camera: centred pixels ×2, perspective `normalize(vec3(centered, viewHeight × max(zoom, 1e-3)))`; the `offset` prop (number or px string) shifts the burst centre. A twist matrix rotates the sampled point by `twist × radius / viewHeight` before the orientation is applied.
- March: 44 steps, each advancing by `min(rad - 0.3, noise × jitterAmp) + 0.1` (jitterAmp = 0.1 × grain, so the layered hash noise both shades and roughens the rays). At each step the point is inverted-projected onto a unit sphere (×10), twisted, rotated by the orientation matrix, optionally bent by two smoothstep-grown trigonometric bends (`distort` amp).
- Ray pattern: `smoothstep(edge, edge + 0.2, sin(x + cos(y)·cos(z)) · sin(z + sin(y)·cos(x + t)))` with edge = 0.5 - 0.35 × (rayWidth - 1); a `rayCount` comb (`0.5 + 0.5·cos(count·angle)³`) gates the pattern into that many discrete rays.
- Colour: `flow` scrolls a sawtooth through the gradient texture (smoothstep-shaped), cycling spectral colours along each ray's depth; with no palette the cosine spectrum is used. Accumulation weight = `0.05 / (0.4 + stepLen) × smoothstep(5, 0, rad) × spectral × rayPattern`.
- Edge fade: a smootherstep radial falloff scaled by `centerFade` (clamped 0.5–3, × max(1, zoom)), dithered by noise; multiplied by `intensity`.

## Light interactions

- Cursor light: while engaged, a gaussian lift (sigma 0.45 units) centred on the smoothed pointer with strength 0.7 × mouseStrength brightens the rays locally; the pointer parallax also shifts the burst centre by 0.06 × mouseStrength × engaged of the half-min-size.
- Click burst: `clickBurst` + mouseInteraction pushes a pulse (max 4 live, oldest evicted, life 1.5s) and adds a "kick" of up to +2.4 (cap 5) to the phase speed, decaying at exp(-3.5t). Each pulse renders as an expanding gaussian ring (radius age × 1.7, amplitude 1.6 × (1-life)^1.6, width 0.2 + age × 0.16, plus a fading pedestal).
- Intro: over 2.4s a reveal front races outward from the centre (streaked with three sine harmonics so it arrives unevenly), lifting light near the front and multiplying everything inside it; rush = 3 × (1-intro)² briefly accelerates the phase.
- Orientation per `animationType`: `rotate` — a gentle wobble matrix from cos(t·0.2) and offsets ±11/±33; `rotate3d` — composed rotZ(t·0.17)·rotY(t·0.21)·rotX(t·0.31); `hover` — rotY/rotX up to ±0.6 rad following the smoothed pointer position inside the container. Non-hover modes additionally tilt up to 0.3 × mouseStrength × engaged toward the cursor. Pointer smoothing uses a dampened exponential with time constant `0.02 + hoverDampness × 0.5` (hoverDampness clamped 0–1).
- Composite: bicubic (Catmull-Rom weights) upsample when the scene is smaller than the canvas, exact texel fetch when 1:1; bloom add; decode; edge fade mask over fade × 0.5 of each side. Light mode converts to pigment ink — hue-normalised with neutral desaturation, hue² blended, coverage = smoothstep(0.001, 0.32, energy)^0.72 × 0.92 — a printable spectral ink for light pages.

## Performance & lifecycle

- Settings are mirrored into a ref every render; a per-render wake re-renders once (re-running resize when `dpr` changed) so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: frames continue only while running content needs it (speed ≠ 0, grain > 0, or flow ≠ 0, when unpaused and not reduced) or while the intro, pulses, kick, pointer engage or smoothing are settling. Wake sources: window pointermove/pointerdown (passive), documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: time and phase freeze, intro snaps to done, pulses and cursor effects are disabled.
- Unmount: cancel the frame, remove context-loss listeners, disconnect both observers, remove all window/document listeners, delete all textures/framebuffers/programs/buffer/VAO, and lose the GL context if the canvas is detached (unless the context is already lost). Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | - | Spectral palette, up to 64 colours, cycled along each ray; omitted uses the built-in spectrum. |
| intensity | number | 2 | Overall brightness of the burst, ≥0. |
| speed | number | 0.5 | Animation phase speed; 0 freezes the morphing. |
| animationType | "rotate" \| "rotate3d" \| "hover" | "rotate3d" | Idle motion; "hover" faces the cursor instead of spinning. |
| distort | number | 0 | Ray bending amount, ≥0, capped at 50. |
| rayCount | number | 0 | Splits the burst into N discrete rays; 0 keeps the continuous field. |
| rayWidth | number | 1 | Ray thickness, 0.2–2.5. |
| zoom | number | 1 | Camera zoom; smaller pulls back, ≥0.05. |
| twist | number | 0 | Spiral twist of the ray field around the centre. |
| flow | number | 0 | How fast colours cycle along the rays. |
| centerFade | number | 1 | Radial falloff of the visible area, 0.5–3. |
| grain | number | 0.8 | Noise/jitter amount, 0.3–1. |
| glow | number | 0 | Bloom halo strength, ≥0. |
| offset | { x, y } | - | Shifts the burst centre; numbers or px strings. |
| mouseInteraction | boolean | true | Cursor light, parallax and click bursts. |
| mouseStrength | number | 0.5 | How strongly the cursor lifts and tilts the rays, ≥0. |
| hoverDampness | number | 0.25 | Pointer smoothing lag, 0–1. |
| clickBurst | boolean | true | Clicking sends an expanding light ring and kicks the phase. |
| intro | boolean | true | A reveal front races outward on mount (2.4s). |
| fade | number | 0 | Softens the container edges, 0–1. |
| quality | "low" \| "medium" \| "high" | "high" | Render resolution preset (0.35 / 0.5 / 0.7). |
| resolution | number | - | Explicit resolution scale, overriding quality, 0.2–1. |
| lightMode | boolean | false | Prints the burst as pigment ink for light backgrounds. |
| mixBlendMode | string | - | CSS mix-blend-mode applied to the canvas. |
| paused | boolean | false | Freezes motion but keeps the last frame visible. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of PrismaticBurst.jsx and PrismaticBurst.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all three animationType modes behave; custom palettes cycle along the rays; rayCount combs the burst into distinct rays and rayWidth/zoom/twist/distort/flow/centerFade reshape it live; the burst leans and brightens toward the cursor with dampened lag; every click fires an expanding ring (max 4 live) and a speed kick that decays; intro sweeps outward once and never replays on prop changes; glow/bloom, fade, intensity, grain, quality/resolution all respond; lightMode prints pigment ink on white; the governor keeps large canvases smooth; prefers-reduced-motion holds a static frame with no pulses; a restored GL context rebuilds the scene; hiding the tab or leaving the viewport stops the loop and it resumes; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
