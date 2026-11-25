Implement the "LiquidChrome" component from zero: soft ribbons of liquid chrome swirling through a dark pool — a procedurally warped metal sheet shaded by a virtual studio (key light, side strip, ground bounce, rim band), cresting into sharp specular folds — whose surface is a real fluid: the cursor drags depressions along its path, clicks press deeper dents, and the resulting waves ripple the reflections. The whole sheet also tilts with the cursor so the studio lights slide across the metal. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: LiquidChrome.jsx (entry, fluid sim, shading) and LiquidChrome.css (container class liquid-chrome position relative 100% × 100% overflow hidden; canvas class liquid-chrome__canvas absolute inset 0 aria-hidden). React >= 18; no runtime dependencies. No iframe.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. Pixel ratio = min(devicePixelRatio, maxDevicePixelRatio clamped 0.5–3, sqrt(2.4e6 / (cssWidth × cssHeight))) — a 2.4-megapixel budget. One fullscreen triangle from gl_VertexID.
- Programs: CHROME always; SIM + SLOPE only when EXT_color_buffer_float exists (without it the interactive ripples are skipped and only the procedural waves render). Context loss is prevented and halts; restoration rebuilds via a generation bump (intro plays once).

## Procedural chrome sheet

- The fragment shader warps uv (in units of min(canvas side)) through up to 8 coupled sine octaves (detail clamped 1–8, default 4): p.x += amplitude/i × cos(i × frequencyX × p.y + time), p.y likewise with frequencyY, tracking the analytic row derivatives (rowX/rowY) with per-octave softening exp(0.3 − 0.3i). phase = time − p.x − p.y.
- Crest profile: sn = sin(phase), k = 5 / (3 × thickness) (thickness clamped 0.25–4); bevel = (1 − tanh(k·sn)²)/tanh(k); slope = k·cos(phase)·bevel × depth × presence × fade × across, where across is the normalized flow direction and fade guards against sub-wavelength aliasing.
- Studio environment, sampled along the reflected ray r with a blur term: three soft-box lamps — key at (−0.25, 0.42) size 0.3 × 0.12, side strip at (0.48, 0.12) size 0.06 × 0.3, ground bounce at (−0.1, −0.55) size 0.45 × 0.06 — a warm rim band at reflected-radius 1, a near-black pool base with a faint vertical lift, and a wall streak beyond radius 1.25; shade() applies Schlick Fresnel with f0 = mix(white, tint, slope steepness) × 0.92. Motion blur: when the sweep/derivative bend exceeds 0.01, four jittered samples along the sweep average the shading.
- uShift (from the tilt springs) slides the environment as the sheet tilts, weighted by smoothstep(0.3, 1, radius). Tone map: ACES, gamma 1/2.2, ±0.5/255 dither; alpha = smoothstep(0, 0.1, slope length) so flat areas stay transparent; output premultiplied.

## Fluid simulation (cursor ripples)

- A wave-equation grid at 1 texel per 4 CSS px (clamped 16–512 per axis), two RG16F ping-pong state textures (current height, previous height) plus a slope texture. Step at a fixed 1/120 s (max 4 steps per frame): next = h + (h − hPrev) × 0.982 + 0.3 × laplacian(h) + 0.08 × (laplacian(h) − laplacian(hPrev)), damped ×0.998.
- Strokes inject a Gaussian impulse along a segment (the pointer's travel since the last sample): pointer moves with travel > 0.25 cells push strength −min(0.45, 0.04 + travel × 0.045) × rippleSize at radius 4 × rippleSize; clicks press −1.6 × rippleSize at radius 6 × rippleSize; queue caps at 6 strokes. rippleStrength (floored 0) scales how much the sim slope feeds the shading: slope += simSlope × rippleStrength × 2.2, sampled bicubically (16-tap Catmull-Rom weights).
- Each frame the SLOPE pass writes central differences of the height field for the chrome shader. energy tracks activity (×0.982^steps) so the loop sleeps when the pool settles.

## Tilt & presence

- view yaw/pitch follow either the cursor (yaw ±0.35 × tilt, pitch ∓0.28 × tilt, from the clamped −1..1 pointer position) or, when idle, a slow sway (0.22·sin(1.3t), 0.16·sin(0.9t + 1.7)) — scaled by tilt (floored 0; 0 pins the lights). Springs: stiffness 36, damping 0.95 × critical, integrated per frame.
- presence (intro, 1.8 s) ramps amplitude and slope weight with 1 − (1 − presence)³ so the sheet fades in with its folds.

## Timing & lifecycle

- time starts random in 0–40 (instances desync) and advances dt × speed (×0.25 under reduced motion). dt clamped to 0.05 s.
- Frame loop self-sleep: busy while speed > 0, presence < 1, the view springs are settling (velocity or error > 1e-4), sim energy > 0.002, or strokes are queued; otherwise rendering stops and wakes on pointermove/down, resize (ResizeObserver — reallocates canvas, sim grid, and targets), visibilitychange or viewport re-entry (IntersectionObserver).
- Listeners: window pointermove/pointerdown/pointerup/pointercancel (passive; non-mouse pointerup counts as leaving), documentElement pointerleave. interactive off disables strokes but keeps the idle sway and tilt; reduced motion disables strokes and pointer tilt (reach 0) and slows time.
- Unmount: cancel the frame, disconnect both observers, remove all listeners and canvas context listeners, delete sim targets and slope target, VAO and programs when the context is not lost. Same-page instances are independent. A layout effect re-renders on every prop change.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string \| number[] | "#ffffff" | Tint of the chrome; hex 3/6, rgb(), or a 0–1 rgb array (converted to linear). |
| speed | number | 0.2 | Fold travel pace, floored at 0. |
| amplitude | number | 0.3 | Fold height, clamped 0–2. |
| frequencyX | number | 3 | Fold frequency along y, floored at 0.1. |
| frequencyY | number | 3 | Fold frequency along x, floored at 0.1. |
| detail | number | 4 | Warp octaves, clamped 1–8. |
| thickness | number | 1 | Crest sharpness, clamped 0.25–4 (lower is sharper). |
| depth | number | 1 | Slope strength of the folds, floored at 0. |
| roughness | number | 0.3 | Studio env blur, clamped 0–1. |
| exposure | number | 1 | Final exposure before tonemap, floored at 0. |
| interactive | boolean | true | Cursor strokes and tilt. |
| rippleStrength | number | 1 | How strongly fluid waves bend the reflections, floored at 0. |
| rippleSize | number | 1 | Wave scale of strokes, clamped 0.2–4. |
| tilt | number | 1 | Studio light shift from the cursor, floored at 0. |
| intro | boolean | true | 1.8 s fade-in of the folds. |
| lightMode | boolean | false | Ink-on-light studio variant. |
| maxDevicePixelRatio | number | 2 | Pixel ratio cap, clamped 0.5–3. |
| className | string | "" | Extra class for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of LiquidChrome.jsx and LiquidChrome.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: ribbons of chrome swirl with bright specular crests and read as metal (key/side/ground/rim all visible); dragging carves a trail that ripples the reflections and settles; clicking presses a dent that spreads; tilt slides the lights with spring momentum and returns on leave; color/exposure/roughness/thickness/depth/amplitude/frequencyX/frequencyY/detail all take effect; rippleStrength 0 disconnects the fluid; without EXT_color_buffer_float the component still renders (static ripples only) without errors; lightMode prints a readable bright-page variant; speed 0 freezes the drift; reduced motion slows time and disables strokes and tilt; offscreen and hidden stop the loop; context loss/restoration recovers; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
