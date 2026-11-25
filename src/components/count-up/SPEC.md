Implement the "CountUp" component from zero: an animated number counter that runs from a start value to a target whenever it enters the viewport (or on load), with two engines — a plain text counter whose digits re-render through an easing curve, and a slot-machine "roll" engine where every digit spins in its own column with per-column stagger, speed-reactive motion blur and width-animated enter/leave for digits that gain or lose places. Formatting covers thousands separators, decimals, K/M/B/T compaction and prefix/suffix. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React >= 18 plus the motion package (the `animate` tween driver, `cubicBezier` easing factory and `useInView` visibility hook); one file (CountUp.jsx), no CSS file — all styles inline. No iframe.
- Root is a `<span>` with font-variant-numeric: tabular-nums, plus className, style and (when replayOnHover is on) a pointerenter handler. Two engines render inside it:
  - Count mode: one plain `<span>` whose textContent is rewritten every frame with `formatValue(latest)` — cheap and SSR-safe (the initial markup already shows the start value).
  - Roll mode: an aria-hidden `inline-flex` row with white-space pre and user-select none, keyed by the play id so a new run remounts fresh. Layout slots in order: optional prefix, then per-digit boxes, a label unit (K/M/B/T) when compact, then the suffix. Every slot is inline-block with height/line-height 1.2em. Digit boxes are overflow-hidden windows over a vertical strip of four cells (offsets −1, 0, 1, 2, each 1.2em tall, showing mod10(from + offset)) translated by −1.2em so cell 0 is visible at rest. A visually-hidden span carries the final formatted value for screen readers.
- Motion blur: a hidden SVG `<defs>` holds one `feGaussianBlur` filter per digit column (region x −20% / y −50% / width 140% / height 200%, sRGB filter interpolation); fast columns apply `filter: url(#uid-index)` while slow columns clear it. The uid comes from React's useId, sanitized to word characters.
- Formatting: decimals default to the most decimal places found in from/to (explicit `decimals` overrides). Compact format scales by K (1e3), M (1e6), B (1e9), T (1e12) with 1 decimal under 100 units, 0 otherwise; standard keeps all integer places. Thousands separators insert after every third integer place (as their own slot that fades with the digit it trails). Negative numbers get a minus slot that enters/leaves with the sign change. direction "down" swaps the roles of from and to.

## Animation engines

- Trigger: "view" waits for useInView (once, margin 0) — "load" fires immediately; both additionally gate on `startWhen`. The run snapshots `from: current displayed value` and `to: endValue`, incrementing a play id; changing `to` re-runs from the live value. `delay` (seconds) applies only to the triggering run.
- Timing: duration (seconds, floored at 0) drives a linear `animate(0, total)` tween; the engine applies its own easing to progress — linear, easeOut (cubic-bezier(0.33, 1, 0.68, 1)), expo (1 − 2^(−10t), normalized), or spring (an analytic damped oscillation tuned from overshoot 0.06, with a cubic residual correction so it lands exactly on 1). Count mode writes formatValue(from + (to − from) × ease(progress)); the same eased value feeds valueRef so a mid-run trigger change resumes smoothly.
- Roll layout (built on every relevant prop change): digit columns pair up the start/end values place by place; a column enters when the start value has no digit there and leaves when the end value has none. Each column's travel delta = the base digit difference ± 10 × turns, where non-spin turns are capped by how many times that place actually crosses (floor(|b − a| / 10^(place+1))) and by rank (outermost columns turn most, capped at 3); hover-spin mode forces at least one full turn and ranks the turn count 3, 2, 1 outward. Spin direction follows b ≥ a unless forced.
- Roll render: column u starts at its index × stagger (0.07s, squeezed so no column starts after 40% of the run) over span = total − stagger × (n − 1); position = from + delta × ease(u); the strip translates to −(1 + pos − base) × 1.2em and, whenever the integer base changes, the four cells re-write to mod10(base + offset − 1). Blur sigma tracks per-column numeric speed (|delta| × d(ease)/dt / span × cell / 600, capped at cell × 0.05) and applies only above 0.2px. Entering/leaving columns fade presence over the first/last 45–55% of their u with smoothstep, animating width (presence × scrollWidth) and opacity; separators/minus follow their adjacent column's presence, standalone marks follow overall progress (fade in by 30%, out from 70%).
- Spring easing in roll mode: each column gets its own spring with overshoot clamped to 0.35 / |delta| (0.01–0.12) so long travels overshoot less.
- prefers-reduced-motion: any run finishes immediately — final frame rendered, value snapped, onEnd called, no tween.
- Lifecycle: onStart fires when a run starts, onEnd when it settles. While idle (not started, or count mode not running) prop changes re-render the displayed value directly. replayOnHover: pointerenter replays when idle and already started — roll mode spins the digits in place from the current value; count mode reruns startValue → endValue.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| to | number | - | The target value. |
| from | number | 0 | The value the count starts from. |
| direction | "up" \| "down" | "up" | "down" swaps from and to so the number counts down. |
| delay | number | 0 | Delay before the run starts, in seconds; applies to the triggering run only. |
| duration | number | 2 | How long one run takes, in seconds. |
| className | string | "" | Extra class names for the root span. |
| style | CSSProperties | - | Inline styles for the root span. |
| startWhen | boolean | true | Gate for the run; false holds the counter at its start value. |
| separator | string | "" | Thousands separator character; empty disables grouping. |
| prefix | string | "" | Text before the number; fades with the run. |
| suffix | string | "" | Text after the number (after the compact unit); fades with the run. |
| mode | "count" \| "roll" | "count" | "roll" spins per-digit columns like a slot machine. |
| easing | "linear" \| "easeOut" \| "expo" \| "spring" | "easeOut" | Progress curve of the run; spring overshoots slightly. |
| decimals | number | - | Decimal places shown; defaults to the most places in from/to. |
| format | "standard" \| "compact" | "standard" | "compact" abbreviates with K / M / B / T. |
| trigger | "view" \| "load" | "view" | Whether to wait for the element to scroll into view. |
| replayOnHover | boolean | false | Hovering the number replays the animation when idle. |
| onStart | () => void | - | Called when a run starts. |
| onEnd | () => void | - | Called when a run settles on its final value. |

## Delivery & validation

- Deliver the complete content of CountUp.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: count mode animates smoothly and formats at every frame; roll mode spins each digit with stagger, gains/loses places with width fades, blurs fast columns and lands exactly on the target; changing `to` mid-idle reruns from the displayed value; direction down, negatives with entering/leaving minus, separators, prefix/suffix and compact K/M/B/T all format correctly; decimals round as configured; view trigger waits for visibility once, load trigger fires immediately, startWhen=false holds; delay applies once; spring overshoots and settles; reduced motion snaps to the final value; replayOnHover spins in place (roll) or reruns (count) only when idle; onStart/onEnd fire; unmount stops the tween; the SR-only final value matches the visual; 375 / 768 / 1440 wide without layout shift from proportional digits.
