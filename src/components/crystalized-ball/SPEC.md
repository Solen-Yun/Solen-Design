Implement the "CrystalizedBall" component from zero: a glowing glass sphere whose rim is a living electric discharge — several luminous strands of ripple noise crackle around the circumference, random lightning arcs snap across it, and a volumetric cloud of glowing dust drifts inside the ball, swirling around the cursor when it enters. The whole scene is additive-emissive WebGL2 rendered in a few GPU passes, works on light and dark pages, and falls back to nothing (no canvas) when WebGL2 is missing. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + one small WebGL helper dependency (ogl ^1.0.11) for the renderer/program/mesh wrappers; two files only: CrystalizedBall.jsx (entry, palette math, all four GLSL programs, simulation) and CrystalizedBall.css (one rule set). React >= 18. No iframe.
- Root is a `<div>` with class `crystalized-ball` plus any `className` and `style`: position relative, width 100%, height 100%, overflow hidden. The canvas is appended as a child, `aria-hidden="true"`, display block, width/height 100%. The component fills whatever box the host gives it; the ball radius derives from `size × min(width, height) / 2`.
- Context: WebGL2, alpha true, premultipliedAlpha true, antialias false, depth false. If WebGL2 is unavailable the effect silently renders nothing (the context is lost immediately, no canvas is appended). DPR = min(devicePixelRatio, 2, sqrt(4.5e6 / (width × height))) — a pixel budget caps the resolution on huge containers.
- Four GPU passes per frame. Pass 1 ("field", additive) renders the ball body and rim into an offscreen HALF_FLOAT scene target; pass 2 renders the dust points additively into the same target; pass 3 (only when float render targets exist) updates a per-particle offset/velocity state pair in two ping-pong float render targets 256 texels wide; pass 4 composites the scene target to the screen with a tone-mapping knee and, in the light theme, an ink conversion. When float render targets are unavailable the scene is encoded at 1/4 scale into UNSIGNED_BYTE and decoded ×4, and the dust stirring simulation is disabled (dust still drifts on its base motion).
- Colour parsing accepts any CSS colour string via a 2D canvas probe (hex/rgb/hsl all resolve); unparsable input falls back to the preset colour. All palette maths run in Oklab: the theme palette derives rim, rimHot (+72% white), rimMid/rimDeep (toward black), spark, sparkGlow, haze pool, edge tint and 5 dust tones from the base colour with fixed hue shifts of 0/±16°; the light theme instead clamps lightness (rim ink at L ≤ 0.62, deeper tones slightly lighter) so everything reads as coloured ink on paper. Palette rebuilds only when colour or theme changes.

## The electric rim (field pass)

- Inner body: a soft radial haze pool sitting low inside the disc (its centre and radius move with `fill`), plus a darker edge band at the bottom-right of the disc — both scale with `haze` and the intro presence.
- Rim: three stacked gaussian bells along the circle radius — a deep halo slightly outside, a wide soft glow, and a crisp 1px-scale core line whose width follows `uLine = max(0.6, radius × 0.0035)`. The whole rim dims toward the top (lift-based falloff) and blooms in over the intro.
- Strands: `strands` (1–8) independent displacement waves ride on the rim radius. Each strand sums 4 sine harmonics with amplitudes 0.35/0.30/0.22/0.13; harmonics are generated once from a seeded RNG (frequencies banded at 6–12 / 18–34 / 40–70 / 80–130, speeds 0.6–12 rad/s, random direction). The circle is discretised into `bins = clamp(2π·radius / 2.6, 240, 900)` segments and each bin gets an extra white-noise jitter re-seeded every 1/24 s, so the outline shimmers discretely like a plasma discharge. Each strand draws a hot white core (gaussian in the radial distance, width from `uLine` × per-strand width factor × a slow breathing swell) plus a coloured sheath, and an outward "flare" bump field: 3 noise harmonics plus one slow lead harmonic shape a lobe that pushes secondary glow bells outward. Flare/glow strength scales with `flares`/`glow`; `crackle` drives the displacement amplitude, jitter and flare height.
- Pointer heat: the cursor's angle around the centre is tracked with a spring (acceleration 120, damping 19). A heat power value eases toward the hover strength while the pointer is inside (in over 0.3s, out over 0.55s) and a "near the rim" factor follows a gaussian of (distance − radius). Heat locally multiplies crackle (+0.9 at full heat), strand brightness, flare glow and arc frequency, so the discharge leans toward and intensifies under the cursor.
- Arcs: up to 4 simultaneous lightning arcs. Each is a quadratic Bézier between two rim points (span 0.05–0.12 rad, bow 0.02–0.06 of the radius inward/outward), sampled as 10 segments in the shader with a gaussian core + wide sheath, tapered by sin(π·along). Arcs live 0.2–0.4s with a sin(π·life) envelope and a small angular drift. The spawner runs at a rate set by `sparks` (scaled by crackle), biased 70% toward the heat angle when the cursor is hot and otherwise 70% toward the top of the ball. A click always spawns two arcs at ±opposite angles of the click point with high strength.

