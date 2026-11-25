Implement the "SwarmCursor" component from zero: a liquid swarm of up to 2000 particles that flows after the cursor like a living fluid. The swarm crowds into a soft blob around the pointer, curls into eddies stirred by a real grid-fluid simulation, streams around any hovered button as an orbiting ring, and answers clicks by bursting apart or by a ripple wave rolling through it. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: SwarmCursor.jsx (entry, fluid grid, particle sim, shaders) and SwarmCursor.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="swarm-cursor">` (plus any className, extra props spread onto it): position relative, width 100%, height 100%, overflow hidden — it fills its host box. Inside: an absolutely positioned full-size canvas (aria-hidden, pointer-events none) and, when children are provided, a `.swarm-cursor-content` wrapper (relative, full size) that hosts the interactive content the swarm reacts to. The component also injects a tiny stylesheet defining `.swarm-cursor-hidden` / descendants as cursor:none !important, toggled on the root when hideCursor is on and the pointer is inside.
- WebGL2 context (alpha, premultipliedAlpha, antialias false). One program: an instanced vertex shader expands each particle into a quad oriented along its velocity (corner buffer + three instanced attributes: position/heading, length/width/alpha/tint, softness/shape); the fragment shader SDF-draws circles (dot), rounded squares (square) or long capsules (streak) with soft antialiased edges (edge width 0.6/DPR + softness), fades the tail of stretched particles, and tints toward the accent colour by speed. Premultiplied blending (ONE / ONE_MINUS_SRC_ALPHA), depth off.

## Fluid grid (CPU)

- A velocity grid covers the host: cell ~16px, columns clamped 8–72, rows clamped 8–48 (cell recomputed as max(w/cols, h/rows)). Fields are Float32Arrays: flowX/flowY, divergence, pressure, curl, plus previous-frame copies for advection.
- Stirring around the anchor (the pointer, or the idle anchor): within a 2.2 x spread radius, grid cells are dragged toward the anchor's smoothed velocity (grab saturates at 240px/s of anchor motion), a vortex adds tangential flow (strongest while the intro gathers, scaled by speed), and a two-wave sin/cos curl-noise field (wander) churns cells continuously.
- Hover ring: when the pointer rests on an element matching the targets selector (found via elementFromPoint + closest, must be inside the container), a signed rounded-rect field around that element's box (its computed border-radius is respected) drives the flow: cells just outside the box get tangential velocity circulate = 230 * (0.4 + 0.6 * speed) * ring.spin, spinning particles around the widget in layered bands (band offset grows with each particle's home radius). ring.spin is chosen once per hover from the swarm's current angular momentum so the ring never fights the swarm.
- Flow step each frame: vorticity confinement (strength swirl * cell * 9), semi-Lagrangian advection with exponential fade (time constant 0.35 + 1.5 * swirl), reflective boundaries, divergence, 12 Jacobi pressure iterations, gradient subtract.

## Particles

- Up to 2000 particles (Float32Array state: position, velocity, z, plus seeded traits). Each particle: follows the sampled flow (rate 10 * (1 - 0.6 * tail * heft)), springs toward the anchor (gather 12 * loose, plus 30 * loose for the part of the distance beyond the spread radius, loose = 1 - 0.6 * tail), is repelled from neighbours closer than gap = spread * sqrt(pi / count) * 1.6 (spatial hash, repulsion 4000 with q^2 falloff), is held onto the hovered element's rounded-rect field when a ring is active (stiffness 70 outside / 140 inside), and bounces off 8px soft walls. The z axis carries a bob: lift = sin(time * bobRate + phase) * spread * 0.55 (0.15 in a ring), integrated as a damped spring (stiffness 36, damping 9).
- Simulation runs in two half-dt steps per frame. Seeded traits (deterministic xorshift): orbit radius 0.08–1 x spread (sqrt-distributed), heft rand^2, bob phase/rate, per-particle size grain 0.55–1.45, twinkle phase.
- Draw: particles are alpha-sorted back-to-front by z (insertion sort over a stable order array). Depth scales each particle by 1 + depth * 0.6 * near (near = z / (0.55 * spread) clamped), blurs far/near ones via edge softness (depth * size * 1.4 dark / 0.35 light * |near|^1.6), dims the far ones, and twinkles alpha 0.86–1 at 3.1Hz. Particles stretch along velocity: length = width + min(speed * trail * 0.02, body * 14) (streak shape: width * 2.6 + min(speed * trail * 0.03, body * 18)). Fast particles (380px/s and up) blend toward accentColor; a click flash and ripple also tint.
- Intro: particles start scattered across the whole viewport and are sucked into the cluster over 1.4s (smoothstep ease, vortex strongest at the start). With intro={false} or prefers-reduced-motion they start gathered.
- Click effects (clickEffect): "burst" kicks particles outward within 2.2 x spread (kick 780, falloff by distance) with a 0.3s accent flash, plus an alternating-direction vortex twist (520) injected into the fluid around the click; "pulse" rolls a wave ring outward at 520px/s for 1.6s that swells (width +80%) and tints particles as it passes, plus a gentle 160 kick; "none" does nothing.
- Idle (idle): "roam" — the anchor drifts on layered sine curves around the centre; "gather" — the anchor sits at the centre; "hide" — the swarm's presence eases to 0 (0.25s time constant). When the pointer is inside, the anchor is always the pointer.
- Reduced motion / enabled={false}: simulation and fluid stop; the last cluster is drawn statically (reduced motion seeds it centred) and the hidden-cursor class is cleared.

## Interaction & lifecycle

- Pointer events on window: pointermove (passive) tracks inside/outside, pointerdown fires the click effect, pointerup/pointercancel clears inside for touch, pointerleave on the document root clears inside. ResizeObserver re-allocates the grid and canvas (DPR = min(dpr prop or devicePixelRatio, 2)); IntersectionObserver + visibilitychange pause and resume the loop (the loop runs continuously while visible and enabled, and stops after one static frame when disabled or reduced).
- Unmount: cancel the frame, clear the hidden-cursor class, disconnect observers, remove every listener, delete buffers, VAO and program, and explicitly lose the WebGL context if the canvas is already detached. Same-page instances are fully independent. All settings are read from a ref each frame, so prop changes apply live.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| count | number | 800 | Number of particles, 1–2000. |
| size | number | 2.6 | Base particle size in px, 0.5–16. |
| shape | "dot" \| "square" \| "streak" | "dot" | Particle silhouette. |
| color | string | - | Particle colour; defaults to white on dark, near-black on light. |
| accentColor | string | - | Colour for fast/flashing particles; defaults to color. |
| spread | number | 90 | Cluster radius around the anchor in px, 20–400. |
| speed | number | 1 | Overall tempo of stirring, orbiting and roaming, 0–4. |
| swirl | number | 0.6 | Vorticity confinement and flow persistence, 0–1. |
| tail | number | 0.5 | How loose and laggard the swarm's outer members are, 0–1. |
| trail | number | 0.6 | Velocity stretch of particles, 0–3. |
| wander | number | 0.5 | Curl-noise churn in the fluid, 0–2. |
| depth | number | 0.7 | Z-axis bobbing with size scaling, blur and dimming, 0–1. |
| targets | string | "a, button, [data-swarm-target]" | Selector matched against the hovered element to form the orbit ring. |
| idle | "roam" \| "gather" \| "hide" | "roam" | What the swarm does while the pointer is away. |
| clickEffect | "burst" \| "pulse" \| "none" | "burst" | Click behaviour of the swarm. |
| hideCursor | boolean | false | Hides the native cursor and draws a dot particle at the pointer. |
| intro | boolean | true | Gathers the swarm from a full-screen scatter on mount. |
| enabled | boolean | true | Runs the simulation; false freezes a static frame. |
| lightMode | boolean | false | Ink particles for light hosts (also the default colour source). |
| dpr | number | - | DPR override; defaults to devicePixelRatio clamped to 2. |
| children | ReactNode | - | Interactive content the swarm reacts to, layered above the canvas. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of SwarmCursor.jsx and SwarmCursor.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the swarm flows after the cursor with eddies and never collapses into overlap; hovering a button pours the particles around it as a ring (respecting border-radius) and releases cleanly; clicking bursts the swarm and it re-gathers; "pulse" rolls a visible wave; shapes dot/square/streak all read clearly; trail stretches fast particles and accentColor tints them; idle roam/gather/hide each behave; intro gathers from a full-screen scatter; hideCursor hides the native cursor and draws the dot; lightMode reads as ink on light hosts; count from 50 to 2000 stays smooth; resizing, tab switches and scroll pause/resume without leaks; prefers-reduced-motion and enabled=false freeze to a static cluster; unmount leaves no listeners or GPU objects; several instances with their own buttons run independently; 375 / 768 / 1440 wide hosts without overflow.
