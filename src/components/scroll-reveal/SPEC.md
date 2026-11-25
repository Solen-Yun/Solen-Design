Implement the "ScrollReveal" component from zero: a block of text whose words, characters or lines gently unblur, rise, flip or scale into focus as it scrolls through the viewport — progress scrubbed to the scroll position (with optional smoothing) or played once on entry — plus a whole-block rotation that straightens with scroll and a passing colour highlight. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- Pure React + CSS, two files only: ScrollReveal.jsx (entry, splitting, scroll engine) and ScrollReveal.css (all styles). React >= 18; the animation library gsap at ^3.13.0 (core + ScrollTrigger plugin, registered once at module level) drives the scroll linkage. No iframe.
- Root is an `<h2>` (class scroll-reveal plus containerClassName; CSS margin 20px 0) carrying aria-label = the joined text when the children are plain strings/numbers; the inner visible span (class scroll-reveal-text plus textClassName, aria-hidden in that case) is display block, font-size clamp(1.6rem, 4vw, 3rem), line-height 1.5, font-weight 600. Non-string children (links, spans, mixed nodes) render untouched inside the span with no splitting and no aria override.
- Splitting (plain text only): the text splits on whitespace with the separators kept, each word wrapped in an inline-block `.scroll-reveal-word` span; pieces are one per word, or one per character inside the word when splitBy is "chars". "lines" keeps the word wrappers as pieces but re-ranks them into visual lines by offsetTop (a 2px tolerance groups them; a ResizeObserver re-measures on resize) so the stagger follows line order. A first-effect flip sets willChange per piece ("opacity" for a plain fade without offset, "opacity, transform" otherwise, none beyond 80 pieces) and, for the masked rise, clips each word wrapper with clip-path inset(-1em -1em -0.15em -1em) so glyphs slide up out of their own line box.
- Scroller: scrollContainerRef points at a custom scroller element (used only when its .current exists); otherwise the window is the scroller. Viewport height reads from the scroller's clientHeight when it is an element, else window.innerHeight.

## Progress engine

- One ScrollTrigger per behaviour, created inside a gsap.matchMedia gated to (prefers-reduced-motion: no-preference), so reduced motion leaves the text completely static and cleanup restores the plain DOM.
- The animation state is a single progress number p 0→1. Each piece's local progress t = clamp01((p × total − order × gap) / span) where span is a fixed 0.5, gap = max(0, stagger), and total = span + (count − 1) × gap. A piece re-paints only when t changes.
- Scrub mode (default): p is driven by a scrubbed ScrollTrigger (scrub = smoothing number when smoothing > 0, else raw) with start `top bottom-=20% of min(element height, viewport height)` and end wordAnimationEnd (default "bottom bottom"; position strings are auto-wrapped in clamp() so short blocks never overshoot).
- Enter mode: the trigger computes its start from geometry — the element top minus viewport plus 20% of min(element, viewport) height, clamped below max scroll — and once entered plays a timed gsap tween of p over total() seconds (duration prop scales span; minimum 0.05), re-fired by onRefresh when progress > 0.
- Piece painting by effect, from t: opacity = baseOpacity + (1 − baseOpacity) × fadeIn (snapped to natural styles at t = 1); a translateY lift of baseOffset × (1 − settle) applies to every effect; blur (enableBlur) fades blurStrength px to 0 with settle.
  - fade (default): no motion, opacity only.
  - rise: cubic ease-out reveal; masked (words wrapped) pieces translateY from 100% + 0.2em, unmasked a plain 0.8em rise; fade-in slightly outruns the reveal.
  - flip: back-ease overshoot 1.2, perspective(6em) rotateX 90°→0 around 50% 100% (bottom hinge), fade-in at twice the speed.
  - scale: back-ease overshoot 1.6, scale 0.35→1, fade-in at 1.6×.
  - highlightColor: a glow envelope rises to full at t = 0.35 and decays to 0 at t = 1 (smoothstep both ways); the piece's colour mixes highlightColor over currentColor via color-mix by the envelope, and fade-in is accelerated to cover the glow window.
- baseRotation (default 3): the container starts rotated baseRotation degrees (transform-origin 0% 50%) and eases to 0 as it scrolls — scrubbed on its own trigger (start "top bottom", end rotationEnd, same smoothing) in scrub mode, or tweened over min(total, 1.4)s with power3.out when the enter trigger fires.

## Cleanup & robustness

- Teardown (prop changes re-run it through the matchMedia revert): piece inline styles (opacity, transform, transformOrigin, filter, colour, willChange) and word clip-paths are cleared back to stylesheet values, the ResizeObserver disconnects and the ScrollTriggers are killed with the matchMedia context.
- Same-page instances are independent; a scroller ref that resolves later is picked up on re-run; 375 / 768 / 1440 widths re-layout naturally since splitting is plain inline-block flow.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - (required) | The text to reveal; plain strings/numbers are split, anything else renders as-is. |
| scrollContainerRef | RefObject<HTMLElement> | - | Element ref of a custom scroll container; defaults to the window. |
| enableBlur | boolean | true | Lets pieces start blurred and unblur. |
| baseOpacity | number | 0.1 | The opacity every piece starts from. |
| baseRotation | number | 3 | Degrees the whole block starts rotated by (0 turns the rotation off). |
| blurStrength | number | 4 | Starting blur radius in px. |
| baseOffset | number | 0 | px each piece still sits below its resting spot at t = 0. |
| stagger | number | 0.05 | Progress gap between neighbouring pieces. |
| smoothing | number | 0 | Above 0, scrubs with a smoothed catch-up instead of raw 1:1. |
| splitBy | "words" \| "chars" \| "lines" | "words" | Animation unit; lines re-rank word pieces into visual lines. |
| effect | "fade" \| "rise" \| "flip" \| "scale" | "fade" | How each piece settles in. |
| mode | "scrub" \| "enter" | "scrub" | scrub ties progress to scroll; enter plays once when scrolled to. |
| duration | number | 0.8 | Seconds per piece in enter mode (floored at 0.05). |
| highlightColor | string | "" | Colour that washes over each piece mid-reveal and fades out. |
| containerClassName | string | "" | Extra class names for the heading element. |
| textClassName | string | "" | Extra class names for the inner text span. |
| rotationEnd | string | "bottom bottom" | ScrollTrigger end for the rotation in scrub mode. |
| wordAnimationEnd | string | "bottom bottom" | ScrollTrigger end for the piece reveal in scrub mode. |

## Delivery & validation

- Deliver the complete content of ScrollReveal.jsx and ScrollReveal.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: scrub mode tracks scroll both directions with no snapping back past the ends; enter mode plays exactly once (and after refreshes when already past); words / chars / lines all stagger in the requested order and lines survive resizes; all four effects settle to the identical final styles; masked rise clips inside its own line box with no visible pop; highlightColor peaks mid-reveal and returns to the base colour; blur, baseOpacity, baseOffset and stagger each visibly do what they claim; baseRotation straightens with scroll and 0 disables it; smoothing catches up softly; custom scroller refs drive the whole thing; mixed children never split; reduced motion shows static text and leaves no inline styles; unmount leaves no triggers, observers or inline styles; 375 / 768 / 1440 wide without overflow.
