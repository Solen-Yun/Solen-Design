Implement the "ReflectiveCard" component from zero: a metal ID card rendered in WebGL2 — the card face is a beveled metal plate whose surface reflects a live environment: a looping video, the user's webcam, or (with neither) a procedural studio room. Tilting the card with the pointer swings the reflection like real metal, a chamfered bevel catches rim light along the rounded corners, and brushed-grain ripples warp the mirror. The default layout is an ID badge (verified badge, status dot, name/role, ID number and a fingerprint tile); any custom children replace it. Full specification follows; it must not depend on external pages, images or font files; media comes only through the videoSrc prop or the webcam.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: ReflectiveCard.jsx and ReflectiveCard.css. React >= 18; runtime dependency on the icon set `@hugeicons/react` + `@hugeicons/core-free-icons` (two icons: a checkmark badge and a fingerprint).
- Root is a `<div class="reflective-card">` sized by width/height (px or CSS length), max-width 100%, perspective 900px, touch-action pan-y. The body (`__body`) carries radius, theme base colour, theme shadow, and the live transform `translate3d(0, var(--rc-lift), 0) rotateX(var(--rc-rotate-x)) rotateY(var(--rc-rotate-y))` plus opacity `var(--rc-presence)`; overflow hidden, isolation isolate.
- Inside the body, in paint order: a full-bleed `<canvas>` (the WebGL plate), the content column (`__content`, flex column, padding clamp(radius·0.8, 16, 22)px), and a `__rim` span (1px inset ring + top highlight). Two hidden `<video>` elements (1px, opacity 0) act as texture sources: one for videoSrc (muted, loop, playsInline, crossOrigin anonymous), one for the webcam stream.
- Theme palettes injected as CSS variables: dark — base #1d1c22, ink #f4f4f5, muted at 60%, tile gradient #3a3644→#27242f, rim white 7%/10%, deep black shadow; light — base #e7e7ea, ink #18181b, white tile gradient, dark rims, softer shadow.
- Default content: header with the badge chip (icon + text) and, pushed right, a status line (coloured 6px dot from statusColor + status text); identity block pushed to the bottom — name (24px, letter-spacing −0.02em, balance-wrapped) and role (muted 14px); footer with the ID label (12px muted) over the ID value (15px monospace, tabular, ellipsed) and a 44px rounded tile holding the fingerprint icon. Empty strings skip their blocks; children replace everything inside `__content`.

## WebGL pipeline

- Context: webgl2, alpha true, premultipliedAlpha true, antialias false, depth/stencil off. If the context or any program fails the canvas stays blank but the card still works (CSS-only plate). Context loss freezes the loop; restore rebuilds everything.
- One fullscreen triangle, three programs:
  1. CAPTURE — samples the video and webcam textures with cover-fit UV maps (webcam mirrored horizontally), each weighted by its fade-in mix; picks mip levels so the env buffer runs near-native resolution; writes RGB plus the luma-weighted mean (gamma-corrected) as alpha for tone normalisation.
  2. BLUR — separable gaussian (radius ≤ 40, sigma = blur × envScale; the vertical pass adds roughness: sigma × (1 + 1.5·roughness) + 10·roughness), running over a MIRRORED_REPEAT buffer sized by envScale = clamp(2.5/blur, 0.12, scale) × overscan 1.2 — stronger blur shrinks the buffer.
  3. PLATE — the card face. Rounded-rect SDF gives antialiased coverage; a chamfer band (width = bevel, ≤ radius) adds an outward slope to the normal; gradient noise (two octaves, warpScale-scaled) adds ripple; brushed grain (three horizontally stretched value-noise bands) roughens along y by roughness². The view vector reflects off this normal, and q = reflected xy samples the blurred env (procedurally mixed: without media a studio room — soft vertical fall, one bright diagonal strip light, ceiling band, side band; with media the captured scene). A softbox key + top + side studio light and a pointer glare (two exponential lobes × slope-glint × shine) add highlights; metalness mixes dark chrome (tint × scene × metal + highlights) or light brushed alloy, theme-blended; a filmic-ish rolloff caps highlights, gamma-corrects, and dithers by ±1/255.
- Tint parses 3/6-digit hex and rgb(); channels are gamma-boosted before mixing; unparsable falls back to white. Grayscale 1 (the default) collapses the reflection to luma.

