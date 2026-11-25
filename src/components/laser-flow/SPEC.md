Implement the "LaserFlow" component from zero: a volumetric laser beam that drops from above onto your content, splashes with a spring bloom, then pours sideways across its surface and over its rounded corners — fog drifting through the beam, dust motes flowing along the surface, twinkling sparks around the cursor, and an optional image revealed only where the beam's blue haze touches it. The beam geometry adapts to a DOM element passed by ref: its rect and border radius are measured, the beam is clamped inside it, and the spill hugs its outline. Everything is one WebGL2 fullscreen fragment pass; the palette is derived from a single base colour in HSV space. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Pure React, zero runtime dependencies beyond React >= 18; two files only: LaserFlow.jsx (entry, one raw WebGL2 program, intro choreography) and LaserFlow.css (container + canvas rules). The root `<div class="laser-flow-container">` (+ spread rest props incl. `className`) is position relative, width/height 100%, pointer-events none; `<canvas class="laser-flow-canvas">` is absolutely positioned inside, aria-hidden. Mount it as an overlay above (or behind) the content it should wash over.
- Context: WebGL2, alpha true, premultipliedAlpha true, antialias false, no depth/stencil; missing context → nothing renders. Render ratio = min(dpr prop or devicePixelRatio, 2), downscaled so the longest side never exceeds 2048.
- Surface measurement: `surfaceRef` (a React ref to any element) is watched by a dedicated ResizeObserver; its rect relative to the container and its computed top-left/right border radius (clamped to half the rect) form the surface box. Without a ref (or with a zero-width rect) the surface falls back to a horizontal line at `surfaceLevel × height`. If the beam sits outside the surface's horizontal span, the surface is treated as absent.
- Colour: `color` accepts any CSS colour via a canvas probe. From it the shader palette is built once per change: 16 HSV-derived tints (hue offsets from −53.5° to +142.5° with individual saturation scales around a 0.78 base) covering beam, side walls, cyan/pink/lilac band fan, sky/purple/deep falloffs, mist, navy halos, warm ember, white and haze — so recolouring shifts the whole scene coherently. An intro-time noise seed (`seed`) offsets the fog field.
- The fragment shader is value-noise/fbm based (5-octave domain-warped fog). All geometry lives in beam-space coordinates scaled by `uScale = min(width/585, height/507)` so the effect scales uniformly with the box.

## The beam & the pour

