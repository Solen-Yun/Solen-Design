Implement the "CircularText" component from zero: text laid out around a circle that spins continuously at a configurable pace, reacting to hover by slowing down, speeding up, pausing or going bonkers (spinning 20× while shrinking slightly), with an optional draggable mode that lets you grab the ring, spin it by hand and fling it with momentum, a static 3D plane tilt, a pointer-driven tilt, an optional ring outline and arbitrary centred content. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React >= 18 plus the motion package (`motion` values/springs for rotation, speed, scale and tilt, and its frame loop); two files: CircularText.jsx (entry, layout, spin engine) and CircularText.css (all styles). No iframe.
- Root is a `<div>` with class circular-text plus className, sized `size × size` px, border-radius 50%, text-align center, cursor pointer; `fontSize`, `fontWeight` and `color` (when set) style the glyphs; perspective = size × 2.5 hosts the 3D layers. Draggable mode switches the cursor to grab/grabbing and sets touch-action none and user-select none. Pointer enter/leave/move/down/up/cancel all live on the root.
- Layer stack: a tilt wrapper (absolute, preserve-3d) carries the pointer-driven rotateX/rotateY springs plus a scale spring; inside it a plane div applies the static `tilt` as rotateX(deg) with a 0.7s soft transition; inside that, an absolutely-positioned ring (role="img", aria-label={text}) rotates as one motion value; glyphs are absolutely-positioned spans each rotated to their angle with white-space pre; an optional ring outline span sits at inset 1.3em as a circle border; children (if provided) render centred above the ring, never rotating.

## Letter layout

- The text repeats `repeat` times (min 1, rounded) around the ring. Two layout modes:
  - fill (default): glyphs distribute evenly — angle = startAngle + (360 / total letters) × index — so any text closes the circle exactly.
  - measured (fill=false): each glyph's arc comes from its rendered width (offsetWidth of the first copy's spans, re-measured once fonts are ready) plus letterSpacing × fontSize, converted to degrees via the radius (size / 2 − fontSize × 0.6); before measurement a fallback width of fontSize × (0.3 for spaces, 0.6 otherwise) applies. The arcs scale down uniformly so all copies fit within 360°, each copy starting at startAngle + its share of the circle; glyphs sit at the centre of their arc.
- Letters rotate with the ring; each letter span gets a transform transition (0.5s, linear-ish) only after the first paint has settled (a data-settled flag flips one frame after mount), so layout changes ease instead of jumping on first render.

## Spin engine

- Cruise speed = 360 / spinDuration degrees per second, signed by direction (clockwise positive, counterclockwise negative); spinDuration ≤ 0 or a reduced-motion preference disables cruise entirely. The rotation value integrates velocity × delta each frame via the motion package's frame loop, wrapped modulo 360, and only runs while an IntersectionObserver reports the ring visible — scrolled-out rings cost nothing.
- Hover: pointerenter sets a speed multiplier spring (stiffness 60, damping 18) — slowDown 0.5, speedUp 4, pause 0, goBonkers 20; leave returns it to 1. goBonkers also eases scale to 0.8 while hovered (spring 300/20). A reduced-motion preference skips hover reactions.
- Dragging (draggable): pointerdown (left button, mouse or any touch) captures the pointer, freezes cruise blending, and rotation follows the pointer's polar angle around the centre with ±180° wrap; moves within 6% of the radius (dead zone) are ignored. The last ~100ms of angle samples track travel; on release, the average angular velocity (deg/s) becomes a fling, clamped to ±1440 deg/s minus the current cruise contribution, decaying exponentially (time constant 0.7s, zeroed under 1 deg/s). Dragging scales the ring to 0.96; reduced motion kills the fling.
- Pointer tilt (hoverTilt > 0, mouse/pen only, disabled under reduced motion): the pointer's normalized position (−1..1 across the root) drives tiltX = −ny × hoverTilt and tiltY = nx × hoverTilt on springs (150/18); leave resets both to 0.
- Unmount disconnects the observer and cancels the frame callback; instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | - | The text repeated around the ring. |
| spinDuration | number | 20 | Seconds per revolution; ≤ 0 stops the cruise spin. |
| onHover | "slowDown" \| "speedUp" \| "pause" \| "goBonkers" | "speedUp" | Hover reaction of the spin speed. |
| direction | "clockwise" \| "counterclockwise" | "clockwise" | Spin direction. |
| size | number | 200 | Diameter of the ring, in px. |
| fontSize | number | 24 | Glyph font size, in px. |
| fontWeight | number | 900 | Glyph font weight. |
| letterSpacing | number | 0 | Extra tracking per glyph, in multiples of fontSize (measured mode). |
| color | string | "" | Glyph colour; empty inherits. |
| startAngle | number | 0 | Angle of the first glyph, in degrees. |
| fill | boolean | true | Spread glyphs evenly around the full circle; false uses measured arc widths. |
| repeat | number | 1 | How many copies of the text wrap the ring. |
| ring | boolean | false | Draw the circular outline. |
| ringColor | string | "" | Outline colour; empty uses currentColor. |
| tilt | number | 0 | Static plane tilt around X, in degrees. |
| hoverTilt | number | 0 | Pointer-driven 3D tilt amplitude, in degrees. |
| draggable | boolean | false | Grab and fling the ring. |
| children | ReactNode | - | Content rendered centred over the ring, not rotating. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of CircularText.jsx and CircularText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: fill mode closes the circle for any text and repeat count; measured mode spaces glyphs by real widths after fonts load and never overlaps at radius − 0.6 × fontSize; cruise speed matches spinDuration and reverses with direction; all four hover reactions engage and release through the spring; pause truly stops; goBonkers shrinks while spinning 20×; dragging tracks the pointer with the dead zone and flings within ±1440 deg/s, decaying smoothly; ring outline, tilt, hoverTilt, startAngle, letterSpacing and colour all apply; centred children stay put while the ring spins; scrolled-out rings stop rendering and resume on return; reduced motion keeps the ring static yet readable; text changes re-layout with the settle transition; the ring reads as one accessible image; 375 / 768 / 1440 wide without overflow; unmount leaves no observers or frame callbacks.
