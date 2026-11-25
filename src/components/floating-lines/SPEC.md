Implement the "FloatingLines" component from zero: three drifting bands of fine glowing lines — layered wave groups (top, middle, bottom) whose thin filaments swing like slow oscilloscope ribbons in a gradient of up to 8 colours; the cursor bends nearby lines aside with a soft magnetic pull, groups parallax against pointer drift, depth-of-field blurs the far bands, and clicking twists the whole weave in the direction of the stroke. Dark additive glow output with an ink mode for light pages. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Two files: FloatingLines.jsx (entry, GL setup, per-wave CPU packing) and FloatingLines.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="floating-lines-container">` (plus caller className/style), position relative, width 100%, height 100%, overflow hidden; its only child is `<canvas class="floating-lines-canvas" aria-hidden="true">`. Inline mixBlendMode defaults to "screen" and is forced to "normal" in light mode or when a backgroundColor is set. The host owns the size.
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; silent no-op when the context or program fails. One VAO with a 3-vertex big triangle. DPR clamped to 2. KHR_parallel_shader_compile is used when present: renders start before linking finishes and the first real draw waits for completion; a program still linking at unmount is retired on a later frame.
- One program. Space is screen coords normalized by height (y down). Logarithmic warp rotates each wave group by `rotate × log(length + 1)` (optionally x-flipped) — the same warp applies to the mouse point on the CPU.

## Wave groups & lines

- Three fixed groups (top/middle/bottom), each with baked shape constants: fold offset, per-line fold step, light bias, flip, depth (blur weight) and parallax drift; and default placement (x shift, y lift, rotate): top (10, 0.5, −0.4), middle (5, 0, 0.2), bottom (2, −0.7, −1). enabledWaves filters which groups render; per-wave overrides topWavePosition/middleWavePosition/bottomWavePosition merge over the defaults ({ x, y, rotate }).
- Per wave: up to 24 lines (lineCount may be a number or per-wave array), spacing = lineDistance × 0.01 × index + x shift. Each line packs (cos(phase), sin(phase), amp, along): phase = fold + step×line + along + time × 0.1; amplitude = sin(fold + time × 0.2) × 0.3 × amplitude × intro-ease.
- Colour: lines pick stops from the linesGradient (up to 8, any CSS colour; parsed via fast hex path then cached 1×1 canvas probe, linearized to ^2.2) interpolated along the line index with a smoothstep ease.
- Rendering: signed distance to each rotated line with screen-space-derivative anti-aliasing; core = smoothstep over width (lineWidth × 0.5 × ratio, widened ×2.5 and softened ×7 by the wave's depth-of-field blur; energy compensates (w+aa)/(width+soft) × light bias). Halo: tight exp falloff plus a wide weak tail (uHaloReach = 11 × ratio × log(160 × glow + 1)), scaled by glow. lineStyle "dashed"/"dotted" break the distance field into spaced cells along the line (period 22/9 px × ratio; dashes also carve a span gap).
- Pointer bend: along-x gaussian pull (bendRadius × 0.09 sigma, influence eased by mouseDamping) displaces line level by across × −min(strength, 0.9) — negative bendStrength pushes lines away instead (clamped −2.5). Nearby lines also brighten ×(1 + near × 0.8).
- Clicks: up to 3 live swirls; each twists fragments around its centre by 1.9 rad spiking over 0.23 s and decaying exponentially, reach spreading with age (0.3 × (1 + age × 0.55)); spin sign follows the pointer's horizontal velocity at click; swirls expire at age 4.

## Parallax, depth & output

- Parallax (default on): the pointer's normalized offset drifts each group by parallaxStrength × shape drift (per-wave 0.6/1/1.4), eased with mouseDamping.
- Depth of field (0–1): per-wave blur widens and softens far groups (depth weights 1/0/0.6).
- Intro (1.8 s, skipped when intro=false or reduced motion): smoothstep reveal scales amplitude, brightness and opacity together.
- Dark output: HDR bloom capped at 0.28 soft-shoulder, tone-mapped 1 − exp(−light × brightness × 1.2), gamma-encoded; edgeFade (0–1) smoothsteps both x edges at 45% of the fade fraction. Transparent mode premultiplies by max channel; backgroundColor set = opaque composite (additive over background).
- Light mode: per-line ink (colour darkened to ≥0.16 luma denominator) accumulated with over-compositing, gamma-encoded, over white (or backgroundColor when opaque).

## Pointer, timing & lifecycle

- Pointer tracked on window (passive move/down/up/cancel), converted to canvas pixels with y flipped plus normalized ±0.5 parallax coordinates; horizontal velocity feeds the click spin; pointerleave on documentElement clears inside; the mouse point snaps on first entry when influence < 0.05.
- Time advances at animationSpeed (floored at 0), dt clamped 0.5–50 ms; reduced motion freezes time (the field renders static, no intro/swirl/bend animation).
- Frame loop: continuous requestAnimationFrame while visible and the tab is shown (the ribbons always drift); render is skipped while the program is still parallel-linking; hidden tab and off-screen (IntersectionObserver) stop the loop; visibility change resets dt and wakes.
- Resize: ResizeObserver on the container; a dpr prop change re-resizes.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete program/buffer/VAO (retiring a still-linking program on a later frame), force-lose context when detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| linesGradient | string[] | ["#e945f5", "#ffffff"] | Line colour stops, up to 8, interpolated along each wave's lines. |
| enabledWaves | ("top" \| "middle" \| "bottom")[] | ["top", "middle", "bottom"] | Which wave groups render. |
| lineCount | number \| number[] | 10 | Lines per wave (0–24); an array maps per enabled wave. |
| lineDistance | number \| number[] | 6 | Spacing between lines in a wave. |
| topWavePosition | { x?, y?, rotate? } | - | Overrides the top group's placement. |
| middleWavePosition | { x?, y?, rotate? } | - | Overrides the middle group's placement. |
| bottomWavePosition | { x?, y?, rotate? } | - | Overrides the bottom group's placement. |
| animationSpeed | number | 1 | Speed of the phase drift, floored at 0. |
| amplitude | number | 1 | Swing amplitude of the lines, floored at 0. |
| lineWidth | number | 1 | Core line width, floored at 0.1. |
| lineStyle | "solid" \| "dashed" \| "dotted" | "solid" | Breaks lines into dashes or dots. |
| glow | number | 1 | Halo strength; also widens the halo reach. |
| brightness | number | 1 | Tone-map exposure, floored at 0. |
| depthOfField | number | 0.5 | Blur on far wave groups, clamped 0–1. |
| edgeFade | number | 0 | Left/right edge fade, clamped 0–1. |
| interactive | boolean | true | The cursor bends and brightens nearby lines. |
| bendRadius | number | 5 | Bend falloff radius, floored at 0.1. |
| bendStrength | number | -0.5 | Bend amount; negative pushes lines away. |
| mouseDamping | number | 0.05 | Pointer follow lag, clamped 0–1. |
| parallax | boolean | true | Wave groups drift against the pointer. |
| parallaxStrength | number | 0.2 | Parallax magnitude, floored at 0. |
| clickSwirl | boolean | true | Clicking twists the field, spinning with the stroke. |
| intro | boolean | true | Fades and swings in over 1.8 s. |
| mixBlendMode | CSSProperties["mixBlendMode"] | "screen" | Container blend mode; forced normal in light/opaque modes. |
| backgroundColor | string | - | Opaque backdrop colour (any CSS colour string). |
| lightMode | boolean | false | Ink-on-light rendering for light pages. |
| opacity | number | 1 | Output opacity, clamped 0–1. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of FloatingLines.jsx and FloatingLines.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: three wave groups render with independent phase, parallax and blur; enabling/disabling groups and per-wave count/distance arrays work; the gradient interpolates along each wave and honours 1–8 stops; dashed and dotted styles break lines cleanly; the cursor bends nearby lines aside and brightens them, positive strength pulling in and negative pushing out; parallax drifts groups with the pointer; clicking vortexes the field, spin following the stroke direction; depthOfField blurs far groups; edgeFade trims both edges; lightMode prints legible ink on white; backgroundColor composites opaque with normal blending; intro ramps amplitude/brightness/opacity; animationSpeed 0 freezes; reduced motion renders static without intro or swirls; resize and tab-hide never stretch or leak; unmount leaves no listeners, programs or frames; 375 / 768 / 1440 wide without overflow.
