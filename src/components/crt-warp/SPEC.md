Implement the "CRTWarp" component from zero: a blocky plasma glowing on a curved CRT — the plasma field renders on a low-resolution virtual pixel grid, posterized into a few levels, with real per-device-pixel scanlines, a selectable phosphor mask, afterglow persistence, barrel curvature, chromatic shift, hum, flicker, grain and a vignette. The cursor bends the picture around it like a magnet, clicking rolls the channel over with a static burst, and a power-on intro warms the tube up. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: CRTWarp.jsx (entry, four programs, frame loop) and CRTWarp.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.crt-warp-container` (position relative, width/height 100%, overflow hidden) plus any extra className; the canvas is created and appended at mount (class crt-warp-canvas, absolute, inset 0, 100% x 100%) and removed at unmount. style forwards to the container.
- Context: webgl2, alpha, premultipliedAlpha, no depth/stencil/antialias, powerPreference high-performance. If the context or any of the four programs fails, the canvas is removed and nothing renders.
- Four fullscreen-triangle programs:
  1. Content sim: a low-res grid of `columns` x rows (rows = columns * 0.56 * height / width, clamped 4-300). Each cell evaluates a 7-term plasma field (sines of stretched coordinates plus three radial ellipse terms and a diagonal ripple, all phase-shifted by a 4-channel seed derived from `variation` + channel), scales it by amplitude, posterizes: s = (0.5 + 0.499 * sin(field * amplitude)) stretched from 1/levels to 1 by the power-on reveal, then level = floor(s * levels) / (levels - 1). Afterglow: the cell can rise at most rise per frame (dt / 0.22 while revealing, else unbounded) and decays by persistence^(dt*60) minus 0.004 — bright cells linger and fade. Ping-pong pair of RGBA8 targets.
  2. Glow: samples the content (r^2) into a quarter-resolution target.
  3. Blur: separable 15-tap Gaussian, sigma = max(0.6, glowHeight / 48 * bloomRadius), horizontal then vertical back into the glow target.
  4. Display to the canvas (see below).
- Display pass: uv curved through a barrel transform (curvature > 0.001, strength 1.1 + 0.42/curvature), optional rounded-corner mask (corners scales margin and radius with antialiased SDF), the rolling channel bar wraps uv.y while active, tear jitters x per line (sinusoid + line-hash), interference adds per-line hash wobble. Beam shaping: the curved uv maps into the content grid with bilinear column filtering whose softness tightens with focus; two neighbouring scanlines (scanlineFrequency rows) light up with Gaussian beam profiles (sigma 0.16-0.34 by brightness), the inter-line gap darkened by scanlineStrength (lit sum x1.18 at full strength). Chromatic separation: r/b sampled +-rgbShift horizontally; when a phosphor mask is active the three beams also split along a rotating purity axis scaled by the magnet falloff. Cursor magnet: a Gaussian well (radius 0.24) swirling the uv tangentially, strength mouseStrength * 2 x presence, position spring-following the pointer (omega 2pi/0.3). Bloom adds the blurred glow x bloom; a hum bar modulates brightness 24% x interference, flicker jitters +-5% at 60 Hz, grain +- x noise, a smoothstep vignette (vignette prop) and a power-on gain shape multiply in. Static burst: during a channel flip blocky noise (cells of 1.5 device px) mixes in.
- Phosphor masks (mask prop, scaled by maskStrength): "aperture" = vertical RGB stripes per device pixel; "shadow" = staggered stripes with alternate rows dimmed to 72%; "slot" = stripes with slot rows dimmed to 45%; "none" = off. Mask weights are normalized so average brightness stays constant and feed a phosphor gamma (colour-weighted exponent 0.7) in dark mode.
- Colour: `color` is the ink, `backgroundColor` the paper — both CSS colours (3/6-digit hex, rgb()/rgba(); alpha 0 or "transparent" removes the paper so the canvas outputs premultiplied alpha). Dark mode: phosphor-ish light = ink * coverage^(gamma by hue) + bloom x ink, plus a white lift on overbright, composed over the paper (opaque) or alone (alpha). Light mode: coverage clamped to 0.88 plus glow, colour = mix(paper, ink, coverage) or ink x coverage in alpha mode.
- Intro (1.6s power-on): reveal ramps posterization from 1/levels to full, warm-up brightens over 0.6s, focus sharpens the beam from soft to crisp between 0.15s and 1.6s.

## Interaction & channel change

- Click (changeOnClick, left button, target not inside a, button, input, textarea, select, label, [role="button"], pointer inside, not reduced): a 0.8s channel flip — a rolling bar sweeps down the screen (ease-in-out), tear and static spike (sinusoidal peaks at 0.5s / 0.55s), brightness dips 30%, and at 0.22s the seed channel increments so the plasma re-forms. Reduced motion just increments the channel with no animation.
- Pointer (mouseReact): the magnet swirl follows the pointer; entering snaps the spring to the entry point so it never flies across.
- prefers-reduced-motion: time frozen (a static plasma), flicker and afterglow decay off, clicks flip without the roll.

## Scheduling & lifecycle

- Frame cap: renders at most `fps` frames per second (default 60, >= 1), dt clamped to 0.1. The loop pauses when the tab is hidden, the container is off-screen (IntersectionObserver) or the context is lost; a self-sleep stops after 90 quiet frames when paused/reduced and fully settled (magnet at rest, no flip, intro done), and wakes on pointer movement, resize or prop changes.
- Resize: canvas sized to container x min(devicePixelRatio, dpr); the content grid rows recompute and both content targets rebuild when the grid changes; glow targets track a quarter of the canvas.
- Unmount: cancel the frame, disconnect both observers, remove every listener and the context-lost listener, delete content/glow targets, all four programs, buffer and vertex array, explicitly lose the WebGL context and remove the canvas. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#c755f7" | Plasma ink colour (any CSS colour). |
| backgroundColor | string | "#120f17" | Paper behind the tube; "transparent" (or alpha-0 colours) outputs premultiplied alpha. |
| lightMode | boolean | false | Bright coverage look instead of glowing phosphor. |
| speed | number | 0.5 | Plasma evolution speed. |
| variation | number | 0 | Field seed; each click adds one channel on top of it. |
| waveAmplitude | number | 0.3 | Plasma field amplitude, >= 0. |
| waveFrequency | number | 2.5 | Plasma field frequency, >= 0.01. |
| levels | number | 3 | Posterization levels, 2–12. |
| columns | number | 80 | Virtual pixel columns, 8–400 (rows follow the 0.56 cell aspect). |
| persistence | number | 0.4 | Afterglow persistence 0–0.98. |
| curvature | number | 0.25 | Barrel curvature (0 = flat). |
| corners | number | 0 | Rounded-corner mask 0–1. |
| scanlineStrength | number | 0.6 | Scanline gap darkening 0–1. |
| scanlineFrequency | number | 200 | Scanline row count, 20–1200. |
| mask | "none" \| "aperture" \| "shadow" \| "slot" | "aperture" | Phosphor mask type. |
| maskStrength | number | 0.3 | Mask contrast 0–1. |
| bloom | number | 1.5 | Bloom strength, >= 0. |
| bloomRadius | number | 1 | Bloom blur radius, >= 0.05. |
| rgbShift | number | 0.003 | Horizontal chromatic separation. |
| noise | number | 0.1 | Grain strength, >= 0. |
| flicker | number | 0.15 | 60 Hz brightness flicker, >= 0. |
| interference | number | 0.2 | Hum bar + line wobble, >= 0. |
| vignette | number | 0.3 | Corner vignette 0–1. |
| brightness | number | 1 | Output gain, >= 0. |
| intro | boolean | true | 1.6s power-on (reveal, warm-up, focus). |
| mouseReact | boolean | true | Cursor bends the picture. |
| mouseStrength | number | 0.5 | Magnet swirl strength, >= 0. |
| changeOnClick | boolean | true | Click rolls the channel with a static burst. |
| dpr | number | 2 | Device pixel ratio cap, >= 0.5. |
| fps | number | 60 | Frame rate cap, >= 1. |
| paused | boolean | false | Freezes plasma time (static picture). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of CRTWarp.jsx and CRTWarp.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the plasma evolves and posterizes with afterglow trails; scanlines follow device pixels and all four mask types draw; curvature and corners shape the tube; the intro powers on once; moving the cursor swirls the picture and it recovers; clicking rolls the channel with tear/static and the plasma re-seeds; color/backgroundColor/lightMode/levels/columns/persistence/bloom/rgbShift/noise/flicker/interference/vignette/brightness all respond; backgroundColor "transparent" composites over the page; fps caps the loop; paused and reduced motion render a settled frame; tab-hide and scroll-out stop the loop and resume cleanly; unmount removes the canvas and frees all GL objects; the canvas never overflows the container at 375 / 768 / 1440 wide.
