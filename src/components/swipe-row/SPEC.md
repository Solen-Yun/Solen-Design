Implement the "SwipeRow" component from zero: a mobile-style list row that hides an action drawer behind its surface. Dragging the surface sideways peels it away to reveal the actions; flicking past the first action's width makes the primary action block ride along under your finger, and dragging to a full-width commit point shows a "release to act" state — release there and the row leaps to full width, then folds flat and disappears. Taps, arrow keys, Escape and Delete all work too. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ driven by the motion animation library (motion/react: `motion`, `animate`, `useMotionValue`, `useTransform`, `useReducedMotion`); the default primary icon is an outline trash glyph (20px, stroke 2) from an embedded icon package — exact artwork follows the embedded source. Two files only: SwipeRow.jsx and SwipeRow.css. No iframe.
- Root is a `<div role="group" class="swipe-row" aria-label="...">` carrying data-direction ("left"/"right"), data-open, data-phase ("idle"/"committing"/"collapsing"), data-disabled, plus inline variables: --sr-h (height), --sr-r (radius), --sr-a (actionWidth), --sr-row (rowColor), --sr-text (textColor), --sr-drawer (drawerColor), --sr-on-drawer (auto contrast on drawerColor), --sr-action (actionColor), --sr-on-action (auto contrast on actionColor), --sr-collapse (collapseMs). The root transitions height, margin-bottom and opacity over --sr-collapse with ease-out; `[data-phase='collapsing']` pins height 0 / margin-bottom 0 / opacity 0 — that is the row's exit.
- Inside is a clip (rounded var(--sr-r), overflow hidden, background rowColor) stacking two layers. The rail (absolute inset 0, background drawerColor) holds the action buttons: secondary actions absolutely placed one action-width apart behind the primary, each rendered as a full-height button with background `a.color ?? drawerColor` and an auto-contrast label; content is a vertical glyph stack (optional icon span + 11px/500 label), hover adds an 8% white veil, press scales the glyph to 0.97. The rail is translated by the exposed distance so it slides under the surface, and carries `inert` + aria-hidden while closed.
- The primary block is a motion.div filling the row in actionColor, docked at the leading edge (one action-width wide visible), translated with the surface once the exposed distance passes one action width. Inside it the commit button's glyph counter-translates so the icon+label stay visually centred under the finger as the block rides; a second motion value "lands" (1 on the full-swipe leap) blends that counter-offset out at the end.
- The surface (relative, z-index 1, flex, gap 12px, padding 0 16px, background rowColor, colour textColor, touch-action pan-y) carries the children and the pointer handlers; it translates with the drag. Desktop fine pointers see cursor grab → grabbing while data-dragging, and coarse pointers get user-select none during the drag. A visually-hidden toggle button lives at the trailing edge for keyboard/AT access.
- An aria-live="polite" span (sr-only) announces "Release to <primary label>" when the commit threshold is crossed, the chosen action's label on commit, and "N actions revealed" on keyboard open.
- Action shape: `{ id, label, icon?, color?, dismiss?, onSelect? }`. The first action is primary (full-swipe target, rendered in the riding block); the rest are secondaries. Non-primary actions also fire onSelect; every interaction first fires onAction(action).

## Gesture physics

- Drag start requires left button, enabled, idle phase, at least one action. Tracking continues on window (move/up/cancel listeners installed per gesture, always cleaned up). Commitment needs 10px horizontal dominance over vertical movement (a scroll-friendly dead zone), after which the grab offset is recalibrated against the mapped position so the surface never jumps.
- The raw horizontal pull maps to exposed distance with a three-zone profile: negative (over-pull away from the drawer) and beyond-full-width travel use a rubber-band `o·dim·c / (dim + c·|o|)` with c = resistance clamped 0.05–1; 0..D (drawer width = actions × actionWidth) is linear. When full-swipe commit is available, the zone past D compresses by the resistance factor up to the commit point C = max(commitAt × rowWidth, D + A/2) (capped by row width), rubber-banding from C onward. commitAt ≤ 0.6 with one action typically keeps C reachable within the row.
- Release decides by velocity (last 4 pointer samples, px/s): |v| ≥ 110 is a flick — v positive opens fully, negative closes; otherwise the projected glide `ex + (v/1000)·0.998/(1−0.998)` (deceleration model, velocity clamped ±1500) past D/2 opens, else closes. Settling springs: flicks use duration 0.4 with bounce snapBounce and the release velocity; plain taps use duration 0.3, bounce 0. prefers-reduced-motion swaps springs for a 0.2s ease-out move.
- Crossing the commit point mid-drag arms the release state: the spread value springs to 1 (the primary block rides under the finger), the live region says "Release to <label>", and on touch devices navigator.vibrate(8) fires when haptic is on. Releasing back under the threshold un-spreads.
- Commit: x springs to full row width (the leap — spread and landed spring to 1 together), phase goes "committing" → "collapsing" when the leap lands; after collapseMs the CSS collapse plays and onCommit(action) plus action.onSelect() fire. Keyboard commits jump x instantly. onOpenChange tracks open state throughout.
- Secondary actions: onAction fires, then action.onSelect; the row closes (unless closeOnAction is false); keyboard-activated secondary actions close instantly without animation. An action flagged dismiss (or the primary) commits like a full swipe.

