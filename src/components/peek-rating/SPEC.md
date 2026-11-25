Implement the "PeekRating" component from zero: a star rating where hovering the row lifts a wave of icons up toward the pointer — every icon at or under the pointer rises, the one under it rises a bit higher and magnifies — while a pill-shaped tooltip travels above the hovered star showing its label; a click commits the value with a pop animation on the clicked icon. Pure React + CSS, two files, icon glyphs from a React icon library; it must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files: PeekRating.jsx (entry, pointer/keyboard state machine, imperative paint) and PeekRating.css (all styles). Dependencies: React >= 18 plus a React icon package for the three built-in glyphs (star, heart, bolt); no other runtime deps. No iframe.
- Root is a `<div class="peek-rating">` (plus caller className) that is `role="radiogroup"` with aria-label, or `role="img"` with aria-label "`value` of `count`" in read-only mode; aria-disabled when disabled. All colours and metrics are inline CSS variables: `--pr-active`/`--pr-idle` (lit/unlit colours), `--pr-tip`/`--pr-tip-text` (tooltip colours), `--pr-size` (icon size px), `--pr-gap` (round(size × 0.22) px, baked into each slot's width), `--pr-room` (lift + tooltip headroom, px, only when interactive and tooltips shown), `--pr-rise` (riseDuration ms). An ease-out cubic-bezier(0.23, 1, 0.32, 1) token stays in CSS.
- Inside is a row div (`peek-rating__row`, inline-flex, align-items flex-end, padding-top = the headroom so lifted icons and the tooltip never clip, user-select none, touch-action pan-y) holding: an absolutely positioned tooltip span (only when interactive and showTip), and count slots. Each slot is a `<button type="button" role="radio">` (span in read-only mode, then aria-hidden) with aria-checked, aria-label "`i` of `count`[, label]", and roving tabIndex — only the checked star (or the first when value is 0) is tabbable. Focus-visible shows a 2px outline in a colour mixed from the active colour, offset 2px, 6px radius; on coarse pointers the slot enforces a 44px touch target.
- Each slot nests two spans: `peek-rating__lift` (the transform target; transform-origin 50% 100%, transition transform var(--pr-rise)) and inside it `peek-rating__glyph` (fixed icon size, colour transitions 160ms, `data-lit="true"` flips to the active colour; svg fills the box). The glyph contains the caller's icon node or a HugeiconsIcon of the chosen shape (star / heart / bolt, fill currentColor, stroke 1.5).

## Pointer preview (the wave)

- All motion values live in refs; a `paint()` layout effect writes transforms directly to the DOM — React state never re-renders during hover, so the wave stays frame-cheap. State: hover index (null when off), pressing, pointerId, settled (true right after commit), row rect, rtl flag.
- Preview value: while hovering and not settled, stars 0..hover show lit; the lift applies only when not in reduced motion: stars up to and including hover translate up by `lift` px, the hovered one additionally scales by `magnify` (1.15); everything else returns to translateY(0) scale(1). The transition is the CSS var duration, so the row reads as a wave chasing the pointer.
- Tooltip: a dark pill (`--pr-tip` background, `--pr-tip-text` ink, height 0.6×size, horizontal padding 0.3×size, 999px radius, font 0.38×size semibold, soft shadow) sits at the row's top; when showing, its text is labels[hover] ?? String(hover+1) and it slides to the hovered slot's centre (slot width × (visualIndex + 0.5), mirrored for RTL direction) minus 50% of its own width. When it first appears the transform transition is suppressed for one frame so it pops in place instead of flying in from the old position. Hidden state is `data-show="false"` (opacity 0, pointer-events none).
- Pointer handling lives on the row: pointerenter (mouse only) measures the row rect and clears the instant flag; pointerdown (primary button only, one pointer at a time) captures the pointer, sets pressing, measures, and previews the index under the pointer; pointermove updates the preview — for touch it only tracks while pressing; indexAt converts clientX to a slot index (clamped), and while pressing tolerates vertical drift of ±size beyond the row so a slightly slipping finger keeps its selection (otherwise returns null). pointerup commits (below); pointercancel/lostpointercapture end the press without committing; pointerleave clears the preview unless a press is active. A document visibilitychange to hidden or window blur clears press state and preview.
- Commit: value updates internal state in uncontrolled mode (or is reported via onChange in controlled mode — the prop wins); onChange always receives the next value. The clicked glyph (when popScale > 1 and not reduced motion) runs a Web Animations API pop — scale 1 → popScale at 35% → 1 over 300ms with the ease-out, cancelling any previous pop — while `settled` freezes the wave so the row shows the committed value immediately. Clicking the current value clears it back to 0 when allowClear is on.
- Keyboard: arrows/Home/End step the value (Home → 1, End → count); Backspace/Delete clear (when allowClear); Space/Enter activate the focused star, toggling it to 0 if it is the current value and allowClear is on. All key commits skip the pop and the wave and instead set `data-instant="true"` on the root, which zeroes transition durations for one paint so keyboard users get immediate feedback; focus follows the new value.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | Controls the value yourself; the prop wins over internal state. Use with onChange. |
| defaultValue | number | 0 | Starting value (uncontrolled mode). |
| onChange | (value: number) => void | - | Called when the value is committed by pointer or keyboard. |
| onPreview | (value: number \| null) => void | - | Called on every hover preview change; null when the pointer leaves. |
| count | number | 5 | Number of icons. |
| shape | "star" \| "heart" \| "bolt" | "star" | Built-in glyph when no custom icon is given. |
| icon | ReactNode | - | Custom glyph node overriding the built-in shapes. |
| labels | string[] | [] | Per-star tooltip texts; the number itself is used when missing. |
| activeColor | string | "#f5b400" | Colour of lit icons, the tooltip-based focus outline, and default tooltip-adjacent accents. |
| idleColor | string | "#52525b" | Colour of unlit icons. |
| tipColor | string | "#27272a" | Tooltip pill background. |
| tipTextColor | string | "#f5f5f5" | Tooltip text colour. |
| size | number | 28 | Icon size, px; derives gap and tooltip metrics. |
| lift | number | 6 | How far lifted stars rise, px. |
| magnify | number | 1.15 | Extra scale on the hovered star. |
| riseDuration | number | 320 | Wave rise/fall duration, ms. |
| popScale | number | 1.3 | Peak scale of the commit pop; > 1 enables it. |
| showTip | boolean | true | Shows the travelling tooltip. |
| allowClear | boolean | true | Re-selecting the current value clears it to 0. |
| readOnly | boolean | false | Display-only: spans instead of buttons, role="img". |
| disabled | boolean | false | Disables interaction (dimmed, pointer-events none). |
| ariaLabel | string | "Rating" | Accessible name of the radiogroup. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of PeekRating.jsx and PeekRating.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: hovering raises a wave up to the pointer with the hovered star magnified and the tooltip riding above it; moving across the row drags the wave smoothly with no React re-render per move; click commits with a pop and freezes the preview; clicking the current star clears to 0 when allowClear; dragging a touch works via the pressing path with vertical tolerance; controlled and uncontrolled modes both honour onChange, onPreview fires null on leave; keyboard arrows/Home/End/Space/Enter/Delete work with roving tabindex and instant (no transition) feedback; RTL direction mirrors the tooltip and index math; readOnly renders an accessible static summary; disabled blocks interaction; custom icon node replaces the glyph; sizes 20–48 keep the tooltip and touch targets sane; prefers-reduced-motion removes the lift and the pop but keeps lit-state changes instant; unmount leaves no listeners; 375 / 768 / 1440 wide without overflow.
