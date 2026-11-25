Implement the "Ballpit" component from zero: a soft-lit pit of physically simulated spheres in WebGL2 — balls rain in, pile up with real contacts, and you can shove them with a cursor sphere, grab and throw them, or blast them apart with a click burst that flashes the point light. All styles live in the JS (no CSS file). Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + WebGL2, one file only: Ballpit.jsx (entry, physics, shaders; all container/canvas styles are inline JSX). React >= 18; no runtime dependencies. No iframe.
- Root is a `div` (position relative, width/height 100%, overflow hidden) merged with the user's style, holding one `canvas` (display block, 100% x 100%, aria-hidden). className is applied to the container.
- Context: webgl2 with alpha, premultipliedAlpha, depth, powerPreference high-performance, no stencil/antialias. If the context or program fails the component silently renders nothing.
- Camera: perspective fov 50 deg at z = 20 looking at the origin; aspect clamped at 1.5 (wider viewports scale the fov so the pit stays a fixed world height, and ball sizes scale by fit = sqrt(halfW*halfH / (tan^2 * 20^2 * 1.5)) clamped 0.4-1). DPR = min(devicePixelRatio, dpr prop or device ratio, 2).
- Balls render as instanced quads (4 verts x 3 instanced vec4 attributes = position+radius, linear colour+flag, occlusion dir+weight). The fragment stage intersects each pixel ray with the sphere analytically, writes gl_FragDepth from the true surface point so spheres intersect correctly, and shades with a compact GGX PBR: studio environment of three analytic lobes (key, fill, back rim), environment BRDF approximation, Smith visibility, Schlick fresnel, wrap diffuse from a moving point light, optional subsurface scatter lobe, optional clearcoat lobe, ACES tonemap and 2.2 gamma, +-1/255 dither.
- Materials are presets: satin (roughness 0.42, coat 0.35), matte (0.92, no coat), gloss (0.2, full coat), frosted (0.55, coat 0.6, translucent rim via a frost flag: alpha falls to 0.5 at the silhouette with a bright rim), metal (metalness 1). lightIntensity above 20 is divided by 200 (watts -> units); the point light sits near the cursor while it is inside, jumps to a click burst point with a decaying flash, and rests bottom-centre otherwise; lightColour is parsed to linear space.
- Per-ball contact shading: every physics pair accumulates an occlusion direction and weight (Gaussian around the contact, floor contact adds a downward weight) — the shader converts it to cavity AO (shadows prop) for diffuse and 70% of it for specular.
- Colours: hex strings (3/4/6 digits, "#" optional) or 0xRRGGBB numbers, converted to linear; assigned round-robin per ball. Sizes are random in [minSize, maxSize] x fit.

## Physics (CPU)

- Integration: gravity = gravity * 45, velocity damping friction^(dt*60), optional drift wander (sin/cos per-ball phase), speed cap 16; sub-steps = ceil(dt / (1/180)) up to 6.
- Broadphase: uniform spatial grid (cell = biggest ball x 2.3, or 2.8 while shade accumulation runs). Narrowphase gathers ball-ball pairs plus ball-wall and ball-cursor constraints into a contact list (capacity n * 12).
- Solver: sequential impulses, 8 iterations (5 above 800 balls), accumulated impulses so restitution applies once (bounce for approach speeds under -1.5, positional targets otherwise); the grabbed ball gets zero weight. Positional correction: 2 passes, 0.3 factor, 0.01 slop, mass-weighted. Walls: the box is halfW x halfH x depth with wallBounce restitution; the floor adds tangential 0.995 damping; balls entering from above ignore the ceiling until they drop in.
- Cursor: a sphere of radius cursorSize * fit follows the pointer on the cursor's z plane with a spring (tau 0.06s) while followCursor is on; it collides with balls like a kinematic body. Grab: pressing (left button, not on a, button, input, textarea, select, label, [role="button"]) picks the nearest ball hit by the pointer ray (radius x 1.15), drags it on its own z plane with the grab offset, and release throws it with the tracked release velocity capped at 22. Click burst: a release within 400ms with < 6px movement fires a radial impulse over reach = halfH * 0.7 (falloff (1 - d/reach)^2 * 26, small balls lighter, +25% upward bias) and flashes the light at that point.
- Intro: balls start above the pit and rain in (vy -4..-9) when intro and no reduced motion; reduced motion glides them from the centre to random targets instead (extra damping settles them). Count changes spawn only the new balls (also raining in).

## Scheduling & lifecycle

- The frame loop runs while the container intersects the viewport and the page is visible; it self-sleeps after 0.8s of stillness (max per-ball displacement under 0.6 units/s) and wakes on pointer events, visibilitychange, resize, count/size/colour changes and every prop change (a wake hook).
- ResizeObserver re-sizes the canvas and projection immediately; a dpr prop change re-sizes too.
- Unmount: cancel the frame, disconnect observers, remove every listener, delete buffers, vertex array and program, and release the WebGL context after a tick. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| count | number | 200 | Ball count, clamped 1–4000. |
| colors | (string \| number)[] | ["#ffffff"] | Ball colours, hex strings or 0xRRGGBB numbers; empty falls back to white. |
| material | "satin" \| "matte" \| "gloss" \| "frosted" \| "metal" | "satin" | Surface preset. |
| minSize | number | 0.5 | Smallest ball radius. |
| maxSize | number | 1 | Largest ball radius. |
| gravity | number | 0.5 | Gravity strength (0 = weightless float). |
| friction | number | 0.9975 | Velocity damping per 60Hz tick, 0.5–1. |
| wallBounce | number | 0.95 | Restitution against walls, 0–1. |
| bounce | number | 0.85 | Restitution between balls, 0–1. |
| depth | number | 2 | Pit depth along z, >= 0. |
| drift | number | 0 | Random wander force, >= 0. |
| followCursor | boolean | true | A cursor sphere shoves balls around. |
| cursorSize | number | 1 | Cursor sphere radius, >= 0 (0 hides it). |
| grab | boolean | true | Press picks up a ball; drag and release throws it. |
| clickEffect | "burst" | "burst" | Quick-click impulse effect. |
| lightColor | string | "#ffffff" | Point light colour (any CSS colour). |
| lightIntensity | number | 1 | Light power; values above 20 are read as watts (/200). |
| exposure | number | 1 | Tonemap exposure, >= 0. |
| shadows | number | 0.6 | Contact-cavity darkening 0–1. |
| intro | boolean | true | Balls rain in from above on mount. |
| dpr | number | - | Overrides the device pixel ratio cap (2). |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |

## Delivery & validation

- Deliver the complete content of Ballpit.jsx plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: balls rain in and settle into a pile; dragging the cursor sphere shoves them; pressing grabs the ball under the cursor and release throws it with momentum; a quick click blasts nearby balls and flashes the light; changing count/material/colours/gravity/friction/bounce/depth/drift responds live; frosted balls read translucent at the rim; metal balls mirror the environment; the pit stays inside the box with no tunnelling at high speeds; reduced motion glides balls in instead of dropping and skips bursts; tab-hide and scroll-out stop the loop which resumes cleanly; resize keeps the projection correct; unmount leaves no listeners, observers, GL objects or frame loop; 375 / 768 / 1440 wide without overflow.
