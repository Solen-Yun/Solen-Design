Implement the "PillNav" component from zero: a pill navigation bar where hovering a link makes a colored fill rise up through it like liquid while the label rolls over into the pill's ink color, the active item keeps a floating dot that glides and stretches between items on springs, and on narrow parents the whole bar collapses into a single round burger that morphs open into a menu panel. Pure React + CSS, two files: PillNav.jsx (entry, spring engine, collapse logic) and PillNav.css (all styles). React >= 18; no runtime dependencies. No iframe, no external assets.

## Structure & rendering

- Root is a `<nav class="pill-nav">` with `data-layout` (split | joined), `data-items` (itemStyle), `data-collapsed` / `data-open` / `data-panel` markers, and every theme/size token injected as inline CSS variables; `aria-label` from the ariaLabel prop. display inline-flex, gap from tokens, max-width 100%; the joined layout wraps everything in one padded 999px capsule (gap 2px, padding --pn-pad), split keeps separate floating surfaces with a 1px inset rim (`.pill-nav__rim`: inset shadow edge + top highlight) on each.
- Size tokens (sm/md/lg): height --pn-h 36/44/52px, pad 3/4/5px, inner 30/36/42px, horizontal padding --pn-x 12/16/20px, font 13/14/15px, gap 6/8/10px, mark 18/22/26px; `--pn-roll = inner/2 + 0.7em` is the label roll distance.
- Theme tokens: dark surface rgba(38,35,46,0.66), solid #26232e, edge rgba(255,255,255,0.08), text rgba(244,244,245,0.64), strong #f4f4f5, active pill a white→#ebebf0 vertical gradient with ink #121016, dot #f4f4f5, tile gradient #3a3644→#27242f for itemStyle pill; light surface rgba(240,240,243,0.8), solid #f0f0f3, edge rgba(24,24,27,0.07), text 60% #18181b, strong #18181b, active pill #2c2c31→#18181b gradient with white ink, dot #18181b, tile white→#f6f6f8. The glass surface adds backdrop blur(20px) saturate(1.6) and a deep two-part shadow; solid swaps in the opaque color; none removes surface, shadow, edge and rim. barColor/textColor/highlightColor/highlightTextColor override surface, text, pill fill/dot and pill ink (ink auto-picked by WCAG-ish luma: #121016 above luma 0.36, else #ffffff).
- Split layout children: a round logo capsule (height --pn-h, or --pn-inner in joined) holding a link around the mark (logo string renders as an `<img>`, node as-is; the mark spins 360° once per pointer enter, 0.9s, skipped on touch and reduced motion) plus the bar capsule (height --pn-h, padding --pn-pad) whose track holds, in paint order: the `<ul>` of slots, the glide pill + ink overlay (glide modes only), and the dot. A hidden `.pill-nav__measure` list off-layout measures natural item widths.
- Each item is `<li class="pill-nav__slot">` wrapping either an `<a>` (or the injected linkComponent) when item.href exists, else a `<button>`; active gets aria-current="page". Inside, when the fill effect is on: `<span class="pill-nav__fill">` (the rising circle), the visible `.pill-nav__face` (icon + label), and an aria-hidden `.pill-nav__face-alt` duplicate colored with the pill ink, parked translateY(--pn-roll) below. Items are uppercase-friendly 500-weight links, padding 0 --pn-x, radius 999px; itemStyle "pill" additionally gives each item its own tile gradient + rim and tightens the list gap to 3px.
- The fill effect: `.pill-nav__fill` is a circle of size --pn-fill (set per slot by JS to 2·√((w/2)²+h²)+2 px) anchored at top:100% left:50%, scale 0 → 1 (0.55s cubic-bezier(0.22,1,0.36,1) in, 0.36s out), painting the --pn-pill gradient behind the text while the faces roll. Hover or the active slot lights it (`data-hover` / `data-on` on the li).
- The glide effect (hoverEffect="glide", or any non-fill hoverEffect combined with indicator="pill"): an absolutely positioned `.pill-nav__glide` pill painted with --pn-pill plus its shadow, moved/scaled by the engine, and a `.pill-nav__ink` overlay duplicating every label in pill-ink color, revealed exactly over the pill via a per-frame `clip-path: inset(top right bottom left round h/2)` — the crisp ink text appears only where the pill is.
- The dot indicator (indicator="dot"): a 4px dot under the track at `bottom: (inner − font)/4 − 2px`, background --pn-dot (turning pill-ink while the active item is hover-lit), transformed by the engine with a velocity-driven scaleX stretch.
- Collapsed state: the bar is replaced by a round burger button (height --pn-h or inner, currentColor 16×10px lines 1.5px) that rotates into an X when open (0.45s), and a `.pill-nav__panel` (radius 24px, same surface) with a vertical list of full-width rows (height h+2px, radius 18px, hover tint; active row gets the pill gradient + ink). The panel exists only while shown (data-panel), animating open/closed with clip-path morphs (below).

