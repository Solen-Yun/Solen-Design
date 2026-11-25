// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountWaffleChart(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u326">
  <div class="u326-hd"><b>How people commute</b><span>Per 100 people</span></div>
  <div class="u326-tabs" role="group" aria-label="Age group"></div>
  <div class="u326-gd" aria-hidden="true"></div>
  <div class="u326-lg" aria-live="polite"></div>
</div>
`,
      css: `

.u326{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u326-hd{position:absolute;left:22px;right:22px;top:18px;display:flex;justify-content:space-between;align-items:baseline}
.u326-hd b{font-size:14px;font-weight:900}
.u326-hd span{font-size:10.5px;font-weight:700;color:var(--ux-ink-3)}
.u326-tabs{position:absolute;left:22px;right:22px;top:46px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.u326-tb{border:0;padding:6px 0;border-radius:9px;background:var(--ux-surface-2);color:var(--ux-ink-2);font:inherit;font-size:11.5px;font-weight:800;cursor:pointer;transition:background .2s,color .2s}
.u326-tb.is-on{background:var(--ux-ink);color:var(--ux-surface)}
.u326-tb:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u326-gd{position:absolute;left:22px;top:94px;width:198px;height:198px;display:grid;grid-template-columns:repeat(10,1fr);gap:3px;perspective:400px}
.u326-c{border-radius:4px;background:var(--c);transition:opacity .25s,transform .25s}
.u326.is-f .u326-c{opacity:.16}
.u326.is-f .u326-c.is-hl{opacity:1}
.u326-lg{position:absolute;left:236px;right:16px;top:94px;display:flex;flex-direction:column;gap:6px}
.u326-li{display:block;width:100%;border:0;padding:5px 6px;border-radius:10px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;transition:background .2s,opacity .2s}
.u326-li:hover,.u326-li.is-on{background:var(--ux-surface-2)}
.u326.is-f .u326-li:not(.is-hl){opacity:.4}
.u326-li:focus-visible{outline:2px solid var(--ux-accent);outline-offset:1px}
.u326-li span{display:flex;align-items:center;gap:5px;font-size:10.5px;font-weight:750;color:var(--ux-ink-2);white-space:nowrap}
.u326-li span i{flex:none;width:8px;height:8px;border-radius:2px;background:var(--c)}
.u326-li b{display:block;font-size:20px;font-weight:900;letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:1.15}
.u326-li b small{font-size:11px;font-weight:800;color:var(--ux-ink-3);margin-left:1px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u326');
  var tabs = root.querySelector('.u326-tabs'), gd = root.querySelector('.u326-gd'), lg = root.querySelector('.u326-lg');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CAT = ['Subway', 'Bus', 'Car', 'Bike/Walk'], AGE = ['20s', '30s', '40s', '50+'];
  var COL = ['#6366F1', '#10B981', '#F59E0B', '#EC4899'];
  // 연령대별 100명 중 수단별 인원(예시 값)
  var D = [[46, 28, 10, 16], [41, 22, 27, 10], [30, 18, 45, 7], [24, 27, 41, 8]];
  var age = 0, cells = [], own = [], shown = D[0].slice(), T = [], LI = [], pin = -1;
  for (var i = 0; i < 100; i++) { var c = document.createElement('span'); c.className = 'u326-c'; gd.appendChild(c); cells.push(c); }
  AGE.forEach(function (a, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u326-tb'; b.textContent = a; b.addEventListener('click', function () { setAge(i); }); tabs.appendChild(b); T.push(b); });
  CAT.forEach(function (n, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u326-li'; b.style.setProperty('--c', COL[i]);
    b.innerHTML = '<span><i></i>' + n + '</span><b><em style="font-style:normal">0</em><small>%</small></b>';
    b.addEventListener('pointerenter', function () { focus(i); });
    b.addEventListener('pointerleave', function () { focus(pin); });
    b.addEventListener('focus', function () { focus(i); });
    b.addEventListener('blur', function () { focus(pin); });
    b.addEventListener('click', function () { pin = pin === i ? -1 : i; LI.forEach(function (o, k) { o.classList.toggle('is-on', k === pin); o.setAttribute('aria-pressed', k === pin); }); focus(pin); });
    lg.appendChild(b); LI.push(b);
  });
  function focus(k) {
    root.classList.toggle('is-f', k >= 0);
    cells.forEach(function (c, i) { c.classList.toggle('is-hl', own[i] === k); });
    LI.forEach(function (o, i) { o.classList.toggle('is-hl', i === k); });
  }
  // 칸 주인: 왼쪽 위부터 줄마다 수단 순서대로 채웁니다
  function owners(a) { var o = [], d = D[a]; d.forEach(function (n, k) { for (var j = 0; j < n; j++) o.push(k); }); return o; }
  function label(i, v) { LI[i].querySelector('em').textContent = Math.round(v); LI[i].setAttribute('aria-label', CAT[i] + ' ' + D[age][i] + ' of 100'); }
  var tw = 0;
  function roll(from, to) {
    cancelAnimationFrame(tw);
    if (rm) { to.forEach(function (v, i) { label(i, v); }); shown = to.slice(); return; }
    var t0 = performance.now();
    (function f(now) {
      var k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3);
      to.forEach(function (v, i) { shown[i] = from[i] + (v - from[i]) * e; label(i, shown[i]); });
      if (k < 1) tw = requestAnimationFrame(f);
    })(t0);
  }
  function setAge(a) {
    var prev = own, from = shown.slice();
    age = a; own = owners(a);
    T.forEach(function (b, i) { b.classList.toggle('is-on', i === a); b.setAttribute('aria-pressed', i === a); });
    // 주인이 바뀐 칸만 대각선 순서로 뒤집으며 색을 바꿉니다
    cells.forEach(function (c, i) {
      var col = COL[own[i]];
      if (prev[i] === own[i]) return;
      if (rm || prev.length === 0) { c.style.setProperty('--c', col); return; }
      var delay = ((i % 10) + Math.floor(i / 10)) * 22;
      c.animate([{ transform: 'rotateY(0)' }, { transform: 'rotateY(90deg) scale(.85)', offset: 0.5 }, { transform: 'rotateY(0)' }], { duration: 380, delay: delay, easing: 'ease-in-out' });
      setTimeout(function () { c.style.setProperty('--c', col); }, delay + 190);
    });
    roll(from, D[a]);
    focus(pin);
  }
  setAge(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
