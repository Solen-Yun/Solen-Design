Implement the "MoltenMetal" component from zero: a full-bleed WebGL2 field of swirling caustic filaments with white-hot cores — recursive folded interference lines that crawl like liquid metal, coloured along a gradient whose hottest end is the core colour. The cursor heats the metal: dragging leaves a decaying heat trail that thickens and brightens nearby filaments, the whole field drifts gently toward the pointer, and clicking flares a rising/decaying bloom. A log-scale intro unveils the pattern from darkness with a bright travelling rim, a light mode inks the filaments on paper, colour modes (molten/ember/frost) reshape the gradient balance, and up to six colours define the ramp. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: MoltenMetal.jsx (entry, pointer trail state, GLSL) and MoltenMetal.css. No runtime dependencies. No iframe.
- Root is `<div class="molten-metal-container">` (position relative, width/height 100%, overflow hidden) receiving className/style; the canvas (`class="molten-metal-canvas"`, absolute inset 0) is created by the component and removed on unmount. Pointer input listens on the window; clicks are ignored when they land on interactive elements (a/button/input/textarea/select/label/[role="button"]).
- Context: webgl2 with alpha true, antialias false, depth false, stencil false, premultipliedAlpha true, powerPreference "high-performance". Geometry is one full-screen triangle with the attribute bound at location 0. Missing context or a failed program leaves the container blank.
- Canvas size = container size × min(devicePixelRatio, dpr prop), refreshed by a ResizeObserver.
- Fragment shader, one program, up to 8 detail layers. Coordinates: uv centred by resolution.y; q = uv − offset (offsetX/offsetY, x aspect-corrected); view rotated by rotation (degrees); p = scale × view − 0.5 + drift.

## Filament field

- Iterative fold: each layer multiplies p by a 2×2 warp matrix built from rot = |p₀| + time + p.x × swirl and fold = −turbulence, then steps the sample point with a pair of sin/cos interference terms (plus a slow breathing radius |p + wobble| with sin(time) and sin(0.3·time + 5)); the accumulated length l = |(sin(i.x + t), cos(i.y + t))| is smoothed by its shader footprint (fwidth) to kill moiré.
- Contribution: c += weight × glow × 0.1 / l^power, weight fading toward the last layer (detail 1–8, fractional weights), total ÷ 6. power = thickness clamp 0.2–3 × (1 + (heat + flare) × 0.45) — heat physically thickens the filaments.
- Colour ramp: up to 6 colours (first five from colors, then coreColor appended as the hottest stop). balance splits the ramp per colourMode: molten 0.5, ember 0.3, frost 0.7. g = clamp(max(c − blackPoint, 0) × brightness + flareFront, 0, 1) with blackPoint = 0.2 × (1 − haze clamp 0–1) and brightness ≥ 0.
- Output: dark mode alpha = g + grain noise (±, animated by clock); light mode lifts alpha = (1 − exp(−6·lift)) / (1 − exp(−6)) so pale filaments read on paper. Grain (≥ 0) and a ±0.5/255 dither apply in both. backgroundColor other than "transparent" composites opaque (mix toward that colour, alpha 1); otherwise premultiplied. All scaled by opacity 0–1 and the intro reveal.

## Cursor heat & flares

- Heat trail: while the pointer is inside and mouseInteraction + mouseStrength > 0, a presence value eases 0→1 (rate 1/0.25 s). The trail keeps up to 16 samples: the live head follows the pointer, and when it moves (> 0.004 uv) past a 0.06 s settle window it freezes a mid-sample so fast strokes leave interpolated segments. Each sample's warmth = weight × (1 − life)² × exp(−|Δ|² / (heatRadius² × (1 + 0.8 × life))) with life = age / 0.9 s; samples die after 0.9 s. heat = trailHeat × mouseStrength clamp 0–1 × 2; flare adds click blooms.
- Click flare (flareOnClick, primary button, inside the container, not reduced motion): up to 8 live flares, each rising 1 − exp(−age/0.07) and decaying exp(−3·life) × (1 − life)² over 1.8 s, its radius swelling with sqrt(life). Heat and flare raise brightness (× 1 + heat·0.25 + flare·0.6) and thicken filaments.
- Drift: the whole field's centre eases toward the pointer (amplitude drift × 2, rate 1/0.33 s) while the pointer is inside with mouseInteraction on.

