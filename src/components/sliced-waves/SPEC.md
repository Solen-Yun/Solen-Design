Implement the "SlicedWaves" component from zero: a receding row of glowing colored light bars seen in perspective like a stage of light ribbons — each bar is a vertical soft-edged beam whose color sweeps through a three-color palette along its length; the bars undulate with layered sine waves, and the whole field can be sliced into stacked dashes; the cursor picks the nearest bar, pulls the depth of field's focus onto it and brightens a soft halo around it; clicking is not needed — motion, blur and glow do the work. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: SlicedWaves.jsx (entry, 3D layout, GL setup) and SlicedWaves.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="sliced-waves-container">` (plus caller className, remaining props spread onto the element), position relative, width 100%, height 100%, overflow hidden; its only child is a `<canvas class="sliced-waves-canvas" aria-hidden="true">`, position absolute inset 0. The host owns the size (typical usage: a 100%-wide, fixed-height positioned box).
- WebGL2: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. Silent no-op when the context or a program fails.
- Two programs: a bar program drawing instanced quads (corner triangle-strip + three per-instance vec4 attributes: centre+half-size, top colour+blur px, bottom colour+alpha — 48 bytes per instance, divisor 1), and a composite program drawing a fullscreen big triangle ((−1,−1), (3,−1), (−1,3)).
- HDR pipeline: bars render additively (blend ONE, ONE) into an offscreen target — RGBA16F when EXT_color_buffer_float is available, otherwise RGBA8 with all light values pre-scaled by 0.25 (restored at composite). The composite pass tone-maps: hdr × (1.6 × brightness), mapped = 1 − exp(−hdr) with a white mix of smoothstep(1.1, 3.2, peak) × 0.75, grain added scaled by (0.25 + level), premultiplied-alpha output; light mode instead normalizes the hue, applies a 1/2.2 gamma and sets alpha = clamp((1 − exp(−peak×1.1)) × 0.85 × (1 + grain)) × mask.
- Canvas pixels = CSS size × min(dpr prop || devicePixelRatio, 2), longest side capped at 2560 (ratio scaled down to fit).
- Colour parsing: each of color1/2/3 goes through a 1×1 canvas fillStyle probe and is converted to linear space (pow 2.2), cached; unparsable falls back to white.

## Bar layout (pseudo-3D)

- Camera: focal F = canvasHeight × 1.1, camera distance 2.6, so the centre depth scale is F/2.6. Bars sit on a 1D lattice: pitch = spacing / (F/2.6), bar i at x = i × pitch, each projected to screen by F/Z. `perspective` (0–1) sets a yaw of 0.66×perspective radians that leans the lattice sideways in z; `curve` (0–1) bends each bar along sin(x × 0.9 + 0.8) × 0.6×curve before the yaw.
- Culling: bars with z < 0.45 or whose screen x lies beyond the rotated view span + half width + 80px are dropped; reach covers ±2.4 view widths.
- Each bar draws `ribbons` instances (1–6): ribbon r offset vertically by (r − (ribbons−1)/2) × spread×height/(F/2.6); wave = 0.62 × sin(2π × 0.22×frequency × x − t×1.6 + r×2.1) + 0.38 × sin(2π × 0.22×frequency × 1.9 × x + t×2.25 + r×1.3), y += wave × amplitude×height/(F/2.6).
- Bar size: half-width = halfBar × scale (halfBar = pitch × barWidth / 2, barWidth clamped 0.05–1); thickness = ribbonHeight × height / 2 / (F/2.6) × (0.6 + 0.4 × swell) with swell a slow third sine; base row sits at height × position (0.78 default, 0–1).
- Palette: tone = r × 1.15 + x × 0.3 + t × 0.12; top colour = palette(tone − 0.22), bottom = palette(tone + 0.22), the 3 colours cycling with a smoothstep blend between neighbours, so colour travels along each bar and through time.
- `rotation` (degrees) rotates the whole field: instance quads rotate in the vertex shader around the view centre and pointer coordinates are un-rotated for picking.

## Bar fragment shader

- Soft box: erf-approximated smooth edges — body = box(local.x, halfW, blur) × box(local.y, halfH, blur × 1.15), where blur is a per-instance pixel blur (see focus). A wider halo (half + 5px) carries the glow term.
- Vertical colour ramp t = local.y / halfH mapped 0–1, colour = mix(top, bottom, t); saturation-boosted tint (c²/max channel) × glow × 0.16 adds an outer halo.
- Body shaping: core boost (1 + 0.35 × exp(−(local.x / (halfW + blur/2))² × 1.5)) and vertical edge darkening (1 − 0.35 × v⁴).
- Slicing: when slices > 0, cell = halfW / halfBar / slices (world units along y); f = triangle wave of (base − worldY)/cell; body ×= smoothstep(0.28 ± soft, f) with soft from blur, cutting the bars into stacked dashes whose gaps follow the shared vertical rhythm.
- Output: (colour × body + tint × glowTerm) × alpha(bottom.a) × lightScale, additively blended.

