// src/lib/motion-core/iso-block-chart.mjs
import { createSurface } from "./motion-runtime";
var REG = ["Seoul", "Busan", "Daegu", "Gwangju"];
var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
var UNIT = [" orders", " visits"];
var COL = [
  ["#7C8CFF", "#5A69E6", "#4352C4"],
  ["#4FD1C5", "#2FB3A8", "#22948A"],
  ["#FFB86B", "#F2994A", "#D97F2E"],
  ["#F78FB3", "#E26D98", "#C4537D"]
];
var DATA = [
  [[42, 55, 61, 58, 74, 88], [30, 34, 41, 47, 45, 52], [22, 25, 24, 31, 36, 40], [15, 19, 23, 21, 27, 33]],
  [[66, 70, 64, 80, 85, 92], [48, 44, 57, 60, 66, 63], [35, 41, 38, 46, 44, 55], [28, 26, 34, 38, 41, 47]]
];
var markup = `<div class="ibc-stage">
  <div class="ibc-card">
    <div class="ibc-hd"><b>By region</b><div class="ibc-chips" role="group" aria-label="Choose a metric"><button type="button" class="ibc-chip" aria-pressed="true">Orders</button><button type="button" class="ibc-chip" aria-pressed="false">Visits</button></div></div>
    <svg class="ibc-sv" viewBox="0 0 340 340" role="img" aria-label="Block chart of six months for four regions"></svg>
    <div class="ibc-tip" aria-hidden="true"><b class="ibc-tl"></b><span class="ibc-tv"></span></div>
    <div class="ibc-lg" aria-hidden="true"></div>
  </div>
</div>`;
var css = `
:root {
  color-scheme: light;
  --ibc-line: rgba(22, 21, 27, 0.09);
  --ibc-shadow-strong: rgba(40, 30, 80, 0.3);
  --ibc-spring: cubic-bezier(0.34, 1.45, 0.64, 1);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --ibc-line: rgba(255, 255, 255, 0.08);
    --ibc-shadow-strong: rgba(0, 0, 0, 0.72);
  }
}

.ibc-stage {
  position: relative;
  width: 340px;
  height: 340px;
  margin: 0 auto;
  color: #1E2440;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
  -webkit-tap-highlight-color: transparent;
  word-break: keep-all;
  overflow-wrap: break-word;
}
/* Card visuals sit one level below the scene root: the docs demo stage
   strips the background of .motion-body's first child, so the 340x340
   board itself must not be that child. */
.ibc-card {
  position: absolute;
  inset: 0;
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(160deg, #F5F7FF, #E9EEFB);
  box-shadow: 0 0 0 1px var(--ibc-line), 0 30px 60px -36px var(--ibc-shadow-strong);
}
.ibc-stage * { box-sizing: border-box; }
.ibc-stage :where(button) { font: inherit; color: inherit; cursor: pointer; }
.ibc-stage :focus-visible { outline: 2px solid var(--ibc-accent, #3D8BFF); outline-offset: 3px; }

.ibc-hd { position: absolute; left: 16px; right: 16px; top: 14px; display: flex; justify-content: space-between; align-items: center; z-index: 2; }
.ibc-hd b { font-size: 13.5px; font-weight: 800; }
.ibc-chips { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: rgba(30, 36, 64, 0.07); }
.ibc-chip { border: 0; padding: 5px 11px; border-radius: 999px; background: transparent; color: #525A7A; font: inherit; font-size: 11px; font-weight: 750; cursor: pointer; transition: background 0.2s, color 0.2s; }
.ibc-chip[aria-pressed="true"] { background: #1E2440; color: #fff; }
.ibc-chip:focus-visible { outline: 2px solid #3D8BFF; outline-offset: 2px; }
.ibc-sv { position: absolute; inset: 0; width: 100%; height: 100%; }
.ibc-b path { transition: fill 0.2s; }
.ibc-dim .ibc-b:not(.is-line):not(.is-on) path:nth-child(1) { fill: #E4E7F1; }
.ibc-dim .ibc-b:not(.is-line):not(.is-on) path:nth-child(2) { fill: #D2D7E5; }
.ibc-dim .ibc-b:not(.is-line):not(.is-on) path:nth-child(3) { fill: #C0C6D9; }
.ibc-b.is-on path { stroke: #fff; stroke-width: 1.2; stroke-linejoin: round; }
.ibc-tip {
  position: absolute; left: 0; top: 0; padding: 6px 9px; border-radius: 10px;
  background: #1E2440; color: #fff; font-size: 11px; font-weight: 700; white-space: nowrap;
  pointer-events: none; opacity: 0; transform: translate(-50%, -120%) scale(0.92);
  transition: opacity 0.15s, transform 0.22s var(--ibc-spring);
}
.ibc-tip.is-on { opacity: 1; transform: translate(-50%, -120%); }
.ibc-tip span { display: block; font-size: 13px; font-weight: 800; font-variant-numeric: tabular-nums; }
.ibc-lg { position: absolute; left: 0; right: 0; bottom: 12px; display: flex; justify-content: center; gap: 12px; font-size: 10.5px; font-weight: 700; color: #525A7A; }
.ibc-lg i { display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 4px; vertical-align: -1px; }
@media (prefers-reduced-motion: reduce) {
  .ibc-tip, .ibc-b path, .ibc-chip { transition: none; }
}
`;
function createIsoBlockChart(host, initial) {
  const scope = createSurface(host, { width: 340, height: 340, css, markup }, initial);
  const { root, on, reduced, requestAnimationFrame, IntersectionObserver } = scope;
  const doc = host.ownerDocument;
  const sv = root.querySelector(".ibc-sv");
  const tip = root.querySelector(".ibc-tip");
  const tl = tip.querySelector(".ibc-tl");
  const tv = tip.querySelector(".ibc-tv");
  const chips = [...root.querySelectorAll(".ibc-chip")];
  const lg = root.querySelector(".ibc-lg");
  let options = { ...initial };
  let metric = options.metric === 1 ? 1 : 0;
  const NS = "http://www.w3.org/2000/svg", OX = 149, OY = 160, DX = 21, DY = 12.2, FW = 0.72;
  function iso(c, r) { return [OX + (c - r) * DX, OY + (c + r) * DY]; }
  const B = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) B.push({ r, c, h: 0, from: 0, to: 0, t0: 0 });
  B.sort((a, b) => (a.r + a.c) - (b.r + b.c) || a.c - b.c);
  const floor = doc.createElementNS(NS, "path");
  const f0 = iso(-0.6, -0.6), f1 = iso(5.6, -0.6), f2 = iso(5.6, 3.6), f3 = iso(-0.6, 3.6);
  floor.setAttribute("d", "M" + f0 + "L" + f1 + "L" + f2 + "L" + f3 + "Z");
  floor.setAttribute("fill", "rgba(30,36,64,.05)");
  floor.setAttribute("stroke", "rgba(30,36,64,.1)");
  sv.appendChild(floor);
  B.forEach((b) => {
    const g = doc.createElementNS(NS, "g");
    g.setAttribute("class", "ibc-b");
    ["top", "left", "right"].forEach((k, j) => {
      const p = doc.createElementNS(NS, "path");
      p.setAttribute("fill", COL[b.r][j]);
      g.appendChild(p);
      b[k] = p;
    });
    on(g, "pointerenter", () => focus(b));
    on(g, "pointerleave", () => focus(null));
    b.g = g;
    sv.appendChild(g);
  });
  REG.forEach((name, i) => {
    const s = doc.createElement("span");
    const dot = doc.createElement("i");
    dot.style.background = COL[i][0];
    s.appendChild(dot);
    s.appendChild(doc.createTextNode(name));
    lg.appendChild(s);
  });
  function shape(b) {
    const hw = FW / 2, h = b.h * 1.25;
    const p = (dc, dr, up) => {
      const q = iso(b.c + dc, b.r + dr);
      return q[0].toFixed(1) + "," + (q[1] - up).toFixed(1);
    };
    b.top.setAttribute("d", "M" + p(-hw, -hw, h) + "L" + p(hw, -hw, h) + "L" + p(hw, hw, h) + "L" + p(-hw, hw, h) + "Z");
    b.left.setAttribute("d", "M" + p(-hw, hw, h) + "L" + p(hw, hw, h) + "L" + p(hw, hw, 0) + "L" + p(-hw, hw, 0) + "Z");
    b.right.setAttribute("d", "M" + p(hw, -hw, h) + "L" + p(hw, hw, h) + "L" + p(hw, hw, 0) + "L" + p(hw, -hw, 0) + "Z");
  }
  let cur = null;
  function focus(b) {
    cur = b;
    root.querySelector(".ibc-card").classList.toggle("ibc-dim", !!b);
    B.forEach((o) => {
      o.g.classList.toggle("is-on", o === b);
      o.g.classList.toggle("is-line", !!b && o !== b && (o.r === b.r || o.c === b.c));
    });
    place();
  }
  function place() {
    if (!cur) { tip.classList.remove("is-on"); return; }
    const q = iso(cur.c, cur.r);
    tip.style.left = q[0] + "px";
    tip.style.top = (q[1] - cur.h * 1.25 - 6) + "px";
    tl.textContent = REG[cur.r] + " · " + MON[cur.c];
    tv.textContent = Math.round(DATA[metric][cur.r][cur.c] * 37).toLocaleString() + UNIT[metric];
    tip.classList.add("is-on");
  }
  function retarget(first) {
    const now = performance.now();
    B.forEach((b) => {
      b.from = b.h;
      b.to = DATA[metric][b.r][b.c];
      b.t0 = now + (first ? (8 - b.r - b.c) * 70 : (b.c + b.r) * 45);
    });
    if (reduced()) {
      B.forEach((b) => { b.h = b.to; shape(b); });
      place();
      return;
    }
    run();
  }
  function ease(t) { return 1 - (1 - t) ** 3 * Math.cos(t * 4.2) * (1 - t * 0.2); }
  let raf = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    let busy = false;
    B.forEach((b) => {
      const t = Math.max(0, Math.min(1, (now - b.t0) / 650));
      b.h = b.from + (b.to - b.from) * (t <= 0 ? 0 : ease(t));
      if (t < 1) busy = true;
      else b.h = b.to;
      shape(b);
    });
    place();
    if (busy) raf = requestAnimationFrame(frame);
  }
  function run() { if (!raf) raf = requestAnimationFrame(frame); }
  function syncChips() {
    chips.forEach((o, j) => o.setAttribute("aria-pressed", j === metric ? "true" : "false"));
  }
  on(chips[0], "click", () => setMetric(0));
  on(chips[1], "click", () => setMetric(1));
  function setMetric(i) {
    if (metric === i) return;
    metric = i;
    syncChips();
    retarget(false);
    options.onMetricChange?.(metric);
  }
  syncChips();
  B.forEach(shape);
  let shown = false;
  if (reduced()) {
    retarget(true);
  } else {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting && !shown) {
        shown = true;
        retarget(true);
      }
    });
    io.observe(root.querySelector(".ibc-card"));
  }
  return {
    update(next) {
      options = { ...options, ...next };
      const hd = root.querySelector(".ibc-hd b");
      if (options.heading) hd.textContent = options.heading;
      if ((next.metric === 0 || next.metric === 1) && next.metric !== metric) {
        metric = next.metric;
        syncChips();
        retarget(false);
      }
      scope.controller.update(next);
    },
    destroy() { scope.destroy(); },
  };
}
function mountIsoBlockChart(host, options = {}) {
  return createIsoBlockChart(host, options);
}
export {
  mountIsoBlockChart
};
