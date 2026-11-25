Implement the "CurvedLoop" component from zero: a marquee whose text travels along an SVG path — an arc, a wave, a straight line, or a closed ring. The loop drifts on its own, can be grabbed and thrown with a fling (rings follow the pointer around the circle), speeds up momentarily with page scrolling, and can render as outlines with a separately coloured separator. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + SVG, two files only: CurvedLoop.jsx (entry, geometry, motion) and CurvedLoop.css (all styles). React >= 18; no runtime dependencies. No iframe, no canvas.
- Root is a jacket `<div>` (class curved-loop-jacket): min-height 100vh, display flex, align-items center, justify-content center, width 100%; inline visibility hidden until the text is measured, cursor grab/grabbing while interactive and dragged, touch-action pan-y when interactive, and an optional CSS mask-image for the edge fade.
- Inside sits one `<svg>` (class curved-loop-svg): width 100%, aspect-ratio 100/12, overflow visible, display block, fill currentColor, user-select none, text-transform uppercase, line-height 1; inline font-size, font-weight and letter-spacing from props; role="img" with aria-label = the marquee text. For the circle shape the svg instead takes a percentage width (see geometry) and aspect-ratio 1.
- Children of the svg: a hidden measure `<text>` holding the loop unit (visibility hidden, opacity 0, pointer-events none); a `<defs>` with the loop `<path>` (fill none, stroke transparent) and, in outline mode, a text-shaped mask (a full white rect minus a black textPath copy of the repeated text, maskUnits userSpaceOnUse spanning 3× the 1440 design width); and the visible `<text>` — fill currentColor-based colour by default, or stroked outlines (stroke width = fontSize × 0.05, linejoin round) masked by the text mask in outline mode. A separately coloured separator is rendered as its own text layer (filled, or unfilled plus an extra fill layer under the outlines).
- The unit of text is the marquee text trimmed of trailing whitespace, joined as `body\u00A0` (or `body\u00A0mark\u00A0` when a separator is set), repeated N times along the path through `<textPath href>` elements with a shared startOffset in px; every motion step rewrites startOffset on all textPath nodes. Repeats are separate Fragments so the separator tspan can carry its own paint.

## Geometry

- Design space: width 1440, height 120; the baseline of flat shapes sits at height/2 + fontSize × 0.36; paths start and end 100px beyond the design width so text never pops at the seams.
- arc (default): one quadratic `M-100,40 Q500,40 + curveAmount 1540,40` — curveAmount is the dip at the middle, negative values arch up.
- wave: a cosine of wavelength 960 px and amplitude curveAmount × 0.25 centred on the baseline, sampled every wavelength/8 and emitted as cubic Béziers using the exact endpoint positions and slopes.
- line: straight from -100 to 1540 on the baseline.
- circle: a ring closed with two arc commands; the radius is chosen so a whole number of repeats fits the circumference: repeats = round(2π × fontSize × 2.2 / spacing) (at least 1), radius = repeats × spacing / 2π (fallback radius fontSize × 2.2 before the first measurement); the viewBox is a square of radius + fontSize per side and the svg width becomes min(1, fontSize × 3.2 / 1440) × 100% with aspect-ratio 1, so the ring scales with its container.
- ellipse: a wide closed ring for wrapping centred content. The horizontal semi-axis is fixed at 700 design units; the vertical semi-axis is curveAmount (floored at 40). Ramanujan's approximation gives the perimeter, repeats = round(perimeter / spacing) (at least 1), and the whole ellipse is then scaled uniformly by repeats × spacing / perimeter so the ring closes exactly with no gap or overlap at the seam. The viewBox is a rect of rx + fontSize by ry + fontSize per side, centred on the origin; the svg width becomes min(1, (rx + fontSize) × 2 / 1440) × 100% with aspect-ratio set to the padded box ratio (instead of 1), so the ellipse scales with its container. Like the circle it is drawn as two arcs clockwise from the left point, so text reads upright across the top and reversed across the bottom.
- Copies: ring takes repeats + 1; other shapes take ceil(pathLength / spacing) + 2, where pathLength comes from getTotalLength(). spacing is the measured advance width of one text unit via getComputedTextLength on the hidden text; it re-measures on mount, after document.fonts.ready, on fonts loadingdone, and through a ResizeObserver on the svg.

## Motion & interaction

