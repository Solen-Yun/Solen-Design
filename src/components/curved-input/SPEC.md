Implement the "CurvedInput" component from zero: an email-style input bar bent along a circular arc — the outline, the typed text, the blinking caret, the leading icon chip and the submit button all follow the curve, while a hidden native input keeps real editing behavior underneath. Pure React + SVG, two files: CurvedInput.jsx (entry, arc geometry) and CurvedInput.css (all styles). React >= 18; no runtime dependencies. No iframe, no external assets.

## Structure & rendering

- Root is a `<form class="curved-input">` (noValidate) sized by the width prop (number → px, string passes through) with `curved-input--focused` while the field has focus; everything visible is one `<svg>` sized width × (thickness + |bend| + padding), overflow visible, cursor text, user-select none, optional drop-shadow filter from shadowSize/shadowColor (sm: 0 5px 12px alpha .3, md: 0 10px 24px alpha .4, lg: 0 16px 40px alpha .52). Below the svg sits the real `<input class="curved-input__field">`: absolutely positioned, opacity 0, caret-color transparent, pointer-events none — it holds focus, value and IME, the SVG only draws.
- The arc geometry maps a flat coordinate space (u: 0..W along the bar, v: offset from the centerline, positive down) onto a circle with sagitta `bend` px, clamped to ±35% of the width; |bend| < 0.75 renders dead straight. Otherwise the radius is R = (W²/4 + a²)/(2a), and `point(u, v)` walks the arc, `angleAt(u)` returns the local tangent angle in degrees. The bar body is a "bent rectangle": circular top/bottom edges, radial end caps and quadratic rounded corners at the radius prop — drawn once as the filled background (backgroundColor, stroke borderColor at borderWidth px) and again as the focus ring (a wider stroke in the button accent color, opacity 0.28 while focused, 0.25s fade).
- Text runs on an SVG `<textPath>` along a bent baseline at v = fontSize × 0.34, clipped to a bent rect spanning the text window. The typed value renders in textColor at fontSize/weight 500; empty + placeholder renders the placeholder in placeholderColor instead; type="password" draws one `•` per character. Long values scroll along the arc like a native input: the caret is kept in view by sliding the baseline's start point (measured via getSubStringLength on the rendered text).
- The caret is a 1.5px rounded line of textColor, height min(thickness × 0.58, fontSize × 1.45), translated to the caret's arc point and rotated to the local tangent, blinking via an SVG `<animate>` opacity 1→0 over 1.06s discrete, shown only while focused.
- Leading icon (showIcon): a rounded chip (height min(34, max(16, thickness × 0.34)), width × 1.25) filled with iconColor or the button accent, containing a white envelope glyph (rect + chevron strokes); the whole group is translated to its arc point and rotated to the tangent. A custom `icon` node replaces the glyph. Text starts after the chip; without the icon it starts near the left edge.
- Submit button (showButton): a bent-rect group on the right inset by max(5, borderWidth+4), height thickness − 2×inset, width max(measured button text + fontSize × 2.7, thickness × 1.35), corner radius min(cornerRadius × 0.72, height/2), filled with buttonColor, its label on its own bent textPath, centered via startOffset 50%, in buttonTextColor weight 600. The group has role="button", tabIndex 0, aria-label buttonText; hover brightens 1.12, press 0.94, focus-visible 1.18. The label width is measured by a hidden offscreen `<text>` so layout adapts to any string. Button hover/press/focus are pure CSS filter transitions; the ring is a CSS opacity transition.
- Theme presets (overridable prop by prop): dark — bg #1B1722, text #f5f5f5, placeholder #a1a1aa, border #392e4e, accent #A855F7, button text #ffffff, shadow #000000; light — bg #ffffff, text #1d2050, placeholder #9aa0b6, border #262a56, accent #4763eb, button text #ffffff, shadow #0b0e2a.

## Editing behavior

