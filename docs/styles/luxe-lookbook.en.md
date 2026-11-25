# Luxe Lookbook — Style Reference

> Porcelain, ink, a little matte gold: luxury comes from what was removed.

**Theme:** light

The luxe-lookbook style is the digital flagship of a fashion house: a porcelain ground (#f7f5f1) with ink type (#141210), and one accent — matte gold (#9a7b4f) — allowed only on small labels, focus states and a single CTA. Everything is square-cornered, divided by 1px hairlines, with no shadows and no gradients; every extra element lowers the price. Weight is never faked with font-bold — the sense of weight comes from the stroke contrast of the Didone serif itself. The opening is a full-bleed film with a silk texture, whose poster frame serves as the LCP: preload="none", muted autoplay on entry, pause off-screen, and a still frame only under reduced-motion or Save-Data.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#141210` | `--color-ink` | All type and hairlines. A black with a little warmth, like velvet. |
| Porcelain | `#f7f5f1` | `--color-porcelain` | The page ground. An extremely light warm white, more material than plain white. |
| Matte Gold | `#9a7b4f` | `--color-matte-gold` | The only accent, appearing on small labels, focus and one CTA. |
| Bone | `#e8e3db` | `--color-bone` | Secondary blocks and image underlays, dividing content without adding contrast. |
| Ash | `#6b6259` | `--color-ash` | Secondary text, price notes and metadata. |

## Typography

### Didot — display headings in a Didone serif, with weight read from stroke contrast rather than added. 100px and above is normal.

- **Substitute:** 'Playfair Display', Georgia, serif
- **Weights:** 400
- **Sizes:** 22, 32, 48, 72, 104
- **Line height:** 1.02 (display), 1.08 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.24em on uppercase labels

### Inter — interface text, prices and captions. The scale is squeezed to 11 to 14px so the serif headings keep the attention.

- **Substitute:** system-ui, 'Helvetica Neue', sans-serif
- **Weights:** 300, 400
- **Sizes:** 11, 12, 14
- **Line height:** 1.5 (display), 1.5 (headings), 1.75 (body)
- **Letter spacing:** 0.06em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Didot | 400 | 104px | 1.02 | -0.02em | `--text-display` |
| heading-lg | Didot | 400 | 72px | 1.05 | -0.02em | `--text-heading-lg` |
| heading | Didot | 400 | 48px | 1.1 | — | `--text-heading` |
| subheading | Didot | 400 | 32px | 1.2 | — | `--text-subheading` |
| body | Inter | 400 | 14px | 1.75 | — | `--text-body` |
| label | Inter | 300 | 11px | 1.6 | 0.24em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| media | 0 |

- **Page max-width:** 1360px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Silk Hero

**Role:** the full-bleed film opening (signature component)

100vh tall, overflow hidden. The poster is rendered first as an AVIF and serves as the LCP; the video is muted, looped, playsInline, preload="none", and is loaded and played through IntersectionObserver when it enters the viewport and paused when it leaves. A gradient scrim runs from 40% ink at the bottom to transparent — the only gradient permitted. The title is 104px Didot in white, aligned bottom-left, 64px from the edge. Under reduced-motion and Save-Data the film never plays and only the poster remains.

- **Sizes:** 100vh; poster as LCP

### Lookbook Grid

**Role:** the lookbook grid

Two or three columns, gap 0, with the blocks separated by a 1px ink 20% hairline. Each block is a 3:4 vertical composition; on hover a second image cross-fades in over 600ms and the collection name surfaces at the bottom in 11px uppercase 0.24em. Images carry zero radius and zero shadow.

- **States:** hover: second image cross-fade, collection label appears

### Gold CTA

**Role:** the only primary action

Matte gold fill, or a transparent ground with a 1px gold border, zero radius, white or gold label, 11px/300 uppercase 0.24em, 16px 40px padding, no shadow. On hover the fill gains 10% gold; on press it gains 18%. Only one exists on the page.

### Hairline Column

**Role:** the hairline division

1px, ink 20%, running vertically or horizontally to divide columns and sections. Shadows and color blocks are never used for separation — a single line is enough.

### Numeral Display

**Role:** numeral typography (price and size)

Prices and sizes are set in Didot at 48 to 72px with -0.02em tracking, spelling out the currency in full rather than abbreviating with a symbol. The numeral is the decoration — no ground, no border.

## Do's and Don'ts

### Do

- Pair porcelain with ink and a single matte gold
- Keep everything square and divide with hairlines
- Let weight come from the Didone's stroke contrast
- Use the poster as the LCP and play video only on entry
- Let whitespace take more than sixty percent of the page
- Make motion fall like silk, starting at 600ms

### Don't

- Don't use radius, shadows or gradients
- Don't spread the gold around
- Don't fake weight with font-bold
- Don't crowd the layout
- Don't let the video become an LCP dependency
- Don't use fast-cutting motion

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Porcelain | `#f7f5f1` | Page ground |
| 1 | Bone | `#e8e3db` | Secondary blocks |
| 2 | Film | `full-bleed video` | The opening film |

## Elevation

- **None:** `none — a shadow cheapens it`

## Imagery

Fashion photography: silk, leather, sculptural lighting, unified as 3:4 vertical compositions. Full-bleed film alternating with stills is allowed. No illustration, no graphic decoration, no icon walls.

## Layout

Capped at 1360px with 32px container padding and 160px section gaps. Whitespace takes more than sixty percent of the page. Headings can be very large (104px and up) and may overlap the imagery. Everything is square-cornered — a single rounded corner reads as a downgrade.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#141210`
- background: `#f7f5f1`
- gold: `#9a7b4f`
- bone: `#e8e3db`
- ash: `#6b6259`
- border: `rgba(20,18,16,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. Build a luxe-lookbook layout: porcelain ground #f7f5f1, ink type #141210, and a single matte gold accent #9a7b4f. Zero radius and zero shadow site-wide. Display headings are Didot at 104px with -0.02em tracking and never bold; interface text is 11 to 14px, uppercase, at 0.24em tracking. The lookbook grid is two columns with gap 0, blocks separated by a 1px rgba(20,18,16,0.2) hairline, each a 3:4 vertical composition. The opening is a full-bleed film: the poster is the LCP, the video uses preload="none", plays muted, starts on entry and pauses off-screen, and shows only the still frame under reduced-motion. Gold appears on one small label and one CTA. Section gaps are 160px.
