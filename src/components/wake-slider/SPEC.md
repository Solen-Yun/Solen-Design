Implement the "WakeSlider" component from zero: a thumbless range slider made of thin vertical bars — bars left of the value fill in, and dragging fast raises a wake: bars near the virtual handle lift and brighten in a travelling crest whose shape leans opposite the motion, springing back to rest height when the drag slows. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: WakeSlider.jsx (entry, spring physics, per-bar paint) and WakeSlider.css (all styles). Uses `motion/react` for the two springs, velocity tracking, the render-frame scheduler and reduced-motion detection. No iframe, no canvas.
- Root is a `<div class="wake-slider">` (inline-flex, full width, 12px gap for an optional read-out) with inline CSS variables: `--ws-fill` (default #f5f5f5), `--ws-track` (#27272a), `--ws-crest` (crestColor or fill), `--ws-height` (default 56px), `--ws-gap` (4px) and `--ws-rest` (restHeight/height, default 12/56). `aria-disabled` dims to 0.5 and blocks pointer events.
- Track: a flex row, `flex: 1`, height var(--ws-height) (min 44px touch target), gap var(--ws-gap), `touch-action: none`, cursor grab/grabbing on fine pointers. It holds `bars` (default 32) spans — each `flex: 1 1 0`, full height, fully rounded (9999px), background track, base transform `scaleY(var(--ws-rest))` with a 120ms background-color transition only — plus an invisible keyboard handle: a full-track `<button role="slider">` (transparent, inset 0) carrying aria-valuemin/max/now, aria-valuetext (formatted value), aria-label (default "Value"), tabIndex −1 when disabled, and `aria-disabled`.
- Filled bars (`data-on="true"` — index ≤ round(head position × (bars − 1)/100)) switch background to the fill colour. An optional crest child span (only when crestColor is set) overlays each bar at the lift opacity — a brighter tip on top of the wake.
- Optional value read-out (showValue, default false): a 3ch, 13px tabular-nums span, right-aligned, 0.6 opacity, formatted via formatValue.
- Value model: clamped to [min, max] (defaults 0–100), snapped to `step` (default 1) with a half-up rule that also honours a non-representable max as a final notch; RTL layouts flip the pointer mapping via computed direction.

## Wake physics

- A target motion value carries the raw percentage; a critically-settleable spring `head` chases it (stiffness/damping from SETTLE 9.23 / glide 0.3, mass 1) — the bars' virtual handle position. A second spring `speed` smooths `useVelocity(head)` (frequency 2000/smoothing, default 100 → damping 2.5×) so the wake amplitude never jitters.
- Per frame (scheduled onto motion's render loop from head/speed change events, one paint per frame): amp = smoothstep(clamp(|speed| × sensitivity / 320)), the wake reach r = 1.5 + (reach − 1.5) × amp bars on each side, asymmetric — the trailing side widens by × (1 + skew 0.6) and the leading side shrinks by × (1 − skew/2) — always on the side opposite the motion direction. Each bar i lifts by amp × cos²(π·d / 2R) for |d| < R (d = i − head), applied as `scaleY(rest + lift × (1 − rest))`; the crest span's opacity equals the lift. Bars update their `data-on` attribute only on change.
- Idle fast-path: when the amp has been below 0.002 for two consecutive paints the transform writes are skipped entirely — bars only track the fill. Reduced motion: bars stay at rest height, the head snaps to the target and speed reads 0.
- Keyboard: arrows ±step, PageUp/PageDown ±10 steps, Home/End to the extremes — applied instantly (all three motion values jump, a `data-instant` flag suppresses the fill transition) and committed. Pointer: down anywhere on the track captures the pointer, focuses the hidden handle, and commits the value at the pointer; moves re-commit; up/cancel/lost-capture release. Value changes report via onChange (both pointer and keyboard), uncontrolled via defaultValue (50).
- Unmount: the springs stop with the motion values; no manual cleanup needed. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | Controlled value. Leave out for uncontrolled mode. |
| defaultValue | number | 50 | Starting value in uncontrolled mode. |
| onChange | (value: number) => void | - | Reports each snapped value change. |
| min | number | 0 | Range minimum. |
| max | number | 100 | Range maximum. |
| step | number | 1 | Snap increment; also the keyboard arrow step. |
| bars | number | 32 | Number of bars in the track. |
| height | number | 56 | Track height in px; also the full bar height. |
| restHeight | number | 12 | Bar height at rest, in px; clamped under the track height. |
| gap | number | 4 | Gap between bars, in px. |
| fillColor | string | "#f5f5f5" | Colour of the filled bars (index ≤ value). |
| trackColor | string | "#27272a" | Colour of the unfilled bars. |
| crestColor | string | '""' | Wake crest overlay colour; defaults to the fill colour (disabled when empty). |
| sensitivity | number | 1 | How easily drag speed raises the wake. |
| reach | number | 6 | Maximum wake radius in bars from the handle. |
| skew | number | 0.6 | Wake asymmetry: the trailing side stretches, the leading side tightens. |
| glide | number | 0.3 | Lower values make the handle spring snappier. |
| smoothing | number | 100 | Speed smoothing; higher is a calmer wake. |
| showValue | boolean | false | Shows the numeric read-out beside the track. |
| formatValue | (value: number) => string | String | Formatter for the read-out and aria-valuetext. |
| disabled | boolean | false | Blocks input and dims the slider. |
| ariaLabel | string | "Value" | Accessible name of the hidden handle. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of WakeSlider.jsx and WakeSlider.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: bars left of the value fill; slow drags barely lift the wake, fast flicks raise a leaning crest that trails the motion and springs back to rest; direction reversals flip the skew; crestColor lights the tips and clearing it removes the overlays; min/max/step snap including an awkward max; keyboard arrows, PageUp/Down, Home/End commit instantly without a wake; pointer drags anywhere on the track, capture survives leaving the track, RTL flips the mapping; controlled and uncontrolled modes both work with onChange; disabled blocks everything; reduced motion keeps the fill and kills the wake; bars/gap/height/restHeight/glide/smoothing reshape it; two instances on one page are independent; unmount leaves no scheduled frames; 375 / 768 / 1440 wide without overflow.
