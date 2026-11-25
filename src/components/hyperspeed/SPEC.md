Implement the "Hyperspeed" component from zero: a first-person night drive down a divided highway where traffic renders as glowing light trails — magenta tail-lights streaming toward the camera on one carriageway, cyan head-lights racing away on the other — under street-light poles with dust streaks whipping past. The road bends through one of six procedural curve shapes; holding the pointer down boosts into hyperspace: the world speeds up, the light trails stretch, and the field of view springs wide. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React >= 18 + three.js (the single runtime dependency) + one CSS file: Hyperspeed.jsx (scene, shaders, loop) and Hyperspeed.css (host styles). No iframe.
- Root is a `<div class="hyperspeed">` with `position: absolute; inset: 0; overflow: hidden; touch-action: pan-y; tap-highlight transparent; touch-callout none; user-select: none` — the host must provide a positioned box with its own size (a relative wrapper, e.g. 100% × 480px); the canvas absolutely fills it at 100% width/height. className appends to the root, style passes inline.
- Renderer: WebGLRenderer with antialias true, alpha true, powerPreference high-performance, outputColorSpace LinearSRGBColorSpace, autoClear false, pixel ratio min(devicePixelRatio, 2). Perspective camera at (0, 8, −5), near 0.1, far 10000; base fov from the fov prop (default 90).
- One frame loop, run by requestAnimationFrame only while the container intersects the viewport (IntersectionObserver). Every frame: apply a deferred resize, ease the boost amount, advance the shared time uniform by dt × pace, sync colour/material state, render the scene to the screen, then run the bloom chain.

## The road

- Geometry: a 1 × 400 world-unit plane with 220 segments along its length, rotated flat and shifted to span z ∈ [−400, 0]. All motion is shader-side: positions scroll with mod(uTime × speed + seed, 400) against a travel length of 400.
- Road fragment shader paints: asphalt in roadColor, with the centre median strip (width medianWidth) slightly tinted toward lineColor; shoulder lines 0.3 units inside each carriageway edge; dashed separators between the lanes lanes (dash period 14 units, scrolling at 120 units/s, drawn only between interior lane boundaries); all strokes anti-aliased with fwidth-based stripe functions. Distance fog blends colour toward background and, when background is "transparent", reduces alpha; final alpha = mix(1, 1 − fog, transparentFlag) × roadOpacity. depthWrite turns on only when roadOpacity > 0.5.
- During the bloom bright pass the road mesh's colorWrite is disabled so the asphalt itself never glows.

## Traffic — instanced light trails

