Implement the "Ferrofluid" component from zero: a glossy sea of magnetic fluid in perspective — a dark pool where swells of spikes roll in with the flow field, rise and collapse like ferrofluid under a magnet, the cursor raises a smooth crown mound that pulls spikes toward it, and clicking detonates an expanding ring wave that heaves the surface as it travels. Trihexagonal spike lattices, studio-light reflections, a tilting viewpoint, distance fog and an ink mode for light pages. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Two files: Ferrofluid.jsx (entry, GL setup, camera fit) and Ferrofluid.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="ferrofluid-container">` (plus caller className/style; optional mixBlendMode merged inline), position relative, width 100%, height 100%, overflow hidden; its only child is `<canvas class="ferrofluid-canvas" aria-hidden="true">`, absolute inset 0. The host owns the size.
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; silent no-op without it. One VAO with a 3-vertex big triangle. DPR clamped to 2. Height-field textures are RGBA16F when EXT_color_buffer_float is present, otherwise RGBA8 (which forces snap-to-target settling).

## Three-pass pipeline

- SIM pass: a double-buffered height field over the visible ground patch, texel grid at 1/3 world-unit cells; each texel stores (height, velocity, mound, 1). The target height comes from a magnetic field: `magnetism × (0.03 + swell²)` where swell is a smoothstepped value-noise flow field (domain-warped by two noise offsets, drifting against flowDirection × time × 0.55, second octave 2.03×) — the cursor adds a gaussian `strength × exp(−d²/r²)` plus a wider softer mound, and a click pulse adds a gaussian ring `envelope × exp(−ring²/width²)` whose front runs at worldHeight × 0.45 per second, width 1.4, fading by exp(−age × 1.1) and dying at age 4. Springs integrate toward the target with sub-steps ≤8 ms: velocity += (150 × (target − height) − damping × velocity) × h, damping = 22 − fluidity × 15, height clamped ≥ 0; layout changes, reduced motion or missing float textures snap heights directly. The intro (2.4 s, skipped when intro=false or reduced motion) smoothsteps a reveal front outward from the world origin (radius = reveal × reach), so spikes grow in from the centre.
- BOUNDS pass: a coarse 1-unit-cell texture storing the max height over each 9×9 neighbourhood (top ×1.05 + mound) and peak height — the raymarch accelerator.
- RENDER pass: a perspective raymarch (FOV 38°). The camera sits at pitch (90 − tilt)° fitted so the world height (22/scale) fills the frame; rays skip in ≤64 coarse chunks using the bounds texture, then sphere-trace up to 48 steps with gap-scaled, clearance-limited stepping (clearance derived analytically from the spike profile), plus 3-iteration relaxation over smooth mound-only regions and a 4-step bisection refine on hit. The surface height = mound + spike lattice: a trihexagonal cosine lattice (three cosines at 120°, constant G ≈ 7.2552) slowly rotated (time × 0.35) and wobbled by turbulence × 0.06; profile shaped by sharpness (roundness/exponent/span derived: sharper = pointier spikes, flatter valleys); distance detail fades spikes by pixel angle and fog. Slopes come from analytic lattice gradients plus field-texture differences.
- Shading: normal from the slope, reflection ray, Fresnel F0 = 0.06, rim at grazing angles; dark mode sums three studio area lights reflected in the panels — key light panel, two vertical strips and an elevation-graded fill — tone-mapped 1 − exp(−light × exposure), exposure = 3 × brightness; distance fog 1 − smoothstep(fogStart = camera distance × 0.95, far). Light mode shades a paper surface from lambert + room luminance mixed by Fresnel, exposure-scaled, with the strip colour tinting shadows.

## Output modes

- colors maps to the three studio lights (key/strip/fill, up to 3 entries, missing entries inherit); color is the base/background (any CSS colour, parsed via a cached canvas probe; default deep dark).
- transparent (default): premultiplied additive glow with alpha = max channel × fog × opacity; false composites additively over the base colour, opaque.
- lightMode: transparent prints ink (shade minus (1 − cover), premultiplied) for light pages; opaque mixes base → paper by coverage × opacity.

## Pointer, timing & lifecycle

- Pointer events live on window (passive move/down/up/cancel); the pointer position is unprojected onto the ground plane; pointerleave on documentElement clears inside; touch releases inside on up. The cursor point eases toward the pointer with time constant mouseDampening seconds (0 snaps) and snaps on first entry when strength < 0.05; its strength eases to mouseStrength × 1.4 (0.35 s time constant) and snaps within 0.001.
- Time: wander += dt × speed × motion (paused = 0); dt clamped 0.5–50 ms; reduced motion freezes wander, intro and pulses.
- Frame loop: continuous requestAnimationFrame while visible and the tab is shown (the sea always breathes); hidden tab and off-screen (IntersectionObserver) stop it; visibility/resize/pointer/prop changes wake it; a dpr prop change re-lays-out.
- Resize: ResizeObserver refits the camera, regenerates the field-grid extents from the ground-plane corners (±3 margin) and marks one settle frame.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete both state targets, bounds target, programs, buffer and VAO, force-lose the context when detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#ffffff", "#ffffff", "#ffffff"] | Studio light colours: key, strip, fill (up to 3). |
| speed | number | 0.5 | How fast the flow field drifts; 0 freezes it. |
| scale | number | 1.6 | View zoom of the sea, clamped 0.2–6. |
| spikeHeight | number | 1 | Peak spike height, floored at 0. |
| sharpness | number | 2.5 | Spike pointiness, clamped 0.6–6. |
| turbulence | number | 1 | Flow-field warp and lattice wobble, floored at 0. |
| fluidity | number | 0.5 | Spring damping reduction (0 stiff – 1 loose), clamped 0–1. |
| tilt | number | 48 | Camera angle from the horizon in degrees, clamped 10–70. |
| magnetism | number | 1 | Base field strength raising spike swells, floored at 0. |
| variation | number | 0 | Flow-field seed; reweaves the swell layout only. |
| flowDirection | "up" \| "down" \| "left" \| "right" \| "none" | "down" | Axis the flow field drifts along. |
| brightness | number | 1 | Reflection exposure, floored at 0. |
| mouseInteraction | boolean | true | The cursor raises a crown mound that attracts spikes. |
| mouseStrength | number | 1 | Cursor field strength, floored at 0. |
| mouseRadius | number | 0.22 | Cursor influence radius (fraction of world height), clamped 0.02–2. |
| mouseDampening | number | 0.15 | Cursor follow lag in seconds; 0 snaps. |
| clickPulse | boolean | true | Clicking sends an expanding ring wave through the fluid. |
| intro | boolean | true | Spikes grow in from the centre over 2.4 s. |
| lightMode | boolean | false | Ink-on-light rendering for light pages. |
| transparent | boolean | true | Transparent canvas; false composites over color. |
| color | string | - | Base/backdrop colour (any CSS colour string). |
| opacity | number | 1 | Output opacity, clamped 0–1. |
| paused | boolean | false | Freezes the flow and springs but keeps rendering. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| mixBlendMode | CSSProperties["mixBlendMode"] | - | Blend mode merged into the container style. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Ferrofluid.jsx and Ferrofluid.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: spike swells roll in with the flow field and freeze at speed 0; the cursor raises a smooth mound whose nearby spikes lean in, easing in and out; clicking sends a ring wave that heaves the surface and decays; intro grows the sea from the centre; tilt 10–70 reframes the viewpoint and scale zooms; sharpness morphs spikes from round bumps to needles; colors recolour the three studio lights and brightness changes exposure; lightMode prints legible ink on white both transparent and opaque; paused freezes the sea but keeps cursor easing; reduced motion stands still with no intro/pulse; resize, tab-hide and off-screen never stretch or leak; unmount leaves no listeners, textures, programs or frames; 375 / 768 / 1440 wide without overflow.
