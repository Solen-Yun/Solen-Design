Implement the "GlareHover" component from zero: a wrapper that lays a glossy light streak across any content and sweeps it across the panel in the direction the cursor travels — entering throws the glint across from the side the cursor arrived on, leaving throws it out the other side. A `follow` mode makes the band track the pointer instead, a `click` mode flashes on press, and a `loop` mode sweeps on a timer. The streak is a 33-stop gradient band generated in JS from profile curves, painted over the content with a blend mode, with an optional rim glint that rides only the 1px border ring. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: GlareHover.jsx (entry, gradient generation, motion engine) and GlareHover.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class `glare-hover` plus any className: position relative, display inline-grid, vertical-align top, place-items center, width var(--gh-width), height var(--gh-height), background var(--gh-bg), border 1px solid var(--gh-border), border-radius var(--gh-br), overflow hidden, isolation isolate. The component's children render as the panel content. All skin comes from inline CSS variables set on the root: --gh-width, --gh-height, --gh-bg, --gh-br, --gh-border, --gh-blend, plus the two generated gradients --gh-glare (band) and --gh-rim (rim glint); the caller's style object merges after these so it can override anything.
- Above the content sits an aria-hidden glare layer `<span class glare-hover__glare>`: absolute inset 0, z-index 2, border-radius inherit, mix-blend-mode var(--gh-blend), pointer-events none, and opacity 0 in CSS — JS drives the visible opacity every frame. Inside it:
  - a band `<span class glare-hover__band>`: absolute at top 50% / left 50%, background var(--gh-glare), will-change transform. JS positions it each frame with `translate(-50%, -50%) rotate(angle - 90deg) translateX(pos px)` and sizes it to band-thickness px × (diagonal + band-thickness) px — a long bar lying along the glare axis, long enough to cover the box at any rotation.
  - when rimGlint is on, a rim `<span class glare-hover__rim>`: absolute inset 0, padding 1px, border-radius inherit, masked with two mask layers (mask-image two full-size black gradients, mask-clip content-box/border-box, mask-composite exclude; the -webkit- prefixed equivalents too) so only the outer 1px ring of the panel paints. Inside it a second band with background var(--gh-rim) that mirrors the main band's transform every frame — a glint that slides around the border ring in sync with the main streak.
- Gradient generation (both --gh-glare and --gh-rim are recomputed on every render): a `linear-gradient(90deg, …)` with 33 stops at t = i/32 for i in 0..32. Each stop's alpha percentage = round(min(1, profile(t, softness) × opacity) × 1000) / 10, written as `color-mix(in srgb, <glareColor> <alpha>% , transparent) <t×100>%` at one decimal. The rim gradient uses min(1, glareOpacity × 1.8) as its opacity so the rim glints brighter than the band.
- Profiles use smootherstep(t) = t³·(t·(6t − 15) + 10) and bump(t, center, half) = 0 when |t − center| ≥ half, else smootherstep(1 − |t − center| / half):
  - streak: one bright narrow core, bump(0.5, 0.06 + 0.16 × softness), over a faint broad base 0.32 × bump(0.5, 0.5) that keeps a soft sheen across the whole panel while the core passes.
  - twin: a main bump at 0.36 (half 0.08 + 0.18 × softness) plus a thinner satellite at 0.7 at 0.85 strength (half 0.03 + 0.06 × softness) plus the broad base at 0.26 — two streaks travelling together, one leading one trailing.
  - sheen: a wide soft sheet, 0.55 × bump(0.5, 0.25 + 0.25 × softness) over the broad base at 0.3 — a curtain of light rather than a line.
  An unknown variant falls back to streak.

## Motion engine

- One rAF-driven engine per instance, started lazily on any interaction ("wake") and self-sleeping when nothing moves; all mutable state lives in refs, so re-renders never restart the animation and the children never remount.
- Geometry is measured on mount, on ResizeObserver resize of the root, and whenever glareAngle, glareSize or rimGlint changes: unit vector u = (sin θ, −cos θ) from glareAngle in degrees; diagonal = hypot(clientWidth, clientHeight); band thickness = max(8, diagonal × glareSize / 100) px; reach = (|width·ux| + |height·uy|) / 2 + band/2 + 2 px — the travel range that carries the band fully past the box on both sides. Both bands get width = band thickness, height = diagonal + band thickness. While no sweep is active (and mode is not follow), the band parks at −reach or +reach, whichever side it last rested on, so it sits out of sight.
- A sweep animates pos from `from` to `to` (= sign × reach) with duration = max(120, transitionDuration × share), where share = |end − from| / (2 × reach) — shorter crossings are proportionally faster. Easing is cosine ease-in-out, (1 − cos(πt)) / 2. A sweep requested mid-flight continues from the current position rather than restarting.
- The frame loop writes the shared transform to both bands and the glare layer's opacity every frame, then continues only while a sweep is in flight or the follow spring / presence fade has not settled.
- prefers-reduced-motion: reduce disables every sweep — hover enter/leave, click, loop and intro all become no-ops — and forces the follow mode's presence target to 0, so the glint never appears or animates.

