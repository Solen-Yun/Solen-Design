Implement the "DotField" component from zero: a full-container field of coloured dots laid out in a grid, hex lattice, phyllotaxis spiral or jittered scatter, tinted by a two-stop Oklab gradient. A circular lens trails the cursor and re-projects every dot through it — magnifying (or pinching, for negative strength), twisting into a swirl, lighting a glow pool under it, and holding the pointer down enlarges the lens further. Twinkle, idle wave sway, an intro that zooms the whole field into focus, and a light-page mode round it out. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: DotField.jsx (entry, dot layout, GL pipeline) and DotField.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.dot-field` (position relative, width 100%, height 100%, overflow hidden; accepts className appended after the base class and style) holding `canvas.dot-field__canvas` (absolute inset 0, block, 100% × 100%, aria-hidden). Extra props are ignored.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference "high-performance". If the context or the program fails, the component silently renders the empty container; shader compile/link errors go to console.error.
- One program. Every dot is its own 4-vertex triangle strip generated from gl_VertexID (corner ±1), drawn with drawArraysInstanced — one instance per dot. The instance attribute aDot packs (x, y, hashA, hashB): position in css px plus two per-dot hashes (sparkle phase and sparkle gating). Blending is premultiplied (ONE, ONE_MINUS_SRC_ALPHA) over a cleared transparent canvas; the fragment outputs vec4(colour·alpha, alpha) and discards alpha < 0.002.
- All derived settings are recomputed on every render into a ref; a dependency-free effect pokes a wake function, so prop changes repaint immediately. dotRadius is clamped 0.25–12, dotSpacing clamped 1–200, and the layout step = radius·2 + spacing.

## Dot layout

- buildDots fills the container plus a margin = lens reach + wave amplitude + 2·step on every side, so the lens can pull dots in from outside the frame. Four patterns: grid — square lattice at step; hex — odd rows offset by step/2, row height step·√3/2; spiral — golden-angle phyllotaxis from the centre (angle ≈ 2.399963 rad, radius spacing·√(index + 0.5) with spacing = step/√π) out to the container diagonal; scatter — grid positions jittered ±0.4·step by an integer hash. Dots outside the padded rect are dropped.
- Hard cap of 120 000 dots: if the padded area would exceed it, the step grows to √(area/120000). The layout key (size|step|pattern|margin) is compared before rebuilding, so the Float32Array is only re-uploaded when something actually changed.
- Colour: each dot's gradient coordinate t = clamp(dot(offset from centre along the gradient direction) / extent + 0.5, 0, 1), extent = |width·dir.x| + |height·dir.y|, direction from gradientAngle in degrees (default 135°, pointing down-right). gradientFrom and gradientTo are parsed (3/6-digit hex and rgb()/rgba(); unparsable input falls back to the built-in defaults), converted sRGB → linear → Oklab, and blended with lightness and chroma magnitude interpolated linearly so hues stay vivid mid-gradient. The glow-lit variant darkens the local tone (L × 0.72, chroma × 1.3) and mixes toward the glow colour by its weight.
- Light mode recolours for white pages: any parsed colour whose Oklab lightness exceeds a hue-dependent ceiling (0.6 + 0.16·smoothstepped warmth, warmth = closeness of hue to 85°) is pushed down to the ceiling with chroma boosted ×(1 + (L − ceiling)·1.6); the glow colour's weight becomes clamp((chroma − 0.02)/0.06, 0, 1) so near-white glow colours barely tint; base opacity gains ×1.3 (capped at 1); the halo term is disabled; sparkle mixes toward a 60%-darkened colour instead of white.

## Lens & vertex deformation

- Lens state: position follows the pointer through a critically damped spring (ω = 18 rad/s, semi-implicit integration with velocity carry-over; it snaps on the first entry so the lens never flies in from a corner). Presence eases toward 1 while the pointer is inside (≈0.18 s) and back to 0 on leave (≈0.4 s). Zoom: while holdToZoom is on and the pointer is down, zoom eases to 1 (≈0.14 s); zoom enlarges the lens radius ×1.12, multiplies the effective strength and twist again ×(1 + 0.6·zoom), and slightly boosts glow radius and intensity.
- Deformation per dot: x = distance/lensRadius; w = (1 − x²)³ is the smooth kernel. grow = 1 + k·w scales displacement from the lens centre, spread = 1 + k·(w − 6x²y²) keeps local area, theta = twist·w rotates the offset, and scale = √(max(grow·spread, 0.02)) scales the dot's radius and quad. k = bulgeStrength · lens presence, with positive strength ×1.2 and negative ×0.7, clamped to −0.85–1.45 — positive values bulge dots outward like a magnifier, negative pinch them inward, twist curls them into a vortex.
- The margin reserves room for the worst-case displacement: a 48-sample numeric scan (lensReach) finds the peak displaced radius for the current strength/twist (twist ×1.6 when holdToZoom is on) and the layout pads by that amount.
- Glow pool: a quadratic falloff q² centred on the lens (radius glowRadius ×(1 + 0.1·zoom), strength glowIntensity clamped 0–2, ×(1 + 0.25·zoom)) brightens dots toward the lit colour by up to 80% and adds an exponential halo in the fragment (exp(−d/width)·0.5, width = 2 + radius·1.5).

## Motion, interaction & lifecycle

- Idle motion: the wave term displaces each dot by up to waveAmplitude px (clamped 0–60) through two coupled sine fields of the absolute position and time, and adds a luminance shade term (clamped ×0.4–1.6 on base alpha). Sparkle: per-dot phase 0.55–1.45 Hz, sparkle = pow(phase, 48) gated by hash > 0.72 · sparkle; it grows the radius ×(1 + 0.7·spark) and pushes the colour 55% toward white (dark mode) or toward the 60%-darkened colour (light mode).
- Intro: focus ramps 0→1 over 1.8 s with a cubic in-out; at focus 0 the field starts compressed (dotted plane pulled toward centre by ×1.12), defocused (blur = (1 − focus)·step·0.42 shrinking dot cores with an energy-conserving falloff) and faded; intro=false or prefers-reduced-motion snaps it open. Sub-pixel dots fade quadratically (radius floored at 0.75 device px) so dense fields dissolve instead of aliasing.
- Pointer tracking on window pointermove/down/up/cancel (passive) plus pointerleave on documentElement; pointerup/cancel release the hold and clear the inside flag for touch. interactive=false ignores the pointer entirely.
- prefers-reduced-motion: clock frozen (no wave, no sparkle animation), interaction disabled, intro instant — a static field.
- Canvas sizing: css size × ratio, ratio = min(devicePixelRatio, maxDevicePixelRatio, √(9 000 000 / (w·h))) — a total pixel budget keeps huge containers affordable; maxDevicePixelRatio is clamped 0.5–3 (default 2). Resizes are flagged and applied at the start of the next frame, then the layout re-runs under the new key.
- The loop self-sleeps: it keeps requesting frames only while the intro is playing, the lens is settling (presence/zoom easing or the spring still moving), or animation is on (speed > 0 with wave > 0 or sparkle on); a settled field stops and wakes on pointer input, resize, visibility change, entering the viewport or a prop change. WebGL context loss stops rendering; context restore bumps an internal generation counter that tears down and rebuilds the whole pipeline. Unmount: cancel the frame, disconnect observers, remove listeners, delete buffer/vertex array/program (skipped if the context is lost). Same-page instances are fully independent (own context, own layout, own lens state).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| dotRadius | number | 1.5 | Dot radius in px; clamped 0.25–12. |
| dotSpacing | number | 14 | Gap between dot edges in px; clamped 1–200. |
| pattern | "grid" \| "hex" \| "spiral" \| "scatter" | "grid" | Dot layout. Unknown values fall back to "grid". |
| gradientFrom | string | "#5227FF" | Gradient start colour; any 3/6-digit hex or rgb()/rgba(). |
| gradientTo | string | "#FF9FFC" | Gradient end colour. |
| gradientAngle | number | 135 | Gradient direction in degrees. |
| cursorRadius | number | 240 | Lens radius in px; clamped 20–2000. |
| bulgeStrength | number | 0.6 | Lens magnification; negative pinches; clamped −1–1. |
| twist | number | 0 | Lens swirl, in degrees; clamped ±360. |
| glowColor | string | "#ffffff" | Colour of the glow pool under the lens. |
| glowRadius | number | 160 | Glow pool radius in px; floored at 0. |
| glowIntensity | number | 0.8 | Glow strength; clamped 0–2. |
| baseOpacity | number | 0.55 | Dot opacity outside glow and sparkle; clamped 0–1. |
| waveAmplitude | number | 0 | Idle sway amplitude in px; clamped 0–60. |
| sparkle | boolean | false | Twinkling dots. |
| speed | number | 1 | Clock multiplier for wave and sparkle; floored at 0. |
| interactive | boolean | true | The lens follows the cursor. |
| holdToZoom | boolean | true | Pressing and holding enlarges the lens. |
| intro | boolean | true | 1.8 s zoom-and-defocus entrance. |
| lightMode | boolean | false | Recolours for light pages. |
| opacity | number | 1 | Overall opacity; clamped 0–1. |
| maxDevicePixelRatio | number | 2 | DPR cap; clamped 0.5–3, plus a 9M-pixel budget. |
| className | string | "" | Extra class on the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of DotField.jsx and DotField.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the gradient dot field renders in all four patterns with the default violet-to-pink 135° gradient; the lens follows the cursor smoothly, magnifies with positive bulge, pinches with negative, twists into a swirl with twist, and holding the pointer down enlarges it; the glow pool lights dots under the lens and follows it; dots pulled from outside the frame never reveal the padding edge; switching pattern/spacing/radius/gradient/angle re-lays out without flicker; wave sway and sparkle animate and respond to speed; intro zooms into focus over 1.8 s and reduced motion skips it; lightMode prints legible colours on a white page; opacity and baseOpacity compose; hiding the tab or scrolling out stops the loop and returning resumes; resizing re-lays out cleanly at 375 / 768 / 1440 wide without overflow; context loss and restore rebuild without errors; unmount leaves no raf, observers, listeners or live GL objects; two instances on one page are independent.
