Implement the "AeroShards" component from zero: five silk ribbons made of thousands of faceted glass shards streaming on layered depths through a field of survey markers, each shard catching studio light along its beveled edges, refracting the environment through its body, with depth-of-field, bloom, film grain and a vignette. The cursor brushes shards aside, a click fires an expanding shockwave ring, and holding gathers nearby shards into a small orbiting cluster that spins out on release. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGPU, two files plus one dependency: AeroShards.jsx (entry, shard simulation, WGSL shaders) and AeroShards.css (all styles). Rendering runs through the tiny vgpu helper (init, surface, target, uniforms, storage, sampler, draw, frame); the only runtime dependency is `vgpu`. WebGPU is required: if `navigator.gpu` is missing, device init or compilation fails, or the device errors later, the component stops and calls `onError` with an Error (the container stays empty, nothing throws).
- Root is a `div.aero-shards-container` (position relative, width/height 100%, overflow hidden); the canvas is appended at mount (class aero-shards-canvas, absolute, inset 0, 100% x 100%) and removed at unmount. Extra className and style are forwarded to the container. Premultiplied alpha canvas in the preferred format.
- Content = 5 depth levels. Each level owns one ribbon path; `count` shards are distributed across levels by shares 26% / 23% / 20% / 17% / 14% (last level takes the remainder). Levels sit at depths 2.7 / 3.9 / 5.6 / 8.1 / 11.6 (camera at 4, focus at 3.1), drawn with per-level fade 1 / 0.8 / 0.52 / 0.32 / 0.2 and size growth 1 / 1.3 / 1.8 / 2.6 / 3.6.
- Shard generation is deterministic (seeded PRNG, seed 1337, rebuilt when count changes): three shape families — a 3-corner shard (55%), a 4-corner sliver (25%), a 4- or 5-corner plate (20%); each shard stores its 2D outline (centered, up to 5 corners), thickness 0.06–0.10, size 0.6–1.85, lane/lateral offset, layer offset, yaw/bank/pitch, tint 0–1, drift phases and rates, path phase, and spring state (offset, velocity, tilt, tiltVelocity, flash, gather).
- Ribbon paths are sampled at 160 points and re-parameterized by arc length. Placement prop picks between four path sets: "full" = five diagonal sweeps across the frame with per-level slopes and gentle s-curves; "left"/"right" = mirrored vertical cascades hanging at per-level offsets; "center" = a closed elliptical ring per level. Placement changes blend through spring-damped weights (stiffness 4, damping exponential decay 4/s) so all ribbons melt from one layout to the next.
- Camera orbits the origin at radius 4; yaw/pitch lean toward the pointer with parallax (yaw target (px-0.5) * parallax * 0.14, pitch x 0.08) via springs (stiffness 38, damping 11); focal length = height/2 * 4 * scale.

## Shading (WGSL)

- Shards render as instanced screen-space quads: the vertex stage projects the shard's convex prism (top and bottom outlines) and expands a bounding quad; per fragment, an analytic ray/prism intersection (up to 7 planes) yields entry point, normal and depth written to gl-equivalent frag_depth (1 - 0.3/viewDepth). Two passes per group: a solid pass (full coverage, depth-writing) and an edge pass (premultiplied blend, no depth write) that antialiases outline coverage.
- Normals are beveled: near silhouette edges (both caps and side walls) the normal bends toward the edge by up to 45 deg, with softness widened by pixel footprint and curvature rate.
- Glass material: Schlick fresnel, environment from a studio function (key light lobe, rim lobe, two rect lights), then up to 3 internal bounces of refracted light (eta 1.5) accumulating Beer-Lambert absorption through the body and escaped refraction light; edge glow mixes body/accent. Chrome material: pure mirror studio environment tinted by the body. Light mode swaps to a bright flat studio environment with alpha from fresnel and edge angle.
- Depth-of-field: per level sigma = depthOfField * height * 0.012 * |1 - 2.75/depth| capped at 2% of height; levels with sigma >= 0.45 get a separable Gaussian blur pass; a directional depth-shadow pass (12-step ray march over the depth buffer) darkens shards behind neighbours for chrome only (dark 0.62, light 0.32, glass 0). Two render groups at 1.0 and 0.5 resolution sort the work by sigma.
- Post: 4-level bloom chain (bright-pass prefilter with glow threshold, 4-tap downsample, 4-tap blur, weights 0.4/0.3/0.2/0.1), then a finish pass: tonemap 1 - exp(-color * 1.3), bloom halo/(1+halo), per-frame hash grain x grain, smootherstep vignette from the borders x vignette, optional paper background composite (backgroundColor parsed; "transparent" keeps premultiplied alpha).
- Survey markers: instanced quads on a drifting lattice per level (spacing ~0.42 * depthScale^0.55, drifting at speed * 0.045). Style "plus" draws two crossed bars, "dots" a soft disc; unknown styles disable markers. Brightness = gaussian proximity to the ribbon + a random blinking subset (7%) + press-ring boost; the marker nearest the pointer (levels 0-2) fades in a bracket frame around itself. Markers behind the ribbons read as dim survey points; near ones glow.

## Motion & interaction

