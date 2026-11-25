Implement the "CardSwap" component from zero: a 3D stack of cards in perspective where the front card periodically exits toward the bottom and re-enters at the back of the stack, so the deck cycles forever on a timer — or instantly when you fling the front card with the pointer. The stack fans out with a skew, deepens with per-card shading, parallaxes with the cursor, and spreads apart on hover. Pure React + CSS, two files: CardSwap.jsx (entry, spring engine, pointer/drag logic) and CardSwap.css (all styles). No iframe, no canvas; only two tiny icon packages are used for the built-in default items.

## Structure & rendering

- Root is a `<div>` with class `card-swap` plus any className: position relative, width/height 100%, outline none. It carries the accessibility contract: tabIndex 0, role "region", aria-roledescription "carousel", aria-label "Card stack"; ArrowRight/ArrowDown call next(), ArrowLeft/ArrowUp call prev(), both preventDefault. `:focus-visible` draws a 2px outline (var --swap-ink) with 3px offset around the front slot.
- Inside are two children: an aria-hidden sizer div whose single span reserves layout space — display block, width 100%, max-width var --swap-stage-w, aspect-ratio var --swap-ratio — so the root's intrinsic height tracks the stack bounds; and an absolutely centered stage div (top/left 50%, translate(-50%,-50%), width/height var --swap-stage-w/h, perspective 900px, pointer-events none) whose transform is `translate(-50%,-50%) scale(fitScale)` set by JS.
- The stage holds one `.card-swap-slot` per card: absolutely positioned at (originX, originY) with negative margins of half the card size so the slot centers on that origin; border-radius var --swap-radius; overflow hidden; box-shadow var --swap-shadow; pointer-events auto; user-select none; touch-action pan-y. Each slot wraps the card element plus an aria-hidden shade span (absolute inset 0, background var --swap-shade, opacity driven by JS) that darkens cards as they sink into the stack.
- Geometry is computed from props: perspective P = 900; card i sits at x = i·cardDistance·spread, y = −i·verticalDistance·spread, z = −i·depth, all multiplied by scale P/(P + i·depth), with y additionally offset by u·tan(skewAmount°) across the card's own width so the whole deck shears. A `stackBounds` pass over the four corners of every visible card (plus 32px padding) yields the stage box, the per-slot origin offsets, and the sizer ratio; hoveredStack spread multiplies the x/y distances by (1 + hoverSpread) and is included in the bounds so nothing clips when hovered.
- Cards come from children or items: if the consumer passes valid React elements as children they are used as-is (one per slot); otherwise each entry of `items` renders as a tile with a 30px header row (24px round icon badge with the item's icon, 14px/500 title, ellipsis on overflow) above a media area that fills the rest with an `<img>` (object-fit cover, draggable false). If neither is given, a built-in four-card travel set is used (titles "Golden hour", "Black beach", "Steel arches", "Pink drift", each with a 14px stroke icon and a landscape photo; the exact photos cannot be reproduced from text — precise assets are as embedded in the code). The `Card` subcomponent is exported for custom cards: a rounded div with the tile background and an inset rim (1px edge + 1px top highlight) via an aria-hidden span.
- Theme is a prop-switched variable set injected on the root: dark uses a `#3a3644 → #27242f` vertical-gradient tile, white edge at 7% / top highlight at 12%, a deep blue-black drop shadow, ink #f4f4f5, a white 8% badge, shade #100e15; light uses a `#ffffff → #f6f6f8` tile, dark edges at 8%, white highlight, a softer dark shadow, ink #27272a, a dark 5% badge, shade #ffffff. Radius, card size, stage size and ratio are also injected as CSS variables.

## Motion engine

- Every card is a state object: position in the order, spring phase ("rest" | "exit" | "enter" | "drag"), a hold timestamp, a direction vector for its exit, tilt, layer bookkeeping, current x/y/z/rotation/p and per-axis velocities. The render order lives in a plain array; the front card is order[0].
- All movement is damped harmonic springs integrated at 240Hz sub-steps (STEP = 1/240) on five axes (x, y, z, rotation, p). At rest, omega = 2π·1.7·speed and zeta = 1 − 0.72·bounce, so `bounce` controls overshoot on every settle. Exit/enter phases use omega = 2π·1.9·speed with critical damping (zeta 1).
- shift(+1) sends the front card to the back: it gets phase "exit" with a direction (default straight down {x:0,y:1}, or the drag fling direction) and exits along that vector until it has travelled 1.3× the clearance (|dir.x|·width + |dir.y|·height + 12px); meanwhile every other card's target position shifts forward with a per-position hold delay of 0.05/speed seconds, so the stack glides up in a stagger. When the exiting card has cleared, it turns to phase "rest" at position count−1 — visually re-entering from behind. shift(−1) is the reverse: the last card gets phase "enter", hides under the stack (z-index 1) and rises from 1.3× clearance below the front slot into its new position, again with staggered holds. z-index: the exiting card gets 1000 + a monotonically increasing layer counter; the entering card gets 1; resting cards get 10 + 2·(count − position).
- Autoplay: a timer of max(400, delay) ms calls shift(+1); it is rescheduled after every shift and paused whenever autoplay is off, there is a single card, the pointer is over a card while pauseOnHover is on, a drag is active, the root is out of view (IntersectionObserver), or the document is hidden (visibilitychange). Timer restarts on pointer leave and hover-state changes.
- Parallax: pointer moves (mouse only, ignored for touch) map the cursor to −1..1 and set perspective-origin targets of ±parallax·0.35·stage-size; the origin itself is eased with a spring (omega 2π·1.1, zeta 1), which swings the whole perspective. Hovering the root also eases the stack spread from 0 to hoverSpread (spring, omega 2π·1.4, zeta 0.9), widening the fan; leaving eases it back.
- Drag: pointerdown on the front card (draggable on, primary button, phase "rest") starts a drag after a 5px threshold — setPointerCapture on the root, cursor "grabbing". The card follows the pointer (offsets divided by fit scale), tilts by clamp(dx·0.035, ±9°), and the next card nudges up to −0.22 toward the front proportionally to drag progress. Velocity is estimated from pointer samples over the trailing 90ms. On release: if the displacement exceeds 30% of min(card width, height) or the fling speed exceeds 700 px/s, the card flies off along the aim direction (offset + velocity·0.12, normalized) as an exit with its tilt and initial velocity — i.e. a fling advances the deck; otherwise the card springs back to the front slot with its release velocity preserved. A click after any drag is swallowed; a plain click on a card calls onCardClick(index) and, for cards not at the front, goTo(position) — queued shifts spaced 110/speed ms apart.
- Intro: on mount (unless intro is off or reduced motion), every card starts at the front position with holds staggered 70ms·position/speed, so the deck fans out from a single point, and the stage fades in over 420ms (Web Animations, ease-out).
- Frame loop self-sleep: the rAF loop keeps running only while any card is off its target (per-axis tolerance 0.02, p tolerance 0.001), is in exit/enter/drag phase, has an unexpired hold, or the spread/parallax springs are unsettled; when settled, the loop stops and one final state is written. It wakes on pointer events, shifts, timers, resize, visibility and scroll-into-view. A settings ref mirrors props every render, and a post-render effect calls refresh() on the imperative API to re-bind slot refs, re-fit, and re-schedule autoplay when autoplay/delay changed.
- Responsive fit: a ResizeObserver measures the root and scales the stage by min(1, root width / stage width, root height / stage height), so the whole deck shrinks to fit narrow containers without overflow.
- Reduced motion: prefers-reduced-motion forces zeta 1 everywhere (no overshoot), zeroes parallax and hover-spread targets, and skips the intro animation.
- Unmount: cancels the frame, clears the autoplay timer and the goTo queue, disconnects both observers, removes all pointer/click/visibility listeners, and nulls the imperative API.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { title?: string; image?: string; alt?: string; icon?: ReactNode }[] | built-in travel set | Card contents when no children are given. Rendered as icon + title header above a cover image. |
| width | number | 460 | Card width in px; floored at 40. |
| height | number | 340 | Card height in px; floored at 40. |
| cardDistance | number | 60 | Horizontal offset per depth level, in px. |
| verticalDistance | number | 70 | Vertical offset per depth level, in px (cards step upward). |
| depth | number | 90 | Z offset per depth level; drives the perspective shrink. |
| skewAmount | number | 6 | Deck shear in degrees across each card's width. |
| visibleCards | number | 4 | How many depth levels stay visible; clamped to 1..count. |
| delay | number | 4000 | Autoplay interval in ms; floored at 400. |
| autoplay | boolean | true | Cycles the deck automatically. |
| pauseOnHover | boolean | true | Pauses autoplay while the pointer is over a card. |
| draggable | boolean | true | Lets you drag and fling the front card. |
| speed | number | 1 | Motion speed multiplier; clamped 0.1–4. Scales spring rate, stagger and click-through pace. |
| bounce | number | 0.35 | Spring overshoot at rest, 0–1. |
| parallax | number | 0.5 | Cursor-driven perspective swing, 0–1. |
| hoverSpread | number | 0.12 | Extra fan-out of the stack while hovered, in card-distance units. |
| dim | number | 0.5 | Darkening of deeper cards, 0–1. |
| cardRadius | number | 18 | Corner radius in px. |
| intro | boolean | true | Fans the deck out from a single point with a fade on mount. |
| theme | "dark" \| "light" | "dark" | Tile, edge, shadow and ink palette. |
| onCardClick | (index: number) => void | - | Called when a card is clicked (suppressed after a drag). |
| onChange | (frontIndex: number) => void | - | Called with the new front card's index after every shift. |
| className | string | "" | Extra class names for the root. |
| children | ReactNode | - | Custom card elements; they replace items entirely. |

Ref: `next()` shifts forward, `prev()` shifts backward.

## Delivery & validation

- Deliver the complete content of CardSwap.jsx and CardSwap.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: autoplay cycles front-to-back on the timer with a staggered glide and correct z-order during the swap; flinging the front card past 30% of its size or above 700 px/s advances the deck in the fling direction with tilt, and short drags spring back; clicking a deeper card queues shifts until it reaches the front; ArrowRight/ArrowLeft (and Up/Down) shift the deck, Tab focus outlines the front card; controlled props (speed, bounce, delay, parallax, dim, radius, theme) all take effect live without remount; pauseOnHover stops the timer over a card and resumes on leave; a hidden tab or an off-screen stack does not autoplay; dragging beyond the 5px threshold does not trigger onCardClick; custom children render one per slot; theme light/dark and radius/size variables restyle correctly; reduced motion removes overshoot, parallax and intro; unmount leaves no frame loop, timers, observers or listeners; the stack scales down inside a 320px-wide container without overflow.
