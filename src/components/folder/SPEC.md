Implement the "Folder" component from zero: a 3D desk folder whose flap drops open (or whose cover swings open like a book), peeking its paper pages when hovered; pages can be clicked to zoom, dragged off the desk, and dropped back in with a receiving animation. A glass variant renders the front pane as a real refracting glass lens over the contents via WebGL2. Pure React + CSS + WebGL2, two files: Folder.jsx (entry, spring engine, glass renderer) and Folder.css (all styles). React >= 18; no runtime dependencies. No iframe, no external assets.

## Structure & rendering

- Root is `<div class="folder-root">` with data attributes: mode (flap | book), variant (solid | glass | matte), theme (dark | light), data-open, data-draggable, data-dragging, data-gl (glass + GPU). Geometry derives from the size prop (scale, min 0.3): flap folders are 224 × 176 × scale with a 20 × scale tab; book folders are 180 × 232 × scale (portrait). Colors derive from the color prop via a canvas-probe parser: base = color, front face a 160° gradient of color lightened/darkened, inside a vertical gradient of slightly darkened tones, paper derived from paperColor with three derived ink tones, tab ink picked by luma. Everything sizes through CSS variables (--folder-w/h/tab-h/front-h/doc-w/doc-h/scale/frost/depth and the palette).
- The stage (`.folder-stage`, role="button", tabIndex 0, aria-expanded, aria-label "<label> folder", cursor pointer) holds, in paint order: a ground shadow layer (flap: a blurred ellipse under the front; book: a sharp rounded slab plus a moving cast shadow while the cover is beyond 90°), the back layer (a tab path — shoulders + rounded tab positioned left/center/right per tabPosition, sized from the hidden measure of the label text — clipped fill, a gutter gradient on the left that fades in as the book opens, an SVG rim path that also serves as the keyboard focus outline, and the tab label text), the item layers (up to 6), the book-mode front shade (a blurred dark gradient stretched across the opening edge), the front layer (outer face; book mode adds an inner face with its own gutter, swapped when the cover passes 90°, plus a glint/dim overlay driven by cover angle), and — glass variant with GPU — an oversized `<canvas>` rendering everything through the lens (below).
- Items come from `children` (elements), `items` (objects: title/description render a generated paper document card — title, optional description, ruled lines and a block; image renders a photo card; content renders custom markup), falling back to three default titled documents. Each item layer is a `.folder-item` (doc-w × doc-h, paper background, radius, layered shadow that deepens with hover lift), getting data-folder-item and, when interactive (folder open, page sitting outside, or zoomed), role="button" + tabIndex 0.

## Phases & springs

- One rAF engine integrates every quantity (folder angle, desk tilt rx/ry, hover lift, press squash 0.975, and per-item x/y/z/rotate/ry/scale/hover/alpha/magnet) as damped springs at 240Hz sub-steps, omega ~ front 1.55–2 Hz × speed, items 2.1 Hz × speed, damping zeta = 1 − 0.72 × bounce. The frame loop self-sleeps when settled.
- Phases: open (open prop), receive (brief window after a page is dropped back), peek (hover with peek on, flap lifts a little: −15°, book −13°, pages slide outward slightly toward the pointer), rest. Angles: flap open −64° (front rotating up around its bottom hinge), book open −180° (cover rotating around the left spine, crossing a shade/cast/z swap at 90°, inside face becoming visible past −90°, a solid inner panel band morphing in past −99°); closing staggers the front behind the pages (delay scaling with page count), reopening opens the pages before the cover. Pages rest in a fanned pile (per-rank offsets/rotations), spread into a row (fit-scaled, evenly spaced), a vertical stack, or the book's peek offsets; in flap-rest they sit slightly above the pocket floor with a collision floor (a page pushed below its tilted reach bounces back with 0.25 restitution).
- Intro (default on, skipped under reduced motion, gated by IntersectionObserver at 0.2): the folder starts transparent; opening entrance pops appear 0→1 over 0.34s/speed with the cover holding closed while pages rain in from above with alternating tilt and per-rank stagger; the closing entrance shows the assembled folder then drops pages in before settling. Intro completes within ~1.4–2.4s/speed.
- Pointer tilt: while hovered (non-touch) the whole desk tilts toward the pointer — rx/ry up to 8–10° × tilt (0–1.5, default 0.5) — and relaxes on leave. Press squash scales the whole folder 0.975.

## Drag & drop

