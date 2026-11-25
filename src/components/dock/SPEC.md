Implement the "Dock" component from zero: a macOS-style launcher bar that magnifies tiles under the cursor with a smooth falloff, bounces a tile on launch, shows badges and running indicators, and opens real context menus — with a tail pointing at the tile, checkmarks, shortcuts, submenus and keyboard support — docked to any screen edge. Pure React + CSS, two files: Dock.jsx (entry, per-tile spring engine, menu system) and Dock.css (all styles). React and react-dom only (the menu is a portal); icons are whatever nodes the consumer passes.

## Structure & rendering

- Root is a `<div>` (role toolbar, aria-label "Dock", aria-orientation matching the side) with class dock plus a side modifier dock--bottom/top/left/right and dock--bare when tiles are off. It is absolutely positioned 12px from its edge, centred on that edge, and its padding/thickness/gap come from CSS variables; a ::before pseudo-element extends the hover zone into the magnification area so tiles aren't cut off. Theme tokens (~20 variables) are injected: dark uses a translucent charcoal panel with frosted blur, gradient tiles, white ink; light uses a near-white panel. accentColor tints the menu highlight and focus rings; badgeColor tints badges.
- Items render as buttons (aria-label from item.label). Each item holds a tile span (base-sized, radius mixing roundness 0–1, gradient background, inset rim + shadow) wrapping the icon face and an optional badge (red pill with a number, or a dot when badge is true); an optional 4px running indicator dot sits outside the panel on the dock's outer side; and a tooltip label (12px pill) that fades in on hover (pointer-capable devices only) and on keyboard focus, suppressed while a menu is open or the tile is hopping. A separator item renders a 1px line. tiles=false strips tile backgrounds so raw icons sit on the panel.
- Menus render through a portal to document.body: a fixed container with a shadow layer, a glass layer clipped to the menu outline (clip-path: path(...)), an SVG stroke layer drawing the same path (rounded rect + a teardrop tail on the dock-facing side pointing at the item), and the row list. Rows are 24px buttons (role menuitem, or menuitemcheckbox with aria-checked when any row has a checked field) with an optional 14px check column, icon, ellipsised text, muted shortcut text, and a chevron for rows with submenu items; separators between rows. The active row gets an accent highlight bar that eases between rows (16ms-scale transition, jumping instantly when re-entering from outside). Min width 172px, max 280px.

## Magnification engine

- Each non-separator item runs its own spring over `size`: rest spacing lays items out from the panel centre; the focus point is the pointer's coordinate along the dock axis (or the focused item's rest position during keyboard focus, or the held position while a menu is open). reach = |focus − rest| / distance (distance clamped ≥ 1, all lengths scaled by the auto-fit factor); the target size = base + (peak − base) × cos²(reach·π/2) for reach < 1, else base — a smooth cosine falloff that keeps the pointer's tile at peak and neighbours in between. The spring integrates at 240Hz sub-steps with stiffness/mass and damping/mass from the spring prop (defaults mass 0.1, stiffness 150, damping 12); semi-implicit with an implicit damping term, so it is unconditionally stable. Sizes below 0.01px of target snap and the loop self-sleeps until the next pointer move or wake.
- The tile box (button width/height) takes the animated size so neighbours slide apart; the visual tile scales by size/base from transform-origin 0 0 (counter-scaled so icons stay crisp) and, during a hop, translates away from the dock edge.
- Launch bounce: clicking a tile starts a parabolic hop — height = size × 0.4 over 0.38s, gravity derived to reach that apex, landing bounces back with restitution 0.36 until the residual velocity is under 20% of launch; the label hides while hopping. bounce=false or reduced motion skips hops entirely. Resize-driven base changes rescale every live spring's size and velocity so nothing jumps.
- Auto-fit: a ResizeObserver on the offsetParent measures available room minus 2×12px edges and computes fit = clamp(room / total length, 0.4, 1); base, peak, thickness and gap all multiply by fit, so a long dock shrinks instead of overflowing.
- Auto-hide: with autoHide on, the dock starts hidden (translated off-screen with an ease-in curve). It reappears when the pointer enters it, when focus enters it, or when the window pointer comes within a zone of 12px + 0.6×thickness of its edge inside the host bounds; it hides again 600ms after the pointer/focus leaves. Hiding is blocked while the pointer is inside, a menu holds it, or focus is inside.
- Reduced motion: sizes snap to targets without springs; CSS transitions (translate, highlight) are disabled by a media query.

