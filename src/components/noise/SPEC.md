Implement the "Noise" component from zero: a transparent overlay that lays film grain over whatever sits beneath it — a tiled procedural grain that reshuffles at a chosen frame rate, optional colour speckles, dust specks and stray hairs, vertical film scratches that appear and fade, CRT scanlines, and random exposure flicker; the tile, dust and blend behaviour together cover everything from fine 35mm grain to dirty projector reels and TV static. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18 + Canvas 2D, two files only: Noise.jsx (entry, tile generator, dust painter) and Noise.css (all styles). No runtime dependencies, no iframe.
- Root is a `<div>` with class `noise` (plus `noise--fixed` when the fixed prop is set, plus the caller's className), aria-hidden="true", pointer-events none, overflow hidden, inline zIndex. Default position: absolute inset 0 — the overlay covers its nearest positioned ancestor; the fixed variant switches to position fixed for full-page grain.
- Three stacked layers inside: a grain `<div>` (absolute inset 0, background-repeat repeat, image-rendering pixelated, inline opacity and mixBlendMode), a dust `<canvas>` (absolute inset 0, 100% × 100%) and, only when scanlines > 0, a scanline `<div>` with inline opacity and mixBlendMode.
- All sizes are device-pixel aware: the dust canvas backs onto devicePixelRatio clamped to 2, redrawn through a ResizeObserver on the root.

## Grain tile

- One 256 × 256 tile is generated per (contrast, colored) pair: a deterministic 32-bit integer hash generator (fixed seed, identical output every run) produces two uniforms per pixel; the sample is clamp(0.5 + (u1 + u2 − 1) × range, 0, 1) × 255 where range = 0.5 + contrast × 1.1 — a triangular distribution centred on mid grey that widens with contrast (0 = flat, 1 = harsh). colored samples the green and blue channels independently for colour speckles; otherwise grey. The tile is painted through ImageData, exported via canvas.toBlob into an object URL used as the grain's background-image; the previous URL is revoked on replacement and on unmount.
- The tile is displayed at background-size (256 × size) × (256 × size) px (size floored at 0.5) with pixelated scaling, so `size` stretches the grain into chunkier pixels.
- blendMode whitelists normal / overlay / soft-light / multiply / screen / difference (unknown falls back to normal) and is applied as mixBlendMode on the grain and scanline layers.

## Animation

- A requestAnimationFrame loop repaints at most once per 1000/fps ms (fps clamped 0–60; 0 freezes everything). Each repaint: background-position jumps to a random offset within the tile span; grain opacity becomes opacity × (1 − flicker × random × 0.7) (flicker clamped 0–1) for a handheld exposure wobble; the scanline layer's background-position rolls through a 3px cycle (0/1/2px) for a slow CRT crawl; the dust canvas repaints.
- Dust painting: density area = width × height / 400000. dust > 0 spawns round(dust × 42 × area × (0.6–1.4)) specks per paint — each speck is 1–3 overlapping radial-gradient lobes (offset up to 0.7 × radius), dark ink rgba(18,14,10) or light rgba(255,250,240) (30% light), radius 0.6 + r^2.5 × 3.4 px, alpha 0.6–0.95; occasionally (probability dust × 0.7) also 1 + dust × 2.4 hairs — quadratic-curve strands 14–60px long with a random bend, dark rgba(16,12,9) at alpha 0.4–0.75, width 0.6–1.3 px.
- scratches > 0 keeps at most 3 live scratches; each paint tick spawns one with probability scratches × 0.06. A scratch is a vertical polyline whose x wobbles ±1.4 px with a sine phase, drifts sideways ±0.6 px per tick, lives 0.6–3.2s, fades in over 0.15s and out over the last 0.3s, drawn light rgba(255,252,245) (70%) or dark rgba(14,11,8), width 0.6–1.4 px, alpha 0.25–0.6 × fade.
- Scanlines: a repeating-linear-gradient of 1px rgba(0,0,0,0.55) lines every 3px; opacity = scanlines clamped 0–1.
- prefers-reduced-motion: reduce — the loop rate is 0, so grain, dust and scanlines render once and freeze.
- Lifecycle: ResizeObserver repaints dust at the new size; IntersectionObserver pauses the loop offscreen and wakes it on return; an effect after every render wakes the loop so prop changes apply immediately; unmount cancels the frame, disconnects both observers and revokes the tile URL.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| opacity | number | 0.2 | Grain opacity, 0–1. |
| size | number | 1 | Grain scale; the tile shows at 256 × size px; floored at 0.5. |
| fps | number | 24 | Grain reshuffle rate per second, 0–60; 0 freezes. |
| blendMode | "normal" \| "overlay" \| "soft-light" \| "multiply" \| "screen" \| "difference" | "overlay" | Blend against what is underneath. |
| contrast | number | 0.6 | Grain contrast, 0–1. |
| colored | boolean | false | Independent RGB speckles instead of grey. |
| dust | number | 0 | Dust speck and hair density, 0–1. |
| scratches | number | 0 | Film scratch frequency, 0–1; at most 3 live scratches. |
| scanlines | number | 0 | CRT scanline layer opacity, 0–1. |
| flicker | number | 0 | Random opacity flicker depth, 0–1. |
| fixed | boolean | false | position fixed instead of absolute, for full-page grain. |
| zIndex | number | - | z-index of the overlay. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Noise.jsx and Noise.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: the overlay covers a photo-like backdrop without intercepting pointer events; contrast 0 vs 1 and colored on/off visibly regenerate the tile; size stretches the grain; fps 24 animates and 0 freezes; all six blend modes composite; dust density, hairs, scratch spawn/fade and scanline crawl match the descriptions; flicker wobbles opacity; fixed covers the viewport; reduced motion freezes the frame; resize keeps coverage at device-pixel sharpness; unmount revokes the tile URL and leaves no loop or observers; 375 / 768 / 1440 wide without overflow.
