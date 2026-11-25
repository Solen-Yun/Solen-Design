Implement the "MetallicPaint" component from zero: liquid chrome poured over a logo or text — an animated diagonal band of metal (a bright thin stripe pair rolling into a dark wide gradient band) flows through the alpha mask of the source shape, refracting and dispersing around its edges like a real anisotropic material, with the pointer tilting the flow. The shape's interior is filled by a smooth depth field solved once on the CPU, and the metal reveals itself by pouring down that depth during a short intro. Everything renders in a single WebGL2 fullscreen pass over one packed texture. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Pure React, zero runtime dependencies beyond React >= 18; two files only: MetallicPaint.jsx (entry, source processing, Poisson solve, one raw WebGL2 program — no helper library) and MetallicPaint.css (root + canvas rules). The component renders its own `<canvas class="metallic-paint-canvas">` inside a root `<div class="metallic-paint">` (+ `className`/`style`), both filling the host box (position relative, width/height 100%).
- Context: WebGL2, alpha true, premultipliedAlpha true, antialias false, obtained from the canvas; if missing the component renders nothing. With KHR_parallel_shader_compile the program links asynchronously (a poll loop keeps re-queuing until COMPLETION_STATUS_KHR, then uploads any queued shape); otherwise it links synchronously.
- Canvas sizing: ratio starts at max(dpr prop or min(devicePixelRatio, 2), 2) and shrinks if width×height×ratio² would exceed 8.19 MP. ResizeObserver re-measures and redraws.
- Colours: `color` and `backgroundColor` accept any CSS colour, resolved through a 1×1 canvas probe (kept across renders); backgroundColor defaults to transparent.

## Source processing (async, chunked, cancelable)

- Either `text` (drawn to a transparent canvas: font preloaded via document.fonts.load at 320px, bounding box measured, rendered black) or `imageSrc` (loaded with crossOrigin anonymous; SVG sources upscale to 2048 on the longest side, rasters scale so the longest side is at least 1024 unless already large). Fully opaque images derive an alpha mask from brightness: alpha = clamp((250 − min(r,g,b)) / 30), so dark pixels are metal and white is cut away.
- The mask is read at a working size of 512 on the short side. Interior cells (any non-border cell whose 8 neighbours are all masked) enter a Poisson equation solved with red-black Gauss-Seidel relaxation, 40 iterations, SOR weights 1.9/0.9; work is batched so at most ~2M cell visits run per macrotask (yielded through a MessageChannel), and a canceled/unmounted run bails between batches. The result is normalised by its peak into a smooth depth field: centre deepest, edges shallow.
- Depth (255 × (1 − field/peak)) is packed into the R channel and alpha into G of the final texture at source resolution; upscaling past the working size happens in ~64k-pixel strips, one macrotask each. The texture uploads with mipmaps (LINEAR_MIPMAP_LINEAR).
- Processing sets a pending flag that clears the canvas; failures fall back to an empty shape without errors.

## The chrome shader (fragment pass)

- Image UVs rotate with `rotation`, cover-fit by aspect × `scale`. The stripe coordinate is built by rotating UV by (70 − angle)°, then warped: a radial bump from the shape centre (offset by the diagonal), an edge term from a 3×3-blurred alpha sampled with screen-space derivatives (raised to 1.6), a 2D simplex noise field scrolling with time × 0.3 × speed (`distortion` mixes noise into the edge term and doubles it back into the diagonal), and fixed top/bottom sheen bands.
- Band layout per cycle (`density` = cycles across the diagonal, clamped 0.5–12): a thin bright strip (12% width, thinned by the bump), an even thinner secondary strip (7%, widened by the bump), then a wide gradient band blending bright→dark across its width; borders are smoothsteps softened by `softness` (plus fwidth and extra blur near edges and on small canvases). The bright colour is near-white (dimmed to grey in `lightMode`), the dark colour near-black with a faint blue diagonal tint.
- Chromatic dispersion: the red and blue channels sample the stripe pattern offset by ±dispersion-scaled amounts (both driven by `dispersion` /20), boosted in bump bands and near the shape's top; each channel gets its own extra blur. A tint colour multiplies the result as a sheen (45% of tint alpha).
- Depth rim: in lightMode, regions of depth near 1 darken ~60% for a rolled-metal edge. The `edgeBend` contour term bends flow lines around the silhouette and darkens the outline.
- Reveal intro (1.6s, cubic-eased): the metal pours down the depth field — opacity gated by smoothstep(1 − pour, 1.15 − pour, depth) — while time runs 2.4× faster decaying to 1, so the bands visibly roll during the pour. `intro=false` or reduced motion starts fully poured.
- Compositing: metal alpha × shape alpha; a fully opaque `backgroundColor` clears to that colour and scissor-rects the draw to the shape bounds (+8px margin); transparent background scissored the same way; otherwise fullscreen. A 1/256 hash grain kills banding.

