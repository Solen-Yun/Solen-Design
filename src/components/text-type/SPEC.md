Implement the "TextType" component from zero: a typewriter that types sentences character by character with a blinking cursor that glides to the caret, optional human-like typos that are typed and then corrected, per-character entrance effects, and a loop that deletes each sentence (by backspace or by selection sweep) before typing the next. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: TextType.jsx (entry, typing engine, cursor tracking) and TextType.css (all styles). React >= 18; the animation library gsap at ^3.13.0 is used only for the cursor glide and blink timeline. No iframe.
- Root is the element named by the as prop (default "div", any tag works): class text-type plus className, position relative, display inline-block, white-space pre-wrap; extra props spread onto it.
- Three children: (1) a visually hidden screen-reader span (class text-type__sr: 1px clip pattern) holding the prefix plus all sentences joined with spaces; (2) the visible content span (aria-hidden) — the optional prefix span (coloured prefixColor), the typed characters, and an invisible zero-width caret span (class text-type__caret, inline-block width 0) placed before the characters in reverse mode and after them otherwise; (3) the floating cursor.
- Characters are individually wrapped in spans (class text-type__char, position relative) so each can animate in and carry the selection highlight. Text is segmented into graphemes with Intl.Segmenter when available (fallback Array.from), so emoji and combining marks type as single characters.
- The floating cursor is an absolutely positioned span (top 0, left 0, white-space pre, pointer-events none, will-change transform) following the caret span's offsetLeft/offsetTop. It contains a blink span; character style renders cursorCharacter text, while bar / block / underscore render a coloured shape span (bar: width max(2px, 0.07em) × height 1.1em; block: 0.56em × 1.1em; underscore: 0.56em × max(2px, 0.075em), each vertically aligned to the baseline with small margins). Cursor colour comes from cursorColor (defaults to currentColor); cursorClassName appends; opacity transitions 0.2s when hidden by hideCursorWhileTyping.

## Typing engine

- text accepts a string or an array of strings; the engine types the current sentence character by character, each keystroke waiting a random duration between variableSpeed.min and .max (fallback typingSpeed for both), with initialDelay added before the first character. After a sentence completes it waits pauseDuration, then deletes at deletingSpeed per character, and when empty calls onSentenceComplete(sentence, index), advances to the next sentence (wrapping) and resets. With loop false the engine stops after the last sentence instead of deleting it.
- Typos: with mistakes > 0, each upcoming character after the first one typed has a min(1, mistakes) × 0.16 chance (once per position) of starting a typo burst — the first character of a sentence never typos. The burst types a keyboard-neighbour character of the real one (case preserved, from a built-in adjacency table), optionally followed by the next real character (40% when it is not a space); the wrong tail holds 260–580ms, is deleted at max(45, deletingSpeed), pauses 90–230ms, then typing continues.
- deleteMode "backspace" (default) removes one character per tick; "select" instead sweeps a selection highlight over the typed text (background = 25% currentColor via color-mix, applied per character span), holds max(160, deletingSpeed × 8), then clears everything at once.
- reverseMode types from the end of the sentence toward the start (the shown window slides leftward, the caret rides before the text) and deletes back toward the end.
- Entrance effects (typeEffect): each newly shown character plays a Web Animations API animation — fade: opacity 0→1 over 360ms; blur: opacity + blur 0.3em→0 over 520ms; rise: top 0.6em→0 with an overshooting cubic over 480ms; "none" (default) skips. The prefix is never animated.
- textColors cycles a colour per sentence (applied to the typed text span); prefix renders before the text in prefixColor.
- startOnVisible arms typing behind an IntersectionObserver (threshold 0.1) that disconnects once fired; without it typing starts immediately on mount.
- prefers-reduced-motion: typing and deleting complete instantly (one step per frame chain), typos resolve instantly, the cursor stops blinking (steady at full opacity) and glides are replaced by instant placement; the pause between a finished sentence and its deletion stays at pauseDuration, only the typing and deleting themselves become instant; the media query is followed live via change listeners.

