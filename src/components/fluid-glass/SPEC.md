Implement the "FluidGlass" component from zero: a raymarched 3D glass object floating over the page that refracts whatever is behind it — a headline drawn to a texture, an image or looping video, or a solid colour — and follows the cursor. It supports seven shapes (lens, blob, cube, pill, torus, prism, diamond), morphs between them with a ripple and a squash-stretch wobble, disperses light into colour fringes, casts a soft shadow with a caustic glow, frosts its interior, and can be dragged and flung around its container. Full specification follows; it must not depend on external pages or font files; media comes only through the src prop (data URIs and same-origin assets are fine).

## Structure & rendering

- Pure React + CSS + WebGL2: FluidGlass.jsx and FluidGlass.css. React >= 18; no runtime dependencies.
- Root is a `<div class="fluid-glass">` filling its container (width/height 100%), carrying `data-interaction` (follow/static/drag) and `data-clickable`. Inside: a full-bleed `<canvas>`; an invisible `__handle` div (a 2×radius-sized circle following the object each frame) that carries the pointer events in drag/clickable modes (grab/grabbing cursors, touch-action none in drag); a visually-hidden `<p>` repeating the text for screen readers; and a `__content` layer where children render with pointer events re-enabled (the layer itself is click-through).
- Renderer: webgl2, alpha true, premultiplied true, high-performance preference. One fullscreen triangle. Programs are compiled per shape-pair key (`"from>to"` plus a supersampled variant when devicePixelRatio ≥ 1.75) and cached; compilation uses the parallel-compile extension when present and the loop waits for readiness. A plain content program renders the background (media + text + colour) when the glass programs are still warming up.
- Content sources: the `text` prop is drawn to an offscreen canvas (font from container styles unless fontFamily/textColor/fontWeight/fontSize are given; auto-fitted to 84% of width and 64% of height across `\n`-split lines, −3% letter-spacing) and uploaded as a mipmapped texture; `src` loads an image (or a muted looping autoplaying video when the URL ends in a video extension) cover- or contain-mapped per `fit`; `background` (colour string or transparent) underlays both. Text redraws on resize, font load and theme attribute changes.
- The glass shader raymarches a bounded SDF field (96 steps) with the shape pair mixed by the morph factor, plus a tri-sine ripple term during morphs/clicks. Entry refracts by 1/ior; the interior marches to the exit face (up to 3 total internal reflections); exit refraction lands on the content plane, which is resampled with per-pixel footprints (texture gradients) — red and blue re-refracted at ±dispersion offsets for chromatic fringing. Fresnel mixes a studio-light reflection (two soft key/strip lights, or the real backdrop for the mirrored ray when it hits the content plane); tint colours the glass by path length (strength from `tint`); `frost` rings an 8-tap blur through the interior; a facing rim light lifts edges.
- Shadow: a second pass renders the object's soft shadow + caustic into a 160px framebuffer sampled from a light direction (−0.42, 0.55 up); the main pass darkens and adds the caustic glow to the content under the object, scaled by `shadow` and the intro presence.

## Motion & interaction

