// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountRevealFooter(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u236">
  <footer class="u236-ft">
    <div class="u236-nl"><small>Newsletter</small><b>Once a month, only useful news</b><form class="u236-fm"><input type="email" placeholder="Email address" aria-label="Email address" autocomplete="off"><button type="submit" class="u236-go"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span></button></form></div>
    <div class="u236-cols"><div><b>Product</b><span>Features</span><span>Pricing</span></div><div><b>Company</b><span>About</span><span>Careers</span></div><div><b>Help</b><span>Docs</span><span>Contact</span></div></div>
    <div class="u236-wm" aria-hidden="true">Solen.</div>
  </footer>
  <div class="u236-sc" tabindex="0" aria-label="Page">
    <div class="u236-mn"><small>Final section</small><h3>Good tools<br>work quietly</h3><p>We handle the rest so your team can focus on the work.</p><div class="u236-cs"><small>Case study</small><b>Cut launch time in half</b><i></i></div></div>
    <div class="u236-sp"></div>
  </div>
</div>
`,
      css: `

.u236{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:#0E0F14;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u236-ft{position:absolute;left:0;right:0;bottom:0;height:300px;padding:22px 20px;color:#E8E9F2;transform-origin:50% 100%;transform:scale(calc(.94 + .06 * var(--r,0)));opacity:calc(.35 + .65 * var(--r,0))}
.u236-nl small{font-size:10px;font-weight:850;letter-spacing:.08em;color:#8B8FA8}
.u236-nl b{display:block;margin:4px 0 10px;font-size:15px;font-weight:850}
.u236-fm{display:flex;gap:6px}
.u236-fm input{flex:1;min-width:0;height:36px;padding:0 12px;border:0;border-radius:11px;background:rgba(255,255,255,.08);color:#fff;font:inherit;font-size:12px;font-weight:600;outline:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.u236-fm input:focus{box-shadow:inset 0 0 0 1.5px #818CF8}
.u236-go{height:36px;padding:0 14px;border:0;border-radius:11px;background:#fff;color:#0E0F14;font:inherit;font-size:12px;font-weight:850;cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:background .25s,color .25s}
.u236-go svg{width:13px;height:13px;display:none}
.u236-go.is-ok{background:#34D399;color:#05261A}
.u236-go.is-ok svg{display:block}
.u236-go:focus-visible{outline:2px solid #818CF8;outline-offset:2px}
.u236-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:22px;font-size:11px;font-weight:650;color:#8B8FA8}
.u236-cols b{display:block;margin-bottom:6px;font-size:11px;font-weight:850;color:#E8E9F2}
.u236-cols span{display:block;margin-top:4px}
.u236-wm{position:absolute;left:14px;right:14px;bottom:8px;font-size:68px;line-height:.9;font-weight:950;letter-spacing:-.06em;background:linear-gradient(180deg,#fff,rgba(255,255,255,.08));-webkit-background-clip:text;background-clip:text;color:transparent;transform:translateY(calc(26px * (1 - var(--r,0))))}
.u236-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;pointer-events:none}
.u236-sc::-webkit-scrollbar{display:none}
.u236-sc:focus-visible{outline:2px solid #818CF8;outline-offset:-4px;border-radius:32px}
.u236-mn{position:relative;z-index:1;pointer-events:auto;background:var(--ux-surface);border-radius:0 0 28px 28px;box-shadow:0 20px 40px -10px rgba(0,0,0,.5);padding:38px 22px 30px}
.u236-mn small{font-size:10px;font-weight:850;letter-spacing:.08em;color:var(--ux-accent)}
.u236-mn h3{margin:8px 0 0;font-size:25px;line-height:1.15;font-weight:900;letter-spacing:-.04em}
.u236-mn p{margin:10px 0 0;font-size:12px;line-height:1.6;font-weight:600;color:var(--ux-ink-2)}
.u236-cs{margin-top:22px;padding:16px;border-radius:18px;background:var(--ux-surface-2)}
.u236-cs small{color:var(--ux-ink-3)}
.u236-cs b{display:block;margin-top:4px;font-size:16px;font-weight:900;letter-spacing:-.02em}
.u236-cs i{display:block;height:120px;margin-top:12px;border-radius:12px;background:linear-gradient(135deg,var(--ux-accent-soft),color-mix(in srgb,var(--ux-accent) 30%,var(--ux-surface)))}
.u236-sp{height:300px;pointer-events:none}
@media (prefers-reduced-motion: reduce){.u236-ft{transform:none;opacity:1}.u236-wm{transform:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u236');
  var sc = root.querySelector('.u236-sc'), sp = root.querySelector('.u236-sp'), fm = root.querySelector('.u236-fm'), inp = fm.querySelector('input'), go = root.querySelector('.u236-go'), lb = go.querySelector('span');
  // 푸터 높이만큼 비워 둔 빈 칸이 얼마나 드러났는지(0~1)를 --r로 넘깁니다
  function onScroll() { var max = sc.scrollHeight - sc.clientHeight, r = Math.max(0, Math.min(1, 1 - (max - sc.scrollTop) / sp.offsetHeight)); root.style.setProperty('--r', r.toFixed(3)); }
  sc.addEventListener('scroll', onScroll, { passive: true });
  // 스크롤 상자는 포인터를 통과시키고(본문만 받음), 드러난 자리에서는 아래 푸터를 바로 누를 수 있습니다
  fm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!inp.value) inp.value = 'hello@solen.dev';
    go.classList.add('is-ok'); lb.textContent = 'Subscribed';
  });
  lb.textContent = 'Subscribe';
  onScroll();
})();
  })();

  scope.ready();
  return scope.controller;
}
