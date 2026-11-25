Implement the "DomeGallery" component from zero: an immersive 3D gallery that projects a ring of image tiles onto the inside of a hemispheric dome. The user drags to spin the dome horizontally and tilt it slightly vertically, tiles glide past with inertia, and clicking a tile lifts the image out of the dome into a centered enlarged viewer with a FLIP transition. The dome fades into a dark backdrop at its edges and center. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS 3D transforms, two files only: DomeGallery.jsx (entry, drag/inertia, enlarge overlay orchestration) and DomeGallery.css (all styles). Drag handling uses a small pointer-gesture hook dependency; everything else is React >= 18. No iframe, no WebGL.
- Root is a `div.sphere-root` filling its container (position relative, width/height 100%) and exposing CSS custom properties: `--radius` (the dome radius in px), `--viewer-pad`, `--overlay-blur-color`, `--tile-radius`, `--enlarge-radius`, `--image-filter`, plus `--segments-x`/`--segments-y` and derived sizing vars — `--circ` = radius × 3.14, `--rot-y`/`--rot-x` = 360° / segments / 2, `--item-width`/`--item-height` = circumference / segments.
- Inside, `main.sphere-main` (absolute inset 0, grid centered, overflow hidden, touch-action none, user-select none, background = the overlay blur colour) holds: a `.stage` with `perspective: calc(var(--radius) * 2)` and `contain: layout paint size`; a `.sphere` wrapper kept at `translateZ(calc(var(--radius) * -1))` with the live rotation applied by JS as `translateZ(...) rotateX(x) rotateY(y)`; and the tile list.
- Each tile `.item` is absolutely centered via inset -999px + margin auto, sized `--item-width × sizeX` by `--item-height × sizeY`, with `transform-style: preserve-3d` and `backface-visibility: hidden`. Its transform places it on the dome surface: `rotateY(unit × (offsetX + (sizeX-1)/2) + var(--rot-y-delta)) rotateX(unit × (offsetY - (sizeY-1)/2) + var(--rot-x-delta)) translateZ(var(--radius))`, where unit = 360/segments/2. The `--rot-*-delta` vars are used only while a tile is being enlarged (see enlarge).
- Tile layout: 35 columns of x offsets from −37 stepping by 2; even columns carry y offsets [−4,−2,0,2,4], odd columns [−3,−1,1,3,5]; every tile is a 2×2 block. Negative y is upward, so the grid covers the upper hemisphere plus the equator. The tile count is columns × 5.
- Each tile contains `div.item__image` (inset 10px, radius `--tile-radius`, overflow hidden, cursor pointer) wrapping an `<img>` with object-fit cover, draggable false, and the shared `--image-filter` (grayscale(1) when grayscale is on). The clickable layer carries `role="button"`, `tabIndex={0}` and `aria-label` from the image alt (fallback "Open image").
- Edges melt into the backdrop: a radial-gradient overlay fading from transparent at 65% to the backdrop colour at 100%; a second overlay with `backdrop-filter: blur(3px)` masked by a radial gradient (transparent 70% → colour 90%); and 120px top/bottom linear-gradient edge fades.
- A `div.viewer` (absolute inset 0, pointer-events none, padded by `--viewer-pad`) holds the square `div.frame` (height 100%, aspect-ratio 1) that marks where enlargements land, and a `div.scrim` (rgba(0,0,0,0.4) + blur, opacity 0, fades to 1 over 500ms while enlarging; pointer-events none until then).
- Image pool: `images` accepts strings or `{ src, alt }`; entries repeat cyclically to fill all tiles, and adjacent duplicate sources are swapped with the next different entry so neighbours never match. If the pool exceeds the tile count a console warning is emitted and extras are dropped.

## Radius & responsive sizing

- A ResizeObserver on the root computes the dome radius on every resize: basis = min/max/width/height of the box per `fitBasis`, with "auto" picking width when aspect ≥ 1.3 and the min dimension otherwise; radius = basis × fit, capped by a height guard of 1.35 × container height, then clamped to [minRadius, maxRadius] and rounded. It also sets `--viewer-pad` to max(8, minDim × padFactor) and injects the colour/filter variables.
- If an enlargement is open during a resize, the overlay is re-measured: with custom `openedImageWidth`/`openedImageHeight` it is re-centered in the frame (a hidden measuring div resolves non-px units); otherwise it is stretched to fill the frame exactly.

## Drag, inertia & interaction

