Implement the "FolderFloat" component from zero: a stylised paper folder whose lid hinges open in 3D on hover or press, launching its notes out of the mouth of the folder in a staggered bounce — where they arrange into a loose floating cloud above the folder. With physics enabled the notes then become rigid bodies in a zero-gravity world: they drift on soft noise-like forces, nudge each other apart, and can be grabbed and thrown inside the floating zone; clicking one pops it and selects it, and the folder closes. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + a 2D rigid-body physics library, two files only: FolderFloat.jsx (entry, layout, physics world, drag handling) and FolderFloat.css (all styles). React >= 18.
- Root is an inline-block `<div>` with class `folder-float`, width = width, padding-top = a 14px tab, font-size 13px weight 500. Data attributes: data-open, data-live (physics running), data-physics, data-trigger. Inline CSS variables: --ff-w, --ff-h, --ff-r, colour tokens --ff-back/--ff-front/--ff-paper/--ff-item/--ff-item-ink/--ff-label, geometry tokens --ff-spread/--ff-lift/--ff-angle/--ff-rest, timing tokens --ff-open (openDuration), --ff-close (openDuration × 0.6), --ff-stagger, --ff-n (note count), and --ff-spring = cubic-bezier(0.34, 1 + bounce × 1.9, 0.64, 1).
- The folder block (relative, width × height) stacks three layers: a back panel (radius, folder colour, perspective(600px) rotateX(8deg) from a bottom origin, with a ::before tab strip 42% wide rising above the top edge), a paper span (a sheet peeking from the top 10% to 60% of the folder, inset 8% horizontally, radius 6px, paper colour; hidden below the lid and sliding up when open), and the front panel (bottom 76% of the folder, radius, a vertical gradient from a 92%-to-white mix of the front colour down to the front colour, top shadow, perspective rotateX(−restAngle) closed / rotateX(−flapAngle) open, bottom origin) carrying the label and sublabel (sublabel opacity 0.55, 11px). The front panel is the visible lid; closing swings it back to restAngle.
- On top sits a real trigger `<button>` covering the lid area (transparent, aria-expanded, aria-label "<label>, <sublabel>") that toggles open on click.
- Notes live in a zero-size anchor positioned at the folder's top-centre; each note is an absolutely-positioned `<button>` (height 34px, radius 17px, padding 0 14px, background item colour, ink item-text colour, small drop shadow) whose transform is translate(-50% + x, y) rotate(r) driven by per-note CSS vars --x/--y/--r plus --i (index). Closed state parks them at translate(-50%, 44px) scale(0.6) with opacity 0 and pointer-events none.

## Open choreography (no physics)

- Note positions are computed from the items: notes wrap into rows whose total width fits 2 × spread, each row shifted alternately ±min(16, spread × 0.1), each note offset upward by lift + rowIndex × 52px with a deterministic pseudo-random jitter of ±6px in x/y and a rotation of ±tilt degrees derived from its index. If pill sizes have been measured, real widths are used; otherwise width ≈ padding + label length × 6.8px. Sizes are measured from the DOM after fonts load.
- Opening: each note flies to its spot with transform transition var(--ff-open) var(--ff-spring) delayed by index × stagger, opacity fading in over 160ms at the same delay; the lid swings to flapAngle with the same duration; the paper slides up. Closing reverses with the --ff-close duration and a stagger computed from the end (last note leaves first, delay (n−1−i) × stagger × 0.5).
- A note's label span carries an idle drift animation (a ±3px vertical bob, 3.2s ease-in-out infinite, delayed −0.7s per index) that runs only while open and physics is off; once physics engages, the drift stops and motion is driven entirely by the engine.

## Physics world

