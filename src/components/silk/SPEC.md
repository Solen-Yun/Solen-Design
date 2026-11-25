Implement the "Silk" component from zero: a full-bleed field of flowing satin folds — diagonal glossy ridges and soft valleys that drift like fabric under light; the light source turns toward the cursor so the highlights slide across the folds, fast pointer movement drags the whole weave slightly, and clicking drops a circular ripple that travels outward, warping the folds as it passes. Two output styles: a dark satin rendering with grain and sheen, and a light-page ink mode. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: Silk.jsx (entry, GL setup, uniform state) and Silk.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="silk-container">` (plus caller className, caller style), position relative, width 100%, height 100%, overflow hidden; its only child is a `<canvas class="silk-canvas" aria-hidden="true">`, position absolute inset 0, width/height 100%. The host owns the size (typical usage: a 100%-wide, fixed-height positioned box).
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. If the context or either program fails to link, the effect silently does not start. A single VAO with a 3-vertex big triangle (corners (−1,−1), (3,−1), (−1,3)) draws everything; no VBO per frame.
- Two programs share one fragment prelude (the `silk` pattern + `bend` distortion + hash noise): a FIELD program that renders the fold pattern's `pow(n, 6)` into the red channel of a quarter-resolution RGBA8 texture (LINEAR_MIPMAP_LINEAR) used as a bloom pyramid, and a COMPOSITE program that shades the final pixel and samples 4 mip levels of that texture for glow. DPR clamped to 2.

## Fold pattern

- `silk(uv)`: uv scaled by `scale` then rotated by `rotation`; tex = uv×scale + variation shift; a transverse wave wiggles tex.y by 0.03 × wave × sin(8x − t); the fold value is 0.6 + 0.4 × foldAmount × sin(5(x + y + cos(3x + 5y) + 0.02t) + ripple × sin(20(x + y − 0.1t))). `ripple` injects a second, finer oscillation along the same diagonal; `wave` controls the transverse undulation; `foldAmount` grows from 0.25 to 1 during the intro. `n = clamp((pattern − 0.2)/0.8)` is the normalized fold intensity.
- `variation` seeds a deterministic offset: wave(k) = fract(sin(variation×12.9898 + k×78.233) × 43758.5453) − 0.5, shift = (wave(1)×6, wave(2)×6), so different variation values reweave the fabric without changing its character.
- Film grain: hash noise = fract of G×sin products (G = e); used as rnd/15 × noiseIntensity in dark mode and as a two-sample zero-centred grain (strength clamp(noiseIntensity × 0.038, 0, 0.16)) in light mode.

## Distortion (bend)

- Pointer touch: offset = (uv − pointer) × (aspect, 1); touch = touchStrength × interactionStrength × exp(−dot(offset,offset)/0.32²); uv shifts by the drag vector × touch — the satin is locally pulled toward the cursor's motion.
- Click ripples: up to 4 live ripples (oldest dropped); each stores normalized position and age; front = dist − age × 0.6; ring = exp(−front² × 60) × exp(−age/0.72); uv += radial / dist × ring × 0.034 × sin(front × 34) — an oscillating ring that shoves folds outward and back as it decays. Ripples are removed after age 4.

## Shading

- Normal from pattern: central differences of `silk` one pixel apart (step = ratio/canvas size), normal = normalize(−gx×26, −gy×26, 1); toLight = normalize(light.xy, 0.85); relief = 1 + (dot(normal, toLight) − light.z) × 1.8 × depth — the depth prop scales the relief contrast.
- Sheen: halfway = normalize(toLight + view); gloss = pow(max(dot(normal, halfway), 0), 48) × smoothstep(0.25, 0.85, n); crest = pow(n, 5); shine = (gloss×0.85 + crest×0.4) × sheen × (1 + touch×0.6) — glossier where folds catch the light and where the cursor touches.
- Bloom (glow > 0): textureLod of the FIELD texture at lods 1–4, weighted 0.35/0.3/0.2/0.15.
- Dark output (default): floorValue = mix(0.2, 0.03, depth); shade = pow(n, 1 + 1.4×depth) remapped from floorValue; tone = mix(color, pow(color, 1.45), (1−n)×depth) (valleys deepen toward a darker hue); lit = tone × shade × relief − grain; a glossy pass tint = mix(color, sheenColor, 0.8), extra = tint × (shine + bloom × glow × 0.55) is soft-clipped above 0.75 (0.25 × (1 − exp(−over×4)) shoulder) and blended in by clamp((sheen + glow) × 4).
- Light output (lightMode): reads like coloured ink on a white page — fold = smoothstep(0.28, 0.9, pattern), specular = smoothstep(0.72, 0.98, pattern); shadow tone = color × (0.72 − 0.12×depth), body = min(color×1.18, 1); base = mix × relief-blend pushed toward white by specular/shine/bloom; result clamped with grain.

## Light steering & pointer state

- The light direction starts at (−0.55, 0.7); when the cursor is engaged its goal is the normalized pointer offset from centre (aspect-corrected, dead zone 0.04), so highlights turn toward the hand; it eases at 1 − exp(−dt×3).
- The pointer itself eases at 1 − exp(−dt×10) (snapping on first engage); its velocity (viewport-heights per second) feeds dragX/dragY, each clamped ±0.06 and eased at 1 − exp(−dt×4).
- touch eases to 1 while engaged (rate 3.5/s) and back at 1.4/s; engaged = mouseInteraction && pointer inside && !reduced-motion.
- Pointer events live on window (passive move/down), `pointerleave` on documentElement; click ripples require clickRipple, pointer inside and not reduced motion.
- Colour parsing: both colors go through a 1×1 canvas fillStyle probe (any CSS colour string), cached; unparsable falls back to white.

## Timing & lifecycle

- Intro (2.2s, skipped when intro=false or reduced motion): presence = 1 − (1−t)³ fades the layer in; fold amount rises 0.25 → 1 with a quintic ease; time offset rushes by 1.6 × (1 − unfold) so the folds bloom from a compressed state.
- Flow: flow += dt × 0.1 × speed while not paused, not reduced motion and speed ≠ 0.
- Frame-loop self-sleep: keeps requesting frames only while flowing, the intro is running, ripples exist, touch/drag/light/pointer are still settling; otherwise it stops, and any pointer event, visibility change, resize, intersection re-entry or prop change wakes it. Prop changes re-render one frame immediately so edits show live.
- Resize: ResizeObserver on the container; DPR = min(dpr prop || devicePixelRatio, 2); a dpr prop change re-resizes.
- IntersectionObserver pauses off-screen; document hidden pauses; reduced motion freezes flow, disables intro and click ripples (hover light steering still works).
- Unmount: cancel the frame, disconnect observers, remove listeners, delete texture/framebuffer/programs/buffer/VAO, and force-lose the context when the canvas is detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| speed | number | 5 | How fast the folds drift; 0 freezes them. |
| scale | number | 1 | Weave zoom; higher packs the folds tighter. |
| color | string | "#7B7481" | Base satin colour (any CSS colour string). |
| sheenColor | string | "#ffffff" | Colour of the glossy highlights. |
| noiseIntensity | number | 1.5 | Film grain strength, floored at 0. |
| rotation | number | 0 | Rotates the weave, in radians. |
| sheen | number | 0.5 | Glossy highlight strength, floored at 0. |
| depth | number | 0.5 | Fold relief contrast, clamped 0–1. |
| glow | number | 0.3 | Bloom around the brightest folds; 0 skips the bloom pass. |
| ripple | number | 1 | Strength of the fine secondary oscillation, floored at 0. |
| wave | number | 1 | Strength of the transverse undulation, floored at 0. |
| variation | number | 0 | Deterministic reweave seed; changes the fold layout only. |
| mouseInteraction | boolean | true | The light turns toward the cursor and fast moves drag the weave. |
| interactionStrength | number | 1 | Scale of the cursor touch and drag, floored at 0. |
| clickRipple | boolean | true | Clicking drops an expanding warp ring (max 4 live). |
| intro | boolean | true | Fades the fabric in while the folds bloom open (2.2s). |
| fade | number | 0 | Smootherstep edge fade to transparent, 0–1. |
| lightMode | boolean | false | Prints the satin as coloured ink for light pages. |
| paused | boolean | false | Freezes the drift but keeps interactions. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Silk.jsx and Silk.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: folds drift continuously at speed 5 and freeze at 0; the glossy highlights turn toward the cursor on both dark and light modes; fast pointer strokes visibly drag the weave and recover; clicking sends a ring that warps the folds and fades; ripple/wave/twist parameters change the pattern; variation reweaves without changing character; depth, sheen, glow, noiseIntensity, color and sheenColor all take effect; fade clips the edges; lightMode sits on a light background; reduced motion keeps a static weave with working light steering; paused stops drift but keeps interactions; resize and container changes never stretch or crop; off-screen and hidden tabs stop the loop; unmount leaves no listeners, GL objects or frame loop; 375 / 768 / 1440 wide without overflow.
