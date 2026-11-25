Implement the "SplashCursor" component from zero: a GPU fluid simulation that lives under the pointer — moving the mouse injects swirling ink that advects, curls and slowly dissolves; clicking bursts a flower-shaped splash with a crown of droplets; an optional bloom makes bright ink glow; the dark theme paints luminous ink over the page, the light theme paints absorbing ink over white; an automated intro sweep demos the effect on mount. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18 + WebGL2, two files only: SplashCursor.jsx (entry, GL setup, simulation, all shaders as in-file template strings) and SplashCursor.css (all styles). No runtime dependencies, no iframe.
- Root is a `<div>` with class `splash-cursor` (+ className), inline zIndex (default 50), aria-hidden="true", pointer-events none; position fixed inset 0 — with the contained prop it becomes position absolute, and if the parent element is statically positioned it is promoted to position relative (restored on unmount). One `<canvas>` fills the root (display block, 100% × 100%).
- The WebGL2 context requests alpha + premultipliedAlpha, no antialias/depth/stencil, no preserved drawing buffer; missing context, unrenderable formats or broken shader links abort silently (the component renders nothing).
- Shaders are GLSL ES 3.00: one shared vertex shader (full-screen 4-vertex strip emitting UV and neighbour-texel varyings) plus fragment programs — copy, clear, splat (capsule ink + velocity along the pointer's movement segment), burst (petal/twist velocity impulse), crown (centre blob + 7 seeded droplets of two ink colours), advection, divergence, curl, vorticity, pressure Jacobi, gradient subtract, bloom prefilter + blur, and display. Parallel shader compilation is used when the extension exists, with completion polled before resources are released.
- Framebuffers are half-float, each format probed for renderability with graceful fallbacks: dye RGBA16F (linear filtering), velocity RG16F → RGBA16F, pressure R16F → RG16F → RGBA16F (nearest), divergence and curl single-channel nearest. Double-buffered pairs swap read/write each pass.
- Quality presets: low sim 64 / dye 512 / 10 pressure iterations, medium 96 / 1024 / 16, high 128 / 1440 / 20; the dye resolution is clamped to the canvas short side and both follow the aspect ratio. The canvas backs onto client size × devicePixelRatio clamped to 2, re-fit every frame; resizes reallocate sim/dye (dye copies old contents so ink survives), pressure/divergence/curl reset, and a stale bloom chain drops.
- Bloom (glow > 0) allocates lazily at a 256px base with 4 downsample levels, soft-knee threshold 0.3 / knee 0.7, blurs down the chain and additively re-upsamples, then the display pass adds it.

## Simulation

- One stable-fluids step per frame at dt (clamped 1/60): curl → vorticity confinement (strength = swirl) → divergence → pressure warm-start (previous pressure scaled by 0.1) → quality-prescribed Jacobi iterations → gradient subtract → velocity self-advection (dissipation 2 / momentum) → dye advected by velocity (dissipation 3.5 / trail).
- Pointer input is window-level: pointermove for mouse/pen, touchstart/touchmove/touchend for touch (tracked per touch id); each pointer stores its current and previous normalized position (y flipped). contained mode ignores points outside the parent box. On movement a capsule splat injects velocity along the segment — 6000 × force / √spread, aspect-corrected — and ink at 0.15 × intensity × min(dt × 60, 1) / √spread, radius 0.002 × size with wide-aspect correction; a frame's jump beyond ~0.35 units splits the stroke (no splat that frame) so fast swipes stay continuous.
- Ink colour: rainbow mode cycles the full hue wheel per pointer (phase = random offset + time × colorSpeed × 0.6, HSV saturation 1 value 1); otherwise the palette (3/6-digit hex parsed; empty → white) smoothstep-lerps between neighbouring colours over the same clock. theme "light" inverts channels (1 − c) before injection so ink reads on white backgrounds; the display shader then converts to transmittance.
- Click splash (clickSplash): the burst shader adds a petal-shaped velocity impulse (5-lobe petals modulated by a 3-lobe twist, strength 1100 × force, radius × 3) and the crown shader stamps a centre blob plus 7 droplets at seeded angles, reaches and sizes mixing two palette colours at 1.6 × intensity.
- Intro (default on, skipped under reduced motion): 150ms after mount an automated sweep glides across the canvas for 1.1s (smoothstep, x from 0.2 to 0.8 of the width, y wobbling on a sine) and injects ink exactly like a real pointer.
- Display: dye sampled with normal-based shading (shading 0–1 darkens slopes), bloom added when enabled, plus a 1/255 dither grain to kill banding. Dark theme outputs premultiplied colour with alpha = peak channel — luminous ink floating over the page; light theme outputs transmittance exp(−2.4 × ink) with alpha by minimum channel — absorbing ink.
- Frame loop self-sleep: runs while the intro plays or input happened within (2.2 × trail + 0.4)s; after that it stops and clears the canvas back to transparent. Any pointer/touch input wakes it.
- Context loss: webglcontextlost stops the loop (default prevented); webglcontextrestored rebuilds the whole pipeline (a React state generation bumps the effect to re-run). Unmount: remove every listener, free all targets/programs/buffers/VAO, and after a tick lose the context if the canvas has left the DOM.
- prefers-reduced-motion: reduce — the intro is skipped; direct pointer input still draws.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#4f8cff", "#2dd4bf", "#ffd166"] | Ink palette lerped through over time (used when rainbow is off). |
| rainbow | boolean | true | Cycle the full hue wheel instead of the palette. |
| colorSpeed | number | 1 | Hue / palette cycling speed. |
| intensity | number | 1 | Ink amount per stroke. |
| size | number | 1 | Splat radius scale. |
| force | number | 1 | Velocity push per stroke and burst. |
| swirl | number | 3 | Vorticity confinement strength. |
| trail | number | 1 | Ink persistence; higher = longer-lived trails. |
| momentum | number | 1 | Velocity persistence. |
| shading | number | 1 | Slope shading depth, 0–1. |
| glow | number | 0 | Bloom strength, 0–1. |
| quality | "low" \| "medium" \| "high" | "high" | Simulation resolution and pressure iterations preset. |
| clickSplash | boolean | true | Burst + droplet crown on click. |
| intro | boolean | true | Automated demo sweep after mount. |
| contained | boolean | false | Track only inside the parent box and position absolutely. |
| theme | "dark" \| "light" | "dark" | Luminous ink on dark, absorbing ink on light. |
| zIndex | number | 50 | Root z-index. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of SplashCursor.jsx and SplashCursor.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: ink swirls after the cursor and dissolves at the trail rate; fast swipes do not break the stroke; click bursts a petal splash plus droplet crown; rainbow cycles and a fixed palette lerps; light theme reads as ink on white; glow > 0 blooms bright ink without tinting dim ink; quality low/medium/high changes sharpness and smoothness; contained tracks only inside its box and never blocks clicks; the intro sweep plays once; the loop sleeps to a clear canvas after the quiet period and wakes on input; context loss/recycle rebuilds without errors; unmount frees every GL resource and listener; 375 / 768 / 1440 wide without overflow.
