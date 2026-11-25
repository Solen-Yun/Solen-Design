Implement the "CircularCarousel" component from zero: a true 3D ring of photo cards standing on a circular track in perspective — drag the ring and it spins with momentum, snaps to the nearest card, drifts on its own, and every card is built from bendable tile strips so the faces follow the curvature of the ring. Four presets reshape the ring into a cylinder, an orbit of billboard cards, a vertical ferris wheel, or an inward-facing panorama, and three intro animations assemble the ring out of nothing. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: CircularCarousel.jsx (entry, ring geometry, camera rig, motion engine) and CircularCarousel.css (all styles). React >= 18, no runtime dependencies. No iframe, no canvas — the ring is real DOM in a 3D transform hierarchy.
- Root is a `<div>` with class circular-carousel: relative, width/height 100%, overflow hidden, touch-action pan-y (pan-x when the wheel preset sets a horizontal axis), cursor grab, grabbing while dragging, an inset 2px focus-visible box-shadow, and attributes data-axis, data-shape, data-ready, data-draggable, data-dragging. It carries role="region", aria-roledescription="carousel", aria-label="Image carousel", tabIndex 0, plus pointer, click and keyboard handlers.
- Scene hierarchy: a view layer (absolute inset 0, with a top/bottom fade mask for the wheel preset and a left/right fade mask for the panorama preset) → stage (fades in 0.45s once data-ready) → camera → ring, all width/height 0 with transform-style preserve-3d; each card is another preserve-3d pivot. Every card holds role="group", aria-roledescription="slide", aria-label "<title or alt>, i of n" and data-cc-index.
- Each card is not one rectangle: with curve enabled it is sliced into 8 vertical strips (8 horizontal strips on the wheel axis) with a 2.5px overlap; every strip is a separately transformed tile whose translate/rotate places it along the circle arc (bend radius = ring radius / curve), and each tile clips its own frame so the photo inside is positioned as one continuous image spanning the whole card. Corner radii are applied per strip so the card silhouette stays rounded; with curve 0 each card is a single flat tile.
- Faces: presets with backfaces render a second mirrored tile set (rotated 180°) so the ring shows a darkened back side — a black inner overlay at opacity 1 − innerShade. Every tile carries a shade span filled with fadeColor whose opacity is the depth fade: depthFade × ((1 − cos(worldAngle))/2)^1.25, so cards fade into the background colour as they turn away; cards more than 86° around in the inward panorama are hidden.
- The ring is auto-fitted to the container: on resize and relevant prop changes the engine samples the projected corners of the visible cards, derives a fit scale = min(1, 0.94 × width / spanX, 0.92 × (height − caption space) / spanY), and applies stage translate + scale so the whole ring always fits without cropping; a bottom 76px band is reserved when captions are on.

## Presets, geometry & intro

- Four presets, each a bundle: cylinder — vertical axis, tilt −5°, perspective 2500px, full curve, cards face outward, backfaces on; orbit — vertical axis, tilt −16°, perspective 1500px, no curve, cards counter-rotate to always face the camera (billboard), spread 1.45×; wheel — horizontal axis (a ferris wheel), perspective 1800px, only 1.7 steps of the ring visible with a fade mask; panorama — camera stands inside the ring looking outward (cards placed at −radius, perspective = radius), full curve, side fade mask, no backfaces. Unknown preset values fall back to cylinder.
- Ring radius is computed from the card pitch: pitch = (along + gap) × spread where along is the card size along the axis; radius = max(chord + (arc − chord) × curve, 0.6 × along) blending the polygon chord with the true arc through curve. cardWidth clamps to ≥40; cardHeight = cardWidth / aspectRatio (clamped 0.2–5).
- Intro animations play once per (re)mount of the image set: assemble (1500ms — the ring starts at 1.6× radius and collapses inward, each card delayed by its angular distance from the front, 1080ms easeOut); rise (1400ms — every card drops from off-screen above with a quintic ease, delayed by angular distance); spin (1800ms — the ring starts offset −300° × direction with a 1.28× radius swell and unwinds); none. prefers-reduced-motion forces none.

## Motion & input

