Implement the "Shredder" component from zero: a paper shredder bolted to the bottom of a list. Every row is draggable; shove a row down so its bottom edge crosses the machine's lip and the row is swallowed — a pixel snapshot of the row slides through the slit, gets guillotined into N vertical strips, and each strip falls away curling, fluttering, narrowing to a sliver of torn paper until it fades out past the bottom. The rows below close up with staggered springs, and the machine can revive rows (or everything, in a loop) to keep feeding forever. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + Canvas 2D, two files only: Shredder.jsx and Shredder.css. React 18+; the only extra runtime import is flushSync from react-dom to commit reorder synchronously mid-animation. No iframe.
- Root is a `<div class="shredder">`: position relative, width min(var(--sh-w), 100%), height var(--sh-h), colour var(--sh-ink). Inline variables from props: --sh-w/--sh-h (width/height), --sh-inset (inset), --sh-gap (gap), --sh-slit-h (slitHeight), --sh-fall (fallHeight), --sh-slit-inset (max(0, inset − 6) — the slit bar is 6px narrower than the list padding each side), --sh-over (40px canvas overscan), --sh-slit (slitColor), --sh-ink (color). `data-disabled` dims the whole machine to 0.6 opacity.
- Layout, bottom-up: a fall zone `.shredder__fall` (absolute, bottom 0, full width, height fallHeight, pointer-events none) holding a `<canvas>` (position absolute, left −40px, width 100% + 80px, height 100%, sized to ceil((rootWidth + 80) × dpr) × ceil(fallHeight × dpr) with dpr = min(3, devicePixelRatio), re-fitted by a ResizeObserver on the root); above it the slit bar `.shredder__slit` (absolute, bottom fallHeight, left/right slit-inset, height slitHeight, 999px radius, background slitColor, will-change transform — it trembles while feeding); above both the list `<ul class="shredder__list">` (absolute, bottom = fallHeight + slitHeight, padding 0 inset, no list style, clip-path inset(−9999px −9999px 0 −9999px) so a dragged row can fly above the machine but is clipped at the list's bottom edge).
- Rows: one `<li class="shredder__slot">` per item (relative, margin-bottom gap). The active dragged slot gets data-active (z-index 2) and its `.shredder__item` becomes absolute top 0 left/right 0 so it is positioned by transform only while its slot collapses to height 0. Items are divs with tabIndex 0 (−1 and aria-disabled when disabled), cursor grab → grabbing via data-state, touch-action none, user-select none, onDragStart prevented. Item states: `data-state="drag"` adds a 0 14px 22px drop shadow; `data-state="feed"` disables pointer events (the machine owns it). Slots marked data-gone are pointer-events none.
- Items come from the items prop, each entry must carry a unique `id`. The component keeps its own order state seeded from the items' ids and sorts items by that rank, so shuffles and revives reorder the list without mutating props. Every row's content is `renderItem(item, index)` — fully caller-owned markup.

## Dragging, gaps and reorder

- Pointer down (left button) on a row takes pointer capture and begins a drag: the item's slot collapses to height 0/margin 0, the item floats via transform, and the machine enters the "drag" phase. The row follows the pointer through an exponential spring (frequency ω = 30 while dragging, ω = 16 on release), integrated with a capped dt (≤ 50ms). Horizontal velocity leans the row — tilt eases toward clamp(vx × 0.012, ±dragTilt) — and scale eases to the lift prop while held, back to 1 on release.
- The other rows make room: every slot carries a shift spring (ω = 320, damping 22, 240Hz substeps) driving a translateY. Rows above the hovered insertion point get target −(rowHeight + gap); the insertion point is computed from the dragged row's centre against row midpoints with an 8px hysteresis band so the gap doesn't flicker at boundaries. Rows below the insertion point stay at 0. Shifts settle to exactly 0 (transform cleared) when done.
- Release: if the row's bottom edge is past the machine lip (list bottom + slit), it is grabbed by the shredder; otherwise it returns to its slot — a reorder is committed first (arranged ids flushed with flushSync, onReorder fires with the sorted items) and the row springs home, clearing its inline transform when settled.
- Keyboard: Delete or Backspace on a focused row shreds it — instantly under reduced motion, otherwise the row enters the "carry" phase and flies itself to the slit centre. Escape isn't handled; no modifier keys needed.

## The feed (snapshot → strips)

- A grab collapses the slot (height 0, margin 0, data-gone), snapshots the row into a texture, and starts the feed: the snapshot slides down at feedSpeed px/s with an initial tug — velocity multiplier 2.4 decaying with a 0.14s time constant — plus a ±0.5px 150Hz jitter; tilt and scale ease back to neutral. The slit bar trembles (±0.5px x, ±0.35px y) while anything feeds.
- Snapshot: the row node is cloned; every element's computed styles are inlined onto the clone; `<img>` sources are converted to data URLs (fetched CORS-mode, memoized per URL, failures fall back to a 25% grey fill), srcset/loading attributes stripped; the clone is serialized into an SVG `<foreignObject>` of the row's size, rasterized through an Image onto a canvas at min(3, devicePixelRatio) scale. The texture arrives asynchronously — a flat canvas filled with the row face's background colour (first element child's computed backgroundColor; transparent falls back to 35% grey) is used if it fails or after a 400ms deadline. Rows preload their images' data URLs 300ms after mount so the snapshot is usually instant.
- Strips: the row width is split into n = max(1, round(W / max(4, stripWidth))) vertical strips (remainder in the last). Each strip owns a character: curl rate ±(0.35–0.9)° per px × curl, flutter amplitude 1.5–4° × curl, spatial frequency 2π over 34–60px, random wave phase, a 0–1 pair of random seeds. Strips stay "attached" while their row still overlaps the machine, painting only the hanging part below the slit.
- When a strip's top passes the slit it goes "free": fall speed eases toward 150–380 px/s (random) modulated by a 0.85–1 "breathing" sine; sideways velocity eases toward a random splay ±160 px/s scaled by tear plus a mild outward drift from the machine's centre. Tear = (mean hang depth / fallHeight)^1.2 progressively narrows each strip's painted core (down to ~20–36% width) — the shredded sliver look — and drives a horizontal flutter swing (3–9px × tear, 0.045 rad/px spatial frequency). Alpha fades from tear 0.6 to 1. A strip is dropped when fully transparent or when its top passes fallHeight.
- Strips render as 2px sliver segments along a curved spine: each sliver is drawn rotated at its own angle through setTransform, sampling the exact 2px band of the snapshot texture — the row's own pixels travel down and fall apart. Painting order runs bottom-to-top; the canvas clears only when strips exist.
- onShred fires with the item when its feed collapses the row. Rows below close via the shift springs. Reduced motion skips the whole feed: the row collapses instantly (no strips), and slot transitions are disabled in CSS.

