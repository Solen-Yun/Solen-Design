Implement the "OptionWheel" component from zero: a curved, oversized option list that behaves like a physical scroll wheel — options arc away from the centre with tilt, blur and fading, and the wheel spins with mouse wheel, drag, arrow keys or a click on any option, easing with exponential smoothing until it snaps onto an option. Pure React + CSS, two files: OptionWheel.jsx (entry, layout loop) and OptionWheel.css (all styles). No runtime dependencies.

## Structure & rendering

- Root is a `<div>` (class option-wheel, plus option-wheel--right when side is "right" and option-wheel--dragging while dragging): position relative, width/height 100% of its container, overflow hidden, cursor grab, user-select none, touch-action none, outline none, tabIndex 0, role "listbox", aria-label "Option wheel". Arrow keys Up/Left (−1) and Down/Right (+1) move one option; focus-visible styling comes from the consumer.
- Every option is an absolutely positioned div (role "option", aria-selected on the selected one, class option-wheel__item plus --selected which bumps font-weight 200 → 500): anchored at top 50% and inset px (default 80) from the chosen side, nowrap, font-size from the fontSize prop in rem, line-height 1, transform-origin at the anchored side's centre. A `--ow-p` custom property (0 at the far edges, 1 in the middle) drives the colour: `color-mix(in srgb, activeColor p%, textColor)` — the centre option is fully activeColor, neighbours blend smoothly to textColor. Text/active colours, font size and inset are injected as CSS variables.
- Props re-apply through a config ref every render; a re-layout effect triggers on items/fontSize/spacing/curve/tilt/blur/fade/minOpacity/side/loop/smoothing changes so geometry never goes stale.

## Motion & layout loop

- One rAF loop eases the wheel position (a float option index) toward its target with frame-rate independent exponential smoothing: k = 1 − exp(−dt / τ), τ = smoothing ms (clamped ≥ 1). When within 0.001 of the target it snaps and the loop stops until the next input. All layout is written by this loop, so transform, opacity, blur and colour stay in step.
- Circular layout: options sit on a circle whose radius R = rowHeight / tiltRad (rowHeight = fontSize·spacing·rem, clamped ≥ 1px), so `tilt` in degrees directly controls how tightly the wheel curls; the angle of each option from centre is d·tiltRad clamped to ±90°. Y = R·sin(angle) (arc length per row equals one row height at the centre); X pulls options toward the far side by R·(1−cos(angle))·curve (curve 0 makes a straight list, > 0 an arc), mirrored for side "right"; rotation = angle in degrees, mirrored, around the anchored transform-origin. Non-circular fallback is a straight vertical list. transform is `translate(x, calc(y − 50%)) rotate(θ)`.
- Distance effects: opacity = max(minOpacity, 1 − |d|·fade), blur = |d|·blur px (blur 0 disables the filter). In loop mode, distance wraps modulo the item count (d folded to −n/2..n/2), so the wheel spins endlessly; otherwise the position clamps to 0..count−1.
- Wheel input: a non-passive wheel listener preventDefaults; each event's delta (line-mode deltas ×24) is divided by row height and capped at ±1 so a mouse wheel notch steps exactly one option while touchpads scroll continuously; a 140ms debounce snaps to the nearest option after scrolling stops.
- Drag: pointerdown records the start; after 4px of movement it captures the pointer (so plain clicks still reach options) and dragging follows −dy/rowHeight; release snaps to the nearest option. Clicking an option rolls the wheel there by the shortest path (wrapping in loop mode).
- Selection: whenever the target's rounded index changes (count-normalized in loop mode), the component sets state, fires onChange(index, item) and plays the optional tick sound — a throttled (70ms) Audio replay of soundUrl at soundVolume, with playback failures (autoplay policies) silently swallowed.
- Unmount: cancels the rAF loop, clears the wheel debounce timer and pauses the audio element.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | string[] | 12 built-in genre names | The option labels in wheel order. |
| defaultSelected | number | 3 | Initially selected index (uncontrolled). |
| onChange | (index: number, item: string) => void | - | Called whenever the selected option changes. |
| textColor | string | "#a6a6a6" | Colour of the far options. |
| activeColor | string | "#ffffff" | Colour of the centred option; neighbours blend into it. |
| side | "left" \| "right" | "left" | Which edge the list anchors to (mirrors the curve). |
| fontSize | number | 3 | Option font size in rem. |
| spacing | number | 1.4 | Row height as a multiple of font size. |
| curve | number | 1 | Arc depth; 0 makes a straight list, larger curls more. |
| tilt | number | 6 | Curl angle per row in degrees; sets the wheel radius. |
| blur | number | 2 | Blur added per option of distance from centre, px. |
| fade | number | 0.25 | Opacity removed per option of distance. |
| minOpacity | number | 0.05 | Opacity floor for far options. |
| smoothing | number | 200 | Smoothing time constant, ms; lower is snappier. |
| inset | number | 80 | Horizontal gap from the anchored edge, px. |
| loop | boolean | false | Wraps the wheel around for endless scrolling. |
| draggable | boolean | true | Drag to spin the wheel. |
| soundUrl | string | "" | Optional tick sound URL played on selection change. |
| soundVolume | number | 0.5 | Tick volume, 0–1. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of OptionWheel.jsx and OptionWheel.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: mouse wheel notches step exactly one option and touchpad scrolls glide, both snapping after idle; dragging past 4px spins the wheel (with pointer capture) and plain clicks still select an option; clicking a far option rolls the shortest path (wraps in loop mode); arrow keys step; onChange fires per selection change with the right index and item; curve 0 renders a straight list, larger curve/tilt curls it; fontSize/spacing/inset change the geometry live; blur/fade/minOpacity shape the depth; side "right" mirrors everything; loop mode wraps distances and selection modulo; textColor/activeColor blend through color-mix and the selected option is bold; reduced motion is not applicable (no transitions are used); unmount leaves no rAF, timers or audio; works at 375 / 768 / 1440 wide inside a sized container.