- Controlled (value + onChange) or uncontrolled (defaultValue, internal state); the caret index tracks selectionStart on change/select/keyup. Clicking anywhere on the curve focuses the hidden input and drops the caret on the character nearest to the click: the click point is inverse-mapped from screen to arc u, converted to arc length, and matched against the cumulative widths of each character.
- Enter submits (form submit + Enter/Space on the button group both call onSubmit(value) and preventDefault); the SVG's pointerdown is prevented so text selection doesn't fight the caret logic. type accepts email/search/tel/url/password/text (anything else degrades to text, with inputMode mapped for email/number); name, ariaLabel (falling back to placeholder) and autocomplete/autoCapitalize off are wired on the hidden input.
- ResizeObserver on the form re-derives the geometry at the new pixel width; document.fonts.ready triggers one re-measure so the text/button layout settles after webfonts load.

## Accessibility

- The hidden input carries the aria-label and receives all keyboard focus; the drawn text/caret are aria-hidden. The submit button is a focusable SVG group with Enter/Space handling and its own aria-label. The focus ring and caret make the focused state visible without the native focus outline (which is removed on the hidden input).

## Performance & cleanup

- Geometry and layout are memoized on width/bend/height/fontSize/show flags; per-tick work is a handful of attribute writes. Observers and the fonts promise are disconnected/torn down on unmount. Multiple instances are independent (ids namespaced through React useId).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | - | Controlled value; pass it together with onChange. |
| defaultValue | string | "" | Initial value (uncontrolled mode). |
| onChange | (value: string) => void | - | Called on every keystroke with the next value. |
| onSubmit | (value: string) => void | - | Called on Enter or the submit button. |
| placeholder | string | "Enter your email" | Shown on the curve while empty. |
| buttonText | string | "Get Started" | Label of the curved submit button. |
| type | string | "email" | Input type; email/text/search/tel/url/password are supported. |
| name | string | - | Name attribute of the hidden input. |
| ariaLabel | string | - | Accessible label of the field; falls back to the placeholder. |
| theme | "dark" \| "light" | "dark" | Colour preset for all parts. |
| width | number \| string | 450 | Bar width in px, or any CSS width. |
| bend | number | 28 | Arc sagitta in px; positive arches up, negative sags, 0 is flat. |
| height | number | 64 | Bar thickness in px. |
| cornerRadius | number | 18 | Corner rounding of the bent bar. |
| borderWidth | number | 1.5 | Outline width of the bar. |
| fontSize | number | 16 | Font size of text, placeholder and button label. |
| backgroundColor | string | - | Bar fill; falls back to the theme. |
| textColor | string | - | Typed text colour; falls back to the theme. |
| placeholderColor | string | - | Placeholder colour; falls back to the theme. |
| borderColor | string | - | Outline colour; falls back to the theme. |
| buttonColor | string | - | Accent for the button, icon chip and focus ring; falls back to the theme. |
| buttonTextColor | string | - | Button label colour; falls back to the theme. |
| iconColor | string | - | Icon chip fill; falls back to the button colour. |
| shadowSize | "sm" \| "md" \| "lg" | "md" | Drop shadow size of the whole bar. |
| shadowColor | string | - | Drop shadow colour; falls back to the theme. |
| showButton | boolean | true | Renders the curved submit button. |
| showIcon | boolean | true | Renders the leading icon chip. |
| icon | ReactNode | - | Custom icon node replacing the built-in envelope glyph. |
| className | string | "" | Extra class on the form. |
| style | CSSProperties | - | Inline styles for the form. |

## Delivery & validation

- Deliver the complete content of CurvedInput.jsx and CurvedInput.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: typing renders on the curve with the caret following the arc and blinking only while focused; click-to-place caret lands on the nearest character; long text scrolls along the arc keeping the caret visible; controlled and uncontrolled modes both fire onChange; Enter and the button both submit and stop propagation; password draws bullets; bend positive/negative/0 arch correctly and clamp at 35% of width; themes and every color override; shadow sizes; showButton/showIcon off shrink the text window; focus ring fades in on the accent color; button keyboard activation works; resize and webfont load re-lay out; hidden input is usable by screen readers and IME; 375 / 768 / 1440 wide without overflow.