- Body physics: the object's centre springs toward its goal — the pointer (interaction "follow"), a fixed relative `position` anchor, or the drag offset — at ω = 24 × 0.18^smoothness (34 while grabbed), integrated at 240 Hz sub-steps. Idle drift adds a slow two-frequency Lissajous wobble around the anchor when `idle` is on (random phase per instance).
- Drag & fling: with interaction "drag", pressing within 1.1 × radius grabs the object (grabbing cursor); releasing above 60 px/s velocity flings it — friction decay with edge bounces (restitution 0.62) that kick the wobble spring — until it slows, then it settles back toward its anchor clamped inside the container. A press that moves less than 6px and lands near the object is a click.
- Click: kicks the squash spring (`wobble`-scaled) and, with `morphOnClick` and a multi-shape `cycle` (the `shapes` prop, defaulting to all seven), advances to the next shape; the morph eases over 0.85s (0.35s reduced) mixing the two SDFs with a ripple pulse, and `onShapeChange` fires. `shape` prop changes retarget the same morph.
- Wobble: velocity drives a squash-stretch — a stretch spring (target 1 + clamp(speed/1800) × wobble) squashes the object along its motion direction; tilt springs lean it ±0.7 rad with velocity; the spin prop (rad/s) continuously tumbles it, with per-shape tumble/sway mixes and base orientations so each shape settles naturally.
- Intro: fades/pops in over 0.5s (scale spring from 0) when `intro` is on.
- Reduced motion: no drift, no time-based ripple/blur animation, no tilt or stretch, no spin; morphs shorten; everything else (refraction, drag) still works.
- Frame loop self-sleep: when fully settled (not grabbed/flying, no morph, low velocities, |spin| ≤ 1) it paces to ~12 fps and keeps only the idle sources alive; it stops when nothing is busy and wakes on any pointer, resize, media or settings event. Visibility and document visibility gate the loop; context loss freezes and restore rebuilds. Unmount releases the video, cancels the frame, removes all listeners/observers and deletes GL objects.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Look closer." | The headline refracted by the glass (also the screen-reader label). |
| textColor | string | - | Text colour; falls back to the container's computed colour. |
| fontFamily | string | - | Text font family; falls back to the container's. |
| fontWeight | number | 600 | Text weight. |
| fontSize | number | - | Font size in px; auto-fitted when omitted. |
| src | string | - | Image or video URL refracted by the glass. |
| fit | "cover" \| "contain" | "cover" | Media fit inside the container. |
| background | string | "transparent" | Backdrop colour behind the text/media. |
| shape | string | "torus" | Starting shape: lens, blob, cube, pill, torus, prism or diamond. |
| shapes | string[] | - | Click-morph cycle; defaults to all seven shapes. |
| size | number | 260 | Object diameter in px, floored at 16; also capped by the container. |
| refraction | number | 1 | Refraction strength 0–2 (ior 1.0–2.0). |
| dispersion | number | 0.35 | Chromatic fringe strength 0–1. |
| reflection | number | 1 | Studio reflection strength, 0–2. |
| frost | number | 0 | Interior frosting 0–1. |
| color | string | "#ffffff" | Glass tint colour (hex / rgb). |
| tint | number | 0 | Tint strength 0–1 (colours the glass by path length). |
| shadow | number | 0.5 | Cast shadow + caustic strength 0–1. |
| elevation | number | 0.4 | Object height above the content plane, 0–3. |
| interaction | "follow" \| "static" \| "drag" | "follow" | Follows the pointer, stays put, or is draggable. |
| smoothness | number | 0.5 | Spring softness 0–1; 0 is stiff, 1 is lazy. |
| wobble | number | 0.5 | Squash-stretch and morph ripple energy 0–1. |
| spin | number | 0.3 | Continuous spin speed (rad/s). |
| idle | boolean | true | Slow ambient drift when untouched. |
| morphOnClick | boolean | true | Click morphs to the next shape in the cycle. |
| onShapeChange | (shape: string) => void | - | Called when a morph lands. |
| position | [number, number] | [0.5, 0.5] | Relative anchor in the container (static/drag modes). |
| intro | boolean | true | Scale-and-fade entrance. |
| maxDevicePixelRatio | number | 2 | DPR cap, 0.5–3 (also budgeted to ~5MP). |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |
| children | ReactNode | - | DOM content layered above the canvas (click-through layer). |

## Delivery & validation

- Deliver the complete content of FluidGlass.jsx and FluidGlass.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the glass bends the headline/media behind it with believable refraction, colour fringes at the rim, a facing reflection and a soft shadow with a caustic; all seven shapes render and click-morphs ripple between them with onShapeChange firing; follow mode tracks the pointer, drag mode grabs/flings/bounces and settles; frost blurs the interior; tint colours the glass; size, position and elevation behave; text auto-fits and redraws on resize/fonts; video media loops and pauses off-screen; reduced motion removes drift/spin/stretch but keeps refraction and drag; off-screen and hidden tabs pause; context loss/restore recovers; unmount frees everything; 375 / 768 / 1440 wide without overflow.
