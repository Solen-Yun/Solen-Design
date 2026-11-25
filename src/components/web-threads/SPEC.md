Implement the "WebThreads" component from zero: glowing threads woven through luminous pinch points — up to two dozen sine-woven strands share an envelope that squeezes them together at pinch nodes, so they bloom apart and regather like a woven net of light; the cursor lifts and brightens whichever thread it touches while the others settle, and clicking sends a surge of light along the threads that races to the edge of the frame. Threads can alternate phase per lane (weave), shimmer, carry travelling beads, draw themselves on stroke by stroke, and print as ink on light pages. Rendering is a single analytic fragment shader — no line geometry at all. Full specification follows; it must not depend on external pages, videos, images, font files or off-the-shelf effect components.

## Structure & rendering

- Two files: WebThreads.jsx (entry, pointer/surge/focus state) and WebThreads.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="web-threads-container">` (plus caller className, caller style), position relative, width 100%, height 100%, overflow hidden. The canvas is created imperatively, appended as a child with class `web-threads-canvas` (position absolute inset 0), and removed on unmount. The host owns the size.
- WebGL2: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. One program, a fullscreen big triangle ((−1,−1), (3,−1), (−1,3)); context/program failure silently removes the canvas.
- Canvas pixels = container × min(devicePixelRatio, dpr prop) (dpr clamped ≥ 0.5, default 2); resize only when the size actually changed.
- All threads are evaluated analytically per pixel in the fragment shader (loop over up to 24 threads) — no geometry, no instancing. Thread space is aspect-corrected and rotated by `angle` degrees around the centre (the same transform maps pointer and surge positions on the CPU).

## Thread model

- Thread i of count n: amplitude envelope env(x) — with one node (nodes ≤ 1) env = spread × |x − pinch|, a V whose apex sits at the pinch point; with nodes 1–6, env = spread × 0.5 × |cos(π × nodes × (x − pinch + 0.5))|, producing nodes pinch points where the threads regather; envelope slope drives the local thread direction. amp = 1 + i × taper fans the threads out with index.
- Phase: angle = x × frequency + (phase + i × 2π/n) × side + shimmer, where `side` alternates ±1 per lane when mirror is on (weave: adjacent lanes counter-phase) and shimmer adds sin(clock × 1.7 + i × 1.3) × 0.35; y = position − env × amp × sin(angle) — `position` (0–1) sets the midline, `spread` (0.18 default) the fan width, `frequency` (5) the waves per screen.
- Glow accumulation: d = vertical distance to the thread centreline with a bend correction near the pinch (slope × smoothstep window 0.04); g = glow / pow(max(d/width, pixel×0.35), falloff) — a power-law glow (glow 0.02 default, falloff 0.6); `glow` is auto-scaled by sqrt(6/max(n, 6)) so denser weaves stay balanced; width = thickness × depth mix × (1 + 0.3 × focus × presence).
- Depth (depth 0–1): near the pinch the thread phase decides front/back — front = mix(1, 0.3 + 0.7 × cos-depth, twist) — so strands passing through a pinch visibly overlap.
- Colour: per-thread t = i/(n−1) interpolates the palette (up to 6 entries) linearly between neighbours; energy = Σ g; when energy passes smoothstep(0.5, 2.2) the result mixes half toward the core colour × energy (hot white cores); brightness multiplies, alpha = clamp(energy × edgeFade) × opacity; grain = hash noise × grain prop (0.05 default) jittered by fract(clock) × 97.
- Output dark mode: premultiplied rgb = colour × alpha × (1 + grain×2); when backgroundColor is a colour (not "transparent") the shader composites it opaquely (background × (1 − alpha) + rgb, alpha 1) so the element can sit on any page without a stacking context. Edge fade (fade 0–1) smoothersteps the left/right margins.
- Light mode (ink on paper): per-thread stroke coverage smoothstep(0.45, 1.3, g) accumulates an averaged hue; cover = body × 0.9 + haze (0.12 × exp saturation) + focal (0.25 × smoothstep(2, 9, energy)), clamped ≤ 0.95 × opacity × grain jitter; printed against the background (opaque) or as premultiplied stroke (transparent).

## Interaction

- Hover: the pointer (window pointermove, passive) maps into thread space; the nearest thread within reach 0.085 (0.11 while already targeted — sticky) becomes the target; its focus value eases in at τ 0.22s; presence eases τ 0.3s; settle (how much the others relax) = mouseStrength × 0.65 × strongest × presence at τ 0.3s. The targeted thread widens, brightens and sheens — lift = focus × presence × (0.9 + 1.4 × sheen × onLine), sheen = pow(0.5 + 0.5 × sin(|x − hub| × 11 + clock × 1.4), 10) — and its tint mixes 30% × lift toward coreColor; untouched threads dim by settle × (1 − focus).
- Click surge (pulseOnClick, primary button, target not inside a/button/input/textarea/select/label/[role="button"], not reduced motion, pointer inside): a surge is spawned at the clicked x with direction = x ≤ pinch ? +1 : −1 (away from the pinch); the lead position races from the click point to ±1.12 with easeInOut over 1.6s, staggered 0.05s per thread; each thread gains a light trail — behind the lead exp(along/0.24), a sharp front exp(−along²/0.0009) — multiplying glow by (1 + light × (0.12 + 2.8 × onLine)); up to 3 surges live at once (oldest dropped), removed after their run.
- pulses prop: travelling beads — pow(0.5 + 0.5 × sin(|x − hub| × 16 + clock × 2.2 + i × 1.9), 24) on the line pixels, scaled by pulses × 5.
- Intro (skipped when intro=false or reduced motion): each thread draws itself stroke by stroke — progress = (introClock − i × stagger)/1.25s with stagger = min(0.12, 0.9/(n−1)); the head sweeps −0.06 → 1.06 with easeInOut, a bright bead (sin(π × progress), glow × (1 + bead × 1.6 × gaussian)) rides the tip, and the tip region renders as a capsule segment; threads not yet started are invisible. Total intro length = stagger span + 1.25s.

## Timing & lifecycle

- Clock always advances (dt clamped 0.1s); the weave phase advances only while not paused and not reduced motion; speed (0.2 default) is phase radians per second.
- Self-sleep: the rAF loop stays scheduled but skips rendering once 3 consecutive quiet frames pass — quiet requires no surges, no intro, no hover activity, unchanged settings, and (paused or reduced motion); resize, settings changes or any transient reset the counter. Off-screen or hidden tabs skip the work but keep ticking cheaply.
- IntersectionObserver tracks visibility; ResizeObserver resets quiet so resizes redraw immediately.
- prefers-reduced-motion: clock uniform is frozen at 0 (shimmer and beads stop), the weave phase freezes, intro is skipped, click surges are disabled; hover focus still lifts the static threads.
- Unmount: cancel the frame, disconnect both observers, remove listeners, delete program/buffer/VAO, force-lose the WebGL context and remove the canvas element. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#5227FF", "#FF9FFC"] | Thread palette, up to 6 CSS colours, interpolated across the weave. |
| coreColor | string | "#FFFFFF" | Hot-core colour where threads overlap and at the hover lift. |
| backgroundColor | string | "transparent" | "transparent" keeps alpha; any colour composites opaquely in the shader. |
| lightMode | boolean | false | Prints the threads as ink for light pages. |
| threadCount | number | 6 | Thread count, clamped 1–24. |
| speed | number | 0.2 | Weave phase speed; 0 freezes. |
| frequency | number | 5 | Waves per thread across the width. |
| spread | number | 0.18 | How far the threads fan from the pinch. |
| taper | number | 1 | Per-index amplitude growth across the weave. |
| position | number | 0.5 | Vertical midline of the weave, 0–1. |
| pinch | number | 0.5 | Horizontal position of the pinch apex, 0–1. |
| nodes | number | 1 | Pinch nodes across the width, clamped 1–6. |
| angle | number | 0 | Rotates the whole weave, degrees. |
| glow | number | 0.02 | Thread glow intensity (auto-balanced by thread count). |
| falloff | number | 0.6 | Glow distance falloff power, min 0.05. |
| thickness | number | 1.1 | Thread width, min 0.05. |
| brightness | number | 0.6 | Overall brightness, floored at 0. |
| opacity | number | 1 | Overall opacity, 0–1. |
| depth | number | 0 | Front/back overlap at the pinches, 0–1. |
| pulses | number | 0 | Travelling bead brightness along the threads, floored at 0. |
| mirror | boolean | true | Alternates thread phase per lane (woven look). |
| shimmer | boolean | false | Slow per-thread phase shimmer. |
| fade | number | 0 | Left/right edge fade, 0–1. |
| grain | number | 0.05 | Film grain strength (boolean also accepted: true = 0.05). |
| intro | boolean | true | Threads draw themselves on stroke by stroke. |
| mouseInteraction | boolean | true | The cursor lifts and brightens the nearest thread. |
| mouseStrength | number | 0.5 | Hover lift / others-settle strength, 0–1. |
| pulseOnClick | boolean | true | Clicking sends a light surge along the threads (max 3). |
| paused | boolean | false | Freezes the weave phase but keeps hover. |
| dpr | number | 2 | Canvas pixel ratio ceiling, min 0.5. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of WebThreads.jsx and WebThreads.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: 6 threads weave through the pinch with the default V envelope and alternate phase when mirror is on; nodes 2–6 regather the threads at multiple pinches; the cursor lifts and brightens the touched thread while the others settle, and the effect survives leaving/re-entering; clicking left of the pinch sends a surge right (and vice versa) that races to the edge with a bright front and staggered per-thread start, up to 3 at once; intro draws each thread stroke by stroke with a bead at the tip; depth makes strands overlap at pinches; pulses add travelling beads; shimmer, thickness, spread, taper, position, pinch, angle, frequency, falloff, brightness, opacity, fade, grain, colors, coreColor all take effect; background composites opaquely when a colour is given; lightMode prints ink on white; reduced motion freezes phase/intro/shimmer and disables surges while hover still works; paused freezes the weave but keeps hover; resize redraws; off-screen skips rendering; unmount removes the canvas and leaves no listeners or GL objects; 375 / 768 / 1440 wide without overflow.
