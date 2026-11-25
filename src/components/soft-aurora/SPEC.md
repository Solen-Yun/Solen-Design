Implement the "SoftAurora" component from zero: soft curtains of aurora borealis — two layered luminous bands that ripple with 3D Perlin noise and glow through cosine-gradient palettes; the whole sky drifts with the cursor, the curtain bends away from the pointer as it nears, and clicking sends a soft pulse of light along the band. Light-page ink output is included. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: SoftAurora.jsx (entry, GL setup, pointer/pulse state) and SoftAurora.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="soft-aurora">` (plus caller className, caller style), position relative, width 100%, height 100%, overflow hidden; its only child is a `<canvas class="soft-aurora__canvas" aria-hidden="true">`, position absolute inset 0. The host owns the size (typical usage: a 100%-wide, fixed-height positioned box).
- WebGL2: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. One program; a single fullscreen triangle from `gl_VertexID` corners (−1,−1), (3,−1), (−1,3) — no buffers, only an empty VAO. Silent no-op when the context or program fails (shader logs go to console.error).
- Internal resolution: ratio = clamp(0.35 + 0.04 × noiseFrequency × scale, 0.5, 1) applied to CSS size — soft content needs fewer pixels; canvas resizes through a pending flag handled at the top of each frame.
- Context loss: `webglcontextlost` prevents default and stops the loop; `webglcontextrestored` bumps a generation counter that tears down and re-runs the whole effect (intro does not replay after the first mount).

## Aurora field (fragment shader)

- Coordinates: screen = (fragCoord.x/resolution.y, fragCoord.y/resolution.y) rotated by `tilt` (clamped ±90°, radians) around the aspect-corrected centre; the cursor and pulse positions rotate the same way, so tilt turns the whole sky including interactions. field = screen + shift, where shift = (mouse − 0.5) × influence moves the noise field with the cursor.
- 3D Perlin noise: gradient vectors from a trigonometric hash (three dot-hash channels, fract(sin×43758.5453123), spherical distribution via acos/TAU), quintic fade; `perlin3D` interpolates the 8 lattice corners; 3 octaves stacked with amplitude × octaveDecay and frequency × 2 per octave.
- Band glow: yBand = uv.y × 10 − (bandHeight + bend) × 10; glow = 0.3 × max(exp(bandSpread × (1 − 1.1 × intro.y × |noise × intro.z + yBand|)), 0) — a soft exponential curtain whose height is bandHeight (0.5 default), softness bandSpread (1.0 default) and octave decay 0.1; two layers sample the noise at t and t + layerOffset.
- Cursor bend: reach = exp(−((screen.x − cursor.x)/0.32)²) × strength (strength = min(1, influence×4) × presence); gap = cursor.y + shift.y − bandHeight; near = exp(−gap²/0.16); bend = reach × gap × near × 0.55 — approaching the curtain pushes it away locally like wind.
- Click pulses (max 4, oldest dropped, life 2.6s): each pulse contributes pulse.z × exp(−((|screen.x − pulse.x| − age×0.55) / (0.1 + age×0.06))²) — a vertical stripe of light that widens and fades as it ages; strength = smoother(age/0.18) × (1 − smoother((age − 0.18)/2.42)). boost = (1 + reach×near×0.25 + pulse×0.65) × intro.x.
- Colour: two cosine gradients — grad1 = a+b·cos(2π(c·t + d)) with a=b=(0.5), c=(1,1,1), d=(0.3,0.2,0.2), sampled at uv.x + hue×0.2; grad2 with c=(2,1,0), d=(0.5,0.2,0.25) at uv.x + hue×0.1; `spectrum` (0–1) mixes each gradient with white, `hue` accumulates at speed × colorSpeed so the palette slowly cycles. col = 0.99 × glow1 × grad1 × color1 + 0.99 × glow2 × grad2 × color2, × brightness.
- Output dark mode: alpha = clamp(length(col)); rgb = clamp(col), premultiplied and scaled by opacity, plus a 1/255 blue-noise dither.
- Output light mode: energy-based ink — hue = col/energy; average tint from both layers decides depth (1.25 + 0.45 × core, core = smoothstep(0.55, 1.6, energy)); tint mixes the layer average with a contrast-boosted version; vivid = saturation × channel-spread gates how much the pure hue shows; ink = mix(tint, hue^depth, vivid) × (0.93→0.8 by core); density = 0.88 × (1 − exp(−1.9 × energy^1.7)) × opacity (+ dither), premultiplied.

## Interaction & timing

- Pointer coordinates are normalized to the container (y flipped), tracked on window pointermove (passive); `pointerleave` on documentElement and non-mouse pointerup/cancel clear presence; only positions inside the container engage.
- Mouse follow: x/y ease toward the pointer at 1 − exp(−dt/0.325) (toward centre 0.5 when absent); presence eases in at τ 0.45s, out at τ 0.8s.
- Click: pointerdown inside with clickPulse on and not reduced motion pushes a pulse (x in aspect units, age 0), max 4.
- Time: flow += dt × speed × pace and hue += dt × speed × colorSpeed × pace, pace = 0.35 under prefers-reduced-motion (motion slows instead of stopping).
- Intro (2s, skipped when intro=false or already reduced on mount): opening rises 0→1; eased = 1 − (1−opening)³; uIntro = (smoother(opening/0.7), 1 + 3(1−eased)², 0.25 + 0.75×eased) — the curtain expands, its noise amplitude settles in and the band sharpening relaxes.
- Frame-loop self-sleep: keeps requesting frames only while speed > 0, the intro is running, the mouse is still converging/present, or pulses are alive; otherwise it stops and wakes on pointer events, visibilitychange, resize or intersection re-entry.
- ResizeObserver on the container (resize merged into the next frame); IntersectionObserver pauses off-screen; document hidden pauses.
- Unmount: cancel the frame, disconnect both observers, remove all window/document listeners, delete VAO and program (skipped if the context is lost). Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| speed | number | 0.6 | Flow speed of the noise and hue cycle; 0 freezes. |
| scale | number | 1.5 | Noise zoom, floored at 0.01; also raises internal resolution slightly. |
| brightness | number | 1.0 | Overall energy multiplier, floored at 0. |
| color1 | string | "#f7f7f7" | Tint of the first (base) layer; hex or rgb()/rgba(). |
| color2 | string | "#e100ff" | Tint of the second layer; hex or rgb()/rgba(). |
| noiseFrequency | number | 2.5 | Base noise frequency, floored at 0.01. |
| noiseAmplitude | number | 1.0 | Noise amplitude, floored at 0. |
| bandHeight | number | 0.5 | Vertical position/height of the curtain. |
| bandSpread | number | 1.0 | Softness of the curtain's falloff, floored at 0. |
| octaveDecay | number | 0.1 | Amplitude decay per noise octave, floored at 0. |
| layerOffset | number | 0 | Time offset between the two noise layers. |
| colorSpeed | number | 1.0 | Speed of the palette hue cycle. |
| spectrum | number | 1 | How much of the cosine-gradient palette shows, 0–1. |
| tilt | number | 0 | Rotates the whole sky, degrees, clamped ±90. |
| enableMouseInteraction | boolean | true | The field drifts with the cursor and bends away from it. |
| mouseInfluence | number | 0.25 | Drift and bend strength, floored at 0. |
| clickPulse | boolean | true | Clicking sends a light stripe along the band (max 4). |
| intro | boolean | true | The curtain expands and settles on mount (2s). |
| lightMode | boolean | false | Prints the aurora as coloured ink for light pages. |
| opacity | number | 1 | Overall opacity, 0–1. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of SoftAurora.jsx and SoftAurora.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: two aurora layers ripple independently and cycle hue over time; moving the cursor drifts the whole field and bends the curtain away near the pointer; clicking sends a widening light stripe along the band and up to 4 coexist; color1/color2/brightness/spectrum/bandHeight/bandSpread/noiseFrequency/noiseAmplitude/octaveDecay/layerOffset/scale/tilt all take effect; lightMode prints legible ink on a white page; reduced motion slows to 0.35× instead of stopping and skips intro/pulses; context loss and restore recover without errors; resize keeps the field centred; off-screen and hidden tabs stop the loop; unmount leaves no listeners or GL objects; 375 / 768 / 1440 wide without overflow.
