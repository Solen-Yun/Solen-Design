Implement the "GhostCursor" component from zero: a pointer-following ghost of glowing smoke. The smoke is a real simulated density field — it pours out along the cursor's path, curls with turbulent noise, drifts upward, gets brighter and denser near the head, and after the pointer stops it rises away and fades out. Clicking punches a soft puff of smoke with an outward push. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GhostCursor.jsx (entry, shaders, frame loop) and GhostCursor.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="ghost-cursor">` (plus any className): position absolute, inset 0, overflow hidden, pointer-events none. It is an overlay meant to be dropped inside a positioned host (a hero, a card, a section); it fills that host. If the host's computed position is "static", the component sets the host to position relative and restores the previous value on unmount. Root carries an inline zIndex (default 10).
- Inside is one `<canvas class="ghost-cursor__canvas">`: absolute, inset 0, 100% x 100%, aria-hidden, with an inline mix-blend-mode — "screen" on the dark theme, "normal" on the light theme, overridable through the mixBlendMode prop.
- WebGL2 context with alpha, premultipliedAlpha, antialias false; the EXT_color_buffer_float extension is required. If the context, the extension or any shader fails, the component silently renders nothing (no errors thrown, host layout untouched).
- Shaders (GLSL ES 300): one shared vertex shader feeding a fullscreen triangle (3 vertices covering the viewport, vUv derived from position); five fragment programs — sim, shade, down, blur, composite. One VAO + one static buffer, blending disabled, depth/stencil off.

## Smoke simulation

- The smoke lives in two ping-pong RGBA16F framebuffers at low resolution: sim scale = min(0.35, 220 / max(view width, height)), at least 16px. Channel r is smoke density, gb is the smoke's own velocity field.
- Each sim step (full-screen pass over the destination texture): advect the field backwards along flow = density velocity + curl noise + drift; curl noise is the rotational part of two gradient-noise octaves sampled at frequencies driven by size, offset over time; drift pushes smoke upward at drift * 110 * scale px/s. Density decays by exp(-dt / (0.12 + trailLength * 0.022)), velocity decays by exp(-dt * 2.4).
- Injection: a Gaussian capsule (erf-based, sigma = size * simScale * 0.3) is stamped along the segment from the ghost's previous to current position with strength 0.42 * presence, seeding both density and the pointer's velocity into the field; the current head position also receives density at 0.22 * presence per second. Values clamp at 6.0.
- Click puff (clickPuff): one queued puff per sim step — a Gaussian blob at the click point (radius sigma * 1.4, strength 0.9) plus an outward radial velocity kick proportional to the blob's gradient. Each queued puff is consumed on the next simulated frame.
- The sim keeps stepping only while the loop is awake; when the component goes to sleep the sim textures are cleared to zero.

## Shading, bloom & composite

- Shade pass: upsample the sim with bicubic (Catmull-Rom 4-tap) sampling plus an analytic Gaussian head highlight (strength 0.8 * presence, radius size * 0.38). Density is modulated by a 5-octave fbm smoke texture driven by two domain-warped fbm fields scrolling slowly over time (uDetail mixes between flat density and full wisp), so the smoke breaks into billows. A gradient-based normal gets directional lighting (light dir about (-0.35, 0.55, 0.75)), dense cores lift toward a brighter, whiter tint; the light theme instead renders pigment/ink: density becomes dark smoke with a slightly darkened core. Shade buffer resolution follows the pixel budget: scale = min(1, sqrt(targetPixels / (width * height))).
- Bloom: three mip levels. Down pass = 4-tap box filter; the first level applies bloomThreshold; blur = separable 3-tap linear weights at offsets 1.42 / 3.33 / 5.24 texels; composite mixes the levels with weights (1, 0.6 + 0.4 * bloomRadius, 0.25 + 0.75 * min(1, bloomRadius^2 * 0.5)) times bloomStrength.
- Composite to screen: dark theme — additive light: shade.rgb + bloom * bloomStrength, exposure tonemap 1 - exp(-c * 0.95), gamma 2.2, film grain (grainIntensity) as multiplicative sparkle plus a 1/255 dither, everything scaled by presence and a vignette whose strength is edgeIntensity. Light theme — coverage alpha: 1 - exp(-(alpha + bloom alpha * bloomStrength * 0.6) * 0.95) * presence * vignette, pigment recovered from the shade pass (premultiplied division), gamma corrected, grain modulating coverage. Empty pixels stay fully transparent.
- Colour parsing accepts 3/6-digit hex and rgb()/rgba() (case-insensitive); unparsable input falls back to the default lilac. Colours are converted to linear space (gamma 2.2) before use.

## Motion & interaction