## Motion & media

- Pointer tilt: mouse enter/move and touch drag normalize the pointer to ±1 over the card; two spring pairs (stiffness 120, damping 16; slowed to 24/9 during the intro) drive the aim; the plate rotates by tiltStrength (0–30) degrees at full deflection, mirrored into the CSS vars. Leave/touch-up releases back to centre and fades the glare light out (0.45s; 0.9s while slowed). Reduced motion pins the tilt to 0 but keeps the render loop.
- Intro (skipped under reduced motion): presence 0 → 1 over 650ms (cubic-eased into opacity/lift), lift 14px → 0, the card starts held at 0.62/−0.55 deflection with glare up and the spring slowed for 1400ms, then swings to rest.
- Media lifecycle: sources refresh every frame when the underlying element's currentTime/currentSrc changes; each source fades its mix in over ~0.35s when ready and out when not; the capture weight is the combined mix of both. videoSrc sets the looped video playing (autoplay skipped under reduced motion; play/pause also follows viewport visibility); webcam requests `facingMode: 'user'` at ideal 640×480 with audio off, reports failures through onWebcamError, and stops all tracks on detach/unmount.
- Frame-loop self-sleep: renders only while springs move, presence < 1, or any media is playing/fading; the canvas resizes (DPR ≤ 2) via ResizeObserver; the env buffer re-renders only when blur/roughness/size or source mixes change. An IntersectionObserver and document visibilitychange gate the loop. Unmount cancels the frame, disconnects observers, removes listeners and deletes all GL objects. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | "Alexander Doe" | Cardholder name in the default layout. |
| role | string | "Senior Developer" | Role line under the name. |
| badge | string | "Verified" | Top-left badge text with the checkmark icon. |
| status | string | "Active" | Top-right status text. |
| statusColor | string | "#22c55e" | Colour of the status dot. |
| idLabel | string | "ID number" | Footer label. |
| idValue | string | "8901 2345 6789" | Footer value, set in monospace. |
| children | ReactNode | - | Replaces the whole default card content. |
| theme | "dark" \| "light" | "dark" | Card chrome and plate shading. |
| videoSrc | string | - | Looping video URL reflected by the plate. |
| webcam | boolean | false | Reflects the user's camera (asks for permission). |
| onWebcamError | (error: Error) => void | - | Called when the camera is unavailable or denied. |
| tint | string | "#ffffff" | Metal tint colour (hex / rgb). |
| metalness | number | 1 | Chrome ↔ brushed-alloy mix, 0–1. |
| roughness | number | 0.3 | Surface roughness 0–1: blurs the reflection and strengthens grain. |
| blurStrength | number | 6 | Reflection blur, 0–40. |
| grayscale | number | 1 | Desaturation of the reflected media, 0–1. |
| warp | number | 0.6 | Ripple warp strength on the surface normal, 0–2. |
| warpScale | number | 1 | Ripple size scale, 0.2–4. |
| shine | number | 1 | Studio-light highlight strength, 0–3. |
| bevel | number | 3 | Chamfer width in px, 0–16. |
| glare | number | 0.5 | Pointer glare strength, 0–1. |
| enableTilt | boolean | true | Pointer-driven card tilt. |
| tiltStrength | number | 12 | Max tilt angle in degrees, 0–30. |
| intro | boolean | true | Lift-and-settle entrance animation. |
| width | number \| string | 320 | Card width. |
| height | number \| string | 500 | Card height. |
| radius | number | 24 | Corner radius in px (drives padding and tile radius). |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of ReflectiveCard.jsx and ReflectiveCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. The default texts are content seeds, not branding — leave them as defaults exactly as listed.
- Validate: with no media the plate still shows the procedural studio reflection, bevel and grain; with videoSrc the reflection follows the video (cover-fit, desaturated by default) and fades in; webcam mixes in mirrored and reports errors; tilting swings the reflection and swings back on leave; the intro lifts and settles once; theme dark/light swap the chrome; children replace the layout; radius scales padding and tile; context loss and restore recover without errors; reduced motion skips intro and tilt; hidden/off-screen pauses; unmount stops the camera stream and frees GL objects; 375 / 768 / 1440 wide without overflow.
