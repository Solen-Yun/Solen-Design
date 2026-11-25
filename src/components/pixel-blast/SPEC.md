Implement the "PixelBlast" component from zero: a dithered pixel-cloud field — an fbm density pattern rendered as chunky pixels with an 8×8 Bayer threshold dither, six pixel silhouettes (square, circle, alternating triangle, diamond, cross, ring), twinkle, glow bloom around dense areas, and drifting noise. Clicking punches expanding ripple rings through the cloud, the cursor lights it up (a trail that grows the pixels and, in reveal mode, actually feeds the density), an optional perspective tilt lays the field on an inclined plane with distance fade, and light mode inverts everything for paper. Two GPU passes ping-pong a cell state texture (packed 16-bit density + smoothing + trail channels). Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: PixelBlast.jsx (entry, sim state, GLSL) and PixelBlast.css. No runtime dependencies. No iframe.
- Root is `<div class="pixel-blast-container">` (position relative, width/height 100%, overflow hidden, aria-label describing the interactive background) receiving className/style; inside is `<canvas class="pixel-blast-canvas" aria-hidden="true">`, absolute inset 0. Pointer input listens on the window.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; blank when unavailable. Canvas DPR = min(dpr prop or devicePixelRatio, 2). Geometry: fullscreen triangles from gl_VertexID, no vertex buffers.
- Two RGBA8 cell textures ping-pong through framebuffers (LINEAR filtered). The cell pass evaluates and packs the field per cell; the main pass draws to the screen. Cell size = 8 × pixelSize × DPR device pixels (pixelSize ≥ 0.5); the cell origin covers the whole screen (the tilted plane's projected bounds when tilted, clamped to 2048×2048) and re-lays-out on resize.

## Cell simulation

- Density: 5-octave value noise fbm over aspect-corrected cell uv, advanced by elapsed × speed (elapsed seeded by variation × 37, or a random offset) plus a drift offset (drift × dt × 0.05 along driftAngle degrees); normalized then shifted by base × 0.5 − 0.65 + (patternDensity − 0.5) × 0.3.
- Click ripples (max 10 slots, ages advance × 0.5): each spawns a ring exp(−((r − rippleSpeed·t)/rippleThickness)²) × exp(−t) × exp(−10r) × rippleIntensityScale at the click's plane position; enableRipples gates it.
- Intro (1.8 s, skippable): an eased front wipes the field in from the top-left corner (front = 1 − (1 − intro)^2.4 of the diagonal reach) with a bright expanding ring at the edge while undissolved areas sit at −1.
- Hover brush: a Gaussian exp(−|Δ|²/hoverRadius²) × eased presence (rate 1/0.25 s) at the smoothed cursor (rate 1/0.08 s). Trail: each cell keeps trail = max(brush, prev.trail × exp(−dt/0.45) − 1/255) while any hover effect is on. "reveal" mode feeds the trail back into density (feed += trail × 0.9) so the cursor literally paints the cloud; "grow" only brightens/swells existing pixels; "none" disables both brush and trail.
- Packing: density is quantized to 16 bits across R+G (range −6..10); B carries (feed + 0.5) × 0.5 as a LINEAR-smoothable copy; A carries the trail. On fresh layouts both targets are primed.

## Pixel rendering

- Bayer: a hard-coded 8×8 ordered threshold table. margin = feed + (bayer − 0.5); coverage = softness ≤ 0 ? step(0, margin) : smoothstep(±0.12 × softness of margin); softness 0–1 (default 0.6).
- Silhouettes, all analytic with derivative-based AA: square (soft-edged box scaled by √coverage), circle, triangle (right triangles alternating flip per cell parity), diamond (Manhattan disc), cross (two bars, arm 0.42 and bar 0.13 of the unit), ring (annulus at 0.3 with 0.09 width).
- Pixel jitter (0–1) rescales each pixel by a per-pixel hash; heat = max(trail, clamp((feed − 1) × 2.5) × min(glow × 2, 1)) swells coverage up to +35%; twinkle 0–1 dims pixels by a per-pixel flicker (1.5–4.5 Hz).
- Glow: bloom = smoothstep(0.2, 1, density)² × glow (0–2), rendered as premultiplied haze around the marks (0.22 factor dark mode, 0.12 light); colour = mix(color, accentColor||color, max(tone, heat)) with tone = smoothstep(0.3, 1, density) × 0.85; light mode darkens hot pixels instead of whitening; noiseAmount adds per-frame ±luminance grain; edgeFade 0–1 feathers all four borders with smootherstep zones.
- Smoothing 0–1 (default 1) mixes the bilinearly-sampled smooth channel against the nearest packed cell — below 1 the pixels regain chunky cell edges.
- Tilt: tiltX/tiltY (−70–70°) build an inverse perspective plane (depth = max(w, h) × 1.25); the shader un-projects each fragment, computes its screen-space footprint, and blends marks toward their average coverage as they shrink (LOD from footprint/pixelSize), fading depth beyond 45% and clipping behind the plane.

## Interaction & lifecycle

- Clicks inside the container spawn ripples (requires enableRipples and non-reduced motion); autoRipple seconds (≥ 0) spawns ripples at random spots automatically once the intro is done; hover works through the brush/trail above.
- Frame loop self-sleep: the loop stops after 1.5 s quiet (no speed, no drift, no twinkle, no autoRipple, intro done, presence settled, no live ripples) and wakes on pointer, resize, visibility and prop changes; autoPauseOffscreen stops it entirely while offscreen (IntersectionObserver), visibilitychange guards hidden tabs.
- All props live in a ref refreshed every render — every option applies live without remount; the variation seed re-times the pattern without rebuilding.
- Reduced motion: elapsed freezes (a static pattern), twinkle/drift/autoRipple/click ripples are disabled; hover lighting still works.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete textures/framebuffers/VAO/programs, drop the context when the canvas detaches. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "square" \| "circle" \| "triangle" \| "diamond" \| "cross" \| "ring" | "square" | Pixel silhouette. |
| pixelSize | number | 3 | Base pixel size multiplier (cells are 8 × this), ≥ 0.5. |
| color | string | "#B497CF" | Base pixel colour (hex). |
| accentColor | string | - | Hot/dense highlight colour; falls back to color. |
| patternScale | number | 2 | fbm spatial frequency. |
| patternDensity | number | 1 | Density bias, ±0.3 around the base field. |
| pixelSizeJitter | number | 0 | Per-pixel size scatter, 0–1. |
| enableRipples | boolean | true | Click/auto ripple rings. |
| rippleIntensityScale | number | 1 | Ripple brightness multiplier. |
| rippleThickness | number | 0.1 | Ripple ring width, ≥ 0.001. |
| rippleSpeed | number | 0.3 | Ripple expansion pace. |
| autoPauseOffscreen | boolean | true | Stops the loop entirely while offscreen. |
| speed | number | 0.5 | Pattern evolution time scale. |
| transparent | boolean | true | Transparent canvas with premultiplied haze; false composites on black/white paper. |
| edgeFade | number | 0.5 | Border feather zone, 0–1. |
| noiseAmount | number | 0 | Per-frame luminance grain, ≥ 0. |
| softness | number | 0.6 | Dither edge softness, 0–1; 0 is a hard Bayer cut. |
| smoothing | number | 1 | Bilinear smoothing of the density field, 0–1; lower = chunkier cells. |
| glow | number | 0.4 | Bloom haze around dense areas, 0–2. |
| twinkle | number | 0.25 | Per-pixel flicker depth, 0–1. |
| drift | number | 0.2 | Pattern drift pace, ≥ 0. |
| driftAngle | number | 30 | Drift direction in degrees. |
| hoverEffect | "none" \| "grow" \| "reveal" | "reveal" | Cursor response: lighting only, swelling, or painting density. |
| hoverRadius | number | 140 | Cursor brush radius in px, ≥ 10. |
| autoRipple | number | 0 | Seconds between automatic ripples (0 = off). |
| tiltX | number | 0 | Perspective tilt around x, −70–70°. |
| tiltY | number | 0 | Perspective tilt around y, −70–70°. |
| intro | boolean | true | 1.8 s corner wipe with an expanding ring. |
| variation | number | - | Seeds the pattern's time offset; unset picks a random one. |
| lightMode | boolean | false | Paper-white rendering with dark-hot accents. |
| dpr | number | - | Overrides the canvas DPR (capped at 2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of PixelBlast.jsx and PixelBlast.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the dithered cloud drifts and evolves; all six silhouettes render crisply with correct softness (hard cut at 0); clicking punches expanding rings that fade and stack (10 slots); reveal mode paints density under the cursor and it decays within ~0.5 s; grow mode only brightens; accent colour shifts dense/hot pixels; patternScale/density/speed/drift/driftAngle reshape the field live; tilt lays the field in perspective with distant marks collapsing to averages and no clipping; light mode reads on white and transparent mode composites over page content; intro wipes once with the ring; autoRipple sprinkles ripples when set; smoothing 0 shows chunky cells; reduced motion freezes the pattern but keeps hover lighting; the loop sleeps after 1.5 s idle and stays asleep offscreen with autoPauseOffscreen; canvas tracks its container at 375 / 768 / 1440 wide without overflow; unmount leaves no listeners, observers or frame loop; same-page instances are independent.
