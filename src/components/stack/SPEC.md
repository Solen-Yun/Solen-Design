Implement the "Stack" component from zero: a pile of cards you can drag, flick or click through — dragging the top card leans it in 3D toward the pull, releasing past a threshold flings it off in the throw direction while it tucks underneath the pile, and everything else reflows with springs. Four pile layouts (fan, cascade, deck, pile) share the same engine. Pure React + Motion, two files: Stack.jsx (entry, drag/flick physics) and Stack.css (all styles). React >= 18; runtime dependency: motion (animate/motionValue/motion/useReducedMotion from motion/react). No iframe; demo assets are inline — the built-in image cards are a fallback, not required.

## Structure & rendering

- Root is `<div class="stack">` sized 100% × 100%, tabIndex 0, role="group", aria-label "Card stack", outline none; focus-visible draws a 2px currentColor outline around the top card's face (offset 4px). Cards render from the `cards` prop (any ReactNode list, e.g. styled divs); when omitted, four built-in `<img>` cards are used. Each card is a `motion.div.stack-card` (absolute inset 0, will-change transform, user-select none) wrapping a `motion.div.stack-card-face` (transformPerspective 800, borderRadius, optional frame padding + frameColor background, shadow `0 14px 34px -10px rgba(0,0,0,0.45), 0 3px 8px -2px rgba(0,0,0,0.18)` when shadow) wrapping `div.stack-card-content` (radius = radius − frame, overflow hidden) plus an absolute black `.stack-card-shade` whose opacity the engine drives (stacked cards darken toward 0.6).
- Every visual quantity is a MotionValue per card: x, y, rotate, scale, z (translate-depth via zIndex), opacity, tiltX/tiltY/spin (the 3D lean of the face), lift (press scale 1→1.035), grabX/grabY (the face's transform origin under the pointer), shade. Transform origin of the outer card is per-layout: fan [0.9, 0.9], cascade [0.5, 0.5], deck [0.5, 0], pile [0.5, 0.5]. Only the top card is interactive (cursor grab/grabbing, touch-action pan-y, aria-hidden on the rest).
- Layouts place the card at stack position n with spread s and depth d (both clamped): fan — rotate n·s·8°, scale 1 − n·d·0.12; cascade — x/y −n·s·28px diagonal, scale 1 − n·d·0.07; deck — y −n·s·32px straight up, scale 1 − n·d·0.1; pile — deterministic pseudo-random offsets/rotations (hash noise seeded per card) scaled by s, scale 1 − n·d·0.03. Cards beyond `visible` are opacity 0 but stay in the flow for re-entry.

## Drag, flick and click physics

- Pointerdown on the top card records grab origin, samples pointer positions, and springs lift to 1.035 (stiffness 420, damping 34). A 6px slop separates click from drag; past it the card stops its springs, follows the pointer 1:1, and captures the pointer. While dragging, a velocity estimator keeps the last 100ms of samples (px/s, capped 3000).
- Lean: the face tilts toward the drag — tiltY from horizontal velocity (up to ±0.7 share) and offset (0.3 share), tiltX likewise vertical, plus a small spin from horizontal offset; max angle = tilt (0–89°, default 30), spring stiffness 240 / damping 28; after 70ms idle the lean decays. As the drag progresses toward the threshold (default 90px, distance/threshold 0..1), the rest of the pile lifts proportionally (up to 0.4 of the neighbour pose) like cards feeling the pull.
- Release: beyond threshold px or a flick (speed > 650 px/s, ≥16px travel, velocity agrees with travel) the top card is sent back — reordered to the bottom — and flies out along the drag direction (or the flick velocity when fast): target is 1.12 × the container's directional clearance + 40px from its home pose, on a stiff spring (650/42) seeded with release velocity, z above everything. An rAF watch loop detects when the flying card has cleared the pile's bounding boxes, then turns it: it re-targets its bottom-slot pose (tuck spring 240/28) behind everything and finally lands back at its depth z. A 1.5s/speed fallback performs the same steps if the watch misses. Short drags snap back with settle springs (320/34) carrying release velocity.
- Click (no drag): with sendToBackOnClick the card is sent to the back along a layout-appropriate exit direction (fan [1, −0.3], cascade [0.8, 0.6], deck [0, 1], pile a hashed direction); otherwise the face settles. Keyboard mirrors pointer: ArrowRight/ArrowDown/Enter/Space on the focused root send the top card back.
- onChange fires with the new top index whenever the order changes (not on first mount). All placements animate through place springs (260/24) scaled by speed (stiffness × speed², damping × speed, 0.2–4); reduced motion swaps springs for 0.2s ease-out fades and sends cards back instantly.

## Autoplay & lifecycle

- With autoplay, a timer (max(300, autoplayDelay) ms, default 3000) sends the top card back; it resets on every order change and pauses while dragging, and while hovered when pauseOnHover is set.
- Unmount stops all MotionValues, removes window pointermove/up/cancel listeners, clears the drag idle timer; instance state is fully ref-based so the same page can host several stacks. Reordering mid-flight is safe: flying cards keep their z until landed and are skipped by pile-placement writes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cards | ReactNode[] | built-in image cards | Card contents, rendered bottom to top. |
| layout | "fan" \| "cascade" \| "deck" \| "pile" | "fan" | How the pile rests; decides origins, exits and placement math. |
| visible | number | 4 | How many cards show before the rest fades out; clamped 1..count. |
| spread | number | 0.5 | Fan/cascade/deck/pile offsets multiplier, 0–2. |
| depth | number | 0.5 | How much stacked cards shrink and darken, 0–1. |
| radius | number | 16 | Corner radius of the card face (frame included). |
| frame | number | 0 | White frame thickness in px around each card's content. |
| frameColor | string | "#ffffff" | Frame colour when frame > 0. |
| shadow | boolean | true | Card drop shadow. |
| tilt | number | 30 | Max 3D lean angle of the dragged face, 0–89. |
| threshold | number | 90 | Drag distance (px) past which the card is thrown to the back. |
| speed | number | 1 | Global spring pace multiplier, 0.2–4. |
| sendToBackOnClick | boolean | false | A plain click sends the top card to the back. |
| autoplay | boolean | false | Advances the stack on a timer. |
| autoplayDelay | number | 3000 | Autoplay interval in ms (min 300). |
| pauseOnHover | boolean | false | Pauses autoplay while the stack is hovered. |
| onChange | (index: number) => void | - | Called with the new top card index after each reorder. |
| className | string | "" | Extra class on the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Stack.jsx and Stack.css plus install steps (react, react-dom, motion) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all four layouts rest correctly and respect spread/depth/visible; dragging leans the face toward the pointer and lifts the pile progressively; release past threshold flings the card out along the throw, tucks it under the pile and lands it at the right depth; fast flicks throw without reaching the threshold; short drags snap back; click-through with sendToBackOnClick; keyboard send-to-back on the focused root; onChange per reorder; autoplay advances and pauses on drag/hover; reduced motion still works without springs; rapid re-drags mid-flight never leak z-index or stuck cards; unmount stops all motion values and listeners; 375 / 768 / 1440 wide without overflow.
