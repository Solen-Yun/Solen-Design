// src/lib/motion-core/notes-text-color.mjs
import { gsap } from "gsap";
import { createSurface } from "./motion-runtime";

// src/data/notes-text-color.mjs
var NOTES_TEXT = [
  "Mon. Client call at 11. Drink coffee before it this time",
  "Feedback from Yaroslav: make the logo bigger. Also smaller. Ideally both by Friday",
  "Ideas I\u2019ll never ship: a calendar that cancels meetings for you. A Figma plugin that renames every Frame 2847",
  "Thing I keep relearning: nobody reads the case study. People read the first line and look at the pictures, so that\u2019s where the time goes \u25C9",
  "Rent due on the 5th. Dentist on the 9th, don\u2019t move it again. Renew the portfolio domain, it lapsed last year",
  "Note to self: the good idea usually shows up on the walk home. Take the long way and write it down before the crosswalk",
  "Remember to send the proposal. Keep it simple, then make it a little better tomorrow."
];
var NOTES_COLORS = [
  { id: "white", name: "White", ink: "#eeeeef", center: "#d0d3db", color: "#e5e7ed", edge: "#ffffff" },
  { id: "rose", name: "Rose", ink: "#f38aa7", center: "#ef4265", color: "#f57191", edge: "#ffb1c8" },
  { id: "yellow", name: "Yellow", ink: "#e6cf67", center: "#c9a522", color: "#e1c54b", edge: "#fff0a3" },
  { id: "green", name: "Green", ink: "#77f172", center: "#16df19", color: "#4beb40", edge: "#b2ff91" },
  { id: "cyan", name: "Cyan", ink: "#80e9e6", center: "#11bfc4", color: "#4ae3df", edge: "#a4fff1" },
  { id: "blue", name: "Blue", ink: "#9c86f3", center: "#3e18e7", color: "#6943ef", edge: "#a790ff" },
  { id: "purple", name: "Purple", ink: "#b17ee6", center: "#8e08ce", color: "#a637e7", edge: "#d59aff" },
  { id: "pink", name: "Pink", ink: "#e68dd4", center: "#dd4eb2", color: "#ed82d2", edge: "#ffc2ee" }
];

