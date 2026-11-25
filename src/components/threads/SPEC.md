Implement the "Threads" component from zero: a field of fine parallel lines flowing like wind-blown fibres or contour threads — each line ripples with Perlin noise, stays straight near its root and frays into waving strands toward its far end, thinning and fading as it goes; the whole bundle is drawn at an angle across the frame; the cursor can locally part the strands like fingers through grass (opt-in). Lines blend from a base colour to an accent colour along the field. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: Threads.jsx (entry, GL setup, pointer state) and Threads.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="threads-container">` (plus caller className, remaining props spread onto the element), position relative, width 100%, height 100% (no overflow clip — the caller may crop it); its only child is a `<canvas class="threads-canvas" aria-hidden="true">`, position absolute inset 0. The host owns the size.
- WebGL2: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. Silent no-op when the context or a program fails.
- Two programs: a line program drawing instanced triangle strips — one instance per line, each strip has (segments+1) × 2 vertices with attribute aPoint = (u along the line, ±1 side); a screen program drawing a fullscreen big triangle ((−1,−1), (3,−1), (−1,3)). Lines render into an offscreen RGBA texture (NEAREST filtering) with premultiplied blending (ONE, ONE_MINUS_SRC_ALPHA), then the screen pass composites it with fade/opacity/brightness.
- Vertex budget: segments = clamp(round(cssWidth / 3), 96, 640); canvas pixels = CSS × min(devicePixelRatio, 2), longest side capped at 1920 (ratio scaled down to fit).

## Line geometry (vertex shader)

- Line index t = instanceID / lineCount (0–1); position along the line x = aPoint.x (0–1). The whole bundle rotates by `angle` degrees (uTurn = cos/sin); the local frame is the rotated bounding rect: length = |w·cos| + |h·sin| across the draw direction, across = |w·sin| + |h·cos|.
- Fraying: splitPoint = split + t × fray (split 0–1, fray 0–1 spreads each line's own split); amplitude ramps in with smoothstep(splitPoint, max(0.7, splitPoint + 0.2), x) × 0.5 × amplitude, so lines are straight near the root, then wave. The mouse (when enableMouseInteraction) tilts this: amplitude ×(1 + (mouse.y − 0.5) × 0.2) and the noise time shifts by (mouse.x − 0.5).
- Noise: 2D Perlin (quintic fade, ±0.5 gradient hash with 71/951.135664/642.949883 constants); value = mix(Perlin(timeScaled×2.5 + seed, (x×waves + t)×2.5), Perlin(timeScaled×3.5 + seed, (x×waves + timeScaled)×3.5)/1.5, x×0.3) — coarse coherent waves near the root cross-fade into finer travelling waves toward the tip; timeScaled = time/10 (+ mouse shift); seed enters as seed × 13.37.
- Spacing: y = 0.5 + (t − 0.5) × distance + noise/2 × amplitude — `distance` (0–1) sets how much of the frame the bundle spans.
- Parting (parting > 0 with the cursor inside): local-space Gaussian pull — delta = local − pointerLocal; pull = exp(−|delta|² / reach²) with reach = min(width, height) × 0.16 px; local.y += delta.y × pull × strength, strength = parting × presence × 2 — strands are pushed away from the cursor along the line normal.
- Thickness and softness: width = 7 × thickness × pixel × (1 − t) (lines taper geometrically toward the tip); soft band = width/2 + 10 × softness × pixel × blur where blur = smoothstep(splitPoint, splitPoint + 0.05, x) × t (tips get softer); half-height offset = side × band.
- Taper fade: alpha = 1 − smoothstep(0, 1, pow(t, 0.3)) × taper — `taper` (0–1) fades the frayed tail out.
- Fragment coverage: (1 − smoothstep(0, draw, |edge|)) × (band/draw) × alpha; colour = mix(color, accentColor, t), so accent concentrates at the frayed far end.

## Colour & screen pass

- Colours: `color` and `accentColor` accept a 0–1 [r,g,b] array or any CSS colour string (1×1 canvas fillStyle probe, cached); accentColor omitted/null falls back to color. A colour-key string avoids re-parsing per frame.
- Screen pass: unpremultiplies the line texture, applies edge fade (smootherstep mask, edge = fade × min(w,h) × 0.5, fade 0–1), multiplies opacity, and applies brightness as an alpha curve pow(alpha, 2/brightness) — brightness clamped 0.25–2, below 1 makes lines denser, above 1 airier.

## Interaction & timing

- Pointer: window pointermove (passive) maps the cursor to normalized field coords (y flipped) and to local pixel coords relative to the rotated frame centre; mouse/pointer positions ease toward targets (rates 3/s and 10/s); entering the field with presence near 0 snaps the pointer so it doesn't sweep across; leaving resets the mouse to centre. `pointerleave` on documentElement also clears.
- presence eases toward 1 while inside with parting > 0, at 4/s, and drives the parting strength.
- Time: time += dt × speed while not paused and not reduced motion.
- Frame-loop self-sleep: keeps requesting frames only while moving or while mouse/pointer/presence are still converging; otherwise it stops, waking on pointermove, visibilitychange, resize or intersection re-entry; prop changes render one frame immediately.
- ResizeObserver on the container; IntersectionObserver pauses off-screen.
- Reduced motion: ambient flow freezes; cursor parting and its ease still work.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete framebuffer/texture/buffers/VAOs/programs. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | number[] \| string | [1, 1, 1] | Base line colour: 0–1 [r,g,b] or any CSS colour string. |
| accentColor | number[] \| string | - | Colour the lines blend toward at the frayed end; falls back to color. |
| amplitude | number | 1.7 | Wave height of the frayed strands. |
| distance | number | 0.4 | How much of the frame the bundle spans, 0–1. |
| enableMouseInteraction | boolean | false | Lets the cursor tilt wave phase/amplitude and part the strands. |
| lineCount | number | 90 | Number of lines, clamped 1–400. |
| thickness | number | 0.6 | Line width scale. |
| softness | number | 1.3 | Extra softness added toward the frayed tips. |
| speed | number | 0.6 | Flow speed of the waves; 0 freezes. |
| waves | number | 1.05 | Wave count along each line, floored at 0. |
| split | number | 0.04 | Where the strands start waving, 0–1 (0 = from the root). |
| fray | number | 0.5 | How much each line's split point spreads, 0–1. |
| angle | number | 25 | Bundle direction in degrees. |
| seed | number | 0 | Noise seed; different values reweave the strands. |
| parting | number | 0 | Cursor parting strength, 0–1 (needs enableMouseInteraction). |
| taper | number | 0.85 | Fade of the frayed tail, 0–1. |
| brightness | number | 1.4 | Line density/airiness via alpha curve, clamped 0.25–2. |
| fade | number | 0 | Edge fade to transparent, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| paused | boolean | false | Freezes the flow but keeps the cursor parting. |
| className | string | "" | Extra class names for the container. |
| ...rest | attributes | - | Remaining props spread onto the container div. |

## Delivery & validation

- Deliver the complete content of Threads.jsx and Threads.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: 90 lines flow at the set angle, straight near the root and fraying into noise waves toward thin, faded tips; split/fray reshape where and how the fraying starts; seed reweaves deterministically; accentColour concentrates at the far end; distance, thickness, softness, amplitude, waves, brightness, fade, opacity all take effect; with enableMouseInteraction + parting the cursor visibly parts the strands around itself and they relax when it leaves; paused and reduced motion stop the flow while the cursor parting still responds; resize keeps the layout; off-screen and hidden tabs stop the loop; unmount leaves no listeners or GL objects; 375 / 768 / 1440 wide without overflow.
