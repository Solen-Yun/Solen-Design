Implement the "SpecularButton" component from zero: a glassy button whose rounded edge carries a moving specular light. The light patch slides along the outline toward the cursor, brightens as it approaches, and rests with a faint idle glow at the bottom-left corner when the cursor is away; a thin hairline in the base colour stays visible under the light at all times, and a click widens and brightens the patch. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: SpecularButton.jsx (entry, interaction state, shaders) and SpecularButton.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a native `<button>` with class specular-button plus a size modifier specular-button--sm/md/lg: display inline-flex, align-items center, justify-content center, gap 0.5em, margin 0, border 0, border-radius var(--sb-radius), font inherit, font-weight 500, line-height 1, letter-spacing 0.01em, color var(--sb-text-color), background color-mix(in srgb, var(--sb-tint) calc(var(--sb-tint-opacity) × 100%), transparent), box-shadow 0 10px 24px -14px rgba(0, 0, 0, 0.45), backdrop-filter blur(var(--sb-blur)), cursor pointer, -webkit-tap-highlight-color transparent, transition transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1). Sizes: sm pads 10px 20px / 0.875rem, md 14px 28px / 1rem, lg 18px 38px / 1.125rem. :active scales to 0.97; :focus-visible draws a 2px outline in color-mix(text 55%, transparent) offset 3px; :disabled drops opacity to 0.5, keeps the default cursor and cancels the active transform.
- Inline CSS custom properties from props: --sb-radius = radius px, --sb-tint = tint, --sb-tint-opacity = tintOpacity, --sb-blur = blur px, --sb-text-color = textColor; any additional style object merges last, and unknown props pass through to the native button.
- Exactly two children: a canvas (class specular-button__light, aria-hidden) absolutely positioned at inset -24px — 24px overscan on every side, width/height 100% + 48px, z-index 1, pointer-events none — carrying the WebGL light; and a label span (class specular-button__label, position relative, z-index 2) wrapping the children.
- The canvas renders a single fullscreen triangle from one STATIC_DRAW buffer bound to attribute location aPosition (location 0, bound with bindAttribLocation) inside a VAO; the shader space is canvas pixels with the button centred inside the overscanned frame.

## WebGL2 light layer

- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth false, stencil false; if the context or program is unavailable, fail silently — the button still works, only the light is missing.
- Fragment shader `#version 300 es`, precision highp float. Rounded-box SDF: q = abs(p) - b + r; d = length(max(q, 0)) + min(max(q.x, q.y), 0) - r, with p measured from the button centre and b the half size.
- Perimeter mapping: loopPosition converts any point to a normalized position in [0, 1) walking the rounded rectangle — each quarter spans innerX + innerY + (π/2) × r where inner = b - r; corner regions resolve with atan2, straight runs clamp to the inner edge; x < 0 mirrors into the second/fourth quarters, y < 0 completes the loop. The same formula exists twice: once in GLSL for every rim pixel, once in JS for the JS-side aim/rim helpers.
- Light window: lobe(position, center) = 1 - smoothstep(window.x, window.x + window.y, wrapped gap), where the gap wraps around the whole perimeter (fract(position - center + 0.5) - 0.5). The patch is a key lobe at uSpot plus a back lobe at uSpot + 0.5 contributing 45%: streak = key + back × 0.45.
- Rim bands: width = max(thickness × uPx × mix(1, max(key, back), 0.6), 0.35) — the lit rim thickens slightly under the patch; band = smoothstep(-width - 0.6, -width + 0.6, d) × (1 - smoothstep(-0.6, 0.6, d)) hugs the outside of the outline. A constant hairline in baseColour: hair = smoothstep(-uPx - 0.6, -uPx + 0.6, d) × (1 - smoothstep(-0.6, 0.6, d)), drawn at 60% alpha.
- Glow: streak × 0.2 × exp(-|d + width × 0.5| / (5 × uPx)) hugging the lit rim, plus an interior light pool: inside × 0.08 × exp(-dot(pool, pool)) where pool = (p - uEntry) / (halfY × vec2(1.6, 1.1)) and uEntry is the rim point at uSpot pulled toward the centre by pull = 1 - min(0.35 × halfY, |rim|) / max(|rim|, 1e-4). The pool term is multiplied by uGlow; the whole light is light = clamp((band × streak + glow × uGlow) × uIntensity, 0, 1).
- Output (premultiplied): outColor = lineColour × light + baseColour × hair × 0.6 × (1 - light).
- Colour parsing uses an offscreen 1×1 2d canvas probe (fillStyle round-trip through getImageData) and caches results in a Map, so tint/line/base accept any CSS colour syntax the browser can parse.

## Interaction

