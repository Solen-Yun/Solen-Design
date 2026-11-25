Implement the "DotGrid" component from zero: a canvas of dots on a spring lattice that behaves like a sheet of jelly — the cursor flicks through it and drags dots along its path, release lets them wobble back with a springy overshoot, neighbours stay coupled so deformations ripple like cloth, and every click fires a radial shockwave that pushes through the grid. Fast-moving dots elongate into capsules pointing along their motion and light up toward an active colour. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: DotGrid.jsx (entry, spring simulation, shaders) and DotGrid.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `div.dot-grid` (position relative, width/height 100%) holding `canvas.dot-grid__canvas` (absolute inset 0, block, 100% × 100%, pointer-events none so the page above stays clickable). className appends after the base class, style applies to the container. If the webgl2 context or the program fails, the component silently renders the empty container.
- Context: webgl2, alpha true, premultipliedAlpha true, antialias false. One program draws a 4-vertex triangle strip instanced once per dot; per-instance attributes pack position (x, y), velocity (vx, vy), energy and intro scale (24-byte stride). Blending premultiplied (ONE, ONE_MINUS_SRC_ALPHA) over a cleared transparent canvas; the fragment outputs colour·alpha with alpha.
- All settings live in a ref refreshed every render. Changing dotSize or gap rebuilds the grid; colour/style changes just trigger one re-render. Everything else (springs, shocks, pointer) keeps running continuously without remounts.

## Grid & simulation

- Grid layout: cell = max(2, dotSize + gap); cols/rows = floor((size + gap)/cell), centred in the canvas with dot centres inset size/2. Rest positions are stored per dot; rebuilding re-allocates all Float32Arrays and the instance buffer.
- Each dot is a damped harmonic oscillator pulling its offset back to zero: ω = 4/(ζ·returnDuration) with ζ = 1 − 0.85·bounce (bounce 0 → critically damped, 1 → heavy overshoot), stiffness ω², damping 2ζω. Neighbour coupling (tension, floored at 0): coupling = (tension·900)²/cell² applied as a 4-neighbour Laplacian on offsets and velocities, with viscosity √coupling·0.06 — dots drag their neighbours, so a flick ripples outward like jelly.
- Integration: semi-implicit Euler with sub-stepping — up to 24 steps per frame, step count chosen so h satisfies a stability limit (√(stiffness + 8·coupling) + damping + 8·viscosity), clamped to at least 120 Hz.
- Pointer drive: while the cursor is inside and mouseInteraction is on, the drive magnitude is 6500·tanh(pointer speed/900)·strength px/s² — fast flicks push much harder. Each dot within the proximity radius (floored at 1 px) receives weight = smootherstep(1 − distance/radius)·drive aimed along the pointer's velocity direction plus 0.6·the radial away-from-cursor direction, so the grid is both dragged and shoved aside.
- Click shockwaves: a pointerdown inside spawns a shock at the cursor (maximum 6 concurrent, oldest dropped) when clickShock is on. The front expands at 650 px/s up to shockRadius; its amplitude = smootherstep(1 − front/shockRadius)·shockStrength·cell·0.24. Dots near the front (Gaussian profile, width cell·1.4) get a radial position push, a matching velocity kick and a small outward force, so the wave visibly travels through the jelly. Shocks are dropped once the front passes shockRadius + 3 widths.
- Pointer velocity is measured from move-event timestamps and blended at 0.6 per event, decaying with a 0.08 s time constant; a presence scalar eases in/out over ~0.2 s and gates the proximity tint.
- Energy per dot = min(1, 0.85·|velocity|/380 + 0.35·|offset|/(cell·2.2)), boosted by cursor proximity (smootherstep·0.4·presence) — energy drives colour, swelling, elongation and glow.

## Rendering

