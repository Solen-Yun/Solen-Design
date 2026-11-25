Implement the "MagicRings" component from zero: concentric glowing rings that pulse outward in a wave — each ring flares to life in a staggered sequence, swells as the cursor approaches (the whole family scales up and the nearest line thickens), and a click fires a bright shock-wave ring that rolls outward through the family, momentarily inflating every ring it passes. Three motion modes: pulse (staggered beat), ripple (a single wavefront travelling ring by ring) and breathe (all rings expanding/contracting on a sine). An optional dispersion splits the glow into red/green/blue ghosts, a tilt leans the whole plane in perspective, and a light theme renders ink-on-paper instead of glow-on-black. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: MagicRings.jsx (entry, motion state, GLSL) and MagicRings.css. No runtime dependencies. No iframe.
- Root is `<div class="magic-rings">` (position relative, width/height 100%, overflow hidden) receiving className/style; inside is `<canvas class="magic-rings__canvas" aria-hidden="true">` (absolute inset 0, pointer-events none). Pointer input listens on the window.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. Canvas DPR = min(devicePixelRatio, maxDevicePixelRatio clamp 0.5–3). Missing context renders nothing.
- Three rendering passes per frame. (1) Glow: a full-screen fragment pass evaluates every ring's distance field into a half-resolution FBO — RGBA16F when EXT_color_buffer_float is available, otherwise RGBA8 with values stored packed (−log(1−x)) and unpacked at composite. (2) Compose: reads the glow texture, applies film grain (hash noise scaled by grain, jittering each frame), tone-maps (1 − exp(−peak) with a partial desaturation toward white above peak 1.4), adds ±0.5/255 dither, multiplies by opacity, and clamps rgb to alpha (premultiplied). (3) Line: each ring is an instanced 128-segment triangle strip projected through the tilt matrix with a perspective divide; the strip's radial band width is computed from a screen-space derivative so lines keep a constant pixel width under tilt, anti-aliased with a coverage ramp. Dark theme composites the lines additively (ONE, ONE_MINUS_SRC_COLOR); light theme uses plain premultiplied alpha.
- Shader variants are keyed by flags: LIGHT (light theme colour space), PRISM (dispersion > 0 — the glow samples the SDF at radius ∓ split and blends a three-channel chroma ghost), PACKED (no float FBO). Programs compile with KHR_parallel_shader_compile when present; the loop waits for completion and swaps the active variant in only when ready.
- Colour parsing accepts 3/6-digit hex and rgb()/rgba(), falls back to a canvas-2d probe for any other CSS colour, then to a violet default. The dark theme converts both colours to linear space; light keeps sRGB.

## Motion models

