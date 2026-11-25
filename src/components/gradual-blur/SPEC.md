Implement the "GradualBlur" component from zero: an overlay that blurs one edge of a scroll area progressively — zero blur at the inner boundary ramping to full blur at the very edge — built from a stack of masked backdrop-filter layers so the ramp is continuous and cheap. It fits headers, footers, captions and carousels; an optional scroll-linked fade hides the whole band when the content reaches the end of the scroll in the band's direction, an optional colour wash follows the same curve, and hovering the band can intensify it. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: GradualBlur.jsx (layer stack, scroll and hover watchers) and GradualBlur.css (one rule: the root is pointer-events none). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class gradual-blur plus any className, aria-hidden, styled entirely inline: position fixed when target is "page", absolute otherwise; zIndex prop; inset 0 on the sides that are not the chosen edge (position bottom pins left/right/bottom to 0, and so on per edge); the band's depth comes from height on vertical edges (top/bottom) and from width ?? height on horizontal edges (left/right); on vertical edges an explicit width prop becomes the band's span along the edge, centred with margin-inline auto. Corners of the root that sit on the container's edge inherit the container's border-radius (all four corners for a bottom band, etc.), and only when target is not "page" and no span width is set.
- Inside the root, one child `<div>` per blur layer plus an optional wash layer; every layer is absolute inset 0 with border-radius inherit.

## Blur ladder

- layers is clamped to 1–16 after rounding. maxBlur = max(strength, 0) × 12 px. The ramp position u ∈ 0..1 runs from the inner boundary (0) to the outer edge (1), shaped by curve: linear t; bezier t²(3 − 2t); ease-in t²; ease-out 1 − (1 − t)²; ease-in-out symmetric; unknown names fall back to linear. Level function: level(u) = maxBlur × (exponential ? (2^(4t) − 1) / 15 : t) with t = shaped(u) — the exponential ladder concentrates most blur near the edge.
- Layer i covers exactly the mask segment [i/count, (i+1)/count] along the edge direction: its mask-image (and -webkit-mask-image) is a linear-gradient in the edge direction, transparent at i/count, black at (i+1)/count. Its blur radius = sqrt(to² − from²) where from = level(i/count), to = level((i+1)/count) — stacking the segments' variances reproduces the continuous ramp, so the deepest layer alone carries the peak blur and the underlying content blurs progressively through the stack.
- Each layer's backdrop-filter (and -webkit-backdrop-filter) is `blur(calc(<radius>px × var(--gradual-blur-reveal, 1) × var(--gradual-blur-hover, 1)))`; when saturation ≠ 1 it also carries `saturate(calc(1 + <boost − 1> × var(--gradual-blur-reveal, 1)))` where boost = saturation^(1/count) — the per-layer share that sums to the requested saturation. Both filters carry a transition of `duration` seconds with the easing prop (numbers become seconds, strings pass through).
- Every layer's opacity is the opacity prop.
- Tint wash: when tint is not "transparent", one extra layer paints the tint colour over the band, masked by a 9-stop gradient at u = k/8 whose alpha = smootherstep(shape(u)) (alpha = t³(t(6t−15)+10) of the shaped t) — the wash follows the same curve, then double-eases to zero at the inner boundary. Its opacity = calc(var(--gradual-blur-reveal, 1) × min(var(--gradual-blur-hover, 1), 1)) with an opacity transition of the same duration/easing.

## Scroll fade (autoHide)

- With autoHide off, --gradual-blur-reveal is removed (so the band is always fully revealed) and nothing is watched.
- With autoHide on, the scroller is resolved once per setup: the container prop first — a string is queried from the document, an object with a current field contributes its .current, anything else is the element itself; target "page" maps to the window; otherwise the parent element is scanned for a sibling (a child that is not the root) whose overflow in the blur axis is auto/scroll/overlay, then the parent itself. No scroller found — nothing happens.
- Update (run on mount, on the scroller's scroll — passive — on window resize, and from a ResizeObserver watching the scroller and its first element child when available): offset = scrollTop/scrollLeft of the element or window.scrollY/scrollX; limit = scrollHeight − clientHeight or the document equivalent; reach = the band's thickness in px from the root's bounding rect (minimum 1); room = offset for top/left edges, limit − offset for bottom/right edges; the root sets --gradual-blur-reveal = clamp01(room / reach). Scrolling towards the last pixels of content in the band's direction therefore fades the whole stack — blur and saturation — smoothly out to nothing, and scrolling back brings it back. Teardown removes the listeners and observer.
- The reveal variable multiplies every layer's blur and the saturation delta through the calc() chains above, so the fade is one CSS write per frame; no rAF loop runs.

## Hover intensity

- hoverIntensity ≠ 1 arms a passive window pointermove listener, rAF-throttled to one hit-test per frame: when the pointer is inside the root's bounding box, the root sets --gradual-blur-hover = max(hoverIntensity, 0), otherwise "1"; pointerleave on the document element resets to 1. The variable multiplies every blur radius, so hovering the band deepens the blur (values above 1) or softens it (below 1) with the configured transition. Cleanup removes the listeners and the variable.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | "top" \| "bottom" \| "left" \| "right" | "bottom" | Which edge carries the blur band; full blur sits at the outer edge. |
| target | "parent" \| "page" | "parent" | "page" fixes the band to the viewport, otherwise it positions inside the parent element. |
| height | number \| string | "6rem" | Band depth on top/bottom edges; fallback depth for left/right edges. |
| width | number \| string | - | Band depth on left/right edges; on top/bottom edges the span along the edge, centred. |
| strength | number | 2 | Peak blur strength; the deepest layer's radius is strength × 12 px. |
| layers | number | 8 | Number of stacked blur layers, clamped to 1–16. |
| curve | "linear" \| "bezier" \| "ease-in" \| "ease-out" \| "ease-in-out" | "linear" | Shape of the blur ramp from inner boundary to edge. |
| exponential | boolean | true | Exponential ramp (2^(4t) − 1)/15, concentrating blur near the edge. |
| opacity | number | 1 | Opacity of every layer. |
| saturation | number | 1 | Total extra saturation across the stack; 1 disables it. |
| tint | string | "transparent" | Colour wash over the band, following the same ramp curve. |
| autoHide | boolean | false | Fades the band out at the end of the scroll in the band's direction. |
| container | string \| Element \| RefObject | - | Scroller watched by autoHide; auto-detected from the parent when omitted. |
| hoverIntensity | number | 1 | Blur multiplier while the pointer hovers the band; 1 disables the watcher. |
| duration | number \| string | 0.3 | Transition time of the scroll and hover fades, in seconds. |
| easing | string | "ease-out" | Easing of those transitions. |
| zIndex | number | 1000 | Stacking order of the root. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of GradualBlur.jsx and GradualBlur.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: bottom, top, left and right bands ramp in the right direction with full blur at the outer edge; strength, layers, curve and exponential all change the ramp visibly; the band follows its container's rounded corners; a tint wash matches the curve and disappears when tint is transparent; target "page" pins to the viewport while parent mode sits inside a rounded card; autoHide fades the band to nothing exactly at the end of the scroll (bottom band → scrolled to bottom, top band → scrolled to top) and restores it on scroll-back, working with an auto-detected sibling scroller, a passed element/ref and the page scroller; hoverIntensity deepens or softens the blur while hovering and resets on leave; duration/easing apply to both fades; the overlay never intercepts pointer events; unmount removes scroll/resize listeners and observers; two instances on one page are independent; 375 / 768 / 1440 wide without overflow.
