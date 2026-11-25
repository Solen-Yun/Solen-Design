Implement the "FoldText" component from zero: a display headline whose lines, words or characters unfold into place like creased paper opening flat — each piece rotates around a hinge edge (top, bottom, left or right) from a folded angle down to 0 degrees while a crease shading fades off. It supports three fold styles (a plain paper fold, a two-slat blinds fold, a full flip through 180 degrees), four triggers (mount, hover, scroll into view, endless loop) and an optional hover re-crease that tilts pieces near the cursor. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, with the GSAP tween library (core plus its ScrollTrigger plugin) driving the timelines. Two files only: FoldText.jsx (splitting, timeline, pointer re-crease) and FoldText.css (layout, crease overlays, reduced-motion clamp). React >= 18. No iframe.
- Root is an inline-block `<span class="fold-text">` carrying inline CSS variables: `--fold-text-font-size` (a number becomes px, a string passes through), `--fold-text-font-weight`, `--fold-text-color` and `--fold-perspective` = max(120, perspective)px. The stylesheet gives it line-height 0.95, letter-spacing −0.04em, white-space pre-wrap and user-select text.
- Two children: a screen-reader-only span holding the full plain text, and an aria-hidden visual span holding the split segments. splitBy "line" turns each line of text.split("\n") into a block-level segment (empty lines render a non-breaking space). splitBy "word" renders one piece per whitespace-separated word. The default splitBy "char" wraps each word in an inline-block nowrap span (so wrapping happens between words) containing one piece per character. Original whitespace is preserved, and newlines inside whitespace runs render as `<br>`.
- Each piece is a `.fold-text-piece` span carrying `data-fold-hinge`, `data-fold-style` and `data-fold-text` (its exact content) and starts at opacity 0 while folded. foldStyle "blinds" instead renders a piece holding two stacked slat spans, each duplicating the content; the second slat is absolutely positioned over the first and hidden when at rest. Segments are inline-block spans with `perspective: var(--fold-perspective)`; line segments are display block.
- Hinge map: top → transform-origin 50% 0%, rotateX, sign −1; bottom → 50% 100%, rotateX, +1; left → 0% 50%, rotateY, +1; right → 100% 50%, rotateY, −1. An unknown hinge or foldStyle value falls back to top / paper.
- Crease shading: every piece and slat draws an ::after overlay with `content: attr(data-fold-text)`, transparent text fill, and a linear gradient clipped to the text — rgba(0,0,0,0.58) at the hinge edge, rgba(0,0,0,0.22) at 42%, then rgba(255,255,255,0.26) at the far edge, with the gradient direction flipped per hinge. Its opacity is var(--fold-crease) = creaseShading × clamp(1 − progress + tilt/90, 0, 1), so the paper looks shaded while creased and clean when flat.

## Fold animation

- After layout, the component collects the .fold-text-piece elements and builds a GSAP timeline tweening each piece's progress value t from 0 to 1 over duration seconds with ease "none" and a stagger of { each: stagger, from: staggerFrom }. A render pass on every update writes per piece: `rotate(axis, sign × ((1 − progress) × angle + tilt))`, opacity = clamped progress, and the crease variable. The unfold uses the ease named by the ease prop (parsed, falling back to power3.out); the fold-back uses power2.in.
- foldStyle "paper" rotates only around the hinge origin. foldStyle "flip" switches the origin to 50% 50%, makes backfaces visible, forces the angle to 180 degrees, and adds a rise of translateZ(0.45em × sin(π × progress)) so the glyph lifts as it turns over. foldStyle "blinds" opens its two slats sequentially — slat 2 lags slat 1 by 0.24 of the cycle — rotating around origins 50% 25% / 50% 75% for rotateX or 25% 50% / 75% 50% for rotateY, each slat clipped by an inset rect that keeps only its half (with −40%/−20% overscan so rotation is not clipped); slat 1 keeps its clip and slat 2 stays hidden once fully open, so the resting text is crisp and selectable-looking.
- trigger "mount" plays once immediately; "loop" plays the unfold, then after loopDelay seconds folds the text back over duration × 0.75 and repeats forever with a 0.35s gap between cycles; "hover" renders the folded state and replays the unfold on each mouseenter of the root; "scroll" renders folded and plays once when the block enters the viewport (ScrollTrigger on the root at "top 82%", once).
- hoverRefold adds a cursor re-crease: window pointermove (passive) plus scroll (capture) and a pointerleave on documentElement feed a pointer position; each piece's segment center distance to the pointer over refoldRadius runs through an inverted smoothstep (1 − d²(3 − 2d)) into an aim value. A relaxation loop on the tween engine's ticker eases each tilt toward aim × refoldAngle — rate 14 approaching, 6 releasing, exponential smoothing with dt clamped to 64ms — and removes itself when every piece settles. Centers are re-measured only when the root box changed by more than 1px since the last measure.

