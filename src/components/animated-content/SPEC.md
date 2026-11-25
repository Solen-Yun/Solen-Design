Implement the "AnimatedContent" component from zero: a wrapper that reveals its content with one combined entrance move — a slide along an axis, optional blur, scale, 2D rotation and 3D tilt, a soft gradient wipe — playing either when the block scrolls into view, on mount, or scrubbed directly by scroll position, with optional stagger across direct children and an optional timed disappearance after the reveal. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ with the GSAP tween library (core plus its ScrollTrigger plugin) driving the animation. One file only: AnimatedContent.jsx. No stylesheet, no iframe.
- Root is a plain `<div>` carrying className, the caller's inline style, and any extra DOM props spread through. It renders with inline `visibility: hidden` so content never flashes before the animation is wired; the effect immediately sets visibility visible via the tween engine.
- Animation wiring runs in an isomorphic layout effect (layout effect on the client, plain effect on the server) inside a tween-engine context scoped to the root element; every re-run fully reverts the previous context first, so changing any animation prop rebuilds the timeline cleanly. Callback props are read through a ref that is refreshed on every render, so handlers can change without rebuilding.
- Scroller resolution for scroll triggering: the container prop (an element or a CSS selector string resolved with querySelector) wins; otherwise an element with id "snap-main-container" is used as a custom scroller if present; otherwise the page scroller.
- Targets: when stagger > 0 and the wrapper has element children, each direct child animates individually (revealed together through a stagger); otherwise the wrapper itself is the single target.

## Entrance animation

- The entrance is a from-to timeline, paused at creation. Axis = "x" for direction "horizontal", else "y"; sign = −1 when reverse is on. From state: axis offset = distance × sign px, scale, opacity = initialOpacity when animateOpacity is on (always 1 otherwise). To state: axis 0, scale 1, opacity 1, over duration seconds with the named ease. Optional layers added only when non-zero: blur > 0 animates filter from blur(Npx) to blur(0px); rotate animates rotation from rotate × sign to 0; tilt animates rotationX (vertical slides, tilt × sign) or rotationY (horizontal slides, −tilt × sign) to 0 with transformPerspective 900 on both ends.
- Wipe: direction "up"/"down"/"left"/"right" apply a linear-gradient mask (black from the trailing edge to a moving front, transparent beyond it) and "center" a radial-gradient mask from the middle; each mask position is driven by a CSS variable --ac-wipe on the targets, tweened 0 → 1 with the rest, applied through both mask-image and -webkit-mask-image. The front travel is 140% of the box minus a 40% feather, so the reveal is soft-edged.
- Stagger: when targets are children, the tween gains stagger { each: stagger, from: staggerFrom } (index, "start", "end", "center", edges).
- Playback triggers: trigger "mount" plays the timeline once immediately. trigger "scroll" creates a ScrollTrigger on the wrapper at start "top (1 − threshold) × 100%": without scrub, onEnter plays the timeline; with once the trigger removes itself after entering; with once off, scrolling back above the start reverses the timeline (re-applying the wipe mask first). With scrub, the timeline progress is bound between start and end "top max((1 − threshold) × 100 − 45, 5)%": scrub true binds directly, a number smooths the binding with that lag (floored at 0.01). A delay only applies outside scrub (scrub pins the tween at position 0).
- Settle: on timeline completion (non-scrub), the inline filter/transform properties (plus the mask images when wiping) are cleared from the targets, so the resting element carries no transform and later CSS transforms still work.
- Disappearance: with disappearAfter > 0, once mode and no scrub, completing the entrance schedules an exit tween after disappearAfter seconds: axis to −distance × sign, scale 0.8, opacity back to initialOpacity (or 0 when opacity animation is off), over disappearDuration seconds with disappearEase, blur reapplied when used, staggered the same way; fires onDisappearanceComplete at the end.
- prefers-reduced-motion: reduce — no timeline is built; the content becomes visible immediately and onComplete fires.
- Unmount: the context revert kills the timeline and ScrollTrigger and restores the initial hidden visibility. Instances on one page are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The content revealed by the animation. |
| container | string \| HTMLElement | - | Scroll container for the trigger; a selector string or element. Falls back to the page scroller. |
| distance | number | 100 | Slide travel in px. |
| direction | "vertical" \| "horizontal" | "vertical" | Axis of the slide. |
| reverse | boolean | false | Slide in from the opposite side. |
| duration | number | 0.8 | Entrance duration in seconds. |
| ease | string | "power3.out" | Ease name for the entrance. |
| initialOpacity | number | 0 | Starting opacity when animateOpacity is on. |
| animateOpacity | boolean | true | Animate opacity at all. |
| scale | number | 1 | Starting scale; 1 disables the scale move. |
| blur | number | 0 | Starting blur in px; 0 disables the blur move. |
| rotate | number | 0 | Starting 2D rotation in degrees. |
| tilt | number | 0 | Starting 3D tilt in degrees (rotationX on vertical slides, rotationY on horizontal). |
| wipe | "none" \| "up" \| "down" \| "left" \| "right" \| "center" | "none" | Soft gradient mask that sweeps the content into view. |
| threshold | number | 0.1 | 0–1 fraction of the viewport that shifts the trigger line. |
| delay | number | 0 | Delay before the entrance, in seconds. |
| stagger | number | 0 | Delay between direct children, in seconds; 0 animates the wrapper as one. |
| staggerFrom | string \| number | "start" | Which end the stagger starts from (index, "start", "end", "center"...). |
| trigger | "scroll" \| "mount" | "scroll" | Play on scroll into view or immediately on mount. |
| once | boolean | true | Scroll plays only the first time; off, leaving back above reverses it. |
| scrub | boolean \| number | false | Bind progress to scroll; a number smooths the binding. |
| disappearAfter | number | 0 | Seconds after the entrance before the exit plays; 0 disables. |
| disappearDuration | number | 0.5 | Exit duration in seconds. |
| disappearEase | string | "power3.in" | Ease name for the exit. |
| onStart | () => void | - | Called when the entrance starts. |
| onComplete | () => void | - | Called when the entrance completes. |
| onDisappearanceComplete | () => void | - | Called when the exit completes. |
| className | string | "" | Extra class names for the wrapper. |
| style | CSSProperties | - | Inline styles for the wrapper. |

## Delivery & validation

- Deliver the complete content of AnimatedContent.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: gsap at ^3.13.0 (core and ScrollTrigger plugin).
- Validate: mount trigger plays the combined slide/scale/blur/rotate/tilt/wipe entrance; scroll trigger plays once at the threshold line and replays reversing when once is off; scrub binds progress both directions with and without smoothing; stagger reveals children in order from each staggerFrom; the wipe mask sweeps from each direction and from center without clipping artifacts; completed elements carry no inline transform/filter/mask; disappearAfter exits after the delay and fires its callback; container accepts a selector and an element as custom scroller; changing any animation prop rebuilds without residue; reduced motion shows content instantly and fires onComplete; controlled callbacks fire in order; unmount leaves no timeline or trigger; 375 / 768 / 1440 wide without overflow.
