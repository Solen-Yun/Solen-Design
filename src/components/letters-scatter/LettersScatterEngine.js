// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountLettersScatter(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 300,
      responsive: false,
      markup: `
<div class="ux u360">
  <div class="u360-wd" role="button" tabindex="0" aria-label="Scatter the letters"></div>
  <div class="u360-ft"><button class="u360-go" type="button">Scatter</button><button class="u360-home" type="button">Gather</button></div>
</div>
`,
      css: `

.u360{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:300px;padding:18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;touch-action:none}
.u360::before{content:"";position:absolute;inset:0;background-image:radial-gradient(var(--ux-line-2) 1px,transparent 1.2px);background-size:18px 18px;opacity:.6;pointer-events:none}
.u360-wd{position:absolute;left:0;right:0;top:92px;display:flex;justify-content:center;gap:2px;margin:0;border:0;background:none;padding:0}
.u360-l{position:relative;display:inline-block;font-size:52px;line-height:1;font-weight:900;letter-spacing:-.02em;cursor:grab;user-select:none;-webkit-user-select:none;color:oklch(.6 .2 var(--h));color:color-mix(in oklab,oklch(.62 .2 var(--h)) 85%,var(--ux-ink));will-change:transform}
.u360-l.drag{cursor:grabbing;z-index:2}
.u360-ft{position:absolute;left:18px;right:18px;bottom:16px;display:flex;gap:8px}
.u360-go,.u360-home{flex:1;height:40px;border:0;border-radius:13px;font-size:13.5px;font-weight:750;transition:transform .35s var(--ux-spring)}
.u360-go{background:var(--ux-ink);color:var(--ux-page)}
.u360-home{background:var(--ux-surface-2);color:var(--ux-ink)}
.u360-go:active,.u360-home:active{transform:scale(.94)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u360');
  var wd = root.querySelector('.u360-wd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WORD = 'PLAYFUL', raf = 0;
  var L = Array.from(WORD).map(function (ch, i) {
    var s = document.createElement('span');
    s.className = 'u360-l'; s.textContent = ch; s.setAttribute('aria-hidden', 'true');
    s.style.setProperty('--h', 20 + i * 48);
    wd.appendChild(s);
    return { el: s, x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, free: 0, drag: false };
  });
  wd.setAttribute('aria-label', wd.getAttribute('aria-label') + ' · ' + WORD);
  function scale() { var r = root.getBoundingClientRect(); return root.offsetWidth / (r.width || 1); }
  // 흩어진 동안(free)은 벽에 튕기며 떠다니고, 시간이 지나면 스프링으로 제자리(0,0)에 돌아옵니다
  function tick(now) {
    raf = 0;
    if (!root.isConnected) return;
    var W = root.offsetWidth, H = root.offsetHeight, alive = false;
    L.forEach(function (l) {
      if (l.drag) { alive = true; return; }
      if (now < l.free) {
        l.vy += 0.05; l.vx *= 0.985; l.vy *= 0.985; l.vr *= 0.98;
        var bx = l.el.offsetLeft + wd.offsetLeft, by = l.el.offsetTop + wd.offsetTop, w = l.el.offsetWidth, h = l.el.offsetHeight;
        if (bx + l.x < 6 && l.vx < 0 || bx + l.x + w > W - 6 && l.vx > 0) l.vx *= -0.8;
        if (by + l.y < 6 && l.vy < 0 || by + l.y + h > H - 64 && l.vy > 0) l.vy *= -0.75;
      } else {
        l.vx += -l.x * 0.06; l.vy += -l.y * 0.06; l.vr += -l.r * 0.06;
        l.vx *= 0.8; l.vy *= 0.8; l.vr *= 0.8;
      }
      l.x += l.vx; l.y += l.vy; l.r += l.vr;
      if (now < l.free || Math.abs(l.x) + Math.abs(l.y) + Math.abs(l.r) > 0.1 || Math.abs(l.vx) + Math.abs(l.vy) > 0.05) alive = true;
      else { l.x = l.y = l.r = 0; }
      l.el.style.transform = 'translate(' + l.x.toFixed(1) + 'px,' + l.y.toFixed(1) + 'px) rotate(' + l.r.toFixed(1) + 'deg)';
    });
    if (alive) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  function scatter() {
    if (rm) return;
    var now = performance.now();
    L.forEach(function (l, i) {
      var a = Math.random() * Math.PI * 2, sp = 7 + Math.random() * 7;
      l.vx = Math.cos(a) * sp; l.vy = Math.sin(a) * sp - 3; l.vr = (Math.random() - 0.5) * 30;
      l.free = now + 1300 + i * 70;
    });
    kick();
  }
  function home() { L.forEach(function (l) { l.free = 0; }); kick(); }
  // 글자를 잡아 끌면 손을 따라오고, 놓을 때의 속도로 날아갔다가 돌아옵니다
  L.forEach(function (l) {
    var sx = 0, sy = 0, px = 0, py = 0, lt = 0, moved = false;
    l.el.addEventListener('pointerdown', function (e) {
      e.preventDefault(); e.stopPropagation();
      l.drag = true; moved = false; l.el.classList.add('drag');
      var k = scale();
      sx = e.clientX * k - l.x; sy = e.clientY * k - l.y; px = e.clientX * k; py = e.clientY * k; lt = performance.now();
      try { l.el.setPointerCapture(e.pointerId); } catch (er) { /* 무시 */ }
      kick();
    });
    l.el.addEventListener('pointermove', function (e) {
      if (!l.drag) return;
      var k = scale(), cx = e.clientX * k, cy = e.clientY * k, now = performance.now(), dt = Math.max(8, now - lt);
      l.vx = (cx - px) / dt * 16; l.vy = (cy - py) / dt * 16; px = cx; py = cy; lt = now;
      l.x = cx - sx; l.y = cy - sy; l.r = Math.max(-30, Math.min(30, l.vx * 2));
      if (Math.abs(l.x) + Math.abs(l.y) > 4) moved = true;
      l.el.style.transform = 'translate(' + l.x.toFixed(1) + 'px,' + l.y.toFixed(1) + 'px) rotate(' + l.r.toFixed(1) + 'deg)';
    });
    function up() {
      if (!l.drag) return;
      l.drag = false; l.el.classList.remove('drag');
      l.free = performance.now() + (moved ? 900 : 0);
      l.vr = l.vx * 1.5;
      kick();
    }
    l.el.addEventListener('pointerup', up);
    l.el.addEventListener('pointercancel', up);
    l.el.addEventListener('click', function (e) { if (moved) e.stopPropagation(); });
  });
  wd.addEventListener('click', scatter);
  wd.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scatter(); } });
  root.querySelector('.u360-go').addEventListener('click', scatter);
  root.querySelector('.u360-home').addEventListener('click', home);
})();
  })();

  scope.ready();
  return scope.controller;
}
