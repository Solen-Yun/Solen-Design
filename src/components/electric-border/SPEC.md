Implement the "ElectricBorder" component from zero: a wrapper that frames any element in living current — several noisy strands of lightning crawl along the border, surge and brighten near the cursor, leap off in bowed sparks, and a click sends a pulse racing around the perimeter. The frame sweeps itself on in a reveal pass on mount. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: ElectricBorder.jsx (entry, spark/pulse simulation, shaders) and ElectricBorder.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div` with class electric-border plus an optional extra className; it is position relative with isolation, gets borderRadius from the borderRadius prop plus any inline style, and renders children first. After the children, an absolutely positioned `<canvas>` (class electric-border__canvas, aria-hidden, pointer-events none, z-index 1) is offset −64px on both axes and sized container + 128px in each dimension, so the glow and sparks can overshoot the frame. The canvas overlays the content, but pointer events pass through to it, so children stay interactive.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, no depth/stencil. If the context or program fails, the component renders as a plain wrapper with no canvas output and must not throw.
- One program, one full-screen triangle. Canvas pixels are capped: DPR = min(devicePixelRatio, 2, sqrt(3,000,000 / (canvas pixels))) so huge frames stay within a 3-megapixel budget. Every frame uploads a rounded-rect frame parametrization of the container (half extents grown by the offset prop, corner radius clamped into the half extents, perimeter split into 4 quarters) plus noise-cell counts derived from the perimeter (≈ perimeter/75, /25, /9, /4 cells and /150, /50 soft cells).
- Fragment shader strands: up to 6 live strands (count = strands + heat × 1.2, capped at 6) drawn as glow profiles around the rounded-rect distance field. Each strand's lateral offset is the sum of four 1D value-noise octaves sampled along the perimeter parametrization and animated in time at rates 0.7×–6.8×: a slow bend at spread × 16, a mid ripple at spread × 6, and two crinkle octaves at chaos × 4.5, all boosted by heat and auto-squeezed (amp cap ≈ 34px combined) so extreme settings keep the strands hugging the border. The lead strand is widest and always fully visible; secondary strands get per-strand visibility noise, a lateral drift, and a swell term that breathes their width. A static bloom hugs the edge (exp falls of 3px and 16px, the inside one strengthened) as ambient glow.
- Colour model: core colour = `color` pushed 55% toward white, glow colour = `glowColor` or `color` itself; light accumulates additively, the final alpha = 1 − exp(−energy × gain) with gain = intensity × flicker breathing × (1 + heat × 0.25) × 1.4. In the dark theme the accumulated glow renders as-is; in the light theme an ink factor eases in over 0.25s and re-mixes the result toward an energy-normalized "ink on paper" look with white-hot cores, so the effect reads on light backgrounds. A 1px ordered grain dithers the alpha.

## Interaction & heat

- The pointer is tracked on window; positions within half the 64px margin outside the container count as near. A cursor heat spot follows the pointer through a slightly underdamped spring (spring k = 120, damping 19) and its power eases in over 0.3s and out over 0.55s when interactive and active. Heat at each pixel = cursor spot exp(−dist²/cursorRadius²) × 0.7 + surge × 0.8 + reveal flare × 0.6, capped at 1.2. Heat raises strand count, bend amplitudes and brightness, so the border visibly surges under the cursor.
- Click pulse (interactive, active, left button, not reduced-motion): a surge wave is spawned at the nearest perimeter point — up to 3 live, each living 2.2s, travelling at 560 px/s around the perimeter and drawn as a moving Gaussian brightness band (width ≈ 46px) decaying exp(−age × 1.2). The same click also spawns one spark at the clicked point.
- Sparks (arcs): bowed lightning segments between two perimeter points, up to 4 concurrent, with lifespan 0.35–0.8s and a sin(π·t) envelope. Each has span min(30% of perimeter, 60–150px) and bows outward by min(34px, length × (0.14–0.30) + 5) on the side chosen by the midpoint's outward normal; two glow layers (core widths thickness × 0.9 and × 0.6, weight 1 and 0.45) with a white-hot centre term; jaggedness comes from three animated noise octaves scaled by chaos. Auto-spawn chance per frame ≈ dt × speed × arcs × 5 × hoverPower near the cursor, else dt × speed × arcs × (0.6 + perimeter/2400) anywhere, only while active, fully revealed and not reduced-motion.
- Reveal (intro prop): on mount and whenever active flips on, a front sweeps along the perimeter — reveal 0→1 over 0.9s, the visible front = reveal × (perimeter/2 + 80) with a 70px smooth edge and a bright flare riding the tip. Global power eases 0↔1 with active (0.28s in, 0.4s out) as a smoothstep shown factor multiplying everything, so active=false fades the border out gracefully.
- prefers-reduced-motion: simulation time advances at 0.2× speed, flicker is forced to 0, sparks and click pulses are disabled, and the reveal completes instantly.
- Theme prop accepts "dark" | "light"; the ink factor cross-fades between the additive-glow and ink-on-paper looks.

## Lifecycle

- The frame loop renders every frame while active, power > 0.002, or sparks exist, and sleeps otherwise; it wakes on pointer movement near the frame, container resize (ResizeObserver, deferred to the next frame), visibility change, and re-entering the viewport (IntersectionObserver).
- WebGL context loss is prevented from defaulting, stops the loop, and context restore rebuilds the whole engine by re-running the effect (generation counter).
- Colour parsing: 3/6-digit hex and rgb()/rgba() directly; anything else is probed through a canvas 2D fillStyle; unparsable input falls back to electric cyan.
- Unmount cancels the frame, disconnects observers, removes all window/document listeners and deletes the vertex array and program. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The content wrapped by the electric frame. |
| color | string | "#7df9ff" | Base colour of the strands; drives the core and the default glow. |
| glowColor | string | - | Separate colour for the outer glow haze; uses color when not set. |
| speed | number | 1 | How fast the current crawls and events fire; 0 freezes motion. |
| chaos | number | 0.5 | Jaggedness of the strands and sparks, 0–2. |
| spread | number | 0.6 | How far the strands wander off the border, 0–2. |
| thickness | number | 1.5 | Core width of the strands in px, minimum 0.25. |
| strands | number | 3 | How many current strands run at once, 1–6. |
| glow | number | 0.6 | Ambient halo strength around the border, 0–3. |
| intensity | number | 0.8 | Overall brightness multiplier. |
| arcs | number | 1 | Spark spawn rate per second; 0 disables sparks. |
| flicker | number | 0.5 | Random brightness breathing of the whole frame, 0–1. |
| borderRadius | number | 24 | Corner radius of the frame in px, applied to the wrapper too. |
| offset | number | 0 | Grows the traced frame beyond the box so the current sits slightly outside. |
| active | boolean | true | Master switch — false eases the whole effect out. |
| intro | boolean | true | Sweeps the border on around the perimeter on mount and re-activation. |
| interactive | boolean | true | Enables cursor surge, click pulses and cursor-sparked arcs. |
| cursorRadius | number | 90 | Radius in px of the heat spot that brightens the border near the cursor. |
| theme | "dark" \| "light" | "dark" | Additive glow on dark, ink-on-paper rendering on light. |
| className | string | "" | Extra class names for the wrapper. |
| style | CSSProperties | - | Inline styles for the wrapper. |

## Delivery & validation

- Deliver the complete content of ElectricBorder.jsx and ElectricBorder.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: strands crawl continuously and hug a rounded frame of any size; the border surges and gains strands near the cursor and relaxes after; clicking fires a pulse that races around the perimeter plus a spark at the click point; sparks bow outward with jagged noise and die within ~0.8s; the intro reveal sweeps around the frame with a bright tip; active=false fades out and re-activating re-sweeps; theme light renders legible ink-on-paper with white-hot cores; glowColor tints the halo independently of the strand core; borderRadius 0 through pill shapes all trace correctly; content inside stays clickable while the canvas overlays it; speed 0 and paused-like states settle without leaking frames; prefers-reduced-motion keeps a calm static-ish border with no sparks; very large frames stay inside the pixel budget; WebGL missing leaves the children intact with no errors; context loss and restore rebuild cleanly; unmount leaves no listeners, observers or frame loop; 375 / 768 / 1440 wide without overflow.
