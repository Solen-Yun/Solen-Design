Implement the "MicroSlats" component from zero: a wall of thousands of tiny rounded slats that becomes a rolling sea in perspective — each slat is one cell of an offscreen field pass that evaluates four directional wave trains (with real water dispersion), then a screen pass draws every slat as an anti-aliased rounded pill whose length follows the local wave height. Crests catch a glint colour, distance sinks into fog, and the whole wall recedes toward a horizon. The cursor stirs an on-GPU fluid: dragging injects momentum that bends and leans nearby slats and leaves a glowing ink trail, clicking splashes three rotating jets; the fluid dissipates after the trail window. Four presets (swell, tide, storm, signal) bundle the wave look, and every wave parameter can be overridden individually. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components. Rendering may use a lightweight WebGL2 wrapper library (ogl ^1.0.11) for renderer/program/mesh plumbing, or hand-rolled equivalents.

## Structure & rendering

- React 18+ + CSS + WebGL2, two files only: MicroSlats.jsx (entry, fluid sim, GLSL) and MicroSlats.css. No other runtime dependency beyond the small WebGL2 wrapper (ogl ^1.0.11) — Renderer, Program, Mesh, Triangle, RenderTarget, Texture. No iframe.
- Root is `<div class="micro-slats">` (position relative, width/height 100%, overflow hidden) receiving className/style; the wrapper's canvas is appended by the component (block, 100%×100%, aria-hidden="true"). Pointer input listens on the window.
- Renderer: alpha true, premultipliedAlpha true, antialias false, depth false; if WebGL2 is unavailable the component stays blank. DPR = min(devicePixelRatio, 2, sqrt(4.5e6 / (width × height))) — a 4.5-megapixel budget. A ResizeObserver re-measures; resizes are deferred to the next frame.
- Grid: slat pitch = (slatWidth clamp 1–64 + gap clamp 0–64, slatHeight clamp 2–240 + gap); columns/rows = ceil((dimension + gap) / pitch) + 1, capped 2048; the grid is centred with an even remainder. The offscreen field target is a NEAREST-filtered texture with exactly one pixel per slat.
- Pass 1 (field, one pixel per slat) outputs per slat: light (0–1), span (length factor), tint (glint mix) and lean (rotation, from fluid flow). Pass 2 (screen) samples the field with texelFetch (including one horizontal neighbour when leaning) and composites anti-aliased rounded pills over the background colour, premultiplied.

## Wave field

- Perspective: horizon = mix(8, 0.5, perspective); each row's depth = (1 + horizon) / (v + horizon) with v the normalized height (0 = far) — slats near the horizon shrink, far rows scale up; fog haze = mix(1, 1 − fog, pow(1 − v, 1.4)) dims the horizon; world coordinates divide by height and depth.
- Four wave trains: each has an angle = direction + one of four fixed offsets (0, −0.95, 0.78, 1.62 rad), wavelength 2.6/1.7/1.12/0.76, amplitude weight 1/0.75/0.5/0.3 and a phase shift; dispersion ω = sqrt(9.81 × k) × 0.35. Each contributes height × (cos(θ) + steep × cos(2θ)) with steep = chop × 0.45; a two-sine meander bends the wave lines. level = clamp(0.5 + 0.5 × height / (total × 0.85), 0, 1).
- Light: crest = smoothstep(0.6, 1, level); glint = crest² × glint; light = (pow(level, contrast) + glint × 0.8) × haze, floored at 0.045 so the wall never fully blacks out. Span: slat length = clamp(mix(1 − stretch, 1, level) + glow × 0.3, 0.08, 1) — troughs shrink, crests lengthen. Tint: clamp(max(glint × 1.4, inkGlow × 0.9) + sweep, 0, 1) mixes toward the glint colour.
- Intro: introClock advances dt / max(0.2, introDuration), eased with cubic in-out; a reveal band sweeps up the screen (front = ease × 1.35) with a bright travelling highlight ring, leaving light floored at 0.045 × reveal behind it.

## Cursor fluid

- A small GPU fluid (velocity + ink + pressure as RGBA16F ping-pong pairs, divergence and curl targets) is built only when float render targets are supported; its grid is ~96 cells on the long side, aspect-scaled.
- Pointer moves (interactive, inside, not reduced motion) queue velocity strokes: force 6900 × (dx, dy) / height, ink 0.13, radius = pow(cursorSize clamp 4–600 / height, 2) × 0.35 — Gaussian exp(−d²/radius) falloff, aspect-corrected. Queue caps at 32 entries. The fluid stays hot for max(1.5, trail × 5) s after the last input, then clears.
- Click queues a splash: three jets evenly spaced from an advancing golden-angle turn, each with spin (±√½ blends), push = 6900 × 0.08 at 0.55 × radius, plus 0.75 ink at the jets and 0.45 at the centre.
- Simulation steps: curl → vorticity confinement (swirl clamp 0–2 × 40, only when swirl > 0) → divergence → pressure Jacobi × 16 iterations (previous pressure scaled 0.8) → gradient subtract → advect velocity (dissipation = 1/trail × 1.4) and advect ink (dissipation = 1/trail).
- Field coupling: fluid velocity shifts the wave-world sample position (× 0.00018 × depth), ink glows the slats (1 − exp(−ink × cursorStrength clamp 0–3 × 1.6)), and lean = clamp(flow.x / 1400, −1, 1) × lean — leaning slats rotate by (lean × tilt) where tilt derives from the slat geometry (asin of pitch/height ratios, ≤ 0.42 rad) so neighbours overlap believably.