// src/lib/motion-core/notes-text-color.mjs
function createNotesTextColor(target, options, CSS2, markup) {
  const scope = createSurface(target, { css: CSS2, markup, width: 900, height: 1080 }, options);
  const { root, on, window: win } = scope, doc = target.ownerDocument;
  const scene = root.querySelector(".nc-scene"), screen = root.querySelector(".nc-screen");
  const scroll = root.querySelector(".nc-scroll"), article = root.querySelector(".nc-article");
  const overlay = root.querySelector(".nc-overlay"), palette = root.querySelector(".nc-palette");
  const history = root.querySelector(".nc-history"), live = root.querySelector(".nc-live");
  const swatches = [...root.querySelectorAll(".nc-swatch")], custom = root.querySelector(".nc-custom");
  const highlights = [], handles = ["start", "end"].map((edge) => {
    const handle = doc.createElement("button");
    handle.type = "button";
    handle.tabIndex = -1;
    handle.className = "nc-selection-handle";
    handle.dataset.edge = edge;
    handle.setAttribute("aria-label", `Adjust selection ${edge}`);
    overlay.append(handle);
    return handle;
  });
  overlay.hidden = true;
  const fit = () => {
    root.querySelector(".nc-device-wrap").style.transform = `translate(-50%,-50%) scale(${Math.max(0.1, Math.min(1.17, (scene.clientHeight - 80) / 844, (scene.clientWidth - 48) / 400))})`;
    if (open) position();
  };
  const tweens = /* @__PURE__ */ new Set();
  let saved = null, active = 3, open = false, suppress = false, selecting = false, selectionTimer = 0, longPress = 0, drag = null, dead = false;
  const paragraphs = NOTES_TEXT.map((text) => ({ text, colors: Array(text.length).fill("") }));
  const nodes = paragraphs.map((_, i) => {
    const p = doc.createElement("p");
    p.tabIndex = 0;
    p.dataset.index = i;
    p.setAttribute("aria-label", `Note ${i + 1}. Press Enter to select text and choose a color.`);
    article.append(p);
    return p;
  });
  const offsetAt = (i) => paragraphs.slice(0, i).reduce((sum, p) => sum + p.text.length, 0);
  const find = (index, text) => {
    const start = offsetAt(index) + paragraphs[index].text.indexOf(text);
    return { start, end: start + text.length };
  };
  const initial = [{ ...find(2, "Frame 2847"), color: NOTES_COLORS[6].ink }, { ...find(1, "bigger"), color: NOTES_COLORS[2].ink }, { ...find(1, "smaller"), color: NOTES_COLORS[4].ink }, { ...find(4, "Rent"), color: NOTES_COLORS[7].ink }];
  let recent = [];
  const motion = (element, vars) => {
    if (!element) return;
    gsap.killTweensOf(element);
    if (scope.reduced()) {
      const rest = { ...vars };
      delete rest.duration;
      delete rest.ease;
      delete rest.onComplete;
      gsap.set(element, rest);
      vars.onComplete?.();
      return;
    }
    let tween;
    tween = gsap.to(element, { ...vars, onComplete() {
      tweens.delete(tween);
      vars.onComplete?.();
    } });
    tweens.add(tween);
  };
  const selection = () => root.getSelection?.() ?? doc.getSelection();
  const owned = (range) => range && article.contains(range.startContainer) && article.contains(range.endContainer);
  const rangeFor = (start, end) => {
    const walker = doc.createTreeWalker(article, 4);
    let node, total = 0, first = null, last = null;
    while (node = walker.nextNode()) {
      const next = total + node.length;
      if (!first && start >= total && start < next) first = [node, start - total];
      if (end > total && end <= next) {
        last = [node, end - total];
        break;
      }
      total = next;
    }
    if (!first || !last) return null;
    const range = doc.createRange();
    range.setStart(...first);
    range.setEnd(...last);
    return range;
  };
  const textFor = (range) => NOTES_TEXT.join("").slice(range.start, range.end);
  const same = (a, b) => a && b && a.start === b.start && a.end === b.end;
  const colorAt = (index) => {
    let base = 0;
    for (const p of paragraphs) {
      if (index < base + p.text.length) return p.colors[index - base] || NOTES_COLORS[0].ink;
      base += p.text.length;
    }
    return NOTES_COLORS[0].ink;
  };
  function paintParagraph(index) {
    const { text, colors } = paragraphs[index], fragment = doc.createDocumentFragment();
    for (let start = 0; start < text.length; ) {
      let end = start + 1;
      while (end < text.length && colors[end] === colors[start]) end++;
      const span = doc.createElement("span");
      span.textContent = text.slice(start, end);
      if (colors[start]) {
        span.style.setProperty("--nc-ink", colors[start]);
        span.dataset.colored = "";
      }
      fragment.append(span);
      start = end;
    }
    nodes[index].replaceChildren(fragment);
  }
  function setColor(range, color) {
    const affected = [];
    let base = 0, split = false;
    paragraphs.forEach((p, i) => {
      const begin = Math.max(0, range.start - base), end = Math.min(p.text.length, range.end - base);
      base += p.text.length;
      if (begin >= end) return;
      p.colors.fill(color, begin, end);
      let offset = 0;
      for (const original of [...nodes[i].children]) {
        const length = original.textContent.length, from = Math.max(0, begin - offset), to = Math.min(length, end - offset);
        offset += length;
        if (from >= to) continue;
        let span = original;
        if (to < length) {
          const tail = span.cloneNode(false);
          tail.style.removeProperty("color");
          tail.append(span.firstChild.splitText(to));
          span.after(tail);
          split = true;
        }
        if (from > 0) {
          const selected = span.cloneNode(false);
          selected.style.removeProperty("color");
          selected.append(span.firstChild.splitText(from));
          span.after(selected);
          span = selected;
          split = true;
        }
        const previous = win.getComputedStyle(span).color;
        span.style.setProperty("--nc-ink", color);
        span.dataset.colored = "";
        affected.push({ span, previous });
      }
    });
    return { affected, split };
  }
  function focusParagraph(index, end = index) {
    active = index;
    nodes.forEach((p, i) => {
      const selected = i >= index && i <= end;
      if (p.dataset.active === String(selected)) return;
      p.dataset.active = String(selected);
      motion(p, { opacity: selected ? 1 : 0.15, filter: selected ? "blur(0px)" : "blur(.35px)", duration: 0.16, ease: "power2.out" });
    });
    scene.dataset.active = String(index);
  }
  function indexFor(offset) {
    let base = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      base += paragraphs[i].text.length;
      if (offset < base) return i;
    }
    return paragraphs.length - 1;
  }
  function restore() {
    if (!saved) return;
    const range = rangeFor(saved.start, saved.end), current = selection();
    if (!range || !current) return;
    suppress = true;
    current.setBaseAndExtent(range.startContainer, range.startOffset, range.endContainer, range.endOffset);
    scope.clearTimeout(selectionTimer);
    selectionTimer = scope.setTimeout(() => {
      suppress = false;
    }, 30);
  }
  function recentList() {
    history.replaceChildren();
    recent.slice(0, 4).forEach((entry) => {
      const button = doc.createElement("button");
      button.type = "button";
      button.className = "nc-recent";
      button.style.setProperty("--nc-recent", entry.color);
      button.setAttribute("aria-label", `Select ${textFor(entry)}`);
      const label = doc.createElement("span");
      label.textContent = textFor(entry);
      button.append(label);
      button.dataset.start = String(entry.start);
      button.dataset.end = String(entry.end);
      history.append(button);
    });
  }
  function remember(range) {
    const existing = recent.find((entry) => same(entry, range));
    recent = recent.filter((entry) => !same(entry, range));
    recent.unshift({ ...range, color: existing?.color ?? colorAt(range.start) });
    recent = recent.slice(0, 4);
    recentList();
  }
  const updateSwatches = (color) => swatches.forEach((button) => button.setAttribute("aria-checked", String(button.dataset.ink === color || button.dataset.color === "custom" && !NOTES_COLORS.some((c) => c.ink === color))));
  function position() {
    if (!saved || !open) return;
    const range = rangeFor(saved.start, saved.end);
    if (!range) return;
    const bounds = screen.getBoundingClientRect(), scale = bounds.width / screen.offsetWidth;
    const rows = [];
    for (const r of range.getClientRects()) {
      if (r.width < 0.1 || r.height < 1) continue;
      const box = { x: (r.left - bounds.left) / scale, y: (r.top - bounds.top) / scale, w: r.width / scale, h: r.height / scale };
      const previous = rows.at(-1);
      if (previous && Math.abs(previous.y - box.y) < 2 && box.x <= previous.x + previous.w + 2) {
        previous.w = Math.max(previous.x + previous.w, box.x + box.w) - previous.x;
        previous.h = Math.max(previous.h, box.h);
      } else rows.push(box);
    }
    if (!rows.length) return;
    const first = rows[0], last = rows.at(-1), viewTop = scroll.offsetTop, viewBottom = viewTop + scroll.clientHeight;
    if (last.y < viewTop + 20 || first.y > viewBottom - 20) {
      close(false);
      return;
    }
    const color = colorAt(saved.start), isWhite = color === NOTES_COLORS[0].ink;
    overlay.hidden = false;
    const articleRight = (article.getBoundingClientRect().right - bounds.left) / scale - 25;
    while (highlights.length > rows.length) highlights.pop().remove();
    rows.forEach((box, i) => {
      let mark = highlights[i];
      if (!mark) {
        mark = doc.createElement("div");
        mark.className = "nc-highlight";
        overlay.insertBefore(mark, handles[0]);
        highlights.push(mark);
      }
      Object.assign(mark.style, { left: `${box.x}px`, top: `${box.y}px`, width: `${i < rows.length - 1 ? Math.max(box.w, articleRight - box.x) : box.w}px`, height: `${box.h}px`, background: color });
      mark.style.opacity = isWhite ? ".2" : ".32";
    });
    for (const [handle, box, x2] of [[handles[0], first, first.x], [handles[1], last, last.x + last.w]]) Object.assign(handle.style, { left: `${x2}px`, top: `${box.y}px`, height: `${box.h}px` });
    const left = Math.min(...rows.map((r) => r.x)), right = Math.max(...rows.map((r) => r.x + r.w));
    const width = palette.offsetWidth, anchor = rows.length > 1 ? screen.clientWidth / 2 : (left + right) / 2, x = Math.max(12, Math.min(screen.clientWidth - width - 12, anchor - width / 2));
    const h = palette.offsetHeight, above = first.y - h - 17, below = above < 98;
    palette.dataset.side = below ? "below" : "above";
    palette.style.left = `${x}px`;
    palette.style.top = `${below ? Math.min(viewBottom - h - 5, last.y + last.h + 17) : above}px`;
    palette.style.setProperty("--nc-arrow", `${Math.max(18, Math.min(width - 18, anchor - x))}px`);
    scene.dataset.selection = textFor(saved);
    scene.dataset.color = color;
    updateSwatches(color);
  }
  function show(range, { keyboard = false, keepHistory = false, native = false } = {}) {
    if (!range || range.start >= range.end) return;
    const changed = !same(saved, range);
    saved = { ...range };
    focusParagraph(indexFor(range.start), indexFor(range.end - 1));
    if (!keepHistory && (changed || !same(recent[0], range))) remember(range);
    if (!native) restore();
    const wasOpen = open;
    open = true;
    palette.inert = false;
    palette.setAttribute("aria-hidden", "false");
    scene.dataset.open = "true";
    position();
    if (!wasOpen) {
      gsap.set(palette, { opacity: 0, visibility: "visible", scale: scope.reduced() ? 1 : 0.82, y: scope.reduced() ? 0 : 7 });
      motion(palette, { opacity: 1, scale: 1, y: 0, duration: 0.18, ease: "back.out(1.45)" });
    }
    if (keyboard) swatches.find((button) => button.getAttribute("aria-checked") === "true")?.focus({ preventScroll: true });
  }
  function close(returnFocus = true) {
    open = false;
    saved = null;
    overlay.hidden = true;
    palette.inert = true;
    palette.setAttribute("aria-hidden", "true");
    scene.dataset.open = "false";
    delete scene.dataset.selection;
    custom.hidden = true;
    motion(palette, { autoAlpha: 0, scale: 0.92, y: 3, duration: 0.14, ease: "power2.in" });
    const current = selection();
    if (current?.rangeCount && owned(current.getRangeAt(0))) {
      suppress = true;
      current.removeAllRanges();
      scope.clearTimeout(selectionTimer);
      selectionTimer = scope.setTimeout(() => {
        suppress = false;
      }, 30);
    }
    if (returnFocus) nodes[active].focus({ preventScroll: true });
  }
  function commit(color, button) {
    if (!saved) return;
    const range = { ...saved };
    const { affected, split } = setColor(range, color);
    if (split) restore();
    recent.forEach((entry) => {
      if (same(entry, range)) entry.color = color;
    });
    for (const entry of recent) {
      const row = [...history.children].find((node) => Number(node.dataset.start) === entry.start && Number(node.dataset.end) === entry.end);
      row?.style.setProperty("--nc-recent", entry.color);
    }
    position();
    for (const { span, previous } of affected) {
      gsap.killTweensOf(span);
      span.style.removeProperty("color");
      if (!scope.reduced()) {
        gsap.set(span, { color: previous });
        motion(span, { color, duration: 0.14, ease: "power1.out", clearProps: "color" });
      }
    }
    if (!scope.reduced() && button) {
      gsap.set(button, { scale: 0.9 });
      motion(button, { scale: 1, duration: 0.18, ease: "back.out(2)" });
    }
    live.textContent = `${button?.getAttribute("aria-label") ?? "Custom color"} applied to ${textFor(range)}`;
  }
  function capture() {
    if (dead || suppress || drag) return;
    const current = selection();
    if (!current?.rangeCount || current.isCollapsed) return;
    const range = current.getRangeAt(0);
    if (!owned(range)) return;
    const prefix = doc.createRange();
    prefix.selectNodeContents(article);
    prefix.setEnd(range.startContainer, range.startOffset);
    const start = prefix.toString().length;
    show({ start, end: start + range.toString().length }, { native: true, keepHistory: selecting });
  }
  function caret(event) {
    const hit = doc.caretPositionFromPoint?.(event.clientX, event.clientY, { shadowRoots: [root] });
    const fallback = hit ? null : doc.caretRangeFromPoint?.(event.clientX, event.clientY);
    const node = hit?.offsetNode ?? fallback?.startContainer, offset = hit?.offset ?? fallback?.startOffset;
    if (!node || !article.contains(node)) return null;
    const prefix = doc.createRange();
    prefix.selectNodeContents(article);
    prefix.setEnd(node, offset);
    return prefix.toString().length;
  }
  function selectWord(event, p) {
    const index = Number(p.dataset.index), base = offsetAt(index), text = paragraphs[index].text;
    const at = caret(event), local = at === null ? Math.floor(text.length / 2) : Math.max(0, Math.min(text.length - 1, at - base));
    let a = local, b = local;
    while (a > 0 && !/\s/.test(text[a - 1])) a--;
    while (b < text.length && !/\s/.test(text[b])) b++;
    show({ start: base + a, end: base + b });
  }
  on(doc, "selectionchange", () => {
    if (!suppress && !drag) {
      scope.clearTimeout(selectionTimer);
      selectionTimer = scope.setTimeout(capture, 40);
    }
  });
  on(article, "pointerup", (event) => {
    selecting = false;
    if (event.pointerType !== "touch") scope.setTimeout(capture, 0);
  });
  on(win, "pointerup", () => {
    if (selecting) {
      selecting = false;
      scope.setTimeout(capture, 0);
    }
  });
  on(win, "pointercancel", () => {
    selecting = false;
    scope.clearTimeout(longPress);
  });
  on(article, "click", (event) => {
    const p = event.target.closest("p");
    if (!p) return;
    const current = selection();
    if (current && !current.isCollapsed && owned(current.getRangeAt(0))) return;
    focusParagraph(Number(p.dataset.index));
    if (event.target.matches("[data-colored]")) {
      const range = doc.createRange();
      range.selectNodeContents(event.target);
      const prefix = doc.createRange();
      prefix.selectNodeContents(article);
      prefix.setEnd(range.startContainer, range.startOffset);
      const start = prefix.toString().length;
      show({ start, end: start + range.toString().length });
    } else if (open) close(false);
  });
  on(article, "keydown", (event) => {
    const p = event.target.closest("p");
    if (!p) return;
    if (event.key === "Enter" || (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
      event.preventDefault();
      const index = Number(p.dataset.index), start = offsetAt(index);
      show({ start, end: start + paragraphs[index].text.length }, { keyboard: event.key === "Enter" });
    }
  });
  on(palette, "pointerdown", (event) => {
    if (event.target.closest("button")) event.preventDefault();
  });
  on(palette, "click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.matches(".nc-swatch")) {
      if (button.dataset.color === "custom") {
        custom.hidden = !custom.hidden;
        position();
        if (!custom.hidden) custom.querySelector("input").focus({ preventScroll: true });
      } else commit(button.dataset.ink, button);
    }
    if (button.matches(".nc-recent")) {
      const range = { start: Number(button.dataset.start), end: Number(button.dataset.end) };
      const p = nodes[indexFor(range.start)];
      scroll.scrollTop = Math.max(0, p.offsetTop - 250);
      show(range);
    }
  });
  on(palette, "keydown", (event) => {
    const index = swatches.indexOf(event.target);
    if (index < 0) return;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 9;
    else if (event.key === "ArrowLeft") next = (index + 8) % 9;
    else if (event.key === "ArrowDown") next = (index + 3) % 9;
    else if (event.key === "ArrowUp") next = (index + 6) % 9;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 8;
    else return;
    event.preventDefault();
    swatches[next].focus();
  });
  on(custom.querySelector("input"), "input", (event) => commit(`hsl(${event.target.value} 76% 72%)`, swatches[8]));
  on(root, "keydown", (event) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
    }
  });
  on(root, "pointerdown", (event) => {
    if (!palette.contains(event.target) && !article.contains(event.target) && !overlay.contains(event.target) && open) close(false);
  });
  on(scroll, "scroll", position, { passive: true });
  on(win, "resize", position);
  on(article, "pointerdown", (event) => {
    selecting = event.pointerType !== "touch";
    scope.clearTimeout(longPress);
    if (event.pointerType !== "touch") return;
    const p = event.target.closest("p");
    if (!p) return;
    const x = event.clientX, y = event.clientY;
    scene.__touch = { x, y };
    longPress = scope.setTimeout(() => {
      selectWord(event, p);
      scene.__touch = null;
    }, 380);
  });
  on(article, "pointermove", (event) => {
    const touch = scene.__touch;
    if (touch && Math.hypot(event.clientX - touch.x, event.clientY - touch.y) > 8) {
      scope.clearTimeout(longPress);
      scene.__touch = null;
    }
  });
  for (const type of ["pointerup", "pointercancel"]) on(article, type, () => {
    scope.clearTimeout(longPress);
    scene.__touch = null;
  });
  on(overlay, "pointerdown", (event) => {
    const handle = event.target.closest(".nc-selection-handle");
    if (!handle || !saved) return;
    event.preventDefault();
    drag = { edge: handle.dataset.edge, range: { ...saved }, pointer: event.pointerId };
    overlay.setPointerCapture(event.pointerId);
  });
  on(overlay, "pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointer) return;
    const at = caret(event);
    if (at === null) return;
    const range = drag.edge === "start" ? { start: Math.min(at, drag.range.end - 1), end: drag.range.end } : { start: drag.range.start, end: Math.max(at, drag.range.start + 1) };
    show(range, { keepHistory: true });
  });
  const endDrag = (event) => {
    if (drag && event.pointerId === drag.pointer) {
      if (overlay.hasPointerCapture(event.pointerId)) overlay.releasePointerCapture(event.pointerId);
      drag = null;
      if (saved) remember(saved);
    }
  };
  on(overlay, "pointerup", endDrag);
  on(overlay, "pointercancel", endDrag);
  on(overlay, "lostpointercapture", () => {
    drag = null;
  });
  function reset() {
    close(false);
    paragraphs.forEach((p, i) => {
      p.colors.fill("");
      paintParagraph(i);
    });
    initial.forEach((entry) => setColor(entry, entry.color));
    setColor(find(4, "Dentist"), NOTES_COLORS[7].ink);
    recent = initial.map((entry) => ({ ...entry }));
    recentList();
    focusParagraph(3);
    scroll.scrollTop = 65;
    live.textContent = "Notes reset";
  }
  on(root.querySelector(".nc-done"), "click", () => close(false));
  on(root.querySelector(".nc-back"), "click", reset);
  reset();
  fit();
  const resize = new scope.ResizeObserver(fit);
  resize.observe(scene);
  scene.dataset.open = "false";
  scene.dataset.ready = "true";
  scope.body.dataset.motionReady = "true";
  scope.addCleanup(() => {
    dead = true;
    const current = selection();
    if (current?.rangeCount && owned(current.getRangeAt(0))) current.removeAllRanges();
    tweens.forEach((tween) => tween.kill());
    gsap.killTweensOf([palette, ...nodes, ...swatches, ...article.querySelectorAll("span")]);
    overlay.replaceChildren();
  });
  scope.ready();
  return scope.controller;
}

