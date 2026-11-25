// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountLogoWallCycle(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u234">
  <div class="u234-hd">1,200 teams use it every day</div>
  <div class="u234-gd"></div>
  <div class="u234-ft">See all customer stories →</div>
</div>
`,
      css: `

.u234{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u234-hd{position:absolute;left:0;right:0;top:30px;text-align:center;font-size:13px;font-weight:800;color:var(--ux-ink-2)}
.u234-gd{position:absolute;left:18px;right:18px;top:68px;display:grid;grid-template-columns:repeat(3,1fr);border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px var(--ux-line)}
.u234-cl{position:relative;height:70px;overflow:hidden;border:0;padding:0;background:none;color:var(--ux-ink);font:inherit;cursor:pointer;box-shadow:inset -1px -1px 0 var(--ux-line)}
.u234-cl:nth-child(3n){box-shadow:inset 0 -1px 0 var(--ux-line)}
.u234-cl:nth-child(n+7){box-shadow:inset -1px 0 0 var(--ux-line)}
.u234-cl:nth-child(9){box-shadow:none}
.u234-cl:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-2px}
.u234-lg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:5px;color:color-mix(in srgb,var(--ux-ink) 72%,transparent);transition:transform .55s cubic-bezier(.3,1,.4,1),opacity .45s,filter .45s}
.u234-lg svg{width:16px;height:16px;flex:none}
.u234-lg.is-out{transform:translateY(-22px);opacity:0;filter:blur(6px)}
.u234-lg.is-in{transform:translateY(22px);opacity:0;filter:blur(6px);transition:none}
.u234-cl:hover .u234-lg,.u234-cl.g-hov .u234-lg,.u234-cl:focus-visible .u234-lg{transform:translateY(-10px);color:var(--ux-ink)}
.u234-go{position:absolute;left:0;right:0;bottom:10px;font-size:9.5px;font-weight:850;color:var(--ux-accent);opacity:0;transform:translateY(8px);transition:opacity .25s,transform .35s cubic-bezier(.3,1.4,.5,1)}
.u234-cl:hover .u234-go,.u234-cl.g-hov .u234-go,.u234-cl:focus-visible .u234-go{opacity:1;transform:none}
.u234-ft{position:absolute;left:0;right:0;bottom:30px;text-align:center;font-size:11px;font-weight:800;color:var(--ux-ink-3)}
@media (prefers-reduced-motion: reduce){.u234-lg,.u234-go{transition:opacity .2s!important;filter:none!important}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u234');
  var gd = root.querySelector('.u234-gd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 지어낸 회사 로고: [이름, 글꼴 스타일, 기호]
  var L = [
    ['Lumen', 'font-weight:800;letter-spacing:-.04em', '<circle cx="8" cy="8" r="6" fill="currentColor"/><circle cx="8" cy="8" r="2.5" fill="var(--ux-surface)"/>'],
    ['northwind', 'font-weight:600;letter-spacing:.02em', '<path d="M2 13L8 3l6 10z" fill="currentColor"/>'],
    ['Pebble', 'font-family:Georgia,serif;font-style:italic;font-weight:700', '<ellipse cx="8" cy="9" rx="6" ry="4.5" fill="currentColor"/>'],
    ['HEXA', 'font-weight:900;letter-spacing:.14em;font-size:11px', '<path d="M8 1.5l5.6 3.2v6.6L8 14.5l-5.6-3.2V4.7z" fill="none" stroke="currentColor" stroke-width="2"/>'],
    ['tandem', 'font-family:ui-monospace,Menlo,monospace;font-weight:700', '<rect x="2" y="4" width="5" height="8" rx="2.5" fill="currentColor"/><rect x="9" y="4" width="5" height="8" rx="2.5" fill="currentColor" opacity=".5"/>'],
    ['Fernway', 'font-weight:750;letter-spacing:-.02em', '<path d="M8 14C8 8 5 4 2 3c5 0 9 3 10 8M8 14c0-3 2-6 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'],
    ['Quanta', 'font-weight:850;font-style:italic', '<rect x="2" y="2" width="12" height="12" rx="3.5" fill="currentColor"/><path d="M6 6h4v4" stroke="var(--ux-surface)" stroke-width="1.8" fill="none"/>'],
    ['mosaic', 'font-weight:800;letter-spacing:-.03em', '<rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="2" width="5" height="5" rx="2.5" fill="currentColor"/><rect x="2" y="9" width="5" height="5" rx="2.5" fill="currentColor"/><rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>'],
    ['Brisk', 'font-weight:900;letter-spacing:-.05em;font-size:14px', '<path d="M3 13l4-5-2-1 6-5-2 5 3 1z" fill="currentColor"/>'],
    ['Vela', 'font-family:Georgia,serif;font-weight:600;letter-spacing:.06em', '<path d="M8 2v12M8 2l5 9H8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'],
    ['arcus', 'font-weight:700;letter-spacing:.01em', '<path d="M2 12a6 6 0 0 1 12 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'],
    ['JUNIPER', 'font-weight:800;letter-spacing:.12em;font-size:10.5px', '<circle cx="5.5" cy="10" r="3" fill="currentColor"/><circle cx="10.5" cy="10" r="3" fill="currentColor" opacity=".6"/><circle cx="8" cy="5.5" r="3" fill="currentColor" opacity=".8"/>'],
    ['Oakline', 'font-weight:650', '<path d="M3 13h10M5 13V6M11 13V6M3 6l5-4 5 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'],
    ['ZEST', 'font-weight:900;font-style:italic;letter-spacing:.04em', '<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.2"/>']
  ];
  function logo(i) { var d = document.createElement('span'); d.className = 'u234-lg'; d.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true">' + L[i][2] + '</svg><b style="font-size:13px;' + L[i][1] + '"></b>'; d.querySelector('b').textContent = L[i][0]; return d; }
  var shown = [], cells = [], hold = -1, vis = true, last = -1;
  for (var i = 0; i < 9; i++) {
    var c = document.createElement('button'); c.type = 'button'; c.className = 'u234-cl';
    c.appendChild(logo(i)); var g = document.createElement('span'); g.className = 'u234-go'; g.textContent = 'See story →'; c.appendChild(g);
    c.setAttribute('aria-label', L[i][0] + ' customer story');
    (function (k) { c.addEventListener('pointerenter', function () { hold = k; }); c.addEventListener('pointerleave', function () { if (hold === k) hold = -1; }); c.addEventListener('focus', function () { hold = k; }); c.addEventListener('blur', function () { if (hold === k) hold = -1; }); })(i);
    gd.appendChild(c); cells.push(c); shown.push(i);
  }
  // 손을 올린 칸과 방금 바꾼 칸은 건너뛰고, 지금 보이지 않는 로고 중 하나로 바꿉니다
  function swap() {
    var pool = cells.map(function (c, k) { return k; }).filter(function (k) { return k !== hold && k !== last; });
    var k = pool[Math.floor(Math.random() * pool.length)], free = L.map(function (l, n) { return n; }).filter(function (n) { return shown.indexOf(n) < 0; });
    var n = free[Math.floor(Math.random() * free.length)], c = cells[k], old = c.querySelector('.u234-lg'), nw = logo(n);
    last = k; shown[k] = n; c.setAttribute('aria-label', L[n][0] + ' customer story');
    old.classList.add('is-out'); nw.classList.add('is-in'); c.insertBefore(nw, c.firstChild);
    void nw.offsetWidth; nw.classList.remove('is-in');
    setTimeout(function () { old.remove(); }, 560);
  }
  (function loop() {
    if (!root.isConnected) return;
    if (vis && hold < 0 && !rm) swap();
    setTimeout(loop, 1600);
  })();
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(root);
})();
  })();

  scope.ready();
  return scope.controller;
}
