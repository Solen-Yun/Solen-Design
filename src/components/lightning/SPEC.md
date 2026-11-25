Implement the "Lightning" component from zero: one to four crackling bolts of light standing vertically in the frame, their channels wandering with domain-warped noise, branches forking off and blinking, the whole discharge flickering like a strobe; the bolts lean toward the cursor and a heat glow clings to it, and clicking anywhere calls down a pinned strike that grows a leader to the click point, discharges with re-strikes and a screen flash, then fades. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: Lightning.jsx (entry, pointer spring, strike bookkeeping) and Lightning.css (one rule: the root canvas itself, class lightning-container, display block, width/height 100%). React >= 18; no runtime dependencies. No iframe.
- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false; canvas pixel size = element size × min(dpr || devicePixelRatio, 2), recomputed by a ResizeObserver that also redraws immediately.
- One program, one 4-vertex triangle strip; fragment shader precision highp float, `#version 300 es`. All rendering is procedural — no textures.

## Bolt field (fragment shader)

- Space: uv = (2·gl_FragCoord − resolution) / resolution.y, rotated by angle degrees for the bolt coordinates while heat/lean use unrotated space. The pixel size constant is 2 / resolution.y; 8 (or 7 below 1400 px height) octaves of period-8 gradient noise (hash-based, smootherstep weights) build fbm.
- The channel: q = p × size + drift (drift = 8 × phase so the pattern streams upward with time) plus per-bolt seed offset; warpField displaces x with a domain-warped fbm whose high octaves are suppressed near the channel (weight = 1 − smoothstep over |x estimate|, reach shrinking ×0.62 per octave) multiplied by WARP 2.1 — the zigzag hugs a wandering spine; the pinned variant subtracts an fbm pin so strikes bend around their own base. distance = length((x, max(front − y, 0))) so leaders end at their front.
- Output channels per bolt: halo energy = glow(d, width × (1 + heat × 0.6)) with glow(d, w) = w/(d + w·0.08)/(1 + (d/(3.5w))²); white core = smoothstep box of half-width 0.0032 × thickness, capped at strength 1.6; inner line = glow at 0.55 × width.
- Branches (branches 0–1 → up to 6): each branch k has hashed start height in [−0.75, 0.9] (pinned: [0.12, reach]), span 0.22–0.7 clamped above the base, side, slope 0.35–1.15 and jagged noise offset × along; taper = (1 − along)^1.6 × fade-in/out; blinking branches gate their gain through a per-branch 0.03–0.42 window of fract(phase × 3) smoothed — they flicker on and off — modulated by the global flicker(seed).
- Flicker: steady = 0.82 + 0.18·sin(phase·13)·sin(phase·7) plus three hashed burst pulses exp(−t·7)·(0.75 + 0.45·sin(70t)); mix(1, steady + bursts × 0.9, flicker 0–1).
- Pointer: heat = presence × mouseStrength × exp(−dist²/0.09) brightens nearby energy (+1.4), adds 0.012-scale crackle noise and widens the core; each bolt leans toward the cursor: near = exp(−(lane − pointer.x)²/0.5), lean = presence × strength × near × exp(−(p.y − pointer.y)²/0.14), displacing x by lean × clamp(pointer.x − lane, ±0.45) × 0.55.
- Reveal: intro sweeps a soft front up the screen over 420 ms (smoothstep(0, 0.08, uv.y − front)); branch gain is gated by it.

## Strikes (clicks)

- clickStrike on: pointerdown inside the canvas picks the next of 4 ring-buffered strike slots, records the point, a random seed and reach = distance to the angle-rotated top of the frame + 0.2. A strike renders as a pinned bolt whose leader front descends from the sky to the point over 0.11 s (front = reach × (1 − progress^1.6)); branches start no lower than just above the front.
- Envelope: while the leader grows, 0.45 + 0.35 × progress; at contact it jumps to 1.8·exp(−t·5.5)·(0.85 + 0.2·sin(70t)) with echo re-strikes adding exp(−(t−0.17)·9) and 0.7·exp(−(t−0.33)·10); a screen flash accumulates 0.5·exp(−t·9) (+0.25 at 0.17 s) and brightens every bolt; the whole strike fades out over its last 0.4 s of a 1.3 s life. Each strike also contributes a radial ground-glow term.

