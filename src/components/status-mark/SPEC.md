Implement the "StatusMark" component from zero: a task-status glyph that lives in one 24×24 SVG and morphs between states — an idle dotted ring breathes quietly, running turns the dots into a progress arc (determinate from a progress number, otherwise an arc that spins forever), done snaps the arc into a solid ring that fills faintly and draws a check, failed draws a cross, cancelled dims with a cross — optionally followed by a label that gets struck through on completion. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: StatusMark.jsx (entry, dash morphing, spin animation) and StatusMark.css (all styles). Uses `motion/react` for the three animated values and reduced-motion detection. No iframe.
- Root is a `<span class="status-mark">` with `data-status` (pending | running | done | failed | cancelled), `data-indeterminate` while running without a usable progress, and `data-strike` when the label strike is enabled. Inline CSS variables: `--sm-size` (default 20px), `--sm-stroke` (2), `--sm-color` (currentColor), `--sm-done` (#22c55e), `--sm-error` (#ef4444), `--sm-fill` (0.06), `--sm-font` (14px), `--sm-draw` (240ms), `--sm-strike-delay` (120 + strikeDelay ms), plus caller `style` merged last.
- Glyph SVG (viewBox 0 0 24 24, width/height = size): a track circle (r = 10 − strokeWidth/2, rotated −90° so arcs start at 12 o'clock) and a ring circle at the same radius; below them a check path "M7.5 12.25 10.5 15.25 16.75 8.75" and a cross path "M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5", both with `pathLength 1` and hidden by default (dashoffset 1.05, opacity 0).
- Colour states (CSS only): pending/running/cancelled inherit `--sm-color`; done recolours the glyph to `--sm-done`, failed to `--sm-error`. The track stroke shows at 0.2 opacity while running; the track fill shows at `--sm-fill` in done/failed. The ring sits at 0.55 opacity when idle and 1 while running/done/failed.
- Optional label to the right (gap = size × 0.5): a muted span (opacity var driven per state — 0.65 idle, 1 running/failed, 0.6 done, 0.55 cancelled) with an absolutely positioned 1px strike line that wipes scaleX 0 → 1 (280ms ease-out, delay = 120 + strikeDelay) when the status reaches done and strike is on.
- Accessibility: with a `label` prop the glyph is aria-hidden and a visually hidden `role="status"` span announces the state text ("Pending", "In progress, 42%", "Completed", …) before the visible label; without a label the SVG takes `role="img"` and `aria-label` with the same spoken text. Determinate running appends the rounded percentage.

## Ring morph mechanics

- Circumference C = 2πr; each of the `dashes` (default 8) idle dots occupies P = C/dashes. A `mode` motion value blends 0 (idle) ↔ 1 (solid) over 300ms ease-in-out; an `arc` motion value carries the arc fraction (indeterminate → arcLength 0.68, determinate → clamp01(progress), done/failed → 1). The ring's stroke-dasharray is recomputed per frame as an interpolation between the dotted pattern (dash 0.3·P, gap 0.7·P) and a plain arc (dash arc·C, gap (1−arc)·C), written directly via setAttribute; a `travel` motion value sets the dashoffset (rotation position).
- Indeterminate running: travel animates one full −C per spinDuration (default 1100ms) linearly, repeating forever — the arc chases itself around the ring.
- Determinate running: the arc springs to the progress fraction (spring, 0.3s, no bounce) while travel snaps to the nearest dot boundary (unit P) so the arc stays aligned with the idle dots, then jumps to 0; on a re-render-free path the same spring drives arc changes as progress updates.
- Entering running from idle snaps arc to its target first so the dots appear to gather into an arc; leaving to pending morphs back to dots. Reduced motion: no morph or spin — states jump, and the indeterminate ring uses a CSS breathing animation (opacity 1 → 0.45 → 1, 1400ms) instead.
- Done/failed: check/cross draw via CSS stroke-dashoffset transition (drawDuration, delay 120ms); unmount-safe — a generation counter guards stale completion callbacks; the three motion-value subscriptions are torn down on unmount.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | "pending" \| "running" \| "done" \| "failed" \| "cancelled" | "pending" | Current task state. |
| progress | number | - | 0–1 completion for running; a finite value makes the arc determinate. |
| label | ReactNode | - | Text shown to the right of the glyph; also hides the glyph's own img role. |
| color | string | "currentColor" | Glyph and label colour for idle/running/cancelled states. |
| doneColor | string | "#22c55e" | Glyph colour in the done state. |
| errorColor | string | "#ef4444" | Glyph colour in the failed state. |
| size | number | 20 | Glyph width and height in px. |
| strokeWidth | number | 2 | Ring and mark stroke width. |
| dashes | number | 8 | Number of idle dots around the ring. |
| fontSize | number | 14 | Label font size in px. |
| spinDuration | number | 1100 | One full revolution of the indeterminate arc, in ms. |
| arcLength | number | 0.68 | Arc fraction of the indeterminate spinner, 0–1. |
| drawDuration | number | 240 | Check/cross draw time in ms. |
| fillOpacity | number | 0.06 | Track fill opacity in done/failed, 0–1. |
| strike | boolean | true | Strikes through the label when done. |
| strikeDelay | number | 60 | Extra delay before the strike wipes, in ms. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles merged over the component's own variables. |

## Delivery & validation

- Deliver the complete content of StatusMark.jsx and StatusMark.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: pending → running gathers the dots into an arc; determinate progress grows the arc and announces the percentage; indeterminate spins without drift; done fills faintly, recolours and draws the check, then the label dims and the strike wipes; failed draws the cross; cancelled shows a dimmed cross; every transition reverses cleanly (done → running → pending) with no stuck dasharray; the label changes without remounting the glyph; reduced motion jumps states and breathes the spinner instead of spinning; aria status text updates for screen readers; color/doneColor/errorColor retheme all states; sizes 16–28 and stroke widths 1.5–3 render correctly; unmount stops all animation subscriptions; 375 / 768 / 1440 wide without overflow.
