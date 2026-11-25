Implement the "ShapeWaves" component from zero: a grid of small triangles, circles and squares on a dark canvas that brighten, shift tint and grow as rolling waves of value noise drift through them; moving the cursor drops water-like splashes into a wave-equation field that ripples outward through the grid, lifting cells through three brightness bands as the ripple passes; optional text can be masked into the field so only the cells inside the glyphs light up. Rendering is WebGPU via a small helper dependency, the ripple simulation runs on the CPU. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: ShapeWaves.jsx (entry, ripple simulation, WGSL shaders, text mask rasterizer) and ShapeWaves.css (layout + reveal fade). React >= 18. Runtime dependency: the `vgpu` helper package (WebGPU bootstrap and tiny wrappers: `init`, `surface`, `target`, `effect`, `uniforms`, `sampler`, `storage`, `frame`; every wrapper exposes `.set()` for uniforms/binding swaps, `.resize()`, `.destroy()`, and `gpu.onError(cb)` / `gpu.dispose()`).
- Root is a `<div class="shape-waves">` (plus caller className), position relative, width 100%, height 100%, overflow hidden, pointer-events none, isolation isolate; inline `backgroundColor` from the prop; `aria-hidden="true"`; attribute `data-ready` flips to `"true"` on the first presented frame. Its only child is a `<canvas class="shape-waves__canvas">`, position absolute inset 0, width/height 100%, opacity 0 with a 600ms cubic-bezier(0.22, 1, 0.36, 1) fade-in until data-ready; under prefers-reduced-motion the transition is removed. The host owns the size (typical usage: a 100%-wide, fixed-height positioned box).
- Canvas pixel size = client size × DPR clamped to 2. Grid: cols = round(canvasWidth / (cellSize × DPR)) (min 1), cellPx = canvasWidth / cols (so cells are square in pixels), rows = floor(canvasHeight / cellPx) (min 1), and the grid is vertically centred via origin y = (height − rows × cellPx) / 2.
- Pipeline: a scene pass draws the cell field; when glow > 0 the scene renders into an offscreen rgba8unorm target, is blurred horizontally then vertically into two ping-pong half-res targets (Gaussian weights, sigma 4, premultiplied-alpha-aware on the first pass), and composited onto the surface as scene + glow × (2 × glow prop). With glow 0 the scene pass draws straight to the surface. All pipelines are precompiled once (`effect.compile`), the frame is submitted through the helper's `frame(gpu, fn)` with sequential passes.
- Uniform block: resolution (w, h, 1/w, 1/h), placement (origin x, origin y, rows, introProgress), grid (cellPx, dotSize clamped 0.1–1, shape mode, cols), field (noise cell size = 32 × cellPx × scale, brightness bias, contrast gain, time), motion (drift x/y, mask-on flag, fade), color, hover (colour + glow-enabled flag), background.
- Colour parsing accepts 3/6-digit hex (with or without `#`); unparsable colour falls back — color #929292, hoverColor #ffffff, backgroundColor #000000.

## Field, bands and shapes (fragment shader)

