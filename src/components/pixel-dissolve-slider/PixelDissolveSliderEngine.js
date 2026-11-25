// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPixelDissolveSlider(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u349">
  <div class="u349-fr" role="img"><div class="u349-cells" aria-hidden="true"></div><span class="u349-cap" aria-hidden="true"></span></div>
  <div class="u349-ft">
    <button class="u349-pv" type="button" aria-label="Previous photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
    <button class="u349-nx" type="button" aria-label="Next photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
    <div class="u349-ms" role="group" aria-label="Spread pattern"><button class="u349-m" type="button" aria-pressed="true">Wave</button><button class="u349-m" type="button" aria-pressed="false">Ring</button><button class="u349-m" type="button" aria-pressed="false">Random</button></div>
  </div>
</div>
`,
      css: `

.u349{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;flex-direction:column;padding:14px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u349-fr{position:relative;flex:1;border-radius:18px;overflow:hidden;background:var(--bg)}
.u349-cells{position:absolute;inset:0;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(9,1fr)}
.u349-cells i{background-image:var(--nx);background-size:1200% 900%;transform:scale(0);border-radius:2px}
.u349-cells.go i{animation:u349-pop .38s cubic-bezier(.3,1.5,.5,1) both;animation-delay:var(--d)}
@keyframes u349-pop{0%{transform:scale(0);border-radius:50%}70%{transform:scale(1.12)}100%{transform:scale(1.02);border-radius:0}}
.u349-cap{position:absolute;left:14px;bottom:12px;padding:6px 10px;border-radius:999px;background:rgba(0,0,0,.35);color:#fff;font-size:12.5px;font-weight:750;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.u349-ft{display:flex;align-items:center;gap:8px;margin-top:12px}
.u349-pv,.u349-nx{width:38px;height:38px;border:0;border-radius:50%;display:grid;place-items:center;background:var(--ux-surface-2);color:var(--ux-ink)}
.u349-ft svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.u349-ms{display:flex;gap:3px;margin-left:auto;padding:3px;border-radius:11px;background:var(--ux-surface-2)}
.u349-m{height:30px;padding:0 10px;border:0;border-radius:8px;background:none;font-size:12px;font-weight:750;color:var(--ux-ink-3)}
.u349-m[aria-pressed="true"]{background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u349');
  var fr = root.querySelector('.u349-fr'), cells = root.querySelector('.u349-cells'), cap = root.querySelector('.u349-cap');
  var ms = Array.prototype.slice.call(root.querySelectorAll('.u349-m'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NAMES = ['Dawn lake', 'Desert afternoon', 'Violet night', 'Green forest'];
  var IMG = [
    'radial-gradient(30% 22% at 70% 35%,#FFF3BF,transparent 70%),linear-gradient(#A5D8FF 0,#FFD8A8 45%,#4DABF7 46%,#1864AB 100%)',
    'radial-gradient(22% 18% at 25% 30%,#FFF9DB,transparent 70%),linear-gradient(#FFA94D,#F76707 50%,#E8590C 51%,#C2410C 75%,#9A3412)',
    'radial-gradient(1.5px 1.5px at 30% 30%,#fff,transparent),radial-gradient(1.5px 1.5px at 70% 20%,#fff,transparent),radial-gradient(40% 30% at 50% 100%,#E64980,transparent 70%),linear-gradient(#1B1035,#5F3DC4 70%,#9C36B5)',
    'radial-gradient(50% 30% at 50% 10%,#D3F9D8,transparent 70%),linear-gradient(#69DB7C,#2F9E44 55%,#1B4332)'
  ];
  var cur = 0, mode = 0, busy = false, C = 12, R = 9, list = [];
  for (var y = 0; y < R; y++) for (var x = 0; x < C; x++) {
    var i = document.createElement('i');
    i.style.backgroundPosition = (x / (C - 1) * 100) + '% ' + (y / (R - 1) * 100) + '%';
    cells.appendChild(i); list.push({ el: i, x: x, y: y });
  }
  function show(n) { fr.style.setProperty('--bg', IMG[n]); cap.textContent = NAMES[n]; fr.setAttribute('aria-label', NAMES[n]); }
  // 칸마다 출발 시각을 모양에 따라 다르게 줍니다
  function go(n) {
    if (busy) return;
    n = (n + IMG.length) % IMG.length;
    busy = true;
    cells.style.setProperty('--nx', IMG[n]);
    list.forEach(function (c) {
      var d = mode === 0 ? c.x * 45 + c.y * 12 + Math.random() * 60 : mode === 1 ? Math.hypot(c.x - 5.5, (c.y - 4) * 1.2) * 70 + Math.random() * 40 : Math.random() * 650;
      c.el.style.setProperty('--d', Math.round(d) + 'ms');
    });
    cells.classList.remove('go'); void cells.offsetWidth; cells.classList.add('go');
    setTimeout(function () {
      if (!root.isConnected) return;
      show(n); cur = n;
      cells.classList.remove('go');
      busy = false;
    }, rm ? 50 : 1080);
  }
  root.querySelector('.u349-nx').addEventListener('click', function () { go(cur + 1); });
  root.querySelector('.u349-pv').addEventListener('click', function () { go(cur - 1); });
  ms.forEach(function (b, i) { b.addEventListener('click', function () { mode = i; ms.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }); });
  show(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
