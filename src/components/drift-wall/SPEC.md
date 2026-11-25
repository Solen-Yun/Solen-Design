Implement the "DriftWall" component from zero: an endless perspective wall of image tiles receding into the dark — a grid of vertical tile columns tilted back in 3D, each column drifting up or down forever at its own speed, tiles dimmed by a colour overlay and masked into darkness at the wall's edges. Hovering a tile lifts it out of the plane toward the viewer, restores its colour, and stops its column; the whole plane leans subtly toward the pointer. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS 3D, two files only: DriftWall.jsx (entry, column distribution, animation loop) and DriftWall.css (all styles). React >= 18; no runtime dependencies. No iframe, no WebGL.
- Root is a `div.drift-wall` filling its container (position relative, width/height 100%, overflow hidden) with `perspective` from the perspective prop and `perspective-origin: 50% 50%`. It carries all sizing tokens as inline CSS variables: `--dw-tile-w/h`, `--dw-gap`, `--dw-radius`, `--dw-perspective`, `--dw-lift`, `--dw-dim`, `--dw-gray`, `--dw-overlay` and `--dw-edge`.
- The root is masked by two stacked masks composited with `mask-composite: intersect` (webkit `source-in`): a radial ellipse (78% × 82% at 50% 46%) and a bottom-up linear gradient, both solid until `--dw-edge` (= (1 − fade) × 100%) and transparent beyond — this is what dissolves the wall into the background at its rim and bottom.
- Inside is `div.drift-wall__plane`, absolutely centered (top/left 50%), a flex row of columns, `transform-style: preserve-3d`, transformed every frame by JS as `translate(-50%,-50%) scale(1.18) rotateX(tilt + px) rotateY(turn + py) rotateZ(roll) translateZ(-depth)`. The 1.18 scale hides the masked edges during rotation.
- Each column `div.drift-wall__col` is one tile wide (tile + gap); its `div.drift-wall__track` is a vertical flex stack containing `copies` repetitions of the column's items — copies = max(2, ceil(containerHeight × 1.6 / copyHeight) + 1) where copyHeight = column length × (tileHeight + gap), so scrolling wraps seamlessly modulo copyHeight.
- Items are dealt round-robin into `columns` columns; an empty column falls back to the first item repeated. Each tile instance renders as an `<a target="_blank" rel="noreferrer noopener">` when the item has href, otherwise a `div[role="button"][tabindex=0]`; both carry data-tile-id (col-copy-index), data-col, onFocus/onBlur.
- Tile visual: `.drift-wall__inner` (absolute, inset gap/2, radius, overflow hidden, background #0b0b12, opacity = dim, pointer-events none) holds the `<img>` (object-fit cover, filter grayscale(var(--dw-gray)) saturate(0.92), lazy, draggable false) plus a `--dw-overlay` coloured veil at 0.42 opacity. Active state: inner opacity 1, `translateZ(var(--dw-lift))`, big soft shadow, image grayscale 0 / saturate 1.05, veil opacity 0 — all on a 0.42s cubic-bezier(0.22,1,0.36,1) ease. Keyboard focus (`:focus-visible`) adds a 2px white ring on top of the same state. Inner being pointer-events none is deliberate: hover targeting is resolved from the wall-level pointermove (see interaction), so 3D-lifted tiles never trap the hit test.

## Motion engine

- One requestAnimationFrame loop drives everything; dt is clamped to 50ms. The loop never sleeps (the wall drifts forever); on unmount the frame is cancelled.
- Column velocities: base speed per column = speed × columnFactor × dirSign × altSign, where columnFactor = 1 + variance × pseudo (a golden-ratio hash of the column index in [−1, 1]), dirSign is +1 for "up" / −1 for "down", and altSign alternates +1/−1 per column so neighbours scroll opposite ways. Each frame the actual velocity eases toward its target with rate 1-exp(−dt/0.28) while running or 1-exp(−dt/0.16) when stopping, giving soft start/stop. Offsets advance by velocity × dt and wrap modulo copyHeight; the track transform is `translate3d(0, -offset, 0)`. Columns start pre-seeded at copyHeight × ((c × 0.37) mod 1) so they are visually out of phase.
- Stopping: the hovered column's target velocity is 0; when pauseOnHover is true and the pointer is anywhere on the wall, every column's target is 0.
- Pointer parallax: pointer position in the container maps to ±0.5; the plane's extra rotation is pointer × parallax × 8 degrees (x to rotateY, y negated to rotateX), eased with 1-exp(−dt/0.12) damping; on pointer leave it eases back to 0. Applied together with the static tilt/turn/roll each frame.
- Reduced motion: listens to `prefers-reduced-motion: reduce` (live via matchMedia change listener), adds a `drift-wall--reduced` class, freezes all columns at their current offsets (the loop still renders but never advances), and disables the pointer parallax. CSS drops will-change under the same media query.
- ResizeObserver on the container keeps containerHeight (default 600) fresh so copy counts recomputed on resize keep columns seamless. Unmount: cancel frame, disconnect observer, remove media-query listener. Same-page instances are independent.

## Interaction & accessibility

- Wall-level pointermove resolves the hovered tile with document.elementFromPoint + closest('[data-tile-id]'), tracking per-tile ids so moving within the same tile does not re-render. Pointer enter/leave drive pauseOnHover and reset parallax; leaving also clears the active tile.
- Hover and focus share one active state (`.is-active` / `:focus-visible`), so keyboard tabbing lifts the focused tile just like hover. Items with href open in a new tab; no-href items are focusable buttons with an aria-label from the title.
- Root carries role="group" aria-label "Drifting wall of tiles"; the overlay veil is aria-hidden.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { image: string; title?: string; href?: string }[] | built-in set of 15 placeholder photo tiles | Tiles distributed round-robin into columns; href tiles become links. Precise default photos are code-embedded. |
| columns | number | 5 | Number of vertical columns in the wall. |
| tileWidth | number | 200 | Tile width, in px. |
| tileHeight | number | 132 | Tile height, in px. |
| gap | number | 18 | Gap between tiles, in px. |
| radius | number | 14 | Tile corner radius, in px. |
| tilt | number | 16 | Static rotateX of the plane, in degrees (leans the wall back). |
| turn | number | -14 | Static rotateY of the plane, in degrees. |
| roll | number | 0 | Static rotateZ of the plane, in degrees. |
| perspective | number | 1200 | CSS perspective of the wall, in px. |
| depth | number | 120 | Static translateZ push of the plane, in px. |
| speed | number | 42 | Base drift speed, in px/s. |
| direction | "up" \| "down" | "up" | Global drift direction; columns alternate within it. |
| variance | number | 0.45 | Per-column speed variation 0–1. |
| parallax | number | 0.6 | Strength of the pointer-driven plane lean; 0 disables. |
| pauseOnHover | boolean | false | Freezes every column while the pointer is on the wall. |
| lift | number | 64 | translateZ of the hovered tile, in px. |
| fade | number | 0.6 | Where the edge mask starts fading, 0–1; lower is a wider fade. |
| dim | number | 0.55 | Idle tile opacity. |
| grayscale | boolean | false | Renders idle tiles in grayscale. |
| overlayColor | string | "#060010" | Colour of the veil over idle tiles. |
| className | string | "" | Extra class names for the wall. |
| style | CSSProperties | - | Inline styles for the wall (merged after the component's tokens). |

## Delivery & validation

- Deliver the complete content of DriftWall.jsx and DriftWall.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: columns drift endlessly and seamlessly with no visible seam at the wrap point and neighbours moving in opposite directions; per-column speeds differ per variance; hovering a tile lifts it with shadow, restores colour and stops its column while others keep drifting; pauseOnHover freezes the whole wall; the plane leans toward the pointer and relaxes on leave; fade mask dissolves edges on every container size; href tiles open in a new tab, no-href tiles are tabbable buttons; focus-visible lifts with the white ring; prefers-reduced-motion freezes the drift and parallax without layout breakage; resizes recompute copies without flashing; unmount leaves no frame loop, observer or media listener; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
