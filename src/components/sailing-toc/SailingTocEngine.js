// Sailing table of contents — native DOM core on the shared runtime. No iframe or eval.
import { createSurface } from "./motion-runtime";
export function mountSailingToc(target, options = {}) {
const SECTIONS = [
  { title: "Acceptance of These Terms of Service", paragraphs: [
    "Welcome to this reading example. The document demonstrates how a quiet table of contents can help people move through a long page. The same navigation can be used for a guide, a handbook, or a collection of product notes. Read any section in the order that works for you.",
    "Each heading has a matching entry in the contents. Scroll naturally to keep reading, or choose a heading to move directly to a subject. The small sailing ship marks your current place without covering the words. The route bends gently around the ship as it moves.",
    "THIS IS DEMONSTRATION CONTENT. The paragraphs describe an example interface and do not set the terms for an account, a purchase, or a real service. Replace this copy with the document appropriate to your own product.",
  ] },
  { title: "Access and Use of the Service", paragraphs: [
    "The reading surface works with a mouse, a trackpad, touch, or a keyboard. A wheel moves the article while the contents remains in place. Touch the article and swipe vertically to explore it. Focusing the reading area also makes ordinary keyboard scrolling available.",
    "Navigation stays inside this example. Choosing a heading changes the reading position and the highlighted entry. It does not open a new page, submit a form, or change any information outside the document.",
  ], items: [
    "Keep the text readable at the size used by the host page.",
    "Give each section a useful heading and a stable position in the contents.",
    "Let a new scroll gesture interrupt an unfinished jump.",
    "Preserve the reader\u2019s place when the example is resized.",
  ] },
  { title: "Privacy Notice.", paragraphs: [
    "This demonstration keeps its reading position in memory for the current instance. It does not send the selected heading or the scroll position to a server. Two examples placed on the same page keep separate positions.",
    "The words in this panel are sample reading material. They are separate from the privacy policy of the website that contains the example. Use the host website\u2019s own privacy information when you need to understand its actual practices.",
  ] },
  { title: "Who May Use the Services?", paragraphs: [
    "Use the example when you can manage the reading controls, understand the headings, and choose the parts of the document that are useful to you.",
  ] },
  { title: "Conditions of Access and Use", paragraphs: [
    "A long document should remain easy to explore without turning its navigation into a second task. The contents gives a steady overview, while the article provides enough space for continuous reading. The moving marker adds a small amount of character to an otherwise simple page.",
    "The following examples describe the behavior of this reading surface. They are interface notes for this local demonstration, and can be adapted to the needs of another document.",
  ], items: [
    "Scroll the article to move between sections without changing pages or opening another view.",
    "Choose a contents entry to travel to its matching heading. The current entry becomes darker and makes room for the ship.",
    "Let the ship move along the dashed route. The route bends around the marker instead of passing through its sails.",
    "Reverse the scroll direction at any time. The marker should slow, turn, and continue toward the new position.",
    "Use the keyboard to focus a heading in the contents. Press Enter or Space to activate the focused entry.",
    "Press the arrow keys while a contents entry is focused to move focus to another entry. Home and End reach the first and last items.",
    "Keep the current section visible to assistive technology by using a current-location attribute on its navigation control.",
    "Allow direct wheel, touch, or keyboard input to interrupt a smooth jump so that the document follows the reader\u2019s latest action.",
    "Keep the two endpoint circles and the complete route visible. Changing the marker position should not shift the surrounding layout.",
    "When the reader requests reduced motion, move directly to the chosen heading and update the marker without spring travel.",
    "Use distinct labels for repeated sections. A contents entry should make sense without requiring the reader to inspect nearby paragraphs.",
    "Do not run an idle animation forever. When the marker settles, the example should wait for the next interaction.",
    "Support more than one reading example on a page. Moving one instance must not change the others.",
    "Remove scroll listeners, observers, and pending animation frames when the example is no longer shown.",
  ] },
  { title: "About the Services.", paragraphs: [
    "This example combines a document and its contents in one reading surface. The article contains paragraphs, numbered points, and headings of different lengths. Its navigation follows the current section and also lets the reader jump directly to a chosen subject.",
  ], items: [
    "Document layout. The contents stays to the left of the article, with a narrow dashed route beside the labels.",
    "Reading position. The active section is selected from the headings that have reached the upper part of the reading area.",
    "Marker movement. A spring carries the ship between labels. The amount and direction of its lean follow its vertical movement.",
    "Interruption. Choosing another heading replaces the current destination using the article\u2019s actual position as the new starting point.",
    "Access is discretionary in this sample document. Its sentences exist to demonstrate line wrapping, paragraph rhythm, and a useful range of section lengths. They do not describe a financial, account, or subscription service.",
    "A reader can stop a jump with a direct scroll gesture. The example then returns to following the visible headings. The route and ship settle beside the new active label rather than continuing toward an outdated destination.",
  ] },
  { title: "Intellectual Property Rights", paragraphs: [
    "A component example should distinguish its own implementation from the design that inspired it. A source link can help readers identify the designer, while the interactive demonstration explains how the local implementation behaves.",
  ], items: [
    "Reading content. These paragraphs are independent sample copy written for this example. They provide a realistic amount of text for scrolling without reproducing another website\u2019s complete document.",
    "Illustration. The ship is drawn with inline vector paths. Its hull, rigging, masts, and sails remain sharp when the reading surface is scaled.",
    "Page labels. The headings make up the visible contents. Each one has a corresponding article section and can be reached through the same local navigation.",
    "Customization. Replace the words and vector drawing when applying the component to a different product. Preserve the relationship between the active heading, the marker, and the article position.",
  ] },
  { title: "Third-Party Services", paragraphs: [
    "The reading demonstration does not need an external service to animate its marker. Its styles, vector drawing, and interaction code travel together with the component. The host application only needs to mount the example into an available element.",
    "If an application adds external links, keep their purpose clear and preserve normal browser behavior. A link to another page should remain distinct from a control that only changes the reading position inside this article.",
  ] },
  { title: "Termination.", paragraphs: [
    "Closing the example ends its current interaction. Any pending navigation and marker travel are cancelled, and the component releases the listeners and observers it created. A newly mounted instance begins with its own independent reading state.",
    "Removing an example must not remove content or controls owned by the page around it. The reading surface stays inside the element chosen by the host application.",
  ] },
  { title: "Indemnification", paragraphs: [
    "This heading is included to provide another position along a long document. The sample text is a layout fixture: its length gives the scroll interaction enough room to demonstrate changes in direction, interrupted jumps, and steady reading.",
    "Keep the distinction between a visual example and a real document clear when adapting the component. Use your own reviewed text for any page that describes actual responsibilities or obligations.",
  ] },
  { title: "Warranty Disclaimers", paragraphs: [
    "THIS IS AN INTERFACE DEMONSTRATION. THE TEXT IS SAMPLE COPY FOR A READING SURFACE, WITH PARAGRAPH LENGTHS CHOSEN TO SHOW SCROLLING AND NAVIGATION. IT DOES NOT CREATE A WARRANTY OR DESCRIBE AN ACTUAL PRODUCT AGREEMENT.",
    "A reader should be able to move through the document without losing the current place. The contents keeps a consistent position while the article moves. The ship follows the active section with a short settling motion rather than stopping abruptly at every change.",
    "When applying this interaction to a real page, test both quick navigation and slow continuous scrolling. Long headings should wrap naturally, selected labels should stay readable, and the marker should remain beside the route rather than crossing through the text.",
  ] },
  { title: "Limitation of Liability", paragraphs: [
    "THE PURPOSE OF THIS SECTION IS TO SHOW A LONG UPPERCASE TEXT BLOCK IN THE ARTICLE. ITS WORDS DESCRIBE A COMPONENT EXAMPLE AND ARE NOT A LIMITATION THAT APPLIES TO A REAL ACCOUNT, PURCHASE, OR SERVICE. REPLACE THE SAMPLE WITH THE DOCUMENT REQUIRED BY YOUR OWN APPLICATION.",
    "A long paragraph should still align with the surrounding text and keep a comfortable line height. Moving to another section must not change the size of the article or the width of the contents. Layout remains stable while the ship, active label, and reading position change.",
    "IF THE HOST APPLICATION CHANGES THE AVAILABLE SPACE, THE EXAMPLE RECOMPUTES ITS MEASUREMENTS. THE READER CAN THEN CONTINUE FROM THE CURRENT SECTION USING THE SAME INPUTS.",
  ] },
  { title: "Governing Law and Forum Choice.", paragraphs: [
    "These are local demonstration paragraphs for a scrolling document. They do not select a jurisdiction or a forum. The heading provides a longer wrapped label in the contents, showing how the marker aligns with entries that span more than one line.",
  ] },
  { title: "Dispute Resolution by Binding Arbitration", paragraphs: [
    "This section supplies a second long heading and a numbered list. It helps demonstrate a jump between distant parts of the article while keeping the surrounding navigation stationary.",
  ], items: [
    "Local navigation. Choosing this entry moves the article to the matching heading, updates the current-location state, and sends the ship toward the center of the wrapped label.",
    "Interruptions. A second selection begins from the actual reading position. It does not finish the old jump before responding to the new one.",
    "Keyboard access. Focus remains on the navigation control that was activated. Arrow keys move among entries, and Enter or Space starts a jump.",
    "Reduced motion. The article and marker update directly when reduced motion is requested. All headings remain reachable and the selected entry is still clearly identified.",
  ] },
  { title: "General", paragraphs: [
    "The example keeps one active heading and one moving marker. Its small number of visual parts makes the relationship between reading position and navigation easy to follow. The same interaction can accompany many kinds of long-form content.",
    "Change the section labels and paragraphs together so that the contents remains an accurate map of the article.",
  ] },
  { title: "Contact.", paragraphs: [
    "You have reached the last section of the local reading example. Choose another heading to travel back through the article, or scroll upward at your own pace. The ship will turn and follow the next active position.",
    "This sample does not send a message or collect contact information. Use the host website\u2019s own contact controls when you want to reach its owner.",
  ] },
];

const SHIP_PATHS = [
  'M7 65C29 75 66 73 93 57L92 64C72 83 32 88 14 73Z',
  'M8 65C32 72 65 69 93 57M14 73C36 80 70 76 92 64',
  'M29 13V71M56 3V69M79 12V64',
  'M29 17C19 14 14 19 18 28L29 32Z',
  'M29 34C16 28 11 38 18 47L29 51Z',
  'M29 53C19 47 15 56 23 66L29 70Z',
  'M56 8C46 3 39 9 42 20L56 25Z',
  'M56 29C40 22 35 32 43 44L56 49Z',
  'M56 51C41 44 37 54 46 65L56 69Z',
  'M80 16Q92 30 95 48L80 56Z',
  'M1 61L29 48M8 65L29 58M29 69L56 38M56 68L79 42M29 13L34 12V16H29M56 3H62V7H56',
];
// Paths 2, 3 and 11 are outline-only; the rest are white fills.
const STROKE_ONLY = new Set([1, 2, 10]);

const tocMarkup = SECTIONS.map((s, i) =>
  `<button type="button" class="st-toc-item" data-index="${i}"><span class="st-toc-text">${s.title}</span></button>`
).join("");
const articleMarkup = SECTIONS.map((s, i) => {
  const ps = s.paragraphs.map(p => `<p>${p}</p>`).join("");
  const ol = s.items ? `<ol>${s.items.map(item => `<li>${item}</li>`).join("")}</ol>` : "";
  return `<section data-index="${i}"><h3>${s.title}</h3>${ps}${ol}</section>`;
}).join("");

const scope = createSurface(target, {
  width: 1200,
  height: 918,
  responsive: false,
  markup: `
<main class="st-stage">
  <div class="st-contents">
    <p class="st-heading">Contents</p>
    <nav class="st-toc" aria-label="Table of contents">${tocMarkup}</nav>
  </div>
  <svg class="st-route" width="1200" height="918" viewBox="0 0 1200 918" aria-hidden="true" focusable="false">
    <line x1="228" y1="58" x2="228" y2="813" stroke="#aaaaaa" stroke-width="1.1" stroke-dasharray="3 3"></line>
    <circle cx="228" cy="58" r="3.5" fill="#ffffff" stroke="#aaaaaa" stroke-width="1.1"></circle>
    <circle cx="228" cy="58" r="1" fill="#aaaaaa"></circle>
    <circle cx="228" cy="813" r="3.5" fill="#ffffff" stroke="#aaaaaa" stroke-width="1.1"></circle>
    <circle cx="228" cy="813" r="1" fill="#aaaaaa"></circle>
    <path class="st-curve" d="" fill="none" stroke="#aaaaaa" stroke-width="1.1" stroke-dasharray="3 3"></path>
  </svg>
  <div class="st-article" tabindex="0" aria-label="Document">${articleMarkup}</div>
  <svg class="st-ship" viewBox="0 0 100 88" width="64" height="64" aria-hidden="true" focusable="false">
    <ellipse class="st-ripple" cx="51" cy="79" rx="24" ry="6" fill="none" stroke="#9b9b9b" stroke-width="0.65"></ellipse>
    <ellipse class="st-ripple" cx="51" cy="79" rx="45" ry="12.5" fill="none" stroke="#9b9b9b" stroke-width="0.65"></ellipse>
    <g fill="#ffffff" stroke="#454545" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
      ${SHIP_PATHS.map((d, i) => STROKE_ONLY.has(i) ? `<path d="${d}" fill="none"></path>` : `<path d="${d}"></path>`).join("")}
    </g>
  </svg>
</main>
`,
  css: `
.st-stage { position: absolute; left: 0; top: 0; width: 1200px; height: 918px; background: #ffffff; font-family: Inter, Arial, Helvetica, sans-serif; color: #222222; transform-origin: 0 0; overflow: hidden; }
.st-contents { position: absolute; left: 276px; top: 48px; width: 254px; }
.st-heading { margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; color: #222222; }
.st-toc { display: grid; gap: 14.5px; margin: 42px 0 0; }
.st-toc-item { display: block; width: 254px; padding: 0; border: 0; background: none; text-align: left; font: inherit; font-size: 16px; line-height: 23px; color: #949494; cursor: pointer; transition: transform .32s cubic-bezier(.22, 1, .36, 1), color .32s cubic-bezier(.22, 1, .36, 1); }
.st-toc-item:focus-visible { outline: 1px solid #555555; outline-offset: 2px; }
.st-toc-item[aria-current="location"] { color: #222222; transform: translateX(28px); }
.st-article { position: absolute; left: 684px; top: 0; width: 480px; height: 918px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; outline-offset: -1px; }
.st-article::-webkit-scrollbar { display: none; }
.st-article section { margin: 0 0 72px; }
.st-article section:last-child { margin-bottom: 420px; }
.st-article h3 { margin: 0; font-size: 32px; line-height: 40px; letter-spacing: -1px; font-weight: 500; color: #222222; }
.st-article p { margin: 24px 0 0; font-size: 20px; line-height: 31px; color: #424242; }
.st-article section > p:first-of-type { margin-top: 32px; }
.st-article ol { margin: 24px 0 0; padding-left: 30px; font-size: 20px; line-height: 31px; color: #424242; }
.st-route, .st-ship { position: absolute; left: 0; top: 0; pointer-events: none; }
.st-ship { left: 218px; will-change: transform; }
.st-ripple { opacity: 0; }
`, }, options);

const { document, window, requestAnimationFrame, cancelAnimationFrame, ResizeObserver, IntersectionObserver, matchMedia } = scope;
const root = document.querySelector(".st-stage");
const stage = root;
const article = document.querySelector(".st-article");
const nav = document.querySelector(".st-toc");
const buttons = [...nav.querySelectorAll(".st-toc-item")];
const sections = [...article.querySelectorAll("section")];
const curve = document.querySelector(".st-curve");
const ship = document.querySelector(".st-ship");
const ripples = [...ship.querySelectorAll(".st-ripple")];
const media = matchMedia("(prefers-reduced-motion: reduce)");

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeInOutCubic = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let sectionTops = [];
function measure() {
  sectionTops = sections.map(s => s.offsetTop);
  applyHeight();
}
// A shorter stage scales the whole 1200x918 composition so the full
// contents list stays visible, per the height option.
function applyHeight() {
  const h = options.height;
  const k = h && h > 0 ? Math.min(1, h / 918) : 1;
  stage.style.transform = k < 1 ? `scale(${k})` : "";
  stage.style.transformOrigin = "0 0";
}

let active = -1;
function setActive(i) {
  if (i === active) return;
  active = i;
  buttons.forEach((b, k) => {
    if (k === i) b.setAttribute("aria-current", "location");
    else b.removeAttribute("aria-current");
  });
  targetY = 48 + buttons[i].offsetTop + buttons[i].offsetHeight / 2;
}

// --- sailing state ---
let y = 0, vy = 0, targetY = 0, roll = 0, yaw = 0, phase = 0;
let scrollSpeed = 0, prevScroll = 0;
let jump = null, lockActive = false;
let last = 0, raf = 0, running = false, visible = true;
let measured = false;

function curveFor(c) {
  return `M22 58 L22 ${c - 54} C22 ${c - 30} 48 ${c - 30} 48 ${c} C48 ${c + 30} 22 ${c + 30} 22 ${c + 54} L22 813`;
}

function start() {
  if (running || !visible || document.hidden) return;
  running = true;
  last = 0;
  prevScroll = article.scrollTop;
  raf = requestAnimationFrame(frame);
}
function stop() {
  running = false;
  cancelAnimationFrame(raf);
}

function interruptJump() {
  jump = null;
  lockActive = false;
}

function jumpTo(i) {
  const to = Math.max(0, sectionTops[i] - 92);
  if (media.matches) {
    interruptJump();
    article.scrollTop = to;
    setActive(i);
    y = targetY;
    roll = 0; yaw = 0;
    return;
  }
  setActive(i);
  jump = { from: article.scrollTop, to, t: 0, dur: clamp(.65 + Math.abs(to - article.scrollTop) / 4200, .65, 1.45) };
}

function setActiveFromScroll() {
  if (lockActive) return;
  const top = article.scrollTop;
  const anchor = top + 180;
  let idx = 0;
  for (let i = 0; i < sectionTops.length; i++) if (sectionTops[i] <= anchor) idx = i;
  const max = article.scrollHeight - article.clientHeight;
  if (top >= max - 1) idx = sectionTops.length - 1;
  setActive(idx);
}

function step(dt, now) {
  const still = media.matches;
  if (jump) {
    jump.t += dt;
    const k = easeInOutCubic(Math.min(1, jump.t / jump.dur));
    article.scrollTop = jump.from + (jump.to - jump.from) * k;
    if (jump.t >= jump.dur) { jump = null; lockActive = false; }
  } else {
    setActiveFromScroll();
  }
  // Smooth the true scroll speed so the lean never flips abruptly.
  if (dt > 0) {
    const speed = clamp((article.scrollTop - prevScroll) / dt, -16000, 16000);
    scrollSpeed += (speed - scrollSpeed) * (1 - Math.exp(-dt * 10));
  }
  prevScroll = article.scrollTop;
  if (!still) phase += dt;
  // Damped spring, semi-implicit Euler, capped step.
  const sdt = Math.min(.032, dt);
  vy += (180 * (targetY - y) - 24 * vy) * sdt;
  y += vy * sdt;
  if (Math.abs(targetY - y) < .1 && Math.abs(vy) < .2) { y = targetY; vy = 0; }
  if (still) { y = targetY; vy = 0; }
  // Lean and yaw follow velocity, smoothed scroll speed and a gentle sway.
  const rollTarget = clamp(vy * .035 + scrollSpeed * .012, -20, 20) + (still ? 0 : Math.sin(phase * 1.8) * 1.4);
  const yawTarget = clamp(vy * .05 + scrollSpeed * .06, -48, 48) + (still ? 0 : Math.sin(phase * .9) * 3);
  const lerp = 1 - Math.exp(-dt * 12);
  roll += (rollTarget - roll) * lerp;
  yaw += (yawTarget - yaw) * lerp;
  if (still) { roll = 0; yaw = 0; }
}

function draw() {
  const still = media.matches;
  const c = clamp(y + (still ? 0 : Math.sin(phase * 2.2) * .85), 112, 759);
  curve.setAttribute("d", curveFor(c));
  ship.style.transform = `translateY(${c - 32}px) perspective(300px) rotateY(${yaw}deg) rotateZ(${roll}deg)`;
  ripples.forEach((r, i) => {
    if (still) { r.style.opacity = "0"; return; }
    const p = (phase / 2.4 + i / 2) % 1;
    r.setAttribute("rx", String(24 + 42 * p));
    r.setAttribute("ry", String(6 + 13 * p));
    r.style.opacity = String(Math.pow(Math.sin(p * Math.PI), 2) * .24);
  });
}

function frame(now) {
  const dt = last ? Math.min(.032, (now - last) / 1000) : 0;
  last = now;
  step(dt, now);
  draw();
  raf = requestAnimationFrame(frame);
}

// --- initial placement: wait for fonts plus two painted frames, then
// open the document at section 4 so embedded previews never stay at 1. ---
(async () => {
  try {
    await Promise.race([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(resolve => setTimeout(resolve, 900)),
    ]);
  } catch {}
  requestAnimationFrame(() => requestAnimationFrame(() => {
    measure();
    setActive(3);
    article.scrollTop = sectionTops[3] - 92;
    prevScroll = article.scrollTop;
    y = targetY;
    measured = true;
    root.dataset.ready = "true";
    start();
  }));
})();

article.addEventListener("scroll", () => {
  if (measured) setActiveFromScroll();
});
// Direct input cancels a running jump; the reader takes over.
["wheel", "touchmove"].forEach(type => article.addEventListener(type, interruptJump, { passive: true }));
article.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) interruptJump();
});
buttons.forEach((b, i) => {
  b.addEventListener("click", () => { jumpTo(i); });
  b.addEventListener("keydown", e => {
    let next = null;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active + buttons.length - 1) % buttons.length;
    else if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % buttons.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    else return;
    e.preventDefault();
    buttons[next].focus();
  });
});

const visibilityObserver = new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  if (visible && !document.hidden) start();
  else stop();
}, { threshold: 0 });
visibilityObserver.observe(root);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
  else { last = 0; prevScroll = article.scrollTop; start(); }
});

new ResizeObserver(() => { measure(); applyHeight(); }).observe(root);
measure();
applyHeight();

scope.ready();
return scope.controller;
}