## Cursor motion

- A layout effect re-reads the caret's offsetLeft/offsetTop on every render; if the position moved, the cursor tweens x/y with gsap (power3.out) over glideTime = min(0.18, max(0.06, mid typing speed × 0.0016)) when cursorGlide is on — but jumps instantly when the line changes (y jump), on first placement, on resize (a ResizeObserver on the root forces an instant placement) or under reduced motion.
- The blink is a gsap timeline repeating forever: hold opacity 1 for 70% of cursorBlinkDuration, fade out over 45% of it, fade back after a further 40% gap. While typing, deleting or mid-typo the timeline pauses, the blink span is forced to opacity 1 (0.12s), and the timeline restarts 0.12s after the last keystroke.
- Unmount kills the blink timeline and any pending resume call; all timers are cleared by the typing loop's cleanup; the observer and ResizeObserver disconnect. Same-page instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string \| string[] | - (required) | Sentence or sentences to type; arrays loop through in order. |
| as | keyof JSX.IntrinsicElements | "div" | Element to render. |
| typingSpeed | number | 50 | Base keystroke interval in ms (also the fixed pace when variableSpeed is unset). |
| initialDelay | number | 0 | Extra ms before the first character of each sentence. |
| pauseDuration | number | 2000 | ms a completed sentence holds before deleting. |
| deletingSpeed | number | 30 | ms per character while deleting. |
| deleteMode | "backspace" \| "select" | "backspace" | backspace removes characters one by one; select sweeps a highlight then clears. |
| loop | boolean | true | After the last sentence, delete it and start over. |
| className | string | "" | Extra class names for the root element. |
| showCursor | boolean | true | Renders the floating cursor. |
| hideCursorWhileTyping | boolean | false | Fades the cursor out while typing or deleting. |
| cursorStyle | "character" \| "bar" \| "block" \| "underscore" | "character" | Cursor shape; character renders cursorCharacter. |
| cursorCharacter | string | "\|" | The character-style cursor glyph. |
| cursorColor | string | "currentColor" | Cursor colour. |
| cursorClassName | string | "" | Extra class names for the cursor span. |
| cursorBlinkDuration | number | 0.5 | Blink cycle in seconds. |
| cursorGlide | boolean | true | Tweens the cursor toward the caret instead of jumping. |
| typeEffect | "none" \| "fade" \| "blur" \| "rise" | "none" | Entrance animation per character. |
| mistakes | number | 0 | 0–1; how often a typo burst happens while typing. |
| prefix | string | "" | Static text shown before the typed content (also in the screen-reader text). |
| prefixColor | string | "currentColor" | Colour of the prefix. |
| textColors | string[] | [] | Colour per sentence, cycled. |
| variableSpeed | { min: number; max: number } | - | Random keystroke interval range in ms. |
| onSentenceComplete | (text: string, index: number) => void | - | Fires when a sentence has been fully deleted. |
| startOnVisible | boolean | false | Starts typing only when the element enters the viewport. |
| reverseMode | boolean | false | Types from the end of the sentence toward the start. |

## Delivery & validation

- Deliver the complete content of TextType.jsx and TextType.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: single strings and arrays both type, pause, delete and advance; loop off stops after the last sentence; typing speed honours variableSpeed ranges and initialDelay; backspace and select deletion both work (select sweeps then clears); typos type wrong neighbours, hold, self-correct and continue at the configured rate; reverseMode reveals from the tail with the caret leading; the cursor glides smoothly on one line, jumps correctly across line wraps and repositions on resize; blink pauses while typing and resumes after; all four cursor styles render at the right sizes and colours; fade / blur / rise effects animate each new character; textColors cycle per sentence and prefix colours separately; startOnVisible waits for the viewport; reduced motion completes instantly with a steady cursor; the screen reader hears the full text once while the visual copy is aria-hidden; unmount leaves no timelines, timers or observers; multiple instances are independent; wrapping text types correctly at 375 / 768 / 1440 wide.
