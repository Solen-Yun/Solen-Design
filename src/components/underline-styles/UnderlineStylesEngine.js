// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountUnderlineStyles(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u373">
  <p class="u373-hd">Menu</p>
  <ul class="u373-ls" aria-label="Menu">
    <li><a href="#" class="u373-a u373-1">About</a><small>Slide through</small></li>
    <li><a href="#" class="u373-a u373-2">Work</a><small>Center spread</small></li>
    <li><a href="#" class="u373-a u373-3">Writing<span class="u373-w" aria-hidden="true"><svg viewBox="0 0 120 12" preserveAspectRatio="none"><path class="u373-flat" d="M0 7 H120" stroke="currentColor" stroke-width="3" fill="none"/><path class="u373-wave" d="M0 7 Q5 1 10 7 T20 7 T30 7 T40 7 T50 7 T60 7 T70 7 T80 7 T90 7 T100 7 T110 7 T120 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg></span></a><small>Wave flow</small></li>
    <li><a href="#" class="u373-a u373-4">Contact</a><small>Cross pass</small></li>
    <li><a href="#" class="u373-a u373-5">Careers</a><small>Dot stretch</small></li>
  </ul>
</div>
`,
      css: `

.u373{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#FFFDF7;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#1C1A2E;padding:24px 28px}
.u373-hd{font-size:10.5px;font-weight:800;letter-spacing:.16em;color:#A19D92;margin:0 0 8px}
.u373-ls{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.u373-ls li{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.u373-ls small{font-size:10px;font-weight:650;color:#B5B1A6}
.u373-a{--c:#5B4CF0;position:relative;display:inline-block;padding:4px 0 8px;font-size:30px;font-weight:850;letter-spacing:-.03em;color:#1C1A2E;text-decoration:none;outline:none}
.u373-a::before,.u373-a::after{content:"";position:absolute;left:0;bottom:2px;height:3px;border-radius:2px;background:var(--c);pointer-events:none}
.u373-a:focus-visible{color:var(--c)}
/* 1 밀고 지나가기: 들어올 땐 왼쪽에서, 나갈 땐 오른쪽으로 빠집니다 */
.u373-1::after{right:0;transform:scaleX(0);transform-origin:100% 50%;transition:transform .35s cubic-bezier(.6,0,.2,1)}
.u373-1:hover::after,.u373-1:focus-visible::after{transform:scaleX(1);transform-origin:0 50%}
.u373-1::before{display:none}
/* 2 가운데서 퍼지기 */
.u373-2::after{right:0;transform:scaleX(0);transition:transform .4s cubic-bezier(.3,1.4,.5,1)}
.u373-2:hover::after,.u373-2:focus-visible::after{transform:scaleX(1)}
.u373-2::before{display:none}
/* 3 물결: 곧은 선 위에 물결 SVG를 겹쳐 두고 흐르게 합니다 */
.u373-3::before,.u373-3::after{display:none}
.u373-w{position:absolute;left:0;right:0;bottom:-2px;height:12px;overflow:hidden;pointer-events:none}
.u373-w svg{position:absolute;left:0;top:0;width:120px;height:12px;color:var(--c)}
.u373-3 .u373-w svg{animation:u373-flow 1s linear infinite;animation-play-state:paused}
.u373-3:hover .u373-w svg,.u373-3:focus-visible .u373-w svg{animation-play-state:running}
.u373-3 .u373-w .u373-flat{transition:opacity .25s}
.u373-3 .u373-w .u373-wave{opacity:0;transition:opacity .25s}
.u373-3:hover .u373-w .u373-flat,.u373-3:focus-visible .u373-w .u373-flat{opacity:0}
.u373-3:hover .u373-w .u373-wave,.u373-3:focus-visible .u373-w .u373-wave{opacity:1}
@keyframes u373-flow{to{transform:translateX(-50%)}}
/* 4 엇갈려 지나가기: 위아래 두 가닥이 반대로 지나갑니다 */
.u373-4::before,.u373-4::after{height:2px;right:0;transform:scaleX(0);transition:transform .45s cubic-bezier(.6,0,.2,1)}
.u373-4::before{bottom:6px;transform-origin:100% 50%;background:#F06595}
.u373-4::after{transform-origin:0 50%}
.u373-4:hover::before,.u373-4:focus-visible::before,.u373-4:hover::after,.u373-4:focus-visible::after{transform:scaleX(1)}
/* 5 점에서 늘어나기: 첫 글자 아래 점이 오른쪽으로 튕기듯 늘어납니다 */
.u373-5::before{display:none}
.u373-5::after{width:6px;height:6px;bottom:0;border-radius:3px;transition:width .5s cubic-bezier(.3,1.6,.5,1)}
.u373-5:hover::after,.u373-5:focus-visible::after{width:100%}
@media (prefers-reduced-motion: reduce){.u373-a::before,.u373-a::after{transition:none!important}.u373-3 .u373-w svg{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u373');
  [].forEach.call(root.querySelectorAll('.u373-a'), function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
  // 물결 밑줄은 늘어나지 않도록 폭이 고정된 SVG(파장 20px)를 반 폭씩 흘려 이음매 없이 반복합니다
})();
  })();

  scope.ready();
  return scope.controller;
}