## Dust cloud & stirring

- Up to 40000 points (`particleCount` rounded to multiples of 100, clamped to the max). Positions are generated once from a seeded RNG: 28% sit in a thin ring hugging the inner rim (radius 0.87–0.975) with an upper bias; the rest fill the volume weighted toward a bottom bowl plus a rim band, rejecting the outer 2.5%. Each point stores a home position, a tone index (5 palette tones, brighter ones concentrated low and near the rim), a size seed (1.3× typical, 2.1× for 22%, 1.8× for rim sparkles), a loop period and a travel length.
- Base motion: every point loops on its own phase through one of 4 `motion` modes — rise (lifts a fraction of its travel upward), fall (downward), drift (three slow sinusoid offsets), orbit (small circular loops, direction and radius per point) — plus a small per-point wobble and a global slow tumble of the whole cloud (yaw/pitch from `sway`, blended with a gaze offset that follows the cursor via a spring, acceleration 40, damping 11). `dustSpeed` scales the dust clock independently of the rim clock; `speed` scales the rim clock; both are boosted ~40% during a click surge.
- Rendering: point size = size seed × (radius/491 scale) × life envelope × depth factor (`depth` mixes nearer points bigger/brighter) × twinkle (per-point blink rate gated by `twinkle`) × reveal (points appear bottom-up during the intro). Coverage is anti-aliased square or round sprites (`particleShape`). Colour = tone colour + a rim-lit boost when near the silhouette; alpha adds into the additive target.
- Stirring (float targets only): each particle carries an offset + velocity in the state textures. Per step: a spring pulls the offset home (k 0.8–2.2 per point, damping 1.5√k), a gaussian brush (σ² 0.07) around the cursor pushes velocity toward the smoothed cursor velocity, and a curl-noise swirl field deflects moving particles sideways (never against their heading). A click adds an impulse: random jolt + tangential spin + an upward lift strongest for particles in the lower half. Offsets are clamped inside radius 0.97 with the normal velocity component damped. The simulation runs while a stir energy accumulator (brush power × speed, decaying over 1.2s) is alive or a kick is pending, keeps running 7s after the last energy, then resets both state textures to rest.

## Timing, interaction & lifecycle

