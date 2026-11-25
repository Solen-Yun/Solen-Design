Implement the "ChromaGrid" component from zero: a responsive grid of photo cards that sit in grayscale until a spotlight follows the cursor across the grid — inside the spotlight radius the photos regain their colour, a tinted wash breathes up from the card bottom, and an accent-coloured rim glows around the card, all falling off smoothly toward the spotlight edge. A second reveal mode swaps the cursor spotlight for a plain per-card hover reveal. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: ChromaGrid.jsx (entry, spotlight tracking, per-card offsets) and ChromaGrid.css (all styles). React >= 18, no runtime dependencies. No iframe, no canvas — the effect is CSS mask layers driven by two CSS variables.
- Root is a `<div>` with class chroma-grid plus has-frame when the frame is on: position relative, width 100%. It exposes the component as a named export `ChromaGrid` and also as the default export. Inline style injects every tuning knob as CSS variables: --chroma-x/-y (spotlight centre, initially −9999px off-screen), --chroma-power (spotlight strength 0–1, initially 0), theme tokens, --chroma-cols, --chroma-min, --chroma-gap, --chroma-r (spotlight radius), --chroma-stops (a generated 13-stop radial-gradient alpha list), --chroma-gray, --chroma-dim, --chroma-glow, --chroma-border, --chroma-fade (seconds), --chroma-ratio and --chroma-radius.
- Theme tokens: dark uses a frosted frame rgba(38,35,46,0.66), tile gradient #3a3644 → #27242f, ink #f4f4f5, muted ink at 55%, hover brightness(1.12), press brightness(0.85); light uses frame rgba(240,240,243,0.8), tile gradient #ffffff → #f6f6f8, ink #27272a, muted at 55%, hover brightness(0.97), press brightness(0.92).
- Layout: an inner grid of auto-fill columns sized min(100%, max(min-card-width, (100% − (columns−1) × gap) / columns)) so the column count never exceeds the requested one but the grid still shrinks gracefully; gap via CSS.
- The frame variant wraps the grid in 10px padding, a radius + 10px frosted panel with the frame shadow, backdrop blur(20px) saturate(1.6), and an inset 1px edge + 1px top highlight rim span.

## Cards

- Each item renders as a chroma-card: flex column with 8px padding, the tile gradient, tile shadow, a rim span (inset 1px tile edge + top highlight), radius = cardRadius, isolation isolate, and a filter transition for hover/press. An item with `url` renders as an `<a target="_blank" rel="noopener noreferrer">`; otherwise an `<article>`. Both carry data-chroma-area so the offset measurement can find them.
- Inside: first a chroma-wash span — a radial gradient of the item's accent colour rising from the bottom centre (130% × 70% at 50% 100%, fading out by 72%), painted under the photo, whose opacity is glow × power × 0.45; then the media box — aspect-ratio from the ratio token, radius = max(0, cardRadius − 8), a 1px media rim, and two stacked object-fit-cover copies of the same image: the bottom one grayscale(grayscale-value) brightness(1 − dim) always visible, the top full-colour one with opacity = power. Then optional info (title 15px weight 600, subtitle 13px muted, both single-line ellipsised), and a chroma-card-glow span — an inset 1px ring of the accent colour plus an inset 16px −8px accent bloom, opacity = borderGlow × power.
- Accent colour resolves item.accent → item.borderColor → "#ffffff". Image alt is item.alt or the title; the colour copy is aria-hidden with an empty alt and lazy-loads.
- The wash, colour image and glow span all share one mask-image: a radial-gradient circle of the spotlight radius centred at (spotlight-x − card-offset-x, spotlight-y − card-offset-y) with the generated alpha stops — fully opaque inside a core region and falling off through a smootherstep curve to the radius edge. Card offsets are measured against the root on mount, on every layout effect pass and on resize, and written to each data-chroma-area node as --chroma-ox/--chroma-oy, so one shared spotlight position lights every card correctly regardless of scroll or layout shifts.

## Spotlight motion

- Pointer move or pointer down on the grid sets the target position to the pointer (grid-local coordinates) and ramps the target power to 1; pointer leave or cancel ramps it back to 0. The first entry snaps the position to the pointer so the spotlight never flies in from a stale corner.
- One self-sleeping rAF loop eases the live position toward the target with follow = 1 − exp(−dt / (damping × 0.32)) (damping in seconds, so higher values trail harder), and eases power with a 0.1s span when rising and max(0.02, fadeOut × 0.35)s when falling (fadeOut also feeds the CSS transition duration token). It stops when the position is within 0.1px and power within 0.002 of target, writing one final settled frame.
- prefers-reduced-motion: both easings snap straight to their targets — the spotlight jumps to the cursor and colour pops in and out with no lag.
- Reveal mode "card": the masks are removed entirely; wash, colour image and glow start at opacity 0 with a transition of fadeOut seconds, and hovering an individual card fades all three in over 0.3s. The cursor tracking loop still runs but produces no visible spotlight.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { image: string; title?: string; subtitle?: string; accent?: string; alt?: string; url?: string }[] | DEFAULT_ITEMS | The cards. Six placeholder photo cards with titles, subtitles and accent colours ship as the default; exact default artwork ships with the code. |
| columns | number | 3 | Target column count; the auto-fill grid never exceeds it but may shrink below on narrow screens. |
| minCardWidth | number | 180 | Minimum card width in px (floored at 80) before columns collapse. |
| gap | number | 12 | Grid gap in px. |
| radius | number | 260 | Spotlight radius in px (floored at 20). |
| softness | number | 0.6 | How gently the spotlight fades at its edge, 0–1; 0 makes a hard disc. |
| damping | number | 0.45 | How long the spotlight trails the cursor, in seconds; higher is laggier. |
| fadeOut | number | 0.6 | Seconds for the spotlight to die after the pointer leaves (also the card-reveal transition length). |
| grayscale | number | 1 | Base grayscale of the resting photos, 0–1. |
| dim | number | 0.12 | Extra darkening of the resting photos, 0–0.9. |
| glow | number | 0.5 | Strength of the accent wash inside the spotlight, 0–1. |
| borderGlow | number | 1 | Strength of the accent rim glow inside the spotlight, 0–1. |
| reveal | "spotlight" \| "card" | "spotlight" | Cursor-following spotlight, or plain per-card hover reveal. |
| aspectRatio | string | "3 / 2" | CSS aspect-ratio of the photo area. |
| cardRadius | number | 22 | Card corner radius in px; the photo area uses radius − 8. |
| showInfo | boolean | true | Shows the title/subtitle block under each photo. |
| frame | boolean | false | Shows the frosted panel around the grid. |
| theme | "dark" \| "light" | "dark" | Colour theme of frame, tiles and text. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of ChromaGrid.jsx and ChromaGrid.css plus install steps (react, react-dom) and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the spotlight follows the cursor smoothly and restores colour, wash and rim only inside its radius; cards light up with correct offsets at every grid position and after resizes; leaving the grid fades the spotlight out over the fadeOut time; softness 0 renders a hard-edged disc and high softness a wide feather; reveal "card" fades colour in only on the hovered card; columns/minCardWidth/gap produce the expected column collapse at 375 / 768 / 1440; url items open in a new tab with rel noopener and show a focus outline; frame on/off and theme dark/light both render; reduced motion snaps the spotlight with no easing; unmount leaves no rAF, observers or listeners; same-page instances are independent.
