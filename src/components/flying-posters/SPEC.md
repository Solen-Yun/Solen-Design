Implement the "FlyingPosters" component from zero: an endless column of 3D posters that twist and flip around a chosen axis as they travel up (or down) through the viewport — scrolling the wall (wheel, drag, page scroll, or an auto-drift) drives every poster along a seamless loop, each one rotating through its flip mid-flight and shading darker as it turns away. Optional neighbouring columns counter-scroll beside the main one. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + raw WebGL2, two files only: FlyingPosters.jsx (entry, atlas packing, scroll physics, instanced drawing) and FlyingPosters.css (root frame and canvas cursors). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.flying-posters` filling its container (position relative, overflow hidden); inside is one fullscreen canvas (position absolute, inset 0, cursor grab / grabbing while pressed; `touch-action: none` when drag is on, auto otherwise). WebGL2 context with alpha, premultipliedAlpha, antialias true; DPR min(devicePixelRatio, 2). If context or shader compilation/link fails, the component renders nothing silently.
- Rendering is instanced: one shared 100×1-segment unit quad (positions + triangle indices in a VAO) drawn once per poster slot via `drawElementsInstanced`; a per-instance vec4 attribute carries (column, slot, itemIndex, 0) with divisor 1. Item indices are `(slot + column × 2) % itemCount`, so both columns and the loop stagger their images.
- Poster layout (in world units): vertical spacing = planeHeight + gap (gap defaults to 5 world units when not given); column x = (column − (columns−1)/2) × (planeWidth + columnGap); each poster's y position wraps modulo the loop length (slots × spacing) with odd columns travelling the opposite direction when alternate is on. Slot count is computed from container height so the screen is always covered (at least one extra slot), recomputed on resize.
- The vertex shader flips each poster: travel progress maps to a quintic-in-out eased rotation (up to `rotation` degrees) around the axis vector (vertical [0,1,0], horizontal [1,0,0], diagonal [1,1,0]); `distortion` staggers the progress per quad corner (a ±2× distortion shift across the poster) so posters twist through the flip progressively instead of rigidly, with progress clamped to 0–2 so extreme distortion curls the corners past the half-flip. A velocity-driven `lean` rotateX (±0.5 rad, eased toward a target proportional to −velocity × lean × 0.0006) tilts the whole wall like it banks into the scroll.
- Fragment shader: posters are rounded-box masked (radius prop, clamped to half the smaller side, fwidth antialiased), textured from a packed atlas (per-cell inset sampling, mipmapped), shaded by facing (`0.4 + 0.6 × |normal.z|` mixed by the shading prop so back-turned posters darken), and faded near the screen's top/bottom edges by a quintic ramp on clip-space y (the fade prop). Everything multiplies by a global reveal alpha; alpha below 0.002 discards. Blending is premultiplied (ONE, ONE_MINUS_SRC_ALPHA), depth test off.
- Atlas: all item images are center-cropped to the plane's aspect and packed into a square canvas atlas — cells = ceil(√n), cell size = 4096/cells clamped to 128–1024 — uploaded once per change and re-painted as each image loads; before any image arrives the atlas is a single transparent pixel, and a 0.6s reveal fade-in runs on first paint (instant under reduced motion).
- Camera: perspective projection from cameraFov (clamped 10–120°) and cameraZ (min 1); a fixed reference FOV of 45° at z = 20 defines the px↔world unit conversion used by spacing, wheel, drag and the hit test.

## Scroll engine

- State: target (where the wall wants to be), scroll (where it is), velocity (eased real speed), lean. Wheel adds `deltaY × line/page conversion × 0.01 × unit` to target; drag maps vertical pointer travel × 0.1 × unit onto target from the grab origin (pointer capture; mouse buttons other than left ignored); pageScroll adds page scroll delta × factor; `speed` auto-drifts target continuously. scroll eases toward target frame-rate-independently with `1 − (1 − scrollEase)^(dt × 60)`.
- Frame loop: dt clamped to 50ms; reveal advances; auto-drift applies; scroll/velocity/lean integrate; one draw; then the loop sleeps unless something is still moving (speed on, gap to target > 0.05, lean > 0.0005, reveal < 1, atlas dirty) — it wakes on input, item loads, resize, or when the visibility observer reports the component back on screen.
- Hit testing is a CPU mirror of the GPU layout: on a tap (pointer moved < 6px within 450ms) the poster under the point is computed from the wrapped slot math and `onItemClick(item, index)` fires; taps that moved are drags, not clicks.
- Reduced motion: no auto-drift, no lean, instant reveal; wheel and drag still drive the wall.
- Unmount: cancel frames, remove canvas/window listeners, disconnect resize + visibility observers, delete texture/buffers/VAO/program/shaders. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { image: string })[] | [] | Poster images, center-cropped to the plane aspect and packed into an atlas; repeated across the endless loop. Precise assets are code-embedded. |
| planeWidth | number | 320 | Poster width in world units (min 10). |
| planeHeight | number | 320 | Poster height in world units (min 10). |
| distortion | number | 3 | How much posters twist progressively through the flip, 0–50. |
| scrollEase | number | 0.01 | Ease factor of scroll toward target, 0.001–1; higher snaps faster. |
| cameraFov | number | 45 | Camera field of view, in degrees, 10–120. |
| cameraZ | number | 20 | Camera distance, in world units (min 1). |
| gap | number | 5 world units | Vertical gap between posters in the loop. |
| columns | number | 1 | Number of columns, 1–8. |
| columnGap | number | 40 | Horizontal gap between columns, in world units. |
| alternate | boolean | true | Odd columns scroll the opposite direction. |
| radius | number | 0 | Poster corner radius, in world units. |
| rotation | number | 180 | Total flip angle a poster sweeps through per cycle, in degrees. |
| axis | "vertical" \| "horizontal" \| "diagonal" | "vertical" | Axis the flip rotates around. |
| speed | number | 0 | Auto-drift speed (world units/s; negative drifts the other way). |
| lean | number | 0 | Velocity-driven wall tilt strength, 0–2. |
| fade | number | 0 | Top/bottom edge fade span on screen (0 disables; higher fades earlier), 0–1. |
| shading | number | 0 | How much back-turned posters darken, 0–1. |
| wheel | boolean | true | Lets the wheel drive the wall (always prevented from page-scrolling). |
| drag | boolean | true | Lets vertical dragging drive the wall. |
| pageScroll | number | 0 | Fraction of the page's scroll delta fed into the wall. |
| onItemClick | (item, index: number) => void | - | Called with the hit item and its index on a tap. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of FlyingPosters.jsx and FlyingPosters.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the column loops seamlessly with no seam or missing slot at any scroll offset; posters flip around the chosen axis with progressive (non-rigid) twisting per distortion and darken as they turn away; alternating columns counter-scroll; wheel, drag (with grab/grabbing cursors), page scroll factor and auto speed all drive the same eased target; clicking a poster fires onItemClick with the right item, while a dragged gesture does not; images appear center-cropped as each loads, with a 0.6s reveal fade on first paint; radius, fade and shading shape the look; cameraFov/cameraZ change perspective believably; resize re-covers the screen; reduced motion kills drift/lean and reveals instantly; the frame loop sleeps when settled; unmount leaves no listeners, observers or GPU objects; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
