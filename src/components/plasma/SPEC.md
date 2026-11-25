Implement the "Plasma" component from zero: a volumetric render of folds of satin light twisting slowly through darkness, like fabric caught in a dark room. The folds rise, twist around a central axis and shimmer with bright highlight bands; the whole volume orbits gently toward the cursor, and the region under the cursor heats up and glows. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Plasma.jsx (entry, shaders) and Plasma.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `plasma-container` (position relative, width 100%, height 100%, overflow hidden); `className` appends and remaining props spread onto it. The only child is a `<canvas class="plasma-canvas" aria-hidden="true">` (position absolute, inset 0, display block, width/height 100%). The host gives the container its size; the canvas is transparent so the effect sits on the host's own background.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. If the context or either program fails, the component silently renders nothing.
- Two programs. Both draw one big triangle `(-1,-1) (3,-1) (-1,3)` from a single VAO. The volume pass raymarches the satin field into an offscreen texture (RGBA16F when EXT_color_buffer_float is available, RGBA8 otherwise, LINEAR filtering, clamp to edge); the composite pass tone-maps it onto the default framebuffer. In 8-bit mode the volume pass writes sqrt-encoded values plus ±½/255 hash dither to avoid banding, and the composite decodes by squaring and un-squashing `e/(1-e)`.
- Volume texture budget: scale = quality (clamped 0.25–1) times CSS size; if width × height × scale² exceeds 1.6M pixels the scale shrinks to fit, so the raymarch cost stays bounded on large canvases. DPR for the output canvas = min(dpr || devicePixelRatio, 2).

## Volume raymarch

- Camera ray: pixel coordinates scaled to CSS space, centred, divided by zoom; ray direction `normalize(vec3(c, viewHeight))` from origin `(0, 0, -4)`. An orbit matrix (yaw around Y, pitch around X) rotates both origin and direction — this is how the volume "turns".
- March: 60 steps. Each step samples a twisted shell around the y-axis: the xz-plane rotates by `p.y × twist - time` (2D rotation built from a single `mat2(cos(...))` trick), and `p.x` is displaced by `wave × (1 + p.y) × sin(time + 0.1x) × cos(0.34·time + 0.05x)` — the rising, waving fold motion. Shell distance `= |length(q) - 0.25 × (5 + y)| / 3` keeps the march stable around an expanding funnel; step length = shell + 0.0008.
- Density accumulation per step: weight = (1 + sin(phase + 8)) × exp(-shell × sharpness) × stepLength, where phase mixes y, z and the bend offset; `band` accumulates the same weight gated by `0.5 + 0.5 sin(phase × 0.5 + 1)` — the alternating satin sheen. sharpness = 100 - softness × 90, so softness 0 is wispy and 1 is dense. Time advances clock × 0.4; `direction` "reverse" negates it, "pingpong" eases back and forth over a 10-second span with smoothstep easing; during the intro the time is additionally offset by (1 - presence) × 1.4 so the folds emerge from deeper in the field.

## Composite

- Density gain = 4.8 × brightness × presence; band ratio = band/density picks the highlight tint: tint = mix(color, highlight, band × 0.35), where highlight is the base colour lifted 85% toward white in linear space. HDR color = tint × density + highlight × density² × shine.
- Cursor heat: a gaussian around the pointer position (sigma² = 0.05 in normalized units) raises local density by up to +35% — moving the cursor across the folds makes them flare.
- Tone mapping: level = 1 - exp(-peak); "hot" pixels (peak 1–3) blend 60% toward white. Gamma-corrected (pow 1/2.2), film grain (hash noise × grain amount, default 0.04) added scaled by level, edge fade mask over fade × 0.5 of each side, premultiplied alpha = max channel.
- Light mode: prints the volume as ink — colour mixes toward white on hot pixels, density drives a pow-0.8 alpha so the folds read as layered grey-violet ink washes on a light page.
- The ink colour for light mode derives from `color`: depth = min(1, 0.16 / luminance), then pow 1/2.2 per channel, keeping the printed tone in the same hue family.
- `color` accepts any CSS colour, parsed once through a 1px canvas probe into linear space (pow 2.2 per channel) and cached per string; unparsable falls back to a soft grey-lavender default.

## Interaction, performance & lifecycle

- Pointer orbit: while the pointer is inside, target yaw = (px/width - 0.5) × 0.9 rad and pitch = (py/height - 0.5) × 0.18 rad; away from the pointer both targets return to 0. Angles integrate a spring (stiffness 40, damping 11) so the volume swings with inertia. Heat strength eases in at 4/s and out at 2/s; the heat centre follows the pointer at 8/s.
- Settings are mirrored into a ref every render; a per-render wake re-renders once (and re-runs resize when `quality` or `dpr` changed) so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: frames continue only while motion is running (not paused, not reduced) or the orbit/heat/intro is still settling; otherwise it stops. Wake sources: window pointermove (passive), documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: time freezes, intro snaps to done, orbit and heat are disabled; the field renders as a static frame.
- Intro: presence rises 0→1 over 1.6s, eased with smoothstep of the square; it scales density gain, bloom of highlights and the time offset together, so the fabric fades in while drifting into place.
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete texture/framebuffer/programs/buffer/VAO, and lose the GL context if the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#a6a3b8" | Satin colour; any CSS colour, unparsable falls back to the default grey-lavender. |
| speed | number | 1 | How fast the folds twist and rise; 0 freezes the motion. |
| direction | "forward" \| "reverse" \| "pingpong" | "forward" | Time direction; pingpong eases back and forth over a 10s span. |
| scale | number | 1 | Camera zoom; smaller pulls back, ≥0.1. |
| twist | number | 1 | How tightly the folds spiral around the axis. |
| wave | number | 1 | Horizontal waving of the folds, ≥0. |
| softness | number | 0.5 | 0–1; low is wispy threads, high is dense satin. |
| shine | number | 1 | Strength of the bright highlight sheen. |
| brightness | number | 1 | Overall exposure multiplier. |
| grain | number | 0.04 | Film grain amount, ≥0. |
| quality | number | 0.75 | Volume render resolution scale, 0.25–1. |
| mouseInteractive | boolean | true | The volume orbits toward the cursor and heats under it. |
| intro | boolean | true | The folds fade in and drift into place over 1.6s on mount. |
| fade | number | 0 | Softens the container edges, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Prints the volume as ink washes for light backgrounds. |
| paused | boolean | false | Freezes motion but keeps the last frame visible. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of Plasma.jsx and Plasma.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: folds twist and rise continuously; direction forward/reverse/pingpong all behave; twist, wave, softness and shine reshape the fabric live; the volume leans toward the cursor with inertia and flares under it, then relaxes; scale, brightness, grain, quality, fade and opacity all respond; lightMode prints legible ink on white; paused keeps the frame; prefers-reduced-motion shows a static frame with no orbit or heat; large canvases do not exceed the volume pixel budget and stay smooth; hiding the tab or leaving the viewport stops the loop and it resumes; resize keeps the framing; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
