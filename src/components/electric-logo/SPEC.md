Implement the "ElectricLogo" component from zero: any flat logo image is traced into a signed distance field and redrawn as a living lightning outline — 1–6 wobble strands of drifting noise ride the logo's silhouette, bowed jagged arcs leap between random edge points, a soft aura blooms around the shape, and the cursor supercharges everything nearby. Clicking fires a shockwave pulse that visibly warps the outline and flashes a burst of sparks. Changing `src` morphs the old silhouette into the new one. The whole effect is one additive WebGL2 fragment pass over CPU-precomputed distance and glow textures. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components (the default logo is an inline SVG data URI; supply your own via `src`).

## Structure & rendering

- Pure React + one small WebGL helper dependency (ogl ^1.0.11) for the renderer/program/mesh wrappers; two files only: ElectricLogo.jsx (entry, image tracing, distance transforms, one GLSL program) and ElectricLogo.css (one rule set). React >= 18. No iframe.
- Root is a `<div>` with class `electric-logo` plus `className`/`style`: position relative, width 100%, height 100%, overflow hidden. The canvas fills it, DPR = min(devicePixelRatio, 2, sqrt(4e6 / (width × height))) — a pixel budget caps huge containers.
- Context: WebGL2, alpha true, premultipliedAlpha true, antialias false. Without WebGL2 the component renders nothing (no canvas appended, no errors).
- Rendering is one fullscreen fragment pass. It reads, per logo "slot": a single-channel float SDF texture and a two-channel glow texture (tight + wide aura accumulators). Two slots ping-pong so `src` changes crossfade. `onRender(canvas)` fires after every rendered frame.
- Colour parsing accepts hex strings (3 or 6 digits, defaulting to white on garbage). `color` tints the arc cores and strand strokes; `glowColor` tints aura, sheaths and body bloom. Both ease to new values over ~0.35s.

## Logo tracing (CPU, once per src)

- The image is rasterised to fit 560px on its longest side and read into an alpha coverage map. If fewer than 1% of pixels are semi-transparent (a fully opaque photo), coverage is instead derived from colour distance against the average border colour — a 24-level ramp — so opaque logos still trace.
- Coverage is padded 25% + 2px and converted into an exact Euclidean distance transform (separable Felzenszwalb sweep, outside minus inside, sqrt of squared distances): a signed distance field where 0 is the silhouette edge.
- Edge points are extracted by marching every interior cell whose field ≤ 0 that borders a positive cell, projecting each onto the zero crossing along the field gradient, decimated to at most ~3000 points. These seed random arcs.
- Glow textures: coverage is splatted into a coarse grid (cell = 4 field px, padded 70% of the logo size) weighted by exp(−|field|/1.5), then box-blurred 3 passes at a tight radius (3.5% of logo size) and a wide radius (13%) producing the two aura channels.
- Tracing failures (empty image, zero coverage, tainted canvas) leave the slot empty and the canvas stays blank — no errors thrown.

## The lightning field (fragment pass)

- Sampling: the SDF is evaluated with bilinear fetch plus a clamped distance term, in the logo's pixel space (screen px mapped through fit/scale placement); during a morph the from/to fields are blended with a per-pixel eased weight wobbled by low-frequency noise, so the silhouette appears to boil while changing.
- Wobble strands (up to 6 rendered, `strands` sets the count, +2.5 transient while heated): each strand displaces the sample point through four octaves of gradient noise (analytic Jacobian keeps the distance gradient consistent), then computes the field distance. Strand 0 is the bright lead line; the others fade with a noise-driven visibility and a thickness taper. Each strand contributes a gaussian core coloured by `color` (softened toward `glowColor` in ink mode) plus a wide sheath scaled by `glow`; a slow per-strand swell modulates width, and `flicker` subtly breathes global intensity.
- Aura & body: the tight/wide glow channels paint a soft bloom scaled by `glow` and boosted up to +1.2× with heat; `fill` > 0 lights the interior, weighted by the tight aura so the body reads as an energised volume rather than flat colour.
- Arcs (up to 5 live): each arc is a segment between two random edge points (length 8–30% of the logo size), bowed perpendicular by 20–50% of its length toward whichever side is off-shape, jagged by 3 octaves of drifting noise along its length, tapered by sin(π·u), drawn in two layers (bright core + softer echo at 45% strength). Arcs live 0.35–0.8s with a sin envelope.
- Arc spawning: idle arcs spawn stochastically (rate ∝ `arcs` × `speed`) once presence > 0.8 and the shape is settled; cursor arcs spawn up to 3× more often, seeded within `cursorRadius` of the pointer when hovered; a click burst spawns up to 3 immediately around the click point (also requires arcs > 0 and no morph in flight).
- Pulses (click shockwaves, up to 3, 2s life): each pulse pushes the sample point outward along the radial direction with a gaussian ring front (width 10 units, wavelength 7.5 units, decaying exp(−age·1.7)), adds "surge" heat (+1.4, capped at 2 total) and a short flash. The wave physically bends nearby strands and arcs.
- Ink mode (`theme="light"`): the accumulated light is converted to subtractive ink — coverage from luminance, hue-preserving dark ink, cream cores in the hottest spots — over the page background; the additive path keeps HDR colours on dark. The mode crossfades over ~0.25s.
- Grain: a 1/255 hash dither is added to color and alpha to kill banding.