- Streaming: path parameter advances by dt * speed * 0.09 / pathLength per level; roll (0.08/s * speed), twist phase and drift advance alongside. Shards ride their path point with lane offset across the ribbon (width = spread * (0.15 + 0.035 * depth) modulated along the path), billow (lift wave x billow x 0.16 x depthScale) and sway, per-shard wobble noise, and a twist rotation around the path axis (twist prop).
- Intro (3.4s): each level's shards slide in along the path with a decaying glide offset and a bank-in, staggered by level (level * 0.22), path position and a per-shard arrival random; markers sweep in left-to-right after the ribbons.
- Hover (mouseInteraction, not reduced): a ray from the pointer pushes shards within a Gaussian reach (0.24 * depthScale / scale) sideways — mostly perpendicular to the path — and tilts them toward the ray; force scaled by mouseStrength x presence (presence eases 0.25s in). The camera lean above rides on the same pointer.
- Click pulse (pulseOnClick, short press, not reduced): an expanding ring in screen space (up to 4 concurrent, 2.6s life, radius age * 2.3 minus a per-level lag) flashes shards as it passes (flash up to 0.75, decay tau 0.45), tilts them and pushes them radially outward; markers brighten in the band.
- Hold-to-gather (holdToGather, press held > 0.18s): shards of levels 0-2 within a growing reach ((0.22 + reach) / scale, reach grows to 0.55) of the ray point at focus depth join a cluster; each joined shard gets an orbit slot (angle, radius, wobble, direction) and is pulled in with a spring (pull 30 x gather, gather eases 0.3s) while tilting; on release the cluster spins out (tiltVelocity kick) and frees the shards.
- prefers-reduced-motion: intro, hover, click pulses and gathering are disabled and the stream freezes; the frame still renders the composed scene.
- Scheduling: the loop renders while visible and the page is visible; it self-sleeps after 30 quiet frames when nothing transient is settling (placement weights, camera lean, flashes, presence, rings, hold, intro). ResizeObserver re-sizes every render target on container resize. count changes rebuild the shard set.
- Unmount: cancel the frame, run every cleanup (observers, listeners, MessageChannel), dispose the GPU helper and remove the canvas. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| shardColor | string | "#896ABD" | Base body colour of the shards. |
| accentColor | string | "#A855F7" | Accent colour for lights, glow and markers. |
| backgroundColor | string | "transparent" | Paper colour composited behind the scene; "transparent" keeps alpha. |
| lightMode | boolean | false | Bright studio look instead of the dark glass one. |
| placement | "full" \| "left" \| "right" \| "center" | "full" | Ribbon layout; changes crossfade with springs. |
| material | "glass" \| "chrome" | "glass" | Shard surface: refractive glass or mirror chrome. |
| count | number | 1300 | Shard count, clamped 100–6000. |
| shardSize | number | 1 | Shard size multiplier, 0.2–4. |
| spread | number | 1 | Ribbon width / lateral scatter, 0–3. |
| twist | number | 1 | Rotation of shards around the path axis, 0–3. |
| billow | number | 1 | Wave lift and sway along the ribbons, 0–3. |
| speed | number | 1 | Stream speed multiplier, 0–4. |
| scale | number | 1 | Camera focal length multiplier, 0.4–2.5. |
| depthOfField | number | 0.75 | Blur strength for out-of-focus levels, 0–1. |
| glow | number | 0.35 | Bloom strength, 0–2. |
| grain | number | 0.06 | Film grain strength, 0–0.5. |
| vignette | number | 0.3 | Edge vignette, 0–1. |
| intro | boolean | true | Plays the 3.4s staggered ribbon entrance. |
| mouseInteraction | boolean | true | Enables hover brush, camera lean and press effects. |
| mouseStrength | number | 0.6 | Hover push strength, 0–1. |
| markers | "plus" \| "dots" | "plus" | Survey marker style; anything else hides markers. |
| pulseOnClick | boolean | true | Short clicks fire an expanding shockwave ring. |
| holdToGather | boolean | true | Holding gathers nearby shards into an orbiting cluster. |
| parallax | number | 0.5 | Camera lean amount following the pointer, 0–1. |
| paused | boolean | false | Freezes the stream (interaction still settles). |
| dpr | number | 2 | Device pixel ratio cap, >= 0.5. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |
| onError | (error: Error) => void | - | Called when WebGPU is unavailable or the device errors. |

## Delivery & validation

- Deliver the complete content of AeroShards.jsx and AeroShards.css plus install steps and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: ribbons stream continuously with beveled glass highlights; switching placement melts the layout across; hover brushes shards aside and leans the camera; a short click fires an expanding ring that flashes shards and markers; holding gathers a cluster that orbits and spins out on release; markers brighten near ribbons, blink randomly and frame the nearest one; glass vs chrome, light mode, count, spread, twist, billow, depth-of-field, glow, grain and vignette all respond; backgroundColor paints paper behind or keeps alpha; prefers-reduced-motion renders a settled static scene with no press effects; WebGPU missing calls onError once with no thrown error; unmount disposes everything; the canvas never overflows the container at 375 / 768 / 1440 wide.
