// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountCouponTear(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u298">
  <div class="u298-tm">Ends in<b class="u298-cl">05:12:40</b></div>
  <div class="u298-tk">
    <div class="u298-mn"><small>First order only</small><b>15%<em>OFF</em></b><p>On orders over $50 · up to $10</p>
      <div class="u298-cd" aria-hidden="true"><small>Coupon code</small><div class="u298-cr"><code>HELLO15</code><button type="button" class="u298-cp" aria-label="Copy coupon code" tabindex="-1"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 8V2.8C2 2.4 2.4 2 2.8 2H8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg><span>Copy</span></button></div></div>
    </div>
    <div class="u298-st"><button type="button" class="u298-gt" aria-label="Get coupon"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v10M5.5 9l4.5 4.5L14.5 9M4 16.5h12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Get</button></div>
  </div>
  <div class="u298-nt" role="status"><i aria-hidden="true"></i><span>Saved to your wallet · applied at checkout</span></div>
</div>
`,
      css: `

.u298{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(90% 70% at 50% 0%,color-mix(in srgb,#F43F5E 12%,transparent),transparent 70%),var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u298-tm{position:absolute;left:0;right:0;top:44px;text-align:center;font-size:11px;font-weight:750;color:var(--ux-ink-3)}
.u298-tm b{margin-left:5px;padding:3px 7px;border-radius:7px;background:var(--ux-ink);color:var(--ux-surface);font-weight:850;font-variant-numeric:tabular-nums;letter-spacing:.02em}
.u298-tk{position:absolute;left:22px;right:22px;top:88px;height:132px;display:flex;filter:drop-shadow(0 16px 22px rgba(225,29,72,.22))}
.u298-mn{position:relative;flex:1;padding:18px 18px;border-radius:18px 0 0 18px;background:linear-gradient(135deg,#FB7185,#E11D48);color:#fff;-webkit-mask:radial-gradient(circle 10px at 100% 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 10px at 100% 100%,transparent 98%,#000) bottom/100% 51% no-repeat;mask:radial-gradient(circle 10px at 100% 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 10px at 100% 100%,transparent 98%,#000) bottom/100% 51% no-repeat}
.u298-mn small{font-size:10px;font-weight:800;opacity:.85}
.u298-mn b{display:flex;align-items:baseline;gap:4px;margin-top:4px;font-size:44px;line-height:1;font-weight:900;letter-spacing:-.04em}
.u298-mn b em{font-style:normal;font-size:16px;letter-spacing:0}
.u298-mn p{margin:10px 0 0;font-size:10px;font-weight:700;opacity:.85}
.u298-cd{position:absolute;inset:0;padding:18px;display:flex;flex-direction:column;justify-content:center;background:inherit;opacity:0;transform:scale(.96);transition:opacity .3s .25s,transform .4s cubic-bezier(.3,1.5,.5,1) .25s;pointer-events:none}
.u298.is-got .u298-cd{opacity:1;transform:none;pointer-events:auto}
.u298-cd small{font-size:10px;font-weight:800;opacity:.85}
.u298-cr{display:flex;align-items:center;gap:8px;margin-top:8px;padding:6px 6px 6px 12px;border-radius:12px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55);border:1.5px dashed transparent}
.u298-cr code{flex:1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:17px;font-weight:800;letter-spacing:.08em}
.u298-cp{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 11px;border:0;border-radius:9px;background:#fff;color:#E11D48;font:inherit;font-size:11px;font-weight:850;cursor:pointer}
.u298-cp svg{width:12px;height:12px}
.u298-cp:focus-visible,.u298-gt:focus-visible{outline:2px solid #fff;outline-offset:2px}
.u298-st{position:relative;flex:none;width:84px;border-left:2px dashed rgba(255,255,255,.7);border-radius:0 18px 18px 0;background:linear-gradient(135deg,#F43F5E,#BE123C);transform-origin:0 100%;transition:transform .6s cubic-bezier(.5,0,.6,1),opacity .4s .3s;-webkit-mask:radial-gradient(circle 10px at 0 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 10px at 0 100%,transparent 98%,#000) bottom/100% 51% no-repeat;mask:radial-gradient(circle 10px at 0 0,transparent 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 10px at 0 100%,transparent 98%,#000) bottom/100% 51% no-repeat}
.u298.is-got .u298-st{transform:translate(18px,120px) rotate(28deg);opacity:0;pointer-events:none}
.u298-gt{position:absolute;inset:0;border:0;background:none;color:#fff;font:inherit;font-size:14px;font-weight:900;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;writing-mode:horizontal-tb}
.u298-gt svg{width:20px;height:20px;transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
.u298-gt:hover svg,.u298-gt.g-hov svg{transform:translateY(3px)}
.u298-nt{position:absolute;left:22px;right:22px;bottom:30px;display:flex;align-items:center;gap:8px;padding:11px 14px;border-radius:14px;background:var(--ux-ink);color:var(--ux-surface);font-size:11px;font-weight:750;transform:translateY(90px);transition:transform .5s cubic-bezier(.3,1.4,.5,1)}
.u298-nt.is-on{transform:none}
.u298-nt i{flex:none;width:18px;height:18px;border-radius:50%;background:#10B981;display:grid;place-items:center}
.u298-nt i::after{content:"";width:4px;height:7px;margin-top:-2px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
@media (prefers-reduced-motion: reduce){.u298-st,.u298-cd,.u298-nt{transition:opacity .2s}.u298.is-got .u298-st{transform:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u298');
  var gt = root.querySelector('.u298-gt'), cd = root.querySelector('.u298-cd'), cp = root.querySelector('.u298-cp'), nt = root.querySelector('.u298-nt'), cl = root.querySelector('.u298-cl'), cpl = cp.querySelector('span');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var left = 5 * 3600 + 12 * 60 + 40, nTimer = 0;
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  (function tick() { if (!root.isConnected) return; cl.textContent = pad(Math.floor(left / 3600)) + ':' + pad(Math.floor(left % 3600 / 60)) + ':' + pad(left % 60); left = Math.max(0, left - 1); setTimeout(tick, 1000); })();
  gt.addEventListener('click', function () {
    root.classList.add('is-got'); cd.setAttribute('aria-hidden', 'false'); cp.tabIndex = 0; gt.tabIndex = -1;
    setTimeout(function () { cp.focus({ preventScroll: true }); }, rm ? 0 : 500);
  });
  cp.addEventListener('click', function () {
    try { navigator.clipboard && navigator.clipboard.writeText('HELLO15').catch(function () {}); } catch (e) {}
    cpl.textContent = 'Copied'; cp.querySelector('svg').innerHTML = '<path d="M2.5 6.5l2.3 2.3L9.5 3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
    nt.classList.add('is-on'); clearTimeout(nTimer); nTimer = setTimeout(function () { nt.classList.remove('is-on'); }, 2600);
  });
})();
  })();

  scope.ready();
  return scope.controller;
}