## Intro & lifecycle

- Intro (2.4 s, skipped when off or reduced motion): a blurred copy of the field reveals on a log scale — the threshold slides from log(1.6) to log(0.01/1.6) eased linearly, the reveal smooth-steps over ±1 of that level, and a bright front rim (exp(−level² × 1.5) × 0.2) sweeps with it, so the pattern burns in from darkness.
- The render loop ticks every frame but skips drawing once quiet: quiet counts frames with no transient activity (no trail, no flares, no drift motion, intro finished) and unchanged props; any pointer, resize or prop change resets it. paused or reduced motion freezes time; paused still renders one settled state.
- Colours parse through a shared canvas-2d probe (any CSS colour; "transparent"/alpha-0 → treated as absent); unparsable falls back to white.
- Unmount: cancel the frame, disconnect both observers, remove listeners, delete program/buffer/VAO, drop the WebGL context, remove the canvas. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#5227FF", "#FF9FFC"] | Gradient ramp before the core (first five entries used); any CSS colours. |
| coreColor | string | "#FFFFFF" | Hottest stop of the ramp — the white-hot filament cores. |
| backgroundColor | string | "transparent" | Opaque backdrop colour; "transparent" keeps the canvas see-through. |
| lightMode | boolean | false | Inks the filaments for pale backgrounds instead of glowing on dark. |
| speed | number | 0.35 | Time scale of the crawl and swirl. |
| scale | number | 4 | Field zoom; higher packs filaments tighter. ≥ 0.1. |
| detail | number | 3 | Fold iterations 1–8 (fractional layers fade out). |
| glow | number | 1.6 | Overall filament brightness, ≥ 0. |
| thickness | number | 1 | Falloff exponent of the filaments, 0.2–3; higher = thinner, sharper cores. |
| swirl | number | 1 | How much the fold twists across x. |
| turbulence | number | 0.2 | Strength of the recursive fold matrix. |
| haze | number | 0.75 | Lifts the black point, 0–1; higher fills the darks with faint filaments. |
| brightness | number | 1.3 | Gain after the black point, ≥ 0. |
| colorMode | "molten" \| "ember" \| "frost" | "molten" | Where the gradient pivots: 0.5 / 0.3 / 0.7 of the ramp. |
| rotation | number | 0 | Field rotation in degrees. |
| offsetX | number | 0 | Pan along x (aspect-corrected). |
| offsetY | number | 0 | Pan along y. |
| drift | number | 0.3 | How far the field leans toward the cursor, ≥ 0. |
| grain | number | 0.05 | Animated film grain, ≥ 0; a boolean maps true→0.05/false→0. |
| opacity | number | 1 | Overall canvas alpha, 0–1. |
| intro | boolean | true | The 2.4 s burn-in reveal with the bright travelling rim. |
| mouseInteraction | boolean | true | Enables the heat trail and the drift toward the pointer. |
| mouseStrength | number | 0.5 | Heat trail intensity, 0–1. |
| flareOnClick | boolean | true | Clicks flare a rising/decaying bloom (max 8 live). |
| paused | boolean | false | Freezes time; renders one settled frame. |
| dpr | number | 2 | Canvas DPR ceiling, ≥ 0.5. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of MoltenMetal.jsx and MoltenMetal.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: filaments crawl with white-hot cores that follow the ramp into coreColor; dragging heats and thickens nearby filaments and the trail decays within ~0.9 s; clicking flares blooms that rise fast and fade over 1.8 s; the field drifts toward the pointer and relaxes back; ember/frost visibly re-pivot the gradient; up to six colours blend smoothly with coreColor on top; scale/detail/thickness/swirl/turbulence/haze/brightness reshape the field live; light mode reads on white and an opaque background hides through-transparency; the intro burns in once with a bright rim and intro off skips it; paused freezes one frame; reduced motion stops time and disables flares; grain animates subtly; canvas tracks its container at 375 / 768 / 1440 wide without overflow; the loop skips rendering when settled; unmount leaves no listeners, observers, canvas or frame loop; same-page instances are independent.
