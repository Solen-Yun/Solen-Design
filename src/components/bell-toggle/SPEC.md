Implement the "BellToggle" component from zero: a pill toggle where pressing it rings the bell — the bell glyph swings with decaying wobble, sound-wave arcs unfurl on alternating sides, the label crossfades with a blur, and the pill itself stretches to the incoming label's width. Pure React + Motion, two files: BellToggle.jsx (entry, ring physics) and BellToggle.css (all styles). React >= 18; runtime dependencies: motion (motion/react: animate/motion/useMotionValue/useTransform/useReducedMotion) and @hugeicons/react + @hugeicons/core-free-icons for the default bell glyph. No iframe, no external assets.

## Structure & rendering

- Root is a `<motion.span class="bell-toggle">` (inline-grid, user-select none, tap-highlight off) with data-on "true"/"false", data-disabled, and all styling injected as CSS variables: colours (--bt-color/--bt-bg resting, --bt-on-color/--bt-on-bg active, --bt-badge/--bt-badge-ink), --bt-radius, --bt-fade (crossfadeMs), --bt-pivot (ringPivot % — the bell's swing origin height), and size tokens from the size prop: sm [h 36, font 12.5, icon 14, padding-x 15, gap 8], md [44, 13.5, 16, 19, 9], lg [52, 15, 18, 23, 10].
- The `<button class="bell-toggle__button">` (grid-area stacked over the root span, aria-pressed, aria-label = label ?? offLabel, disabled pass-through) is the pill: inline-flex, height --bt-h, padding 0 --bt-px, radius --bt-radius, background --bt-bg, color --bt-color, 500-weight --bt-fs text, and a CSS `clip-path: inset(0 var(--bt-clip) 0 0 round var(--bt-radius))` — the engine animates --bt-clip so the pill visually retracts/extends between label widths. Background and colour crossfade over --bt-fade; hover tints the resting (or active) background by mixing 6% of the ink into it (hover-capable pointers only); pressed scales the whole root to 0.97 (160ms out-ease; none under reduced motion or disabled).
- Inside, left to right: the bell group (`.bell-toggle__bell`, --bt-icon square, relative): the glyph span (grid-centered, transform-origin 50% var(--bt-pivot)) holding either the custom `icon` node, the default Hugeicons bell (Notification03Icon, size --bt-icon, strokeWidth 2), or — when clapper is on — an inline SVG bell outline (a 24×24 path `M6 16.5V10a6 6 0 0 1 12 0v6.5l1.6 2.3H4.4L6 16.5z` plus a small top stem) with a separate absolutely-stacked clapper dot (a 1.7-radius circle at the bottom) that swings with its own larger amplitude; two wave SVGs (14 × 14, 1.6px round strokes, opacity 0 at rest) parked outside the left/right edge (right: calc(100% − 2px) / left: calc(100% − 2px), tops −3px) drawing two concentric arcs each (`M14 8a6 6 0 0 0-6 6` / `M14 4A10 10 0 0 0 4 14` and mirrored); and a badge (top −6px right −7px, min-width 14, height 14, radius 7, background --bt-badge, ink --bt-badge-ink, 9.5px/600) whose digit shows count (capped "9+") and pops in translateY(5px) scale(0.6) → rest with a back-out 280ms when shown.
- The label area (`.bell-toggle__say`, inline-grid, height 18px) stacks two `.bell-toggle__face` spans (grid-area 1/1): offLabel resting and onLabel active. Both sit at opacity 0 with blur(2px); the active side's face goes opacity 1 / blur 0 over --bt-fade — a blur-crossfade between labels. The pill's width follows the wider face because both faces occupy the same grid cell; the --bt-clip animation makes the transition feel like the pill unfolds rather than jumps (see below).

## Ring physics

- Widths of both faces are measured (offsetWidth) by a ResizeObserver (plus document.fonts.ready) into MotionValues wOff/wOn; the clip value is `max(wOff, wOn) − mix(wOff → wOn by t)` px where t is a MotionValue 0..1 for off→on — so turning on clips the resting width away to reveal the full pill, and the motion value drives the CSS variable directly.
- On toggle: with pointer input (and not reduced motion) t springs to the new side (spring duration 0.3, bounce = revealBounce, default 0 — a snappy unfold); with keyboard or reduced motion t jumps instantly. Turning on by pointer also triggers swing().
- swing(amplitude, passes, duration): the bell glyph animates rotation keyframes starting from its current computed angle (read back from getComputedStyle/DOMMatrix so re-rings never snap): an initial full-angle frame, then one frame per pass alternating sign with decayed amplitude `amplitude × (1 − k/passes)^decay` at warped offsets `1 − (1 − (k + 2/3)/(passes + 1))^0.6`, easing each segment cubic-bezier(0.77, 0, 0.175, 1), ending at 0. The clapper (when present) runs the same keyframes at amplitude × 1.6 delayed 70ms. Each pass also fires a wave: alternating left/right wave SVGs pop opacity 0 → 0.9 × decay-strength (at 30% of their 380ms run) → 0 while scaling 0.55 → 1.25, delayed by the same warped pass offset — arcs ripple outward alternating sides as the bell settles.
- External re-ring: bumping the count prop upward while on replays a softer wobble (amplitude × 0.4, 3 passes, 420ms) so notifications shake the already-on bell. The badge digit re-mounts per count (key) and slides in via a @starting-style rule.
- Reduced motion: no press scale, no blur on faces (opacity only), no badge/digit transforms, count wobble and pointer swing suppressed; the crossfade stays.

## Interaction & accessibility

- Controlled (pressed + onChange) or uncontrolled (defaultPressed + internal state); onChange(!on) always fires. Pointer down/up/cancel/leave manage the pressed visual; Enter/Space set keyboard input mode (which skips the spring). Disabled greys to 0.55 and blocks press visuals; the button stays a real toggle button for screen readers with aria-pressed and a stable label.
- Unmount stops any running spring. Same-page instances are independent; label re-measure reacts to label text and size changes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| offLabel | string | "Notify me" | Label shown while off. |
| onLabel | string | "You'll be notified" | Label shown while on. |
| icon | ReactNode | - | Custom glyph replacing the default bell icon. |
| label | string | - | Accessible label of the button; falls back to offLabel. |
| color | string | "#f5f5f5" | Ink of the resting pill. |
| background | string | "#27272a" | Background of the resting pill. |
| onColor | string | "#18181b" | Ink of the active pill. |
| onBackground | string | "#f5f5f5" | Background of the active pill. |
| size | "sm" \| "md" \| "lg" | "md" | Height, font, icon, padding and gap presets. |
| radius | number | 22 | Pill corner radius in px. |
| ringAmplitude | number | 17 | Bell swing amplitude in degrees. |
| ringPasses | number | 5 | Number of decay wobbles per ring (also the wave count). |
| ringDecay | number | 1 | How fast the wobble decays per pass. |
| ringDuration | number | 820 | Ring duration in ms. |
| ringPivot | number | 16 | Swing origin height on the bell, in % from the top. |
| crossfadeMs | number | 200 | Label and colour crossfade duration. |
| revealBounce | number | 0 | Spring bounce of the pill's unfold. |
| count | number | 0 | Notification count on the badge; increasing it re-rings the bell. |
| badge | boolean | true | Shows the count badge while on. |
| badgeColor | string | "#ef4444" | Badge background. |
| badgeTextColor | string | "#ffffff" | Badge digit colour. |
| waves | boolean | true | Unfurling sound-wave arcs on ring. |
| clapper | boolean | false | Draws a separate clapper dot that swings harder than the bell. |
| pressed | boolean | - | Controlled on state; pass it to stop internal state. |
| defaultPressed | boolean | false | Initial state (uncontrolled mode). |
| onChange | (on: boolean) => void | - | Called on every toggle with the next state. |
| disabled | boolean | false | Disables the button. |
| className | string | "" | Extra class on the root span. |

## Delivery & validation

- Deliver the complete content of BellToggle.jsx and BellToggle.css plus install steps (react, react-dom, motion, @hugeicons/react, @hugeicons/core-free-icons) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: pressing rings the bell with decaying wobble, waves ripple alternately, the label blur-crossfades and the pill unfolds to the new width without jumping; toggling off reverses everything; controlled and uncontrolled modes both work; size sm/md/lg, radius, pivot and ring amplitude/duration/decay all take effect; clapper mode adds the swinging dot; badge appears only while on with count > 0, caps at 9+, and bumping count re-rings; waves/clapper toggles; keyboard toggle skips the spring; disabled blocks interaction; reduced motion stays usable without swing/press/blur; label changes re-measure the pill; unmount stops springs; 375 / 768 / 1440 wide without overflow.
