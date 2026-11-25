Implement the "ClickSpark" component from zero: a container whose every click bursts a radial firework of sparks from the cursor — short glowing dashes, comet streaks, dots or four-point stars that fly out, fade and drop — with the burst canvas sized tightly around each explosion so sparks can spill outside buttons and cards nested inside. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+, Canvas 2D only, one file: ClickSpark.jsx. No stylesheet, no runtime dependency, no iframe. The component is a forwardRef wrapper exposing an imperative spark(x, y) handle.
- Root is a `<div>` with position relative, width 100%, height 100%, isolation isolate, plus className and the caller's style. It renders the children first, then an aria-hidden spark layer `<span>` absolutely filling the root (inset 0, pointer-events none, overflow visible); layer "front" sits at zIndex 1 above the content, "back" at −1 below it.
- Every click paints into its own dedicated canvas appended to the spark layer: absolutely positioned at the burst's bounding box, sized in device pixels (DPR clamped to 2), display block, pointer-events none, aria-hidden. The box is computed from the reach — radius × (1 + 0.35 × randomness) × (1.15 when the spring easing is active) + size × (1 + 0.4 × randomness) + width × (6 with glow, else 2) + 6 px — extended downward by the gravity fall of the longest possible spark life, clamped to the window, and skipped when empty.
- Settings are rebuilt into a ref on every render, so bursts always read the live props: colors from sparkColor (a string or an array; empty falls back to #ffffff), size ≥ 0, radius ≥ 0 multiplied by extraScale ≥ 0, count clamped 1–64, width floored at 0.5 px, duration floored at 60ms, easing looked up among linear / ease-in / ease-out / ease-in-out / spring (unknown falls back to ease-out), shape whitelisted to line / streak / dot / star, randomness clamped 0–1, gravity ≥ 0, spread clamped 0–360, glow clamped 0–1, plus direction, ring, layer and disabled.
- Spark colours are parsed through the canvas fillStyle normalizer into rgb triplets, used for gradient stops and for the glow strength (0.35 + 0.65 × luminance).

## Input model

- pointerdown with a mouse and the left button spawns a burst immediately at the cursor; the position is remembered so the click handler can dedupe. click then covers everything else: mouse clicks are ignored (already handled), keyboard activation (detail 0) spawns at the centre of the event target element, and touch/pen clicks spawn unless a pointerdown happened within 700ms and 12px (no double bursts).
- disabled switches spawning off entirely. The imperative ref handle spark(x, y) spawns at root-local coordinates, defaulting to the root centre — useful for programmatic celebrations.
- Up to 32 concurrent bursts are kept; spawning more drops the oldest canvas.

## Burst & spark drawing

- Each burst spawns count sparks arranged across the spread arc centred on the direction heading (0° = up; 360° = a full circle with even angular steps), each spark jittered per randomness: angle ±0.9 steps, reach ±0.7, scale ±0.8, life ±0.5, spin ±0.5. Colours cycle through the palette from a random offset so adjacent sparks differ.
- Per-frame each spark draws at its eased distance = radius × reach × ease(progress): line draws a round-cap stroke from the current position to position + length, the length shrinking with (1 − p)^1.6; streak draws a comet — a tapered linear-gradient polygon from a lagging tail position to the head plus a head dot, the tail lagging by 70ms + size × 4 × scale; dot draws a circle of radius width × 1.25 × (1 − 0.5 × ease); star draws a 4-point star whose radius twinkles with sin(π × p)^0.7 and rotates by spin × p × 90°, built from quadratic curves pinched to 16% of the radius.
- Alpha fades with 1 − smoothstep(0.55 for lines, 0.7 otherwise → 1, progress). glow > 0 adds a soft halo under every spark: a wide low-alpha stroke or blob at 0.14–0.2 alpha scaled by the colour luminance.
- gravity > 0 pulls every spark down with 0.5 × gravity × 500 px/s² × seconds². ring draws an expanding stroked circle at the click point — radius 2 + 0.6 × radius × ease-out progress, alpha (1 − p)² × 0.7, line width shrinking, living 0.8 × duration.
- prefers-reduced-motion: reduce — sparks keep a fixed 320ms life, eased to a constant 0.55 progress, no gravity, lines shortened to half, linear alpha fade, no streak tail lag, ring radius 0.6 ×.
- Frame loop: one requestAnimationFrame per root runs while any burst is alive, fully clearing and redrawing each burst's canvas each frame (device-pixel transform), removing dead bursts, then stopping. Unmount cancels the frame, removes both listeners and every burst canvas.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sparkColor | string \| string[] | "#fff" | Spark colour or a palette cycled across sparks. |
| sparkSize | number | 14 | Line and star size in px. |
| sparkRadius | number | 30 | How far sparks travel, in px. |
| sparkCount | number | 8 | Sparks per burst, clamped 1–64. |
| sparkWidth | number | 2 | Stroke width in px, floored at 0.5. |
| duration | number | 500 | Burst lifetime in ms, floored at 60. |
| easing | "linear" \| "ease-in" \| "ease-out" \| "ease-in-out" \| "spring" | "ease-out" | Travel easing; spring overshoots slightly. |
| extraScale | number | 1 | Multiplier on the travel radius. |
| shape | "line" \| "streak" \| "dot" \| "star" | "line" | Spark glyph. |
| randomness | number | 0.2 | 0–1 jitter of angle, reach, size and life. |
| gravity | number | 0 | Downward pull; 500 × value px/s². |
| spread | number | 360 | Burst arc in degrees. |
| direction | number | 0 | Arc centre in degrees, 0 pointing up. |
| glow | number | 0 | 0–1 soft halo under every spark. |
| ring | boolean | false | Expanding ring drawn at the click point. |
| layer | "front" \| "back" | "front" | Whether sparks paint above or below the children. |
| disabled | boolean | false | Turns all spawning off. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |
| children | ReactNode | - | Content the sparks spill around. |
| ref | { spark(x?, y?) } | - | Programmatic burst at root-local coordinates; defaults to the centre. |

## Delivery & validation

- Deliver the complete content of ClickSpark.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: every mouse click bursts at the cursor and rapid clicks keep independent bursts up to 32; sparks spill outside nested buttons and cards without clipping; shape line / streak / dot / star all render and fade; a palette cycles colours across one burst; spring easing overshoots and randomness visibly varies reach, size and life; gravity drops the burst downward and the canvas covers the fall; spread and direction aim partial arcs correctly; ring draws a fading circle at the click point; glow adds a soft halo scaled by colour luminance; layer back paints sparks under the content; disabled silences spawning while the imperative spark() still fires; keyboard activation bursts at the target centre and touch does not double-burst; reduced motion shortens bursts and drops gravity; unmount leaves no frame loop, listeners or canvases; 375 / 768 / 1440 wide without overflow.
