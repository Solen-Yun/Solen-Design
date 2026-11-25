Implement the "WarmTooltip" component from zero: a tooltip system where the first label waits out a delay, and while the group is still warm every sibling tooltip opens instantly — one floating bubble that travels between triggers on a spring instead of closing and reopening. Add a velocity-based lean, a directional content swap, pop-scale entrances, an arrow, a delay fuse indicator, full keyboard/touch support and a portal-mounted fixed-position bubble. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: WarmTooltip.jsx (entry: group provider, bubble, trigger) and WarmTooltip.css (all styles). Uses `react-dom` for the portal and `motion/react` (AnimatePresence, springs, velocity) for motion and reduced-motion detection. No iframe.
- Two exports: `WarmTooltipGroup` (named) — the stateful context provider and bubble host — and `WarmTooltip` (default) — a trigger that works inside a group or spins up its own throwaway group. Multiple groups on one page are independent.
- The bubble is portalled to `document.body`: a `motion.span role="tooltip"` with a generated id, fixed at 0,0 and moved purely by transform (width/height are animated motion values too), class `warm-tooltip`, `data-side` top/bottom/left/right, z-index 9999, pointer-events none. Inside, a `warm-tooltip__box` (surface colour, radius, two-layer shadow, transform-origin from the side) carrying the animated content layer and an optional arrow — an 8px rotated square with a 2px radius, nudged inside the edge on the active side, positioned along the perpendicular axis by a motion value clamped 10px from either end.
- Content layer: `AnimatePresence` keyed by trigger id — entering/exiting layers slide SWAP_SHIFT (10px) along the travel direction (or away from the side for vertical moves) with a 3px blur, 140ms ease-out, while `presence` fades the whole box. The text span is nowrap, 500 weight, 7px gap to an optional `<kbd>` shortcut chip (tinted 9%-ink pill with an inset underline).
- Trigger wrapper: an `inline-flex` span around `cloneElement(children, { 'aria-describedby': active ? bubbleId : inherited })` so the original element keeps its own semantics; `data-pressing` while a touch hold is armed.
- Sizing: sm/md/lg presets (font 11.5/12.5/13.5px, padding 8×5 / 10×6 / 12×7) chosen by the trigger's `size`; the bubble measures the text span each placement (width + 2×px, height + 2×py). Radius (default 8), gap (8px from the trigger), colours (`surfaceColor` #f5f5f5, `inkColor` #18181b) are per-trigger.
- prefers-contrast: more swaps the shadow for a 1px inset outline. Reduced motion: the lean and pop transforms are skipped — opacity-only presence, instant jumps, 0ms swaps.

## Warm/fuse state machine

- Group state: closed → open → closing, plus a `warmUntil` timestamp. Hovering a trigger arms a timer of `delay` (group default 400ms, per-trigger override); on expiry the bubble shows in "cold" mode — presence animates 0→1 over popDuration (160ms) with popScale (0.94 → 1) and popBlur (4px → 0). On close (pointer leave after an 80ms grace, Escape, outside pointerdown, blur) the bubble fades out over 80% of popDuration and stamps `warmUntil = now + warmWindow` (300ms); a timer re-evaluates the warm flag for `onWarmChange`.
- While `now < warmUntil` (or a swap is in flight), entering any trigger shows in "warm" mode: presence jumps to 1 with no pop — the bubble simply appears already settled at the new anchor. The travel leg: if the previous trigger's anchor differs, position/size springs fly the bubble from the old anchor to the new one (spring, duration = travel 320ms, bounce 0.1) while the content layer swaps directionally.
- Anchoring: each side has its anchor point (top → centre-top of trigger, etc. offset by the gap); the bubble layout clamps the perpendicular axis to an 8px viewport margin; horizontal sides clamp the x, vertical sides clamp the y. The arrow position follows the trigger along the bubble edge.
- While open, scroll (capture, passive) and resize re-anchor on the next frame; the tab hiding closes instantly. Keyboard focus (:focus-visible) opens with mode "instant" — position and presence jump, no animation; blur and Escape close instantly.
- Touch: pointerdown arms a long-press timer (default 500ms) with pointer capture; moving >10px cancels; expiry opens cold and suppresses the click; pointerup early cancels the fuse; contextmenu is swallowed while pressing. Mouse pointerdown closes immediately.
- Optional fuse indicator (showFuse): a 2px bar hugging the trigger's active side (4px out) that scales 0→1 linearly over the armed delay (`--wt-fuse-ms`), for cold hover or a touch long-press, and vanishes otherwise — the waiting made visible.

