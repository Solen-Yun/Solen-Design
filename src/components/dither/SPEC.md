Implement the "Dither" component from zero: a retro dithered wave field rendered in two WebGL2 passes — a scrolling domain-warped noise pattern written one value per pixel-cell into an offscreen texture, then a quantization pass that stamps it through Bayer matrices, halftone dots, stripes, crosshatch or white noise into a handful of discrete colour levels. The cursor carries a fading trail that erases into, reveals out of, or ripples the waves, and clicks fire expanding shock rings. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Dither.jsx (entry, render loop, both shader programs) and Dither.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.dither-container` (position relative, width/height 100%, overflow hidden; accepts className and style) holding `canvas.dither-canvas` (absolute inset 0, block, 100% × 100%, aria-hidden).
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. If the context or either program fails, the component renders the empty container silently.
- One fullscreen triangle shared by both programs. Pass 1 (WAVE) renders into an RGBA8 texture sized to the cell grid (ceil(canvas/cell) × rows, NEAREST filtering, one texel per dither cell); the value is packed as floor(v·255)/255 in R plus fract(v·255) in G, giving roughly 16-bit precision through the 8-bit intermediate. Pass 2 (DITHER) reads it with texelFetch and draws the final colours.
- Settings live in a ref refreshed every render; a dependency-free effect pokes a wake function, so prop changes repaint immediately. A dpr change triggers a full resize; a pixelSize change reallocates the field texture.

## Wave field (pass 1)

- Coordinates: each dither cell's corner maps to css-space uv centred at the container and aspect-corrected (x scaled by width/height).
- The pattern is domain-warped fractal noise: fbm(p + fbm(p − time·waveSpeed)) where fbm is 4 octaves of classic 2D Perlin gradient noise, each octave multiplying frequency by waveFrequency and amplitude by waveAmplitude. Evaluate at (uv + warp)/scale. Post-process: (f − 0.5)·contrast + 0.5 + brightness.
- Mouse influence: the smoothed cursor head (eases at ≈0.06 s) leaves a trail of up to 16 points; each point's weight decays with time constant 0.08 + trail·0.7 seconds, a new point spawns when the head moves beyond ~0.012, and trail 0 keeps only the head. A point's reach is mouseRadius · mix(0.55, 1.0, weight) and its push is weight · presence · mouseStrength, where presence eases in over ~0.12 s and out over ~0.35 s. Effects: erase subtracts 0.5·push from the field (holes), reveal adds it (highlights), ripple additionally warps the sample position with sin(distance/radius·16 − time·7)·0.04·touch·strength around the head.
- Click ripples: up to 4 concurrent, life 1.6 s; each is a Gaussian ring at radius age·0.9 (width 0.07) with a (1 − life)² envelope. The ring adds 0.55·ring to the field brightness and pushes the sample uv radially by 0.035·ring, so waves visibly bend around the shock.
- Intro: a radial curtain over 1.8 s — the field is revealed inside an expanding circle (reach = half the aspect diagonal + 0.45), edge softened over 0.45, squared-smoothstepped; intro=false or reduced motion snaps it open.

## Quantization (pass 2)

- Each cell index picks a threshold from the selected mode: bayer — the standard recursive 8×8 Bayer matrix; bayer4 / bayer2 — the 4×4 / 2×2 variants; halftone — diagonal dot cells (rotate the cell grid 45°, threshold from the distance to the tile centre, producing round dots); lines — horizontal 4-px stripes; crosshatch — the minimum of two diagonal stripe lattices (period 6), giving woven diagonals; noise — a hash-based white-noise threshold; none — constant 0.25 (plain quantization). The threshold is offset by −0.25 before use.
- Level mapping, three output modes: (1) palette mode when palette holds 2–8 colours — v = f + t/(n−1) picks the nearest palette entry, with a slight shoulder compression (subtract mix(0.2, 0, smoothstep(0.45, 0.8, v))) so bright zones keep the lightest colour crisp; (2) transparent mode when backgroundColor is the string "transparent" — the wave colour is output premultiplied with alpha quantized into colorNum steps; (3) normal mode — the offset (waveColour − background)·f + t/levels is quantized into colorNum−1 steps (levels = max(colorNum,1.01) − 1, colorNum floored at 2), clamped into the gamut so a dark-on-light or light-on-dark ramp never overshoots, and added to the background. All outputs go through the exact piecewise sRGB encode.
- Colour parsing: waveColor, backgroundColor and palette entries accept a [r, g, b] array of 0–1 floats used directly as linear values, or any CSS colour string converted through a 1×1 2D-canvas probe to linear via the exact sRGB-to-linear curve, cached per value.

## Interaction, motion & performance

- Window-level pointermove (passive) locates the cursor; pointerdown spawns a click ripple when clickRipple is on and the cursor is inside; pointerup/cancel clear the inside flag for touch; pointerleave on documentElement clears it for mouse.
- The wave clock advances dt unless disableAnimation or reduced motion. Reduced motion additionally disables the cursor field, click ripples and the intro (instant reveal).
- Device pixel ratio clamped to 2; pixelSize (minimum 1) is measured in device pixels — the cell size is round(pixelSize·ratio), so the pattern stays identical across densities.
- The loop self-sleeps: it keeps running while animation is on, the intro is playing, ripples are alive, presence is fading, or any trail weight is above 0.01; when quiet (and reduced motion) it stops and wakes on input or prop changes. IntersectionObserver pauses offscreen; visibilitychange resets timing. Unmount cancels the frame, disconnects observers, removes every listener and deletes programs, buffer, vertex array, texture and framebuffer.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| waveSpeed | number | 0.05 | Scroll speed of the wave pattern. |
| waveFrequency | number | 3 | Frequency multiplier per fbm octave. |
| waveAmplitude | number | 0.3 | Amplitude multiplier per fbm octave. |
| waveColor | [number, number, number] \| string | [0.5, 0.5, 0.5] | Wave colour as 0–1 linear floats or a CSS colour. |
| backgroundColor | [number, number, number] \| string \| "transparent" | [0, 0, 0] | Base colour; the string "transparent" switches to alpha output. |
| colorNum | number | 4 | Quantization levels in normal/transparent mode; floored at 2. |
| pixelSize | number | 2 | Dither cell size in device px; floored at 1. |
| disableAnimation | boolean | false | Freezes the wave clock. |
| enableMouseInteraction | boolean | true | Enables the cursor trail field. |
| mouseRadius | number | 1 | Trail influence radius, in aspect units. |
| ditherMode | "bayer" \| "bayer4" \| "bayer2" \| "halftone" \| "lines" \| "crosshatch" \| "noise" \| "none" | "bayer" | Threshold pattern. Unknown values fall back to "bayer". |
| palette | (string \| number[])[] | - | 2–8 colours for palette mode; overrides colorNum. Extra entries are dropped. |
| scale | number | 1 | Pattern zoom; floored at 0.05. |
| contrast | number | 1 | Field contrast around 0.5. |
| brightness | number | 0 | Field brightness offset. |
| mouseEffect | "erase" \| "reveal" \| "ripple" | "erase" | What the cursor does to the waves. Unknown values fall back to "erase". |
| mouseStrength | number | 1 | Cursor influence strength; floored at 0. |
| trail | number | 0.5 | Trail persistence 0–1; 0 keeps only the head. |
| clickRipple | boolean | true | Clicks fire expanding shock rings. |
| intro | boolean | true | 1.8 s radial reveal on mount. |
| dpr | number | - | Overrides the device pixel ratio; clamped to 2. |
| className | string | "" | Extra class on the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Dither.jsx and Dither.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: waves scroll and self-warp with defaults; every ditherMode renders its distinct threshold pattern; switching between normal (background→wave ramp in colorNum levels), palette (crisp multi-colour bands) and transparent (alpha steps over any page) outputs works; erase/reveal/ripple all track the cursor with a decaying trail whose length follows trail; clicks punch bending shock rings that expire after 1.6 s, capped at 4; intro unveils radially in 1.8 s; disableAnimation freezes the waves while the cursor still works; reduced motion shows a static field with no trail; hiding the tab or scrolling out stops the loop and return resumes cleanly; pixelSize changes reallocate the field without glitches; unmount leaves no raf, observers, listeners or live GL objects; two instances are independent; 375 / 768 / 1440 wide without overflow.
