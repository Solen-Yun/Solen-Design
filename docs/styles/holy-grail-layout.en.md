# Holy Grail Layout — Style Reference

> Header, three columns, footer: the prototype of web layout, unexpired for twenty-five years.

**Theme:** light

The holy-grail layout is the earliest-discussed web structure: a fixed header, a three-column middle band of equal height (left nav, main content, right sidebar), and a fixed footer. Its value is not visual but allocation — the center column flexes to eat the remaining space, the two side columns hold fixed widths, and the header and footer don't scroll with content. The visuals must stay neutral: white cards, 1px strokes, one shadow tier, 8 to 12px radii — everything defers to readability. The three columns must be equal height, achieved by grid's stretch rather than propping with min-height.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate Ink | `#1e293b` | `--color-slate-ink` | Headings, primary buttons and header text. A structural layout needs one steady dark. |
| Haze | `#f1f5f9` | `--color-haze` | The middle band's shared ground. White cards float on it. |
| Card White | `#ffffff` | `--color-card-white` | Fills for the header, footer, cards and sidebar panels. |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | Primary actions, links and focus rings. The only accent allowed in the three columns. |
| Success | `#10b981` | `--color-success` | Status and completion marks, badges only. |
| Warning | `#f59e0b` | `--color-warning` | Reminders and todos, for sidebar counts and hints. |
| Danger | `#ef4444` | `--color-danger` | Errors and deletion; its presence means a cost. |

## Typography

### Inter — the only font on the site, app-scale sizes (13 to 14px mostly). When three columns coexist, larger type hurts readability.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 14, 16, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 28px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| panels | 12px |

- **Page max-width:** 1440px
- **Section gap:** 24px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Three Column Grid

**Role:** the middle band's three-column container

grid-template-columns: 240px minmax(0, 1fr) 280px; 24px column gap; the three columns equalize via grid's stretch — propping with min-height is forbidden. Below 1024px the right column folds under the main content; below 768px the left column becomes a drawer.

- **Sizes:** 240px / fluid / 280px

### Content Card

**Role:** the main content card

White ground, 12px radius, 1px #f1f5f9 stroke, 20px padding, shadow 0 1px 2px. Title 20px/600, body 14px. On hover it lifts 2px and the shadow rises to 0 4px 12px, over 150ms ease-out.

### Rail Panel

**Role:** sidebar panels (left nav and right info rail)

White ground, 12px radius, no stroke (the ground difference separates it), 16px padding. Group labels are 12px uppercase 0.04em grey; items are 32px tall with 8px radius and a light-haze hover. The selected item takes a primary-blue 8% ground with blue text.

### Sticky Header

**Role:** the page header

56px tall, white ground, a bottom 1px #e2e8f0 stroke, shadow 0 1px 2px, sticky at the top. A 16px/600 wordmark on the left; center nav at 13px with 24px spacing; a primary button and an avatar on the right.

### Fixed Footer

**Role:** the page footer

48px tall, white ground, a top 1px #e2e8f0 stroke, 12px grey text. A version number on the left, three to four links on the right, aligned to the same 1440px cap as the main content.

## Do's and Don'ts

### Do

- Flex the center column; fix the two sides
- Equalize the three columns with grid stretch
- Keep the header and footer fixed, not scrolling with content
- Use a 2px focus ring with offset
- Keep motion under 200ms
- Fold the right column on narrow screens, then drawer the left

### Don't

- Don't prop column heights with min-height
- Don't put large translate animations in the main column
- Don't run three independently scrolling columns plus page scroll
- Don't squeeze a fourth column into the three
- Don't drop the header's sticky
- Don't round panels past 12px

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Haze | `#f1f5f9` | The middle band's ground |
| 1 | Card White | `#ffffff` | Cards, sidebar panels |
| 2 | Header White | `#ffffff` | Header and footer (with border lines) |

## Elevation

- **Card:** `0 1px 2px rgba(15,23,42,0.06)`
- **Card hover:** `0 4px 12px rgba(15,23,42,0.08)`
- **Header:** `0 1px 2px rgba(15,23,42,0.04)`

## Imagery

Icons, avatars and product screenshots; almost no large images. One full-width screenshot may sit in the main column. No full-bleed photography, background textures or illustration — they squeeze the three columns' usable width.

## Layout

Header 56px, middle band three columns (240px / fluid / 280px), footer 48px; the page caps at 1440px with 24px padding. The middle band's minimum height is the viewport minus header and footer. Independent per-column scrolling is optional; the default is whole-page scroll.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#f1f5f9`
- card: `#ffffff`
- accent: `#3b82f6`
- muted: `#64748b`
- border: `#e2e8f0`

EXAMPLE COMPONENT PROMPTS:

1. Build a holy-grail layout: an outer min-h-screen flex-col. Header 56px sticky top-0, white, bottom 1px #e2e8f0. Middle band grid-template-columns: 240px minmax(0,1fr) 280px, gap 24px, flex-1. All three columns equalize via grid stretch. Footer 48px, white, top 1px #e2e8f0. Cards white with 12px radius, 20px padding, shadow 0 1px 2px rgba(15,23,42,0.06).
2. Build a rail panel: white, 12px radius, no stroke, 16px padding. Group labels 12px uppercase 0.04em grey; items 32px tall with 8px radius and a light-haze hover; the selected item takes rgba(59,130,246,0.08) ground with blue text.
