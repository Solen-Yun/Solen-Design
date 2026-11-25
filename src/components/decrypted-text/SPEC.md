Implement the "DecryptedText" component from zero: hacker-style text that resolves out of noise — characters show random glyphs from a pool, cycling on a fixed tick until each position locks to its real character, with per-character opacity/tint ramps, an optional sequential one-by-one reveal, and 3D flip or fade variants instead of the plain scramble. It supports four trigger modes (hover, view, click, in-view + hover), a pointer-proximity heat mode that scrambles only near the cursor, looping encrypt/decrypt cycles, and width-correct glyph substitution so scrambled text never shifts layout. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React >= 18 plus the motion package (a `motion.span` wraps everything); one file (DecryptedText.jsx), no CSS file — all styles inline. No iframe.
- Root is a `motion.span` (inline-block, white-space pre-wrap) taking parentClassName, the interaction handlers chosen by animateOn, and any extra props spread through. A visually-hidden span carries the real text; the visible layer is aria-hidden and groups characters into words: whitespace renders as plain text between word spans (white-space nowrap) so words never break across lines.
- Each non-space character renders in a relative inline-block cell. A revealed cell shows the real character with `className`; an unrevealed cell gets `encryptedClassName` and renders two layers — an invisible ghost of the real character (visibility hidden) that keeps the cell's exact width, plus an absolutely-positioned random glyph centred at left 50% and squeezed with scaleX so its advance width matches the ghost's (measured with a canvas 2D context against the cell's computed font style + letter-spacing, cached per font string, clamped to ≥ 0.05, re-fitted on resize via a ResizeObserver which also invalidates the measurement cache when the font changes). The real character never reflows while scrambled.
- The scramble pool: `characters` (default "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+") or, with useOriginalCharsOnly, the unique non-space letters of the text itself; an empty pool falls back to the text's letters. Spaces never scramble.

## Engine

- A setInterval ticks every `speed` ms (floored at 16). Each tick: the run state advances, then every cell repaints — a cell is scrambled when it is unrevealed or a local-heat roll hits (probability heat × 2), and scrambled cells re-roll a random pool glyph every tick.
- Non-sequential reveal: forward runs just hold the noise for `maxIterations` ticks, then lock everything at once; hidden cells' opacity ramps from 0.16 toward 0.62 by the run's progress (non-sequential) or by rank within the first 6 positions of the sequential queue (sequential), while tinted cells interpolate their colour. Hiding (reverse) runs knock out ceil(visible count / maxIterations) random characters per tick until only spaces remain.
- Sequential mode reveals (or hides) exactly one character per tick in reveal order — "start" left-to-right, "end" right-to-left, "center" sorted by distance from the string's midpoint, "random" a fresh Fisher–Yates shuffle per run; queue entries may be padded with null warmup ticks (used by loops).
- Proximity heat (hoverRadius > 0, hover-style triggers): each tick every non-space cell's heat decays by 1/maxIterations and is topped up by a smoothstep falloff of the pointer's distance to that cell's centre (measured once per run against the container rect) divided by hoverRadius; hot cells scramble probabilistically with a tint/dim proportional to heat × 1.5, so text shimmers around the cursor and cools down behind it.
- Trigger modes: "hover" starts revealed and re-scrambles from all-hidden on pointerenter (ignored while a run is active), settling on pointerleave; "view" starts hidden and reveals once when an IntersectionObserver (threshold 0.1) sees it; "click" starts hidden and reveals on click — once, or toggling reveal/hide with clickMode "toggle"; "inViewHover" combines both (view-triggered reveal plus hover handlers; leaving with loop on schedules a hide cycle). Scheduled loop steps wait while the element is off-screen and resume when it returns.
- Effects: "scramble" swaps glyphs; "fade" additionally animates per-cell opacity (0.16–0.62 while hidden, 1 when revealed) with cell-speed CSS transitions; "flip" runs Web Animations on each changed cell — hiding cells rotateX-flip out (58–84°, ≤ 240ms), newly revealed cells flip in from 90° with a springy cubic-bezier (up to 760ms) under perspective(4em) translateZ offsets.
- scrambleColor: revealed cells transition from the scramble colour to their inherited colour over 0.7s (opacity 0.6s) with a soft cubic-bezier; scrambled cells mix scrambleColor into currentColor by their tint percentage (color-mix in srgb), themselves transitioning per tick.
- Loop: after a forward run completes, wait loopDelay ms then run a hide cycle (marked as a loop cycle); when the hide completes, reveal again (sequential loops pad the queue so hiding doesn't echo). Loop cycles continue until loop is turned off, which cancels pending timers.
- prefers-reduced-motion: runs complete instantly (mask jumps to the target state, one repaint, no ticker), the flip effect is skipped, and view-mode starts revealed.
- Unmount clears the ticker interval and all scheduled timeouts; the IntersectionObserver and ResizeObserver disconnect.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | - | The text to decrypt. |
| speed | number | 50 | Milliseconds between engine ticks, floored at 16. |
| maxIterations | number | 10 | Ticks of noise before the text resolves; also paces the fade ramp and heat decay. |
| sequential | boolean | false | Reveal one character per tick in order instead of all at once. |
| revealDirection | "start" \| "end" \| "center" \| "random" | "start" | Order of the sequential reveal. |
| useOriginalCharsOnly | boolean | false | Scramble using only the text's own unique letters. |
| characters | string | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+" | Glyph pool for scrambled cells. |
| className | string | "" | Class for revealed characters. |
| parentClassName | string | "" | Class for the wrapper span. |
| encryptedClassName | string | "" | Class for still-encrypted characters. |
| animateOn | "hover" \| "view" \| "click" \| "inViewHover" | "hover" | What triggers the decryption. |
| clickMode | "once" \| "toggle" | "once" | Whether clicks reveal once or toggle encrypted/decrypted. |
| effect | "scramble" \| "fade" \| "flip" | "scramble" | Visual treatment of swapping characters. |
| scrambleColor | string | "" | Colour encrypted characters tint toward; empty disables tinting. |
| loop | boolean | false | Decrypt, wait, encrypt, decrypt — forever. |
| loopDelay | number | 2000 | Milliseconds between a completed run and the next loop step. |
| hoverRadius | number | 0 | Proximity radius in px; > 0 scrambles only near the pointer. |
| ...props | span props | - | Spread onto the wrapper span (aria-label, id, etc.). |

## Delivery & validation

- Deliver the complete content of DecryptedText.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: hover re-scrambles and resolves without layout shift at every tick (squeeze matches all glyphs, including wide/narrow and CJK); sequential reveals in all four directions; view triggers once on scroll-in; click reveals once or toggles; inViewHover combines view + hover; fade ramps opacity, flip animates both directions without jitter; scrambleColor tints while encrypted and settles to the inherited colour; loop cycles forever with the configured delay and pauses off-screen; hoverRadius limits scrambling to the pointer's neighbourhood and cools down after leave; useOriginalCharsOnly and custom pools apply; reduced motion resolves instantly; words never wrap mid-word; unmount leaves no intervals, timeouts or observers; readable text via the SR-only layer at 375 / 768 / 1440 wide.
