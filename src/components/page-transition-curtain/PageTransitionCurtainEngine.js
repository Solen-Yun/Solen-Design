// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPageTransitionCurtain(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u321">
  <div class="u321-nv"><b>Maison</b><div class="u321-ls" role="navigation" aria-label="Site menu"><span class="u321-mk" aria-hidden="true"></span></div></div>
  <div class="u321-pg" aria-live="polite"><small data-s style="--d:.05s"></small><h3 data-s style="--d:.12s"></h3><div class="u321-im" data-s style="--d:.22s" aria-hidden="true"></div></div>
  <div class="u321-cu" aria-hidden="true"><span></span></div>
</div>
`,
      css: `

.u321{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#FBF7F2;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#22201C}
.u321-nv{position:absolute;left:18px;right:18px;top:16px;z-index:4;display:flex;align-items:center}
.u321-nv b{margin-right:auto;font-size:13px;font-weight:900;letter-spacing:-.02em}
.u321-ls{position:relative;display:flex;gap:2px;padding:3px;border-radius:999px;background:rgba(34,32,28,.06)}
.u321-mk{position:absolute;top:3px;bottom:3px;border-radius:999px;background:#22201C;transition:left .45s cubic-bezier(.3,1.3,.5,1),width .45s cubic-bezier(.3,1.3,.5,1)}
.u321-ln{position:relative;border:0;padding:5px 11px;border-radius:999px;background:none;color:#5E5850;font:inherit;font-size:11px;font-weight:800;cursor:pointer;transition:color .3s}
.u321-ln.is-on{color:#FBF7F2}
.u321-ln:focus-visible{outline:2px solid #E2725B;outline-offset:2px}
.u321-pg{position:absolute;inset:0;padding:66px 18px 18px}
.u321-pg small{font-size:10px;font-weight:850;letter-spacing:.08em;color:#E2725B}
.u321-pg h3{margin:6px 0 0;font-size:26px;line-height:1.14;font-weight:900;letter-spacing:-.045em}
.u321-im{position:absolute;left:18px;right:18px;bottom:18px;height:118px;border-radius:16px}
.u321-pg [data-s]{transition:opacity .5s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d)}
.u321.is-hide .u321-pg [data-s]{opacity:0;transform:translateY(18px);transition:none}
.u321-cu{position:absolute;inset:0;z-index:3;background:#E2725B;transform:translateY(101%);display:grid;place-items:center;color:#FBF7F2;font-size:30px;font-weight:900;letter-spacing:-.04em;pointer-events:none}
.u321-cu span{opacity:0;transform:translateY(10px);transition:opacity .3s,transform .4s}
.u321.is-cover .u321-cu{transform:none;transition:transform .5s cubic-bezier(.7,0,.2,1)}
.u321.is-cover .u321-cu span{opacity:1;transform:none;transition-delay:.25s}
.u321.is-lift .u321-cu{transform:translateY(-101%);transition:transform .55s cubic-bezier(.7,0,.2,1)}
@media (prefers-reduced-motion: reduce){.u321-cu{display:none}.u321-pg [data-s]{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u321');
  var ls = root.querySelector('.u321-ls'), mk = root.querySelector('.u321-mk'), sm = root.querySelector('.u321-pg small'), h = root.querySelector('.u321-pg h3'), im = root.querySelector('.u321-im'), cu = root.querySelector('.u321-cu span');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PG = [['Home', 'How to use good<br>things for longer', 'Living magazine'], ['Work', 'Twelve things<br>we made this year', 'Portfolio'], ['About', 'A small team<br>making slowly', 'About the studio']];
  var IMG = ['linear-gradient(135deg,#F1D3B3,#C98F6A)', 'linear-gradient(135deg,#B9D4C8,#4F7F6B)', 'linear-gradient(135deg,#D6D0F0,#7C6FB8)'];
  var cur = -1, busy = false, L = [];
  PG.forEach(function (p, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u321-ln'; b.textContent = p[0]; b.addEventListener('click', function () { go(i); }); ls.appendChild(b); L.push(b); });
  function mark(i) { L.forEach(function (b, k) { b.classList.toggle('is-on', k === i); if (k === i) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); }); mk.style.left = L[i].offsetLeft + 'px'; mk.style.width = L[i].offsetWidth + 'px'; }
  function show(i) { sm.textContent = PG[i][2]; h.innerHTML = PG[i][1]; im.style.background = IMG[i]; }
  // 막이 덮인 동안 내용을 바꾸고, 막이 걷히는 순간 새 내용이 차례로 올라옵니다
  function go(i) {
    if (i === cur || busy) return;
    mark(i); cur = i;
    if (rm) { show(i); return; }
    busy = true; cu.textContent = PG[i][0];
    root.classList.remove('is-lift'); root.classList.add('is-cover');
    setTimeout(function () {
      show(i); root.classList.add('is-hide');
      setTimeout(function () {
        root.classList.remove('is-cover'); root.classList.add('is-lift');
        requestAnimationFrame(function () { root.classList.remove('is-hide'); });
        setTimeout(function () { root.classList.remove('is-lift'); busy = false; }, 600);
      }, 380);
    }, 520);
  }
  mark(0); cur = 0; show(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
