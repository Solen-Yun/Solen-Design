Implement the "Grainient" component from zero: a full-bleed flowing gradient field — a linear or radial ramp through up to eight colours mixed in perceptual Lab space, warped by drifting value-noise so it flows like slow silk, finished with a live film-grain pass you can stir with the cursor: dragging pushes the flow locally, clicking spins a vortex into it. A light theme re-derives the ramp as a paper-friendly tint set. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Grainient.jsx (entry, pointer state, both shaders) and Grainient.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="grainient-container">` — position relative, width 100%, height 100%, overflow hidden, accepting className, style and extra DOM props — wrapping a single `<canvas class="grainient-canvas" aria-hidden="true">` absolutely filling it. The container must be sized by the parent.
- WebGL2 context with alpha: false, antialias: false, depth/stencil: false. Two programs share one fullscreen-triangle vertex shader: FIELD renders the gradient into a half-resolution RGBA8 texture; COMPOSITE draws that texture at full resolution with the grain pass on top. Context or program failure renders nothing and never throws.
- Colour pipeline: colour strings are parsed with a 1×1 canvas fill probe (cached), converted sRGB → Lab on the CPU, uploaded as an 8-slot ramp; the shader mixes neighbouring stops in Lab and encodes back through sRGB at the end, which keeps blends free of muddy bands. Fewer than 2 colours duplicate the first; more than 8 are dropped.

## The gradient field

- Coordinates: p = (uv − 0.5) × (aspect, 1). Up to 24 cursor "stirs" displace p locally (each a gaussian of σ² 0.045 pushing along its recorded velocity, weighted by a life envelope × the stir prop × 0.05, velocity capped for huge swipe speeds), and up to 4 click "twirls" rotate p around their centre by up to ±2.4 rad with a (1 − k)² envelope over a 2.6 s life (radius grows 0.16 → 0.26 over 0.5 s).
- Warp: q = p / scale; a 2-octave value-noise drift field (smooth quintic interpolation, offset by `variation`'s seed) returns a −0.5–0.5 vector scaled ×1.1 + ×0.55, applied as p + drift × flow × scale × settle. The linear type also advects q perpendicular to the gradient direction with time × 0.45; the radial type slowly rotates the sample space (0.35 rad/s × time).
- Coordinate: linear → dot(warped, dir) / extent + 0.5, with dir from `angle` degrees (sin, cos) and extent = aspect·|sin| + |cos| so the ramp always spans the canvas; radial → 1 − length(warped) × 1.1.
- Bands: when bands > 1 the coordinate repeats (× bands) with alternating cycles mirrored so the ramps join seamlessly. Segment blending: shaped smoothstep between neighbouring stops with edge = max(softness × 0.5, screen-space fwidth × 0.75) — softness 0 gives crisp color separations, 1 fully smooth.
- Silk shading (0–1): a pseudo-normal is built from the field's spatial gradient (finite differences) modulated by sin(π × coordinate × bands); a light from the direction perpendicular to the gradient shades the Lab colour by (1 + (diffuse × 0.35 + max(diffuse,0) × diffuse × 0.6) × silk) — ridges catch light like brushed satin.
- Contrast pivots Lab L around 0.55 (0.2–2); saturation scales a/b (0–2). Intro (1.6 s): the field reveals radially from the centre (reveal = smoothstep(intro × 1.5 − dist × 0.6), mixed from the first stop) while the flow amplitude settles in with a smoothstep ease.
- Light mode: the CPU re-derives the ramp for paper — stops whose L is within 0.1 of the first stop count as blanks and lift toward near-white; the remaining tints reverse order and every entry lightens (L + (1 − L) × 0.2) and desaturates (ab × 0.8), so the same palette prints as a soft tinted paper.

## Grain pass

- COMPOSITE adds film grain over the field: a fine per-pixel hash plus a coarse clumped noise sampled at pixel / grainSize, mixed by clamp(grainSize − 1, 0, 1) × 0.8 — grainSize 1 is pure fine grain, larger values clump into visible specks (0.5–4). Grain strength × amount (0–0.5) × (0.45 + 2.2 × luma × (1 − luma)), so midtones grain the most. When grainAnimated the grain reseeds at 24 fps; otherwise it is static.

## Interaction, loop & lifecycle

- Pointer: the raw pointer eases toward a smoothed pointer (rate 1/0.06 s); its velocity (aspect-corrected) drives the stir trail — while the pointer moves faster than 0.02 inside the container (and interactive is on, not reduced), a stir sample follows the head, ramping in over 0.06 s and then aging out over 1.3 s; at most 24 samples. Clicking (clickSwirl on, not reduced) spawns a twirl vortex at the click, direction chosen by the pointer's current horizontal velocity; at most 4 live.
- The rAF loop keeps running while motion is allowed (not reduced and (speed > 0 or grainAnimated)), the intro is playing, or stirs/twirls are alive; otherwise it sleeps and wakes on pointer, resize, visibility or prop changes. The field clock advances at dt × speed × 0.16.
- Resize: DPR = min(devicePixelRatio, dpr prop or 1, 2); canvas at full ratio, field texture at half. ResizeObserver + IntersectionObserver (renders only while visible) + visibilitychange reset the clock and wake the loop; every render also wakes once so prop edits apply immediately.
- Reduced motion: the field clock freezes and new stirs/twirls are ignored; the current frame stays. Unmount: cancel the frame, disconnect observers, remove listeners, delete the field texture/framebuffer, VAO and both programs, and lose the GL context if the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | ["#120f17", "#2a0f0a", "#9a3412", "#f97316", "#fed7aa"] | Gradient stops (any CSS colours), mixed in Lab; up to 8. |
| type | "linear" \| "radial" | "linear" | Gradient geometry: an angled sweep or a slow-turning radial bloom. |
| angle | number | 55 | Direction of the linear gradient in degrees. |
| bands | number | 1 | Repeat count of the ramp, 1–8; cycles alternate mirrored. |
| speed | number | 1 | Field clock speed; 0 freezes. |
| flow | number | 0.8 | 0–3: strength of the noise drift warping the field. |
| scale | number | 1 | 0.25–3: zoom of the warp pattern. |
| softness | number | 1 | 0–1: colour-stop blending; 0 gives crisp separations. |
| silk | number | 0.35 | 0–1: satin ridge lighting. |
| grainAmount | number | 0.08 | 0–0.5: film grain strength. |
| grainSize | number | 1.2 | 0.5–4: grain clump size; 1 is fine grain. |
| grainAnimated | boolean | true | Reseeds the grain at 24 fps. |
| contrast | number | 1 | 0.2–2: Lab lightness contrast around 0.55. |
| saturation | number | 1 | 0–2: Lab chroma multiplier. |
| variation | number | 0 | ≥ 0: seed offset so instances differ. |
| interactive | boolean | true | Enables cursor stirring. |
| stir | number | 1 | 0–2: strength of the cursor's push on the flow. |
| clickSwirl | boolean | true | Clicking spins a vortex into the field. |
| intro | boolean | true | Plays the 1.6 s radial reveal. |
| lightMode | boolean | false | Re-derives the ramp as lifted, desaturated paper tints. |
| dpr | number | - | Overrides the device pixel ratio (clamped to 2). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of Grainient.jsx and Grainient.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the linear ramp spans corner to corner at any aspect; radial blooms from centre and slowly turns; custom palettes (2–8 stops) blend in Lab with no banding; bands 2–8 repeat with seamless mirrored joins; softness 0 vs 1 visibly changes stop edges; silk lights the ridges; dragging stirs visible swirls that fade in ~1.3 s; clicking spins a vortex decaying in ~2.6 s; grain size 1 vs 3 changes clumping; grainAnimated off freezes the speckle; lightMode lifts the same palette onto paper; reduced motion gives a still frame; resize keeps the field crisp at 375 / 768 / 1440; scroll-away/tab-away sleep the loop; unmount leaves no listeners, observers or GL objects; two instances with different `variation` differ.
