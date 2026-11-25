Implement the "PatternWaves" component from zero: a lit halftone surface that moves like draped silk — a dense grid of dots (or squares, plus-marks, connected lines, or ASCII glyph ramps) laid over an animated height field; each mark is lit by a moving directional light with a sharp specular glint, displaced vertically by the local wave height, and pushed around by a water-ripple simulation that follows the cursor. Three wave models: silk (long diagonal folds with noise-bent crests), swell (directional rolling waves) and ripple (radial rings fading with distance). Six presets bundle full looks (silk, ocean, pond, lines, terminal, mesh) and every parameter overrides individually. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components. Rendering may use a lightweight WebGL2 wrapper library (ogl ^1.0.11) for renderer/program/mesh plumbing, or hand-rolled equivalents.

## Structure & rendering

- React 18+ + CSS + WebGL2, two files only: PatternWaves.jsx (entry, ripple sim, glyph atlas, GLSL) and PatternWaves.css. No dependency beyond the small WebGL2 wrapper (ogl ^1.0.11) — Renderer, Program, Mesh, Triangle, RenderTarget, Texture. No iframe.
- Root is `<div class="pattern-waves">` (position relative, width/height 100%, overflow hidden) receiving className/style; the wrapper's canvas is appended by the component (block, 100%×100%, aria-hidden="true"). Pointer input listens on the window.
- Renderer: alpha true, premultipliedAlpha true, antialias false, depth false; blank without WebGL2. DPR = min(devicePixelRatio, 2, sqrt(4.5e6 / (width × height))). ResizeObserver re-measures, deferred to the next frame.
- Three passes. (1) Field: an offscreen NEAREST texture with one pixel per grid cell, each pixel packing {tone level, alpha, emphasis (specular/ink weight), lift}. (2) Ripple simulation: RGBA16F ping-pong pairs at 8 px cells (clamped 4–512 per axis), stepping the classic wave equation next = ((left+right+up+down) × 0.5 − previous) × 0.975, driven at 60 steps/s while active. (3) Marks: a screen pass that fetches the field (a 3-row neighbourhood per pixel) and draws the marks, displacing each by (lift − 0.5) × pitch vertically, compositing premultiplied over the background colour.

## Wave field

- World unit = 520 px × scale (clamp 0.2–5); heading = direction in degrees. Silk: 5.5 folds across the heading, phase = along × 5.5 + noise-bent crests (gradient noise 1.7× plus a low sine) − time × 0.45, height = (sin(phase) + 0.32 × sin(2·phase + 1.3)) × a noise swell; plus a small counter-running ripple. Swell: phase = along × 15 + noise bend × 2.2 − time × 1.4, height = 0.8 × (sin(phase) + 0.3 × sin(2·phase − 0.8)) × noise roll. Ripple: rings from a point offset along the heading, sin((r + bend) × 9 − time × 1.8) decaying with exp(−(r − 0.6) × 0.8).
- Lighting: normals from height differences (probe = max(pitch/dpr, 4) px); diffuse = dot(n, light) with the light direction at (direction + 180° + light degrees) × 0.78 in-plane and 0.62 up; specular = pow(dot(n, half-vector), 160) × shine × 1.15; tone = clamp(diffuse × (0.7 + 0.3 × height) × 0.78 + specular) then contrast-curved ((tone − 0.42) × contrast + 0.42).
- Ink mode: when the mark colour is darker than the background (luminance compare; on transparent backgrounds, darker than 0.5), the field flips to an ink-on-paper ramp (level = (1 − tone/0.46)^2.4 × 0.72) with emphasis from the level instead of the specular.
- Fades: none / edges (radial, zone = fadeSize) / center (hole fading in from 5%) / bottom / top, all smooth-stepped with fadeSize 0.05–1.
- The ripple texture adds its height × 0.32 to the wave height before lighting, so cursor waves genuinely relight and displace the marks.
- Intro (2 s, skippable): a radial sweep from the centre (appear band over reach × 1.35) combined with an amplitude rise (smoothstep of clock 0.1→1.0) — the surface builds up and spreads outward.

## Cursor ripples

- Pointer movement inside the container injects a segment impulse into the ripple sim: strength = min(move/14 px, 1) × 0.35 × cursorStrength, radius = cursorSize clamp 8–400 px, Gaussian along the stroke segment; clicks add a 1.2 burst. The sim steps at up to 60 Hz and stays active 5 s after the last input, then clears. Reduced motion or cursorStrength 0 disables it.

## Marks

