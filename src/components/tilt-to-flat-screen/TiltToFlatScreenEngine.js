// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTiltToFlatScreen(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u231">
  <div class="u231-sc" tabindex="0" aria-label="Landing page preview">
    <div class="u231-hd"><small>Team dashboard</small><h3>Every number<br>on one screen</h3><p>Pulls scattered metrics together, live.</p><b>Free trial</b></div>
    <div class="u231-st" aria-hidden="true"><div class="u231-win"><div class="u231-tb"><i></i><i></i><i></i></div><div class="u231-bd">
      <div class="u231-kp"><div><small>Monthly revenue</small><b>₩48M</b></div><div><small>Sign-ups</small><b>1,284</b></div><div><small>Return rate</small><b>62%</b></div></div>
      <div class="u231-ch"></div>
    </div></div></div>
    <div class="u231-lg">Teams using it<div class="u231-lgs"><span>Northwind</span><span>Acme</span><span>Globex</span></div></div>
    <div class="u231-ft"><div><b>Live sync</b><span>Updates every second</span></div><div><b>Permissions</b><span>Split views by team</span></div></div>
  </div>
  <div class="u231-hint" aria-hidden="true">Scroll<svg viewBox="0 0 14 14"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
</div>
`,
      css: `

.u231{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u231-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;perspective:900px;background:radial-gradient(110% 50% at 50% 0%,var(--ux-accent-soft),transparent 70%)}
.u231-sc::-webkit-scrollbar{display:none}
.u231-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:32px}
.u231-hd{padding:34px 22px 0;text-align:center}
.u231-hd small{display:inline-block;padding:4px 10px;border-radius:999px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:10px;font-weight:800;color:var(--ux-accent)}
.u231-hd h3{margin:12px 0 0;font-size:26px;line-height:1.15;font-weight:900;letter-spacing:-.04em}
.u231-hd p{margin:9px 0 0;font-size:11.5px;font-weight:600;color:var(--ux-ink-2)}
.u231-hd b{display:inline-block;margin-top:14px;padding:8px 16px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-size:11.5px;font-weight:800}
.u231-st{margin:26px 14px 0;transform-origin:50% 0;will-change:transform}
.u231-win{border-radius:14px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 var(--sy,10px) var(--sb,20px) -12px var(--ux-shadow-strong);overflow:hidden}
.u231-tb{display:flex;gap:4px;padding:8px 10px;background:var(--ux-surface-2)}
.u231-tb i{width:7px;height:7px;border-radius:50%;background:var(--ux-line)}
.u231-bd{padding:10px 12px 12px}
.u231-kp{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.u231-kp div{padding:7px 8px;border-radius:9px;background:var(--ux-surface-2)}
.u231-kp small{display:block;font-size:8px;font-weight:800;color:var(--ux-ink-3)}
.u231-kp b{font-size:13px;font-weight:900;font-variant-numeric:tabular-nums}
.u231-ch{display:flex;align-items:flex-end;gap:5px;height:74px;margin-top:9px;padding:6px 4px 0;border-radius:9px;background:linear-gradient(var(--ux-line) 1px,transparent 1px) 0 0/100% 18px}
.u231-ch i{flex:1;height:100%;border-radius:4px 4px 0 0;background:linear-gradient(var(--ux-accent),color-mix(in srgb,var(--ux-accent) 45%,transparent));transform-origin:50% 100%;transform:scaleY(var(--g,.15));transition:transform .7s cubic-bezier(.3,1.3,.5,1);transition-delay:calc(var(--i) * 50ms)}
.u231-lg{margin:30px 22px 0;text-align:center;font-size:10px;font-weight:800;color:var(--ux-ink-3)}
.u231-lgs{display:flex;justify-content:center;gap:16px;margin-top:10px;font-size:13px;font-weight:900;color:var(--ux-ink-3);opacity:.7;letter-spacing:-.02em}
.u231-ft{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:22px 16px 40px}
.u231-ft div{padding:12px;border-radius:14px;background:var(--ux-surface-2)}
.u231-ft b{display:block;font-size:12px;font-weight:850}
.u231-ft span{font-size:10px;font-weight:600;color:var(--ux-ink-3)}
.u231-hint{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:2px;font-size:9.5px;font-weight:800;color:var(--ux-ink-3);pointer-events:none;transition:opacity .3s}
.u231-hint svg{width:14px;height:14px;animation:u231-b 1.4s ease-in-out infinite}
@keyframes u231-b{50%{transform:translateY(4px)}}
@media (prefers-reduced-motion: reduce){.u231-hint svg{animation:none}.u231-ch i{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u231');
  var sc = root.querySelector('.u231-sc'), st = root.querySelector('.u231-st'), win = root.querySelector('.u231-win'), ch = root.querySelector('.u231-ch'), hint = root.querySelector('.u231-hint');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var H = [0.42, 0.58, 0.5, 0.72, 0.64, 0.86, 0.78, 0.95];
  H.forEach(function (h, i) { var b = document.createElement('i'); b.style.setProperty('--i', i); b.dataset.h = h; ch.appendChild(b); });
  var bars = ch.querySelectorAll('i'), full = false, raf = 0;
  // 스크롤 진행(0~1)에 따라 눕혀진 화면을 세우고 키우며, 그림자를 짙게 합니다
  function paint() {
    raf = 0;
    var p = rm ? 1 : Math.max(0, Math.min(1, sc.scrollTop / 210)), e = 1 - Math.pow(1 - p, 2);
    st.style.transform = 'rotateX(' + (34 * (1 - e)).toFixed(2) + 'deg) scale(' + (0.84 + 0.16 * e).toFixed(3) + ') translateY(' + (-18 * e).toFixed(1) + 'px)';
    win.style.setProperty('--sy', (10 + 24 * e).toFixed(1) + 'px'); win.style.setProperty('--sb', (20 + 34 * e).toFixed(1) + 'px');
    hint.style.opacity = sc.scrollTop > 8 ? 0 : 1;
    var f = p > 0.88;
    if (f !== full) { full = f; bars.forEach(function (b) { b.style.setProperty('--g', f ? b.dataset.h : 0.15); }); }
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
  paint();
})();
  })();

  scope.ready();
  return scope.controller;
}
