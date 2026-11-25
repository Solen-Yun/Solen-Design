Implement the "LatticeLoader" component from zero: an inline agent status row where a small grid of cells lights up in a repeating wave pattern next to a label and a live stopwatch; when the task resolves the wave freezes and a subset of cells stays lit to spell a done or error mark, the label crossfades to "Done in" / "Failed after", and the stopwatch reads the elapsed time. Pure React + CSS, two files, no runtime dependencies beyond React >= 18; it must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files only: LatticeLoader.jsx (entry, pattern tables, stopwatch) and LatticeLoader.css (all styles). No iframe, no canvas.
- Root is a `<span role="status">` with class `lattice-loader`, plus `data-status` ("working" | "done" | "error"), `data-shape` ("round" | anything else), and `data-glow` (attribute present only when glow is on). It renders inline-flex, aligns items center, gap = font-size × 0.625, font-size from the fontSize prop, line-height 1.
- All colours, sizes and timings are injected as inline CSS variables on the root: `--ll-n` (grid side), `--ll-cell`, `--ll-gap`, `--ll-font`, `--ll-color` (run cells, defaults to currentColor), `--ll-mark` (errorColor when status is error, else doneColor), `--ll-idle` (idleOpacity), `--ll-glow` (glowColor or color), `--ll-mark-glow` (glowColor or the mark colour), `--ll-cycle` (round(loop × step × scale) ms). A `--ll-peak: 1` token stays in CSS.
- Children in order: a `lattice-loader__grid` span (aria-hidden) holding two stacked layers; a `lattice-loader__label` span (aria-hidden) with three absolutely stacked `lattice-loader__text` spans — label, doneLabel, errorLabel — where only the active one is `position: static`, opacity 1 and unblurred, the others sit absolute at top/left 0 with opacity 0 and blur(2px), so width comes from the active text and switching crossfades through a blur; optionally a `lattice-loader__timer` span (aria-hidden, only when showTimer) initialised to "0.0s" and updated by ref; and a visually hidden `lattice-loader__sr` span carrying the full announce text for screen readers.
- Each layer is `grid-area: 1 / 1`, a grid of n columns of cellSize-wide cells with gap between them; cells are squares of the cell size with border-radius max(1px, cell × 0.25), or fully round (50%) when data-shape="round". Cell background is `--ll-color`, resting opacity `--ll-idle`.

## Patterns & wave animation

- A pattern table maps names to per-grid definitions: `arrow` (3×3, loop 7.2, scale 1), `dots` (3×3, loop 3, scale 2.4), `ripple` (3×3, loop 4.8, scale 1.5), `spiral` (3×3, loop 9, scale 1.2, lit 0.35), `orbit` (3×3 loop 8 / 4×4 loop 6, scale 1.2; the 3×3 variant has a null hole in the centre), `snake` (3×3 loop 9 lit 0.35 / 4×4 loop 16 lit 0.25), `sweep` (4×4, loop 5, lit 0.45), `spin` (4×4, loop 4, scale 1.6, lit 0.35), `rain` (4×4, loop 4, scale 1.2, lit 0.35), `pulse` (4×4, loop 2.4, scale 2.5, lit 0.45). If a named pattern lacks a variant for the requested grid it falls back to the grid's default pattern (`orbit` for 3, `sweep` for 4). Patterns with a `lit` value dimmer than the default render with slower, dimmer pulse keyframes (see below); patterns without one use the base keyframes.
- A custom pattern object is `{ cells, loop?, scale?, lit? }`: cells is an array of length n² where each entry is a delay unit (0-based) or null for a permanently dark hole; defaults are loop = max unit + 4.2, scale = 1, lit = 0.62 (which disables the lit-variant keyframes).
- Each unit of delay equals `step × scale` ms. The run layer's i-th cell carries `animation-delay: unit × d ms` and animates `lattice-on` over the full cycle: it eases from idle opacity up to peak, holds, and falls back — 0%/100% idle, 18% and 42% peak, 62% idle, with a cubic-bezier(0.77, 0, 0.175, 1) in-out. Patterns flagged with lit 0.45 / 0.35 / 0.25 swap in variants with proportionally earlier, narrower peaks (45%: 13–31% peak, 45% back to idle; 35%: 10–24%, 35%; 25%: 7–17%, 25%) — the lit value is written to the cell as `data-lit` (rounded %) whenever it is set and not 0.62. Cells whose unit is null (`data-hole`) never animate and sit at idle × 0.47.
- Glow mode: when `data-glow` is present, every animating (non-hole) run cell gets a box-shadow glow of ~1.2 cell sizes in `--ll-glow`, and lit mark cells glow in `--ll-mark-glow`.

