# Corporate Clean — Style Reference

> Restrained corporate blue; everything yields to readability and trust.

**Theme:** light

Corporate Clean is the default answer proven by countless B2B products: a light blue-grey canvas, one primary blue, white cards with very light borders and 12px radius. It doesn't chase memorability — it chases zero risk: nobody opens it and finds it strange. Hierarchy is built with 1px borders and two shadow tiers (sm and md); interaction does only two things: on hover elements lift by half a pixel-scale and deepen their shadow, on active they scale down 2% for press feedback. Focus rings must carry an offset — that is the accessibility baseline. All motion stays under 200ms; beyond that it starts to look frivolous.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Corporate Blue | `#1e40af` | `--color-corporate-blue` | Primary buttons, links and key icons. One blue only, so a page never shows two blues. |
| Slate Mist | `#f8fafc` | `--color-slate-mist` | Page canvas and alternating section background. One step below pure white so white cards can float. |
| Action Blue | `#3b82f6` | `--color-action-blue` | Focus rings, selection and data highlights. Never used as large-area fill. |
| Slate | `#64748b` | `--color-slate` | Secondary text, captions and icon strokes. Use it when hierarchy recedes, not smaller type. |
| Confirm Green | `#10b981` | `--color-confirm-green` | Success states and positive metrics. Appears only when the state semantics are explicit. |
| Hint Violet | `#c559f0` | `--color-hint-violet` | Rarely used fourth accent, for new-product tags and experimental features. |

## Typography

### Inter — the only typeface on the site. Hierarchy is built from the 400/500/600/700 weights and type sizes.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 30, 36, 60
- **Line height:** 1.1 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 60px | 1.1 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 36px | 1.2 | -0.01em | `--text-heading-lg` |
| heading | — | 600 | 30px | 1.25 | -0.01em | `--text-heading` |
| subheading | — | 600 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| body-sm | — | 400 | 14px | 1.6 | — | `--text-body-sm` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| badges | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Primary Button

**Role:** primary action, e.g. Get Started

Corporate blue fill, white text, 8px radius, no border. 14px type, weight 500, padding 8px 16px. The resting shadow is 0 1px 2px. On hover it switches to a deeper blue, lifts 2px and the shadow rises to 0 4px 12px; on active it scales to 0.98 and drops the lift. Transition 150ms ease-out.

- **Sizes:** padding 8px 16px; label 14px
- **States:** hover: lift 2px + deeper fill; active: scale 0.98; focus: 2px ring with 2px offset

### Feature Card

**Role:** feature cards and content containers

White fill, 1px #e5e7eb border, 12px radius, 1px-height shadow, 24px padding. Title 20px/600, body 14px/slate. On hover the shadow rises to 0 4px 12px and the card lifts 2px. The icon container is 40px square with a 12px radius and a light blue fill; on hover it fills corporate blue, the icon turns white and scales to 1.1.

- **States:** hover: lift 2px, shadow md; icon: fill, white glyph, scale 1.1

### Form Input

**Role:** form inputs and search

White fill, 1px #d1d5db border, 8px radius, 16px type, padding 8px 12px. Labels 14px/500 dark grey; helper text 12px slate. On focus the border turns corporate blue and a 2px focus ring appears with a 2px offset from the element; the box size never changes.

- **States:** focus: blue border + 2px ring, 2px offset

### Top Navigation

**Role:** site-wide top navigation

64px tall, white, bottom 1px light grey border, no shadow. Wordmark 18px/600 dark grey; links 14px/500 slate with 24px spacing, turning darker and lifting 1px on hover; a primary button on the right.

### Status Badge

**Role:** status and category labels

Full pill radius, 12px type, weight 500, padding 4px 10px. Default: light blue fill with corporate blue text; success: light green fill with confirm green; hint: a 1px border instead of a fill. Always carries a small dot or icon so status never relies on color alone.

## Do's and Don'ts

### Do

- Use one blue only; primary and link colors share the same source
- Cards use a 1px border plus one light shadow tier, never heavy shadows
- Focus states must carry a focus ring with a 2px offset
- Hover lifts no more than 2px; active scales no less than 0.98
- Motion stays under 200ms with ease-out
- Body text starts at 16px with 1.65 line height and lines capped near 70 characters

### Don't

- Don't show two primary blues on the same page
- Don't use gradient buttons
- Don't use square corners or radius larger than 16px
- Don't use heavy shadows (shadow-2xl and friends)
- Don't omit the focus ring offset
- Don't leave buttons without active feedback, or they read as decoration

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Slate Mist | `#f8fafc` | Page canvas |
| 1 | White Card | `#ffffff` | Cards, panels, overlays |

## Elevation

- **Rest:** `0 1px 2px rgba(15,23,42,0.06)`
- **Hover:** `0 4px 12px rgba(15,23,42,0.08)`
- **Focus ring:** `0 0 0 2px #f8fafc, 0 0 0 4px #3b82f6`

## Imagery

Product screenshots and interface details first, on white or light grey, in clean device frames, no close-up portraits. Greyscale icons and line sketches are allowed. No abstract gradients, exaggerated illustration or high-saturation photography.

## Layout

12 columns, capped at 1120px, container padding 16px to 32px. Section gap 96px, card gap 24px, grids use 24px spacing. The hero is centered or text-left/image-right at 1:1 or 6:6. Forms and settings pages use a single column no wider than 640px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#0f172a`
- background: `#f8fafc`
- card: `#ffffff`
- primary: `#1e40af`
- muted: `#64748b`
- border: `#e5e7eb`

EXAMPLE COMPONENT PROMPTS:

1. Build a corporate SaaS card: white fill, 1px #e5e7eb border, 12px radius, shadow 0 1px 2px rgba(15,23,42,0.06), 24px padding. Top left holds a 40px square light-blue icon block (12px radius), followed by a 20px/600 title and 14px #64748b body. On hover the shadow becomes 0 4px 12px and the card lifts 2px.
