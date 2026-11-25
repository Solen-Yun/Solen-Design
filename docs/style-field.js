// 风格页的线场画布。机制：站标采样一次，存成 60×60 覆盖表；每张卡把
// 表格铺满整卡——每个格子一根竖线段，覆盖映射到四档线宽（1px、2px、
// 3px、4px，不允许连续线宽），覆盖不足的格子画 1px 半透明底线，标记
// 从更粗的线里显形。线场缓慢漂移；指针附近线段被推开、弹簧衰减回落，
// 检测蓝扫描框跟随指针；带 data-static 的目录缩略卡只画一次；
// prefers-reduced-motion 下静止（不漂移、不位移）。

import { createElement } from "react";
import { createRoot } from "react-dom/client";
import GooeyNav from "../src/components/gooey-nav/GooeyNav.jsx";

const SAMPLE_N = 60;

const mark = new Image();
mark.decoding = "async";
mark.src = "assets/mark-01-v2-accent.svg";

let table = null; // 60×60 墨水覆盖值（0..1）

function sampleTable() {
  const off = document.createElement("canvas");
  off.width = SAMPLE_N;
  off.height = SAMPLE_N;
  const octx = off.getContext("2d");
  octx.imageSmoothingEnabled = true;
  octx.drawImage(mark, 3, 3, SAMPLE_N - 6, SAMPLE_N - 6);
  const data = octx.getImageData(0, 0, SAMPLE_N, SAMPLE_N).data;
  table = [];
  for (let r = 0; r < SAMPLE_N; r++) {
    const row = [];
    for (let c = 0; c < SAMPLE_N; c++) row.push(data[(r * SAMPLE_N + c) * 4 + 3] / 255);
    table.push(row);
  }
}

function createField(card) {
  const canvas = card.querySelector("canvas");
  const frame = card.querySelector(".scan-frame");
  const ctx = canvas.getContext("2d");
  const INK = card.dataset.ink || "#202220";
  const WIDTHS = [1, 2, 3, 4];
  const still = card.hasAttribute("data-static");
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const frozen = () => still || media.matches;
  let width = 0, height = 0, dpr = 1, cw = 0, ch = 0;
  /* 每列一根弹簧：被指针推开（target），松手后衰减回 0。 */
  const dx = new Float32Array(SAMPLE_N), vx = new Float32Array(SAMPLE_N), target = new Float32Array(SAMPLE_N);
  let phase = Math.random() * 100, last = 0, raf = 0, px = -1;

  function paint(now = 0) {
    ctx.clearRect(0, 0, width, height);
    if (!table) return;
    /* 按档位分桶批量描边：桶 0 是 1px 半透明底线，1-4 档全色。 */
    const buckets = [[], [], [], [], []];
    for (let r = 0; r < SAMPLE_N; r++) {
      const row = table[r];
      for (let c = 0; c < SAMPLE_N; c++) {
        const a = row[c];
        buckets[a > 0.6 ? 4 : a > 0.35 ? 3 : a > 0.16 ? 2 : a > 0.05 ? 1 : 0].push(c, r);
      }
    }
    const sway = frozen() ? 0 : Math.sin(now / 3600 + phase) * 1.5;
    ctx.lineCap = "butt";
    ctx.strokeStyle = INK;
    ctx.globalAlpha = 0.16;
    ctx.lineWidth = 1;
    strokeBucket(buckets[0]);
    ctx.globalAlpha = 1;
    for (let lvl = 1; lvl <= 4; lvl++) {
      ctx.lineWidth = WIDTHS[lvl - 1];
      strokeBucket(buckets[lvl]);
    }
    function strokeBucket(bucket) {
      ctx.beginPath();
      for (let i = 0; i < bucket.length; i += 2) {
        const c = bucket[i], r = bucket[i + 1];
        const x = (c + 0.5) * cw + dx[c] + sway * Math.sin(c * 0.5);
        ctx.moveTo(x, r * ch + 1);
        ctx.lineTo(x, (r + 1) * ch - 1);
      }
      ctx.stroke();
    }
  }

  function setTargets() {
    const R = 90, PUSH = 10;
    for (let c = 0; c < SAMPLE_N; c++) {
      const d = (c + 0.5) * cw - px;
      target[c] = px >= 0 && Math.abs(d) < R ? (d < 0 ? -1 : 1) * PUSH * (1 - Math.abs(d) / R) : 0;
    }
  }
  function tick(now) {
    raf = 0;
    if (document.hidden) return;
    const dt = last ? Math.min(0.032, (now - last) / 1000) : 0.016;
    last = now;
    for (let c = 0; c < SAMPLE_N; c++) {
      vx[c] += (120 * (target[c] - dx[c]) - 16 * vx[c]) * dt;
      dx[c] += vx[c] * dt;
    }
    paint(now);
    request();
  }
  function request() {
    if (!raf && !frozen() && !document.hidden && table) {
      raf = requestAnimationFrame(tick);
    }
  }
  function movePointer(event) {
    const rect = card.getBoundingClientRect();
    px = event.clientX - rect.left;
    if (frame) {
      frame.style.opacity = "1";
      frame.style.transform = `translate(${px - 36}px, ${event.clientY - rect.top - 36}px)`;
    }
    setTargets();
    request();
  }
  function leavePointer() {
    px = -1;
    if (frame) frame.style.opacity = "0";
    for (let c = 0; c < SAMPLE_N; c++) target[c] = 0;
    request();
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  }
  function resetMotion() {
    dx.fill(0);
    vx.fill(0);
    target.fill(0);
    paint();
    request();
  }
  function resize() {
    width = card.clientWidth;
    height = card.clientHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);
    cw = width / SAMPLE_N;
    ch = height / SAMPLE_N;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint(performance.now());
  }

  if (!still) {
    card.addEventListener("pointermove", movePointer);
    card.addEventListener("pointerleave", leavePointer);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else request();
    });
  }
  return { card, resize, request, stop, resetMotion };
}

