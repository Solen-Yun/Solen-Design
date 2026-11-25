// src/lib/motion-core/selection-flower.mjs
import { createSurface } from "./motion-runtime";
function createSelectionFlower(target, options, css, markup) {
  const scope = createSurface(target, { css, markup, width: 822, height: 720 }, options);
  const { root, on } = scope, doc = target.ownerDocument, win = doc.defaultView;
  const scene = root.querySelector(".sf-scene"), article = root.querySelector(".sf-article");
  const canvas = root.querySelector(".sf-canvas"), ctx = canvas.getContext("2d");
  const live = root.querySelector(".sf-live");
  const plants = /* @__PURE__ */ new Map(), colours = ["#f21b3f", "#ffb35b", "#f4d64c", "#9bc9ec", "#a47bdf", "#f1afd0", "#fff7db"];
  const nodes = [], walker = doc.createTreeWalker(article, 4);
  let node;
  while (node = walker.nextNode()) nodes.push(node);
  let seed = 1, session = 0, active = false, keyboard = false, dead = false, visible = true, frame = 0, last = 0, releaseTimer = 0, selectionFrame = 0, touch = null, keyBlock = null, keyEnd = 36;
  let width = 822, height = 720, dpr = 1;
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const randomFor = (value) => {
    let x = value || 1;
    return () => {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return (x >>> 0) / 4294967296;
    };
  };
  const getSelection = () => root.getSelection?.() ?? doc.getSelection();
  const owned = (range) => range && article.contains(range.startContainer) && article.contains(range.endContainer);
  function currentRange() {
    const selected = getSelection();
    if (!selected?.rangeCount || selected.isCollapsed) return null;
    const range = selected.getRangeAt(0);
    if (owned(range)) return range;
    const composed = selected.getComposedRanges?.({ shadowRoots: [root] })?.[0];
    if (!owned(composed)) return null;
    const inner = doc.createRange();
    inner.setStart(composed.startContainer, composed.startOffset);
    inner.setEnd(composed.endContainer, composed.endOffset);
    return inner;
  }
  function state() {
    scene.dataset.plants = String(plants.size);
    scene.dataset.state = plants.size ? active ? "growing" : "retracting" : "idle";
  }
  function request() {
    if (!frame && !dead && visible && !doc.hidden && plants.size && !scope.reduced()) frame = scope.requestAnimationFrame(tick);
  }
  function point(plant, t) {
    const inv = 1 - t;
    return { x: inv * inv * plant.x + 2 * inv * t * plant.cx + t * t * plant.ex, y: inv * inv * plant.y + 2 * inv * t * plant.cy + t * t * plant.ey };
  }
  function leaf(plant, at, side, progress) {
    if (progress <= 0) return;
    const p = point(plant, at), size = plant.leaf * progress;
    const dx = side * size, dy = plant.direction * size * 0.48;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.quadraticCurveTo(p.x + dx * 0.1, p.y + dy * 1.8, p.x + dx, p.y + dy);
    ctx.quadraticCurveTo(p.x + dx * 0.85, p.y - dy * 0.18, p.x, p.y);
    ctx.fillStyle = "#6fbe72";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#243725";
    ctx.stroke();
  }
  function draw(plant, now) {
    const g = plant.progress, s = clamp(g / 0.62);
    if (s <= 0) return;
    ctx.beginPath();
    ctx.moveTo(plant.x, plant.y);
    for (let i = 1; i <= 28; i++) {
      const p2 = point(plant, s * i / 28);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = "#24482c";
    ctx.stroke();
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = "#67b868";
    ctx.stroke();
    if (plant.leaves[0]) leaf(plant, 0.42, plant.side, clamp((g - 0.22) / 0.34));
    if (plant.leaves[1]) leaf(plant, 0.7, -plant.side, clamp((g - 0.34) / 0.34));
    const p = point(plant, s), sway = active && !scope.reduced() ? Math.sin(now * 9e-3 + plant.rotation) * 1.25 * clamp((g - 0.5) * 2) : 0;
    ctx.save();
    ctx.translate(p.x + sway, p.y);
    ctx.rotate(plant.rotation);
    ctx.lineWidth = 1.15;
    ctx.strokeStyle = "#20241b";
    const bud = clamp((g - 0.25) / 0.22) * Math.min(plant.radius * 0.24, 3.5);
    if (bud > 0.05) {
      ctx.beginPath();
      ctx.ellipse(0, 0, bud, bud * 1.25, 0, 0, Math.PI * 2);
      ctx.fillStyle = plant.colour;
      ctx.fill();
      ctx.stroke();
    }
    for (let k = 0; k < plant.petals; k++) {
      const t = clamp((g - 0.42 - k * 0.027) / 0.32);
      if (!t) continue;
      const a = t - 1, open = 1 + 2.1 * a * a * a + 1.1 * a * a;
      const angle = 2 * Math.PI * k / plant.petals;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(plant.radius * 0.6 * open, 0, Math.max(0.05, plant.radius * 0.64 * open), Math.max(0.05, plant.radius * plant.petalWidth * open), 0, 0, Math.PI * 2);
      ctx.fillStyle = plant.colour;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    const core = plant.petals ? clamp((g - 0.54) / 0.3) * plant.radius * 0.25 : 0;
    if (core > 0.05) {
      ctx.beginPath();
      ctx.arc(0, 0, core, 0, Math.PI * 2);
      ctx.fillStyle = plant.centre;
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
  function paint(now = 0) {
    ctx.clearRect(0, 0, width, height);
    for (const plant of plants.values()) draw(plant, now);
    state();
  }
  function tick(now) {
    frame = 0;
    if (dead || !visible || doc.hidden) return;
    const dt = Math.min(last ? (now - last) / 1e3 : 1 / 60, 0.04);
    last = now;
    for (const [key, plant] of plants) {
      plant.progress = clamp(plant.progress + (plant.target ? 3.3 : -2.7) * dt);
      if (!plant.target && plant.progress === 0) plants.delete(key);
    }
    paint(now);
    request();
  }
  function release() {
    active = false;
    keyboard = false;
    scope.clearTimeout(releaseTimer);
    for (const plant of plants.values()) plant.target = 0;
    if (scope.reduced()) {
      plants.clear();
      paint();
    } else request();
    state();
  }
  function begin() {
    scope.clearTimeout(releaseTimer);
    active = true;
    keyboard = false;
    seed = Math.random() * 4294967295 >>> 0;
    session++;
    for (const plant of plants.values()) plant.target = 0;
  }
  function sync() {
    selectionFrame = 0;
    if (dead) return;
    const range = currentRange();
    if (!range) {
      for (const plant of plants.values()) plant.target = 0;
      request();
      return;
    }
    if (!active) return;
    const sceneRect = scene.getBoundingClientRect(), scale = sceneRect.width / width;
    const selected = [];
    nodes.forEach((text, index) => {
      if (!range.intersectsNode(text)) return;
      const from = text === range.startContainer ? range.startOffset : 0, to = text === range.endContainer ? range.endOffset : text.length;
      for (let i = from; i < to; i++) if (!/\s/.test(text.data[i])) selected.push({ text, index, i });
    });
    const stride = Math.max(1, Math.ceil(selected.length / 160)), wanted = /* @__PURE__ */ new Set();
    selected.filter((_, i) => i % stride === 0).forEach(({ text, index, i }) => {
      const key = `${session}:${index}:${i}`, rng = randomFor(seed ^ Math.imul(index + 1, 73856093) ^ Math.imul(i + 1, 19349663));
      if (rng() > 0.65) return;
      wanted.add(key);
      const existing = plants.get(key);
      if (existing) {
        existing.target = 1;
        return;
      }
      const char = doc.createRange();
      char.setStart(text, i);
      char.setEnd(text, i + 1);
      const r = char.getBoundingClientRect();
      if (!r.width) return;
      const direction = rng() < 0.38 ? 1 : -1, x = (r.left + r.width / 2 - sceneRect.left) / scale, y = (r.top + r.height / 2 - sceneRect.top) / scale;
      const length = 16 + rng() * 40, bend = (rng() - 0.5) * 60, family = Math.floor(rng() * 5), petals = [5, 6, 8, 4, 0][family];
      const size = rng(), radius = family === 4 ? 4 + rng() * 2 : size < 0.35 ? 5 + rng() * 5 : size < 0.8 ? 10 + rng() * 7 : 18 + rng() * 5;
      const curve = (rng() - 0.5) * 24;
      plants.set(key, { x, y, cx: x + bend * 0.35 + curve, cy: y + direction * length * 0.48, ex: x + bend, ey: y + direction * length, direction, petals, radius, petalWidth: family === 2 ? 0.28 : 0.46, leaf: 7 + rng() * 8, leaves: [rng() < 0.65, rng() < 0.35], side: rng() < 0.5 ? -1 : 1, rotation: rng() * Math.PI * 2, colour: colours[Math.floor(rng() * colours.length)], centre: ["#f6d65d", "#f8b54c", "#f5b4c8"][Math.floor(rng() * 3)], progress: scope.reduced() ? 1 : 0, target: 1 });
    });
    for (const [key, plant] of plants) if (!wanted.has(key)) plant.target = 0;
    if (scope.reduced()) {
      for (const [key, p] of plants) if (!p.target) plants.delete(key);
      else p.progress = 1;
    }
    scene.dataset.selected = String(selected.length);
    paint(win.performance.now());
    request();
  }
  function selectionChanged() {
    if (scope.reduced()) {
      sync();
      return;
    }
    if (!selectionFrame) selectionFrame = scope.requestAnimationFrame(() => {
      selectionFrame = 0;
      sync();
    });
  }
  function selectText(block, end, start = 0) {
    const walk = doc.createTreeWalker(block, 4), texts = [];
    let text;
    while (text = walk.nextNode()) texts.push(text);
    const total = texts.reduce((sum, n) => sum + n.length, 0), a = Math.min(start, total), b = Math.max(a, Math.min(end, total));
    if (a === b) return;
    const range = doc.createRange();
    let base = 0, first = false;
    for (const n of texts) {
      if (!first && a < base + n.length) {
        range.setStart(n, a - base);
        first = true;
      }
      if (b <= base + n.length) {
        range.setEnd(n, b - base);
        break;
      }
      base += n.length;
    }
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    sync();
  }
  function timedSelect(block, end, start = 0) {
    if (!active || !keyboard) begin();
    keyboard = true;
    selectText(block, end, start);
    live.textContent = "Selected text is flowering. Press Escape to clear.";
    scope.clearTimeout(releaseTimer);
    releaseTimer = scope.setTimeout(release, 1300);
  }
  on(article, "pointerdown", (event) => {
    if (event.button !== 0) return;
    begin();
    touch = event.pointerType === "touch" ? { x: event.clientX, y: event.clientY, block: event.target.closest("[tabindex]") } : null;
  });
  on(win, "pointerup", (event) => {
    if (!active) return;
    sync();
    if (touch && touch.block && Math.hypot(event.clientX - touch.x, event.clientY - touch.y) < 9 && !currentRange()) {
      const block = touch.block;
      touch = null;
      const caret = doc.caretPositionFromPoint?.(event.clientX, event.clientY, { shadowRoots: [root] });
      let offset = 0;
      if (caret && block.contains(caret.offsetNode)) {
        const walk = doc.createTreeWalker(block, 4);
        let n;
        while (n = walk.nextNode()) {
          if (n === caret.offsetNode) {
            offset += caret.offset;
            break;
          }
          offset += n.length;
        }
      }
      const text = block.textContent, start = text.lastIndexOf(" ", Math.max(0, offset - 1)) + 1, end = text.indexOf(" ", Math.min(text.length, start + 28));
      timedSelect(block, end < 0 ? text.length : end, start);
      return;
    }
    touch = null;
    release();
  });
  on(win, "pointercancel", () => {
    touch = null;
    release();
  });
  on(win, "blur", release);
  on(doc, "selectionchange", selectionChanged);
  on(article, "keydown", (event) => {
    const block = event.target.closest("[tabindex]");
    if (!block) return;
    if (event.key === "Escape") {
      event.preventDefault();
      if (currentRange()) getSelection().removeAllRanges();
      release();
      live.textContent = "Selection cleared.";
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      keyBlock = block;
      keyEnd = 36;
      timedSelect(block, keyEnd);
      return;
    }
    if (event.shiftKey && ["ArrowLeft", "ArrowRight"].includes(event.key) || ["Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (keyBlock !== block) {
        keyBlock = block;
        keyEnd = 36;
      }
      keyEnd = event.key === "Home" ? 1 : event.key === "End" ? block.textContent.length : Math.max(1, Math.min(block.textContent.length, keyEnd + (event.key === "ArrowRight" ? 1 : -1)));
      timedSelect(block, keyEnd);
    }
  });
  function resize() {
    width = scene.clientWidth || 822;
    height = scene.clientHeight || 720;
    dpr = Math.min(win.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint(win.performance.now());
  }
  const observer = new scope.ResizeObserver(resize);
  observer.observe(scene);
  const intersection = new scope.IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) {
      scope.cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    } else request();
  });
  intersection.observe(scope.element);
  on(doc, "visibilitychange", () => {
    if (doc.hidden) {
      scope.cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      release();
    } else request();
  });
  const media = win.matchMedia("(prefers-reduced-motion: reduce)");
  function preferences() {
    if (scope.reduced()) {
      scope.cancelAnimationFrame(frame);
      frame = 0;
      for (const [key, p] of plants) if (!p.target) plants.delete(key);
      else p.progress = 1;
      paint();
    } else request();
  }
  on(media, "change", preferences);
  scope.addCleanup(() => {
    dead = true;
    if (currentRange()) getSelection().removeAllRanges();
    plants.clear();
    ctx.clearRect(0, 0, width, height);
  });
  resize();
  scene.dataset.ready = "true";
  scope.ready();
  return { ...scope.controller, update(next) {
    scope.controller.update(next);
    preferences();
  } };
}

// src/lib/motion-core/selection-flower-entry.js
var CSS = ".sf-scene{position:relative;isolation:isolate;width:100%;min-height:var(--motion-height,720px);background:#fff;color:#111;overflow:hidden;text-rendering:optimizeLegibility;font-synthesis:none;-webkit-font-smoothing:antialiased}\r\n/* The selection is the ground: its fill and glyphs occlude every plant. */\r\n.sf-article{position:relative;z-index:1;width:658px;margin:0 auto;padding:52px 0 42px;user-select:text;-webkit-user-select:text;touch-action:pan-y}\r\n.sf-article h1{margin:0 0 32px;font:400 72px/80px Georgia,'Times New Roman',serif;letter-spacing:-3px}\r\n.sf-article p{margin:0 0 24px;font:400 21.5px/36px 'Times New Roman',Times,serif;letter-spacing:0}\r\n.sf-article p:last-of-type{margin-bottom:0}\r\n.sf-article ::selection,.sf-article::selection{background:#2fca4e;color:#fff}\r\n.sf-article [tabindex]:focus{outline:none}\r\n.sf-article [tabindex]:focus-visible{outline:2px solid #25833c;outline-offset:6px;border-radius:2px}\r\n.sf-canvas{position:absolute;z-index:0;inset:0;width:100%;height:100%;pointer-events:none;user-select:none}\r\n.sf-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}\r\n";
var MARKUP = '<main class="sf-scene selection-flower-demo notranslate" translate="no" aria-label="Text selection flowers"><article class="sf-article" aria-label="Select any text to grow flowers"><h1 tabindex="0">Select any of this and<br>watch it flower.</h1><p tabindex="0" aria-label="Paragraph 1. Select text or press Enter to grow flowers.">Drag across a line. Every character the selection swallows puts something in the ground behind it \u2014 a stem finding its angle, a leaf turning over, a head of petals opening one at a time.</p><p tabindex="0" aria-label="Paragraph 2. Select text or press Enter to grow flowers.">Nothing here is placed by hand. A seeded generator picks the family, the length, the bend of every joint, the side each leaf takes and how far it swings out. The same rules run every time; the results never repeat.</p><p tabindex="0" aria-label="Paragraph 3. Select text or press Enter to grow flowers."><em>Let go, and it grows backwards.</em> Petals fold into the bud, leaves close along their attachment points, stems retract into the point they came from. Nothing dissolves \u2014 it simply un-grows.</p><p tabindex="0" aria-label="Paragraph 4. Select text or press Enter to grow flowers.">Only a highlight plants anything. The cursor can do it too, if you turn it on.</p></article><canvas class="sf-canvas" aria-hidden="true"></canvas><span class="sf-live sf-sr" role="status" aria-live="polite"></span><span class="sf-sr">Drag to select text and grow flowers. Release to retract. Focus a paragraph and press Enter or Space, Shift with arrow keys to extend, or Escape to clear. Touch: tap or long-press text.</span></main>';
function mountSelectionFlower(target, options = {}) {
  return createSelectionFlower(target, options, CSS, MARKUP);
}
export {
  mountSelectionFlower
};