## Reduced motion & cleanup

- prefers-reduced-motion: reduce — the stylesheet forces `transform: none !important` on pieces and slats and hides all crease overlays with !important; the engine clamps the unfold to min(duration, 0.22)s with a power1.out ease, stagger to ≤ 0.02s, sets angle, crease and re-crease to 0, and uses power1.in for folds, so text effectively fades into place.
- Unmount removes the mouseenter, pointermove, scroll and pointerleave listeners, detaches the ticker relaxation, kills the ScrollTrigger, kills the timeline and all tweens of the pieces. Instances on one page are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Design unfolds" | The text that folds open. "\n" forces line breaks. |
| splitBy | "char" \| "word" \| "line" | "char" | Unit that folds; characters keep each word unbroken while wrapping. |
| hinge | "top" \| "bottom" \| "left" \| "right" | "top" | Edge the pieces rotate around. |
| foldStyle | "paper" \| "blinds" \| "flip" | "paper" | paper folds around the hinge, blinds opens two half slats in sequence, flip turns a full 180° through a lift. |
| duration | number | 0.65 | Unfold time per piece, in seconds. |
| stagger | number | 0.045 | Delay between consecutive pieces, in seconds. |
| staggerFrom | string | "start" | Which end the stagger starts from (index, "start", "end", "center"...). |
| foldAngle | number | 92 | Starting angle in degrees, clamped 0–180. |
| ease | string | "power3.out" | Ease name for the unfold. |
| perspective | number | 700 | Perspective depth for the 3D rotation in px, floored at 120. |
| creaseShading | number | 0.55 | Strength of the crease shading overlay, 0–1. |
| trigger | "mount" \| "hover" \| "scroll" \| "loop" | "mount" | When the unfold plays. |
| loopDelay | number | 1.4 | Pause between unfold and fold-back in loop mode, in seconds. |
| hoverRefold | boolean | false | Pieces re-crease near the cursor. |
| refoldRadius | number | 140 | Cursor influence radius in px, floored at 1. |
| refoldAngle | number | 45 | Extra crease angle added near the cursor, clamped 0–180. |
| fontSize | number \| string | 80 | Font size in px when a number, otherwise any CSS size. |
| fontWeight | number \| string | 800 | Font weight. |
| color | string | "currentColor" | Text colour; any CSS colour value. |
| className | string | "" | Extra class names for the root span. |
| style | CSSProperties | {} | Inline styles merged after the component's CSS variables. |

## Delivery & validation

- Deliver the complete content of FoldText.jsx and FoldText.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: gsap at ^3.13.0 (core and ScrollTrigger plugin).
- Validate: mount unfolds with staggered pieces whose crease shading fades to flat; every hinge rotates from the correct edge with the shading gradient flipped correctly; blinds opens its two slats in sequence and rests crisp; flip lifts and turns through 180 degrees; loop mode folds back after the delay and repeats without drift or residue; hover replays on each mouseenter; scroll fires once at the viewport line; hoverRefold tilts pieces smoothly toward and away from the cursor without jitter and re-measures after resize; splitBy char / word / line all wrap correctly with whitespace preserved and newlines as breaks; changing text, hinge, style or timing props replays cleanly; fontSize accepts numbers and CSS strings; reduced motion shows a near-instant fade with no rotation; unmount leaves no listeners, ticker, ScrollTrigger or tweens; multiple instances on one page are independent; 375 / 768 / 1440 wide without overflow.