const fields = [...document.querySelectorAll(".field-card")].map(createField);

if (mark.complete && mark.naturalWidth) sampleTable();
mark.onload = () => {
  sampleTable();
  for (const field of fields) field.resize();
};

const motionMedia = matchMedia("(prefers-reduced-motion: reduce)");
motionMedia.addEventListener("change", () => {
  for (const field of fields) {
    field.stop();
    field.resetMotion();
  }
});

for (const field of fields) new ResizeObserver(field.resize).observe(field.card);

/* 设计文档交付：中/英双语，预览 + 复制。文档 ID 由页面上的
   [data-doc-id] 指定，对应 styles/<id>.md 与 styles/<id>.en.md。 */
const docSection = document.querySelector("[data-doc-id]");
const DOC_FILES = docSection ? {
  zh: "./styles/" + docSection.dataset.docId + ".md",
  en: "./styles/" + docSection.dataset.docId + ".en.md",
} : null;
const docCache = {};
let docLang = "zh";
const docPreview = document.getElementById("doc-preview");
const langBtns = [...document.querySelectorAll(".lang-toggle [data-lang]")];
const copyBtns = [...document.querySelectorAll("[data-copy-doc]")];

async function loadDoc(lang) {
  if (!docCache[lang]) {
    const res = await fetch(DOC_FILES[lang]);
    if (!res.ok) throw new Error(res.status);
    docCache[lang] = await res.text();
  }
  return docCache[lang];
}

async function showDoc(lang) {
  if (!DOC_FILES) return;
  docLang = lang;
  for (const b of langBtns) b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  if (!docPreview) return;
  docPreview.textContent = "加载中…";
  try {
    docPreview.textContent = await loadDoc(lang);
  } catch {
    docPreview.textContent = "文档加载失败。";
  }
}

async function copyDoc(btn) {
  if (!DOC_FILES) return;
  const original = btn.textContent;
  try {
    await navigator.clipboard.writeText(await loadDoc(docLang));
    btn.textContent = "已复制到剪贴板";
  } catch {
    btn.textContent = "复制失败";
  }
  setTimeout(() => { btn.textContent = original; }, 2000);
}

for (const btn of copyBtns) btn.addEventListener("click", () => copyDoc(btn));
for (const b of langBtns) b.addEventListener("click", () => showDoc(b.dataset.lang));

/* 软开关演示：切换 aria-checked，CSS 只动阴影与位置。 */
for (const sw of document.querySelectorAll("[data-switch]")) {
  sw.addEventListener("click", () => {
    sw.setAttribute("aria-checked", sw.getAttribute("aria-checked") === "true" ? "false" : "true");
  });
}

/* 响应式舞台（布局模式详情页）：按钮把所在区块里 [data-stage-view]
   容器钉到对应视口档位，列数与宽度变化交给 CSS。 */
