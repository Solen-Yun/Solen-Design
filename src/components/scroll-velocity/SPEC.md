Implement the "ScrollVelocity" component from zero: a stack of seamless marquee rows whose pace and direction react to the user's scrolling — scroll one way and the rows speed up in their travel direction, scroll the other way and they reverse — with optional velocity-driven skew and stretch, hover pause, direct dragging with fling, edge fading and alternating outline rows. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + the motion animation library, two files only: ScrollVelocity.jsx (entry, per-row velocity engine, drag model) and ScrollVelocity.css (all styles). React >= 18. No iframe. File starts with a `'use client'` directive.
- The default export is the ScrollVelocity section: width 100%; hover is tracked on the section for pauseOnHover; with fadeEdges on, the section carries a fixed 18-stop linear-gradient mask that smootherstep-fades the outer 12% on each side. Every entry of texts renders one VelocityText row; odd rows run at −velocity (opposite direction) and, with outlineAlternate on, render transparent fill with a max(1px, 0.028em) currentColor stroke.
- Each row is a wrapper div (parallaxClassName, default "parallax": position relative, overflow hidden) holding a motion.div scroller (scrollerClassName, default "scroller": flex, white-space nowrap, centred text, sans-serif, 2.25rem bold, letter-spacing −0.02em, a subtle drop shadow, scaling to 5rem/5rem at ≥768px widths). The scroller carries the x translation, skewX and scaleY motion values plus the type style — fontSize (a number becomes px, with line-height 1), fontWeight, color and the outline treatment — merged with scrollerStyle; wrapperStyle merges onto the wrapper.
- The scroller holds numCopies (default 6) spans of the same content — each span is the text plus a non-breaking space, plus an optional separator node wrapped with a horizontal margin of gap/2 when set; without a separator the gap becomes paddingRight on each span. Only the first span is measurable; the rest are aria-hidden.
- The x position wraps into [−copyWidth, 0) px where copyWidth is the measured first span width (ResizeObserver on borderBox, falling back to a resize listener), making the strip loop seamlessly whatever its width.

## Velocity engine

- A per-row useAnimationFrame drives the loop (skipped entirely under reduced motion). Base movement is directionFactor × baseVelocity × delta seconds, where directionFactor flips to −1 when the smoothed scroll velocity goes negative and back to 1 when positive. On top of that, movement multiplies by (1 + velocityFactor): the scroll position (of scrollContainerRef when given, otherwise the page) feeds useVelocity, a spring smooths it with the damping/stiffness props (default 50/400), and velocityMapping (default input [0, 1000] → output [0, 5], unclamped) turns it into the multiplier — hard scrolling with the grain can push the rows to ~6× speed, scrolling against flips them.
- A pace level eases toward 0 when dragging or (with pauseOnHover) hovered, and back to 1 otherwise, with rate exp(−delta/150 ms), so pauses fade in rather than snap.
- Dragging (draggable on): the wrapper gets cursor grab, user-select none and touch-action pan-y; a pointerdown (left button only) captures the pointer and switches to grabbing, every move applies dx directly to the strip while tracking pointer velocity (exponential blend over ~50 ms) and total travel, and release imparts a fling of the tracked velocity clamped to ±5000 px/s — unless the pointer rested for over 90 ms, which kills the fling. The fling decays exponentially (τ = 420 ms) and cuts off below 4 px/s. A drag that travelled more than 6 px suppresses the ensuing click in capture phase.
- Velocity-driven deformation: with skewWithVelocity (degrees) and scaleWithVelocity on, a surge = max(tanh(|smoothed scroll velocity| / 1600) × pace, tanh(|throw speed| / 2000)) drives a skew toward −heading × skew × surge and a stretch toward 1 + scale × surge, where the heading prefers the throw direction, then the strip's travel direction. Both ease at rate exp(−delta/110 ms) and snap back to 0/1 below a small epsilon.
- Reduced motion: the animation frame returns early, so rows stay static; everything else keeps working.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| texts | ReactNode[] | [] | One marquee row per entry; odd rows travel opposite. |
| velocity | number | 100 | Base speed of even rows in px/s; odd rows run at −velocity. |
| scrollContainerRef | RefObject | - | The scroll source to track; defaults to the page scroll. |
| className | string | "" | Extra class for each copy span. |
| damping | number | 50 | Spring damping of the smoothed scroll velocity. |
| stiffness | number | 400 | Spring stiffness of the smoothed scroll velocity. |
| numCopies | number | 6 | How many copies of each text loop in a row. |
| velocityMapping | { input: number[]; output: number[] } | { input: [0, 1000], output: [0, 5] } | How scroll velocity maps to the speed multiplier; unclamped. |
| parallaxClassName | string | "parallax" | Class for each row wrapper. |
| scrollerClassName | string | "scroller" | Class for each moving strip. |
| parallaxStyle | CSSProperties | - | Inline styles for each row wrapper. |
| scrollerStyle | CSSProperties | - | Inline styles for each moving strip. |
| separator | ReactNode | "" | Node inserted between repetitions of the text. |
| pauseOnHover | boolean | false | Eases the rows to a stop while hovered. |
| fadeEdges | boolean | false | Fades the outer 12% of the section on each side. |
| skewWithVelocity | number | 0 | Degrees of velocity-driven skew at full surge. |
| scaleWithVelocity | number | 0 | Extra scale at full surge (1 + scale × surge). |
| outlineAlternate | boolean | false | Renders odd rows as stroked outline text. |
| gap | number | 0 | Space between repetitions in px (padding without a separator, margin around one). |
| fontSize | number \| string | - | Font size; a number becomes px. |
| fontWeight | number \| string | - | Font weight. |
| color | string | - | Ink colour of the rows. |
| draggable | boolean | false | Rows can be grabbed, dragged and flung. |

## Delivery & validation

- Deliver the complete content of ScrollVelocity.jsx and ScrollVelocity.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: rows marquee seamlessly at base velocity with no visible seam at any copy width; scrolling with the grain accelerates them and against the grain reverses direction; velocity, damping, stiffness and velocityMapping reshape the response; both a container ref and page scroll drive it; pauseOnHover eases to a stop and resumes; dragging follows the pointer exactly, flings on release and kills the fling after a hold; skew and stretch ramp with scroll and throws and settle back; outlineAlternate styles odd rows; separator and gap space repetitions; fadeEdges masks both sides; reduced motion freezes the rows; suppressed clicks after drags do not fire; unmount leaves no observers or loops; multiple rows and instances run independently; no horizontal overflow at 375 / 768 / 1440 wide.
