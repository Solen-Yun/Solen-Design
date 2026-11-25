Implement the "TearTicket" component from zero: a ticket whose perforated stub tears off by hand — grab the stub with a pointer, the paper hinges at the nearest perforation end, fibres stretch as quadratic curves between body and stub, snap one by one as the pull exceeds their reach, and once the last fibre breaks the stub swings free, follows the pointer, then drops with gravity, spin and a fade while the body shifts over to close the gap. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: TearTicket.jsx (entry, perforation geometry, tear simulation) and TearTicket.css (all styles). Uses `motion/react` only for the hover tilt plane and reduced-motion detection. No iframe, no canvas — all shapes are SVG paths and CSS `clip-path: path(...)`.
- Root is a `<div class="tear-ticket">` with inline CSS variables for width (default 460px), height (250px), stub size (150px), background (#27272a), stub background, ink (#f5f5f5), an edge colour (a 16%-ink color-mix unless borderColor is given), border width, parallax depth, the body pane size (width minus stub for horizontal, height minus stub for vertical), art inset (8px), art span (0.78), art radius and a fit factor. The root's height is height × fit so the ticket scales down as one unit when its container is narrower than the design width (ResizeObserver-driven, stage transform scale with a 650ms ease-out transition).
- Orientation: `data-orientation` horizontal (stub on the right) or vertical (stub at the bottom). After a tear with recenter on, the stage shifts by half the stub size toward the body so the ticket re-centres; `data-instant` suppresses transitions during an instant (keyboard) tear; `data-used`, `data-grabbing`, `data-disabled` drive state styling.
- Both pieces are absolutely stacked panes inside a perspective plane. Each piece = an optional edge SVG (a stroked outline path, fill none) over a paper div clipped by `clip-path: path('...')` with the piece background. The body paper holds the art area (an inset box at the top 78% span with a rounded radius, holding an `<img>` sized parallax-wide for tilt parallax and a bottom-to-top background scrim) plus the content layer (children, width = body pane) which dims to 0.55 opacity after use; the image desaturates (grayscale, brightness 0.75) after use. The stub paper holds a stub content box.
- A perforation SVG layer sits between the pieces: for each of the `holes` perforation bridges it owns two paths (near/far fibres), stroked in the background colour so they read as torn-paper edges, opacity 0 when intact.

## Perforation geometry

- Deterministic (seeded by hole count × cross size, so the same props always give the same tear line): the tear line sits `stubSize` from the far edge with a `notch` (default 3px) rounded shoulder on each side; `holes` (default 12) semicircular cut-outs of holeSize (6px) are spaced evenly with bridges between; bridges subdivide into points jittered ±roughness (default 0 — set 2–4 for a rough hand-torn edge). Every bridge records its midpoint, its jittered polyline points, and its two ends where fibres attach.
- Two closed paths are emitted: the body outline (full ticket minus stub, cut along the perforation) and the stub outline, plus the shared bridge data for the fibre simulation. Changing any geometry prop rebuilds and resets the tear state.

## Tear simulation

- Grabbing the stub (pointer down on it, not disabled/used, primary button): pointer capture; the hinge is chosen once at rest — the perforation end on the far side of the grab (if the pointer starts past the middle across the stub, hinge at the opposite end); the stub's transform-origin moves to that hinge; the grab point is stored in stub-local space. Hover tilt springs are zeroed while gripping.
- Held phase: the wanted fold angle is the pointer's angle around the hinge (relative to the grab angle, signed to the hinge side) scaled by a follow factor that shrinks as fibres break (0.92 × (1 − resistance × intact ratio), resistance default 0.45), clamped to 0…tearAngle+0.1 rad (tearAngle default 30°); the angle approaches it with an exponential smoothing (tau 35ms). The stub also eases a small positional slack toward the pointer (away axis ±4px, side ±3px).
- Fibre stretching: every frame each intact bridge renders two quadratic Bézier fibres from its body end to the rotated stub end (sag grows with the gap, stroke width thins from 1.7 to ~0.55), opacity 1. A bridge snaps when the chord 2·d·sin(θ/2) plus positional slack exceeds stretch (default 30px) or θ hits the angle cap; snapping adds a recoil kick to the body (−560/count velocity). Fibre span history powers the 0.17s retract animation: after snapping, each fibre shrinks back to its own end and fades out.
- Free phase (all bridges snapped): the stub hangs at 0.55 × the angle cap plus a bit of pointer velocity, following the pointer's grip point with 45ms smoothing. Release converts recent pointer velocity (±1600px/s x, ±1200 y; a >80ms still hold releases without throw) into a ballistic drop: gravity 2400px/s², spin from the throw velocity plus 1.2 rad/s toward the hinge side, fade starts after 0.16s over 0.42s; at full fade the stub hides, the controlled/uncontrolled `torn` state lands and onTear fires.
- Release before full tear: the stub springs back to rest (spring on angle, exponential position ease), ready to grab again.
- Reduced motion: dragging past 28px instantly tears (skip the film); keyboard Enter/Space tears instantly; the stage shift transition is disabled.
- Controlled mode: pass `torn` (stub hidden while true) and listen to onTear; uncontrolled uses defaultTorn. Resetting torn to false resets the simulation and shows the stub again.

## Tilt parallax

- With tilt on (default) and reduced motion off, window pointermove (non-touch, while not gripping) drives two springs (stiffness 220, damping 24) around the ticket centre normalized by tiltReach (260px): the whole plane gets `perspective(1000px) rotate(4deg) rotateX/rotateY(±tiltMax)`; the art image translates opposite the tilt (depth = parallax/tiltMax) and the ink content translates 22% of that for layered depth. Disabled while disabled.

## Accessibility

- The stub is `role="button"` (tabIndex 0 unless disabled/used) with ariaLabel (default "Tear off the stub"), `aria-disabled`, and hidden once used. Enter/Space tears instantly (non-repeating). A visually hidden `role="status"` live region announces "Used" after the tear.
- Unmount cancels the frame loop, disconnects the ResizeObserver and removes the tilt listener. The frame loop self-sleeps when idle, parked and no fibres are animating.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | null | Body content: the part of the ticket that stays. |
| stub | ReactNode | null | Stub content: the part that tears off. |
| image | string | '""' | Body artwork image URL, shown inside the rounded art window. |
| imageAlt | string | '""' | Alt text of the artwork. |
| scrim | boolean | true | Gradient scrim over the artwork, fading into the ticket background. |
| imageRadius | number | 8 | Corner radius of the artwork window, in px. |
| orientation | "horizontal" \| "vertical" | "horizontal" | Stub on the right or at the bottom. |
| torn | boolean | - | Controlled torn state. Leave out for uncontrolled mode. |
| defaultTorn | boolean | false | Initial torn state in uncontrolled mode. |
| onTear | () => void | - | Called when the stub finishes tearing off. |
| width | number | 460 | Design width in px; scaled down as one unit on narrower containers. |
| height | number | 250 | Design height in px. |
| stubSize | number | 150 | Stub width (or height) in px. |
| radius | number | 16 | Ticket corner radius in px. |
| holes | number | 12 | Perforation cut-outs along the tear line. |
| holeSize | number | 6 | Diameter of each perforation cut-out, in px. |
| notch | number | 3 | Rounded shoulder inset at both ends of the tear line, in px. |
| roughness | number | 0 | Jitter amplitude of the tear line, in px; 0 is a clean cut. |
| tearAngle | number | 30 | Maximum fold angle before the tear completes, in degrees. |
| stretch | number | 30 | Fibre extension at which a bridge snaps, in px. |
| resistance | number | 0.45 | How much intact fibres resist the pull, 0–0.95. |
| rotate | number | 4 | Base rotation of the tilt plane, in degrees. |
| tilt | boolean | true | Enables the hover tilt parallax. |
| tiltMax | number | 9 | Tilt amplitude in degrees. |
| tiltReach | number | 260 | Pointer distance from centre that maps to the full tilt, in px. |
| parallax | number | 6 | Artwork parallax travel inside the art window, in px. |
| perspective | number | 1000 | CSS perspective of the tilt plane, in px. |
| background | string | "#27272a" | Ticket paper colour. |
| color | string | "#f5f5f5" | Ink colour for text, border mix and fibres' contrast. |
| border | boolean | true | Draws the outlined edge path around both pieces. |
| borderColor | string | '""' | Edge colour; defaults to a 16% mix of the ink. |
| borderWidth | number | 1 | Edge stroke width. |
| stubBackground | string | '""' | Stub paper colour; defaults to the ticket background. |
| recenter | boolean | true | Slides the stage half a stub over after the tear. |
| disabled | boolean | false | Blocks grabbing and dims the ticket. |
| ariaLabel | string | "Tear off the stub" | Accessible name of the stub. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of TearTicket.jsx and TearTicket.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: grabbing the stub hinges it at the far perforation end and folds with the pointer; fibres stretch, thin and snap one by one with audible-order retractions; after the last snap the stub follows the hand, drops on release with gravity and spin, fades out and onTear fires once; releasing early springs the stub back and it can be re-grabbed; resistance makes the tear feel harder; tearAngle caps the fold; roughness roughens the tear line; holes/holeSize/notch reshape the perforation; orientation vertical tears downward; the body re-centres after the tear and dims; the artwork desaturates; keyboard Enter/Space tears instantly and the status region announces "Used"; controlled torn resets bring the stub back intact; reduced motion tears instantly without the film; the ticket scales down as one unit on narrow containers without cropping; unmount leaves no frame loop, observers or listeners; 375 / 768 / 1440 wide without overflow.
