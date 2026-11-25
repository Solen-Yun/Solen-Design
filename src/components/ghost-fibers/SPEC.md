Implement the "GhostFibers" component from zero: a full-bleed ambient layer where three long ribbons made of thousands of individually rendered glowing fiber beads twist, fold and drift through a shallow depth of field. The pointer pulls the camera into a gentle look-around spring, can pull the focal plane onto the nearest fiber or part the fibers around the cursor, and a click fires a bright pulse that runs along the nearest ribbon. Rendered with WebGL2, additive bloom, film grain and vignette; it also supports an ink-on-paper light theme. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GhostFibers.jsx (entry, camera/pointer logic, all shaders) and GhostFibers.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div class="ghost-fibers-container">` — position relative, width 100%, height 100%, overflow hidden — wrapping a single `<canvas class="ghost-fibers-canvas" aria-hidden="true">` that is absolutely positioned to fill the container (block, 100%/100%). The className prop appends to the container class; all other extra props spread onto the container, so it can be styled inline like a normal div. Container must be sized by the parent.
- WebGL2 context with alpha: true, premultipliedAlpha: true, antialias: false, depth/stencil: false. If the context or any shader program fails to build, the effect silently renders nothing (the container stays transparent) and never throws.
- `EXT_color_buffer_float` is probed once; when available the bloom chain uses RGBA16F render targets, otherwise RGBA8. Six programs: an instanced fiber-dot vertex stage shared with the dust stage (both output to one fragment shader), and four fullscreen passes (bright pass, down pass, up pass, composite).
- The scene: up to 3 ribbons (`layers`, clamped 1–3). Each ribbon is a centerline running 24 world units along +x, with per-ribbon placement (ribbon 0 straight through the middle; ribbon 1 offset y −4.6, z slope −0.08, phase 2.4; ribbon 2 offset y +2.0, z slope +0.12, phase 4.1) and per-ribbon brightness gain (1 / 0.5 / 0.55) and tint weight. The centerline waves: y = waves × (0.52·sin(0.43x + 0.31t + ph) + 0.26·sin(0.79x − 0.23t + …)) + y-offset + x·slope, z = waves × 0.65·sin(0.33x + 0.19t + …) + z-offset. The whole ribbon twists about its tangent: twist angle = twist × 0.483x + accumulated roll + phase·0.6 + layer·volume·0.42 + 0.5·sin(0.26x + 0.27t + phase). Ribbons half-width = 0.62 × spread × (0.78 + 0.22·cos(πs)) so they taper at the ends.
- Fibers: each ribbon draws `threads` (6–180, default 72) fibers × 260 × density beads as instanced quads (4 vertices, no buffers). Fiber position across the ribbon v spans ±1 (plus a small per-fiber jitter and a layer offset −1/0/+1 scaled by volume); each bead has a random depth offset up to 0.12 that grows toward the ribbon ends (× (0.35 + 6s²)). Beads flow along the ribbon: the along-position is fract((bead + flow + seed·dots)/dots) − 0.5, where flow advances at 12 × flow-setting per second, so fibers crawl along the strands.
- Dust: 420 × particles specks (default 0.5 → 210) scattered in a 9 × 5.4 × 6 box, drifting on three slow sines, twinkling with a pow-8 sine, sharing the same bokeh fragment shader.
- Camera: perspective fov 0.56 rad, eye fixed at z = 7.5 looking down −z. Orientation = yaw(perspective × 0.85 + look.x × 0.22), pitch(0.12 − look.y × 0.14), roll(rotation setting in degrees + accumulated roll). Roll accumulates at speed × rollSpeed per second. The look target is a spring (stiffness 30, damping 11) driven by the pointer: lookX = (px/w − 0.5) × 0.5, lookY = (0.5 − py/h) × 0.5 while the pointer is inside, back to 0 otherwise. Scene scale also fits: fit = clamp((width/height)/1.5, 0.6, 1) so tall and narrow containers keep the composition.
- Depth of field: the focal plane rests at 7.5 + focusDepth × 3 world units. Each bead's circle of confusion = depthOfField × |1 − focus/depth| × viewportHeight × 0.035, clamped to a per-frame max that shrinks as total instance count grows (22 × sqrt(56000 / instances), clamped ×0.45–1). The fragment shader blends a gaussian core into a bokeh disk (with a faint rim brightening) as coc/radius rises; bead energy is conserved so defocus glows soft instead of bright. A "crowd" term dims beads that bunch up (facing-width × screen-spacing factor). When a ribbon folds edge-on (its normal turns away from the eye), foldGlow raises intensity up to ×7 — that is the bright fold flash. `tips` (0–1) adds a hot bead parked just past a random end of each fiber; `sparkle` adds pow-36 twinkle per bead; strength varies per fiber 0.45–1.0 and fades with |layer| × volume.
- Intro: over 2.6 s beads fade in along the ribbon length (smoothstep of intro × 1.3 − s − seed·0.12), so strands appear to grow out of the haze with a cubic ease.
- Colour parsing accepts any CSS colour string via a 1×1 offscreen canvas fill probe: glowColor (default #8b5cf6 violet) is the base; secondaryColor defaults to glow × 0.8; lineColor defaults to glow pushed 72% toward white (in lightMode it stays glow). The `gradient` prop picks the mixing axis: "depth" blends glow→secondary for beads beyond the focal plane, "along" blends along the strand (smoothstep s ∈ −0.42–0.42), "across" blends across the ribbon width. Highlighted beads (folds, twinkles, pulses, tips) lean toward lineColor.
- Pointer pulse: clicking (left button, inside the container, not on an a/button/input/textarea/select/label/[role="button"]) finds the nearest point on the active ribbons (97 samples per ribbon, screen-space distance) and starts a pulse there: it runs along the strand as a gaussian in s (width² 0.0018), holds strength (1 − age/1.8)², and lights the clicked ribbon at full strength, others at 0.35. Intensity gain ×4 on the bead, ×5 highlight toward lineColor.
- Pointer hover: hover position eases to the pointer at rate 1/0.08 s; presence eases to 1 at 1/0.3 s (decay 1/0.6 s), scaled by mouseStrength. hoverEffect "focus" (default) re-aims the focal plane at the nearest ribbon point each frame (focus eases at 1/0.35 s) — the fibers around the cursor snap into focus; "part" pushes bead screen positions radially away from the cursor (push = 0.55 × radius × exp(−d²/r²), radius 140 px, smoothstepped from the center); "none" disables both.

## Post processing

- Bright pass samples 4 offsets with a smoothstep(0.35, 1.2, peak) threshold; a 5-level half-res chain is downsampled (9-tap) then up-blended additively back to level 0, multiplied by glow. Light mode skips bloom entirely.
- Composite: light = (scene + bloom × glow) × brightness, tone mapped 1 − exp(−light × 1.25); vignette multiplies a smootherstep mask that only darkens within vignette × 0.3 of the edges; animated film grain (two hashed values −1..1, reseeded per frame, indexed by pixel cell) is scaled stronger in dark areas (0.25 + 0.75·sqrt(peak)); light mode instead renders ink = 1 − exp(−alpha × brightness × 1.5) of the fibre hue over transparent white-friendly output, grain modulating the ink edge.

## Frame loop, resize & lifecycle

- One rAF loop; it keeps running only while something moves or settles: not paused and not reduced-motion (time += dt × speed, flow += dt × flow × 12, roll += dt × speed × rollSpeed), or the hover presence / look spring / focus / pulse are still converging. When everything settles, it stops; pointer moves, visibility change, resize or any prop change (a wake effect runs after every render) restart it. dt clamped to 0.05 s.
- Resize: DPR = min(devicePixelRatio, dpr prop or 1, 2); if the longest side exceeds 2400 px the ratio is scaled down so neither dimension's pixels pass 2400. Scene + 5 bloom targets reallocate on demand. ResizeObserver on the container, IntersectionObserver pauses rendering while off-screen, visibilitychange resets the clock.
- Reduced motion: intro completes instantly, time/roll/flow freeze (the scene renders as a static frame), hover focus/part and click pulses are disabled; prop changes still re-render once.
- Unmount: cancel the frame, disconnect observers, remove all window/document listeners, delete the VAO, all render-target textures/framebuffers and all six programs. Multiple instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| glowColor | string | "#8b5cf6" | Base colour of the fibers. Any CSS colour string. |
| lineColor | string | - | Colour of fold/twinkle/pulse highlights. Defaults to glowColor pushed toward white. |
| secondaryColor | string | - | Second gradient colour. Defaults to a darker glowColor. |
| gradient | "depth" \| "along" \| "across" | "depth" | Axis along which glow blends into the secondary colour. |
| speed | number | 0.5 | Master animation speed; 0 freezes the drift. |
| scale | number | 1 | World scale of the ribbons, 0.3–3. |
| rotation | number | 18 | Camera roll around the view axis, in degrees. |
| rollSpeed | number | 0.15 | How fast the roll keeps turning, rad-equivalent per second × speed. |
| layers | number | 3 | Ribbon count, 1–3. |
| waves | number | 1 | Amplitude of the ribbon's sine waviness; 0 makes straight strands. |
| twist | number | 1.2 | Twist along each ribbon; higher = tighter spiral folding. |
| threads | number | 72 | Fibers per ribbon, clamped 6–180. |
| volume | number | 0.7 | Spread of fibers across layers and around the ribbon core, 0–2. |
| spread | number | 1 | Ribbon half-width, 0.2–3. |
| density | number | 1 | Beads per fiber (260 × density), 0.2–3. |
| thickness | number | 1 | Bead size multiplier, 0.2–4. |
| flow | number | 0.4 | How fast beads crawl along the strands. |
| fiberStyle | "dots" \| "dashes" \| "lines" | "dots" | Bead shape: round dots, short dashes, or stretched line segments. |
| tips | number | 0 | 0–1: bright hotspot beads at the fiber ends. |
| foldGlow | number | 1 | 0–3: extra glow when a ribbon folds edge-on. |
| perspective | number | 0.65 | 0–1: how much yaw/pitch lean the base camera keeps. |
| depthOfField | number | 0.85 | 0–2: strength of the bokeh blur away from the focal plane. |
| focusDepth | number | 0 | −1–1: shifts the resting focal plane closer (−) or farther (+). |
| particles | number | 0.5 | Dust specks (420 × particles), 0–2. |
| sparkle | number | 0.5 | 0–2: twinkle intensity of fibers and dust. |
| glow | number | 0.8 | Bloom strength, ≥ 0; 0 disables the bloom chain. |
| brightness | number | 1 | Exposure multiplier, ≥ 0. |
| vignette | number | 0.3 | 0–1: darkening toward the edges. |
| grain | number | 0.06 | Animated film grain strength, ≥ 0. |
| mouseInteraction | boolean | true | Enables pointer look, hover effects and click pulses. |
| hoverEffect | "focus" \| "part" \| "none" | "focus" | What hovering does: pull focus onto the nearest fibers, part them around the cursor, or nothing. |
| mouseStrength | number | 1 | Multiplier on hover presence and focus pull, ≥ 0. |
| pulseOnClick | boolean | true | Clicking fires a pulse running along the nearest ribbon. |
| intro | boolean | true | Plays the 2.6 s grow-out-of-haze intro. |
| lightMode | boolean | false | Renders as ink-on-paper: fibres become dark strokes over a light ground, no bloom. |
| paused | boolean | false | Freezes drift and intro while still rendering. |
| dpr | number | - | Overrides the device pixel ratio for the canvas (clamped to 2). |
| className | string | "" | Extra class on the container div. |
| style | CSSProperties | - | Inline styles for the container div. |

## Delivery & validation

- Deliver the complete content of GhostFibers.jsx and GhostFibers.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: three twisted ribbons of glowing beads render on a dark container with bokeh blur front/back; fibers crawl slowly along the strands and the whole weave rolls at rollSpeed; pointer moves swing the camera on a damped spring; hoverEffect "focus" snaps focus to the fibers under the cursor and "part" opens a hole around it; clicking fires a bright pulse that travels along the nearest ribbon and fades in ~1.8 s; folds flash as ribbons turn edge-on; gradient depth/along/across recolour differently; glowColor/lineColor/secondaryColor parse any CSS colour; lightMode turns the scene into ink strokes with no bloom; paused freezes motion; reduced motion renders a still frame with no pulses; resize keeps composition at 375 / 768 / 1440 widths without overflow; tab-away and scroll-away stop the loop; unmount leaves no listeners, observers, GL objects or frame loop; two instances on one page are independent.