- Vertex: each dot's quad stretches along its motion direction into a capsule — half-length = min(dotSize·2, speed·stretch·0.02) with stretch floored at 0; the direction snaps toward the nearest 90° axis by smoothstep(8, 70, speed), so slow dots stay round and fast ones align horizontally or vertically. Radius = 0.5·dotSize·scale·(1 + swell·energy) with swell floored at 0. The quad is padded for the glow halo.
- Fragment: an antialiased (fwidth) circle SDF, or a rounded rectangle for shape "square" (corner radius 0.3·radius, sized length + radius × radius). Colour mixes baseColor toward activeColor by clamp(energy·1.2, 0, 1); a halo = glow·energy·0.5·exp(−d/max(radius·1.3, 0.6)) extends the alpha outside the body. Colours accept 3/6-digit hex (unparsable falls back to white). An optional edge fade smooths alpha to 0 within fade·0.4·min(width, height) of the canvas borders; overall opacity multiplies everything.
- Intro: dots pop in along a circle expanding from the centre at 1.25× the grid reach per second (band width 4 cells) over 1.6 s — scale follows a back-out ease (overshoot 1.9) and each dot flashes with sin(appear·π)·0.6 energy as it lands. intro=false skips it.
- prefers-reduced-motion: drive, shocks, swell/stretch and the intro are all disabled — a static grid whose dots still tint and glow under a stationary cursor.
- paused freezes the frame loop entirely (the last frame stays on screen).

## Interaction & lifecycle

- Window-level pointermove/down (passive), pointerout (leaving the window), and window blur clear the inside flag; canvas-relative coordinates refresh the view rect on every event and resize.
- The loop self-sleeps: it stops when no shocks are alive, the intro finished, pointer velocity dropped below ~1 px/s, presence has settled, and every dot is within 0.02 px of rest with |velocity| < 0.5 px/s — then a single settled frame remains. Wake sources: pointer events, ResizeObserver on the canvas (rebuilds the grid), IntersectionObserver (offscreen pauses), visibilitychange (hidden cancels the frame, returning wakes), prop-change effects.
- Device pixel ratio = min(dpr ?? devicePixelRatio, 2).
- Unmount: cancel the frame, disconnect observers, remove all listeners, delete both buffers, the vertex array and the program. Same-page instances are fully independent (own arrays, own shocks, own pointer state).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| dotSize | number | 5 | Dot diameter in px; floored at 0.5 at render time. |
| gap | number | 18 | Spacing between dots in px. |
| baseColor | string | "#3a3446" | Resting dot colour; 3/6-digit hex. |
| activeColor | string | "#ffffff" | Colour of energised dots; 3/6-digit hex. |
| proximity | number | 140 | Cursor tint radius in px; floored at 1. |
| strength | number | 1 | How hard the cursor drives the dots. |
| bounce | number | 0.6 | Spring overshoot 0–1; 0 settles critically damped. |
| tension | number | 0.4 | Neighbour coupling; negatives clamp to 0. |
| returnDuration | number | 0.8 | Rough seconds for a dot to spring home. |
| shockRadius | number | 320 | How far a click shockwave travels, in px. |
| shockStrength | number | 5 | Shockwave push amplitude. |
| swell | number | 0.8 | How much energised dots grow; floored at 0. |
| stretch | number | 0.5 | How far fast dots elongate; floored at 0. |
| glow | number | 0.5 | Soft halo strength around energised dots; floored at 0. |
| shape | "circle" \| "square" | "circle" | Dot shape. |
| fade | number | 0 | Edge fade towards the canvas borders, 0–1. |
| opacity | number | 1 | Overall opacity, clamped 0–1. |
| intro | boolean | true | 1.6 s radial pop-in on mount. |
| mouseInteraction | boolean | true | The cursor drives the jelly. |
| clickShock | boolean | true | Clicks fire shockwaves. |
| paused | boolean | false | Freezes the whole simulation. |
| dpr | number | - | Overrides the device pixel ratio; clamped to 2. |
| className | string | "" | Extra class on the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of DotGrid.jsx and DotGrid.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: flicking the cursor through the grid drags dots into capsule streaks that snap to the motion axis and light toward activeColor; released dots spring home with overshoot set by bounce and ripple into neighbours set by tension; clicks ring outward as shockwaves (stack up to 6) and deform the lattice as they pass; the intro pops dots in radially with a back-out overshoot; changing dotSize/gap rebuilds the grid centred; baseColor/activeColor/shape/fade/opacity apply live; paused freezes while resize re-lays out cleanly; reduced motion shows a static grid with proximity tint only; the loop settles and stops when quiet and wakes on input; scrolling out or hiding the tab pauses it; unmount leaves no raf, observers, listeners or live GL objects; two instances are independent; 375 / 768 / 1440 wide without overflow.
