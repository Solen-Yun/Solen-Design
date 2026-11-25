// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSpringTuner(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 350,
      responsive: false,
      markup: `
<div class="ux u316">
  <div class="u316-tr"><svg aria-hidden="true"><path fill="none" stroke="var(--ux-ink-2)" stroke-width="2.2" stroke-linejoin="round"/></svg><button class="u316-bk" type="button" aria-label="Block, drag sideways and release"></button></div>
  <canvas class="u316-gr" aria-hidden="true"></canvas>
  <label class="u316-rw"><span>Stiffness</span><input class="u316-k" type="range" min="40" max="700" step="10" value="420"><output>420</output></label>
  <label class="u316-rw"><span>Damping</span><input class="u316-d" type="range" min="2" max="60" step="1" value="6"><output>6</output></label>
  <div class="u316-pr" role="group" aria-label="Presets"></div>
</div>
`,
      css: `

.u316{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:350px;padding:16px;box-sizing:border-box;border-radius:30px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;color:var(--ux-ink)}
.u316-tr{position:relative;height:74px;border-radius:16px;background:var(--ux-surface-2)}
.u316-tr::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:12px;border-radius:0 4px 4px 0;background:repeating-linear-gradient(135deg,var(--ux-ink-3) 0 2px,transparent 2px 6px)}
.u316-tr svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.u316-bk{position:absolute;left:0;top:15px;width:44px;height:44px;border:0;padding:0;border-radius:12px;background:linear-gradient(135deg,var(--ux-accent),color-mix(in srgb,var(--ux-accent) 60%,#000));box-shadow:0 6px 12px -6px var(--ux-shadow-strong);touch-action:none;cursor:grab}
.u316-bk:focus-visible{outline:2px solid var(--ux-ink);outline-offset:2px}
.u316-gr{display:block;width:100%;height:96px;margin-top:10px;border-radius:14px;background:var(--ux-surface-2)}
.u316-rw{display:grid;grid-template-columns:52px 1fr 34px;align-items:center;gap:8px;margin-top:10px;font-size:12.5px;font-weight:750}
.u316-rw input{width:100%;accent-color:var(--ux-accent)}
.u316-rw output{text-align:right;font:700 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ux-ink-2)}
.u316-pr{display:flex;gap:6px;margin-top:10px}
.u316-ps{flex:1;height:32px;border:0;border-radius:10px;background:var(--ux-surface-2);color:var(--ux-ink-2);font-size:12.5px;font-weight:750;transition:background-color .2s,color .2s}
.u316-ps[aria-pressed="true"]{background:var(--ux-ink);color:var(--ux-surface)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u316');
  var tr = root.querySelector('.u316-tr'), coil = tr.querySelector('path'), bk = root.querySelector('.u316-bk'), cv = root.querySelector('.u316-gr'), cx = cv.getContext('2d');
  var ik = root.querySelector('.u316-k'), id = root.querySelector('.u316-d'), ok = ik.nextElementSibling, od = id.nextElementSibling;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PRE = [['Bouncy', 420, 6], ['Gentle', 120, 14], ['Snappy', 600, 48]];
  var REST = 150, x = 0, v = 0, held = false, hist = [], raf = 0, last = 0, still = 0;
  var GW = 308, GH = 96, dpr = Math.min(3, (window.devicePixelRatio || 1) * 1.5);
  cv.width = GW * dpr; cv.height = GH * dpr; cx.scale(dpr, dpr);
  var pbs = PRE.map(function (p, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u316-ps'; b.textContent = p[0]; b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () { preset(i); });
    root.querySelector('.u316-pr').appendChild(b);
    return b;
  });
  function K() { return +ik.value; }
  function C() { return +id.value; }
  function drawSpring() {
    var bx = REST + x, n = 12, w = bx - 12, d = 'M12 37';
    for (var i = 1; i <= n; i++) d += ' L' + (12 + w * (i - 0.5) / n).toFixed(1) + ' ' + (i % 2 ? 23 : 51);
    coil.setAttribute('d', d + ' L' + bx.toFixed(1) + ' 37');
    bk.style.transform = 'translateX(' + bx.toFixed(1) + 'px)';
  }
  var ink = ['#ccc', '#3D8BFF'];
  function colors() { var cs = getComputedStyle(root); ink = [cs.getPropertyValue('--ux-line-2') || '#ccc', cs.getPropertyValue('--ux-accent') || '#3D8BFF']; }
  function drawGraph() {
    cx.clearRect(0, 0, GW, GH);
    cx.strokeStyle = ink[0];
    cx.setLineDash([4, 4]); cx.beginPath(); cx.moveTo(0, GH / 2); cx.lineTo(GW, GH / 2); cx.stroke(); cx.setLineDash([]);
    cx.strokeStyle = ink[1]; cx.lineWidth = 2.2; cx.lineJoin = 'round';
    cx.beginPath();
    hist.forEach(function (h, i) { var gx = GW - (hist.length - 1 - i) * 2, gy = GH / 2 - h * 0.36; if (i) cx.lineTo(gx, gy); else cx.moveTo(gx, gy); });
    cx.stroke();
    if (hist.length) { cx.fillStyle = cx.strokeStyle; cx.beginPath(); cx.arc(GW - 1, GH / 2 - hist[hist.length - 1] * 0.36, 4, 0, 6.2832); cx.fill(); }
  }
  function step(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.03, Math.max(0, (now - last) / 1000)); last = now;
    if (!held) for (var s = 0; s < 4; s++) { v += (-K() * x - C() * v) * dt / 4; x += v * dt / 4; }
    hist.push(x); if (hist.length > GW / 2) hist.shift();
    drawSpring(); drawGraph();
    still = (!held && Math.abs(x) < 0.2 && Math.abs(v) < 2) ? still + 1 : 0;
    // 블록이 멈춘 뒤 그래프가 화면을 다 흘러갈 때까지 그리고 쉽니다
    if (still < GW / 2) raf = requestAnimationFrame(step); else { x = 0; v = 0; drawSpring(); }
  }
  function run() { still = 0; colors(); if (rm) { x = 0; v = 0; drawSpring(); drawGraph(); return; } if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } }
  function sync() { ok.value = ik.value; od.value = id.value; }
  function slide(inp, to, ms) {
    var from = +inp.value, t0 = performance.now();
    (function f(now) { var t = Math.max(0, Math.min(1, (now - t0) / ms)), e = 1 - Math.pow(1 - t, 3); inp.value = Math.round(from + (to - from) * e); sync(); if (t < 1) requestAnimationFrame(f); })(t0);
  }
  function preset(i) {
    pbs.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
    slide(ik, PRE[i][1], rm ? 1 : 300); slide(id, PRE[i][2], rm ? 1 : 300);
    setTimeout(function () { x = 100; v = 0; run(); }, rm ? 0 : 320);
  }
  [ik, id].forEach(function (inp) { inp.addEventListener('input', function () { sync(); pbs.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); }); }); });
  var on = false, sx = 0, x0 = 0, k = 1;
  bk.addEventListener('pointerdown', function (e) {
    var r = root.getBoundingClientRect(); k = root.offsetWidth / (r.width || 1);
    on = true; held = true; sx = e.clientX; x0 = x; v = 0;
    try { bk.setPointerCapture(e.pointerId); } catch (er) { /* 무시 */ }
    run();
  });
  bk.addEventListener('pointermove', function (e) { if (!on) return; x = Math.max(-100, Math.min(100, x0 + (e.clientX - sx) * k)); });
  function up() { if (!on) return; on = false; held = false; run(); }
  bk.addEventListener('pointerup', up);
  bk.addEventListener('pointercancel', up);
  bk.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); x = e.key === 'ArrowLeft' ? -90 : 90; v = 0; run(); }
  });
  colors(); drawSpring(); drawGraph();
})();
  })();

  scope.ready();
  return scope.controller;
}
