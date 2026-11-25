Implement the "ASCIIText" component from zero: a WebGL2 headline renderer that redraws its text as a grid of ASCII characters. The glyphs sit on a virtual 3D plane that tilts toward the pointer and sways on its own when idle; sine waves ripple through the plane, the three colour channels split into drifting fringes, and every grid cell picks its character from a luminance-ordered charset. Hovering scrambles the cells around the pointer, clicking fires expanding rings that re-roll glyphs outward, and on first paint a decode pass resolves the text out of noise. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + WebGL2, one file (ASCIIText.jsx), React >= 18, no runtime dependencies, no separate CSS file — every style is inline. No iframe.
- The root is a `<div>` with position absolute, inset 0 — it fills whatever sized parent it is placed in — plus touch-action pan-y, role="img", aria-label={text}, className and a style override slot. It contains one full-bleed `<canvas>` (context created with alpha: true, premultipliedAlpha: true, antialias: false) and, only when WebGL2 or shader compilation fails, a centred plain-text fallback div (same fontFamily/fontWeight/textColor, fontSize = 8 × textScale vw). Failure never throws.
- Everything is drawn by a single fullscreen triangle (vertices −1,−1 / 3,−1 / −1,3) through one program. Two offscreen 2D canvases are uploaded as textures whenever text, font, weight, colour or charset changes: the text canvas (font `${fontWeight} 256px ${fontFamily}`, filled in textColor, centred with middle baseline, width = max(256×0.6, measured advance) + 30% padding, height = ceil(256×1.3)) and a glyph atlas with one 40×64px cell per charset character (font 500 at 64×0.74 px, white, centred, baseline nudged down 4% of cell height). The text texture samples nearest-neighbour; the atlas uses mipmaps with linear filtering; both clamp to edge; premultiply and flip-Y stay off. Device pixel ratio is clamped to 2, and canvas size tracks the container's client size.
- The default charset is " .\'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$" — ordered from emptiest to densest so luminance maps monotonically. The default fontFamily is "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace". A charset shorter than 2 characters falls back to the default.
- Per frame the shader works on an ASCII grid of `asciiFontSize × 0.62` (wide) × `asciiFontSize` (tall) device pixels. For each cell centre it raycasts a virtual plane floating at z = 30 under a perspective with tan half-fov 0.4142: the plane rotates by the two tilt angles, its height is 24.8528 × (0.5 × textScale) and its width follows the text texture's aspect.
- The plane distorts before sampling: with wave = 5 × sin(time × waveSpeed), local x shifts by −sin(wave + local.y) × 0.5 × waves, local y by −cos(wave) × 0.15 × waves, and the whole plane compresses by 1 + sin(wave + local.x) × waves / 30. UVs outside the text canvas clamp to empty.
- Chromatic aberration: red samples the text at uv + cos(t + uv.x) × 0.01 × chroma, green at uv + tan(uv.x − t × 0.5) clamped to ±3 × 0.01 × chroma, blue at uv − cos(3t + uv.y) × 0.01 × chroma, with t = sin(time). Luminance uses weights (0.3, 0.6, 0.1); cells with alpha ≤ 0.02 index glyph 0 (space), others index max(1, round(luminance × (glyphCount − 1))) into the atlas.
- Colour: a radial three-stop tint spreads from centre — mix(colors[0], colors[1], smoothstep(0, 0.5, spread)) then toward colors[2] by smoothstep(0.5, 1, spread), where spread scales normalized distance from the canvas centre by 0.7071. The glyph colour is mix(under, abs(tint − under), glyphAlpha), where under is the original text pixels showing through the blocks underlay (alpha = text alpha × blocks × (1 − intro)). Final alpha = max(blockAlpha, glyphAlpha); hue rotates the result around the (0.577) axis by uHue; theme "light" inverts the colour (color = alpha − color) for pale backgrounds.

## Interaction & motion

- Pointer tilt (interactive): the pointer's position normalized to −1..1 feeds tilt targets with the axes crossed — the plane's x rotation follows pointer Y × 0.5 × tilt and its y rotation follows pointer X × 0.5 × tilt; both ease exponentially (rate 1/0.3s). Idle sway (idle, non-reduced): x = sin(time × 0.55) × 0.12 × tilt, y = sin(time × 0.4 + 1.3) × 0.2 × tilt when the pointer is outside.
- Hue drift (hueShift): while the pointer is inside, the hue target is the pointer angle atan2 × hueShift, eased along the shortest arc (rate 1/0.25s); it stays where it stopped otherwise.
- Hover scramble (scramble): a hover value eases to 1 inside / 0 outside (rate 1/0.2s); cells within reach = height × 0.18 × (0.5 + scramble) of the pointer swap to random glyphs with probability hover × scramble × falloff × 0.8, re-rolled at 18 Hz.
- Click ripples (clickRipple, only when interactive): each pointerdown spawns a ripple at the pointer; ripples live 1.3s and only the newest 4 render. Each draws a ring at radius = age × max(canvas w, h) × 0.75 with band width max(cell height × 3, 24px): strength fades as the ring grows and with distance from the band; ring cells flip to random glyphs (18 Hz re-roll) and their alpha lifts to at least strength × 0.75; the sampling centre is pushed away from the ripple by strength × 1.5 cells.
- Intro decode (intro): on first successful build (skipped under reduced motion) a value starts at 1 and decays to 0 over 1.4s; cells decode in noise order — each cell shows a random glyph while hash(cell × 0.37 + 2.1) < intro, glyph alpha is reduced by up to 35% during decode, and the blocks underlay fades in as intro completes.
- Block underlay (blocks, 0–1): the original smooth text shows through underneath the ASCII layer at the given alpha, multiplied by (1 − intro) so it lands after the decode.

