Implement the "PlasmaWave" component from zero: two ribbons of plasma light curling through each other in the dark, each an undulating glowing tube with a white-hot core, rendered by raymarched signed-distance fields with real bloom. The ribbons wobble along their length at two independent speeds, the cursor makes them swell like a hand passing through plasma, and a lens of light follows the pointer. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: PlasmaWave.jsx (entry, shaders) and PlasmaWave.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `plasma-wave-container` (position relative, width 100%, height 100%, overflow hidden); `className` appends and remaining props spread onto it. The only child is a `<canvas class="plasma-wave-canvas" aria-hidden="true">` (position absolute, inset 0, display block, width/height 100%). The host gives the container its size; the canvas is transparent over the host's own background.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. Offscreen targets use RGBA16F when EXT_color_buffer_float exists (else RGBA8, with the HDR range scaled by 0.25 and re-multiplied on composite). If the context or any of the five programs fails, the component silently renders nothing.
- Five programs: `coarse` (full trace at 1/3 resolution), `fine` (edge-aware refinement), `down`/`up` (4-level bloom pyramid), `composite` (final). All draw one big triangle `(-1,-1) (3,-1) (-1,3)` from a single VAO. Fine pass re-traces only where the coarse alpha varies (max cell alpha > 0.02 and min < 0.4), otherwise bilinearly copies the coarse cell — full quality at the ribbons, cheap elsewhere.
- Pixel budget: fine target = CSS size × quality (clamped 0.25–1), shrinking past 2.4M pixels; coarse is fine ÷ 3. Output canvas DPR = min(dpr || devicePixelRatio, 2).

## Ribbon trace

- Camera: pixel coordinates centred on the view, rotated by `rotation` (degrees → radians), perspective via `normalize(vec3(coord / viewHeight, focalLength))` from origin `(0, 0, -7)`; `xOffset`/`yOffset` shift the framing in pixels.
- Two tubes, each an SDF `|p.yz - centre(x)| - thickness`, traced in 14 sphere-marching steps (step × 0.7, early exit on hit or d > 300). Tube centres: `a = sin((x, x+π/2) + t·speed1) × wobble1`, `b = cos((x, x+π/2) + t·speed2·dir2) × wobble2`, both offset `x - 15` so they pass through the frame; `dir2 = -1` runs the second ribbon against the first. `t = time × π`, with base sub-times 0.7t and 0.9t so the two ribbons never sync.
- Wobble amplitudes: `wobble1 = bend1 + swell + sin(t1 + 0.8x) × 0.1`, same shape for 2; the cursor "swell" term is a gaussian in x around the pointer with width 1.4, adding 0.16 + 0.2 × bend — the plasma bulges where you point. During the intro both bends scale by 0.3 + 0.7 × presence, easing the ribbons up to full amplitude over 1.8s.
- Shading: the march leaves a distance field `s` and per-tube distances `k.x/k.y`; raw light = `max(cos(d·τ) - s·√d - vec3(k), 0)` (r = field, g/b = per-tube closeness), remixed (`raw × 0.4 + raw.brg × 0.6 + raw²`) and luma-weighted. Base colour mixes color1/color2 by inverse tube distance. Soft glow = smoothstep(0.03, 0.36, field) × luma × 2.6; white-hot core = smoothstep(0.32, 0.8, field) × mix-to-white(0.55) × core × 2. Both colors parse through a 1px canvas probe into linear space and cache per string; missing colours fall back to `#A855F7` / `#06B6D4`.
- Bloom: fine target downsampled through 5 levels (4×4-tap box), up-blended back through 4 levels (12-tap tent + base) — the halo around the ribbons.
- Composite: exposure = 2.4 × brightness / range; bloom adds with weight glow × (0.18 + lens × 0.08); a lens gaussian (sigma² = 0.045 of view height²) centred on the pointer lifts both ribbons and bloom by up to +35%; film grain (hash × grain, default 0.03); edge fade mask over fade × 0.5 of each side; Reinhard-style `1 - exp(-hdr)` tone map, alpha = max channel.
- Light mode: hue-normalised ink — saturation-min reduced, tone-mapped by luminance so the ribbons print as coloured ink lines with a thin halo on white; the alpha follows the ribbon's field with a fwidth-feathered edge.

## Interaction, performance & lifecycle

- Pointer heat: while inside (and not reduced), the swell centre eases toward the pointer-projected coordinate at 6/s; heat engages through a critically-damped spring (stiffness 120, damping 19, clamped 0–1.15). The lens position follows the pointer at 8/s. Heat also feeds the composite lens.
- Settings are mirrored into a ref every render; a per-render wake re-renders once (and re-runs resize when `quality` or `dpr` changed) so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: frames continue only while motion is running or heat/intro is settling. Wake sources: window pointermove (passive), documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: time freezes, intro snaps to done, swell and lens are disabled; a static frame remains.
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete every target texture/framebuffer, all five programs, buffer and VAO, and lose the GL context if the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | [string, string] | ["#A855F7", "#06B6D4"] | Ribbon colours; the first tube uses [0], the second [1] (falling back to [0], then the defaults). |
| speed | number | 1 | Master time multiplier; 0 freezes the motion. |
| speed1 | number | 0.05 | Wave phase speed of the first ribbon. |
| speed2 | number | 0.05 | Wave phase speed of the second ribbon. |
| dir2 | number | 1 | 1 runs the second ribbon with the first, -1 against it. |
| bend1 | number | 1 | Curl amplitude of the first ribbon. |
| bend2 | number | 0.5 | Curl amplitude of the second ribbon. |
| thickness | number | 0.3 | Tube radius, floored at 0.02. |
| focalLength | number | 1.25 | Perspective strength; smaller is wider. |
| rotationDeg | number | 0 | Rotates the whole scene in degrees. |
| xOffset | number | 0 | Framing shift on x, in px. |
| yOffset | number | 0 | Framing shift on y, in px. |
| brightness | number | 1 | Overall exposure multiplier. |
| glow | number | 1 | Bloom halo strength. |
| core | number | 0.6 | White-hot core intensity, 0–1. |
| grain | number | 0.03 | Film grain amount, ≥0. |
| quality | number | 1 | Render resolution scale, 0.25–1. |
| mouseInteraction | boolean | true | The ribbons swell under the cursor and a light lens follows it. |
| intro | boolean | true | The ribbons grow to full amplitude over 1.8s on mount. |
| fade | number | 0 | Softens the container edges, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Prints the ribbons as ink lines for light backgrounds. |
| paused | boolean | false | Freezes motion but keeps the last frame visible. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of PlasmaWave.jsx and PlasmaWave.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: two distinct ribbons curl through each other with glowing cores; speed1/speed2/dir2/bend1/bend2 reshape them live; the cursor makes a local swelling bulge and the lens brightens around it, both relaxing smoothly; colors[0]/colors[1] recolor the tubes independently; thickness, focalLength, rotationDeg, xOffset/yOffset reframe correctly; bloom and core respond to glow/core/brightness; lightMode prints legible ink on white; paused keeps the frame; prefers-reduced-motion shows a static frame; coarse-to-fine refinement shows no blocky seams at the ribbons; large canvases stay within the pixel budget; hiding the tab or leaving the viewport stops the loop and it resumes; resize keeps the framing; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
