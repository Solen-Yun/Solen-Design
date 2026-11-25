Implement the "StaggeredMenu" component from zero: a full-height side menu where opening sends a stack of colored prelayer panels sliding in from the screen edge one after another, the white content panel chasing behind them, and the oversized menu items stagger up into view with a rotate-settle. The toggle button is a word-cycling "Menu / Close" slot machine plus a plus icon that spins into an X. Pure React + GSAP, two files: StaggeredMenu.jsx (entry, timelines) and StaggeredMenu.css (all styles). React >= 18; runtime dependency: gsap (timeline/easing/tweening only, no plugins). No iframe, no external assets.

## Structure & rendering

- Root is a `<div class="staggered-menu-wrapper">` with `data-position` (left | right) and `data-open` set while open; position relative, width/height 100%, z-index 40, pointer-events none. An optional `isFixed` adds the `fixed-wrapper` class: position fixed, top/left 0, 100vw × 100vh, overflow hidden — for mounting at the document level.
- Children in paint order: (1) `<div class="sm-prelayers" aria-hidden>` holding one `<div class="sm-prelayer">` per color — the colors prop is sliced to at most 4; if 3 or more colors are given the middle entry is removed so the count stays even and layered; when colors is empty, `['#1e1e22', '#35353c']` is used. Each prelayer is absolutely positioned to the panel column and painted with its color. (2) A `<header class="staggered-menu-header">` spanning the top with 2em padding, flex row, space-between, pointer-events none (its children re-enable pointer events): a logo slot on the left (renders `<img class="sm-logo-img" width=110 height=24>` when logoUrl is set) and the toggle button on the right. (3) The `<aside id="staggered-menu-panel" class="staggered-menu-panel">` — white, backdrop blur 12px, absolute top/right, width clamp(260px, 38vw, 420px), full height, column flex, padding 6em 2em 2em, overflow-y auto, z-index 10, opacity 0 until GSAP positions it. With `position="left"` both the panel and prelayers anchor to the left edge instead.
- Panel content (`<div class="sm-panel-inner">`): a `<ul class="sm-panel-list" role="list">` whose `<li class="sm-panel-itemWrap">` (overflow hidden, so items can rise from below the fold) wraps `<a class="sm-panel-item" href aria-label data-index>` with `<span class="sm-panel-itemLabel">` inside. Items are uppercase, 3.5rem, weight 600, letter-spacing -2px, black; hover recolors to the accent var `--sm-accent`. With numbering on, the list gets `data-numbering`, a CSS counter draws `01 / 02 / …` (decimal-leading-zero, 18px, accent color) after each item at `top: 0.1em; right: 2.8em`, revealed by animating the custom property `--sm-num-opacity` from 0 to 1. When the items array is empty a hidden placeholder row reads "No items". Below the list, when displaySocials and socialItems are non-empty, a `<div class="sm-socials">` pushed to the bottom (margin-top auto) shows a "Socials" heading in the accent color and a row of `<a class="sm-socials-link">` links (target _blank, rel noopener noreferrer, 1.2rem, dark ink); hovering the row dims the other links to 0.35 while the hovered/focused one stays full.
- The toggle button (`class="sm-toggle"`, transparent, currentColor ink): first a text viewport `<span class="sm-toggle-textWrap">` (height 1em, overflow hidden) containing `<span class="sm-toggle-textInner">` — a column of `<span class="sm-toggle-line">` lines rendered from state — then `<span class="sm-icon">` (14 × 14) holding two absolutely centered 2px lines of currentColor: `.sm-icon-line` horizontal (rotate 0) and `.sm-icon-line-v` vertical (rotate 90) — a plus that becomes an X by spinning the whole icon. Accent color is injected as `--sm-accent` inline on the root.
- The wrapper is pointer-events none; header children, the panel and the toggle re-enable pointer events, so the page beneath stays clickable everywhere else.

## Open / close choreography (GSAP)

