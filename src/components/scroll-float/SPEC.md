Implement the "ScrollFloat" component from zero: a block of text whose characters or words are stranded below (or above) the line and float back into place as the block scrolls through the viewport — a stretchy baseline rise, a bobbing wave, a 3D flip, a scattered drift or a blur pull-in — with stagger orders from any end, seeded randomness, and an optional colour shift that resolves to the natural text colour. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- Pure React + CSS, two files only: ScrollFloat.jsx (entry, splitting, scroll engine) and ScrollFloat.css (all styles). React >= 18; the animation library gsap at ^3.13.0 (core + ScrollTrigger plugin, registered once at module level) drives the scroll linkage. No iframe.
- Root is an `<h2>` (class scroll-float, plus scroll-float--open when the effect is not "float", plus containerClassName; CSS margin 20px 0). "float" keeps overflow hidden so glyphs rise out of a clipped box; the other effects open overflow (visible with overflow-x clip) since they move pieces beyond the box. Inline styles: color via a CSS-variable mix when fromColor is set (see below), merged from nothing else.
- Inner visible span (class scroll-float-text plus textClassName): display inline-block, font-size clamp(1.6rem, 8vw, 10rem), font-weight 900, text-align center, line-height 1.5. Words split on whitespace with separators kept, each word an inline-block nowrap `.scroll-float-word` holding per-character `.scroll-float-char` spans (both inline-block). Plain text only: non-string children render untouched with no split and no aria override.
- Accessibility: when the text is split, a visually hidden span (1px clip pattern, class scroll-float-sr) carries the plain text and the visible span is aria-hidden.
- Scroller: scrollContainerRef points at a custom scroller element (used only when its .current exists); otherwise the window.

## Scroll engine

- One gsap.matchMedia context gated to (prefers-reduced-motion: no-preference) builds a single scrubbed timeline: trigger = the root element, start scrollStart (default "center bottom+=50%"), end scrollEnd (default "bottom bottom-=40%"; bare position strings are wrapped in clamp() so short blocks never overshoot), scrub = smoothing number when smoothing > 0 else raw true, invalidateOnRefresh on.
- One tween per concern, all laid on the timeline at position 0 over animationDuration seconds (default 1) with a function stagger — each piece's delay comes from a precomputed delays array built from order × stagger: "start" (index order), "end" (reversed), "center" (distance from the middle), "edges" (inverse of center), "random" (a seeded shuffle). distance (default 120px) scales reach = distance/120; direction "down" flips the sign of every offset.
- Effects (from → to, ease = the ease prop, default "back.inOut(2)"):
  - float (default): yPercent 120 × reach × sign, scaleY stretch (default 2.3), scaleX = stretch^−0.43, transformOrigin 50% 0% when rising up / 50% 100% when coming down, opacity 0 → identity — glyphs grow out of the baseline like stretched taffy and settle.
  - wave: the same rise but the y ease is 1 − cos(t × 2.5π) × (1 − t)^2.6 (a bobbing swell that overshoots both ways), plus a rotation tween of ±16° × sign on a sine sway ease and a faster opacity ramp.
  - flip: rotationX −90° × sign → 0 with perspective = font-size × 4 (refresh-time function), transform-origin z = −0.55 × font-size × reach, backface hidden; opacity smoothstepped across 0.05–0.55 of the ease.
  - scatter: seeded pseudo-random per index (a sine-hash, stable across renders) — x swings ±1.3 cells with the outermost pieces pulled up to 0.9 cells toward the centre, y = (0.35 + rand) × 1.1 cells away from the line × sign, rotation ±(40–160°), scale 0.35–1.25 — all settling to identity; opacity smoothstepped over the first 40%.
  - blur: blur(0.2 × font-size px), scale 1.45, slight y offset × sign → all identity.
- Colour shift: when fromColor is set (not "currentColor"), every piece gets color: color-mix(in oklab, fromColor calc(var(--scroll-float-mix) × 100%), currentColor) and the engine animates the custom property --scroll-float-mix 1 → 0 over the second half of the progress (smoothstepped), so the text resolves from the given colour to its natural colour; for non-split children the style sits on the text span instead.
- willChange "opacity, transform" (plus filter for blur) is set on all pieces up front and reverted with the matchMedia context; reduced motion renders the plain static text; unmount kills the triggers and reverts everything. Same-page instances are independent; 375 / 768 / 1440 widths reflow naturally.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - (required) | The text to float; plain strings/numbers are split, anything else renders as-is. |
| scrollContainerRef | RefObject<HTMLElement> | - | Element ref of a custom scroll container; defaults to the window. |
| containerClassName | string | "" | Extra class names for the heading element. |
| textClassName | string | "" | Extra class names for the inner text span. |
| effect | "float" \| "wave" \| "flip" \| "scatter" \| "blur" | "float" | How pieces return to the line. |
| splitBy | "chars" \| "words" | "chars" | Animation unit. |
| direction | "up" \| "down" | "up" | Which side pieces come from. |
| order | "start" \| "end" \| "center" \| "edges" \| "random" | "start" | Stagger order across pieces. |
| fromColor | string | "currentColor" | Colour the text resolves from; "currentColor" disables the shift. |
| animationDuration | number | 1 | Seconds each piece's tween takes. |
| ease | string | "back.inOut(2)" | Tween ease of each piece. |
| scrollStart | string | "center bottom+=50%" | ScrollTrigger start position. |
| scrollEnd | string | "bottom bottom-=40%" | ScrollTrigger end position. |
| stagger | number | 0.03 | Delay between neighbouring pieces (scaled by order). |
| distance | number | 120 | px scale of how far pieces sit from the line. |
| stretch | number | 2.3 | Vertical squash of pieces at the start (float/wave). |
| smoothing | number | 0 | Above 0, scrubs with a smoothed catch-up instead of raw 1:1. |

## Delivery & validation

- Deliver the complete content of ScrollFloat.jsx and ScrollFloat.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the scrub tracks scroll both directions and lands exactly on the final styles at the end position; all five effects settle to the identical natural text; float clips inside the box and the others do not clip stray glyphs; direction down mirrors everything; orders start/end/center/edges/random stagger as described (random is stable across renders); distance, stretch and stagger visibly do what they claim; wave bobs with the documented overshoot; flip hides backfaces mid-turn; scatter lands each character in its original spot; fromColor resolves to the natural colour in the last half; smoothing catches up softly; custom scroller refs drive the whole thing; mixed children never split; reduced motion shows static text with no inline animation styles; unmount leaves no triggers or inline styles; 375 / 768 / 1440 wide without overflow.
