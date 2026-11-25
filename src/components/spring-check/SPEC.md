Implement the "SpringCheck" component from zero: a checkbox row where one spring drives everything — checking fills the box, the box swells on the overshoot, a tick draws itself, the label dims and a strikethrough rule wipes across it, all off the same progress value. Unchecking runs the same film backwards. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- React + CSS, two files only: SpringCheck.jsx (entry, spring wiring, pointer handling) and SpringCheck.css (all styles). Uses `motion/react` for the single animated progress value and one icon package only to read the tick path data (an SVG check mark path rendered inline; the exact path ships embedded in code and takes precedence over this description). No iframe.
- Root is a real `<button type="button" role="checkbox" aria-checked>` (default false) with `disabled` passthrough, an optional `ariaLabel`, and inline CSS variables: `--sc-ink` (default #ffffff), `--sc-fill` (#ffffff), `--sc-check` (#0b0b0f), `--sc-box` (28px), `--sc-radius` (9px), `--sc-font` (18px), `--sc-ring` (2px when box ≥ 24 else 1.5px), `--sc-gap` (clamp(round(box × 0.43), 8, 16)px), `--sc-row` (max(44, box + 16)px), `--sc-rule` (rule thickness ≈ fontSize/12, min 1.5px), `--sc-origin` (strikethrough transform origin: "left center" / "center" / "right center" per the strike prop).
- Layout: inline-flex row, min-height var(--sc-row), gap var(--sc-gap), font 500, letter-spacing −0.01em. Inside: a press wrapper span (flex none, box-sized, transitions transform 160ms ease-out; scale 0.95 while `data-pressed`); inside it the box span (grid place-items center, overflow hidden, rounded inherit) containing a ring span (inset box-shadow ring in ink at 0.28 opacity, 0.5 on fine-pointer hover), a fill span (absolute inset, fill colour, transform scales with progress) and an SVG tick (68% of the box, stroke var(--sc-check), 2.6 width, round caps, `pathLength 1` + dasharray 1 so dashoffset draws it).
- Label: a span wrapping a word span (opacity animated) and, when strike ≠ "none", an absolutely positioned rule (top 46%, full width, 2px radius, currentColor, transform-origin var(--sc-origin)).
- Focus: visible keyboard focus draws a 45%-ink 2px outline offset 3px around the press wrapper. Disabled: 0.5 opacity, not-allowed cursor.

## One spring, five readings

- A single motion value t runs 0 → 1 on check and 1 → 0 on uncheck via a spring with visualDuration 0.2s and bounce derived from the `bounce` prop (default 0.2) through a damping-ratio conversion, so the box visibly overshoots and re-settles.
- Every animation frame the same t is projected into five readings written directly to the DOM (no React re-render per frame):
  - fill transform: `scale(t)` (grows from the centre, rounding inherited);
  - box transform: `scale(1 + 0.35 × max(0, t − 1))` — the swell only exists in the overshoot range;
  - tick stroke-dashoffset: `1 − t` (draws in as the fill completes);
  - label opacity: `1 − (1 − doneOpacity) × t` (doneOpacity default 0.42);
  - rule transform: `scaleX(clamp((t − strikeLag) / (0.84 − strikeLag)))` — the strike starts after strikeLag (default 0.12) of the spring and completes by 84% of it.
- Controlled mode: pass `checked` and the component renders that state and calls onChange without internal state; uncontrolled uses `defaultChecked` (default false). Non-pointer toggles (keyboard, programmatic) skip the spring and jump.

## Interaction & accessibility

- The whole row is the checkbox: pointerdown marks pressed (visual squeeze), click toggles; pointer leave/cancel clears the pressed look.
- Keyboard: native button activation (Space/Enter) toggles with the instant path; focus-visible shows the outline.
- prefers-reduced-motion: springs are skipped — state jumps; the press squeeze transition is disabled via CSS.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | "Ship the build" | Text next to the box. |
| checked | boolean | - | Controlled checked state. Leave out for uncontrolled mode. |
| defaultChecked | boolean | false | Initial state in uncontrolled mode. |
| onChange | (checked: boolean) => void | - | Called after every toggle. |
| disabled | boolean | false | Disables the row. |
| color | string | "#ffffff" | Ink colour: ring, label and strikethrough. |
| fillColor | string | "#ffffff" | Box fill colour. |
| checkColor | string | "#0b0b0f" | Tick colour on top of the fill. |
| boxSize | number | 28 | Box side length in px. |
| boxRadius | number | 9 | Box corner radius in px. |
| fontSize | number | 18 | Label font size in px; also scales the rule thickness. |
| bounce | number | 0.2 | Spring overshoot, 0–1; 0 gives no swell. |
| strikeLag | number | 0.12 | Progress value at which the strikethrough starts wiping, 0–1. |
| doneOpacity | number | 0.42 | Label opacity in the checked state, 0–1. |
| strike | "left" \| "center" \| "right" \| "none" | "left" | Strikethrough wipe direction; "none" removes the rule. |
| ariaLabel | string | - | Accessible name overriding the visible label. |
| className | string | "" | Extra class names for the row. |

## Delivery & validation

- Deliver the complete content of SpringCheck.jsx and SpringCheck.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: checking fills the box, swells it on the overshoot, draws the tick and wipes the strikethrough in one coherent motion; unchecking reverses everything; bounce 0 removes the swell; strikeLag shifts the wipe start; strike left/center/right change the wipe origin and "none" removes the rule; controlled and uncontrolled modes both work with onChange; keyboard toggling skips the spring; disabled blocks toggling; reduced motion jumps states; light and dark backgrounds both work via the colour props; 375 / 768 / 1440 wide without overflow.
