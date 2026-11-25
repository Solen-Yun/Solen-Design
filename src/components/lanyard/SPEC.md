Implement the "Lanyard" component from zero: a 3D ID badge hanging from a woven fabric strap that swings, stretches, twists and reacts to the cursor — drag it around, throw it, or click it to flip 180°. The card is a beveled extrusion with a punched slot hole and a metal ring; the strap is a real-time ribbon mesh simulated as a mass-spring rope coupled to the badge's rigid body. Pure React + CSS + three.js in two files: Lanyard.jsx (entry, scene, rope solver, shaders) and Lanyard.css (a wrapper and the canvas). The only dependency is three; the badge artwork, strap pattern, grain and weave textures are all generated in code — no external assets.

## Scene & materials

- Root is a `<div>` (class `lanyard` plus className) with position relative, width/height 100%, overflow hidden; a WebGLRenderer (antialias, alpha, transparent clear, sRGB output, neutral tone mapping, pixel ratio min(devicePixelRatio, 2)) appends a canvas (class `lanyard-canvas`, aria-hidden, block 100%). If renderer creation throws, the component renders nothing without errors.
- Camera is a 24° FOV perspective that self-frames: view height = card height / size (size clamped 0.15–0.9), widened until at least card width / 0.72 is visible for the container aspect; the anchor point (left 27% / center 50% / right 73% of the view width) sits near the top edge where the strap is pinned.
- Lighting: a procedurally built PMREM environment — eight grey planes around the origin at intensities 0.5–6, including a big top key, two side strips, a wide floor bounce and a back panel — plus a white key light (intensity 1.6, upper left) and a faint fill (0.35, lower right).
- Badge geometry: a rounded-rect Shape (portrait 1.6 × 2.25, landscape 2.25 × 1.6; radius mixes 0.03 → 20% of the short side with cornerRadius 0–1) extruded to thickness 0.018 with a 0.007 bevel, minus a rounded slot hole (0.34 × 0.07, 0.13 below the top edge); a metal torus ring (radius 0.095, tube 0.0135) sits through the slot. The front/back faces are flat Shape geometries with UVs remapped 0–1 across the card; their textures are 1024-wide canvases painted with cardColor (parsed via a 2D canvas context, accepting hex/rgb/rgba; unparsable falls back to white) and the frontImage/backImage fitted cover or contain; when backImage is missing the front image is reused mirrored on the back. Edges use a material tinted 0.92× the card colour.
- Finishes map to MeshPhysicalMaterial parameters: glossy (roughness 0.42, clearcoat 1), matte (roughness 0.85, no clearcoat), holographic (glossy + foil 1), metallic (metalness 0.75, anisotropy 0.7). A subtle procedural grain normal map (128² seeded noise, smoothed into slopes, repeat 5×7) roughens the faces at scale 0.06.
- Holographic foil: the front/back materials inject a shader patch that draws an iridescent diffraction rainbow — a Voronoi shard field perturbs a grating angle, two spectrum bumps per order build the rainbow, fine glitter flakes glint at power 28, and the foil is masked by the artwork's ink luminance so dark print stays dark. Metal trim: silver #d9dce2 / gold #e4b965 / graphite #4d4f55 with matching roughness.

## Strap & physics

