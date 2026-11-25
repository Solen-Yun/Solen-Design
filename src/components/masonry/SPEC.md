Implement the "Masonry" component from zero: a masonry image gallery that lays tiles into the shortest column, springs every tile into place (with configurable bounce) whenever the grid forms or reflows, reveals tiles as they scroll into view with a blur-to-focus fade, lets you drag tiles to reorder the grid, and opens images in a lightbox that zooms out of the tile. Hover can zoom, lift, tilt; captions slide in from the bottom. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, three concerns in two files: Masonry.jsx (entry, layout math, spring engine, drag reorder, lightbox) and Masonry.css (tiles, captions, ghost, lightbox). Dependencies: react-dom (for the lightbox portal) and a small icon set (arrow-left, arrow-right, arrow-up-right, cancel icons). React >= 18. No iframe, no canvas.
- Root is a `div.masonry` (position relative, width 100%) carrying `--masonry-radius`, `data-hover` (the hover effect name) and `role="list"`. Its height is set imperatively from the layout. Each tile is an absolutely positioned `div.masonry__item` (width/height from the layout, will-change transform, role listitem, data-id) holding one interactive card: an `<a target="_blank" rel="noopener noreferrer">` when lightbox is off and the item has a url, otherwise a `<button type="button">` (or plain div when neither click behaviour applies), all sharing aria-label from title/alt and a focus-visible outline (2px, offset 3px).
- Card visual: rounded overflow-hidden media box (placeholder grey until the image loads, image fades in over 0.5s via data-loaded) wrapping a parallax layer and the cover-fit `<img>`; a bottom caption (white text on a tall black gradient) shows title (14px, 600) and description (12px, 80%); caption modes: "hover" (slides up from +6px on hover or card focus-visible), "always", "none".
- Lightbox: a portal to document.body — a fixed inset-0 dialog (role dialog, aria-modal) with a near-black backdrop (rgba(9,9,11,0.9)), the image fixed and sized to fit the viewport minus 16/72px padding (min 40px) with room reserved for a caption row when the item has title/description/url, a caption with an optional "Open" link, and 44px round close/prev/next buttons (prev/next only when more than one item). While open, document overflow is hidden; on close, focus returns to the originating card; opening focuses the close button.

## Layout engine

- Columns: a fixed `columns` number (> 0) or "auto" computing `floor((width + gap) / (max(40, columnWidth) + gap))`; column size = (width − gap×(count−1)) / count, re-measured by a ResizeObserver (rounded width).
- Placement: shortest-column packing — each item (span clamped to available columns, default 1) picks the start column whose running height (over its span) is lowest (ties by > 0.5px), w = size×span + gap×(span−1), h = w × aspect; committed heights advance by h + gap. Aspect: item width/height when both given, else a measured image ratio, else height/600, else 1. Items missing a height are measured by loading `img` offscreen (naturalHeight/naturalWidth); the grid renders as soon as all items are known or after a 2.5s timeout. Tile positions are rounded to integers; root height = tallest column − gap.
- Order state: a `setOrder` array of ids overlays the items array (missing ids appended), reset whenever the items prop changes; removed items become ghosts.

## Spring engine

- Every tile owns a spring { x, y, scale, velocities, targets } integrated at 240Hz sub-steps with a damped harmonic oscillator: omega = 2π / duration, damping ratio = 1 − bounce (clamped 0.1–1) — bounce > 0 overshoots, 0 settles critically. Tiles rest when within 0.05px / 0.0005 scale and snap to target. The loop self-sleeps when no spring is active.
- First reveal: tiles start hidden at their target position (opacity 0); when their image has loaded (or the 2.5s timer fires) they join a reveal batch, sorted by layout position (top-to-bottom, then left-to-right), each starting at `start = now + rank × stagger × 1000`. The reveal animation offsets the tile from the `animateFrom` direction (bottom/top/left/right by 60px + 35% of tile height, capped; center = shrinks from the visible viewport centre at scale 0.55; random picks per tile) at scale 0.96, then springs into place while opacity eases up (cubic out) and — with blurToFocus — a blur that decays from 12px to 0 with the same ease. Reduced motion or animateFrom "none" places tiles instantly.
- Reflow: on any layout change shown tiles re-spring to their new targets; when a tile's width changes it scales proportionally so the image doesn't jump. Scroll reveal: with revealOnScroll on, an IntersectionObserver (rootMargin bottom −6%) reveals each tile once when it enters; tiles above still reveal in batches.
- Leaving tiles become ghosts — absolutely positioned copies that animate 4% down-right to 92% scale and fade out over 320ms (1ms under reduced motion) via the Web Animations API, then unmount.
- Parallax: with parallax 0–1, the inner `[data-parallax]` layer of each tile shifts vertically against scroll (clamped to ±20% of tile height, image over-scaled by 1 + parallax × 0.4 to hide the gap), driven by capture-phase scroll/resize listeners throttled to one rAF, resolving the nearest scrollable ancestor.