- Each pixel maps to a cell = floor((pixel − origin) / cellPx); cells outside the grid output the background. Cell centre = origin + (cell + 0.5) × cellPx; local = (pixel − centre) / (cellPx × 0.5) is the ±1 shape space.
- Text mask: when text is non-empty, a mask texture sampled at cell-centre UV hides cells (outputs background) wherever mask red > 0.5.
- Edge fade: with fade > 0, a superellipse radius q = (|2u−1|^2.5 + |2v−1|^2.5)^(1/2.5) normalized by 2^(1/2.5) is fed to `level = 1 − smoothstep(max(0, 1 − fade×2.2), 1, radius)`, dimming cells toward the edges.
- Tone: value = fbm(3D Perlin `cnoise`, 2 octaves, amplitude halving) at ((centre + drift) / (32 × cellPx × scale), time); tone = clamp((value×0.5+0.5 − (0.5 − (brightness − 0.5)×0.4)) × 2.8 × contrast + 0.5, 0, 1); band = floor(tone × 3) clamped to 0–2 — the three brightness levels.
- Ripple charge: a storage buffer holds one f32 per cell (row-major, row × cols + col); stepped = (band + floor(charge×3)) % 3. Charge is the water height at that cell (see simulation), so a passing ripple visibly re-lights cells through all three bands.
- Shapes: mixed mode picks per stepped value — 0 → isosceles triangle, 1 → circle, 2 → square (shape = 2 − stepped), all at full dotSize; a fixed mode (squares/circles/triangles) keeps one shape and scales size = dotSize × mix(0.45, 1, stepped/2), so dim cells shrink. Triangle SDF: standard isosceles SDF with apex up, height 2c, half-width c, offset so it sits centred. Coverage = smoothstep(2/cellPx, −2/cellPx, sdf) for antialiasing.
- Tint = mix(color, hoverColor, max(smoothstep(0.15, 0.85, charge), introFront × 0.35)): resting waves tint subtly toward the hover colour, ripple crests and the intro rim strongly. Final rgb = mix(background, tint, coverage × level).
- Output: with glow off the pass is opaque (rgb, 1). With glow on, alpha carries only the bloom contribution — clamp((luminance of tint × level − 0.6) / 0.4) × coverage — and the composite pass adds that blurred texture × 2 × glow onto the scene colour.
- Intro (replayable): progress runs 0 → 1.66 over introDuration seconds. Each cell has spread = radial + warp + jitter + 0.3 where radial = length((centre − canvas centre) / (canvas centre)) × 0.7071, warp = cnoise(uv×(3.2, 2.4), 4.7) × 0.3, jitter = hash21(cell) × 0.16; band width = 0.2 × (0.6 + 0.8 × hash21(cell + (17, 9))). Cells not yet reached are hidden; just-after-arrival cells overshoot with a cubic-back scale (1 + 2.70158b³ + 1.70158b², b = t − 1, min size 0.02), and front = 1 − smoothstep(0, 1, |progress − spread| / band) paints a bright rim that sweeps outward from the centre with a warped, jittered front.

## Ripple simulation (CPU)

- Two Float32Arrays (heights, previous heights) of cols × rows, integrated at a fixed 1/60s step with a ≤ 4-step backlog per frame: next = (h + (h − prev) × 0.94 + 0.42 × laplacian) × 0.972, laplacian = sum of 4 neighbours − 4h (edge-clamped); buffers swap each step; charge = clamp(next, 0, 1). When the peak charge drops below 0.01 the buffers are zeroed and the simulation sleeps (chargesActive false).
- Splash: pointer-driven bumps are Gaussian — sigma = max(0.5, splashRadius × DPR / cellPx × 0.5), reach 2.5 sigma, each cell gets strength × exp(−d² / 2σ²) with heights capped at 1.2. Pointer move strength = min(1, 0.22 + pointerSpeed(px/s) × 0.0006) × splashStrength, so fast strokes splash harder than slow drifts.
- Pointer tracking is global: `pointermove` on window (passive), bounds cached in a getBoundingClientRect and invalidated on any captured `scroll`; only splashes inside the root rect count.

## Text mask rasterization

- Offscreen 2D canvas sized to surface × min(1, 1024 / longest side); black fill, then the text in `${fontWeight} ${textSize × maskHeight}px ${fontFamily}`, font size shrunk proportionally when the measured width exceeds 90% of the mask width, centred using actualBoundingBox metrics, white fill. Uploaded via copyExternalImageToTexture into an rgba8unorm texture (swap + destroy old). After `document.fonts.load(...)` resolves the mask is redrawn once so webfonts land. Empty/whitespace text uses a 1×1 black mask (no cells hidden).

## Time, performance & lifecycle

