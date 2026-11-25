Implement the "LogoLoop" component from zero: an infinite marquee of logos that never shows a seam — the strip is duplicated into measured copies so items flow through one period forever — and can run as a straight line, a waving sine, a circular arc or a 3D orbit ring, with a centre focus lens, a magnifying lens that follows the cursor, drag-to-scroll with fling, page-scroll velocity boost, hover pause, grayscale muting with colour restore, per-item hover colours, hover name tips, a stepped "one logo at a time" mode and a staggered intro rise. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18 + CSS, two files only: LogoLoop.jsx (memoized entry + motion engine) and LogoLoop.css (all styles). No runtime dependencies, no iframe. Layout effects fall back to plain effects when `window` is undefined, so server rendering is safe.
- Root is a `<div>` with class `logoloop` plus `logoloop--horizontal`/`logoloop--vertical` (vertical = direction up/down), optional `logoloop--scale-hover` and the caller's className; `role="region"` with ariaLabel (default "Partner logos"); data attributes: `data-draggable` when draggable, `data-dragging` during an active drag, `data-intro` until the intro has played, `data-muted` when muted > 0, `data-labels=<mode>` when labels ≠ none. Overflow clip; tap highlight transparent.
- Inside is a track div (`logoloop__track`, flex, width max-content, will-change transform, user-select none) holding `copies` repetitions of a `<ul class="logoloop__list" role="list">` of the logos. Exactly one copy — the primary — is interactive; the others are `aria-hidden` and their links get tabIndex −1. The track is translated by a wrapped offset each frame; a React state (copies, primary) re-renders when the engine computes that more copies are needed.
- Each item is an `<li class="logoloop__item" role="listitem">` rendering: an `<img>` (src/srcSet/sizes/width/height/alt/title, lazy loading, async decoding, draggable false) when the entry has src, or a `logoloop__node` span (aria-hidden when it is a link without its own ariaLabel) when the entry has node; wrapped in an `<a class="logoloop__content">` when the entry has href (target _blank, rel noreferrer noopener, aria-label from ariaLabel/alt/title, draggable false) else a `<div class="logoloop__content">`. renderItem(item, key) replaces this default markup entirely.
- labels "inline"/"below" render the entry title as a label span beside / under the visual (below flips the content flex to a column). labels "hover" renders a `logoloop__tip` span (absolutely below the item, right of it in vertical mode) that fades and slides in on hover, focus-within, or when the engine flags the item `data-active` (the one nearest the centre in step/focus mode).
- Entry hoverColor sets `--logoloop-item-color`; on hover / focus-within / data-active the content colour shifts to it. Entry shape: `{ src, srcSet?, sizes?, width?, height?, alt?, title?, href?, hoverColor? }` or `{ node: ReactNode, ariaLabel?, title?, href?, hoverColor? }`.
- CSS variables from props: `--logoloop-gap` (gap px) and `--logoloop-logoHeight` (logoHeight px); images render at that height, width auto, object-fit contain; item font-size follows it so node wordmarks scale; label and tip font sizes derive from it. data-muted content gets grayscale(min(1, muted × 2)) and opacity 1 − muted × 0.6, restored to full colour on hover/focus-within/data-active. focus-visible: 2px currentColor outline offset 2.
- fadeOut draws an edge mask: a linear-gradient (to right, or to bottom when vertical) with a 13-stop smootherstep alpha ramp on each side, each side spanning fadeOutWidth (clamped 0–0.5) × 100% of the box; set as WebkitMaskImage + maskImage on the root.
- tiltX/tiltY clamp to ±60° and set perspective and transform-origin on the track. width accepts a number (px) or any CSS length, default "100%".
- Vertical mode: root becomes inline-block with left/right padding instead of top/bottom, track and lists run in a column, and the root height is synced to its parent element's height; horizontal mode pads top/bottom by the computed layout padding instead.

## Layout engine

