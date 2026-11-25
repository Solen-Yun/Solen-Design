# Parallax Sections — Style Reference

> Every screen is a pinned backdrop; content slides over it.

**Theme:** dark

Parallax scrolling cuts the page into 100vh sections, each with its own fixed background (bg-fixed). Content scrolls over it, so foreground and background move at different speeds and depth is simulated. Readability is handled in two layers: each section lays a gradient veil from navy 80% down to transparent at its base, and the content itself is wrapped in a 90%-white translucent card. Expressiveness concentrates on depth rather than displacement — interactions prefer changing opacity and blur, avoiding large translations that induce dizziness. Transition bands stitch two backdrops together with a gradient.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Navy | `#1e3a5f` | `--color-deep-navy` | The veil's and dark sections' base tone. All parallax darkness comes from it. |
| Snow | `#f8fafc` | `--color-snow` | Content-card fill and light sections' ground. Layered at 90% over the backdrop. |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | Primary actions and links; on dark backdrops it must rise to this step to stay bright. |
| Pale Blue | `#93c5fd` | `--color-pale-blue` | Secondary accents and icons, for detail on deep-blue grounds. |
| Sky | `#0ea5e9` | `--color-sky` | Gradient ends and highlights, for the bands between sections. |
| Violet | `#c559f0` | `--color-violet` | The only warm-leaning color, separating adjacent sections' moods, least frequent. |

## Typography

### Inter — the only typeface. Section titles run 80px with tight tracking, body 16px at 1.65 line height, so full-screen sections stay effortless to read.

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 32, 56, 80
- **Line height:** 1.02 (display), 1.15 (headings), 1.65 (body)
- **Letter spacing:** -0.03em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 80px | 1.02 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 56px | 1.05 | -0.025em | `--text-heading-lg` |
| heading | — | 600 | 32px | 1.15 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 12px |
| media | 0 |

- **Page max-width:** 1120px
- **Section gap:** 0px
- **Card padding:** 48px
- **Element gap:** 24px

## Components

### Parallax Section

**Role:** the full-screen section container

min-height: 100vh, background-image with background-attachment: fixed, background-size: cover, background-position: center. Over it, a linear gradient from navy 80% to transparent at the bottom. Content sits vertically centered, max-width 1120px, 32px side padding. Mobile disables fixed (both performance and visuals collapse), switching to normal scrolling.

- **Sizes:** 100vh per section

### Content Card

**Role:** the content container inside a section

Snow-white 90% fill, 12px blur, 24px radius, 48px padding, shadow 0 24px 60px black 18%. Title and body both rest on this card to guarantee readability. On hover the shadow widens to 80px and the card lifts 4px, over 400ms ease-out.

### Transition Band

**Role:** the seam between sections

A pure gradient band 160px tall, running from the previous section's end color to the next section's start color, optionally layered with 40px blur. It carries no content — its only duty is preventing a hard edge between two fixed backdrops.

### Scroll Cue

**Role:** the first-screen scroll hint

At the first screen's bottom center: a 1px white 50% vertical line, 48px tall, with 12px uppercase 0.08em white 70% text below. The line and text fade in and out over a 2.4s cycle, changing opacity only — no translation.

## Do's and Don'ts

### Do

- Give every screen 100vh with a fixed background
- Run the veil from 80% down to transparent
- Wrap content in a 90% white card for readability
- Stitch sections with 160px gradient bands
- Prefer opacity and blur in interactions
- Disable fixed on mobile

### Don't

- Don't let background and content scroll at the same speed
- Don't exceed a 0.5 parallax ratio
- Don't animate large translations
- Don't keep fixed attachment on mobile
- Don't put two backdrops in one screen
- Don't set text directly on the image

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Fixed backdrop | `image, bg-fixed` | Each screen's pinned background |
| 1 | Navy veil | `rgba(30,58,95,0.80)` | The gradient mask over the backdrop |
| 2 | Snow card | `rgba(248,250,252,0.90)` | Content cards |

## Elevation

- **Card:** `0 24px 60px rgba(15,23,42,0.18)`
- **Card hover:** `0 32px 80px rgba(15,23,42,0.24)`

## Imagery

One full-frame backdrop per screen: landscapes, architecture, product close-ups. Backdrops must have clear dark regions to carry the veil and text, and must connect naturally to the next screen. No white-ground images or illustration.

## Layout

The page strings several 100vh sections vertically, stitched with 160px gradient bands. Content caps at 1120px wide, vertically centered. Each screen tells one thing — a title, a paragraph, one action, no more than three elements.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1e293b`
- backdrop: `#1e3a5f`
- veil: `rgba(30,58,95,0.80)`
- card: `rgba(248,250,252,0.90)`
- accent: `#3b82f6`
- secondary: `#93c5fd`

EXAMPLE COMPONENT PROMPTS:

1. Build a parallax section: min-height 100vh, background-image with background-attachment: fixed, background-size: cover, background-position: center. Over it a linear-gradient(to bottom, rgba(30,58,95,0.8), transparent). The content sits in a 90%-white card (24px radius, 48px padding, backdrop-blur 12px, shadow 0 24px 60px rgba(15,23,42,0.18)), vertically centered, max-width 1120px.
