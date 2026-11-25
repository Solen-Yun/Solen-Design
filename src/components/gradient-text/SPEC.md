Implement the "GradientText" component from zero: a headline whose fill is a living gradient clipped to the glyphs — a sliding linear sweep, a drifting mesh of radial colour blobs, or a swinging conic fan — with optional pointer following, hover pausing, a matching gradient border pill and a soft glow behind the text. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: GradientText.jsx (gradient painting loop) and GradientText.css (clipping, border, glow). React >= 18; no runtime dependencies. No iframe.
- Root is an inline-flex `<span class="gradient-text">`, centred, max-width 100%, isolation isolate. showBorder adds the gradient-text--border modifier: padding 0.35em 0.75em, 999px radius, and a ::before ring — absolutely inset, padded by var(--gt-border) px, rounded inherit, filled with var(--gt-gradient) and masked down to the border band only (two linear-gradient masks composited with xor / exclude), pointer-events none.
- Inside is `.gradient-text__inner` (relative inline-block) holding `.gradient-text__content` — the children in an inline-block span with background-image var(--gt-gradient), background-clip text and transparent text fill. When glow > 0 the children are duplicated into an aria-hidden `.gradient-text__glow` layer: absolutely inset, z-index −1, same gradient clipped to the text, filter blur(0.3em) saturate(1.4), opacity var(--gt-glow) clamped 0–1.
- The component paints one CSS custom property, --gt-gradient, from a requestAnimationFrame loop (SSR/first paint: a static linear-gradient of the looped palette at the resolved angle). animationSpeed is seconds per cycle, floored at 0.2. angle is degrees; the direction prop ("horizontal" | "vertical" | "diagonal") overrides it with 90 / 180 / 135. scale is clamped 1–6. Fewer than two colours duplicates the single colour; the palette is always cycled to [...colors, colors[0]].

## Gradient variants

- "linear": a repeating-linear-gradient at the angle; stop period is 100 × scale percent of the gradient line, offset slides each cycle. yoyo swings the offset with a half-cosine over each two-cycle span (0 → period−100 → 0); otherwise it wraps continuously. The pointer shifts the offset by (px − 0.5) × period × 0.5 × pull.
- "flow": one radial-gradient blob per colour — ellipse (22 + 12 × scale)% × (60 + 30 × scale)% centred on an orbiting point: x = 50 + 44 sin(cycle × rate + i × 2.1), y = 50 + 40 sin(cycle × rate × 0.83 + 0.21 + i × 1.3), where rate = 0.55 + golden-ratio(i) × 0.5, each in its own colour, over a linear-gradient base at the angle. The first blob is pulled toward the pointer by pull.
- "conic": a repeating-conic-gradient whose start angle sways — yoyo: sin(cycle × π) × 50 degrees, otherwise full 360-degree rotations — minus 30 degrees, centred at (50%, 260%) unless pulled toward the pointer; consecutive colour stops span 60 × (3/scale) degrees each, giving a fan of the palette around the centre.
- Pointer interaction: when followPointer is on and the pointer is inside, pull eases toward 1 (exponential, rate 6/s) and the pointer position drives the blob/center/offset; otherwise pull eases back to 0. The pointer itself is spring-smoothed (stiffness 160, critically damped) so the gradient lags the cursor gently.
- pauseOnHover freezes the cycle time while hovered (the painted frame stays). prefers-reduced-motion freezes the cycle time entirely, so the gradient holds its initial frame; cleanup on unmount cancels the raf, disconnects the IntersectionObserver and removes pointer listeners.

## Performance

- The raf loop self-sleeps: it keeps running only while the gradient is animating, the pointer pull or spring is still settling, or the root is hovered; IntersectionObserver stops the loop while the element is offscreen and wakes it on return. Every prop change repaints immediately via a settings ref.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The text (or any content) the gradient clips to. |
| colors | string[] | ["#5227FF", "#FF9FFC", "#B497CF"] | Gradient palette, cycled head-to-tail; a single colour duplicates itself. |
| animationSpeed | number | 8 | Seconds per animation cycle, floored at 0.2. |
| variant | "linear" \| "flow" \| "conic" | "linear" | Which living gradient paints the text. |
| angle | number | 90 | Base gradient angle in degrees. |
| direction | "horizontal" \| "vertical" \| "diagonal" | - | Shorthand that overrides angle with 90 / 180 / 135. |
| scale | number | 3 | Gradient pattern scale 1–6; larger spreads the colours wider. |
| yoyo | boolean | true | Swing back and forth instead of wrapping. |
| glow | number | 0 | Soft blurred glow behind the text, 0–1. |
| showBorder | boolean | false | Wraps in a pill with the same gradient as its border. |
| borderWidth | number | 1.5 | Border thickness in px. |
| pauseOnHover | boolean | false | Freezes the animation while hovered. |
| followPointer | boolean | false | Gradient blobs / centre / offset drift toward the pointer. |
| className | string | "" | Extra class names for the root span. |
| style | CSSProperties | - | Inline styles for the root span. |

## Delivery & validation

- Deliver the complete content of GradientText.jsx and GradientText.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all three variants animate — linear slides (yoyo swings back, non-yoyo wraps), flow blobs orbit independently with the base gradient underneath, conic fans sway around the centre; the gradient always sits exactly inside the glyphs and never leaks to the box; glow renders a soft halo only behind glyphs and only for glow > 0; the border pill ring follows the animated gradient and stays a hairline at 1.5px; followPointer pulls the pattern to the cursor and releases it on leave; pauseOnHover freezes the cycle; scale changes stripe density, angle/direction change orientation; a single colour still renders; reduced motion holds a static gradient; the loop sleeps when offscreen and after settling; unmount leaves no raf, observer or listeners; long text wraps within max-width without overflow at 375 / 768 / 1440 wide.
