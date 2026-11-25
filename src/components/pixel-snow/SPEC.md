Implement the "PixelSnow" component from zero: a pixel-art snowfall rendered entirely on the GPU. Every snowflake is a tiny sprite stamped from a built-in pixel atlas and drawn as a GPU-instanced quad; flakes drift down through five parallax depth layers, the cursor brushes them aside, and an optional snow bank accumulates at the bottom with dithered shading and glinting crests. A soft bloom halo finishes the look. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: PixelSnow.jsx (entry, simulation, shaders, atlas builder) and PixelSnow.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `pixel-snow-container` (position relative, width 100%, height 100%, overflow hidden); `className` appends to it and remaining props spread onto it. The only child is a `<canvas class="pixel-snow-canvas" aria-hidden="true">` (position absolute, inset 0, display block, width/height 100%). The component fills whatever box the host gives it; it draws no background of its own.
- Context: `webgl2` with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. If the context or any of the five programs fails to build, the effect silently renders nothing (the component stays a transparent layer, no console spam).
- Five programs: `flake` (instanced sprite quads), `pile` (snow bank), `down` (bloom downsample, 3 levels), `up` (bloom upsample, 2 levels), `composite` (final output to the default framebuffer). Full-screen passes draw one big triangle `(-1,-1) (3,-1) (-1,3)`.
- Frame pipeline: flakes + pile are rastered into a `snow` texture sized to the pixel grid (NEAREST filtering, one texel per "big pixel"); the snow buffer is downsampled 3× and upsampled 2× (bilinear, blended with the unblurred base at each level) into a glow map; the composite pass samples the snow texture (nearest cell under the fragment) and the glow map and writes premultiplied color with an edge-fade mask and tone mapping.
- Geometry grid: `pixel = max(1, round(pixelSize × ratio)) / ratio` CSS px per cell; canvas is CSS size × ratio (ratio = min(dpr, 2)); grid = ceil(css / pixel) cells. The flake atlas is a NEAREST RGBA texture, 8 cells wide × 3 rows tall, each cell 9×9.

## Sprite atlas (built-in art)

- Atlas cells are authored as ASCII rows encoded at build time: `.` = empty, `x` = plain body pixel (R=255, G=0), `o` = mid pixel (R=255, G=128), `@` = hot core pixel (R=255, G=255).
- Three variant families, one atlas row each: `square`, `round`, `snowflake`. Each row holds 8 cells: slots 0–4 are the five depth sizes (largest last), slots 5–7 repeat the middle/large sprites for variety. Sprite sizes per family: square 1/2/3/4/5 px, round 1/3/4/5/7 px, snowflake 1/3/5/7/9 px.
- `square`: solid pixel blocks with `x` border pixels and a `@` centre (largest is a diamond-weighted disc). `round`: discs with an `x` rim, `o` inner ring and `@` centre. `snowflake`: eight-armed crosses — `@` centre, `o` diamond, `x` arm tips with `o` barbs. Exact pixel art is embedded in the code; treat the descriptions above as the composition guide (white sprites on transparent, hot centres, rim-to-core gradient) and keep the encoder identical.

## Depth layers & motion

- Constants: 5 levels; fall speeds 16/24/34/48/66 px/s; spawn weights 0.46/0.27/0.15/0.08/0.04; per-level brightness 0.42/0.58/0.76/0.92/1; 4000 flakes max; intro lasts 1.4s.
- Population: target = round(cssWidth × cssHeight × density / 1100), clamped to 4000; flakes spawn at a random x (±20 margin) and either anywhere in view or above the top edge (-10 - rng×30).
- Per flake: parallax = 1 - depth × (1 - (level+1)/5) × 0.75; horizontal sway = sin(time × rate + phase) × sway × (6 + level × 7); target velocity = ((wind × 46 × parallax + sway) × drift, fall × parallax × speed × drift) with drift 0.7–1.3; velocity exponentially eases toward the target at 1 - exp(-dt × 2.2). `flakeSize` re-weights the level lottery by 2.2^(shift × (level - 1.5)) and live flakes re-roll their level when it changes.
- Recycling: past the bottom margin (24px) a flake respawns on top with a fresh stagger; negative `speed` makes flakes rise instead. Horizontal position wraps around the ±24px margin.
- Twinkle: spark = max(0, sin(time × 0.9 + sparkleSeed))^60 × twinkle lifts a flake's light briefly.

## Cursor & accumulation

