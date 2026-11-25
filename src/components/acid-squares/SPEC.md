Implement the "AcidSquares" component from zero: a rolling floor of glossy, rounded square tiles rendered in perspective WebGL2, seen like a dark reflective sea of candy tiles. A three-sine swell undulates the field, expanding ring pulses roll outward from a spawn point, the cursor presses (or lifts) the tiles under it with a soft dent, the camera drifts after the pointer, and clicking slaps a fresh ripple into the ground. The surface is lit by two orbiting studio lights with beveled edges, a dome bulge, fresnel rim, film grain and a distance fade. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: AcidSquares.jsx (entry, shaders, camera, frame loop) and AcidSquares.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.acid-squares-container` (position relative, width/height 100%, overflow hidden) holding one `canvas.acid-squares-canvas` (absolute, inset 0, 100% x 100%, aria-hidden). Extra className and style are forwarded to the container; the canvas always fills the container.
- Context: webgl2 with alpha, premultipliedAlpha, antialias, depth enabled and stencil off. If the context or the program fails, the component silently renders nothing (no fallback UI, no errors thrown).
- One program shared by vertex and fragment stages (the field function is inlined into both). Geometry is a square grid mesh of `detail` x `detail` cells (low 150, medium 210, high 280) as triangle indices; rebuilt only when detail changes. Each vertex carries a 2D unit coordinate; the vertex stage maps it onto the ground area, evaluates the height field and its 2D gradient, and outputs world position (ground.x, height, ground.z) through a view-projection matrix.
- Ground area is a rectangle spanning x -42..42, z -76..18 (area [-42, -76, 84, 94] shifted by the pulse origin [0, -3]); DPR is clamped to 2 and the longest canvas side is clamped to 2400 pixels (downscaled uniformly).
- Theme colors come from three CSS-parsable strings (3/4/6/8-digit hex with or without "#", or any CSS color) resolved through an offscreen 1px canvas fill probe; unparsable values fall back to the defaults (body #120f17, accent #ff4fb8, secondary #3b6bff).

## Height field (vertex + fragment, shared)

- Base swell: three directional sine waves with wave vectors (0.19, 0.11), (-0.09, 0.23), (0.29, -0.17), all scaled by 1.9 / waveScale; amplitudes 0.55, 0.40, 0.22; phases advance with time at rates 0.55, -0.42, 0.74 plus offsets 1.3, 2.1. Total amplitude multiplied by 1.3 * waves * (0.25 + 0.75 * settle) where settle is the eased intro progress. Time advances by dt * speed each frame.
- Ripples: up to 8 concurrent, stored as (x, z, startTime, strength). Each contributes a Gaussian ridge at distance = age * waveSpeed (waveSpeed = 3 * max(pulseSpeed, 0.05) + 1.2), width 1.6 * pulseWidth, amplitude strength * 0.55 * pulse * life^2 * smoothstep(0, 1.5, radius), with life = 1 - radius/46 clamped; its gradient is added too. Ripples die at age 46 / waveSpeed + 1 and the oldest beyond 8 are shifted out.
- Intro ring: during the reveal (first 2.6s), one extra Gaussian bump sits at the pulse origin with radius glide(t / 2.6) * 19 (quintic smooth) and weight 0.9 * (1 - smoothstep(0.55, 1, t / 3)).
- Hover dent: Gaussian exp(-d^2 / r^2) subtracted from the height, r = 3 * mouseRadius / 0.35 in world units, weight 0.7 * presence * mouseStrength * hoverSign (press = +1 dent down, lift = -1 push up, none = 0). The hover point is the ground intersection of the pointer ray and eases there with a spring (stiffness 90, damping 19); presence eases in at 0.35s, out at 0.6s.

## Tile shading (fragment)

- Tile space: ground rotated by `rotation` degrees, divided by tile 1.2 * tileSize; cell = floor, local = frac - 0.5. SDF is a rounded box: half extent (0.5 - gap/2) * mix(0.62, 1, on) (tiles start at 62% size and grow as they turn on), corner radius min(roundness * half, half); shape morphs from superellipse-square to circle with `shape` ("square" keeps the box-ish field, "round" switches uSquare to 0 which mixes toward the euclidean distance).
- Bevel: edge band width mix(0.04, 0.42, softness) * half (scaled up under heavy pixel footprint); the normal bends toward the edge over the band (theta up to ~45 deg scaled by softness), plus a dome bulge from `bulge` along the local radius. Large footprints (crowd) flatten the bevel and shade tiles by analytic area instead of the SDF.
- Lighting: two point lights orbit the target; per preset (split / backlit / overhead) each light has a base offset, orbit radius and orbit rates (split: (7, 4.2, -4) + (-8, 3.6, 3), overhead from above, backlit from behind); orbit phase advances at speed * 0.6; reach scales with camera distance; light level ramps 0.35 -> 1 with the intro. Falloff 1 / (1 + d^2 * 0.02). Specular lobe exponent mix(10, 90, gloss) with normalization, plus a wider sheen lobe (exp 8); fresnel = 0.04 + 0.96 * (1 - ndotv)^5; rim from a fixed back reflection direction; edge occlusion darkens bevels to 0.35.
- Dark mode (default): body = mix(luma(color), color, 0.35) + 0.02, lit at 0.25 base plus diffuse tinting by accent/secondary lights x14, strong colored speculars boosted on bevel edges, rim x fresnel, then occlusion. Final tonemap: 1 - exp(-color * 1.1).
- Light mode: body = mix(luma, color, 0.5) * 0.96, a fixed key direction shades it 0.7..1.05, lights tint the body up to 42%, white speculars x 2.4 * gloss, alpha equals tile coverage (no additive glow).
- Distance fade: alpha fades between range.x = far * 0.5 and range.y = far, far = min(depth * 3.2 * reach, area depth * 0.62) — the horizon melts out. Screen-edge fade: with fade > 0 the outer fade * 0.5 fraction of each border is feathered with smootherstep. brightness multiplies color; opacity multiplies alpha; output is premultiplied.
- Grain: two hashed cell noises (cell size = device pixel ratio) per frame add +-grain (x0.6 in light mode; x(0.25 + 0.75 * sqrt(luma)) in dark), frame index cycles mod 977 so it flickers like film.
- Reveal mask: while the reveal is running each cell turns on after a hashed delay (hash(cell) * 1.1) as the reveal radius sweeps past it: on = smoother((radius - distanceToOrigin - delay) / 1.6); off cells render at 62% size and full transparency.

## Camera & interaction

- Perspective camera, fov 0.8 rad, target the pulse origin, distance 8 / zoom, pitch 1.5 - tilt * 1.26 plus a pointer-driven offset, yaw a pointer-driven offset (yaw x 0.16, pitch x 0.05 rad). The look offsets spring toward (pointer - center) * 0.5 with stiffness 30, damping 11 — the whole scene leans after the cursor.
- Pointer tracking listens on window, converts to container-local pixels with an inside test; groundPoint() unprojects through the inverse view-projection onto the y=0 plane.
- Click (left button, target not inside a, button, input, textarea, select, label or [role="button"], pointer inside): spawns a ripple of strength 1.15 at the ground point under the cursor.
- Auto pulses: every (10 * pulseSpacing) / waveSpeed seconds a ripple of strength 1 spawns at the fixed origin (pulseOrigin "center") or at a random visible ground point (pulseOrigin "random", LCG-seeded so it is deterministic per session; random pulses fire 0.6x more often).

## Scheduling, reduced motion, lifecycle

- Intro: 3s total; the swell ramps in and lights come up over the same window; the reveal sweep takes 2.6s of it.
- prefers-reduced-motion: intro settles instantly, no pulses, no click ripples, no hover dent, no camera lean, clock frozen — the field renders as a static image; the loop still runs short settle tails after interactions.
- Self-sleeping loop: keeps animating only while unpaused movement exists or the hover presence / hover spring / camera look springs are still settling; otherwise the last frame stays on screen. Wakes on pointermove, pointerdown, pointer leave, visibilitychange, intersection becoming visible, ResizeObserver resizes and every prop change (a wake hook re-renders once).
- Resize: ResizeObserver on the container re-sizes the canvas and re-renders immediately.
- Unmount: cancel the frame, disconnect both observers, remove every listener, delete buffers, vertex array and program. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#120f17" | Base body colour of the tiles. |
| accentColor | string | "#ff4fb8" | First light colour: speculars and diffuse tint. |
| secondaryColor | string | "#3b6bff" | Second light colour. |
| tileSize | number | 1 | Tile size multiplier, clamped 0.2–5. |
| gap | number | 0.12 | Gap between tiles 0–0.6 (0 = touching). |
| roundness | number | 0.25 | Corner rounding 0–1. |
| softness | number | 0.5 | Bevel width 0–1. |
| bulge | number | 0.3 | Dome bulge of each tile 0–1.5. |
| rotation | number | 35 | Tile grid rotation in degrees. |
| gloss | number | 0.6 | Specular tightness/brightness 0–1. |
| waves | number | 1 | Ambient swell amplitude, >= 0. |
| waveScale | number | 1 | Swell spatial frequency, 0.1–5 (higher = tighter waves). |
| speed | number | 0.6 | Global animation speed multiplier, >= 0. |
| shape | "square" \| "round" | "square" | Distance-field shape of the tiles. |
| pulse | number | 1 | Ripple amplitude, >= 0 (0 disables auto and click pulses). |
| pulseSpeed | number | 0.45 | How fast ripple rings travel outward. |
| pulseSpacing | number | 1 | Interval between auto pulses, 0.2–6 (higher = rarer). |
| pulseWidth | number | 1 | Ring width of ripples, 0.1–5. |
| pulseOrigin | "center" \| "random" | "center" | Where auto pulses spawn. |
| brightness | number | 1 | Output brightness multiplier, >= 0. |
| lighting | "split" \| "backlit" \| "overhead" | "split" | Two-light studio preset. |
| tilt | number | 0.7 | Camera pitch 0–1 (0 = near top-down, 1 = near horizon). |
| zoom | number | 1 | Camera zoom, 0.3–4. |
| depth | number | 10 | Distance fade reach, 2–40. |
| grain | number | 0.12 | Film grain strength, >= 0. |
| fade | number | 0 | Screen-edge feather 0–1. |
| opacity | number | 1 | Canvas opacity 0–1. |
| intro | boolean | true | Plays the 3s scale-up + reveal sweep on mount. |
| mouseInteraction | boolean | true | Enables hover dent, camera lean and click ripples. |
| hoverEffect | "press" \| "lift" \| "none" | "press" | Cursor pushes tiles down, lifts them up, or nothing. |
| mouseStrength | number | 1 | Hover dent depth multiplier, >= 0. |
| mouseRadius | number | 0.35 | Hover dent radius, 0.02–2. |
| pulseOnClick | boolean | true | Clicking spawns a ripple. |
| detail | "low" \| "medium" \| "high" | "medium" | Mesh resolution (150 / 210 / 280). |
| lightMode | boolean | false | Bright studio look instead of the dark glossy one. |
| paused | boolean | false | Freezes animation (still renders prop changes). |
| dpr | number | - | Overrides the device pixel ratio cap (2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of AcidSquares.jsx and AcidSquares.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the swell, auto pulses and grain run continuously by default; clicking spawns a ripple at the cursor's ground point; pressing dents the tiles under the cursor and lift raises them; the camera leans toward the pointer; intro sweep grows tiles outward from the origin; shape round/square, lighting split/backlit/overhead, tilt and zoom re-frame the scene; tileSize/gap/roundness/softness/bulge/rotation/gloss reshape the tiles; lightMode flips to the bright look; prefers-reduced-motion renders a static settled field with no pulses; paused freezes without breaking resize renders; unmount leaves no listeners, observers, frame loop or GL objects; the canvas never overflows the container at 375 / 768 / 1440 wide.