- Patterns: dot (disc of 0.5 × pitch × √level), square (rounded box, 30% radius), plus (cross with arms scaled 0.3→1.0 × level and stroke-width stroke), glyph (an ASCII ramp — each cell draws the character at index floor(level × count) from an atlas), line (connected strokes: the pass interpolates between adjacent column cells, offsets each row's y by its lift, applies the slope and draws a stroke of max(stroke, pitch × markSize × level)).
- Glyph atlas: built on demand when the pattern is glyph and the character string changes — characters (default ".:-=+*#%@") drawn into a square grid of 128 px tiles, monospace at 500 weight, mipmapped for smooth minification.
- markSize scales every mark 0.05–1 × pitch; stroke = max(1.1 × dpr, pitch × 0.08) px (lines use 0.9 × dpr). Colour: marks mix toward an accent by emphasis — toward white on dark backgrounds (55% blend) or toward dark on light ones (35%); the background composites opaque beneath.
- Presets (applied only to parameters left undefined): silk {dot, silk wave, spacing 9, markSize 0.95, depth 0.95, light 0, shine 0.8, contrast 1.2, speed 0.35, scale 1, direction 20°}; ocean {dot, swell, 10, 0.9, 0.42, 0, 1, 1.2, 0.5, 1, 100°}; pond {dot, ripple, 10, 0.9, 0.55, 0, 1.2, 1.2, 0.5, 1, 35°}; lines {line, silk, 12, 0.42, 0.9, 0, 0.6, 1.2, 0.3, 1, 20°}; terminal {glyph, ripple, 13, 0.95, 0.75, 0, 0.9, 1.4, 0.3, 1.1, 200°}; mesh {plus, silk, 14, 0.8, 0.95, 0, 1, 1.45, 0.4, 1.1, 325°}.
- Colours parse through a canvas-2d probe (any CSS colour; fallbacks white/black).

## Performance & lifecycle

- The frame loop sleeps when settled: stops while paused (or reduced motion) with no speed, the intro finished, the ripple sim inactive and no pending dirty state — wakes on pointer input, resizes, visibility and prop changes. IntersectionObserver pauses offscreen; visibilitychange resumes.
- All props land in a ref refreshed every render — every option applies live without remount; colour changes go straight to uniforms, spacing/pattern changes rebuild the field target, character changes rebuild the atlas.
- Reduced motion: time freezes, the intro is skipped and the ripple sim is off — a static lit pattern remains.
- Unmount: cancel the frame, disconnect observers, remove listeners, dispose the ripple pair and field targets and the atlas texture, remove the canvas, drop the WebGL context. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| preset | "silk" \| "ocean" \| "pond" \| "lines" \| "terminal" \| "mesh" | "silk" | Bundled look; undefined parameters inherit from it. |
| pattern | "dot" \| "square" \| "plus" \| "line" \| "glyph" | - | Mark shape (preset default). |
| wave | "silk" \| "swell" \| "ripple" | - | Height-field model (preset default). |
| spacing | number | - | Grid pitch in px, clamped 4–120 (preset default). |
| markSize | number | - | Mark scale within its cell, 0.05–1 (preset default). |
| depth | number | - | Lighting/displacement strength 0–1.5 (preset default). |
| light | number | - | Light direction offset from anti-heading, −90–90° (preset default). |
| shine | number | - | Specular strength, 0–2 (preset default). |
| contrast | number | - | Tone curve exponent, 0.3–3 (preset default). |
| speed | number | - | Wave time scale (preset default). |
| scale | number | - | Wave spatial scale, 0.2–5 (preset default); lower = larger waves. |
| direction | number | - | Wave travel direction in degrees (preset default). |
| color | string | "#ffffff" | Mark colour; any CSS colour. |
| backgroundColor | string | "#000000" | Backdrop colour composited under the marks. |
| opacity | number | 1 | Overall canvas alpha, 0–1. |
| fade | "none" \| "edges" \| "center" \| "bottom" \| "top" | "edges" | Where the pattern dissolves out. |
| fadeSize | number | 0.5 | Fade zone width, 0.05–1. |
| characters | string | ".:-=+*#%@" | Ascending-density ramp for the glyph pattern. |
| interactive | boolean | true | Enables the cursor ripple simulation. |
| cursorSize | number | 50 | Ripple brush radius in px, clamped 8–400. |
| cursorStrength | number | 0.6 | Ripple injection strength, 0–1. |
| intro | boolean | true | 2 s radial sweep-in with rising amplitude. |
| paused | boolean | false | Freezes the waves and ripple sim. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of PatternWaves.jsx and PatternWaves.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: ogl at ^1.0.11.
- Validate: silk folds drape with bent crests and travelling glints; swell rolls directionally; ripple emits radial rings fading outward; all six presets look distinct; overriding pattern/wave/spacing/markSize/depth/light/shine/contrast/speed/scale/direction beats the preset; dragging genuine water ripples through the marks relights and displaces them; clicking punches a burst; dot/square/plus/line/glyph render crisply (glyph switches characters live via the atlas); ink mode keeps dark marks readable on light backgrounds; fades dissolve correctly in all five modes; intro sweeps once; paused freezes; reduced motion renders a static lit pattern with no ripple; the loop sleeps when idle and offscreen; DPR stays within the pixel budget at 375 / 768 / 1440 wide without overflow; unmount leaves no listeners, observers, canvas or frame loop; same-page instances are independent.