## Context menus

- Opening: right-click / ctrl-click on a tile with a menu, a 450ms long-press on touch (cancelled by 8px movement), or keyboard (ContextMenu key, shift+F10, or the arrow key pointing into the dock). The menu anchors 8px off the tile on the dock-facing side, tail aimed at the tile centre, clamped to the viewport with an 8px margin; opening pops it from scale 0.82 (nested 0.94) with a springy cubic-bezier and fades its layers in 160ms. The tile stays held at magnified focus while open. aria-haspopup/aria-expanded and data-open press styling are wired.
- Rows: hover activates and eases the highlight; a row with submenu items opens a nested menu after 120ms hover (instant on click or ArrowRight), placed to the side of the parent (auto-flipping when it would leave the viewport) with its own tail; leaving the row closes the submenu after a 220ms grace, and re-entering the parent row (or the submenu) cancels it. Choosing a row blinks the highlight (70ms) then fires onClick and closes at 150ms (instant under reduced motion).
- Keyboard in menus: list takes focus (first row when opened by keyboard); ArrowUp/Down wrap through usable rows, Home/End jump, ArrowRight opens a submenu, ArrowLeft/Escape go back (restoring the parent row's highlight), Escape/Tab dismiss the whole menu; disabled rows and separators are skipped. Checkbox rows toggle their checked value through the consumer's onClick.
- Dismissal: pointerdown outside the menu and the owner tile, scroll outside it, window resize, and window blur all close it with a 150ms scale/fade-out before unmounting; focus returns to the tile if the menu was opened by keyboard.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | ({ icon: ReactNode; label: string; badge?: number \| string \| true; active?: boolean; menu?: MenuRow[]; onClick?: () => void; className?: string; disabled?: boolean } \| { separator: true })[] | [] | Dock entries; the separator variant draws a divider. |
| position | "bottom" \| "top" \| "left" \| "right" | "bottom" | Screen edge the dock is pinned to. |
| theme | "dark" \| "light" | "dark" | Panel, tile and menu palette. |
| baseItemSize | number | 50 | Rest tile size in px; floored at 16. |
| magnification | number | 70 | Peak tile size under the pointer. |
| distance | number | 200 | Falloff radius of the magnification, px. |
| panelHeight | number | 68 | Panel thickness in px. |
| gap | number | 10 | Space between items, px. |
| roundness | number | 0.5 | Tile corner rounding, 0–1. |
| spring | { mass: number; stiffness: number; damping: number } | { mass: 0.1, stiffness: 150, damping: 12 } | Magnification spring tuning. |
| bounce | boolean | true | Launch hop on click. |
| autoHide | boolean | false | Slides the dock off-screen until approached. |
| tiles | boolean | true | Gradient tile backgrounds behind icons. |
| showLabels | boolean | true | Tooltip labels on hover and focus. |
| showIndicators | boolean | true | Running dots for active items. |
| showBadges | boolean | true | Notification badges. |
| badgeColor | string | "#ff453a" | Badge background colour. |
| accentColor | string | "#0a84ff" | Menu highlight and focus ring colour. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

MenuRow: { label: string; icon?: ReactNode; shortcut?: string; checked?: boolean; disabled?: boolean; separator?: true; items?: MenuRow[]; onClick?: () => void }.

## Delivery & validation

- Deliver the complete content of Dock.jsx and Dock.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: magnification follows the cursor with the cosine falloff and neighbours shift smoothly; leaving the dock settles tiles back; keyboard focus magnifies the focused tile; clicking bounces the tile (and not with bounce=false); separators and disabled rows behave; badges (number, dot) and indicator dots render per flags; tooltips appear on hover and focus and hide during hops; a long dock auto-fits inside a narrow host without overflow; autoHide slides out and returns near the edge (and stays while a menu is open); right-click, ctrl-click, long-press and keyboard all open the menu with the tail aimed correctly in all four dock positions; submenus open/close with the hover grace, ArrowRight/ArrowLeft, and escape restores focus to the tile; checkbox rows toggle; menu dismissal on outside click, scroll, resize and blur animates out; menu clamps to the viewport at every corner; reduced motion removes springs and transitions; unmount leaves no frame loop, listeners, timers or portal; 375 / 768 / 1440 wide without overflow.
