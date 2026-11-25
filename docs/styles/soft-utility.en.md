# Soft Utility — Style Reference

> Productivity tools can be gentle too: deep teal holds the information, soft colors soothe the hand.

**Theme:** light

The soft-utility style serves high-frequency mobile tools: to-dos, expense tracking, health check-ins. It balances efficiency against gentleness — the primary is deep teal (#2d5b63) so buttons and body copy stay legible, and every other color is a low-saturation mint, apricot, blush or pale blue used only for categories and status. Radii run 12 to 16px, more restrained than consumer products and softer than enterprise ones. The motion deliberately avoids bounce, because in a daily tool any exaggerated gesture becomes an interruption.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Teal | `#2d5b63` | `--color-deep-teal` | Primary action, headings, progress bars and selected states. The only high-contrast color in the system. |
| Mist | `#f4f8f6` | `--color-mist` | Page and card ground. A warm white with a touch of green, softer than plain white. |
| Ink Teal | `#203b40` | `--color-ink-teal` | Body and heading text. Deeper than the primary, so long paragraphs stay readable. |
| Mint | `#a9d8cc` | `--color-mint` | Category color and icon ground, meaning lifestyle and done. |
| Apricot | `#f3c98b` | `--color-apricot` | Reminders and deadlines — the loudest of the warm colors. |
| Blush | `#e6b7b0` | `--color-blush` | Emotional and personal categories. Small in area, low in frequency. |
| Pale Blue | `#b8c9ed` | `--color-pale-blue` | Information and schedule categories — the only cool-leaning soft color. |

## Typography

### Inter — the only typeface on the site. The scale leans mobile (13 to 17px for most text), and weight never exceeds 600 so it does not overpower the soft colors.

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 15, 17, 22, 28
- **Line height:** 1.25 (display), 1.35 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | Inter | 600 | 28px | 1.3 | -0.01em | `--text-heading` |
| subheading | Inter | 600 | 22px | 1.35 | — | `--text-subheading` |
| body-lg | Inter | 600 | 17px | 1.5 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.6 | — | `--text-body` |
| body-sm | Inter | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | Inter | 500 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 16px |
| inputs | 16px |
| icons | 12px |
| pills | 999px |

- **Page max-width:** 480px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Primary Action

**Role:** the primary action button (finishing a task)

Deep teal fill, white label, 16px radius, no stroke, 17px type at weight 600, 12px 20px padding, shadow 0 6px 16px primary 20%. On hover the fill deepens to #234b52; on press it scales 0.98. The transition changes color only, over 200ms.

- **Sizes:** padding 12px 20px; label 17px
- **States:** hover: darker fill; active: scale 0.98

### Task Card

**Role:** the task card and progress block

Mist fill, 1px primary 15% border, 16px radius, 20px padding, no shadow. At the top-left a 40px mint icon block (12px radius), then a 17px/600 ink teal title and a 12px grey note. Along the bottom a progress bar 8px tall, fully rounded, with a #d9e8e3 track and a deep teal fill.

### Soft Input

**Role:** adding a task and searching

White fill, 1px primary 20% border, 16px radius, 12px 16px padding, 15px type. The placeholder is grey 60%. On focus a 4px mint 50% ring is added without changing the border width.

- **States:** focus: 4px mint ring

### Category Chip

**Role:** category and filter markers

Fully rounded, 6px 12px padding, 12px/500. Each of the four categories uses one soft color at 20% as its ground with primary-colored text: mint for lifestyle, apricot for deadlines, blush for personal, pale blue for schedule. The selected state raises the ground to 100% and keeps the dark text.

### Bottom Sheet

**Role:** the mobile bottom sheet

White fill, 20px radius at the top, a 1px primary 10% border along the top, shadow 0 -12px 40px ink teal 12%. A 36px × 4px grey grip sits centered at the top. Padding 20px, a scrollable content area, maximum height 88vh.

## Do's and Don'ts

### Do

- Keep deep teal as the primary and let it carry actions and body copy
- Use 12 to 16px radii
- Reserve the soft colors for categories and status
- Keep weight at 600 or below
- Keep motion at 200ms and color-only
- Use a single mobile column capped at 480px

### Don't

- Don't use bounce or exaggerated motion
- Don't let a soft color carry body copy
- Don't use radii above 20px
- Don't use heavy shadows
- Don't put more than three category colors on one screen
- Don't go multi-column on mobile

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Mist | `#f4f8f6` | Page and card ground |
| 1 | White | `#ffffff` | Inputs and overlays |
| 2 | Mint Bed | `#a9d8cc` | Icons and category blocks |

## Elevation

- **Button:** `0 6px 16px rgba(45,91,99,0.20)`
- **Card:** `none — 1px border carries it`
- **Sheet:** `0 -12px 40px rgba(32,59,64,0.12)`

## Imagery

Icons and a little illustration. Soft geometric shapes are allowed as category markers. No photography and no background images — in a mobile tool, imagery squeezes out information.

## Layout

Mobile first: a single column capped at 480px, 20px padding, 12px between cards. On desktop it centers as one column no wider than 560px. A fixed bottom action bar is 64px tall, and the content reserves matching bottom padding.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#203b40`
- background: `#f4f8f6`
- primary: `#2d5b63`
- mint: `#a9d8cc`
- apricot: `#f3c98b`
- muted: `#557077`

EXAMPLE COMPONENT PROMPTS:

1. Build a soft-utility task card: background #f4f8f6, 1px rgba(45,91,99,0.15) border, 16px radius, 20px padding. At the top-left a 40px #a9d8cc icon block with a 12px radius, a 17px/600 #203b40 title and a 12px #557077 note. Along the bottom a progress bar 8px tall, fully rounded, with a #d9e8e3 track and a #2d5b63 fill at 66%. Page ground #f4f8f6.
