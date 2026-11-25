Implement the "Particles" component from zero: a drifting 3D field of glowing particles — thousands of seeded dots floating in a slowly rotating sphere of depth, each bobbing on its own sine phase, twinkling, wrapped in a soft glow halo; optional constellation lines link nearby particles, the cursor repels or attracts them (or shifts the whole cloud in parallax), clicks fire expanding shock-wave bursts, and a continuous drift mode can carry the whole field upward, downward or toward the camera. Four sprite shapes are available: circle, square, ring and a four-ray sparkle. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: Particles.jsx (entry, CPU projection for links, GLSL) and Particles.css. No runtime dependencies. No iframe.
- Root is `<div class="particles-container">` (position relative, width/height 100%, overflow hidden) receiving className/style; inside is `<canvas class="particles-canvas" aria-hidden="true">`, absolute inset 0. Pointer input listens on the window.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; missing context renders nothing. Canvas DPR = min(pixelRatio prop or devicePixelRatio, 2).
- Particles are instanced quads: one shared 4-vertex triangle strip corner buffer plus three per-instance attributes (position vec3, random vec4, colour vec3). Cap 20000 instances. A second program draws link lines as instanced 4-vertex strips (endpoints vec4 + tint vec4), dynamic buffer capped at 9000 lines. Premultiplied-alpha blending (ONE, ONE_MINUS_SRC_ALPHA) with a cleared transparent canvas.

## Cloud generation

- A seeded generator (32-bit state advanced by 0x6d2b79f5 with imul hashing) rebuilds the cloud only when count, variation, colours or light mode change: variation seeds the generator (variation × 7919 + 1) so every value gives a stable but distinct field. Positions are rejection-sampled inside a unit sphere with cube-root radial distribution; four random numbers per particle drive bob phase, twinkle phase, drift offset and reveal stagger. Each particle picks a palette colour at random.
- lightMode compresses palette colours toward readable ink: sRGB→linear luminance, depth = min(1, 0.06 / tone), re-gamma — pale dots on white stay visible.
- Fields are Float32Array-typed and rebuilt wholesale on change; a cache key prevents redundant uploads.

## Per-frame motion

- Time advances dt × speed (dt clamped 0.0005–0.05). Whole-cloud rotation is a slow precessing matrix: x tilt = sin(elapsed×0.0002) × 0.1, y tilt = cos(elapsed×0.0005) × 0.15, z roll spins continuously at 0.6 × pace; disableRotation zeroes it. Bob: each axis wobbles sin(time × rate + 6.28 × phase) × mix(0.1, 1.5, rand).
- Drift: "up"/"down" wrap the y coordinate over span = spread × 2 + 3 with smooth 12% edge fades at both ends; "forward" wraps z over span = spread × 10 × 2 + 3 with a near fade, flying past the camera. travel advances dt × driftSpeed × (6 forward, else 0.9).
- Projection: perspective with a 7.5° vertical focal; z is stretched 10× before projection; near plane 0.1, far 100; particles within 4 units of the near plane fade in from the edges. screen-space positions are computed in pixels.
- Pointer effects: the smoothed cursor (rate 1/0.06 s) and an eased presence (rate 1/0.2 s) drive three modes. Parallax: the whole cloud offset eases toward (−pointer.nx × hoverFactor, −pointer.ny × hoverFactor) at rate 1/0.35 s. Repel: each particle shifts away from the cursor by radius × 0.5 × exp(−d²/radius²) × hoverFactor × presence. Attract: pulls toward the cursor with −Δ × 0.6 × the same falloff. moveParticlesOnHover gates the parallax only; repel/attract always respond.
- Click bursts (max 4, life 1.5 s): each burst pushes particles outward along a travelling wavefront — Gaussian ring exp(−((d − age × 520) / 46)²) × (1 − age/1.5)² × 56 px with a near-field ramp; the same wave adds a brightness flash that swells particle size up to 60%.
- Intro: over 1.8 s each particle fades in with a per-particle stagger (alpha × reveal²) while the cloud slides back from −70 z with an ease-out.

## Sprites & links