## Drag reorder

- Pointer down on a tile (mouse left button only, not touch, not while the lightbox is open) arms a drag; after 6px of movement the tile becomes active: it follows the pointer 1:1 (scale 1, grabbing cursor, elevated z-index, bigger shadow), other tiles' dimming resets. Each frame the dragged tile's centre is matched against the centre of every possible slot — computed by re-running the packing with the dragged tile removed and re-inserted at each index — and if a strictly nearer slot passes a threshold (0.8 × current distance − 6) the order array updates so the grid reflows around the tile.
- Release restores spring control (one kick), suppresses the click that follows, and calls onReorder(ordered) only if the tile actually moved. Hover/focus dimming (focusOnHover: other tiles drop to 0.35 opacity) pauses during drag.

## Lightbox

- Clicking a card (when not suppressed by a just-finished drag) calls onItemClick(item, index, event) first — if the handler preventDefaults, nothing else happens; otherwise with lightbox on the dialog opens. Open: the originating tile is hidden (visibility), the lightbox image flies from the tile's on-screen rect to its fitted size over 520ms (radius animating 6px ↔ scaled tile radius), backdrop fades in 360ms, caption/buttons fade in with a half-delay. Changing images (prev/next buttons or ArrowLeft/ArrowRight) cross-fades the new image from 0.97 scale; closing (Escape, backdrop click, image click, close button) reverses the flight back to the (possibly moved) tile rect over 380ms, backdrop 300ms, buttons 160ms. A token guards stale animations; reduced motion skips the flights.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { id: string \| number; img: string; alt?: string; title?: string; description?: string; url?: string; width?: number; height?: number; span?: number }[] | [] | Gallery items; width/height skip measurement, span widens a tile across columns. |
| columns | number \| "auto" | "auto" | Fixed column count, or auto from columnWidth. |
| columnWidth | number | 240 | Target column width for auto mode, in px. |
| gap | number | 12 | Gap between tiles, in px. |
| radius | number | 12 | Tile corner radius, in px. |
| animateFrom | "bottom" \| "top" \| "left" \| "right" \| "center" \| "random" \| "none" | "bottom" | Where tiles spring in from on reveal. |
| stagger | number | 0.05 | Delay between consecutive reveals, in seconds. |
| duration | number | 0.6 | Spring duration, in seconds (sets stiffness). |
| bounce | number | 0.15 | Overshoot 0–0.9; 0 settles without overshoot. |
| blurToFocus | boolean | true | Reveals start blurred and sharpen. |
| revealOnScroll | boolean | true | Tiles reveal when scrolled into view. |
| hoverEffect | "zoom" \| "lift" \| "tilt" \| "none" | "zoom" | Hover effect; tilt follows the pointer up to ±10°. |
| focusOnHover | boolean | false | Dims all other tiles while one is hovered. |
| captions | "hover" \| "always" \| "none" | "hover" | When the caption gradient shows. |
| parallax | number | 0 | Inner-image parallax strength 0–1. |
| lightbox | boolean | true | Clicking opens the zoom lightbox. |
| draggable | boolean | true | Tiles can be dragged to reorder. |
| onItemClick | (item, index: number, event) => void | - | Called on card click before the lightbox; preventDefault to block it. |
| onReorder | (orderedItems) => void | - | Called after a drag that moved a tile. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Masonry.jsx and Masonry.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: tiles pack into the shortest column with correct spans and no overlap at any width; refelows on resize spring tiles (including the width-scale correction) instead of jumping; reveals stagger top-to-bottom with blur-to-focus and honour animateFrom directions including center and random; images reveal after load (or the 2.5s fallback) with the placeholder visible before; dragging a tile moves the grid around it and onReorder fires only on real moves; the post-drag click does not open the lightbox; the lightbox flies from the tile, navigates with arrows/buttons, closes back into the tile, locks scroll, and restores focus; Escape/backdrop/image clicks all close; captions show per mode; hover zoom/lift/tilt each work; parallax stays inside the tile; focusOnHover dims siblings; reduced motion places tiles and ghost/lightbox animations instantly; unmount leaves no frame loop, observers or window listeners; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
