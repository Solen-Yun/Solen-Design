# Fixed Sidebar — Style Reference

> A permanent 240px sidebar on the left; the main area only scrolls content.

**Theme:** light

Fixed Sidebar is a structural style rather than a visual one: the navigation sits permanently on the left at 240px (64px when collapsed), the main content scrolls on its own, and the top bar holds only search and the account. Visually it is close to neutral — white cards, light borders, level-one shadows, 8 to 12px radii, everything in service of structure and scannability. The selected item gets a 10% primary tint with primary-coloured text; hover only deepens to 6%, and both complete within 150ms. Density is the point: sidebar items are 40px tall, main-area cards get 24px padding.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate Ink | `#1e293b` | `--color-slate-ink` | Sidebar fill, headings and primary buttons. Deep without being black, so long sessions don't tire the eyes. |
| Paper Grey | `#f8fafc` | `--color-paper-grey` | Main content canvas. The white cards float on top of it. |
| Card White | `#ffffff` | `--color-card-white` | Cards, panels and overlays. The only highlight surface on the site. |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | Selected items, links and focus rings. Never used as a large fill. |
| Status Green | `#10b981` | `--color-status-green` | Online and success states, as small dots or badges. |
| Alert Red | `#ef4444` | `--color-alert-red` | Errors and unread counts, used only for counts and icons. |

## Typography

### Inter — the only typeface, with a small scale (mostly 13 to 14px): this is application density, not web density.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 14, 16, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 28px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
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
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| nav-items | 8px |

- **Page max-width:** 1440px
- **Section gap:** 32px
- **Card padding:** 24px
- **Element gap:** 8px

## Components

### Sidebar Rail

**Role:** the permanent navigation

240px wide (64px collapsed), filled with slate ink, label text at 70% white, fixed and never scrolling with the content. Items are 40px tall with an 8px radius, 12px horizontal padding, an 18px icon and a 10px gap between icon and label. The selected item gets a 10% white fill with pure white text; hover gets a 6% white fill; transitions run 150ms. Sections are separated by 24px and a 1px white-at-8% rule.

- **Sizes:** 240px / 64px collapsed; item 40px
- **States:** hover: 6% white; selected: 10% white + white text

### Content Card

**Role:** content card and list container in the main area

White fill, 12px radius, 1px #e4e4e7 border, 24px padding, `0 1px 2px` shadow. Title 20px/600, body 14px grey. On hover it lifts 2px and the shadow grows to `0 8px 20px`, transition 150ms.

### Search Field

**Role:** search in the top bar

Paper grey fill, 1px #e4e4e7 border, 8px radius, 36px tall, 36px left padding for a 16px icon, 13px type. On focus the border turns primary blue and a 2px primary-blue-at-20% ring is added.

### Toolbar

**Role:** the top bar

56px tall, white fill, 1px #e4e4e7 bottom border, no shadow. Breadcrumbs 13px on the left, a search field up to 360px wide in the middle, and 32px square icon buttons with an 8px radius on the right.

## Do's and Don'ts

### Do

- Fix the sidebar and scroll the content area on its own
- Keep sidebar items 40px tall to hold application density
- Use a 10% primary tint for the selected state, not a solid fill
- Give cards a 1px border plus a level-one shadow
- Keep the top bar to search, breadcrumbs and the account
- Transition in 150ms — quick, never jarring

### Don't

- Don't let the sidebar scroll with the content
- Don't push main content into the sidebar
- Don't use a card radius larger than 12px
- Don't pile more than three actions into the top bar
- Don't fill large areas with the primary colour
- Don't mix more than two icon styles in the sidebar

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sidebar Ink | `#1e293b` | The permanent navigation rail |
| 1 | Paper Grey | `#f8fafc` | Content area canvas |
| 2 | Card White | `#ffffff` | Cards and panels |

## Elevation

- **Card:** `0 1px 2px rgba(15,23,42,0.06)`
- **Hover:** `0 8px 20px rgba(15,23,42,0.08)`
- **Sidebar:** `0 0 0 1px rgba(15,23,42,0.06)`

## Imagery

Interface screenshots, avatars and icons carry the weight; photography is almost absent. The sidebar takes 18px line icons, the main area takes product screenshots. No decorative illustration and no large images — they would crowd out the sense of structure.

## Layout

A fixed 240px rail on the left and an adaptive content area on the right, with the 56px top bar pinned to the top of the content area. The content area caps at 1200px wide with 24px padding and 16px between cards. Below 1024px the sidebar collapses to 64px; below 768px it becomes a drawer.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#f8fafc`
- card: `#ffffff`
- rail: `#1e293b`
- accent: `#3b82f6`
- border: `#e4e4e7`

EXAMPLE COMPONENT PROMPTS:

1. Build a fixed-sidebar layout: a fixed 240px slate rail on the left (#1e293b, labels at 70% white, items 40px tall with an 8px radius, the selected item on a 10% white fill), and a content area on the right with a #f8fafc canvas and a 56px white toolbar pinned to the top with a 1px #e4e4e7 bottom border. Content cards are white with a 12px radius, 1px #e4e4e7 border, 24px padding and a `0 1px 2px rgba(15,23,42,0.06)` shadow. All transitions 150ms.
