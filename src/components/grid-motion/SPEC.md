Implement the "GridMotion" component from zero: a tilted wall of tiles — images, text or arbitrary nodes — that drifts forever in alternating directions, slides with the pointer through per-row parallax, and lights up around the cursor through a per-tile spotlight while everything else dims (optionally desaturating). Pure React + CSS + transform animation, no canvas: a rotated plane of rows scrolls seamlessly by wrapping its own period, and the pointer's spotlight is written per tile as a CSS variable. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components (image tiles are supplied by the caller).

## Structure & rendering

- Pure React + CSS, two files only: GridMotion.jsx (entry, layout math, frame loop) and GridMotion.css (all styles). React >= 18; no runtime dependencies. No iframe, no canvas, no WebGL.
- Root is a `<div class="grid-motion">` (plus `grid-motion--gray` when grayscale is on, plus className) — position relative, isolation isolate, width 100%, height 100%, overflow hidden. It carries CSS variables --gm-tile, --gm-text, --gm-border, --gm-radius, --gm-dim; when tilt > 0 it also gets `perspective: max(width, height) × 1.5 px`; when fade > 0 a pair of feather masks (see edges). Extra style merges last.
- Theme tokens: theme "dark" → tile #1b1922, text rgba(255,255,255,0.78), border rgba(255,255,255,0.07); "light" → tile #f4f4f5, text #3f3f46, border rgba(24,24,27,0.08). Explicit tileColor / textColor override the theme's values.
- The plane: one `<div class="grid-motion__plane" aria-hidden="true">` absolutely centred (top/left 50%) with transform `translate(-50%, -50%) rotateX(tilt) rotateZ(angle)` — angle in degrees (default −12), tilt 0–75. The plane starts at opacity 0 and fades in over 0.9 s (cubic ease).
- Layout math (recomputed on resize and when rows/aspect/gap/angle/tilt change): planeHeight = ((w·sin|angle| + h·cos|angle|) / max(0.3, cos|tilt|)) × 1.12; planeWidth = (w·cos + h·sin) × (1 + sin(tilt) × 0.9) × 1.12 — always big enough that the rotated plane covers the viewport with margin. tileHeight = max(16, (planeHeight − gap·(rows−1)) / rows) with rows clamped 1–12; tileWidth = tileHeight × aspectRatio (0.3–4); step = tileWidth + gap (gap ≥ 0); perRow = ceil(planeWidth / step) + 1; period = perRow × step; copies = ceil(planeWidth / period) + 2 — enough DOM copies of the sequence that each row can wrap without gaps. Rows are absolutely positioned at top + r × (tileHeight + gap).
- Tile contents: `items` cycles with index (r × perRow + j) mod items.length — strings become text tiles unless they look like an image (URL-ish or an image extension), in which case they render an `<img>` (cover-fit, non-draggable, async decode); `{ src, alt }` objects render images with alt text; React nodes render as-is; null/undefined/false render empty tiles. Font size scales with the tile (clamp(tileHeight × 0.12, 12, 32) px). Each tile carries a 1 px inset border drawn by a ::after box-shadow with the theme border colour.

## Motion

