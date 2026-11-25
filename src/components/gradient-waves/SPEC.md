Implement the "GradientWaves" component from zero: a full-bleed canvas of lit satin ocean waves rolling in from a hazy horizon — a raymarched heightfield rendered in one WebGL2 fragment shader, tinted by horizon/wave/crest colours, with a sun that follows the cursor and a swell that rises where you click. A light theme re-renders the water as layered ink densities on paper. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GradientWaves.jsx (entry, camera/pointer state, shader) and GradientWaves.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="gradient-waves-container">` (plus optional className, with style applied) — position relative, width 100%, height 100%, overflow hidden. The component creates its own `<canvas class="gradient-waves-canvas">` and appends it to the root; the canvas is absolutely positioned, filling the container. The root must be sized by the parent. `backgroundColor` "transparent" (default) keeps the canvas alpha-composited over whatever is behind.
- WebGL2 context: alpha true, premultipliedAlpha true, antialias false, depth/stencil false, powerPreference "high-performance". One program draws a fullscreen triangle. Context or program failure removes the canvas and never throws.
- Camera: eye fixed at height 30 world units; vertical fov = (π / 2.3) / zoom. Each pixel's ray is built by rotating a forward vector radially away from the screen centre by fov × |uv| (fisheye-style), then pitched by tilt + look.y and yawed by look.x. `tilt` is the depression angle in degrees, clamped 10–85 (default 64 — a steep, looking-down-the-horizon view). Parallax: while the pointer is inside, the look target = ((px − 0.5) × parallaxStrength × 0.35, (py − 0.5) × parallaxStrength × 0.18), eased at rate 1/0.45 s and back to 0 when the pointer leaves.
- Waves: the surface height at (x, y) is (sin(m·fx) + sin(n·fy)) × amplitude + height, where fx = waveScale / 7, fy = waveScale × waveRatio / 3, m bends with a slow swell phase (period 20, `swell` strength) and n advances with time and wobbles by `turbulence` (cross waves + twist). time advances at dt × speed. Up to 4 click swells add gaussian bumps of width 8 (elongated ×3.5 along y): lift = amplitude × 2.8 × envelope, envelope = (1 − exp(−age/0.25)) × (1 − life)^1.6 over a 3.2 s life, and the whole bump drifts 12 units/s toward the viewer, so a click raises a wave that rolls at the camera.
- Raymarch: from the eye toward the ray, up to `quality` steps (low 56 / medium 84 / high 120), gap tolerance 0.002·dist + 0.01, adaptive stride = 0.9 / max(1, slope/1.5) where slope is estimated from amplitude, waveScale, swell, turbulence and live swell peaks — choppier seas take smaller steps.

## Shading

- Crest factor = (h − height) / (2 × amplitude) mapped 0–1; body colour mixes waveColor → crestColor (50% at the crest). Normal comes from the surface gradient scaled by (1 + 1.5 × relief); diffuse = dot(normal, sun) × 0.5 + 0.5; lightness = mix(1, smooth diffuse², relief). Sheen = pow(dot(normal, halfVector), 14) × sheen × (0.4 + 0.6 × relief); rim = pow(1 − dot(normal, view), 3).
- Sun direction: altitude fixed at 0.52 rad, azimuth = lightAngle degrees plus the pointer's horizontal steer (steer.x × mouseStrength × 2 rad), altitude lowered by vertical steer × mouseStrength × 0.7; steer eases at rate 1/0.6 s. So moving the mouse drags the light across the satin.
- Dark mode: lit = mix(horizonColor × 0.18, body, lightness) + crestColor × sheen; rim tints 15% toward horizonColor × relief; fog haze = 1 − exp(−dist / (fogDepth × 5)) blends everything into horizonColor, output × 0.85 × brightness; alpha fades to 0 in the haze so the horizon dissolves. Film grain (hash ± 0.5 × grain, reseeded per frame) modulates alpha; `grain` accepts a number or true (→ 0.05).
- Light mode: the water becomes ink — hue = mix(horizon, body, 0.35 + 0.65 × lightness), density from 0.16 (lit) to 0.9 (shadow), reduced by sheen and haze; alpha = fade × density × brightness, i.e. darker troughs print heavier ink on the paper behind.
- backgroundColor: parsed like any CSS colour (canvas fillStyle probe); when set, the shader blends the scene over it opaquely (alpha 1), useful for printing an exact frame.
- Intro (2.6 s): the scene fades in (smoothstep of the first 22%), wave crests grow from a 160-unit wavelength down to 3 (ease-in-out across the intro), and the swell distortion settles to full strength over the last quarter — waves appear to organize from a flat distant sheet.

## Interaction, loop & lifecycle

- Click swell: left-click inside the container (not on an a/button/input/textarea/select/label/[role="button"], not under reduced motion) casts the ray to the water plane (ground height = the `height` prop) and spawns a swell there; at most 4 live, the oldest drops.
- The rAF loop renders while anything is transient — the camera is still easing, the sun steering, swells alive, intro playing — or continuously when animation is allowed (not paused/reduced, speed > 0); after 4 quiet frames it sleeps and wakes on pointer move/leave, visibility change, resize or prop changes. dt clamped to 0.1 s.
- Resize: pixel size = css size × min(devicePixelRatio, dpr prop) (dpr defaults to 2); the canvas only resizes while the loop is awake (it re-fits at the top of each rendered frame). ResizeObserver measures the container; IntersectionObserver gates rendering while off-screen.
- Reduced motion: time freezes, swells and intro are skipped; the scene renders as a still frame that still responds to prop changes.
- Unmount: cancel the frame, remove listeners/observers, delete program/buffer/VAO, lose the GL context and remove the canvas element. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| horizonColor | string | "#5227FF" | Colour of the haze and horizon (any CSS colour). |
| waveColor | string | "#FF9FFC" | Base satin colour of the wave bodies. |
| crestColor | string | "#FFFFFF" | Colour mixed into wave crests and sheen. |
| backgroundColor | string | "transparent" | Opaque backdrop behind the water; "transparent" keeps the page showing through. |
| lightMode | boolean | false | Ink-on-paper rendering: wave shadows print as ink densities. |
| speed | number | 0.4 | Wave animation speed; 0 freezes the sea. |
| amplitude | number | 2.5 | Wave height, ≥ 0. |
| waveScale | number | 0.6 | Spatial frequency of the waves, ≥ 0.01. |
| waveRatio | number | 0.9 | Cross-wave frequency ratio, ≥ 0.01. |
| swell | number | 35 | Long-field bend of the wave train. |
| turbulence | number | 20 | Cross-wave chop and twist. |
| tilt | number | 64 | Camera depression angle in degrees, 10–85. |
| zoom | number | 1 | Zoom (larger = narrower fov), ≥ 0.05. |
| height | number | 5.5 | Rest sea level above zero. |
| fogDepth | number | 15 | Distance scale of the horizon haze, ≥ 0.5. |
| relief | number | 1 | 0–1: normal shading strength (slope lighting + sheen). |
| lightAngle | number | 120 | Sun azimuth in degrees; the pointer steers it live. |
| sheen | number | 0 | Specular glitter strength on wave slopes. |
| brightness | number | 1 | Output multiplier, ≥ 0. |
| opacity | number | 1 | 0–1: master alpha of the canvas. |
| grain | number \| boolean | 0.2 | Film grain amount; true means 0.05. |
| quality | "low" \| "medium" \| "high" | "medium" | Raymarch step budget: 56 / 84 / 120 steps. |
| intro | boolean | true | Plays the 2.6 s organization intro. |
| mouseInteraction | boolean | true | Enables parallax look and sun steering. |
| parallaxStrength | number | 0.5 | ≥ 0: how far the camera look follows the pointer. |
| mouseStrength | number | 0.6 | 0–1: how strongly the pointer steers the sun. |
| swellOnClick | boolean | true | Clicking raises a swell that rolls toward the viewer. |
| paused | boolean | false | Freezes the sea while still rendering. |
| dpr | number | 2 | Canvas pixel-ratio cap (≥ 0.5, combined with the device ratio). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of GradientWaves.jsx and GradientWaves.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: waves roll toward the camera and dissolve into a hazy horizon; custom horizon/wave/crest colours tint correctly and any CSS colour parses; the sun follows the pointer and sheen rides the slopes when sheen > 0; clicking raises a swell that travels in and decays in ~3.2 s; tilt/zoom reframe the camera; quality low/medium/high changes smoothness; lightMode prints ink waves on a light page; backgroundColor composites opaquely; grain true/number works; reduced motion renders a still sea; paused freezes; 375 / 768 / 1440 widths stay clean with no overflow; scroll-away/tab-away sleep the loop; unmount removes the canvas, listeners and GL context; two instances are independent.
