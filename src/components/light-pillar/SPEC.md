Implement the "LightPillar" component from zero: a slowly orbiting pillar of light standing in dark space — a raymarched vortex of glowing bands that rise and twist — igniting on load with a sweep of brightness, leaning and shifting toward the cursor, and answering clicks with rings of light that race up the pillar axis. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: LightPillar.jsx (entry, march + composite pipeline, pointer/pulse state) and LightPillar.css (container position absolute inset 0 100% × 100% overflow hidden — the host provides a positioned, sized box; canvas absolute inset 0 aria-hidden). React >= 18; no runtime dependencies. No iframe.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. webglcontextlost is prevented; webglcontextrestored rebuilds the pipeline via a generation state bump. The container style defaults to mix-blend-mode "screen" (prop mixBlendMode, default "screen"); the composite pass outputs opaque pixels designed for screen blending over dark backgrounds.
- One oversized triangle in a VAO; two programs: MARCH renders the pillar into an offscreen texture at a reduced scale, COMPOSITE upscales and finishes to the screen.

## March pass

- Renders at view size × scale, where scale = clamp(resolution ?? quality preset, 0.25, 2); quality presets: low 0.35, medium 0.5, high 0.6 (default high). A performance governor multiplies scale: after 20 consecutive slow frames (dt > 1/40 s) it drops ×0.85 down to a floor of 0.5 × base; after 180 consecutive fast frames (dt < 1/55 s) it recovers ×1.1 toward 1. The offscreen texture is RGBA16F when EXT_color_buffer_float exists, otherwise RGBA8, with full mipmaps ( regenerated each frame when bloom > 0).
- Raymarch: 80 steps from a camera orbited around the pillar by angle = clock × 0.3 + spin; uv.x shifted by shift and rotated by pillarRotation + lean degrees; q.y = p.y × pillarHeight + time (the pattern rises); then up to detail (1–6, default 4) octaves of domain warp — q.xz rotated by twist each step, q += cos(q.zxy × freq − time × 2j) with freq doubling and amplitude halving. Field d = |length(cos(q.xz)) − 0.2| fused with the cylinder bound |p.xz| − pillarWidth via a smooth max (h² × 0.015625), then |d| × 0.15 + 0.01 as the step.
- Accumulation: glow += 1/d; lift += clamp((15 − p.y)/30, 0, 1)/d. Colour = tanh((bottomColor × glow + (topColor − bottomColor) × lift) × glowAmount / widthNorm) with widthNorm = pillarWidth (during intro the effective width grows 0.3 → 1); alpha = smoothstep(0.62, 1, peak).
- Clock advances dt × 0.96 × rotationSpeed (0 freezes the orbit) and the noise time also flows × flow; paused freezes both.

## Composite pass

- Upsamples the field with a 16-tap bicubic; bloom (> 0) adds a halo from mip levels 3–6 (weights 0.3/0.3/0.25/0.15 of alpha) tinted by the normalized level-4+5 chroma, screen-blended at bloom × 1.1.
- Click pulses (up to 3, oldest dropped): each stores an axis coordinate (click position projected on the tilted pillar axis) and an age; the band centre races outward at 1.7 axis-units/s, envelope exp(−age/0.63); boost = Σ exp(−((axis − band)/0.24)²) × envelope, plus the intro flare head; col += mix(col, luminance, 0.45) × boost × 1.8 — rings of light sweep along the pillar. Pulse life 3.1 s.
- Film grain subtracts a hash noise × noiseIntensity; result × intensity × (0.15 + 0.85 × rise) × (1 + 0.12 × touch) clamped 0–1. fade (0–1) applies a smootherstep edge mask.
- Intro (2.1 s, eased): the pillar's width grows in, intensity rises with rise = easeOut, and a reveal front sweeps along the pillar axis (mask smoothstep(reveal, reveal − 0.9, axis)) with a bright flare head (× 1.3, gated to the first eighth of the intro) — the pillar ignites from one end to the other.
- Light mode: designed for light pages — energy coverage prints the pillar as coloured ink; a neutrality probe measures the chroma of top/bottom colours and, when both are near-grey (chroma < 0.08), prints dark ink instead (tinted vs ink mixed by uNeutral).

