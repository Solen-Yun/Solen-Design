Implement the "CircularGallery" component from zero: an infinitely looping horizontal film-strip of rounded photo cards rendered in WebGL2, laid along a bendable arc — drag it, wheel it or step through it with arrow keys, and cards ripple like paper when the strip moves fast; clicking a card slides it to the centre, grows it to show the full image, dims the rest and reveals its description, and clicking again, the background, the close button or Escape folds it back. Titles ride under each card as DOM text. Full specification follows; it must not depend on external pages, videos, or off-the-shelf effect components.

## Structure & rendering

- Two files only: CircularGallery.jsx (entry, WebGL2 engine, arc layout, input state machine) and CircularGallery.css (all styles). React >= 18, no runtime dependencies. WebGL2 required; without a context or a linked program the component renders nothing (early return).
- Root is a `<div>` with class circular-gallery (+extra className): relative, width/height 100%, overflow hidden, touch-action pan-y, cursor grab (pointer over a card via data-pointer, grabbing via data-dragging); carries role="region", aria-roledescription="carousel", aria-label="Image gallery", plus any rest props. Inline color is set from textColor so inherited UI (labels, close button) follows it.
- Children in paint order: an aria-hidden canvas sized to the container × dpr (dpr prop or devicePixelRatio, clamped to 2); an aria-hidden labels layer; a caption block for the open card's description; a 40px round close button at the top-right (opacity 0.8 when open, pointer-events and tabIndex only while open, aria-label "Close"); a visually hidden list of buttons (one per item, roving tabIndex on the active one, aria-label "<text or alt>, i of n", aria-current on active) that is the keyboard surface; and a visually hidden aria-live="polite" region announcing "<label> opened" when a card opens.
- One shader program, one 32×24-segment grid mesh drawn once per visible card. Fragment pass draws a rounded-box SDF with cover-cropped texture, mixes from a flat placeholder colour (textColor) into the photo as its texture readiness rises (0.45s per texture, instant under reduced motion), applies luma grayscale (grayscale prop; the active, hovered or keyboard-focused card stays coloured), dims the backdrop by 0.4 × open progress, and strokes a 2px ring 5px outside the card edge in textColor — the ring only eases in around the active card while navigating by keyboard. A first pass re-draws every card's SDF offset downward with the same geometry to paint a soft drop shadow (strength shadow, blur = max(10, 9% of card height), fade strength 0.45 × blur); edge fading smooths both passes out over fadeEdges of the viewport width.
- Vertex pass bends the quad: cards rotate around their centre by the arc angle, and a wave term — wave × (sin(x·4 + t) + cos(y·2 + t)) × 0.5 × the scroll speed factor (wave × speed × 8% of viewport height, speed = |velocity| / 4 spacings clamped 0–1, zero under reduced motion) — displaces z so fast scrolls make the cards flex like paper and then relax.

## Arc, layout & looping

- bend (default 3) curves the strip: the ends leave the straight line by an arc computed from a circle through the half-width and a depth of |bend| × 8.3% of the viewport height (world height constant 16.57); positive bend dips the ends downward, negative lifts them upward, and every card rotates to stay perpendicular to the curve. bend 0 is a straight strip.
- Card size: height = 0.6 × viewport height × itemSize (0.2–2), width = height × itemAspect (0.2–5), scaled down as a unit to fit 82% of the viewport width; spacing = card width × (1 + gap). The strip is infinite: slots wrap modulo the item count, so the same photos cycle forever in both directions.
- Titles: a pooled set of absolutely positioned spans (pool size ≈ viewport width / spacing + 8) is recycled by slot; each label sits below its card (offset h/2 + 1.1 × font size), rotates with the card angle, uses the font prop verbatim, fades with the card alpha and the edge fade, and enlarges toward the caption size as its card opens. showTitles off hides them. Captions for the open card: description text centred above the frame, 80% of caption size, weight 400.
- Opening: the focused card's frame is computed from its texture aspect plus space for title and description (52px when present), clamped inside 6% viewport margins; focus eases per card (rate 0.16s) mixing position to centre, size to frame, angle to 0; non-focused cards spread away from the centre by frame-width-dependent push, fade to 0.12 alpha and dim. open eases at rate 0.14s.
- Entrance: intro on plays a 1.4s staggered reveal — cards rise 18% of their height into place and fade in one after another from the leading edge (order × 0.22), while the strip slides in from one extra 1.6 spacings; skipped instantly under reduced motion.

## Motion & input

