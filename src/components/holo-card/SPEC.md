Implement the "HoloCard" component from zero: a collectible trading card whose face is a real holographic foil — as the card tilts toward the pointer, a light source sweeps across it, spinning the foil pattern through spectral colours, flashing hexagonal glitter facets and white specks, with a soft sheen and glare on the plastic. The card physically tilts with springs, scales up slightly on hover, casts a moving blurred shadow, and can flip 180° to a printed back face. Eight built-in foil patterns define its character. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS 3D + WebGL2, two files only: HoloCard.jsx (entry, spring physics, input, shader setup) and HoloCard.css (rotor, faces, shadow). React >= 18; no runtime dependencies. No iframe.
- Root is an inline-block `div.holo-card` sized by `--hc-w` (width prop, max-width 100%) with `aspect-ratio: var(--hc-ratio)` (the loaded image's natural ratio, default 63/88), rounded by `--hc-radius`. It is the interactive surface: role "button" with tabIndex 0 and aria-pressed when a back face exists, otherwise role "img"; aria-label from alt; data-ready fades the canvas in over 0.3s once the art texture uploads; data-flippable sets the pointer cursor and a focus-visible outline (2px, offset 6px).
- Inside: an optional shadow span (absolute, inset 10% 7% -4%, black 42% blur 26px) whose transform is driven per frame (counter-translated by tilt × 0.7px, scaled 0.9 + (lift−1) × 1.5); and a 3D rotor (preserve-3d) transformed every frame to `perspective(1100px) scale(lift) rotateX(tiltX) rotateY(tiltY + flip)`. The rotor holds the front face (the art `<img>` under the WebGL canvas) and, when a back image is provided, a back face pre-rotated 180° — both with backface-visibility hidden and rounded overflow hidden. The canvas is the foil layer painted over the art; the img beneath also stands alone while the texture loads (shader falls back to a dark card body).
- WebGL2 (alpha, premultipliedAlpha, antialias false), DPR min(devicePixelRatio, 2). One fullscreen triangle and one program; if context/shader/program fail the card still shows the plain img with CSS tilt only (rotor transform is applied regardless).

## Foil shader

- The fragment shader treats the card as a tilted plane: it builds rotation matrices from the live tilt angles, computes the view vector from a virtual eye at distance (1100px ÷ card width) and a lamp positioned at the light point (mapping pointer/idle position into a light above the card), and derives a halfway vector, a sweep vector, sheen (pow 10) and a tight shine (pow 80).
- The card shape is an antialiased rounded-rect SDF (radius in px normalized by card width); a `frame` band (frame/100 of the card, pixel-smoothed) suppresses foil and sparkles near the rim so a clean border remains. Art is sampled in linear space (pow 2.2), output re-encoded with 1/2.2.
- Eight foil pattern functions produce a { mask, angle, jitter, facet } field at a scale controlled by the scale prop: "bursts" (concentric dot rings + alternating radial band slots), "stars" (4/5-pointed stars scattered with jittered centers), "shards" (Voronoi cracked-plate with per-cell shine), "cosmos" (random rings and orbit dots with fine speckle), "rainbow" (near-full coverage with per-tile hash noise), "swirl" (60-ray sunburst around an off-center point), "glitter" (dense random square flakes), "gold" (coarse flakes over an etched-line base, tinted metallic gold mixed 65% into the spectral hue).
- Colour: a fixed six-stop spectral hue ramp (blue → cyan → green → yellow → orange → red) phases with the light sweep projected onto each pattern's own angle, a fixed diagonal, and per-element jitter; layered presets (shards, rainbow, swirl, gold) screen-blend into the art with a banding modulation, the others lerp over the art. A facet-glint (pow 24) adds metal flashes; sparkles add a layer of rotated hexagonal flakes (per-facet normals flashing with the halfway vector, tinted by the sweep) plus fine white specks (pow 10), both scaled by edgeSparkle and the awake factor (foil wakes from 0.2 to full as tilt magnitude grows). Sheen adds foil-coloured ambient, glare adds neutral highlights.
- Foil colour prop is resolved through a canvas fillStyle round-trip (invalid input falls back to a light silver) and converted sRGB→linear.

## Motion & interaction

- Pointer enter/move/down map the pointer to 0–1 card space (touch moves without pressed buttons are ignored); tilt targets are ±tiltMax degrees around the pointer position (x from y, y from x), the light target follows the pointer, and the lift target is hoverScale. Leaving returns all targets to rest (0 tilt, default light 0.36/0.26, lift 1).
- Idle drift: when enabled, unhovered and motion is allowed, a per-instance clock drives gentle sine tilts (0.28/0.4 × tiltMax) and a wandering light so the foil shimmers on its own.
- All channels are springs (tilt stiffness 150 damping 16, light 220/30, lift 320/30, flip 170/20) integrated at 240Hz sub-steps; the flip spring drives rotor rotateY toward 180 when flipped. The frame loop stops after 0.3s of calm when unhovered and idle drift is off, and wakes on any input, prop change, image load, resize (ResizeObserver on the canvas), or visibility regain (IntersectionObserver).
- Reduced motion: pointer/idle targets stay at rest (no tilt, no drift), the flip snaps instantly to its side, and the sparkle/light response still renders at the settled pose.
- Clicking (or Enter/Space on the focused card) toggles the flip when a back image is provided; clicks do nothing otherwise. Unmount cancels the frame, disconnects observers, deletes texture/buffer/program. Same-page instances are independent (own canvas, springs and clock).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | - | Front art image; its natural ratio sets the card's aspect ratio. |
| backImage | string | - | Printed back face; providing it makes the card clickable and flippable. |
| alt | string | "" | Accessible label for the card. |
| preset | "bursts" \| "stars" \| "shards" \| "cosmos" \| "rainbow" \| "swirl" \| "glitter" \| "gold" | "bursts" | Foil pattern. |
| intensity | number | 0.85 | Foil strength, 0–1. |
| scale | number | 1 | Pattern scale multiplier, 0.25–4. |
| edgeSparkle | number | 0.8 | Glitter flake and speck sparkle strength, 0–1. |
| frame | number | 4 | Foil-free border width, in % of the card (0–20). |
| glare | number | 0.5 | Neutral plastic glare strength, 0–1. |
| foilColor | string | "#e2e6ec" | Base foil colour; invalid values fall back to silver. |
| width | number | 320 | Card width, in px. |
| radius | number | 14 | Card corner radius, in px. |
| tiltMax | number | 14 | Maximum tilt toward the pointer, in degrees (0–45). |
| hoverScale | number | 1.04 | Hover scale-up, 0.8–1.3. |
| idle | boolean | true | Shimmer drift when unhovered. |
| shadow | boolean | true | Renders the moving blurred shadow. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of HoloCard.jsx and HoloCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the foil colours sweep with pointer-driven light and tilt on all eight presets; glitter flakes flash as facets cross the halfway vector and specks sparkle near the rim band; the card tilts with springy overshoot, scales on hover, and the shadow leans opposite; idle drift shimmers unhovered and stops when idle is off; the card flips 180° on click/Enter/Space with the back face showing and aria-pressed toggling; a missing WebGL context degrades to the plain tilted card; an unloaded image shows the dark card body and the canvas fades in when the texture lands; invalid foilColour falls back to silver; reduced motion freezes tilt/drift and snaps flips; the frame loop sleeps when settled; unmount leaves no observers, listeners or GPU objects; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