- After opening settles (openDuration + (n−1) × stagger + 80ms, if physics is on and motion is not reduced), the notes enter a Matter-style 2D engine with zero gravity: each note becomes a rectangle body matching its measured size, corners chamfered to min(h/2 − 1, 16), restitution 0.55, no friction, air friction 0.08, infinite inertia (rotation locked), seeded with a random phase for drift. Four static walls box a zone of ±(spread + 8px) horizontally and from the highest note row down to the folder mouth.
- A rAF loop steps the engine (dt clamped to 32ms) and applies a gentle drift force to every free body: amplitude scaled by drift × 0.00005 × mass, ramped in over the first 2 seconds, directions from sine/cosine of time with per-body phase — a slow, organic float. Body positions are written back into the notes' --x/--y vars each frame.
- Dragging: pointerdown on a live note captures the pointer and grabs its body; after 4px of travel the note shows a grabbing cursor and the pointer position moves the body (velocity set to 60% of the delta so releases carry momentum), clamped inside the zone. Pointerup without meaningful movement selects the note. Physics runs until close; closing tears the engine down (final positions frozen into the CSS vars, engine and composites cleared, frame cancelled).
- Selection: any note click (including keyboard, click detail 0, and pointer taps when live) fires onSelect(value, index), plays a 320ms pop scale animation (1 → 1.1 → 1) on that note and, when closeOnSelect is on, closes the folder.

## Interaction & accessibility

- trigger "hover": pointerenter opens, pointerleave closes unless a note is mid-drag. trigger "press": the trigger button toggles. Escape closes an open folder. Notes are real buttons, focusable only while open (tabIndex −1 otherwise, aria-hidden while closed). prefers-reduced-motion: the lid and paper fade with opacity only, the lid stays at its rest angle, notes fade in without movement, drift is off, and the physics world never starts.
- onOpenChange fires on every open/close. Unmount clears all timers and tears down the engine. Re-measuring (items or size change) re-lays the cloud.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | (string \| { label: string; value: string })[] | DEFAULT_ITEMS | The notes; strings become { value, label } of themselves. |
| label | string | "Design feedback" | Title printed on the folder lid. |
| sublabel | string | "" | Subtitle on the lid; defaults to "N notes". |
| trigger | "hover" \| "press" | "hover" | How the folder opens: hover in/out or press to toggle. |
| defaultOpen | boolean | false | Whether the folder starts open (uncontrolled mode). |
| closeOnSelect | boolean | true | Closes the folder after picking a note. |
| physics | boolean | true | Turns on the zero-gravity floating world after the pop-out settles. |
| drift | number | 0.5 | Strength of the ambient drift force, 0–1+. |
| onSelect | (value: string, index: number) => void | - | Fires when a note is picked. |
| onOpenChange | (open: boolean) => void | - | Fires when the folder opens or closes. |
| folderColor | string | "#3f3f46" | Back panel colour. |
| frontColor | string | "#52525b" | Lid colour. |
| paperColor | string | "#f5f5f5" | Paper sheet colour. |
| itemColor | string | "#f5f5f5" | Note pill colour. |
| itemTextColor | string | "#18181b" | Note pill ink. |
| labelColor | string | "#f5f5f5" | Lid text colour. |
| width | number | 200 | Folder width in px. |
| height | number | 148 | Folder height in px. |
| radius | number | 14 | Folder corner radius in px. |
| spread | number | 180 | Half-width of the floating zone in px. |
| lift | number | 26 | Height of the first note row above the folder mouth, in px. |
| tilt | number | 8 | Maximum random note rotation, in degrees. |
| flapAngle | number | 34 | Lid angle when open, in degrees. |
| restAngle | number | 16 | Lid angle when closed, in degrees. |
| openDuration | number | 520 | Open animation duration in ms; closing takes 60% of it. |
| stagger | number | 45 | Per-note launch delay in ms. |
| bounce | number | 0.3 | Springiness of the launch easing, 0–1. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of FolderFloat.jsx and FolderFloat.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: hover (or press) opens the lid and launches notes in a staggered bounce; with physics the notes drift and collide inside the zone, can be grabbed and thrown, and keep floating after release; clicking a note pops it, fires onSelect and closes when closeOnSelect; Escape closes; press trigger toggles; sublabel defaults to the note count; physics off keeps the CSS drift bob; reduced motion fades without physics; items of different lengths wrap into rows; unmount tears down the engine and timers; 375 / 768 / 1440 wide without overflow.
