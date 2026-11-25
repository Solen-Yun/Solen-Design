Implement the "Balatro" component from zero: a crisp pixelated swirl of three-colour paint rotating endlessly like a marbled vortex — the cursor stirs the paint through a decaying flow field, clicking drops in whirlpools that twist the pattern, and the whole composition unwinds from a collapsed swirl on mount. Everything renders on a low-resolution block grid for chunky pixels, with an optional CRT pass (real scanlines + edge falloff). Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Balatro.jsx (entry, three programs, flow field) and Balatro.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.balatro` (position relative, width/height 100%, overflow hidden) holding one `canvas.balatro__canvas` (absolute, inset 0, 100% x 100%, aria-hidden). Extra className and style are forwarded to the container.
- Context: webgl2, alpha, premultipliedAlpha, no depth/stencil/antialias, powerPreference high-performance. If the context or any required program fails the component silently renders nothing. EXT_color_buffer_float (or half float) enables the flow field; without it stirring is disabled but the paint still animates.
- Three fullscreen-triangle programs:
  1. Field sim (only when float targets exist): a ping-pong pair of RG16F textures at CSS-size/8 (clamped 8..320 per axis). Each pass advects the previous field: the pointer's motion segment deposits a Gaussian push (radius 90 CSS px) into the field, which is then multiplied by a decay exp(-dt/1.6). Fast pointer moves are split into sub-segments of at most ~27 px so the stroke stays continuous; when energy drains below 0.05 both targets clear.
  2. Paint: renders the composition at a low block resolution. Each output cell samples the flow field offset (when stirring) and up to 4 whirlpools, then evaluates the swirl paint: polar coordinates with angle = spin + 302.2 - 20 * (swirl * radius + (1 - swirl)), radius scaled by 30/scale; an 8-iteration domain loop (uDetail 1..8 truncates it) pushes uv through sine/cosine warps advanced by the flow clock; three band masks c1/c2/c3 come from the warped distance with contrast shaping (contrastMod = 0.25 * contrast + 0.5 * swirl + 1.2), lighting adds a bright sheen on band edges, color3 forms the gaps. Output is clamped with a per-cell hash dither.
  3. Screen (only when crt > 0): samples the paint target nearest-neighbour onto a native-resolution canvas, darkening a scanline band per device-pixel row (period = device pixel size, dip 34% on dark cells only), multiplying an edge vignette (78% at the borders), and boosting 10%; mask alpha from the paint target.
- Pixelation: block size = max(round(pixelSize * dpr), budget, 1) where budget grows so canvas pixels stay under 2.4M; the canvas backing store is the block resolution (x device when CRT is on so scanlines are real) and CSS `image-rendering: pixelated` applies when pixelSize > 0 and the device block >= 2; paint coordinates multiply by block size so edges stay crisp.

## Motion & interaction

- Base motion: the flow clock advances dt * speed * 7; a slow rotation term (rotationSpeed, clamped +-10) advances at 0.2x; the swirl angle = -0.4 + rotation + steer + intro unwind.
- Intro (2.2s): the paint starts collapsed — an extra +2.6 spin, swirl boosted +0.55, and the reveal uniform 0 so only gap colour shows — then eases out with cubic ease-in-out; uReveal mixes from gap to paint.
- Steer: with the pointer inside and mouseInteraction on, the pointer's horizontal position adds up to +-0.35 * mouseStrength to the swirl angle, eased with tau 0.8s.
- Stirring: the pointer's per-frame motion (scaled 0.85 * mouseStrength, 0.4x under reduced motion) pushes into the flow field along the movement segment; the paint samples the field subtractively, so dragging smears and folds the paint. Field energy tracks recent motion and self-clears.
- Whirlpools (clickSwirl, not reduced): a left-button click inside the container spawns a twirl (max 4 concurrent, 3.2s life) whose direction follows the pointer's last horizontal velocity; its twist strength ramps in over 0.25s and fades over 2.95s, radius grows 150 -> 240 px, and it rotates paint around its centre with a Gaussian falloff.
- prefers-reduced-motion: base motion runs at 0.2x pace, stir deposits at 0.4x, clicks spawn no twirls, intro skipped.

## Scheduling & lifecycle

- Frame cap none (rAF-driven); the loop pauses when the tab is hidden or the container leaves the viewport (IntersectionObserver + visibilitychange wake it). Self-sleep: when speed = 0, rotationSpeed = 0, the intro finished and nothing is settling (steer easing, field energy, twirls), the loop stops and wakes on pointermove, pointerdown, resize or prop changes (a wake hook re-renders once and re-checks quality).
- Resize is coalesced to the next frame; ResizeObserver re-sizes canvas and both flow-field targets; DPR = min(devicePixelRatio, maxDevicePixelRatio).
- Unmount: cancel the frame, disconnect observers, remove every window/document listener and canvas context-lost/restored listeners, delete both flow targets, paint target, vertex array and all programs. Context loss stops rendering; restore rebuilds everything (component holds a generation counter that re-runs the effect). Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color1 | string | "#DE443B" | First paint colour (hex / rgb()). |
| color2 | string | "#006BB4" | Second paint colour. |
| color3 | string | "#162325" | Gap colour between the bands. |
| contrast | number | 3.5 | Band crispness 0.5–10 (higher = sharper colour splits). |
| lighting | number | 0.4 | Edge sheen strength 0–1.5. |
| swirl | number | 0.25 | Base twist of the vortex 0–1. |
| speed | number | 1 | Paint flow speed, >= 0. |
| rotationSpeed | number | 0 | Extra global rotation, -10–10. |
| scale | number | 1 | Pattern scale 0.2–5 (higher = smaller features). |
| detail | number | 5 | Domain-loop iterations 1–8 (higher = more marbling). |
| offset | [number, number] | [0, 0] | Centres the vortex away from the middle. |
| pixelSize | number | 1.5 | Base pixel block size 0–24 (0 disables pixelation intent). |
| crt | number | 0 | CRT scanline + edge mix 0–1. |
| mouseInteraction | boolean | true | Enables steering and stirring with the pointer. |
| mouseStrength | number | 1 | Stir/steer strength 0–3. |
| clickSwirl | boolean | true | Clicks drop whirlpools. |
| intro | boolean | true | Unwinds from a collapsed swirl over 2.2s on mount. |
| lightMode | boolean | false | Gap colour lifts toward white. |
| opacity | number | 1 | Canvas opacity 0–1. |
| maxDevicePixelRatio | number | 2 | DPR cap 0.5–3. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Balatro.jsx and Balatro.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the paint swirls continuously with crisp pixel blocks; dragging the pointer stirs and smears the paint and it relaxes back; clicking drops whirlpools that twist and dissipate; the intro unwinds once; color1/2/3, contrast, lighting, swirl, scale, detail, offset, pixelSize and rotationSpeed all respond; crt > 0 shows real per-device-pixel scanlines and edge falloff; lightMode lifts the gaps; prefers-reduced-motion slows to a crawl and skips whirlpools/intro; pausing the tab or scrolling out stops the loop and resumes cleanly; resize keeps the field and canvas aligned; unmount leaves no listeners, observers, targets, programs or frame loop; the canvas never overflows the container at 375 / 768 / 1440 wide.
