Implement the "DarkVeil" component from zero: a container-sized WebGL2 backdrop where a silky veil of coloured light drifts through darkness. The veil pattern is a tiny fixed neural network evaluated once per pixel — a compositional pattern producing network that folds 2D coordinates plus a 3D latent vector through sigmoid layers into soft marbles of luminance. A second composite pass shades that field with the tint colour, a cursor-tracking specular sheen, layered bloom, animated film grain and an edge fade; the pointer bends space locally around the cursor and dragging smears the field like silk. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: DarkVeil.jsx (entry, render loop, both shader programs) and DarkVeil.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.dark-veil-container` (position relative, width 100%, height 100%, overflow hidden) holding one `canvas.dark-veil-canvas` (absolute inset 0, block, 100% × 100%, aria-hidden). Unknown props spread onto the container div; className appends after the base class.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference "high-performance". If the context, either program or the shader link fails, the component silently renders the empty container (no error UI, no fallback image).
- Two programs draw one fullscreen oversized triangle (vertices (−1,−1), (3,−1), (−1,3)) with a single attribute-less stream. The FIELD pass renders into an offscreen mipmapped texture (texStorage2D with log2 levels, LINEAR_MIPMAP_LINEAR, CLAMP_TO_EDGE) sized to a fraction of the canvas; after drawing, generateMipmap runs. The COMPOSITE pass samples it and draws to the canvas. The field texture prefers RGBA16F when EXT_color_buffer_float exists, else RGBA8; in the 8-bit case the field shader adds ±½/255 hash dither before writing so gradients stay smooth.
- All live settings are kept in a ref refreshed on every render; a no-dependency effect pokes a wake function after each render, so any prop change repaints immediately without remounting or rebuilding the context.

## The veil field (pass 1)

- Fragment space: css-pixel uv centred and aspect-normalised ((pixel·2 − view)/view.y, y flipped up).
- Pointer warp first: take the offset from the pointer and rotate it locally by touch·0.6 radians, where touch = engagement · exp(−|offset|²/r²) with r ≈ 0.42 view-height units; then subtract the smoothed drag vector scaled by touch, so fast pointer motion shears the veil only near the cursor.
- Global drift: rotate slowly by 0.06·flow·sin(t·0.17), translate by 0.05·flow·(sin(t·0.21), cos(t·0.13)), then scale the plane by 2/zoom about the anchor (view.aspect, −1) and turn it by the rotation prop (a cos/sin mat2 of the angle in radians). The warp prop adds sin/cos displacements of amplitude 0.05·warp at frequency 2π along the opposite axis.
- The network's latent vector = fixed seed (0.3948, 0.36, 0.14) + three ±0.5 pseudo-random offsets hashed from the variation prop (sin-hash; variation 0 keeps the canonical seed) + 0.1·flow·(sin 0.3t, sin 0.69t, sin 0.44t) + touch·(0.12, −0.1, 0.16) + (0, 0, unfold) where unfold = (1 − presence)·0.45 during the intro.
- The network itself: inputs (x, y, latent.x, latent.y) and (latent.z, |uv|) pass through four hidden vec4-wide layers built from hard-coded mat4 weight blocks with sigmoid activations, then a final 3-channel sigmoid head returns the veil colour. The exact weight matrices are part of the component's visual identity — treat them as code-embedded material and copy them verbatim from the implementation; this SPEC pins the architecture, not the numbers.

## Composite shading (pass 2)

- Base energy = pow(field, 2.2) · gain (gain = 1.15 · brightness, boosted up to +40% near the pointer light) plus pow(bloom, 2.2) · glow · gain, where bloom samples mips 2–5 weighted 0.4/0.3/0.2/0.1. Everything scales by presence.
- Light = tint·energy + tint·energy²·0.35 (self-brightening core). Specular sheen: build a normal from the field gradient (slope scaled 0.12), light direction from the smoothed pointer position (idle 0.5, 0.15), sheen = pow(max(dot(normal, half), 0), 40) gated by smoothstep(0.08, 0.7, field), coloured with a mix of tint·2 toward white at 55%, scaled by 0.5·sheen·(0.8 + near·0.4).
- Edge fade: a smootherstep mask of half-width fade·0.5 across all four uv edges, multiplied by opacity. Grain: per-pixel hash noise ±grain/2 reseeded every frame; plus ±½/255 ordered dither. Tonemap 1 − exp(−light), gamma 1/2.2, output premultiplied with alpha = max channel.
- Light mode swaps to ink-on-paper: cover = 1 − exp(−peak·1.6), ink derived from the tint (darkened by 0.2/luma clamped to 1, gamma restored, whitened toward white by the sheen term), alpha = cover·0.85·(1 + grain) + dither, times the mask; output premultiplied ink so the light page background shows through the strokes.

## Interaction & motion

- Pointer tracking on window pointermove (passive): container-local px, inside only within bounds. The field pointer eases toward the raw pointer at rate 1 − exp(−9dt); on first engagement it snaps. Touch presence eases in (rate 3) and out (rate 1.6); the drag vector targets clamp(velocity·0.12, ±120) eased at rate 5; the sheen light eases to the pointer at rate 4 (idle returns to 0.5/0.15). mouseStrength scales both touch and light.
- Intro: presence ramps 0→1 over 1.8 s through a quintic smootherstep driving both the unfold latent shift and the overall gain; intro=false or reduced motion snaps presence to 1.
- paused freezes the clock (t stops advancing) while easing continues; speed multiplies dt into the clock; quality sets the field render scale.
- prefers-reduced-motion: clock frozen, pointer engagement disabled, intro instant — a static veil.

## Performance & lifecycle

- Field resolution = canvas size × quality (clamped 0.25–1, default 0.5), additionally capped so field pixels ≤ 900 000 (the scale shrinks for large containers). Device pixel ratio clamped to 2.
- The frame loop self-sleeps: it keeps requesting frames only while moving (not paused, not reduced motion), or the intro is incomplete, or touch/drag/light are still easing, or the pointer is far from its eased position; a settled frame renders once more and stops. Wake on pointermove, pointerleave on documentElement, visibilitychange, ResizeObserver on the container, IntersectionObserver entering, dpr/quality changes (these two re-allocate) and every React render.
- Colour parsing accepts any CSS colour string through a 1×1 2D-canvas probe converted to linear space with a 2.2 gamma, cached per value; unparsable input falls back to white.
- Unmount: cancel the frame, null the wake ref, disconnect both observers, remove every listener, delete texture/framebuffer/programs/buffer/vertex array, and request WEBGL_lose_context when the canvas is detached. Same-page instances are fully independent (own context, own refs, own easing state).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#6b12ff" | Veil tint; any CSS colour. Drives the glow and the light-mode ink. |
| speed | number | 0.5 | Clock speed multiplier for the drift. |
| scale | number | 1 | Zoom of the pattern; floored at 0.1. |
| rotation | number | 0 | Static rotation of the whole field, in degrees. |
| flow | number | 1 | How much the field breathes: slow rotation, drift and latent motion; floored at 0. |
| warp | number | 0 | Sine displacement strength; floored at 0. |
| variation | number | 0 | Seed offset giving a different but stable veil; 0 keeps the canonical one. |
| brightness | number | 1 | Overall gain; floored at 0. |
| sheen | number | 0 | Specular highlight strength from the pointer light; floored at 0. |
| glow | number | 0.4 | Bloom strength from the blurred mip levels; floored at 0. |
| grain | number | 0.03 | Animated film grain amplitude; floored at 0. |
| quality | number | 0.5 | Field render scale, clamped 0.25–1. |
| mouseInteraction | boolean | true | Pointer bend, drag smear and sheen light. |
| mouseStrength | number | 1 | Scales the pointer's influence; floored at 0. |
| intro | boolean | true | 1.8 s unveil on mount. |
| fade | number | 0 | Edge fade towards the container borders, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Ink-on-light rendering for light pages. |
| paused | boolean | false | Freezes the animation clock. |
| dpr | number | - | Overrides the device pixel ratio; clamped to 2. |
| className | string | "" | Extra class on the container. |

## Delivery & validation

- Deliver the complete content of DarkVeil.jsx and DarkVeil.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the veil drifts and self-deforms with default props; pointer motion bends space locally around the cursor, fast motion shears it, and the sheen light tracks the pointer; the intro unfolds the pattern over 1.8 s; lightMode renders dark ink over a white page; changing color/scale/rotation/flow/warp/brightness/glow/sheen/grain/fade/opacity repaints immediately without remount; variation switches to a different stable pattern; paused halts drift while easing continues; reduced motion shows a static veil with no interaction; hiding the tab or scrolling out stops the loop and returning resumes without a time jump; resize and dpr/quality changes re-allocate the field cleanly; unmount leaves no frame loop, observers, listeners or live GL objects; two instances on one page are independent; 375 / 768 / 1440 wide without overflow.
