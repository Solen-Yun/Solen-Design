Implement the "Aurora" component from zero: a soft, calm aurora curtain flowing along the top edge of the page — up to three parallax layers of simplex-warped ribbons whose hues slide through an oklab gradient, drifting sideways with the clock and swelling gently toward the cursor. The curtains composite in screen space over a transparent canvas, with a slow reveal intro, a bottom-direction flip, and a light mode that renders translucent ink curtains for bright pages. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Aurora.jsx (entry, shader source, pointer state) and Aurora.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.aurora-container` (position relative, width/height 100%, overflow hidden) holding one `canvas.aurora-canvas` (absolute, inset 0, 100% x 100%, aria-hidden). Extra className and style are forwarded to the container.
- Context: webgl2, alpha, premultipliedAlpha, no depth/stencil/antialias. If the context or program fails the component silently renders nothing. One fullscreen triangle covers the viewport; DPR is clamped to 2.
- The fragment shader is the whole picture. For each of up to 3 layers (k = 0..layers-1, seeded per layer by k * 13.7):
  - A warp value from one 2D simplex noise bends a second two-octave wave noise (0.72 weight at 0.75 frequency + 0.28 at 1.6) across the aspect-corrected x axis; the layer pace advances with time at (1 - layer * 0.18) so deeper layers move slower.
  - The curtain hem (its bottom edge, from the top) = height + layer * 0.07 + wave * 0.15 * amplitude, raised locally by the pointer reach bump (0.08 for the front layer, 0.4 x reach for the others), and mixed from -0.25 (fully hidden) by the reveal value.
  - Edge softness = (0.04 + blend * 0.16) * (1 + layer * 0.9); the curtain body = smootherstep(-soft - glow*0.14, 0.26 + soft*0.6, hem - y)^ (1.5 + glow * 0.6) — glow both deepens the falloff and pushes the fade start lower, so higher glow hugs the top edge harder; a secondary large-scale noise modulates the body into lobes (0.86 +- 0.14); deeper layers render at 0.32/layer alpha.
  - Colour = the oklab gradient ramp sampled at u + 0.05 * sin(pace * 0.08 + layer * 2.3) + layer * 0.1 + max(rise, 0) * 0.05, so hues slide along each curtain over time and shift toward the ramp's far end near the bottom of the curtain. Ramp stops (2-5, extra ignored) are parsed with a cached canvas fill probe, converted sRGB -> oklab, hue-unwrapped (grey stops inherit the previous hue) and smoothed between with smoothstep; the default palette is a violet-green-violet loop (#5227FF, #7cff67, #5227FF).
  - Layers composite with screen blending: glow = 1 - (1-glow)(1-tint*alpha), cover accumulates the same way. A hash dither of +-1/255 breaks banding.
- Pointer: reach = presence * exp(-((X - px) / 0.38)^2), X the aspect-corrected normalized x; the pointer position eases with tau 0.6s and on re-entry snaps to the entering point; presence eases in 0.9s, out 1.4s; the bump lifts hems (above) and boosts body alpha up to +25% near the hem.
- direction "bottom" flips the whole field vertically so curtains hang from the bottom edge.
- brightness: first multiplies glow/cover by min(strength, 1), then applies glow = 1 - (1-glow)^max(strength, 1) — below 1 dims, above 1 deepens. opacity multiplies the final alpha.
- Dark mode output is premultiplied (glow + dither, cover + dither alpha). Light mode renders ink curtains: average tint over cover, alpha = cover * 0.7 with a smootherstep(0, 0.25, cover) soft floor, colour = tint * alpha — for pages on white.
- intro: 2.4s reveal, the reveal uniform eased with 1 - (1-t)^3; off (or reduced motion) starts fully revealed.
- paused renders one settled frame and stops the loop (prop changes and resizes still re-render).

## Scheduling & lifecycle

- The loop redraws every frame while the container intersects the viewport and the page is visible (this field never settles on its own); IntersectionObserver and visibilitychange wake it after pauses; a wake hook re-renders once per prop or dpr change.
- Pointer tracking: window-level pointermove and pointerdown (container-local coordinates), pointerup/pointercancel clear the inside flag for non-mouse pointers, pointerleave on the document element clears it.
- prefers-reduced-motion: clock frozen (static curtains), pointer interaction disabled, intro instant.
- Resize: ResizeObserver on the container re-sizes the canvas and re-renders.
- Unmount: cancel the frame, disconnect both observers, remove every listener, delete program, buffer and vertex array; when the canvas is already detached the WebGL context is explicitly lost. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colorStops | string[] | ["#5227FF", "#7cff67", "#5227FF"] | Gradient stops (any CSS colour); up to 5, one colour duplicates itself. |
| amplitude | number | 1 | Wave height of the hem, >= 0. |
| blend | number | 0.5 | Softness of the curtain edge, 0–1. |
| speed | number | 1 | Time multiplier for the drift. |
| time | number | - | Drives the field yourself (uTime = time * speed * 0.1) instead of the internal clock. |
| height | number | 0.45 | Curtain reach down from the edge, 0–1 of viewport height. |
| scale | number | 1 | Spatial frequency of the noise, >= 0.1. |
| glow | number | 0.6 | Curtain density and bottom falloff, >= 0. |
| brightness | number | 1 | Output gain; < 1 dims, > 1 deepens. |
| layers | number | 1 | Parallax curtain count 1–3. |
| direction | "top" \| "bottom" | "top" | Which edge the aurora hangs from. |
| mouseInteraction | boolean | true | Curtains swell toward the cursor. |
| intro | boolean | true | 2.4s fade-in reveal on mount. |
| opacity | number | 1 | Canvas opacity 0–1. |
| lightMode | boolean | false | Translucent ink curtains for light pages. |
| paused | boolean | false | Freezes the drift (renders once). |
| dpr | number | - | Overrides the device pixel ratio cap (2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Aurora.jsx and Aurora.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the curtains drift continuously with sliding hues and no banding; layers move at different paces; the cursor lifts the hem under it and recovers after leave; direction bottom mirrors the curtain; brightness < 1 and > 1 behave as described; lightMode gives translucent curtains readable on white; colorStops 1-5 stops re-build the ramp live; intro fades in once and reduced-motion skips it; paused shows a still frame that resumes; resize keeps the field aligned; unmount leaves no listeners, observers, GL objects or frame loop; transparent canvas composites over any page background at 375 / 768 / 1440 wide.