- All motion lives in a plain engine created once per mount from (root, track, config ref, setLayout); a config ref is rebuilt every render so the engine always reads live props: speed px/s, direction sign (left/up → +, right/down → −), hoverValue (hoverSpeed when set; 0 when pauseOnHover !== false; undefined means hover does not pause), layout, bend, focus, magnify, tiltX/tiltY, step, draggable, scrollBoost, intro, scaleOnHover, labels, links (whether any entry has href).
- Measure (on refresh and on resize): clear all inline item styles, then read each item's untransformed centre, along-track size and cross size (compensating ancestor CSS scaling via getBoundingClientRect / offsetWidth ratios); the period is the distance between the first two copies; the strip length is the root client size minus padding; snaps are the first-copy item centres; pitch is period / item count. Vertical mode also syncs the root height to the parent.
- Geometry per layout mode: "line" — a straight strip. "wave" — y = amp × sin(k × x) with amp = bend × (crossMax × 0.6 + length × 0.035) and k = 2π / (length / 1.25), plus rotation atan(amp × k × cos(k·x)) in degrees. "arc" — items on a circle of radius R = length/2 / sin(|bend| × π/4) (bend clamped ±1 with a ±0.005 dead zone), angular position φ = x / R hidden beyond ±0.6π, positioned at x = R·sin φ, y = ±(R(1 − cos φ) − sag/2), rotated by φ. "orbit" — a ring of radius R = max(40, length × 0.43 − sizeMax × 0.2) holding round(2πR / period) slots; each item's ring angle θ projects through a circle tilted by alpha = sign(bend) × atan2(|bend| × max(crossMax × 2, R × 0.36), R) and depth 5R into screen x, y and a perspective scale, opacity 0.25–1 and z-index by facing; items on the back half dim, those outside the visible arc hide.
- focus lens (0–1): a gaussian of sigma max(40, length × 0.18) centred mid-strip scales items up to 1 + focus × 0.9 (the lens amount is clamped to 0–1 and then scaled by 0.9, so the ceiling is 1.9×) and displaces neighbours outward by the gaussian's erf integral (preserving density), with a slight opacity dip away from the centre.
- magnify lens (0–1): the same gaussian of sigma max(crossMax × 1.4, pitch × 1.1) centred on the pointer's projected position; the lens amount eases in over 0.12s and out over 0.25s and its centre tracks the cursor with a 0.06s time constant; active only with the pointer inside and layout ≠ orbit.
- tilt: the track is rotated rotateX/rotateY under perspective max(length, 480) × 1.3; pointer and item positions unproject/project through the same rotation matrix so the magnify lens still tracks the cursor; the layout padding grows so tilted corners never clip.
- Root padding `--logoloop-pad` is computed from the layout — wave amplitude, arc sag, orbit excursions, lens growth, hover-scale headroom, hover-tip space — so nothing clips.
- Copies = max(2, ceil((visible span + lead) / period) + 2, +1 when links need extra lead); primary = the copy currently centred.

## Motion & interaction

