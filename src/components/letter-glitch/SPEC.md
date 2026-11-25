Implement the "LetterGlitch" component from zero: a calm full-area field of small monospace characters resting at low opacity, which flickers, scrambles and flares with accent colour on its own (random cells and horizontal scanline runs ignite and cool), brightens inside a soft radius around the cursor where movement stirs extra scrambling, and tears or bursts across the grid when clicked. A slow noise flow makes the resting luminance breathe across the field. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: LetterGlitch.jsx (entry, cell simulation, shaders) and LetterGlitch.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="letter-glitch">` — position relative, width 100%, height 100%, overflow hidden — wrapping one `<canvas class="letter-glitch-canvas">` (position absolute, inset 0, display block, 100% × 100%, aria-hidden). Extra DOM props spread onto the root; className appends, style passes inline.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; if unavailable the component renders nothing. Canvas pixel size = client size × min(dpr || devicePixelRatio, 2). A VAO is bound; all geometry is one fullscreen triangle generated from gl_VertexID in the vertex shader (no buffers beyond that).

## Glyph atlas & grid

- The character set defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789`; the font defaults to the ui-monospace stack `'SF Mono', 'JetBrains Mono', Menlo, Consolas, 'Liberation Mono', monospace`.
- An offscreen 2D canvas atlas holds every unique character (max 256) rendered white in the current font: cell width = ceil(max measured advance + fontSize × spacing), cell height = ceil(fontSize × (0.95 + spacing)), fontSize clamped 6–96 (spacing clamped 0–2); the atlas is as many columns as fit in MAX_TEXTURE_SIZE and uploaded as a NEAREST-filtered texture; the shader fetches per-pixel alpha coverage. document.fonts.load is called once per font string and triggers an atlas rebuild on loadingdone or promise resolution.
- The grid tiles the canvas with these cells, origin centred (one extra column/row of margin); every cell keeps a 4-channel state byte uploaded as an RGBA8 texture: [glyph index, rest level, heat level, palette index]. On resize the old grid is copied centred into the new one; new cells get a random glyph, a luck roll, a level in 0.55–1 and, during intro, a birth time.
- Rest layer: a cell shows base ink at `level × baseOpacity × (0.8 + 0.2 × sin(time × (0.5 + 1.2·seed) + seed × 40))` — a slow per-cell shimmer — only when its luck roll is under density (clamped 0–1), so density thins the population. Changing density re-evaluates all settled cells.

## Ambient glitch life

- Glyph churn: count × 0.2 × speed glyph swaps per second on random idle cells.
- Flare events: count × glitchAmount^1.6 × 0.1 × speed per second; each picks a random cell, a palette colour, strength 0.45–1, hold 0.04–0.30 s ÷ tempo, fade 0.45–1.05 s ÷ tempo (tempo = max(speed, 0.2)). 24% of events ignite a horizontal run instead: 2–8 cells to the right (1.5% of the time a long run of 10–33), each cell delayed by 0.028 s (long runs 0.012 s) so the run ripples outward.
- Heat settling: active cells attack toward their peak with a 0.05 s exponential (instant when smooth is off), hold, then decay over fade; while hot the cell re-rolls its glyph on a pace that quickens with heat (`wait = (0.045 + 0.45 × (1 − h)²) × (0.6 + 0.8·rand) ÷ tempo`); cells are released under 0.012 heat. An active-cell index list swaps removes to keep iteration dense.
- Shader output per covered pixel: base ink and accent tint combine as `vec4((uBase × rest + tint × heat) × coverage × mask, (rest + heat) × coverage × mask)` — heat replaces rest ink with the palette colour at full brightness.
- Flow (0–1): a two-octave value noise sampled at center/flowScale (flowScale = max canvas dimension × 0.32), drifting with time, remaps the rest luminance to `0.1 + 1.7 × smoothstep(0.25, 0.8, n)` — calm lakes and bright rivers that migrate across the field.

## Cursor interaction

- Pointer position is smoothed with a 0.07 s time constant; presence eases in over ~0.25 s when the pointer is inside and out after documentElement pointerleave (or non-mouse pointerup). Stir tracks pointer speed: clamp(|velocity| / 1400, 0, 1), eased 0.12 s.
- Inside cursorRadius (min 0, scaled by DPR): the shader lifts resting ink toward reveal level min(1, baseOpacity × 3.5) with a (1 − d²)² falloff × presence; the CPU adds random glyph re-rolls with probability (1 − d²)² × presence × (3 + 9 × stir) × dt, and heat sparks at rate ∝ area × presence × (0.15 + 4 × stir) with strengths scaled by stir.

## Click effects

