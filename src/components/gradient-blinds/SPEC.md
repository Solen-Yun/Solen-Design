Implement the "GradientBlinds" component from zero: a full-bleed wall of vertical gradient blinds (satin slats) swept by a spotlight that follows the cursor — slats lean toward the light, carry a glossy edge sheen, and ripple in a wave when clicked. The gradient runs across each slat through up to eight hex stops, with optional mirror, drift, fanned perspective and wavy distortion; a light theme re-renders the scene as ink strokes on paper. Single fragment shader, WebGL2. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GradientBlinds.jsx (entry, light spring, pointer state, shader) and GradientBlinds.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="gradient-blinds-container">` — position relative, width 100%, height 100%, overflow hidden — wrapping a single `<canvas class="gradient-blinds-canvas" aria-hidden="true">` absolutely filling it. The container must be sized by the parent. Unless lightMode is on, the container receives `mixBlendMode: mixBlendMode` (default "lighten") merged ahead of the user's style, so the blinds can layer over a page background.
- WebGL2 context with alpha: false, antialias: false, depth/stencil: false, premultipliedAlpha: false. One program: a fullscreen triangle with the single fragment shader below. If the context or program fails, the component renders nothing and never throws.
- Blinds space: fragment uv (0–1, origin bottom-left) is centred, aspect-corrected, rotated by `angle` degrees, then squeezed back; `perspective` (−1–1) remaps the slat axis through an exponential (exp(k·x) − 1)/(exp(k) − 1), k = perspective × 2.2, which fans the slats so one side reads closer; `distortAmount` adds two crossed sine wobbles (amplitude 0.01 × distort) so the wall feels like fabric.
- Slats: the rotated x is multiplied by the slat count (see sizing). Per-slat coordinate s ∈ 0–1 with analytic antialiasing (stripe width = count × 1.25 / min viewport dimension, clamped ≤ 0.12), so slat edges stay crisp at any density. The gradient sample t runs across the slat; `mirrorGradient` folds it 1 − |1 − 2fract(t)|; a shifting phase driven by gradientSpeed slides the pattern so the gradient slowly travels through the slats. Colour = piecewise-linear mix through the stop list.
- Gradient stops: `gradientColors` accepts up to 8 hex strings (default ["#FF9FFC", "#5227FF"], pink → deep violet); parsed by hexToRGB with zero padding; a single stop duplicates itself; trailing slots hold the last colour. Stop changes are detected by a key and re-uploaded without restarting the GL context.
- Sizing: slat count = blindCount clamped to at least 1, and when blindMinWidth > 0 further clamped to floor(containerWidth / blindMinWidth) — the default 60 px minimum keeps slats from rendering thinner than readable.

## Light & slat shading

- Spotlight: the light position (see spring below) is the cursor position in device pixels; spot = (1 − 2·(d/r)^spotlightSoftness) × spotlightOpacity with d the distance to the light and r = spotlightRadius. lit colour = lightColor × spot (greyscale when lightColor is white). Default lightColor #ffffff; radius 0.5, softness 1, opacity 1.
- Slat tilt: each slat's shading ramp is warped by exp(tilt × 0.9) on the per-slat coordinate — positive tilt compresses the bright band toward one edge, making the slat read as leaning out of the light. Tilt sources: idle sway = sway × 0.5 × sin(swayTime × 0.9 + slat·0.55) × (0.6 + 0.4·sin(swayTime × 0.37 + slat·0.21)), swayTime advancing at speed×dt; hover = hover × hoverTilt × 0.7 × exp(−dist²/reach²) toward the light (reach = spotlightRadius × min viewport, hover eased in/out at 1/0.35 s); click ripples below. The ramp is also damped up to 30% inside ripples so passing waves darken briefly.
- Sheen: a narrow glossy band (exp gaussian at 0.035 of the slat, width 0.07) hugs one edge — the left edge by default, flipped by shineDirection "right" — scaled by shine × (0.3 + 0.7·nearLight) so it brightens where the spotlight hits. relief (0–1) adds a crease highlight (0.38 × relief × smoothstep(0.62, 1, ramp)) like slat curvature. glow (0–2) adds haze = gradient × glow × 0.4 × spot × (0.4 + 0.6·ramp). Overflow tone-maps softly (values above 0.8 compress via 1 − exp(−over/0.2)); film grain (two hashes ±0.5, quantized to 24 fps) is added scaled by noise × (0.45 + 0.55·luma smoothstep).
- Click ripple: clicking (when clickEffect is "ripple", not under reduced motion) records the point into a ring of 4 slots; each wave lives 1.6 s: a front sweeps across slat indices at age × max(count, 4) × 0.95 slats, gaussian in slat distance (width 0.8 + life·1.2) and in height along the wall, fading (1 − life)²; it tilts slats (×0.9) and adds a light pulse (×0.35, damped by the spotlight).
- Intro: over 1.8 s slats settle upright from a rotated-back tilt of −1.2, sweeping left → right (settle = smoothstep(intro × 1.5 − uv.x × 0.5)); the whole render fades in over the first 65%.
- Light theme: paper stays white; the gradient's chroma is boosted (hue = mix(luma, hue, 1.3), bright hues damped 0.82–1) and tint mixes in as the light "reveals" it; a 1–2 px ink stroke draws along each slat edge; sheen whitens further; grain subtracts ink; everything fades from white with the intro presence.

## Light spring, loop & lifecycle

- The light target is the pointer while inside; otherwise idle "drift" wanders a slow Lissajous (±0.22 width / ±0.16 height, two superposed sines, advancing at speed) — or idle "center" parks it at the centre; any other value holds the last position. A damped spring follows the target: omega = 2.4 / mouseDampening, stiffness omega², damping 2·omega, integrated in ≤ 8 ms substeps; mouseDampening 0 snaps instantly. Default 0.15 s.
- The rAF loop continues while the light spring is settling, hover is easing, the intro is playing, ripples are alive, or (not reduced-motion and) noise > 0, gradientSpeed ≠ 0, sway·speed > 0, or the light is drifting; `paused` freezes time and lets the loop sleep until woken. Pointer move/down/leave, visibilitychange, resize and any prop change wake it. dt clamped to 1/20 s.
- Resize: DPR = min(devicePixelRatio, dpr prop or 1, 2); the light re-seeds to the centre on first measure. ResizeObserver + IntersectionObserver gate rendering while off-screen.
- Reduced motion: sway freezes (uniform 0), the idle drift stops and ripples are ignored; the still frame keeps its spotlight and gradient.
- Unmount: cancel the frame, disconnect observers, remove all listeners, delete the VAO and program, and lose the GL context if the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| gradientColors | string[] | ["#FF9FFC", "#5227FF"] | Hex gradient stops across each slat, up to 8. |
| angle | number | 0 | Rotation of the blind wall in degrees. |
| noise | number | 0.3 | 0–2: animated film grain strength. |
| blindCount | number | 16 | Number of slats (≥ 1). |
| blindMinWidth | number | 60 | Minimum slat width in px; the count shrinks to honour it. |
| mouseDampening | number | 0.15 | Seconds-scale of the light's damped spring; 0 follows instantly. |
| mirrorGradient | boolean | false | Mirrors the gradient around each slat's centre. |
| spotlightRadius | number | 0.5 | Spotlight radius relative to the viewport. |
| spotlightSoftness | number | 1 | Spotlight edge falloff exponent. |
| spotlightOpacity | number | 1 | Spotlight peak brightness. |
| distortAmount | number | 0 | Crossed sine wobble of the whole wall. |
| shineDirection | "left" \| "right" | "left" | Which slat edge carries the glossy sheen band. |
| lightColor | string | "#ffffff" | Hex colour of the spotlight. |
| perspective | number | 0 | −1–1: exponential fan of the slat spacing. |
| gradientSpeed | number | 0 | How fast the gradient drifts through the slats. |
| shine | number | 0.4 | 0–2: strength of the edge sheen band. |
| relief | number | 0.5 | 0–1: crease highlight on the lit side of each slat. |
| glow | number | 0.4 | 0–2: haze the gradient emits under the spotlight. |
| sway | number | 0.35 | 0–1: idle per-slat sway amplitude. |
| speed | number | 1 | 0–4: master clock for sway, drift and the gradient shift. |
| hoverTilt | number | 0.6 | 0–1.5: how strongly slats lean toward the cursor light. |
| clickEffect | string | "ripple" | Set to "ripple" to enable click waves; other values disable them. |
| idle | "drift" \| "center" | "drift" | Where the light rests when the pointer is away: wandering or parked centre. |
| intro | boolean | true | Plays the 1.8 s slats-settling intro. |
| mixBlendMode | string | "lighten" | Container blend mode while lightMode is off. |
| lightMode | boolean | false | Ink-on-paper rendering; also removes the container blend mode. |
| paused | boolean | false | Freezes the animation clocks while still rendering. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of GradientBlinds.jsx and GradientBlinds.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: slats render with a per-slat gradient and crisp antialiased edges at counts from 1 to screen-limited; the spotlight follows the cursor on the damped spring (overshoot visible at large mouseDampening) and drifts on its Lissajous when idle; slats visibly lean toward the light (hoverTilt) and sway when idle; clicking fires a wave that sweeps across the slats and fades in 1.6 s; custom stops up to 8 hex colours render in order; mirror flips the gradient; angle 0–90 rotates the wall; perspective fans the spacing; shine band flips with shineDirection; lightMode turns the scene into ink strokes on white and drops the blend mode; blindMinWidth keeps slats readable at 375 px width without overflow; reduced motion stops sway/drift/ripples; paused freezes; scroll-away/tab-away sleep the loop; unmount leaves no listeners, observers or GL objects; two instances are independent.