## Interaction & lifecycle

- Pointer tilt: pointermove maps the cursor to targets in ±1.2; a spring (stiffness 60, damping 14, integrated in 240Hz substeps) eases tiltX/tiltY; tilt shifts the gradient centre and phase (`mouseTilt` scales it, 0–1.5). pointerleave returns targets to 0.
- Frame-loop self-sleep: the loop re-queues only while time advances (not `paused`, not reduced motion, `speed` ≠ 0), the intro is running, or the tilt spring is unsettled; otherwise it stops until a pointer event, resize, visibility change or prop update wakes it. IntersectionObserver parks it off-screen.
- Reduced motion: intro starts settled, the flow clock does not advance; the tilt still responds.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete shaders/texture/buffer/VAO/program, clear the engine ref. Prop changes (colors, density, angle, …) redraw immediately; a context-lost event stops the loop for good. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | - | Image to pour the metal over (any URL/data URI; SVG and opaque images handled). Ignored when `text` is set. |
| text | string | - | Text to paint instead of an image. |
| fontFamily | string | "system-ui, sans-serif" | Font family for `text`. |
| fontWeight | number | 800 | Font weight for `text`. |
| color | string | "#ffffff" | Tint sheen over the chrome. |
| backgroundColor | string | "transparent" | Backdrop colour; an opaque value paints behind the metal and tightens the draw rect. |
| density | number | 2 | Stripe cycles across the diagonal, 0.5–12. |
| softness | number | 0.1 | Border softness of the metal bands, 0–1. |
| dispersion | number | 0.3 | Chromatic split of the red/blue bands, −1–1. |
| distortion | number | 0.07 | Simplex-noise wobble of the flow field, 0–1. |
| edgeBend | number | 0.6 | How strongly flow lines bend around the silhouette, 0–1. |
| angle | number | 70 | Source angle of the diagonal flow, in degrees. |
| speed | number | 1 | Flow clock rate; 0 freezes. |
| scale | number | 0.6 | Shape size relative to the box (min 0.05). |
| rotation | number | 0 | Shape rotation in degrees. |
| mouseTilt | number | 0.5 | Pointer-driven gradient tilt, 0–1.5. |
| lightMode | boolean | false | Greyed metal with dark depth rims, for light pages. |
| intro | boolean | true | Plays the 1.6s pour-down reveal. |
| paused | boolean | false | Freezes the flow clock. |
| dpr | number | min(devicePixelRatio, 2) | Base render ratio override; always raised to ≥ 2 and pixel-budget-capped. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of MetallicPaint.jsx and MetallicPaint.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: text mode paints flowing chrome through the glyphs; an image URL with transparency pours through the shape; a fully opaque image still cuts a shape via brightness keying; switching text/image/family rebuilds without leaks; intro pours down the shape once and settles; pointer tilt leans the gradient and springs back on leave; density/softness/dispersion/distortion/edgeBend/angle/scale/rotation all visibly change the material; lightMode reads on a white page; `paused` and `speed=0` freeze while tilt still works; WebGL missing renders empty without errors; prefers-reduced-motion skips the pour; unmount leaves no loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers keep the shape centred without overflow.
