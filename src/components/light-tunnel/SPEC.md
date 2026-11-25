Implement the "LightTunnel" component from zero: a fibre-optic tunnel seen head-on — dozens of hairline cables arranged in angular cells, receding into depth by a logarithmic mapping — where comets of light race along individual cables (inward or outward), a surge ring sweeps through on click, the whole bundle sways and bends, and the cursor steers the tunnel axis. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: LightTunnel.jsx (entry, state, single program) and LightTunnel.css (container position relative 100% × 100% overflow hidden; canvas absolute inset 0 aria-hidden). Extra DOM props spread onto the container. React >= 18; no runtime dependencies. No iframe.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; missing context renders nothing. Canvas pixel size = client size × min(dpr || devicePixelRatio, 2). One oversized triangle (aPosition (−1,−1), (3,−1), (−1,3)) in a VAO; one fragment program, precision highp float.

## Tunnel mapping

- p = (gl_FragCoord − 0.5·resolution − center) / scale, scale = min(canvas side) × 0.5 × size; depth = −log(|p|) so constant-depth rings are the angular cells; the mapping is fixed-point iterated 4 times against a bend field: bendAt(depth) = (wobble + steer) × (1 − exp(−depth × 0.55)) where wobble = (sin(drift × 0.37 + depth × 0.31), cos(drift × 0.29 + depth × 0.23)) × bend (bend prop × 0.45) and steer is the eased cursor target — the tunnel axis curves away from dead centre and follows the pointer.
- Angular coordinate s = turn − swing − waviness × 0.15 × sin(depth × 1.2 + drift × 0.5), where swing = sin(drift × 0.9) × sway × 0.5 / 2π (the whole bundle slowly swings) and drift advances at (speed + 0.2) per second. Cells are floor(s × cableCount), cableCount clamped 4–200.

## Cables & comets

- Per cable id, four hashes (seeded by variation) give: lateral jitter within half a cell (applied both to the resting line and a slow per-cable wobble at depth-dependent frequency), wobble phase, brightness shade 1 ± colorVariance × 0.45, and comet phase/speed hash (speed multiple 0.55–1.15).
- Resting cable: a smoothstep stroke of width = (0.25 + thickness × 1.5) × pixelRatio (near the mouth it widens ×2.2) with soft edges ∝ pixelRatio; plus a body glow exp(−d / (spacing × 0.22)) masked by reach (fade against neighbours), scaled by tunnelOpacity as the milky fill between fibres; rimWidth (0–1) widens the bloom halo (halo factor 1.2 + rimWidth × 8).
- Comets: position along the cable x = depth × 0.4 + time × pulseSpeed × 4 × speedMultiple × flow + hash × 7; lead = (fract(x) − 0.5)/0.4 × flow; lit = hash < pulseDensity (clamped 0–1) — each cable lights only sometimes; head and tail are Gaussian envelopes with widths derived from pulseLength (clamped 0.02–1) and pulseBlend (head/tail shape mix), clamped to ±half the pulse slot; hot cores tint the pulse colour toward white in dark mode. flowDirection "inward" (default; anything else maps to inward) sets flow −1, "outward" sets +1, flipping which envelope leads.
- Click surge: surge age resets to 0 on click (clickSurge on, reduced motion off); a Gaussian ring of depth-width 0.22 travels inward (from depth 3.4 toward the mouth) or outward per flow direction at 2.6 depth/s, brightness = min(1, age/0.12) × exp(−age × 1.1) for 2.4 s, maxed against each cable's own comet.
- LOD: when the angular pixel spacing drops below ~1.2 px (deep inside the tunnel), lines, glow and strokes fade into an averaged sheet (min(2 × width/spacing, 1)) so the far end never aliases.

## Fades, reveal & output

- Radial fade: smoothstep(0, fadeNear, r × 0.25) × smoothstep(fadeFar, fadeFar × 0.55, r × 0.25); intro (1.8 s, smoothstepped): a depth reveal front sweeps from the mouth inward (fade × smoothstep(reveal − 0.6, reveal, depth)).
- Grain (grain on): a hash noise scaled by grainIntensity modulates the output 1 ± noise × 4.
- Dark output: light = cable × lines × 0.12 + tunnel × body × 0.35 + comet glow, × brightness; tonemapped (1 − exp(−light × 1.4)) × opacity, premultiplied with alpha = max channel. Light mode: hairline + stroke + haze are combined into a coverage and tinted with an ink mapping (inkOf keeps chroma while pinning luminance) — cable ink weight 0.3, pulse ink 0.16, body ink 0.3 — so fibres print as coloured ink on light pages.

## Interaction, timing & lifecycle

