Implement the "SwipeToast" component from zero: a dark toast card that slides up into place, burns a thin fuse bar for its remaining lifetime, pauses that fuse whenever the user is reading (hover, focus, interaction, hidden tab), and dismisses by dragging it downward — past the distance or flick threshold it glides out and fades, otherwise it springs back. Escape, an action button or a close button also dismiss it. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the motion animation library.

## Structure & rendering

- Two files only: SwipeToast.jsx (entry, drag state machine, fuse control) and SwipeToast.css (all styles). React >= 18. Depends on the motion animation library (`animate`, `motion`, `useMotionValue`, `useReducedMotion`, `useTransform` from `motion/react`) and on an icon package for the close glyph (a 12px, 2.5-stroke cancel icon).
- Root is a `<div>` with class swipe-toast carrying data attributes: data-phase (`open` | `closing` | `gone`), data-inline, data-fuse (`top` | `bottom` | `none`), data-dismissible, data-instant, data-mounted. Inline style variables: `--st-bg` (background), `--st-ink` (color), `--st-fuse` (fuseColor), `--st-w` (width px), `--st-radius` (radius px), `--st-slide` (slideMs ms), `--st-gap` 10px. Extra className appended.
- Default mode is fixed: right and bottom offset 32px (16px under 600px viewport width) plus env(safe-area-inset-bottom), z-index 999999999, width min(width, 100vw − 2×offset). inline mode renders in normal flow: display grid, grid-template-rows 1fr transitioning to 0fr to collapse, with a 10px top gap on the lift wrapper.
- Inside: a gate div (min-height 0) wrapping a lift div wrapping the card. The lift owns the slide animation — entrance from translateY(100%) + opacity 0 to rest using `@starting-style` plus the grid-rows 0fr→1fr transition (both over slideMs with a cubic-bezier(0.23, 1, 0.32, 1) ease); browsers without CSSStartingStyleRule get the same entrance via a requestAnimationFrame flag flipping data-mounted. Closing animates the lift back to translateY(100%)/opacity 0 over slideMs × 0.7 (opacity slideMs × 0.5); phase `gone` hides it. data-instant forces transition-duration 0.
- The card is a motion.div: role="status", aria-live="polite", aria-atomic="true", tabIndex 0, cursor grab, touch-action none, user-select none, padding 16px, radius var(--st-radius), background var(--st-bg), a two-layer soft shadow, overflow hidden. Its transform (translateY from a motion value) and opacity (a second motion value) are driven from JS. Content layout: optional icon span (18px, aria-hidden), a body column with the title (weight 500, 13px base font, inherits font-family) and optional description (ink at 66% via color-mix), an optional action button (24px tall pill in the ink colour with the background colour as its text, 12px, weight 500), an optional close button (24px square, transparent, an extended −8px hit area via ::before, hover wash of ink at 10%), and the fuse bar.
- The fuse is an absolutely positioned 2px `<i>` (aria-hidden) at the card's bottom edge (top edge when data-fuse="top", opacity 0 when "none" or duration ≤ 0), painted with a horizontal gradient of the fuse colour that fades to transparent over the outer 38% on each side and holds full colour in the middle; transform-origin left center.

## Fuse & lifetime

- When phase is open and duration > 0, the fuse runs a Web Animations API animation: scaleX 1 → 0, linear, duration = duration ms, fill forwards. onfinish calls close("timeout"). The animation handle is stored and its onfinish cleared on cleanup.
- The fuse pauses whenever any of these is true: pointer hover with a mouse (pauseOnHover on), an active pointer drag or a swipe-out in progress, the card contains focus, or the document is hidden (visibilitychange listener). Otherwise a paused animation resumes. pauseOnHover false clears the hover flag.
- close(reason): ignored unless phase is open and no swipe is leaving; if a drag is in progress the reason is queued and applied on pointer up. It pauses the fuse, sets data-instant when the reason is "escape", or "action"/"close" right after keyboard input (Enter/Space on the card or its buttons set the keyboard flag), otherwise animates the lift out and calls onClose(reason) after slideMs × 0.7 + 60ms — or, in inline mode, after a further 200ms so the grid collapse finishes. Reasons used: "timeout", "swipe", "action", "close", "escape", "programmatic".
- The action button calls onAction then close("action"); the close button calls close("close"). Escape on the card (when dismissible) stops propagation and closes.
- Controlled visibility: the open prop drives an effect — open false closes programmatically; open true while not in the open phase rescues the toast (clears timers, resets instant, y 0, fade 1, phase back to open), so the same instance can be re-shown.

## Swipe interaction