- The rope is 5 nodes / 4 segments between the pinned anchor and the badge's hang point (slot centre below the ring). Each node carries a velocity; a step integrates gravity (40 × gravity prop, clamped 0–3), sinusoidal breeze wind on x/z (two summed sines per axis × breeze), exponential node drag and air resistance, then runs 2 constraint iterations per sub-step (sub-steps ≤ 1/960s). Segment constraints only pull (never push) and cap their impulse by a tension budget: hold·tanh(stiffness·stretch / hold) + spring·stretch + damping of the stretch rate, where elasticity (0–1) morphs the mix from damped-rope to bungee.
- The last segment ends at the badge, treated as a rigid body: mass 1, box-derived inverse inertia; constraint impulses are applied at the hang offset (linear push + torque through the inverse inertia), so the card pivots realistically when the rope yanks it. Angular velocity is recovered from the quaternion delta each step; a generalised air drag splits velocity into face-normal and in-plane parts with different resistance; linear speed clamps at 60 and spin at 40 rad/s.
- Twist: the card's facing angle around its own up axis is tracked; free of a grab, a spring (rate 30, damping 3) pulls twist toward the flip target (0 or π). Clicking the card quickly (<450ms, <6px movement) toggles that target and adds an instantaneous spin of 9 rad/s around local up — a full 180° flip whose direction follows the current turn or which side of the card you clicked.
- Drag: pointerdown raycasts against the badge meshes and grabs the exact hit point (stored in body-local space plus the ray distance); pointermove re-projects the ray at that distance as the grab target; a position constraint (solved per iteration, interpolated across sub-steps) pulls the body to the pointer, and a rotational grip spring (rate 40, damping 6) keeps the card oriented as you fling it. Cursor is grab/grabbing; touch uses the same path with touch-action pan-y and preventDefault only when the ray hits the card.
- Strap mesh: a 72-sample ribbon rebuilt every frame along a centripetal Catmull-Rom curve through the rope nodes plus two computed points ("mouth" then "tuck") that squeeze the band into the metal clamp (a beveled rounded-rect extrusion, 1.16× strap width, with an eyelet torus) at the rope's end. Four columns per sample shape the ribbon across its width; the side vector is camera-facing, flip-corrected against the previous sample, so the band always billboards its width. Width narrows slightly when stretched (∝ length^-0.35), UV v repeats follow rest length ÷ (width × tile ratio), and the badge's twist angle is wound into the band with a powered falloff so the fabric visibly twists from the card up.
- Strap texture: a canvas (192px across) painted strapColor; a strapImage is drawn rotated 90° across the band; without an image, faint horizontal stripes plus two darker edge stitch lines are drawn, with ink chosen by the strap colour's luminance. A procedural weave normal map (128², 8 threads, alternating warp/weft lift with a cosine profile plus fibre noise) gives the fabric its ribbed look; the material adds sheen (grey, roughness 0.42) and is double-sided.
- Framing is recomputed when orientation, cornerRadius, size, anchor, strapLength or the container size changes: strapLength (0–1) mixes the pin from 12% to 42% of the view height above the card top, and the rope rest length follows. Strap width multiplies a 0.36 base by strapWidth (clamped 0.4–2) and rebuilds the clamp geometry when it changes.
- Props re-apply every render through a keyed diff (layout, framing, images, face paint, strap colour, strap scale) so nothing rebuilds unless a value actually changed; image URLs load through a cached promise loader (crossOrigin anonymous, failures resolve null) with a token guard against races.
- Loop self-sleep: the rAF loop stops when kinetic energy (linear + angular + rope) stays below 2e-4 for 1.2s with no grab and breeze 0; it wakes on pointer input, resize, visibility change, scroll into view (IntersectionObserver), texture repaints and prop changes. A non-finite state (NaN) resets the rope to hanging. Reduced motion zeroes breeze and skips the intro swing (initial placement is straight down instead of stepped sideways).
- Unmount: cancels the frame, disconnects both observers, removes all canvas listeners, disposes geometries, materials, textures, environment and renderer, and removes the canvas.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| frontImage | string | - | Image URL painted on the badge front, fitted over the card colour. |
| backImage | string | - | Image for the back; falls back to the front image. |
| imageFit | "cover" \| "contain" | "cover" | How the images fill the badge face. |
| cardColor | string | "#ffffff" | Badge base colour (any CSS colour; drives edges and contrast). |
| orientation | "portrait" \| "landscape" | "portrait" | Badge proportions. |
| finish | "glossy" \| "matte" \| "holographic" \| "metallic" | "glossy" | Surface material; holographic adds an iridescent foil. |
| cornerRadius | number | 0.3 | Badge corner rounding, 0–1. |
| size | number | 0.6 | How much of the stage the badge occupies, 0.15–0.9. |
| anchor | "left" \| "center" \| "right" | "center" | Horizontal pin point of the strap. |
| strapLength | number | 0.5 | Rope length above the card, 0–1. |
| strapImage | string | - | Image printed across the strap (rotated to run along it). |
| strapColor | string | "#111111" | Strap base colour; without an image, stitches are auto-contrasted. |
| strapWidth | number | 0.65 | Strap width multiplier, 0.4–2. |
| metal | "silver" \| "gold" \| "graphite" | "silver" | Ring and clamp finish. |
| gravity | number | 1 | Gravity scale, 0–3. |
| damping | number | 0.5 | How quickly everything settles, 0–1. |
| elasticity | number | 0.5 | Rope stretchiness, 0–1; 1 turns the strap into a bungee. |
| breeze | number | 0.5 | Idle wind sway, 0–1. |
| interactive | boolean | true | Enables dragging, throwing and click-to-flip. |
| intro | boolean | true | Drops the card in with a sideways swing on mount. |
| className | string | "" | Extra class names for the wrapper. |
| style | CSSProperties | - | Inline styles for the wrapper. |

## Delivery & validation

- Deliver the complete content of Lanyard.jsx and Lanyard.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the badge hangs still and swings naturally; dragging moves the attach point and the rope stretches then springs back; a hard throw slings the card and it settles; a quick click flips the card 180° and the strap twists with it; strapLength, size and anchor reframe without clipping; orientation, cornerRadius, cardColor, imageFit, frontImage/backImage, strapImage, strapColor, strapWidth, metal and finish all apply live; elasticity 0 vs 1 changes bungee behaviour visibly; breeze 0 lets it fully sleep (no continuous rAF), reduced motion removes wind and intro; interactive false disables all pointer input; container resizes keep the badge framed; WebGL failure renders empty without throwing; unmount leaves no listeners, observers, frame loop or GPU resources; works at 375 / 768 / 1440 wide.
