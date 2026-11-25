Implement the "HoldButton" component from zero: a hold-to-confirm button — press and hold and a liquid fill rises across the button (rightward by default, or upward) with a living wave crest scrolling along its edge while the labels crossfade to a filled variant inside the liquid; holding the full duration confirms (a glow ring pulses out and the label swaps to the done text), releasing early snaps the liquid back. A short press counts as a tap. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: HoldButton.jsx (entry, gesture/progress engine) and HoldButton.css (all styles). React >= 18; no runtime dependencies.
- Root is a real `<button type="button">` with class `hold-button hold-button--<size>` plus data-phase (idle/holding/done), data-input (pointer/key), data-direction (right/up) and data-glow="true": inline-grid centred, isolation isolate, radius, background = backgroundColor, colour = textColor, weight 500, letter-spacing 0.01em, line-height 1, top inner highlight shadow, cursor pointer, user-select none, touch-action manipulation. Sizes are CSS presets: sm 36px high / 16px padding / 13px font, md 44 / 22 / 15, lg 52 / 28 / 17. Disabled drops opacity to 0.5 and blocks pointer events. Inline CSS variables: --hb-radius, --hb-bg, --hb-fill, --hb-text, --hb-fill-text, --hb-hold (holdTime), --hb-cycles (holdTime / 1100), --hb-release (releaseTime), --hb-press (pressScale), --hb-wave (wave ? waveAmplitude : 0 px), and JS-measured --hb-w/--hb-h kept fresh by a ResizeObserver.
- Content layers in paint order: a pulse span (empty, used by the done pulse), a base label span (z-index 2) stacking idle and done variants in one grid cell (each an inline-flex row of optional icon + text; idle visible by default, done hidden with blur(2px)), and a clipped overlay (z-index 3, clip-path inset(0 round radius)) containing the fill span and the crest span — each of those repeats the same idle/done label pair in the fill text colour, so text stays readable as the liquid covers it.
- The fill span (absolute inset 0, grid-centred, background = fillColor, colour = fillTextColor) is revealed by a clip-path inset that leaves exactly progress × width on the leading side, with the trailing 0.25 × wave softened into the edge. For direction "up" the same inset runs vertically from the bottom. The crest span is identical to the fill but additionally masked by an inline SVG wave path (a repeating S-curve line, data URI, repeat along the travel axis, tile height = 2 × button height) whose mask position scrolls both with progress (X = −wave + p × (width + wave)) and with time (Y cycles p × cycles × height), producing a crest line that wiggles along the liquid edge while rising.
- The glow: while holding or done with glow on, the box-shadow crossfades to a coloured glow (inset highlight plus a 32px downward bloom of the fill colour at 70%). During holding the shadow ramps linearly over the full holdTime; a done pulse animates an expanding fading ring (600ms ease-out) once. Pressing while holding scales to pressScale. Focus-visible shows a 2px outline in the fill colour offset 3px.

## Gesture engine

- Progress lives in a ref-driven rAF animation writing the CSS var --hb-p each frame: hold ramps linearly 0 → 1 over holdTime; release eases 1 → 0 over releaseTime with a cubic ease-out; a final frame at 1 triggers the confirm. A completion timer set at holdTime + 100ms is a safety net (it double-checks the held duration).
- Pointer: primary-button pointerdown begins a hold with pointer capture; moving more than a 10px hit pad outside the button rect ends the hold as a "drift" (cancel, no tap); pointerup inside releases; pointercancel and lost-pointercapture drift-cancel. Mouse pointerleave drift-cancels (touch relies on capture instead). Releasing within 250ms counts as a tap and fires onTap (unless drifted).
- Keyboard: Space or Enter starts a hold on keydown (not on repeat), keyup releases, Escape drift-cancels. While holding, window blur and document visibilitychange (hidden) cancel the hold so a backgrounded tab never confirms. done fires onHold once and, after resetAfter (if > 0), resets to idle and recedes the fill over releaseTime.
- Unmount clears all timers and the rAF loop. Reduced motion (CSS only): the fill/crest collapse to a flat opacity fade of the whole fill over holdTime (crest hidden, no scale, no pulse), the JS engine is untouched.

## Accessibility

- A visually-hidden hint span (wired via aria-describedby) announces "Press and hold for <holdTime rounded to 0.1s> seconds to confirm". Idle/done label variants carry aria-hidden on the inactive one. onContextMenu is suppressed so long-press on touch does not open a menu.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | "Hold to delete" | Idle label content. |
| doneLabel | string | "Deleted" | Label shown once confirmed. |
| icon | ReactNode | null | Icon rendered before the idle label. |
| doneIcon | ReactNode | null | Icon rendered before the done label. |
| backgroundColor | string | "#27272a" | Button background. |
| fillColor | string | "#5227FF" | Liquid fill colour. |
| textColor | string | "#f5f5f5" | Base label ink. |
| fillTextColor | string | "#ffffff" | Label ink inside the liquid. |
| size | "sm" \| "md" \| "lg" | "md" | Size preset (height / padding / font). |
| radius | number | 14 | Corner radius in px. |
| fillDirection | "right" \| "up" | "right" | Which way the liquid rises. |
| holdTime | number | 2000 | Full-confirm hold duration, in ms. |
| releaseTime | number | 200 | Snap-back duration after an early release, in ms. |
| pressScale | number | 0.97 | Scale while holding with a pointer. |
| wave | boolean | true | Enables the scrolling wave crest. |
| waveAmplitude | number | 6 | Wave crest height in px. |
| glow | boolean | true | Glow bloom while holding and the done pulse ring. |
| resetAfter | number | 1200 | Delay before the done state resets to idle, in ms; 0 stays done. |
| disabled | boolean | false | Disables the button. |
| onHold | () => void | - | Fires when the hold completes. |
| onTap | () => void | - | Fires for releases shorter than 250ms (not drifted). |
| className | string | "" | Extra class names for the button. |

## Delivery & validation

- Deliver the complete content of HoldButton.jsx and HoldButton.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: holding ramps the liquid linearly and confirms exactly at holdTime with a glow pulse and label swap; early release snaps back over releaseTime; drifting off the button cancels without a tap; quick taps fire onTap and nothing else; keyboard Space/Enter hold and Escape cancel; a hidden or blurred tab never confirms; resetAfter returns to idle and the fill recedes; direction up rises vertically; wave off removes the crest; glow off removes bloom and pulse; sizes sm/md/lg and colours/radius take effect; disabled blocks input; reduced motion fades instead of wiping; unmount clears timers and the rAF; 375 / 768 / 1440 wide without overflow.
