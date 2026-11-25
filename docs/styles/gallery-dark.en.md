# Gallery Dark — Style Reference

> A near-black hall where only the photographs glow and everything else fades out of sight.

**Theme:** dark

The gallery-dark style serves photographers and image-makers: a near-black ground (#0a0a0a) gives full-bleed images absolute attention, raised surfaces sit at #1a1a1a, dividers at #2a2a2a, and every piece of metadata — date, tag, location, wall label — is set in warm amber (#c4956a) at 10 to 11px, uppercase, 0.15em tracking, weight 300. Body copy is white and light, and display titles run 4xl to 7xl in the same light weight with tight tracking. Cards carry a 1px border and a 2px radius and never a shadow. The bans protect the immersion: no colored shadows, no gradient grounds, no light backgrounds — anything that brightens the room breaks it.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Gallery Black | `#0a0a0a` | `--color-gallery-black` | The page ground. Near black, so the photographs become the only light source. |
| Raised | `#1a1a1a` | `--color-raised` | Cards and side panels, one step above the ground. |
| Divider | `#2a2a2a` | `--color-divider` | Every 1px border and rule. The only structural device in a dark room. |
| Amber | `#c4956a` | `--color-amber` | The single accent: metadata, wall labels, links and focus rings. |
| White | `#ffffff` | `--color-white` | Body and headings, always weight 300. |

## Typography

### Inter — the only typeface on the site, used at 300 and 400 only. Display 56 to 72px in the light weight with tight tracking; metadata 10px uppercase at 0.15em.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 400
- **Sizes:** 10, 11, 14, 20, 36, 56, 72
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.15em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 300 | 72px | 1.05 | -0.02em | `--text-display` |
| heading | Inter | 300 | 56px | 1.1 | -0.02em | `--text-heading` |
| subheading | Inter | 300 | 36px | 1.2 | — | `--text-subheading` |
| body-lg | Inter | 300 | 20px | 1.5 | — | `--text-body-lg` |
| body | Inter | 300 | 14px | 1.6 | — | `--text-body` |
| label | Inter | 300 | 11px | 1.5 | 0.15em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1440px
- **Section gap:** 128px
- **Card padding:** 0px
- **Element gap:** 24px

## Components

### Full Bleed Frame

**Role:** the full-bleed work (core)

The container is overflow hidden with zero padding; the image is object-fit: cover, filling it completely at 100% width and height. Zero radius, zero border, zero shadow. A wall label sits 48px above or below: 10px uppercase 0.15em amber metadata plus the work's name at 20px in white. Images never carry an overlay or text.

### Work Card

**Role:** the work card and thumbnail tile

Filled with the raised surface #1a1a1a, 2px radius, 1px #2a2a2a border, no padding (the image fills it), no shadow. The label goes 16px below. On hover the image's opacity drops to 90% — a slight change in brightness, never a scale and never a shadow.

- **States:** hover: opacity 90%

### Quiet Nav

**Role:** the top navigation

24px 32px padding, a 1px #2a2a2a border along the bottom, no blur and no ground change. Links are 11px uppercase 0.15em light white, turning amber on hover. The wordmark is 20px/300.

### Amber Field

**Role:** the search and subscribe input

Filled with gallery black, 2px radius, 1px #2a2a2a border, 10px 14px padding, 14px light text. The placeholder is white at 40%. On focus the border turns amber and picks up a 1px amber 30% outer ring.

### Wall Label

**Role:** the wall label metadata

A fixed format — date · location · medium — at 10px uppercase 0.15em light amber, line height 1.5. It is the only colored text in the style, and the detail that separates this from plain dark minimalism.

## Do's and Don'ts

### Do

- Keep the ground near black and the raised surface one step above it
- Set metadata in amber at 10px uppercase 0.15em
- Use weight 300 for both headings and body
- Give cards a 1px border and no shadow
- Run photographs full bleed with no overlay or text
- Let hover do nothing but drop opacity to 90%

### Don't

- Don't use colored shadows or gradient grounds
- Don't use light backgrounds
- Don't put text or overlays on photographs
- Don't use bold weights
- Don't give cards a shadow
- Don't introduce a second accent color

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Gallery Black | `#0a0a0a` | Page ground |
| 1 | Raised | `#1a1a1a` | Cards and side panels |

## Elevation

- **None:** `none — a shadow would interrupt the dark`

## Imagery

Photography is the only content: full bleed, precisely cropped, no filters. Different ratios are allowed as long as a series shares one grade. No illustration, no icon decoration, no non-photographic imagery.

## Layout

Capped at 1440px, with full-bleed works breaking out to 100vw. The thumbnail grid runs 2 columns on mobile and 3 on desktop with 16 to 24px gaps. Section gaps are 128px. Vertical whitespace lets each photograph stand on its own.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a0a`
- raised: `#1a1a1a`
- amber: `#c4956a`
- divider: `#2a2a2a`
- muted: `#8a8a8a`

EXAMPLE COMPONENT PROMPTS:

1. Build a gallery-dark page: ground #0a0a0a, cards #1a1a1a, borders #2a2a2a. Works are full bleed with object-fit: cover, zero radius, zero shadow, the container overflow hidden with no padding. The wall label sits 48px from the image: 10px uppercase 0.15em #c4956a metadata (date · location · medium) plus the title at 20px/300 in white. Display type 72px/300 at -0.02em tracking. Cards use a 2px radius and a 1px border with no shadow; on hover the image drops to 90% opacity. Only weights 300 and 400 are used, and no light background appears anywhere.
