Implement the "RippleDistortion" component from zero: pointer-driven water over an image — every cursor movement (or click) drops a ring-shaped ripple sprite into an accumulation field, and a composite pass warps the photo along that field: sampling is pushed and swirled by the local displacement amount, chromatic aberration splits the RGB pushes, a specular glint lights the ripple crests like a wet surface, and an optional tint bleeds into the disturbed areas while the rest can be held grayscale. Ripples expand, decay and leave a fading wake. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components (the demo supplies its own image; the component accepts any image `src`).

## Structure & rendering

- Pure React + one small WebGL helper dependency (ogl ^1.0.11) for the renderer/program/mesh/geometry wrappers; two files only: RippleDistortion.jsx (entry, two GLSL programs, wave pool) and RippleDistortion.css (root + canvas rules). React >= 18. No iframe.
- Root is a `<div class="ripple-distortion">` (+ `className`/`style`): position relative, width 100%, height 100%, overflow hidden, black background. The canvas fills it (display block), DPR = min(devicePixelRatio, 2), alpha off, antialias off.
- Two passes. Pass 1 renders up to 100 instanced quads (a per-instance offset/scale/opacity triple) additively (ONE, ONE blend) into a displacement render target sized to the canvas × the quality factor (`low` 0.4, `medium` 0.7, `high` 1). Pass 2 composites image × displacement fullscreen. The displacement target uses linear filtering so the composite reads smooth amounts.
- The image loads with crossOrigin anonymous into a LINEAR, no-mipmap texture; its natural size feeds the cover-fit UV. A failed load simply leaves the cleared background.
- Hex colours (`tint`, `highlightColor`) parse 3/6-digit; garbage falls back to white.

## The ripple field

- Wave sprite fragment: falloff = (exp(−r²·5) − edge)/(1 − edge) with edge = e⁻⁵ (zero outside the unit disc), modulated by `0.55 + 0.45·cos(√r·2π·rings)` so each drop is `rings` concentric ridges.
- Wave lifecycle: each spawn stores position, a start scale of 1.5 × power growing toward 1.5 × max(1, spread) × power (exponential approach, rate ≈ 1.09/s), and opacity 1 decaying multiplicatively each frame by exp(−ln(500)·dt / max(0.15, fade)) — opacity falls to 1/500 in `fade` seconds. Waves under 0.002 opacity are freed; the pool cycles through 100 slots oldest-first, so bursts overwrite the earliest ripples.
- Instanced quads expand with the wave: half-size = scale × max(1, brushSize)/2 in px, position mapped to clip space.
- Spawning (`trigger`):
  - "hover" (default): window-level pointermove inside the container spawns a wave whenever the pointer moved more than `spacing` px (either axis) since the last spawn.
  - "click": pointerdown spawns a wave with power = max(1, clickStrength), scaling start size, growth target and thus the disturbed area.
  - `enabled=false` or prefers-reduced-motion stops all spawning (the existing field still decays).
- Composite shader: amount = displacement.r at the pixel. Direction = (sin θ, cos θ) with θ = amount × swirl × 2π; base UV (cover-fit) is pushed by direction × amount × strength. `dispersion` > 0 samples R at push × (1 + 0.25·dispersion) and B at push × (1 − 0.25·dispersion). `grayscale` mixes toward luma. `tintAmount` mixes the colour toward colour × tint × 1.9 weighted by min(amount × 1.6, 1) — only the water bleeds tint. `glint` > 0 adds specular: the displacement gradient (central differences at ±1 texel) builds a normal (−∇×26, 1) lit from (−0.35, 0.55, 1), pow 22, with the flat-surface baseline subtracted so still water gets no highlight; `highlightColor` tints it.

## Timing & lifecycle

- A rAF loop runs continuously while mounted and on screen (no self-sleep), advancing growth/decay with dt clamped at 50ms. Reduced motion freezes growth and decay (decays forced to full, growth to zero) — the field is effectively frozen but still renders.
- ResizeObserver marks a pending resize applied on the next frame; the displacement target re-allocates at the new size × quality. Changing `src` or `quality` tears down and rebuilds the engine; all other props patch uniforms live through a dedicated effect.
- Unmount: cancel the frame, disconnect the observer, remove window listeners, drop uniforms refs, remove the canvas and lose the WebGL context. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | built-in landscape photo | The image under the water. Any URL or data URI loadable with crossOrigin anonymous. |
| brushSize | number | 150 | Ripple sprite diameter in px. |
| strength | number | 0.2 | How far the image samples push, as a UV fraction. |
| swirl | number | 1 | Turns of directional rotation per unit of displacement. |
| rings | number | 4 | Concentric ridges inside each ripple. |
| spread | number | 5 | How far each ripple expands over its life. |
| fade | number | 3 | Seconds for a ripple to decay to ~0; floored at 0.15. |
| spacing | number | 15 | Minimum pointer travel (px) between hover-spawned ripples. |
| dispersion | number | 0 | Chromatic split of the red/blue push amounts. |
| glint | number | 0 | Specular highlight strength on ripple crests. |
| tint | string | "#a855f7" | Colour that bleeds into disturbed areas. |
| tintAmount | number | 0.1 | How much tint bleeds, 0–1. |
| grayscale | boolean | true | Keeps the undisturbed image grayscale. |
| highlightColor | string | "#ffffff" | Glint highlight colour. |
| trigger | "hover" \| "click" | "hover" | What spawns ripples: pointer movement or presses. |
| clickStrength | number | 2 | Power (size multiplier) of click-spawned ripples. |
| quality | "low" \| "medium" \| "high" | "low" | Displacement field resolution factor: 0.4 / 0.7 / 1.0 of the canvas. |
| enabled | boolean | true | Master switch for spawning ripples. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of RippleDistortion.jsx and RippleDistortion.css plus install steps and a usage example (pass your own image via `src`); no ellipses, no "fill in the core yourself" placeholders.
- Validate: hovering drags a rippling wake behind the cursor that expands, rings and fades; clicking in click mode drops a bigger ripple; the image warps along the field with swirl; dispersion splits colour edges; glint lights crests and stays off flat water; tint bleeds only in the water while grayscale holds elsewhere; brushSize/spread/fade/spacing visibly change the field; quality rescales the field; enabled=false freezes spawning; a broken src leaves the background without errors; prefers-reduced-motion freezes the field; unmount leaves no loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers resize the scene without overflow.
