Implement the "GlassIcons" component from zero: a grid of icon buttons that look like slabs of liquid glass — the color plate behind each slab is bent by refraction with chromatic splitting, a rim light traces the bevel, and the slab leans, floats or presses in response to the pointer. A WebGL2 shader paints the effect when available; a backdrop-filter + painted maps fallback covers the rest. Pure React + CSS + WebGL2, two files: GlassIcons.jsx (entry, shader engine, pose math) and GlassIcons.css (all styles). React >= 18; no runtime dependencies. No iframe, no external assets.

## Structure & rendering

- Root is `<div class="glass-icons">` (plus `is-intro` until entrance and a `glass-icons--labels-<mode>` class), display flex wrap centered, gap from tokens, max-width derived from columns × tile + gaps; theme tokens and geometry (--glass-icons-size/radius/gap/columns/tint/ink/glyph-shadow/tilt/spread/shine) are injected as inline CSS variables. The dark theme sets label rgba(244,244,245,0.86), edge rgba(255,255,255,0.16), fallback plate rgba(255,255,255,0.1), drop rgba(0,0,0,0.45), shade 0.35; the light theme uses dark ink values and shade 0.22.
- Children: an optional hidden `<svg class="glass-icons-defs">` holding the SVG filter for the DOM fallback (below), one oversized absolute `<canvas class="glass-icons-canvas">` (z-index 1, pointer-events none, extends tile × 0.7 beyond the root on every side, DPR-clamped to 2), and the items. Each item renders as `<a>` when it has an href (target/rel wired) else `<button type="button">`, `class="glass-icon"`, size --glass-icons-size; inside, in paint order: a colored plate span (no-GPU + plate mode ≠ none only) using the item's gradient, a `.glass-icon-glass` span with the backdrop filter and tint background plus drop shadow, non-GPU shade/shine overlay spans, a `.glass-icon-face` (grid-centered, 40% glyph span carrying item.icon in ink color with a drop-shadow), and a `.glass-icon-label` positioned 10px below the tile.
- Ten built-in named gradients (blue, purple, red, indigo, orange, green, teal, pink, graphite, silver — 135° two-stop hsl pairs) are selected by item.color; any other string is parsed as a CSS linear-gradient (angle units deg/turn/rad/grad and `to <side>` keywords, arbitrary stops with missing percentages interpolated). Parsed gradients are rasterized into a 256px × count texture row per icon for the shader. Default ink is white; in the light theme with plate none it switches to #27272a, and the glyph drop-shadow flips accordingly.
- Three presentation modes, each with a CSS fallback pose: plate "tilt" (plate rotated --tilt around bottom-right origin), "offset" (plate shifted right-up by spread × 26%), "circle" (inset 9%, 50% radius, shifted 29%), "none" (no plate, pure glass). Hover modes: "lift" (slab rises 8% of tile), "float" (14%, plus stronger plate offset), "press" (slab compresses scale 0.92 while pressed), "none". Labels: "hover" (fade in on hover/focus), "always", "none".
- GPU path: a WebGL2 program (alpha, premultiplied, no antialias) draws one quad per icon, ~8% overscan. The fragment shader builds the rounded-box glass SDF (radius from roundness 0–1 × tile/2): the color plate behind it is sampled through a bend vector — bevel-normal² falloff × refraction strength (tile × 0.3 × refraction) plus a slight lens — with optional chromatic split (red/blue sampled ± split) when dispersion > 0; a tint mixes in at tintOpacity; the top-weighted rim gets a white shine (strength × shine × hover glow) and opposing shade (theme-based); frost widens the plate's soft edge. The plate itself is drawn per-icon from the gradient texture row, softened by frost, dimmed slightly under the glass drop. If the context, program or link fails, setGpu(false) falls back to the DOM path.

## DOM fallback

- When WebGL2 is unavailable (or the context is lost), each icon keeps a DOM plate in the CSS pose for its plate mode and the glass span uses `backdrop-filter: blur(2–12px by frost) saturate(1.4)`; additionally, when the browser supports `backdrop-filter: url(#filter)` (Chromium check; Safari/Firefox are excluded by design), plate "none" uses an SVG filter instead: three feDisplacementMap channels (R/G/B shifted by ±strength/split) composited with screen blends from prebaked displacement maps.
- The maps (refraction normals, shine, shade) are baked once per size/radius/bevel into offscreen canvases at 2× and cached in a module-level Map keyed `size:radius:bevel` — data URLs reused by every instance.