- Ambient time: time += dt × 0.1 × speed; flow drift moves the noise sample offset along `direction` degrees at flow × cellPx px/s. Ambient animation runs only while visible (IntersectionObserver), the tab is visible, paused is false, speed > 0 and prefers-reduced-motion is off.
- Frame-loop self-sleep: the loop keeps requesting frames only while animating, charges are active, or the intro is playing; otherwise it stops and is woken by pointer moves, visibilitychange, IntersectionObserver re-entry, reduced-motion changes, prop updates or resize.
- Prop application: settings are mirrored into a ref each render; a signature of the scene-affecting props re-applies uniforms/grid (grid re-configured, charge buffer re-created only when cols×rows change); a text/font signature re-rasterizes the mask; changing introKey replays the intro; turning interactive off clears any live ripples. intro only arms a replay on false → true transitions (and on introKey).
- Failure handling: any thrown error or GPU error reported through `gpu.onError` tears the renderer down, hides the canvas (data-ready false) and calls onError with an Error — the page keeps working with just the background colour.
- Unmount: cancel the frame, disconnect ResizeObserver and IntersectionObserver, remove window/document listeners, destroy mask texture, charge buffer and GPU instance. Instances are fully independent.
- Reduced motion: intro never arms (mount or replay), ambient time freezes; cursor splashes and their ripples still render, so the field stays responsive without self-motion.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "" | Optional text masked into the field; only cells outside glyph coverage render. |
| fontFamily | string | 'Geist, "Geist Sans", system-ui, sans-serif' | Font family for the mask text. |
| fontWeight | number | 500 | Font weight for the mask text. |
| textSize | number | 0.6 | Mask font size as a fraction of canvas height, shrunk to fit 90% width. |
| shapes | "mixed" \| "squares" \| "circles" \| "triangles" | "mixed" | Shape per cell; mixed mixes all three, fixed modes shrink dimmer cells. |
| cellSize | number | 10 | Grid cell size in CSS px (floored at 2). |
| dotSize | number | 0.75 | Shape radius as a fraction of the half-cell, clamped 0.1–1. |
| color | string | "#929292" | Resting tint of the shapes. |
| hoverColor | string | "#ffffff" | Tint the waves and ripple crests push toward. |
| backgroundColor | string | "#000000" | Background between the shapes (also inline on the root). |
| speed | number | 1 | How fast the noise waves roll; 0 freezes the ambient motion. |
| scale | number | 1 | Noise zoom; floored at 0.05, higher is finer. |
| contrast | number | 1 | Contrast of the three brightness bands. |
| brightness | number | 0.4 | Resting brightness bias of the field. |
| flow | number | 0 | Drift speed of the noise field, in cells per second. |
| direction | number | 0 | Drift direction in degrees. |
| fade | number | 0.25 | Superellipse edge falloff, 0 disables. |
| interactive | boolean | true | Pointer movement injects splashes. |
| splashRadius | number | 40 | Splash radius in CSS px. |
| splashStrength | number | 0.4 | Splash amplitude scale. |
| glow | number | 0.35 | Bloom strength; 0 skips the whole glow pipeline. |
| intro | boolean | true | The radial sweep-in on mount (and when toggled on). |
| introDuration | number | 1.6 | Intro duration in seconds, floored at 0.1. |
| introKey | number | 0 | Bump to replay the intro. |
| paused | boolean | false | Freezes ambient motion without hiding the field. |
| onError | (error: Error) => void | - | Called when WebGPU init or a frame fails; the component then shows only the background colour. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of ShapeWaves.jsx and ShapeWaves.css plus install steps (including the helper dependency) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the field renders as triangles/circles/squares in mixed mode and as one shape in fixed modes with dimmer cells smaller; noise waves visibly brighten cells through three bands and drift with flow/direction; fast cursor strokes splash harder than slow ones and ripples propagate cell by cell before settling silent; glow adds a soft bloom around bright cells and glow 0 disables it; text masks the field to the glyphs and re-rasterizes after webfonts load; intro sweeps outward once with overshoot and replays on introKey; shapes/fade/brightness/contrast/scale/cellSize/dotSize/colors all take effect live; reduced motion keeps the field static but responsive to cursor splashes; paused, tab hide and off-screen all stop the frame loop and wake correctly; resize re-flows the grid without stretching; a WebGPU failure calls onError and leaves the background colour with no console spam; unmount leaves no observers, listeners or GPU resources; 375 / 768 / 1440 wide without overflow.
