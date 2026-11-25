Implement the "PaperCrumple" component from zero: a framed image you press and hold with a pointer or the keyboard, and while you hold, it physically crumples into a textured 3D sheet of folds; you can drag the crumpled sheet around with velocity tilt, and on release it either springs back flat, keeps a creased memory of the fold, or stays crumpled. Rendering is WebGL via a 3D engine dependency (three), simulation is a precomputed Verlet fold path; it must not depend on external pages, videos or off-the-shelf effect components. The image itself is the only external asset (CORS-enabled URL); pixel-perfect artwork is defined by the caller's image, not this spec.

## Structure & rendering

- Two files: PaperCrumple.jsx (entry, fold-path solver, scene, interaction) and PaperCrumple.css (layout, fallback, hit target). Runtime dependency: three (WebGL renderer, materials, math). React >= 18.
- Root is a `<div class="paper-crumple">` (plus caller className), position relative, width 100%, height = sceneHeight px (inline style), overflow hidden, isolated stacking. Inline CSS variables `--pc-image-width/--pc-image-height` track the paper's fitted on-screen size.
- Children: a full-bleed WebGL `<canvas class="paper-crumple-canvas">` (absolute, pointer-events none, visible only when status is ready, optionally carrying a CSS drop-shadow filter matching shadowOpacity); while not ready, a plain `<img class="paper-crumple-fallback">` showing src, absolutely centered with translate(-50%,-50%) and the rotation prop applied, object-fit from imageFit, sized by the CSS variables; a transparent `<button class="paper-crumple-hit">` covering the projected sheet bounds (repositioned every frame from the 3D bounding box projected to screen space, min 24px), which is the actual focusable, pointer- and keyboard-enabled element (aria-label explains hold-to-crumple + keyboard recipe, aria-pressed reflects holding, cursor grab/grabbing, touch-action none); a 4px focus dot rendered under the hit target's focus-visible state (the button's own outline is suppressed); and a visually hidden `role="status"` span announcing "Loading interactive paper." / "Interactive paper unavailable. Showing the original image."
- States: status "loading" → "ready" after textures load, or "error" when WebGL is unavailable, the image fails to load, src is missing, or the WebGL context is lost (the context-lost path disables the hit target and keeps the plain image). onStateChange receives interaction states "flat" | "holding" | "crumpled" | "creased"; onError receives the Error.

## Fold-path solver (precomputed once per configuration)

- The paper is a grid mesh: resolution = clamp(detail/4, 8, 24); columns/rows derived from the paper aspect (height/width); interior vertices are jittered (±0.25 of a cell) and each quad's diagonal is flipped randomly (seeded PRNG from seed, a deterministic mulberry-style generator), so folds never look mechanical.
- Edges store rest lengths; interior edges become hinges whose rest length is scaled by a "weakness" weight: foldCount random directional guides (angle, phase, weight 0.4–1.0) evaluate exp(-d²·80)·weight on |sin(4·proj + phase)| of the edge midpoint, so creases cluster along wavy guide lines. Hinge stiffness scales with foldSharpness (0.45·(1 − 0.4·sharpness)).
- The solver relaxes the vertex cloud with Verlet-style damping (0.55) for 64 frames × 3 steps: a smoothstep compression eases an elliptical bounding radius from the sheet's full radius down to shortSide·(0.19 − wrinkleDepth·0.025), a sinusoidal buckle impulse per guide peaks mid-fold, then 18 constraint passes per frame (hinges 0.45 stiffness alternating direction, hard edge constraints, radius push) with two layer-separation sweeps that push vertices off the fold plane by the sheet thickness (shortSide·0.008) using barycentric containment and previous-frame side memory. Hinge rest lengths shrink to 86% of measured length when slack. A sample (Float32Array of positions) is captured every frame → 65 samples total.
- A crease-memory snapshot: the solver then relaxes back toward flat over 80 easing steps (12 constraint passes each) and stores the resulting partially-folded shape as `creased`. The path result (samples + creased) is cached per key of [width, height, resolution, foldCount, foldSharpness, wrinkleDepth, seed].

