Implement the "Radar" component from zero: a glowing radar scope rendered in a tilted 3D view. A sweep beam rotates around the scope leaving an exponential phosphor afterglow, wandering contacts light up as they are painted and decay slowly, clutter speckles the trail like weather returns, and the cursor itself is a contact — moving it across the scope leaves echoes and a heat bloom under the beam. Grid rings, spokes, tick marks and a bezel frame the disc, all drawn analytically with a bloom finish. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Radar.jsx (entry, contact simulation, shaders) and Radar.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `radar-container` (position relative, width 100%, height 100%, overflow hidden); `className` appends and remaining props spread onto it. The only child is a `<canvas class="radar-canvas" aria-hidden="true">` (position absolute, inset 0, display block, width/height 100%). The host gives the container its size; the canvas is transparent.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. Offscreen scene target and the 6-level bloom pyramid use RGBA16F when EXT_color_buffer_float exists (else RGBA8; bloom is skipped entirely without float targets and glow is forced to 0). If any of the five programs fails, the component silently renders nothing.
- Five programs: `scene` (the disc, grid, trail and clutter — full-screen quad), `sprite` (instanced quads for contact echoes and ping rings), `down`/`up` (bloom pyramid, 5 levels), `composite` (scene + bloom + grain + background). Canvas DPR = min(dpr || devicePixelRatio, 2) with the longest side floored at 2560 render px.
- Camera: the scope plane is viewed through a tilted pinhole camera (tilt 0–80°, focal length 2, camera distance derived from `scale` × min(viewW, viewH) / viewH). The scene pass unprojects each pixel onto the ground plane analytically (dFdx/dFdy provide per-pixel derivatives for antialiased lines); sprites are billboards transformed by the same camera. `centerX`/`centerY` (0–1) place the scope centre in the container.

## Scope drawing (scene pass)

- Unit disc coordinates: r = distance from centre (1 = rim, cut off at 1.3), bearing from atan2, per-pixel line width in true screen pixels via screen-space derivatives — crisp at any size.
- Grid: `ringCount` rings (1–24) at r = i/nings, an outer rim ring, 180 bearing ticks around the bezel (every 5th longer, every 15th longest, fading when angularly crowded), `spokeCount` radial spokes (0–72), 4 cardinal axis lines, a centre hub dot, and short range marks along the horizontal axis — each layer with its own brightness weight, all scaled by `gridOpacity` (0–2) and stroked with `lineWidth` (0.25–4).
- Sweep mode: a rotating beam at bearing `sweep`; the afterglow is `exp(-behind / trail)` behind the beam (trail scaled by the sweep period) with a bright leading edge stroke; `speed < 0` reverses the rotation. Pulse mode: the beam is a circular front at radius `sweep` expanding from the centre (span 1.15 per cycle), the glow trailing behind the front radially.
- Clutter: per-cycle stable hash noise (two octaves of value noise on the plane, drifting per sweep cycle) clusters into weather-like blobs; inside the fresh trail, radial/angular bins drop round speckles at a `clutter`-driven density (clamped 0–1, halved in light mode), dimming toward the rim.
- Cursor heat: a gaussian bloom at the pointer's ground position (sigma² 0.035) brightens grid and trail underneath, springing in (stiffness 120, damping 19, cap 1.2) when the cursor is inside the disc.
- Intro: over 2.2s the grid draws on progressively — rings and rim sweep in by bearing, ticks/spokes/hub/bezel fade in at staggered thresholds, the beam and its trail appear near the end. Movement speed ramps 25%→100% during the first part of the intro.

## Contacts & sprites

- Up to 16 contacts wander the disc: each has a heading that slowly turns (`turn` ±0.09 rad/s scaled), a velocity of 0.012–0.042 units/s, and respawns inbound from a random edge when it strays past r = 0.96 (seeded PRNG, so layouts are reproducible).
- When the beam (or pulse front) passes a contact, an echo is recorded: the newest echo renders as a soft round blob (radius ×3.4 cells) with a white-hot centre plus an expanding ring (radius 4→30 over 1.4s, quadratic ease-out); older echoes (up to 4 kept) render as smaller dimmer blobs. Echo intensity decays exponentially with a persistence of 1.1 sweep periods, so strong trails survive several rotations.
- The cursor participates: while inside the disc it records echoes like a contact (1.3× brighter) — hover the beam's path and your cursor leaves a trail.
- Sprites render additively (ONE, ONE blending), tinted toward white at their centres, scaled by a range factor that ramps in with the intro.