## Spring engine (rAF, self-sleeping)

- One effect per mount (re-created when collapsed state or item count changes) builds an engine with state: glide edges x0/x1 with velocities, alpha, pop (scale, dips to 0.9 on appear), press (spring to 0.95 while pressed), dot x/velocity/alpha, hover/focus indexes, and a waiting flag used by the intro. All integration runs at 240Hz sub-steps (`Math.ceil(dt·240)`).
- Glide target = hovered slot (glide mode) or the active slot (indicator="pill"); each edge chases its target with stiffness per side: lead = 520·(1+0.9·stretch) on the leading edge, trail = 520·(1−0.5·stretch) on the trailing edge (direction decides which is which) — so the pill stretches out then snaps back. Damping zeta = 1 − 0.55·bounce. The pill's scale is press × pop, with a squash factor up to 0.14 when the current width exceeds the target's. Alpha eases in at rate 1/0.06s. When nothing to glide, alpha decays out at 1/0.07s.
- The dot chases the active slot's center with stiffness 360, damping 1 − 0.5·bounce, and stretches scaleX(1 + min(2.2, |v|/700)) while moving fast.
- Press: pointerdown on a slot springs press to 0.95 (stiffness 700, damping 30); global pointerup/pointercancel release it. Hover ignores touch pointers; keyboard focus (only via :focus-visible) lights the focused item and adds a focus ring to the glide pill.
- Frame loop self-sleeps when every spring is within epsilon and alpha settled; the last frame snaps values. ResizeObserver on the track re-measures slot offsets/widths and re-renders; document.fonts.ready refreshes once. Reduced motion snaps all springs instantly (no glide travel, no press scale).
- Slot rects are measured from offsetLeft/offsetWidth; --pn-fill is recomputed per slot on measure.

## Collapse, intro and panel

- Collapse (layout effect): a hidden measure list gives the natural width; the parent's content width is compared against the required width (logo + list + pads, per layout). `collapse="auto"` (default) sets data-collapsed when needed; "always"/"never" force it. Re-evaluated by ResizeObserver on the parent and measure node. While intro is pending the first flip is deferred (see below).
- Intro (first paint, skipped under reduced motion): the logo pops scale 0.6→1 (700ms, delay 0, back-out easing); if expanded, the bar reveals via a clip-path wipe from round-cap narrow to full width (760ms, delay 90ms) and each slot slides in from x −10 with 50ms stagger from 200ms; if collapsed, the burger pops at 120ms. The glide engine waits 420ms (its "waiting" flag) so the pill doesn't fire during the intro. The Web Animations API drives all of these; reduced motion skips them entirely.
- Open panel (collapsed + burger click): setPanelShown mounts the panel, then it animates clip-path from a rounded sliver beside the burger (top-anchored in joined layout, corner-anchored in split) to `inset(0 round 24px)` over 560ms, while rows fade in from y −8 with 40ms stagger (420ms each). Closing morphs back over 380ms (rows fading in 160ms) and unmounts on finish. Outside pointerdown closes; Escape closes and refocuses the burger. Expanding out of collapse closes any open panel. onMenuToggle fires with the next state; picking a row selects it, closes the panel and reports the toggle.