- Motion state lives in refs: offset (wrapped into [-spacing, 0)), velocity, direction, scroll level, drag state. The render loop runs in requestAnimationFrame with dt clamped to 0.05 s and pauses when an IntersectionObserver reports the jacket offscreen (it resets the clock and scroll level on return).
- Self motion: velocity eases toward direction × speed × 60 px/s with 1 - exp(-dt × 3); each step advances the offset by velocity × dt plus the scroll extra, then wraps by the spacing. speed 0 keeps the text still until dragged or scrolled.
- scrollBoost (px of extra speed per px/s of scrolling): a capture-phase scroll listener accumulates |scroll distance| across window and ancestor scrollers; its rate eases into a level (attack rate 10, release 2.4) that adds direction × level × scrollBoost × 0.3 px/s while not dragging or halted.
- pauseOnHover: pointer enter sets a hover flag (pointer leave clears it and ends any drag); while hovered the target velocity is 0, easing to a stop and back. prefers-reduced-motion halts the self motion entirely; dragging and the pause logic remain.
- Drag: pointerdown on the jacket (interactive on) captures the pointer, zeroes velocity, and records the start x and time plus a design-space scale of 1440 / rect width. pointermove advances the offset by (dx × scale); on a ring it instead advances by the wrapped angle change × the radial arm around the ring centre, where the arm is the local ellipse radius r(θ) = rx·ry / √((ry·cosθ)² + (rx·sinθ)²) — this reduces to the plain radius when rx = ry. Velocity is a 50/50 blend of the previous value and delta/dt. Release: if the gesture lasted under 100 ms the velocity hands off (clamped to ±4000), otherwise it zeroes; a fling beyond ±60 flips the travel direction to the throw. During the drag the self motion is suspended and the cursor shows grabbing.
- Everything is per-instance: path ids are namespaced through useId, and instances share nothing.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| marqueeText | string | "" | The text that loops along the path. Repeats are joined with a space. |
| shape | "arc" \| "wave" \| "circle" \| "ellipse" \| "line" | "arc" | The path the text travels on. Circle closes the loop into a ring that always fits a whole number of repeats; ellipse is a wide ring (horizontal semi-axis 700, vertical semi-axis = curveAmount) sized the same way. |
| color | string | "currentColor" | Colour of the text, or of its outline when outline is on. Follows the surrounding text colour by default. |
| separator | string | "" | A mark placed between repeats, such as ✦ or /. Leave empty to join repeats with a space. |
| separatorColor | string | - | Paints the separator in its own solid colour. Matches the text when left unset. |
| direction | "left" \| "right" | "left" | Which way the text travels. On a circle, right turns clockwise. A drag flips it to the way it was thrown. |
| speed | number | 2 | How fast the text travels along the path, in design px per 1/60 s. 0 keeps it still until dragged or scrolled. |
| scrollBoost | number | 0 | How much page scrolling speeds the loop up for a moment before it eases back. 0 turns it off. |
| curveAmount | number | 400 | How far the path bends. On the arc it is the dip at the middle (negative arches up), on the wave it sets the wave height. |
| fontSize | number | 96 | Letter size in px for a 1440px wide loop. The whole loop scales with its container. |
| fontWeight | number \| string | 700 | Weight of the letters. |
| letterSpacing | number | 0 | Extra space between letters in px, measured like fontSize. |
| edgeFade | number | 0 | How much of each side fades out, 0–1. At 1 only the middle stays fully visible. |
| outline | boolean | false | Draws the letters as outlines instead of solid text. |
| interactive | boolean | true | Lets people drag the text and fling it. Rings follow the pointer around. It glides back to its normal speed afterwards. |
| pauseOnHover | boolean | false | Eases the text to a stop while the pointer is over it. |
| className | string | - | Extra class names for the text, for example to change its font. |

## Delivery & validation

- Deliver the complete content of CurvedLoop.jsx and CurvedLoop.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all five shapes draw and loop seamlessly with no popping at the path ends; the ring and the ellipse always close exactly (no gap or overlap) at any fontSize and letterSpacing; repeats survive font loading and container resizes; speed and direction hold, speed 0 stays still; dragging works on flat shapes, rings and the ellipse (angular drag along the local radius), fling hands off and flips direction, rings follow the pointer around; scrollBoost spikes with scrolling and eases back; pauseOnHover eases to a stop and resumes; edgeFade fades both sides; outline mode strokes letters with a separately coloured separator; separator colour applies in both fill and outline modes; prefers-reduced-motion stops self motion; offscreen loops stop rendering; same-page instances are independent; the screen reader hears the marquee text; no horizontal overflow at 375 / 768 / 1440 wide.
