// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountParticleNetwork(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u341"><canvas class="u341-cv" role="img" aria-label="Constellation mesh, press to burst dots"></canvas><span class="u341-ct" aria-hidden="true"></span></div>
`,
      css: `

.u341{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:30px;overflow:hidden;background:radial-gradient(120% 90% at 20% 0%,#1E2552,#0A0D1F 60%);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u341-cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}
.u341-ct{position:absolute;left:16px;top:14px;padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.1);color:#C5D0FF;font:700 11.5px/1 ui-monospace,SFMono-Regular,Menlo,monospace;pointer-events:none}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u341');
  var cv = root.querySelector('.u341-cv'), cx = cv.getContext('2d'), ct = root.querySelector('.u341-ct');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 340, H = 330, dpr = Math.min(2, window.devicePixelRatio || 1), LINK = 72, PL = 120, MAX = 120;
  cv.width = W * dpr; cv.height = H * dpr; cx.scale(dpr, dpr);
  var P = [], ptr = null;
  function add(x, y, vx, vy, born) { P.push({ x: x, y: y, vx: vx, vy: vy, b: born || 0 }); if (P.length > MAX) P.shift(); }
  for (var i = 0; i < 72; i++) add(Math.random() * W, Math.random() * H, (Math.random() - 0.5) * 22, (Math.random() - 0.5) * 22);
  function draw(now) {
    cx.clearRect(0, 0, W, H);
    var links = 0;
    // 가까운 두 점을 거리만큼 옅어지는 선으로 잇습니다(70px 안쪽)
    for (var a = 0; a < P.length; a++) {
      for (var b = a + 1; b < P.length; b++) {
        var dx = P[a].x - P[b].x, dy = P[a].y - P[b].y;
        if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
        var d = Math.hypot(dx, dy);
        if (d > LINK) continue;
        links++;
        var hue = 210 + (P[a].x / W) * 90;
        cx.strokeStyle = 'hsla(' + hue.toFixed(0) + ',90%,75%,' + ((1 - d / LINK) * 0.45).toFixed(2) + ')'; cx.lineWidth = 1;
        cx.beginPath(); cx.moveTo(P[a].x, P[a].y); cx.lineTo(P[b].x, P[b].y); cx.stroke();
      }
    }
    if (ptr) {
      P.forEach(function (p) {
        var d = Math.hypot(p.x - ptr.x, p.y - ptr.y);
        if (d > PL) return;
        links++;
        cx.strokeStyle = 'rgba(255,224,130,' + ((1 - d / PL) * 0.8).toFixed(2) + ')'; cx.lineWidth = 1.3;
        cx.beginPath(); cx.moveTo(ptr.x, ptr.y); cx.lineTo(p.x, p.y); cx.stroke();
      });
      cx.fillStyle = '#FFE082'; cx.beginPath(); cx.arc(ptr.x, ptr.y, 3.5, 0, 6.2832); cx.fill();
    }
    P.forEach(function (p) {
      var age = (now - p.b) / 600, r = p.b && age < 1 ? 1.6 + (1 - age) * 2.4 : 1.6;
      cx.fillStyle = '#E7ECFF'; cx.beginPath(); cx.arc(p.x, p.y, r, 0, 6.2832); cx.fill();
    });
    ct.textContent = links + ' links';
  }
  var vis = true, raf = 0, last = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
    P.forEach(function (p) {
      // 커서 가까이의 점은 살며시 끌려오고, 너무 빠른 점은 마찰로 느려집니다
      if (ptr) { var dx = ptr.x - p.x, dy = ptr.y - p.y, d = Math.hypot(dx, dy); if (d < PL && d > 12) { p.vx += dx / d * 28 * dt; p.vy += dy / d * 28 * dt; } }
      var sp = Math.hypot(p.vx, p.vy); if (sp > 30) { p.vx *= 1 - 1.5 * dt; p.vy *= 1 - 1.5 * dt; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < 0 || p.x > W) { p.vx *= -1; p.x = Math.max(0, Math.min(W, p.x)); }
      if (p.y < 0 || p.y > H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)); }
    });
    draw(now);
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { draw(performance.now()); return; } if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function loc(e) { var r = cv.getBoundingClientRect(), k = cv.offsetWidth / (r.width || 1); return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }; }
  cv.addEventListener('pointermove', function (e) { ptr = loc(e); if (rm) draw(performance.now()); });
  cv.addEventListener('pointerleave', function () { ptr = null; if (rm) draw(performance.now()); });
  cv.addEventListener('pointerdown', function (e) {
    var q = loc(e), now = performance.now();
    for (var k = 0; k < 9; k++) { var a = k / 9 * Math.PI * 2 + Math.random() * 0.4, s = 60 + Math.random() * 70; add(q.x, q.y, Math.cos(a) * s, Math.sin(a) * s, now); }
    if (rm) draw(now);
  });
  run();
})();
  })();

  scope.ready();
  return scope.controller;
}
