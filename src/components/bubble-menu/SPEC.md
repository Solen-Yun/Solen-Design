Implement the "BubbleMenu" component from zero: a floating top bar with a logo bubble and a round two-line toggle; pressing it bursts a full-screen field of oversized rounded pill links that pop in one by one with a springy overshoot, each sitting slightly rotated with its own hover color. Pure React + GSAP + CSS, two files: BubbleMenu.jsx (entry, timelines) and BubbleMenu.css (all styles). React >= 18; runtime dependency: gsap (tweening/easing only, no plugins). No iframe, no external assets.

## Structure & rendering

- Two siblings: a `<nav class="bubble-menu">` bar and, only while visible, a `<div class="bubble-menu-items">` overlay. Both take `fixed` or `absolute` from the useFixedPosition prop (default absolute). The bar stretches left/right at top 2em, flex row, space-between, gap 16px, padding 0 2em, pointer-events none with each bubble re-enabling them, z-index 99.
- The logo bubble (`class="bubble logo-bubble"`, background menuBg): pill of height --bubble-size (48px, 56px from 768px up), auto width with 0 16px padding, radius half its height, soft shadow `0 4px 16px rgba(0,0,0,0.12)`. Inside, `logo-content` centers the logo: a string logo renders as `<img class="bubble-logo">` (max-height 60%), any node renders as-is.
- The toggle bubble (`class="bubble toggle-bubble menu-btn"`): a square 48/56px circle button, background menuBg, containing two 26 × 2px currentColor-ish lines (menuContentColor) stacked 6px apart. When open, CSS turns the pair into an X: first line translateY(4px) rotate(45deg), second translateY(-4px) rotate(-45deg), each 0.3s ease. The button carries `aria-label` (menuAriaLabel) and `aria-pressed`.
- The overlay centers a `<ul class="pill-list" role="menu">`: flex wrap, full width up to 1600px, three equal columns (each `pill-col` is flex 0 0 100%/3, centering its pill); with exactly 4 items the grid recenters them via margin-left tricks (one-quarter and one-third indents on the fourth column). When open at <900px the columns go full width, row-gap 16px, and the list starts 120px from the top.
- Each item renders `<a role="menuitem" class="pill-link">` with a `pill-label` span inside. Per-item CSS custom properties are set inline: `--item-rot` (rotation deg), `--pill-bg` (menuBg), `--pill-color` (menuContentColor), `--hover-bg` (hoverStyles.bgColor, fallback #f3f4f6), `--hover-color` (hoverStyles.textColor, fallback menuContentColor). Pill look: full width of its column, min-height 160px (80px on mobile), vertical padding clamp(1.5rem, 3vw, 8rem), font-size clamp(1.5rem, 4vw, 4rem) weight 400, radius 999px, shadow `0 4px 14px rgba(0,0,0,0.1)`, white-space nowrap, overflow hidden. From 900px up the pill rests rotated by `--item-rot`; hover scales to 1.06 and swaps to the hover background/color (0.3s ease); active scales to 0.94. On touch widths the same hover/active scale applies without rotation. When items is empty or omitted, five default entries (home / about / projects / blog / contact) are used, each with its own rotation (−8° or 8°) and hover palette (blue / green / amber / red / violet on white text).

## Open / close animation (GSAP)

- Toggle flips an open state and calls onMenuClick(nextState). Opening first mounts the overlay (display none until then), then a layout effect: overlay display flex; kill running tweens; set every pill scale 0 (transform-origin 50% 50%) and every label y 24 with autoAlpha 0; for each pill a timeline delayed by `index × staggerDelay + random(−0.05, 0.05)` scales it to 1 over animationDuration with animationEase (default back.out(1.5) — the pop), and 90% into that tween brings its label to y 0 / autoAlpha 1 (0.9 × duration, power3.out).
- Closing (only when the overlay was shown): kill tweens, labels fall back to y 24 / autoAlpha 0 and pills scale to 0 over 0.2s power3.in; on completion the overlay is display none again and the shown flag clears, unmounting it on the next render.
- A window resize listener reapplies desktop rotations live while open: at ≥900px each pill takes its item rotation, below that rotations reset to 0. Listener is added/removed with the open state.

## Interaction & accessibility

- Only the toggle and the open pill links are clickable; bar and overlay containers are pointer-events none with the interactive children re-enabling events, so the page under the closed overlay stays usable.
- The overlay carries `aria-hidden` while closed; the list is role="menu", each link role="menuitem" with aria-label from item.ariaLabel or item.label. The toggle announces state through aria-pressed and the configurable aria-label.
- Reduced motion is not specially branched; the animation is transform/opacity only and the overlay closes quickly.

## Performance & cleanup

- All motion lives in refs (`bubbleRefs`, `labelRefs` arrays); tweens are killed with gsap.killTweensOf before each run so rapid toggling never stacks. The overlay stays unmounted while fully hidden.
- Unmount: the resize listener is removed; GSAP tweens die with their targets. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logo | string \| ReactNode | - | Logo content; a string renders as an image, a node renders as-is. |
| onMenuClick | (open: boolean) => void | - | Called on every toggle with the next open state. |
| className | string | - | Extra class on the nav bar. |
| style | CSSProperties | - | Inline styles for the nav bar. |
| menuAriaLabel | string | "Toggle menu" | Accessible label of the round toggle button. |
| menuBg | string | "#fff" | Background of the logo bubble, toggle bubble and pills. |
| menuContentColor | string | "#111" | Ink of the hamburger lines and resting pill labels. |
| useFixedPosition | boolean | false | Positions the bar and overlay fixed to the viewport instead of absolute. |
| items | { label: string; href: string; ariaLabel?: string; rotation?: number; hoverStyles?: { bgColor: string; textColor: string } }[] | DEFAULT_ITEMS | Menu entries; each pill gets its own rotation and hover palette. |
| animationEase | string | "back.out(1.5)" | GSAP ease of the pill pop-in. |
| animationDuration | number | 0.5 | Seconds each pill takes to pop in. |
| staggerDelay | number | 0.12 | Seconds between neighbouring pills starting, plus ±0.05s jitter. |

## Delivery & validation

- Deliver the complete content of BubbleMenu.jsx and BubbleMenu.css plus install steps (react, react-dom, gsap) and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: opening pops each pill with the springy overshoot and staggered timing, labels rising as each pill lands; closing collapses in 0.2s and unmounts the overlay; the hamburger crossfades into an X and back; every pill rotates by its own amount at ≥900px and loses rotation below; hover swaps each pill to its own bgColor/textColor and scales 1.06, press scales 0.94; 4 items recenter into a balanced row; menuBg/menuContentColor flow into bubbles and pills; useFixedPosition pins bar and overlay to the viewport, absolute mode keeps them inside a positioned parent; aria-pressed/aria-hidden/menu roles are correct; rapid toggling does not stack tweens or leave the overlay visible; 375 / 768 / 1440 wide without horizontal overflow.
