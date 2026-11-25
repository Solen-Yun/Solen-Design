Implement the "Lightfall" component from zero: a curved tunnel of falling light streaks — comets of colour racing along a tube that recedes into depth, their tails streaming behind — with twinkle, a bloom halo, an optional top source-glow, and cursor physics: a magnifying lens and brightness boost bend around the pointer, and holding the pointer down stretches every tail into a warp rush. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Lightfall.jsx (entry, four-pass pipeline, pointer state) and Lightfall.css (all styles: container position relative 100% × 100% overflow hidden; canvas absolute inset 0 aria-hidden). React >= 18; no runtime dependencies. No iframe.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance. Canvas pixel size = client size × min(dpr || devicePixelRatio, 2). webglcontextlost is prevented; webglcontextrestored rebuilds the whole pipeline (React state generation bump re-runs the effect, intro replays).
- One oversized triangle (aPosition (−1,−1), (3,−1), (−1,3)) in a VAO; four programs share it: streak pass, downsample, blur, composite. Float targets (RGBA16F) when EXT_color_buffer_float exists, otherwise RGBA8 with colours pre-scaled ×0.25 and decoded ×4 at composite.

## Streak pass

- The fragment shader places the camera inside a unit superellipsoid (CAMERA = (0, −0.8889, −0.2222)); every pixel casts a ray (screen p scaled by 1/uView.x, z = zoom, zoom min 0.1) and five Newton iterations solve (h²)·(h²) = 1 for the hit h on the surface x⁴ + y⁴ + z⁴ = 1; the normal is h³. From the hit it derives a local frame: x = depth along the ray, θ = atan(hit.z, hit.y) around the ring, and an exact Jacobian (stepX/stepY partials) that also carries the lens warp (below).
- Streaks are laid in angular rings: rings = round(2π × max(density, 0.05)); each of streakCount (1–16) layers samples column = nearest multiple of SPACING (0.005) of (hit.x + layer × SPACING/8), plus up to 2 columns wide when streakWidth > 1. Per column+layer a uint32 scramble hash yields the streak's hue pick, speed multiple (1 + k/16), angular offset, and colour index into the palette (max 8, cycled).
- Each streak renders as a Gaussian stroke of half-width min(width × 5e-4 / scale, 0.2 × spacing) plus an orb head glint (headRadius up to 0.35 × spacing); delta = wrapped angular distance to the streak head minus phase × per-streak speed — heads advance at phase clock = 9 + travel. The tail falls exponentially behind (tail constant 19 / (streakLength × stretch)), clamped so far-past tails vanish; the head side renders the stroke regardless of angular distance within headReach.
- Twinkle (0–1) modulates each streak by 1.5 → 1 + sin(clock + 7·hue + 4) blended by twinkle; headGlow (0–1) mixes streak colour toward white on the glint in dark mode; column edge mask smoothstep(0.72, 1.0 × edge) keeps neighbours from overlapping; distance fog exp(−(rayLength − 0.6) × 1.6 × depth).
- Mouse boost: brightness += 2 × mouseStrength × touch × exp(−dist²/radius²) in screen space. Lens warp: e = 0.5 × lens × touch × exp(−dist²/0.32²) pulls ray origins toward the pointer and feeds the Jacobian so streaks physically bend around the cursor.
- The streak target stores linear light; when detail collapses (angular spacing under ~1.6 px after Jacobian scaling) the pass outputs a flat average instead of aliasing.

## Bloom & composite

- Bloom (strength > 0): four level pairs at half the CSS size each step — 4-tap downsample with peak clamp 4 × encode, separable 4-tap Gaussian blur (fixed weights 0.1819/0.2843/0.1066/0.0182 at taps 1.42/3.33/5.24 texels).
- Composite: light = scene + Σ halo (weights 0.42/0.30/0.18/0.10) × bloom × (lightMode ? 0.2 : 1); light ×= decode × glow × presence where presence = min(1, intro × 2.2). Dark mode adds a top source-glow: backgroundGlow × backgroundColor (parsed to linear) shaped by a core exp(−q.x²/spread² − q.y²/0.06) and a wide halo, near the top centre. Tonemap mapped = sqrt(1 − exp(−1.3·lit²/(lit + 0.025))); dark output = mapped × opacity with alpha = max channel (premultiplied), plus blue-noise dither grain. fade (0–1) multiplies a smootherstep mask on all four edges.
- lightMode: ink-on-light output — chroma is normalised from the lit colour, saturated toward 0.3 grey at low saturation, coverage = smoothstep(0, 0.5, peak) × mask × 0.94, output = chroma × coverage with alpha = coverage.

## Time, intro & warp