- Cruise: velocity eases toward target = speed × direction sign (0 under prefers-reduced-motion) with a 0.25s time constant; after a fling release the time constant relaxes to 0.8s (glide) until within 2 px/s. The offset wraps modulo the period (except while seeking, dragging or focused).
- Hover: with hoverValue defined, hovering sets the target to hoverValue (0 pauses); keyboard focus anywhere inside pauses fully. pauseOnHover={false} keeps cruising through hover unless hoverSpeed is set.
- step mode: instead of continuous cruise the loop holds, then eases one pitch to the next snap (cubic in-out; move time clamp(0.55 × cycle, 0.35, 0.9), hold ≥ 0.35s), where cycle = pitch / speed.
- Drag (draggable, pointer + touch): press records the position; movement past a 6px threshold along the track axis (and more along than across) captures the pointer, sets data-dragging and cancels glide/step; the offset follows the finger (scaled through the lens geometry so it matches under focus), wrapping each frame; the last 100ms of samples give a release fling clamped ±4000 px/s; step mode snaps to the nearest logo instead. Clicks within 400ms of a drag are suppressed; image dragging is prevented. touch-action is pan-y (pan-x in vertical) so the page scroll keeps working.
- scrollBoost > 0: window scroll velocity (per scroll event, clamped ±6000) decays with a 0.18s time constant and adds clamp(scrollVel × boost, ±3000) px/s to the cruise target in the travel direction.
- focusin: pauses and, when the focused item sits outside the comfortable zone (half length minus item size; in orbit the zone is 1px, so a focused item almost always seeks to centre), seeks it to centre with a cubic in-out over 0.35–0.8s.
- intro (default on, skipped for reduced motion): on first visibility items start opacity 0 (`data-intro`) and 14px low, then fade and rise with a cubic ease-out over 0.7s each, staggered left-to-right by position × 0.45s.
- scaleOnHover CSS-scales the hovered img/node ×1.2 (0.3s cubic-bezier(0.4, 0, 0.2, 1)).
- prefers-reduced-motion: reduce — cruise target is 0 (drag/fling still settle), intro and step are skipped, and transitions are disabled via media query.
- Frame loop: a single requestAnimationFrame runs while anything is busy — moving, dragging, seeking, stepping, intro playing, magnify easing, scroll boost alive — and sleeps when the strip is settled with zero target speed. The root's own scroll is forced back to 0 (the marquee must never actually scroll).
- ResizeObserver on the root and the first list re-measures (window resize fallback); IntersectionObserver (threshold 0.1) pauses offscreen; document visibilitychange and a prefers-reduced-motion media-query listener wake or update live.
- Unmount: cancel the frame, remove every listener (pointer, click capture, dragstart, focusin/out, root scroll, window scroll/resize, document visibilitychange, media query) and disconnect both observers.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logos | ({ src, srcSet?, sizes?, width?, height?, alt?, title?, href?, hoverColor? } \| { node: ReactNode; ariaLabel?, title?, href?, hoverColor? })[] | - | The marquee entries; src entries render images, node entries render custom React. |
| speed | number | 120 | Cruise speed in px/s. |
| direction | "left" \| "right" \| "up" \| "down" | "left" | Travel direction; up/down run the vertical marquee. |
| width | number \| string | "100%" | Root width. |
| logoHeight | number | 28 | Logo height in px; also scales node wordmarks and labels. |
| gap | number | 32 | Spacing between items in px. |
| pauseOnHover | boolean | - | False keeps cruising on hover; unset pauses. |
| hoverSpeed | number | - | Cruise at this px/s on hover instead of pausing. |
| fadeOut | boolean | true | Edge fade mask. |
| fadeOutWidth | number | 0.12 | Each edge's fade span as a fraction of the box, 0–0.5. |
| scaleOnHover | boolean | false | CSS ×1.2 scale on the hovered logo. |
| layout | "line" \| "wave" \| "arc" \| "orbit" | "line" | Path of the strip. |
| bend | number | 0.5 | Wave amplitude / arc curvature / orbit tilt, −1–1. |
| focus | number | 0 | Centre lens: middle items grow, 0–1. |
| magnify | number | 0 | Cursor lens: items near the pointer grow, 0–1. |
| tiltX | number | 0 | Track rotation X in degrees, ±60. |
| tiltY | number | 0 | Track rotation Y in degrees, ±60. |
| step | boolean | false | Step one logo at a time instead of continuous cruise. |
| muted | number | 0 | Grayscale + dim rest state 0–1; hover/focus restores colour. |
| labels | "none" \| "inline" \| "below" \| "hover" | "none" | Show entry titles inline, underneath or as hover tips. |
| draggable | boolean | true | Drag to scroll with fling. |
| scrollBoost | number | 0 | How much page-scroll velocity feeds the marquee. |
| intro | boolean | true | Staggered rise-in on first sight. |
| renderItem | (item, key) => ReactNode | - | Custom renderer replacing the default img/node markup. |
| ariaLabel | string | "Partner logos" | Region label. |
| className | string | - | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of LogoLoop.jsx and LogoLoop.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: seamless wrap in all four directions at any speed with image and node entries; line/wave/arc/orbit hold together while cruising and while dragging; focus lens grows centre items and the magnify lens follows the cursor (and still tracks under tilt); drag works with mouse and touch, flings, snaps in step mode and suppresses the post-drag click; page scroll nudges the strip with scrollBoost; hover pauses or cruises at hoverSpeed and keyboard focus pauses and centres the focused item; muted grayscale restores colour on hover; labels inline/below/hover all render with focus tips; the fade mask covers both edges; the intro plays once; reduced motion stops the cruise and skips intro; resizes re-measure without seams; unmount leaves no listeners, observers or frame loop; 375 / 768 / 1440 wide without overflow.
