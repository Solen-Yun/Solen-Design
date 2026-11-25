Implement the "GridScan" component from zero: a 3D wireframe grid room rendered in one WebGL2 fragment shader — the eye floats just inside the entrance and drifts with parallax, a laser scan plane sweeps the room front-to-back lighting the cells it passes, hover spots land where the cursor ray hits the walls, clicks fire expanding ping rings or trigger a sweep, and the whole scene gets an additive bloom. Optional webcam head-tracking drives the eye (script + model weights loaded at runtime from addresses baked into the code), and an ink-on-paper light theme inverts the rendering. Full specification follows; it must not depend on external pages, videos, images, or font files.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GridScan.jsx (entry, eye/scan/ping state, all shaders) and GridScan.css (all styles). React >= 18; no runtime dependencies bundled. No iframe.
- Root is a `<div class="grid-scan">` — position relative, width 100%, height 100%, overflow hidden, accepting className, style and extra DOM props — with a single `<canvas class="grid-scan-canvas" aria-hidden="true">` absolutely filling it. The container must be sized by the parent.
- WebGL2 context with alpha: true, premultipliedAlpha: true, antialias: false, depth/stencil: false. Four programs: ROOM renders into a framebuffer with two colour attachments (scene + energy/glow), DOWN downsamples the glow, BLUR blurs it in two passes, COMPOSITE adds bloom over the scene with a dither. Context or program failure renders nothing and never throws.
- Room geometry: the interior box spans x ±0.5 × aspect, y ±0.5, z from 0 (eye-side opening) back to roomDepth = `depth` snapped to whole cells (cells clamped 2–40, one cell = 1/round(cells) of the height, width cells adjusted for aspect so cells stay square). Each visible pixel traces a ray from the eye to the first wall/floor/ceiling it hits (analytic slab intersection), then draws that face's grid in face UV space.
- Eye: fixed 1.25 units behind the opening at z = −1.25; its lateral position springs toward the look target (stiffness 42, damping 11, integrated in ≤ 1/120 s substeps). Target = look × parallax × 0.22 × aspect. look sources: pointer hold (interactive, not reduced) maps the cursor across the container to ±1 with a 220 ms release timer on leave; otherwise a slow two-sine idle sway breathes when parallax > 0 and motion is allowed. Optional device-orientation deltas steer the same look.
- Grid lines: per face, minor lines (every cell) at 75% strength and major lines (every 4th cell) at 100%, drawn with analytic antialiased coverage (line half-width = thickness × DPR × 0.5 px, warped per pixel by the projected texel footprint). lineStyle: "solid" plain lines; "dashed" breaks lines every dash period; "dotted" draws crossing point grids. Depth fade: exp decay toward the back scaled by depthFade (0–1). Reveal: during the intro only cells in front of the scan plane are lit, so the room materialises as the first sweep passes.
- Scan plane: sweeps along z. Startup intro (2.2 s) is itself a sweep from −0.2 to roomDepth + 0.2 with alpha easing in over the first sixth and out over the last 15%. After that, when autoScan is on, the scan waits scanDelay seconds (default 1.6) and repeats scanDuration-second sweeps; scanDirection "forward" runs eye → back, "backward" the reverse, "pingpong" alternates. Scan light on each face: a gaussian core band (width = 0.006 × scanWidth in room units, at least the pixel footprint), an exponential trail extending scanDir-behind the plane (length 0.04 + trail × 1.1, trail 0–1), and a small spill term feeding surface shading. The front (eye-side) face receives the core at 45% so the beam reads volumetric.
- Points: when points is on, each cell sprays deterministic hash-placed dots (spacing cell/2.5, radius shrinking with depth, culled below ~5 px spacing) that flicker on per-dot sine phases; dots light up hot (toward the core white) from scan/ping energy and warm from trail/wake/hover energy, fading with depth and reveal.
- Hover: the cursor's ray hit point eases (rate 1/0.08 s) while hovering (interactive, not reduced) and lights nearby cells with a gaussian (σ² 0.08) scaled by an eased strength (1/0.25 s in, slower out).
- Click pings: clickEffect "ping" casts the ray into the room and spawns an expanding sphere shell (max 4 concurrent, life 2.4 s): a thin bright ring (gaussian on shell distance, alpha ramping in 50 ms, (1 − k)² out) plus a soft wake filling the interior. Radius grows 1.15 units/s. clickEffect "scan" starts a fresh sweep instead; "none" disables clicks.
- Reflection: the floor mirrors the scene — a second trace from the mirrored eye with grazing-angle gain ((1 − view.y)⁴ × reflection × exp(−travel × 1.1)), blurred proportional to travel, so the lit floor shows a dampened reflection of the walls.
- Shading: corner/edge occlusion creases (1 − exp(−gap/0.16)), a lamp falloff 1/(1 + z² × 0.9) per face with per-face tilt factors; dark mode paints subtle white shading plus scan-colour spill; light mode paints the same terms as darkness (shadow) instead. Haze: for pixels beyond the scan plane a faint animated-grain veil (edge rim brighter) with depth-faded alpha sells the beam.
- Bloom: the glow attachment is downsampled to quarter resolution, blurred horizontally then vertically (spread 2.2 × DPR / 2), and composited additively where the scene is transparent, scaled by glow × (dark 1.6 / light 0.8), with per-pixel dither noise. glow 0 skips the passes.
- Colors: linesColor/scanColor parse any CSS colour string via a canvas fill probe (cached). Defaults follow the theme: dark lines #4d4757 / scan #7dd3fc; light lines #d4d4d8 / scan #0284c7. The laser core is scanColor pushed toward white in dark mode, equal to scanColor in light mode.

