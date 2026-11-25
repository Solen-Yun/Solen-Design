Implement the "RubberSegment" component from zero: a segmented control whose active thumb is a rubber block — clicking another segment stretches the thumb across the gap and squashes it into the new slot, while dragging the thumb pulls it with inertia, rubber-bands past the ends, and flicks to a neighbouring segment based on release velocity. Built with React, CSS and a motion library (motion values, animate, useReducedMotion); no icon dependencies required. It must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files: RubberSegment.jsx (entry, thumb edge simulation, pointer/keyboard logic) and RubberSegment.css (all styles). Dependencies: React >= 18 plus a motion library exposing `motion/react`-style primitives (animate, motion, useMotionValue, useReducedMotion, useTransform); no other runtime deps. No iframe.
- Root is a `<div role="radiogroup">` with class `rubber-segment` (plus caller className), aria-label (default "Segmented control"), aria-disabled when disabled, `data-equal` when equalSlots (grid-auto-columns switches between auto and minmax(0, 1fr)), `data-draggable` when draggable and enabled. Layout: inline-grid flowing as columns, padding = inset px, radius = radius px, track background var, touch-action pan-y, user-select none. Aria-disabled dims to 0.5 and blocks pointer events.
- Items: one `<button type="button" role="radio">` per entry — items accept strings or { value, label, icon } — with aria-checked, roving tabIndex (only the checked item is tabbable), height track-minus-2×inset, min-width per size (sm 36 / md 44 / lg 48), padding per size, font per size (12/13/14px), ink colour at opacity 0.7 (hover 0.9 on fine pointers), pressed items scale 0.96, focus-visible a 2px outline in the thumb colour offset 3px.
- The thumb is a sibling `motion.div` (absolute, inset = inset px, grid matching the items' column flow so its labels line up, thumb background, active ink, pointer-events none, aria-hidden) whose clip-path does all the work: `inset(0 max(0, innerW − edgeR) px 0 max(0, edgeL) px round thumbRadius px)` where innerW = track width − 2×inset and thumbRadius = max(0, radius − inset). Because the thumb layer duplicates every item's label (in `rubber-segment__copy` spans with full-opacity active ink), the clipped window shows crisp active-coloured text exactly where the rubber block covers — labels never move, only the window does.
- Size presets: sm height 28, md 36, lg 44 (drives --rs-h, --rs-font, --rs-pad, --rs-min). Colour/geometry tokens injected inline: track, thumb, ink, active ink, radius, inset, thumb radius, height, font, pad, min.

## Thumb physics

- Two motion values, edgeL and edgeR, are the thumb's left and right edges in track space. Slots are measured from each item's bounding rect (minus the inset) on layout, ResizeObserver, document.fonts.ready and whenever the item list/size/inset/equalSlots change; measuring snaps the thumb to the committed slot. All durations divide by the speed prop (seconds/speed).
- Click travel (pointer up on a different segment within a 10px slop): first a 0.19s dilate tween with a strong ease-out stretches both edges from the old slot to the union of old and new bounds scaled by stretch/100 (100 = full stretch across the gap), then after a 0.15s handoff delay the landing springs run: the leading edge springs to the target with a 0.3s no-bounce spring using the current velocity, and the trailing edge first overshoots to target + dir × squash (a rubbery stretch into place) before relaxing back over 0.16s. Generation counters cancel stale sequences when a new gesture or jump starts.
- Drag: pointerdown on the thumb (within current edges) captures the pointer, stops animations, and after a 4px deadzone enters live drag — both edges track the pointer keeping the thumb width, clamped to the inner track; past the ends a rubber-band bends the overhang: `over·dim·0.55 / (dim + 0.55·|over|)` (dim = thumb width for the near edge), so the thumb squashes against the rail and resists. A 100ms pointer history (max 8 samples) yields release velocity (px/s, clamped ±2000). Release projects the ballistic distance `v/1000 · d / (1−d)` with d = 1 − 0.1·0.05^(glide/100), picks the slot nearest the projected centre, and a flick (|v| > 110 px/s) that would land back on the committed segment pushes one further in the flick direction; landing uses a 0.4s momentum spring (bounce 0.2) on the leading edge with the release velocity, and flicks include the squash-into-place. Pointer cancel returns to the committed slot.
- Clicking a non-thumb segment (pointerdown marks it pressed, scale 0.96) commits and travels on release. Keyboard: Arrow keys/Home/End commit and jump the thumb instantly (jump sets both edges without animation) and move focus; commit reports { value, index } via onChange, or updates internal state in uncontrolled mode (value prop wins). Escape from an external value change or list change re-measures and snaps.
- Reduced motion: travel and drag land by jumping edges directly (no tweens, no rubber band), release just snaps to the nearest slot. Unmount clears the handoff timer and stops both edges. Hover only brightens un-checked items.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { value: string; label?: string; icon?: ReactNode })[] | (required) | Segments; strings use themselves as value and label. |
| value | string | - | Controls the selected value yourself; the prop wins over internal state. Use with onChange. |
| defaultValue | string | - | Starting value (uncontrolled); defaults to the first item. |
| onChange | (value: string, index: number) => void | - | Called when a segment is committed. |
| trackColor | string | "#27272a" | Track background. |
| thumbColor | string | "#fafafa" | Thumb and focus-outline colour. |
| textColor | string | "#fafafa" | Idle label ink. |
| activeTextColor | string | "#18181b" | Label ink inside the thumb. |
| size | "sm" \| "md" \| "lg" | "md" | Height/font/pad/min-width preset. |
| radius | number | 10 | Track corner radius, px; the thumb uses radius − inset. |
| inset | number | 3 | Gap between thumb and track edge, px. |
| equalSlots | boolean | true | Gives every segment an equal column width. |
| stretch | number | 100 | How far the dilate phase stretches the thumb, percent of the covered span. |
| squash | number | 3 | Trailing-edge overshoot into the new slot, px. |
| speed | number | 1 | Divides every animation duration; 2 = twice as fast. |
| glide | number | 75 | Ballistic glide distance on release, 0–100. |
| draggable | boolean | true | Allows dragging the thumb. |
| disabled | boolean | false | Disables interaction. |
| className | string | "" | Extra class names for the root. |
| aria-label | string | "Segmented control" | Accessible name of the radiogroup. |

## Delivery & validation

- Deliver the complete content of RubberSegment.jsx and RubberSegment.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: clicking a distant segment stretches the thumb across the gap and squashes it into the slot; dragging rubber-bands past both ends and springs back; fast flicks advance exactly one segment and slower drags land on the projected nearest slot; pointer cancel returns home; rapid click-while-animating cancels cleanly with no stuck thumb; equalSlots on/off relayout; controlled and uncontrolled modes honour onChange; keyboard arrows/Home/End work with roving tabindex; sizes sm/md/lg and radius/inset variations render sanely; disabled blocks everything; string and object items with icons render; reduced motion snaps without tweens; resize and font load keep the thumb aligned to its slot; unmount leaves no timers or animations; 375 / 768 / 1440 wide without overflow.
