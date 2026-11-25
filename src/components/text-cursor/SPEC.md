Implement the "TextCursor" component from zero: a pointer trail of text — copies of a phrase stamped along the path your cursor takes, a snake-like chain of copies following at fixed spacing, or the phrase's characters strung into a ribbon that bends along the path; the trail shrinks and fades toward its tail, items pop in and die out with easing, can sway and rotate with the movement, and an eraser eats the trail from the tail once the pointer rests. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- One component in TextCursor.jsx plus TextCursor.css. React >= 18; no runtime dependencies.
- Root is a `<div class="text-cursor">` filling its host (width/height 100%, position relative); className and style merge in, and hideCursor = true sets cursor: none. Inside is a single `<div class="text-cursor__layer">` — absolute, inset 0, overflow hidden, line-height 1, pointer-events none, user-select none, aria-hidden — carrying the inline colour/size styling (color, fontSize, fontWeight, fontFamily) that all trail items inherit.
- Trail items are absolutely positioned spans (class text-cursor__item, white-space pre, will-change transform/opacity) placed with translate3d + translate(-50%, -50%) + rotate + scale; spans come from a recycled element pool (take/release) so long sessions don't churn the DOM.

## Modes

- "stamp" (default): a copy of text is stamped at every spacing px of arc length along the pointer path while the head is live and ahead of the eraser; at most maxPoints stamps stay alive — surplus oldest stamps die. Dead or capped-out stamps run the exit animation and are then recycled.
- "chain": a fixed chain of maxPoints copies trails the cursor, link k sitting k × spacing px back along the path; each link fades/shrinks by its rank in the chain.
- "ribbon": text is split into graphemes (Intl.Segmenter at grapheme granularity, falling back to Array.from) and strung end to end; each glyph's width is measured once (re-measured on font load), advances = width + spacing, and the whole ribbon bends along the recorded path, shrinking/fading by distance travelled.
- followMouseDirection rotates every item to the path heading at its position; keepUpright flips any angle beyond ±90° back by 180° so text never reads upside down.

## Motion engine

- The pointer feeds the head through pointermove/pointerdown on the root (local coordinates); pointerleave stops feeding. The head chases the raw pointer with exponential smoothing — factor 1 − exp(−dt / tau), tau = smoothing × 0.12 s — so the trail lags elegantly behind quick gestures.
- The path is an arc-length polyline: points are appended when the head moves at least 0.5px, old points are pruned beyond the mode's reach (ribbon span plus one average advance, or maxPoints × max(4, spacing) plus a margin), and positions/angles along it are read by binary search with a short window for heading.
- Enter (popIn): stamps scale in with a back-out ease over 0.42s and fade in over 0.12s; ribbon/chain glyphs reveal by how far they are above the eraser line. Exit: over exitDuration seconds the item shrinks by up to 55% and fades to zero with a smootherstep, then returns to the pool.
- Tail shaping: rank runs 0 (newest) → 1 (oldest tail) across the alive items; scale multiplies by (1 − shrink × rank) and opacity by (1 − fade × rank), so the trail tapers naturally.
- Eraser: a cut position follows the head at head.s − reach while moving; once the pointer rests for 100ms (or leaves), the cut advances at (unit / (removalInterval / 1000)) per second — unit is the average stamp spacing or glyph advance — eating the trail tail-first until nothing is left, at which point the path resets to zero so the next entry starts fresh.
- Float (randomFloat): stamps sway sinusoidally around their anchor (amplitude fontSize × 0.14, ramped in over 0.6s, per-item random phase) and tilt ±6°; ribbon/chain glyphs wave perpendicular to the path (amplitude fontSize × 0.12, wavelength at least fontSize × 2.2).
- The requestAnimationFrame loop self-stops once the head is dead, no stamps remain and float motions have wound down; it wakes on pointer activity and font load.

## Reduced motion & cleanup

- prefers-reduced-motion: reduce disables the float sway and the pop-in animation (items appear at full scale); the trail itself still follows the pointer, since it is direct manipulation.
- Unmount cancels the frame, removes the pointer listeners and clears the layer (replaceChildren). Multiple instances are independent (own pools, own paths).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Hello" | The text stamped / chained / ribboned. |
| mode | "stamp" \| "chain" \| "ribbon" | "stamp" | Trail style: per-spacing stamps, a fixed chain, or a grapheme ribbon. |
| spacing | number | 88 | Distance between stamps (and glyph gaps in ribbon), in px; floored at 4 when active. |
| maxPoints | number | 7 | Alive stamp cap in stamp mode; link count in chain mode. |
| followMouseDirection | boolean | true | Rotates items to the path heading. |
| randomFloat | boolean | true | Sinusoidal sway and tilt on the trail. |
| exitDuration | number | 0.5 | Death animation length, in seconds. |
| removalInterval | number | 30 | Eraser speed: ms worth of trail removed per second while idle. |
| shrink | number | 0.5 | How much the tail shrinks by rank, 0–1. |
| fade | number | 0.6 | How much the tail fades by rank, 0–1. |
| smoothing | number | 0.3 | Head lag 0–1; higher follows more slowly. |
| popIn | boolean | true | Pop-in entrance for new items. |
| keepUpright | boolean | true | Flips rotated items back so text stays readable. |
| hideCursor | boolean | false | Hides the native cursor over the root. |
| color | string | "currentColor" | Trail text colour. |
| fontSize | number | 28 | Trail font size, in px. |
| fontWeight | number | 600 | Trail font weight. |
| fontFamily | string | "inherit" | Trail font family; inherit keeps the page's font. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of TextCursor.jsx and TextCursor.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: stamp mode drops copies every spacing px along curves and caps alive stamps at maxPoints; chain mode keeps exactly maxPoints links trailing at fixed spacing; ribbon mode strings the graphemes along the path (including multi-byte emoji) and bends with the pointer; the tail visibly shrinks and fades by rank; items pop in with back-out and die with the configured exit; the eraser eats the trail tail-first while the pointer rests and the next entry starts clean with no jumps; followMouseDirection turns the trail and keepUpright prevents upside-down text; float sways without drifting away; smoothing 0 tracks tightly and higher values lag; hideCursor hides the native cursor; reduced motion removes sway and pop-in but keeps the trail; rapid mode/text changes rebuild without leaks; unmount leaves no frame, listeners or stray spans; multiple instances are independent; the trail area fills its host at 375 / 768 / 1440 wide without overflow.