## Motion engine

- One engine effect owns a state record per icon: h (hover), p (press), x/y (pointer aim, −1..1), e (entrance 0..1), each a spring integrated at 240Hz sub-steps (h: 170/24, p: 420/40, x/y: 90/19, e: 60/15.5), self-sleeping when all settle (epsilon 5e-4).
- A pose per icon derives from the state: entrance swings the plate in (angle/offset scaled by eased progress), lifts the glass from 0.92 settle to 1, raises the glyph 10% and fades glass/plate/face in through staggered fade windows; hover drives lift/float rise or press compression, brightens the shine glow (up to +60% clear / +25% plated), and the light direction follows the pointer aim within the tile (±0.35 around the upper-left base light) — the shader's rim light tracks the cursor.
- Pointer handlers on each item: enter (non-touch) sets hover, move aims the light, leave clears hover/aim/press, down/up/cancel press; keyboard focus via :focus-visible triggers the same hover path. Labels fade/translate in with a 0.3s cubic-bezier(0.22,1,0.36,1) transition on hover/focus.
- Entrance is gated by an IntersectionObserver (threshold 0.15): when the grid first intersects, each icon's entrance target flips to 1 at performance.now() + index × 0.07s — a one-shot staggered reveal; with intro off (or reduced motion) states start settled at 1. Reduced motion skips spring integration entirely (targets applied directly).
- ResizeObserver re-measures icon centers and repaints; the oversized canvas repositions on layout changes. WebGL context lost is intercepted (preventDefault) and the DOM fallback takes over; unmount cancels the frame, disconnects observers, and deletes the texture/buffer/program/shaders. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { id?: string; label: string; icon: ReactNode; color?: string; href?: string; target?: string; onClick?: () => void; className?: string }[] | [] | Icon entries; color names a built-in gradient or passes any CSS gradient. |
| size | number | 82 | Tile edge length in px (min 24). |
| gap | number | 66 | Gap between tiles in px. |
| columns | number | 3 | Tiles per row; the max-width derives from it. |
| roundness | number | 0.6 | Corner rounding 0–1 (tile/2 max). |
| refraction | number | 0.8 | Bend strength of the plate behind the glass, 0–1.5. |
| bevel | number | 0.6 | Rim width of the glass edge, 0–1. |
| dispersion | number | 0 | Chromatic split of the refraction, 0–1. |
| frost | number | 0.2 | Plate softening and glass blur, 0–1. |
| shine | number | 0.85 | Rim light strength, 0–1. |
| tint | string | "#dfdfdf" | Glass tint colour. |
| tintOpacity | number | 0.2 | Glass tint opacity, 0–1. |
| iconColor | string | - | Glyph colour; defaults to white, or dark ink on the light no-plate theme. |
| plate | "tilt" \| "offset" \| "circle" \| "none" | "tilt" | Pose of the color plate behind each slab. |
| tilt | number | 30 | Tilt angle (deg) for the tilt plate. |
| spread | number | 0.5 | Plate offset reach, 0–1. |
| hover | "lift" \| "float" \| "press" \| "none" | "press" | Hover behaviour of the slab. |
| parallax | number | 1 | How much the plate shifts with the pointer, 0–1. |
| labels | "hover" \| "always" \| "none" | "hover" | When the labels below tiles show. |
| intro | boolean | true | Staggered entrance when the grid scrolls into view. |
| theme | "dark" \| "light" | "dark" | Label/edge/shade palette. |
| className | string | "" | Extra class on the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of GlassIcons.jsx and GlassIcons.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the shader renders a bent, color-splitting glass slab per icon with rim light and drop dimming; the light tracks the pointer; hover lift/float/press poses animate on springs; plate tilt/offset/circle poses match the CSS fallback; the DOM fallback (no WebGL2) still looks glassy via backdrop-filter; the SVG-filter path engages only where supported; built-in color names and arbitrary gradients both render; entrance staggers once on first intersection and intro=false skips it; labels hover/always/none behave; links render anchors with target/rel, others buttons; keyboard focus mirrors hover and shows a ring; reduced motion settles instantly; context loss degrades gracefully; resize keeps centers aligned; unmount leaves no observers, frame loop or GL objects; 375 / 768 / 1440 wide without overflow.
