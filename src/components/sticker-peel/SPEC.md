Implement the "StickerPeel" component from zero: a die-cut sticker rendered in WebGL that peels from any angle — hover lifts a corner, press peels it back and drags the fold line around the sticker, and you can grab it, throw it across the stage with real momentum, and watch it swing on its grab point like a pendulum before settling. The underside has its own colour and lighting, and the front face comes in gloss, matte or holographic finishes. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: StickerPeel.jsx (entry, peel state machine, shaders) and StickerPeel.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div` with class sticker-peel plus an optional extra className and inline style: position absolute at the parent's top-left with pointer-events none and will-change transform — the component treats its parent element as the stage, so the parent must be a positioned container whose size defines the play area (bounds = parent client size, tracked by a ResizeObserver). Root is moved each frame with translate3d; rest props spread onto it.
- Inside: one `<canvas>` (class sticker-peel-canvas, aria-hidden, pointer-events none, fills the root) and one hit `div` (class sticker-peel-hit): the hit box is sized to the sticker's width × height, positioned at the root centre, transformed with translate(-50%,-50%) rotate(angle) scale(grow), pointer-events auto, touch-action none, and gets cursor grab/grabbing while draggable.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias true, depth on. If the context or programs fail, the component stays inert without throwing.
- Canvas size: a square of ceil(hypot(width, height) × 1.16 + 2 × (36px + curlRadius)) so rotation, swing and peel never clip; DPR = dpr prop or devicePixelRatio, clamped to 2.
- Mesh: a 96 × 96 grid of the padded sticker with index buffers, drawn in 4 passes of one program: (0) contact shadow of the flat region — offset (1.2, 2.4) px with a (0.28, 0.55) height slope, alpha = shadow × 0.55 blurred through mip LOD and dimmed where the curl rolls over it; (2) the peeled underside region rendered to an offscreen target (half resolution), blurred by two gaussian passes (sigma = min(4, (2.5 + curlRadius × 0.15) / 2)) and composited as the curl's soft ground shadow at shadow × 0.6; (1) front and back faces; (3) the curled-over underside drawn last with depth testing plus a bend glare highlight.
- Peel geometry: a fold line runs across the sticker along the current peel direction; the region beyond it is wrapped around a cylinder of radius curlRadius (minimum 2) — grid vertices past the fold roll onto the arc (height = radius × (1 − cos θ), normal tilts with sin θ), the fold position = hullStart + peel × hullSpan where peel is the 0–1 spring state and the span is projected onto the sticker's convex hull so non-rectangular die-cuts peel from their true edges. The flat part lifts by lift × 26 units while dragging; everything rotates by rotate + swing and scales by 1 + 0.07 × lift.

## Image pipeline & hit testing

- imageSrc loads through an Image (crossOrigin anonymous); it is drawn into an offscreen canvas with 18% padding on every side, downscaled so the longest side ≤ 1024, uploaded premultiplied with mipmaps (trilinear min filter, clamp to edge).
- A 96px-wide alpha mask is rasterized from the same image; transparent pixels connected to the border (flood fill, alpha ≤ 100) are marked outside, and the convex hull of all alpha > 127 pixels is kept — this drives the peel extent along any direction and the die-cut silhouette.
- Hover and press only register over solid pixels: the pointer is inverse-rotated into sticker space and sampled against the mask (cut-out holes in a die-cut sticker are not grabbable). The hit box cursor reflects this.
- backColor parsing goes through a canvas 2D fillStyle probe (1×1 pixel readback) with caching; the default is a neutral light grey.

## Lighting & finishes

- A point light sits 260 units above the stage and follows the pointer while it is inside the parent; otherwise it rests up-left of the sticker at (x − 0.45w, y − 0.9h). Lighting = diffuse + Blinn-Phong halfway specular; faces get a key-light shading clamp (top side slightly lifted).
- finish = "gloss": tight specular (pow 220 × lightingIntensity × 0.4) plus a soft sheen (pow 24 × 0.03); base diffuse 0.86 + 0.16.
- finish = "matte": broad faint sheen (pow 8 × 0.08), flatter diffuse (0.8 + 0.22).
- finish = "holo": albedo recovered from premultiplied colour; a luminance-driven foil mask (smoothstep 0.5–0.92) mixes the ink toward silver/rainbow film — a 6-stop spectrum function for the rainbow, animated banding bars (the repeating brightness profile 0.08→0.6→0.72→0.6→0.08 across 12 cells) tilted by the normal, brightness weighted by proximity to the light's glint position; plus a per-180-cell facet sparkle layer (random normals, pow 60 glints, gated by a hash step and distance falloff) and a strong pow-140 highlight. All holo energy scales with lightingIntensity.
- The underside renders in backColor with hash grain, a diffuse term and a faint pow-24 specular; the curled-over region gets a glare band as it bends.

## Interaction & physics

- Peel spring: peel target = activePeel (peelBackActivePct/100) while pressed, hoverPeel (peelBackHoverPct/100) while hovering, else 0 — spring frequency 3 Hz, damping 0.7 engaged / 0.62 free. Peel direction: while pressed beyond 12% of the smaller dimension from centre, the target direction is the grab offset angle; while merely hovering with followPointer it is the local pointer angle; otherwise the peelDirection prop. Direction eases with wrap-angle, τ = 0.12 s, so the fold always swings toward where you touch.
- Drag: pointerdown over a solid pixel captures the pointer on the hit box, bumps a global z-index stack so the grabbed sticker floats above siblings, and starts monitoring: > 3px of movement (and draggable) starts the drag and fires onDragStart. While dragging, the sticker centre tracks the pointer minus the rotated grab offset, and a pendulum swing integrates torque from the pointer's angular acceleration around the grab point (torque × 1.1 × swing, spring ω = 2π·1.5 rad, damping 0.45), clamped to ±1.2 rad; when free, the swing springs back to 0 (frequency 1.4 Hz, damping 0.32).
- Throw: on release, velocity is estimated from pointer samples in the last 90 ms (clamped to ±2600 px/s) unless reduced-motion; in free flight velocity decays exp(−dt × (1.5 + 9 × friction)) and stops below 4 px/s. The sticker is confined inside the parent: its rotated bounding reach (grown 7% per unit lift) bounces off the edges with velocity reflected × bounce. onDragEnd fires after release.
- Intro (intro prop, skipped under reduced-motion): 1.1 s entrance seeded with lift 1.5, peel 0.3, swing 0.1 and a direction offset of 0.6 rad, with the canvas fading in over the first 0.12 s.
- initialPosition: "center" (default) or { x, y } offsets from the parent centre; the light's resting anchor is set on first placement.
- prefers-reduced-motion: no intro animation and no throw velocity.

## Lifecycle

- The frame loop self-sleeps: it stops when the intro is done, nothing is pressed, the peel/lift/swing springs are settled, velocity is zero, direction and light have converged; it wakes on window pointermove, document visibilitychange, parent resize, and re-entering the viewport (IntersectionObserver on the parent).
- Unmount cancels the frame, disconnects observers, removes every listener, deletes textures, framebuffers, buffers, programs, and loses the WebGL context if the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | - | The sticker artwork; transparent regions become the die-cut silhouette. |
| width | number | 200 | Sticker width in px, minimum 16; height follows the image aspect. |
| rotate | number | 0 | Rest rotation in degrees. |
| peelDirection | number | 0 | Default peel direction in degrees (0 peels upward). |
| peelBackHoverPct | number | 25 | How far the peel creeps on hover, 0–100 (% of the peel span). |
| peelBackActivePct | number | 40 | How far the peel opens while pressed, 0–100. |
| curlRadius | number | 12 | Radius of the curled-over cylinder in px, minimum 2. |
| finish | "gloss" \| "matte" \| "holo" | "gloss" | Front-face material: shiny, flat, or holographic foil. |
| backColor | string | "#d4d4d8" | Colour of the sticker's underside. |
| lightingIntensity | number | 0.5 | Specular strength and, on holo, the foil energy, 0–1. |
| shadowIntensity | number | 0.6 | Contact and curl shadow strength, 0–1. |
| followPointer | boolean | true | On hover, the fold line leans toward the pointer's angle. |
| draggable | boolean | true | Grab, drag, throw and z-stack behaviour. |
| swing | number | 1 | Pendulum swing amplitude while dragging, 0–3. |
| friction | number | 0.5 | How quickly a thrown sticker slows down, 0–1. |
| bounce | number | 0.35 | Wall bounce restitution, 0–1. |
| intro | boolean | true | 1.1 s peel-and-settle entrance on mount. |
| initialPosition | "center" \| { x: number; y: number } | "center" | Where the sticker starts inside its parent. |
| onDragStart | () => void | - | Fired when a drag actually begins. |
| onDragEnd | () => void | - | Fired after release. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of StickerPeel.jsx and StickerPeel.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: a star-shaped (non-rectangular) artwork peels from its true silhouette edges; hover creases the nearest edge and following the pointer rotates the fold; pressing peels further and dragging swings the fold around; grabbing, throwing and wall bounces feel weighty and settle without jitter; the curled underside shows backColor with soft blurred shadow under the curl; gloss / matte / holo read distinctly, holo flashing rainbow bands as the light moves; drag lifts and scales the sticker and raises it above later siblings; controlled and uncontrolled parents (relative containers) both position it correctly; two stickers on one stage never interleave z-order wrongly; prefers-reduced-motion skips intro and throws; WebGL missing leaves the parent intact with no errors; unmount leaves no listeners, observers or GL objects; 375 / 768 / 1440 wide without overflow.
