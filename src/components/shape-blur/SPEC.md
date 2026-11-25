Implement the "ShapeBlur" component from zero: a crisp outlined shape — rectangle, circle, regular polygon, star, or the silhouette of any image — that behaves like a camera lens is racking focus around it: a soft gaussian "lens" follows the pointer (or drifts on its own when idle), and inside that lens the outline blurs out into a glowing defocused wash while the rest stays sharp. The blur is real: a mip-pyramid of the shape's coverage is built per change, and the composite samples it across mip levels with bicubic B-spline filtering, with optional chromatic aberration splitting the RGB blur radii. Content passed as children floats above the canvas. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Pure React, zero runtime dependencies beyond React >= 18; two files only: ShapeBlur.jsx (entry, SDF generation, three raw WebGL2 programs) and ShapeBlur.css (root, canvas, content layer). The root `<div class="shape-blur">` (+ `className`/`style`) fills its host (position relative, width/height 100%) and contains `<canvas class="shape-blur__canvas">` (absolute inset 0, pointer-events none, aria-hidden) plus a `shape-blur__content` layer (relative, z-index 1, flex-centred) rendering `children`.
- Context: WebGL2, alpha true, premultipliedAlpha true, antialias false; without it the component renders nothing (no errors). DPR = min(devicePixelRatio, 2). One fullscreen triangle per pass, no blending.
- Colour: `color` accepts any CSS colour, resolved by setting it on the canvas and reading back the computed style (so named colours and CSS variables work); its luminance decides a backdrop tone for overlapping blur (dark colour → light backdrop halo, light colour → dark).
- Three programs share the coverage pyramid. Pass 1 renders the shape's alpha coverage into mip level 0 of a texStorage2D pyramid (R16F when EXT_color_buffer_float exists, otherwise R8) with up to 10 levels; pass 2 downsamples level k−1 into level k through a separable 5-tap kernel (weights 1/4/6/4/1 /16), horizontal into a temp texture then vertical into the pyramid. When the canvas resizes the pyramid re-allocates.

## The shape (pass 1)

- `shape` picks the SDF: rect (half extents from `size` inset of the box, corner radius `roundness × min(half)`), circle (`size × half min-side` radius), polygon (`sides` 3–12, apothem `radius − roundness × 0.3 × radius`), star (same radius, inner radius mixed 42% toward 2 points), or an image silhouette.
- The image path (`src`): the image is drawn centred into a 512×512 field with a 35% pad; alpha coverage converts to a signed distance via an exact two-pass Euclidean distance transform (separable Felzenszwalb sweeps, outside − inside, sqrt); the field uploads as an R16F texture and the shader samples it with bilinear clamping + a clamped-distance term, scaled back into pixel units. A failed load falls back to the chosen primitive shape; while loading nothing renders.
- `rotation` (deg) spins the shape; `spin` (deg/s) adds a continuous rotation clock. Coverage draws as `thickness`-wide strokes (`echoes` concentric strokes spaced `spacing` px outward for outlines), or a filled body plus echo strokes inward when `fill` is on (max 24 echoes). Everything is anti-aliased against 1px.
- The pyramid only rebuilds when the canvas size, shape, sides, extents, radius, roundness, thickness, fill, echoes, spacing or rotation angle (5-decimal key) change — pointer movement never triggers it.

## Defocus composite (pass 3)

- Lens: a gaussian blob centred at the lens position with radius `lensSize × min(width, height)` and soft edge `lensSoftness` (smoothstep between (1−softness)·R and R). Amount = lens strength inside, flipped by `focus` (true = focus inside the lens, blur outside; false = the pointer defocuses).
- Sigma = blur × amount × DPR. The coverage is sampled across mip levels: below σ 0.6 the sharp level 0; σ < 1.7 interpolates into the chain; beyond, lod = log2(σ/0.866), with B-spline bicubic weights between the two neighbouring levels, clamped at the top. `chroma` (0–1) samples R/G/B at slightly different σ and radially split positions (≤ 0.3σ texels).
- Outline spread: for unfilled shapes the blur lifts by up to +0.6 around the spread distance (min(spread, spacing)) normalised by thickness, so thick defocused outlines bloom rather than fade.
- Tone curve: coverage above 0.85 compresses toward a 0.85–1.0 rolloff; a 1/255 grain dithers the result; output premultiplies colour × coverage plus backdrop × (alpha − coverage).
- Children render above the canvas, so labels or UI can sit inside the defocusing shape.

## Lens behaviour, timing & lifecycle

- The lens target follows the pointer (window-level pointermove; coordinates recentred, capture active within a margin of lensSize around the box) with an exponential ease (τ 0.1s when the pointer is active, 0.33s otherwise) and strength eases toward 1 in / 0 out (rate 4/s).
- Idle drift (`idle`, no pointer): the lens wanders on two layered-sine paths scaled to the shape extents at 85% strength. Reduced motion freezes drift and spin.
- Frame-loop self-sleep: the loop re-queues while the lens is chasing, drifting, spinning, or the strength spring is settling; otherwise it stops until a pointer event, resize, prop change or visibility change wakes it. An IntersectionObserver re-wakes on scroll-back (resetting dt).
- Unmount: cancel the frame, disconnect both observers, remove listeners, delete pyramid/field/temp textures, framebuffer, buffer, VAO and all programs/shaders. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| shape | "rect" \| "circle" \| "polygon" \| "star" | "rect" | Primitive silhouette; ignored while an image field is loaded. |
| src | string | - | Image whose silhouette becomes the SDF (alpha, or flat shapes on any background). |
| sides | number | 6 | Polygon/star point count, 3–12. |
| size | number | 0.8 | Shape extent relative to the box, 0.05–1. |
| roundness | number | 0.2 | Corner/vertex rounding, 0–1. |
| thickness | number | 2 | Outline stroke width in px, 0.5–40. |
| fill | boolean | false | Fill the body and echo strokes inward instead of outward. |
| echoes | number | 1 | Number of concentric strokes, 1–24. |
| spacing | number | 12 | Distance between echo strokes in px (min 1). |
| color | string | "#ffffff" | Stroke colour; any CSS colour. |
| blur | number | 16 | Max defocus strength (gaussian σ in px before DPR). |
| lensSize | number | 0.3 | Lens radius as a fraction of min(width, height), 0.02–2. |
| lensSoftness | number | 0.7 | Lens edge softness, 0–1. |
| focus | boolean | false | true = sharp inside the lens and blurred outside. |
| chroma | number | 0.3 | Chromatic aberration of the blur, 0–1. |
| rotation | number | 0 | Static shape rotation in degrees. |
| spin | number | 0 | Continuous rotation speed, deg/s. |
| idle | boolean | true | Lens wanders on its own while the pointer is away. |
| children | ReactNode | - | Content layered above the canvas. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of ShapeBlur.jsx and ShapeBlur.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: rect/circle/polygon/star outlines render crisp and blur inside the wandering lens; pointer movement steers the lens with a soft trail and it returns to idle drift; focus flips the in/out defocus; fill swaps echo direction; echoes spacing renders concentric strokes; an image src traces the silhouette (and falls back to the primitive on failure); chroma splits colour edges at high blur; children stay sharp above the canvas; CSS colour strings resolve (named colours included); resizing re-allocates the pyramid; prefers-reduced-motion stops drift and spin; the loop sleeps when settled; unmount leaves no loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers keep the shape centred without overflow.
