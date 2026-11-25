Implement the "VariableProximity" component from zero: a line of variable-font text where every letter's weight (and any other variable axes) is interpolated continuously with the pointer's distance — letters near the cursor swell from a light resting state to a heavy near state with a chosen falloff curve, can tint, grow and rise on the way, and can hand over to a travelling idle wave when the pointer leaves. Full specification follows; it must not depend on external pages, videos, images, or off-the-shelf effect components; its one external asset is a variable-font stylesheet imported by the stylesheet (the exact default URL is part of the embedded source).

## Structure & rendering

- One component in VariableProximity.jsx plus VariableProximity.css. React >= 18; no runtime dependencies. Forwarded ref; displayName set.
- The stylesheet imports a Roboto Flex variable-font stylesheet (opsz 8–144, wght 100–1000) and sets the root's font-family to 'Roboto Flex', sans-serif; it also ships a visually-hidden `.sr-only` utility. Swap the import for any stylesheet that serves the same variable font.
- Root is a `<span class="… variable-proximity">` (className prepended): display inline, optional fontSize (number → px, string passes through), style merges in, onClick and remaining props spread onto it. Inside, the label is split on spaces into word spans (`data-word`, inline-block, nowrap) separated by non-breaking spaces, and each word contains one inline-block span per letter, each pre-set to fontVariationSettings = fromFontVariationSettings, color = fromColor, transformOrigin '50% 80%', aria-hidden. A trailing `.sr-only` span repeats the label for screen readers; the root span is the accessible name holder.
- Line wrapping: a measure pass temporarily sets the root's white-space to normal, hides any produced breaks and resets letters to the from-state, then records which words start a new line (top greater than the previous word's by more than 2px); those indices get a real `<br>` before them on the next render and the root switches to white-space: nowrap so lines are stable. The pass re-runs when the label, from-settings or fontSize change, when the parent resizes (ResizeObserver with a 1px threshold, raf-throttled) and after fonts load.

## Pointer field

- Pointer position arrives from window mousemove and touchmove (first touch), with an active flag; leaving the document or releasing the touch deactivates. Scroll (capture) and resize re-schedule measurement; a raf-throttled loop runs only while something can change.
- Each letter targets level = falloff(distance(pointer, letter centre), radius) where radius is in px: linear = 1 − d / radius; exponential = (1 − d / radius)²; gaussian = (exp(−2(d / radius)²) − e⁻²) / (1 − e⁻²). Beyond the radius every letter targets 0.
- containerRef (optional): when its element is mounted, the whole field is gated to that element's rect — a pointer outside contributes nothing (the overshoot outside the rect is counted against the radius), so a heading only reacts while the cursor is genuinely over its section.
- Levels chase their targets with ease = smoothing > 0 ? 1 − exp(−dt / (smoothing × 400)) : 1 (smoothing 0 snaps instantly) and snap once within 0.002; when every letter has settled the loop sleeps.
- Writing: each letter's font-variation-settings is interpolated per axis from the parsed from/to strings — 'axis' from + (to − from) × level; at level 0 the exact from string is written. Writes are cached per letter and only reassigned when the string changes.
- Tint: when fromColor or toColor is set, letter colour = color-mix(in oklab, restColor X%, nearColor) with X = (1 − level) × 100 (restColor = fromColor or currentColor, nearColor = toColor or currentColor) — letters slide from the resting colour to the near colour with pressure. Transform: when scale ≠ 1 or lift ≠ 0, letters translate up by lift × level (em) and scale by 1 + (scale − 1) × level around '50% 80%'.

## Idle wave

- idleWave = true (and not under prefers-reduced-motion): after the pointer has been inactive for more than 500ms while the element is visible (IntersectionObserver), a wave takes over — per-letter value = 0.7 × ((1 + cos(phase)) / 2)^2.2 with phase = ((x + 0.6 × y) / span − time / 3.2) × 2π, anchors measured relative to the text's bounding box and re-measured on resize and font load, span = max(220, text width × 0.85). The wave blends in and out over ~600ms (waveMix) and combines with pointer pressure by taking the max, so approaching the text damps the wave smoothly instead of snapping.

## Reduced motion & cleanup

- prefers-reduced-motion: reduce disables the idle wave entirely; the pointer field itself (direct manipulation) still responds.
- Unmount cancels the frame, disconnects the observers, and removes every window/document listener. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "" | The text; split on spaces into words. |
| fromFontVariationSettings | string | "'wght' 400, 'opsz' 9" | Resting variation settings (the far state). |
| toFontVariationSettings | string | "'wght' 1000, 'opsz' 40" | Near-state variation settings the letters interpolate toward. |
| containerRef | RefObject | - | Element whose bounds gate the pointer field. |
| radius | number | 50 | Influence radius around the pointer, in px. |
| falloff | "linear" \| "exponential" \| "gaussian" | "linear" | How strength decays with distance. |
| smoothing | number | 0.2 | Tracking lag 0–1; 0 snaps, higher glides. |
| fromColor | string | - | Resting letter colour; enables tinting together with toColor. |
| toColor | string | - | Near-state letter colour. |
| scale | number | 1 | Extra growth at full strength (1 = none). |
| lift | number | 0 | Rise at full strength, in em. |
| idleWave | boolean | false | Travelling wave while the pointer is away. |
| fontSize | number \| string | - | Font size (number → px); inherits when unset. |
| className | string | "" | Extra class names for the root span. |
| onClick | function | - | Click handler passed through to the root. |
| style | CSSProperties | - | Inline styles for the root span. |

## Delivery & validation

- Deliver the complete content of VariableProximity.jsx and VariableProximity.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: letters swell toward toFontVariationSettings as the pointer approaches and relax with the chosen falloff; the three falloff curves are visibly different; smoothing 0 snaps and higher values glide; from/to strings with several axes all interpolate; tinting mixes fromColor → toColor and scale/lift grow and rise the letters around their baselines; containerRef gates the field to its element; wrapping text finds its line starts and inserts breaks that survive resize; idleWave breathes through the text after 500ms idle, stops when the pointer returns and never runs under reduced motion; the loop sleeps when settled; unmount leaves no listeners, observers or frames; multiple instances are independent; the line renders without overflow at 375 / 768 / 1440 wide.