- The ghost is a damped spring chasing the pointer: stiffness = 520 * (1 - inertia)^2 + 26, damping = 2 * sqrt(stiffness) * 0.92, integrated in 240Hz sub-steps while the pointer is inside; outside the host it glides with velocity damped by inertia^(dt * 60). inertia 0 snaps almost instantly, 0.99 floats lazily.
- Presence (global smoke opacity) targets 1 while the pointer has moved within fadeDelayMs and decays to 0 over fadeDurationMs once idle (ease rates 0.12s up / 0.08s down). Defaults: 1000/1500ms with a mouse, 500/1000ms on touch devices. Fading out leaves the smoke rising and thinning rather than popping.
- Intro (intro, desktop-class pointers): on first mount the ghost plays a 1900ms autonomous glide — after a 280ms delay it sweeps from 16% to 60% of the width at ~70% height with a sine bob, emitting smoke along the way, and hands off to the pointer when a real pointer move arrives. Suppressed entirely under prefers-reduced-motion and by intro={false}.
- Pointer tracking is on window (pointermove/pointerdown, passive) so the smoke reacts anywhere; positions are clamped/checked against the host rect, and leaving the document fades the ghost. All settings are read live from a ref, so prop changes apply on the next frame without remounting.
- prefers-reduced-motion: the intro glide is disabled; the smoke still follows and fades (motion is user-driven).

## Performance & lifecycle

- Frame loop self-sleeps: when there is no intro, no queued puffs, presence has settled to 0 and the idle fade is finished, the sim/shade targets are cleared, one final empty composite happens and the loop stops. It wakes on pointer move/down, resize, becoming visible, or any re-render.
- Visibility & resize: ResizeObserver re-allocates targets (canvas sized to host * DPR, DPR clamped to maxDevicePixelRatio 0.25–3, default 2); IntersectionObserver and document visibilitychange pause/resume the loop.
- Context handling: webglcontextlost stops the loop; webglcontextrestored re-initialises everything through a generation counter. On unmount all framebuffers, textures, buffers, programs and listeners are released, and once the canvas is detached the context is explicitly lost so GPU memory is freed. Same-page instances are fully independent.
- Sim and shade resolutions are budget-driven (targetPixels, floor 50000, defaults 600000 desktop / 300000 touch) so a large host costs the same GPU fill as a small one; touch devices are detected via ontouchstart / navigator.maxTouchPoints.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#B497CF" | Smoke colour (hex or rgb()/rgba()). |
| brightness | number | 1 | Overall glow brightness multiplier. |
| size | number | 80 | Size of the smoke head and injected trail, in px. |
| trailLength | number | 50 | How long the smoke lingers along the path, 1–200. |
| inertia | number | 0.5 | How lazily the ghost follows the cursor, 0–0.99. |
| turbulence | number | 0.5 | Curl-noise churn in the smoke, 0–2. |
| drift | number | 0.3 | Upward drift of the smoke, in px/s at 1. |
| detail | number | 1 | How much the fbm wisps break up the smoke, 0–1. |
| grainIntensity | number | 0.05 | Film grain over the final image, 0–1. |
| bloomStrength | number | 0.6 | Strength of the additive bloom. |
| bloomRadius | number | 1 | Spread of the bloom, 0–3. |
| bloomThreshold | number | 0.025 | Brightness cutoff where bloom picks up. |
| edgeIntensity | number | 0 | Vignette darkening at the host edges, 0–1. |
| clickPuff | boolean | true | Clicking punches a puff of smoke outward. |
| intro | boolean | true | Plays the autonomous sweep on first mount. |
| theme | "dark" \| "light" | "dark" | Dark renders glowing light, light renders ink smoke. |
| mixBlendMode | string | - | Canvas blend mode; defaults to "screen" (dark) or "normal" (light). |
| fadeDelayMs | number | - | Idle time before the smoke starts fading (default 1000, touch 500). |
| fadeDurationMs | number | - | Fade-out duration (default 1500, touch 1000). |
| maxDevicePixelRatio | number | 2 | DPR clamp for the canvas, 0.25–3. |
| targetPixels | number | - | Fill-rate budget for shading (default 600k, touch 300k). |
| zIndex | number | 10 | z-index of the overlay root. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of GhostCursor.jsx and GhostCursor.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: smoke pours along the cursor path, curls and rises; stopping the pointer lets it rise away and fade after the idle delay; clicking punches a puff; inertia low/high changes how tightly the ghost follows; bloom, grain, turbulence, detail, drift, size and trailLength each visibly do what they claim; dark theme glows additively over imagery while light theme reads as ink on paper; the intro sweep plays once and hands off to the pointer; WebGL missing leaves the page untouched with no console errors; prefers-reduced-motion skips the intro; prop changes apply live; resize, tab switch and scroll pause/resume cleanly; unmount releases every listener and GPU resource; several instances on one page run independently; 375 / 768 / 1440 wide hosts without overflow.
