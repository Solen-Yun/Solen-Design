Implement the "DepthText" component from zero: a headline rendered as a stack of dozens of extruded copies forming a 3D slab of text — the face plane tilts toward the pointer (or orbits gently on its own), the extrusion sinks away when you hover (more when you press), the whole block can idle-float, and an intro grows the depth out of the face over 1.2 seconds. Solid mode mixes the face colour into a depth colour layer by layer; gradient mode fades the layers into the background; an outline mode strokes the layers instead of filling them. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files: DepthText.jsx (entry, colour/transform math, rAF loop) and DepthText.css (layout and typography). React >= 18, no runtime dependencies, no iframe.
- Root is a `<span>` with class depth-text (plus depth-text--outline and className): display inline-block, perspective from the --depth-text-perspective variable, perspective-origin 50% 48%, isolation isolate. All options are injected as CSS variables on the root: perspective, font-size (the `fontSize` prop, any CSS length), font-weight, face colour, and two shadow recipes — the back layer's drop shadow (0 0.18em 0.32em of depth colour at 24% over 42% black, disabled in gradient mode or when shadow is off) and the face's contact shadow (0 0.035em 0.07em at 28% black).
- The stage span is an inline-grid with all children in the same cell (place-items center, preserve-3d, will-change transform) receiving the animated transform. It holds `layers` copies of the text (aria-hidden, absolutely stacked behind, pointer-events none) and one visible face span on top (translateZ 0.6px, face colour). Typography is shared: line-height 0.86, letter-spacing −0.065em, white-space nowrap, user-select none, font-kerning normal, text-rendering geometricPrecision, backface-visibility hidden.
- Each layer k (1..layers) translates by −k × depth × grow px along Z, where grow is the intro/sink factor driven through the --depth-text-grow variable — so one variable scales the entire extrusion. The deepest layer carries the drop shadow.
- Layer colours, solid mode: progress = k / layers eased quadratically; each layer mixes faceColor into depthColor at faceMix = (1 − eased) × 72 + 4 percent, then darkens the whole mix 8% toward black — the near layers read as the face, the deep layers as the depth colour.
- Gradient mode: each layer's alpha follows reach(k) = (clamp(1 − (k − 0.5)/layers))^1.6, alpha computed so successive layers fade into transparency (outline mode instead strokes at the same reach); the layers dissolve into the background instead of piling to an opaque depth colour. Outline mode (independent switch) renders layers with transparent fill and a text stroke of max(1px, 0.012em) in currentColor.

## Motion engine

- A rAF loop integrates everything, with deltas clamped to 50ms. Base rotation from tilt: x = −tilt × 0.32, y = tilt × 0.42 degrees.
- Pointer tracking (pointerTracking, fine-pointer devices only, disabled under reduced motion): window pointermove maps the cursor's offset from the centre (normalized over 0.8 × width/height, clamped ±1) to target.x = base.x − ny × tilt and target.y = base.y + nx × tilt; leaving the window (pointerout with no related target, or window blur) returns the target to base. The current rotation eases toward the target by `smoothing` per frame (0.02–0.35).
- Auto orbit (autoOrbit, when no active pointer): target drifts on sin/cos Lissajous curves — sin(orbit) / cos(orbit × 0.85) scaled by tilt × 0.18 with pointer capability or tilt × 0.55 without — at orbitSpeed revolutions per second, so the slab always breathes even without input.
- Hover push (hoverPush 0–1, mouse/pen, disabled under reduced motion): hovering sets a spring goal of min(1, hoverPush), pressing adds 0.25; a spring (stiffness 260, damping 17, sub-stepped at 1/120s) drives a sink of up to the full extrusion extent along −Z via the grow variable (clamped −0.25..1 so it can never pop forward), settling to the goal and snapping when idle. The spring also multiplies the intro grow, so push and intro compose.
- Float (float): when not hovered or pressed, a float value eases to 1 (exponential, 0.7s time constant) and the stage adds an idle bob — x ± 2°, y ± 4°, a translateY of 4.5% of the root height and a ±1.6° roll, all on independent sin frequencies; hover/press eases it back to 0. Amplitude tracks the root height via a ResizeObserver.
- Intro (intro): a progress value runs 0 → 1 over 1200ms, and grow = 1 − (1 − progress)³ (cubic ease-out) scales every layer's translateZ from collapsed to full depth; the stage's inline --depth-text-grow starts at 0 until intro completes so there is no flash.
- Frame loop self-sleep: with autoOrbit off, no float, rotation within 0.001° of target, the push spring idle and intro finished, the loop stops; any pointer event, hover change or visibility change restarts it. An IntersectionObserver stops the loop entirely while scrolled out and restarts on return.
- Reduced motion: no loop, no listeners, intro completed instantly, push/float zeroed, rotation fixed at base — the slab renders its full extrusion statically. CSS also drops will-change.
- Unmount: cancel the frame, disconnect both observers, remove all window and root listeners.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Elevate" | The text every layer repeats. |
| layers | number | 34 | Copies in the extrusion, 2–64. |
| depth | number | 2.4 | Z spacing between layers, in px, 0–12. |
| faceColor | string | "currentColor" | Colour of the front face. |
| depthColor | string | "#7c3aed" | Colour the extrusion mixes toward (solid) or fades into (gradient). |
| gradientDepth | boolean | false | Fade layers into transparency instead of solid mixing. |
| tilt | number | 7.5 | Base tilt amplitude in degrees, 0–12. |
| pointerTracking | boolean | true | The slab turns toward the pointer. |
| smoothing | number | 0.14 | Rotation ease rate per frame, 0.02–0.35. |
| perspective | number | 900 | CSS perspective of the root, in px, 300–2000. |
| autoOrbit | boolean | true | Idle Lissajous drift of the rotation. |
| orbitSpeed | number | 0.35 | Orbit revolutions per second, 0–2. |
| hoverPush | number | 0 | How far hovering sinks the extrusion, 0–1; pressing adds a quarter. |
| float | boolean | false | Idle bobbing when not hovered. |
| fontSize | string | "clamp(3rem, 12vw, 7rem)" | Font size of every layer, any CSS length. |
| fontWeight | number | 900 | Font weight of every layer. |
| shadow | boolean | true | Drop shadow on the deepest layer and contact shadow on the face. |
| outline | boolean | false | Stroke the layers instead of filling them. |
| intro | boolean | true | Grow the depth out of the face over 1.2s on mount. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | {} | Inline style overrides for the root. |

## Delivery & validation

- Deliver the complete content of DepthText.jsx and DepthText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the extrusion reads as solid depth with the face mixing into depthColor layer by layer; gradient mode dissolves layers without banding; outline mode strokes cleanly; pointer tracking turns the slab with the configured tilt and smoothing and returns on leave; auto-orbit drifts when idle and yields to the pointer; hover push sinks the extrusion smoothly, deeper while pressed, and springs back; float bobs without fighting hover; the intro grows once and never flashes; shadows land on the deepest layer and face, and vanish with shadow off or gradient on; reduced motion renders a static full-depth slab; scroll-out stops the loop and return restarts it; resize re-measures the float amplitude; unmount leaves no loop, observers or listeners; face text stays selectable-by-screen-reader while layers are aria-hidden; 375 / 768 / 1440 wide without overflow (fontSize clamp keeps it fluid).
