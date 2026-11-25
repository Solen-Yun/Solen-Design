Implement the "Shuffle" component from zero: a block of text whose characters slot-machine shuffle into place when the block scrolls into view — each glyph rolls through a strip of clones or flips/blurs through a sequence of scramble glyphs before settling on the real one. The roll order, direction, effect, colours and timing are all configurable, it can re-run on hover or react to pointer proximity per character, and it can loop forever. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- Pure React + CSS, two files only: Shuffle.jsx (entry, splitting, cell build, timelines) and Shuffle.css (all styles). React >= 18; dependencies: the animation library gsap at ^3.13.0 (core, ScrollTrigger and its SplitText utility, registered once at module level) and @gsap/react at ^2.1.2 (useGSAP hook). No iframe.
- Root is the element named by the tag prop (default "p") with class `shuffle-parent` (plus `is-ready` once armed, plus className), inline styles textAlign, color and the style prop. The stylesheet styles it as inline-block, white-space normal, word-wrap break-word, line-height 1, font-size 4rem, font-family 'Press Start 2P' with a sans-serif fallback (a display-face styling choice; no font files are bundled, so environments without the face fall back cleanly), text-transform uppercase, and visibility hidden until `is-ready` so the pre-split flash never shows.
- Splitting waits for fonts: document.fonts.status "loaded" (or fonts.ready) flips a state that gates the effect, so glyph metrics are correct. On the ScrollTrigger enter it splits with the library's SplitText utility — type "chars", classes shuffle-char / shuffle-word / shuffle-line, smartWrap on, reduceWhiteSpace false — then boxes every visible glyph: a wrapper span (inline-block, width = glyph width, vertical-align bottom; overflow hidden in slide mode; perspective = glyph height × 3.2 in flip mode) containing an inner strip span (inline-block, will-change transform). Vertical directions measure the full font cell (canvas measureText font bounding box with a hidden probe-clone fallback) and pad the cell with negative top/bottom margins so rolling glyphs never clip the line box.
- Trigger start = `top ${(1 − threshold) × 100}%` shifted by rootMargin (parsed as number + px/em/rem/%, appended as −= or +=). once per page unless triggerOnce is false. reduced motion (respectReducedMotion) skips the build entirely: the text shows immediately and the completion callback fires.

## The shuffle

