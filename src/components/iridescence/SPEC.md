Implement the "Iridescence" component from zero: a full-area liquid surface of slowly folding interference colours — thin-film bands of hue drifting like oil on water — that you can stir with the cursor (a hidden flow field bends the folds along your stroke path) and tear into rotating vortices by clicking. The pattern reacts to the pointer with a parallax shift and a soft sheen glow. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Iridescence.jsx (entry, flow-field simulation, shaders) and Iridescence.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="iridescence-container">` — position relative, width 100%, height 100%, overflow hidden — wrapping one `<canvas class="iridescence-canvas">` (position absolute, inset 0, 100% × 100%, display block, aria-hidden). The host gives the root its size. className appends to the root, style passes inline.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false; if the context, compile or link fails the component silently renders nothing. Canvas pixel size = client size × min(devicePixelRatio, 2) × resolution (clamped 0.1–2).
- One program, one oversized triangle (vertices (−1,−1), (3,−1), (−1,3)) with a single aPosition vec2 attribute; fragment shader precision highp float, `#version 300 es`.

## Pattern algorithm

- The fragment shader builds the classic iterative interference field: with uv = (st × 2 − 1) × aspect (st = vUv after flow-field and swirl displacements), rotated by `rotation` degrees, divided by scale, plus a parallax offset (uMouse − 0.5) × amplitude: accumulate `d = −time·0.5`, `a = 0`; for i in 0..detail−1 (detail clamped 1–24): `a += cos(i − d − a·uv.x × warp)`, `d += sin(uv.y·i + a)`; then `d += time·0.5`.
- Colour: `col = vec3(cos(uv × vec2(d, a)) × 0.6 + 0.4, cos(a + d) × 0.5 + 0.5)`; `col = cos(col × cos(vec3(d, a, 2.5)) × 0.5 + 0.5) × uColor` — the multiplication with uColor tints the whole interference band set.
- Pointer sheen: `col += col × presence × sheen × 0.8 × exp(−dot(toPointer, toPointer) / 0.09)` — a soft radial brightening that follows the eased pointer (toPointer is aspect-corrected).
- Post chain in-shader: hue rotation around the grey axis by hueShift degrees (Rodrigues rotation with k = 0.57735); saturation as mix(luma, col, saturation) with luma weights (0.2126, 0.7152, 0.0722); contrast as (col − 0.5) × contrast + 0.5; brightness multiplier; film grain `(hash(gl_FragCoord.xy + seed) − 0.5) × grain × 0.12` with a hash of fract(p × (443.897, 441.423)) + dot products; clamp 0–1.
- Alpha: uOpacity flat; when fade > 0 an edge mask multiplies it — edge width = fade × min(resolution) × 0.5, each side smoothed with smootherstep (t³(t(6t−15)+10)). Output premultiplied: `vec4(col × alpha, alpha)`.

## Flow field (cursor stirring)

- A CPU-side velocity grid, 48 columns wide, rows = clamp(round(48 × height / width), 6, 96), stored as two floats per cell and uploaded each frame to an RG16F texture (LINEAR, CLAMP_TO_EDGE) sampled in the shader: `st = vUv − texture(uField, vUv).rg × stir` — the sampled flow displaces the pattern coordinates before everything else. stir is 0 when mouseReact is off.
- Brush: on pointermove with the previous sample inside the element (mouseReact on, stir > 0, reduced motion off), a Gaussian-quadratic falloff of radius 0.22 (aspect-corrected) adds the pointer delta × t² × 3.2 to each cell, then soft-clamps every cell magnitude to 0.4 via limit·tanh(magnitude/limit)/magnitude.
- Relaxation: each frame with activity, a 5-point Laplacian average (neighbours + centre × 12, all ÷16) multiplied by decay exp(−dt × 1.4); when the peak drops under 4e-4 the field is zeroed and flagged inactive.
- Click swirls: up to 6 concurrent (a 7th is refused unless the oldest is over 2.8 s old, then it is dropped). Each lives 3.2 s; per frame the uniform array receives (x, y, radius, strength) with radius = 0.21 × (1 + 0.4 × age), envelope = (exp(−1.35·age) − exp(−10·age)) × min(1, (3.2 − age)/0.8), strength = 3 × envelope × (0.21/radius)². In-shader each swirl rotates st around its centre by angle = strength × exp(−dot(delta, delta)/radius²) (aspect-corrected delta), winding the folds into a vortex that spins up fast and decays smoothly.

