Implement the "Galaxy" component from zero: an endless flight through a twinkling starfield — layered sheets of stars rushing past with depth, per-star twinkle and occasional lens flares, a cursor that pushes stars aside (or a fixed repulsion at the focal centre), click-to-warp that squashes the whole field into hyperspace streaks, and an intro burst that punches the warp on arrival. Dark additive output, light-page ink mode, transparent or opaque compositing. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Two files: Galaxy.jsx (entry, GL setup, variant shader management) and Galaxy.css (layout). React >= 18; no runtime dependencies.
- Root is a `<div class="galaxy-container">` (plus caller className/style), position relative, width 100%, height 100%, overflow hidden; its only child is `<canvas class="galaxy-canvas" aria-hidden="true">`, absolute inset 0. The host owns the size.
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; silent no-op when the context fails. One VAO with a 3-vertex big triangle. DPR clamped to 2.
- One fragment shader compiled into up to 8 variants over three feature defines — PALETTE (user star colours), REPEL (star displacement), WARP (elliptical squash) — keyed (4/2/1) and cached in a Map. KHR_parallel_shader_compile is used when present: the first render waits synchronously for the base variant, later variants swap in only once linked (falling back to the base program until ready); the variants the current props can reach are pre-warmed on mount.

## Starfield

- Space: uv = (frag − focal×resolution)/resolution.y, rotated by the animated rotation angle and the static rotation matrix; mouse offset shifts the field 10% toward the cursor when no repulsion is active.
- Layers: up to 8 (prop clamped 2–8); layer k has depth = fract(k/layers + depth-scroll); cell scale = mix(20 × density, 0.5 × density, depth) so far layers are dense and small; fade = depth × smoothstep(1.0, 0.9, depth) trims the tunnel ends; each layer offset by a constant hash vector.
- Stars: each cell hashes to a seed; size = fract(seed × 345.32); gloss cycles with time (triangle wave over period 3 × seed); the biggest stars (smoothstep(0.9, 1.0, size) × gloss) get a four-point lens flare plus a dimmer 45° cross, both scaled by flareGain = glowIntensity × flareIntensity. Core glow = starGlow / d, where starGlow = 0.05 × glowIntensity × starSize / (1 + boost×5)^0.6. Twinkle is a signed triangle wave mixed by twinkleIntensity.
- Star colours: default mode derives per-star red/blue from hashes (floored at 0.2), green = min × seed, then applies hueShift (degrees) and saturation in HSV space. PALETTE mode picks from up to 4 starColors entries per cell hash.
- Motion: time drives twinkle/gloss; the depth scroll advances at (starSpeed/10) × speed × (direction backward inverts the sign) × (1 + boost × 14) — the warp multiplies flight speed; padding inside cells drifts slowly with time.

## Repulsion & warp

- Mouse repulsion (default): the eased cursor position (normalized, aspect-corrected) becomes the repel centre; per star, away-vector × displaced cells = pushCells × exp(−q²), q = dist × spread with spread = scale/(radius) and radius = 0.16 + 0.04 × strength; displacement saturates via cells/√(1+cells²×2.78), and the star's glow reach stretches by 1/(1 − moved). push = repulsionStrength × 0.05 × mouseActiveFactor. autoCenterRepulsion > 0 replaces the cursor with the focal centre at constant strength.
- Warp: clickWarp adds boost = min(1.6, +1) per click; boost decays exp(−dt×1.3). boost squashes star distance along the radial axis by uSquash = 1 − 1/stretch² with stretch = 1 + boost×5 (stars streak into tunnels), dims the core glow by stretch^0.6, fades flares past the reach, and multiplies flight speed. The intro (2.2 s, skipped when intro=false or reduced motion) seeds boost = (1 − reveal)² × 1.4 so the field lands out of a warp burst.

## Output modes

- transparent (default, dark): premultiplied col with alpha = smoothstep(0, 0.3, luminance) × opacity.
- opaque dark: mix(background, col, opacity) — background is the parsed backgroundColor or black.
- lightMode ink: luminance-gated colour, energy normalised to a tint; ink = tint × (0.16 / max(luma, 0.16)); coverage = pow(min(energy×1.3, 1), 1.3) × 0.92 × opacity; transparent variant writes premultiplied ink, opaque variant mixes over white.

