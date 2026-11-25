Implement the "RefineFrame" component from zero: a media frame that presents an image as if it is being generated — five statuses (queued, generating, refining, complete, error) each blur/desaturate/scale/opacity the media differently, and while progressing a canvas mosaic resolves the image from coarse pixel blocks to full detail with a soft sweep edge and glint travelling down the frame, with zero layout shift. When complete, the status chip auto-hides; on error, a retry button appears. Pure React + CSS, two files, icon glyphs from a React icon package; the image is supplied by the caller as children. It must not depend on external pages, videos or font files.

## Structure & rendering

- Two files: RefineFrame.jsx (entry, mosaic simulation, chip) and RefineFrame.css (all styles). Dependencies: React >= 18 plus a React icon package for the chip marks (tick, alert, loading) and the retry glyph; no other runtime deps. No iframe.
- Root is a `<div class="refine-frame">` (plus caller className), `role="img"` with aria-label = the current status label, `aria-busy` while active, width min(width px, 100%), aspect-ratio from the aspectRatio prop (any CSS value), radius, background var, 12px/500 ink text. Inline CSS variables: `--rf-w`, `--rf-aspect`, `--rf-radius`, `--rf-bg` (background), `--rf-ink` (colour), `--rf-stage` (stageDuration ms), plus per-status tokens `--rf-blur`, `--rf-sat`, `--rf-scale`, `--rf-opacity`. Data attributes: `data-status`, `data-active` (queued/generating/refining), `data-sweep` (sweep enabled and active), `data-mosaic` (canvas visible), `data-resolved` (mosaic finished).
- Children in order: a `refine-frame__media` layer (absolute inset 0, carrying the per-status blur/saturate/scale/opacity via CSS variables with a stageDuration transition) that holds the caller's children in a `refine-frame__print` div (its direct children are stretched to 100% × 100% with object-fit cover) plus a `<canvas class="refine-frame__mosaic">` absolutely on top; a `refine-frame__sweep` overlay (115deg gradient sheen band built from the ink colour, background-size 260%, animated 2.2s linear infinite from background-position 130% to −130% while data-sweep and not yet mosaic); an optional status chip (bottom-left, 26px tall pill of 72% translucent background + backdrop blur(8px), holding a 13px mark icon and a label span that fades in with a 200ms blur reveal on each status change via its key); an optional retry button (only for status error with onRetry; centred pill of ink-mixed background, refresh glyph + retryLabel, hover lightens, active scales 0.96); and a visually hidden `role="status"` span mirroring the label.
- Stage presets: queued → blur 4, sat 0.6, scale 1.04, opacity 0.55 (plus a 2.4s breathing opacity animation 0.45↔0.65); generating → blur 1.5, sat 0.8, scale 1.02, opacity 0.85; refining → blur 0.5, sat 0.95, scale 1.005, opacity 1; complete → all neutral (blur 0, sat 1, scale 1, opacity 1); error → blur 2, sat 0.5, scale 1, opacity 0.28. The chip shows a spinning loading mark for active statuses, a tick for complete, an alert in a red token (#ef4444) for error. Default labels: Queued / Generating / Refining / Ready / Failed; the labels prop merges over them.

## Mosaic resolution

- When the image (the first `<img>` inside the print div) loads — immediately if already complete, otherwise on its load event — the canvas takes over: the print layer hides (opacity 0 via data-mosaic) and the canvas paints. The image is drawn cover-cropped to the canvas at DPR ≤ 2 into 9 pyramid levels: full-quality level plus 8 pre-rendered pixelated versions (block sizes 48, 32, 20, 12, 8, 5, 3, 2 px scaled by DPR, drawn via downscaled offscreen canvases with smoothing disabled on the upscale so blocks stay crisp). The pyramid rebuilds only when the image source or canvas size changes.
- Progress: a normalized 0→1 value advances toward a per-status target (queued 0, generating 0.5, refining 0.875, complete 1) at a rate of one level per stageDuration across 9 levels; regressions snap back instantly. While between levels the canvas draws the coarser level fully, then the finer level above the resolution front: a front edge of 28px (DPR-scaled) divided into 14 strips, each strip of the finer level alpha-blended by a smoothstep weight so the boundary dissolves; when sweep is on and motion allowed, a white gradient glint (two bars, alpha 0.12 and 0.3) rides the front.
- Resolved: when progress reaches 1, `data-resolved` swaps the layers — the print (real image) fades back in and the canvas fades out over stageDuration. The frame loop self-sleeps: it keeps requesting frames only while the status is active and motion is allowed or progress hasn't reached its target; it wakes on status/width/aspect changes, image load, and re-renders once when settled. Reduced motion is watched live via matchMedia: progress jumps to target instantly, the sweep band, glint, breathing and chip spinner stop.
- The status chip is controlled by showStatus; when status is complete and hideAfter > 0 the chip auto-hides after hideAfter ms (timers cleaned on change/unmount). Chip and retry enter animations use CSS @starting-style so first mount also fades in.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | "queued" \| "generating" \| "refining" \| "complete" \| "error" | "generating" | Current generation stage; drives the media treatment and mosaic target. |
| children | ReactNode | - | The media; its first `<img>` feeds the mosaic pyramid. |
| aspectRatio | string | "4 / 3" | CSS aspect-ratio of the frame. |
| width | number | 320 | Frame width, px (capped at 100%). |
| radius | number | 16 | Corner radius, px. |
| background | string | "#27272a" | Frame background (also tints the chip). |
| color | string | "#f5f5f5" | Ink colour for the sweep sheen and text. |
| stageDuration | number | 400 | Duration of the media treatment transitions and mosaic level time, ms. |
| sweep | boolean | true | Shows the travelling sheen band while active. |
| showStatus | boolean | true | Shows the status chip. |
| hideAfter | number | 1200 | Auto-hide delay for the chip after complete, ms; 0 keeps it. |
| labels | Partial<{ queued, generating, refining, complete, error: string }> | DEFAULT_LABELS | Per-status chip and aria labels. |
| retryLabel | string | "Retry" | Retry button text. |
| onRetry | () => void | - | Presence enables the retry button on error. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of RefineFrame.jsx and RefineFrame.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: stepping queued → generating → refining → complete resolves the image from blocks to full detail with the dissolve front and glint, then swaps to the crisp image with zero layout shift (the frame never changes size); regressions to an earlier status snap the mosaic back instantly; complete auto-hides the chip after hideAfter; error dims the media, shows the alert chip and the retry button which fires onRetry; labels merge and change with a blur-in; aspectRatio and width render without distortion; children without an img disable the mosaic cleanly; reduced motion jumps progress, stops sweep/glint/breathing/spinner; the frame loop sleeps when settled and cancels on unmount; 375 / 768 / 1440 wide without overflow.