- Pointer: position relative to the container centre in half-min-side units; steer target = pointer × mouseStrength × 2.5, eased at 1 − exp(−dt / 0.6); mouseInteraction off or pointer outside relaxes steer to 0. time advances dt × speed × motion; drift advances dt × (speed + 0.2) × motion (motion = 0 under reduced motion).
- Frame loop self-sleep: busy while motion runs (speed > 0), steer is settling (delta > 5e-4), reveal < 1, or surge < 2.4 s old; otherwise rendering stops and wakes on pointermove, clicks, resize, visibility (document.visibilitychange) or re-entering the viewport (IntersectionObserver).
- clickSurge on: pointerdown inside resets the surge; onPointerUp for non-mouse pointers counts as leaving. dpr prop changes trigger re-render at the new ratio.
- Unmount: cancel the frame, disconnect both observers, remove all window/document listeners, delete program/buffer/VAO, drop the context via WEBGL_lose_context when detached. Same-page instances are independent. A layout effect re-renders on every prop change.
- Reduced motion: time and drift freeze (motion 0), intro snaps open, surge clicks disabled — a static tunnel renders on demand.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cableColor | string | "#ffffff" | Resting fibre colour; any CSS colour. |
| pulseColor | string | "#ffffff" | Comet colour; any CSS colour. |
| tunnelColor | string | "#ffffff" | Milky body fill colour between fibres. |
| tunnelOpacity | number | 0 | Body fill strength, clamped 0–1. |
| speed | number | 0.1 | Bundle rotation/drift pace, floored at 0. |
| flowDirection | "inward" \| "outward" | "inward" | Which way comets race; unknown values fall back to inward. |
| pulseSpeed | number | 2 | Comet pace, floored at 0. |
| pulseLength | number | 0.28 | Comet tail length, clamped 0.02–1. |
| pulseBlend | number | 0.6 | Head/tail envelope shape, clamped 0–1. |
| pulseWidth | number | 1 | Comet stroke width, clamped 0.1–3. |
| pulseDensity | number | 0.5 | Chance a cable carries a comet, clamped 0–1. |
| cableCount | number | 56 | Number of fibres around the ring, clamped 4–200. |
| thickness | number | 0.35 | Fibre stroke width, clamped 0.05–2. |
| rimWidth | number | 0.15 | Bloom halo width around strokes, clamped 0–1. |
| waviness | number | 0.3 | Depth ripple of the cells, floored at 0. |
| sway | number | 0.5 | Slow swing of the whole bundle, floored at 0. |
| bend | number | 0.4 | How far the tunnel axis curves, floored at 0. |
| size | number | 1 | Tunnel zoom, floored at 0.05. |
| centerX | number | 0 | Tunnel mouth offset x, in half-min-side units. |
| centerY | number | 0 | Tunnel mouth offset y, in half-min-side units. |
| glow | number | 1 | Comet halo strength, floored at 0. |
| fadeNear | number | 0.5 | Inner radius where the fade starts, floored at 0.001. |
| fadeFar | number | 2 | Outer radius where the fade ends, floored at 0.01. |
| brightness | number | 1 | Output brightness, floored at 0. |
| colorVariance | boolean | true | Per-cable brightness variance. |
| grain | boolean | false | Enables film grain. |
| grainIntensity | number | 0.05 | Grain strength, floored at 0. |
| opacity | number | 1 | Overall opacity, clamped 0–1. |
| mouseInteraction | boolean | true | The cursor steers the tunnel axis. |
| mouseStrength | number | 0.1 | Steering strength, floored at 0. |
| clickSurge | boolean | true | Clicking sends a surge ring through the tunnel. |
| intro | boolean | true | 1.8 s depth reveal on mount. |
| variation | number | 0 | Seed for the per-cable hashes. |
| lightMode | boolean | false | Ink-on-light output. |
| dpr | number | devicePixelRatio | Render pixel ratio, clamped to 2. |
| className | string | "" | Extra class for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of LightTunnel.jsx and LightTunnel.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: fibres recede with depth fade and LOD without aliasing at the far end; comets race inward and flip to outward with flowDirection; surge ring sweeps on click and decays; cursor steers the axis and it relaxes on leave; sway/waviness/bend deform the bundle smoothly; cableCount/thickness/rimWidth/pulseLength/pulseBlend/pulseWidth/pulseDensity/tunnelOpacity/glow/brightness/centerX/centerY/size/fadeNear/fadeFar all take effect; variation reseeds the pattern; colorVariance and grain toggle; lightMode prints readable ink on white; speed 0 freezes; prefers-reduced-motion renders a static tunnel without errors; resize keeps the mouth centred; hidden or offscreen stops rendering; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