## Presets & props

- Preset bundles (applied only to parameters left undefined): swell {scale 1.5, speed 0.6, direction 250°, chop 0.55, stretch 0, glint 0.7, contrast 1.25, perspective 0.55, fog 0.55}; tide {1.3, 0.5, 262°, 0.2, 0.12, 0.45, 1.1, 0.5, 0.4}; storm {0.55, 1.6, 236°, 1, 0.3, 1.3, 1.8, 0.8, 0.35}; signal {0.85, 1.2, 180°, 0.6, 0.85, 0.25, 1.2, 0, 0}. Any explicit scale/speed/direction/chop/stretch/glint/contrast/perspective/fog prop overrides the preset value.
- Colours parse through a canvas-2d probe (any CSS colour; fallbacks violet/white/black).

## Performance & lifecycle

- The frame loop sleeps when settled: it stops while paused (or reduced motion) with speed contributing nothing, the intro finished, and no fluid activity; it wakes on pointer input, resizes, visibility and prop updates. IntersectionObserver pauses offscreen; visibilitychange resumes.
- All props land in a ref refreshed every render — every option applies live without remount; colour changes go straight to uniforms, grid changes rebuild the field target.
- Reduced motion: time freezes, the intro is skipped, and pointer interaction is disabled — a static rendered sea remains.
- Unmount: cancel the frame, disconnect observers, remove listeners, dispose all render targets, remove the canvas from the DOM and drop the WebGL context. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| preset | "swell" \| "tide" \| "storm" \| "signal" | "swell" | Bundled wave look; undefined wave parameters inherit from it. |
| color | string | "#A855F7" | Base slat colour; any CSS colour. |
| glintColor | string | "#ffffff" | Crest/glint/ink highlight colour. |
| backgroundColor | string | "#000000" | Colour composited behind the slats. |
| slatWidth | number | 10 | Slat width in px, clamped 1–64. |
| slatHeight | number | 25 | Slat height in px, clamped 2–240. |
| gap | number | 3 | Gap between slats in px, clamped 0–64. |
| roundness | number | 0.75 | Pill corner rounding, 0–1 × the slat's smaller side. |
| scale | number | - | Wave spatial scale (preset default); lower = larger waves. ≥ 0.05. |
| speed | number | - | Wave time scale (preset default). |
| direction | number | - | Wave travel direction in degrees (preset default). |
| chop | number | - | Second-harmonic steepness 0–1.5 (preset default). |
| stretch | number | - | How much troughs shrink slats, 0–0.95 (preset default). |
| glint | number | - | Crest highlight strength ≥ 0 (preset default). |
| contrast | number | - | Light curve exponent, 0.2–4 (preset default). |
| perspective | number | - | Horizon pull 0–1 (preset default); 0 is a flat wall. |
| fog | number | - | Distance haze toward the horizon 0–1 (preset default). |
| interactive | boolean | true | Enables cursor fluid stirring and splashes. |
| cursorStrength | number | 1 | Ink glow brightness from the fluid trail, 0–3. |
| cursorSize | number | 40 | Fluid brush radius in px, clamped 4–600. |
| swirl | number | 0 | Vorticity confinement 0–2; adds curl to the fluid. |
| trail | number | 1.4 | Fluid persistence, 0.1–10; also sets how long it stays hot. |
| lean | number | 0 | How far slats rotate with fluid flow, 0–1. |
| intro | boolean | true | A reveal band sweeps the wall in on mount. |
| introDuration | number | 1.5 | Intro length in seconds, ≥ 0.2. |
| paused | boolean | false | Freezes the waves and fluid time. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of MicroSlats.jsx and MicroSlats.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: ogl at ^1.0.11.
- Validate: the slat wall rolls as a perspective sea with fog toward the horizon; crests lengthen and glint while troughs shrink; all four presets look distinct (storm is choppy and fast, signal is a flat wall); overriding scale/speed/direction/chop/stretch/glint/contrast/perspective/fog beats the preset; dragging bends slats and leaves a glowing trail that fades over trail seconds; clicking splashes three rotating jets; swirl adds curl; lean tilts slats with flow; slatWidth/slatHeight/gap/roundness rebuild the grid cleanly at any container size; the intro sweeps once and introDuration stretches it; paused freezes everything; reduced motion renders a static wall with no interaction; the loop sleeps when idle and offscreen; DPR stays within the pixel budget at 375 / 768 / 1440 wide without overflow; unmount leaves no listeners, observers, canvas or frame loop; same-page instances are independent.
