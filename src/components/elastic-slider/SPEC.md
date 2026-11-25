Implement the "ElasticSlider" component from zero: a volume-style slider whose track thickens when you approach, stretches like rubber when pulled past either end, and snaps back with a bounce — while the fill follows a springy value, icons nudge along, and an optional thumb or value bubble rides the handle. Horizontal or vertical, stepped or continuous, with ticks, in-track content, full keyboard support and ARIA slider semantics. Pure React + CSS, two files: ElasticSlider.jsx (entry, three-spring engine, pointer/wheel/keyboard input) and ElasticSlider.css (all styles). React plus one small icon package for the default volume icons.

## Structure & rendering

- Root is a `<div>` (class elastic-slider, data-orientation horizontal/vertical, data-disabled when off): flex column, 12rem wide (height 12rem when vertical), gap 8px, touch-action none. Above the body sits an optional value label (12px/500, tabular numerals, 60% opacity). The body row holds the start icon, the hit area and the end icon; icons render outside the track by default (iconPlacement "inside" tucks them into the track ends, counter-scaled so they never distort). Both icons default to small-volume / high-volume glyphs; iconColor is injected as a variable.
- The hit area is role "slider" with tabIndex (−1 when disabled), aria-label, aria-valuemin/max/now, aria-valuetext (the formatted value), aria-orientation and aria-disabled; its height is max(34px, thickness, activeThickness) so it is easy to grab; cursor grab, grabbing while dragging; :focus-visible draws a 2px outline around the track. Disabled state fades to 0.45 opacity and drops pointer events.
- Inside the hit sits the track: a full-width pill (height = animated thickness, radius = radius prop or thickness/2, background trackColor default 18% of currentColor) containing the range fill — an absolutely positioned layer of rangeColor (default currentColor) revealed by a clip-path inset computed every frame from the fill origin to the current fraction, with rounded corners. Optional 3px tick dots (ticks=true auto-generates one per step when ≤ 40 exist, else 11 evenly spaced; ticks can be an explicit array of values; fill ticks render inside the range in the fill ink), optional in-track content spans (contentColor), an optional circular thumb (size clamped 16–28 from activeThickness + 6, thumbColor, subtle shadow) and an optional value bubble (12px/600 pill of rangeColor with the fill ink) that follows the handle.
- valuePosition: "top" (label above), "bubble" (bubble at the handle, popping 0.7→1 scale as the slider activates), "inside" (the value sits at the fill's end inside the track), "none". fillFrom sets where the fill grows from (default the minimum); formatValue overrides the label (default: step decimals when stepped, else rounded).
- Ink contrast: when fillContentColor is "auto", the range's resolved background is probed through a 1×1 canvas; alpha below 0.5 inherits the outer content colour, luminance above 0.55 picks dark ink rgba(18,15,23,0.86), otherwise light ink rgba(255,255,255,0.94). All colours accept any CSS colour, including color-mix.

## Motion engine

- Three springs run in one rAF loop, integrated at 240Hz sub-steps with clamped frame deltas: the fill spring (omega 2π/0.09 while dragging for a tight follow, 2π/0.3 idle, zeta 1 while dragging and 0.86 idle for a slight overshoot), the stretch spring (omega 2π/0.42, zeta 1 − 0.9·bounce, bounce clamped 0–0.95) and the activity spring (omega 2π/0.32, zeta 0.9) that eases a 0..1 "active" value used for thickness, icon scale and bubble pop. The loop self-sleeps when all three settle (tolerances ~4e-4) and wakes on any input.
- Thickness interpolates from thickness (default 6) to activeThickness (default 12) with the activity spring; content inside the track fades in past 14px via a --elastic-slider-reveal variable; the whole body crossfades from restOpacity (default 0.7) to 1 when active.
- Stretch: the track scales from the fixed end (transform-origin flips to the side being stretched): along the axis it grows by 1 + stretch/length, across the axis it thins by up to 22% of maxStretch; a --elastic-slider-unscale variable counter-scales in-track icons/ticks so they stay square. The fill, thumb and bubble positions are computed in stretched space and pushed toward the grabbed end. Icons shift with the stretch and scale 1.08 when active.
- Rubber band: dragging beyond either end maps the overshoot through a logistic rubber curve (distance/limit with maxStretch as the limit); while held, the stretch spring is frozen at the rubber value; release lets it spring back with bounce. Trying to move further past an end (wheel or keyboard at a bound) kicks the stretch velocity to maxStretch·5.5 toward that side and pulses the nearest icon (scale 1→1.35→1, 280ms) — a refusal bounce; skipped under reduced motion.
- Input: pointerdown captures the pointer on the hit area; jumpToClick (default) commits the clicked position immediately, otherwise dragging offsets from the current value; move commits the snapped value (isStepped + stepSize rounds to the step); pointerup/cancel/lost capture ends the drag and fires onChangeEnd. Wheel (wheel prop, non-passive) steps ±stepSize when stepped or span/800 continuously, debouncing onChangeEnd by 200ms. Keyboard: arrows ±unit (step or span/100), PageUp/PageDown ±span/10, Home/End to bounds, each committing and firing onChangeEnd.
- State: controlled when value is passed (still fires onChange), otherwise internal seeded by defaultValue (default 50). startingValue/maxValue define the range (order-independent).
- Reduced motion: all springs snap to their targets each frame (position, stretch, activity) — behaviour is instant but correct.
- Unmount: cancels the frame, clears the wheel debounce timer, removes the wheel listener and disconnects the ResizeObserver that re-measures the hit area.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | Controlled value; pair with onChange. |
| defaultValue | number | 50 | Initial value in uncontrolled mode. |
| startingValue | number | 0 | One end of the range. |
| maxValue | number | 100 | Other end of the range. |
| isStepped | boolean | false | Snaps values to stepSize. |
| stepSize | number | 1 | Step increment when stepped. |
| onChange | (value: number) => void | - | Fires on every committed value change. |
| onChangeEnd | (value: number) => void | - | Fires when a drag/wheel/keyboard interaction ends. |
| orientation | "horizontal" \| "vertical" | "horizontal" | Layout direction. |
| leftIcon | ReactNode | low-volume glyph | Icon at the range start. |
| rightIcon | ReactNode | high-volume glyph | Icon at the range end. |
| iconPlacement | "outside" \| "inside" | "outside" | Icons beside the track or inside its ends. |
| valuePosition | "top" \| "bubble" \| "inside" \| "none" | "top" | Where the value label lives. |
| formatValue | (value: number) => ReactNode | - | Custom value label. |
| ticks | boolean \| number[] | false | Tick marks; true auto-generates from the step. |
| thumb | boolean | false | Circular handle dot. |
| fillFrom | number | range start | Where the fill grows from. |
| thickness | number | 6 | Rest track thickness, px. |
| activeThickness | number | 12 | Track thickness while active, px. |
| radius | number | thickness / 2 | Track corner radius, px. |
| restOpacity | number | 0.7 | Body opacity when inactive, 0–1. |
| growOnHover | boolean | true | Activates thickness on hover. |
| maxStretch | number | 50 | Rubber-band limit, px. |
| bounce | number | 0.5 | Snap-back overshoot, 0–0.95. |
| jumpToClick | boolean | true | Clicking jumps the handle to the pointer. |
| wheel | boolean | false | Enables wheel adjustment. |
| trackColor | string | 18% of currentColor | Track background. |
| rangeColor | string | "currentColor" | Fill colour. |
| iconColor | string | "currentColor" | Icon colour. |
| contentColor | string | "currentColor" | In-track content colour. |
| fillContentColor | string \| "auto" | "auto" | Content colour inside the fill; auto probes contrast. |
| thumbColor | string | "#ffffff" | Thumb colour. |
| disabled | boolean | false | Disables interaction. |
| ariaLabel | string | "Slider" | Accessible name. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of ElasticSlider.jsx and ElasticSlider.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the fill follows the pointer with a springy settle and overshoot; dragging past either end rubber-bands and springs back with bounce; wheel/keyboard at a bound refuses with the bump + icon pulse; thickness grows on hover/drag/focus and shrinks back; icons shift during stretch and stay undistorted inside the track; value shows in all four positions (bubble pops, inside follows the fill); stepped mode snaps with the right label decimals; ticks auto-count and explicit arrays render, fill ticks included; thumb rides the handle; vertical orientation flips axes; controlled and uncontrolled modes both fire onChange and onChangeEnd at the right moments; disabled blocks everything; fillContentColor auto picks readable ink over light/dark/translucent fills; reduced motion snaps without springs; unmount leaves no frame loop, timers or observers; works at 375 / 768 / 1440 wide.