## Interaction

- interactive on: pointer.x mapped to −0.5..0.5 drives spin (± 0.7 orbit), lean (± 9°) and shift (± 0.35 aspect), eased at 1 − exp(−dt × 2.4); touch eases the accompanying brightness (+12%). pointerleave returns everything to centre.
- clickPulse on: pointerdown inside spawns a pulse at the clicked axis position; reduced motion disables pulses and the lean.
- Listeners: window pointermove/pointerdown (passive), documentElement pointerleave, document visibilitychange; ResizeObserver and IntersectionObserver (offscreen stops rendering, re-entry resets dt and wakes).

## Performance & lifecycle

- Frame loop self-sleep: busy while the orbit runs (rotationSpeed ≠ 0, not paused/reduced), the intro is pending, pulses are alive, or spin/touch are still easing; otherwise rendering stops with the last frame painted. dt clamped to 0.05 s.
- Canvas pixel ratio = min(devicePixelRatio, 2); the field texture re-allocates only when its size changes.
- Unmount: cancel the frame, remove context listeners, disconnect both observers, remove all pointer/visibility listeners, delete texture/framebuffer, both programs, buffer and VAO, and drop the context via WEBGL_lose_context when the canvas is detached. Same-page instances are independent. A layout effect re-renders on every prop change so settings apply instantly.
- Reduced motion: intro snaps to done, clock freezes, lean/pulses disabled — a static pillar renders on demand.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| topColor | string | "#5227FF" | Colour at the pillar's upper reach; any CSS colour. |
| bottomColor | string | "#FF9FFC" | Colour at the base; any CSS colour. |
| intensity | number | 1 | Final brightness multiplier, floored at 0. |
| rotationSpeed | number | 0.3 | Camera orbit speed; 0 freezes the orbit. |
| flow | number | 1 | Speed of the internal noise flow. |
| interactive | boolean | true | The pillar leans and shifts toward the cursor. |
| clickPulse | boolean | true | Clicking sends a light ring up the pillar axis (max 3). |
| glowAmount | number | 0.002 | Raymarch energy scale, floored at 0. |
| bloom | number | 0.5 | Halo strength from mip levels, floored at 0. |
| pillarWidth | number | 3 | Pillar radius in world units, floored at 0.05. |
| pillarHeight | number | 0.4 | Vertical stretch of the noise field. |
| pillarRotation | number | 25 | Tilt of the pillar axis, in degrees. |
| twist | number | 0.4 | Rotation of the noise domain per octave. |
| detail | number | 4 | Warp octaves, clamped 1–6. |
| noiseIntensity | number | 0.5 | Film grain strength, floored at 0. |
| fade | number | 0 | Edge fade fraction, clamped 0–1. |
| intro | boolean | true | 2.1 s ignition sweep on mount. |
| mixBlendMode | string | "screen" | Container blend mode. |
| quality | "low" \| "medium" \| "high" | "high" | Render scale preset (0.35 / 0.5 / 0.6). |
| resolution | number | by quality | Explicit render scale, clamped 0.25–2; overrides quality. |
| lightMode | boolean | false | Ink output for light pages (auto dark ink for grey palettes). |
| paused | boolean | false | Freezes orbit and flow; interaction still renders. |
| className | string | "" | Extra class for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of LightPillar.jsx and LightPillar.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the pillar ignites with the sweep on mount and settles into a slow orbit; cursor lean and shift follow with easing; click rings race along the axis and decay, three max; topColor/bottomColor gradients, intensity, glowAmount, bloom, pillarWidth/Height/Rotation, twist, detail, noiseIntensity, fade all take effect; quality/resolution changes rescale the field; light mode prints readable ink on white (dark ink for near-grey palettes); paused freezes the motion but interaction renders; prefers-reduced-motion renders a static pillar without errors; context loss stops rendering and restoration rebuilds; offscreen and hidden stop the loop; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