- Cursor push (mouseInteraction on): while the pointer is inside, a push factor eases to 1 (rate 6/s in, 3/s out); flakes within 120px get a radial impulse (near³ × push × 1500 × dt, near = 1 - dist/120) plus a carry of the pointer velocity (near² × push × dt × 5, velocity tracked from move events, clamped ±3000 px/s, decaying at exp(-6dt)).
- Accumulation (accumulate on): each snow grid column holds a pile height in cells. A flake reaching the pile surface bumps a triangular kernel around its column ((0.35 + level × 0.15) × falloff) and respawns. Each frame the pile grows toward a dune profile (0.55 + 0.45 × sin noise over x, capped at 8% of grid height), two relaxation passes even out steps larger than 1.2 cells, and excess above the cap melts at 0.8×excess/s. With accumulate off (or speed ≤ 0) the pile melts at 2 + height × 0.6 cells/s.
- Pile rendering: per pixel the column height is fetched from an R32F row texture; the crest row is a bright cap, deeper rows are bayer-4×4 dithered into 4 shade steps from 0.94 down; the top 3 rows get rare 1px glints (~0.8% per row per second, stepped at ~1.1Hz).

## Intro, colour & output

- Intro: a reveal front sweeps down the container over 1.4s (1.75 screen-heights of travel); each flake fades in when the front passes its y plus a per-flake stagger of 0–0.25 screens (alpha = reveal²).
- `color` accepts any CSS colour, parsed once through a 1px canvas probe and cached per string; unparsable falls back to white.
- Dark output: body/core channels are combined (body × 0.82 + core × 0.18), the glow-map halo adds 0.55 × glow × brightness of tinted light, then tone-mapped with 1 - exp(-c × 1.6); alpha = brightest channel. Light output (`lightMode`): the sprite is tinted toward white by its core ratio and drawn premultiplied at 0.95 × body alpha plus a soft halo — designed to sit on light backgrounds.
- Edge fade (`fade` 0–1) multiplies a smootherstep mask over fade × 0.5 of each edge; `opacity` scales the whole output.

## Interaction, performance & lifecycle

- Settings are mirrored into a ref every render; a per-render wake call re-renders once (and re-runs resize when `pixelSize` or `dpr` changed) so every prop is live without re-initialising the GL state.
- Frame loop self-sleeps: it keeps requesting frames only while unpaused motion is running or the cursor push is settling; otherwise it stops until woken. Wake sources: window pointermove (passive), documentElement pointerleave, visibilitychange, ResizeObserver on the container, IntersectionObserver (fully offscreen stops the loop), and the per-render wake.
- prefers-reduced-motion: motion freezes on the current frame, the intro snaps to done, and cursor push is disabled.
- DPR: min(dpr || devicePixelRatio, 2).
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete all textures/framebuffers/programs/buffers/VAOs, and call `WEBGL_lose_context.loseContext()` if the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#ffffff" | Snow colour; any CSS colour, unparsable falls back to white. |
| variant | "square" \| "round" \| "snowflake" | "snowflake" | Which sprite family the flakes draw from. |
| density | number | 0.5 | Flake count per area, 0–1; roughly count = width × height × density / 1100. |
| speed | number | 1 | Fall-speed multiplier; 0 freezes falling, negative makes snow rise. |
| wind | number | 0.25 | Horizontal drift, clamped ±2; ×46 px/s of sideways push. |
| sway | number | 0.5 | Side-to-side swing amplitude. |
| flakeSize | number | 1 | Shifts the size mix, 0–2; >1 favours big flakes, <1 favours small. |
| pixelSize | number | 3 | Size of one "big pixel" in CSS px, 1–12. |
| depth | number | 0.6 | Parallax strength, 0–1; scales speed and brightness differences between layers. |
| brightness | number | 1 | Overall brightness multiplier. |
| glow | number | 0.8 | Bloom halo strength around the flakes. |
| twinkle | number | 0.35 | How often flakes sparkle, 0–1. |
| accumulate | boolean | false | Snow settles into a dithered, glinting bank that slowly grows. |
| mouseInteraction | boolean | true | The cursor brushes nearby flakes aside. |
| intro | boolean | true | A reveal front sweeps down and uncovers the snow on mount. |
| fade | number | 0 | Softens the container edges, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Prints the snow as soft ink for light backgrounds. |
| paused | boolean | false | Freezes motion but keeps the last frame visible. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of PixelSnow.jsx and PixelSnow.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: snow falls in visibly layered depths with the largest/brightest closest; all three variants render their distinct pixel sprites; wind, sway, speed and flakeSize respond live; the cursor carves a moving hole in the snow and drags flakes with it; accumulate builds a growing bank whose crest glints and that melts away when switched off; intro sweeps down once and does not replay on prop changes; pixelSize changes rescale the grid without artefacts; color accepts hex/rgb()/hsl() strings; fade and opacity mask cleanly; lightMode reads well on white; paused freezes but the frame stays; prefers-reduced-motion shows a static field with no push; hiding the tab or scrolling offscreen stops the loop and it resumes on return; resize keeps the grid aligned; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
