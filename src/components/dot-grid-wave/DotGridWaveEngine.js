// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDotGridWave(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u363"><canvas class="u363-cv" role="img" aria-label="Dot grid, press to send a wave"></canvas></div>
`,
      css: `

.u363{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u363-cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u363');
  var cv = root.querySelector('.u363-cv'), cx = cv.getContext('2d');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 340, H = 330, dpr = Math.min(2, window.devicePixelRatio || 1), GAP = 17;
  cv.width = W * dpr; cv.height = H * dpr; cx.scale(dpr, dpr);
  var dots = [];
  for (var y = GAP; y < H - 4; y += GAP) for (var x = GAP; x < W - 4; x += GAP) dots.push([x, y]);
  // 물결 하나 = 시작 자리, 시작 시각, 세기. 바깥으로 초속 170px로 퍼지며 시간과 거리에 따라 약해집니다
  var waves = [], lastAdd = 0;
  function add(x, y, a) { waves.push({ x: x, y: y, t: performance.now(), a: a }); if (waves.length > 14) waves.shift(); }
  function draw(now) {
    // 쉬고 있는 점은 테마의 옅은 글자색을 따릅니다(밝은·어두운 테마 모두)
    var idle = getComputedStyle(root).getPropertyValue('--ux-ink-3').trim() || '#868E96';
    cx.clearRect(0, 0, W, H);
    waves = waves.filter(function (w) { return now - w.t < 2600; });
    dots.forEach(function (d) {
      var h = 0;
      waves.forEach(function (w) {
        var age = (now - w.t) / 1000, dist = Math.hypot(d[0] - w.x, d[1] - w.y), front = age * 170, k = dist - front;
        if (k > 0 || k < -90) return;
        h += Math.sin(k / 14) * Math.exp(k / 60) * w.a * Math.exp(-age * 1.3);
      });
      var m = Math.max(-1, Math.min(1.6, h)), r = 1.6 + Math.max(0, m) * 3.4;
      var hue = 230 - Math.max(0, m) * 110;
      var calm = Math.abs(m) < 0.04;
      cx.globalAlpha = calm ? 0.55 : 1;
      cx.fillStyle = calm ? idle : 'hsl(' + hue.toFixed(0) + ' 85% ' + (58 - Math.min(0, m) * 10).toFixed(0) + '%)';
      cx.beginPath(); cx.arc(d[0], d[1] - m * 3, r, 0, 6.2832); cx.fill();
    });
    cx.globalAlpha = 1;
  }
  var vis = true, raf = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    draw(now);
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { draw(performance.now()); return; } if (!raf && vis) raf = requestAnimationFrame(frame); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function loc(e) { var r = cv.getBoundingClientRect(), k = cv.offsetWidth / (r.width || 1); return [(e.clientX - r.left) * k, (e.clientY - r.top) * k]; }
  cv.addEventListener('pointermove', function (e) { var now = performance.now(); if (now - lastAdd < 110) return; lastAdd = now; var q = loc(e); add(q[0], q[1], 0.55); if (rm) draw(now + 300); });
  cv.addEventListener('pointerdown', function (e) { var q = loc(e); add(q[0], q[1], 1.6); if (rm) draw(performance.now() + 500); });
  run();
})();
  })();

  scope.ready();
  return scope.controller;
}
