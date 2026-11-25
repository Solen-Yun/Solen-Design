Implement the "ShapeGrid" component from zero: a drifting wall of outlined shapes — squares, rounded tiles, hexagons, triangles, diamonds, circles, crosses or dots — drawn on Canvas 2D. The wall scrolls steadily in one of six directions; a soft spotlight follows the cursor with springy lag and lights the cells it passes, decaying along glowing trails; clicking detonates a cascading ring of light that races outward cell by cell; optional rainbow mode tints every lit cell with a rotating hue; and the whole wall can tilt into a 3D perspective that recedes into a fog of invisibility. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + Canvas 2D, two files only: ShapeGrid.jsx (entry, projection math, drawing) and ShapeGrid.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `shape-grid` (position relative, width 100%, height 100%, overflow hidden) receiving `className` and merged `style`; the only child is a `<canvas class="shape-grid-canvas">` (position absolute, top 0, left 0, transform-origin 0 0). The host gives the container its size.
- Tilt is real 3D: a CSS `matrix3d()` transform on the canvas (composed from tiltX/tiltY in degrees, clamped ±70, with perspective division baked into the matrix). The canvas is sized to the back-projected bounding box of the tilted viewport (16px-aligned), so cells exist only where they could appear; the far plane fades through a "mist" gradient (`destination-in`), and `fade` (0–1, default 1) adds CSS mask-image edge fades (two linear gradients intersected) when below 1. `backgroundColor` paints the root; `opacity` scales it.
- Cell pixel budget: DPR = dpr prop or min(devicePixelRatio, 2), shrinking when the oversized canvas would exceed 8M pixels.
- Line work: `lineWidth` (min 0.25) with round joins/caps, `lineColor` (default a dark ink #2a2734 so lit cells stand out on dark stages).

## Shapes & layouts

- Eight shapes, each traced into one path: `square` (plain rect outline); `tile` (rounded rect, corner radius 22% of the cell); `hexagon` (pointy-top hexes in offset columns — stepX = radius × 1.5, odd rows shifted half a cell); `triangle` (alternating up/down triangles packed edge to edge); `diamond` (rotated square); `circle`; `cross` (thin plus arms, 16% of the cell, drawn as strokes and lit by thickening rather than filling); `dot` (tiny filled circles, 5% of the cell).
- `square` scrolls as continuous grid lines (straight strokes spanning the view); every other shape traces each cell outline and is drawn/stroked per cell. All layouts derive from `cellSize` (min 8).

## Drift & spotlight

- Drift: `direction` moves the wall at 60 × speed px/s along one of `right / left / up / down / diagonal (up-right) / none`; offsets wrap implicitly because the visible cell window is recomputed each frame.
- Spotlight: while the pointer is inside, a light spot chases it with a critically-damped spring (stiffness 220, damping ratio 0.85) in plane coordinates — overshooting slightly on fast flicks; presence eases in at 10/s and out at 5/s. Cells within `radius` × cellSize (min reach 0.5 cells) light with a smoothstep falloff from the rim to the centre; the nearest cell is always fully lit. Each lit cell stores its intensity in a map keyed by (i, j) and decays exponentially with time constant `trail` (min 0.05s), removed below 0.004.
- Lit rendering: fill with `hoverFillColor` (defaulting to `hoverColor`) at `fillOpacity` × intensity (default 0.15), then stroke `hoverColor` at 0.85 alpha; shadowBlur = glow × 16 × intensity in the cell's colour when `glow` > 0. Cross/dot markers instead thicken and fill their tiny marks. `rainbow` replaces the stroke/fill colour with `hsl(hue, 90%, tone)` where hue = time × 120° + (x + y)/cellSize × 12° and tone is the hover colour's lightness clamped 0.45–0.68.

## Cascades, twinkle & intro

- Click cascade (`clickCascade`): each click (up to 6 concurrent, oldest evicted) spawns an expanding ring: ring index = round(distance / cellSize), a gaussian pulse (width 0.085s) arrives at ring k at click-time + k × 0.055s, with power fading to zero at the edge of the view; the strongest active ring paints the cell and shifts its rainbow hue by +16° per ring — a visible wave of light racing outward and dying.
- Twinkle (`twinkle` 0–1): each cell hashes to its own rhythm; rare sharp peaks (max(0, sin)^18 × 0.7 × twinkle) briefly light individual cells with a random hue — a starfield shimmer over the wall.
- Intro: with `intro` on, a reveal circle expands from the centre at 1.8 × view-reach per second, clipping the wall via a `destination-in` radial gradient; cells right at the wave front get an 0.85-intensity flash with an angular rainbow hue, so the wall blooms outward on mount. After ~3s of full reveal the mask is dropped.
- Frame loop self-sleeps: with drift off (speed 0 / direction none / reduced motion) it settles once the lit map and cascades are empty, twinkle is 0, the spotlight has faded and the intro has finished; otherwise it keeps animating. Resize, visibility (IntersectionObserver) and pointer events wake it.
- prefers-reduced-motion: drift and twinkle stop; spotlight, cascades and the intro still work but never self-animate.
- Settings are mirrored into a ref every render; a per-render redraw keeps every prop live. Props like `lineColor` need no GL rebuild — the wall redraws on the next frame.
- Unmount: cancel the frame, disconnect ResizeObserver and IntersectionObserver, remove window/document listeners, null the engine ref. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| shape | "square" \| "tile" \| "hexagon" \| "triangle" \| "diamond" \| "circle" \| "cross" \| "dot" | "square" | Cell shape (unknown values fall back to square). |
| cellSize | number | 40 | Cell edge length in px, min 8. |
| lineWidth | number | 1 | Outline width, min 0.25. |
| direction | "right" \| "left" \| "up" \| "down" \| "diagonal" \| "none" | "diagonal" | Drift direction of the wall. |
| speed | number | 0.5 | Drift speed multiplier; 0 holds the wall still. |
| lineColor | string | "#2a2734" | Outline colour of unlit cells. |
| hoverColor | string | "#ffffff" | Stroke colour of lit cells; also sets the rainbow tone. |
| hoverFillColor | string | hoverColor | Fill colour of lit cells. |
| fillOpacity | number | 0.15 | Fill opacity of lit cells, 0–1. |
| rainbow | boolean | false | Lit cells cycle through rotating hues instead of hoverColor. |
| tiltX | number | 0 | 3D tilt around the x axis, ±70°. |
| tiltY | number | 0 | 3D tilt around the y axis, ±70°. |
| radius | number | 1.5 | Spotlight reach in cells, ≥0. |
| trail | number | 0.6 | How long lit cells glow after the spotlight passes, ≥0.05s time constant. |
| glow | number | 0.35 | Shadow blur strength of lit cells, 0–1. |
| twinkle | number | 0 | Random per-cell sparkle intensity, 0–1. |
| fade | number | 1 | CSS edge fade of the wall, 0–1 (1 = no fade). |
| clickCascade | boolean | true | Clicking fires an expanding ring of light through the cells. |
| intro | boolean | true | The wall blooms outward from the centre on mount. |
| opacity | number | 1 | Overall opacity, 0–1. |
| backgroundColor | string | "transparent" | Background painted behind the canvas. |
| paused | boolean | false | Freezes drift, spotlight and cascades. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of ShapeGrid.jsx and ShapeGrid.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all eight shapes draw their distinct outlines and light correctly (squares as continuous lines, hex offset columns, alternating triangles, marker-style cross/dot); drift runs in all six directions and freezes at speed 0; the spotlight springs after the cursor and leaves decaying trails; clicks cascade rings outward with a visible hue shift; rainbow mode rotates hues and fills; tiltX/tiltY produce correct CSS 3D perspective with the far plane fading into mist; twinkle sparkles sparsely; intro blooms outward once; fade masks the edges; backgroundColor/opacity apply; paused and prefers-reduced-motion settle to a static wall that still responds to the cursor; resize keeps cells aligned under tilt; the loop sleeps when settled and wakes on interaction; unmount leaves no listeners, observers or frame loops; 375 / 768 / 1440 wide without overflow.
