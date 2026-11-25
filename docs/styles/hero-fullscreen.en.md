# Full-Screen Hero — Style Reference

> A full screen of image speaks first; the text is only a label on top of it.

**Theme:** dark

Full-Screen Hero hands the first viewport to an image or a video: 100vh tall, the media filling it edge to edge, with a 30% to 50% black veil over the top so the text stays readable. The typography runs the other way round — the title is enormous (56 to 96px), the subtitle is short, and there are only two action buttons; everything else moves down the page. Buttons have to be inverted (white on black) to jump off the dark veil. There is one visual detail: the CTA's "gravity lift" — on hover it rises 4px and the shadow bursts out to 28px, as if light were holding it up. Scrolling down can add 0.3 to 0.5 of parallax on the background.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | Primary button fill and headline text. Over a full-screen image, white is the only colour that guarantees readability. |
| Black | `#000000` | `--color-black` | The veil and the button text. The veil sits on the image at 30% to 50% opacity. |
| Coral | `#ff6b6b` | `--color-coral` | Secondary accent and badges, for information that has to jump out of the image. |
| Cyan | `#4ecdc4` | `--color-cyan` | Links and secondary button hovers, set against the warm image for contrast. |
| Yellow | `#ffe66d` | `--color-yellow` | Highlights and numbers, only on small annotations. |
| Indigo | `#6c5ce7` | `--color-indigo` | Brand colour, for the logo and one accent. Never given the same area as coral or yellow on one screen. |

## Typography

### Inter — the only typeface. The hero title creates its pressure with 96px and -0.035em tracking; every other size falls away quickly.

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 13, 15, 18, 24, 40, 64, 96
- **Line height:** 0.98 (display), 1.1 (headings), 1.6 (body)
- **Letter spacing:** -0.035em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 96px | 0.98 | -0.035em | `--text-display` |
| heading-lg | — | 700 | 64px | 1.02 | -0.03em | `--text-heading-lg` |
| heading | — | 600 | 40px | 1.1 | -0.02em | `--text-heading` |
| subheading | — | 400 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.6 | — | `--text-body` |
| label | — | 600 | 13px | 1.4 | 0.08em | `--text-label` |

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
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 999px |
| inputs | 12px |
| media | 0 |

- **Page max-width:** 1280px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Hero CTA

**Role:** the primary action in the first viewport

White fill, black text, a fully round 999px radius, no border, type at 18px/600, padding 16px 32px, shadow `0 4px 14px` black at 30%. On hover the fill drops to 95%, the button lifts 4px and the shadow bursts to `0 8px 28px` black at 50%; on press it scales to 0.98, the offset returns to zero and the shadow falls back to 8px. The focus ring is white at 80% with a black offset. Transitions 200ms ease-out.

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: lift 4px, shadow burst; active: scale 0.98

### Frosted Feature Card

**Role:** feature cards and data blocks inside the hero

10% white fill, 8px blur, 1px white-at-20% border, 16px radius, 32px padding. The icon block is 48px square on a 20% white fill with a 12px radius. On hover the fill rises to 15%, the border to 30%, the card lifts 8px and the shadow becomes `0 16px 40px` black at 50%, with the icon scaling to 1.1. Transitions 300ms ease-out.

### Transparent Nav

**Role:** the navigation at the top of the hero

Fully transparent, no border and no shadow. 80px tall with 32px horizontal padding; the wordmark and the links are white, the links 13px/500 with 0.08em tracking and 32px spacing, turning to white at 70% on hover. Once the page scrolls past one screen it switches to a solid background with a 1px white-at-10% bottom border.

### Hero Media

**Role:** the background image or video of the first viewport

100vh tall, full width, object-fit: cover, square corners. A 40% black veil sits on top (deepening to 55% at the top so the navigation stays readable). A parallax speed of 0.3 to 0.5 is allowed. Video must be muted, looped, and carry a poster.

## Do's and Don'ts

### Do

- Make the first viewport fill exactly one screen
- Start the veil at 40% so the text stays readable
- Use inverted buttons (white fill, black text)
- Keep the title to two lines and the subtitle to one
- Let the CTA lift and burst its shadow on hover
- Keep the parallax between 0.3 and 0.5

### Don't

- Don't put more than two buttons in the hero
- Don't push body copy into the first viewport
- Don't place key information in the corners of the image
- Don't use a veil lighter than 30%
- Don't autoplay video with sound
- Don't let the parallax exceed 0.6

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Full-bleed media | `image or video at 100vh` | Hero background |
| 1 | Veil | `rgba(0,0,0,0.40)` | The veil over the media |
| 2 | Frosted panel | `rgba(255,255,255,0.10)` | Feature cards inside the hero |

## Elevation

- **CTA rest:** `0 4px 14px rgba(0,0,0,0.30)`
- **CTA hover:** `0 8px 28px rgba(0,0,0,0.50)`
- **Card hover:** `0 16px 40px rgba(0,0,0,0.50)`

## Imagery

Full-screen photography or video is the whole content of this layout: landscape, product, on-site. Every image needs a clear light and dark area to place the text in, and nothing important may sit in the corners. No illustration and no pattern backgrounds.

## Layout

The hero is 100vh; the content is vertically centred, or placed 60% down the viewport. Max width 1280px with 32px side padding. The title runs to two lines at most, the subtitle to one, and the two buttons sit side by side. No more than three information blocks inside the hero. Every section below is at least 160px apart.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- veil: `rgba(0,0,0,0.40)`
- ctaFill: `#ffffff`
- ctaText: `#000000`
- accent: `#ff6b6b`
- secondary: `#4ecdc4`

EXAMPLE COMPONENT PROMPTS:

1. Build a full-screen hero: a 100vh container with a background image at object-fit: cover and a rgba(0,0,0,0.4) veil over it. The content is vertically centred; the title is 96px/700 white with -0.035em tracking, at most two lines; the subtitle is 24px at 80% white; below it, two buttons side by side, the first white with black text and a fully round shape (18px/600, padding 16px 32px, shadow 0 4px 14px rgba(0,0,0,0.3)); on hover it translates -4px and the shadow grows to 0 8px 28px.
