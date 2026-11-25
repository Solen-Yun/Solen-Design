Implement the "ScrollStack" component from zero: a scroll-driven card deck — each card scrolls up, pins below the viewport top, and the next card slides over it, so the deck settles into a stacked pile of dimmed, slightly scaled cards, then holds before releasing. Motion is transform-only and jitter-free, with an optional inertial glide that smooths native wheel scrolling, an optional snap to the nearest card, and contained (inner scroller) or window-scroll modes. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: ScrollStack.jsx and ScrollStack.css. React >= 18; no runtime dependencies.
- Two exports: `ScrollStack` (default) and `ScrollStackItem` (named). Root is a `<div class="scroll-stack scroll-stack--contained">` by default — position relative, width 100%, height 100%, overflow-x hidden, overflow-y auto; with `useWindowScroll` the class is `scroll-stack--window` and the page scrolls instead. Inside is `.scroll-stack__inner` (position relative, padding-inline clamp(1rem, 6%, 5rem)) holding one slot per child plus an end spacer.
- Each child of the component is wrapped in a Fragment: before it (except the first) an aria-hidden spacer div whose height is `max(0, itemDistance − (remaining × itemStackDistance))` and whose margin-top is the negative remainder (the gap between cards shrinks linearly as the deck builds); the child itself sits in `<div data-stack-slot class="scroll-stack__slot">` — position sticky, top = `calc(stackPosition + index × itemStackDistance)` (percent or px strings pass through), margin-bottom = (remaining × itemStackDistance), z-index = index + 1.
- `ScrollStackItem` renders `<div class="scroll-stack-card">` plus any itemClassName/style, and appends an aria-hidden `<span class="scroll-stack-card__shade">`. The card CSS: box-sizing border-box, width 100%, height 20rem, padding 2.5rem, radius 28px, background and text via `light-dark(#ffffff/#18181b, #18181b/#fafafa)`, a 1px ring plus two deep shadows, transform-origin 50% 0, will-change transform. The shade is an absolute black overlay whose opacity is `var(--scroll-stack-dim, 0)` — the dimming layer. Arbitrary children are allowed (the wrapper is what gets transformed), but ScrollStackItem gives the card chrome.
- A trailing `.scroll-stack__end` spacer (aria-hidden) gets height = holdDistance plus, in contained mode, any leftover viewport space below the last pin, so the finished deck holds on screen.

## Motion engine

- All measurement and writes happen in one `useLayoutEffect` closure keyed on useWindowScroll; current settings live in a settingsRef refreshed every render, and every settings change schedules an update.
- Per update (rAF single-flight): measure slot heights and viewport tops; the pin point of card i is where its top equals stackTop + i × itemStackDistance. Compute each card's depth — how completely the cards after it have covered it (0–1, accumulated) — then write, cached per key so unchanged values never touch the DOM: transform `perspective(1200px) rotateX(−lean × tiltAmount deg) rotate(lean × rotationAmount deg, sign alternating by index) scale(max(min(baseScale, 1), 1 − depth × itemScale))` (empty string at depth 0), filter `blur(depth × blurAmount px)` (empty below 0.01), and the dim overlay opacity `1 − (1 − dimAmount)^depth`.
- The padding-top of the inner container equals stackPosition in contained mode (0 in window mode); it is written through the same cache and, when it changed, one more update is scheduled since layout shifted.
- Completion: when there is more than one card and the last card reaches full cover, `onStackComplete` fires once (again only after leaving and re-entering the fully covered state).
- Smooth scroll: a `wheel` listener (non-passive) on the scroll target intercepts vertical wheel deltas (deltaMode line/page normalised; horizontal-dominant, ctrl-key and already-prevented wheels pass through; wheel events over a nested scrollable that can still scroll in that direction are respected). The delta accumulates into a goal and an rAF glide loop moves the scroll position toward it — `current += (goal − current) × (1 − 0.9^(dt×60))`, snap when within 0.5px — writing scroll with `behavior: 'instant'`. Any outside scroll (position deviating > 2px from what was written) cancels the glide. Reduced motion bypasses the glide and writes the goal instantly.
- Snap: 140 ms after scrolling stops (no glide, no pointer pressed), the deck glides to the nearest pin point if it is within reach (half of the first card's travel span). Pointerdown cancels the pending settle; pointerup re-arms it.
- Listeners and observers: scroll (passive) and wheel (non-passive) and pointerdown on the scroll target, pointerup/pointercancel on window, resize on window, ResizeObserver on root and inner — all feeding the single rAF scheduler.
- Unmount: cancel both rAFs and the settle timer, disconnect the observer, remove every listener. Same-page instances are independent (one per scroll container, or window mode shared).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The cards. Wrap each in ScrollStackItem for the built-in card chrome. |
| className | string | "" | Extra class names for the root. |
| itemDistance | number | 100 | Scroll gap (px) between consecutive cards before stacking. |
| itemStackDistance | number | 24 | Vertical offset (px) each pinned card peeks below the one above it. |
| stackPosition | string \| number | "15%" | Where the first card pins: percent of the viewport or px. |
| itemScale | number | 0.05 | Scale lost per unit of depth while buried. |
| baseScale | number | 0.8 | Lower clamp of the buried cards' scale. |
| dimAmount | number | 0.2 | Strength of the black dim on buried cards, 0–1. |
| blurAmount | number | 0 | Blur (px) added per unit of depth; 0 disables. |
| tiltAmount | number | 0 | Max rotateX tilt (deg) of buried cards. |
| rotationAmount | number | 0 | Max z-rotation (deg), alternating sign per card. |
| holdDistance | number | 200 | Extra scroll (px) the finished deck holds before releasing. |
| smoothScroll | boolean | true | Intercepts wheel scrolling with an inertial glide. |
| snap | boolean | false | Glides to the nearest card after scrolling stops. |
| useWindowScroll | boolean | false | Drive the stack from the page scroll instead of the root. |
| onStackComplete | () => void | - | Fires once when the last card fully covers the deck. |

## Delivery & validation

- Deliver the complete content of ScrollStack.jsx and ScrollStack.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: cards pin at stackPosition and stack with the chosen peek offset; buried cards scale, dim and (when enabled) tilt and blur smoothly with no jitter; the deck holds for holdDistance then releases; onStackComplete fires exactly once per full stack; smooth scroll glides without fighting nested scrollables, horizontal wheels or zoom; snap settles to the nearest card and stays quiet while pressed; window mode pins against the page; reduced motion skips the glide; resizing re-measures and keeps cards aligned; contained mode still works inside a short container; unmount leaves no listeners, observers or frames; 375 / 768 / 1440 wide without overflow.