for (const btn of document.querySelectorAll("[data-stage]")) {
  btn.addEventListener("click", () => {
    const stage = btn.closest(".style-section")?.querySelector("[data-stage-view]");
    if (!stage) return;
    stage.dataset.view = btn.dataset.stage;
    for (const b of btn.parentElement.querySelectorAll("[data-stage]"))
      b.setAttribute("aria-pressed", String(b === btn));
  });
}

/* 风格目录的分类筛选：卡片上的 data-cat 是分类 id 列表（空格分隔），
   计数从卡片实算，点一下只留命中的卡片。视觉风格与布局模式各有一组
   分类，筛选条用 GooeyNav 组件渲染 —— 跟上面那组切换共用同一套液态 blob。 */
const CATEGORIES = {
  visual: [
    ["minimal", "极简留白"],
    ["geometry", "几何构成"],
    ["brutal", "粗野野兽"],
    ["material", "拟物质感"],
    ["glass", "玻璃通透"],
    ["pixel", "像素游戏"],
    ["cyber", "赛博未来"],
    ["retro", "复古年代"],
    ["handdrawn", "手绘插画"],
    ["art", "艺术装饰"],
    ["culture", "文化地域"],
    ["nature", "自然有机"],
    ["luxe", "奢华精致"],
    ["product", "产品工具"],
    ["motion", "动效实验"],
  ],
  layout: [
    ["grid", "栅格分栏"],
    ["flow", "视线动线"],
    ["app", "应用骨架"],
    ["scroll", "滚动叙事"],
    ["sequence", "序列与时间"],
    ["hero", "分屏与主视觉"],
  ],
};

const COLLECTION_LABEL = { visual: "视觉风格", layout: "布局模式" };
const filterStatus = document.querySelector("[data-filter-status]");

for (const bar of document.querySelectorAll(".style-filters")) {
  const collection = bar.dataset.collection;
  const cards = [...document.querySelectorAll(`.style-grid[data-collection="${collection}"] .style-card`)];
  const catsOf = (card) => (card.dataset.cat || "").split(/\s+/).filter(Boolean);

  const counts = new Map();
  for (const card of cards) {
    for (const cat of catsOf(card)) counts.set(cat, (counts.get(cat) || 0) + 1);
  }
  /* 命中为 0 的分类不占位。 */
  const usable = CATEGORIES[collection].filter(([id]) => counts.get(id));
  const ids = ["all", ...usable.map(([id]) => id)];

  const label = (text, n) =>
    createElement("span", null, text, createElement("span", { className: "style-filter-count" }, String(n)));
  const items = [
    { label: label("全部", cards.length) },
    ...usable.map(([id, name]) => ({ label: label(name, counts.get(id)) })),
  ];

  const apply = (cat) => {
    let shown = 0;
    for (const card of cards) {
      const hit = cat === "all" || catsOf(card).includes(cat);
      card.hidden = !hit;
      if (hit) shown++;
    }
    if (filterStatus) filterStatus.textContent = `显示 ${shown} 个${COLLECTION_LABEL[collection]}`;
  };

  createRoot(bar).render(
    createElement(GooeyNav, {
      items,
      initialActiveIndex: 0,
      theme: "light",
      size: "sm",
      frame: false,
      onChange: (index) => apply(ids[index]),
    })
  );
}

/* 风格目录的分类切换：视觉风格 / 布局模式两组卡片二选一，
   ?cat=layout 可直达（布局模式详情页的返回链接带这个参数）。
   切换控件是 gooey-nav 组件（受控 activeIndex），React 由 chrome.js
   引入过，这里直接建根挂载。 */
const catseg = document.querySelector(".style-catseg");
if (catseg) {
  const grids = {
    visual: document.querySelector('.style-grid[data-collection="visual"]'),
    layout: document.querySelector('.style-grid[data-collection="layout"]'),
  };

  const select = (cat) => {
    for (const [key, grid] of Object.entries(grids)) {
      if (grid) grid.hidden = key !== cat;
    }
    /* 分类筛选条跟着分组走：每组卡片各有一条。 */
    for (const bar of document.querySelectorAll(".style-filters")) {
      bar.hidden = bar.dataset.collection !== cat;
    }
  };

  const initial = new URLSearchParams(location.search).get("cat") === "layout" ? "layout" : "visual";
  select(initial);
  createRoot(catseg).render(
    createElement(GooeyNav, {
      items: [{ label: "视觉风格" }, { label: "布局模式" }],
      initialActiveIndex: initial === "layout" ? 1 : 0,
      theme: "light",
      size: "md",
      frame: true,
      onChange: (index) => select(index === 1 ? "layout" : "visual"),
    }),
  );
}

showDoc("zh");