## Keyboard & ARIA

- The hidden toggle button ("N action(s)", visible only on :focus-visible as a small pill on the trailing edge) carries aria-expanded, aria-controls on the rail id, and aria-keyshortcuts naming the open arrow. Keys: Enter/Space toggle (instant open/close), the direction's open arrow reveals, the opposite arrow or Escape closes, and Delete/Backspace commits the primary when open. Opening by keyboard jumps x directly and announces the count.
- Rail buttons are plain buttons reachable by Tab once the row is open (inert while closed). aria-disabled/data-disabled rows sit at 0.55 opacity with pointer-events none and skip focus.
- Controlled open: pass open (undefined falls back to internal state); when not mid-gesture the row springs to match the prop. prefers-reduced-motion additionally drops the press-scale on glyphs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Row surface content. |
| actions | { id, label, icon?, color?, dismiss?, onSelect? }[] | [{ id: "delete", label: "Delete" }] | Drawer actions; the first is primary (full-swipe target) and rides in its own block. |
| actionColor | string | "#e5484d" | Primary action block colour. |
| drawerColor | string | "#3f3f46" | Rail background and default action colour. |
| rowColor | string | "#27272a" | Surface background. |
| textColor | string | "#f5f5f5" | Surface text colour. |
| height | number | 64 | Row height in px. |
| radius | number | 16 | Corner radius in px. |
| actionWidth | number | 80 | Width of one action cell in px. |
| direction | "left" \| "right" | "left" | Which way the surface slides to open. |
| snapBounce | number | 0.2 | Spring bounce when a flick snaps open or closed. |
| resistance | number | 0.55 | Rubber-band strength past the drawer and full-width edges, 0.05–1. |
| collapseMs | number | 200 | Duration of the row's fold-away exit in ms. |
| commitAt | number | 0.6 | Fraction of row width where the full-swipe commit point sits. |
| fullSwipe | boolean | true | Enables the release-to-commit full swipe; off, the drawer opens at most to D. |
| disabled | boolean | false | Disables the row (dimmed, inert). |
| open | boolean | - | Controlled open state; leave undefined for uncontrolled. |
| onOpenChange | (open: boolean) => void | - | Called whenever open state changes. |
| onAction | (action) => void | - | Called for any action trigger before its effect. |
| onCommit | (action) => void | - | Called when a full-swipe/commit action finishes collapsing. |
| closeOnAction | boolean | true | Secondary actions close the drawer after running. |
| haptic | boolean | true | Vibrates 8ms on touch when crossing the commit point. |
| label | string | "List item" | Accessible name of the row group. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of SwipeRow.jsx and SwipeRow.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependencies: motion at ^12.23.12, plus the embedded icon packages listed in the install commands.
- Validate: dragging past one action width snaps open with rubber-band over-pull on both ends; flick velocity snaps by direction, slow drags decide by projected glide; riding the primary block keeps its glyph centred under the finger, releasing at the commit point leaps the row full width and folds it away with onCommit + onSelect; secondary buttons run onAction/onSelect and close (or stay open with closeOnAction off); keyboard — Tab reveals the toggle pill, Enter/Space toggle, arrows open/close per direction, Escape closes, Delete commits when open, live region announces each step; controlled open springs to the prop; row collapse animates height/margin/opacity over collapseMs and is gone; disabled rows are inert; reduced motion uses eased moves without springs; unmount clears the fold timer and window listeners; 375 / 768 / 1440 wide without overflow.
