Implement the "Crosshair" component from zero: a full-surface canvas overlay drawing a targeting crosshair that follows the cursor — full-width and full-height hairlines through the pointer with live x/y coordinate chips pinned to the edges, a gap around the intersection, optional line styles and edge fade, a lock mode that snaps aiming brackets onto links and buttons and measures their box, a glitch mode that shreds the lines when a target is entered, click pulse rings, and an option to hide the native cursor. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React 18+, Canvas 2D only, one file: Crosshair.jsx. No stylesheet, no runtime dependency, no iframe.
- The component renders two things: an inline `<style>` defining `.crosshair-cursor-hidden, .crosshair-cursor-hidden * { cursor: none !important; }` and a single aria-hidden `<canvas>`. Without a containerRef the canvas is position fixed inset 0 covering the window and listeners attach to the window/document; with a containerRef (a React ref to a host element) the canvas is position absolute inset 0 inside that host, listeners attach to the host, and leaving the host fades the crosshair out. The canvas always has pointer-events none, zIndex 10000, width/height 100% and the blendMode prop as mix-blend-mode; className and style land on the canvas.
- Ink resolution: the colour prop is parsed once through a probe canvas fillStyle into rgb + alpha; the parsed value is cached and re-parsed whenever the prop changes. Line alpha multiplies the ink alpha and the opacity prop.
- Crispness: lines snap to device pixels — the coordinate rounds to device pixels and shifts by half a device pixel when the line width in device pixels is odd; the backing store sizes from the canvas rect × DPR (clamped to 2).
- Frame budget: one requestAnimationFrame per instance that self-sleeps — it keeps running only while the crosshair is still converging (pointer target vs position, presence or lock alpha transitions, a locked box still moving, glitch > 0, pulses alive) and is woken by any pointer, scroll, resize or settings change. Resizes are coalesced into the next frame.

## Drawing

- Presence gates everything: it eases toward 1 while the pointer is inside (time constant 0.12s) and toward 0 when gone (0.25s); the first entry snaps the crosshair to the cursor so it never flies in from a corner. Touch pointers without pressed buttons do not enter; touch pointerup/cancel leaves.
- Hairlines: two segments each way through the (smoothed) pointer position, leaving the gap prop empty around the intersection; line width = thickness; dashed draws [6t, 5t] dashes, dotted uses round caps with zero-length dots spaced 4t; solid has no dash. With fade > 0 each line runs through a linear gradient that is dimmed (1 − fade) at the viewport/host edges and full strength at the cursor.
- Coordinates: while showCoordinates is on and no target is locked, a rounded chip (16px tall, 3px radius, solid ink fill, contrast text — near-black on light inks, white on dark inks, picked by luminance) pinned to the top edge above the cursor shows the x value and one pinned to the left edge shows the y value, both clamped inside the surface.
- Lock mode (targetEffect "lock"): every pointer move picks the closest ancestor matching targetSelector (default "a, button, [data-crosshair-target]", invalid selectors ignored, and scoped inside the host when one is set). Corner brackets (arm = min(14px, box/3)) draw around the target rect expanded by 6px, the box easing with a 0.085s time constant and the bracket alpha easing in over 0.08s and out over 0.14s. While locked the coordinate chips hide and a chip under the bracket shows the target's live width × height.
- Glitch mode: entering a target sets glitch to 1; the hairlines are then drawn as ~28px segments each jittered up to ±14px × glitch, decaying to 0 over 0.5s — the crosshair tears itself apart on the lock and re-forms as it decays. "none" disables targeting entirely.
- Click pulse: each pointerdown (unless reduced motion or clickPulse off) pushes a ring at the cursor that expands 3 → 33px over 0.55s with a cubic ease-out and fades with (1 − t)², stroke width clamped to at least the thickness; rings are removed after 0.55s.
- hideCursor: hides the native cursor by toggling the hidden class on the document element (or the host) while present, and draws a small ink dot (radius max(1.5, thickness × 1.5)) at the intersection.
- Smoothing: the drawn position follows the raw pointer with an exponential time constant of 0.008 + smoothing × 0.16 seconds; smoothing 0 snaps directly.
- Scroll: while inside, a capture-phase scroll listener re-picks the element under the last cursor position (elementFromPoint) so locks survive scrolling content.
- prefers-reduced-motion: reduce — all easing is removed (the crosshair snaps to the pointer, presence and locks snap in and out, glitch never fires, pulses are skipped).
- Unmount: cancel the frame, disconnect the ResizeObserver, remove pointer/scroll/window listeners, restore the native cursor and clear the wake handle. Instances on one page are fully independent; a settings effect on every render redraws with the latest props.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | "#ffffff" | Ink colour of lines, chips and brackets; any CSS colour. |
| containerRef | React ref (HTMLElement \| null) | null | Host element to scope the crosshair; null covers the whole window fixed. |
| thickness | number | 1 | Line width in px, clamped 0.5–8. |
| opacity | number | 0.85 | Overall alpha, clamped 0–1. |
| lineStyle | "solid" \| "dashed" \| "dotted" | "solid" | Hairline dash pattern. |
| gap | number | 0 | Empty hole around the intersection, in px. |
| fade | number | 0 | 0–1 dimming of the line ends toward the edges. |
| smoothing | number | 0.35 | 0–1 lag of the crosshair following the cursor; 0 snaps. |
| showCoordinates | boolean | true | Live x/y chips pinned to the top and left edges. |
| targetEffect | "lock" \| "glitch" \| "none" | "lock" | Behaviour over links and buttons. |
| targetSelector | string | "a, button, [data-crosshair-target]" | Selector for lockable targets. |
| clickPulse | boolean | true | Expanding ring on every press. |
| hideCursor | boolean | false | Hides the native cursor and draws an ink dot. |
| blendMode | string | "normal" | Canvas mix-blend-mode. |
| className | string | "" | Extra class names for the canvas. |
| style | CSSProperties | - | Inline styles for the canvas. |

## Delivery & validation

- Deliver the complete content of Crosshair.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. No runtime dependency beyond React.
- Validate: hairlines track the cursor with smoothing and snap crisp at device pixels; gap opens a hole at the intersection; dashed and dotted render their patterns; fade dims the far ends; x/y chips follow and clamp at the edges; hovering a link or button snaps the brackets with the size chip, and coordinates hide while locked; glitch shreds the lines on target entry and re-forms; none disables targeting; clicks pulse; hideCursor hides the native cursor (host or window) and draws the dot; containerRef scopes listeners and the canvas to the host and leaving fades out; touch does not stick the crosshair; scrolling keeps the lock on the element under the cursor; reduced motion snaps everything without glitch or pulses; unmount restores the cursor and removes listeners; 375 / 768 / 1440 wide without overflow.
