Implement the "LiquidEther" component from zero: a full-bleed WebGL2 fluid field — a glowing, coloured liquid that swirls exactly under the cursor. Moving the pointer injects momentum strokes into a grid-simulated velocity field; the field is made divergence-free by a pressure projection, advected and slowly dissipated, and the display pass colours the liquid by local flow speed through a small gradient palette, so slow eddies glow dim and fast jets flare toward the palette's hot end. Clicking fires a directional burst along the pointer's motion; while nobody interacts a wandering auto-demo stroke keeps the liquid alive; on first paint a sweeping intro stroke arcs across the canvas. A light-ink mode renders hollow ink for pale backgrounds. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: LiquidEther.jsx (entry, simulation loop, GLSL) and LiquidEther.css. No runtime dependencies. No iframe.
- Root is `<div class="liquid-ether">`: position relative, width 100%, height 100%, overflow hidden; it receives className/style. Inside is `<canvas class="liquid-ether__canvas" aria-hidden="true">`, absolute inset 0, 100%×100%. All pointer input is listened to on the window, so overlaying content keeps working.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference "high-performance". If webgl2 is missing or neither EXT_color_buffer_float nor EXT_color_buffer_half_float exists, the component silently renders nothing (no fallback UI).
- Geometry is a single 3-vertex full-screen triangle (corners from gl_VertexID). Seven fragment programs share one header (highp float/sampler2D, vUv, uTexel): splat (segment stroke), smooth (viscosity blur), divergence, pressure (Jacobi solver), project (gradient subtract), advect (semi-Lagrangian with a BFECC-style back-corrected step and a 4-tap clamped bilinear fetch), display. Simulation targets: RG16F velocity, R16F divergence and pressure, LINEAR filter, CLAMP_TO_EDGE, ping-pong swapped via target maps.
- Canvas DPR = min(devicePixelRatio, maxDevicePixelRatio, sqrt(2.4e6 / (cssWidth × cssHeight))) — a 2.4-megapixel budget. Sim grid: base scale = resolution × 0.5 of the CSS size, shrunk further so total cells ≤ 140000, each axis clamped 16–1024. A ResizeObserver re-measures and only rebuilds targets when the grid dimensions actually change.

## Simulation pipeline

- Each frame dt is clamped to 1/30 s. Queue order: intro/auto/pointer strokes (splats), then one queued click puff, then simulate, then render.
- Splat: each stroke is a capsule segment (previous → current point in CSS px); velocity delta = (Δ/dt) × scale, clamped to ±6000; injection weight exp(−d²·6.0 / radius²) over segment distance.
- Viscosity: ceil(viscosity × 4) blur passes; each blends the centre sample toward the 4-neighbour average with amount min(1, viscosity×4 − pass) × 0.9.
- Divergence: central differences; open edges sample zero, bounceEdges mirrors the centre value (edge = −1).
- Pressure: 32 Jacobi iterations, each sampling neighbours at 2-texel reach and clamping out-of-bounds samples to 0 (walls) or leaving them open, then sum×0.25 − divergence.
- Project: velocity −= 0.5 × (right−left, up−down) of pressure.
- Advect: back-trace start = uv − velocity × dt/size, one back-corrected half-step, then a clamped bilinear 4-tap (min/max clamped to keep energy bounded), multiplied by keep = 0.5^(dt / (0.35 + persistence² × 12)) — persistence 0 dies in a third of a second, 1 lingers ~12 s.

## Display pass

- Velocity is resampled with a separable cubic B-spline (4 taps × 2 axes) at display resolution. speed = |v| × uSpeedScale, where uSpeedScale = 1.25 × intensity / (0.84 × max(cssWidth, cssHeight)). level = speed < 0.75 ? speed : 0.75 + 0.25 × tanh((speed − 0.75) × 4).
- The palette is a 256×1 RGBA8 texture rebuilt only when the colours change (joined key): each prop colour is parsed (3/6-digit hex or rgb()/rgba(), else skipped; empty list falls back to white), converted sRGB→linear, and the strip interpolates between stops with a smoothstep ease.
- Dark mode: ink = palette(level); hot = 1 − exp(−max(speed − 0.75, 0) × 1.2) pushes fast cores toward min(ink×1.8 + 0.06, 1) — white-hot centres on fast jets. Light mode: alpha = smoothstep(0.08, 0.5, level) × mix(0.85, 0.1, hollow) with hollow = smoothstep(0.7, 1.6, speed), giving hollow dark-ink shells that thin out where flow is fastest.
- Compositing: color = ink × alpha + background.rgb × background.a × (1 − alpha); background is parsed from backgroundColor ("transparent" → fully transparent). An ordered grain of ±0.5/255 (fract(52.98… hash of gl_FragCoord)) dithers flat areas. Output is premultiplied and clamped to the coverage alpha.

## Interaction & motion

