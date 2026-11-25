Implement the "CallChip" component from zero: a compact status chip for a tool call (like a shell command, file edit or search) whose background carries a progress fill that wipes across the chip like a live timer; when the call finishes the fill settles with a green wash and the icon rolls to a checkmark, and when it fails the fill freezes with a red wash and the whole chip shakes horizontally. A live millisecond timer ticks in the trailing slot, and failed calls expose an invisible retry button covering the whole chip. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: CallChip.jsx (entry, status machine, timer loop) and CallChip.css (all styles). React >= 18. Depends on an icon set package only for the built-in glyphs (a command-line icon, a file icon, a search icon, a pencil-edit icon, a checkmark tick and a refresh arrow, all stroke icons around 1.8–2.2 stroke width); every glyph slot can alternatively receive arbitrary React nodes, so the icon package is replaceable.
- Root is an inline `<span>` with class `call-chip`, plus `data-status` (idle/running/done/error), `data-mounted` after first commit and `data-pressed` while the retry button is held: position relative, display inline-flex, align-items center, gap derived from font size, box-sizing border-box, height = size px, padding 0 × (35% of size), border-radius = radius px, overflow hidden, background = surfaceColor, color = color, white-space nowrap, user-select none, transition transform 160ms ease-out. Pressing scales the chip to 0.97.
- Size-derived CSS variables are injected inline: --cc-size, --cc-font (max(11, round(size × 0.38)) px), --cc-pad (round(size × 0.35) px), --cc-gap (round(font × 0.55) px), --cc-radius, plus colour tokens --cc-color, --cc-surface, --cc-progress with --cc-progress-pct (progressOpacity × 100%), --cc-done, --cc-error, --cc-wash-pct (washOpacity × 100%) and --cc-expected (expectedMs as a time value). All washes are `color-mix(in srgb, <token> <pct>, transparent)`.
- Content in paint order: an absolutely-positioned fill span (aria-hidden), a 1:1 glyph slot (width/height = font + 2px, overflow hidden) holding three stacked glyph spans, the tool name span (font-weight 500), the argument span (opacity 0.72), an optional timer span (min-width 6ch, tabular-nums, right-aligned, opacity 0.5), an optional retry button, and a visually-hidden live status span. Before `data-mounted` is set, all transitions on the fill and glyphs are disabled so the initial status paints instantly.

## Status machine & progress fill

- The fill span is absolutely inset 0, transform scaleX with transform-origin left center, pointer-events none. Running: the fill background is the progress colour at progress-pct alpha, transition transform var(--cc-expected) linear — on entering running it snaps to scaleX(0) with transitions disabled, forces a reflow, re-enables transitions and animates to scaleX(0.9) (the "hold at" fraction), so the fill wipes across the chip over expectedMs and stops just short of the end until the status resolves.
- Done: the fill turns into the done colour at wash-pct alpha and reveals itself with a two-stage clip: transform completes to scaleX(1) over 200ms ease-out while a clip-path of inset(100% 0 0 0) (hidden) transitions to inset(0 0 0 0) with a 400ms ease-out after a 200ms delay — the green wash floods down from the top edge right after the fill reaches full width. If the status was set without animation (initial mount), the fill and clip snap instantly.
- Error: the current fill fraction is read live from the computed transform matrix, clamped to 0–1, and frozen instantly (transitions disabled) so the wipe stops where it really is; the fill background crossfades to the error colour at wash-pct alpha over 200ms. Idle (queued): the fill resets to scaleX(0) instantly.
- Status changes are applied in a layout effect after mount, and the very first paint applies the initial status without transitions.

## Glyph roll

- The glyph slot stacks three glyph spans: the tool glyph (from the icon prop), a checkmark tick, and a refresh arrow. Exactly one is active at a time, driven by a status→glyph mapping (done → check, error → retry, otherwise tool) tracked as a current/previous pair so the outgoing glyph knows its direction.
- Inactive glyphs sit at opacity 0, translateY(70%), blur(3px). The incoming glyph transitions to identity over 240ms ease-out; the outgoing glyph rises to translateY(-70%) and fades over 160ms ease-out with blur. Because the slot clips overflow, this reads as a vertical roll within the chip.
- While status is done the active glyph is coloured --cc-done; while error it is coloured --cc-error. Reduced motion pins all glyphs to identity transform with no blur (opacity still switches).

