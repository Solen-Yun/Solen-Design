Implement the "MetaBalls" component from zero: a full-container canvas of liquid blobs that orbit, drift or simmer like lava, merging and pinching apart through a metaball field, while a cursor-sized blob swims after the pointer and pushes through the crowd — click and the splash scatters the crowd outward. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: MetaBalls.jsx (entry, ball simulation, shaders) and MetaBalls.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div` with class metaballs-container plus an optional extra className and inline style; it is position relative and fills its parent (width and height 100%). Inside is one `<canvas>` (class metaballs-canvas), display block, filling the container.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false. If the context or program creation fails, the component renders nothing and must not throw.
- One program, one buffer, a single 3-vertex triangle covering clip space. Per frame it uploads up to 51 balls (50 crowd balls + 1 cursor ball) as two vec4 arrays: uBalls (x, y, radius squared, isCursor flag) and uShapes (four entries of the per-ball ellipse transform derived from its stretch state).
- World space: the canvas height maps to `animationSize` units (uScale = animationSize / canvas height in px); the visible half-width in units is animationSize × width / height / 2. Device pixel ratio = the dpr prop or devicePixelRatio, clamped to 0.5–2.
- Field shader: each ball contributes w = (r² / |A·d|²)^gamma, where d is the pixel-to-ball-centre vector, A is the ball's 2×2 stretch matrix (inverse-square when gamma ≈ 1). The surface is where the summed field crosses threshold = 1.3^gamma. Each pixel also accumulates a soft mass weight w / (1 + w / threshold) with a tint channel; the body colour is `color`, and the cursor ball's colour (`cursorBallColor`) is mixed in proportionally to its tint share, so the crowd visibly melts into the cursor colour where they fuse. Field-gradient length drives screen-space edge antialiasing.
- Three render variants (variant prop): "solid" fills the body at full alpha inside 3× threshold, with a slope-based antialiased rim; "outline" keeps only a band hugging the threshold — lineWidth px scaled by DPR, alpha 0.5·line + 0.5 − |field distance|; "contour" draws concentric iso-lines outside the body: rings spaced 0.28 apart in rho = (field/threshold)^(−0.5/gamma) space, at most `rings` rings (0–12), each successive ring fading by ring/(rings+1), and outer rings fade out entirely where the local line width would drop below roughly 6–12× lineWidth.
- Colour parsing accepts 3/6-digit hex; unparsable input falls back to white. With enableTransparency=false the canvas clears to opaque black and blobs render at alpha 1; with true it clears transparent and blob alpha follows the field falloff (premultiplied output either way).

## Motion modes

- `motion` picks each ball's anchor path, phase driven by a global clock advanced by `speed` per second: "orbit" swings each ball on its own loop — random angular rate 0.1π–0.4π rad/s, random reach 5–10 units, both scaled by clumpFactor, with a per-ball vertical wobble term that folds the loop into a Lissajous-like petal; "lava" slides each ball up and down a vertical lane (x = lane·halfWidth·0.8·clumpFactor with a small sway), y following a signed, power-0.55 eased sine cycle so blobs stack at the top and bottom like a lava lamp; "drift" wanders on two independent sines (horizontal at rise-rate, vertical at its own rate) over 0.78–0.84 of the half extents.
- Idle cursor path when the pointer is away: on orbit it circles a 0.3-halfspan ellipse of the stage at clock·speed; on lava and drift it follows the same anchor formula as the crowd (an off-stage idle ball with fixed random parameters).

## Physics & gooeyness

- Simulation runs in fixed sub-steps (target 240 Hz, sub-step count = ceil(dt/(1/240)), frame dt clamped to 0.05 s). Each ball spring-follows its anchor (stiffness 20, damping 5.4) with the anchor's own velocity fed forward, so the crowd keeps momentum when anchors sweep.
- Pair forces per ball pair within reach = (rp + rq) × reach where reach = 2^(0.5/gamma): inside core distance 0.62·(rp+rq) a linear repulsion (−60·overlap) pushes apart; in the band beyond the core a gooey attraction pulls with strength 36·stickiness·min(rp,rq), windowed by smoothsteps at 0–0.6 and 0.82–1 of the band — this attraction is what stretches liquid bridges between near balls before they merge. Forces divide by each ball's squared radius plus 0.05. The cursor pair uses stronger repulsion (−140) and weaker attraction (0.6× pull), so the cursor blob ploughs through the crowd without sticking.
- Stretch: each ball carries a 2×2 deformation driven by its velocity — target shear amount = 0.6·stretch·tanh(speed/14) oriented along the velocity vector, tracked by a spring (omega 13, damping ratio 0.85 − 0.68·wobble, wobble 0–1) that overshoots and jiggles at high wobble. The matrix is encoded per ball as [c−k·a, −k·b, c+k·a] with c = cosh(m), k = sinh(m)/m, m = magnitude of (a,b) — blobs elongate along motion and relax back.
- Non-finite states snap back to their anchor with zeroed velocity and deformation.
- Click burst (clickBurst, left button, only while enableMouseInteraction and not paused): every ball within animationSize·0.45 units of the click gets a radial kick of 72·(1−dist/radius)^1.2 plus a 0.3 tangential swirl; the cursor ball also gets a pulse — a spring bump (velocity +9, omega ≈ 13, damping ratio 0.42, floor −0.4) that visibly inflates and wobbles it.

## Cursor & intro

- The cursor blob's radius is cursorBallSize units (× pulse, × intro size); crowd radii are 0.5–2 units × intro size. The pointer position converts to world units against the container rect; the blob eases toward it with an exponential follow of rate hoverSmoothness per 60 fps frame (clamped 0.001–1), and its velocity is estimated through a 0.05 s blend for the stretch term. Window pointerout only clears the inside flag when leaving the window; pointerup/pointercancel clear it for non-mouse pointers.
- Intro (intro prop, skipped under prefers-reduced-motion): the whole crowd scales in with a 0.5 s ease-out cubic while each ball releases toward its anchor with an ease-in-out 1.15 s flight and a random delay between 0.1 and 0.65 — a staggered flock-in rather than a hard pop.
- paused freezes the clock, physics and cursor motion (the canvas still redraws on resize); the frame loop keeps ticking while the container is visible (IntersectionObserver) and pauses offscreen; ResizeObserver measures are deferred into the next frame. Unmount cancels the frame, disconnects observers, removes all window listeners and deletes the GL buffer and program. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Extra class names for the container. |
| color | string | "#ffffff" | Colour of the liquid crowd. |
| cursorBallColor | string | "#ffffff" | Colour of the cursor blob; blends into the crowd where they merge. |
| speed | number | 0.3 | How fast the crowd's anchors sweep through their motion. |
| enableMouseInteraction | boolean | true | Lets the cursor blob chase the pointer and click bursts work. |
| hoverSmoothness | number | 0.1 | How snappily the cursor blob follows the pointer, 0–1. |
| animationSize | number | 30 | World height of the stage in units; sets blob scale and burst radius. |
| ballCount | number | 15 | How many crowd balls are simulated; rounded, 0–50. |
| clumpFactor | number | 1 | How tightly the crowd gathers toward the centre. |
| cursorBallSize | number | 3 | Radius of the cursor blob in units. |
| enableTransparency | boolean | false | Transparent canvas background instead of an opaque black one. |
| variant | "solid" \| "outline" \| "contour" | "solid" | Solid fill, edge line, or concentric contour rings. |
| motion | "orbit" \| "lava" \| "drift" | "orbit" | Anchor choreography of the crowd and idle cursor. |
| gooeyness | number | 0.5 | Field blend exponent and threshold shaping, 0–1 — how eagerly blobs fuse. |
| stickiness | number | 0.5 | Strength of the attraction that stretches bridges between near blobs, 0–1. |
| stretch | number | 0.5 | How much fast blobs elongate along their velocity, 0–1. |
| wobble | number | 0.5 | Springiness of the deformation — high values jiggle and overshoot, 0–1. |
| lineWidth | number | 1.5 | Stroke width for the outline and contour variants, in px. |
| rings | number | 4 | Number of contour rings for the contour variant, 0–12. |
| clickBurst | boolean | true | Clicking scatters nearby blobs and pulses the cursor blob. |
| intro | boolean | true | Staggered scale-and-fly-in on mount. |
| paused | boolean | false | Freezes the simulation without tearing down the engine. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 0.5–2). |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of MetaBalls.jsx and MetaBalls.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: solid blobs fuse with liquid bridges and pinch apart cleanly; the cursor blob tints fused regions and ploughs a hole through the crowd; outline shows only the melting edge and contour draws fading concentric rings; orbit / lava / drift each read as their own choreography; gooeyness low keeps blobs separate and high merges them early; stickiness 0 removes bridging; stretch and wobble visibly elongate and jiggle fast blobs; click scatters and the crowd recovers; intro flocks in staggered; transparency on and off both composite correctly over arbitrary backgrounds; paused halts motion while resizing still redraws; ballCount 0 renders only the cursor blob and 50 stays fluid; resize, DPR changes and container aspect ratios keep the field mapped edge to edge; prefers-reduced-motion skips the intro; WebGL missing leaves an empty container with no errors; unmount leaves no frame loop, observers or window listeners; 375 / 768 / 1440 wide without overflow.
