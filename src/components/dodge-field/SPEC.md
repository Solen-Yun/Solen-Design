Implement the "DodgeField" component from zero: a pointer-play container whose pill (or any child you mount in it) slides away from the cursor the moment the cursor gets close — the closer it comes, the harder the pill presses against the far wall — and glides back to centre when the cursor leaves. It counts every successful dodge, taunts you with cycling labels, and after enough attempts (its patience) it relents: it stops fleeing, turns fully opaque and waits, unless you catch it with a click first, which pins it down in inverted colours for a moment before everything resets. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ driven by the motion animation library (motion/react: `motion`, `animate`, `useMotionValue`, `useMotionTemplate`, `useReducedMotion`). Two files only: DodgeField.jsx and DodgeField.css. No iframe.
- Root is a `<div class="dodge-field">`: position relative, display grid, place-items center, width 100%, height var(--df-height). It receives `--df-ink` (inkColor), `--df-contrast` (contrastColor), `--df-height` (fieldHeight px) as inline variables plus the caller's style/className (`--df-ease-out: cubic-bezier(0.23, 1, 0.32, 1)` lives in the stylesheet). Two data flags land on the root: `data-coarse` when the device fails the `(hover: hover) and (pointer: fine)` media query, `data-flat` when prefers-reduced-motion is on.
- Inside sits a mover `<motion.div class="dodge-field__mover">` — display inline-grid, will-change transform — whose transform is `translate(x px, y px)` built from two motion values through useMotionTemplate. All fleeing motion animates these values; the mover never remounts. The mover carries the click handler and three data flags: `data-fled="true"` while the pointer is inside the radius and the pill is not still, `data-relented="true"` when patience ran out, `data-caught="true"` while caught.
- Default content (when no children are given) is a `<button type="button" class="dodge-field__pill">` 52px tall, 999px radius, 0 28px padding, transparent border, background `color-mix(in srgb, var(--df-ink) 8%, transparent)`, text `color-mix(in srgb, var(--df-ink) 72%, transparent)`, font-size 18px weight 500, line-height 1, letter-spacing -0.012em, cursor pointer, tap highlight off, transitions on transform/background/color. `:active` scales it to 0.97; `:hover` (fine pointers only) lifts text to 90% ink; `:focus-visible` draws a 2px outline at 60% ink with 3px offset.
- The pill's label is a stack of taunts: a `.dodge-field__labels` grid where every taunt string is one `<span class="dodge-field__label">` stacked on grid-area 1/1, white-space nowrap, each with `data-active` and `aria-hidden="true"` (the button itself carries `aria-label` = first taunt). The visible one transitions in (opacity 1, filter none); the rest sit at opacity 0 with blur(2px), 200ms ease both. Which taunt shows: when relented or caught the last taunt in the array, otherwise the taunt at index min(dodge count, length − 2). When relented the pill text turns full ink (`data-relented` rule); when caught the pill inverts — background var(--df-ink), text var(--df-contrast).
- If children are provided they replace the pill entirely: a ReactNode renders as-is inside the mover, and a function child is called with the state object `{ dodges, gave, caught, fleeing }` (fleeing = pointer inside and not still) so callers can render their own reactive content. The mover's click handler stays active in all cases.
- On coarse-pointer devices only, an optional `<p class="dodge-field__notice">` renders under the mover (absolute, bottom 12px, full width, centered, 12px text at 55% ink, pointer-events none) with the notice string.

## Pointer engine

- Tracking arms only when the device passes `(hover: hover) and (pointer: fine)`; the media query is watched and re-synced live. Listeners sit on the window/document, not the field: window `pointermove` (passive; events with `pointerType: "touch"` are ignored), window `scroll` in capture phase (passive, just schedules a recompute so scrolling under a still cursor stays correct), document `pointerleave` and window `blur` (clear the pointer). Every event schedules at most one requestAnimationFrame — the engine coalesces.
- Each frame: the field's `getBoundingClientRect()` gives the on-screen box; a zoom factor `rect.width / offsetWidth` divides the pointer delta so CSS-scaled fields behave identically. Distance d is measured from the field centre; the pointer counts as inside while d ≤ radius. When the pointer is outside the radius and was inside on no previous frame, the frame does nothing — the loop costs nothing at rest.
- Flee force: `flee = (1 − d / radius) ^ falloff` while inside and not still, else 0. The escape bearing is the unit vector from centre to pointer, filtered by axis — axis "x" keeps only `sign(dx)`, axis "y" only `sign(dy)`, "both" the full normalized vector — refreshed whenever d > 6 (a dead zone keeps the bearing from jittering on top of the pill). The motion target is `−bearing × flee × reach` in both axes, then pushed through the wall mode with the available room.
- Room is measured as half the leftover space on each axis minus a 12px inset: `(field.clientWidth − mover.offsetWidth) / 2 − 12`, same for height, floored at 0. Wall "clamp" pins the target to the room box; wall "bounce" reflects it past the wall (`2 × room − t`) so overshoot visually rebounds. A ResizeObserver on both field and mover re-measures the room.
- The offsets animate with motion `animate()`: while fleeing, a spring with duration fleeDuration/1000 and bounce 0 (snappy, no overshoot); when the force returns to zero, a spring with duration returnDuration/1000 and bounce returnBounce (a soft glide home that can overshoot slightly). prefers-reduced-motion instead jumps both values straight to 0.
- Dodge counting (only while not still): crossing inside d < radius × 0.55 while "armed" records one dodge and disarms; the counter re-arms once the pointer moves back beyond the full radius, so one continuous chase counts once. Callbacks: onDodge fires with the new count on every dodge; onRelent fires once when the dodge count reaches max(1, patience) and the pill gives up.

