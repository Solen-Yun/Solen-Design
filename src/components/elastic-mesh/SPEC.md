Implement the "ElasticMesh" component from zero: text or a logo rasterized into a soft puffy volume that behaves like a jelly stress toy — the whole silhouette inflates, hovering dents it, pressing grabs a patch of nodes you can stretch like taffy, a quick click pokes it wobbling, and the letters can each pop in with a staggered bounce. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: ElasticMesh.jsx (entry, content rasterizer, spring solver, shaders) and ElasticMesh.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div` with class elastic-mesh plus an optional extra className and inline style: position relative, filling its parent (width/height 100%), overflow hidden, touch-action pan-y, user-select none; it carries role="img" with aria-label set to the text (or "Elastic logo" for image mode), and rest props spread onto it. Inside is one `<canvas>` (class elastic-mesh-canvas) absolutely filling the root; it is aria-hidden.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, no depth/stencil. If the context or programs fail, the component stays empty without throwing. Canvas pixels = container size × DPR (dpr prop or devicePixelRatio, clamped to 2).
- Two programs share one vertex shader: a surface program and a shadow program. Geometry is a dynamic node mesh: spacing = max(7, sqrt(area / 5200)), nodes active when the shape's signed distance field > −2.5 × spacing; each node carries a 2×2 strain matrix from its neighbour deltas (edge rest spans), a dent scalar and its gradient; quads are emitted within a margin of −(min(w,h) × 0.14 + spacing × 3) around the shape, 16-bit indices unless the node count exceeds 65535.

## Content rasterization

- Content = src image if set, else text. Text: multi-line via "\n", laid out on an offscreen canvas with font `${fontWeight} 100px ${fontFamily}` (document.fonts.load awaited first), auto-fitted to ≤ 80% width / 70% height of the field, drawn white on transparent. Image: loaded with crossOrigin, decoded, fit to 78% × 74% of the field, centred.
- Field resolution: the longest side ≤ 720px. From the alpha mask it computes a precise signed edge distance (separable Euclidean distance transform both inside and outside), then an inflation height field: a multi-level solver — the mask is halved repeatedly to ≥ 48px, each level runs Jacobi-style relaxation (600 total iterations scaled by level, source term 4^level, over-relaxation 1.85, clamped to the mask) and the coarse solution is bilinearly upsampled — then gaussian-blurred (radius 2). The result approximates a puffy inflated balloon height. A slope texture stores clamped gradients (max slope 7), a shadow mask stores a wide blur (radius ≈ 4.5% of the field), and a paint texture stores the original rasterized colours (for image mode, when imageColors is on).
- The binary mask is flood-filled into connected parts (up to 64): each part's centroid, leftmost pixel and size are kept, parts sorted left-to-right get staggered intro delays (gap = min(0.07, 0.5 / (parts − 1)) per rank), and a nearest-label distance transform gives every texel its owning part so per-letter intro works. Content is rebuilt (debounced 160 ms on resize; immediate on first build; on text/src/font changes via a content key) with a build token cancelling stale async work.

## Simulation

- Fixed 480 Hz sub-steps with an accumulator (max 40 sub-steps per frame; frame dt clamped to 0.05 s). Node model: each active node springs to rest with anchor stiffness = 350 × firm² where firm = 0.4 + stiffness × 1.2, coupled to its 8 neighbours (weight 1 orthogonal / 0.5 diagonal) with coupling = anchor × (52 / (sqrt(firm) × spacing))²; damping ratio = 0.5 − wobble × 0.42 (0.8 under reduced-motion). A separate dent field per node (stiffness × 1.4, ratio + 0.06) tracks local squishing, clamped −0.6…0.85.
- Hover: a smoothed hover point follows the window pointer; when it is over the shape's current deformed surface (nearest-node SDF probe), a press power eases in (τ 0.12s in / 0.25s out) that dents nodes Gaussianly around the hover point (σ = grabRadius × 0.32, depth × 1.6 while dragging) and drags them with the hover velocity — the surface gives under the cursor like a fingertip.
- Drag: pointerdown on the surface grabs nodes with Gaussian weight (σ = grabRadius × 0.3, weights ≤ 0.03 dropped); grabbed nodes' targets follow the pointer delta limited by tanh to max(20, min(w,h) × (0.08 + stretch × 0.32)) px — stretch past the limit feels like taut jelly. Release frees everything.
- Poke: a quick click (< 260 ms, < 8 px movement) fires an impulse — dent velocity +9 × (0.4 + press) × Gaussian falloff (σ = grabRadius) plus radial node velocity, making the shape wobble.
- A 3D turn matrix aims the surface: yaw/pitch track the pointer position (±0.35 / ±0.2 rad max) through a slightly stiff spring (k = 28, damping 10), so the blob leans toward the cursor; disabled under reduced-motion.

## Materials & shading

- The surface shader reconstructs normals from the slope texture (bicubic-smoothed), the dent field and the strain matrix (area-corrected via the strain determinant); height = field height × dent-keep × inflate × presence / sqrt(area). A studio environment — sky/ground gradient plus four soft light panels (a 2.2 key up-left, 4.5 and 3.2 rim strips, 2.4 top strip) — is reflected with footprint-based blur, ACES-ish tone mapped.
- material = "balloon": deep tinted body (wrap diffuse), fresnel rim boost and environment reflectance 0.045 + fresnel; "chrome": full environment mirror tinted 60% toward the colour; "jelly": emissive glowing core (base² 0.35 → base × 1.45 + 0.08 toward the facing centre) with faint wrap and fresnel env; "clay": matte body (0.3 + 0.7 wrap) with a wide-blur environment at 12–18% fresnel.
- Colour = color prop (hex or any CSS colour through a fillStyle probe) mixed with the paint texture by paintMix (image + imageColors only). Depth occlusion darkens thin parts. Edge antialiasing uses the SDF's fwidth; alpha also fades with presence.
- Shadow pass: the mesh drawn with a down-right offset (≈ 3.5% of min size × inflate), colour black (dark theme) or rgb(0.08, 0.08, 0.14) (light theme), strength shadow × 0.7 (dark) / × 0.35 (light), reduced under dents.
- Intro (intro prop, skipped under reduced-motion): each part scales up from 0.5× and fades in with a damped arrival spring (ω 15, ζ 0.38) at its staggered delay; the clock advances for 1.8 s then flags settled; presence also gates inflation.
- prefers-reduced-motion skips the intro and tightens damping; the intro can also be bypassed by intro={false}.

## Lifecycle

- The frame loop self-sleeps: it keeps running while the intro plays, the hover power is transitioning, the turn springs move, the pointer is engaged or the mesh's total energy exceeds 5% of its active node count; otherwise it stops and wakes on pointer events, visibility change, viewport re-entry (IntersectionObserver) and resize.
- Resize rebuilds the canvas immediately and re-rasterizes (debounced 160 ms after the first build). Unmount cancels the frame, clears timers, disconnects observers, removes all listeners and deletes all buffers, textures, vertex arrays and programs. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Squish" | The text to inflate; "\n" starts a new line. Ignored when src is set. |
| src | string | "" | Image URL to inflate instead of text (crossOrigin anonymous). |
| fontFamily | string | "system-ui, sans-serif" | Font family used to rasterize the text. |
| fontWeight | number | 900 | Font weight used to rasterize the text. |
| color | string | "#3b5bff" | Base colour of the surface (any CSS colour). |
| imageColors | boolean | true | In image mode, paint the surface with the image's own colours. |
| material | "balloon" \| "chrome" \| "jelly" \| "clay" | "balloon" | Surface material look. |
| inflate | number | 1 | How puffy the shape is, 0.1–3. |
| stiffness | number | 0.5 | Restoring firmness of the jelly, 0–1. |
| wobble | number | 0.6 | Damping looseness — high values jiggle longer, 0–1. |
| grabRadius | number | 70 | Falloff radius of grabs, dents and pokes in px, 10–400. |
| stretch | number | 0.5 | How far a drag can stretch before tautness resists, 0–1. |
| press | number | 0.5 | Depth of hover dents and click pokes, 0–1. |
| shadow | number | 0.5 | Drop shadow strength, 0–1. |
| intro | boolean | true | Letters/parts pop in with staggered springs on mount. |
| theme | "dark" \| "light" | "dark" | Shadow colour and studio-light balance. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of ElasticMesh.jsx and ElasticMesh.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: text and logo modes both inflate with believable puffy volume; hover dents locally and follows the cursor; press-and-drag stretches the grabbed patch until taut then releases with wobble; a quick click pokes a ripple; multi-line text and per-letter intro stagger left to right; balloon / chrome / jelly / clay read distinctly; color and imageColors tint correctly; inflate, stiffness, wobble, grabRadius, stretch and press each have visible effect; theme light flips shadows and studio lighting; resize re-fits and re-rasterizes; prefers-reduced-motion skips the intro; WebGL missing leaves the container intact with no errors; unmount leaves no frame loop, listeners, observers or GL objects; 375 / 768 / 1440 wide without overflow.