- Time advances dt × speed (frozen for reduced motion; starts at 0 for the intro, otherwise 1.6 so the first beat is already mid-flow). Ring slots: up to 12 rings + 3 burst rings, each carrying {radius, life (brightness 0–1.6), taper cut, rotation angle, x/y shift, colour mix}.
- Pulse: ring i's local clock t = time − i × 0.5 cycling every 3.45 s; life rises with smoothstep(0, 0.7, t) and falls from 0.5 to 3.25; radius = baseRadius + i × radiusStep + (1 − (1 − t/3.45)²) × expansion — a staggered outward beat.
- Ripple: period = 3.45 × max(1, count) × 0.32 s; one wavefront whose progress runs 0 → count−1 and loops; ring i shows only while its slot is active, fading in over the first 12% and out after 62%; radius = baseRadius + progress × (count × radiusStep + expansion).
- Breathe: wave = sin(time/4 × 2π − i × 0.55); radius = baseRadius + i × radiusStep + expansion × 0.5 × (1 + wave); life = 0.78 + 0.22 × wave, with a staggered 0.9 s rise per ring during the intro.
- Brightness taper: each ring's energy is cut = taper^index (taper ≥ 0.5) divided by its intro-opening fade, so outer rings glow weaker; the angular envelope exp(−cut·a³) shapes how much of each ring lights up at once.
- Intro: the family sweeps in ring by ring (opening smoothstep over the first 0.9 s of each ring's local clock) and ends once time passes (count + 2) × 0.5 + 3.45.

## Interaction

- Click shock-wave (clickBurst, not reduced motion): each pointerdown inside the container spawns a burst {start time, radius = max(0.04, baseRadius × 0.45)}, max 3 alive, culled after 1.1 s. Its wavefront (radius + age × 0.9 × scale) pushes nearby rings' radius up to +0.04 with a Gaussian bump and boosts their life up to +0.9 while passing; the burst also renders as its own bright expanding ring (width ×1.15, fading at power 1.5).
- Cursor: pointer position is normalized by min(width, height). A spring (stiffness 70, damping 2√70 × 0.9, integrated in 240 Hz sub-steps) eases the cursor point; a second spring (stiffness 40, damping 2√40 × 0.9) eases hover 0/1 with the pointer inside the container. Hover scales the whole family by 1 + (hoverScale − 1) × hover and boosts nearness (a Gaussian falloff of width ~0.17 around the cursor in plane space) which thickens lines ×(1 + 0.45 × nearness), brightens glow ×(1 + 1.6 × nearness) and multiplies by hoverIntensity.
- followMouse shifts the ring centre by the spring cursor × mouseInfluence. tilt (−80–80°) leans the projection plane; per-ring parallax shifts ring i by i × parallax × cursor (both axes), with the lean itself swayed by parallax × 260 × cursor — the family tilts toward the pointer.
- rotation (degrees) is the base angle; spin adds time × 0.6 × spin rad/s alternating direction per ring (odd rings counter-rotate) with a per-ring ×(1 + i × 0.15) multiplier.

## Performance & lifecycle

- The frame loop sleeps when settled: it stops while no spring is settling (velocity sums ≤ 1e-4), no bursts are alive, the intro finished, shaders are compiled, speed is 0 or motion is reduced — and wakes on pointer moves, resizes, visibility and prop updates.
- IntersectionObserver + visibilitychange suspend/resume; a ResizeObserver re-measures and re-renders.
- webglcontextlost freezes the loop; webglcontextrestored bumps a generation counter that rebuilds all GL state. Unmount cancels the frame, disconnects observers, removes listeners, releases shader variants (deferred per frame until parallel compilation completes), deletes buffers/textures/VAO/FBO, and drops the WebGL context once the canvas is detached. Same-page instances are independent.
- Reduced motion: time and springs freeze (still rendering), the intro and click bursts are disabled; hover scale and nearness are zeroed.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#A855F7" | Inner colour of the ring gradient; any CSS colour. |
| colorTwo | string | "#6366F1" | Outer colour the rings blend toward across the family. |
| ringCount | number | 6 | Number of rings, clamped 1–12. |
| motion | "pulse" \| "ripple" \| "breathe" | "pulse" | The animation model: staggered beat, travelling wavefront, or sine swell. |
| speed | number | 1 | Time scale of the motion; 0 freezes in place. ≥ 0. |
| lineThickness | number | 2 | Core line width in CSS px, ≥ 0.25, scaled by DPR. |
| glow | number | 1 | Halo strength, 0–3; drives the soft bloom around each line. |
| baseRadius | number | 0.35 | First ring radius in plane units (unit = min dimension). ≥ 0.01. |
| radiusStep | number | 0.1 | Radius increment per ring, ≥ 0. |
| expansion | number | 0.1 | How far rings swell within each cycle. |
| taper | number | 1.5 | Brightness falloff per ring index, ≥ 0.5. |
| rotation | number | 0 | Base rotation of the angular envelope, in degrees. |
| spin | number | 0 | Continuous spin rate (rad/s × 0.6), alternating direction per ring. |
| tilt | number | 0 | Plane tilt in degrees, −80–80, for the perspective lean. |
| dispersion | number | 0 | Chromatic aberration of the glow 0–1; splits it into RGB ghosts. |
| grain | number | 0 | Animated film grain over the composite, 0–1. |
| opacity | number | 1 | Overall canvas alpha, 0–1. |
| followMouse | boolean | false | Slides the ring centre toward the cursor. |
| mouseInfluence | number | 0.2 | How far the centre follows the cursor when followMouse is on. |
| hoverScale | number | 1.2 | Family scale while hovered, ≥ 0.5. |
| hoverIntensity | number | 1 | Multiplier on hover brightening/thickening, ≥ 0. |
| parallax | number | 0.05 | Per-ring cursor shift and plane sway strength. |
| clickBurst | boolean | true | Clicks fire a shock-wave ring (max 3 alive). |
| intro | boolean | true | Rings sweep in one by one on mount. |
| theme | "dark" \| "light" | "dark" | Glow-on-black or ink-on-paper rendering. |
| maxDevicePixelRatio | number | 2 | DPR ceiling, clamped 0.5–3. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of MagicRings.jsx and MagicRings.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: pulse beats outward ring by ring and loops cleanly; ripple sends one wavefront travelling through the slots; breathe swells all rings on a sine; the click shock-wave visibly inflates rings as it passes and draws its own expanding ring; hovering scales the family and thickens/brightens lines near the cursor; followMouse slides the centre; tilt leans the plane in perspective and line width stays constant in pixels; dispersion shows RGB-split ghosts; grain animates subtly; light theme renders legible ink on paper; ringCount/colours/taper/expansion all apply live; the loop sleeps when speed is 0 and motion settles; reduced motion freezes time and disables bursts/intro; canvas tracks its container at 375 / 768 / 1440 wide without overflow; context loss and restore recover; unmount leaves no listeners, observers or frame loop; same-page instances are independent.