## Focus, lift & pointer

- Pointer pick (mouseInteraction on, pointer inside, not reduced motion): the local (un-rotated) pointer x selects the nearest bar; the focus depth springs toward that bar's z with acceleration 36×(target − focus) − 11×velocity per second (underdamped-ish, converges ≤ 0.001).
- Depth of field: per-instance blur px = (0.5 + blur prop × 0.6 + blur × 16 × |focus/barZ − 1|) × (lightMode ? 0.55 : 1) — the focused bar is crisp, bars nearer/farther soften; the `blur` prop (0–2) scales everything.
- Lift: while engaged, a Gaussian centred on the pointer bar (width max(0.12 × width, 60px)) raises instance alpha by (1 + lift × 0.6); lift eases in 0.25s, out 0.6s; its centre tracks the pointer at 0.12s.
- Pointer events on window (passive move), `pointerleave` on documentElement.

## Timing & lifecycle

- Intro (1.5s, skipped when intro=false or reduced motion): a sweep front travels left-to-right (duration 1.6 + 0.04×(ribbons−1) of intro progress vs bar screen position); each ribbon's thickness and alpha ease in with a smoothstep, so the field builds itself bar by bar from the left.
- Time: t += dt × speed while not paused and not reduced motion (speed 0 freezes the waves but focus/lift still work).
- Frame-loop self-sleep: keeps requesting frames only while moving, the intro is running, or focus/lift/presence are settling (or the pointer is engaged); otherwise it stops and wakes on pointer events, visibility change, resize or intersection re-entry.
- ResizeObserver on the container; IntersectionObserver pauses off-screen; visibilitychange resets the clock; a dpr prop change re-resizes. Prop changes re-render one frame immediately.
- Unmount: cancel the frame, disconnect both observers, remove listeners, delete both programs, three buffers, two VAOs, texture and framebuffer. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color1 | string | "#ffd9a8" | First palette colour (warm end). |
| color2 | string | "#ff5fa2" | Second palette colour (middle). |
| color3 | string | "#5b8cff" | Third palette colour (cool end). |
| ribbons | number | 3 | Bars stacked per lattice position, clamped 1–6. |
| spacing | number | 28 | Distance between bars in px, clamped 4–200. |
| barWidth | number | 0.5 | Bar width as a fraction of the pitch, clamped 0.05–1. |
| ribbonHeight | number | 0.26 | Bar thickness as a fraction of half the height. |
| spread | number | 0.1 | Vertical spread between the stacked ribbons, as a height fraction. |
| amplitude | number | 0.1 | Wave amplitude as a height fraction. |
| frequency | number | 1 | Wave count along the field. |
| speed | number | 1 | Wave speed; 0 freezes them. |
| perspective | number | 0.45 | Yaw lean of the lattice, 0–1. |
| curve | number | 0.5 | Bending of the bars, 0–1. |
| blur | number | 0.6 | Base softness and depth-of-field strength, 0–2. |
| glow | number | 1 | Halo strength around the bars. |
| brightness | number | 1.25 | Exposure multiplier on the tone-mapped light. |
| position | number | 0.78 | Vertical anchor of the bar row, 0 (top) – 1 (bottom). |
| rotation | number | 0 | Rotates the whole field, in degrees. |
| slices | number | 0 | Dash count per bar; 0 renders solid bars. |
| grain | number | 0.08 | Film grain over the composite, floored at 0. |
| mouseInteraction | boolean | true | The cursor drives focus, blur and the lift halo. |
| intro | boolean | true | Left-to-right growth sweep on mount (1.5s). |
| fade | number | 0 | Smootherstep edge fade to transparent, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Prints the light as colour ink for light pages. |
| paused | boolean | false | Freezes the waves but keeps focus/lift. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2, longest side ≤ 2560. |
| className | string | "" | Extra class names for the container. |
| ...rest | attributes | - | Remaining props spread onto the container div. |

## Delivery & validation

- Deliver the complete content of SlicedWaves.jsx and SlicedWaves.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: bars recede in perspective with the yaw lean and curve bend visible; colour travels along each bar and drifts over time through the three palette colours; the wave layers undulate bars independently; slicing cuts the bars into soft dashes; moving the cursor snaps the depth-of-field focus to the nearest bar with a springy settle, blurring others and raising the lift halo; intro builds the field from the left; brightness/glow/grain/fade/opacity/rotation all take effect; lightMode prints clean ink on a white page; speed 0 and paused stop the waves while focus still responds; reduced motion freezes ambient motion but keeps cursor focus; resize keeps the layout; off-screen and hidden tabs stop the loop; unmount leaves no GL objects or listeners; 375 / 768 / 1440 wide without overflow.
