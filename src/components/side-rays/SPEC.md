Implement the "SideRays" component from zero: a two-layer fan of light rays entering from a corner or side of its container. The upper and lower halves of the fan carry their own colours; noise-driven shafts shimmer and sway over time; dust motes drift inside the beam; the whole fan leans toward the cursor with a spring and the ray under it brightens. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Visual & layout

- Pure React + CSS + WebGL2, two files only: SideRays.jsx (entry, state machine, shaders) and SideRays.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root element is a `<div>` with class side-rays: position relative, width 100%, height 100%, overflow hidden, pointer-events none. The component does not size itself; the host provides a positioned container with height (the usage example is 100% x 600px). Optional className appends to the root; style passes through as inline styles.
- The only child is a `<canvas>` with class side-rays__canvas: position absolute, inset 0, width 100%, height 100%, display block, aria-hidden. The stylesheet contains only these two rules; the canvas is transparent and the light composites over whatever the host paints behind it.
- Pointer events are attached to window and documentElement (passive) — never to the component's own pointer-events:none node — so the fan still reacts when the cursor travels outside the container.

## Geometry & fan

- Origin table (flipX/flipY mirror the fragment space, side marks a side entry):
  | origin | flipX | flipY | side |
  |---|---|---|---|
  | top-right | 0 | 0 | 0 |
  | top-left | 1 | 0 | 0 |
  | bottom-right | 0 | 1 | 0 |
  | bottom-left | 1 | 1 | 0 |
  | right | 0 | 0 | 1 |
  | left | 1 | 0 | 1 |
- Unknown origin falls back to top-right.
- Fragment space: q = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y — height-normalized and centered; flipX/flipY negate q.x/q.y per the origin table.
- Source point: side origins (right/left) use (aspect * 0.5 + 0.42, 0.3) with heading 3.42 rad; corner origins use (aspect * 0.5 + 0.1, 0.62) with heading -2.48 rad, where aspect = uResolution.x / uResolution.y. The source sits just outside the frame so the beam enters from the edge.
- Per pixel: v = q - source; r = |v|; angle = wrap(atan2(v.y, v.x) - heading) into [-PI, PI]; u = angle * uDensity; aa = smoothstep(0.12, 0.45, fwidth(u)) fades shaft edges to haze when density makes them sub-pixel.
- Two Gaussian fans straddle the heading: offset = uSpread * 0.22; fanA = exp(-((angle + offset) / uSpread)^2 * 1.4); fanB = exp(-((angle - offset) / (uSpread * 1.15))^2 * 1.4). Layer A (rayColor1) is the upper side of the fan, layer B (rayColor2) the lower side.

## WebGL2 rendering

