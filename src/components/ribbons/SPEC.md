Implement the "Ribbons" component from zero: springy ribbons that trail the cursor. Each ribbon is a chain of points whose head is a damped spring chasing the pointer (offset sideways per ribbon) and whose body follows in its wake; the chains are resampled through a Catmull-Rom spline and stroked as width-profiled triangle strips with per-shape profiles — lens, comet or even — and an optional travelling sine wave. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Ribbons.jsx (entry, simulation, mesh builder, shaders) and Ribbons.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="ribbons">` (plus any className, inline style): position relative, width 100%, height 100%, pointer-events none — it fills its host box without blocking anything underneath. Inside, one full-size `<canvas class="ribbons-canvas">` (block, 100% x 100%), sized to host * DPR (DPR = dpr prop or devicePixelRatio clamped to 2).
- WebGL2 context (alpha, premultipliedAlpha, antialias false). One program, one dynamic vertex buffer. Vertex data per ribbon: a triangle strip of 2 x 197 vertices (50 control points x 4 spline samples + 1, duplicated on both sides), stride 6 floats — position xy, signed side (-1/+1), profile width at this sample, and the extrusion reach. The vertex shader projects px space to clip space (y flipped); the fragment shader computes signed distance = |side| * reach, antialiases the stroke edge (softness widens the feather), fades alpha below a half-pixel width, applies the fade prop's tail fade along the param u, and multiplies by opacity — premultiplied output, blending ONE / ONE_MINUS_SRC_ALPHA. Each ribbon draws in its own colour (one uniform per draw call).
- Background: the canvas clears to backgroundColor every frame (premultiplied clear colour, "transparent" clears to 0/0/0/0). If the WebGL context or program fails, the component renders nothing and stays silent.

## Simulation

- One ribbon body per colour (colors drives the count, capped at 12; extra entries ignored, empty falls back to the default blue trio). Bodies are created anchored at the pointer (or centre) and never remount when the palette grows/shrinks.
- Head: a damped spring toward target = pointer + (index - centre) * spread horizontally and lift * spread vertically (lift and a small nudge are per-ribbon seeded values). Spring frequency = 60 * sqrt(spring * pull) where spring = 0.03 * 4^(2 * stiffness - 1) (stiffness 0→1 spans a 16x range) and pull = 0.35–1.65 seeded per ribbon; damping = 2 * zeta * 60 * sqrt(spring) * drag with zeta = 0.3^(2 * bounce) clamped 0.05–1 (bounce 0→1 goes overdamped to ringing) and drag 0.9–1.1 seeded.
- Body: 50 trailing points, each easing toward the one ahead by follow = 1 - 0.183^((1 / length) * dt * 60) — length 0.1 gives a short stiff ribbon, 5 a long floaty one. The simulation runs on a fixed 1/120s timestep with an accumulator, so the spring behaviour is frame-rate independent.
- Wave (wave > 0): before resampling, each control point is displaced along the local normal by sin(u * 3π - time * 3.2 + phase) * sin(π * u) * amplitude, amplitude = wave * min(thickness * 0.8, ribbon length * 0.07) — three travelling bulges anchored at both ends, phase-shifted per ribbon.

## Stroke building

- The 50 control points (with their local spacing) are resampled through a Catmull-Rom spline at 4x detail into 197 samples carrying interpolated spacing.
- Width: half = thickness * 0.5 * seeded width (0.95–1.05) * smoothstep(0, thickness * 1.5, total chain length) — ribbons grow in from nothing as the chain extends. Per-sample width = half * profile(u) * smoothstep(0, 1.5, sample spacing), where profile: "lens" — 1 - 0.9 * (2u - 1)^2 (fat middle, pointed ends); "comet" — (1 - u)^1.2 * sqrt(smoothstep(0, 0.1, u)) (fat head, tapering tail); "even" — sqrt(smoothstep(0, 0.06, u) * smoothstep(0, 0.06, 1 - u)) (constant with rounded caps).
- Each sample extrudes both sides along the spline normal by width + 1.5px (the extra reach carries the antialiased edge), producing the strip.
- Colors accept 3/6-digit hex (fast path), "transparent", or any CSS colour via a 1x1 canvas fillStyle probe; each ribbon strokes in the RGB of its colour.

## Interaction & lifecycle

- Pointer tracking on window: pointermove and pointerdown (passive) set the target while the pointer is inside the host rect; before the first move the target sits at the centre.
- The loop runs continuously while the host is visible (the wave needs an animate clock even at rest); IntersectionObserver pauses when scrolled away and resumes with a reset dt; ResizeObserver re-measures and redraws. webglcontextlost stops permanently (default prevented). KHR_parallel_shader_compile is used when present: the first frame waits for link completion before drawing, and the program is deleted via a deferred retire loop so a still-compiling program is never destroyed.
- The engine ref exposes redraw(), and every render pass triggers one, so prop changes (palette, thickness, shape, wave, stiffness...) apply live without remounting.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete buffer and VAO, and either retire the program or explicitly lose the context if the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#3847ff", "#7c84ff", "#c7cbff"] | One ribbon per colour, up to 12; each accepts any CSS colour. |
| thickness | number | 30 | Max stroke width in px (before the per-ribbon profile). |
| length | number | 1.4 | Ribbon length / lag, 0.1–5. |
| spread | number | 18 | Lateral offset between neighbouring ribbon heads, in px. |
| stiffness | number | 0.5 | Spring frequency of the heads, 0–1. |
| bounce | number | 0.5 | Spring damping, 0–1 (0 is critically damped, 1 rings). |
| shape | "lens" \| "comet" \| "even" | "lens" | Width profile along each ribbon. |
| wave | number | 0 | Travelling sine bulges along the ribbons, 0–1. |
| softness | number | 0 | Extra edge feather, 0–1. |
| fade | boolean | false | Fades each ribbon toward its tail. |
| opacity | number | 1 | Overall stroke opacity, 0–1. |
| backgroundColor | string | "transparent" | Canvas clear colour (any CSS colour). |
| dpr | number | - | DPR override; defaults to devicePixelRatio clamped to 2. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Ribbons.jsx and Ribbons.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: three ribbons trail the pointer with independent spring lag and never tangle into one line; fast circular strokes show elastic overshoot that settles without endless ringing (bounce 0 calm, bounce 1 ringing); stiffness from 0 to 1 visibly changes tempo; length stretches the wake; spread fans the heads apart; shapes lens/comet/even are distinct; wave rolls three travelling bulges; fade dims tails; opacity and softness behave; backgroundColor tints the canvas (transparent stays see-through); adding/removing colours adds/removes ribbons live without remount; pointer events pass through the host to content underneath; resize and scroll pause/resume cleanly; unmount leaves no listeners or GPU objects; several hosts run independently; 375 / 768 / 1440 wide hosts without overflow.