## Velocity lean

- The bubble's anchor is driven by springs; its velocity (useVelocity on x/y, picking the axis perpendicular to the current side) feeds a clamped −1…1 unit spring (stiffness 260, damping 22, mass 0.4, full lean at 1200px/s). With lean > 0 the box counter-rotates up to lean degrees (signed per side) while travelling, decaying to 0 as the spring settles — the bubble banks into its moves.
- Pop: a rise of 4px toward the side (scaled by (1 − presence), sign-corrected for left) plus the popScale transform compose into the entrance; presence also drives the popBlur.

## Props

### WarmTooltipGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| delay | number | 400 | Cold-open delay, in ms. |
| warmWindow | number | 300 | How long after a close the group stays warm, in ms. |
| travel | number | 320 | Duration of the bubble's spring flight between triggers, in ms. |
| lean | number | 0 | Max banking angle while travelling, in degrees. |
| onWarmChange | (warm: boolean) => void | - | Reports warm-state transitions. |
| children | ReactNode | - | Triggers and page content. |
| ref | { reset() } | - | Imperatively closes the bubble and clears the warm state. |

### WarmTooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | ReactNode | - | Bubble content. |
| shortcut | string | - | Keyboard shortcut shown as a kbd chip. |
| children | ReactElement | - | The trigger element; receives aria-describedby while active. |
| side | "top" \| "bottom" \| "left" \| "right" | "top" | Side of the trigger the bubble anchors to. |
| delay | number | group value | Cold-open delay override, in ms. |
| warmWindow | number | group value | Warm window override, in ms. |
| surfaceColor | string | "#f5f5f5" | Bubble background (also the arrow and fuse). |
| inkColor | string | "#18181b" | Text colour. |
| size | "sm" \| "md" \| "lg" | "md" | Font and padding preset. |
| radius | number | 8 | Bubble corner radius, in px. |
| gap | number | 8 | Distance from the trigger, in px. |
| arrow | boolean | true | Renders the little rotated-square arrow. |
| popDuration | number | 160 | Cold-open pop duration, in ms. |
| popScale | number | 0.94 | Scale the bubble pops from, 0–1. |
| popBlur | number | 4 | Blur the bubble pops from, in px. |
| showFuse | boolean | false | Shows the delay fuse bar on the trigger. |
| longPress | number | 500 | Touch long-press duration, in ms. |
| disabled | boolean | false | Removes all handlers and closes instantly. |
| className | string | "" | Extra class names for the trigger wrapper. |

## Delivery & validation

- Deliver the complete content of WarmTooltip.jsx and WarmTooltip.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the first hover waits out the delay with a pop entrance; moving to a sibling within the warm window opens instantly and the bubble springs across instead of closing; the content layer swaps with a directional slide+blur; the bubble banks when lean is set and the pointer moves fast; each side anchors and clamps at viewport edges with the arrow tracking; Escape, blur, outside pointerdown and pointer leave (after the grace) all close; focus-visible opens instantly and aria-describedby lands on the real element only while active; touch long-press opens, drag-cancel and early release cancel, the swallowed click does not fire; showFuse draws the delay bar on hover and long-press; size/radius/colours/gap/arrow retheme; shortcut renders as a kbd chip; disabled triggers do nothing; reduced motion strips transforms but keeps behaviour; groups are independent; scroll/resize re-anchor; unmount clears all timers; 375 / 768 / 1440 wide without overflow.