## Frame loop & lifecycle

- The loop renders every frame while the container intersects the viewport (an IntersectionObserver gates the raf chain and re-wakes on visibility); time stops entirely under prefers-reduced-motion. ResizeObserver marks a pending resize applied at the start of the next frame. Pointer handlers only mutate refs — no re-render per move.
- Font readiness: after every build the component awaits document.fonts.load for both the text font (weight 256px size) and the glyph font (500 64px), rebuilds when they resolve, and also rebuilds on the document's loadingdone event.
- Settings clamp on every render: cellSize ≥ 3, textScale 0.1–3, blocks 0–1, waves/waveSpeed/chroma/tilt ≥ 0, hueShift 0–2, scramble 0–1. The colour palette is sliced to three entries with earlier entries repeated to fill gaps; colours parse as 3/6-digit hex and rgb()/rgba() via a canvas fillStyle probe, unparsable input falls back to white.
- Unmount: cancel the frame, disconnect both observers, remove all pointer listeners, delete both textures, buffer and program. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Hey!" | The headline text rendered as ASCII art. |
| asciiFontSize | number | 8 | Side of one ASCII cell in CSS px (floored at 3); the cell is 0.62× as wide as tall. |
| charset | string | " .\\`^",:;Il!i~+_-?][}{1)(\|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$" | Glyph pool ordered light to dense; fewer than 2 characters falls back to the default. |
| fontFamily | string | "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" | Font stack for both the rendered text and the glyph atlas. |
| fontWeight | number | 600 | Font weight of the rendered text. |
| textColor | string | "#fdf9f3" | Colour of the source text; the tint palette overrides what you see, blocks keep it. |
| colors | string[] | ["#ff6188", "#fc9867", "#ffd866"] | Radial tint gradient — centre, mid, edge. Missing entries repeat; parsed as hex or rgb()/rgba(). |
| textScale | number | 1 | Scales the virtual text plane, 0.1–3; also scales the fallback font size. |
| blocks | number | 0.9 | Alpha of the smooth text underlay beneath the ASCII layer, 0–1. |
| waves | number | 1 | Amplitude of the plane's sine-wave distortion, ≥ 0. |
| waveSpeed | number | 1 | Speed of the wave phase, ≥ 0. |
| chroma | number | 1 | Strength of the RGB fringe separation, ≥ 0. |
| tilt | number | 1 | How far the plane rotates toward the pointer, ≥ 0. |
| hueShift | number | 1 | How strongly hue rotates with the pointer angle, 0–2. |
| scramble | number | 0.6 | Hover scramble intensity and radius bias, 0–1. |
| clickRipple | boolean | true | Clicks spawn expanding glyph-scramble rings. |
| intro | boolean | true | Plays the decode-from-noise pass on first paint. |
| idle | boolean | true | Sways the plane gently when the pointer is away. |
| interactive | boolean | true | Enables pointer tilt, hue drift, hover scramble and ripples. |
| theme | "dark" \| "light" | "dark" | "light" inverts the rendered colour for pale backgrounds. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline style overrides for the root. |

## Delivery & validation

- Deliver the complete content of ASCIIText.jsx plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the text reads correctly through the ASCII grid and keeps its shape while waves distort it; pointer tilt follows with crossed axes and eases back; hue drifts with pointer angle; hover scrambles cells around the pointer and settles on leave; clicks spawn rings that scramble and fade outward (four concurrent max); the intro decodes once; blocks underlay reads through; theme light inverts legibly on pale backgrounds; custom charset/fontFamily/fontWeight/colors all apply; missing WebGL2 falls back to plain text with no errors; prefers-reduced-motion freezes waves and skips intro while staying legible; resize keeps the canvas crisp at DPR ≤ 2; tab visibility and scroll-out stop rendering; unmount leaves no listeners, observers or GL objects; the root fills any sized parent at 375 / 768 / 1440 wide without overflow.