## Pointer tracking

- The smoothed field mouse (eased toward the tracked pointer at rate 1 − exp(−dt × 5), defaulting to (0.5, 0.5)) drives the parallax offset with amplitude; presence eases toward inside ? 1 : 0 at rate 1 − exp(−dt × 4) and gates the sheen. Listeners: window pointermove and pointerdown (passive), documentElement pointerleave (counts as leaving).
- mouseReact off disables both stir brush and sheen presence; the parallax target then stays centred.

## Colour handling

- color accepts an array of 0–1 channels (each clamped, missing channels default to 1) or any CSS colour string parsed through a 1×1 canvas fillStyle probe; the parsed value is cached by key.

## Performance & lifecycle

- Frame loop self-sleep: the loop keeps running only while moving (not paused and reduced motion off), the mouse/presence easing is still settling (deltas > 5e-4 / 2e-3), the flow field is active, or swirls are alive; otherwise it stops with a final render. IntersectionObserver pauses offscreen; visibility is handled by the observer waking. dt clamped to 0.05 s max.
- paused freezes the phase advance and the grain reseed but keeps pointer easing, stirring and swirl decay running. Reduced motion: phase frozen, brush and swirl clicks disabled, grain seed static; pointer easing still works.
- Grain reseeds (seed = floor(now / 42) % 997) every 42 ms while moving and grain > 0.
- A layout effect after every React render redraws immediately with the new settings (and resizes if resolution changed), so prop changes are visible on the next frame without waiting for motion.
- ResizeObserver re-measures and re-renders on container size change.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete the field texture, buffer, program and shaders. Same-page instances are independent (own grid, own canvas).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | number[] \| string | [1, 1, 1] | Tint multiplied over the interference bands. Array of 0–1 rgb or any CSS colour. |
| speed | number | 1 | How fast the folds drift. |
| amplitude | number | 0.1 | How far the pattern shifts opposite the cursor (parallax). |
| mouseReact | boolean | true | Enables cursor parallax, stirring and the sheen. |
| scale | number | 1 | Pattern zoom; higher is denser. Floored at 0.05. |
| detail | number | 8 | Interference iterations, clamped 1–24. |
| rotation | number | 0 | Rotates the pattern, in degrees. |
| warp | number | 1 | Strength of the fold coupling inside the iteration. |
| hueShift | number | 0 | Rotates the final colours around grey, in degrees. |
| saturation | number | 1 | Colour saturation, floored at 0. |
| brightness | number | 1.5 | Final brightness multiplier, floored at 0. |
| contrast | number | 1 | Contrast around mid grey, floored at 0. |
| stir | number | 0.5 | How strongly the cursor stroke bends the folds, floored at 0. |
| sheen | number | 0.3 | Brightness of the glow that follows the cursor. |
| clickSwirl | boolean | true | Clicking spawns a rotating vortex. |
| grain | number | 0 | Film grain amount, clamped 0–1. |
| fade | number | 0 | Edge fade fraction of the shorter side, clamped 0–1. |
| opacity | number | 1 | Overall opacity, clamped 0–1. |
| resolution | number | 1 | Render scale multiplier on top of DPR, clamped 0.1–2. |
| paused | boolean | false | Freezes the drift; interaction still responds. |
| className | string | "" | Extra class for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Iridescence.jsx and Iridescence.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: folds drift and morph while idle; dragging the cursor bends the folds along the stroke and they relax back; clicking spins a vortex that winds up and decays without popping; six rapid clicks stay capped; parallax shift and sheen follow the eased pointer and fade on leave; color as array and as CSS string both tint; scale/detail/rotation/warp/hueShift/saturation/brightness/contrast/grain/fade/opacity all take effect; paused freezes drift but stirring still moves; prefers-reduced-motion freezes drift and disables stirring/swirls without errors; WebGL2 missing leaves an empty layer with no console spam; resize and resolution changes re-render; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