## Scene & materials

- Perspective camera fov 35, positioned by viewport height; sheet scaled so the paper fits the root with a 48px margin (min scale 1 clamp). Renderer: alpha true, antialias true, powerPreference low-power, clear transparent, sRGB output, pixel ratio ≤ 2, PCFSoft shadows.
- Geometry: non-indexed triangle soup with per-render-vertex positions/normals/uvs; positions are interpolated between the two neighbouring fold samples by the crumple amount, plus a creased-memory offset `creased − original` scaled by the memory spring and (1 − fold). Normals are recomputed per deform: face normals from the triangle cross product, then vertex normals blended from incident faces weighted by smoothstep(dot, 0.88 − (1−sharpness)·0.18, 0.98), giving crisp ridges on sharp settings.
- Materials: MeshStandardMaterial front side (texture = src) and back side (texture = backSrc, or the front texture, or flat paperColor when no texture); roughness prop, metalness 0, a generated 128×128 grayscale grain DataTexture (RepeatWrapping, 5×5·aspect tiles) as bumpMap scaled by paperTexture·0.32, alphaTest 0.04 with alpha-to-coverage. An injected shader patch (onBeforeCompile) discards UVs outside [0,1] and mixes outgoing light toward the flat diffuse by a `paperLighting` uniform that rises with fold+memory (smoothstep over 0–0.4), so the deepest creases shade themselves. A matching depth material keeps shadows consistent.
- Lights: hemisphere (white/cool grey, 1.35) plus a directional warm light of intensity lightIntensity at angle lightAngle (deg, placed in a plane around the scene at 4× reach) casting a 1024² soft shadow onto a shadow-only floor plane (ShadowMaterial, opacity shadowOpacity) positioned just behind the sheet's lowest point. shadow=false removes the floor, cast/receive flags and the shadow map.

## Interaction & motion