## Statuses, marks & stopwatch

- The mark layer holds one cell per grid position (no delays). While status is "working" the layer sits at opacity 0, scaled 0.9, transitioning in 160ms; when the status leaves "working" it fades to opacity 1 / scale 1 (200ms) while the run layer fades out and its animation pauses. Mark cells whose index is in the current mark map get `background: var(--ll-mark)` at full opacity. Mark maps: for 3×3, done = [2, 3, 5, 7] (a check-like arc) and error = [0, 2, 4, 6, 8] (an X-like cross); for 4×4, done = [7, 8, 10, 13] and error = [0, 3, 5, 6, 9, 10, 12, 15]. While working, the component remembers the last non-working mark it showed (a ref keeps the previous done/error choice) so the mark layer's colours stay valid mid-flight.
- Stopwatch: while status is "working" and `elapsed` is not provided, a 100ms interval measures performance.now() since mount of the working state and writes a formatted duration into the timer span by ref (no React state churn): under 60s it renders `(ds/10).toFixed(1)s`; otherwise `Xm Y.Ys` where X = whole minutes (600 deciseconds each) and Y.Y the remainder. Passing `elapsed` (seconds) paints that fixed value once and suppresses the interval; when status is not "working" the interval is cleared and the last reading stays frozen.
- The screen-reader announce swaps with status: working reads "`label`, in progress"; done/error reads "`doneLabel`/`errorLabel`" plus " X.X seconds" (or "X minutes Y.Y seconds") when showTimer is on, with the elapsed time taken from the ref at the moment of the switch.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "Thinking" | The working-state label text. |
| doneLabel | string | "Done in" | The label shown when status is done. |
| errorLabel | string | "Failed after" | The label shown when status is error. |
| status | "working" \| "done" \| "error" | "working" | Current task status; drives the wave, the mark and the label. |
| pattern | string \| { cells: (number \| null)[]; loop?: number; scale?: number; lit?: number } | "orbit" | A named pattern ("arrow", "dots", "ripple", "spiral", "orbit", "snake", "sweep", "spin", "rain", "pulse") or a custom pattern object. |
| grid | 3 \| 4 | 3 | Grid side length; named patterns fall back per grid when they have no variant. |
| shape | string | "round" | "round" renders circular cells; any other value renders the default rounded-square cells. |
| color | string | "currentColor" | Colour of the run-wave cells (and the glow when glowColor is empty). |
| doneColor | string | "#22c55e" | Mark colour for the done state. |
| errorColor | string | "#ef4444" | Mark colour for the error state. |
| cellSize | number | 6 | Side of one cell, px. |
| gap | number | 2 | Gap between cells, px. |
| fontSize | number | 14 | Font size of the label and base of the row gap, px. |
| step | number | 90 | Base delay unit between wave steps, ms (multiplied by the pattern's scale). |
| idleOpacity | number | 0.15 | Resting opacity of the run cells. |
| glow | boolean | false | Adds a soft box-shadow glow to lit cells. |
| glowColor | string | "" | Glow colour; falls back to the cell colour, and to the mark colour for mark cells. |
| showTimer | boolean | true | Shows the live stopwatch after the label. |
| elapsed | number | - | Fixed elapsed time in seconds; pauses the stopwatch at that value. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of LatticeLoader.jsx and LatticeLoader.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the wave travels the lattice continuously while working and loops seamlessly; every named pattern renders its own sequence (and its 4×4 variant where defined) with the correct per-step delay; switching status to done/error freezes the wave, fades in the mark cells and crossfades the label through the blur; the stopwatch runs in real time, formats past one minute correctly, and freezes at the final value; a fixed elapsed paints exactly and disables ticking; grid 3 and 4 both lay out cleanly at cellSize 4–10 and gap 0–6; glow adds visible halos only when enabled; colour via currentColor inherits the surrounding text colour and explicit colours override it; the screen-reader span announces the working text and then the done/error text with the spoken duration; prefers-reduced-motion flattens the pulse to a slow, dim 1400ms cycle with no per-cell delays, no scale/blur transitions; repeated status toggles never leak intervals; 375 / 768 / 1440 wide without overflow.
