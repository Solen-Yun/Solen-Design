Implement the "Scanner" component from zero: a field of glowing interference lines swept by a scanning beam, finished like a CRT monitor. The lines are the sum of four sine waves that slowly morph; a bright scan band with an exponential tail sweeps across them (vertical, horizontal or diagonal), locally heating the lines it passes. The cursor acts as a lens that bends the lines toward or away from itself, clicks drop ripple pings that warp the lines in expanding rings, and the whole image carries a scanline texture, vignette and film grain, with chromatic-split colouring from three configurable tones. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Scanner.jsx (entry, ping state, shader) and Scanner.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `scanner-container` (position relative, width 100%, height 100%, overflow hidden) that receives `className` and merged `style`; the only child is a `<canvas class="scanner-canvas" aria-hidden="true">` (display block, width/height 100%; not absolutely positioned — the container still owns layout). The host gives the container its size; the canvas clears to transparent each frame.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. One program drawing one big triangle from `gl_VertexID` (no buffers; a VAO is bound). If the context or program fails, the component silently renders nothing.
- Canvas DPR = min(dpr || devicePixelRatio, 2); live DPR changes re-size on the next frame. Coordinates are centred CSS pixels scaled by `1 / scale` (min 0.05), y-up.
- Colour parsing is built-in (3/4/6-digit hex, unparsable falls back to white) for the three tones: color1 base body, color2 heated body, color3 white-hot head.

## Interference field

- Signal: `0.35 ×` the sum of four travelling sines over the scaled coordinates — `sin(1.3x + 0.7t) + 0.8·sin(1.7y - 0.52t) + 0.6·sin(0.9(x+y) + 0.91t) + 0.42·sin(1.53(x-y) - 0.63t)` — added to the line coordinate so the straight bands wobble organically. `speed` scales the signal clock.
- Scan axis (`scanDirection`): "vertical" ranks by y, "horizontal" by x, "diagonal" by (x+y)/√2; `ripple` scales how much the signal perturbs the rank (default 0.22).
- Sweep: `u = fract(sweepCoord / sweepWidth - rank)`; the beam is `max(exp(-u × tail), leading edge)`, tail blending 11→1.8 across `trail` (0–1), plus a hard bright head `exp(-26u)` and a quadratic leading highlight. `sweepSpeed` advances the sweep (negated by `reverse`); sweepWidth is floored at 0.05.
- Cursor lens: a gaussian (sigma² = radius² in scaled units, min 0.01) around the eased pointer position; the line coordinate is pulled toward the pointer's own line coordinate by `lens × mouseStrength × mix(0.55, -0.9, attract)` — positive repels (lines bend away), attract mode inverts the mix so lines bend inward. The pointer position eases at `1 - exp(-dt/0.09)` and its presence eases on a 0.3s constant.
- Click pings: up to 6 concurrent (oldest evicted), each living 4s: an expanding gaussian ring (radius 1.1 × age, width 0.12 + 0.1·age, fading exp(-0.9·age)) both warps the line coordinate (small bump scaled by 0.018/scale) and adds local brightness — the classic sonar ping in line form.
- Intro: over 2s a reveal front sweeps across the rank axis with a hot leading head, uncovering the field from base brightness 0.11 to full.

## Line rendering & CRT finish

- Bands: line coordinate × `bandDensity` (min 0.5) gives the band frequency; each band carries a per-band brightness thread (hash, 0.62–1) so neighbouring lines vary. Coverage is antialiased with fwidth and de-crowded (dense bands merge smoothly instead of aliasing).
- Chromatic split: three coverage samples offset by `colorSpread` (0–1, widened by local heat) × band gradient in the rank direction — red/green/blue channel coverages sample color1→color2 mixes separately, so hot lines fringe with colour. Body tone = mix(color1, color2, smoothstep(0.05, 0.75, lit)); white-hot head and ping cores mix in color3.
- Glow: an exponential halo (width 3 + 9 × glow) around each band scaled by local lighting × glow.
- CRT finish: vignette (`vignette` 0–1) from two smootherstep axis falloffs; scanlines (`scanline` on/off with `scanlineIntensity` 0–1) as a cosine dimming every 3 device px of y; grain (`grain` on/off with `grainIntensity`, default 0.04) as hash noise on the alpha and a touch on the colour.
- Brightness mapping: `level = (0.11 + lit × (1 - 0.11)) × thread × brightness` (min 0); final premultiplied output `min(colour, alpha)` with `opacity` scaling.
- Light mode: prints as ink — line alpha from the colour coverage × vignette × scanlines, a soft halo wash of the mixed tone under the ink, grain only over inked pixels; readable on white pages.

