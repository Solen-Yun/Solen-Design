Implement the "PixelSwap" component from zero: two stacked contents in one box, swapped by a springy wave of chunky pixels — a grid of cells springs up (scale from 0, optional overshoot, screw-in spin and corner rounding), and the incoming layer is revealed through their union; the wave starts wherever the cursor enters (or from the centre, edges, a sweep, diagonal or spiral), each cell is a damped spring, and an intro wave builds the first content in on mount. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18 + CSS, two files only: PixelSwap.jsx (entry, grid builder, spring integrator, path writer) and PixelSwap.css (all styles). No runtime dependencies, no iframe, no canvas — the pixels are drawn as one SVG-style `clip-path: path("…")` on the incoming layer, rewritten every frame.
- Root is a `<div>` with class `pixel-swap` (+ className), position relative, width 100%, overflow hidden, isolation isolate, outline none; inline `aspectRatio` from the prop (default "16 / 10"); `data-active` while showing the second layer; `data-swapping` while a wave runs; :focus-visible shows a 2px currentColor outline offset 3px.
- Two absolutely stacked layers (`pixel-swap__layer`, inset 0) with z-index 0 and 1: layer 0 holds firstContent, layer 1 secondContent. Hidden layers get `visibility: hidden` via `data-visible="false"` and `aria-hidden="true"`.
- Grid: pixelSize floored at 8 px plus gap; when columns × rows would exceed 600 cells the cell size is scaled up by sqrt(count / 600) and the grid recomputed; the block is centred with even margins; each cell stores its centre and normalized 0–1 grid coordinates.

## Wave mechanics

- Every cell carries a spring value 0 → 1 integrated with fixed 240Hz sub-steps each frame: omega = 2π / (pixelDuration / 1000) (pixelDuration floored at 60ms), damping ratio = clamp(1 − bounce, 0.15, 1) — bounce 0 is critically smooth, 1 rings hard. A cell settles (snaps to goal) when |x − goal| ≤ 0.001 and |v| ≤ 0.01.
- Flip schedule: each cell's order is its pattern value mixed by randomness (clamped 0–1) with a per-cell hash; orders are normalized so the earliest moving cell starts at 0 and delays spread over duration ms (floored 0). Patterns: "pointer" — distance from the entry point (default centre) normalized by the farthest corner; "random" — hash; "center" / "edges" — radial from the centre / from the edges; "left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top" — axis sweeps; "diagonal" — (x + y) / 2; "spiral" — angle + radius blend.
- Pixel drawing: drawn half-size = min(x × 1.08, 1.25) × (half + cover × smoothstep(0.6, 0.93, x)) where cover includes half the gap plus 0.5px — cells overshoot their slot mid-flight so no hole opens between neighbours, and merge seamlessly when fully on. pixelScale (0–0.9) seeds flipping-in cells at that value instead of 0, so they pop in already visible. pixelRadius (0–50 → fraction of size) rounds corners, relaxing back to sharp as the cell reaches 1. pixelSpin (degrees, ±360) rotates each cell by spin × (1 − x) so cells screw into place. Path coordinates are rounded to 0.1px; axis-aligned squares emit compact H/V segments, rotated cells full polygon arcs.
- The incoming layer's clip-path is the concatenation of all cell paths; when the path is empty the layer hides. Layer 0 stays fully visible beneath: moving to the second layer, cells grow and the new content builds in through them; moving back, cells shrink away and the old content dissolves through them. When the wave settles, visibility latches onto the target layer and the clip clears.
- Rapid re-trigger mid-wave reuses the running engine: unsettled cells get replanned flip times (earliest unsettled order normalized to now) without restarting settled ones, and each cell flips to the new desired state when its flip time passes.
- Intro (default on, skipped when initialActive is set): on mount, if the first layer contains images that have not loaded, the reveal waits for their load/error (capped at 3s), then launches an engine in intro mode — cells start at 0 and build the first layer in pixel by pixel. Requests arriving during the intro queue and replay when it finishes.
- prefers-reduced-motion: reduce — waves are skipped entirely; both layers toggle instantly and onComplete still fires. The same instant path applies when the box has no measurable size.
- Unmount: cancel the frame loop. Same-page instances are independent.

## Interaction & control

- trigger "hover" (default): the root is focusable (tabIndex 0); pointerenter (non-touch) asks for the second layer with the entry point as wave origin; pointerleave asks back; keyboard :focus-visible opens and blur closes; clicks with detail 0 (keyboard activation) and touch taps toggle.
- trigger "click": the root gets role="button" and aria-pressed; any click toggles with the pointer position as origin; Enter/Space toggle (origin centre, default prevented).
- Controlled: pass active (boolean); the component animates to it on change; hover/click then only stage the pointer origin and report. Uncontrolled mode keeps internal state seeded by initialActive. onActiveChange fires for every requested change in both modes; onComplete(target) fires when a wave settles on the target layer.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| firstContent | ReactNode | - | Base layer content, built in by the intro wave. |
| secondContent | ReactNode | - | Content the wave builds in on activate. |
| pattern | "pointer" \| "random" \| "center" \| "edges" \| "left-to-right" \| "right-to-left" \| "top-to-bottom" \| "bottom-to-top" \| "diagonal" \| "spiral" | "pointer" | Wave origin and firing order. |
| pixelSize | number | 48 | Cell size in px, floored at 8; auto-enlarged past 600 cells. |
| gap | number | 0 | Gap between cells in px. |
| pixelRadius | number | 0 | Corner rounding as a percentage of size, 0–50; sharpens when settled. |
| pixelScale | number | 0 | Cells pop in at this scale instead of from 0, 0–0.9. |
| pixelSpin | number | 0 | Degrees each cell rotates while settling, ±360. |
| duration | number | 400 | Wave span across the grid in ms; floored at 0. |
| pixelDuration | number | 350 | Per-cell spring period in ms; floored at 60. |
| randomness | number | 0.2 | Noise mixed into the order, 0–1. |
| bounce | number | 0.3 | Spring overshoot 0–1 (damping ratio = 1 − bounce). |
| trigger | "hover" \| "click" | "hover" | What drives the swap. |
| intro | boolean | true | Build the first layer in pixel by pixel on mount. |
| initialActive | boolean | false | Start showing the second layer. |
| active | boolean | - | Controlled swap state. |
| onActiveChange | (active: boolean) => void | - | Fires whenever the requested state changes. |
| onComplete | (active: boolean) => void | - | Fires when a wave settles on the target layer. |
| aspectRatio | string | "16 / 10" | Box ratio applied as CSS aspect-ratio. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of PixelSwap.jsx and PixelSwap.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: the wave starts at the cursor entry point with pattern "pointer" and from the correct side for every sweep/diagonal/spiral pattern; cells overshoot mid-flight with bounce > 0 and never leave holes between neighbours; pixelRadius/spin/scale and gap all read on both grow and dissolve; rapid hover flicks replan mid-wave without stuck cells; hover, click and keyboard triggers all work; controlled active, onActiveChange and onComplete behave; the intro waits for layer images (3s cap) and builds in once; reduced motion swaps instantly; unmount leaves no frame loop; 375 / 768 / 1440 wide without overflow.