## Pointer, timing & lifecycle

- Pointer tracked on window (passive move/down/up/cancel), normalized 0–1 with y flipped; pointerleave on documentElement clears inside; touch releases on up. Follow easing time constant 0.325 s; active factor eases with it and snaps within 0.001.
- Time advances only when not disableAnimation and not reduced motion; dt clamped 0.5–50 ms.
- Frame-loop self-sleep: keeps requesting frames only while animation is on, a warp boost is alive, the mouse factor is easing, or the intro reveal is unfinished; otherwise stops, and any pointer event, visibility change, resize, intersection re-entry or prop change wakes it. Prop changes re-render one frame immediately.
- Resize: ResizeObserver on the container; a dpr prop change re-resizes. IntersectionObserver pauses off-screen; document hidden pauses; reduced motion freezes all motion, disables intro/warp/cursor follow.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete every cached program, buffer, VAO, force-lose context when detached. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| focal | [number, number] | [0.5, 0.5] | Vanishing point in normalized coordinates. |
| rotation | [number, number] | [1.0, 0.0] | Static 2×2 rotation applied to the field. |
| starSpeed | number | 0.5 | Base flight speed through the field. |
| density | number | 1 | Star cell density multiplier, floored at 0.01. |
| hueShift | number | 140 | Hue rotation (degrees) of the procedural star colours. |
| disableAnimation | boolean | false | Freezes all motion. |
| speed | number | 1.0 | Multiplier on the depth scroll. |
| mouseInteraction | boolean | true | Enables cursor easing and repulsion. |
| glowIntensity | number | 0.3 | Core glow and flare gain, floored at 0. |
| saturation | number | 0 | Extra saturation on procedural star colours, floored at 0. |
| mouseRepulsion | boolean | true | Stars are pushed away from the cursor. |
| repulsionStrength | number | 2 | Push strength, floored at 0. |
| twinkleIntensity | number | 0.3 | Twinkle mix, clamped 0–1. |
| rotationSpeed | number | 0.1 | Field rotation speed (rad/s). |
| autoCenterRepulsion | number | 0 | Constant repulsion at the focal centre; replaces cursor repulsion when > 0. |
| transparent | boolean | true | Transparent canvas; false composites over backgroundColor. |
| lightMode | boolean | false | Ink-on-light rendering for light pages. |
| starColors | string[] | - | Up to 4 explicit star colours; omit for procedural colouring. |
| starSize | number | 1 | Star core size multiplier, floored at 0. |
| flareIntensity | number | 1 | Lens-flare strength, floored at 0. |
| layers | number | 4 | Star layers, clamped 2–8. |
| direction | "forward" \| "backward" | "forward" | Flight direction through the depth scroll. |
| clickWarp | boolean | true | Clicking punches a decaying warp boost. |
| intro | boolean | true | Arrives out of a warp burst over 2.2 s. |
| backgroundColor | string | - | Opaque backdrop colour (any CSS colour string). |
| opacity | number | 1 | Output opacity, clamped 0–1. |
| dpr | number | devicePixelRatio | Canvas pixel ratio override, clamped to 2. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Galaxy.jsx and Galaxy.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: stars fly forward and backward with depth-scaled density and end-of-tunnel fade; twinkle, gloss cycling and big-star flares animate; the cursor pushes stars aside with softened saturation and the focal-centre mode works without a cursor; clicking streaks the field into warp that decays smoothly; the intro lands out of a warp burst; starColors (1–4) switch to the palette variant; hueShift/saturation recolour the procedural mode; layers 2–8 change parallax; lightMode prints ink on white both transparent and opaque; transparent=false composites over backgroundColor; disableAnimation/paused-style freezing works; reduced motion stays static; resize, tab-hide and off-screen never stretch or leak; unmount leaves no listeners, programs or frames; 375 / 768 / 1440 wide without overflow.