- The frame loop runs continuously while the component is visible (IntersectionObserver-gated) at up to 60 fps-equivalent dt (clamped 0.05 s). Per row r: drift direction is −1/±1 — "left" rows go −1, "right" +1, "alternate" rows alternate (even −1, odd +1); offset += speed × drift × pace[r mod 4] × dt where pace varies per row (1, 0.86, 1.12, 0.94) so rows never lock-step. The row's translate is −period + wrap(offset + shift, period), producing an infinite seamless scroll of the copies.
- Parallax: the pointer position (tracked on window pointermove/pointerdown, released on touch pointerup, window blur or document pointerleave) is converted into the root's local space each frame; while it is inside, nudge = clamp(px / halfWidth, −1, 1) and each row's shift target = parallax × tileWidth × 1.2 × nudge × (odd rows −1, even +1) — neighbouring rows slide opposite ways as the cursor moves. Shifts ease on per-row inertia constants (0.42, 0.32, 0.26, 0.22 s) for a heavy, layered follow.
- Tilt-aware hit point: with tilt > 0 the pointer ray is un-projected through the plane's perspective (flatY = py·depth / (depth·cos + py·sin), flatX = px·(depth − flatY·sin)/depth, depth = perspective px) and rotated by −angle into plane space, so the spotlight lands on the tiles visually under the cursor, not on a flat approximation.
- Spotlight: reach = (0.6 + 2.2 × spotlight) × max(tileWidth, tileHeight); each tile's wanted glow = 1 − smoothstep(0.25, 1, distance(reach-normalized)) from the pointer's plane position. Values ease at rate 1/0.22 s and are written to the tile's `--spot` CSS variable only when they change by more than 0.004 (writes are throttled, values snap to 0 below 0.004). Tile styling: opacity = 1 − dim × (1 − spot) (dim 0–1), and with grayscale on, filter: grayscale(1 − spot) — the cursor's pool is the only colourful place.
- Edges: when fade > 0 the root gets two feather gradients (to right over fade × 34%, to bottom over fade × 44%, smootherstep alpha ramps) applied as mask-image with mask-composite intersect so tiles melt away at the container edges.
- Reduced motion: row drift and parallax targets freeze (offsets and shifts stay put — the wall becomes a static tilted mosaic); the spotlight still tracks the pointer.
- Unmount: cancel the frame loop, disconnect the IntersectionObserver and window/document listeners. Multiple instances are independent; the intro plays once per mount.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { src: string; alt?: string } \| ReactNode \| null)[] | [] | Tile contents, cycled across the wall: text, image URL/object, custom nodes, empty slots. |
| rows | number | 4 | Number of drifting rows, 1–12. |
| aspectRatio | number | 1.33 | Tile width / height, 0.3–4. |
| gap | number | 16 | Gap between tiles in px, ≥ 0. |
| radius | number | 14 | Tile corner radius in px, ≥ 0. |
| angle | number | -12 | Rotation of the whole wall in degrees. |
| tilt | number | 0 | 3D lean-back in degrees, 0–75. |
| speed | number | 24 | Drift speed in px/s. |
| direction | "alternate" \| "left" \| "right" | "alternate" | Drift direction per row: alternating, all left, or all right. |
| parallax | number | 0.5 | 0–1: how far rows slide with the pointer (neighbouring rows opposite). |
| spotlight | number | 0.6 | 0–1: radius of the lit pool around the cursor. |
| dim | number | 0.35 | 0–1: how far unlit tiles fade back. |
| grayscale | boolean | false | Desaturates tiles outside the lit pool. |
| fade | number | 0.5 | 0–1: edge feather width; 0 disables the mask. |
| tileColor | string | - | Overrides the theme tile background. |
| textColor | string | - | Overrides the theme tile text colour. |
| theme | "dark" \| "light" | "dark" | Tile background, text and border tokens. |
| className | string | "" | Extra class on the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of GridMotion.jsx and GridMotion.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: rows drift forever with no visible seam (period wrapping) at speed 0–200; alternate rows counter-drift and parallax slides neighbouring rows opposite ways as the pointer sweeps; tiles under the cursor brighten to full opacity within the pool and dim by dim elsewhere; grayscale keeps colour only in the pool; tilt up to 75° leans the wall with correct spotlight hit-testing through the perspective; text, image-string, {src,alt} and node tiles all render; fewer items than tiles cycle cleanly; theme light flips tokens; tileColor/textColor override; fade feathers both edges; resize reflows without gaps at 375 / 768 / 1440; reduced motion freezes drift but keeps the spotlight; scroll-away stops the loop; unmount leaves no listeners or observers; two instances are independent.
