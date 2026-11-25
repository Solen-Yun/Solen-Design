Implement the "WarpText" component from zero: a WebGL text block that behaves like a sheet of glass over the words — the pointer acts as a lens that bends, pinches or swirls the glyphs around itself, an ambient noise field keeps the type slowly breathing, clicks fire expanding shockwave ripples through the letterforms, and a refraction pass splits the ink like a prism. The text is rasterized from real DOM fonts into a texture, so any font the page uses is warped, and the block falls back to plain styled text without WebGL. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ with a minimal WebGL2 renderer helper (renderer, program, mesh, triangle geometry, texture) as the only runtime dependency. Two files only: WarpText.jsx (rasterizer, shaders, pointer/intro loop) and WarpText.css (layout). No iframe.
- Root is a `<div class="warp-text">` plus any className: position relative, display block, width 100%, min-height 220px, overflow hidden, isolation isolate, border-radius inherit, and the caller's inline style. It carries role="img" and aria-label={text}, so the warped canvas is decorative while the text stays announced.
- The WebGL canvas is appended inside the root: absolute inset 0, 100% × 100%, display block, aria-hidden. Renderer created with webgl 2, alpha true, premultipliedAlpha true, antialias true, DPR clamped to 2; clear colour fully transparent. If the context cannot be created, or a `webglcontextlost` event fires, the component renders a fallback `<span class="warp-text__fallback">` instead — absolute inset 0, flex-centred, padding 0 7%, text-align center, white-space pre-line, styled inline with the color/fontSize/fontWeight/fontFamily/letterSpacing/lineHeight props — and stops rendering.
- Text rasterization: a hidden probe span (absolute, visibility hidden, white-space pre) is appended to the root carrying text, color, fontFamily, fontSize (a number becomes px), fontWeight, letterSpacing (number becomes px) and lineHeight; its computed style yields the resolved px font size (fallback 96px), ink colour, font family, weight, letter spacing ("normal" → 0) and line height in px (fallback fontSize × lineHeight, or × 0.92 when lineHeight is a number). The probe is removed after reading.
- A 2D canvas at DPR (clamped to 2) holds the type: lines are the text split on "\n"; each line is measured and drawn character by character (Array.from, so surrogate pairs stay intact) with the letter spacing added between chars, textAlign left, textBaseline middle. The block auto-fits: fit = min(1, width×0.86 / widestLine, height×0.78 / lineHeight×lineCount); below 1 the font size, letter spacing and line height all scale by fit. Lines are centred horizontally around width/2 and vertically around height/2. The canvas is uploaded to a texture (LINEAR filters, CLAMP_TO_EDGE, no mipmaps, premultiplied alpha). document.fonts.ready is awaited before every rasterization; a version counter discards stale runs.
- Re-rasterization triggers: mount, container resize, changes to text/color/font props, and a computed-colour watcher (every 15th frame the root's getComputedStyle().color is compared with the last rasterized ink and re-rasterized on change — so parent-driven colour transitions flow into the warp).

## Fragment shader field

- One fullscreen triangle. Uniforms: text texture, resolution, pointer (UV, y flipped), pointer activity, time, warpStrength, warpScale, speed, pointerInfluence, pointerStrength, refraction, chromatic, ripple, motion, lens mode (0 bulge / 1 pinch / 2 swirl), intro, reveal, backdrop, and a uClicks[4] array of (x, y, age, energy).
- Ambient drift: two 4-octave value-noise fbm fields (hash-based, smoothstep-interpolated) sampled around uv × scale × 3.1 / 3.4 with opposing drift (time×0.055, −time×0.045); their (n − 0.5) offsets form an ambient displacement scaled by warpStrength × 0.045 × motion plus an intro boost of 0.18 — the type starts strongly warped and settles as the intro completes.
- Pointer lens: aspect-corrected delta to the pointer, t = clamp(dist / radius), lens = smoothstep(radius → 0, dist) × activity, bulge = t(1−t)² × 6.75 × activity. With ripple on, a ring wave sin(dist×28 − time×4.2) modulates the push along the radial direction × pointerStrength × 0.016. Mode bulge pushes samples outward along the radial direction × bulge × strength × 0.045; pinch pulls them inward (sign flip); swirl rotates the delta vector around the pointer by twist = (1−t)² × activity × strength × 2.4 (sample offset = rotated delta − delta).
- Click shockwaves: up to 4 concurrent clicks, each an expanding Gaussian ring — offset = (clickDist − age×0.9) / (0.06 + age×0.06), fade = 1 − smoothstep(0, 1.6, age), energy = exp(−offset²) × fade × smoothstep(0, 0.08, age) × stored energy; displacement pulls samples toward the ring by offset × energy × 0.09 and the accumulated energy adds a light term. Click age advances each frame; after 1.6s the slot is freed.
- Sampling & composition: rest = uv + ambient; seven taps at rest + bend × (1 + dispersion×k) + split×k for k = 1 − i/3 (i = 0…6), with band weights (max(k,0), 1−|k|, max(−k,0)) — the red-weighted tap samples farthest along the bend, the blue-weighted one farthest against it, giving chromatic aberration scaled by chromatic × 0.5. split is the normalized total displacement × refraction × 0.16 × (0.35 + lens×1.65 + intro×3), so glass refraction concentrates around the lens and during the intro. Out-of-range taps sample transparent.
- The seven taps average into per-channel ink and coverage; alpha is the max coverage channel. When the resolved ink is dark (canvas-measured luminance < 0.5) a backdrop term adds the coverage gap (max coverage minus each band's coverage) back into the colour, keeping warped dark glyph edges solid instead of washing out. Lens and shock energy add a slight brightness lift inside the glyphs (× 0.055, capped at the coverage alpha). Final alpha is multiplied by the reveal factor.

## Interaction, intro & loop

- Pointer: pointermove on the canvas (touch pointers ignored) sets the target UV and active target 1; pointerleave returns the target to 0. The virtual pointer eases toward the target exponentially (time constant 130ms engaged, 470ms idle) toward an idle Lissajous drift around the centre (0.5 ± sin(0.33t)×(0.08 + 0.2×drift), 0.5 ± cos(0.27t)×(0.06 + 0.2×drift)) when nothing hovers; activity eases toward 1 engaged or the idleDrift level idle over 270ms, so the block never sits perfectly still unless idleDrift is 0. pointerdown (clickRipple on) writes a click into a rotating slot of 4 with age 0 and energy 1.
- Intro: 1.6s. introProgress runs 0 → 1 unless intro is off or reduced motion is on (then it starts at 1); the cubic settle drives the intro warp/refraction boost, and the text fades in over the first 45% through a smoothstep reveal.
- Loop: requestAnimationFrame runs only while the container intersects the viewport (IntersectionObserver, threshold 0) and the page is visible (visibilitychange resumes/waits); frame delta clamped to 50ms. Reduced motion (matchMedia, live-updated): time frozen at 0, pointer activity scaled to 35%, click energy 0.35, intro skipped.
- Resize: ResizeObserver on the root re-sizes the renderer (DPR re-clamped to 2), updates the resolution uniform and re-rasterizes.
- Unmount: cancel the frame, disconnect both observers, remove pointer/context/visibility/match-media listeners, delete the texture, geometry and program, lose the GL context, and remove the canvas from the DOM. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Bend the moment" | The displayed text. "\n" forces line breaks. |
| color | string | "currentColor" | Ink colour; "currentColor" resolves from the container's computed colour. |
| warpStrength | number | 0.08 | Intensity of the ambient noise drift. |
| warpScale | number | 1.7 | Frequency of the ambient noise field. |
| speed | number | 0.55 | Time scale of the noise drift and ripple wave. |
| pointerInfluence | number | 0.42 | Lens radius in UV units (fraction of the block height). |
| pointerStrength | number | 0.38 | How hard the lens and ripple bend the glyphs. |
| refraction | number | 0.018 | Constant glass-like sample split, strongest near the lens and during the intro. |
| chromatic | number | 0 | Chromatic aberration across the seven taps, 0–1. |
| ripple | boolean | true | Ring wave emanating from the pointer inside the lens. |
| clickRipple | boolean | true | Clicks fire expanding shockwaves through the text. |
| idleDrift | number | 0.2 | Idle wander of the virtual lens, 0–1; 0 rests on the centre. |
| lens | "bulge" \| "pinch" \| "swirl" | "bulge" | Pointer lens behaviour: push out, pull in, or rotate. |
| intro | boolean | true | 1.6s settle from heavy warp and refraction into the steady state. |
| fontSize | string \| number | "clamp(3rem, 10vw, 9rem)" | Any CSS size; numbers become px. Auto-shrinks to fit the block. |
| fontWeight | number | 800 | Rasterized weight. |
| fontFamily | string | "inherit" | Rasterized family; inherits the page font by default. |
| letterSpacing | string \| number | "-0.06em" | Any CSS value; numbers become px. |
| lineHeight | number \| string | 0.9 | Unitless multiplier or CSS line height, for multi-line blocks. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of WarpText.jsx and WarpText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: ogl at ^1.0.11 for the WebGL2 renderer helpers.
- Validate: text rasterizes in the page's own font and re-rasterizes after fonts load; the lens bulges, pinches and swirls around the pointer with the ripple ring inside its radius; clicks fire expanding shockwaves and four rapid clicks coexist; the intro settles from heavy warp into steady breathing; refraction splits the ink near the lens and chromatic adds red/blue fringing; dark ink keeps solid edges while warped; idleDrift 0 rests the lens on the centre; color prop and inherited currentColor both work and live colour changes re-rasterize; multi-line text with "\n" fits and centres; WebGL missing or lost swaps to the styled fallback without errors; prefers-reduced-motion freezes time and skips the intro; tab hide and off-screen pause the loop; unmount leaves no frame loop, observers, listeners or GL context; 375 / 768 / 1440 wide without overflow.