- Slide effect (default): the inner strip is filled with glyph clones — the original, then shuffleTimes scramble glyphs, then a head clone — and tweened along the axis (x for left/right, y for up/down) by (count + 1) cell widths from −span to 0 (right/down) or 0 to −span (left/up) with the ease prop (default power3.out) over duration seconds per cell.
- Flip effect: the cell steps through a glyph sequence [original, scrambles…, original] via a proxy 0→count+1; the nearest glyph shows while the view rotates ±180° per step around rotationX (vertical) or rotationY (horizontal), with a z-lift peaking mid-step (sin × height × 0.22) and opacity dipping to 0.22 by facing.
- Blur effect: the same sequence, but the glyph offsets ±0.42 cell per phase with an opacity dip, and an SVG filter bank of 12 directional Gaussian steps (feGaussianBlur, stdDeviation along the roll axis, max = max(2, cell × 0.26)) is applied by tracked roll speed — slide mode uses the same bank for motion blur when motionBlur is on (max = cell × 0.24).
- Scramble glyphs come from scrambleCharset when set, otherwise repeat the original character (a pure slot-machine roll). accentColor paints mid-roll glyphs; colorFrom → colorTo tween each cell's colour alongside the roll (unset falls back to the computed text colour).
- Start offsets per animationMode: "evenodd" (odd-index cells roll first at half-stagger; even cells follow after 70% of the roll span), "center" (distribute from the middle), "sequence" (index × stagger), "random" (uniform 0–maxDelay). A master timeline collects the per-cell timelines; loop repeats it forever with loopDelay and re-rolls the scramble glyphs each cycle, otherwise cells settle: the original glyph restored, transforms and filters cleared, wrap colour set to colorTo, and onShuffleComplete fires (also on every loop repeat).
- Hover replay: with triggerOnHover on, hoverRadius > 0 arms a rAF-throttled window pointermove scanner — cells within hoverRadius of the pointer shuffle again with strength smoothstepped by distance (rolls and duration scale with it, re-triggers throttled by pointer travel), while hoverRadius 0 re-builds and replays the full shuffle on mouseenter of the block.
- Cleanup on unmount or prop change: ScrollTrigger killed, hover listeners removed, all timelines killed, split reverted to the original DOM, filter bank removed from body, ready state reset. Multiple instances are independent (filter ids are randomised).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | - (required) | The text to split and shuffle. |
| className | string | "" | Extra class names for the root element. |
| style | object | {} | Inline styles for the root element. |
| shuffleDirection | "right" \| "left" \| "up" \| "down" | "right" | Which way glyphs roll out. |
| duration | number | 0.35 | Seconds each cell's roll takes. |
| maxDelay | number | 0 | Spread of random start offsets in "random" mode (seconds). |
| ease | string | "power3.out" | Tween ease of each roll. |
| threshold | number | 0.1 | 0–1; how far the block sits above the viewport bottom (start = top (1 − threshold) × 100%). |
| rootMargin | string | "-100px" | Extra margin appended to the trigger start, e.g. "-100px", "10%". |
| tag | string | "p" | Element to render. |
| textAlign | string | "center" | Text alignment of the block. |
| onShuffleComplete | () => void | - | Fires when the shuffle completes (and on every loop repeat). |
| shuffleTimes | number | 1 | How many scramble glyphs each cell rolls through (min 1). |
| animationMode | "evenodd" \| "center" \| "sequence" \| "random" | "evenodd" | How start offsets are distributed across cells. |
| loop | boolean | false | Repeats the shuffle forever with loopDelay between cycles. |
| loopDelay | number | 0 | Seconds between loop cycles. |
| stagger | number | 0.03 | Stagger between neighbouring cells. |
| scrambleCharset | string | "" | Characters picked for mid-roll glyphs; empty rolls the original character. |
| colorFrom | string | - | Colour cells tween from during the roll. |
| colorTo | string | - | Colour cells settle on. |
| triggerOnce | boolean | true | The scroll trigger fires once; false re-fires on every enter. |
| respectReducedMotion | boolean | true | Under prefers-reduced-motion the text shows immediately with no roll. |
| triggerOnHover | boolean | true | Arms hover replay (full replay, or per-cell when hoverRadius > 0). |
| effect | "slide" \| "flip" \| "blur" | "slide" | How the glyphs shuffle. |
| hoverRadius | number | 0 | px radius of per-cell proximity shuffling around the pointer. |
| motionBlur | boolean | false | Adds directional blur while slide cells roll fast. |
| color | string | - | Text colour of the block. |
| accentColor | string | - | Colour of mid-roll scramble glyphs. |

## Delivery & validation

- Deliver the complete content of Shuffle.jsx and Shuffle.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the roll fires at the configured threshold with and without rootMargin and never flashes unsplit text; all four directions roll the right way with no clipping (vertical cells pad for tall glyphs); slide / flip / blur each settle on the exact original text; evenodd / center / sequence / random offsets distribute as described; shuffleTimes and duration shape the roll; scrambleCharset changes mid-roll glyphs and empty repeats the character; accentColor paints mid-roll, colorFrom→colorTo tweens and settles; loop repeats with re-rolls and loopDelay; hover replay re-runs (whole block, or per-cell within hoverRadius scaling with distance); triggerOnce false re-fires on re-enter; reduced motion shows the text instantly and fires the callback; late font loads never mis-measure; unmount leaves no triggers, timelines, listeners, split wrappers or filter nodes; multiple instances are independent; long text wraps at 375 / 768 / 1440 wide without overflow.
