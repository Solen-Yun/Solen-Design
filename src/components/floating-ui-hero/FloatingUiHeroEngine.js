// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountFloatingUiHero(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u270">
  <div class="u270-l u270-app" data-z="0.35" aria-hidden="true"><div><b>Today</b><div class="u270-tk is-ok"><i></i><span>Design review</span></div><div class="u270-tk"><i></i><span>Launch prep</span></div><div class="u270-tk"><i></i><span>Customer interview</span></div></div></div>
  <div class="u270-l u270-pay" data-z="1.2" style="--t:4.2s"><div class="u270-card" aria-live="polite"><i aria-hidden="true">₩</i><div><small>Payment received · <span class="u270-ago">just now</span></small><b class="u270-amt">₩29,000</b></div></div></div>
  <div class="u270-l u270-cur" data-z="1.6" style="--t:3.6s;--dl:-1s" aria-hidden="true"><div class="u270-card"><svg viewBox="0 0 16 16"><path d="M2 1l11 6-5 1.4L6 14z" fill="currentColor"/></svg><span>Minji</span></div></div>
  <div class="u270-l u270-ch" data-z="0.9" style="--t:5.4s;--dl:-2s" aria-hidden="true"><div class="u270-card"><small>Revenue this month</small><svg viewBox="0 0 82 30"><path d="M1 26 L14 20 L26 23 L39 13 L52 16 L66 7 L81 3" fill="none" stroke="#6366F1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
  <div class="u270-l u270-rt" data-z="1.4" style="--t:4.8s;--dl:-.5s" aria-hidden="true"><div class="u270-card"><em>★★★★★</em><span>2,140 reviews</span></div></div>
</div>
`,
      css: `

.u270{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(90% 70% at 50% 40%,var(--ux-accent-soft),transparent 70%),var(--ux-surface-2);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u270-l{position:absolute;will-change:transform;transition:transform .5s cubic-bezier(.2,.8,.3,1)}
.u270-l>div{animation:u270-f var(--t,5s) ease-in-out infinite alternate;animation-delay:var(--dl,0s)}
@keyframes u270-f{to{transform:translateY(-7px)}}
.u270-app{left:72px;top:78px;width:196px;height:184px;border-radius:16px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 24px 50px -24px var(--ux-shadow-strong);padding:14px;font-size:11px}
.u270-app b{font-size:12px;font-weight:900}
.u270-tk{display:flex;align-items:center;gap:8px;margin-top:9px;padding:7px 8px;border-radius:9px;background:var(--ux-surface-2);font-weight:700;color:var(--ux-ink-2)}
.u270-tk i{width:12px;height:12px;border-radius:4px;box-shadow:inset 0 0 0 1.6px var(--ux-ink-3)}
.u270-tk.is-ok i{background:var(--ux-accent);box-shadow:none}
.u270-tk.is-ok span{text-decoration:line-through;color:var(--ux-ink-3)}
.u270-card{border-radius:14px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 16px 30px -16px var(--ux-shadow-strong);padding:9px 11px;font-size:10.5px;font-weight:700;white-space:nowrap}
.u270-pay{left:176px;top:40px}
.u270-pay .u270-card{display:flex;align-items:center;gap:8px}
.u270-pay i{width:22px;height:22px;border-radius:7px;background:#10B981;display:grid;place-items:center;color:#fff;font-style:normal;font-size:12px;font-weight:900}
.u270-pay small{display:block;font-size:9px;color:var(--ux-ink-3)}
.u270-pay b{font-size:12px;font-variant-numeric:tabular-nums}
.u270-cur{left:28px;top:150px}
.u270-cur .u270-card{padding:0;background:none;box-shadow:none;display:flex;align-items:flex-start}
.u270-cur svg{width:16px;height:16px;color:#EC4899}
.u270-cur span{margin-top:12px;padding:3px 8px;border-radius:999px;background:#EC4899;color:#fff;font-size:10px;font-weight:800}
.u270-ch{left:220px;top:196px}
.u270-ch .u270-card{width:104px}
.u270-ch small{display:block;font-size:9px;color:var(--ux-ink-3)}
.u270-ch svg{display:block;width:82px;height:30px;margin-top:3px}
.u270-rt{left:42px;top:258px}
.u270-rt .u270-card{display:flex;align-items:center;gap:6px}
.u270-rt em{font-style:normal;color:#F59E0B;letter-spacing:1px}
@media (prefers-reduced-motion: reduce){.u270-l>div{animation:none}.u270-l{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u270');
  var L = Array.prototype.slice.call(root.querySelectorAll('.u270-l')), amt = root.querySelector('.u270-amt');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var AM = ['₩29,000', '₩54,000', '₩12,500', '₩88,000'], k = 0, vis = true;
  // 커서가 가운데에서 멀어질수록, 깊이(data-z)가 큰 조각일수록 반대쪽으로 더 밀어냅니다
  function move(nx, ny) { if (rm) return; L.forEach(function (l) { var z = +l.dataset.z; l.style.transform = 'translate(' + (-nx * 16 * z).toFixed(1) + 'px,' + (-ny * 12 * z).toFixed(1) + 'px)'; }); }
  root.addEventListener('pointermove', function (e) { var r = root.getBoundingClientRect(); move((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5); });
  root.addEventListener('pointerleave', function () { move(0, 0); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(root);
  // 3.2초마다 결제 금액을 바꿉니다. 요소가 페이지에서 빠지면 멈춥니다
  function tick() {
    if (!root.isConnected) return;
    setTimeout(tick, 3200);
    if (!vis) return;
    k = (k + 1) % AM.length; amt.textContent = AM[k];
    if (!rm) amt.animate([{ transform: 'translateY(6px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 350, easing: 'ease-out' });
  }
  setTimeout(tick, 3200);
})();
  })();

  scope.ready();
  return scope.controller;
}
