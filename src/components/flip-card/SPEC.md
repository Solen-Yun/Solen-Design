Implement the "FlipCard" component from zero: a two-faced card that rotates 180° around its horizontal or vertical axis with a spring whenever it is clicked, keyboard-activated, or dragged past the halfway point — dragging past halfway with velocity lets a fast flick throw the card over. While the pointer rests on the card it lifts, tilts subtly toward the pointer and a radial glare follows it; a blurred ground shadow squashes as the card turns edge-on. Reduced motion swaps the whole 3D performance for a simple crossfade. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + a motion runtime, two files only: FlipCard.jsx (entry, flip/drag state machine, springs) and FlipCard.css (all styles). React >= 18; the runtime provides motion values, springs, motion templates, reduced-motion detection and imperative `animate`.
- Root is a `<div>` with class `flip-card`, role="button", tabIndex 0 (−1 when disabled), aria-pressed = whether the back face shows, aria-label, aria-disabled when disabled: display inline-block, width = width (max-width 100%), height = height, radius, cursor pointer (grab while draggable, grabbing while dragging, default when disabled, disabled also at opacity 0.6), touch-action pan-y for the y axis and pan-x for the x axis, user-select none. Data attributes: data-axis, data-draggable (only when dragging is possible), data-dragging, data-disabled, and data-fade in reduced motion ("front"/"back").
- Inline CSS variables: --fc-w, --fc-h, --fc-radius, --fc-bg, --fc-ink, --fc-shadow, --fc-shadow-o, --fc-glare, plus motion-driven --fc-gx/--fc-gy (glare position %) and --fc-sheen (glare opacity) on the rotor.
- Children in paint order: an optional ground shadow span (absolute inset 12% 9% −5%, background = shadow colour at shadow-opacity, blur(22px), pointer-events none) whose scaleX (y-axis) or scaleY (x-axis) collapses to 0.08 as the card faces edge-on and whose opacity eases 0.1→1 as it turns face-on; and the rotor — an absolute inset-0 preserve-3d div carrying the two faces.
- Each face is absolute inset 0, overflow hidden, radius, background = background, colour = color, backface-visibility hidden. The back face carries a fixed rotateY(180deg) (rotateX(180deg) for the x axis). An optional glare span (radial white gradient centred at var(--fc-gx) var(--fc-gy), peak alpha = glare-opacity falling to 0 at the edge) sits on each face with opacity var(--fc-sheen).
- The rotor transform is a motion template per axis: perspective(perspective px) scale(lift) rotateX(tiltX) rotateY(turn + tiltY) for the y axis, mirrored for the x axis. `turn` is the master motion value in degrees (0 = front, odd multiples of 180 = back).

## Flip & drag state machine

- `turn` springs (stiffness/damping props, restDelta 0.05) to a snapped target (multiples of 180). Flipping computes the current snapped base and adds ±180. Every settle updates an internal shown-state (back = odd turn) unless controlled, and fires onFlipChange(next).
- Pointerdown (button 0 only) sets pointer capture, stops any spin spring, records the grip {pointer id, origin, base turn, moved flag, slop 4px mouse / 8px touch, velocity history} and lifts the card to hoverScale. Pointermove while gripped: once the pointer travels past the slop along the flip axis (and draggable is on), dragging starts — tilt/sheen reset — and the turn follows the finger: degrees = base ± (distance / dragSpan) × 180, dragSpan = dragDistance if set, else the width (y axis) or height (x axis); velocity history keeps the last 90ms of samples. Non-grip pointer moves over the card drive the hover tilt: tiltX/tiltY springs set to (pointer offset from centre) × tiltMax, the glare position tracks the pointer in %, and the sheen fades in.
- Release: a stationary press flips (if flipOnClick) with a spring; a drag clamps the destination to one half-turn past the snapped position of the release point plus velocity × 0.16 (fling factor, computed from the history, cancelled drags snap back); the settle spring receives the fling velocity. Touch release or leaving hover rests the tilt/sheen/lift. Keyboard Enter/Space flips (once per press); a click event with detail 0 (keyboard click synthesis) also flips. Escape-free — disabled cards ignore all input and rest.
- Reduced motion: pointer drag is disabled entirely, data-fade is set instead of a rotor transform, and the CSS shows only the matching face (both faces opacity 0 with backface-visibility visible, matching face opacity 1, 200ms fade transition).

## Controlled use & cleanup

- Controlled mode: when `flipped` is passed, external changes rotate to the nearest representation of the new face (never more than half a turn) using the same spring; uncontrolled mode seeds from defaultFlipped. onFlipChange fires in both modes whenever the shown face actually changes. Unmount stops the spin spring; a disabled change rests the hover state.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| front | ReactNode | null | Content of the front face. |
| back | ReactNode | null | Content of the back face. |
| flipped | boolean | - | Controlled face; pass together with onFlipChange. |
| defaultFlipped | boolean | false | Initial face (uncontrolled mode). |
| onFlipChange | (flipped: boolean) => void | - | Fires whenever the shown face changes. |
| axis | "y" \| "x" | "y" | Flip axis: y spins horizontally, x vertically. |
| flipOnClick | boolean | true | A stationary click flips the card. |
| draggable | boolean | true | Dragging past halfway flips the card. |
| dragDistance | number | 0 | Pointer travel that maps to a full half-turn, in px; 0 uses the card's own size along the axis. |
| tilt | boolean | true | Hover tilt toward the pointer. |
| tiltMax | number | 12 | Maximum tilt in degrees at the card edges. |
| glare | boolean | true | Radial glare following the pointer on both faces. |
| glareOpacity | number | 0.22 | Peak alpha of the glare. |
| hoverScale | number | 1.03 | Lift scale while hovering or gripping. |
| perspective | number | 1100 | Perspective distance of the 3D rotation, in px. |
| stiffness | number | 170 | Spring stiffness of the flip. |
| damping | number | 20 | Spring damping of the flip. |
| width | number | 300 | Card width in px. |
| height | number | 400 | Card height in px. |
| radius | number | 22 | Corner radius in px. |
| background | string | "#27272a" | Face background colour. |
| color | string | "#f5f5f5" | Face ink colour. |
| shadow | boolean | true | Shows the blurred ground shadow. |
| shadowColor | string | "#000000" | Shadow colour. |
| shadowOpacity | number | 0.45 | Shadow alpha. |
| disabled | boolean | false | Disables pointer, keyboard and hover input. |
| ariaLabel | string | "Flip card" | Accessible name of the button. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of FlipCard.jsx and FlipCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: click, Enter and Space each flip with a spring and fire onFlipChange; dragging past halfway flips, dragging back snaps to the nearest face; a fast flick throws the card over using release velocity; hover lifts, tilts toward the pointer and moves the glare; the shadow squashes edge-on; controlled flipped changes animate from outside; axis x flips vertically with the matching touch-action; disabled ignores input; reduced motion crossfades without 3D; unmount leaves no running spring; 375 / 768 / 1440 wide without overflow.
