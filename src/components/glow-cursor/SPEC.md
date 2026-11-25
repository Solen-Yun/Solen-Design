Implement the "GlowCursor" component from zero: light that pours from the cursor. Moving the pointer injects dye into a real fluid simulation, so the glow streams behind the cursor like a soft comet, folds in on itself, lingers as heat and cools as it fades; clicking bursts six jets of light outward. The dye colours cool from a hot core colour to a cooler secondary tone as the energy dissipates. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GlowCursor.jsx (entry, shaders, frame loop) and GlowCursor.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="glow-cursor">` (plus any className, any extra props spread onto it): position relative, width 100%, height 100%, overflow hidden — it fills its host box. Inside, an absolutely positioned full-size `<canvas class="glow-cursor__canvas">` (aria-hidden, pointer-events none, user-select none) carries an inline mix-blend-mode: "screen" on the dark theme, "normal" on the light theme, overridable via the blendMode prop. Optional children render in a `.glow-cursor__content` wrapper (relative, z-index 1, full size) above the canvas.
- WebGL2 context with alpha, premultipliedAlpha, antialias false; EXT_color_buffer_float required. If the context, extension or any program fails, the component renders nothing and stays silent.
- One fullscreen-triangle vertex shader (also computing left/right/top/bottom neighbour uvs from a texel uniform) shared by 11 fragment programs: splat, advect, MacCormack correction, divergence, pressure Jacobi, gradient subtract, scale, prefilter, down, up, display.

## Fluid simulation

- Targets are pairs of half-float textures allocated per quality preset: low sim 96 / dye 384, medium 128 / 576, high 160 / 768 (short side in px, aspect-corrected, dye shrunk further to never exceed the canvas). Velocity RG16F (linear), dye RGBA16F (linear), pressure R16F and divergence R16F (nearest), plus a forward/back pair for advection and 5 bloom levels.
- The pointer's target is chased by a spring emitter: omega = 10 + followSpeed * 50, critically damped, integrated in 4ms sub-steps (followSpeed >= 1 snaps; prefers-reduced-motion snaps too). Per frame the emitter's movement path is stamped into the fields.
- Splat shader modes: 0 = add a Gaussian dot (radius falloff + wider "wide" radius), 1 = mix colour by Gaussian, 2 = add along a capsule segment (erf falloff), 3 = mix colour along a capsule. Velocity splats use mode 3 (aspect-corrected, radius trailWidth * 0.5-ish + 18, strength 0.45); dye splats use mode 2 with radius max(trailWidth * 0.5, one dye texel * 0.9) and a wide soft skirt (radius * 5 + 6). Dye channels: r = light energy 5.6, g = heat 5.6, b = cool gas 0.7 per splat.
- Solver per frame: divergence (with mirrored boundaries), pressure Jacobi scaled 0.8 per frame and iterated 20 steps, gradient subtract, then self-advection of velocity with decay exp(-dt * 1.2). Dye advection is second-order MacCormack (forward/backward passes plus clamped bicubic-limited correction) with per-channel decay: r decays with half-life linger * 0.8, g with linger * 0.2 (heat vanishes fastest), b with linger * 1.2 (the cool halo lasts longest) — decay = exp(-dt * 4.6 / horizon).
- Click burst (clickBurst): 6 jets around the click point at randomised angles — velocity splats along each jet (~760 px/s) and dye splats (2.4 energy / 0.3 gas), plus one big soft centre splat (1.8 / 0.4, radius * 2.2). Jets are skipped under reduced motion; dye-only.
- enabled={false} stops new dye from being emitted while the existing fluid keeps settling.

## Shading & display

- shade() maps dye to light: fresh = heat / energy, tint = mix(secondary, color, fresh) — the hot core takes the main colour, the cooling tail takes the secondary; output = tint * energy + secondary * gas + heat^2 * 0.3 * hotspot (white-hot centre), all times intensity.
- Bloom when glow > 0: prefilter shades the dye, then 5 levels of down-sampling (4-tap x4 box) and additive upward merging (ONE/ONE blending, 12-tap), giving a wide soft halo scaled by glow * 1.4 / 5.
- Display pass: dark theme — Reinhard tonemap 1 - exp(-(light + bloom) * grain-noise), edges feathered over 2% of the screen, alpha = max channel. Light theme — ink on paper: density = 1 - exp(-(energy * 1.1 + gas * 0.8) * intensity + bloom luminance * 0.25); ink darkens with density and whitens in the hot core (heat^2 * 0.05 * hotspot), premultiplied by coverage, grain and edge feather.
- Colour parsing runs any CSS colour through a 1x1 canvas fillStyle probe (3/4/6/8-digit hex with or without "#", rgb(), hsl(), named colours). secondaryColor defaults to the main colour's hue rotated +8 degrees with slightly raised saturation (HSV round-trip).

## Interaction & lifecycle

- Pointer tracking is on window (pointermove passive, pointerdown for bursts) with positions mapped to the host rect; leaving the host or the document detaches the emitter so the fluid just decays. clickBurst fires only inside the host.
- The frame loop self-sleeps: after linger * 1200 + 900ms without activity and with the emitter at rest, all fluid targets and the canvas are cleared and the loop stops; it wakes on pointer movement, bursts, resize, visibility or scroll-into-view (ResizeObserver + IntersectionObserver + visibilitychange, dt clamped, re-allocated on DPR change).
- prefers-reduced-motion: the emitter snaps to the pointer, no velocity field is solved or splatted, and dye fades in place (advection dt = 0, decay only) — a quiet glow that still follows and cools.
- Unmount: cancel the frame, disconnect observers, remove listeners, delete all targets, programs, shaders, buffer and VAO. Same-page instances are fully independent. Prop changes apply live through a settings ref.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#5f8bff" | Hot-core light colour (any CSS colour). |
| secondaryColor | string | - | Cooling tail colour; defaults to the main colour's hue +8 deg. |
| intensity | number | 1.3 | Overall brightness of the glow. |
| trailWidth | number | 3 | Width of the light stream, 0.5–40. |
| linger | number | 1.4 | How long the light lingers before cooling away, 0.1–10. |
| glow | number | 1.2 | Strength of the soft bloom halo; 0 disables bloom. |
| hotspot | number | 0.8 | White-hot centre at fresh splats, 0+ |
| followSpeed | number | 0.6 | How tightly the emitter chases the pointer, 0–1 (1 snaps). |
| grain | number | 0 | Animated film grain over the display, 0–1. |
| clickBurst | boolean | true | Clicking bursts six jets of light. |
| quality | "low" \| "medium" \| "high" | "high" | Simulation resolution preset. |
| theme | "dark" \| "light" | "dark" | Dark renders additive light, light renders ink. |
| blendMode | string | - | Canvas blend mode; defaults to "screen" (dark) or "normal" (light). |
| maxDevicePixelRatio | number | 2 | DPR clamp for the canvas. |
| enabled | boolean | true | Emits new light when true; the fluid still settles when false. |
| children | ReactNode | - | Content layered above the canvas. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of GlowCursor.jsx and GlowCursor.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the light streams behind the cursor and folds without pixelation (MacCormack), the hot core cools into the secondary hue as it ages, linger stretches/shortens the afterglow, glow blooms softly, clicking bursts jets that swirl back; followSpeed from 0 to 1 changes lag; quality presets reallocate cleanly on resize; theme light reads as ink on light paper with blend normal, dark as additive light with blend screen; grain and hotspot behave as labelled; enabled=false stops new light; prefers-reduced-motion snaps the emitter and skips the velocity field; the loop sleeps after the glow fades and wakes on interaction; unmount leaves no listeners or GPU objects; multiple instances run independently; 375 / 768 / 1440 wide hosts without overflow.