- Two streak groups share one InstancedBufferGeometry built from a 7-sided tube of radius 1 swept 1 unit along z (24 segments). Up to 160 cars per direction, each drawn as 2 instances: two parallel tubes offset ±half a car width, sharing one tone seed.
- Per-instance attributes: seedA (lane pick, lateral jitter within half a lane, width mix 0.3–0.5 lane widths, radius mix 0.05–0.14 × lightSize), seedB (length mix 0.03–0.2 × 400 × trailLength × (1 + stretch), speed inside the group's range with a squared skew, vertical offset ≤ 0.8), pair offset and tone index into the palette.
- Tail group: cars drive toward the camera (direction 1, speed range 60–80) on the left carriageway centred at −(roadWidth/2 + medianWidth/2); alpha fades in from the back via uv window [0, 0.6]. Head group: cars drive away (direction −1, speed range 120–160) on the right carriageway; alpha fades out toward the front via window [1, 0.4].
- Each group renders twice: a core layer (radius ×1, sharpness 0.85, additive in the dark theme, depth-tested, renderOrder 3) and a reflection layer (radius ×2.1, sharpness 1.2, mirrored below the road with y × −1.8 and normals flipped, no depth test, painted first, alpha × exp(−height × 0.9), intensity × reflections × (light ? 0.22 : 0.42) × surface, where surface = 0.45 + 0.55 × roadOpacity).
- Streak fragment: facing = |dot(normal, view)|; alpha = facing^sharp × uv fade window × intensity × thinness (radius vs the minimum pixel-enforced size, radiusScale × lightSize) × (1 − fog); the dark theme mixes toward white by pow(facing, 12) × 0.75; discard below 0.003 alpha. Fog = smoothstep(88, 380, view depth).

## Poles & dust

- Poles: instanced open cylinders (8 sides), up to 80 × 2 instances (one per side); lateral offset = ±(roadWidth + medianWidth/2 + 0.8); width mix 0.08–0.22, height mix 1.3–1.9 × poleHeight; spacing = 400 / poles and they stream past at a fixed 120 units/s. Same core/reflection layer split (reflection radius ×2.4); ends are softened by smoothstep caps. poleColors palette.
- Dust: LineSegments, up to 1500; each a short z-aligned segment of length (0.6 + stretch × 7) × (0.6–1.4), speed 140–260 units/s, x-spread = (roadWidth × 2 + medianWidth) × 5, heights biased low (y = mix(1, 42, seed²)); alpha = tail end × fog falloff × intensity × (1 + boostAmount); dust colour is fixed by the theme (white dark / near-black light).

## Curves & camera

- Five procedural bend fields — gentle (5π lateral sway with vertical roll), winding (two-frequency snake, the default), hills (3π sway with 6π vertical and 10π depth rolling), racing (fast 2π/3π sweepers), deep (parabolic dive with 8π churn) — are evaluated in every vertex shader as functions of p = |z|/400 and the shared time, and blended by five weights that ease toward the selected curve with a 0.6 s time constant; "straight" is the zero blend. curvature (min 0) scales the total displacement, so the road, poles, traffic and dust all writhe together.
- The camera look-at target is computed on the CPU from mirrors of the same fields (sampled near the horizon), weighted by the same blend weights, plus the steering offset — the horizon stays framed through bends.
- Steering: pointer position mapped to −1..1 within the container, eased with a 0.35 s time constant × steer (min 0): camera.position.x += steerX × roadWidth × 0.45, camera.position.y = 8 − steerY × 2.5, and the look target shifts a further steerX × 2.5. pointerleave recentres.

## Boost (hold to warp)

- Boost input = (pointer held && interactive) || boosting. Held state comes from pointerdown on the container (left mouse button, or touch/pen) and is released by pointerup/pointercancel anywhere or window blur; contextmenu is prevented while interactive.
- The boost amount eases toward the input (time constant 0.28 s in, 0.85 s out). Effects: world pace × (1 + (boost − 1) × amount) on top of speed (and ×0.3 under reduced motion); stretch = 1.1 × amount lengthens trails and dust; fov springs from fov toward boostFov via a stiffness-90, damping-13 spring; dark-theme core intensity rises by +0.35 × amount. onBoostStart fires on press and onBoostEnd on release, only when interactive.
- prefers-reduced-motion: pace × 0.3 and the fov spring is bypassed (fov stays at the base value); the boost stretch still applies.

## Theme & colour

- Two palettes: dark { road #08080a, lines #25252d, dust #ffffff, transparent background, additive glow with white cores }, light { road #efeff2, lines #d0d0d7, dust #18181b, transparent background, normal blending, no white cores, dimmer intensities (core 0.95 vs 1 + 0.35·boost, reflections 0.22/0.20 vs 0.42/0.38) }. Tail/head/pole palettes default to ['#d856bf', '#6750a2', '#c247ac'] / ['#03b3c3', '#0e5ea5', '#324555'] / ['#03b3c3'] in both themes.
- roadColor, lineColor and background accept any CSS colour, parsed through a canvas 2d fillStyle probe; palettes accept up to 8 entries and cycle. background "transparent" (the default) keeps the clear alpha at 0 so the host backdrop shows through; any other value renders an opaque backdrop matched by the fog. Switching theme re-keys every effect material's blending (additive vs normal) and the bloom blend factors at the next frame.

## Bloom

- Five render targets in a half-size chain (half-float when EXT_color_buffer_float or EXT_color_buffer_half_float exists, otherwise unsigned byte with colours pre-scaled ×0.25 and decoded ÷0.25 at composite). The bright pass renders glow layer 1 (trails, poles, dust; road colorWrite off) into level 0 over transparent black, then 4-tap + centre downsample ×4, tent-filter additive upsample ×4, and a final bloom add to the screen with strength glow × (light ? 0.5 : 1.4) and a soft ceiling glow × (light ? 0.3 : 0.5) applied as ceiling × (1 − exp(−peak/ceiling)) / peak. glow ≤ 0 skips the whole chain.

## Performance & lifecycle

- ResizeObserver marks a pending resize, applied at the start of the next frame: canvas size, all five target sizes (halving each level) and camera aspect. dt clamped to 0.001–0.05 s.
- The loop renders only while the container intersects the viewport; leaving stops rAF, re-entering wakes it.
- Unmount: cancel the frame, disconnect both observers, remove all container and window listeners, dispose every geometry, material and render target, renderer.dispose(), remove the canvas. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| curve | "straight" \| "gentle" \| "winding" \| "hills" \| "racing" \| "deep" | "winding" | Road shape; unknown values fall back to "winding". |
| curvature | number | 1 | Overall bend strength, floored at 0. |
| speed | number | 1 | Base pace multiplier, floored at 0. 0 freezes the world. |
| boost | number | 3 | Top pace multiplier while boosting, floored at 1. |
| fov | number | 90 | Base field of view in degrees, clamped 20–170. |
| boostFov | number | 130 | Field of view the camera springs to while boosting. |
| lanes | number | 3 | Lanes per carriageway. |
| roadWidth | number | 10 | Width of one carriageway in world units, floored at 1. |
| medianWidth | number | 2 | Width of the centre median strip. |
| density | number | 40 | Cars per direction, clamped 0–160. |
| trailLength | number | 1 | Light-trail length multiplier, floored at 0.05. |
| lightSize | number | 1 | Light-tube size multiplier, floored at 0.1. |
| poles | number | 20 | Street lights per side, clamped 0–80. |
| poleHeight | number | 1 | Pole height multiplier, floored at 0.1. |
| dust | number | 100 | Dust streak count, clamped 0–1500. |
| glow | number | 0.6 | Bloom strength; 0 disables the bloom chain. |
| reflections | number | 0.5 | Intensity of the mirrored reflection layer. |
| steer | number | 0.35 | How far the camera leans toward the cursor. |
| tailColors | string[] | ['#d856bf', '#6750a2', '#c247ac'] | Tail-light palette, up to 8 entries, cycled. |
| headColors | string[] | ['#03b3c3', '#0e5ea5', '#324555'] | Head-light palette, up to 8 entries, cycled. |
| poleColors | string[] | ['#03b3c3'] | Street-light palette, up to 8 entries, cycled. |
| roadColor | string | by theme | Asphalt colour; #08080a dark / #efeff2 light. |
| roadOpacity | number | 0.1 | Road surface opacity, 0–1. |
| lineColor | string | by theme | Lane-marking colour; #25252d dark / #d0d0d7 light. |
| background | string | "transparent" | Clear colour behind the scene; "transparent" keeps alpha. |
| theme | "dark" \| "light" | "dark" | Blending and default palette family. |
| interactive | boolean | true | Answers hold-to-boost and cursor steering. |
| boosting | boolean | false | Controlled boost: true behaves like the pointer being held. |
| onBoostStart | () => void | - | Fired when a boost starts (interactive only). |
| onBoostEnd | () => void | - | Fired when a boost ends. |
| className | string | "" | Extra class for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of Hyperspeed.jsx and Hyperspeed.css plus install steps (three included) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all six curves bend the road, poles, traffic and dust together while the camera keeps the horizon framed; switching curves eases over roughly 0.6 s without popping; holding boosts — pace multiplies, trails stretch, fov widens and relaxes on release; the boosting prop drives the same state as holding; steering leans with the cursor and recentres on leave; theme switch flips blending, palettes and default colours without reload; custom palettes and road/line/background colours parse (3/6-digit hex, rgb()/rgba(), names); glow 0 disables bloom; density/poles/dust clamp at their caps; speed 0 freezes; prefers-reduced-motion slows the pace and holds fov; resize keeps the aspect and targets in sync; hidden or offscreen stops rendering; unmount leaves no listeners, observers or GPU leaks; 375 / 768 / 1440 wide without overflow.
