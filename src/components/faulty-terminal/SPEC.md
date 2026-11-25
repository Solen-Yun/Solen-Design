Implement the "FaultyTerminal" component from zero: a flickering CRT terminal of glowing glyphs — a plasma field underneath quantizes into six brightness rings that light up blocky characters in a virtual cell grid, phosphor trails fade cell by cell, the cursor leaves a hot glowing patch with a ripple, and clicking tears rows sideways (or detonates a degauss shockwave). Barrel curvature, beam-shaped scanlines, chromatic aberration, flicker bands, grain, vignette and a per-cell page-load strike-in finish the CRT look. Dark phosphor output with a light-page ink mode. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Two files: FaultyTerminal.jsx (entry, GL setup, two-pass simulation) and FaultyTerminal.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="faulty-terminal-container">` (plus caller className/style and extra DOM props), position relative, overflow hidden; its child is `<canvas class="faulty-terminal-canvas" aria-hidden="true">`, absolute inset 0. The host owns the size.
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; silent no-op without it. One empty VAO; geometry is a 3-vertex big triangle generated from gl_VertexID (no buffers).
- Two programs. CELL pass: renders into a double-buffered MRT framebuffer pair (two RGBA8 attachments each: ring thresholds + extra level/heat) over only the visible cell window (clamped 4096², origin offset so curvature/glitch margins stay covered), feeding the previous pair back for phosphor decay. MAIN pass: composites the terminal image to the canvas. DPR clamped to 2.

## Plasma & cell rings

- The plasma field: 3-octave fbm of `sin(x×10)×sin(y×(3+sin(t/11)))+0.2` noise with time-rotated layers, domain-warped twice (q from two fbm samples, r from two more, final fbm(p + r)), evaluated at cell coordinates s = (texel + origin)/(gridMul × 15), ×0.1, scaled ×1.3 − 0.03. iTime advances at timeScale (0–…), seeded by variation × 10 (random × 100 when omitted).
- Six rings: intensity thresholds at 0.0625 × (0, 1, 2, 4, 5, 8) + 0.1 step into two RGBA attachments; `level` = clamp((intensity − 0.1)/0.6) drives gradient brightness; heat carries cursor/ing pressure.
- Phosphor trails: each cell pass reads the previous pair, multiplies by decay = exp(−dt/(0.08 + persistence × 1.4)) (persistence 0 = instant clear) and subtracts 1/255 so trails die out completely; a fresh-layout flag replaces instead of blending.
- Cursor: exponential glow `exp(−dist×8) × strength × 10` lifted onto intensity plus a sin ripple `sin(dist×20 − t×5) × 0.1 × influence`; heat feeds a white-hot shift toward (1 − tint) and boosts glyph brightness (mouseGlow). The mouse point eases toward the pointer (time constant 0.2 s inside, 0.6 s out) and hover eases at 0.35 s.
- Page-load intro (2 s, skipped when pageLoadAnimation=false or reduced motion): each cell hashes a 0–0.8 s delay then strikes in over 0.2 s — intensity fades in while a sin(π × progress) flash fires.

## Glyph rendering (MAIN pass)

- Three glyph styles: "blocks" (the ring count as brightness with top-lit and left-lit shading), "dots" (anti-aliased circle per cell, radius breathing with ring count), "characters" (a 23-glyph 5×5 bitmap font packed as uint bits — digits, letters, shapes — re-rolled per cell at a rate of 1.2 + scramble × 18 hashes/s, lit by level with per-glyph shade). digitSize scales glyphs inside cells (center 0.5/min(1, 1/digitSize)).
- Beam sampling: per scanline row the nearest two cell rows blend across a focus-dependent soft edge; lit = two gaussians at fractional row positions mixed by scanlineStrength (×1.18 brightness); a slow rolling band (mod(p.y + t×20, 1) < 0.2) multiplies by scanlineIntensity.
- Glitch: a horizontal displacement window (1/(1+50y²)) riding a 0.25 s loop — sin wave × on/off flicker gate × (1 + cos(60t)) — scaled by glitchAmount; per-row hash jitter at 24 Hz × interference.
- Clicks (max 4 live, ring buffer): "glitch" (0.7 s) tears random row bands sideways near the click (hash rows at 30 Hz, envelope (1−life)², reach exp(−|y−clickY|×2.5)) and boosts chromatic split ×6; "degauss" (1.6 s) pushes an expanding ring (front = age × 1.6, gaussian band 0.18 wide, sin ripple ×0.05) warping uv radially with the same envelope; "none" disables.
- Chromatic aberration: three beam evaluations offset ±split pixels; glow: a 3×3-cell gaussian bloom around each lit cell (sigma = half min cell px; per-style emission weights) added to the halo channel ×0.2.
- Finish: tint (hex) tints core toward peak with phosphor saturation and halo toward a vivid clamp; heat blends toward (1−tint); brightness multiplies; vignette (0–1) smoothsteps all four edges at 0.04 + 0.22 × vignette; dither adds ±uQuiet/255 hash grain; curvature (barrel: c ×= 1 + k×r²) warps uv before sampling. Output premultiplied by max channel; light mode prints saturated ink coverage (≤0.94) with the same dither.

## Timing & lifecycle

- Frame-loop self-sleep: after each frame the loop keeps running only while animation is live (not paused/reduced), the intro hasn't finished, the mouse point or hover is still easing, or a click effect is alive; once quiet for 2.5 s it stops, and any pointer event, visibility change, resize or intersection re-entry wakes it. Prop changes re-render one frame immediately.
- dt clamped 1 ms–50 ms; reduced motion zeroes time/flicker/glitch advances and skips click effects; paused freezes iTime but keeps rendering.
- Resize: ResizeObserver recomputes the canvas, cell window (curvature-aware reach, glitch margin, columns = min(1, aspect/1.5)) and re-runs both passes; IntersectionObserver pauses off-screen; hidden tab pauses.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete both framebuffer pairs, VAO and programs, force-lose the context when detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| scale | number | 1 | Plasma/space zoom of the cell field, floored at 0.05. |
| gridMul | [number, number] | [2, 1] | Cell grid density multiplier per axis (×15 cells). |
| digitSize | number | 1.5 | Glyph scale inside its cell. |
| timeScale | number | 0.3 | Plasma evolution speed. |
| pause | boolean | false | Freezes plasma time but keeps rendering. |
| scanlineIntensity | number | 0.3 | Rolling scanline band strength. |
| glitchAmount | number | 1 | Horizontal glitch displacement multiplier. |
| flickerAmount | number | 1 | Flicker on/off gating strength. |
| noiseAmp | number | 1 | Plasma fbm amplitude. |
| chromaticAberration | number | 0 | Static RGB split in UV units. |
| dither | number \| boolean | 0 | Ordered grain dither (boolean maps to 0/1). |
| curvature | number | 0.2 | Barrel distortion; 0 is flat. |
| tint | string | "#ffffff" | Phosphor colour (hex). |
| mouseReact | boolean | true | The cursor lifts a glowing patch with a ripple. |
| mouseStrength | number | 0.2 | Cursor influence strength. |
| pageLoadAnimation | boolean | true | Per-cell strike-in over 2 s on mount. |
| brightness | number | 1 | Output gain. |
| glyphs | "blocks" \| "dots" \| "characters" | "blocks" | Glyph style of the cells. |
| glow | number | 0.5 | Bloom around lit cells, clamped 0–3. |
| persistence | number | 0.5 | Phosphor trail persistence, clamped 0–1. |
| scramble | number | 0.5 | Character re-roll speed for the characters style, clamped 0–1. |
| mouseGlow | number | 0.6 | Heat-driven brightness/white-hot boost near the cursor, clamped 0–1. |
| vignette | number | 0.25 | Edge falloff, clamped 0–1. |
| clickEffect | "none" \| "glitch" \| "degauss" | "glitch" | Click effect: row tears or an expanding shockwave. |
| variation | number | random | Plasma seed; offsets the field deterministically. |
| lightMode | boolean | false | Ink-on-light rendering for light pages. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of FaultyTerminal.jsx and FaultyTerminal.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the plasma field evolves and quantizes into six visible rings across all three glyph styles; phosphor trails fade completely and persistence 0 clears instantly; the cursor lifts a glowing patch with a ripple and white-hot tinting; the page-load strike-in washes across cells once; clicking tears rows sideways (glitch) or detonates an expanding degauss ring, up to 4 live, and expires cleanly; scanlines, glitch window, flicker, interference, chromatic aberration, bloom, vignette, dither and curvature each read correctly; tint recolours the terminal and lightMode prints legible ink on white; paused freezes the plasma but keeps interactions; reduced motion stands still with no flicker/glitch/clicks; resize, tab-hide and off-screen never stretch or leak; unmount leaves no listeners, textures, framebuffers or frames; 375 / 768 / 1440 wide without overflow.