- Drag lives on the sphere-main via a pointer-gesture binding (passive events). Drag start records the current rotation and pointer position; drag maps total dx/dy to rotation: `x = startX − dy / dragSensitivity` clamped to ±maxVerticalRotationDeg, `y = startY + dx / dragSensitivity` wrapped to the signed [−180, 180) range. Movement beyond 4px total marks the gesture as a drag so a subsequent click is suppressed.
- On release, gesture velocity (or, if unavailable, movement-derived velocity clamped to ±1.2) launches inertia: velocity is clamped to ±1.4 then scaled ×80, multiplied per frame by friction 0.94 + 0.055 × dampening, stops below 0.015 − 0.01 × dampening or after 90 + 270 × dampening frames, integrating x −= vY/200 (clamped to the vertical limit) and y += vX/200 (wrapped).
- Opening: clicking (or touch pointer-up on) a tile when no drag moved the pointer and no open is in flight — guarded by an 80ms post-drag window — runs the enlarge sequence: (1) lock body scroll by adding a `dg-scroll-lock` class to `document.body`; (2) compute counter-rotations from the tile's grid offsets and the dome's current rotation and set them as `--rot-y-delta`/`--rot-x-delta` on the tile so it faces the viewer flat; (3) append an invisible reference tile to measure the tile's on-screen rect; (4) hide the original tile, then create an `.enlarge` overlay in the viewer holding a clone of the image, transform it from the tile rect (translate + scale relative to the frame rect, transform-origin top left) to the full frame over `enlargeTransitionMs`, fading opacity from 0 to 1, and set `data-enlarging="true"` on the root so the scrim appears; (5) if `openedImageWidth`/`openedImageHeight` are set, after the first transform transition ends, resize the overlay to that size, centered in the frame, animating left/top/width/height over the same duration.
- Closing: a click on the scrim (ignored within 250ms of opening) or Escape reverses the flow — a cloned `.enlarge-closing` overlay animates from the current overlay rect back to the original tile rect while fading out, the overlay and reference div are removed, the counter-rotation deltas reset to 0, the tile fades back in over 300ms, `data-enlarging` is cleared and the scroll lock released (the lock is released immediately if no original tile position was recorded).
- Unmount removes the body scroll-lock class; the gesture binding, ResizeObserver, scrim and key listeners clean up with the component. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | (string \| { src: string; alt?: string })[] | built-in set of 7 photographic images | Images to spread across the dome tiles; repeated cyclically to fill every tile. Precise default photos are code-embedded. |
| fit | number | 0.5 | Fraction of the chosen fit basis that becomes the dome radius. |
| fitBasis | "auto" \| "min" \| "max" \| "width" \| "height" | "auto" | Which container dimension the radius derives from; auto uses width on wide boxes, else the min dimension. |
| minRadius | number | 600 | Lower clamp for the computed radius, in px. |
| maxRadius | number | Infinity | Upper clamp for the computed radius, in px. |
| padFactor | number | 0.25 | Fraction of the min container dimension reserved as viewer padding around enlargements. |
| overlayBlurColor | string | "#120F17" | Backdrop colour the dome fades into; also the main background. |
| maxVerticalRotationDeg | number | 5 | How many degrees the dome can tilt up/down. |
| dragSensitivity | number | 20 | Pixels of drag per degree of rotation; higher is slower. |
| enlargeTransitionMs | number | 300 | Duration of the enlarge/close transitions, in ms. |
| segments | number | 35 | Number of tile columns around the dome; also drives tile angular size. |
| dragDampening | number | 2 | Inertia feel 0–1: higher friction multiplier, longer spin, earlier stop threshold. |
| openedImageWidth | string | "400px" | Width of the enlarged overlay after it lands in the frame; any CSS size. |
| openedImageHeight | string | "400px" | Height of the enlarged overlay after it lands in the frame; any CSS size. |
| imageBorderRadius | string | "30px" | Corner radius of dome tiles. |
| openedImageBorderRadius | string | "30px" | Corner radius of the enlarged overlay and frame. |
| grayscale | boolean | true | Renders every image in grayscale. |

## Delivery & validation

- Deliver the complete content of DomeGallery.jsx and DomeGallery.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: tiles wrap the upper hemisphere with no gaps at the default segment count and fade into the backdrop at edges and center; dragging spins the dome with wrap-around at ±180° and tilts only within the vertical limit; releasing mid-flick glides with inertia and stops smoothly; images repeat with no two adjacent tiles showing the same source; clicking a tile flattens it, lifts it into the centered square frame, then resizes to the configured opened size; scrim click and Escape both close with the reverse flight back into the tile; a click right after a drag does not open; body scrolling is locked while open and restored after; resizing the container recomputes the radius and keeps an open overlay centered; custom overlayBlurColor recolors the backdrop, fades and tile base; grayscale toggles cleanly; min/max radius clamps and fitBasis variants behave; 375 / 768 / 1440 wide without overflow or scrollbars; unmount leaves no observers, listeners or body class.