- Context: webgl2 with alpha true, premultipliedAlpha true, antialias false, depth false, stencil false, powerPreference high-performance; if the context or program is unavailable, fail silently — the component renders as an empty layer and logs to console.error. webglcontextlost prevents the default and stops the loop; webglcontextrestored rebuilds the whole GL state by re-running the init effect (the intro does not replay).
- One program. The vertex shader is `#version 300 es` and draws one fullscreen triangle from gl_VertexID (corners = (-1,-1), (3,-1), (-1,3)); no VBO, no attributes; create and bind one VAO.
- Fragment shader `#version 300 es`, precision highp float. Grid hash: p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y). Value noise interpolates the four corner hashes with weights w = f^3 * (f * (f * 6 - 15) + 10).
- Shafts: sway = (0.4 * sin(t * 0.31 + seed) + 0.24 * sin(t * 0.17 + seed * 2.3)) * uSway; n = 0.7 * noise(vec2(u + sway + seed, t * 0.3)) + 0.3 * noise(vec2(u * 2.4 + sway * 1.5 + seed * 1.7, t * 0.45 + 3.0)); width = mix(0.5, 0.1, uSharpness); s = mix(smoothstep(0.5 - width, 0.5 + width, n), 0.5, aa); return mix(0.05, 1.0, s). Layer A samples shafts(u, t, 0.0, aa); layer B samples shafts(u * 0.83, t * 0.6, 17.0, aa), so the two layers breathe out of phase.
- Focus highlight: focus = 1 + uFocus.z * exp(-((angle - uFocus.x) / uFocus.y)^2), multiplied into both layers; uFocus = (focus angle, max(0.06, uSpread * 0.25), focus strength * 1.4).
- Distance: lightA = fanA * shaftsA * focus; lightB = fanB * shaftsB * focus; reach = 1 / (1 + pow(r / 0.4, uFalloff)).
- Light assembly: glowColor = mix(uColorA, uColorB, uBlend); light = (uColorA * lightA * (1 - uBlend) + uColorB * lightB * uBlend) * 2 * reach; light += glowColor * uGlow * exp(-pow(r / 0.4, 2.0)).
- Dust (uDust > 0): sparkle = motes(q, 0.06, t, 0.0) + 0.7 * motes(q, 0.038, t * 0.8, 9.0); light += mix(glowColor, vec3(1.0), 0.6) * sparkle * (lightA + lightB) * reach * uDust * 2.5. motes() drifts a cell grid: p += vec2(t * 0.021, -t * 0.013) + seed * 7.31; skip cells whose hash exceeds 0.5; each speck sits at 0.25 + 0.5 * (hash, hash) of its cell with a 0.1 sin/cos wobble (t * 0.7 / t * 0.6, h * 31 / h * 23); size = mix(0.035, 0.09, hash); edge = |fwidth(grid)| * 0.7; twinkle = 0.55 + 0.45 * sin(t * 1.9 + h * 41); return (1 - smoothstep(size - edge, size + edge, |f - center|)) * twinkle. Specks are multiplied by (lightA + lightB), so they only show inside the rays.
- Envelope: light *= uIntensity * (1 - smoothstep(uReveal * 2.6 - 0.45, uReveal * 2.6, r)) * smoothstep(0.0, 0.35, uReveal).
- Saturation: gray = dot(light, vec3(0.2126, 0.7152, 0.0722)); light = max(mix(vec3(gray), light, uSaturation), 0.0).
- Dither: grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0.
- Dark output (lightMode off): peak = max(light.r, g, b); mapped = 1 - exp(-peak); tone = light * (mapped / max(peak, 1e-4)); tone = mix(tone, vec3(mapped), smoothstep(0.7, 1.0, mapped) * 0.55); shown = clamp(tone * uOpacity, 0, 1); alpha = max(shown.r, g, b); fragColor = vec4(min(clamp(shown * alpha + grain, 0, 1), vec3(alpha)), alpha) — premultiplied alpha.
- Light output (lightMode on, soft tinted ink for light backgrounds): ink = pow(light / max(peak, 1e-4), vec3(2.0)) * 0.75; alpha = clamp(pow(1 - exp(-peak * 2.6), 2.5) * 0.9 * uOpacity + grain, 0, 1); fragColor = vec4(pow(ink, vec3(1.0 / 2.2)) * alpha, alpha).
- Colour parsing: 3/6-digit hex (3-digit expands), rgb()/rgba() first three channels, mapped to [0,1]; unparseable input falls back to white (1,1,1).

## Interaction

- followMouse: the pointer's angle is computed in the origin's mirrored space — x = (px - width/2) / height, y = (height/2 - py) / height, negate per flipX/flipY — then wrapped as atan2(y - source.y, x - source.x) - heading - tilt. The aim target = clamp(pointed, -spread, +spread) * mouseInfluence, so the fan leans but never turns past its own edge.
- The aim follows the target through a spring: stiffness 18, damping 2 * sqrt(18), integrated every frame with dt. The focus highlight eases toward clamp(pointed - aim, -1.5 * spread, +1.5 * spread) with ease = 1 - exp(-dt * 6); its strength eases toward mouseInfluence while tracking and toward 0 otherwise. Tracking requires pointer inside the container, followMouse on, and reduced motion off; when not tracking the target returns to 0 and the fan settles back.
- tilt (degrees, clamped ±180) is added into the aim uniform.

