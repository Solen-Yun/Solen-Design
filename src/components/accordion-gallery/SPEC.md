Implement the "AccordionGallery" component from zero: a row of photo panels where the active panel grows to take most of the width while the others shrink to slivers that tilt away in 3D; inactive photos rest in grayscale and dim, and the active one slides in a glowing accent bar with its label, its image drifting with parallax as the active index moves. Hover, click or arrow keys move the active panel, and everything tweens through a GSAP timeline. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components beyond the GSAP animation library.

## Structure & rendering

- Two files only: AccordionGallery.jsx (entry, layout math, GSAP timelines) and AccordionGallery.css (all styles). React >= 18. Depends on the gsap library. Images come from the items prop; five placeholder landscape photos ship as the default items.
- Root is a `<div>` with class accordion-gallery (plus accordion-gallery--vertical and extra className): display flex, row (column when vertical), gap var(--ag-gap), width 100%, max-width 100%, perspective 1400px. Inline variables: --ag-accent (accentColor), --ag-overlay (overlayColor), --ag-text (textColor), --ag-gap (gap px), --ag-radius (radius px), --ag-media-size (measured, see layout). Height is height px horizontally and round(height × 1.6) px vertically. The root carries role="list" and aria-label "Image accordion gallery".
- Each item renders a panel: an `<a>` when the item has a link (href applied), otherwise a `<div>`; role="listitem", tabIndex 0, aria-label from item.label, aria-current="true" on the active one, class ag-panel plus ag-panel--active. Panel: position relative, flex 1 1 0, overflow hidden, border-radius var(--ag-radius), cursor pointer, transform-style preserve-3d, background #0a0713, a soft drop shadow, will-change flex-grow/transform; :focus-visible draws a 2px ring in the accent colour. Inner structure: a frame span (absolute inset 0, inherit radius, overflow hidden) holding a media span and an overlay span, then the optional label span.
- Media span: absolutely positioned at 50%/50% with xPercent/yPercent −50, width var(--ag-media-size) and height 100% (swapped in vertical mode); filter grayscale(var(--ag-gray)); the img inside is object-fit cover, draggable false, alt = item.alt || item.label. Overlay span: a bottom gradient of the overlay colour at 78% from 45% down plus a full wash of the overlay colour at var(--ag-dim) × 100%; both driven by CSS vars set from JS.
- Label span (when showLabels): absolute left/bottom/right 20px, a 3px × 26px accent bar with a 60% accent glow shadow, and the label text in the text colour (weight 600, clamp(1rem, 1.4vw, 1.4rem), single line with ellipsis, dark text shadow). Both start at opacity 0 and are revealed by the timeline; the label span is aria-hidden (the panel's aria-label carries the text to assistive tech).

## Layout & animation

- Active state: internal state seeded by defaultIndex clamped into the items range. expandRatio is clamped to 0.2–0.9; the active panel's flex-grow is grow = expandRatio × (count − 1) / (1 − expandRatio) (1 when there is a single item), inactive panels grow 1. So expandRatio expresses the share of the row the open panel takes.
- Panel tilt: the active panel is flat; panels before it rotate by +tilt degrees and panels after by −tilt, around Y in horizontal mode and around X (negated) in vertical mode, giving a fan that opens toward the active panel.
- Media size: a ResizeObserver on the root measures the usable track length (container size minus gaps), and sets --ag-media-size to usable × expandRatio × 1.22 (floored at 140px), re-applying the layout after measuring. Media size also feeds the parallax distance.
- Parallax: the media of each inactive panel shifts along the strip axis by clamp(active − i, −1.5, 1.5) × parallax × mediaSize × 0.06 px (x horizontally, y vertically), so imagery drifts opposite to the expansion direction; the active media returns to 0.
- Grayscale & dim: when grayscale is on the active media animates --ag-gray to 0 and inactive to 1; off means 0 everywhere. --ag-dim is 0.35 on inactive panels, 0 on the active one.
- Labels: the active panel's bar and text fade/slide in from x −14 with the timeline's stagger between them (0 under reduced motion); inactive ones fade out over duration × 0.6.
- All of the above tweens are laid out on one GSAP timeline at position 0 with the duration and ease props (power3.out default); switching active kills the previous timeline and builds a new one. The first application after mount runs with duration 0 (no entrance animation).
- Interaction: mouseenter sets the active index when trigger is "hover"; clicking a non-active panel always activates it and prevents default (so links only navigate on the already-active panel); focusing a panel activates it. Keyboard on a panel: ArrowRight/ArrowDown step +1 and ArrowLeft/ArrowUp step −1, both wrapping modulo the item count, with preventDefault.
- Reduced motion: durations forced to 0 and label stagger to 0 (matches the matchMedia query, read at render time).
- Responsive: under 520px viewport width the gallery stacks into a column, perspective none, height auto, panels get min-height 84px and transforms disabled, media fills panel width. Unmount kills the timeline and disconnects the ResizeObserver.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { image: string; label?: string; link?: string; alt?: string }[] | DEFAULT_ITEMS | The gallery photos with a label, an optional link (the active panel's anchor target) and an optional alt; five placeholder photos ship as the default. |
| defaultIndex | number | 2 | Which panel starts open, clamped into range. |
| accentColor | string | "#ffffff" | Colour of the label bar and the focus ring. |
| overlayColor | string | "#060010" | Colour of the dim wash and the bottom gradient over inactive photos. |
| textColor | string | "#ffffff" | Colour of the label text. |
| height | number | 460 | Track height in px (× 1.6 in vertical mode). |
| gap | number | 10 | Space between panels in px. |
| radius | number | 16 | Panel corner radius in px. |
| expandRatio | number | 0.52 | Share of the track the open panel takes, 0.2–0.9. |
| orientation | "horizontal" \| "vertical" | "horizontal" | Direction the accordion runs along. |
| duration | number | 0.6 | Tween duration in seconds. |
| ease | string | "power3.out" | GSAP ease name for all tweens. |
| parallax | number | 0.5 | How far inactive imagery drifts with the active index. |
| tilt | number | 8 | Degrees collapsed panels rotate away in 3D. |
| stagger | number | 0.06 | Seconds between the label bar and text sliding in. |
| trigger | "hover" \| "click" | "hover" | Whether hovering expands a panel, or only clicking/focusing does. |
| showLabels | boolean | true | Shows the accent bar and label on the open panel. |
| grayscale | boolean | true | Rests inactive photos in grayscale; the open one is always full colour. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of AccordionGallery.jsx and AccordionGallery.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the open panel takes expandRatio of the track and neighbours tilt away and grayscale; moving the active index drifts imagery with parallax and slides the bar+label in with stagger; hover and click triggers both work and clicking the already-open panel follows its link; focus opens a panel and arrow keys wrap around; defaultIndex clamps; orientation vertical stacks along the height × 1.6 container; expandRatio/gap/radius/tilt/parallax/duration all reshape live; grayscale off leaves full colour; showLabels off hides bars; reduced motion snaps instantly; resize re-measures the media size; narrow (≤520px) layout stacks without overflow; unmount leaves no timeline or observer; 375 / 768 / 1440 wide without overflow.
