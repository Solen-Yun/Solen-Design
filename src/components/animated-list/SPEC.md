Implement the "AnimatedList" component from zero: a scrolling notification/file list whose rows spring into view with a slight overshoot as they enter the viewport, while a selection ring glides from row to row on a spring — mouse hover moves it instantly, arrow keys walk it and scroll it into view. Pure React + CSS, two files: AnimatedList.jsx (entry, reveal + indicator engine) and AnimatedList.css (all styles). React >= 18; runtime dependencies: @hugeicons/react and @hugeicons/core-free-icons (used only by the built-in default items' icons; custom items need nothing else). No iframe, no external assets.

## Structure & rendering

- Root is `<div class="animated-list">` (plus `animated-list--framed` when frame is on and `data-animated` when animation ≠ none), width min(100%, --al-width), radius = item radius + 12px. The framed variant wraps everything in a frosted panel (6px padding, theme frame colour, blur(20px) saturate(1.6), deep two-part shadow) with a 1px inset rim + top highlight (`.animated-list__frame-rim`); theme tokens (dark: frame rgba(38,35,46,0.66), tile gradient #3a3644→#27242f, ink #f4f4f5, muted 55%, well rgba(255,255,255,0.08), ring rgba(244,244,245,0.3); light: frame rgba(240,240,243,0.8), tile white→#f6f6f8, ink #27272a, etc.) are injected inline.
- The viewport (`.animated-list__viewport`, role="listbox", tabIndex 0, aria-activedescendant) is the scroller: max-height from maxHeight (px or CSS), overflow-y auto, overscroll contain, radius + 6px, thin themed scrollbar (hidden when displayScrollbar is false). It applies the edge-fade mask when showGradients: a linear-gradient mask built from smootherstep steps over --al-fade-top/--al-fade-bottom, whose pixel values the engine sets each scroll frame from the actual scroll position (clamped to fadeSize, default 56px).
- Rows (`.animated-list__item`, role="option", aria-selected, data-selected, data-index): flex row, gap 12px, padding 10px 14px 10px 10px, radius from the radius prop, tile background + inset rim + tile shadow, hover filter per theme (dark brightens 1.12, light dims 0.97), press 0.85–0.92, selected row brightens. Default content: a 36px lead well holding an icon (HugeiconsIcon 18px, strokeWidth 1.8) or image, a text column (14.5px/600 title, 13px muted description, both ellipsized) and a tabular-nums meta on the right. Non-object items render `{ title: item }`. A custom renderItem(item, index, isSelected) replaces all of it.
- The indicator is an absolutely positioned bar (`.animated-list__indicator`, left/right 0, height/transform engine-driven, opacity 0 until a row is selected) holding `.animated-list__ring` — an inset 1px ring + faint fill in the ring/accent colour. accentColor recolours the ring and the root's focus outline.

## Reveal animation

- Rows carry data-state: "in" (rest), "above"/"below" (hidden, off toward that edge). Transforms per mode: pop — translate3d(0, ∓12px, 0) scale(0.8); slide — ∓28px scale(0.98); fade — ∓4px, opacity 0; none — always in. Rows use one transition: transform 620ms with a springy `linear(...)` easing (29-keyframe overshoot to 1.08) when the browser supports it, else cubic-bezier(0.34, 1.4, 0.64, 1); opacity 300ms cubic-bezier(0.22,1,0.36,1); filter 200ms.
- Entrance: on first intersection (IntersectionObserver, rootMargin −10% bottom) every row whose visible overlap is at least half its height (or already seen, when animateOnce) reveals with a stagger of stagger (default 0.05s) × its visible order (transitionDelay applied to transform and opacity, not filter); rows further than half a viewport away stay hidden in the direction they sit relative to the viewport's centre. Scrolling (passive) and resizes re-evaluate: rows entering view pop in as you scroll, rows leaving can hide again (unless animateOnce marks them seen). mode() also collapses pop/slide to fade under prefers-reduced-motion.
- The ring mirrors its row's state (including the row's current transitionDelay), so the selection pops together with the selected row.

## Selection engine

- The indicator's y/height chase the selected row's offsetTop/offsetHeight with a spring (omega 30, zeta 0.78, 240Hz sub-steps, rAF loop that self-sleeps within 0.05px and 0.5 px/s); first placement snaps without animating.
- Selection: initialSelectedIndex (default −1 = none), hover sets it when selectOnHover (with a guard that ignores hover until the pointer moves after keyboard navigation), click always selects and calls onItemSelect(item, index).
- Keyboard (window-level, only while the viewport is focused or the pointer was recently engaged): ArrowDown/ArrowUp step ±1 (wrapping when loop, clamped otherwise, first press enters at the list edge), Home/End jump; Enter/Space (Space only when the viewport itself is focused) selects and fires onItemSelect. After keyboard navigation the selected row is smooth-scrolled into view with a margin of max(12, fadeSize) when gradients show (12 otherwise). preventDefault only for handled keys; modifier combos are ignored.
- Items changes re-sync (state machine resets transitions for new rows without motion), and unmount cancels the rAF, disconnects the observers and removes the scroll/key/pointer listeners. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { id?: string; icon?: ReactNode; image?: string; title?: string; description?: string; meta?: string }[] | DEFAULT_ITEMS | Row data; plain strings render as title-only rows. |
| onItemSelect | (item, index) => void | - | Called when a row is chosen by click or keyboard. |
| renderItem | (item, index, isSelected) => ReactNode | - | Fully custom row content; replaces the default layout. |
| initialSelectedIndex | number | -1 | Row selected on mount; −1 means none. |
| selectOnHover | boolean | true | Hovering a row moves the selection ring to it. |
| enableArrowNavigation | boolean | true | Arrow/Home/End/Enter keyboard support. |
| loop | boolean | false | Arrow navigation wraps around at the ends. |
| animation | "pop" \| "slide" \| "fade" \| "none" | "pop" | How rows enter the viewport. |
| animateOnce | boolean | false | Rows reveal the first time only and never hide again. |
| stagger | number | 0.05 | Seconds between rows during the entrance cascade. |
| showGradients | boolean | true | Top/bottom scroll fade masks. |
| fadeSize | number | 56 | Fade span in px. |
| displayScrollbar | boolean | true | Shows the themed thin scrollbar. |
| frame | boolean | true | Frosted outer panel with rim and shadow. |
| theme | "dark" \| "light" | "dark" | Palette of frame, tiles, ink and ring. |
| accentColor | string | - | Ring colour and focus outline colour; defaults to ink. |
| radius | number | 14 | Row corner radius. |
| gap | number | 8 | Row gap in px. |
| width | number \| string | 420 | List width in px or any CSS width. |
| maxHeight | number \| string | 440 | Viewport scroll height limit. |
| className | string | "" | Extra class on the root. |
| itemClassName | string | "" | Extra class on every row. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of AnimatedList.jsx and AnimatedList.css plus install steps (react, react-dom, @hugeicons/react, @hugeicons/core-free-icons) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: rows cascade in with the springy pop when scrolled into view and hide again when scrolled far away (unless animateOnce); pop/slide/fade/none all switch cleanly; the ring glides to hovered/clicked/keyboard-selected rows with correct height and pops with its row; arrow keys walk with loop and clamp, Home/End jump, Enter/Space fire onItemSelect and scroll the row into view; selectOnHover false freezes the ring on clicks only; controlled vs default selection; themes and accentColor re-skin everything; frame on/off; scrollbar toggle; fade masks track the scroll position and respect showGradients/fadeSize; custom renderItem replaces row content; reduced motion degrades to fade; unmount leaves no rAF, observers or listeners; 375 / 768 / 1440 wide without overflow.