- Pointerdown on a page (draggable on) starts a potential drag with pointer capture; beyond a 4px (8px touch) slop the page is grabbed: it follows the pointer 1:1 in desk space with slight rotation from horizontal velocity (clamped ±14°), 5 Hz springs, lifts ×1.05, and once clearly outside the pocket casts itself onto the desk (z 80).
- Hovered open pages nudge: the hovered page rises 6px/scale ×1.05, neighbours push apart up to 12px — a magnet effect that also drags desk pages slightly by the pointer position within the page.
- Drop: over the pocket, the page flies back inside (book inserts from the side past 90° or from above, flap from above; a 0.24s/speed approach animation raises the folder's receive phase, tilting the flap/cover to −30°/−24°); anywhere else the page lands on the desk at the release point flung by clamped velocity (2400 px/s → 0.09 factor), resting within the nearest clipping ancestor's bounds, rotation from velocity + a per-index turn, stacking order by drop sequence (z 50+). onItemClick fires on click (zoom toggles a focused page: scaled to ~1.2–2.2 and centered, layer 90) and onItemDrop(entry, index, intoFolder) fires on every drop. Escape or an outside pointerdown clears zoom; outside also closes the folder when closeOnOutsideClick; openOn "hover" opens/closes with pointer enter/leave instead of click.
- Keyboard: stage Enter/Space toggle; interactive pages are tabbable buttons (Enter/Space select = zoom + onItemClick). Dragging works with mouse/touch pointers only.

## Glass variant (WebGL2)

- When variant="glass" and a WebGL2 context is available, the folder front pane plus (in book mode past 90°) the back is drawn by a three-program renderer: layers (back panel, each inside page rasterized from DOM via a canvas rasterizer that repaints on font/image load) are painted into a framebuffer, optionally two-pass blurred by frost, then a glass fragment shader draws the pane SDF with per-corner radii: sampling the behind-texture through a bend vector (bevel falloff × strength 14 × scale + lens 0.02) with chromatic split 0.26, tinting with the folder color (alpha 0.14 dark / 0.10 light), haze, gutter darkening, morph band toward the inside gradient (book), bevel edge light + sheen, shade from the light vector, angle-driven glint/dim. The canvas is DPR-capped at 2 with a wide view frustum (perspective 1 − z/depth projection matching the CSS matrix3d transforms).
- Without GL (or on context loss) the DOM faces fall back: solid variant uses painted gradients, glass variant uses translucent white gradients + backdrop blur(var(--folder-frost)) saturate(1.8), matte uses flat fills. Unmount cancels the frame loop, removes all listeners/observers and disposes the GL renderer. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { title?: string; description?: string; image?: string; alt?: string; content?: ReactNode }[] | DEFAULT_ITEMS | Page contents when no children are given; max 6 pages. |
| label | string | - | Text shown on the folder tab; also sizes the tab. |
| mode | "flap" \| "book" | "flap" | Front flap dropping up, or a book cover swinging around the spine. |
| variant | "solid" \| "glass" \| "matte" | "solid" | Front finish; glass adds the WebGL refracting pane. |
| color | string | "#3d8bff" | Folder colour; drives inside tones, tab ink and glass tint. |
| paperColor | string | "#ffffff" | Paper colour of the pages. |
| tabPosition | "left" \| "center" \| "right" | "right" | Where the tab sits along the top. |
| layout | "spread" \| "row" \| "stack" | "spread" | How open pages arrange. |
| size | number | 1 | Overall scale multiplier (min 0.3). |
| openOn | "click" \| "hover" | "click" | What toggles the folder open. |
| open | boolean | - | Controlled open state; pass it to stop internal state. |
| defaultOpen | boolean | false | Initial open state (uncontrolled mode). |
| onOpenChange | (open: boolean) => void | - | Called whenever the open state changes. |
| onItemClick | (item, index) => void | - | Called when a page is clicked (also toggles zoom). |
| onItemDrop | (item, index, intoFolder: boolean) => void | - | Called when a dragged page lands. |
| draggable | boolean | true | Pages can be dragged on and off the desk. |
| zoomOnClick | boolean | true | Clicking an open page zooms it to the front. |
| peek | boolean | true | Hovering cracks the folder open before clicking. |
| intro | boolean | true | Plays the drop-in entrance when scrolled into view. |
| tilt | number | 0.5 | Pointer-following desk tilt, 0–1.5. |
| bounce | number | 0.4 | Spring overshoot of all motion, 0–1. |
| speed | number | 1 | Global spring pace, 0.2–3. |
| frost | number | 0.25 | Glass blur/haze of the glass pane, 0–1. |
| closeOnOutsideClick | boolean | true | Outside pointerdown or Escape closes the folder. |
| theme | "dark" \| "light" | "dark" | Shadow and glass tint palette. |
| className | string | "" | Extra class on the root. |
| style | CSSProperties | - | Inline styles for the root. |
| children | ReactNode | - | Custom page contents; takes precedence over items. |

## Delivery & validation

- Deliver the complete content of Folder.jsx and Folder.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: flap opens −64° with pages staggering into their pocket poses; book swings −180° around the spine with the inside face, cast shadow and shade swapping at 90°; peek lifts on hover and follows pointer tilt; pages zoom on click and un-zoom on outside press/Escape; dragging a page off the desk lands it inside clipped bounds and dropping it back plays the receive animation from the right edge; controlled (open) and uncontrolled (defaultOpen + onOpenChange) both work; layouts spread/row/stack; tabPosition left/center/right; variants solid/glass/matte with the WebGL lens matching the DOM fallback closely; intro plays once per visibility and reduced motion skips it; drag disabled makes pages inert; 6+ entries cap at 6; unmount leaves no frame loop, listeners or GL objects; 375 / 768 / 1440 wide without overflow.