## Timer & announcements

- While status is running, a requestAnimationFrame loop writes elapsed milliseconds (from performance.now() at effect start) into the timer span as "<round(ms)> ms" below 10 s or "<(ms/1000).toFixed(1)> s" above; the clock value is kept in a ref. On unmount or status change the loop cancels and writes one final value. With prefers-reduced-motion the loop is a 100 ms setInterval instead. When not running, the timer shows "—" if the status is idle or no time was ever recorded, otherwise it keeps the last recorded time.
- A visually-hidden span with role="status" (aria-busy on the root while running) carries a human announcement rebuilt on every status change: "<name> <argument>, running" / ", done in <ms> ms" / ", failed after <ms> ms" / ", queued" (using the last recorded time when available).

## Error shake & retry

- On an animated error entry, if shake > 0 and motion is not reduced, the root gets a Web Animations API shake: seven keyframes translating X through [0, −1, 1, −0.66, 0.66, −0.33, 0] × shake px with a strong ease-in-out per key, 450 ms total, composite "add" so it stacks on the press scale. Any new running entry cancels the shake; unmount cancels it too.
- When status is error and onRetry is provided, a transparent absolutely-positioned button (inset −5px, radius = chip radius) covers the whole chip, making the chip itself clickable for retry with aria-label "Retry <name> <argument>"; it owns the pressed scale state. The chip gets pointer cursor in error status.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | "terminal" \| "file" \| "search" \| "edit" \| ReactNode | "terminal" | Tool glyph. A string picks a built-in icon (command line, file, search, pencil edit); any node renders in its place. |
| name | string | "bash" | Tool name shown after the glyph. |
| argument | string | "npm test" | Argument text shown dimmed after the name. |
| status | "idle" \| "running" \| "done" \| "error" | "running" | Call status: queued, in progress (fill wiping + timer), finished, or failed. |
| expectedMs | number | 2500 | How long the running fill takes to wipe to its 90% hold point, in ms; drives the CSS transition duration. |
| size | number | 34 | Chip height in px; font size and horizontal padding derive from it. |
| radius | number | 10 | Corner radius in px. |
| color | string | "currentColor" | Ink colour of the labels. |
| surfaceColor | string | "#27272a" | Chip background. |
| progressColor | string | "currentColor" | Tint of the running fill. |
| progressOpacity | number | 0.08 | Alpha of the running fill, 0–1. |
| doneColor | string | "#22c55e" | Green of the done wash and check glyph. |
| errorColor | string | "#ef4444" | Red of the error wash and retry glyph. |
| washOpacity | number | 0.14 | Alpha of the done/error wash, 0–1. |
| shake | number | 6 | Horizontal shake amplitude on failure, in px; 0 disables the shake. |
| showTimer | boolean | true | Shows the live millisecond timer. |
| onRetry | () => void | - | Called when the retry button is pressed; the button only exists in error status. |
| className | string | "" | Extra class names for the chip. |
| style | CSSProperties | - | Inline styles for the chip. |

## Delivery & validation

- Deliver the complete content of CallChip.jsx and CallChip.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: mounting directly in each status paints the right state with no transition flash; running wipes to 90% over expectedMs and the timer counts in real time; done floods the green wash top-down right after the fill completes and rolls the icon to a check; error freezes the fill at its true fraction, shakes horizontally, rolls to the retry glyph and exposes the retry button; retry (pointer and keyboard) calls onRetry and can drive back to running; rapid status flips never leave a stale animation or wrong fill fraction; showTimer false hides the timer; size/radius/colour props all take effect; reduced motion removes the shake, glyph roll and pressed scale but keeps a correct timer; unmount cancels the rAF/interval and shake animation; 375 / 768 / 1440 wide without overflow.