- Six critically-damped-ish springs (exponential integrator: omega = 8/duration, settle at Δvalue < 1e-4 and |velocity| < 1e-3): amount (crumple), memory (crease), posX, posY, tiltX, tiltY. Amount/memory use crumpleDuration (0.55s) while held and releaseDuration (0.4s) on release; the rest use 0.42s.
- Press: a raycast against the sheet finds the hit face; its three vertices and barycentric weights become the grip anchor. Holding sets amount.target = crumpleAmount (clamped 0–1), publishes "holding", sets aria-pressed. Dragging (draggable) raycasts the pointer against the anchor's camera-facing plane each frame and drives posX/posY directly (velocity zeroed so it tracks the hand); pointer speed (px/s, 1800 = full) tilts the sheet up to dragRotation degrees (0–60), clamped to dragRadius px from centre (further clamped to the viewport). Release: releaseBehavior "restore" → amount 0, memory 0; "creased" → memory.target = max(current, peak × creaseStrength); "stay" → hold the reached crumple. If returnToOrigin, position returns home; otherwise the sheet coasts along its release velocity (0.06s worth when the pointer moved within the last 90ms) clamped to dragRadius and viewport margins. Peak crumple reached during the hold is remembered for the creased behaviour.
- Keyboard: Space/Enter presses (no repeat) hold the crumple instantly, arrows move the sheet by 12px (30 with Shift, clamped to dragRadius/viewport thirds), keyup releases instantly, Escape resets to flat, blur cancels. Window blur cancels; document visibilitychange cancels while hidden.
- Frame loop self-sleep: it keeps requesting frames only while any spring is unsettled or the sheet is held; otherwise it stops and wakes on input/resize. ResizeObserver re-fits scale, camera, light frustum and clamps position; IntersectionObserver pauses and cancels when off-screen; prefers-reduced-motion (listened to live) makes springs settle instantly and disables tilt.
- Unmount: cancel the frame, release pointer capture, disconnect both observers, remove every listener, dispose geometry, materials, grain, textures, light shadow, renderer. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | (required) | Image printed on the sheet; must be CORS-loadable. Missing or failing src falls back to a plain image with onError. |
| alt | string | "Crumplable image" | Alt text for the fallback image and the base of the hit target's aria-label. |
| backSrc | string | "" | Optional image for the sheet's back face; empty shows paperColour. |
| width | number | 320 | Untransformed paper width, px. |
| height | number | 400 | Untransformed paper height, px. |
| sceneHeight | number | 560 | Root element height, px. |
| imageFit | "cover" \| "contain" | "cover" | How the image maps onto the paper. |
| releaseBehavior | "restore" \| "creased" \| "stay" | "restore" | What happens on release: flatten, keep a creased memory, or stay crumpled. |
| crumpleAmount | number | 0.85 | How far the sheet crumples while held, 0–1 into the precomputed fold path. |
| crumpleDuration | number | 0.55 | Seconds the crumple spring takes while held. |
| releaseDuration | number | 0.4 | Seconds the release springs take. |
| foldCount | number | 6 | Number of fold guides, clamped 3–16. |
| foldSharpness | number | 0.6 | Ridge crispness, 0–1; drives hinge stiffness and normal blending. |
| wrinkleDepth | number | 0.65 | How tightly the sheet compresses, 0–2. |
| creaseStrength | number | 0.18 | How much of the peak fold the creased release keeps, 0–1. |
| paperColor | string | "#f4f0e8" | Back-face colour when no backSrc. |
| roughness | number | 0.92 | Material roughness, 0–1. |
| paperTexture | number | 0.08 | Grain bump strength, 0–1. |
| lightIntensity | number | 1.8 | Directional light intensity. |
| lightAngle | number | -35 | Light azimuth in degrees. |
| shadow | boolean | true | Renders the soft drop shadow. |
| shadowOpacity | number | 0.08 | Shadow strength, 0–1. |
| draggable | boolean | true | Allows dragging the held sheet. |
| dragRotation | number | 10 | Max velocity tilt in degrees, clamped 0–60. |
| dragRadius | number | 180 | How far the sheet may travel from centre, px. |
| returnToOrigin | boolean | true | Snaps the sheet home on release instead of coasting. |
| rotation | number | 0 | Constant paper rotation in degrees. |
| seed | number | 7 | Deterministic seed for jitter, diagonal flips and fold guides. |
| detail | number | 64 | Mesh resolution; internally clamped to 32–96 via detail/4 → 8–24. |
| disabled | boolean | false | Disables the hit target and cancels any hold. |
| resetKey | number | 0 | Bump to reset the sheet to flat. |
| onStateChange | (state: "flat" \| "holding" \| "crumpled" \| "creased") => void | - | Interaction state callback. |
| onError | (error: Error) => void | - | Load/WebGL failure callback. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of PaperCrumple.jsx and PaperCrumple.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: with a CORS-enabled image the sheet renders and pressing/holding crumples it smoothly along the fold path; dragging carries it with velocity tilt inside dragRadius; release restore flattens fully, creased keeps visible memory proportional to creaseStrength, stay keeps the reached crumple; returnToOrigin snaps home otherwise it coasts; keyboard hold/move/escape works end to end and focus stays visible via the focus dot; the fallback plain image shows during loading and after a WebGL failure, and onError fires in each failure case; the same seed reproduces the same folds, different seeds differ; changing foldCount/foldSharpness/wrinkleDepth/detail visibly changes the fold character; shadow on/off and shadowOpacity scale; reduced motion settles instantly without tilt; rapid hold/release cycles, window blur, tab hide, off-screen scroll and unmount leave no loops, listeners or GPU resources behind; the component resizes with its container without clipping (375 / 768 / 1440 wide).
