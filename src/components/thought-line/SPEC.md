Implement the "ThoughtLine" component from zero: a reasoning-trace header — a glyph and a working label breathe (or shimmer) while a live deciseconds clock runs beside them; when work settles, the working label cross-fades with a blur into a done label, the clock glides leftward to sit beside it, and the step list folds up into nothing. The header is a button that re-expands the folded steps. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: ThoughtLine.jsx (entry, breathing loops, timer, fold) and ThoughtLine.css (all styles). Uses `motion/react` for the breathing/settle animations and reduced-motion detection, plus one icon package for three built-in glyphs (a sparkles mark, a chevron, a small tick; the exact glyph artwork ships embedded in code and takes precedence over this description). No iframe.
- Root is a `<div class="thought-line">`, inline-flex column, inline CSS variables: `--tl-font` (default 16px), `--tl-color` (currentColor), `--tl-glyph` (color or glyphColor), `--tl-settle` (settleDuration ms, default 350), `--tl-blur` (settleBlur px, default 2), `--tl-shimmer` (shimmerDuration s, default 1.8), plus caller style.
- Header row: `data-toggle` button (when collapsible and there are steps) or a plain div. Inside, left to right: the glyph span (1.1em square); a label stack — an inline-grid of two absolutely stacked text spans (working and done) both in grid cell 1/1, `width: max-content`, hidden by default with `opacity 0; filter: blur(var(--tl-blur))` and transitioned over --tl-settle with an ease-out; `data-active` shows one of them (done variant settles to 0.75 opacity); the timer span (tabular-nums, 0.55 opacity, 0.75 when done, its own transform transition); the chevron span (appears at 0.55 opacity only when steps exist, rotates 180° when open); and a visually hidden `role="status"` live span announcing the current label.
- Glyph kinds: "sparkle" renders the built-in sparkles icon (strokeWidth 2), "dot" renders a 0.5em circle, "none" renders nothing, any ReactNode is rendered as-is.
- Trace below: a grid fold — `.thought-line__trace` transitions `grid-template-rows 0fr ↔ 1fr` over --tl-settle ease-out (width 0 + min-width 100% keeps long steps from widening the header); the fold clips vertical overflow; the step list is a column with 0.45em gaps, padding 0.6em 0 0.2em 1.6em, font-size 0.875em, weight 400, `white-space: nowrap`. Each step is a row of a 1em mark plus text; the mark shows a tick icon for finished steps and a pulsing dot (1.6s CSS keyframe, 2.4s under reduced motion) for the in-flight last step; done step text dims to 0.55. New steps fade/slide in via a `@starting-style` rule (opacity 0, translateY −4px).
- Working shimmer: with shimmer on, the working label's breath span gets a 100° three-stop gradient (50% ink → full ink → 50% ink) background-clipped to the text, background-size 250%, animating position from 125% to −125% over --tl-shimmer linear infinite.

## Working ↔ settle choreography

- `working` prop drives the state; `settleAfter` seconds (default 0 = never) auto-settles via the timer interval; once settled, `onSettle(elapsedSeconds)` fires once (guarded by a ref so identity changes don't re-fire). Setting working back to true clears the auto-settled flag and reopens.
- Breathing (working): the glyph and the label take turns on an ease-in-out loop of breathPeriod (default 1.6s) between trough opacity (1 − breathDepth, default 0.55) and 1. With shimmer on, the label itself stays at 1 (the shimmer carries the life) and only the glyph breathes with a 0.2s lead-in; without shimmer (or breathDepth 0) both fade to steady 1. All loops are `animate()` instances stopped on cleanup or state change.
- Settle (not working): glyph eases to 0.55 opacity and the label stack to 1 over settleDuration; the two stacked labels cross-fade with blur (working out, done in).
- Timer: a live deciseconds clock ("12.3s", or "1m 04.5s" past a minute). With `elapsed` given the clock renders that statically; otherwise an interval paints every 100ms into a ref'd span (no re-render). The done text is `doneLabel` or, when showTimer, "Thought for" — the timer glides from its own spot to sit right after the done label: on settle the layout effect measures `active text width − stack width` and translates the timer span by that offset (force-reflow trick for a no-glide initial placement), with a ResizeObserver re-placing on text changes.
- Collapse on settle: `collapseOnSettle` (default true) folds the trace when work ends; clicking the header toggles it again (aria-expanded, chevron). Without steps the header is inert (tabIndex −1).
- Accessibility: the visually hidden status region reads the working label or, once settled, "Thought for 12.3 seconds" (spoken format mirrors the clock). Steps and decorative marks are aria-hidden; reduced motion halves depth, lengthens the breath period 1.5×, drops blur/translate transitions, and settle text swaps keep opacity only.
- Unmount: every animate() loop and the timer interval are cancelled. Repeated working↔settle cycles are fully reversible.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "Thinking…" | The working label. |
| doneLabel | string | '""' | The settled label; defaults to "Thought for" (timer on) or "Done thinking". |
| renderLabel | (text: string, working: boolean) => ReactNode | - | Custom renderer for both labels. |
| glyph | "sparkle" \| "dot" \| "none" \| ReactNode | "sparkle" | Leading glyph. |
| steps | string[] | [] | Reasoning steps; the last one pulses until settle. |
| collapsible | boolean | true | Header toggles the folded steps. |
| collapseOnSettle | boolean | true | Folds the steps automatically on settle. |
| color | string | "currentColor" | Label, glyph and timer colour. |
| glyphColor | string | '""' | Glyph colour override; defaults to color. |
| fontSize | number | 16 | Header font size in px. |
| breathPeriod | number | 1.6 | One breathing cycle of the glyph/label, in seconds. |
| breathDepth | number | 0.45 | Breathing depth 0–1; 0 fades to a steady state. |
| shimmer | boolean | true | Text shimmer while working (replaces label breathing). |
| shimmerDuration | number | 1.8 | One shimmer sweep, in seconds. |
| settleDuration | number | 350 | Cross-fade, timer glide and fold duration, in ms. |
| settleBlur | number | 2 | Blur radius during the label cross-fade, in px. |
| working | boolean | true | Whether the trace is still working. |
| settleAfter | number | 0 | Auto-settle after this many seconds; 0 waits for the prop. |
| elapsed | number | - | Static elapsed seconds to display instead of the live clock. |
| showTimer | boolean | true | Shows the deciseconds clock. |
| onSettle | (elapsed: number) => void | - | Called once when the line settles, with the elapsed seconds. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles merged over the component's own variables. |

## Delivery & validation

- Deliver the complete content of ThoughtLine.jsx and ThoughtLine.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: while working the glyph breathes (or the label shimmers) and the clock counts deciseconds without re-rendering the tree; steps appended mid-flight fade in, earlier steps show ticks and the last one pulses; settling cross-fades the labels with blur, glides the timer next to the done label, dims both and folds the steps; the header re-expands and collapses; onSettle fires exactly once per settle with the right seconds; settleAfter auto-settles; elapsed renders statically; label/doneLabel changes re-place the timer via the ResizeObserver; glyph dot/none/ReactNode variants render; collapsible false removes the toggle; reduced motion keeps everything readable with no blur or spin; working → settle → working cycles cleanly; unmount stops loops and intervals; 375 / 768 / 1440 wide without overflow.