- state.travel advances by dt × 0.1 × speed × (1 + rush); rush = 9 × (1 − intro)² + 6 × warp. Intro runs 2.6 s from mount (0→1 linear): presence fades in, and stretch = 1 + 5 × (1 − intro)² + 2.5 × warp elongates every tail — the tunnel arrives in a rush and settles.
- holdToWarp on: pointerdown inside starts a hold; warp eases toward 1 (rate ~2.2/s) while held and toward 0 (~1.6/s) after; holding both rushes the travel and stretches tails. Hold requires pointer inside and reduced motion off.

## Pointer physics

- Pointer target is tracked relative to the container (CSS px, y flipped to GL). mouseX/Y ease at rate 1 − exp(−dt / mouseDampening) (instant when mouseDampening is 0) and drive the brightness boost; lensX/Y ease faster (1 − exp(−dt × 6)) and drive the lens warp; on first engagement the smoothed positions snap to the pointer to avoid sweeping. touch eases toward engaged ? 1 : 0 (rates 4/s in, 2/s out) and gates both effects; mouseInteraction off forces them to zero.
- Listeners: window pointermove/pointerdown/pointerup/pointercancel (passive), documentElement pointerleave, document visibilitychange; on non-mouse pointerup the pointer counts as left.

## Performance & lifecycle

- Frame loop self-sleep: busy while (running and speed ≠ 0) or intro < 1 or warp > 0.001 or touch still easing; otherwise rendering stops with the last frame visible. IntersectionObserver stops rendering offscreen; visibilitychange resets dt and wakes. dt clamped to 0.05 s.
- ResizeObserver re-allocates the scene target at canvas size and the bloom levels at CSS size halving per level; targets reuse textures when the size is unchanged.
- paused freezes travel and rush but pointer easing, intro and settling still render.
- Reduced motion: intro snaps to done, hold-to-warp is disabled, travel freezes — the tunnel renders as a static frame with cursor boost still available through settling draws.
- Unmount: cancel the frame, remove context-lost/restored listeners, disconnect both observers, remove all pointer and visibility listeners, delete every texture/framebuffer, all four programs, the buffer and the VAO, and drop the context via WEBGL_lose_context when the canvas is detached. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#ffffff"] | Streak palette, up to 8 entries, cycled; any CSS colour. |
| backgroundColor | string | "#94a3b8" | Tint of the top source-glow in dark mode. |
| speed | number | 0.3 | Travel pace of the streaks, 0 freezes. |
| streakCount | number | 2 | Streak layers per ring, clamped 1–16. |
| streakWidth | number | 0.8 | Stroke width multiplier; above 1 renders twin columns. |
| streakLength | number | 1 | Tail length multiplier, floored at 0.05. |
| glow | number | 1 | Overall brightness, floored at 0. |
| density | number | 0.6 | Angular ring count, 0–1. |
| twinkle | number | 0.3 | Per-streak brightness shimmer, 0–1. |
| zoom | number | 3 | Camera zoom into the tunnel, floored at 0.1. |
| backgroundGlow | number | 0.1 | Top source-glow intensity (dark mode). |
| headGlow | number | 0.6 | White-hot mix on streak heads (dark mode), 0–1. |
| depth | number | 0.5 | Distance fog strength, floored at 0. |
| bloom | number | 0.35 | Halo strength, floored at 0. |
| opacity | number | 1 | Overall opacity, clamped 0–1. |
| mouseInteraction | boolean | true | Enables the lens warp and brightness boost. |
| mouseStrength | number | 0.4 | Boost intensity near the cursor, floored at 0. |
| mouseRadius | number | 0.45 | Boost falloff radius, floored at 0.01. |
| mouseDampening | number | 0.15 | Boost-follow time constant in seconds; 0 is instant. |
| lens | number | 0.5 | Lens magnification warp strength, 0–1. |
| holdToWarp | boolean | true | Holding stretches the tails into a rush. |
| intro | boolean | true | 2.6 s arriving rush on mount. |
| fade | number | 0 | Edge fade fraction, clamped 0–1. |
| lightMode | boolean | false | Prints the streaks as ink for light pages. |
| mixBlendMode | string | - | Applied as the container's mix-blend-mode. |
| paused | boolean | false | Freezes travel; pointer easing still renders. |
| dpr | number | devicePixelRatio | Render pixel ratio, clamped to 2. |
| className | string | "" | Extra class for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Lightfall.jsx and Lightfall.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: streaks race into depth with tails and twinkle; intro rushes and settles; holding warps — travel accelerates and tails stretch, release relaxes; cursor brightens and the lens bends streaks around the pointer; streakCount/streakWidth/streakLength/density/twinkle/zoom/glow/headGlow/depth/bloom/backgroundGlow/fade/opacity all take effect; palette cycles up to 8 colours; lightMode prints readable ink on white; speed 0 freezes; paused keeps pointer response; prefers-reduced-motion renders static with no hold warp; context loss stops rendering and restoration rebuilds without console errors; offscreen and hidden tab stop rendering; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
