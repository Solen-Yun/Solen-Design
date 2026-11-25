Implement the "ColorBends" component from zero: vibrant colour bends — smooth flowing bands of colour twisted through a sine-warped domain, sliding endlessly with a slow drift, each band masked by its own travelling phase so the hues fold into each other. The pointer gently pulls the whole field toward it with parallax, and the output is a transparent premultiplied canvas that composites over any page. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components. The renderer is three.js (`three`, r180+): one fullscreen orthographic plane with a custom ShaderMaterial.

## Structure & rendering

- React + three.js + CSS, three files: ColorBends.jsx (entry, renderer lifecycle, uniforms sync), ColorBends.css (container styles) and the shader sources inline in the JSX. No other runtime dependencies. No iframe.
- Root is a `div.color-bends-container` (position relative, width/height 100%, overflow hidden) plus any extra className; the three.js canvas is appended inside and styled to 100% x 100%, display block. style forwards to the container.
- Scene: OrthographicCamera(-1, 1, 1, -1, 0, 1) + PlaneGeometry(2, 2); the vertex stage passes the plane uv through. Renderer: antialias off, alpha true, powerPreference high-performance, outputColorSpace sRGB, pixel ratio min(devicePixelRatio, 2), clear colour transparent when `transparent` is on (else opaque black).
- Domain warp (fragment): p = uv * 2 - 1 aspect-corrected by the canvas; the pointer adds a parallax shift (pointer * parallax * 0.1); a 2D rotation from `rotation` degrees (plus autoRotate * elapsed) turns the domain; then q /= max(scale, 0.0001), a lens squash q /= 0.5 + 0.2 * dot(q, q), the slow drift q += 0.2 * cos(t) - 7.56 with t = uTime * speed, and a pointer pull (pointer - rotated) * mouseInfluence * 0.2. Then `iterations` (1-5) of a sine fold: r = sin(1.5 * (q.yx * frequency) + 2 * cos(q * frequency)); q += (r - q) * 0.15 while a shift term decays x0.85 per iteration.
- Bands: up to 8 colour stops (hex strings, 3 or 6 digits). Each stop i steps the domain back 0.01 and evaluates its own mask: m = length(r + sin(5 * r.y * frequency - 3 * t + i) / 4), warped by warpStrength (0-1 mixes the unwarped and warped distances, >1 amplifies the warp gain), then weight w = 1 - exp(-bandWidth / exp(bandWidth * m)). Colours accumulate and clamp; alpha = accumulated cover when transparent, else 1. With no colours the shader falls back to an RGB channel-split mode (each channel gets its own mask) for a full-spectrum look.
- Finish: intensity multiplies the colour; a hash grain adds +- noise and clamps; output premultiplied (colour x alpha).
- Pointer: the container tracks pointermove in NDC (-1..1, y up); the uniform eases toward the target at 8/s so the pull and parallax feel fluid.

## Scheduling & lifecycle

- Props sync on every render into the existing uniforms (no shader rebuilds); colors re-parse only when the array changes.
- The rAF loop runs while the container intersects the viewport and the page is visible; IntersectionObserver + visibilitychange wake it, and the first delta after a wake is dropped so time never jumps. There is no self-sleep — this field always drifts.
- Resize: ResizeObserver (window resize fallback) calls renderer.setSize(w, h, false), updates the uCanvas uniform and re-renders.
- Unmount: cancel the frame, disconnect observers and listeners, dispose geometry, material and renderer, force context loss and remove the canvas from the container. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| rotation | number | 90 | Domain rotation in degrees. |
| speed | number | 0.2 | Time multiplier for the drift and band phases. |
| colors | string[] | [] | Band colours (hex, 3 or 6 digits); up to 8, empty = RGB channel-split mode. |
| transparent | boolean | true | Transparent premultiplied output (alpha from band cover) instead of an opaque fill. |
| autoRotate | number | 0 | Extra degrees per second added to rotation. |
| scale | number | 1 | Domain scale (higher = smaller features). |
| frequency | number | 1 | Sine fold frequency. |
| warpStrength | number | 1 | Band warp mixing 0–1 (> 1 amplifies). |
| mouseInfluence | number | 1 | How strongly the domain pulls toward the pointer. |
| parallax | number | 0.5 | Pointer-driven domain shift. |
| noise | number | 0.15 | Grain strength added per frame. |
| iterations | number | 1 | Sine fold iterations 1–5. |
| intensity | number | 1.5 | Colour output multiplier. |
| bandWidth | number | 6 | Band softness/width. |
| className | string | - | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of ColorBends.jsx and ColorBends.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: bands flow continuously with sliding phases and smooth folding; 1-8 colours re-map the bands live and empty colours show the RGB split; transparent off paints an opaque field; rotation and autoRotate turn the domain; scale/frequency/iterations/warpStrength/bandWidth/intensity/noise reshape the pattern; the pointer pull and parallax ease without snapping; resize keeps the aspect correction correct; tab-hide pauses time without a jump on return; unmount removes the canvas and disposes the renderer; the canvas never overflows the container at 375 / 768 / 1440 wide.
