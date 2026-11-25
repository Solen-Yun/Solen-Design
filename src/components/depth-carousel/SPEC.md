Implement the "DepthCarousel" component from zero: a 3D rail of photo cards where the focused card sits front and centre and the rest recede into depth — stepping sideways, back in Z and tilted around Y — growing darker, tinted and blurrier with distance; drag it, wheel it, use arrow keys, click a card or a dot, or let autoplay advance it. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components beyond the GSAP animation library.

## Structure & rendering

- Two files only: DepthCarousel.jsx (entry, rail math, GSAP tweens, input) and DepthCarousel.css (all styles). React >= 18. Depends on the gsap library. Six placeholder portrait photos ship as the default items; exact default artwork ships with the code.
- Root is a `<div>` with class depth-carousel (plus extra className): position relative, width/height 100% (min-height 320px), flex centred, perspective var(--dc-perspective) (perspective prop), perspective-origin 50% 50%, touch-action pan-y, cursor grab (grabbing while pressed), focus-visible outline; it carries role="group", aria-roledescription="carousel", aria-label "Depth carousel", tabIndex 0, and the pointer/key handlers.
- The stage (depth-carousel__stage) is absolutely inset 0 with transform-style preserve-3d. Each item is a card (depth-carousel__card): absolute at 50%/50%, cardWidth × cardHeight px, border-radius radius, dark #0b0d12 background, a two-layer deep shadow, overflow hidden, will-change transform/opacity/filter, cursor pointer; aria-roledescription "slide", aria-label "i of n", aria-hidden when not active. Inside: the img (object-fit cover, draggable false, pointer-events none) and a tint span (depth-carousel__tint) filled with the tint prop, mix-blend-mode multiply, opacity driven by JS.
- Controls (when showControls and more than one item): two 42px round glass arrow buttons (border 1px white at 18%, backdrop blur 8px, hover brighten, active scale 0.94, aria-labels "Previous/Next slide", chevron SVGs) pinned left/right 16px. Indicators (when showIndicators and more than one item): a bottom pill (role tablist) of 7px dots (role tab, aria-selected, aria-label "Go to slide i+1"); the active dot widens to 20px white.

## Rail math

- Cards are placed by a fractional rail position `pos`: for card i, d = i − pos, wrapped into [−n/2, n/2] when loop is on and n > 1 (so both ends continue forever). Placement per card: translateZ = −depth × d, translateX = dir × spread × d (dir is −1 for tiltDirection "left", 1 otherwise), rotateY = dir × tilt × clamp(d, 0, 1) degrees — only the first card back tilts fully, deeper ones hold the angle. The whole transform is written as translate(-50%,-50%) scale(scale) translateX translateZ rotateY, where scale is the responsive shrink factor.
- Visibility: cards beyond |d| > visibleCards + 0.5 hide (opacity 0, pointer-events none); cards that have been passed (d < 0) fade linearly (1 + d). Brightness = max(0.15, 1 − max(0, d) × falloff); blur = min(blur, max(0, d)/visibleCards × blur) when blur > 0. zIndex = 2000 − d × 20 (rounded). The tint overlay's opacity = clamp(max(0, d) × falloff × 1.25, 0, 0.86).
- Focus changes tween the rail with GSAP: a proxy object tweened from the current position to the target over duration ms with the ease prop (power3.out default; duration 0 under reduced motion), relaying every update into layout. On completion the position wraps back into [0, n). Focus is resolved through the shortest wrapped path when looping and clamped when not; the focused index updates React state and fires onChange(index, item).

## Input

- Wheel: preventDefault, uses the dominant axis delta (line deltaMode × 24), steps the rail immediately by clamp(delta / (cardWidth × 0.9), ±0.6) and, 130ms after the last wheel event, snaps to the nearest card with a tween.
- Drag: pointerdown kills any tween and records the start; after a 4px slop the pointer is captured; the rail follows 1:1 in card units (one card = max(cardWidth × 0.55 × scale, 40) px) while velocity is sampled; on release the position is projected forward by velocity × 180ms and snapped with setFocus(round(projected)). A click on a card (not following a moved drag) focuses it.
- Keyboard on the focusable root: ArrowLeft/ArrowRight step ±1 with preventDefault.
- Responsive: a ResizeObserver on the root computes scale = clamp(width / (cardWidth + 2 × |spread| + 120), 0.4, 1) and re-lays-out, so the whole rail shrinks on narrow screens.
- Autoplay: when autoplay is on and there are 2+ items, an interval of max(autoplayDelay, 600)ms steps forward; it is skipped while the pointer hovers the root or focus is inside it, and never starts under prefers-reduced-motion. Any layout prop change re-lays-out immediately.
- Unmount: kills the tween, clears the wheel timer and the autoplay interval, disconnects the ResizeObserver.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { image: string; alt?: string })[] | DEFAULT_ITEMS | The slides; a bare string is the image src, an object adds alt text. Six placeholder photos ship as the default. |
| cardWidth | number | 300 | Card width in px (also feeds drag and wheel steps). |
| cardHeight | number | 380 | Card height in px. |
| radius | number | 18 | Card corner radius in px. |
| tint | string | "#05060a" | Colour of the multiply tint that darkens receding cards. |
| depth | number | 220 | Z distance per step back, in px. |
| spread | number | 90 | X distance per step sideways, in px. |
| tilt | number | 22 | Degrees the first card back rotates around Y. |
| tiltDirection | "left" \| "right" | "right" | Which way the rail runs and the cards lean. |
| perspective | number | 1400 | Stage perspective in px. |
| visibleCards | number | 4 | Cards kept visible on each side beyond the focus. |
| falloff | number | 0.2 | Per-step darkening rate (feeds brightness and tint). |
| blur | number | 6 | Max blur in px applied to the deepest visible cards. |
| duration | number | 700 | Focus tween duration in ms. |
| ease | string | "power3.out" | GSAP ease name for focus tweens. |
| autoplay | boolean | false | Advances one card per interval while not hovered or focused. |
| autoplayDelay | number | 3200 | Autoplay interval in ms, floored at 600. |
| loop | boolean | true | Wraps the rail infinitely in both directions. |
| showControls | boolean | true | Shows the prev/next arrows. |
| showIndicators | boolean | true | Shows the dot tablist. |
| onChange | (index: number, item) => void | - | Called whenever the focused card changes. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of DepthCarousel.jsx and DepthCarousel.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: cards recede with depth/spread/tilt and darken, tint and blur with falloff; passed cards fade out; loop wraps in both directions without jumps and non-loop clamps at the ends; drag with fling projection, wheel with the 130ms snap, arrow keys, card clicks, dot clicks and arrows all focus correctly; onChange fires per focus change with index and item; autoplay advances and pauses on hover/focus and never runs under reduced motion; tiltDirection left mirrors the rail; the rail scales down on narrow containers (scale 0.4 floor); tint colour, radius, perspective reshape live; aria slide/tab roles hold; unmount leaves no tween, timers or observer; 375 / 768 / 1440 wide without overflow.