- clickEffect "tear" (default): from the clicked row ± 2 rows (side rows skipped randomly by weight), two horizontal walkers per row run left and right at 2200–3400 px/s, living 12–62% of the canvas width and igniting every cell they cross (strength rising with remaining life, hold ~0.03–0.08 s, fade 0.5–1.0 s), with a small per-row lateral jitter.
- clickEffect "burst": 5–7 radial walkers from the click point, turning angle spread evenly ± jitter, speed 700–1100 px/s, life 25–55% of the min view dimension, each with a 0.2 rad wiggle per step and a 3% chance to branch (branch life 45–75% of the parent). Walkers cap at 48 concurrent.
- clickEffect "none" disables clicks. Clicks are ignored under reduced motion.

## Intro & fades

- intro on: cells are born radially (0.3 weight) plus randomly (0.7 weight, ^1.3) within 1.4 s of mount, each fading in over 0.35 s (instant when smooth is off) with a chance of a birth ignition flash; the intro flag clears when all cells have appeared.
- edgeFade (0–0.5): a smooth mask pulling letters out near the container edges (edge × min dimension); centerFade (0–1): an elliptical soft mask over the centre third (room beyond 0.3/0.24 of the size, softness 0.24 × min dimension).
- backgroundColor: when set, parsed (cached) and composited behind the letters as an opaque backdrop in the same pass; otherwise fully transparent.

## Performance & lifecycle

- Frame loop self-sleep: busy while speed > 0 (reduced motion off), any active cells, any walkers, intro pending, or pointer presence/stir still easing; otherwise rendering stops (last frame persists). Resize is merged into the next frame; document.visibilitychange and IntersectionObserver stop and wake the loop; dt clamped 0.5 ms–50 ms.
- Palette: glitchColors up to 8 entries (defaults #ffffff + #61dca3 dark, #18181b + #0f9f6e light mode), parsed through a cached canvas probe; baseColor defaults to white (dark) / #18181b (light). Changing the palette remaps out-of-range colour indices.
- Reduced motion: ambient churn, flares, cursor stirring, spark heat, walkers and intro are all disabled (the field renders as a static resting grid); visibility-driven redraws still work.
- Unmount: cancel the frame, disconnect both observers, remove every listener (including fonts loadingdone), delete both textures, VAO and program, and drop the WebGL context via WEBGL_lose_context when the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| glitchColors | string[] | ["#ffffff", "#61dca3"] (dark) | Accent palette for flares, sparks and tears, up to 8 entries. Light mode defaults to ["#18181b", "#0f9f6e"]. |
| baseColor | string | "#ffffff" (dark) | Resting ink colour. Light mode defaults to "#18181b". |
| characters | string | A–Z plus symbols and digits | Character pool rendered into the atlas. |
| fontFamily | string | ui-monospace stack | Font used for the atlas. |
| fontSize | number | 14 | Cell glyph size in CSS px, clamped 6–96. |
| spacing | number | 0.6 | Extra gap between cells in em of fontSize, clamped 0–2. |
| density | number | 0.9 | Fraction of cells that carry resting ink, 0–1. |
| baseOpacity | number | 0.16 | Resting ink opacity, 0–1. |
| glitchAmount | number | 0.5 | Ambient flare frequency, 0–1. |
| speed | number | 1 | Global tempo multiplier, floored at 0. |
| smooth | boolean | true | Eases heat attack/decay instead of stepping. |
| interactive | boolean | true | Enables cursor brightening, stirring and sparks. |
| cursorRadius | number | 140 | Cursor influence radius in CSS px. |
| clickEffect | "tear" \| "burst" \| "none" | "tear" | What a click does. |
| flow | number | 0.5 | Strength of the drifting luminance noise, 0–1. |
| edgeFade | number | 0 | Edge fade fraction, clamped 0–0.5. |
| centerFade | number | 0 | Centre fade strength, clamped 0–1. |
| intro | boolean | true | Cells pop in radially over 1.4 s on mount. |
| lightMode | boolean | false | Switches default colours to dark-ink-on-light. |
| backgroundColor | string | - | Backdrop colour composited behind the letters. |
| dpr | number | devicePixelRatio | Render pixel ratio, clamped to 2. |
| className | string | "" | Extra class for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of LetterGlitch.jsx and LetterGlitch.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: resting field shimmers and breathes with flow; ambient flares and scanline runs appear at the tuned rate and cool smoothly; cursor proximity lifts ink, fast movement scatters glyphs, sparks pop in colour; click tears run horizontally from the click row and bursts radiate with branches; intro radiates on mount; density/baseOpacity/fontSize/spacing/speed/flicker-free at speed 0; custom palette and base colour parse; light mode defaults invert; edgeFade/centerFade/backgroundColor compose; reduced motion renders a static field without errors; resize keeps the grid centred without losing state; font loads rebuild the atlas; unmount leaves no listeners, observers or GPU objects; 375 / 768 / 1440 wide without overflow.
