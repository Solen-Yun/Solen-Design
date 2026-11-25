Implement the "DecayCard" component from zero: a photo card rendered in WebGL2 whose image tears and melts — simplex-noise turbulence displaces the pixels, RGB channels split apart and material near the edges dissolves to transparency — driven by how fast the pointer moves across the window, then recovering to a crisp photo when the pointer calms down; an idle breath keeps the rim quietly alive and a parallax tilt follows the cursor. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Two files only: DecayCard.jsx (entry, input state machine, WebGL2 setup) and DecayCard.css (all styles). React >= 18, no runtime dependencies. One photo comes from the image prop; a placeholder landscape photo ships as the default — exact default artwork ships with the code.
- Root is a `<div>` with class decay-card (plus extra className): position relative, flex none, will-change transform, width/height from the width/height props, extra style merged last. The root itself is transformed every frame (translate3d + rotate) for the cursor-follow parallax.
- Inside, in paint order: a WebGL2 canvas (class decay-card__canvas, aria-hidden, pointer-events none) deliberately oversized to 124% of the root and offset −12% on both axes, so torn material can bleed past the card edges; an optional fallback `<img>` (class decay-card__fallback, plain object-fit cover, rounded by the radius prop and grayscale-filtered) shown only when WebGL2, the program or the texture upload fails; and an optional content layer (class decay-card__content) wrapping children — absolute, inset 8.33% on the sides and bottom, white text, pointer-events none, sitting above the effect.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false. If the context or program fails the canvas stays empty and the fallback img takes over. One program, one oversized triangle (3 vertices covering the clip space). Canvas sized to client size × DPR (clamped to 2) via a ResizeObserver.
- Uniforms per draw: uImage (texture), uSize (canvas px), uImageSize (natural image size for cover cropping), uUnit (world unit derived from canvas size / 720|900 with a 1.24 bleed), uScale (decay level × intensity × 440), uIdle, uFrequency, uOctaves, uSeed, uRadius (prop radius converted to world units, capped at 300), uTime, uFlow (0 under reduced motion), uChroma, uGray, uReady (0 until the texture loads, fading the card in).

## Tear field (fragment shader)

- Design space is a 600×750 (4:5) card; view coordinates are derived from UV × canvas size in world units. Sampling cover-crops the texture to that space.
- Turbulence: fBm of 3D simplex noise, octaves = detail (1–8), each octave doubling frequency and halving amplitude, summed and shaped into 0–1. Two independently seeded fields (x and y, offset seeds and z offsets) produce the displacement vector.
- Displacement magnitude: scale = (decay level × intensity × 440, mixed from 0.2 at the far rim to 1.0 toward the centre) + idle breathing (a slow noise drift masks the idle strength stronger at the rim, × 120). The sampled source = view + offset × (turbulence − 0.5), so material tears along curling noise contours; the rounded-box SDF of the source clips alpha with a 1-unit antialiased edge — displaced material outside the box becomes transparent, which is the "burning away" look.
- Chroma (0–2): the red channel is re-sampled along +offset × chroma × 0.08 plus a horizontal split proportional to min(scale, 200) × chroma × 0.012, the blue channel along −split — visible only while the tear is active. Grayscale mixes to luma before output. Output is premultiplied.
- The default seed comes from pattern (rounded), so each pattern value yields a different tear shape.

## Motion & input

- A window-level passive pointermove tracks the cursor; the first sighting initialises the previous-position baseline. pointerenter/leave on the root flag hover.
- Follow targets: scope "window" (default) normalises the cursor to the viewport (−1..1); scope "card" normalises to the card rect but only while hovered. Targets: x/y = normalised × 120 px softened past the travel bound (overshoot adds at 20% rate), rotate = nx × tilt (0–45°); all eased with follow = 1 − exp(−dt/0.16) and written to the root transform.
- Decay level: wanted = clamp(speed / (2400 − 2100 × sensitivity), 0, 1)² from the pointer speed in px/s (window scope tracks always, card scope only while hovered), floored at hoverDecay while hovered. Level chases wanted with tau 0.08s attacking and the recovery prop (min 0.05) releasing.
- Idle: idle prop (0–1) keeps a gentle rim-only tear breathing through the noise drift even at rest; flow (0–2) advances the noise field over time so the melt crawls.
- Reduced motion: parallax targets forced to 0, uFlow 0; the tear still responds to speed level changes but the field itself does not flow.
- Frame loop self-sleep: while idle animation runs (idle > 0, not reduced motion) it draws every other frame indefinitely; otherwise it draws only while settling (transform deltas > 0.05, level delta > 0.002, flow active at level, or speed > 1) and stops after 0.25s of calm. Any pointermove/hover/prop change wakes it. An IntersectionObserver on the root pauses everything offscreen and wakes on return.
- Texture loading: Image with crossOrigin anonymous, decoding async; uploaded with mipmaps (LINEAR_MIPMAP_LINEAR / LINEAR, CLAMP_TO_EDGE); a 1×1 transparent placeholder until ready; uReady gates output so the card fades in when the texture lands. Changing the image prop reloads; load errors flip to the fallback.
- Unmount: cancels the frame, disconnects both observers, removes all listeners, deletes texture, buffer and program.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | DEFAULT_IMAGE | The photo to melt; a placeholder photo ships as the default, exact artwork ships with the code. |
| width | number | 300 | Card width in px. |
| height | number | 400 | Card height in px. |
| intensity | number | 0.5 | Tear strength, clamped 0–2; multiplied into the displacement scale. |
| sensitivity | number | 0.5 | How little pointer speed it takes to tear, 0–1. |
| hoverDecay | number | 0.05 | Minimum tear level while the pointer is over the card, 0–1. |
| recovery | number | 0.6 | Seconds-ish time constant for the tear to heal, floored at 0.05. |
| grain | number | 0.25 | Noise frequency 0–1; higher means finer, busier tearing. |
| detail | number | 5 | Turbulence octaves, rounded and clamped 1–8. |
| pattern | number | 4 | Seed for the tear pattern; each value gives a different melt shape. |
| idle | number | 0.35 | Strength of the resting rim breathing, 0–1. |
| flow | number | 0 | How fast the noise field crawls over time, 0–2. |
| chroma | number | 0 | RGB split strength while tearing, 0–2. |
| travel | number | 50 | px of parallax before the follow softens. |
| tilt | number | 10 | Degrees the card leans toward the cursor, clamped 0–45. |
| scope | "window" \| "card" | "window" | Whether tearing and parallax track the whole window's cursor, or only the pointer over the card. |
| radius | number | 0 | Card corner radius in px (also rounds the fallback img). |
| grayscale | boolean | false | Rests the photo in grayscale. |
| children | ReactNode | - | Caption content laid over the bottom of the card. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of DecayCard.jsx and DecayCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: sweeping the pointer tears the image along noise contours and it heals through recovery; fast flicks tear harder than slow drifts and sensitivity shifts the threshold; hovering holds at least hoverDecay; scope card ignores the cursor until hover; the tear bleeds past the card bounds and the rim keeps breathing at idle; pattern changes reshape the melt; chroma splits channels only while torn; grayscale and radius apply; children sit above the effect; the parallax follows with travel softening and tilt lean; a failed context or image falls back to the plain img without errors; reduced motion kills flow and parallax; resize keeps the field aligned; offscreen cards pause; unmount leaves no loop, observers, listeners or GL objects; 375 / 768 / 1440 wide without overflow.