// src/lib/motion-core/notes-entry.js
var CSS = 'html,body{margin:0;width:100%;min-height:100%;background:#08090a}*{box-sizing:border-box}.nc-scene{position:relative;width:100%;height:var(--motion-height,1080px);overflow:hidden;background:radial-gradient(ellipse at 47% 54%,#0b1110 0,#090b0b 36%,#08090a 73%);font-family:Arial,Helvetica,sans-serif;color:#f4f4f5;-webkit-font-smoothing:antialiased}.nc-device-wrap{position:absolute;left:50%;top:50%;width:400px;height:844px;transform:translate(-50%,-50%) scale(1.17)}.nc-device{position:relative;width:400px;height:844px;padding:9px;border:2px solid #444447;border-radius:62px;background:linear-gradient(115deg,#202023,#08080a 35%,#242427 75%,#111113);box-shadow:0 0 0 2px #111113,inset 0 0 0 2px #29292d,0 22px 35px #0008}.nc-device::before,.nc-device::after{content:"";position:absolute;left:-5px;width:3px;border-radius:2px;background:#323235}.nc-device::before{top:140px;height:31px;box-shadow:0 65px #323235,0 130px #323235}.nc-device::after{left:auto;right:-5px;top:220px;height:88px}.nc-screen{position:relative;width:100%;height:100%;overflow:hidden;border-radius:49px;background:#111113;border:1px solid #050506}.nc-status{height:51px;display:flex;align-items:center;justify-content:space-between;padding:0 38px 0 55px;font-size:16px;font-weight:600;user-select:none}.nc-island{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:120px;height:35px;border-radius:22px;background:#000}.nc-system{display:flex;align-items:center;gap:5px}.nc-system svg{width:15px;height:15px;stroke-width:2.6}.nc-battery{width:21px;height:11px;border:1px solid #969699;border-radius:3px;padding:1px;position:relative}.nc-battery::before{content:"";display:block;background:#f5f5f5;border-radius:1px;height:100%}.nc-battery::after{content:"";position:absolute;right:-3px;top:3px;width:2px;height:4px;border-radius:1px;background:#707074}.nc-nav{height:43px;display:flex;align-items:center;justify-content:space-between;padding:0 25px 0 22px;position:relative;z-index:2;user-select:none}.nc-nav button{border:0;background:none;color:#eee;font:600 14px Arial,Helvetica,sans-serif;padding:8px 0;cursor:pointer}.nc-nav .nc-back{display:flex;align-items:center;gap:0;color:#8c8c90;font-weight:400}.nc-back svg{height:15px;width:12px}.nc-nav strong{position:absolute;left:50%;transform:translateX(-50%);font-size:14px;white-space:nowrap}.nc-scroll{position:absolute;inset:112px 0 35px;overflow:auto;scrollbar-width:none;overscroll-behavior:contain;mask-image:linear-gradient(transparent,#000 54px,#000 calc(100% - 66px),transparent);-webkit-mask-image:linear-gradient(transparent,#000 54px,#000 calc(100% - 66px),transparent)}.nc-scroll::-webkit-scrollbar{display:none}.nc-article{padding:24px 25px 84px;font-size:20px;line-height:25px;letter-spacing:-.1px;user-select:text;-webkit-user-select:text;cursor:text}.nc-article p{position:relative;margin:0 0 25px;outline:none;opacity:.15;filter:blur(.35px);overflow-wrap:break-word}.nc-article p[data-active=true]{opacity:1;filter:none}.nc-article p:focus-visible{outline:1px solid #83838b;outline-offset:7px;border-radius:3px}.nc-article span{color:var(--nc-ink,inherit)}.nc-article ::selection,.nc-article::selection{background:transparent;color:inherit}.nc-overlay{position:absolute;inset:0;pointer-events:none;z-index:3;overflow:hidden}.nc-highlight{position:absolute;background:#ffffff35;border-radius:2px;transition:background-color .15s}.nc-selection-handle{position:absolute;width:20px;margin-left:-10px;border:0;background:none;padding:0;color:#eee;pointer-events:auto;touch-action:none;cursor:ew-resize}.nc-selection-handle::before{content:"";position:absolute;left:9px;top:0;width:1px;height:100%;background:currentColor}.nc-selection-handle::after{content:"";position:absolute;left:6px;width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 1px #fff}.nc-selection-handle[data-edge=start]::after{top:-5px}.nc-selection-handle[data-edge=end]::after{bottom:-5px}.nc-palette{position:absolute;z-index:5;width:180px;min-height:84px;padding:12px;border:1px solid #ffffff05;border-radius:16px;background:linear-gradient(140deg,#353638e8,#242527f5);box-shadow:0 9px 24px #0006,inset 0 1px 1px #ffffff08;backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);transform-origin:50% calc(100% + 8px);opacity:0;visibility:hidden;user-select:none;touch-action:manipulation}.nc-palette::after{content:"";position:absolute;bottom:-8px;left:calc(var(--nc-arrow,50%) - 8px);width:16px;height:16px;border-radius:0 0 5px 0;background:#252628;transform:rotate(45deg);z-index:-1}.nc-palette[data-side=below]{transform-origin:50% -8px}.nc-palette[data-side=below]::after{top:-8px;bottom:auto;border-radius:5px 0 0 0;background:#323335}.nc-palette-main{display:flex;gap:9px}.nc-colors{display:grid;grid-template-columns:repeat(3,17px);gap:6px;align-self:start}.nc-swatch{position:relative;width:17px;height:17px;border:0;border-radius:50%;padding:0;cursor:pointer;background:radial-gradient(circle at 45% 33%,var(--nc-center) 5%,var(--nc-color) 50%,var(--nc-edge) 100%);box-shadow:inset 0 0 2px 1px #ffffff40,0 0 8px -3px var(--nc-color);outline:none}.nc-swatch::after{content:"";position:absolute;inset:-3px;border:1px solid #b5b5b7;border-radius:50%;opacity:0}.nc-swatch[aria-checked=true]::after,.nc-swatch:focus-visible::after{opacity:1}.nc-swatch[data-color=custom]{background:conic-gradient(#8b50ef,#ec54c2,#ec545f,#e5c747,#79e54c,#4ee4cb,#5c9aee,#8b50ef);box-shadow:none}.nc-swatch[data-color=custom]::before{content:"";position:absolute;inset:2px;border-radius:50%;background:#292a2e}.nc-history{display:flex;flex-direction:column;gap:3px;width:85px;min-width:0}.nc-recent{display:flex;align-items:center;position:relative;overflow:hidden;width:100%;height:13px;min-height:13px;padding:0 4px;border:0;border-radius:4px;background:#ffffff04;cursor:pointer;text-align:left;color:#bdbdc0;font:500 7.2px Arial,Helvetica,sans-serif;white-space:nowrap}.nc-recent::before{content:"";width:2px;height:7px;border-radius:2px;background:var(--nc-recent);margin-right:4px;flex:none;box-shadow:0 0 3px var(--nc-recent)}.nc-recent span{overflow:hidden;mask-image:linear-gradient(#000,#000);filter:blur(.35px);opacity:.5}.nc-recent:first-child{color:white;background:#ffffff06}.nc-recent:first-child span,.nc-recent:hover span,.nc-recent:focus-visible span{filter:none;opacity:1}.nc-recent::after{content:"";position:absolute;right:0;top:0;bottom:0;width:17px;background:linear-gradient(90deg,transparent,#2d2e30)}.nc-recent:focus-visible{outline:1px solid white;outline-offset:1px}.nc-custom{padding-top:11px}.nc-custom input{width:100%;height:5px;margin:0;appearance:none;border-radius:5px;background:linear-gradient(90deg,#f45e63,#eee36b,#75f570,#67e9ed,#7467eb,#f073d4,#f45e63);cursor:ew-resize}.nc-custom input::-webkit-slider-thumb{appearance:none;width:10px;height:10px;border:2px solid white;border-radius:50%;background:#6b63eb}.nc-home{position:absolute;width:132px;height:4px;left:50%;bottom:10px;transform:translateX(-50%);border-radius:4px;background:#ddd;user-select:none}.nc-live,.nc-instructions{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.nc-scene[data-reduced=true] .nc-highlight{transition:none}button:focus-visible,input:focus-visible{outline:1px solid #fff;outline-offset:3px}[hidden]{display:none!important}\r\n';
var MARKUP = '<main class="nc-scene notranslate" translate="no" aria-label="Notes text color"><div class="nc-device-wrap"><div class="nc-device"><section class="nc-screen" aria-label="Next week plans"><div class="nc-status" aria-hidden="true"><span>9:41</span><div class="nc-island"></div><div class="nc-system"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-signal" aria-hidden="true"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi" aria-hidden="true"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg><i class="nc-battery"></i></div></div><nav class="nc-nav" aria-label="Notes"><button class="nc-back" type="button" aria-label="Reset notes"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>Notes</button><strong>Next week plans</strong><button class="nc-done" type="button">Done</button></nav><div class="nc-scroll"><article class="nc-article" aria-label="Select note text to color"></article></div><div class="nc-overlay"></div><div class="nc-palette" role="dialog" aria-label="Text color" aria-hidden="true" inert><div class="nc-palette-main"><div class="nc-colors" role="radiogroup" aria-label="Colors"><button class="nc-swatch" type="button" role="radio" aria-label="White" aria-checked="false" data-color="white" data-ink="#eeeeef" style="--nc-center:#d0d3db;--nc-color:#e5e7ed;--nc-edge:#ffffff"></button><button class="nc-swatch" type="button" role="radio" aria-label="Rose" aria-checked="false" data-color="rose" data-ink="#f38aa7" style="--nc-center:#ef4265;--nc-color:#f57191;--nc-edge:#ffb1c8"></button><button class="nc-swatch" type="button" role="radio" aria-label="Yellow" aria-checked="false" data-color="yellow" data-ink="#e6cf67" style="--nc-center:#c9a522;--nc-color:#e1c54b;--nc-edge:#fff0a3"></button><button class="nc-swatch" type="button" role="radio" aria-label="Green" aria-checked="false" data-color="green" data-ink="#77f172" style="--nc-center:#16df19;--nc-color:#4beb40;--nc-edge:#b2ff91"></button><button class="nc-swatch" type="button" role="radio" aria-label="Cyan" aria-checked="false" data-color="cyan" data-ink="#80e9e6" style="--nc-center:#11bfc4;--nc-color:#4ae3df;--nc-edge:#a4fff1"></button><button class="nc-swatch" type="button" role="radio" aria-label="Blue" aria-checked="false" data-color="blue" data-ink="#9c86f3" style="--nc-center:#3e18e7;--nc-color:#6943ef;--nc-edge:#a790ff"></button><button class="nc-swatch" type="button" role="radio" aria-label="Purple" aria-checked="false" data-color="purple" data-ink="#b17ee6" style="--nc-center:#8e08ce;--nc-color:#a637e7;--nc-edge:#d59aff"></button><button class="nc-swatch" type="button" role="radio" aria-label="Pink" aria-checked="false" data-color="pink" data-ink="#e68dd4" style="--nc-center:#dd4eb2;--nc-color:#ed82d2;--nc-edge:#ffc2ee"></button><button class="nc-swatch" type="button" role="radio" aria-label="Custom color" aria-checked="false" data-color="custom"></button></div><div class="nc-history" aria-label="Recent colored selections"></div></div><div class="nc-custom" hidden><input type="range" min="0" max="360" value="270" aria-label="Custom color hue"></div></div><div class="nc-home" aria-hidden="true"></div><span class="nc-live" role="status" aria-live="polite"></span><span class="nc-instructions">Select text with the mouse, or focus a paragraph and press Enter to choose a color. Escape closes the palette.</span></section></div></div></main>';
function mountNotesTextColor(target, options = {}) {
  return createNotesTextColor(target, options, CSS, MARKUP);
}
export {
  mountNotesTextColor
};
