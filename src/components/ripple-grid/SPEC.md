Implement the "RippleGrid" component from zero: a crisp grid of lines, dots or crosses rendered in a single fragment shader, sitting on a plane that can tilt away in perspective. Expanding ring waves pass through the grid — bending the cells like water and brightening them as they crest. Ripples fire automatically (from the centre or random spots), trail behind the cursor as it moves, and burst from every click. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: RippleGrid.jsx (entry, ripple state, shader) and RippleGrid.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `ripple-grid-container` (position relative, width 100%, height 100%, overflow hidden); `className` appends and remaining props spread onto it. The only child is a `<canvas class="ripple-grid-canvas" aria-hidden="true">` (position absolute, inset 0, display block, width/height 100%). The host gives the container its size; the canvas is transparent.
- Context: `webgl2`, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false. One program drawing one big triangle `(-1,-1) (3,-1) (-1,3)` from a single VAO; if the context or program fails, the component silently renders nothing.
- Everything is analytic in one fragment pass: CSS-pixel coordinates, optional perspective unprojection, wave displacement, then the grid pattern with fwidth-based antialiasing and an exponential halo. Canvas DPR = min(dpr || devicePixelRatio, 2).

## Grid pattern

- Plane: with `tilt` > 0 (0–80°), pixels are unprojected through a focal length of 1.15 × view height; depth fades the grid toward a horizon (smoothstep over the focal plane) and compresses far rows. `rotation` (degrees) rotates the grid in the plane.
- Cell coordinate: plane position ÷ `cellSize` (min 8). Three variants: `lines` — the max of two antialiased axis strokes; `dots` — a round dot per cell (1.8× width falloff); `cross` — short plus-shaped arms (arm length 0.16 cells) per cell. Line width (`lineWidth`, min 0.25) is honoured down to sub-pixel with a dimming factor; `fwidth` keeps everything crisp at any cell size or tilt.
- Glow: an exponential halo `exp(-edge / (ratio × 2.4)) × glow` bleeds light outward from every stroke; cells whose antialiasing gradient is coarse (far away) fade out.
- Brightness: strokes lift with the local wave height (`1 + lift × 3.4 × strength`) and with a gaussian around the pointer (sigma = 3.2 cells, up to +160% while engaged).

## Waves

- Up to 12 live ripples, each a ring packet: displacement = `sin(2π·x) × exp(-x² × 1.8) × spread × calm × strength` where x = (distance - age × waveSpeed) / waveLength; waveLength = 2.4 × cellSize × rippleSize; waveSpeed = 240 × rippleSpeed px/s. Displacement pushes the grid sampling position radially (× strength × cellSize × 0.22) — cells visibly bend — and the summed height lifts brightness.
- Ripple strength decays exponentially (exp(-0.55 × age)); a ripple is dropped after 9 / rippleSpeed seconds. Beyond 12, the oldest is evicted.
- Auto ripples (`autoRipple`): "center" spawns a full-strength (1.0) ripple at the plane centre every `rippleInterval` s (min 0.3); "random" spawns 0.75-strength ripples at random spots in the lower 80% of the view; "none" disables. The first auto ripple fires 0.4s after mount.
- Pointer trail: while `mouseInteraction` is on, moving the cursor accumulates plane distance; every 1.6 × cellSize travelled it drops a small 0.32-strength ripple — the grid ripples along your path (gated to jumps under 6 cells so teleporting pointers don't streak).
- Clicks: with `clickRipple` on, a pointer-down inside the container fires a 1.2-strength ripple at the clicked plane position.
- Intro: with `intro` on, a radial reveal sweeps outward from the centre over 1.6s (radius up to 1.4 × diagonal), and the grid starts with one 1.1-strength centre ripple so the first frames are already alive.

## Colour, output & modes

- `color` parses through a 1px canvas probe into linear RGB (cached per string, unparsable falls back to white); strokes brighter than 0.7 blend toward white for a hot crest.
- Light mode: strokes print as ink — an ink tone derived from the colour's luminance (dark colours stay dark), alpha = level × 1.2 with 1/255 dithering to prevent banding.
- Edge fade (`fade` 0–1, default 0.5) applies a smootherstep mask over fade × 0.5 of each edge; `opacity` scales the output; premultiplied alpha = level.

## Performance & lifecycle

- Settings are mirrored into a ref every render; a per-render wake re-renders once (re-running resize when `dpr` changed) so every prop is live without rebuilding GL state.
- Frame loop self-sleeps: frames continue only while motion runs (unpaused, not reduced) or the pointer-glow is settling. Wake sources: window pointermove/pointerdown (passive), documentElement pointerleave, visibilitychange, ResizeObserver, IntersectionObserver (offscreen stops), and the per-render wake.
- prefers-reduced-motion: the clock freezes (no drift, no auto ripples), the intro snaps to done, trail and click ripples are disabled; a static grid remains.
- Unmount: cancel the frame, disconnect both observers, remove all listeners, delete program/buffer/VAO, and lose the GL context if the canvas is detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#ffffff" | Grid colour; any CSS colour, unparsable falls back to white. |
| variant | "lines" \| "dots" \| "cross" | "lines" | Cell shape: plain grid lines, round dots, or plus-shaped crosses. |
| cellSize | number | 48 | Cell edge length in px, min 8. |
| lineWidth | number | 1 | Stroke width, min 0.25 (sub-pixel dims instead of thinning). |
| glow | number | 0.6 | Halo bleeding out of every stroke, ≥0. |
| rippleStrength | number | 1 | How far waves bend the grid, ≥0. |
| rippleSpeed | number | 1 | Wave expansion speed multiplier, ≥0.05; also scales ripple lifetime. |
| rippleSize | number | 1 | Wave packet length multiplier, ≥0.2. |
| autoRipple | "center" \| "random" \| "none" | "center" | Where automatic ripples fire. |
| rippleInterval | number | 2.6 | Seconds between automatic ripples, min 0.3. |
| tilt | number | 0 | Perspective tilt of the plane in degrees, 0–80. |
| rotation | number | 0 | Grid rotation in the plane, in degrees. |
| mouseInteraction | boolean | true | Moving the cursor drops a trail of small ripples and brightens nearby cells. |
| clickRipple | boolean | true | Clicking fires a strong ripple at the pointer. |
| intro | boolean | true | A radial reveal sweeps out from the centre on mount (1.6s). |
| fade | number | 0.5 | Softens the container edges, 0–1. |
| opacity | number | 1 | Overall opacity, 0–1. |
| lightMode | boolean | false | Prints the grid as ink for light backgrounds. |
| paused | boolean | false | Freezes motion but keeps the last frame visible. |
| dpr | number | - | Overrides the device pixel ratio for the canvas. |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of RippleGrid.jsx and RippleGrid.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all three variants render crisp antialiased cells; auto ripples fire on schedule from the centre or random spots; waves visibly bend the grid and brighten at their crest, then decay; the cursor leaves a ripple trail and a local glow; clicks burst strongly; tilt compresses far rows with a horizon fade and rotation turns the grid; cellSize/lineWidth/glow/rippleStrength/rippleSpeed/rippleSize/fade/opacity all respond; intro reveals once and never replays on prop changes; more than 12 ripples evict the oldest without glitches; lightMode prints legible ink on white; paused/reduced-motion hold a static grid; hiding the tab or leaving the viewport stops the loop and it resumes; unmount leaves no listeners, observers or GL contexts; 375 / 768 / 1440 wide without overflow.
