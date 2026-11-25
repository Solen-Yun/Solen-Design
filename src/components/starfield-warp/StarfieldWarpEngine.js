// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStarfieldWarp(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u330">
  <canvas class="u330-cv" role="img" aria-label="Starfield, hold to warp"></canvas>
  <div class="u330-hud" aria-live="off"><b></b><span></span></div>
  <button class="u330-wp" type="button">Hold to warp</button>
</div>
`,
      css: `

.u330{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:30px;overflow:hidden;background:radial-gradient(circle at 50% 50%,#0B1230,#02030A 70%);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#fff}
.u330-cv{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}
.u330-hud{position:absolute;left:18px;top:16px;display:flex;align-items:center;gap:8px;font:700 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;pointer-events:none}
.u330-hud b{padding:4px 8px;border-radius:999px;background:rgba(255,255,255,.12)}
.u330.is-warp .u330-hud b{background:#4DABF7;color:#03122B}
.u330-wp{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);height:38px;padding:0 18px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:rgba(255,255,255,.1);color:#fff;font-size:12.5px;font-weight:800;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);user-select:none;-webkit-user-select:none;transition:background-color .2s,transform .2s}
.u330.is-warp .u330-wp{background:rgba(77,171,247,.35);transform:translateX(-50%) scale(.96)}
.u330-wp:focus-visible{outline:2px solid #4DABF7;outline-offset:3px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u330');
  var cv = root.querySelector('.u330-cv'), cx = cv.getContext('2d'), mode = root.querySelector('.u330-hud b'), spd = root.querySelector('.u330-hud span'), wp = root.querySelector('.u330-wp');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 340, H = 330, dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = W * dpr; cv.height = H * dpr; cx.scale(dpr, dpr);
  var N = 280, stars = [], v = 0.22, target = 0.22, warp = false, aim = { x: 0, y: 0 }, steer = { x: 0, y: 0 };
  function spawn(s, far) { s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; s.z = far ? 1 : 0.05 + Math.random() * 0.95; s.pz = s.z; s.c = Math.random(); return s; }
  for (var i = 0; i < N; i++) stars.push(spawn({}, false));
  function hud() { mode.textContent = warp ? 'Warp' : 'Cruise'; spd.textContent = '×' + (v / 0.22).toFixed(1); }
  // 원근 투영: 화면 좌표 = 소실점 + (x, y) ÷ 깊이. 지난 깊이에서 지금 깊이까지 선을 그어 속도만큼 늘어난 빛줄기를 만듭니다
  function draw(dt) {
    cx.fillStyle = warp || v > 0.5 ? 'rgba(2,3,10,.35)' : 'rgba(2,3,10,.9)';
    cx.fillRect(0, 0, W, H);
    var ox = W / 2 + steer.x * 70, oy = H / 2 + steer.y * 60, f = 150, blue = Math.min(1, (v - 0.22) / 1.6);
    cx.lineCap = 'round';
    stars.forEach(function (s) {
      s.pz = s.z; s.z -= v * dt;
      if (s.z <= 0.02) { spawn(s, true); return; }
      var x = ox + s.x / s.z * f, y = oy + s.y / s.z * f, px = ox + s.x / (s.pz + v * 0.03) * f, py = oy + s.y / (s.pz + v * 0.03) * f;
      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) { spawn(s, true); return; }
      var a = Math.min(1, (1 - s.z) * 1.4), w = Math.max(0.6, (1 - s.z) * 2.6);
      var r = Math.round(255 - blue * 120 * s.c), g = Math.round(255 - blue * 40), b = 255;
      cx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(2) + ')'; cx.lineWidth = w;
      cx.beginPath(); cx.moveTo(px, py); cx.lineTo(x + 0.01, y); cx.stroke();
    });
    if (blue > 0.05) {
      var gl = cx.createRadialGradient(ox, oy, 0, ox, oy, 120);
      gl.addColorStop(0, 'rgba(120,190,255,' + (0.25 * blue).toFixed(2) + ')'); gl.addColorStop(1, 'rgba(120,190,255,0)');
      cx.fillStyle = gl; cx.fillRect(0, 0, W, H);
    }
  }
  var vis = true, raf = 0, last = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
    v += (target - v) * (1 - Math.pow(warp ? 0.25 : 0.12, dt));
    steer.x += (aim.x - steer.x) * (1 - Math.pow(0.05, dt)); steer.y += (aim.y - steer.y) * (1 - Math.pow(0.05, dt));
    draw(dt); hud();
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { cx.fillStyle = '#02030A'; cx.fillRect(0, 0, W, H); draw(0.016); hud(); return; } if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function setWarp(on) { warp = on; target = on ? 3.2 : 0.22; root.classList.toggle('is-warp', on); if (rm) { v = target; hud(); } }
  [cv, wp].forEach(function (el) {
    el.addEventListener('pointerdown', function (e) { setWarp(true); try { el.setPointerCapture(e.pointerId); } catch (er) { /* 무시 */ } });
    el.addEventListener('pointerup', function () { setWarp(false); });
    el.addEventListener('pointercancel', function () { setWarp(false); });
  });
  wp.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); setWarp(true); } });
  wp.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') setWarp(false); });
  cv.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); aim = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 }; });
  cv.addEventListener('pointerleave', function () { aim = { x: 0, y: 0 }; });
  cx.fillStyle = '#02030A'; cx.fillRect(0, 0, W, H);
  hud(); run();
})();
  })();

  scope.ready();
  return scope.controller;
}
