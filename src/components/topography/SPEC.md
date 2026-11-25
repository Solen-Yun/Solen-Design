Implement the "Topography" component from zero: a 3D landscape drawn entirely in glowing contour lines — an endlessly scrolling heightfield of soft ridges rendered as elevation isolines, viewed from a tilted camera; the cursor ray-picks the terrain and lifts a smooth hill under itself (or traces one contour line, or holds a lamp), clicking sends a ring pulse through the ground or raises a lasting peak, and the whole scene carries bloom, fog, depth of field, optional survey markers and a scanline glitch. Light-page ink output is included. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: Topography.jsx (entry, camera, pick ray-marcher, GL setup) and Topography.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="topography-container">` (plus caller className, caller style), position relative, width 100%, height 100%, overflow hidden; its only child is a `<canvas class="topography-canvas" aria-hidden="true">`, display block, width/height 100%. The host owns the size.
- WebGL2: alpha true, premultipliedAlpha true, depth true, stencil false, antialias only when the DPR ratio is below 1.5, powerPreference high-performance. Extensions: KHR_parallel_shader_compile (programs link asynchronously, the first frame waits for completion; optional programs that fail are dropped and a CPU/GPU fallback path used), EXT_color_buffer_float (enables the baked field path; without it terrain height and normals are evaluated per-vertex in the shader and bloom reads RGBA8).
- Canvas pixels = CSS × min(dpr prop || devicePixelRatio, 2).
- Programs: terrain (instanced triangle strips, vertex shader places grid vertices, fragment draws isolines), field bake (fullscreen, dual RGBA16F + R32F targets), sculpt (fullscreen, 256² RG16F ping-pong), downsample, separable blur (×4 levels), composite, and markers (instanced quads). One empty VAO serves everything (gl_VertexID/gl_InstanceID geometry).

## Terrain model

- Height function `relief(t)`: value noise with a uint-lattice hash (2654435761/2246822519 mix-shift-multiply), quintic fade; the base coordinate is warped by two low-frequency noise offsets that drift with `morph` (× 0.37, × 0.23 per second), then three octaves at weights 0.55/0.15/0.04 with rotated octave offsets (1.6,−1.2 / 1.2,1.6); shaped by softplus s = log(1 + e^(7(3n + 0.05)))/7, height = s² × 1.4 + 0.1n. Frequency = 0.45 / scale. Fine detail adds noise × 5 frequency × 0.1 × detail.
- Travel: the camera drifts over the plane along `direction` (forward/backward/left/right) at speed × 0.8 units/s; morph keeps regenerating the landscape. Height multiplies by elevation × 1.7.
- Baked path (float targets available): a field pass renders terrain (carved height, pulse ring, ground height) into a (gridColumns+7)×(gridRows+7) window each frame; the terrain vertex shader texel-fetches the centre and 4 neighbours for height and central-difference normals; the fragment re-fetches a baked height texture with bicubic sampling for per-pixel contour precision. Fallback path evaluates relief analytically per vertex/fragment.
- Chunked grid: a camera-centred lattice with cell size chosen from the focal length and near distance (clamped 0.02–0.4) so the drawn cell count stays under 200k (shrinks the cell if needed); the frustum footprint (rays at ±1.08 NDC corners, near plane pushed above the tallest possible hill, far at the fog end) bounds the grid.
- Contours: line index lc = h × lineCount + 0.5; distance to the nearest isoline uses fract divided by the screen-space density sqrt(gx²+gy²) for width in pixels; every 5th line is major (wider and brighter, ×1.6 glow); dense areas get a crowd boost; screen-pixel `lineWidth` scales with perspective sqrt(refDepth/depth) clamped 0.6–1.6.
- Depth of field: softness = 1 + min(depthOfField × |1 − focus/depth| capped, max) — the focus distance springs toward the picked terrain depth (τ 0.35s), so the cursor spot stays crisp and the rest blurs.
- Fog: fadeStart/fadeEnd derive from the ground-plane exit distance and horizon (fog 0–1 pulls the horizon in); a smootherstep on depth multiplies the light.
- Sun shading: normal-based, sun = (−0.81, 0.58, −0.02); brightness level mixes 0.45→1.05 by height, 0.35→1.25 by sun², + heat × 1.4 + ring × 3 + lamp × 1.2.
- Cursor heat: heat = exp(−d²/(0.9 × mouseRadius)²) × strength(+ trail × 0.6) around the picked point; energy (heat + pulse ring) widens and brightens nearby lines.
- Output: tone-mapped 1 − exp(−color × light × 1.8), premultiplied alpha, 1/255 dither; lightMode prints the ink directly (ink = (1 − exp(−light × 1.8)) × 0.92 × opacity in the line colour).
- Click pulses lift terrain too: swell(t) sums up to 4 pulses as exp rings (radius age × 4.2, strength exp(−age × 1.1) × smoother(age/0.08), life 4s) added to the height × 0.14.

## Interaction

- Picking: a ray-march (200 adaptive steps, gap-proportional, then 10 bisection refinements) against the CPU height function from the camera through the pointer NDC; returns the hit point (world x/z, y, depth) or null. Runs only while engaged (pointer inside + mouseInteraction).
- hoverEffect — three modes:
  - "lift" (default): a sculpt brush carves the terrain — a 256² RG16F wrap-around texture (span 48 world units) ping-pongs each frame; the brush paints along the segment from the previous hit to the current one (Gaussian radius 1.1 × mouseRadius, target 0.9 × mouseStrength, rate 1 − exp(−dt × 7)), heights and heat decay with τ = 0.25 + 3 × trail²; a >3-radius jump re-anchors the stroke. Sculpt life keeps rendering for 6τ after the cursor leaves.
  - "trace": one isoline at the picked elevation lights up (uTrace level eases toward the hit height at τ 0.09s, trace strength τ 0.2s), drawn with a wider stroke (× 1.8) that fades by exp(−d²/20) from the cursor.
  - "light": only the lamp — a point light 1.4 units above the hit point with inverse-square falloff, no sculpting.
- clickEffect — "pulse" (default) drops a ring pulse at the picked point (max 4); "peak" raises a lasting hill via the sculpt burst channel (Gaussian radius 1.6 × mouseRadius, amount eased over 0.7s × 0.9 × max(mouseStrength, 0.3), decaying with the trail τ).
- Parallax: pointer NDC leans the camera yaw/pitch by up to ±0.09/±0.045 × parallax through a spring (stiffness 38, damping 11).
- Glitch (glitch > 0): random scanline bands — 1–3 bands at random rows (height 3 + rand² × 14% of height), horizontal shift ±(10 + 46 × glitch) px with 1–3px RGB split and dropped blocks (>0.82 rolls to 10% brightness), re-rolled every 0.04–0.09s; bursts last 0.1–0.32s and re-arm after (9 − 7.4 × glitch) × (0.45–1.55)s; clicking triggers a 0.16s burst. Markers and terrain both shift with the bands.
- Markers ("plus" crosses or "dots"): instanced quads on a 1.25-unit grid, placed on the terrain height (+0.05); ~8% blink on a sine (rate 1.4–3.6); size 4px × perspective scale, ×(1 + 0.4 heat + 0.35 blink); blinking/hot markers grow a 2.6× square frame; glow accumulates blink/heat/ring; depth-tested (LEQUAL) without depth writes, premultiplied blending.
- Pointer events on window (passive move/down/up/cancel), documentElement pointerleave; touch pointerup/cancel treats as leave.

## Timing & lifecycle

- Intro (2.8s, skipped when intro=false or reduced motion): rise = smoother(intro) scales camera clearance/lift (× 0.18/× 1.3) and terrain height; reveal = smoother(intro/0.35) gates the light.
- Camera: tilt (12–90°, default 32) and elevation (0–3) ease toward their props at τ 0.4s; pitch clamps just below vertical; camera distance ≥ 9 and set by clearance over the tallest hill.
- prefers-reduced-motion: travel/morph/glitch freeze, tilt/elevation snap, intro completes instantly; cursor interactions (pick, lift, trace, lamp, pulses) still respond and decay.
- Frame-loop self-sleep: after 0.5s of quiet (nothing animating, no settling springs, no pulses, no sculpt) the loop stops; it wakes on pointer events, visibilitychange, resize, intersection re-entry, prop changes or dpr changes.
- ResizeObserver on the container; IntersectionObserver pauses off-screen; hidden tab pauses.
- Context loss: prevented default + stop; `webglcontextrestored` bumps a generation that rebuilds the whole effect. Unmount waits for async link completion (or releases lazily), deletes every texture/framebuffer/renderbuffer/program/VAO, removes all listeners, and force-loses the context once the canvas is detached.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#4f7cff" | Line colour, 3/6-digit hex. |
| lineCount | number | 22 | Contour lines per height unit, clamped 2–80. |
| lineWidth | number | 1.2 | Line width in device px, floored at 0.2. |
| majorLines | boolean | true | Every 5th line renders wider and brighter. |
| elevation | number | 1 | Terrain height scale, clamped 0–3. |
| foreground | number | 0.2 | Near-field weight (how flat the foreground settles), 0–1. |
| scale | number | 1 | Terrain zoom, clamped 0.2–5. |
| detail | number | 0.35 | Fine noise detail, 0–1. |
| tilt | number | 32 | Camera pitch in degrees, clamped 12–90, eased. |
| speed | number | 0.25 | Travel speed across the landscape; 0 stops the drift. |
| direction | "forward" \| "backward" \| "left" \| "right" | "forward" | Travel direction. |
| morph | number | 0.2 | Rate the terrain regenerates while drifting. |
| glow | number | 0.6 | Bloom strength; 0 skips the whole bloom pipeline. |
| depthOfField | number | 0.4 | Blur away from the focus distance, 0–1. |
| fog | number | 0.35 | Distance fade, 0–1. |
| brightness | number | 1 | Overall line brightness, floored at 0. |
| opacity | number | 1 | Overall opacity, 0–1. |
| mouseInteraction | boolean | true | Enables picking, hover effects and parallax. |
| hoverEffect | "lift" \| "trace" \| "light" | "lift" | What the cursor does to the terrain. |
| mouseRadius | number | 1 | Brush/lamp/heat radius, floored at 0.1. |
| mouseStrength | number | 0.6 | Brush target height and heat strength, floored at 0. |
| trail | number | 0.3 | How long sculpted shapes persist (decay τ 0.25–3.25s), 0–1. |
| parallax | number | 0.5 | Camera lean toward the pointer, 0–1. |
| clickEffect | "pulse" \| "peak" | "pulse" | Clicking sends a ring pulse or raises a lasting peak. |
| markers | "none" \| "plus" \| "dots" | "none" | Survey markers on the terrain. |
| glitch | number | 0 | Scanline glitch intensity, 0–1. |
| intro | boolean | true | Camera rises out of the terrain on mount (2.8s). |
| lightMode | boolean | false | Prints the lines as coloured ink for light pages. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Topography.jsx and Topography.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: contour lines flow over an endlessly travelling landscape with major lines visible; the cursor lifts a smooth hill that follows the pointer and decays at the trail rate; trace lights exactly one isoline and light holds a lamp without sculpting; click pulse rings travel outward through the lines and peak leaves a decaying mound; depth of field keeps the focus under the cursor and blurs with distance; bloom, fog, brightness, opacity, lineCount/lineWidth/majorLines, scale/detail/elevation/tilt/speed/direction/morph all take effect; markers render in both styles and blink; glitch bands shift and split with dropped blocks and clicking triggers a burst; lightMode prints ink on white; reduced motion freezes travel/morph/glitch and snaps intro while interactions still respond; resize keeps the view; off-screen and hidden tabs stop the loop; context loss and restore recover; unmount leaves no listeners, GL objects or frame loop; 375 / 768 / 1440 wide without overflow.