- Scroll state eases toward target with follow = 1 − (1 − scrollEase)^(dt·60) (scrollEase clamped 0.001–1); velocity is the eased derivative, driving the wave. Wheel: preventDefault, adds delta (line/page deltaModes normalised) × scrollSpeed/2, and snaps to the nearest slot 140ms after the last event. Drag: 6px slop, vertical intent cancels on touch, pointer capture taken; target follows the drag 1:1 × scrollSpeed/2; release flings by projecting the sampled velocity (× 0.18) before snapping. snap off only skips snapping while closed (an open gallery always keeps its slot).
- autoScroll: after 1.8s without input, and only while no drag, no hover, no keyboard focus and nothing open, the target advances autoScroll × spacing × 0.25 per second (any sign; 0 disables). Clicking empty space closes an open card; clicking a card fires onItemClick(item, index) and, when openOnClick is on, opens it (a second click on the open card closes).
- Keyboard: ArrowRight/ArrowDown step +1, ArrowLeft/ArrowUp −1, Home/End jump to the strip ends (all preventDefault); Escape closes an open card. Focusing a hidden list button scrolls that card to centre (without announcing) and puts the ring in keyboard mode; a pointer press clears keyboard mode. The active card index (nearest slot) updates state and fires onActiveChange(index) whenever it changes.
- Hover: pointermove hit-tests cards top-down in card-local rotated space; the hovered card lifts 4% and holds colour in grayscale mode; the pointer cursor appears only over cards.
- Fonts: the font prop is a CSS font shorthand ("bold 30px Figtree" by default); when a fontUrl is provided — or the default font is used — the engine fetches the stylesheet (or font file), registers each FontFace it declares, and re-renders once resolved; any failure silently keeps the shorthand.
- Textures are cached per image URL (crossOrigin anonymous, mipmaps, anisotropic filtering up to 8×) and pruned when items drop them; resize re-measures the canvas and rescales scroll/target so positions survive width changes. The loop self-sleeps when scroll, open, ring, hovers, texture reveals and the intro are all settled; it also stops offscreen and in hidden tabs, resuming on return. Unmount: cancels the frame, clears timers, disconnects observers, removes every container/document listener, empties the label layer, deletes textures, program, buffers and the VAO, and releases the WebGL context if the canvas is already detached. prefers-reduced-motion snaps all easing to 1, disables the wave and the intro.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { image: string; text?: string; alt?: string; description?: string }[] | DEFAULT_ITEMS | The gallery photos with caption text and an optional description shown when the card opens; twelve placeholder photos ship as the default; exact default artwork ships with the code. |
| bend | number | 3 | Arc curvature; positive dips the ends downward, negative lifts them, 0 is straight. |
| textColor | string | "#ffffff" | Colour of titles, the keyboard ring, the placeholder fill and the close button. |
| borderRadius | number | 0.05 | Card corner radius as a fraction of the smaller card side, clamped 0–0.5. |
| font | string | "bold 30px Figtree" | CSS font shorthand for the titles; the px value scales all label sizes. |
| fontUrl | string | - | URL of a font stylesheet or font file to register before rendering; failures fall back to the shorthand. |
| scrollSpeed | number | 2 | Multiplier on wheel and drag distance. |
| scrollEase | number | 0.05 | 0.001–1; how quickly the strip chases its target, higher is snappier. |
| itemSize | number | 1 | 0.2–2 scale of card height relative to the viewport. |
| itemAspect | number | 0.78 | Card width ÷ height, clamped 0.2–5. |
| gap | number | 0.26 | Space between cards as a fraction of card width. |
| wave | number | 1 | How strongly fast scrolling ripples the cards, floored at 0. |
| fadeEdges | number | 0.12 | Fraction of the viewport width over which cards and titles fade at the edges, 0–0.5. |
| shadow | number | 0.25 | Drop shadow strength under the cards, 0–1. |
| grayscale | boolean | false | Rests the strip in grayscale; the active, hovered or keyboard-focused card stays coloured. |
| showTitles | boolean | true | Shows the caption text under each card. |
| snap | boolean | true | Settles onto the nearest card after dragging and wheeling. |
| autoScroll | number | 0 | Cards per second of slow automatic advance after 1.8s idle; 0 disables, negative reverses. |
| openOnClick | boolean | true | Clicking a card slides it to the centre and enlarges it; off leaves clicks as selection only. |
| intro | boolean | true | Plays the staggered entrance on mount; skipped under reduced motion. |
| onItemClick | (item, index: number) => void | - | Called when a card is clicked without a drag. |
| onActiveChange | (index: number) => void | - | Called whenever the centred card changes. |
| dpr | number | - | Overrides the device pixel ratio for the canvas, clamped to 2. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of CircularGallery.jsx and CircularGallery.css plus install steps (react, react-dom) and a minimal usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the strip loops forever in both directions with wrapping slots; drag, wheel and arrow keys all move it and it snaps to cards; fast scrolls ripple the cards and slower ones relax them; bend 0/positive/negative reshape the arc live; clicking a card centres and enlarges it, dims the rest, shows its description and the close button, and Escape/background/second click/X all close; keyboard navigation draws the ring around the active card and hidden buttons keep a roving tabindex; titles rotate with the cards and fade at the masked edges; grayscale keeps the focused card coloured; textures fade in from the placeholder and prune when items change; resize keeps positions; reduced motion snaps everything; no WebGL2 renders nothing without errors; unmount leaves no frame loop, observers, listeners, GL objects or context; 375 / 768 / 1440 wide without overflow.
