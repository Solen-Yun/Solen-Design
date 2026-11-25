Implement the "PulseHeart" component from zero: a like button — a pill holding a stroke icon and a formatted count — that on click contracts the icon to a small dot while the pill breathes, flips the icon to its filled liked colour at the moment of maximum contraction, rolls the changed digits of the count vertically, and pulses everything back as the count lands. Pure React + CSS, two files, icon paths from a React icon package; no runtime dependencies beyond React >= 18 and that icon package; it must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files: PulseHeart.jsx (entry, swell animation, digit roll) and PulseHeart.css (all styles). Dependencies: React >= 18 plus a React icon package for the three built-in glyph path sets (heart, star, thumb); no other runtime deps. No iframe.
- Root is a `<button type="button">` with class `pulse-heart` (plus caller className), `aria-pressed` reflecting the liked state, `disabled` when disabled (dimmed 0.55), cursor pointer, user-select none, touch-action manipulation. Data attributes drive appearance: `data-liked="true"/"false"` (the *shown* state, not the logical one — see animation), `data-solid` present when idleOutline is false (idle icons render filled instead of stroked), `data-no-count` when showCount is false, `data-pressed` while the pointer is down (scales the whole button 0.97), `data-running` during the swell animation (suppresses icon colour transition), `data-instant` when the change should apply without animation. Focus-visible shows a 2px outline mixed from the liked colour, offset 3px.
- Inline CSS variables: `--ph-size` (icon size px), `--ph-corner` (pill radius px), `--ph-pill` (pill background), `--ph-idle` (unliked icon colour), `--ph-liked` (liked icon colour), `--ph-text` (count colour), `--ph-roll` (digit roll duration ms), `--ph-stroke` (1.5 × size / 24 px).
- Children: a `pulse-heart__pill` span (inline-flex, padding 0.3×size, inline-end padding 0.4×size when the count shows, gap 0.25×size, radius var, background var, transform-origin center — this is the breathing element) containing: the `pulse-heart__heart` icon span (size × size, colour idle, transitions colour 160ms; liked flips it to the liked colour; hover on fine pointers tints the idle icon 45% toward the liked colour); when showCount, a `pulse-heart__count` span (0.5×size, semibold, tabular-nums, letter-spacing −0.1px) whose content is a per-character cell list (see roll); and a visually hidden span for screen readers reading "`label`, `count`" or just `label`.

## Swell animation

- The click runs a rAF timeline over `duration` ms (default 560) driven by a swell curve: progress t passes through an "out" phase at t = 0.4 — the icon scale factor is 1 − (1 − t/0.4)³ while t < 0.4 (easing down to the dot), then for t ≥ 0.4 it follows a back-overshoot ease-out (back curve with overshoot c = the overshoot prop, default 1.7) scaling from the dot back past 1 and settling at 1. Scale factor k maps to `1 − (1 − dotSize) · s` with dotSize default 0.3, so the glyph shrinks to 30% of itself at the deepest point.
- Applied per frame: the SVG glyph group gets `transform: translate(12 12) scale(k) translate(-12 -12)` (so the 24×24 viewBox scales around its centre with non-scaling strokes); if no SVG glyph (custom node) the heart span gets `scale(k)`; the pill gets `scale(1 − (beat/100) · s)` with beat default 3 — a 3% breath. All transforms clear at the end.
- At the swap point (midway through a frame's step crossing t = 0.4) the shown state flips: `data-liked` toggles (which flips the icon colour and fill), and the count roll starts (below). A click is ignored while the animation runs (`raf` guard) so double-clicks never double-count. On pointerdown the button shows the pressed scale; pointerup/leave/cancel clear it; keyboard clicks (no pointer) and reduced-motion clicks skip the animation entirely and instead set `data-instant` for one layout frame (the layout effect forces a reflow and removes it) so the change applies immediately without transitions.
- Digit roll: the count renders as one span per character via locale formatting (Intl.NumberFormat). On a change, diff the old and new formatted strings — if they share the same length, exactly one changed digit column becomes a rolling slot: a 1em-tall overflow-hidden cell containing a two-row stack (old digit / new digit) that translates 1em up (increment) or from −1em to 0 (decrement) over rollDuration ms with the ease-out; unchanged characters stay static; if the length differs or more than one digit changed, the whole count swaps as a single rolling cell. The roll element is driven by a layout effect that sets the start transform with transitions suppressed, forces a reflow, then releases the transition; a timer clears the roll state after rollDuration. Repeated clicks restart the roll cleanly.
- Displayed state vs logical state: shown liked/count deliberately lag the logical props during the animation and snap at the swap; a sync effect catches up if the logical state changes externally while idle (and after the animation finishes any pending difference is flushed).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| liked | boolean | - | Controls the liked state yourself; the prop wins over internal state. Use with onChange. |
| defaultLiked | boolean | false | Starting liked state (uncontrolled mode). |
| count | number | 0 | Like count; changes from outside are adopted (with a roll when formatted digits differ). |
| onChange | (liked: boolean, count: number) => void | - | Called on toggle with the new liked state and count. |
| showCount | boolean | true | Shows the formatted count next to the icon. |
| icon | "heart" \| "star" \| "thumb" \| ReactNode | "heart" | Built-in glyph name or a custom React node. |
| idleOutline | boolean | true | Unliked icon renders as an outline; false renders it filled. |
| size | number | 40 | Icon size, px; derives paddings, gap, count size and stroke width. |
| corner | number | 32 | Pill corner radius, px. |
| likedColor | string | "#ff4d6d" | Icon colour when liked, and the focus outline tint. |
| idleColor | string | "#8b8b93" | Icon colour when unliked. |
| pillColor | string | "#232326" | Pill background. |
| textColor | string | "#f5f5f5" | Count text colour. |
| duration | number | 560 | Swell animation duration, ms. |
| dotSize | number | 0.3 | Icon scale at the deepest contraction, 0–1. |
| overshoot | number | 1.7 | Back-curve overshoot of the pulse-back. |
| beat | number | 3 | Pill breathing depth, percent of scale. |
| rollDuration | number | 350 | Digit roll duration, ms. |
| disabled | boolean | false | Disables the button. |
| label | string | "Like" | Base of the screen-reader text. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of PulseHeart.jsx and PulseHeart.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: clicking contracts the icon to a dot, flips colour and fill exactly at the contraction peak, pulses back with overshoot while the pill breathes; the changed digit rolls vertically while other digits stay static; counts crossing a format boundary (999 → 1,000) swap as one cell; rapid clicking is ignored while running and catches up after; star and thumb glyphs and a custom node all work; idleOutline off shows filled idle icons; hover tints the idle icon; controlled and uncontrolled modes honour onChange and an external count change rolls; keyboard activation is instant without animation; disabled blocks clicks; prefers-reduced-motion removes the swell and roll (colour crossfades 200ms instead); prefers-contrast adds an inset pill outline; coarse pointers keep a 44px target; unmount cancels the rAF and roll timer; 375 / 768 / 1440 wide without overflow.