- Intro choreography (`intro`, ~5s total): the beam front drops from above the frame over 1.25s (power-1.3 ease); at impact a damped spring (ω 8, ζ 0.62) blooms the surface glow and a short white flash fires; a bright "run front" spreads sideways exponentially (rate 1.15/s) over `spread × 250 × 1.3 + 80` px, carrying a travelling bead highlight; each side's spill front then advances with a quintic smoothstep fill. Reduced motion or `intro=false` starts settled (bloom 1, fronts filled).
- Beam: a vertical column at `beamPosition × width` with a gaussian core (width `beamWidth`) plus two halo exponentials, tinted beam colour above and side-mix colour near the surface; a bright head blob rides the falling front.
- Surface wash: skirt glow (amplitude 16.6·flare decaying with height and distance via the surface's rounded-box SDF), a 12-unit hug layer, a wide wash and a navy high wash — all masked by the rounded-box distance so the light wraps the content's corners; the `spill` term scales two directional spill fans pouring down/over the sides, each with a gaussian profile band (cyan→pink→lilac fading to sky→purple→deep as it travels), warm core threads with noise streaks, ember glow at the bottom, all lit progressively during the intro.
- Flow lines: logarithmic-polar concentric lines around the impact point, per-line random on/off and brightness, drifting along the surface with noise wobble — the "poured liquid" streaks; scaled by `streaks`.
- Fog: domain-warped fbm clouds (density gated 0.5–0.78) lit by the beam and the surface wash, scaled by `fog × atmosphere` (atmosphere itself ramps in during the intro).
- Dust & sparks: point particles flowing outward along the surface gradient (`dust`), glitter falling inside the beam column, a 3px dot grid lit by blue haze (`dots`), and twinkling white sparks clustered around the cursor lens — each gated by its amount uniform and the bloom.
- Cursor lens: a gaussian blob (σ 95 × scale) spring-follows the pointer (acceleration 120, damping 19; strength eases in 0.3s / out 0.55s), brightening the wash (+35% inside), the sparks and the fog. `mouseInteraction=false` disables it.
- Reveal image: `revealImage` (loaded with crossOrigin anonymous, downscaled to ≤2048, cover-mapped to the canvas) lights up in luminance where the cursor lens overlaps it, gated by the beam's blue channel (clearance keeps the beam core readable) scaled by `revealOpacity` × `revealRadius`. Failed loads silently disable the effect.
- Output: HDR tone-mapped (1 − exp), then dark theme emits premultiplied colour; light theme extracts hue-only colour with alpha from chroma (for compositing on light pages). A rounded-box mask outside the surface dims nothing above it — the beam passes in front of the content by design.

## Timing & lifecycle

- The frame loop re-queues while the clock advances (`paused` false, not reduced motion), the intro is unfinished, or the lens spring is settling; when settled it sleeps until pointer movement, resize, visibility change or a prop update (a wake effect fires after every render). IntersectionObserver parks rendering off-screen.
- `paused` freezes the animation clock but the cursor lens and prop changes still redraw.
- Unmount: cancel the frame, disconnect both observers, remove window/document listeners, delete texture/buffer/VAO; the program deletes once the link settles (parallel compile polled); if the canvas is still connected at unmount, context loss is deferred one frame to avoid tearing during route transitions. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| surfaceRef | React.RefObject<Element> | - | Ref to the element the beam pours over; its rect and border radius drive the surface geometry. |
| beamPosition | number | 0.6 | Horizontal beam placement as a fraction of the width, 0–1; clamped inside the surface. |
| surfaceLevel | number | 1 | Fallback surface height as a fraction of the height, 0–1, when no ref is given. |
| color | string | "#3847ff" | Base colour; the whole 16-tint palette derives from its hue. |
| intensity | number | 1.8 | Global brightness gain (min 0). |
| beamWidth | number | 1.5 | Beam core width scale, 0.2–5. |
| flare | number | 1.5 | Skirt/spill flare height and spread, 0.2–4. |
| spread | number | 1.5 | How far sideways the run front and fans travel, 0.1–4. |
| spill | number | 1 | Directional pour fans over the sides (min 0). |
| fog | number | 0.2 | Fog cloud density (min 0). |
| dust | number | 1.6 | Flowing dust particles along the surface (min 0). |
| streaks | number | 1.5 | Brightness of the poured flow lines (min 0). |
| dots | number | 1 | Haze dot-grid strength (min 0). |
| pulse | number | 1.5 | Breathing of the beam skirt (min 0). |
| speed | number | 1.5 | Animation clock rate. |
| seed | number | 3 | Offsets the fog/spark noise fields so instances differ. |
| mouseInteraction | boolean | true | Cursor lens brightening and sparks. |
| revealImage | string | - | Image revealed under the cursor within the beam haze. |
| revealRadius | number | 220 | Reveal falloff radius in px (min 1). |
| revealOpacity | number | 0.6 | Reveal strength, 0–1. |
| intro | boolean | true | Plays the drop → impact bloom → run-front sequence (~5s). |
| theme | "dark" \| "light" | "dark" | Light outputs hue-only ink alpha for compositing on light pages. |
| paused | boolean | false | Freezes the animation clock. |
| dpr | number | min(devicePixelRatio, 2) | Render ratio override, capped so the longest side ≤ 2048. |
| className | string | "" | Extra class names (spread onto the container via rest props). |
| ...rest | HTMLAttributes | - | Any other div attributes spread onto the container. |

## Delivery & validation

- Deliver the complete content of LaserFlow.jsx and LaserFlow.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the beam drops and splashes with a spring bloom, the run front sweeps sideways and the spill fills both directions; with a rounded surfaceRef the wash hugs the corners and the beam clamps inside; resizing/remounting the surface re-measures; hover sparks and brightens the wash; a revealImage lights only near the cursor where the haze is blue; recolouring shifts the whole palette coherently; fog/dust/streaks/dots/spill/pulse each scale their layer; theme light composites on a white page; `paused` freezes motion while the lens still works; `seed` changes vary instances; prefers-reduced-motion and `intro=false` start settled; the loop sleeps when settled; unmount leaves no loop, observers, listeners or GL objects; same-page instances are independent; 375 / 768 / 1440 wide containers keep the beam inside the surface without overflow.
