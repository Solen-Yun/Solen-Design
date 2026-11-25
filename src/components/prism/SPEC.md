Implement the "Prism" component from zero: a glowing crystalline prism — a raymarched volumetric pyramid whose interior bands shimmer through the spectrum as it rotates, wrapped in additive light. It can spin on a fixed axis, tumble in 3D, follow the cursor like a hovering object, or hold still; its palette is either the built-in rainbow or any custom colour list, and hue can be rotated, saturated, and roughened with noise. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Prism.jsx (entry, shaders, orientation math) and Prism.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `prism` (position relative, width 100%, height 100%, overflow hidden); `className` appends, `style` merges before the remaining props spread onto it. The only child is a `<canvas class="prism-canvas" aria-hidden="true">` (position absolute, inset 0, display block, width/height 100%). The host gives the container its size.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. If the context or the single program fails, the component silently renders nothing. A `webglcontextlost` on re-init is cleared via a timeout handle so repeated mounts never leak timers.
- One program drawing one big triangle from `gl_VertexID` (no buffers); a VAO is bound for safety. Canvas resolution = CSS size × min(dpr || devicePixelRatio, 2) × resolution (clamped 0.25–1).
- Palette texture: 64×1 RGBA8, LINEAR, REPEAT on s. Rebuilt whenever the joined colour key changes: stops sampled through a 1px canvas probe, neighbours blended with a smoothstep ramp and wrapped around the ring; with no custom colours the shader uses the built-in cosine spectrum instead.

## Raymarch

- Fragment ray: pixel offset from centre minus `offset` prop, scaled by `1 / (canvasHeight × 0.1 × scale)`; the ray origin/direction are transformed by the orientation matrix, marching along its third column (the prism axis), starting at z = 5.
- Shape: a square pyramid SDF — `max((|x|/halfBase + |y|/height + |z|/halfBase - 1) × min(halfBase, height) × 0.577, -y)` — with a fixed 0.1 offset in front of the surface so the march never sticks.
- Accumulation: 100 additive steps. Per step, `d = 0.1 + 0.2 × |sdf|`; the colour band is a four-term sine combination of `phase = (p.y + z) × colorFrequency` (cheap analytic spectrum), or the palette texture sampled at `phase / 2π` when a palette exists; each step adds `band / d` — volumetric absorption brightening near the faces.
- Tone map: `raw = o² × glow × ignite² / 1e5`, then `(e^(2·raw) - 1) / (e^(2·raw) + 1)` per channel; alpha = mapped.a, premultiplied.
- Grade: hash noise × noise amount, saturation as a luma mix (default 1.5), and an optional hue rotation matrix (YUV-style rotation built from the hueShift angle in degrees) applied when hueShift ≠ 0.
- Light mode: hue-normalised ink — `pow(hue, 1.5)`, mixed from 0.86 toward 0.32 the more neutral (colourless) the palette is, coverage from the tone-mapped energy with dithered edges — a spectral ink print for light pages.

## Orientation & animation

- The pose (yaw/pitch/roll from pointer interaction) is a rotation matrix composed at runtime; `animationType` adds a motion matrix on top: `rotate` — a gentle wobble (`cos(t)`, `cos(t+33)`, `cos(t+11)` entries) driven by `time × timeScale`; `rotate3d` — full tumbling `rotation(t·0.55, sin(t·0.6+0.6)·0.6, sin(t·0.35+1.9)·0.5)`; `hover` — no self motion, the prism faces the cursor; `static` — pose only.
- Pointer interaction: pointer position is normalised to ±1 over the container. When `interactive` (or animationType "hover") and the pointer is inside, target yaw = -x × reach, pitch = y × reach, where reach = (0.6 for hover, else 0.09) × hoverStrength; the pose eases toward targets with `1 - (1 - inertia)^(dt·60)` (inertia clamped 0.001–1) and roll decays toward 0. Without a pointer everything returns to rest.
- Intro: an ignite clock rises 0→1 over 1.4s and the glow scales by ignite² — the prism flares into existence.

## Performance & lifecycle

- Settings are mirrored into a ref every render; a per-render wake re-renders once (resize is re-run whenever the effective pixel width changed) so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: frames continue only while spinning (rotate/rotate3d with timeScale > 0 and not reduced), the pose is still settling, the intro is running, or noise > 0 (animated grain). Otherwise it stops. Wake sources: window pointermove (passive), window blur, documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: time freezes, intro snaps to done, pointer follow is disabled.
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete palette texture, VAO and program; the GL context is lost on a `setTimeout(0)` handle that a re-mount clears first. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 3.5 | Prism height in world units, ≥0.1. |
| baseWidth | number | 5.5 | Square base edge length, ≥0.1. |
| animationType | "rotate" \| "rotate3d" \| "hover" \| "static" | "rotate" | Idle motion; "hover" replaces it with cursor-facing. |
| glow | number | 1 | Light accumulation strength, ≥0. |
| offset | { x: number, y: number } | - | Shifts the prism on screen, in render units. |
| noise | number | 0 | Grain/noise amount over the colour, ≥0. |
| scale | number | 3.6 | Camera zoom; larger is closer, ≥0.1. |
| hueShift | number | 0 | Rotates the whole spectrum, in degrees. |
| colorFrequency | number | 1 | How many spectral bands fit inside the prism, ≥0. |
| colors | string[] | - | Custom palette, up to 8 colours, smoothly looped; omitted uses the built-in spectrum. |
| saturation | number | 1.5 | Colour saturation of the output, ≥0. |
| timeScale | number | 0.5 | Speed of the idle motion; 0 holds it. |
| interactive | boolean | true | The prism leans toward the cursor. |
| hoverStrength | number | 2 | How far the lean goes, ≥0. |
| inertia | number | 0.05 | Follow smoothness, 0.001–1; lower is floatier. |
| intro | boolean | true | The glow flares in over 1.4s on mount. |
| resolution | number | 0.5 | Render resolution scale, 0.25–1. |
| lightMode | boolean | false | Prints the prism as spectral ink for light backgrounds. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Prism.jsx and Prism.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all four animationType modes behave (slow wobble, 3D tumble, cursor-facing, still); custom palettes loop smoothly and recolor the bands; hueShift, saturation, colorFrequency, noise reshape the spectrum live; the prism leans toward the cursor with inertia and relaxes on leave; height/baseWidth/scale/glow/offset framing is correct; lightMode prints legible ink on white; intro flares once and does not replay on prop changes; prefers-reduced-motion holds a static frame; the loop sleeps when settled and wakes on pointer/resize/visibility; unmount leaves no listeners, observers, GL contexts or pending timers; 375 / 768 / 1440 wide without overflow.
