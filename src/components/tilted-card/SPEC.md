Implement the "TiltedCard" component from zero: a 3D card that tilts toward the cursor with spring physics — glare sweeps across the face from the tilt direction, a soft shadow shifts under the card, floating layers parallax at different depths, a caption chip chases the pointer, and the card can flip 180° to a back face on click. It supports window-wide tracking, device-tilt on touch devices, an idle floating drift, and an intro fade-in. Full specification follows; it must not depend on external pages, videos, images (any image comes in through props), font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: TiltedCard.jsx and TiltedCard.css. React >= 18; no runtime dependencies.
- Two exports: `TiltedCard` (default) and `TiltedCardLayer` (named, a parallax helper). Root is a `<figure class="tilted-card">` (plus any className) sized by containerWidth/containerHeight with CSS perspective; it is a flex centring box with touch-action pan-y pinch-zoom, user-select none, no tap highlight.
- Inside, in paint order: `__shadow` — an absolutely centred blurred block (blur 20px, background rgba(0,0,0,0.55)) sized to the image, driven per frame (offset, scale, opacity) as the card's cast shadow; `__body` — the preserve-3d body that receives the transform, sized imageWidth × imageHeight with `--tc-radius`; the front `__face` (overflow hidden, radius, backface hidden) holding the image, children, and the glare/rim/edge spans; an optional back `__face` (rotateY 180deg) with the same overlay spans when backContent is given; an optional `__overlay` (translateZ of overlayDepth, backface hidden) rendered when displayOverlayContent is on; and a `<figcaption>` caption chip.
- The image (`__img`) is object-fit cover, dragged −bleed px on every side and enlarged by 2×bleed so tilted corners never show gaps; bleed = ceil(sin(amplitude) × 24 × parallax) + 1. It parallax-shifts by `--tc-depth: −24` (the deepest layer).
- `TiltedCardLayer` wraps absolutely positioned content with a `--tc-depth` (default 20); layers and the image translate by `calc(--tc-px × depth × 1px)` / `calc(--tc-py × depth × 1px)`, where `--tc-px/py` = sin of the current tilt × parallax — children at depth 0 stay glued to the face, deeper layers float more.
- Glare (`__glare`): a radial gradient at `--tc-gx/gy` (50% ± tilt/reach × 46%) with 8 alpha stops scaled by `--tc-glare`, mix-blend-mode screen. The rim (`__rim`) is a static inset ring (1px white 8% + 1px top highlight 12%); the edge (`__edge`) is a 1px masked ring filled with a radial gradient of the glare colour, so the border lights up on the glare side. Glare colour parses 3/6-digit hex and rgb()/rgba(); unparsable falls back to white.
- Caption chip: white rounded pill (12px text) absolutely positioned, translated per frame to the pointer with a 0.035s lag, rotated up to 14deg opposite the pointer's velocity, springing its opacity in while hovering.

## Motion engine

