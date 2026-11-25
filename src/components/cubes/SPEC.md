Implement the "Cubes" component from zero: a grid of outlined 3D cubes standing on an invisible plane — each cube turns to face the cursor as it passes, fast sweeps brush a spin through the ranks, clicking drops a ripple that rolls outward with a colour flash, and idle periods hand control back to a wandering ghost cursor. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Cubes.jsx (entry, cursor/ripple simulation, shaders) and Cubes.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div` with class cubes-container plus an optional extra className; rest props spread onto it. It is position relative, fills its parent (width/height 100%), overflow hidden, touch-action pan-y. Inside is one `<canvas>` (class cubes-canvas), absolutely filling the root; it is aria-hidden.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias true, depth true, no stencil. If the context or program fails, the component renders nothing without throwing. Canvas pixels = container size × DPR (dpr prop or devicePixelRatio, clamped to 2).
- One program, instanced drawing. Geometry is a single unit cube built from 6 faces (each a quad with UV 0–1, per-face normals), 36 indices. Per-instance attributes: grid cell centre (vec2), rotation quaternion (vec4), state (vec2 = flash strength, grow scale). One drawElementsInstanced call per pass over gridSize × gridSize instances.
- World scale: view.scale = min(viewport w, h) / (gridSize + 0.9), so the grid always fits with a margin regardless of aspect. Projection is orthographic when perspective ≤ 0.001, else a perspective camera with fov = 8 + perspective × 52 degrees looking at the grid centre.
- Vertex shader rotates the unit cube (scaled to 1 − gap) by the instance quaternion around its cell centre; fragment shader draws the outlined look: face colour mixed toward the edge colour on side faces (shading), edges computed analytically from the UV derivatives (fwidth) so line width is uniform in pixels (edgeWidth × DPR).

## Edge styles

- edgeStyle picks how each edge line is drawn along its length: "solid" a continuous line; "dashed" the line is masked by a repeating pattern — mark count = cube pixel size / spacing (spacing = max(6, edgeWidth × 6)); "dotted" the edge collapses into round dots (spacing = max(4, edgeWidth × 4), dot radius ≈ 0.9 × edge width); "none" draws no edge lines, faces only.
- Edge cover fades out where the face is near-parallel to the viewer (smoothstep 0.06–0.28 of |normal.z|) so lines appear on the silhouette-adjacent faces and vanish head-on; a face whose normal points away is culled.
- Face shading: side faces darken by mixing face colour toward the edge colour proportionally to (1 − normal.z) × a light-direction factor × shading; the flash value mixes both face and edge toward the ripple colour.
- Alpha: faces render at faceOpacity, edges at 1, premultiplied output. At full opacity only back faces are culled; below that the mesh is drawn twice (front + back faces, depth write off) so translucency stacks correctly.

## Motion & interaction

- Cursor: the window pointer maps to world coords; a virtual cursor follows it with exponential smoothing (rate 18/s) and a velocity estimate (blend 10/s); a weight eases in at 6/s while engaged and out at 2.5/s. Each cube computes a quartic bump falloff ((1 − t²)², t = distance/radius) from the cursor; inside it, the cube's target rotation turns it toward the cursor, tilt capped at maxAngle degrees and softened by distance (tilt × distance/hypot(distance, 0.8)).
- Rotation dynamics: every cube integrates a 2-axis angular spring per frame — stiffness 160 × speed², damping ratio 1 − 0.82 × bounce — so cubes rotate toward the cursor pose and spring back with bounce-controlled overshoot.
- Sweep: cursor velocity perpendicular to its motion direction kicks angular velocity into cubes under the falloff, strength = min(speed, 40) × brush × 1.6 — a fast flick visibly combs a spin across the grid.
- Click ripple (rippleOnClick, pointerdown, skipped under reduced-motion): a ring is born at the click point (at most 6 live rings); it expands at 8 × rippleSpeed units/s until past the grid reach, kicking each cube it crosses tangentially with strength exp(−reach / (gridSize × 0.8)) and setting that cube's flash — the flash both tints the cube toward the ripple colour and fades with exp(−3.2 × dt).
- Auto-animate: when the pointer has been idle more than 3 s or is outside, a ghost cursor wanders the grid — its goal traces sin/cos Lissajous paths (rates 0.37/0.11 and 0.53 rad/s) with reach gridSize × 0.42, so the field stays alive on its own; autoAnimate=false disables the ghost.
- Intro (intro prop, skipped under reduced-motion): each cube scales in with an ease-out cubic over 1.1 s while un-rotating from a 90° tumble about the x axis; the delay is the cube's normalised radial distance from the grid centre × 0.55 s, so the wave opens from the middle outward.
- paused freezes the simulation but keeps redrawing (resize still re-renders); prefers-reduced-motion snaps cubes straight to their targets without springs, disables the sweep, ripple, intro and ghost cursor.

## Lifecycle

- Frame loop self-sleeps: it keeps running only while cubes move, rings live, the ghost cursor is engaged or the cursor weight is transitioning; otherwise it stops and wakes on pointer events, visibility change, viewport re-entry (IntersectionObserver) and resize. Hidden tabs and offscreen containers stop the loop entirely.
- ResizeObserver re-fits the canvas and view scale; changing gridSize or dpr reallocates/re-renders through the same path. Unmount cancels the frame, disconnects observers, removes all window/document listeners and deletes the buffers, vertex array and program. Same-page instances are fully independent.
- Colour parsing accepts any CSS colour through a fillStyle probe with a cache; unparsable input falls back to white.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| gridSize | number | 10 | Cubes per side of the square grid, rounded, 1–40. |
| gap | number | 0.18 | Spacing between cubes as a fraction of a cell, 0–0.9. |
| faceColor | string | "#120F17" | Cube face colour. |
| edgeColor | string | "#ffffff" | Cube edge colour. |
| edgeWidth | number | 1 | Edge line width in px. |
| edgeStyle | "solid" \| "dashed" \| "dotted" \| "none" | "solid" | Edge line pattern. |
| faceOpacity | number | 1 | Face transparency, 0–1; edges stay opaque. |
| shading | number | 0.6 | How much side faces darken toward the edge colour. |
| maxAngle | number | 45 | Max turn toward the cursor, in degrees. |
| radius | number | 3 | Radius of the cursor's influence in grid cells, ≥ 0.5. |
| speed | number | 1 | Spring responsiveness of the turns, ≥ 0.05. |
| bounce | number | 0.4 | Overshoot of the turning spring, 0–1. |
| brush | number | 1 | How hard a fast cursor sweep spins the cubes. |
| perspective | number | 0 | Perspective amount 0–1; 0 keeps an orthographic view. |
| autoAnimate | boolean | true | Ghost cursor keeps the grid alive when the pointer is idle. |
| rippleOnClick | boolean | true | Clicking spawns an expanding ripple. |
| rippleColor | string | "#ffffff" | Colour of the ripple flash. |
| rippleSpeed | number | 1 | Ripple expansion speed, ≥ 0.05. |
| intro | boolean | true | Cubes grow and un-tumble in a wave from the centre on mount. |
| paused | boolean | false | Freezes the simulation without tearing it down. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of Cubes.jsx and Cubes.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: cubes turn toward the cursor and spring back with bounce; a fast sweep combs visible spin across the ranks; clicking spawns a colour-flashed ripple that rolls outward and fades; solid / dashed / dotted / none edges all read correctly at 1–4 px widths; faceOpacity below 1 stacks translucency without depth artifacts; gridSize 1–40 stays fitted to any aspect ratio; auto-animate engages after 3 s idle and hands back instantly to the pointer; intro waves out from the centre; paused halts motion while resizing still redraws; prefers-reduced-motion snaps without springs and skips ripple/intro; WebGL missing leaves an empty container with no errors; unmount leaves no frame loop, observers or listeners; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
