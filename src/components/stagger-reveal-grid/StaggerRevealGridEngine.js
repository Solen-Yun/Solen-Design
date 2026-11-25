// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStaggerRevealGrid(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u251">
  <div class="u251-sc" tabindex="0" aria-label="Features section">
    <div class="u251-hd" data-rv><small>Features</small><br><h3>Why teams are switching</h3><p>A screen that feels familiar from day one, with features that grow only as needed.</p></div>
    <div class="u251-gd"></div>
    <div class="u251-ft"><span>Get started</span></div>
  </div>
</div>
`,
      css: `

.u251{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u251-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.u251-sc::-webkit-scrollbar{display:none}
.u251-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:32px}
.u251-hd{padding:36px 20px 6px}
.u251-hd small{font-size:10px;font-weight:850;letter-spacing:.08em;color:var(--ux-accent)}
.u251-hd h3{position:relative;display:inline-block;margin:8px 0 0;font-size:22px;line-height:1.2;font-weight:900;letter-spacing:-.04em}
.u251-hd h3::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:5px;border-radius:3px;background:color-mix(in srgb,var(--ux-accent) 35%,transparent);transform:scaleX(0);transform-origin:0 50%;transition:transform .8s cubic-bezier(.2,.8,.2,1) .2s}
.u251-hd.is-in h3::after{transform:none}
.u251-hd p{margin:12px 0 0;font-size:11.5px;line-height:1.55;font-weight:600;color:var(--ux-ink-2)}
.u251-gd{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 16px 0}
.u251-cd{padding:14px 12px;border-radius:18px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);min-height:118px;opacity:0;transform:translateY(26px) scale(.97);transition:opacity .5s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d)}
.u251-cd.is-in{opacity:1;transform:none}
.u251-ic{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;color:#fff;transform:scale(.4);transition:transform .55s cubic-bezier(.3,1.7,.5,1);transition-delay:calc(var(--d) + .18s)}
.u251-cd.is-in .u251-ic{transform:none}
.u251-ic svg{width:17px;height:17px}
.u251-cd b{display:block;margin-top:12px;font-size:13px;font-weight:850}
.u251-cd span{display:block;margin-top:3px;font-size:10.5px;line-height:1.4;font-weight:600;color:var(--ux-ink-3)}
.u251-ft{padding:22px 16px 34px;text-align:center}
.u251-ft span{display:inline-block;padding:10px 20px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-size:12px;font-weight:850}
@media (prefers-reduced-motion: reduce){.u251-cd,.u251-ic,.u251-hd h3::after{transition:none;opacity:1;transform:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u251');
  var sc = root.querySelector('.u251-sc'), gd = root.querySelector('.u251-gd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var F = [['Fast search', 'Every doc in 0.1 s'], ['Live editing', 'Write together, see it instantly'], ['Auto backup', 'Undo any mistake'], ['Permissions', 'Views split by team'], ['Dark mode', 'Easy on the eyes at night'], ['40 integrations', 'Keep your tools']];
  var COL = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#0EA5E9', '#8B5CF6'];
  var ICO = ['<circle cx="7.5" cy="7.5" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>', '<path d="M3 13l1-3.5L11 2.5l2.5 2.5L6.5 12z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>', '<path d="M3 9a5 5 0 1 0 1.5-3.6M3 2.5v3h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>', '<rect x="3" y="7" width="10" height="7" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.7"/>', '<path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z" fill="currentColor"/>', '<circle cx="4" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 7l4-2M6 9l4 2" stroke="currentColor" stroke-width="1.6"/>'];
  F.forEach(function (f, i) {
    var c = document.createElement('div'); c.className = 'u251-cd'; c.setAttribute('data-rv', ''); c.style.setProperty('--d', (i % 2) * 0.09 + 's');
    c.innerHTML = '<div class="u251-ic" style="background:' + COL[i] + '"><svg viewBox="0 0 16 16" aria-hidden="true">' + ICO[i] + '</svg></div><b></b><span></span>';
    c.querySelector('b').textContent = f[0]; c.querySelector('span').textContent = f[1];
    gd.appendChild(c);
  });
  var R = Array.prototype.slice.call(root.querySelectorAll('[data-rv]'));
  if (rm || !('IntersectionObserver' in window)) { R.forEach(function (el) { el.classList.add('is-in'); }); return; }
  // 스크롤 상자 안에서 들어오면 켜고, 아래로 다시 빠져나가면 꺼서 다음에 다시 재생합니다
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('is-in');
      else if (e.boundingClientRect.top > e.rootBounds.bottom - 1) e.target.classList.remove('is-in');
    });
  }, { root: sc, threshold: 0.18 });
  R.forEach(function (el) { io.observe(el); });
})();
  })();

  scope.ready();
  return scope.controller;
}
