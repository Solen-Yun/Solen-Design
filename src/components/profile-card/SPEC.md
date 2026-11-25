Implement the "ProfileCard" component from zero: a framed profile card that tilts toward the cursor like a physical card — inside the tilting frame, a holographic foil shines through a tiled pattern over the photo, the photo itself parallaxes against the tilt, a glare spot follows the light, and a footer row shows handle, status dot and a contact button. Dark and light themes, optional backdrop recolouring, an idle intro drift, and optional gyroscope tilt on mobile. Full specification follows; it must not depend on external pages, videos, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: ProfileCard.jsx (entry, tilt engine, theme/foil tokens) and ProfileCard.css (frame, tile, foil layers, footer). Dependencies: React >= 18 and a small icon set (one mail icon for the contact button). No iframe, no canvas.
- Root is a `div.profile-card` (relative, default width 340px, max-width 100%, perspective 1000px, touch-action pan-y) carrying all state as CSS variables written per frame: light position (--pc-light-x/y), pointer percentage (--pc-pointer-x/y), band positions (--pc-band-x/y, pointer × 15%), rotation (--pc-rotate-x/y), photo shift (--pc-shift-x/y), reach (pointer magnitude 0–1), tilt and active scalars. Theme tokens are injected inline: dark frame rgba(38,35,46,0.66) with light edges, light frame rgba(240,240,243,0.8) with dark edges — each theme defines frame fill/edge/highlight/shadow, tile gradient/edge/shadow, ink/muted colours, hover/press filters and shade colour; foil tokens set the hologram blend mode (color-dodge dark, multiply light), hue filter (invert(1) hue-rotate(180deg) light) and sheen tint.
- Inside, the body (flex column, gap 10, padding 10, radius + 10px, backdrop blur(20px) saturate(1.6), transformed rotateX/rotateY) holds: the main tile (aspect-ratio 4/5, rounded, overflow hidden) — sheen (radial white highlight near the light point), holo stack (see below), the photo, a bottom scrim gradient behind the name/title info, and a 1px tile rim; an optional footer row with mini avatar (36px circle), @handle (ink, semibold, ellipsis), status line with a coloured dot, and a 36px-tall contact button (tile background, mail icon, hover brightness, press scale 0.96, focus ring); plus card-level glare, shade and rim overlays.
- Holo stack: a base layer masked by the pattern — an `iconUrl` image tiled at 180% auto, or a full-cover plain gradient when absent — showing a rainbow spectrum repeating-linear-gradient (7 hue stops wrapping) and −45° hologram bars blended colour/hard-light against a pointer-centred falloff; its brightness/contrast/saturate ramp with the active scalar, mix-blend per theme, and the mask shifts opposite the pointer ×1.5 so the foil slides under the photo. When an icon pattern exists on the dark theme, two extra sublayers light up: a luminosity-blended glow (rainbow gradient + pointer radial + SVG feTurbulence grain data URI, brightness/contrast driven by reach) and a difference-blended shift layer at offset positions.
- Photo: oversized by parallax × 2 on every side (object-fit cover, object-position center bottom), translated by the shift vars — it floats against the tilt.
- Glare/shade: a white radial glare near the light point (overlay blend, glare × active) and an opposite dark shade (glare × tilt).
- backdropColor recolours the tile with a vertical color-mix gradient (+12% white top, +18% black bottom) and picks the foil tone by the colour's luminance (dark backdrop → dark foil); without it the tile uses the theme gradient and the theme's foil.

## Tilt engine

- Mouse enter/move aim the pointer target (−1..1 both axes); leave releases to (0,0) with light off. Touch: pointerdown aims and tracks that pointer id, pointerup/cancel releases — so the card tilts while a finger drags across it.
- Springs: x/y integrate at ≥120Hz sub-steps (stiffness 120, damping 16; 24/9 during the intro window), light eases exponentially (τ 0.18 rising, 0.45 falling, 0.9 during intro). The loop settles and sleeps when targets are reached (snapping exactly); wakes on any pointer event, prop change or resize (ResizeObserver re-writes size-dependent vars).
- Rotation targets ±tiltStrength degrees (0 when enableTilt is off or reduced motion); photo shift targets ±parallax px (0 under reduced motion); light/glare/holo scalars still respond — reduced motion keeps the shine but not the tilt/parallax.
- Intro (when enabled and motion allowed): the pointer starts at (0.62, −0.55) with light 1 and springs are softened for 1.4s, so the card drifts from a tilt into rest on mount.
- Mobile tilt (enableMobileTilt): the first click requests DeviceOrientationEvent permission where required, then beta/gamma drive the same aim targets scaled by mobileTiltSensitivity.
- Unmount: cancel frame, disconnect observer, remove listeners. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| avatarUrl | string | "" | Main photo on the tile (bottom-anchored cover crop); tile renders the foil over the backdrop when empty. |
| iconUrl | string | - | Tiled pattern image the holographic foil shines through; enables the glow/shift sublayers on dark. |
| miniAvatarUrl | string | - | Small round avatar in the footer. |
| name | string | "Javi A. Torres" | Name line on the photo scrim. |
| title | string | "Software Engineer" | Title line under the name. |
| handle | string | "javicodes" | @handle in the footer. |
| status | string | "Online" | Footer status text with a coloured dot. |
| statusColor | string | "#22c55e" | Status dot colour. |
| contactText | string | "Contact" | Contact button label; empty hides the button. |
| showUserInfo | boolean | true | Renders the footer row. |
| onContactClick | (event) => void | - | Contact button click handler. |
| theme | "dark" \| "light" | "dark" | Frame/tile/ink theme and default foil tone. |
| backdropColor | string | - | Recolours the tile backdrop; foil tone follows its luminance. |
| radius | number | 16 | Tile corner radius, in px (frame adds 10px). |
| holo | number | 0.8 | Holographic foil strength, 0–1. |
| glare | number | 0.5 | Glare/shade strength, 0–1. |
| enableTilt | boolean | true | Enables the 3D tilt toward the pointer. |
| tiltStrength | number | 12 | Maximum tilt, in degrees. |
| parallax | number | 8 | Photo counter-shift depth, in px. |
| enableMobileTilt | boolean | false | Gyroscope tilt after the tap-to-permit flow. |
| mobileTiltSensitivity | number | 5 | Gyroscope tilt gain. |
| intro | boolean | true | Drifts the card from a tilt into rest on mount. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of ProfileCard.jsx and ProfileCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the frame tilts toward the cursor with springy follow and settles flat on leave; the foil pattern slides opposite the tilt while spectrum colours and bars sweep with pointer position; the photo countershifts within its oversized box; glare and shade track the light; the contact button presses with scale and focus ring; footer truncates long handles with ellipsis; theme light/dark swaps all tokens including foil blend; backdropColor recolours and re-tones the foil; holo/glare at 0 hide their layers; iconUrl patterns show the grain glow on dark; no avatar renders the foil-over-backdrop tile; intro drifts into rest; reduced motion keeps shine without tilt/parallax; mobile tilt works after permission; the loop sleeps when settled; unmount leaves no listeners or observers; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