- All dynamics live in one `useEffect` closure; settings refresh through a settingsRef each render. State holds seven spring pairs (tilt x/y, lift, flip, press, tooltip tilt, tooltip show) integrated at 240 Hz sub-steps: `v += (ω²(target − x) − 2ζω·v)·h; x += v·h`, settling when within epsilon. Tilt spring: ω = 20 × 0.2^smoothness, ζ = 1 − 0.3 × smoothness — smoothness 0 snaps stiff, 1 is slow and bouncy.
- Input: pointer position normalized to ±1 inside the card (hover with mouse/pen, or touch while pressed); `trackWindow` maps the pointer across the whole window instead (per-half normalization, no hover needed); gyroscope input (γ/β drift from `deviceorientation`, normalized by 22°, with a slow 4s re-centring baseline) applies only on coarse pointers when gyroscope is on — iOS permission is requested once on first pointerdown; `floating` adds a layered sinusoidal idle drift. Axis trims one component; reverse flips the sign.
- Lift targets 1 while hovering (mouse/pen), touch-pressing, or keyboard-focused; the body scales by `1 + (scaleOnHover − 1) × lift − 0.02 × press` and the shadow strengthens (`opacity = shadow × (0.6 + 0.4·lift)`, offset y grows with lift, x opposes the tilt, width compresses by |cos(flip)|).
- Flip: with backContent and flipOnClick, clicking (or Enter/Space) toggles the flip spring target 0/180° (ω 9.5, or 18 under reduced motion); the front/back faces hide via backface-visibility. Controlled mode: pass `flipped` and receive `onFlip`; uncontrolled keeps internal state. A press that moves more than 6px cancels the click/flip (drag-out).
- Intro: with intro on (and not reduced motion) the card starts invisible, tilted 16° and 22px low, then fades in over 0.45s (smootherstep) once the IntersectionObserver reports it visible, honouring introDelay.
- Reduced motion: amplitude × 0.3, no intro fade, no tooltip tilt, no floating drift, faster flip; smoothing and listeners otherwise unchanged.
- Frame-loop self-sleep: the loop stops when every spring has settled and no continuous source (floating, gyroscope, spin, intro) is active; wake() hooks fire on every relevant event and prop change. An IntersectionObserver pauses rendering when off-screen. `data-active` toggles on the figure when lifted, raising its z-index.
- Listeners: figure pointerenter/move/leave/down/focus/blur; window pointerup/pointercancel (passive), pointermove (track-window + out-of-card leave), documentElement pointerleave, deviceorientation. Unmount removes all, cancels the frame, disconnects the observer.
- Accessibility: when interactive (flippable or onClick) the figure takes role button, tabIndex 0, aria-pressed (flip state), aria-label (captionText or altText); Enter/Space activate; `:focus-visible` shows a strong rim (2px white + 1px dark).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | - | Face image URL; omitted renders children only. |
| altText | string | "Tilted card image" | Alt text of the image, also the fallback aria-label. |
| captionText | string | "" | Caption chip text; also the aria-label when interactive. |
| containerHeight | string \| number | "300px" | Outer figure height. |
| containerWidth | string \| number | "100%" | Outer figure width. |
| imageHeight | string \| number | "300px" | Card face height. |
| imageWidth | string \| number | "300px" | Card face width. |
| scaleOnHover | number | 1.05 | Hover scale, floored at 0.5. |
| rotateAmplitude | number | 12 | Max tilt in degrees, 0–60. |
| showTooltip | boolean | true | Shows the caption chip on hover (needs captionText). |
| overlayContent | ReactNode | null | Content floating above the face in 3D. |
| displayOverlayContent | boolean | false | Renders overlayContent. |
| overlayDepth | number | 30 | translateZ (px) of the overlay. |
| children | ReactNode | - | Extra face content above the image. |
| backContent | ReactNode | null | Back face content; providing it enables the flip. |
| flipOnClick | boolean | true | Click toggles the flip (needs backContent). |
| flipped | boolean | - | Controlled flip state; pass with onFlip. |
| onFlip | (next: boolean) => void | - | Called after a flip toggle. |
| radius | number \| string | 15 | Corner radius (px or CSS length). |
| perspective | number \| string | 800 | CSS perspective (px or length). |
| smoothness | number | 0.6 | Spring softness 0–1; 0 is stiff, 1 is slow and bouncy. |
| glare | number | 0.5 | Glare strength 0–1. |
| glareColor | string | "#ffffff" | Glare colour (hex / rgb). |
| shadow | number | 0.5 | Cast shadow strength 0–1. |
| parallax | number | 1 | Multiplier on layer and image parallax. |
| axis | "both" \| "horizontal" \| "vertical" | "both" | Which axes tilt. |
| reverse | boolean | false | Tilts away from the cursor instead of toward it. |
| trackWindow | boolean | false | Tilts toward the cursor anywhere in the window. |
| floating | boolean | false | Idles with a slow floating drift. |
| gyroscope | boolean | true | Device-tilt input on touch devices. |
| intro | boolean | true | Fades the card in when it first becomes visible. |
| introDelay | number | 0 | Delay (ms) before the intro starts. |
| onClick | (event) => void | - | Click handler; makes the card keyboard-activatable. |
| className | string | "" | Extra class names for the figure. |
| style | CSSProperties | - | Inline styles for the figure. |

## Delivery & validation

- Deliver the complete content of TiltedCard.jsx and TiltedCard.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the card tilts toward the cursor and springs back on leave without wobble artifacts; glare and edge light ride the tilt direction; the shadow shifts and grows with lift; layers with different depths parallax and the image never shows clipped corners at max tilt; the caption chip follows and tilts with pointer speed; click flips to the back face and back, drag-press does not flip, controlled and uncontrolled flip both work with onFlip; keyboard Enter/Space flip and focus rim; trackWindow tilts from anywhere in the window; floating drifts when idle; reduced motion softens amplitude and skips intro; off-screen instances pause; unmount leaves no listeners, observers or frames; 375 / 768 / 1440 wide without overflow.
