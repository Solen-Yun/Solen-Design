Implement the "Orb" component from zero: a glowing ring of swirling colour that breathes — its rim is a soft light band whose radius wobbles with 3D simplex noise, a bright orbiting light rides along the rim with a comet trail behind it, and the whole body swells, brightens and tilts toward the cursor. Hovering near the ring wakes it up (brighter, rotating); the rim soft-stretches toward the pointer; clicking inside it fires a pulse that echoes outward as a fading ring while the orb bounces on a spring. A tilt option projects the whole field onto an inclined plane for a pseudo-3D look. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+ + CSS + WebGL2, two files only: Orb.jsx (entry, springs, GLSL) and Orb.css. No runtime dependencies. No iframe.
- Root is `<div class="orb-container">`: position relative, z-index 0, width 100%, height 100%, overflow hidden; it receives className/style. Inside is `<canvas class="orb-canvas" aria-hidden="true">`, absolute inset 0.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. Geometry is one full-screen triangle (vertices −1,−1 / 3,−1 / −1,3) with the attribute bound to location 0 ("aPosition"). If the context or program fails, the component stays blank.
- Canvas size = container client size × DPR, where DPR = min(dpr prop or devicePixelRatio, 2). A ResizeObserver re-measures; changing the dpr prop re-runs the resize.
- Fragment shader, one program. uv = (fragCoord − half resolution) / min(resolution.x, resolution.y) × 2 × uScale. When tiltX/tiltY are non-zero, uv is ray-projected onto an inclined plane (focal length 3.2, plane normal from the two tilt angles, rays that miss the plane render nothing), then rotated by uRotation.
- Colour handling: every prop colour is parsed through a 1×1 offscreen 2d-canvas probe (any CSS colour syntax; unparsable → black) with a Map cache; the three colours are then rotated by hue degrees around the YIQ chroma axes.

## Ring shading

- Wobble rim: n0 = snoise3(uv×0.65, time×0.5) × 0.5 + 0.5; rim radius r0 = 0.8 ± 0.04 × wobble. Body light v0 = 1 / (1 + d0 × 10 / glow) (d0 = distance to the rim), masked inside smoothstep(r0×1.05 → r0). bleed ≥ 0.04 widens the inner fade and the soft outer body; a dark background keeps the ring tight, a light background bleeds it further (fade driven by background luminance).
- Swirl: the base colour mixes color1 → color2 by cos(ring angle + swirl), where swirl advances at 2× speed (spiked 3.5× by the intro kick and click kicks). The third colour fills the deep centre.
- Orbiting light: a head sits on the rim at angle uOrbit; its glow = 1.5 / (1 + d² × 5) × highlight, times a tight rim falloff. The trail is the angular lag behind the head: smoothstep(0, 0.35, lag) × exp(−lag × 2.6 / trail) × 0.6 — trail 0 disables it, larger values stretch the comet tail. Head bloom leaks outside the rim (1 / (1 + (len − r0)² × 160 / glow)).
- Echo pulse: after a click, a thin ring at radius r0 + echo × 0.55 glows with (1 − echo)² while echo eases 0 → 1 over 1.2 s.
- Heat: the rim band feeds a cubic heat term that pushes the colour toward a white blend, amplified near the cursor.
- The dark path composites additively and brightens with awake/near states; the light path inks toward the background colour; the branch is picked by background luminance (0.299/0.587/0.114). Output alpha = max colour channel, premultiplied as rgb × alpha², with a ±0.5/255 hash dither.

## Motion & interaction