## Timing, performance & lifecycle

- dt = clamp((now - last) / 1000, 0, 0.05); time += dt * speed * (reduced ? 0.3 : 1); speed 0 freezes shimmer and sway but interaction still settles. Each instance starts time at random() * 100 so same-page instances never sway in lockstep.
- Intro: intro on, reduced motion off, first mount — reveal goes from 0 to 1 over 1.6 s; the uniform takes 1 - pow(1 - reveal, 3). Any later mount (context restore) starts fully revealed.
- Frame-loop self-sleep: request the next frame only while (speed > 0 and not reduced) or reveal < 1 or the spring/focus is still settling; IntersectionObserver (offscreen stops) and document visibilitychange gate the loop; pointer events, ResizeObserver, and visibility changes wake it. Resize work is merged into the start of the next frame.
- Canvas pixel ratio: ratio = min(devicePixelRatio, maxDevicePixelRatio (clamped 0.5–3), sqrt(2.4e6 / (cssWidth * cssHeight))); only touch canvas.width/height when the rounded size actually changes.
- Reduced motion: sway uniform 0 (no shimmer sway), tracking off, intro immediate, time factor 0.3 — the scene comes to rest while props and resize keep working.
- Unmount: cancel the frame loop, disconnect both observers, remove every listener, drop spring/focus state; delete the VAO and program when the context is alive. Same-page instances are fully independent — random time phase, own GL resources.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| rayColor1 | string | "#FFC46B" | Colour of the first layer of rays, on the upper side of the fan. |
| rayColor2 | string | "#96c8ff" | Colour of the second layer of rays, on the lower side of the fan. |
| blend | number | 0.6 | Balance between the two layers, 0 only the first colour, 1 only the second. |
| origin | "top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "right" \| "left" | "top-right" | Corner or side the light shines in from. |
| speed | number | 2.5 | How fast the rays shimmer and sway. 0 freezes them. |
| intensity | number | 2 | Brightness of the light. |
| spread | number | 2 | How wide the rays fan out; clamped 0.1–8. |
| density | number | 5 | How many separate rays the light breaks into; clamped 1–40. |
| sharpness | number | 0.5 | Edge crispness, soft haze at 0 to defined beams at 1. |
| tilt | number | 0 | Rotates the rays, in degrees; clamped ±180. |
| falloff | number | 1.6 | How quickly the light fades with distance; lower reaches further; clamped 0.2–6. |
| glow | number | 1 | Brightness of the glow where the light enters. |
| saturation | number | 1 | Colour saturation; 0 is grayscale. |
| dust | number | 0 | Dust drifting in the light, 0–1; specks only show inside the rays. |
| followMouse | boolean | true | The rays lean toward the cursor and the ray under it brightens. |
| mouseInfluence | number | 0.5 | How strongly the rays follow the cursor, 0–1. |
| intro | boolean | true | The rays grow out of their source on mount. |
| lightMode | boolean | false | Renders the rays as soft tinted ink for light backgrounds. |
| opacity | number | 1 | Overall opacity, 0–1. |
| maxDevicePixelRatio | number | 2 | Highest pixel ratio the canvas renders at. |
| className | string | "" | Extra classes for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of SideRays.jsx and SideRays.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all six origins place and orient the fan correctly; the two layers carry their own colours with blend mixing between them; speed, intensity, spread, density, sharpness, tilt, falloff, glow, saturation, dust, and opacity all take effect; dust specks appear only inside the rays; the cursor leans the fan with spring inertia and brightens the ray under it; followMouse off keeps the heading still; the intro grows out of the source; lightMode prints soft ink on light backgrounds; speed 0 freezes; prefers-reduced-motion settles the scene while props keep working; window and container resizes keep the geometry aligned; hidden pages and offscreen canvases stop rendering; missing WebGL2 leaves the page error-free; unmount leaves no listeners or frame loop; no horizontal overflow at 375 / 768 / 1440 wide.