- Pointer down (primary button only, dismissible on, not on a nested button, not while leaving; a closing toast is rescued first) captures the pointer on the card, stops the transform animation and starts a drag: history of up to 4 [time, y] samples, interacting flag pauses the fuse.
- Move: a 3px dead zone before the grab offsets; downward offsets apply 1:1, upward offsets pass through a rubberband resistance c = 0.55 against a 24px dimension so the card stretches but resists. The card gets data-swiping (cursor grabbing) once past the dead zone.
- Up/cancel: release capture, clear interacting. Velocity is the last-sample delta over elapsed ms (0 if the last sample is older than 100ms). Swipe out when dy > 0 and (velocity > 0.11 px/ms, or dy ≥ swipeDistance with velocity ≥ 0): animate y to dy + card height with a 0.3s no-bounce spring seeded by the release velocity × 1000 (skipped under reduced motion), then fade opacity to 0 over 0.2s with the out ease, then finish as close("swipe") (inline mode adds the 200ms collapse wait before onClose). Otherwise, if the pointer moved, y springs back to 0 (0.5s spring with bounce = settleBounce and the release velocity; reduced motion uses a 0.2s ease instead). A queued close reason is applied after the spring starts.
- Keyboard: the card is focusable (tabIndex 0); Enter/Space mark keyboard input so subsequent action/close dismissals are instant; Escape dismisses instantly. focus/blur of the card subtree pauses and resumes the fuse.

## Motion & accessibility

- Reduced motion: the swipe-out translate is skipped (fade still runs), spring-back becomes a short ease, and the CSS block pins the lift transform to none with a 200ms opacity-only transition (button active scale removed). The fuse still burns linearly and still closes on timeout.
- Live region semantics on the card mean screen readers announce the toast content once on appearance. The close button carries aria-label "Close". Action/close buttons have active scale 0.97 and hover states only under (hover: hover) and (pointer: fine).
- Unmount cleanup: removes the visibilitychange listener, clears the pending close timer, cancels the fuse animation. The open effect and mount effect manage their own state without leaks.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "File archived" | The toast's main line. |
| description | string | "" | Secondary line under the title; omitted when empty. |
| icon | ReactNode | - | Optional leading icon, rendered 18px and hidden from assistive tech. |
| actionLabel | string | "" | Label of the trailing action button; no button when empty. |
| onAction | () => void | - | Called when the action button is pressed, before the toast closes. |
| open | boolean | true | Controlled visibility; false dismisses, true re-shows the same instance. |
| onClose | (why: string) => void | - | Called when the toast finishes dismissing; why is "timeout", "swipe", "action", "close", "escape" or "programmatic". |
| background | string | "#27272a" | Card background colour. |
| color | string | "#f5f5f5" | Ink colour for the title, icon and buttons. |
| fuseColor | string | "#f5a524" | Colour of the burning fuse bar. |
| width | number | 356 | Card width in px, clamped by the viewport. |
| radius | number | 12 | Card corner radius in px. |
| slideMs | number | 400 | Base slide duration of the entrance in ms; closing uses 0.7×. |
| settleBounce | number | 0.2 | Spring bounce when a rejected swipe snaps back, 0–1. |
| swipeDistance | number | 40 | Downward drag in px that dismisses when released without a flick. |
| duration | number | 4000 | Fuse lifetime in ms; 0 disables the fuse and the auto-dismiss. |
| fuse | "top" \| "bottom" | "bottom" | Which card edge the fuse bar hugs. |
| pauseOnHover | boolean | true | Pauses the fuse while a mouse hovers the card. |
| closeButton | boolean | false | Shows the trailing close button. |
| inline | boolean | false | Renders in document flow with a collapsing grid row instead of fixed to the viewport corner. |
| dismissible | boolean | true | Allows swiping and Escape to dismiss. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of SwipeToast.jsx and SwipeToast.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: entrance slides up over slideMs (with @starting-style and the rAF fallback both working); the fuse burns linearly and closes the toast on timeout; hovering, focusing, dragging and a hidden tab pause the fuse and it resumes after; dragging down past swipeDistance or flicking fast dismisses with carry-over velocity and fade, while a short drag springs back with settleBounce; upward drag resists through the rubberband; Escape and keyboard-triggered action/close dismiss instantly; open false/true cycles close and rescue on the same instance; inline mode collapses its grid row and delays onClose by 200ms; fixed mode honours the safe-area inset and the 600px breakpoint; action button fires onAction then closes; closeButton renders with its enlarged hit area; reduced motion drops the spring and the slide transform but keeps the fade and the fuse; unmount leaves no listener, timer or animation; 375 / 768 / 1440 wide without overflow.
