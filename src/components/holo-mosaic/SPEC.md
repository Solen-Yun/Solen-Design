Implement the "HoloMosaic" component from zero: a full-bleed wall of holographic tiles — a rounded-box mosaic (52 px base tile, rotated, beveled, gapped) that splits a roaming light into sweeping spectral colour like security hologram foil, with glitter sparkles, a flip-in intro where tiles cascade in from the centre, and click waves that flip tiles 180° as a ring passes. The pointer bends tile normals near the cursor and drags the light; a dither or ASCII filter can quantize the render; an ink-on-paper light theme prints the hologram on paper. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: HoloMosaic.jsx (entry, pointer springs, shader) and HoloMosaic.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="holo-mosaic-container">` — position relative, width 100%, height 100%, overflow hidden, accepting className and any extra DOM props (including style) — with a single `<canvas class="holo-mosaic-canvas" aria-hidden="true">` absolutely filling it. The container must be sized by the parent.
- WebGL2 context with alpha: true, premultipliedAlpha: true, antialias: false, depth/stencil: false. `KHR_parallel_shader_compile` is used when present so the loop starts before linking finishes. One program draws a fullscreen triangle. Context loss stops the loop; context restore rebuilds the program and continues. Failure renders nothing and never throws.
- Tile geometry: the screen is divided by a grid rotated `rotation` degrees; tile pitch = 52 px × tileSize (0.2–6) × DPR; half-extent = 0.5 × (1 − gap) (gap 0–0.6), rounded corners by roundness (0–1 of the half extent) through a rounded-box SDF with analytic gradients; bevel (0–1) steepens normals near edges. Per-tile hashes jitter the base normal (strength 0.5 × tilt, 0–2) so tiles catch light individually. Alpha = tile coverage × opacity (0–1); `fade` (0–1) adds a smootherstep feather from all four edges.
- Flip-in intro (2.4 s): a wavefront expands from the canvas centre (clock × 0.95 units/s), each tile flipping about the x-axis — cos-squashed while edge-on (coverage fades through |cos| smoothstep) and easing in with a smootherstep plus a per-tile hash delay; fully unflipped tiles render untouched.
- Click waves: up to 6 concurrent (oldest dropped), 4 s life: each wave expands from the click point (0.95 units/s) and, as the ring front crosses a tile, rotates it a full π with a smoothstep ease — a visible domino flip rippling outward.
- Light wand: a virtual light point drifts on a Lissajous over the canvas (× speed, phase offset by `variation`) and springs toward a blend of that home and the pointer position (stiffness 38, damping 11; the blend factor eases in 0.45 s, out 1.2 s while mouseInteraction is on). The light drives the sheen pool and the spectral sweep.

## Holographic shading

- Orientation field: each pixel's thin-film axis angle φ = 2π × mix(swirl flow, hash, scatter). Swirl flow is a 3D value noise over position (scaled ×1.4 × swirl, 0–5) animated slowly with time; scatter (0–1) replaces it with the per-tile hash for a per-tile rainbow. `ripple` (0–3) adds concentric sin rings from a slowly orbiting centre.
- Spectral palette: three lights at golden-angle offsets (spread by softness: 0.02 + 0.2 × softness, 0–1) each sample the wavelength ramp at |dot(lightDir + viewDir, filmAxis)| × (1450 × bands) — bands (0.3–3) compresses the rainbow, intensity (≥ 0, default 1.25) scales it, saturation (0–1.5) mixes back toward luma. The spectrum prop selects the wavelength window: "full" 400–700 nm, "warm" 565–700, "cool" 405–565, "pearl" 420–690 plus a 60% mix toward pearl white. The ramp is an analytic spectral power curve windowed to the visible range — no texture lookup.
- Metal glints: Blinn-Phong half-vector spec against the light — a wide lobe (pow 34) and a tight glint lobe (pow 700) tinted by metalColor (default #e8ebf1), boosted ×(0.75 + 0.25 × inner) toward tile centres; a light pool (pow 2.5 falloff) × sheen (0–2, default 0.8) brightens the floor around the light point.
- Glitter (0–1): per 6 px cell, cells under a hash threshold (0.05 + 0.25 × glitter) grow a sparkle with its own micro-normal, twinkle sine (2–7 Hz per cell) and a spectral colour of its own; sparkles sharpen the specular to a near-1 threshold and fade radially, multiplied by intro presence.
- Pointer hover: the pointer target eases on a tighter spring (stiffness 90, damping 18) and bends tile normals toward itself in a radius mouseRadius (0.05–1, default 0.25) with strength 0.8 × presence × mouseStrength (0–3) — the sweep of colour visibly refracts around the cursor; presence eases in 0.3 s, out 0.6 s.
- Dark mode composites: base = colour (#120f17 default) lifted by a faint cool tint; metal glints and the pool add metalColor; the spectral term adds at 1.65 × intensity; sparkles add whitened; a soft reinhard-style tone map caps the glow; animated per-pixel grain (reseeded through a 613-frame cycle) × grain (0–1, default 0.08).
- Light mode prints: the paper is `color` darkened slightly by the wide lobe, pool and bevel edge; the spectral hue (chroma-boosted, mixed toward metalColor at low chroma) stamps in as ink with density 0.86 × smoothstep(spectral peak); sparkles print their spectral colour; grain subtracts ink.

## Filters

- filter "dither": block size = 2 px × filterSize (0.5–4, DPR-scaled); each block samples at its centre, then a 4×4 Bayer matrix both thresholds the alpha (hard pixel edges) and posterizes the colour to 4 levels stepping from the base colour — a retro ordered-dither print.
- filter "ascii": block size = 10 px × filterSize; each block samples its shade and picks one of 8 density levels, each rendered as a hardcoded 5×5 bitmap glyph (bitmask-coded in the shader); alpha = glyph coverage; the tone darkens (light mode × 0.82) or desaturates (dark mode) — the hologram rendered as a character mural.
- filter "none" renders the continuous shader.

## Loop & lifecycle

- The rAF loop keeps running while anything moves or settles: not paused and not reduced with speed > 0 (or intro/waves in flight), hover presence converging, or the light spring still moving; otherwise it sleeps and wakes on pointer move/leave, visibility change, resize or prop change. time advances at dt × speed and starts pre-offset by variation (× 3.1 s + 17) so instances don't sync.
- Resize: DPR = min(devicePixelRatio, dpr prop or 1, 2), longest side capped at 2400 px. ResizeObserver + IntersectionObserver gate rendering while off-screen.
- Reduced motion: intro completes instantly and time freezes; hover and light springs still settle so the frame responds to the pointer. paused freezes time but keeps rendering.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete VAO/programs (waiting out parallel compilation if needed), and lose the GL context if the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#120f17" | Base tile colour / light-mode paper (any CSS colour). |
| metalColor | string | "#e8ebf1" | Metallic glint and low-chroma tint colour. |
| spectrum | "full" \| "warm" \| "cool" \| "pearl" | "full" | Wavelength window of the spectral ramp. |
| tileSize | number | 1 | Tile pitch multiplier on the 52 px base, 0.2–6. |
| gap | number | 0.08 | 0–0.6: seam between tiles. |
| roundness | number | 0.15 | 0–1: corner rounding of tiles. |
| bevel | number | 0.35 | 0–1: edge bevel shading strength. |
| rotation | number | 0 | Grid rotation in degrees. |
| scatter | number | 0.3 | 0–1: mixes the flowing spectrum into per-tile hash rainbows. |
| tilt | number | 0.35 | 0–2: per-tile normal jitter. |
| swirl | number | 1 | 0–5: scale of the flowing spectrum noise. |
| ripple | number | 0.6 | 0–3: concentric ring modulation of the spectrum. |
| bands | number | 1.3 | 0.3–3: rainbow compression (band count feel). |
| softness | number | 0.5 | 0–1: spread of the three sampling lights. |
| intensity | number | 1.25 | Spectral brightness, ≥ 0. |
| saturation | number | 0.1 | 0–1.5: chroma of the spectral colour. |
| glitter | number | 0.85 | 0–1: density/brightness of the sparkles. |
| sheen | number | 0.8 | 0–2: light-pool brightness around the roaming light. |
| grain | number | 0.08 | 0–1: animated per-pixel grain. |
| speed | number | 0.5 | Master clock for the light drift, swirl and ripples; 0 freezes. |
| variation | number | 0 | Phase/seed offset so instances differ. |
| filter | "none" \| "dither" \| "ascii" | "none" | Post filter applied over the whole mosaic. |
| filterSize | number | 1 | Filter block-size multiplier, 0.5–4. |
| fade | number | 0 | 0–1: edge feather of the whole layer. |
| opacity | number | 1 | 0–1: master alpha. |
| intro | boolean | true | Plays the 2.4 s flip-in cascade from the centre. |
| mouseInteraction | boolean | true | Pointer drags the light and bends nearby tile normals. |
| mouseStrength | number | 1 | 0–3: strength of the normal bending at the cursor. |
| mouseRadius | number | 0.25 | 0.05–1: radius of the cursor's influence. |
| flipOnClick | boolean | true | Clicking rings a 180° tile-flip wave outward. |
| lightMode | boolean | false | Ink-on-paper rendering. |
| paused | boolean | false | Freezes the clock while still rendering. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2, 2400 px cap). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div (spread onto the root). |

## Delivery & validation

- Deliver the complete content of HoloMosaic.jsx and HoloMosaic.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the mosaic renders beveled rounded tiles with a sweeping spectral sheen; the light wanders when idle and follows the pointer; the cursor visibly bends/refracts the sweep near itself; the intro cascades tile flips outward from the centre; clicking rings a 180° flip wave; glitter twinkles per cell; spectrum full/warm/cool/pearl shifts the hue window; scatter 1 gives per-tile rainbows; rotation/gap/roundness/tileSize reshape the grid; dither posterizes with pixel edges, ascii renders the glyph mural; lightMode prints the hologram on the base colour; fade feathers edges; reduced motion/paused freeze time but keep pointer response; resize stays crisp at 375 / 768 / 1440; context loss recovers on restore; scroll-away/tab-away sleep the loop; unmount leaves no listeners, observers or GL objects; two instances with different variation desync.
