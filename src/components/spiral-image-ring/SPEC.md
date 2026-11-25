Implement the "InfiniteSpiral" component from zero: an endless looping 3D helix of image cards — the cards ride a cylinder, spiralling upward (or downward) forever with no seam, the closest cards largest and sharpest while distant ones shrink, fade and blur into depth. Motion comes from an auto-scroll speed, page scroll, vertical dragging, or any mix; the ring pauses on hover; every knob (radius, spacing, per-turn count, tilt, spin offset, centre boost, edge fade/blur, grayscale) is adjustable. Full specification follows; it must not depend on external pages or font files; images come only through the items prop (data URIs and same-origin assets are fine).

## Structure & rendering

- Pure React + CSS, two files only: InfiniteSpiral.jsx and InfiniteSpiral.css. React >= 18; no runtime dependencies.
- Root is a `<div class="infinite-spiral">` (plus any className): relative, 100% × 100% with min-height 320px, overflow hidden, isolation. Inline style carries the CSS perspective and three CSS variables — card width, height, radius. In drag/all modes the root takes cursor grab, touch-action pan-x and user-select none.
- `.infinite-spiral__stage` is an absolute inset-0 plane with transform-style preserve-3d, carrying `role="list"` and aria-label "Infinite spiral gallery". Each item is an absolutely centred `<a>` (when the item has href, with target/rel noreferrer for new tabs) or `<div>`, `role="listitem"`, aria-label from label/alt, sized to cardWidth × cardHeight with the item radius, a 1px white 24% ring, translucent white fill, a soft shadow, backface hidden and will-change transform/opacity/filter. The `<img>` fills it with the configured object-fit, a grayscale filter, dragging disabled, eager loading for the first six items and lazy for the rest.
- Items accept strings (treated as image URLs) or `{ src, alt?, label?, href?, target?, id? }`; missing alts fall back to "Spiral image N". Keys use id or src.

## Motion engine

- One rAF loop per instance drives everything from a float `progress` (in card units). Each card's offset = (index − progress) wrapped by modulo into [−count/2, count/2), so the ring loops seamlessly with however many items exist — cards that leave one end re-enter the other.
- Geometry per frame: angle = offset × (360 / cardsPerTurn) + rotation; x = sin(angle) × responsiveRadius; z = cos(angle) × responsiveRadius; y = offset × verticalSpacing × fit. Depth scale = clamp(perspective / (perspective − z), 0.72, 1.45); the focus boost scales cards near offset 0 up toward centreScale; total scale multiplies a responsive fit factor = min(1, width/(cardWidth × 2.8), height/(cardHeight × 2.35)). Responsive radius = min(radius, max(72, width × 0.36)) × fit — narrow containers squeeze the ring inward without breaking it.
- Depth cues: opacity fades from 1 to 0 across the outermost edgeFade of the half-span (smoothstep); blur ramps edgeBlur × smoothstep(0.35, 1, edge); z-index stacks back-to-front (depth × 100000 + index); pointer events switch off below 0.25 opacity.
- Auto mode: a target speed of speed × (down ? −1 : 1) blends in with a 1−exp(−dt×7) lag and advances progress; hover (pauseOnHover) or dragging fades the speed to 0 smoothly rather than stopping dead.
- Scroll mode (animationMode scroll/all): window scroll delta ÷ (verticalSpacing × 2), clamped ±1.5 per event, scaled by speed/0.55, feeds the same progress — the spiral becomes a scroll-linked strip. Drag mode: pointer capture on the root, vertical drag distance ÷ verticalSpacing moves progress directly (follow blend tightens to 1−exp(−dt×22) while dragging); a click after a real drag is suppressed so links aren't triggered accidentally.
- A ResizeObserver keeps bounds fresh; an IntersectionObserver (2% threshold) freezes all motion and video-like work off-screen; reduced motion stops the auto speed entirely (scroll and drag still work).
- Unmount cancels the frame, disconnects both observers and the scroll listener. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { src, alt?, label?, href?, target?, id? })[] | [] | The ring's images; strings are treated as URLs. Empty array renders nothing. |
| speed | number | 0.55 | Auto-scroll speed in cards per second. |
| direction | "up" \| "down" | "up" | Which way the helix travels. |
| animationMode | "auto" \| "scroll" \| "drag" \| "all" | "auto" | Motion sources: "auto", "scroll", "drag", or "all". |
| radius | number | 170 | Cylinder radius in px (auto-squeezed on small containers). |
| cardWidth | number | 100 | Card width in px. |
| cardHeight | number | 100 | Card height in px. |
| verticalSpacing | number | 60 | Rise (px) per card along the helix. |
| perspective | number | 1000 | CSS perspective in px; drives the depth scaling. |
| cardsPerTurn | number | 7 | Cards distributed per full turn of the cylinder. |
| rotation | number | 0 | Static angular offset of the whole ring (deg). |
| cardTilt | number | 0 | Constant rotateZ applied to every card (deg). |
| cardRadius | number | 10 | Card corner radius (px). |
| centerScale | number | 1.2 | Scale boost at the front of the ring. |
| edgeFade | number | 0.3 | Fraction of the half-span over which cards fade out. |
| edgeBlur | number | 6 | Max blur (px) at the far edge. |
| pauseOnHover | boolean | true | Pauses auto motion while hovered. |
| imageFit | string | "cover" | object-fit of the images. |
| grayscale | number | 0 | Desaturation of the images, 0–1. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of InfiniteSpiral.jsx and InfiniteSpiral.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the ring loops endlessly with no visible seam at any item count; the front card is largest/sharpest and the far side fades and blurs; speed/direction/speed-blend feel smooth on hover pause; scroll and drag modes move the helix in step with the gesture; drag-then-release does not trigger the link under the pointer; href items navigate, non-href items don't; alt/aria labels and list roles are present; resizing a narrow container squeezes radius and scale without overflow; grayscale applies; reduced motion stops the auto spin; off-screen instances freeze; unmount leaves no loop or observers; 375 / 768 / 1440 wide without overflow.
