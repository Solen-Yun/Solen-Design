Implement the "LineWaves" component from zero: a field of fine hairline waves flowing like silk — hundreds of anti-aliased lines bent by a domain-warped sine field, their hues cycling through a three-colour palette — while a soft band of light drifts along them like moonlight on water; the cursor pushes the lines with a lens, clicks drop expanding ripples into the field, and a light-mode variant prints the lines as ink for bright pages. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: LineWaves.jsx (entry, pointer/ripple state, single program) and LineWaves.css (container class line-waves position relative 100% × 100% overflow hidden; canvas class line-waves__canvas absolute inset 0 aria-hidden). React >= 18; no runtime dependencies. No iframe.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance; missing context or shader compile failure renders nothing (compile errors are logged once). Pixel ratio = min(devicePixelRatio, maxDevicePixelRatio clamped 0.5–3, sqrt(2.4e6 / (cssWidth × cssHeight))) — a 2.4-megapixel budget. One fullscreen triangle from gl_VertexID; one fragment program, precision highp float.
- Context loss is prevented, halts the loop, and restoration rebuilds via a generation state bump (intro only plays on the first generation).

## Field & lines

- Space: p = rotated (by `rotation` degrees, default −33) (gl_FragCoord − 0.5·resolution) / resolution.y. Domain warp: bend(p, t) = three summed sine octaves (frequencies 0.55/1.3/2.3, phase drifts with time at 0.4/0.33/0.37) scaled by warpIntensity (clamped 0–3) × warpScale (clamped 0.2–4) × 0.46 — silky, slowly travelling folds.
- Lines: phi = (p.y + bend) × lineCount (clamped 2–400); pixel-exact anti-aliasing via fwidth: coverage is the integral of the SDF across the pixel, switching to a density average when lines crowd (smoothstep(0.18, 0.5, fwidth)); lineWidth (clamped 0.25–12) is in device px × pixel ratio and widens ×(1.5→0.6) inside the light band; per-line brightness varies ±45% by a hash of the line index (mixed 45%).
- Palette: tint = palette(palette coordinate = y × 0.3 + p.x × 0.2 + cycle), a cyclic 3-stop gradient color1 → color2 → color3 → color1 (each parsed from hex 3/6 or rgb(); fallback white); cycle advances at speed × colorCycleSpeed × 0.05 per second.

## Light band (the river)

- A highlight band (highlight clamped 0–1) rides the field: a main Gaussian lobe whose centre wanders with two sine drifts plus a second companion lobe at ×0.7 weight offset by a slow phase, widths ∝ highlightWidth (clamped 0.2–5); when folds compress (fwidth-based fold factor) a second light source appears along the compressed ridges at ×0.9; a moving value-noise shimmer modulates the band.
- The band drives: line brightness 1 → 0.07 + 0.93 × band, line width boost, and in dark mode the halo term exp(−dist / (2.2 × pixel)) × glow.

## Pointer & ripples

- Lens: cursor position eased at 1 − exp(−dt × 10) once tracked; a Gaussian of radius 0.2 pulls p.y toward the cursor line by (p.y − mouse.y) × lens × presence × influence × 0.16 (influence clamped 0–3) and adds up to 0.9 extra brightness at the centre. enableMouseInteraction off or reduced motion disables tracking; presence eases out at 1 − exp(−dt × 5).
- Ripples: click (clickRipple on, reduced motion off) drops an expanding bump — radius = age × 0.6, Gaussian bump displaces p.y by x·exp(−x²) × 0.07 × fade and adds ring brightness ×0.6; fade = exp(−age × 1.3) × smoothstep(0, 0.12, age), life 2.6 s; up to 4 concurrent (oldest dropped).
- Intro: a left-to-right reveal sweep over 1.8 s (cubic-eased; warp ramps 0.25 → 1 with it); plays only on first mount. edgeFade (clamped 0–1) multiplies a smootherstep mask on all four edges; a fixed blue-noise dither grain is always applied.

## Output modes

- Dark: strength = (coverage + halo) × thread × light × brightness × reveal × edge; colour = tint × strength × opacity clamped, premultiplied with alpha = max channel. Light mode: the palette colour is chroma-normalised into ink (hue × 0.56 + 0.06, falling back to dark 0.08 grey for near-neutral tints), alpha = (coverage + halo × 0.35) × thread × light × brightness × reveal × edge × 0.78 × opacity clamped — crisp ink hairlines for bright pages.

## Timing & lifecycle

- time starts at a random value in 0–60 so same-page instances desync; advances dt × speed × 2.5 (×0.25 under reduced motion); cycle advances as above. dt clamped to 0.05 s.
- Frame loop self-sleep: busy while speed > 0 (non-reduced), reveal < 1, presence easing, ripples alive, or the cursor is tracked; otherwise it stops and wakes on pointermove, clicks, resize (ResizeObserver, applied at the next frame start), visibilitychange or re-entering the viewport (IntersectionObserver).
- Listeners: window pointermove/pointerdown/pointerup/pointercancel (passive; non-mouse pointerup counts as leaving), documentElement pointerleave.
- Unmount: cancel the frame, disconnect both observers, remove all window/document listeners and canvas context listeners, delete the VAO and program when the context is not lost. Same-page instances are independent. A layout effect wakes on every prop change so settings apply immediately.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color1 | string | "#ffffff" | First palette stop; hex 3/6 or rgb(). |
| color2 | string | "#ffffff" | Second palette stop. |
| color3 | string | "#ffffff" | Third palette stop. |
| colorCycleSpeed | number | 1 | Speed of the palette cycle along the field. |
| speed | number | 0.3 | Wave travel pace, floored at 0. |
| lineCount | number | 72 | Number of lines, clamped 2–400. |
| lineWidth | number | 1.3 | Line width in device px, clamped 0.25–12. |
| glow | number | 0.6 | Halo around lines inside the light band, floored at 0. |
| brightness | number | 1 | Output brightness, floored at 0. |
| highlight | number | 1 | Light band strength, clamped 0–1. |
| highlightWidth | number | 1 | Light band width, clamped 0.2–5. |
| warpIntensity | number | 1 | Fold strength, clamped 0–3. |
| warpScale | number | 1 | Fold size, clamped 0.2–4. |
| rotation | number | -33 | Field rotation in degrees. |
| edgeFade | number | 0 | Edge fade fraction, clamped 0–1. |
| enableMouseInteraction | boolean | true | The cursor pushes the lines. |
| mouseInfluence | number | 2 | Lens strength, clamped 0–3. |
| clickRipple | boolean | true | Clicking drops an expanding ripple (max 4). |
| intro | boolean | true | 1.8 s reveal sweep on first mount. |
| lightMode | boolean | false | Ink-on-light output. |
| opacity | number | 1 | Overall opacity, clamped 0–1. |
| maxDevicePixelRatio | number | 2 | Pixel ratio cap, clamped 0.5–3. |
| className | string | "" | Extra class for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of LineWaves.jsx and LineWaves.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: lines flow silkily with three-octave folds and stay crisp at any lineCount; the light band drifts and ridges glow when folds compress; palette cycles through all three colours; cursor lens pushes lines and relaxes on leave; click ripples expand and fade, four max; rotation/edgeFade/opacity/brightness/glow/highlightWidth/warpScale all take effect; lightMode prints crisp ink on white; speed 0 freezes; reduced motion slows time ×0.25 and disables ripples/tracking; offscreen and hidden stop the loop; context loss/restoration recovers; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