- Intro (2.2s, `intro` on): presence eases in over the first 42%, strands unfold over 32%, haze fades in after 20%, dust reveals bottom-up across the whole intro, and a mid-intro charge bump (+0.35 crackle) flashes the rim. With `intro` off or reduced motion everything starts settled.
- Listeners live on window: pointermove (also tracks when the pointer is outside), pointerdown (kick only when `interactive`, not reduced motion, and within 1.3× radius; also boosts surge and spawns the click arcs), pointerout/blur/pointerup(touch) release hover, visibilitychange restarts the loop. A ResizeObserver re-measures on the next frame; an IntersectionObserver parks the loop while off-screen.
- Frame-loop self-sleep: the loop keeps requesting frames only while time is advancing (`paused` false and not reduced motion), the intro is unfinished, or the system is settling (hover power, surge, stir timer, heat angular velocity or gaze spring still above epsilon). When settled it stops; any pointer event, prop change, resize, tab visibility change or scroll-back wakes it.
- Reduced motion: intro completes instantly, sparks/arcs never spawn, stirring and tumble freeze (clocks stop), hover heat is disabled; the ball renders as a static frame whenever woken.
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete the dust geometry/textures/state targets and scene target, lose the WebGL context and remove the canvas. Same-page instances are fully independent (own renderer, own seeds, own state).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| preset | string | "plasma" | Named starting point: plasma / aurora / nebula / ember / frost / solar / eclipse / abyss. Seeds every visual parameter below; explicit props override it. |
| color | string | preset colour | Base colour of the rim, sparks and dust palette. Preset colours: plasma #F25BD0, aurora #5CFFC8, nebula #9478FF, ember #FF8A2A, frost #BFE6FF, solar #FFD36E, eclipse #FFFFFF, abyss #3F7BFF. |
| theme | "dark" \| "light" | "dark" | Dark renders additive emissive light; light converts the field to ink strokes on paper and dims glow/haze. |
| size | number | 0.7 | Ball radius as a fraction of min(width, height) / 2; clamped 0.1–1.5. |
| strands | number | preset (6) | How many displacement waves ride the rim, 1–8. |
| crackle | number | preset (0.85) | Rim roughness: displacement amplitude, jitter and flare height, 0–1. |
| flares | number | preset (0.65) | Size of the outward flare lobes on each strand, 0–1. |
| glow | number | preset (0.9) | Rim and halo brightness, 0–2; halved in the light theme. |
| sparks | number | preset (0.6) | How often lightning arcs spawn, 0–1; 0 disables arcs. |
| particleCount | number | preset (15000) | Dust points; rounded to multiples of 100, capped at 40000. Presets: plasma 15000, nebula 18000, ember 12000, frost 16000, solar 15000, eclipse 14000, abyss 20000. |
| fill | number | preset (0.5) | How much of the lower hemisphere the haze pool occupies, 0–1. |
| motion | "rise" \| "fall" \| "drift" \| "orbit" | preset ("rise") | Base travel of the dust points. |
| particleShape | "square" \| "round" | preset ("square") | Dust sprite silhouette. |
| depth | number | preset (0.6) | Depth parallax of the cloud: back points shrink and dim, 0–1. |
| sway | number | preset (0.5) | Global slow tumble of the cloud, 0–1. |
| twinkle | number | preset (0.5) | Per-point blinking depth, 0–1. |
| haze | number | preset (0.7) | Inner haze pool and edge band intensity, 0–2; reduced in the light theme. |
| speed | number | 1 | Rim clock rate; multiplied again by surge and hover heat. |
| dustSpeed | number | preset (1) | Dust clock rate, independent of the rim. |
| interactive | boolean | true | Enables hover heat, gaze tilt, dust stirring and click kicks. |
| hoverStrength | number | 0.7 | How hard the cursor heats, steers and stirs, 0–1. |
| intro | boolean | true | Plays the 2.2s reveal (strands unfold, dust rises in). |
| paused | boolean | false | Freezes both clocks; rendering still responds to resize and clicks. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of CrystalizedBall.jsx and CrystalizedBall.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the rim crackles with visible strand waves and random arcs on the default plasma preset; hovering heats and bends the discharge toward the cursor and stirs the dust; clicking kicks the dust with a surge and two opposing arcs; all 8 presets render with their own colour, count and motion; switching motion/shape/particleCount rebuilds the cloud without leaks; theme light reads as ink on a light page; `paused` freezes motion while still reacting to resize; `intro=false` starts settled; WebGL missing renders an empty box with no console errors; float-target-missing devices still show the ball (encoded target, no stirring); prefers-reduced-motion shows a static settled ball; unmount leaves no frame loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers keep the ball centred without overflow.