## Looping, revive and autoplay

- Revive restores gone rows: heights/margins/visibility clear, entering rows drop in from −22px with a 0.05s per-row stagger and a 280ms opacity fade (skipped under reduced motion). A single-key revive re-inserts at a requested live index. Revive waits out any active drag (300ms retries).
- loopAfterDelete: 700ms after each shred the row revives at a random live index — the list never thins. loop: when the last row is shredded, everything revives after 900ms.
- autoAnimate: 900ms after mount the machine plays by itself — whenever idle (no drag, feeds, strips or shifts), it picks the bottom-most live row and carries it into the slit every 700ms; when nothing is left it waits 1100ms, revives all rows and continues. Tearing down cancels the scheduler.
- The frame loop self-sleeps: it keeps scheduling only while a drag, feed, strip or shift is in motion. Unmount cancels the rAF, clears every pending timer, disconnects the observer, and the snapshot URL memo is per-page.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { id: string }[] | [] | List data; every entry needs a unique id used for order and revive bookkeeping. |
| renderItem | (item, index) => ReactNode | - | Renders a row's content. The face background colour doubles as the strip fallback fill. |
| onShred | (item) => void | - | Called when a row is consumed by the machine. |
| onReorder | (items) => void | - | Called after a drag reorders the list, with the sorted items. |
| width | number | 340 | Machine width in px (shrinks to fit narrower containers). |
| height | number | 460 | Total height in px: list + slit + fall zone. |
| inset | number | 14 | Horizontal padding of the list. |
| gap | number | 10 | Space between rows in px. |
| slitHeight | number | 4 | Height of the slit bar in px. |
| fallHeight | number | 140 | Height of the canvas fall zone in px. |
| feedSpeed | number | 180 | Base pull-through speed in px/s. |
| bite | number | 18 | How deep the row must cross the lip before the machine bites, in px. |
| autoFeed | boolean | true | While dragging, the machine bites as soon as the row crosses the lip; off, you must release over it. |
| stripWidth | number | 10 | Target strip width in px; the count adapts to row width. |
| curl | number | 1 | Multiplier on strip curl and flutter amplitude. |
| autoAnimate | boolean | false | The machine feeds rows by itself, forever. |
| loop | boolean | false | When every row is gone, revive the whole list. |
| loopAfterDelete | boolean | false | Revive each shredded row at a random index shortly after. |
| dragTilt | number | 6 | Max drag lean in degrees. |
| lift | number | 1.02 | Drag scale. |
| slitColor | string | "#3f3f46" | Slit bar colour. |
| color | string | "#f5f5f5" | Ink colour (light ink suits dark stages). |
| disabled | boolean | false | Blocks dragging and keyboard shred; dims the machine. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of Shredder.jsx and Shredder.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: react-dom at ^19.0.0 (flushSync) alongside react.
- Validate: dragging a row over the lip feeds it — the snapshot's own pixels slide through the slit, split into strips that curl, splay, tear narrow and fade past the bottom; rows below close with staggered springs; reordering by drag commits and fires onReorder, dropping elsewhere springs home; autoFeed off requires a release over the lip; Delete/Backspace shreds the focused row (carry animation, instant under reduced motion); stripWidth, curl, feedSpeed, bite and fallHeight reshape the shred; loopAfterDelete revives rows at random indices, loop revives all, autoAnimate runs the machine hands-free; onShred fires once per consumed item; rapid drags and revives never leak rows, strips, timers or rAF frames; unmount cancels everything; images inside rows survive the snapshot (data-URL) or fall back to the face colour; 375 / 768 / 1440 wide without overflow.