## Timing, interaction & lifecycle

- Presence fades in over 1.4s (smoothstep-squared) when the first traced shape arrives; all strand weight scales with it, arc envelopes with its square.
- Morph: a new traced shape loads into the free slot and crossfades over 1.6s (0.3s if another change queues mid-morph); sparks clear on switch.
- Hover: pointer position is spring-tracked (acceleration 120, damping 19) and eased power (in 0.3s, out 0.55s) scales heat — more strands, wider bend/crackle reach, brighter bloom — inside `cursorRadius` × `cursorIntensity`. Listeners: pointermove, pointerdown (pulse + burst), pointerleave, pointercancel, all on the container.
- Reduced motion: noise time is slowed to 0.2×, flicker is zeroed, clicks and spontaneous arcs are suppressed; the outline still renders and still responds to prop changes.
- The render loop keeps requesting frames while visible (an IntersectionObserver parks it off-screen; tab hidden pauses it). Unmount cancels the frame, disconnects observers, removes listeners, deletes textures/program/buffer, loses the context and removes the canvas; the image loader is cancelled if the src effect re-fires. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | inline bolt SVG data URI | The logo image to electrify. Flat shapes with transparency (or a flat background contrasting the shape) trace best. Changing it morphs between silhouettes. |
| color | string | "#ecc7ff" | Core colour of strands and arc cores. |
| glowColor | string | "#ad6dff" | Aura, sheath and body bloom colour. |
| scale | number | 0.7 | Logo size relative to the smaller canvas side. |
| intensity | number | 1 | Overall brightness gain. |
| glow | number | 1 | Aura and sheath strength. |
| thickness | number | 1.5 | Strand and arc line width in field units. |
| strands | number | 4 | Wobble strands riding the outline, 1–6. |
| bend | number | 0.6 | Amplitude of the large slow bends and ripples. |
| crackle | number | 1.5 | High-frequency jaggedness of strands and arcs. |
| arcs | number | 1 | Random arc spawn rate multiplier; 0 disables arcs. |
| flicker | number | 0.6 | Global brightness breathing. |
| fill | number | 0 | Interior glow amount, 0 keeps a pure outline. |
| speed | number | 2.5 | Noise/arc clock rate. |
| interactive | boolean | true | Enables cursor heat, cursor-arc spawning and click pulses. |
| cursorIntensity | number | 0.75 | Hover heat strength, 0–1. |
| cursorRadius | number | 100 | Heat falloff radius around the cursor in px. |
| theme | "dark" \| "light" | "dark" | Dark = additive emissive; light = subtractive ink over the page. |
| onRender | (canvas) => void | - | Called after every rendered frame with the canvas. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of ElectricLogo.jsx and ElectricLogo.css plus install steps and a usage example (pass your own logo via `src`); no ellipses, no "fill in the core yourself" placeholders.
- Validate: the default bolt traces into a crisp wobbling outline with aura; arcs leap between edge points and taper correctly; hovering raises strand count and brightness near the cursor; clicking warps the outline with a visible ring and flashes sparks; switching src morphs smoothly (and quickly when retargeted mid-morph); theme light renders readable ink on a white page; a fully opaque logo still traces via border-colour keying; a broken/empty src renders blank without errors; prefers-reduced-motion slows the boil and suppresses sparks; unmount leaves no loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers keep the logo centred without overflow.
