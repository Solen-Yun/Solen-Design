Implement the "GlideSelect" component from zero: a compact select chip whose menu pops open from a corner with a scale-and-fade, and whose highlight is a single pill that glides fluidly between rows — the pill jumps instantly to the selected row when the menu opens, then glides (or scrubs live under the finger) as you move between options; picking a row blurs-swap the label on the chip. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + an icon set package, two files only: GlideSelect.jsx (entry, phase/pill logic, pointer scrub) and GlideSelect.css (all styles). React >= 18; the icon package supplies a chevron-down and a checkmark tick (stroke icons); both can be replaced since they render through a generic icon wrapper.
- Root is an inline-block `<div>` with class `glide-select` carrying data-size and data-disabled (opacity 0.5). Inline CSS variables: colour tokens --gs-accent/--gs-surface/--gs-highlight/--gs-text, --gs-radius and --gs-inner-radius (max(3, radius − 4)), size tokens --gs-chip/--gs-row/--gs-font from the size preset (sm: 28/26/12, md: 32/30/13, lg: 44/40/14 px), --gs-menu-w, timing tokens --gs-pop (popDuration), --gs-pop-out (round(popDuration × 2/3)), --gs-glide (glideDuration), and --gs-origin ("<opposite side> <align>") for the pop.
- The trigger is a real `<button role="combobox" aria-haspopup="listbox" aria-expanded aria-controls aria-activedescendant>`: inline-flex centred, height = chip, padding 0 8px 0 10px, radius = inner radius, surface background, 6px gap, font from the preset, weight 500; hover and expanded states lighten the background with a highlight mix; active press scales 0.97. Inside: a label span keyed by the current value (keyed remount drives the swap animation, opacity 0.6 when showing the placeholder, a 160ms blur-in swap animation plays when data-swap is set) and a chevron span (55% ink) that rotates 180° while expanded.
- The menu (absolute, z-index 20, width menuWidth min-width 100%, padding 4px, radius, surface background, deep drop shadow) mounts while the phase is not closed, carries data-side (bottom/top) and data-align (left/right): bottom sits at top: calc(100% + 6px), top at bottom: calc(100% + 6px), left/right pin the matching edge. Opening animates opacity 0→1 and scale(0.95)→1 from --gs-origin over --gs-pop with a strong ease-out; closing shrinks back over --gs-pop-out with pointer-events none. The list inside is a grid with 1px gaps, role="listbox", aria-label; each option is role="option" with aria-selected and data-index, height = row, radius inner, flex row of name (weight 500, ellipsis), optional tag (55% ink, font − 2px, rendered when showTags and the option carries a tag) and a check tick (accent colour, visible only on the selected row).
- The pill is an absolutely-positioned span (top 0, full width, height row, radius inner, highlight background) whose transform translateY is driven directly (no layout animation); the selected row's background becomes transparent while the list is "live" (a highlight is present) so the pill is the single highlight source.

## Open/close & pill logic

- Opening: the side flips (bottom → top) when the menu would overflow the viewport, and vice versa. The pill is placed with transitions disabled at max(0, selectedIndex) × step (row + 1px) with opacity 0, then a forced reflow re-enables transitions. The active option starts at the selected index (0 when opened by keyboard, otherwise none). Closing (outside pointerdown, pick, Escape/Tab) snaps the phase to closed immediately on pick, or plays the shrink and commits closed after pop-out + 20ms on outside clicks.
- The active option moves via a single effect: keyboard jumps are instant (transition duration 0 for the transform, 150ms for opacity); pointer moves glide over --gs-glide. When the active option is null the pill fades out. The first glide after open is always instant because the pill starts from opacity 0.
- Pointer scrub: pointerdown on the list captures the pointer and activates the row under the finger; moves retarget live; up picks the row under the finger (cancel releases without picking). Hover (non-touch, no scrub) activates rows via pointerover; leaving the list clears the active highlight when rememberPosition is off. Rows are computed from geometry: floor((y − listTop − 4) / step).

## Keyboard & selection

- Trigger keys closed: Enter/Space/ArrowDown/ArrowUp open with the active option seeded. Open keys: ArrowDown/ArrowUp move the active option (clamped), Home/End jump to the ends, Enter/Space pick it, Escape/Tab close, and any single printable character runs typeahead (next option whose text starts with the character, wrapping) with instant movement.
- Picking writes the value (uncontrolled mode keeps an inner value; controlled mode relies on the value prop), calls onChange(value, item), closes instantly, and refocuses the trigger. Picking a different value sets data-swap so the chip label plays the blur swap; the attribute is cleared on animation end. Disabled closes any open menu and blocks opening.
- Outside pointerdown (captured on document) closes while open. Unmount clears the close timer.

## Accessibility

- combobox/listbox/option roles with aria-expanded, aria-controls, aria-activedescendant and aria-selected are complete; the listbox shares the ariaLabel with the trigger. prefers-reduced-motion removes the menu scale, pill glide and chevron spin (opacity still transitions) and the press scale.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | (string \| { value: string; label: string; tag?: string })[] | DEFAULT_OPTIONS | Menu options; strings become value and label. |
| value | string | - | Controlled selected value. |
| defaultValue | string | - | Initial selected value (uncontrolled mode). |
| onChange | (value: string, item) => void | - | Fires when a row is picked. |
| placeholder | string | "Select…" | Chip label when nothing is selected. |
| showTags | boolean | true | Renders each option's tag text. |
| accentColor | string | "#f5f5f5" | Accent of the check tick. |
| surfaceColor | string | "#27272a" | Chip and menu background. |
| highlightColor | string | "#3f3f46" | Pill highlight and hover tint. |
| textColor | string | "#f5f5f5" | Text ink. |
| size | "sm" \| "md" \| "lg" | "md" | Size preset (chip height / row height / font). |
| radius | number | 10 | Menu corner radius in px; inner elements use radius − 4. |
| menuWidth | number | 176 | Menu width in px (min-width is the chip width). |
| placement | "bottom" \| "top" | "bottom" | Preferred menu side; auto-flips on viewport overflow. |
| align | "left" \| "right" | "left" | Menu edge alignment against the chip. |
| popDuration | number | 180 | Menu pop-in duration in ms; pop-out is two thirds of it. |
| glideDuration | number | 220 | Pill glide duration in ms. |
| rememberPosition | boolean | true | Keeps the highlight on the last hovered row when the pointer leaves. |
| disabled | boolean | false | Disables the trigger and closes the menu. |
| ariaLabel | string | "Select" | Accessible name of trigger and listbox. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of GlideSelect.jsx and GlideSelect.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the menu pops from the correct corner and flips sides near the viewport edge; the pill sits on the selected row instantly at open, glides on hover and scrubs under a pressed finger; clicking picks and blur-swaps the chip label; keyboard arrows/Home/End/typeahead/Enter/Escape/Tab all work with correct aria wiring; controlled and uncontrolled values both work; tags show and hide; placements and alignments hold; sizes sm/md/lg; disabled blocks everything; rememberPosition off clears the highlight on leave; reduced motion keeps everything functional; unmount leaves no timers or document listeners; 375 / 768 / 1440 wide without overflow.