## Interaction & accessibility

- Selection: controlled via activeHref (component renders items.findIndex(href) and never self-selects) or uncontrolled via defaultActiveIndex; onItemClick(item, index, event) always fires; "#" hrefs navigate normally (no default blocking here); items without href render buttons. linkComponent injects a custom anchor/router link receiving href.
- The burger has aria-expanded, aria-controls (React useId), and an open/close label; the viewport of the track is one tabbable region per link with :focus-visible outlines (2px ring, inside for items, outside for burger/logo); rows are real links/buttons with aria-current; the panel keeps rows untabbable (tabIndex −1) while closed. The root carries aria-label.
- Hover/fill visuals are pointer-events-none spans; keyboard focus produces the same lit state through the engine's focus path.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logo | string \| ReactNode | - | Logo mark; a string renders as an image, a node renders as-is. |
| logoAlt | string | "Logo" | Accessible label of the logo link. |
| logoHref | string | "#" | Where the logo links to. |
| items | { label: string; href?: string; icon?: ReactNode; ariaLabel?: string }[] | DEFAULT_ITEMS | Navigation items; no-href items render buttons. |
| activeHref | string | - | Controlled selection by href; pass it to stop the component self-selecting. |
| defaultActiveIndex | number | 0 | Initial selection (uncontrolled mode). |
| onItemClick | (item, index, event) => void | - | Called on every item click. |
| linkComponent | component | "a" | Custom anchor component (router link); receives href. |
| theme | "dark" \| "light" | "dark" | Colour theme of surfaces, text and pill. |
| layout | "split" \| "joined" | "split" | Separate logo + bar capsules, or everything inside one capsule. |
| size | "sm" \| "md" \| "lg" | "md" | Height, padding and font size presets. |
| surface | "glass" \| "solid" \| "none" | "glass" | Frosted bar, opaque bar, or bare bar with no surface. |
| itemStyle | "plain" \| "pill" | "plain" | Bare links, or each item as its own gradient tile. |
| hoverEffect | "fill" \| "glide" \| "none" | "fill" | Rising fill per item, a gliding pill behind labels, or nothing. |
| indicator | "dot" \| "pill" \| "none" | "dot" | Gliding active dot, a glide pill that rests on the active item, or nothing. |
| highlightColor | string | - | Colour of the active fill/pill/dot. |
| highlightTextColor | string | - | Ink on top of the highlight; auto-picked from the colour when unset. |
| barColor | string | - | Overrides the bar surface colour. |
| textColor | string | - | Overrides strong and muted text colours. |
| bounce | number | 0.3 | Spring overshoot of the gliding parts, 0–1. |
| stretch | number | 0.5 | How far the glide pill stretches while travelling, 0–1. |
| intro | boolean | true | Plays the entrance pop/wipe on first paint. |
| collapse | "auto" \| "always" \| "never" | "auto" | When to collapse into the burger + panel. |
| onMenuToggle | (open: boolean) => void | - | Called when the collapsed panel opens or closes. |
| ariaLabel | string | "Main" | Accessible label of the nav. |
| className | string | "" | Extra class on the nav. |
| style | CSSProperties | - | Inline styles for the nav. |

## Delivery & validation

- Deliver the complete content of PillNav.jsx and PillNav.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: hover fill rises through an item and the label rolls into pill ink, then recedes; the active dot glides with a stretch and overshoots per bounce; glide mode stretches the pill toward its target and squashes on landing; controlled (activeHref) and uncontrolled (defaultActiveIndex + onItemClick) both work; themes light/dark, surfaces glass/solid/none, itemStyle pill tiles, sizes sm/md/lg, layout joined wraps one capsule; highlight colour with automatic contrast ink; collapse triggers when the parent is narrower than the natural width and "always"/"never" force it; the burger morphs into a panel with staggered rows, closes on outside click and Escape; intro plays once and the glide waits for it; reduced motion snaps everything; resize + font load keep rects aligned; unmount leaves no frame loop, observers or window listeners; 375 / 768 / 1440 wide without overflow.