## States, patience and catch

- "Still" is `gave || caught || disabled || reduced-motion`; a still pill never flees, never counts dodges, and holds zero offset. Relented (`gave`) latches until a catch resets it.
- Clicking the mover (button or any child) catches it: caught latches on, onCatch fires, any pending hold timer is cleared, and a 760ms hold begins. When the hold ends the pill releases: caught clears, the dodge count resets to 0 (labels cycle back to the first taunt), and the arm flag resets so a fresh chase starts cleanly. The unmount cleanup clears this timer.
- The rAF loop also re-ticks whenever "still" flips, so enabling/disabling, relenting, catching or reduced-motion changes settle the position immediately.
- Reduced motion: the flee engine is bypassed entirely (values jump to 0), the pill never flees, the stylesheet drops the `:active` press and the label blur transitions; the component stays fully clickable.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode \| (state) => ReactNode | - | Custom content for the mover; a function receives { dodges, gave, caught, fleeing }. Without children the default taunt pill renders. |
| taunts | string[] | ["Catch me", "Nope", "Too slow", "Almost", "Okay, okay"] | Label stack of the default pill; one shows at a time as the chase progresses. |
| notice | string | "" | Hint text shown only on coarse-pointer devices, under the field. |
| inkColor | string | "#f5f5f5" | Foreground ink of the default pill (light ink suits dark stages). |
| contrastColor | string | "#18181b" | Text colour while the pill is caught and inverted. |
| fieldHeight | number | 240 | Height of the field in px. |
| reach | number | 72 | Max distance in px the pill presses away at point-blank range. |
| radius | number | 120 | Radius in px around the field centre that wakes the flee force. |
| falloff | number | 2 | Exponent shaping the force between radius edge and centre; higher bites later and harder. |
| fleeDuration | number | 130 | Spring duration in ms while escaping. |
| returnDuration | number | 620 | Spring duration in ms of the glide home. |
| returnBounce | number | 0.1 | Spring bounce of the glide home. |
| axis | "both" \| "x" \| "y" | "both" | Escape direction; a single axis flees along that axis only. |
| wall | "clamp" \| "bounce" | "clamp" | How the target behaves at the edge of the free room; bounce reflects past it. |
| patience | number | 4 | Dodges before the pill relents and stops fleeing; floored at 1. |
| disabled | boolean | false | Freezes the pill in place (still ignores the pointer for fleeing). |
| onDodge | (dodges: number) => void | - | Called after each counted dodge with the running count. |
| onRelent | () => void | - | Called once when the patience runs out. |
| onCatch | () => void | - | Called when the mover is clicked and caught. |
| className | string | "" | Extra class names for the field. |
| style | CSSProperties | - | Inline styles for the field. |

## Delivery & validation

- Deliver the complete content of DodgeField.jsx and DodgeField.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: motion at ^12.23.12 (the motion/react entry).
- Validate: the pill presses away with force rising toward the centre and springs home with overshoot when the cursor leaves; every break past the inner ring counts one dodge and re-arms only after a full exit; labels cycle through the taunt stack, relent locks the last taunt with full-ink text, and a click inverts the pill for the hold before everything resets; axis x/y confines the escape to one axis and wall bounce visibly rebounds off the edge; a function child receives live dodges/gave/caught/fleeing; disabled and reduced motion freeze the field while clicks still work; coarse-pointer devices show the notice and never track the pointer; scroll with a stationary cursor keeps the force aimed correctly; the loop idles when the pointer is far away; unmount leaves no listeners, observer, rAF or hold timer; 375 / 768 / 1440 wide without overflow.