- Fragment shapes, all analytically anti-aliased: circle (default), square (rounded SDF), ring (thin annulus at 0.8 r, width max(0.22 r, 0.6/dpr)), sparkle (four cross-faded rays of width 0.14 r plus a small core, extent 1.6 r). size = particleBaseSize ÷ distance, scaled by (1 + sizeRandomness × (rand − 0.5)) unless randomness is 0.
- alphaParticles softens every edge (softness 0.2); the halo adds exp(−d / (halo × 0.35)) × glow × 0.4 outside the core (halo = radius × 2.5 + 2 px when glow > 0); a per-particle shimmer modulates colour ±0.2 with a moving sine; twinkle dims each particle up to 60% on its own flicker rate (6–20 Hz). Depth of field: blur = depthOfField × 14 × (focus − dist)/dist with focus at camera + 14, dropping alpha and fattening the sprite for near/far particles.
- Connections (connections prop): each frame the CPU projects the nearest 900 particles with the same maths as the GPU, buckets them into a spatial hash of cell = connectionDistance px, and links every pair within reach: alpha = fade² (fade = 1 − d/reach) × depth layer (clamp(1 − |z_i − z_j|/18)) × 0.7 × min(particle alpha), tinted with the average endpoint colour, 1 px wide. Capped at 9000 lines; skip when alpha < 0.02.

## Performance & lifecycle

- A continuous rAF runs while the container is on screen and the tab visible; `paused` renders one settled frame instead of ticking. IntersectionObserver + visibilitychange suspend and resume.
- All props live in a ref refreshed every render — every option applies live without remount; count/variation/colour changes rebuild only the cloud buffers.
- Reduced motion: clock, spin, drift, bob, parallax, bursts and intro are frozen — a static rendered field remains, cursor repel/attract and links still work.
- Unmount: cancel the frame, disconnect observers, remove all listeners, delete both programs, all buffers and VAOs, and drop the WebGL context if the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| particleCount | number | 200 | Particle count, clamped 1–20000. |
| particleSpread | number | 10 | Radius of the cloud sphere in world units, ≥ 0.1. |
| speed | number | 0.1 | Time scale of bobbing, spinning and drift. |
| particleColors | string[] | ["#ffffff"] | Palette each particle picks from; any CSS colour, empty falls back to white. |
| moveParticlesOnHover | boolean | true | Enables the parallax cloud shift under the cursor. |
| particleHoverFactor | number | 1 | Strength of parallax, repel and attract, ≥ 0. |
| alphaParticles | boolean | false | Soft, translucent sprite edges instead of crisp cores. |
| particleBaseSize | number | 100 | Base sprite size; rendered as size ÷ distance in px. ≥ 0. |
| sizeRandomness | number | 1 | Per-particle size variation, 0–1+. |
| cameraDistance | number | 20 | Camera distance in world units, ≥ 1. |
| disableRotation | boolean | false | Stops the slow whole-cloud precession and roll. |
| pixelRatio | number | - | Overrides the canvas DPR (capped at 2). |
| shape | "circle" \| "square" \| "ring" \| "sparkle" | "circle" | Sprite silhouette. |
| glow | number | 0.5 | Soft halo strength around each particle, ≥ 0; reduced in light mode. |
| twinkle | number | 0.3 | Flicker depth per particle, 0–1. |
| depthOfField | number | 0 | Blur/bloom for particles away from the focal plane, ≥ 0. |
| connections | boolean | false | Draws constellation lines between nearby particles. |
| connectionDistance | number | 110 | Link reach in px, ≥ 10; up to 9000 lines among the nearest 900 particles. |
| hoverEffect | "parallax" \| "repel" \| "attract" | "parallax" | Cursor interaction mode. |
| hoverRadius | number | 140 | Repel/attract falloff radius in px, ≥ 20. |
| clickBurst | boolean | true | Clicks fire expanding shock-wave bursts (max 4 live). |
| drift | "none" \| "up" \| "down" \| "forward" | "none" | Continuous field drift with wrap-around. |
| driftSpeed | number | 1 | Drift pace multiplier. |
| variation | number | 0 | Seeds the cloud; each value gives a different deterministic field. |
| intro | boolean | true | 1.8 s staggered fade/slide-in on mount. |
| opacity | number | 1 | Overall canvas alpha, 0–1. |
| lightMode | boolean | false | Compresses colours to readable ink for pale backgrounds. |
| paused | boolean | false | Freezes time and renders one settled frame. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Particles.jsx and Particles.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: particles bob, twinkle and precess; spread/size/camera changes apply live; same variation reproduces the same field, a different variation re-seeds it; circle/square/ring/sparkle shapes all render crisply; parallax shifts the cloud, repel pushes dots away from the cursor and attract pulls them in; clicks fire wavefront bursts that flash and shove particles (max 4 tracked); connections draw and fade by distance and depth without crossing artefacts; drift up/down/forward wraps seamlessly; depth of field blurs off-focus particles; glow halo and alpha soft edges behave; light mode keeps pale dots legible on white; paused freezes one frame; reduced motion stops time but keeps interactivity; canvas tracks its container at 375 / 768 / 1440 wide without overflow; unmount leaves no listeners, observers or frame loop; same-page instances are independent.
