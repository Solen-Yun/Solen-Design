Implement the "SlideCommit" component from zero: a slide-to-confirm control — a track with a label and a light capsule handle holding an arrow; dragging the capsule to the right end commits, whereupon the capsule turns green, the label fades, a tick and the done text unfurl inside the capsule, and after a hold the whole thing resets; while a promised action runs the arrow becomes a spinning blur; on failure the track shakes and the label crossfades to a red error text. Built with React, CSS, a motion library and a React icon package for the arrow/tick glyphs. It must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files: SlideCommit.jsx (entry, drag/phase machine, motion values) and SlideCommit.css (all styles). Dependencies: React >= 18, a motion library exposing `motion/react`-style primitives (animate, motion, useMotionValue, useMotionValueEvent, useTransform, useReducedMotion), and a React icon package for the arrow-right and tick glyphs; no other runtime deps. No iframe.
- Root is a `<div class="slide-commit">` (plus caller className) sized width × height px inline, `data-phase` ("idle" | "pending" | "done" | "error"), `data-held` while dragging (track cursor grabbing), `data-disabled` (dimmed 0.55, pointer-events none). Inline tokens: `--sc-track` (track background), `--sc-ink` (capsule colour), `--sc-ok`/`--sc-no` (success/danger colours), `--sc-on-ink`/`--sc-on-ok`/`--sc-on-no` (auto contrast inks computed from those colours via YIQ luma ≥ 128 → #111111 else #ffffff), `--sc-radius` (radius clamped to height/2), `--sc-grip-r` (radius − 4), `--sc-pad` (4), `--sc-font` (clamp(round(height × 0.25), 13, 17) px).
- The track (`slide-commit__track`, full size, radius var, background var, cursor grab, touch-action none) contains: a centred two-layer label (`slide-commit__label`, grid, pointer-events none) where the plain label sits in 45%-alpha ink and an error label in the danger colour — on error the plain one blurs/fades out while the error one blurs/fades in (200ms); the capsule (`motion.div` `slide-commit__capsule`, absolute with 4px inset all around, background var, colour var, `role="slider"` with tabIndex 0 when enabled, aria-label, aria-valuemin 0 / valuemax 100 / valuenow / valuetext "`label`, `n`%", aria-busy while pending, focus-visible an inset 2px track-colour ring) whose appearance is fully clip-path driven: `inset(0 (INNER − edge) px 0 0 round gripRadius px)` — a window that reveals the capsule's content; the capsule background-colour transitions to success green on done and danger red on error (200ms); and a visually hidden `aria-live="polite"` span announcing "Working" / doneLabel / errorLabel per phase.
- Capsule content (`slide-commit__content`, translated so its centre tracks the visible window): an arrow span (the caller's icon node or a HugeiconsIcon arrow-right sized ~42% of the grip, opacity fades as you pass 55% travel), a spinner span (inline SVG ring: a full circle at 25% opacity plus a quarter-arc, 1s linear rotation, only animating while pending, with a 2px blur when idle), and a done span (tick icon + doneLabel, flexes in at done with a 0.2ms scale/fade; the done text only makes sense near the commit point, so the content translation carries it in). Pending blurs the arrow and unblurs the spinner, and vice versa.

## Motion model

- Constants: PAD 4, SQUASH_MAX 0.08, SQUASH_DIV 110, SWELL 1.03, MIN_PENDING 300ms, ease-out cubic-bezier(0.23, 1, 0.32, 1), shake keyframes [0, −5, 5, −3, 3, −1, 0]px over 0.45s.
- Geometry: GRIP = height − 8, INNER = width − 8, TRAVEL = INNER − GRIP (min 1). Motion values: x (drag offset), anchor (where the capsule sat at commit), shown (1 while idle, 0 hides arrow/spinner content opacity for the done state), spin (spinner opacity), pulse (track scale), shake (track offset). Derived transforms: `edge = clamp(x, 0, TRAVEL) + GRIP + clamp(anchor − x, 0, TRAVEL)` (the clip window's right edge, so past commit the window stays at the release point and travels back with the capsule), capsule `scale(q·swell, swell/q)` with q = 1 − min(SQUASH_MAX, max(0, −x)/SQUASH_DIV) — pulling left squashes the capsule vertically like a compressed spring — and a transform-origin tracking the window so the squash pivots at the grip. Idle hover swell scales the capsule by 1.003/1.03 inverse pair on fine pointers (skipped when held, pending, done or reduced motion). The track transform composes shake px and pulse scale (landing dip).
- Drag: pointerdown on the track (enabled, not pending/done, primary button) captures the pointer and adds window-level pointermove/up/cancel listeners (trusted events only). Movement clamps to [0, TRAVEL]; a 4-sample history yields release velocity. The `local()` helper maps clientX through the track's bounding rect so a scaled track still reads correctly. Release at full travel commits; a moved release springs home with a critically-damped-ish spring (stiffness k = 260 + speed% × 640, mass 0.9, damping = critical × (1 − returnBounce clamped 0–0.5), returnBounce default 0.38) fed the release velocity (clamped ≤ 0); an unmoved release does nothing.
- Commit: onConfirm is invoked synchronously — a thrown reason rejects. If it returns no promise, the arrow fades in 0.12s and resolve() runs: phase done, the anchor freezes the window at the release point, x springs home on the commit spring (critically damped), and a landing dip pulses the track scale to 1 − landingDip (0.026) and back over 0.46s starting 0.1s later (skipped for keyboard or reduced motion). With a promise: phase pending, spinner fades in and the arrow blurs out over 0.2s, and the promise settles through a gate that guarantees at least MIN_PENDING 300ms of spinner (late resolutions of stale runs are discarded by a run counter). resolve() calls onDone; after holdMs (1500) the phase returns to idle, the shown value and anchor ease back, and the capsule is ready again.
- Reject(reason): phase error, onError(reason), the track shakes, the label crossfades to errorLabel, the capsule tints red and homes after 0.3s (or instantly when reduced motion), spinner/arrow restore, and after max(holdMs, 1500) the phase resets to idle.
- Keyboard on the slider: End commits; ArrowRight/ArrowUp step x by TRAVEL/10 and commit on reaching full travel; ArrowLeft/ArrowDown step back; Home/Escape reset x to 0 (Escape also ends an active drag); all key paths pass viaKey so no landing dip plays. Reduced motion replaces every spring with a 0.2s ease-out tween or instant set, and the spinner breathes (opacity 1↔0.4) instead of spinning. Unmount clears both timers, the window listeners and bumps the run counter.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "Slide to pay" | Track label; also the slider's aria-label base. |
| doneLabel | string | "Paid" | Text inside the capsule after success. |
| errorLabel | string | "Payment failed" | Label text swapped in on error. |
| onConfirm | () => void \| Promise | - | Called at full travel; a returned promise drives the pending phase, a throw drives error. |
| onDone | () => void | - | Called when the action resolves. |
| onError | (reason) => void | - | Called with the throw value or promise rejection reason. |
| trackColor | string | "#262626" | Track background. |
| handleColor | string | "#f5f5f5" | Capsule colour (also the arrow ink base). |
| successColor | string | "#22c55e" | Capsule colour on done. |
| dangerColor | string | "#e5484d" | Error text and capsule colour. |
| width | number | 280 | Track width, px. |
| height | number | 56 | Track height, px. |
| radius | number | 28 | Corner radius, px; clamped to height/2. |
| speed | number | 50 | Spring stiffness ramp 0–100 (k = 260 + speed% × 640). |
| returnBounce | number | 0.38 | Bounce of the spring-home, 0–0.5. |
| landingDip | number | 0.026 | Track scale dip on success landing; 0 disables. |
| holdMs | number | 1500 | How long the done pill stays before resetting, ms. |
| disabled | boolean | false | Disables the control. |
| icon | ReactNode | - | Custom glyph replacing the default arrow. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of SlideCommit.jsx and SlideCommit.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: dragging to the end commits with the green unfurl, landing dip and hold-time reset; releasing mid-track springs home with bounce; pulling left squashes the capsule vertically; sync onConfirm resolves immediately, a promise shows the spinner for at least 300ms, a rejection shakes the track, crossfades the label and tints the capsule; rapid re-drags during pending are locked out; keyboard End/arrows/Home/Escape work with the slider semantics and percentage announcements; scaled-down tracks still track the pointer correctly; width/height/radius/speed/returnBounce/holdMs variations behave; disabled blocks everything; reduced motion skips springs, dip, squash and spin (breathe instead); unmount leaves no timers, listeners or animations; 375 / 768 / 1440 wide without overflow.
