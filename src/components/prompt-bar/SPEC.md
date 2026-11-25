Implement the "PromptBar" component from zero: a chat composer that opens a popup menu above itself in three ways — typing "@" filters a list of attachable sources, typing "/" filters slash commands, and toolbar buttons open a model picker and an effort slider — plus removable attachment chips, a dictation button, and a send button whose arrow morphs into a square and back while morphing through a gooey squash; at maximum effort the field glows and a canvas of drifting spark particles wakes up. Built with React, CSS and a motion library for the morph; icon glyphs come from a React icon package. It must not depend on external pages, videos, images or font files.

## Structure & rendering

- Two files: PromptBar.jsx (entry, token parsing, menus, sparks canvas) and PromptBar.css (all styles). Dependencies: React >= 18, a motion library (springs/animated values for the send glyph), and a React icon package for the toolbar/menu glyphs; no other runtime deps. No iframe.
- Root is a `<div class="prompt-bar">` (plus caller className), width min(width px, 100%), font 14px, base colour tokens inline: `--pb-bg` (field background), `--pb-ink` (text colour), `--pb-menu` (menu background), `--pb-w`, `--pb-radius`, `--pb-spark` (spark accent), `--pb-press` (send press scale). Muted and hover tints derive in CSS via color-mix from the ink. `data-busy` shows while a request runs; `data-max` while effort is at the last level.
- The popup menu (`prompt-bar__menu`, absolute above the field, 8px gap, 12px radius, soft double shadow, pops in with a 180ms rise+scale from bottom center) has four kinds: `data-kind="at"` (sources, full width), `"slash"` (commands, full width), `"model"` (200px wide, anchored bottom left), `"effort"` (248px wide slider dialog, `role="dialog"`). List kinds are `role="listbox"` with a labelled, `aria-selected` option per row; rows are 36px buttons with an optional 20px icon column (sources only), a 13px semibold name, a truncated 12px muted description, and for models a right-aligned muted tag plus a check mark that shows only on the selected row. A shared `prompt-bar__glow` highlight span slides under the active row (top/height eased 220ms, suppressed for one frame when the menu first opens so it appears in place). An empty query renders "No matches for “query”".
- The effort panel: a header row ("Effort" muted, current level label, a help icon with a title tooltip), "Faster"/"Smarter" end labels, and a 22px track (`role="slider"` with aria valuemin/max/now/text) holding a fill bar, one 4px dot per effort level positioned at even steps (11px edge insets), and a 14×28px rounded thumb. Pointer down/move (button held) and arrow keys step the level; Home/End jump; Escape closes back to the input. Fill and thumb transitions are 220ms; at the last level the bar and thumb switch to the spark colour.
- The field (`prompt-bar__field`, flex column, 12px padding, radius var, cursor text): a spark canvas absolutely behind content; attachment chips row (26px pills with a file icon, truncated 144px-max name, and a small × button); an auto-growing `<textarea>` (rows 1, 22px line height, resized to scrollHeight capped at maxRows lines, overflow auto beyond, placeholder swaps to "Listening…" while dictating, 16px font on coarse pointers); and a bottom toolbar: a "+" tool button (toggles the sources menu), a model pick button (name + chevron), an effort pick button (sparkles icon + level label, tinted spark colour at max), a spacer, an optional dictation button (mic icon, or a 3-bar animated equalizer while listening), and the send button.

## Behaviors