- Pointer strokes: window pointermove (passive). The pointer is "inside" only within the container rect; entering re-seeds the stroke origin. Velocity direction is smoothed (30% blend). Each move queues one stroke from the previous to the current position with scale (mouseForce / 20) × 0.15 × pace (pace = min(1, dt×60)); radius = cursorSize clamped 4–600.
- Click burst: pointerdown inside the container (and not reduced-motion) queues a puff along the smoothed pointer direction (or a random angle if at rest): segment ±cursorSize×0.5 around the point, velocity 1400 × (mouseForce / 20) along that direction, radius ×0.9; at most 4 puffs queue, one drains per frame.
- Auto demo: when autoDemo is on, not reduced-motion, the pointer is outside and now − lastInput > autoResumeDelay ms, a virtual cursor follows wander(t) = 0.62·sin(0.83t+1.3) + 0.38·sin(1.71t+0.4) (x) and 0.6·sin(1.07t+2.1) + 0.4·cos(0.61t+0.7) (y), scaled to ±41% of the container size, with phase advancing dt × autoSpeed × 1.6. Intensity ramps up over 0.8 s (ramp²) with gusts 0.3 + 0.7·sin²(phase×2.6); stroke scale = (mouseForce / 20) × 0.45 × autoIntensity × ramp² × gust × pace. Any real input resets the ramp and suppresses the demo until the delay elapses again.
- Intro: when intro is on (first mount only, not reduced-motion) a sweep stroke runs 1.4 s: eased angle from −0.6 to 3.0 rad around centre, reach growing 8%→38% of the size, stroke scale 0.2 × sin(π × t/1.4) so it fades in and out.
- Frame loop self-sleep: the loop keeps requesting frames only while the intro runs, auto demo is armed, energy (= energy × keep each frame) > 0.002, puffs remain, or a pointer move is pending. IntersectionObserver and visibilitychange pause/resume; prop changes, resizes and pointer events wake it. Everything is driven from one rAF; wake re-renders once immediately.

## Lifecycle

- Settings live in a ref updated on every render, so every prop applies live without remounting; the palette texture refreshes lazily when the colours key changes.
- webglcontextlost: preventDefault, cancel the loop. webglcontextrestored: bump a generation counter whose value is a useEffect dependency — the whole GL setup is re-created cleanly.
- Reduced motion: intro sweep skipped, auto demo disabled, click bursts disabled; pointer strokes still work and the fluid settles quickly.
- Unmount: cancel the frame, disconnect observers, remove every window/document listener, delete all textures, framebuffers, the VAO and programs (skipped gracefully if the context is already lost). Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#5227FF", "#FF9FFC", "#B497CF"] | Gradient palette the flow speed maps onto, dim to hot. 3/6-digit hex or rgb()/rgba() entries; unparsable entries are skipped, empty falls back to white. |
| intensity | number | 1 | Overall speed sensitivity; higher makes the liquid light up sooner and brighter. Floored at 0. |
| mouseForce | number | 20 | Strength of pointer strokes; 20 is the calibrated reference. Floored at 0. |
| cursorSize | number | 100 | Radius of the stroke brush in px, clamped 4–600. |
| persistence | number | 0.75 | How long motion lingers, 0–1; 0 fades in ~0.35 s, 1 trails for seconds. |
| viscosity | number | 0 | Blurring passes over the velocity field, 0–1; smooths fine filaments into soft swirls. |
| resolution | number | 0.5 | Simulation grid scale, 0.05–1; higher is sharper but heavier, always capped at 140k cells. |
| bounceEdges | boolean | false | Mirrors flow off the container edges instead of letting it escape. |
| clickBurst | boolean | true | Clicks fire a directional gust along the pointer's motion. |
| autoDemo | boolean | true | An invisible cursor keeps stirring the liquid while idle. |
| autoSpeed | number | 0.5 | Pace of the auto-demo wander path. Floored at 0. |
| autoIntensity | number | 2.2 | Stroke strength of the auto demo. Floored at 0. |
| autoResumeDelay | number | 1000 | Idle delay in ms before the auto demo takes over after the last input. |
| intro | boolean | true | Plays a one-off sweeping stroke across the canvas on first mount. |
| lightMode | boolean | false | Hollow dark-ink rendering for pale backgrounds instead of glowing ink on dark. |
| backgroundColor | string | "transparent" | Css colour composited under the ink; "transparent" keeps the canvas see-through. |
| maxDevicePixelRatio | number | 2 | DPR ceiling, clamped 0.5–3, also bounded by the pixel budget. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of LiquidEther.jsx and LiquidEther.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: strokes follow the cursor with force and brush size visibly changing behaviour; fast flicks leave white-hot cores in dark mode and hollow shells in light mode; the palette blends smoothly across all stops; clicking bursts along the motion direction and queues cleanly under rapid clicks; the auto demo takes over after the idle delay, fades in without a jolt, and any input hands control back instantly; the intro sweep plays once on mount; persistence 0 dies quickly and 1 trails long; viscosity smooths the field progressively; bounceEdges reflects flow at the edges; every prop updates live without remount; the canvas fills any container size and stays within the pixel budget at 375 / 768 / 1440 wide without overflow; prefers-reduced-motion disables intro, auto demo and bursts; hidden tabs and offscreen containers cost no frames; context loss and restore recover; unmount leaves no listeners, observers or frame loop; same-page instances are independent.