- The pointer is tracked on window (pointermove, passive) as raw client coordinates; documentElement pointerleave marks it unknown; pointerup/pointercancel for non-mouse pointers mark it unknown; pointerdown on the button itself sets press = 1 unless disabled.
- aim(): converts the pointer into button space (offset from the button centre, divided by rect.width / view.width), measures the distance outside the rect as hypot of the per-axis overhangs, and maps proximity (px, floor 1) through smoothstep t²(3-2t) into near ∈ [0, 1]. Outside the button the spot targets the nearest rim position; inside, it sways around the rest position with depth²-scaled offsets ((x/halfX) × 0.06 horizontal, (y/halfY) × 0.02 vertical). followMouse off, disabled, or an unknown pointer returns no target.
- restSpot is the rim position of the bottom-left corner inset by r × (1 - √½) — where the light parks when idle.
- Frame loop: dt clamped to 0.05 s. The spot eases toward (steering ? target : restSpot) with 1 - exp(-dt × 8), wrapping the difference into [-0.5, 0.5); with autoAnimate on (and motion not reduced) it instead advances by speed / (2π) per second whenever the cursor is not steering. The light level eases (rate 7) toward autoAnimate ? 1 : idleIntensity + (1 - idleIntensity) × near; press decays as exp(-dt × 5). Final intensity = intensity × (level + press × 0.8); the window = (shineSize / 360 + press × 0.06, shineFade / 360 + 0.0001), so a press both widens the patch and brightens it.
- Self-sleep: the loop keeps requesting frames only while settling (spot diff > 2e-4, level delta > 1e-3, or press > 2e-3) or while spinning; ResizeObserver re-measures (canvas = button size + 24 px per side, ratio = min(devicePixelRatio, 3)); IntersectionObserver stops rendering offscreen and resets the clock on return; prop changes wake through a per-render effect.
- Reduced motion: autoAnimate never spins; following, press and idle glow still work.
- Unmount: cancel the frame, disconnect both observers, remove every listener, delete buffer/VAO/program, and force-lose the context through WEBGL_lose_context when the canvas is already detached. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | "Get Started" | Button label or any content. |
| size | "sm" \| "md" \| "lg" | "lg" | Padding and font size of the button. |
| radius | number | 18 | Corner radius in px. Values past half the height make a pill. |
| tint | string | "#ffffff" | Colour of the glass body. |
| tintOpacity | number | 0.04 | How strongly the tint fills the body, 0 clear glass to 1 solid button. |
| blur | number | 0 | Backdrop blur behind the button, in px. |
| textColor | string | "#f5f5f5" | Colour of the label. |
| lineColor | string | "#ffffff" | Colour of the light on the edge. |
| baseColor | string | "#525252" | Colour of the hairline edge that stays visible under the light. |
| intensity | number | 1 | Brightness of the light on the edge. |
| idleIntensity | number | 0.35 | How much of the light stays on when the cursor is away, 0–1. |
| shineSize | number | 10 | How much of the edge the light covers at full strength, in degrees around the button. |
| shineFade | number | 34 | How far the light fades out past that, in degrees around the button. |
| thickness | number | 1.2 | Width of the lit edge in px. |
| glow | number | 1 | Soft light around the lit edge and inside the glass; 0 keeps only the crisp line. |
| followMouse | boolean | true | Moves the light to the part of the edge nearest the cursor. |
| proximity | number | 250 | Distance in px at which the light starts to follow the cursor and brighten. |
| autoAnimate | boolean | false | Keeps the light on and circling the edge whenever the cursor is away. |
| speed | number | 0.35 | How fast the light circles when autoAnimate is on, in turns per second. |
| disabled | boolean | false | Disables the button. |
| onClick | MouseEventHandler | - | Click handler. |
| type | "button" \| "submit" \| "reset" | "button" | Native button type. |
| className | string | "" | Extra class names for the button. |
| style | CSSProperties | - | Inline styles for the button. |

## Delivery & validation

- Deliver the complete content of SpecularButton.jsx and SpecularButton.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the patch follows the cursor around the outline with inertia and brightens with proximity; the cursor away leaves the idle glow at the bottom-left corner; the base hairline stays visible everywhere at all times; a press widens the window and flashes the rim; sizes sm/md/lg, radius up to pill, tint from clear glass to solid, backdrop blur, text/line/base colours in any CSS syntax; intensity, idleIntensity, shineSize, shineFade, thickness and glow all take effect; autoAnimate circles without the cursor and hands over to it when it arrives; disabled blocks press and click; keyboard focus shows the outline; prefers-reduced-motion stops the circling; resizes keep the light aligned; offscreen buttons stop rendering; unmount leaves no listeners or contexts; no horizontal overflow at 375 / 768 / 1440 wide.