## Performance & lifecycle

- Settings are mirrored into a ref every render; a per-render wake re-renders once so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: after the motion, intro, lens presence and pings have all settled it idles 0.5s then stops. Wake sources: window pointermove/pointerdown (passive), documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: the signal and sweep freeze, the intro snaps to done, pings are disabled; the lens stays functional since it follows a live pointer (its easing still runs while the pointer moves).
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete VAO and program, and lose the GL context if the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color1 | string | "#5227FF" | Base line colour (hex). |
| color2 | string | "#FF9FFC" | Heated line colour as the sweep and lens light the lines. |
| color3 | string | "#FFFFFF" | White-hot colour for the sweep head and ping cores. |
| speed | number | 0.5 | How fast the interference pattern morphs; 0 freezes it. |
| sweepSpeed | number | 0.25 | How fast the scan beam travels; 0 holds it. |
| sweepWidth | number | 1.6 | Beam length along its axis, min 0.05. |
| trail | number | 0.5 | Beam afterglow length, 0–1. |
| reverse | boolean | false | Sweeps the beam the other way. |
| scale | number | 1.5 | Zoom on the interference field, ≥0.05. |
| frequency | number | 2 | Spatial frequency of the wave field. |
| ripple | number | 0.22 | How strongly the waves bend the lines, ≥0. |
| bandDensity | number | 11 | Lines per unit of the rank axis, min 0.5. |
| lineWidth | number | 1.2 | Line thickness, min 0.2. |
| glow | number | 0.6 | Halo strength around lit lines, ≥0. |
| scanDirection | "vertical" \| "horizontal" \| "diagonal" | "vertical" | Axis the beam sweeps along. |
| colorSpread | number | 0.7 | Chromatic split of the three tones, 0–1. |
| brightness | number | 1 | Overall brightness multiplier. |
| vignette | number | 0.3 | Edge darkening, 0–1. |
| scanline | boolean | true | CRT scanline texture. |
| scanlineIntensity | number | 0.5 | Scanline depth, 0–1. |
| grain | boolean | true | Film grain. |
| grainIntensity | number | 0.04 | Grain amount, ≥0. |
| opacity | number | 1 | Overall opacity, 0–1. |
| mouseInteraction | boolean | true | The cursor lens bends the lines. |
| mouseRadius | number | 0.5 | Lens size, ≥0.05. |
| mouseStrength | number | 0.7 | Lens pull strength, ≥0. |
| mouseMode | "repel" \| "attract" | "repel" | Lines bend away from, or toward, the cursor. |
| clickEffect | string | "ping" | "ping" drops expanding pings on click; any other value disables them. |
| intro | boolean | true | A reveal front sweeps the field on over 2s. |
| lightMode | boolean | false | Prints the field as ink for light backgrounds. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Scanner.jsx and Scanner.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the wave field morphs continuously; the beam sweeps with afterglow and a hot head on all three scanDirection axes and reverses correctly; the lens bends lines away (repel) and toward (attract) with smooth easing; clicks drop expanding pings (max 6 concurrent) that warp and light the lines; the CRT finish (scanlines, vignette, grain) reads on screen; color1/2/3 and colorSpread fringe the hot lines; bandDensity, lineWidth, glow, scale, frequency, ripple, brightness, opacity, fade all respond; lightMode prints legible ink on white; intro sweeps once and never replays on prop changes; paused/reduced-motion hold a static field with pings off; hiding the tab or leaving the viewport stops the loop and it resumes; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
