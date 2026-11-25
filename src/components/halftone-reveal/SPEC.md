Implement the "HalftoneReveal" component from zero: a photograph reprinted as a halftone — rotated screens of round/ellipse/square/diamond/line/cross dots sized by the image's tone — that the cursor burns through to the real photo along a soft trail which knits back shut, while clicks fire expanding shockwave rings. Three print modes: single-plate mono, two-plate duotone with an accent ink, and full colour — CMYK process separation on light paper (an iterative Newton solve for the cyan/magenta/yellow/black absorbances) or additive RGB emission on dark paper — with plate misregistration shifting the screens apart like an old print. An intro grows the halftone in cell by cell from the centre. Two WebGL2 fragment passes total. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components (the demo supplies its own image; the component accepts any image `src`).

## Structure & rendering

- Pure React, zero runtime dependencies beyond React >= 18; two files only: HalftoneReveal.jsx (entry, two raw WebGL2 programs) and HalftoneReveal.css (root + canvas rules). Root `<div class="halftone-reveal">` (+ `className`/`style`) fills its host (position relative, width/height 100%, overflow hidden); `<canvas class="halftone-reveal-canvas">` is absolute inset 0, aria-hidden. DPR = min(devicePixelRatio, 2), alpha off, antialias off, one fullscreen triangle per pass.
- Two passes. The **mask pass** maintains a monochrome trail in two ping-pong render targets at half the canvas size (RGBA16F when EXT_color_buffer_float exists, else RGBA8 with a 1.5/255 minimum fade so trails fully decay; on resize the old mask blits across with NEAREST). The **view pass** prints the halftone and blends the reveal.
- The image loads with crossOrigin anonymous into a mipmapped LINEAR texture; a 32×32 border-pixel probe averages a matte colour and, if the border is mostly opaque with variance < 0.06, flags the photo as flat-backed so its background keys onto paper. Hex/`rgb()` colours parse through a 1×1 canvas probe with caching (inkColor, accentColor, paperColor); paper luminance < 0.5 selects the dark-paper print path.
- The photo rect follows `fit`: cover or contain of the canvas, centred; the dot screen samples with mip LOD = log2(cell × texel density).

## The halftone print (view pass)

- Cell grid: square cells of `cellSize` px (clamped 2–80) rotated by `angle`. Six dot metrics: circle, ellipse (×0.8/×1.15), square (Chebyshev), diamond (Manhattan), horizontal line, vertical line. Dot radius = tone mapped through a per-shape reach curve (area-linear for circles/squares, custom for the rest) × `dotScale` (0.2–2); edges anti-aliased with fwidth; `roughness` (0–1) perturbs the metric with value noise.
- Tone: the photo sample is graded by `contrast`/`brightness` (around 0.5) and tone-curved (pow 1.5); `invert` flips it. Coverage = tone re-mapped between ink and paper luminance, pressed by alpha (0.05–0.94 range) so transparent areas stay paper.
- Modes:
  - "mono": one screen at `angle`, ink on paper.
  - "duotone": two screens at `angle ± 30°`, ink + `accentColor`; on light paper the inks multiply, on dark paper they add (clamped).
  - "color": on light paper a CMYK process print — the graded colour converts to cyan/magenta/yellow absorbances plus a black underlay via up to 3 Newton iterations on the absorbance matrix (a Neugebauer-style separation, fixed primaries), each plate screened at its own angle; on dark paper three additive RGB plates (fixed vivid primaries) emit on the dark ground.
- Misregistration: `misregistration` (0–1) shifts each secondary plate by up to 0.35 × cellSize along per-plate drift vectors — the classic off-register print look; the reveal photo stays perfectly registered.
- Intro (1.4s, quadratic ease, `intro` on): each cell grows in when `intro × 1.7` passes `distance-from-centre × 1.15 + hash(cell) × 0.06`, over a 0.45 window — a dithered radial wipe. Reduced motion skips it.

## Reveal & interaction

