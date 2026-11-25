Implement the "GradientASCII" component from zero: a full-bleed canvas that draws soft gradient glows — a horizon arch, a pinched light band, a rising bloom or a dark eclipse — entirely out of a grid of monospace characters that flicker like a terminal and scramble into random glyphs under the cursor. Colors are mixed in perceptual Lab space, glyphs live in a runtime-built atlas, a blurred halo pass adds glow, and a light "ink on paper" theme inverts the rendering. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GradientASCII.jsx (entry, atlas building, pointer state, all shaders) and GradientASCII.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="gradient-ascii-container">` — position relative, width 100%, height 100%, overflow hidden, accepting className and style — wrapping a single `<canvas class="gradient-ascii-canvas" aria-hidden="true">` absolutely filling it. The container must be sized by the parent.
- WebGL2 context with alpha: true, premultipliedAlpha: true, antialias: false, depth/stencil: false. `KHR_parallel_shader_compile` is used when present so the first frames don't stall; without it uniform locations resolve synchronously. If the context or any program fails, the component renders nothing and never throws. Four programs: field, halo, blur, composite, all sharing one fullscreen-triangle vertex shader.
- Render passes per frame: (1) the field pass renders at half canvas resolution into two RGBA8 attachments (MRT): attachment 0 is the premultiplied gradient colour, attachment 1 stores (reveal, scramble) as the aux channel; (2) the halo pass re-renders the glyphs at quarter resolution; (3) a two-pass gaussian blur (horizontal then vertical, 5-tap) blurs the halo; (4) the composite pass draws glyphs + gradient + halo + film grain at full resolution.
- Colour pipeline: every colour string is parsed with a 1×1 offscreen canvas fill probe (cached per string), converted sRGB → Lab on the CPU, uploaded as an 8-stop ramp; the shader interpolates neighbouring stops in Lab and converts back with an sRGB encode, which keeps midtones smooth. Fewer than 2 colours are duplicated; more than 8 are dropped. Default palette: deep blue #1e3fd8 → near-white #f6f8ff → pale blue #a5d8ff → sky blue #38bdf8.

## Gradient shapes

- The shader works in aspect-corrected coordinates p = (uv − 0.5) × (aspect, 1), scales them by the `scale` prop, then warps them by two octaves of value noise that drift with time (warp amplitude = flow × scale; the eclipse shape takes a 4× gentler warp so its ring stays crisp). A per-pixel dither hides banding. `variation` shifts the noise seed so instances differ.
- shape "horizon": a downward arch curve whose height dips with x² and breathes slowly; a rim glow sits on the curve, a soft sun spotlight hangs above it (drifting sideways), and the sky brightens with distance from the sun. Density order runs bottom → top.
- shape "pinch": a horizontal lens-shaped band that sways on a sine and breathes (±6% width); brightness falls off as a stretched gaussian across and along the band, densest at the centre.
- shape "rise": a glow ellipse anchored below the bottom edge, breathing and drifting; brightness is a soft power falloff of the normalized radius, densest at the bottom centre.
- shape "eclipse": a dark disc (radius ≈ 0.23 of half-height, breathing ±1.5%) ringed by a corona whose ray strength is noise over the angle; brightness is the exp-decay halo outside the disc, zero inside.
- Each shape outputs a tone pair plus an "order" scalar (roughly how central/dense the pixel is). `softness` (0–1) widens falloffs; `speed` scales the clock. Intro: over 2.4 s each pixel's tone fades in as a smoothstep of (intro × 1.45 − order), so the glow sweeps outward from the densest region; alpha follows.
- Final field colour = mix(tone(t1), tone(t2), shape's cross-blend) through the Lab ramp; gradientOpacity scales how much of this base gradient the composite keeps.

## Glyph grid

- Atlas: characters are deduplicated (newlines dropped; empty set falls back to a space), drawn white-on-transparent into cells of 60 × 100 px (font: 300 weight at 78 px of the chosen family, centred) with at most 16 columns, uploaded as a mipmapped texture (LINEAR_MIPMAP_LINEAR + LINEAR). Default characters `" =+xX0S8#@"` run from blank to dense so tone maps to visual weight. When the font family or characters change the atlas rebuilds immediately and again once `document.fonts.load` resolves for that family.
- Cell layout: cell height = cellSize × DPR px, width × 0.6 (the atlas cell aspect); the grid is centred on the canvas. Each pixel computes its cell and samples the field at the cell centre.
- Per cell: dark mode value = luma of the field colour; light mode value = clamp((1 − luma) × 1.5) of the inverted field. tone = pow(value, 0.75) plus a flicker wobble (per-cell hash re-rolled at 9 Hz, ×0.4 × flicker, plus a static ±0.05 level). Glyph index = round(tone × (count − 1)). `density` (0–1) keeps a per-cell hash fraction of cells visible, weighted toward denser glyphs at higher tone; a cutoff smoothstep hides cells in flat areas.
- Scramble: the aux channel carries the cursor/see-below signal; any cell with decode > 0.02 has a chance (decode × 1.25, re-rolled at 20 Hz) of showing a random glyph instead — that is the visible scramble. Depth of field: cells beyond a per-cell hash of `depthOfField` sample the atlas with a scaled gradient (blurred LOD) at half alpha.
- Composite: dark mode output = base gradient × gradientOpacity + glyph ink (field colour × 0.55 tint) + blurred halo × glow, with film grain (two hashes −1..1, reseeded at 24 fps, stronger over bright body) added and rgb clamped to alpha. Light mode: paper stays clear, ink = visible × 0.8 where glyphs land, gradient only where no glyph, halo × 0.6 fades in where the page is still transparent.
- Cell-level brightness varies per cell (0.35–1) so the grid shimmers organically; glyphOpacity scales all glyph alpha.

## Interaction, loop & lifecycle

- Pointer trail: while the pointer moves inside (and mouseInteraction is on), points are pushed at least 0.015 aspect-units apart (fast motion interpolates up to 6 in-between points); each lives 0.7 s with a squared decay and adds a gaussian scramble field of radius scrambleRadius around itself; at most 24 points. Clicks (clickEffect "wave" | "burst"): at most 4, life 1.2 s — "wave" is an expanding ring (front = age × 0.75, width 0.06), "burst" a filled disc that swells from 0.08 toward 0.30 and fades with a (1 − k)² envelope, both scaled by an 80 ms attack. "none" disables clicks.
- The rAF loop keeps running while the intro is playing, clicks or trail points are alive, or motion is allowed; under reduced motion (or once settled) it sleeps and wakes on pointer, resize or prop changes. `speed` scales the field clock and glyph flicker clock.
- Resize: DPR = min(devicePixelRatio, dpr prop or 1, 2); canvas at full ratio, field target at half, halo targets at quarter; cell sizes and centre offset recompute. ResizeObserver + IntersectionObserver (renders only while visible) + visibilitychange reset the clock and wake the loop.
- Reduced motion: the field clock freezes, flicker is forced to 0, trail and click effects are ignored; a still frame renders and stays.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete field/halo textures and framebuffer, the atlas texture and the VAO; programs are deleted once parallel compilation completes (or immediately, and the context is lost deliberately, if the canvas is already detached). Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"] | Gradient stops, mixed in Lab; up to 8, any CSS colour strings. |
| shape | "horizon" \| "pinch" \| "rise" \| "eclipse" | "horizon" | Which glow composition the characters draw. |
| characters | string | " =+xX0S8#@" | Glyph palette, ordered sparse → dense; deduplicated into the atlas. |
| cellSize | number | 18 | Character cell height in CSS px, 6–64. |
| density | number | 0.8 | 0–1: fraction of cells that hold a glyph. |
| glyphOpacity | number | 0.85 | 0–1: overall glyph alpha. |
| glow | number | 0.2 | 0–2: strength of the blurred halo behind the glyphs. |
| depthOfField | number | 0 | 0–1: fraction of cells rendered out of focus (blurred atlas sampling). |
| flicker | number | 0.2 | 0–1: per-cell tone jitter re-rolled at 9 Hz. |
| softness | number | 0.5 | 0–1: softens the shape falloffs. |
| scale | number | 1 | Zoom of the gradient field, 0.4–2.5. |
| flow | number | 0.5 | 0–2: strength of the noise warp drifting through the field. |
| speed | number | 1 | Animation clock speed; 0 freezes. |
| gradientOpacity | number | 0.9 | 0–1: how much of the base gradient shows behind the glyphs. |
| grain | number | 0.08 | 0–0.4: animated film grain. |
| variation | number | 0 | ≥ 0: seed offset so multiple instances differ. |
| mouseInteraction | boolean | true | Enables the cursor scramble trail. |
| scrambleRadius | number | 0.1 | Radius of the cursor's scramble field in aspect units, 0.02–0.4. |
| clickEffect | "none" \| "wave" \| "burst" | "wave" | What a click triggers: nothing, an expanding scramble ring, or a swelling disc. |
| intro | boolean | true | Plays the 2.4 s outward reveal. |
| lightMode | boolean | false | Ink-on-paper rendering: glyphs print dark on a light ground. |
| fontFamily | string | "Geist Mono" + monospace fallbacks | Font used to rasterize the atlas. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of GradientASCII.jsx and GradientASCII.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all four shapes render as character-drawn glows on a dark container; custom palettes mix smoothly (no hue banding) in Lab; glyph density follows brightness, blanks stay blank; the cursor leaves a scrambling trail that decays in ~0.7 s; clicks fire wave rings or a burst; flicker jitters cells without strobing; characters swap if `characters` changes (atlas rebuild, also after late font load); lightMode prints ink on paper; custom cellSize 6–64 keeps the grid centred at 375 / 768 / 1440 widths without overflow; reduced motion gives a still frame with no scramble; scroll-away/tab-away stop the loop; unmount leaves no observers, listeners or GL objects; two instances with different `variation` look different.
