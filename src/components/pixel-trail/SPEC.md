Implement the "PixelTrail" component from zero: glossy pixels that melt into a fluid goo trail behind the cursor. A grid of cells lights up along the pointer's path; with the goo filter on, neighbouring cells fuse into one blobby liquid mass with gradient-derived bevels and specular highlights, colors shift from a fresh trail hue to the body hue as cells age, and the mass can drip and flow. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: PixelTrail.jsx (entry, trail painter, shaders) and PixelTrail.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="pixel-canvas">` (plus any className) with inline styles position relative, width 100%, height 100%, overflow hidden, pointerEvents none — it fills its host box (the class carries position absolute / z-index 1 as a fallback for plain-CSS usage, the inline styles win at runtime). Inside, one full-size `<canvas>` (block, 100% x 100%) sized to host * DPR (DPR = dpr prop or devicePixelRatio clamped to 2).
- WebGL2 context (alpha, premultipliedAlpha, antialias false, powerPreference high-performance). One fullscreen-quad vertex shader and one large fragment shader; three textures bound at fixed units: a 512x512 luminance trail (linear filtered, uploaded every frame from an offscreen 2D canvas), an optional NxN image lookup (nearest), and a 256x256 age map (linear) used only when a trailColor is set. Blending is disabled — the shader outputs premultiplied colour and discards below alpha 0.002.
- If the context or program fails the component renders nothing and stays silent.

## Trail painting (CPU, offscreen canvas)

- Pointer positions arrive from window-level pointermove/pointerdown, mapped into a centred square UV space (side = max(host width, height), y flipped). Each touch pushes a point {x, y, age, force, vx, vy}; consecutive points are interpolated: the number of in-between stamps is derived from the distance and trailSize * 0.5 / interpolate, so fast strokes leave a continuous ridge. Force = distance-based (0.3 minimum, saturating at 1).
- The trail canvas (512x512, black) is repainted every frame: cleared, then every point stamps a radial gradient with "screen" compositing — intensity ramps up over the first 30% of maxAge (through easingFunction), then decays over the remaining 70%; radius = 512 * trailSize * intensity * force, inner stop 20% white.
- When trailColor is set, a parallel age canvas (256x256) stamps white-hot cores (brightness = freshness 1 - age / maxAge) with "lighten" compositing, so the shader can mix trailColor (fresh) to color (aged) per pixel.
- Points age by dt and are dropped after maxAge; with flow or gravity they also drift: velocity decays by exp(-3 * dt), gravity pulls at 1.6/s, integrated per frame.
- Click burst (clickBurst): 14 points fly outward in a ring (speed 0.35–0.6, randomised angles), melting into the goo as they slow.

## Grid rendering (shader)

- The cell size is max(view width, height) / gridSize; the quad maps pixels to a centred square so the grid stays square on any host.
- Goo mode (gooeyFilter strength > 0): each fragment gathers a 7x7 neighbourhood of cells weighted by a Gaussian whose sigma is gooeyFilter.strength * DPR pixels (reach clamped 1–3 cells) times each cell's trail luminance; the metaball surface is smoothstep(0.5 - edge, 0.5 + edge, field) where edge grows with the field's gradient magnitude — so the mass swells and bridges between nearby touches. The normal is derived from that gradient, giving a glossy bevel: directional lighting (light dir about (-0.42, 0.58, 0.7)), a Blinn specular (pow 64 x 0.85 + pow 10 x 0.08) scaled by shine, and a tone pass that darkens weak cells and lifts dense ones toward a whiter tint (shine). Cell gaps (gap prop) carve seams between cells (up to 32% darkening).
- Colour per fragment comes from the "owner" cell — the neighbouring cell with the highest Gaussian weight: either the image texture (when imageSrc resolves, sampled centre-cropped square at gridSize resolution) or, with trailColor set, mix(trailColor, color, smoothstep(0.05, 0.95, age)) where age comes from the age map.
- Crisp mode (strength 0): each fragment renders its own cell as a clean SDF — square / circle / diamond (shape), inset by gap (half-size 0.5 * (1 - gap)), coverage antialiased at 1px, with a bevel normal (smoothstep over 16% of the cell) and the same tone/spec shading. Decay modes change how cells die: "fade" — alpha by remaining life; "shrink" — the shape scales down by sqrt(2.5 * life) at full alpha; "dither" — a 4x4 Bayer matrix kills cells below a luminance threshold as they age.
- Glow (glow > 0): an under-halo sampled from the trail texture (smoothstep 0–0.7) adds tinted, unlit light beneath the cells (0.55 * glow), tinted by image / trailColor ramp / body colour.

