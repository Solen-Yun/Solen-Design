Implement the "OrbitImages" component from zero: images riding an SVG path like beads on a wire — an elliptical carousel by default, but the track can be a circle, square, rectangle, triangle, star, heart, infinity loop, wave or any custom path string. The track reads as 3D: items near the bottom grow and stack above the ones shrinking and dimming behind, the whole train can be grabbed and thrown along the wire, clicking an image glides it to the front, and a central logo slot sits between the far and near halves of the track. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + DOM/SVG, two files only: OrbitImages.jsx (entry, path generators, positioning engine) and OrbitImages.css (all styles). React >= 18; no runtime dependencies. No iframe, no WebGL.
- Root is a `div` with class orbit-container plus an optional extra className: position relative, centred horizontally with auto margins, isolation isolate, user-select none, tap-highlight transparent. Inline style from props: width (number → px or any CSS length, default 100%), height (when not "auto"), and aspect-ratio = the track's measured bounding-box aspect when height is auto, so the container always fits the orbit. Three CSS variables are set from props: --orbit-radius (itemRadius as a percentage of itemSize, or any CSS length), --orbit-shadow (0–1) and --orbit-hover-scale.
- Data attributes drive CSS behaviour: data-draggable (cursor grab, touch-action pan-y pinch-zoom), data-dragging (cursor grabbing everywhere), data-intro (items hidden until the engine's first frame, so the intro never flashes static positions). When no onItemClick is given the whole root is aria-hidden="true"; with it, each item becomes role="button" tabIndex={0} with an aria-label.
- Painted content: one full-size SVG carrying the track `<path>` (fill none, stroke = pathColor, linecap round, rotated by `rotation` degrees around the centre, viewBox rewritten each layout; visibility hidden unless showPath). When showPath, depth > 0 and centerContent is present, a second SVG layer at z-index 105 redraws the same path clipped by a rect covering only the front half (below the track's vertical midline), so the track visually threads behind and in front of the central content. Then one `div.orbit-item` per image (positioned absolute at the origin, moved purely by transform), each wrapping `div.orbit-item-inner` (overflow hidden, border-radius var, drop shadow scaled by --orbit-shadow, hover/focus scale transition 0.45 s cubic-bezier(0.2,0.8,0.2,1), focus-visible outline) holding the `<img>` (object-fit cover, draggable false, decoding async). centerContent renders inside an absolutely centred flex layer at z-index 100 that passes pointer events through to its children and is excluded from dragging.
- Images come from the images prop: strings or { src, alt } objects; alt falls back to `altPrefix` + " " + (index + 1).

## Track geometry

- shape picks the closed path, all generated centred at baseWidth/2 on a baseWidth × baseWidth SVG plane: "ellipse" (radiusX × radiusY), "circle" (radius), "square" (side radius × 2), "rectangle" (radiusX × 2 by radiusY × 2), "triangle" (equilateral inscribed in radius × 2), "star" (starPoints spikes, inner radius = radius × starInnerRatio), "heart", "infinity" (figure-eight of radiusX × 2 by radiusY × 2), "wave" (a closed ribbon: radiusX × 2 long, amplitude radiusY, 3 sine periods), "custom" uses customPath verbatim (falling back to a circle when empty). Unknown values fall back to the ellipse.
- The engine samples the path at 720 points via getPointAtLength into a lookup table, rotating every sample by `rotation` degrees around the centre; from the samples it derives the total length, the front index (lowest sample — the bottom of the track), the vertical midline and half-extent, and a bounding box padded by itemSize/2 × (1 + depth × 0.3) × max(1, hoverScale) + 2. The measured aspect feeds the container's aspect-ratio.
- Layout maps the bbox into the container: scale = min(container w / bbox w, container h / bbox h); item pixel size = itemSize × scale; the SVG viewBox covers the bbox; stroke width = pathWidth / scale so it stays constant on screen; a pathDash > 0 becomes a screen-constant dash pattern (dash = pathDash / scale, gap × 1.6).
- Item placement: each item owns a parameter u = global progress + its offset — fill=true spaces items evenly (index/count), fill=false spaces them by arc length (index × itemSize × 1.3 / total length). Position comes from the LUT; depth d = clamp((y − yMid) / yHalf): scale = 1 + depth × (0.3 on the front half → −0.45 at the back), opacity = 1 − depth × 0.55 × (1 − w) on the back half; z-index 10–90 behind the midline, 110–190 in front (1 when depth is 0); the hovered item jumps +200. alignToPath rotates each item to the track's local heading.

## Motion & interaction

- Progress advances dt / duration per second (duration in s) with speed easing toward 1, or toward hoverSpeed (0–1) while the pointer is inside; direction "reverse" negates progress. easing applies per-lap: linear or easeIn/easeOut/easeInOut via a Newton-solved cubic-bezier; the integer lap part is wrapped off every frame.
- Drag (draggable, mouse left button only, not on center content): after a 5 px horizontal commitment — vertical intent cancels it — pointer capture engages and manual progress follows dx / rate, where rate is the track's screen-space x-slope at the front, clamped to at least 35% of the track's screen length per full path. Release converts the last 100 ms of pointer samples into a glide (clamped to ±3 laps) decaying exponentially (τ 0.7 s); a 400 ms window after the drag suppresses accidental clicks.
- Click / keyboard: clicking an item (or Enter/Space on a focused one) fires onItemClick(index, src); when clickToFront is on it first glides that item to the front — a cubic in-out seek tween of the manual offset over 0.45 s + |delta| × 1.4 s. Focus by keyboard (:focus-visible) also brings the item forward.
- Intro (intro prop, skipped under prefers-reduced-motion): on the first visible frame all items converge out of the front point — their offsets multiply a spread that eases 1.3 → 1 over 1.3 s (quintic ease-out) while each scales 0.7 → 1 and fades in over 0.45 s; when no dash pattern is set the track stroke draws itself in with the same reveal.
- prefers-reduced-motion freezes the orbit like paused, skips the intro and disables the hover transition; the engine listens to the media query and reacts live.
- paused stops the auto orbit but keeps dragging, seeking and rendering responsive.

## Lifecycle

- The engine is created once per mount (layout-effect) and refreshed whenever the path, rotation, baseWidth, itemSize, depth, hoverScale, image count, showPath, pathWidth, pathDash, measured aspect or height change. The frame loop self-sleeps: it runs only while the intro plays, the orbit moves, a drag/seek/glide is active or the speed is easing; ResizeObserver, IntersectionObserver (threshold 0.05), document visibilitychange and window resize wake it. Unmount cancels the frame and removes every listener and observer. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | (string \| { src: string; alt?: string })[] | [] | The orbiting images. |
| altPrefix | string | "Orbiting image" | Fallback alt text prefix, numbered per image. |
| shape | "ellipse" \| "circle" \| "square" \| "rectangle" \| "triangle" \| "star" \| "heart" \| "infinity" \| "wave" \| "custom" | "ellipse" | Track shape. |
| customPath | string | - | Raw SVG path data used when shape is "custom". |
| baseWidth | number | 1400 | Internal SVG plane the paths are generated on. |
| radiusX | number | 700 | Horizontal radius for ellipse / rectangle / infinity / wave. |
| radiusY | number | 170 | Vertical radius for ellipse / rectangle / infinity / wave. |
| radius | number | 300 | Radius for circle / square / triangle / star / heart. |
| starPoints | number | 5 | Spike count for the star shape. |
| starInnerRatio | number | 0.5 | Inner radius as a fraction of the outer radius (star). |
| rotation | number | -8 | Track rotation in degrees around the centre. |
| duration | number | 40 | Seconds per full lap of the track. |
| itemSize | number | 64 | Base item size in design units, scaled to fit the container. |
| direction | "normal" \| "reverse" | "normal" | Orbit direction. |
| fill | boolean | true | Space items evenly around the lap instead of by arc length. |
| width | number \| string | "100%" | Container width (number → px). |
| height | number \| string | "auto" | Container height; "auto" derives it from the track aspect. |
| className | string | "" | Extra class names for the container. |
| showPath | boolean | false | Draws the track stroke. |
| pathColor | string | "rgba(128,128,128,0.35)" | Track stroke colour. |
| pathWidth | number | 2 | Track stroke width in px. |
| pathDash | number | 0 | Track dash length in px; 0 draws a solid line. |
| easing | "linear" \| "easeIn" \| "easeOut" \| "easeInOut" | "linear" | Per-lap easing of the progress. |
| paused | boolean | false | Stops the auto orbit; drag and click still work. |
| depth | number | 0.5 | Pseudo-3D amount 0–1: grow/dim/z-order spread across the track. |
| itemRadius | number \| string | 12 | Item corner radius (number → % of item size). |
| shadow | number | 0.3 | Item drop shadow strength 0–1. |
| hoverScale | number | 1.08 | Item scale on hover / focus-visible. |
| hoverSpeed | number | 0.3 | Orbit speed while hovered, 0–1. |
| draggable | boolean | true | Grab the train and throw it along the track. |
| clickToFront | boolean | true | Clicked items glide to the front before firing the callback. |
| onItemClick | (index: number, src: string) => void | - | Makes items interactive buttons. |
| alignToPath | boolean | false | Rotates each item to the track's local heading. |
| intro | boolean | true | Items converge out of the front point on first view. |
| centerContent | ReactNode | - | Slot rendered between the back and front halves of the track. |

## Delivery & validation

- Deliver the complete content of OrbitImages.jsx and OrbitImages.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: ellipse / circle / square / rectangle / triangle / star / heart / infinity / wave tracks all lay out fully inside the container at any aspect; custom paths drive items correctly; front items grow and stack over dimmed back items with correct z-order; drag commits horizontally, cancels on vertical intent, throws with glide and never mis-fires clicks; click glides an item to the front and fires onItemClick; keyboard Enter/Space/focus-visible reach the same behaviour; centerContent sits between track halves and is excluded from dragging; showPath draws with the chosen colour, width and dash and threads around centerContent; intro converges and the stroke draws in once; paused and prefers-reduced-motion freeze without breaking drag; resize keeps everything fitted; unmount leaves no listeners, observers or frame loop; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
