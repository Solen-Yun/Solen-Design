Implement the "SplitText" component from zero: a single block of text split into characters, words or lines that animate in with a staggered entrance — seven preset effects (rise, fade, blur, flip, pop, skew, wave) or fully custom from/to tween variables — triggered by scrolling into view, page load, hover or click, optionally looping out and back in, with an accent colour that washes over the letters and two pointer-played hover effects (lift, wave). Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- One React file, SplitText.jsx (no stylesheet). React >= 18. Dependencies: gsap at ^3.13.0 (core, ScrollTrigger, SplitText plugins) and @gsap/react at ^2.1.2 (useGSAP hook).
- Root is the element named by the tag prop (default "p") with class `split-parent` plus className, keyed by text so a text change rebuilds everything. Inline styles: textAlign, display inline-block, whiteSpace normal, wordWrap break-word, color, and visibility hidden until the split is ready. overflow becomes hidden only when the effect needs clipping (rise / fade / custom from-to with hoverEffect "none"); otherwise visible. cursor becomes pointer for trigger "click".
- Splitting uses the animation library's SplitText utility: type = splitType ("chars" | "words" | "lines"; the string is matched with includes so combos work), smartWrap on, autoSplit for lines (re-splits on resize), reduceWhiteSpace false, wrapper classes split-char / split-word / split-line. When mask is true the chosen unit is wrapped in clipping masks and those masks become the animated nodes, so each letter rises from behind its own clip. The animated list prefers chars → words → lines by the requested unit.
- Fonts: the component waits for document.fonts.ready (or an already-loaded status) before splitting, and re-checks after layout; if fonts resolve later the split re-runs. Animation values are computed from the element's computed font-size (em) so blur radius, offsets and lift scale with the text.

## Entrance effects

- Presets (from → to, with ease): rise (default) opacity 0 / y 40em-adjusted → opacity 1 / y 0, power3.out, clipped by overflow hidden; fade opacity only, power2.inOut; blur blur(em × 1.4 / 10 px) → blur(0), power2.out; flip rotationX −90 → 0 around 50% 100% with perspective em × 6, power3.out; pop scale 0 → 1 with back.out(1.6); skew x −em × 0.4 and skewX −24 → 0 around 50% 100%, expo.out; wave y em × 0.45 → 0 with a custom ease (1 − cos(t × 1.5π) × (1 − t)^1.2) that overshoots gently. Passing from and/or to replaces the preset's tween variables (defaults: opacity 0 / y 40 → opacity 1 / y 0) with ease power3.out unless the ease prop overrides.
- Timing: each unit's tween runs over duration seconds (default 1.25) with a stagger built from gsap.utils.distribute({ each: delay/1000, from: staggerFrom }) — delay in ms (default 50), staggerFrom any distribute value ("start", "end", "center", index...). willChange is set during motion and cleared at the end (plus the accent colour when used).
- Accent colour: with accentColor set, a second tween starts at 30% of the duration, washing each piece from accentColor to the computed text colour over 70% of the duration with power1.inOut, and washes back to accentColor during conceal.
- Triggers: "view" (default) arms a ScrollTrigger on the element at start `top ${(1 − threshold) × 100}%` plus the rootMargin offset (parsed as number + px/em/rem/%, appended as += or -=), once, fastScrollEnd, anticipatePin 0.4; "load" plays immediately; "hover" and "click" arm the same viewport reveal and additionally replay a full conceal → reveal cycle on pointerenter / click after the text has revealed.
- Loop: after the reveal completes and loop is true, a delayed call waits loopDelay seconds (default 1.5) then plays a cycle — conceal (reverse of the current from/to over exit = max(0.35, duration × 0.55) seconds, power2.in, staggered) followed by the reveal again. Interrupting props kill and re-arm cleanly; onLetterAnimationComplete fires once per completed reveal for a given text.

## Pointer hover effects