## Image mode

- imageSrc loads through an Image with crossOrigin anonymous; on load the image is drawn centre-cropped to a gridSize x gridSize sampling canvas (cover-fit against the host), uploaded as the lookup texture, and cells take their colour straight from it; on error or empty src the lookup clears. Re-samples when gridSize or the host size changes. No image ships inside the component — hosts pass their own; without one the palette colours apply.

## Interaction & lifecycle

- Loop: repaints trail, re-uploads textures and redraws while any point is alive and the host is intersecting; with no points it sleeps and wakes on the next pointer event. ResizeObserver re-measures and redraws; IntersectionObserver pauses offscreen; webglcontextlost stops permanently (prevented default). Redraw is also triggered on every render pass through an engine ref, so prop changes apply live.
- The root never intercepts pointer events; window-level listeners mean the trail reacts even over child content. Positions outside the host are ignored.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete textures, buffer, VAO and program. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| gridSize | number | 40 | Cells across the larger viewport side. |
| trailSize | number | 0.1 | Brush radius as a fraction of the 512px trail texture. |
| maxAge | number | 250 | How long a touch lives, in ms. |
| interpolate | number | 5 | Stamps interpolated between pointer samples (0 disables). |
| easingFunction | (x: number) => number | identity | Easing applied to the touch intensity ramp. |
| gooeyFilter | { strength?: number } | { strength: 2 } | Metaball melting strength; a falsy value or strength 0 gives crisp cells. |
| color | string | "#ffffff" | Body colour (any CSS colour). |
| trailColor | string | - | Fresh-touch colour; cells ramp trailColor to color as they age. |
| shape | "square" \| "circle" \| "diamond" | "square" | Cell silhouette in crisp mode. |
| gap | number | 0.08 | Seam between cells, 0–0.9. |
| decay | "fade" \| "shrink" \| "dither" | "fade" | How dying cells disappear in crisp mode. |
| flow | number | 0 | How much pointer velocity carries into the trail, 0–1. |
| gravity | number | 0 | Downward pull on trail points, -1–1. |
| sparkle | number | 0 | Random cell flicker that intensifies as cells age, 0–1. |
| clickBurst | boolean | false | Clicking bursts a ring of 14 touch points. |
| shine | number | 0.6 | Bevel lighting and specular strength, 0–1. |
| glow | number | 0.4 | Under-halo strength sampled from the trail, 0–1. |
| imageSrc | string | - | Image sampled per cell as the palette. |
| dpr | number | - | DPR override; defaults to devicePixelRatio clamped to 2. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of PixelTrail.jsx and PixelTrail.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the trail melts into one gooey mass under motion and separates into cells at rest; goo strength 0 gives crisp bevelled cells; shapes square/circle/diamond and decays fade/shrink/dither each read clearly; trailColor ramps fresh-to-aged; gap carves visible seams; flow and gravity let the goo slide and drip after the pointer stops; sparkle flickers dying cells; clickBurst pops a ring; imageSrc recolours cells and recovers from load errors; resizing reflows the grid; the loop sleeps when idle and wakes on pointer events; unmount leaves no listeners or GPU objects; multiple instances run independently; 375 / 768 / 1440 wide hosts without overflow.
