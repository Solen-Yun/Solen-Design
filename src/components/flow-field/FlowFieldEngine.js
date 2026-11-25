// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountFlowField(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u352"><canvas class="u352-cv" role="img" aria-label="Flow field, press to change colors"></canvas><span class="u352-nm" aria-live="polite"></span></div>
`,
      css: `

.u352{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:30px;overflow:hidden;background:#120A1F;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);transition:background-color .6s}
.u352-cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:pointer}
.u352-nm{position:absolute;right:14px;bottom:14px;padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.12);color:rgba(255,255,255,.85);font-size:11.5px;font-weight:750;pointer-events:none;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u352');
  var cv = root.querySelector('.u352-cv'), cx = cv.getContext('2d'), nm = root.querySelector('.u352-nm');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PAL = [['Dusk', '#120A1F', [16, 36]], ['Deep sea', '#04121C', [175, 215]], ['Forest', '#08140C', [80, 140]]];
  var W = 340, H = 330, dpr = Math.min(2, window.devicePixelRatio || 1), pal = 0, ptr = null, t = 0;
  cv.width = W * dpr; cv.height = H * dpr; cx.scale(dpr, dpr);
  var P = [];
  function spawn(p) { p.x = Math.random() * W; p.y = Math.random() * H; p.life = 60 + Math.random() * 160; p.h = Math.random(); return p; }
  for (var i = 0; i < 900; i++) P.push(spawn({}));
  // 바람결의 방향: 서로 다른 주기의 사인파 셋을 겹쳐 시간에 따라 천천히 변하는 흐름을 만듭니다
  function angle(x, y) { return (Math.sin(x * 0.011 + t * 0.25) + Math.cos(y * 0.013 - t * 0.19) + Math.sin((x + y) * 0.006 + t * 0.12)) * Math.PI * 0.66; }
  function clear() { cx.fillStyle = PAL[pal][1]; cx.fillRect(0, 0, W, H); root.style.backgroundColor = PAL[pal][1]; nm.textContent = PAL[pal][0]; }
  function step(dt) {
    var bg = PAL[pal][1];
    cx.globalAlpha = 0.07; cx.fillStyle = bg; cx.fillRect(0, 0, W, H); cx.globalAlpha = 1;
    // 색을 여섯 단계로 나눠 같은 색 선끼리 한 번에 그립니다
    var groups = [[], [], [], [], [], []], hr = PAL[pal][2];
    P.forEach(function (p) {
      var a = angle(p.x, p.y), vx = Math.cos(a) * 46, vy = Math.sin(a) * 46;
      if (ptr) {
        var dx = p.x - ptr.x, dy = p.y - ptr.y, d = Math.hypot(dx, dy);
        if (d < 95 && d > 1) { var f = (1 - d / 95) * 160; vx += -dy / d * f - dx / d * f * 0.25; vy += dx / d * f - dy / d * f * 0.25; }
      }
      var nx = p.x + vx * dt, ny = p.y + vy * dt;
      groups[Math.min(5, (p.h * 6) | 0)].push(p.x, p.y, nx, ny);
      p.x = nx; p.y = ny; p.life -= 1;
      if (p.life < 0 || nx < -5 || nx > W + 5 || ny < -5 || ny > H + 5) spawn(p);
    });
    cx.lineWidth = 1.1; cx.lineCap = 'round';
    groups.forEach(function (g, k) {
      var hue = hr[0] + (hr[1] - hr[0]) * k / 5;
      cx.strokeStyle = 'hsla(' + hue.toFixed(0) + ',85%,' + (58 + k * 4) + '%,.55)';
      cx.beginPath();
      for (var j = 0; j < g.length; j += 4) { cx.moveTo(g[j], g[j + 1]); cx.lineTo(g[j + 2], g[j + 3]); }
      cx.stroke();
    });
  }
  var vis = true, raf = 0, last = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.04, Math.max(0, (now - last) / 1000)); last = now; t += dt;
    step(dt);
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { clear(); for (var k = 0; k < 120; k++) { t += 0.016; step(0.016); } return; } if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function loc(e) { var r = cv.getBoundingClientRect(), k = cv.offsetWidth / (r.width || 1); return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }; }
  cv.addEventListener('pointermove', function (e) { ptr = loc(e); });
  cv.addEventListener('pointerleave', function () { ptr = null; });
  cv.addEventListener('click', function () { pal = (pal + 1) % PAL.length; P.forEach(spawn); clear(); if (rm) run(); });
  clear(); run();
})();
  })();

  scope.ready();
  return scope.controller;
}
