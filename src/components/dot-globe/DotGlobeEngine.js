// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDotGlobe(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u385">
  <canvas class="u385-cv" role="img" aria-label="Dotted globe, drag to spin"></canvas>
  <div class="u385-hd"><small>Live visitors</small><b class="u385-n">0</b></div>
  <div class="u385-tip" aria-hidden="true"><b class="u385-tn"></b><span class="u385-tv"></span></div>
</div>
`,
      css: `

.u385{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(80% 80% at 50% 48%,#0F1A33,#060912 72%);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#E8F0FF}
.u385-cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab}
.u385-cv:active{cursor:grabbing}
.u385-hd{position:absolute;left:16px;top:14px;pointer-events:none}
.u385-hd small{display:block;font-size:10.5px;font-weight:700;color:rgba(232,240,255,.55);letter-spacing:.02em}
.u385-hd b{font-size:20px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.u385-hd b::before{content:"";display:inline-block;width:7px;height:7px;margin:0 7px 3px 0;border-radius:50%;background:#5CF2B5;box-shadow:0 0 0 0 rgba(92,242,181,.6);animation:u385-live 1.6s infinite}
@keyframes u385-live{70%{box-shadow:0 0 0 7px rgba(92,242,181,0)}100%{box-shadow:0 0 0 0 rgba(92,242,181,0)}}
.u385-tip{position:absolute;left:0;top:0;padding:6px 9px;border-radius:10px;background:rgba(232,240,255,.95);color:#0F1A33;font-size:11px;font-weight:750;white-space:nowrap;pointer-events:none;opacity:0;transform:translate(-50%,-140%) scale(.9);transition:opacity .18s,transform .25s var(--ux-spring)}
.u385-tip.is-on{opacity:1;transform:translate(-50%,-140%)}
.u385-tip span{display:block;font-size:10px;font-weight:650;color:#4A5878}
@media (prefers-reduced-motion: reduce){.u385-hd b::before{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u385');
  var cv = root.querySelector('.u385-cv'), cx = cv.getContext('2d'), num = root.querySelector('.u385-n');
  var tip = root.querySelector('.u385-tip'), tn = root.querySelector('.u385-tn'), tv = root.querySelector('.u385-tv');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 340, H = 340, dpr = Math.min(2, window.devicePixelRatio || 1), C = [170, 184], R = 132, TILT = -0.32;
  cv.width = W * dpr; cv.height = H * dpr; cx.scale(dpr, dpr);
  // 대륙 윤곽(경도, 위도)을 대략 잡은 다각형. 피보나치 구 위의 점이 안에 들면 육지 점이 됩니다
  var LAND = [
    [[-168, 66], [-140, 70], [-100, 72], [-80, 73], [-62, 60], [-55, 50], [-66, 44], [-75, 35], [-81, 25], [-97, 18], [-90, 15], [-83, 9], [-78, 8], [-105, 22], [-117, 32], [-124, 40], [-125, 50], [-135, 58], [-150, 60], [-165, 62]],
    [[-55, 60], [-45, 60], [-20, 70], [-20, 80], [-60, 82], [-70, 77]],
    [[-80, 10], [-72, 12], [-60, 10], [-50, 0], [-35, -6], [-40, -22], [-48, -28], [-58, -38], [-65, -55], [-74, -50], [-72, -30], [-70, -18], [-81, -5]],
    [[-10, 36], [-9, 44], [0, 50], [5, 54], [8, 58], [5, 62], [15, 69], [30, 71], [60, 70], [80, 73], [110, 77], [140, 72], [180, 68], [170, 60], [160, 55], [142, 46], [130, 42], [122, 40], [121, 30], [110, 20], [106, 10], [100, 13], [98, 8], [92, 22], [80, 15], [77, 8], [72, 20], [66, 25], [57, 26], [58, 22], [52, 17], [43, 13], [35, 28], [35, 33], [36, 36], [27, 37], [26, 40], [23, 36], [20, 40], [15, 38], [12, 44], [8, 44], [3, 43], [-5, 36]],
    [[-17, 21], [-10, 30], [-6, 35], [10, 37], [20, 33], [32, 31], [35, 28], [43, 12], [51, 12], [40, -15], [35, -25], [20, -35], [12, -18], [9, 0], [-8, 5], [-17, 14]],
    [[113, -22], [122, -17], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [141, -38], [135, -34], [129, -32], [115, -34]],
    [[-6, 50], [2, 51], [0, 58], [-6, 58]], [[130, 31], [141, 36], [142, 43], [140, 41], [135, 34]], [[44, -25], [50, -16], [49, -12], [43, -17]],
    [[109, -3], [117, -4], [119, 2], [116, 6], [109, 2]], [[95, 5], [106, -6], [103, -5], [98, 2]], [[172, -34], [178, -38], [174, -41], [167, -46], [170, -44]]
  ];
  function inPoly(x, y, p) { var c = false; for (var i = 0, j = p.length - 1; i < p.length; j = i++) { if ((p[i][1] > y) !== (p[j][1] > y) && x < (p[j][0] - p[i][0]) * (y - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) c = !c; } return c; }
  function land(lon, lat) { if (lat < -68) return true; for (var k = 0; k < LAND.length; k++) if (inPoly(lon, lat, LAND[k])) return true; return false; }
  var P = [], N = 6400, GA = Math.PI * (3 - Math.sqrt(5));
  for (var i = 0; i < N; i++) {
    var y = 1 - (i + 0.5) / N * 2, r = Math.sqrt(1 - y * y), th = GA * i, lat = Math.asin(y) * 180 / Math.PI, lon = ((th * 180 / Math.PI) % 360) - 180;
    if (land(lon, lat)) P.push([lat * Math.PI / 180, lon * Math.PI / 180]);
  }
  var CITY = ['Seoul', 'Tokyo', 'New York', 'San Francisco', 'London', 'Berlin', 'São Paulo', 'Lagos', 'Mumbai', 'Sydney', 'Singapore', 'Dubai'];
  var CLL = [[37.6, 127], [35.7, 139.7], [40.7, -74], [37.8, -122.4], [51.5, -0.1], [52.5, 13.4], [-23.5, -46.6], [6.5, 3.4], [19.1, 72.9], [-33.9, 151.2], [1.35, 103.8], [25.2, 55.3]];
  var CV = CLL.map(function (c, i) { return { lat: c[0] * Math.PI / 180, lon: c[1] * Math.PI / 180, n: 40 + Math.round(Math.random() * 260), name: CITY[i], q: null }; });
  var rot = -2.1, vel = 0.18, pings = [], hover = null, t = 0;
  // 위도·경도 → 돌린 구 위의 화면 좌표. z가 양수면 앞면입니다
  function proj(lat, lon) {
    var cl = Math.cos(lat), x = cl * Math.sin(lon + rot), y = Math.sin(lat), z = cl * Math.cos(lon + rot);
    var y2 = y * Math.cos(TILT) - z * Math.sin(TILT), z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
    return { x: C[0] + x * R, y: C[1] - y2 * R, z: z2 };
  }
  function draw() {
    cx.clearRect(0, 0, W, H);
    var g = cx.createRadialGradient(C[0] - 40, C[1] - 50, 10, C[0], C[1], R + 30);
    g.addColorStop(0, 'rgba(70,120,255,.22)'); g.addColorStop(0.8, 'rgba(40,70,160,.08)'); g.addColorStop(1, 'rgba(40,70,160,0)');
    cx.fillStyle = g; cx.beginPath(); cx.arc(C[0], C[1], R + 30, 0, 6.2832); cx.fill();
    cx.strokeStyle = 'rgba(120,160,255,.18)'; cx.lineWidth = 1; cx.beginPath(); cx.arc(C[0], C[1], R, 0, 6.2832); cx.stroke();
    for (var i = 0; i < P.length; i++) {
      var q = proj(P[i][0], P[i][1]);
      if (q.z < -0.15) continue;
      var k = (q.z + 0.15) / 1.15;
      cx.fillStyle = 'rgba(' + (120 + k * 80 | 0) + ',' + (170 + k * 60 | 0) + ',255,' + (0.12 + k * 0.78).toFixed(2) + ')';
      var s = 0.6 + k * 1.2; cx.fillRect(q.x - s / 2, q.y - s / 2, s, s);
    }
    pings.forEach(function (p) {
      var q = proj(p.c.lat, p.c.lon); if (q.z < 0.05) return;
      var a = 1 - p.t; cx.strokeStyle = 'rgba(92,242,181,' + (a * 0.9).toFixed(2) + ')'; cx.lineWidth = 1.4;
      cx.beginPath(); cx.arc(q.x, q.y, 3 + p.t * 18, 0, 6.2832); cx.stroke();
    });
    CV.forEach(function (c) {
      var q = c.q = proj(c.lat, c.lon); if (q.z < 0.05) return;
      var on = c === hover;
      cx.fillStyle = on ? '#FFFFFF' : '#5CF2B5'; cx.beginPath(); cx.arc(q.x, q.y, on ? 4.2 : 2.6 + q.z, 0, 6.2832); cx.fill();
      cx.strokeStyle = 'rgba(92,242,181,.35)'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(q.x, q.y); cx.lineTo(q.x, q.y - 8 * q.z); cx.stroke();
    });
    var tot = CV.reduce(function (s, c) { return s + c.n; }, 0);
    num.textContent = tot.toLocaleString();
    if (hover && hover.q && hover.q.z > 0.05) { tip.style.left = hover.q.x + 'px'; tip.style.top = hover.q.y + 'px'; tn.textContent = hover.name; tv.textContent = 'Now ' + hover.n + ' visiting'; tip.classList.add('is-on'); }
    else tip.classList.remove('is-on');
  }
  var vis = true, raf = 0, last = 0, drag = null, pingAcc = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now; t += dt;
    // 놓은 뒤에는 관성 속도가 원래 자전 속도(0.18)로 천천히 돌아갑니다
    if (!drag) { vel += (0.18 - vel) * Math.min(1, dt * 1.2); rot += vel * dt; }
    pingAcc += dt;
    if (pingAcc > 0.35) { pingAcc = 0; var c = CV[(Math.random() * CV.length) | 0]; c.n = Math.max(20, c.n + Math.round((Math.random() - 0.35) * 9)); pings.push({ c: c, t: 0 }); }
    pings.forEach(function (p) { p.t += dt / 1.4; }); pings = pings.filter(function (p) { return p.t < 1; });
    draw();
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { draw(); return; } if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function loc(e) { var r = cv.getBoundingClientRect(), k = cv.offsetWidth / (r.width || 1); return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k }; }
  cv.addEventListener('pointerdown', function (e) { drag = { x: loc(e).x, r: rot, lx: loc(e).x, lt: performance.now() }; try { cv.setPointerCapture(e.pointerId); } catch (_) {} });
  cv.addEventListener('pointermove', function (e) {
    var q = loc(e);
    if (drag) {
      rot = drag.r + (q.x - drag.x) / R;
      var nt = performance.now(), d = Math.max(1, nt - drag.lt); vel = (q.x - drag.lx) / R / (d / 1000); drag.lx = q.x; drag.lt = nt;
    }
    hover = null;
    CV.forEach(function (c) { if (c.q && c.q.z > 0.05 && Math.hypot(c.q.x - q.x, c.q.y - q.y) < 11) hover = c; });
    if (rm) draw();
  });
  function end() { if (drag) { vel = Math.max(-6, Math.min(6, vel)); drag = null; } }
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('pointerleave', function () { hover = null; if (rm) draw(); });
  draw(); run();
})();
  })();

  scope.ready();
  return scope.controller;
}