## Interaction modes

- mode "hover" (default): pointerenter projects the cursor onto the glare axis and sweeps from that side across to the other (projection > 0 → sweep toward −reach, else toward +reach); pointerleave sweeps out toward the side the cursor left. With playOnce set, the leave sweep is skipped — the glint crosses once on enter and stays off.
- mode "follow": the band tracks the pointer's projection on the glare axis, clamped to ±reach, through a spring (stiffness 170, damping 24) integrated in sub-steps of at most 1/120 s. Presence fades in on enter (exponential approach, tau 0.18 s) and out on leave (tau 0.4 s); on first enter the band snaps to the cursor instead of flying in. The glare layer's opacity equals presence, so in this mode the whole sheen fades in place rather than only moving.
- mode "click": pointerdown sweeps across once, again starting from the side the cursor is on.
- mode "loop": a self-rescheduling timer (cleared and re-armed after every fire) runs a full sweep toward +reach every max(0.5, interval) seconds, but only fires while the element is ≥ 40% visible (IntersectionObserver) and the document is not hidden; the timer itself keeps rescheduling regardless so it picks visibility back up.
- Keyboard: for non-follow modes, focusin on a descendant matching :focus-visible triggers a sweep toward +reach, so tabbing through buttons inside the panel shows the glint.
- intro: when true, the first time the element becomes ≥ 40% visible one sweep plays, guarded to once per mount.
- Unmount: cancel the frame, clear the loop timer, disconnect the resize and visibility observers, remove all pointer and focus listeners. Changing `mode` re-runs the whole setup from scratch.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | number \| string | "auto" | Panel width; numbers become px. |
| height | number \| string | "auto" | Panel height; numbers become px. |
| background | string | "transparent" | Panel background, any CSS colour or gradient. |
| borderRadius | string | "10px" | Panel corner radius. |
| borderColor | string | "transparent" | Colour of the 1px border. |
| children | ReactNode | - | The content the glare sweeps over. |
| glareColor | string | "#ffffff" | Colour of the light streak. |
| glareOpacity | number | 0.5 | Peak opacity of the streak, 0–1. |
| glareAngle | number | -45 | Direction the streak travels, in degrees. |
| glareSize | number | 30 | Streak thickness as a percentage of the panel diagonal. |
| softness | number | 0.6 | How soft the streak profile is, 0–1. |
| variant | "streak" \| "twin" \| "sheen" | "streak" | Preset shape of the streak profile. |
| blendMode | string | "screen" | mix-blend-mode of the glare layer. |
| rimGlint | boolean | true | Adds a matching glint that slides along the 1px border ring. |
| mode | "hover" \| "follow" \| "click" \| "loop" | "hover" | What triggers a sweep. |
| transitionDuration | number | 650 | Base duration of one full crossing, in ms; scaled by travel share, floored at 120. |
| interval | number | 3 | Seconds between sweeps in loop mode, floored at 0.5. |
| playOnce | boolean | false | Hover mode sweeps once on enter and does not sweep out on leave. |
| intro | boolean | false | Plays one sweep the first time the panel is ≥ 40% visible. |
| className | string | "" | Extra class names for the panel. |
| style | CSSProperties | {} | Inline styles for the panel. |

## Delivery & validation

- Deliver the complete content of GlareHover.jsx and GlareHover.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: entering from the left sweeps left-to-right and from the right sweeps right-to-left at the default −45° angle, and the mirrored behaviour holds after changing glareAngle; leaving sweeps out the near side; playOnce keeps the glint from sweeping out; follow mode tracks the cursor with spring lag and fades out on leave; click fires one crossing per press; loop fires on its interval, pauses while off-screen or the tab is hidden and resumes after; rim glint slides along the border in sync and is absent when rimGlint is false; streak / twin / sheen look distinct and softness visibly widens them; blend modes such as screen and overlay composite over photos and flat colours without clipping the content; the panel clips the band at its rounded corners; focus-visible on an inner button sweeps; prefers-reduced-motion produces no sweep at all; resizing the panel keeps the band sized to the new diagonal; unmount leaves no frame loop, observers or timers; two instances on one page run independently; works at 375 / 768 / 1440 wide without overflow.