- Pointer → orb space: the pointer is converted to ring coordinates through the same tilt/rotation maths, so reach and click radius stay honest under tilt.
- Hover: proximity zone = smoothstep of (1.45 − distance) / 0.4; hover state eases toward it (rate 1/0.16 s) and multiplies hoverIntensity to brighten the whole orb (uAwake). The rim stretches toward the pointer: a critically-ish damped spring (stiffness 70, damping 7) drives a reach vector of length 0.075 × hoverIntensity × aim toward the pointer direction — a soft tendril. near eases at 1/0.12 s and boosts the heat/awake terms.
- Rotation: rotateOnHover adds 0.3 rad/s × hover to the field rotation. The orbiting light: with followCursor on and the pointer near, its angle eases toward the pointer's bearing (rate 1 − exp(−6dt)); otherwise it drifts backward at the time step — always orbiting one way.
- Breathing: a pulse spring (stiffness −170·pulse − 11·pulseSpeed) modulates uScale so clicks make the whole orb bounce. clickPulse pointerdown inside the ring (distance ≤ 1) adds 0.9 pulse speed, a 2.2 swirl kick and restarts the echo. forceHoverState pins the hover state to 1 (for thumbnails/attract mode).
- Intro: reveal runs 0 → 1 over 1.1 s with a 2.5 swirl kick, eased smoothstep; scale blooms from a cubic back-swing during the reveal. opacity scales the final alpha.
- Frame loop: continuous rAF while the container is on screen and the tab visible; `paused` renders exactly one settled frame and stops. IntersectionObserver + visibilitychange suspend/resume; prop changes wake and re-render once.

## Lifecycle

- All props live in a ref refreshed every render — every option applies live without remount.
- Reduced motion: time freezes (no breathing/swirl/orbit drift, no intro, no click pulse, no rotation), but hover reach and rendering still work and `paused` still settles one frame.
- Unmount: cancel the frame, disconnect observers, remove all window/document listeners, delete program/buffer/VAO and drop the WebGL context when the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#9c43fe", "#4cc2e9", "#101499"] | Three colours: rim start, rim end (swirled together) and the deep centre. Any CSS colour syntax. |
| hue | number | 0 | Rotates all three colours around the colour wheel, in degrees. |
| backgroundColor | string | "#000000" | Css colour behind the orb; its luminance picks the dark or light shading path. |
| size | number | 1 | Orb scale, 0.1–3; higher is smaller on screen. |
| glow | number | 1 | Rim light falloff, 0.1–5; higher spreads the glow further out. |
| bleed | number | 1 | How far the body fades inward/outward, 0–4. |
| wobble | number | 1 | Noise amplitude of the wobbling rim radius, ≥ 0. |
| highlight | number | 1 | Brightness of the orbiting light and its trail, ≥ 0. |
| trail | number | 1 | Comet-tail length behind the orbiting light, ≥ 0; 0 disables it. |
| tiltX | number | 0 | Plane tilt around the x axis, −70–70 degrees. |
| tiltY | number | 0 | Plane tilt around the y axis, −70–70 degrees. |
| speed | number | 1 | Time scale of the breathing noise and swirl. |
| hoverIntensity | number | 1 | Multiplier on hover brightening, rim stretch and wake. ≥ 0. |
| rotateOnHover | boolean | true | The whole field slowly rotates while hovered. |
| forceHoverState | boolean | false | Pins the hover/awake state on permanently. |
| followCursor | boolean | true | The orbiting light steers toward the cursor when it is near. |
| clickPulse | boolean | true | Clicking inside the ring fires the echo pulse and a size bounce. |
| intro | boolean | true | Plays a 1.1 s bloom-and-kick reveal on mount. |
| opacity | number | 1 | Overall canvas alpha, 0–1. |
| paused | boolean | false | Freezes time and renders one settled frame. |
| dpr | number | - | Overrides the device pixel ratio for the canvas (capped at 2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Orb.jsx and Orb.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the rim wobbles organically and the swirl keeps mixing the two rim colours; the orbiting light rides the rim with a comet trail whose length follows trail; the rim visibly stretches toward the cursor and relaxes when it leaves; hovering brightens and (with rotateOnHover) slowly rotates; clicking inside pulses an echoing ring and bounces the orb; size/glow/bleed/wobble/highlight/trail/opacity all apply live; hue rotates the palette; tiltX/tiltY project a believable inclined plane and pointer maths stay aligned; light backgrounds switch to the light shading path; paused freezes exactly one frame; forceHoverState works for static thumbnails; reduced motion still renders but no longer breathes or pulses; canvas tracks its container at 375 / 768 / 1440 wide without overflow; unmount leaves no listeners, observers or frame loop; same-page instances are independent.