- The mask decays every frame by dt/linger (`linger` seconds); the cursor stamps a capsule from the smoothed previous brush position (exponential follow, τ 0.035s) with radius `revealRadius × (0.45 + 0.55 × presence)` and soft band `radius × softness` (0–1), at strength = presence (eases over ~0.16s). Mask value smoothsteps and normally reveals the sharp photo; `reverse` swaps so the cursor reprints the halftone instead.
- Clicks (any pointer type; mouse left button) push shockwaves — at most 4 live, 1.3s each: the radius sweeps to the farthest corner on a sin-out ease while the interior fill fades as the wave passes, temporarily revealing the photo in a ring.
- `wander`: while the pointer is away the brush target drifts along layered-sine paths, blending in over 1.2s; reduced motion disables it.
- Listeners on the container: pointermove, pointerenter, pointerdown, pointerleave, pointercancel; document visibilitychange re-wakes the loop.
- Frame-loop self-sleep: frames run while the pointer is inside, wandering, presence > 0.002, bursts are alive, the trail has not fully decayed since presence last exceeded 0.002 (linger + 200ms), or the intro is unfinished; otherwise the loop stops until an event, prop change or resize wakes it (resize is applied lazily on the next frame).
- Unmount: cancel the frame, drop the image onload, disconnect both observers, remove all listeners, delete both mask targets, the image texture, buffer, VAO and programs. Changing `src` reloads the texture in place. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | built-in landscape photo | The image to halftone. Any URL or data URI loadable with crossOrigin anonymous. |
| fit | "cover" \| "contain" | "cover" | How the photo fills the canvas. |
| mode | "mono" \| "duotone" \| "color" | "mono" | Print mode: single plate, ink+accent plates, or CMYK/RGB process. |
| shape | "dot" \| "ellipse" \| "square" \| "diamond" \| "line" \| "cross" | "dot" | Halftone cell silhouette. |
| cellSize | number | 6 | Screen cell size in px, 2–80. |
| angle | number | 45 | Screen rotation in degrees. |
| dotScale | number | 1 | Global dot size multiplier, 0.2–2. |
| inkColor | string | "#120f17" | Primary ink. |
| accentColor | string | "#ff4f2a" | Second ink for duotone mode. |
| paperColor | string | "#ffffff" | Paper colour; luminance < 0.5 switches to the dark-paper print path. |
| contrast | number | 1.1 | Tone slope around mid grey. |
| brightness | number | 0 | Tone offset after contrast. |
| invert | boolean | false | Flips the tone so shadows print light. |
| roughness | number | 0 | Noise jitter of the dot grid, 0–1. |
| misregistration | number | 0 | Off-register drift of secondary plates, 0–1. |
| revealRadius | number | 160 | Cursor brush radius in px. |
| softness | number | 0.6 | Brush edge softness as a fraction of the radius, 0–1. |
| linger | number | 1.2 | Seconds for revealed cells to knit shut; 0 closes immediately. |
| reverse | boolean | false | Inverts the reveal: the cursor reprints the halftone over the photo. |
| wander | boolean | false | The burn spot wanders while the pointer is away. |
| clickBurst | boolean | true | Clicks fire an expanding shockwave ring. |
| intro | boolean | true | Plays the 1.4s radial cell-by-cell grow-in. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of HalftoneReveal.jsx and HalftoneReveal.css plus install steps and a usage example (pass your own image via `src`); no ellipses, no "fill in the core yourself" placeholders.
- Validate: the photo prints as a halftone at the chosen mode/shape/cell/angle and re-screens live; the cursor opens the real photo with a soft trail that lingers and closes; clicks fire shockwaves (capped at 4); reverse flips the reveal; duotone shows the accent plates offset by misregistration; color mode separates correctly on white paper (CMYK) and dark paper (additive RGB); all six shapes render their metric; invert flips tones; roughness jitters the grid; flat-backed photos key onto paper; wander drifts while idle; changing src reloads cleanly; the loop sleeps when idle; prefers-reduced-motion skips the intro and wandering; unmount leaves no loop, observers, listeners or GL objects; 375 / 768 / 1440 wide containers resize the print without overflow.
