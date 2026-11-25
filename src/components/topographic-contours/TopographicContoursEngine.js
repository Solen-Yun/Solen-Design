// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTopographicContours(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u371"><canvas class="u371-cv" role="img" aria-label="Contour map, press to raise a peak"></canvas></div>
`,
      css: `

.u371{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:30px;overflow:hidden;background:#F4EFE3;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u371-cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}
.u371-pk{position:absolute;left:0;top:0;transform:translate(-50%,-130%);padding:2px 6px;border-radius:6px;background:#3B2F2A;color:#FFF4E0;font:700 10px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;pointer-events:none;animation:u371-in .4s var(--ux-spring)}
.u371-pk::after{content:"▲";position:absolute;left:50%;top:100%;transform:translateX(-50%);font-size:8px;color:#3B2F2A}
@keyframes u371-in{from{opacity:0;transform:translate(-50%,-90%)}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u371');
  var cv = root.querySelector('.u371-cv'), cx = cv.getContext('2d');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 340, H = 330, dpr = Math.min(2, window.devicePixelRatio || 1), GX = 58, GY = 56, sx = W / (GX - 1), sy = H / (GY - 1);
  cv.width = W * dpr; cv.height = H * dpr; cx.scale(dpr, dpr);
  var hgt = new Float32Array(GX * GY), peaks = [], hover = null, hoverK = 0, t = 0, LV = 14;
  // 지형 높이(0~1 근처): 느리게 움직이는 사인파 몇 겹 + 커서 언덕 + 세운 봉우리(가우스 모양)
  function field() {
    for (var j = 0; j < GY; j++) for (var i = 0; i < GX; i++) {
      var x = i * sx, y = j * sy;
      var v = 0.42 + 0.16 * Math.sin(x * 0.018 + t * 0.25) * Math.cos(y * 0.021 - t * 0.2) + 0.1 * Math.sin((x + y) * 0.012 + t * 0.15) + 0.07 * Math.cos(x * 0.04 - y * 0.03 + t * 0.3);
      if (hover && hoverK > 0.01) { var dh = ((x - hover.x) * (x - hover.x) + (y - hover.y) * (y - hover.y)) / 2600; v += 0.32 * hoverK * Math.exp(-dh); }
      peaks.forEach(function (p) { var d = ((x - p.x) * (x - p.x) + (y - p.y) * (y - p.y)) / (2200 * p.s); v += 0.42 * p.k * Math.exp(-d); });
      hgt[j * GX + i] = v;
    }
  }
  // 마칭 스퀘어: 칸 네 모서리가 등고선 높이의 위아래 어디에 있는지 보고 칸 안에 선분을 긋습니다
  function contours() {
    cx.clearRect(0, 0, W, H);
    for (var l = 1; l < LV; l++) {
      var lev = l / LV * 1.2, bold = l % 5 === 0, warm = l / LV;
      cx.strokeStyle = 'hsl(' + (200 - warm * 180).toFixed(0) + ' ' + (35 + warm * 30).toFixed(0) + '% ' + (bold ? 34 : 46) + '%)';
      cx.lineWidth = bold ? 1.8 : 0.9; cx.globalAlpha = bold ? 0.95 : 0.7;
      cx.beginPath();
      for (var j = 0; j < GY - 1; j++) for (var i = 0; i < GX - 1; i++) {
        var a = hgt[j * GX + i], b = hgt[j * GX + i + 1], c = hgt[(j + 1) * GX + i + 1], d = hgt[(j + 1) * GX + i];
        var code = (a > lev ? 8 : 0) | (b > lev ? 4 : 0) | (c > lev ? 2 : 0) | (d > lev ? 1 : 0);
        if (code === 0 || code === 15) continue;
        var x = i * sx, y = j * sy;
        var top = [x + sx * (lev - a) / (b - a), y], rt = [x + sx, y + sy * (lev - b) / (c - b)], bt = [x + sx * (lev - d) / (c - d), y + sy], lf = [x, y + sy * (lev - a) / (d - a)];
        var segs = { 1: [lf, bt], 2: [bt, rt], 3: [lf, rt], 4: [top, rt], 5: [lf, top, bt, rt], 6: [top, bt], 7: [lf, top], 8: [lf, top], 9: [top, bt], 10: [lf, bt, top, rt], 11: [top, rt], 12: [lf, rt], 13: [bt, rt], 14: [lf, bt] }[code];
        for (var s = 0; s < segs.length; s += 2) { cx.moveTo(segs[s][0], segs[s][1]); cx.lineTo(segs[s + 1][0], segs[s + 1][1]); }
      }
      cx.stroke();
    }
    cx.globalAlpha = 1;
  }
  var vis = true, raf = 0, last = 0, acc = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now; t += dt; acc += dt;
    hoverK += ((hover ? 1 : 0) - hoverK) * Math.min(1, dt * 3);
    peaks.forEach(function (p) { p.k += (1 - p.k) * Math.min(1, dt * 2.5); });
    // 등고선은 초당 30번만 다시 그려도 충분히 부드럽습니다
    if (acc > 0.033) { acc = 0; field(); contours(); }
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { hoverK = hover ? 1 : 0; peaks.forEach(function (p) { p.k = 1; }); field(); contours(); return; } if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function loc(e) { var r = cv.getBoundingClientRect(), k = cv.offsetWidth / (r.width || 1); return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }; }
  cv.addEventListener('pointermove', function (e) { hover = loc(e); if (rm) run(); });
  cv.addEventListener('pointerleave', function () { hover = null; if (rm) run(); });
  cv.addEventListener('pointerdown', function (e) {
    var q = loc(e);
    if (peaks.length >= 3) { var old = peaks.shift(); if (old.tag) old.tag.remove(); }
    var p = { x: q.x, y: q.y, k: 0, s: 0.8 + Math.random() * 0.6 };
    p.tag = document.createElement('span'); p.tag.className = 'u371-pk'; p.tag.style.left = q.x + 'px'; p.tag.style.top = q.y + 'px';
    p.tag.textContent = (680 + Math.round(Math.random() * 900)) + 'm';
    root.appendChild(p.tag); peaks.push(p);
    if (rm) run();
  });
  field(); contours(); run();
})();
  })();

  scope.ready();
  return scope.controller;
}