## Webcam head tracking (optional, off by default)

- enableWebcam: lazily injects a face-detector script and loads its tiny model weights from addresses baked into the component (modelsPath overrides the weights address; no bundle-time dependency). Then requests getUserMedia({ facingMode: "user", 640×480 }) and feeds a hidden mirrored `<video>`.
- A detection loop (every 40 ms) runs the tiny detector (input 224, score threshold 0.45); the face box maps to look (box centre offset × 1.3) and to eye distance (near = 0.32 / box-width ratio, clamped 0.6–1.6) while a face is present, all smoothed (factor 0.45 after lock). Losing the face for 12 consecutive rounds releases control back to the pointer. Internal state exposes itself through a status label: "Loading face tracking" → "Looking for a face" → "Tracking" → "Camera unavailable" on failure.
- showPreview: false keeps the video hidden (1 px, opacity 0); true shows a 168 px mirrored preview card bottom-right (rounded, dark glass) with the status chip overlaid. Cleanup stops all tracks, clears the video and releases head control; the tracker affects nothing unless a face is actively tracked.

## Loop & lifecycle

- The rAF loop keeps running while anything is busy: intro playing, autoScan active (not reduced), a sweep in flight, pings alive, the eye spring settling, hover strength > 0.002, parallax idle sway (not reduced), or dot flicker during an active scan. When everything settles it sleeps; pointer, visibility change, resize or prop changes wake it. dt clamped to 0.05 s.
- Resize: DPR = min(devicePixelRatio, dpr prop or 1, 2); scene/glow targets reallocate. ResizeObserver + IntersectionObserver gate rendering while off-screen.
- Reduced motion: the idle sway freezes and auto sweeps pause; the still room keeps hover lighting and manual interactions other than motion-driven ones.
- Unmount: cancel the frame, clear timers, disconnect observers, remove all listeners, delete textures/framebuffers/VAO/programs, and lose the GL context if the canvas is already detached. Same-page instances are fully independent.
- Gyro (enableGyro, off by default): the first click requests permission where the API requires it; device orientation deltas from a first-reading baseline steer the look (gamma/25, beta/−25). Head tracking takes priority over both pointer and gyro while active.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| linesColor | string | "#4d4757" dark / "#d4d4d8" light | Grid line colour (any CSS colour). |
| scanColor | string | "#7dd3fc" dark / "#0284c7" light | Scan beam and energy colour. |
| cells | number | 8 | Grid cells per room height, 2–40. |
| lineThickness | number | 1 | Line weight multiplier, 0.5–4. |
| lineStyle | "solid" \| "dashed" \| "dotted" | "solid" | Line pattern of the grid. |
| depth | number | 3 | Room depth in cell-snapped units, 0.5–12. |
| depthFade | number | 0.6 | 0–1: exp fade of lines toward the back wall. |
| parallax | number | 1 | 0–3: how far the eye wanders with the look. |
| points | boolean | true | Hash-placed flickering dots in the cells. |
| reflection | number | 0.35 | 0–1: floor mirror strength. |
| shading | number | 0.7 | 0–1: lamp shading and scan spill on surfaces. |
| scanDirection | "forward" \| "backward" \| "pingpong" | "forward" | Sweep direction of the scan plane. |
| scanDuration | number | 2.4 | Seconds per sweep, 0.3–20. |
| scanDelay | number | 1.6 | Seconds between sweeps, 0–30. |
| scanWidth | number | 1 | Core band thickness multiplier, 0.2–5. |
| trail | number | 0.5 | 0–1: length of the glow trail behind the plane. |
| glow | number | 0.6 | 0–1.5: bloom strength; 0 skips the bloom passes. |
| autoScan | boolean | true | Sweeps repeat automatically after scanDelay. |
| interactive | boolean | true | Pointer look, hover spots and clicks. |
| clickEffect | "ping" \| "scan" \| "none" | "ping" | Click behaviour: expanding ring, instant sweep, or nothing. |
| enableWebcam | boolean | false | Head tracking: loads the detector script + weights at runtime and opens the camera. |
| showPreview | boolean | false | Shows the mirrored camera preview card with the status label. |
| modelsPath | string | built-in weights address | Where the detector weights load from. |
| enableGyro | boolean | false | Device-orientation steering of the look. |
| intro | boolean | true | The first sweep reveals the room over 2.2 s. |
| lightMode | boolean | false | Ink-on-paper rendering with adjusted default colours. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of GridScan.jsx and GridScan.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the room materialises with the intro sweep and lines stay crisp at any cells/thickness; auto sweeps repeat with the configured delay/duration and respect forward/backward/pingpong; the beam lights cells it passes with trail and bloom; hover drops a spot where the ray hits each wall (correct through perspective); clicks fire expanding pings (or a sweep with "scan", nothing with "none"); the floor reflection dampens with distance; points flicker and light near energy; pointer look swings the eye with the damped spring and idle sway breathes between interactions; depthFade shapes the tunnel; lightMode inverts to ink; enableWebcam shows the status flow and hands control to the face, releasing it when the face is lost (camera failure degrades to "Camera unavailable" without breaking the scene); reduced motion freezes idle motion; 375 / 768 / 1440 widths render without overflow; scroll-away/tab-away sleep the loop; unmount leaves no timers, listeners, observers, camera tracks or GL objects.