## Colour, composite & modes

- `color` (default phosphor green #3ef09a) parses through a 1px canvas probe to linear RGB, cached per string; unparsable falls back to white. Grid lines mix toward white where the trail glow is strong.
- Composite: exposure = 1.5 × brightness (÷ range in 8-bit mode), bloom added with weight glow, tone-mapped `1 - exp(-x)`, film grain × `grain` (default 0.03), edge fade mask over fade × 0.5 of each side, `opacity` scaling. `backgroundColor` (any CSS colour incl. rgba/transparent) composites under the premultiplied light so the scope can carry its own backing.
- Light mode: hue-normalised ink output — bloom desaturates toward the accent, ink depth varies with brightness (dark strokes for bright returns), alpha from an exponential of the peak — a printable radar for light pages.

## Performance & lifecycle

- Settings are mirrored into a ref every render; a per-render wake re-renders once (re-running resize when `dpr` changed) so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: frames continue only while motion runs (unpaused, not reduced) or cursor heat/intro is settling. Wake sources: window pointermove (passive), documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: the sweep stops, intro snaps to done, heat is disabled; a static fully-lit scope remains.
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete all textures/framebuffers/programs/buffers/VAOs, and lose the GL context if the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#3ef09a" | Phosphor accent colour; any CSS colour, unparsable falls back to white. |
| backgroundColor | string | "transparent" | Backing colour composited under the scope; rgba()/transparent allowed. |
| mode | "sweep" \| "pulse" | "sweep" | Rotating beam, or an expanding circular pulse front. |
| speed | number | 1 | Sweep speed multiplier; 0 freezes, negative reverses (sweep mode). |
| trail | number | 0.35 | Afterglow persistence, 0.02–1; higher keeps longer tails. |
| scale | number | 0.9 | Scope size relative to the container, ≥0.05. |
| ringCount | number | 6 | Range rings, 1–24. |
| spokeCount | number | 12 | Radial spokes, 0–72. |
| ticks | boolean | true | Bezel tick marks and range marks. |
| targets | number | 6 | Wandering contacts, 0–16. |
| clutter | number | 0.35 | Weather-like speckle density in the trail, 0–1. |
| glow | number | 1 | Bloom halo strength (float targets only). |
| brightness | number | 1 | Overall exposure multiplier. |
| gridOpacity | number | 1 | Grid brightness, 0–2. |
| lineWidth | number | 1 | Line width, 0.25–4. |
| tilt | number | 0 | Camera tilt in degrees, 0–80. |
| centerX | number | 0.5 | Scope centre x in the container, 0–1. |
| centerY | number | 0.5 | Scope centre y in the container, 0–1. |
| mouseInteraction | boolean | true | The cursor is a contact and heats the scope under it. |
| intro | boolean | true | The scope draws itself on over 2.2s. |
| grain | number | 0.03 | Film grain amount, ≥0. |
| fade | number | 0 | Softens the container edges, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Prints the scope as ink for light backgrounds. |
| paused | boolean | false | Freezes motion but keeps the last frame visible. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of Radar.jsx and Radar.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the sweep leaves an exponential afterglow that fades over multiple rotations; contacts wander, get painted when the beam passes, and decay; the newest echo shows a blob plus expanding ring; clutter clusters like weather and only lights inside the fresh trail; the cursor leaves echoes and a heat bloom, cooling smoothly on exit; pulse mode expands a circular front with the same painting; negative speed reverses; ringCount/spokeCount/ticks/scale/tilt/centerX/centerY/gridOpacity/lineWidth all reshape the scope; tilt keeps lines crisp in perspective; backgroundColor composites correctly incl. rgba; lightMode prints legible ink on white; intro draws on progressively; paused/reduced-motion hold a static scope; no-float-target devices drop bloom gracefully; hiding the tab or leaving the viewport stops the loop and it resumes; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