## Colour output

- color parses 3/6-digit hex (invalid input falls back to pale blue 0.5/0.6/1). Dark mode: lit = 1 − exp(−color × energy × 0.9), mixed toward white by hot = clamp(core + smoothstep(6, 20, energy·intensity) × 0.55); alpha = max channel. Light mode: stroke = smoothstep(1, 3.6, line × intensity) plus halo (1 − exp(−energy × 0.35)) × 0.15 as coverage; ink = color × 0.82 mixed to white by hot × 0.85. fade (0–1) multiplies a soft edge mask on all sides; opacity multiplies output (premultiplied alpha).

## Pointer physics & timing

- The drawn pointer follows the raw pointer with a spring (stiffness 120, damping 19) integrated in ≥120 Hz sub-steps — the lightning's lean has visible momentum; presence eases in ~0.3 s and out ~0.55 s. First contact snaps the spring to the pointer. Listeners: window pointermove/pointerdown (passive), window pointerout (leaving the document), ResizeObserver, IntersectionObserver, visibilitychange.
- phase advances dt × speed / 10 (wrapping at 1) unless paused or reduced motion; strikes and intro run on performance.now.
- Frame loop self-sleep: keeps scheduling while the noise drifts (moving), a strike is younger than its life, the intro is running, or the spring/presence is still settling; otherwise it stops, leaving the last frame painted, and wakes on pointer activity (mouseInteraction on), clicks, resize or visibility.

## Reduced motion & lifecycle

- prefers-reduced-motion: flicker forced to 0, phase frozen, strikes and pointer presence disabled (goal 0) — a static bolt pair renders on demand.
- Unmount: cancel the frame, disconnect both observers, remove every window/document listener, delete buffer and program. Same-page instances are independent. Prop changes re-render immediately via a refresh pass (no engine rebuild).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#4d6bff" | Bolt colour; 3/6-digit hex, unparsable input falls back to pale blue. |
| bolts | number | 1 | Number of parallel bolts, clamped 1–4. |
| spread | number | 0.6 | Lateral separation between bolts. |
| branches | number | 0.5 | Branch density 0–1; up to 6 forks per bolt. |
| xOffset | number | 0 | Lanes centre offset in uv units. |
| angle | number | 0 | Rotates the whole system, in degrees. |
| size | number | 1 | Noise scale of the wander, floored at 0.05. |
| thickness | number | 1 | White core width multiplier, floored at 0. |
| glow | number | 1 | Halo width multiplier, floored at 0.01. |
| intensity | number | 1 | Overall brightness, floored at 0. |
| speed | number | 1 | Upward drift speed of the discharge, floored at 0. |
| flicker | number | 0.6 | Strobe intensity, clamped 0–1. |
| mouseInteraction | boolean | true | Bolts lean toward the cursor with a heat glow. |
| mouseStrength | number | 1 | Lean and heat strength, floored at 0. |
| clickStrike | boolean | true | Clicking calls a lightning strike to that point. |
| intro | boolean | true | 420 ms reveal sweep on mount. |
| fade | number | 0 | Edge fade fraction, clamped 0–1. |
| opacity | number | 1 | Overall opacity, clamped 0–1. |
| lightMode | boolean | false | Ink-on-light output for bright pages. |
| paused | boolean | false | Freezes the drift; strikes still render. |
| dpr | number | devicePixelRatio | Render pixel ratio, clamped to 2. |
| className | string | "" | Extra class on the canvas. |
| style | CSSProperties | - | Inline styles on the canvas. |

## Delivery & validation

- Deliver the complete content of Lightning.jsx and Lightning.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: 1–4 bolts drift upward with wandering channels and blinking branches; flicker strobes; cursor lean has spring momentum and heat crackle follows; click strikes grow a leader downward, discharge with echo flashes and a ground glow, then fade; four rapid clicks ring-buffer without sticking; bolts/spread/xOffset/angle/size/thickness/glow/intensity/flicker all take effect; light mode prints readable ink on white; speed 0 and paused freeze the drift; prefers-reduced-motion renders a static calm field with no strikes; resize redraws at the right aspect; hidden or offscreen stops the loop; unmount leaves no listeners or GPU objects; 375 / 768 / 1440 wide without overflow.
