Implement the "BounceCards" component from zero: a fan of square photo cards scattered around a container centre with playful per-card rotations, all animated by a spring physics engine — they bounce in one after another on mount, and hovering a card straightens it, lifts it and squashes the neighbours outward; clicking a card squashes it with an impulse. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components (no animation library; hand-rolled spring integration).

## Structure & rendering

- Two files only: BounceCards.jsx (entry, slot layout, spring engine) and BounceCards.css (all styles). React >= 18, no runtime dependencies. Images come from the images prop (strings or { src, alt } objects); nothing ships by default.
- Root is a `<div>` with class bounce-cards (plus extra className): position relative, touch-action pan-y, width containerWidth px, height containerHeight px; extra style merged last. It publishes CSS variables: --bounce-cards-size (cardSize, floored at 10), --bounce-cards-border (borderWidth, floored at 0), --bounce-cards-border-color, --bounce-cards-radius (radius, floored at 0), --bounce-cards-shadow and --bounce-cards-shadow-active (two-layer soft shadows when shadow is on, none otherwise).
- Each image is a `<div class="bounce-cards__card">`: absolute at 50%/50%, square cardSize via width + aspect-ratio 1, border, radius, background = border colour, box-shadow var, transform written by JS as translate(-50%,-50%) translate3d(x, y, 0) rotate(a) scale(s), initial CSS scale 0, will-change transform, transition box-shadow 0.3s; data-active swaps to the deeper active shadow. The img fills the card with object-fit cover, draggable false, pointer-events none. When onCardClick is provided the card gets role="button", tabIndex 0, aria-label (alt or "Card i+1") and the --clickable modifier (pointer cursor, focus-visible outline in the border colour).

## Slot layout

- count = images.length, middle = (count − 1) / 2, reach = max(1, middle). Default slot per index: x = (i − middle) × spread px; y = arc × (offset / reach)² px (a parabola, so positive arc bends the fan's wings up, negative down); rotate = rotation × PATTERN[i mod 10] where PATTERN = [1, 0.5, −0.3, −1, 0.2, 0.75, −0.6, 0.35, −0.85, 0.1] — a fixed alternating rhythm so neighbours lean opposite ways.
- transformStyles (array of CSS transform strings) overrides a slot per index: the strings are parsed for translate(Xpx[, Ypx]) and rotate(Adeg); a parseable entry replaces the computed slot entirely.
- bounciness is clamped 0–1, hoverScale clamped 0.5–2, animationDelay and animationStagger floored at 0.

## Spring engine

- Each card carries a body { x, y, rotate, scale, vx, vy, vr, vs, born } held in refs; slots are recomputed from props every render and read by the loop through a settings ref, so prop changes retarget live without remounting. Bodies start at their slot position with scale 0 (1 immediately under reduced motion).
- Integration: a fixed spring step (semi-implicit Euler) with stiffness/damping per channel, run in ceil(dt / (1/240)) sub-steps per frame, dt clamped 1/240–1/30s. Move channels (x, y, rotate): stiffness 210, damping 2 × 0.72 × √210 (damping ratio forced to 1 under reduced motion). The scale channel ("pop"): stiffness 170, damping 2 × (1 − 0.85 × bounciness) × √170 — low bounciness is critically damped, high bounciness overshoots and jiggles.
- Entrance: each card's scale target is 0 until its appear time (delay = animationDelay + i × animationStagger seconds after mount), then 1; the pop spring makes it bounce in. Under reduced motion scale snaps.
- Hover targets (enableHover on, card appeared): the hovered card rises by 4% of cardSize, rotates to 0 and scales to hoverScale; every other card pushes away along x by sign(i − hovered) × pushDistance. When nothing is hovered the targets return to the slots.
- Frame loop self-sleep: after each frame it sums velocities and target deltas (velocity terms weighted ×100 for scale); if the total is ≤ 0.02 the loop stops until something wakes it — any prop re-render, a pointer/focus event, or a click impulse. The loop writes transforms directly to DOM nodes; React state is never used for motion.
- Hover picking: pointermove and pointerdown hit-test by nearest slot x-distance, accepting only when within half cardSize + 12px on both axes; while a card is hovered a new pick must beat it by more than 6px to steal (hysteresis). pointerleave clears. The hovered card's zIndex becomes count + 1, others keep i + 1; data-active tracks hover.
- Click & keyboard: click hit-tests the same way, subtracts 2.2 from the card's scale velocity (a squash impulse, skipped under reduced motion) and calls onCardClick(index). With onCardClick set, Enter/Space on a focused card preventDefault and do the same; focusin marks the card hovered, focusout clears.
- Unmount: cancels the frame, nulls the wake handle and removes all seven root listeners (pointermove, pointerdown, pointerleave, click, focusin, focusout, keydown).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | (string \| { src: string; alt?: string })[] | [] | The photo cards; a bare string is the src, an object adds alt text. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |
| containerWidth | number | 400 | Stage width in px. |
| containerHeight | number | 400 | Stage height in px. |
| cardSize | number | 200 | Square card side in px, floored at 10. |
| spread | number | 85 | Horizontal distance between neighbouring slots in px. |
| rotation | number | 10 | Base rotation amplitude in degrees; each card multiplies a fixed pattern value. |
| arc | number | 0 | Parabolic lift of the outer cards in px; positive bows the ends up, negative down. |
| animationDelay | number | 0.5 | Seconds before the first card pops in. |
| animationStagger | number | 0.06 | Seconds added per card to the appear time. |
| bounciness | number | 0.6 | Pop overshoot 0–1; 0 lands dead, 1 jiggles hard. |
| enableHover | boolean | true | Enables the straighten-and-push hover behaviour. |
| pushDistance | number | 160 | px the neighbours flee along x when one card is hovered. |
| hoverScale | number | 1.06 | Scale of the hovered card, clamped 0.5–2. |
| borderWidth | number | 5 | White frame thickness in px. |
| borderColor | string | "#ffffff" | Frame (and card background) colour. |
| radius | number | 25 | Card corner radius in px. |
| shadow | boolean | true | Soft drop shadow, deepening on the hovered card. |
| transformStyles | string[] | - | Per-card transform strings ("translate(x, y) rotate(a)") that override the computed slots. |
| onCardClick | (index: number) => void | - | Click/Enter/Space callback; providing it makes cards focusable buttons. |

## Delivery & validation

- Deliver the complete content of BounceCards.jsx and BounceCards.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: cards pop in with the staggered delay and visible overshoot at high bounciness; hovering straightens, lifts and scales one card while neighbours flee by pushDistance and return cleanly; the fan spreads by spread, leans by rotation × the pattern and bows with arc; transformStyles overrides individual slots; changing props retargets the springs without remounting; clicks squash the card and fire onCardClick, and cards are real focusable buttons then (Enter/Space included); focus hover-sync works; shadow off removes both shadows; border/radius/borderColor reshape the frame; reduced motion snaps scale with no overshoot and no click impulse; the frame loop sleeps when settled; unmount leaves no listeners or rAF; 375 / 768 / 1440 wide without overflow.
