Implement the "Beams" component from zero: glossy ribbons of light rippling in the dark — a field of parallel beams rotated to any angle, each one catching a travelling specular highlight from a key light that follows the cursor, with the hot cores blooming outward, a filmic tonemap and film grain. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Beams.jsx (entry, two shader passes, frame loop) and Beams.css (all styles). React >= 18; no runtime dependencies. No iframe. The React export is both a named `Beams` and the default export.
- Root is a `div.beams-container` (position relative, width/height 100%, overflow hidden) holding one `canvas.beams-canvas` (absolute, inset 0, 100% x 100%, aria-hidden). Extra className and style are forwarded to the container; a `backgroundColor` prop paints the container background (default transparent).
- Context: webgl2, alpha, premultipliedAlpha, no depth/stencil/antialias. If the context or either program fails the component silently renders nothing.
- Two fullscreen-triangle passes:
  1. Field pass into an offscreen mipmapped texture (RGBA16F with EXT_color_buffer_float, RGBA8 otherwise). Resolution = CSS size x quality x ratio (quality clamped 0.25-1), capped at 1.6M pixels by downscaling. The R channel stores the specular radiance, G the hot mask, B the hot values that later seed bloom; mipmaps regenerate each frame.
  2. Composite pass to the canvas: radiance from mip 0, bloom from mips 2/3/4/5 (weights 0.3/0.3/0.22/0.18 of the B channel) x glow, a hot core (G channel) mixing toward white, all multiplied by the tint in linear space x brightness x presence, ACES filmic tonemap, sRGB encode, grain subtracted (value noise smoothed, grain x 1.75), an edge feather mask (fade prop), opacity, and +-1/255 dither. Light mode outputs ink alpha: alpha = peak x 0.9, colour = a darker shade of the tint derived from its luma, for pages on white.
- Beam field: CSS-space pixel rotated by the rotation angle; across = x / beamWidth + 0.5; lane = floor, u = frac. Per lane a hash seeded by variation offsets the ripple phase and spin; the surface slope comes from a 3D classic noise sampled along the beam (y / waveLength - hash * 60) with time advancing 0.12 x speed per second (wrapped mod 289); slope x 0.2 x depth tilts the micro-normal. Each lane's twist = per-lane spin (0.5 spread) + a slow 2.1 rad/s oscillation, x twist; the normal = (tilt, -slope, 1) normalized. The specular lobe is a GGX-style distribution x Smith visibility x Schlick fresnel against the key light direction (0, 3 + sweep + lightY x reach, 10) and a view from (-local, height * 1.866); a fill lobe from below adds fillLight. Adjacent lanes cross-blend within 1.5 px of the seam so gaps never show.
- Colour parsing uses a cached canvas fill probe into linear space (any CSS colour; fallback white). The composite derives a hot-core mix toward white (0.7) and, for light mode, an ink shade from the tint's luma.

## Motion & interaction

- Intro (1.6s): the key light sweeps up from below (y from -9 to 0) with a quintic ease while the composite presence fades in — the beams "light up" one by one as the light passes.
- Pointer (mouseInteraction): the eased pointer position (7/s) drives two things: a proximity boost (Gaussian, sigma 28% of the larger canvas dimension, strength reach x mouseStrength x 0.8) that brightens beams under the cursor, and lightY — the pointer's position projected onto the beam axis, clamped +-4 — so the specular highlight rides along the beam nearest the cursor. Reach eases in 3.2/s, out 1.8/s.
- paused freezes the clock; reduced motion skips the intro, pointer effects and clock advance (static render).

## Scheduling & lifecycle

- The loop redraws while moving (speed > 0, not paused) or settling (intro running, reach easing, pointer still catching up); otherwise it self-sleeps and wakes on pointermove, pointer leave, visibilitychange, becoming visible, resize, or any prop change (a wake hook that also rebuilds when quality or dpr changed).
- ResizeObserver re-sizes canvas and field target and re-renders.
- Unmount: cancel the frame, disconnect both observers, remove every listener, delete texture, framebuffer, both programs, buffer and vertex array; when the canvas is already detached the WebGL context is explicitly lost. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#ffffff" | Beam tint (any CSS colour). |
| beamWidth | number | 140 | Width of one beam in px, >= 8. |
| rotation | number | 30 | Field rotation in degrees. |
| speed | number | 1 | Ripple travel speed. |
| waveLength | number | 233 | Ripple spacing along a beam in px, >= 20. |
| depth | number | 1 | Ripple steepness (normal tilt), >= 0. |
| sharpness | number | 0.6 | Highlight tightness 0–1 (higher = sharper). |
| twist | number | 0 | Per-lane twist oscillation 0–2. |
| fillLight | number | 0.3 | Fill lobe from below 0–1.5. |
| glow | number | 0.6 | Bloom strength, >= 0. |
| brightness | number | 1.6 | Output gain, >= 0. |
| variation | number | 0 | Ripples/seed variation; any number re-seeds the lanes. |
| grain | number | 0.35 | Film grain strength, >= 0. |
| quality | number | 0.75 | Field render scale 0.25–1. |
| mouseInteraction | boolean | true | Highlight and key light follow the cursor. |
| mouseStrength | number | 1 | Cursor proximity boost, >= 0. |
| intro | boolean | true | 1.6s light-up sweep on mount. |
| fade | number | 0 | Screen-edge feather 0–1. |
| opacity | number | 1 | Canvas opacity 0–1. |
| lightMode | boolean | false | Ink-on-alpha output for light pages. |
| backgroundColor | string | - | Container background colour (default transparent). |
| paused | boolean | false | Freezes the ripple clock (renders once). |
| dpr | number | - | Overrides the device pixel ratio cap (2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Beams.jsx and Beams.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: beams ripple continuously with travelling highlights and blooming hot cores; the intro sweeps light up the field once; moving the cursor brightens nearby beams and the specular highlight rides along the beam axis; rotation/beamWidth/waveLength/sharpness/twist/fillLight/glow/brightness/color/variation/grain all respond; fade feathers the borders and lightMode gives ink beams readable on white; paused freezes; reduced motion renders a static lit field; tab-hide and scroll-out stop the loop and resume cleanly; resize and quality changes rebuild without artifacts; unmount leaves no listeners, observers, GL objects or frame loop; transparent canvas composites over any page background at 375 / 768 / 1440 wide.
