Implement the "GlitchText" component from zero: a display headline that intermittently tears itself apart — horizontal slice bands slide out of register with colour shadows, full-frame RGB channel ghosts split left and right, a scanline sweeps the text with a trailing band, or individual characters flicker into wrong glyphs — all driven by one clock with controllable intensity, speed, skew and flicker, settling to clean text whenever the effect is idle. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: GlitchText.jsx (entry, event model, frame loop) and GlitchText.css (all styles). React >= 18; no runtime dependencies. No iframe. File starts with a `'use client'` directive.
- Root is a `<div>` (class glitch plus glitch--<mode> plus className): position relative, margin 0 auto, white-space nowrap, user-select none, cursor pointer, default font-size clamp(2rem, 10vw, 8rem) and font-weight 900 from CSS. Inline styles: color, fontSize (a number becomes px), fontWeight, and two custom properties --glitch-color-a / --glitch-color-b set to the shadow colours when shadows are enabled, otherwise currentColor.
- Three text layers paint the same children: the base span (class glitch__text, display block) whose opacity and skewX come from custom properties; plus two absolutely positioned duplicates (class glitch__slice, aria-hidden, pointer-events none) labelled a and b, each clipped by a horizontal band, translated by its own offset, skewed, and carrying a horizontal colour text-shadow.
- CSS variables drive everything from the rAF loop, with a written-value cache so unchanged properties never touch the DOM: --glitch-a-top / --glitch-a-bottom / --glitch-b-top / --glitch-b-bottom (band insets in %), --glitch-a-x/y and --glitch-b-x/y (px offsets), --glitch-a-shadow / --glitch-b-shadow, --glitch-skew (deg), --glitch-alpha, --glitch-split. The base span is masked by the intersection of two band masks (mask-composite intersect) so the base itself tears too; slice a clips with clip-path inset, slice b additionally masks with band a's mask.
- Four modes: "slices" (default), "rgb", "scan" and "noise"; unknown modes fall back to slices.

## Modes & event model

- A loop steps every ~70 × sqrt(max(0.05, speed) / 0.5) ms (± random 0.7–1.3). Per step it regenerates jitter multipliers and, with probability power² × 0.35, spawns a glitch event lasting one or more steps. power = max(intensity clamped 0–1, burst floor); the offset scale is 0.4 + 1.2 × power.
- Slices mode: band a ping-pongs vertically through a 21-stop band table (top/height pairs from 20/50% to 40/20%) with a period of 3 × pace seconds, band b through the same table over 2 × pace; base offsets are ±offset × scale. A live event replaces the bands with random windows (a: top 0–80%, height 5–27%; b: top 0–85%, height 3–17%) and throws them ±offset × scale × 1.3–2.8 horizontally with small y drift and a ±0.4–1.0 skew factor; event bands cut straight in and hold until the event expires.
- RGB mode: the base span unmasks and the two slices become full-frame tinted ghosts (colour from --glitch-color-a/b, no clip, no shadow), their opacity multiplied by --glitch-split — 0.9 with shadows on, 0.4 without. The split spread is offset × (0.22 + 0.45 × power) with per-step jitter on x (0.6–1.4) and tiny y wobble; events snap to stronger absolute offsets.
- Scan mode: a scanline band (height 9% + 9% × power) sweeps top-to-bottom and back with a pass time of 2.4 × pace seconds, the cycle stretching at low power and alternating direction every cycle; its x offset is ±offset × scale × 1.5 in the travel direction with a fast sine wobble layered on top, and a thin trail band (0.35 of the height) rides 1.5 heights behind at half the offset. Events teleport band b and amplify its offset ×1.4.
- Noise mode: string children split into per-character spans; the slice layers hide. Characters randomly swap to glyphs from "#%&@$?<>/\\=+*~^!" — the original hides and a ::after overlay paints the glyph centred in the character box, coloured by shadow colour (alternating a/b per index) or currentColor. Per step each character swaps with chance 0.01 + 0.16 × power² (or 35% if already swapped), swaps expire after 1–3 step lengths, and each fresh event forces a 2–4 character consecutive run.
- Shadows: when enabled (and outside RGB mode), each slice carries a horizontal text-shadow at half its own offset in the corresponding shadow colour — the classic red/cyan ghosting; the shadow colours also feed the RGB mode tints.
- Skew: the skew prop (degrees) only applies during live events, scaled by the event's skew factor.
- Flicker: per step, with chance 0.04 + 0.16 × power, the whole stack's alpha dips to 0.45–0.8 for that step.

## Triggers & lifecycle

- trigger "always" runs continuously; "hover" activates on pointerenter and settles on pointerleave; "click" rests clean and each click fires a burst lasting max(0.1, burstDuration) seconds with power held at a decaying floor (starting full, easing to 0.45 of it) plus a forced event. enableOnHover true maps to "hover" for convenience.
- The frame loop only runs while the trigger is satisfied (or a burst is live), the tab shows the element (IntersectionObserver) and motion is not reduced; otherwise every variable resets to neutral — bands full, offsets zero, shadows none, skew zero, alpha 1, glyphs cleared. Reduced motion therefore renders clean static text.
- Unmount: the frame cancels, the observer disconnects, listeners remove and the variables reset. Same-page instances are fully independent.

## Accessibility

- The two slice layers are always aria-hidden. In noise mode the character spans hide from assistive tech and a visually hidden span carries the original children; in other modes the base text remains the accessible content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The text to glitch. Noise mode requires a plain string. |
| speed | number | 0.5 | How fast the effect steps and cycles, 0.05–1+. |
| enableShadows | boolean | true | Colour shadows behind the torn slices (and tinted RGB ghosts). |
| enableOnHover | boolean | false | Convenience switch that maps the trigger to hover. |
| offset | number | 10 | Slice displacement in px at full power. |
| shadowColors | [string, string] | ["#ff0000", "#00ffff"] | The two ghost colours for shadows and RGB slices. |
| className | string | "" | Extra class names for the root. |
| mode | "slices" \| "rgb" \| "scan" \| "noise" | "slices" | Which glitch pattern runs. |
| intensity | number | 0.5 | Base event frequency and displacement, 0–1. |
| skew | number | 0 | Horizontal skew in degrees applied during glitch events. |
| flicker | boolean | false | Random alpha dips during activity. |
| trigger | "always" \| "hover" \| "click" | "always" | When the glitch runs. |
| burstDuration | number | 0.6 | Length of each click burst in seconds. |
| color | string | - | Ink colour of the text. |
| fontSize | number \| string | - | Font size; a number becomes px. |
| fontWeight | number \| string | - | Font weight. |

## Delivery & validation

- Deliver the complete content of GlitchText.jsx and GlitchText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all four modes render and settle to clean text when idle; slice bands ping-pong and events throw them harder; RGB ghosts split around the base with the right tints and opacity; the scanline sweeps both directions with its trail; noise swaps characters to glyphs and restores them, including forced runs; intensity and speed change the rhythm; offset scales displacement; skew applies only during events; flicker dips alpha; shadow colours feed shadows and RGB tints, and disabling shadows falls back to currentColor; trigger hover starts/stops on enter/leave, click bursts on demand for burstDuration; prefers-reduced-motion renders static clean text; the effect pauses off-screen and writes no redundant styles at rest; unmount leaves no loop, observer or listeners; same-page instances are independent; no horizontal overflow at 375 / 768 / 1440 wide.
