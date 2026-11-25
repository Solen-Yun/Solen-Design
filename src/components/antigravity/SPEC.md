Implement the "Antigravity" component from zero: a calm field of thousands of small particles that lifts into a glowing ring around the cursor — captured particles orbit the pointer like a halo, deform with a travelling conic wave, tint themselves from an oklab palette, and blast outward on click with a charged impulse. Particles come in capsule/sphere/box/tetrahedron shapes with depth parallax, per-particle pulse, and motion streaks. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Antigravity.jsx (entry, CPU simulation, shaders) and Antigravity.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.antigravity` (position relative, width/height 100%, overflow hidden) holding one `canvas.antigravity__canvas` (absolute, inset 0, 100% x 100%, aria-hidden). Extra className and style are forwarded to the container.
- Context: webgl2 with alpha, premultipliedAlpha, powerPreference high-performance, no depth/stencil/antialias. Uses the KHR_parallel_shader_compile extension when present: the program links asynchronously and the first frames wait on its completion status; on failure the component stops silently (no fallback UI). A context-lost event stops the loop; context-restored rebuilds everything (component holds a generation counter that re-runs the effect).
- Rendering is GPU instancing: one 4-vertex triangle strip per particle, instanced `count` times. Per-instance attributes: position (x, y) + velocity (vx, vy) updated every frame from the CPU simulation; seed vec4 (depth in -1..1, pulse phase, two randoms). The vertex stage builds a screen-space quad around the particle oriented along a direction: capsule shapes stretch toward the velocity (streaks, width 0.17 x size, length up to 2.5x by speed), sphere/box shrink toward ambient, tetrahedron uses a 2D SDF triangle; bounds swell by a soft margin for far particles (negative depth), scaled by per-particle pulse (sin(time * pulseSpeed + phase) * 0.22 * particleVariance), depth (1 + z * 0.32 * depthFactor) and ring proximity (captured particles grow: 1 + charge * 0.25 * ring).
- Fragment stage draws an antialiased 2D SDF per shape (capsule/box/tetra use a soft edge from vSoft; alpha < 0.002 discarded), reads colour from a 256x2 palette texture (row 0 = conic wrap, row 1 = radial clamp), premultiplied output. u-coordinate: conic mode = angle around the cursor (continuous hue sweep with per-particle jitter), radial mode = distance/(ring*2.4), random mode = one flat stop per particle.
- Palette: `colors` (or single `color`) are parsed (3/6-digit hex or rgb()/rgba(), else ignored) and converted to oklab. Row 0 builds a hue-closed loop (last stop = first), row 1 a clamped ramp; chroma is preserved across each segment. Light mode caps lightness per stop below a warmth-dependent ceiling (0.62..0.76) by boosting chroma; empty palette falls back to white (light: near-black). Rebuilt only when palette or lightMode changes.
- Layout: particles sit on a shuffled jittered grid covering the viewport + 6% margin, with per-particle home, band (-1..1), phase, agility 0.75–1.25, delay, orbit state; depth seeds are sorted so values spread evenly.

## Simulation (CPU, per frame)

- World scale: 31.5 world units span the viewport height. Cursor ring radius = ringRadius * unit, shrunk 38% while charged; magnet radius = magnetRadius * unit; capture band edge = 18% of magnet radius; ring band width = 6 world units (min 1px).
- Targets: home position plus a slow vertical bob (sin(time * 0.7 + phase) * 0.12 * unit * waveAmplitude). Inside the capture band, particles blend toward the cursor ring: radius ringRadius + wave — a conic ripple (0.6 * sin(angle * waveCount - time * waveSpeed * 2) + 0.4 * sin(phase + time * waveSpeed * 1.3)) * waveAmplitude * 0.5 * unit — plus a per-particle band offset x (5 / (fieldStrength + 0.1)) * unit; captured particles also accumulate orbit rotation (rotationSpeed + charge * 3) * ease * dt and keep spinning while previously captured.
- Spring integration: omega = 2.2 + lerpSpeed * 80, per-particle agility multiplier, damping 1.64 * omega, 1–4 sub-steps.
- Cursor: spring (stiffness 49, damping 14) toward the pointer; when autoAnimate is on and the pointer has been idle > 2s (or interactive is off), the target is a slow lissajous drift around the centre. Charge: holding the pointer down ramps 0->1 over 0.9s, decays 4/s after release; release fires a burst — a radial impulse kick of strength (0.45 + charge) * unit * 110 with Gaussian falloff over reach max(magnet, ring) * 1.8, scaled by agility (only when clickBurst and not reduced).
- Intro (3s window): particles start below their homes (height * (0.45 + delay * 0.4)) and alpha fades in over 0.6s while they spring up; ring pulse growth and reveal ease with the clock.
- Depth: seed z drives parallax of the capture centre (up to 12% x depthFactor), size, alpha fog (far particles dim 35% x depthFactor) and soft edges.
- prefers-reduced-motion: time advances at 0.3x pace, no click bursts, auto spin x 0.3; intro skipped on first generation.

## Scheduling & lifecycle

- The loop runs while the container intersects the viewport and the page is visible; resize is coalesced to the next frame (canvas sized to CSS size x min(devicePixelRatio, maxDevicePixelRatio), further clamped by a 2.4M pixel budget). ResizeObserver + IntersectionObserver + visibilitychange wake the loop; pointer events (window-level pointermove/down/up/cancel, pointerleave on the document element) track an inside flag.
- Every prop change wakes the loop once (a wake hook); palette texture updates lazily when the palette key changes.
- Unmount: cancel the frame, disconnect observers, remove every listener, delete buffers, texture, vertex array and programs (an async-compile program is retired when its completion status resolves); if the canvas is already detached the WebGL context is explicitly lost. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| count | number | 1500 | Particle count, clamped 1–20000. |
| magnetRadius | number | 9 | Capture reach around the cursor, >= 0. |
| ringRadius | number | 7 | Radius of the halo ring, >= 0. |
| waveSpeed | number | 0.4 | Travel speed of the ring's conic wave. |
| waveAmplitude | number | 1 | Ring wave amplitude, >= 0. |
| waveCount | number | 3 | Number of wave lobes around the ring, >= 0. |
| particleSize | number | 0.9 | Base particle size, >= 0. |
| lerpSpeed | number | 0.05 | Spring snappiness toward targets, 0.001–1. |
| color | string | - | Single palette colour; overrides colors. |
| colors | string[] | ["#5227FF", "#FF9FFC", "#B497CF"] | Palette stops (hex / rgb() / rgba()). |
| colorMode | "conic" \| "radial" \| "random" | "conic" | How particles sample the palette. |
| colorSpeed | number | 0.05 | Conic hue rotation speed. |
| autoAnimate | boolean | true | Cursor drifts on its own when the pointer idles. |
| particleVariance | number | 1 | Size/pulse variation between particles, >= 0. |
| rotationSpeed | number | 0 | Orbit speed of captured particles. |
| depthFactor | number | 1 | Depth parallax/fog strength, >= 0. |
| pulseSpeed | number | 3 | Per-particle breathing rate. |
| particleShape | "capsule" \| "sphere" \| "box" \| "tetrahedron" | "capsule" | Particle silhouette. |
| fieldStrength | number | 10 | Tightness of the band offsets around the ring, >= 0. |
| ambient | number | 0.25 | Size/alpha of particles outside the ring, 0–1. |
| interactive | boolean | true | Pointer drives the cursor (off = auto drift only). |
| clickBurst | boolean | true | Release after holding blasts particles outward. |
| intro | boolean | true | Particles rise into place and fade in on mount. |
| lightMode | boolean | false | Lightness-capped palette for bright backgrounds. |
| opacity | number | 1 | Canvas opacity 0–1. |
| maxDevicePixelRatio | number | 2 | DPR cap, 0.5–3 (further limited by a 2.4M pixel budget). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Antigravity.jsx and Antigravity.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: particles lift into the ring as the cursor enters and fall back to their grid when it leaves; the conic wave travels around the ring and hue rotates; holding charges the ring (tighter, brighter, spinning faster) and releasing blasts particles outward; shapes capsule/sphere/box/tetrahedron all draw antialiased; colorModes conic/radial/random re-map the palette live; changing count preserves in-flight particles where possible; auto drift takes over after the pointer idles; intro rises once; light mode keeps the palette readable on white; prefers-reduced-motion slows time and disables bursts; resize keeps the grid aligned; context loss stops and restore rebuilds; unmount leaves no listeners, observers, GL objects or frame loop; 375 / 768 / 1440 wide without overflow.
