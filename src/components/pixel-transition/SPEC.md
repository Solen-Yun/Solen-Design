Implement the "PixelTransition" component from zero: a card whose two contents swap under a flood of solid pixels — grid cells pop in one by one until the card is fully covered, the content underneath switches while hidden, then the pixels clear again to reveal it. The grid size, pixel colour, mosaic shading, pop/grow/fade cell animation, square/rounded/circle shapes and random/dither/ripple/wipe orderings are all configurable, with hover or click trigger, controlled mode and a once latch. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18 + Canvas 2D, two files only: PixelTransition.jsx (entry, sequencer, canvas painter) and PixelTransition.css (all styles). No runtime dependencies, no iframe.
- Root is a `<div>` with class `pixelated-image-card` (+ className), tabIndex 0, position relative, width 300px (max-width 100%), overflow hidden, border-radius 16px, isolation isolate, transparent tap highlight, plus the caller's style. Sizing: when aspectRatio ends with "%" a padding-top spacer div supplies the height (default "100%" = square); otherwise the string is applied as CSS aspect-ratio directly ("16 / 10").
- Two content layers: `pixelated-image-card__default` holding firstContent and `pixelated-image-card__active` holding secondContent, both absolute inset 0; exactly one is visible — visibility is toggled inline, initially from the active prop at first render.
- A canvas `pixelated-image-card__pixels` sits above both (z-index 1, inset 0, pointer-events none, aria-hidden), backed at devicePixelRatio clamped to 2, re-allocated and redrawn on resize via ResizeObserver.
- :focus-visible shows a 2px currentColor outline offset 3px.

## Transition mechanics

- A single progress value runs 0 → 1 (or back). Each frame it advances by dt / (2 × animationStepDuration) (seconds, floored at 0.05) — a full cover + reveal takes 2 × duration. fps (clamped 0–120; 0 = every frame) throttles paints to at most one per 1000/fps ms.
- Phase split: progress < 0.5 covers (cells appear), progress ≥ 0.5 uncovers. While covering the base layer stays visible; the moment progress crosses 0.5 the visibility flips to the other layer — the swap happens fully hidden. Settling at 1 flips an internal base flag, resets progress to 0 and the canvas clears.
- Grid: gridSize columns (rounded, clamped 2–80), cell = width / gridSize, rows = ceil(height / cell), the block vertically centred. Each cell's delay comes from a seeded integer hash(col, row, seed) with a fresh random seed per transition. Patterns: "random" — the raw hash. "dither" — (4×4 Bayer matrix value + hash) / 16. "ripple" — normalized distance from the origin point (pointer position, or centre). "wipe" — normalized distance from the nearest edge at transition start (left/right/top/bottom chosen by the pointer position, left for keyboard/programmatic), mixed with noise by randomness: base × (1 − randomness) + hash × randomness (randomness clamped 0–1; "random" ignores it).
- pixelAnimation: "pop" — a cell is binary, drawn when local ≥ delay while covering and erased when local ≥ delay while uncovering. "grow" / "fade" — a smooth window of width 0.35: amount = smoothstep(clamp((local − delay × 0.65) / 0.35)); grow scales the cell from 0 to full size, fade keeps full size and quantizes alpha to 16 levels.
- Seal: during the last 22% of covering and the first 22% of uncovering a smoothstep seal value closes the mosaic shut — the per-cell gap shrinks to 0, rounded corners straighten and circles inflate up to 45% — so the fully covered state is one seamless slab. Full-size squares snap to whole device pixels to avoid hairline seams.
- mosaic (0–1): the pixel colour is resolved through getComputedStyle plus a 1×1 probe canvas (any CSS colour works, themes included) into rgba; luminance > 0.5 picks black as the shade target, otherwise white; 5 tonal steps mix the base colour toward the target by mosaic × 0.5 × (step / 4) and each cell picks a tone by hash. Tone and alpha level batch cells into shared Path2D objects — one fill per (tone, level) pair.
- pixelShape: "square" (default), "rounded" (corner radius size × 0.3 × (1 − seal)), "circle" (radius size/2 × (1 + 0.45 × seal)). gap (px, capped at 80% of a cell) separates cells and closes with the seal.
- Origin: transitions started by pointer events use the cursor position clamped into the box; keyboard and programmatic transitions use the centre.

## Interaction & control

- trigger "hover" (default): pointerenter (non-touch) covers; pointerleave reverts unless keyboard focus holds it open. :focus-visible opens and blur closes when not hovered. The root stays a plain focusable div (no button role).
- trigger "click": the root gets role="button"; Enter/Space toggle (default prevented); pointer clicks toggle, including touch taps (in hover mode mouse clicks are ignored — enter already covered it).
- once: once covered, leave/click-to-close requests are ignored — the card latches onto the second content.
- Controlled: pass active (boolean); the component renders that state and animates on change, reusing the last pointer position as origin when available; hover/click then only report through onActiveChange and stage the point. Uncontrolled mode calls onActiveChange for every requested change as well.
- prefers-reduced-motion: reduce — progress jumps straight to the target in one frame, so the swap is effectively instant with a single repaint.
- Unmount: cancel the frame, disconnect the observer, drop the control handle. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| firstContent | ReactNode | - | Content shown initially (and while the pixels cover the swap). |
| secondContent | ReactNode | - | Content revealed after the swap. |
| gridSize | number | 10 | Columns of the pixel grid, 2–80. |
| pixelColor | string | "#ffffff" | Pixel colour; any CSS colour resolves through computed style. |
| mosaic | number | 0 | 0–1 mix of 5 tonal shades of the pixel colour. |
| animationStepDuration | number | 0.4 | Seconds for each of cover and reveal; floored at 0.05. |
| pattern | "random" \| "dither" \| "ripple" \| "wipe" | "random" | Cell firing order. |
| randomness | number | 0.3 | Noise mixed into ordered patterns, 0–1. |
| pixelAnimation | "pop" \| "grow" \| "fade" | "pop" | Cell entrance: binary pop, scale up, or alpha fade. |
| pixelShape | "square" \| "rounded" \| "circle" | "square" | Cell glyph. |
| gap | number | 0 | Gap between cells in px; closes when sealed. |
| fps | number | 0 | Paint cap in frames per second, 0–120; 0 = every frame. |
| trigger | "hover" \| "click" | "hover" | What toggles the swap. |
| active | boolean | - | Controlled swap state. |
| once | boolean | false | Cover once and never revert. |
| onActiveChange | (active: boolean) => void | - | Fires whenever the requested state changes. |
| aspectRatio | string | "100%" | Box ratio ("16 / 10") or a % padding hack ("100%"). |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of PixelTransition.jsx and PixelTransition.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: cover and reveal swap the layers exactly while hidden at every gridSize from 2 to 80; all four patterns fire visibly (dither orderly, ripple from the pointer, wipe from the nearest edge); pop/grow/fade differ and fade quantizes alpha; shapes square/rounded/circle seal into a seamless slab at full coverage; mosaic produces tonal cells and custom pixelColour resolves (theme variables included); hover, click and keyboard all drive it; once latches; controlled active works with onActiveChange; reduced motion swaps instantly; resize redraws; unmount leaves no loop or observer; 375 / 768 / 1440 wide without overflow.