- Initial layout effect (per position/menuButtonColor): `gsap.context` sets panel + prelayers to `xPercent: ±100` (−100 for left, 100 for right) with opacity 1, zeroes the prelayer container, sets plus-line transforms, icon rotate 0, text inner yPercent 0, and paints the toggle in menuButtonColor. Cleanup reverts the context.
- Open timeline (rebuilt each open; kills any running close/entrance tweens first): each prelayer slides `xPercent ±100 → 0` over 0.5s `power4.out`, staggered 0.07s apart; the panel then slides in with the same start over 0.65s `power4.out`, inserted 0.08s after the last prelayer. Item labels start `yPercent: 140, rotate: 10` (clipped by the row overflow) and tween to 0 over 1s `power4.out`, stagger 0.1 from start, beginning at 15% of the panel's duration; numbering opacities fade 0 → 1 (0.6s power2.out, stagger 0.08) 0.1s after the items begin; the socials title fades in (0.5s) and the social links rise from y 25 with opacity 0 to rest (0.55s power3.out, stagger 0.08, clearing props on completion), both starting at 40% of the panel's duration. A busy flag blocks re-entrant toggles until the timeline completes.
- Close: kill the open timeline and entrance tweens, then tween panel + prelayers back to `xPercent ±100` in one 0.32s `power3.in` tween; on completion the item labels, numbering, socials title and links are reset to their hidden poses and the busy flag clears.
- Toggle icon: opening spins the plus icon to rotate 225 (0.8s power4.out) — a plus turned into an X; closing spins back to 0 (0.35s power3.inOut).
- Button color: with changeMenuColorOnOpen on, the button's color tweens to openMenuButtonColor on open and back to menuButtonColor on close (0.3s power2.out, delay 0.18s); with it off the button always rests at menuButtonColor. A separate effect reapplies the resting color whenever the three color props change.
- Button text slot machine: on toggle the inner column is filled with a sequence — the current label, then 3 alternating flips of "Menu"/"Close", then the target label repeated — and the column tweens `yPercent` from 0 to `-(n−1)/n × 100` so the lines scroll upward through the 1em window (duration 0.5 + lineCount × 0.07, power4.out). The visible word ends on "Close" after opening and "Menu" after closing.

## Interaction & accessibility

- Clicking the toggle opens/closes; onMenuOpen / onMenuClose fire on each transition. With closeOnClickAway on and the menu open, a document-level mousedown outside both the panel and the toggle button closes the menu (listener added only while open, removed on close/unmount).
- The toggle carries `aria-label` "Close menu"/"Open menu", `aria-expanded`, `aria-controls="staggered-menu-panel"`, and a visible `:focus-visible` outline (2px white-ish, offset 4px, radius 4px). The panel carries `aria-hidden` while closed. Social links keep readable focus rings (accent outline) and the row-dim effect also keys off `:focus-within`. The logo image is non-draggable.
- Reduced motion is not specially branched; the choreography is transform/opacity only. At ≤1024px (and ≤640px) the panel and prelayers span the full viewport width and the open state inverts the logo image (`filter: invert(100%)`) so it stays legible on the white panel.

## Performance & cleanup

- All motion runs through GSAP timelines/tweens; refs hold every tween so re-toggling kills the previous one instead of stacking. Pre-existing tweens are killed before each rebuild; per-element `getAnimations`-style conflicts are avoided by overwrite-free dedicated tweens.
- Unmount: `gsap.context` revert removes inline styles and listeners; the document mousedown listener is removed; all tween refs are simply dropped with the instance. Multiple instances on one page are independent (own refs, own timelines).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | "left" \| "right" | "right" | Which screen edge the panel and prelayers slide in from. |
| colors | string[] | ['#B497CF', '#5227FF'] | Colors of the stacked prelayers behind the panel; max 4, middle one dropped when 3+. |
| items | { label: string; link?: string; ariaLabel?: string }[] | [] | The big menu entries; each renders an anchor with the given link. |
| socialItems | { label: string; link: string }[] | [] | Links shown under the "Socials" heading at the panel's bottom. |
| displaySocials | boolean | true | Whether the socials block renders at all. |
| displayItemNumbering | boolean | true | Whether items get the 01 / 02 / … counter numbers. |
| className | string | - | Extra class on the wrapper. |
| logoUrl | string | "" | Logo image URL shown top-left; empty renders no logo. |
| menuButtonColor | string | "#fff" | Toggle button ink while closed. |
| openMenuButtonColor | string | "#fff" | Toggle button ink while open (when changeMenuColorOnOpen is on). |
| accentColor | string | "#5227FF" | Accent for hover, numbers, socials title and focus rings; injected as --sm-accent. |
| changeMenuColorOnOpen | boolean | true | Whether the toggle ink crossfades to openMenuButtonColor when open. |
| isFixed | boolean | false | Makes the wrapper position: fixed covering the viewport (document-level mount). |
| closeOnClickAway | boolean | true | Closes the menu when a pointer goes down outside panel and toggle. |
| onMenuOpen | () => void | - | Called when the menu opens. |
| onMenuClose | () => void | - | Called when the menu closes. |

## Delivery & validation

- Deliver the complete content of StaggeredMenu.jsx and StaggeredMenu.css plus install steps (react, react-dom, gsap) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: opening staggers the prelayers then panel then items with the exact easings; rapid toggling never leaves the panel half-visible or the busy flag stuck; the plus icon spins into a clean X and back; the button text scrolls through Menu/Close cycles and lands on the right word; numbering fades in only when displayItemNumbering; socials fade in only when displaySocials and socialItems are non-empty; accent color drives hover, numbers and socials; position left mirrors the whole choreography; changeMenuColorOnOpen off keeps the button ink constant; close-on-click-away ignores clicks inside the panel and toggle; isFixed covers the viewport while non-fixed instances stay in flow; empty items shows the placeholder row; keyboard focus rings visible on toggle and links; ≤1024px goes full-width with the logo inverting; unmount leaves no GSAP context or document listeners; 375 / 768 / 1440 wide without horizontal overflow.