- Token parsing: a regex finds a trailing `@word` or `/word` fragment at the cursor-side end of the draft (whitespace-delimited). `@` opens the sources menu filtered by name substring; `/` opens commands filtered by prefix (leading slash stripped). Escape dismisses the menu (sets a dismissed flag so it stays closed until the draft changes again); typing or re-invoking a toolbar button reopens. Toolbar menus (model/effort) co-exclude each other; a document pointerdown outside the root closes any open menu.
- Picking: Enter (without Shift) or Tab accepts the highlighted row; ArrowUp/Down move the highlight (wrapping). For sources the row's `@Name ` text is inserted at the token start; for commands `Name ` is inserted; attach-flagged sources instead clear the token and call onAttach — the resolved promise value (string or array) becomes attachment chips; model rows set the selected model and close. Row clicks work too (mousedown prevented so the textarea keeps focus).
- Send: enabled when the trimmed draft or any attachment exists ("armed" — ink background, inverted colours); clicking sends onSend(text, { attachments, model, effort }) with the current model object and effort label, then clears the draft, attachments and menus; Enter without Shift sends (IME-composing keystrokes excluded via isComposing); Shift+Enter makes a newline. When busy the button shows "Stop" and calls onStop instead.
- Send glyph morph: a 24×24 SVG path interpolates point-by-point between a paper-plane "arrow up" outline and a rounded square (stop) shape with a motion value eased over morphDuration (240ms) using a strong in-out ease; mid-morph a sine "goo" factor squashes the whole glyph (scaleX 1−squash·goo, scaleY inverse) and tilts it ±tilt degrees in the direction of the change; reduced motion skips the goo and eases with zero duration.
- Dictation: shown only when an onDictate callback is provided; toggling starts listening (button shows the equalizer, placeholder changes) and awaits the promise — resolved text is appended to the draft (space-joined) and listening stops; rejection just stops. A sequence counter guards stale resolutions; unmount invalidates pending ones.
- Sparks: only when effort is at the last level and motion is allowed, a canvas particles loop runs — up to 30 dots of radius ~0.9–2.0 rising bottom-to-top at −7..−16 px/s, swaying sinusoidally, twinkling (alpha oscillates, radius breathes), wrapping at the top, fading in/out over a 14px edge margin; each keystroke spikes "energy" (max 1.6, decays with ~0.8s half-life) which speeds the drift up to 7×, brightens glow (shadowBlur 6–16+) and pulses on keystrokes; particles are tinted `--pb-spark`. DPR-aware with a ResizeObserver-driven re-measure; the loop cancels and clears on leave-max, motion-preference change or unmount. A radial spark-tinted gradient on the field's ::before fades in at max effort too.
- Press feedback: the armed send button scales to `--pb-press` (0.96) while pressed; tool buttons scale 0.94 on active. prefers-reduced-motion drops the menu/chip pop animations, glow transitions and the press/active scales; the effort slider keeps only colour transitions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | string | "Ask anything" | Textarea placeholder. |
| sources | { key: string; name: string; description?: string; icon?: ReactNode; attach?: boolean }[] | DEFAULT_SOURCES | Items offered by "@"; attach-flagged ones trigger onAttach instead of inserting text. |
| commands | { key: string; name: string; description?: string }[] | DEFAULT_COMMANDS | Items offered by "/" (names like "/summarize"). |
| models | { key: string; name: string; tag?: string }[] | DEFAULT_MODELS | Model picker rows; empty hides the picker. |
| defaultModel | string | "" | Key of the initially selected model. |
| efforts | string[] | DEFAULT_EFFORTS (["Low", "Medium", "High", "Extra", "Max"]) | Effort levels; empty hides the effort button and slider. |
| defaultEffort | string | "" | Initially selected effort label; defaults to the middle of the list. |
| onEffortChange | (level: string) => void | - | Called when the effort level changes. |
| busy | boolean | false | Shows the stop state and disables sending. |
| onSend | (text: string, meta: { attachments: string[]; model; effort: string }) => void | - | Called on send with the trimmed draft, attachment names, current model and effort. |
| onStop | () => void | - | Called when the send button is clicked while busy. |
| onAttach | () => string \| string[] \| Promise<...> | - | Resolves file name(s) to attach when an attach-flagged source is picked. |
| onDictate | () => string \| Promise<string> | - | Resolves dictated text to append; its presence enables the mic button. |
| background | string | "#27272a" | Field background colour. |
| color | string | "#f5f5f5" | Text/ink colour. |
| menuBackground | string | "#323236" | Popup menu background. |
| sparkColor | string | "#b39dff" | Spark particle and max-effort accent colour. |
| sparkBoost | number | 1 | Multiplier on the typing energy that drives the particles. |
| width | number | 400 | Width of the bar, px (capped at 100%). |
| radius | number | 16 | Field corner radius, px. |
| maxRows | number | 5 | Textarea height cap in lines before it scrolls. |
| morphDuration | number | 240 | Send-glyph morph duration, ms. |
| squash | number | 0.12 | Gooey squash depth of the morph, 0–1 scale fraction. |
| tilt | number | 8 | Max morph tilt in degrees. |
| pressScale | number | 0.96 | Send button press scale. |
| className | string | "" | Extra class names for the root. |

## Delivery & validation

- Deliver the complete content of PromptBar.jsx and PromptBar.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: typing "@" filters sources and Enter/Tab/click inserts the token; attach sources produce chips that can be removed by their × button; typing "/" filters commands by prefix; Escape dismisses and typing reopens; the model picker checks the chosen row and the toolbar label follows; the effort slider drags, keys and jumps with Home/End, reports onEffortChange and tints at max; at max effort sparks drift and react to keystrokes, field glows, effort button tinted; the send arrow morphs to a square and back with squash/tilt, armed state inverts colours, Enter sends, Shift+Enter newlines, IME composition does not send; busy state swaps to Stop and calls onStop; dictation appends resolved text and the equalizer animates; textarea grows to maxRows then scrolls; outside pointerdown closes menus; reduced motion removes pops, goo and particle loop; unmount cancels the loop and listeners; 375 / 768 / 1440 wide without overflow.