- One self-sleeping rAF engine. Angle is the ring's live position in degrees. A target spring (stiffness 118, critically damped) integrates at 240Hz sub-steps and settles under 0.004° error; free motion eases velocity toward the cruise speed with tau = 0.18 + momentum × 1.5 and, when snap is on and velocity drops under 9°/s, hands off to the nearest-step spring. Autoplay "drift" cruises at speed °/s (speed × direction, sign flipped for the inward panorama); autoplay "step" advances exactly one step every interval seconds (floored at 0.5s); "off" is static.
- Drag: pointerdown (button 0) records the press; after a 5px threshold the ring is captured and rotates 1:1 with the pointer (180° per π × radius × fit pixels, flipped inside the panorama); cross-axis intent cancels on touch. Release samples the last 110ms for velocity (clamped ±1400°/s); with snap on the target predicts velocity × tau × 0.55 ahead before rounding to a step, and speeds above 60°/s set the drift direction. A click right after a drag is suppressed.
- Wheel: horizontal delta only, preventDefault; rotates directly, holds autoplay for 1.6s, and 140ms after the last wheel event snaps to the predicted nearest step. Clicking a card brings it to the front (target set along the shortest 360° path, autoplay held 2.8s) and fires onItemClick(item, index) — the focus step can be turned off. Keyboard: ArrowLeft/ArrowRight step on the vertical axis, ArrowUp/ArrowDown on the wheel axis, Home/End jump to the ends, Enter/Space activate the current card via onItemClick.
- Pointer parallax: while the mouse is inside, the camera eases yaw/pitch toward the pointer (±9° × parallax horizontally, ±6° × parallax vertically, rate 1 − exp(−dt/0.35)); stretch swells the ring radius up to 12% with speed. Pause conditions for autoplay: hover (pauseOnHover), active drag, or inside the interaction hold window; the loop also stops offscreen (IntersectionObserver) and in hidden tabs, resuming on return.
- Active index = the card nearest the front; changes update state, call onChange(index), and are mirrored into a visually hidden aria-live="polite" region ("<label>, i of n"). Optional captions at the bottom show the current title (rise-in 520ms per change) plus a two-digit counter whose digits roll on vertical reels (600ms cubic-bezier(0.22, 1, 0.36, 1)).
- Item swaps: when the items' image sources change, the first 16 images preload (racing a 2400ms timeout). Same-length swaps animate in place — each outgoing photo fades out over 700ms with a per-card delay scaled by its angular distance — while a length change re-runs readiness (stage fades out) and then replays the intro. prefers-reduced-motion kills the intro, autoplay, parallax, stretch and all CSS transitions/animations; unmount cancels the frame, disconnects observers and removes listeners; same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { src: string; alt?: string; title?: string; subtitle?: string }[] | DEFAULT_ITEMS | The ring's photos with alt/title/subtitle captions; ten placeholder photos ship as the default; exact default artwork ships with the code. |
| preset | "cylinder" \| "orbit" \| "wheel" \| "panorama" | "cylinder" | Ring layout bundle; unknown values fall back to cylinder. |
| intro | "assemble" \| "rise" \| "spin" \| "none" | "rise" | Entrance animation; reduced motion forces none. |
| cardWidth | number | 220 | Card width in px (floored at 40); height follows aspectRatio. |
| aspectRatio | number | 1 | Card width ÷ height, clamped 0.2–5. |
| gap | number | 25 | Space between neighbouring cards along the ring, in px. |
| curve | number | - | 0–1 blend between a flat polygon ring and the fully bent arc; defaults to the preset value. |
| tilt | number | - | Camera pitch in degrees; defaults to the preset value. |
| perspective | number | - | Scene perspective in px; defaults to the preset value (radius for panorama). |
| autoplay | "drift" \| "step" \| "off" | "drift" | Continuous cruise, one step per interval, or nothing; reduced motion forces off. |
| speed | number | 14 | Drift speed in degrees per second. |
| interval | number | 3 | Seconds between autoplay steps, floored at 0.5. |
| direction | "left" \| "right" | "left" | Which way drift and steps advance. |
| draggable | boolean | true | Pointer dragging and horizontal wheel rotation. |
| momentum | number | 0.6 | 0–1; how long velocity carries after a fling (rises the coast time constant). |
| snap | boolean | true | Settles onto the nearest card instead of stopping mid-way. |
| pauseOnHover | boolean | true | Pauses drift and stepping while the pointer is over the ring. |
| focusOnClick | boolean | true | Clicking a card rotates it to the front. |
| parallax | number | 0.3 | 0–1; how far the camera leans toward the pointer. |
| stretch | number | 0.5 | 0–1; how much the ring swells with spin speed. |
| depthFade | number | 0.55 | 0–1; how strongly cards fade into fadeColor as they turn away. |
| fadeColor | string | "#000000" | Shade colour painted over receding faces. |
| innerShade | number | 0.6 | 0–1; darkness of the ring's inner/back faces. |
| cornerRadius | number | 12 | Card corner radius in px, applied per strip. |
| captions | boolean | false | Bottom caption with title and rolling-digit counter. |
| onChange | (index: number) => void | - | Called when the front card changes. |
| onItemClick | (item, index: number) => void | - | Called on card click and on Enter/Space. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of CircularCarousel.jsx and CircularCarousel.css plus install steps (react, react-dom) and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: all four presets render their ring shape and switch live; the ring fits its container at any aspect without cropping; dragging spins with momentum and snaps to a card; fast flings coast and re-snap; wheel rotation holds autoplay and snaps after 140ms; clicking a card brings it front-most and fires onItemClick; keyboard arrows, Home/End and Enter all work; drift/step/off autoplay pause on hover, drag, interaction hold, hidden tab and offscreen; intro assemble/rise/spin play on load and on same-length item swaps with per-card staggered fades; curve slices cards into arcs with correct corner radii; captions counter digits roll; depth fade and inner shade darken receding faces; reduced motion disables intro, autoplay, parallax and stretch; resize refits mid-motion; unmount leaves no rAF, observers or listeners; 375 / 768 / 1440 wide without overflow.
