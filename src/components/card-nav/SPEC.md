Implement the "CardNav" component from zero: a rounded navigation bar whose menu button springs the bar open into a row of link cards, each with its own title, description and link list. The panel height, burger-to-X morph, Menu/Close word roll and per-card entrance are all driven by one damped spring so everything glides together. Pure React + CSS, two files: CardNav.jsx (entry, spring engine, state) and CardNav.css (all styles). No dependency beyond React and one small icon package for the link arrows.

## Structure & rendering

- Root is a `<div>` (class card-nav plus className) with width 100%, max-width var --cn-max (default 800px), margin auto, height 60px. It carries data attributes: data-open while open, data-shown while the content must stay mounted (open or closing animation running), data-narrow below a 560px root width. A palette of ~14 CSS variables is injected per theme; dark uses a translucent charcoal panel with white edge/highlight, light uses a near-white panel with dark edges. surface "glass" adds backdrop blur(20px) saturate(1.6); surface "solid" swaps the panel to an opaque colour and disables blur.
- Inside is a `<nav>` panel (absolute, full width, height 60px, radius 18px, overflow hidden, theme shadow) containing: the bar row (grid 1fr auto 1fr: menu button left, logo centre, CTA right), the expandable content, and an aria-hidden rim span drawing a 1px inset edge plus a 1px top highlight.
- The menu button holds an 18×12px burger (two 1.5px lines that rotate to an X when open, 0.5s ease-out) and, when menuLabel is on, a stacked Menu/Close word pair that rolls vertically like a slot window. aria-expanded, aria-controls and a visible-focus outline are wired; with menuLabel off the button is icon-only with aria-label Open menu / Close menu.
- The logo prop renders a link (logoHref, aria-label logoAlt): a string becomes an `<img>` (24px tall, draggable false), otherwise a ReactNode. The CTA prop renders a pill button on the bar's right (height 52px, radius 10px); accentColor overrides its background and picks dark (#121016) or white ink via sRGB luminance (> 0.36 → dark ink). Links render through linkComponent (default "a"); entries without href render buttons.
- Content: absolutely positioned under the bar, perspective 900px, containing a flex row of cards (gap 8px) and, when narrow, a full-width CTA (44px tall, hidden from the bar). Each card is a tile (radius 10px, gradient background, inset rim + drop shadow, min-height cardHeight default 176px) with a 17px/600 label, an optional 13px muted description, and a link list pushed to the bottom. Items may set bgColor/textColor for tinted cards. Every link has a 14px arrow icon pair: the static arrow slides out diagonally while a second arrow slides in on hover/focus (0.45s ease-out).
- Narrow mode: cards stack vertically with wrapped link rows; the bar grid rearranges (logo left, menu right) and the bar CTA is replaced by the wide CTA inside the content.

## Motion engine

- One spring drives everything: state p (0..1) with velocity v, integrated at 240Hz sub-steps. Stiffness k = 160·speed² (speed clamped 0.2–3); damping ratio is 1 − 0.68·bounce while opening (bounce clamped 0–1 controls overshoot) and critically damped while closing. The panel height is bar + p·contentHeight each frame; contentHeight is re-measured by a ResizeObserver on the content (and after items/CTA/narrow changes).
- Card entrance: each card's local progress is (p − index·lag) / span, where lag = min(stagger, 0.7/(count−1)) per card (stagger clamped 0–0.3) and span = 1 − lag·(count−1), eased with cubic ease-out. Three effects: "rise" translates up 26px with scale 0.97→1; "unfold" rotates from −72° around the top edge (transform-origin 50% 0, perspective from the content) with a −10px drift; "fade" blurs from 6px with a 6px lift. Closing runs the same curves backwards with no bounce.
- Mount gating: a `shown` flag makes the content visible (visibility) from the first open until the closing spring fully settles (p → 0, |v| < 0.002), so the collapse animation is never cut off. The loop self-sleeps when settled.
- Opening controls: click mode toggles on the menu button; hover mode opens on pointerenter (pointer ignored for touch) and closes 160ms after pointerleave (timer cleared on re-enter). While open, pointerdown outside the root closes it and Escape closes it and refocuses the menu button. Clicking any link (or the wide CTA) closes the menu; onOpenChange reports every change; controlled usage passes `open` and the component stops holding internal state.
- Intro (once, skipped under reduced motion): the panel animates its clip-path from a pill-shaped inset (inset 0 max(0,(width−height)/2) round height/2) to the full rounded rect over 820ms with opacity fade, while bar children rise 8px and fade in staggered 70ms apart from 220ms.
- Reduced motion: the spring snaps p to the target with no velocity, and CSS transitions on the burger/words/arrows are disabled.
- Unmount: cancels the frame, disconnects both ResizeObservers, clears the hover-close timer, and removes document pointer/key listeners.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { label: string; description?: string; links?: { label: string; href?: string; ariaLabel?: string; onClick?: (event) => void }[]; bgColor?: string; textColor?: string }[] | built-in three-card set | The cards. Links without href render as buttons. |
| logo | string \| ReactNode | - | Logo image URL or custom node in the bar centre. |
| logoAlt | string | "Logo" | Accessible name of the logo link. |
| logoHref | string | "#" | Where the logo links to. |
| cta | { label: string; href?: string; onClick?: (event) => void } | - | Pill button on the bar (full-width inside the menu when narrow). |
| theme | "dark" \| "light" | "dark" | Panel, tile and ink palette. |
| surface | "glass" \| "solid" | "glass" | Frosted translucent panel or opaque. |
| openOn | "click" \| "hover" | "click" | How the menu opens (hover ignores touch). |
| cardEffect | "rise" \| "unfold" \| "fade" | "rise" | Card entrance style. |
| stagger | number | 0.12 | Delay between cards, seconds; clamped 0–0.3. |
| bounce | number | 0.2 | Spring overshoot while opening, 0–1. |
| speed | number | 1 | Spring speed multiplier, 0.2–3. |
| cardHeight | number | 176 | Card min-height in px. |
| maxWidth | number | 800 | Bar max-width in px. |
| accentColor | string | - | CTA background colour; ink is picked by contrast. |
| menuLabel | boolean | true | Shows the rolling Menu/Close words next to the burger. |
| intro | boolean | true | One-time clip-path bloom on mount. |
| defaultOpen | boolean | false | Starts open (uncontrolled mode). |
| open | boolean | - | Controlled open state; pair with onOpenChange. |
| onOpenChange | (open: boolean) => void | - | Called whenever the menu wants to open or close. |
| linkComponent | ElementType | "a" | Component used for every link (e.g. a router Link). |
| onLinkClick | (link, item, event) => void | - | Called when any card link is clicked, before closing. |
| ariaLabel | string | "Main" | aria-label of the nav panel. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of CardNav.jsx and CardNav.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the bar springs open with staggered cards and closes critically damped without a visual cut; burger morphs to an X and Menu/Close words roll; rise/unfold/fade effects all animate correctly; bounce 0 vs 1 changes overshoot, speed scales the timing; outside click and Escape close (Escape refocuses the menu button); hover mode opens/closes with the 160ms grace and stays open over the panel; controlled open + onOpenChange works; link click closes and fires onLinkClick; tinted items, accentColor contrast ink, glass vs solid, light vs dark, logo string/node, custom linkComponent; narrow layout (<560px) stacks cards and moves the CTA into the menu; closed links are unreachable by Tab; reduced motion snaps without animation; intro plays once; unmount leaves no timers, observers or listeners; 375 / 768 / 1440 wide without overflow.
