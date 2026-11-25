Implement the "GooeyNav" component from zero: a pill navigation where the active pill is a blob of liquid mass — selecting a new item breaks the pill into droplets that fly across the bar, wobble, and melt into the new pill through a gooey metaball field. The bar carries a frosted frame, a hover ghost highlight, and a no-WebGL fallback. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + WebGL2, two files only: GooeyNav.jsx (entry, mass/droplet simulation, shaders) and GooeyNav.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<nav>` with class gooey-nav plus a size modifier gooey-nav--sm/md/lg and gooey-nav--framed when frame is on: position relative, display inline-flex, max-width 100%; per-size CSS variables (--gn-pad 5/6/7px, --gn-gap 2/4/6px, --gn-font 13/14/16px, --gn-x 13/16/20px, --gn-y 7/9/11px). The framed variant adds padding, a 999px radius, the frame background var, a soft frame shadow, and backdrop blur(20px) saturate(1.6).
- Theme tokens are injected as inline CSS variables from the theme prop: dark frame rgba(38,35,46,0.66) with white edge/highlight and a deep shadow; light frame rgba(240,240,243,0.8) with dark edge, white highlight and a lighter shadow; ink #f4f4f5/#27272a, muted ink at 62%. The active pill colour comes from the color prop or the theme default (#f4f4f5 dark / #27272a light); the label colour inside the pill is activeTextColor or a luma-based contrast pick (#18161d on light pills, #ffffff on dark). An optional rim span draws a 1px inset frame edge plus a top highlight.
- Inside is a stage div holding, in paint order: an oversized WebGL canvas (absolute, 72px overscan on every side so droplets can fly outside the bar), a hidden fallback span (plain pill, shown only without WebGL), the interactive `<ul>` of items, and an aria-hidden duplicate `<ul>` whose text is clipped to the gooey shape (see overlay). Items are `<li data-gooey-index>` wrapping an `<a>` when the item has an href (an href of "#" prevents default) or a `<button>` otherwise; a link carries aria-current="page" on the active one, a button carries aria-pressed (true on the active one, false on the rest), and either may hold an icon span before the label.
- The overlay list is positioned exactly over the interactive one, coloured with the active ink, visibility hidden with clip-path: inset(100%) — every frame its clip-path is set to a path() covering the current gooey shape, so the crisp full-ink labels appear only where the liquid body is. Idle state uses a plain rounded-rect path; during motion the shape is traced on the CPU (see fallback tracing) into row rects.
- All pointer handlers live on the list; motion state lives in refs, so items never remount on selection. Controlled mode: when activeIndex is passed the component renders it and calls onChange without touching internal state; uncontrolled mode keeps an internal index seeded by initialActiveIndex. index is clamped into items range.

## WebGL2 gooey field

- Context: webgl2, alpha true, premultipliedAlpha true, antialias false; if the context or program fails, the canvas hides and a plain fallback pill takes over (still animating position via the same simulation). Reduced motion settles instantly (see motion).
- One program. Geometry is a 4-vertex triangle strip covering the clip space; the canvas is sized to (stage + 144px) × DPR (clamped to 2) and offset −72px so the field extends past the bar.
- Fragment shader field: up to 4 rounded-box SDFs (the pills, each with mass-driven scale) and up to 32 capsule SDFs (the droplets, each a capsule from the drop to its motion tail, radius shrinking as it emerges/absorbs). Shapes merge through a soft-min blend whose smoothness k = uSmooth — this is the gooeyness: nearby droplets and pills melt together before touching. Fill colour is mixed by SDF distance across shapes (tinted droplets blend their own colours while merging), a gradient-normal rim adds a top highlight, the body darkens slightly at the bottom, and a soft drop shadow is sampled by re-evaluating the field 3px below. The hover ghost is a rounded-box SDF of the hovered item painted in the theme hover tint at the ghost alpha.
- Uniforms per frame: pill boxes (x, y, half-w, half-h) in overscan space, droplet positions/radii/tails/tints, droplet count, smooth, pill colour, hover box + colour, shadow strength.
- Colour parsing accepts 3/6-digit hex and rgb()/rgba() (for pill colour, droplet palette and theme probes); unparsable input falls back to white.

## Mass & droplet simulation

- Each pill slot carries { mass, scale, velocity, outgoing }; one engine Map holds all live slots. Selecting a target: the target slot is created, every existing droplet is re-targeted (flying ones get re-planned, absorbing ones convert their remaining mass and re-plan), then each other live pill emits droplets.
- Emission: droplet count = max(1, round(particleCount × available mass)) clamped to 32 total; each droplet takes an equal share of the source mass and leaves within a random window of ~16% of the base animation time. Droplet flight: a random duration = animationTime × (0.62–0.94) ± timeVariance × 0.3, and a cubic Bézier from the source pill through a burst point (spread × 1.6 × random 0.7–1.3, random angle) and an approach point (spread × 1.5 × random) into the target centre — control points create the arc; eased with a cubic in-out. Flight velocity feeds a short motion tail used both for the capsule SDF and the trail direction.
- Droplet lifecycle: waiting → flying (emerging over 0.09s while mass transfers out of the source) → absorbing (0.12s while the mass lands in the target pill); radius scales with emerge/absorb progress. The target pill's scale follows its mass through a spring: omega = 26, damping ratio = 1 − 0.72 × wobble (bounce on landing), integrated at 240Hz sub-steps; empty non-target slots are dropped from the map.
- Hover ghost: pointerover on an item records its rect; the ghost box eases toward it (rate 1/0.06s) and its alpha eases to 1 while hovering a non-active item (rate 1/0.08s). The ghost is painted by the shader, so it sits under the labels.
- Frame loop self-sleep: the loop keeps running only while droplets exist, more than one pill slot is alive, the target spring is unsettled (mass/scale delta > 8e-4, velocity > 4e-3), or the hover ghost is fading/moving; when settled, the target pill snaps to mass/scale 1 and one final render happens. ResizeObserver on the stage and the list re-measures item rects and settles; document.fonts.ready re-measures once; IntersectionObserver is not used — the loop is driven purely by settling.
- Reduced motion: wobble damping ratio forced to 1 (no overshoot), go() settles instantly with no droplets.
- Unmount: cancel the frame, disconnect observers, remove list listeners, delete buffer and program. Same-page instances are fully independent (own engine, own canvas, own filter of items).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { label: string; href?: string; icon?: ReactNode }[] | DEFAULT_ITEMS | The navigation items. Items without an href render as buttons. |
| initialActiveIndex | number | 0 | Which item starts selected (uncontrolled mode). |
| activeIndex | number | - | Controls the selected item yourself. Use it together with onChange. |
| onChange | (index: number, item) => void | - | Called when an item is selected. |
| theme | "dark" \| "light" | "dark" | Colour theme of the frame and text. |
| color | string | - | Colour of the active pill. Uses a high-contrast colour for the theme when not set. |
| activeTextColor | string | - | Text colour inside the pill. Picked automatically from the pill colour when not set. |
| colors | string[] | [] | Colours for the droplets. They blend as they merge. Uses the pill colour when empty. |
| size | "sm" \| "md" \| "lg" | "md" | Size of the items. |
| frame | boolean | true | Shows the frosted panel around the items. |
| animationTime | number | 600 | Roughly how long the droplets take to travel to the new item, in ms; floored at 150. |
| particleCount | number | 15 | How many droplets the pill breaks into when an item is selected; total capped at 32. |
| spread | number | 56 | How far the droplets scatter on their way to the new item, in px. |
| timeVariance | number | 300 | Random variation in each droplet's timing, in ms. |
| gooeyness | number | 0.5 | How readily the droplets and pills melt together, 0–1. |
| wobble | number | 0.5 | How much the new pill wobbles as it forms, 0–1. |
| hoverEffect | boolean | true | Shows a soft highlight behind the hovered item. |
| className | string | "" | Extra class names for the nav. |
| style | CSSProperties | - | Inline styles for the nav. |

## Delivery & validation

- Deliver the complete content of GooeyNav.jsx and GooeyNav.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the pill melts into droplets on every selection and reforms at the target with wobble; rapid multi-jump selections retarget in-flight droplets without leaks or stuck mass; the gooey bridging appears as droplets near the pills and vanishes when settled; the crisp active label appears exactly inside the liquid body and nowhere else; hover ghost follows between items; controlled and uncontrolled modes both work with onChange; href anchors navigate, "#" prevents default, no-href items render buttons; theme light/dark, custom pill colour with automatic contrast ink, droplet palette blending, sizes sm/md/lg, frame on/off; WebGL missing falls back to the plain pill with no errors; prefers-reduced-motion settles instantly; resizes and font loads keep rects aligned; unmount leaves no frame loop, observers or listeners; same-page instances are independent; 375 / 768 / 1440 wide without overflow.