- "lift": while hovered after reveal, each piece integrates a spring (stiffness 180, damping 19) toward a Gaussian lift around the pointer — height em × 0.2 × exp(−(dx² + dy²) × 0.5) with dx normalized by radius em × 1.15 and dy by radius × 1.4 — written as the CSS translate property in a self-sleeping raf loop (stops when all springs settle within 0.02px / 0.05 velocity).
- "wave": on pointerenter a velocity kick starts at the pointer's x and travels outward — each piece's kick is delayed by |piece.x − pointer.x| / (em × 9) seconds with velocity em × 0.16 / 0.024, then the same springs pull the letters down and back.
- Piece centers are measured on demand (and invalidated on re-split); "none" (default) keeps hover inert.

## Reduced motion & cleanup

- prefers-reduced-motion: reduce — no split animation runs; the text shows immediately in its final state and onLetterAnimationComplete fires.
- Unmount cancels the raf, kills the queued loop call and any running timeline, removes pointerenter / pointermove / pointerleave / click listeners, clears the translate property on animated nodes, kills only the ScrollTriggers whose trigger is this element, and reverts the split (restoring the original DOM). Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | - (required) | The text to split and animate. |
| className | string | "" | Extra class names for the root element. |
| delay | number | 50 | Stagger between pieces in ms. |
| duration | number | 1.25 | Per-piece tween duration in seconds. |
| ease | string | - | Ease name; overrides the preset's ease (custom from/to defaults to power3.out). |
| splitType | "chars" \| "words" \| "lines" | "chars" | Unit to split into; combo strings match by includes. |
| from | object | - | Custom tween start variables; replaces the preset's from. |
| to | object | - | Custom tween end variables; replaces the preset's to. |
| threshold | number | 0.1 | 0–1; how far the element must sit above the viewport bottom (start = top (1 − threshold) × 100%). |
| rootMargin | string | "-100px" | Extra margin appended to the trigger start, e.g. "-100px", "10%". |
| textAlign | string | "center" | Text alignment of the block. |
| tag | string | "p" | Element to render. |
| staggerFrom | string \| number | "start" | Which end the stagger starts from (distribute value). |
| mask | boolean | false | Wrap each unit in a clip mask; pieces rise out of their own clip. |
| effect | "rise" \| "fade" \| "blur" \| "flip" \| "pop" \| "skew" \| "wave" | "rise" | Entrance preset. |
| trigger | "view" \| "load" \| "hover" \| "click" | "view" | view/load reveal once; hover/click reveal via viewport then replay on interaction. |
| loop | boolean | false | Conceals and re-reveals forever after the first reveal. |
| loopDelay | number | 1.5 | Pause between loop cycles in seconds. |
| hoverEffect | "none" \| "lift" \| "wave" | "none" | Pointer-played effect after reveal. |
| color | string | - | Text colour of the block. |
| accentColor | string | - | Colour the letters wash from during reveal and back to during conceal. |
| onLetterAnimationComplete | () => void | - | Fires once per completed reveal for a given text. |

## Delivery & validation

- Deliver the complete content of SplitText.jsx plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders. Dependencies: gsap at ^3.13.0 (core, ScrollTrigger, SplitText) and @gsap/react at ^2.1.2.
- Validate: view trigger fires at the configured threshold with and without rootMargin; all seven presets animate correctly and clip only where needed; custom from/to override presets and respect the ease prop; chars / words / lines all split and stagger in the requested order from start / end / center; mask mode rises each piece out of its own clip; hover and click replay conceal → reveal after the first reveal; loop cycles forever with the configured delay and stops when loop turns off; accentColor washes in and out; lift follows the pointer smoothly with a Gaussian falloff and springs back; wave travels outward from the pointer's x; changing text re-splits and re-runs; late-loading fonts trigger a re-split; reduced motion shows the final state instantly; unmount leaves no raf, timelines, ScrollTriggers, listeners or split wrappers; multiple instances are independent; long text wraps at 375 / 768 / 1440 wide without overflow.
