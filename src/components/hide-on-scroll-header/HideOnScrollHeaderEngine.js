// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountHideOnScrollHeader(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u212">
  <header class="u212-hd"><b><i aria-hidden="true"></i>Relay</b><span>Product</span><span>Pricing</span><span>Blog</span><strong>Get started</strong><span class="u212-pg" aria-hidden="true"></span></header>
  <div class="u212-sc" tabindex="0" aria-label="Blog post"><div class="u212-cv"><small>Blog · 5 min read</small><h3>How small teams<br>ship fast</h3></div><div class="u212-bd"></div></div>
</div>
`,
      css: `

.u212{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u212-hd{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:center;gap:12px;height:58px;padding:0 18px;font-size:11px;font-weight:750;color:var(--ux-ink-2);transition:transform .38s cubic-bezier(.2,.8,.2,1),height .3s,background-color .3s,box-shadow .3s,backdrop-filter .3s}
.u212-hd b{margin-right:auto;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:900;color:var(--ux-ink)}
.u212-hd b i{width:14px;height:14px;border-radius:50%;background:var(--ux-grad)}
.u212-hd strong{padding:6px 11px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-size:10.5px;font-weight:800}
.u212.is-solid .u212-hd{height:46px;background:color-mix(in srgb,var(--ux-surface) 78%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--ux-line),0 8px 20px -14px var(--ux-shadow-strong)}
.u212.is-hide .u212-hd{transform:translateY(-110%)}
.u212-pg{position:absolute;left:0;bottom:-1px;height:2px;width:0;background:var(--ux-accent);opacity:0;transition:opacity .3s}
.u212.is-solid .u212-pg{opacity:1}
.u212-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.u212-sc::-webkit-scrollbar{display:none}
.u212-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:30px}
.u212-cv{height:150px;margin:0;padding:72px 22px 0;background:linear-gradient(160deg,var(--ux-accent-soft),transparent 80%)}
.u212-cv small{font-size:10px;font-weight:800;color:var(--ux-accent)}
.u212-cv h3{margin:6px 0 0;font-size:24px;line-height:1.15;font-weight:900;letter-spacing:-.04em}
.u212-bd{padding:22px 22px 40px}
.u212-bd p{margin:0 0 14px;font-size:12.5px;line-height:1.75;font-weight:600;color:var(--ux-ink-2)}
.u212-bd i{display:block;height:84px;margin:0 0 14px;border-radius:14px;background:linear-gradient(135deg,var(--ux-surface-2),color-mix(in srgb,var(--ux-accent) 18%,var(--ux-surface)))}
@media (prefers-reduced-motion: reduce){.u212-hd{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u212');
  var sc = root.querySelector('.u212-sc'), bd = root.querySelector('.u212-bd'), pg = root.querySelector('.u212-pg');
  var P = ['If you try to make it perfect from the start, launch keeps slipping. Ship the smallest useful thing and refine it as people respond.', 'Keep meetings short and notes long. When the reason behind a decision is written down, the next person won’t repeat the same debate.', 'Automate the third time you repeat something. Automate too early and you cement what is still changing.', 'Finally, set the launch date first. A date is what lets you choose what to cut.'];
  P.forEach(function (t, i) { var p = document.createElement('p'); p.textContent = t; bd.appendChild(p); if (i === 1) bd.appendChild(document.createElement('i')); });
  var last = 0, acc = 0;
  // 내려가는 중이면 숨기고, 6px 넘게 올라오면 다시 보입니다. 맨 위 근처에서는 투명한 큰 헤더로 돌아갑니다
  sc.addEventListener('scroll', function () {
    var y = sc.scrollTop, d = y - last; last = y;
    acc = (d > 0) === (acc > 0) ? acc + d : d;
    root.classList.toggle('is-solid', y > 20);
    if (y < 60) root.classList.remove('is-hide');
    else if (acc > 8) root.classList.add('is-hide');
    else if (acc < -6) root.classList.remove('is-hide');
    pg.style.width = (y / Math.max(1, sc.scrollHeight - sc.clientHeight) * 100).toFixed(1) + '%';
  }, { passive: true });
})();
  })();

  scope.ready();
  return scope.controller;
}
