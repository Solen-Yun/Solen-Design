Implement the "FluxLines" component from zero: a full-bleed field of glowing magnetic flux lines — fine luminous filaments tracing a churning fluid, revealed only near a cursor magnet that bends and curls them as it passes, with click bursts twisting the whole weave into a vortex. Two output styles: additive light lines on a dark canvas and a light-page ink mode. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Two files: FluxLines.jsx (entry, GL setup, pointer state) and FluxLines.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="flux-lines-container">` (plus caller className and style; an optional mixBlendMode prop merges into the inline style), position relative, width 100%, height 100%, overflow hidden; its only child is `<canvas class="flux-lines-canvas" aria-hidden="true">`, absolute inset 0 at 100%/100%. The host owns the size.
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. If the context or program fails, the effect silently does not start. One VAO with a 3-vertex big triangle covers the clip space; no per-frame buffers. DPR clamped to 2.
- One program. The fragment field combines value noise `vn` (bilinear sinlerp-interpolated cell hashes) into a five-offset blended noise `dbn`, an exponential soft-min `smin`, and a hash-based palette.

## Line field

- Reference lattice: `ref = 700 / scale`; space `p = frag / resolution.y × ref`.
- Pointer magnet: coordinates relative to the magnet centre, normalized by resolution height; `pull = strength × exp(−dot(d,d)/radius²)` rotates the fragment around the magnet by `pull × 0.55` radians — lines bend toward the cursor. Click swirls rotate fragments around their centre by an angle `twist` that spikes to 1.9 rad over 0.23 s and decays exponentially (`exp(−(age−0.23) × 1.1)`), with reach growing to `height × 0.22 × (1 + age × 0.5)`; swirls expire at age 6.
- Two counter-drifting ridge systems: `peaks = dbn(p + distort1 + dir × (t × speed × 100), 40, seed A)` and `peaks2 = dbn(p + distort2 − dir × (t × speed × 100), 40, seed B)`, each distorted transversally by value noise (amplitudes `50 × turbulence` and `100 × turbulence`, cell sizes 60/120) drifting with the flow; the field is their soft-min with smoothness = fluidity.
- Emission: `gap = |field − 0.4|`; slope from screen-space derivatives; `band = 5 × rimWidth × (1 − max(gap/halfBand, pixels/maxHalf))` — an anti-aliased ribbon hugging the flux contour. Shimmer adds drifting noise masked 75% where the magnet reveals; `glow = pow(lit, sharpness) × glow × (1 + reveal × 0.25)`; an optional crisp core line (`lineWidth`, width in device pixels) draws where `pixels` crosses the contour, gated by glow or magnet reveal. Energy = `max(shine², core × 0.85) × reveal`.

## Colour & output

- Palette: up to 8 colors (extra dropped, empty falls to white), interpolated along `h = 0.5 + (peaks − peaks2) × 0.8` with smoothstep segment blending — the two ridge systems cross-fade the palette.
- Dark output (default): additive `tint × energy × opacity`; transparent mode writes premultiplied alpha from the max channel; opaque mode adds onto backgroundColor (parsed via a cached 1×1 canvas probe; default deep #12101 7-ish dark).
- Light mode: chroma-aware ink — near-white tints collapse to a fixed ink #121214, chromatic tints deepen to 55%; cover = energy × opacity composited over the background (white default) in opaque mode.
- Reveal: intro eases 0→1 over 1.8 s (smoothstep of smoothstep), skipped when intro=false or reduced motion.

## Pointer, timing & lifecycle

- Magnet target eases toward the pointer with time constant mouseDampening seconds (0 = snap); its strength eases in/out at time constant 0.3 s and snaps within 0.001. Engaged = mouseInteraction && pointer inside. Pointer position is tracked on window (passive move/down/up/cancel), converted to canvas pixels with y flipped; pointerleave on documentElement clears inside; touch releases inside on pointerup.
- Flow: `time += dt × (paused || reduced-motion ? 0 : 1)`, dt clamped 0.5–50 ms.
- Frame-loop self-sleep: the loop keeps requesting frames only while motion is on, the magnet strength is still easing, the intro reveal is unfinished, or a swirl is younger than 6 s; otherwise it stops, and any pointer event, visibility change, resize, intersection re-entry or prop change wakes it. Prop changes re-render one frame immediately.
- Resize: ResizeObserver on the container; ratio = min(dpr prop || devicePixelRatio, 2); a dpr prop change re-resizes.
- IntersectionObserver pauses off-screen; document hidden pauses; reduced motion freezes flow, disables the intro and click swirls (the magnet still eases and reveals lines).
- Unmount: cancel the frame, disconnect observers, remove all listeners, delete program/buffer/VAO, force-lose the context when the canvas is detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#ffffff", "#ffffff", "#ffffff"] | Filament palette, up to 8 entries blended along the field. |
| speed | number | 0.5 | How fast the flux churns; 0 freezes it. |
| scale | number | 1.6 | Field zoom; higher packs the lines tighter. |
| turbulence | number | 1 | Transverse distortion of the ridges. |
| fluidity | number | 0.1 | Soft-min smoothness; higher merges the two ridge systems more. |
| rimWidth | number | 0.2 | Width of the glowing ribbon around each contour. |
| sharpness | number | 2.5 | Falloff exponent of the glow. |
| shimmer | number | 1.5 | Drifting brightness modulation along the lines. |
| glow | number | 2 | Overall emission strength. |
| lineWidth | number | 1 | Crisp core line width in px; 0 disables it. |
| flowDirection | "up" \| "down" \| "left" \| "right" | "down" | Axis the field drifts along. |
| opacity | number | 1 | Line opacity, clamped 0–1. |
| mouseInteraction | boolean | true | The cursor magnet bends and reveals nearby lines. |
| mouseStrength | number | 1 | Magnet pull strength, floored at 0. |
| mouseRadius | number | 0.35 | Magnet influence radius (fraction of height), floored at 0.01. |
| mouseDampening | number | 0.15 | Magnet follow lag in seconds; 0 snaps. |
| clickSwirl | boolean | true | Clicking twists the field into a decaying vortex. |
| intro | boolean | true | Fades the lines in over 1.8 s on mount. |
| lightMode | boolean | false | Ink-on-light rendering for light pages. |
| transparent | boolean | true | Transparent canvas; false composites over backgroundColor. |
| backgroundColor | string | - | Opaque backdrop colour (any CSS colour string). |
| paused | boolean | false | Freezes the drift but keeps interactions. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| mixBlendMode | CSSProperties["mixBlendMode"] | - | Blend mode merged into the container style. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of FluxLines.jsx and FluxLines.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: lines drift along all four flow directions and freeze at speed 0; the cursor magnet bends, brightens and reveals nearby filaments with dampened follow; clicking vortexes the weave and the twist decays smoothly; the palette cross-fades along the field and honours up to 8 colours; rimWidth/sharpness/shimmer/glow/lineWidth each change the rendering; lightMode prints legible ink on a white page; transparent=false composites over backgroundColor; paused freezes drift but keeps the magnet; reduced motion keeps static lines with a working magnet and no intro/swirl; resize, tab-hide and off-screen never stretch or leak the loop; unmount leaves no listeners, GL objects or frames; 375 / 768 / 1440 wide without overflow.
