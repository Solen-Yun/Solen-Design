Implement the "GridDistortion" component from zero: an image background rendered on a WebGL2 canvas that breaks into a grid of blocks under the cursor — dragging smears the blocks along the stroke (or pushes/swirls them, per mode), a spring-less relaxation pulls them back into place, idle time summons a phantom cursor that keeps the surface gently alive, and clicking fires an outward ripple through the cells. Cell displacements live in a CPU simulation uploaded as a float field texture; the shader shifts image samples per block with optional smoothing and chromatic aberration. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components (the image is supplied by the caller as any URL or data URI).

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GridDistortion.jsx (entry, CPU simulation, shaders) and GridDistortion.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="distortion-container">` — position relative, width 100%, height 100%, min-width/min-height 0, overflow hidden, accepting className and style — wrapping a single `<canvas class="distortion-container__canvas" aria-hidden="true">` absolutely filling it. The root must be sized by the parent.
- WebGL2 context with alpha: true, premultipliedAlpha: true, antialias: false. One program draws a fullscreen triangle. Context or program failure renders nothing and never throws.
- Textures: unit 0 is the image (initially 1×1 transparent; after load, mipmapped LINEAR_MIPMAP_LINEAR with MIRRORED_REPEAT on both axes so the cover-fit sampling never bleeds in edge garbage); unit 1 is the displacement field, an RG32F texture of cols × rows texels with NEAREST filtering, updated each frame with texSubImage2D.
- Image loading: `imageSrc` (prop, change-tracked) loads through `new Image()` with crossOrigin anonymous and async decoding; a monotonically increasing request id discards stale loads. On load the aspect is recorded and the grid relayouts. No image yet → transparent canvas.
- Cover fit: uCover scales uv so the image covers the container without distortion (extra crop split evenly), keeping the full bleed.

## Simulation

- Grid: cols = grid prop (2–120), rows = round(cols × height / width) — cells stay square-ish. Each cell stores a 2D displacement in normalized units.
- Pointer brush: while the pointer moves inside, each frame the delta (dx, dy) is brushed into cells within reach = radius × container width: falloff t = 1 − (d/reach)², gain = strength × 18 × weight × t². Mode "drag" applies the pointer delta itself; "push" applies the radial direction × stroke speed; "swirl" applies the tangent (−ny, nx) × speed. The resulting displacement magnitude is soft-clamped through tanh at limit = (0.25 + strength) × 0.4 × width, so hard swipes distort far but never tear.
- Relaxation: every frame all displacements decay by relaxation^(dt × 60) (default 0.96 at 60 fps — a smooth settle-back), and values under 1e-5 zero out.
- Idle phantom: after 2.5 s without pointer movement a phantom cursor fades in (over ~1 s, out 3× faster) and wanders a Lissajous path across the image, brushing with weight idle × 0.6 × phantom² — the surface keeps breathing with no user present. Under reduced motion the phantom stays off.
- Click ripple: clicking (clickRipple on, not reduced) records a ripple (max 4 concurrent, oldest dropped), life 1.6 s: the ring front travels age × 0.75 × diagonal, a gaussian band (band width = max cell size × 1.2 + 3% of the diagonal) pushes cells radially outward with amount = width × (0.03 + strength × 0.3) × fade (1 − age)².
- Intro: on first image load (intro on, not reduced) every cell is scrambled with deterministic hash noise up to ±12% of the smaller side, so the image starts shattered and visibly relaxes into place; the reveal alpha fades 0 → 1 over 0.6 s.

## Shader

- The fragment shader fetches each pixel's block displacement twice: blocky (nearest texel of the containing cell) and soft (bilinear blend of the 4 surrounding cells with a smoothstep on the fractional part); shift = mix(blocky, soft, softness). So softness 0 gives the chunky broken-glass look, 1 a liquid smear.
- Chromatic aberration: with chroma > 0 the red channel samples at shift × (1 + 0.35 × chroma) and blue at shift × (1 − 0.35 × chroma), fringing the edges of displaced blocks.
- Output: image color × reveal with premultiplied alpha — before the intro reveal the canvas is fully transparent.

## Loop & lifecycle

- The rAF loop keeps running while any cell has energy (peak displacement > 0), ripples are alive, the phantom is active (idle > 0, not reduced), or the reveal hasn't finished; otherwise it sleeps and wakes on pointer move, click, resize, visibility change or prop change. dt clamped to 0.05 s.
- Resize: DPR = min(devicePixelRatio, 2); the canvas resizes with the container and the grid re-allocates when cols/rows change (displacements reset). ResizeObserver + IntersectionObserver gate rendering while off-screen.
- Reduced motion: intro completes instantly (reveal jumps to 1, no scramble), the phantom stays off, and clicks don't ripple; dragging still distorts and settles.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete both textures, the buffer, program and shaders. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | - (required) | The image behind the grid: any URL or data URI; reloads when it changes. |
| grid | number | 15 | Columns of the block grid, 2–120; rows follow the aspect. |
| radius | number | 0.18 | Cursor brush radius relative to container width, 0.01–1. |
| strength | number | 0.15 | Brush gain and distortion limit, ≥ 0. |
| relaxation | number | 0.96 | Per-frame decay of displacements, 0–0.995; lower snaps back faster. |
| mode | "drag" \| "push" \| "swirl" | "drag" | Brush character: smear with the stroke / shove blocks radially / twist them tangentially. |
| softness | number | 0 | 0–1: mixes blocky per-cell shifts toward smoothed bilinear shifts. |
| chroma | number | 0 | 0–2: RGB split strength on displaced blocks. |
| idle | number | 0.3 | 0–1: phantom cursor strength after 2.5 s without input; 0 disables it. |
| clickRipple | boolean | true | Clicking fires an outward ripple through the cells. |
| intro | boolean | true | First load starts shattered and settles while fading in. |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of GridDistortion.jsx and GridDistortion.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the image renders cover-fit on the canvas at any container size; dragging drags blocks along the stroke and they relax back; mode push/swirl shove and twist around the cursor; rapid swipes distort far without tearing (tanh clamp); grid 4 vs 40 changes block size; softness 0 is blocky, 1 is liquid; chroma fringes displaced edges; clicking fires an expanding ring; after 2.5 s idle the phantom keeps the field alive and stops the moment you move; intro shatters then settles; changing imageSrc swaps the texture without stale frames; reduced motion shows a still image with drag still working; 375 / 768 / 1440 widths render without overflow; scroll-away/tab-away sleep the loop; unmount leaves no listeners, observers or GL objects.
