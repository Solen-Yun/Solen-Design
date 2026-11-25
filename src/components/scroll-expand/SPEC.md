Implement the "ScrollExpand" component from zero: a rounded media frame — image or looping muted video — that grows to full bleed as the user scrolls through a tall stage, then holds there while optional overlay content fades in. It drives everything from one progress value through a single clip-path inset on the frame and one scale on the media, with a big centre title that lifts away and a scroll hint that dissolves at the start. Works as its own hidden-scrollbar scroller or bound to the window scroll; progress can be smoothed with an exponential follower, and reduced motion snaps instantly. Full specification follows; it must not depend on external pages, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: ScrollExpand.jsx (entry, scroll engine) and ScrollExpand.css (all styles). React >= 18; no runtime dependencies. No iframe.
- Root is a `<div>` with class scroll-expand plus scroll-expand--scroller unless useWindowScroll is set, plus any className: position relative, width 100%, height 100%. The scroller variant adds overflow-y auto, overflow-x hidden, hidden scrollbars (scrollbar-width none, -ms-overflow-style none, ::-webkit-scrollbar display none) and overscroll-behavior contain — all scrolling happens inside it.
- Inside is a track `<div class scroll-expand__track>` (relative, full width) whose height the engine sets to stageHeight × (1 + max(0, scrollDistance) + max(0, holdDistance)) — the extra distances are the expand span and the fully-expanded hold span, both measured in stage heights. Inside the track, a stage `<div class scroll-expand__stage>`: position sticky, top 0, width 100%, overflow hidden, and a --se-title-size custom property (fallback 4rem) the engine keeps at clamp(width × 0.075, 20, 84) px.
- Inside the stage: the frame `<div class scroll-expand__frame>` (absolute inset 0, will-change clip-path, initial clip-path inset(21% 29% 21% 29% round 24px) matching the default start geometry) holding the media, a scrim, and the overlay; then the title and the hint as sticky-stage-level siblings.
- Media: mediaType "image" renders `<img class scroll-expand__media>` with src, alt, draggable false; mediaType "video" renders `<video class scroll-expand__media>` with src and poster, autoPlay, muted, loop, playsInline. The media class fills the frame (absolute inset 0, 100% × 100%, object-fit cover, will-change transform, transform-origin center, user-select none, -webkit-user-drag none) and the engine scales it. The scrim `<div class scroll-expand__scrim>` is an absolute overlay with a vertical black gradient (rgba(0,0,0,0.75) at the bottom through rgba(0,0,0,0.1) at 45% to rgba(0,0,0,0.35) at the top), pointer-events none, opacity engine-driven from 0.
- Overlay: when children are provided they wrap in `<div class scroll-expand__overlay>` — absolute inset 0, flex column centred, text-align centre, 6% padding, opacity 0, will-change opacity and transform. Title `<div class scroll-expand__title>` fills the stage, flex-centred, white text at var(--se-title-size), weight 700, letter-spacing −0.03em, line-height 1, text-shadow 0 2px 24px rgba(0,0,0,0.45), pointer-events none. Hint `<div class scroll-expand__hint>` sits 1.25rem above the bottom, centred, 0.8125rem text in rgba(255,255,255,0.55). Title and hint render only when their props are non-empty.

## Progress & phases

- One progress value p ∈ 0..1 drives every visual: span = stageHeight × max(0.01, scrollDistance); in scroller mode p = clamp(root.scrollTop / span, 0, 1); in window mode p = clamp(−track.getBoundingClientRect().top / span, 0, 1). When enabled is false, p is forced to 1 — the frame stays fully expanded regardless of scroll.
- applyProgress maps p with smoothstep e = t²(3 − 2t) over 0..1:
  - Frame: inset(ix% iy% ix% iy% round r px) where the horizontal inset ix = max(0, (100 − w)/2), vertical iy = max(0, (100 − h)/2), w = startWidth + (100 − startWidth) × e (% of stage width), h likewise with startHeight, and the radius r = startRadius + (endRadius − startRadius) × e (px). All percentages are relative to the stage, so the frame grows from a centred rounded portrait to a full-bleed rectangle.
  - Media: scale(mediaZoom + (1 − mediaZoom) × e) — it starts zoomed-in and relaxes to 1 as the frame grows, hiding the reveal.
  - Scrim: opacity = overlayScrim × e.
  - Title: fades out over p 0.4–0.88, rising 28px and scaling up 6% as it goes.
  - Hint: fades out over p 0–0.12, dropping 8px.
  - Overlay (children): fades in over p 0.68–1, rising 18px from below.
- Smoothing: the scroll handler only sets the target; a rAF follower moves current toward it with k = 1 − exp(−1 / (60 × smoothing)) per frame (smoothing 0 or negative means k = 1, instant). The follower sleeps once |target − current| < 0.0004. prefers-reduced-motion: reduce bypasses smoothing entirely — progress applies immediately on each scroll event.
- Measurement: on mount, window resize and ResizeObserver resize of the root, stageHeight = window.innerHeight in window mode, else root.clientHeight; the stage height is set explicitly and the track height recomputed; the title size variable updates from the stage width. Measurement also re-reads progress and snaps both current and target to it, so a resize never leaves a stale pose. Scroll listens on the root (scroller mode) or window (window mode), passive.
- Unmount: cancel the rAF, remove the scroll and resize listeners, disconnect the observer. The whole effect rebuilds when useWindowScroll changes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | "" | Media source URL (image or video). |
| mediaType | "image" \| "video" | "image" | What the frame contains. |
| poster | string | "" | Poster frame for the video type. |
| alt | string | "" | Alt text for the image type. |
| title | string | "" | Big centred title; empty renders nothing. |
| scrollHint | string | "" | Small hint above the bottom edge; empty renders nothing. |
| startWidth | number | 42 | Frame width at progress 0, % of stage width. |
| startHeight | number | 58 | Frame height at progress 0, % of stage height. |
| startRadius | number | 24 | Frame corner radius at progress 0, px. |
| endRadius | number | 0 | Frame corner radius at progress 1, px. |
| mediaZoom | number | 1.35 | Media scale at progress 0; eases to 1. |
| scrollDistance | number | 1.2 | Stage heights of scrolling used by the expand. |
| holdDistance | number | 0.35 | Extra stage heights held fully expanded after the expand. |
| smoothing | number | 0.1 | Exponential follow lag; 0 applies progress instantly. |
| overlayScrim | number | 0.45 | Peak opacity of the bottom-heavy scrim. |
| useWindowScroll | boolean | false | Bind to the window scroll instead of the built-in hidden-scrollbar scroller. |
| enabled | boolean | true | false pins progress to 1 (always expanded). |
| children | ReactNode | - | Overlay content revealed at full bleed. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |
| ...rest | - | - | Extra props spread onto the root. |

## Delivery & validation

- Deliver the complete content of ScrollExpand.jsx and ScrollExpand.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the frame grows from the centred rounded portrait to full bleed across the configured scroll span, holds expanded for the hold span, and reverses on scroll-up; the media de-zooms in sync and the scrim ramps to its peak; the title lifts away mid-expand, the hint dissolves in the first twelfth and the overlay rises in at full bleed; startWidth/startHeight/startRadius/endRadius/mediaZoom all reshape the journey; smoothing adds a soft catch-up lag while 0 and reduced motion apply instantly; disabled pins the full-bleed pose; the built-in scroller hides its scrollbar and contains overscroll, while useWindowScroll tracks the page scroll; the stage and track re-measure on resize without leaving stale poses; unmount leaves no rAF or listeners; video mode autoplays muted and loops; 375 / 768 / 1440 wide without horizontal overflow.
