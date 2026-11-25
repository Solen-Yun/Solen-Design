// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountXrayCodeLens(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u325">
  <div class="u325-st" role="img" aria-label="Pricing card, view its code with the x-ray lens">
    <div class="u325-code" aria-hidden="true"><span class="c">&lt;!-- plan card --&gt;</span>
<span class="t">&lt;article</span> <span class="a">class</span>=<span class="s">"plan"</span><span class="t">&gt;</span>
  <span class="t">&lt;small&gt;</span>PRO<span class="t">&lt;/small&gt;</span>
  <span class="t">&lt;h4&gt;</span>Pro<span class="t">&lt;/h4&gt;</span>
  <span class="t">&lt;p&gt;</span>{plan.summary}<span class="t">&lt;/p&gt;</span>
  <span class="t">&lt;div</span> <span class="a">class</span>=<span class="s">"price"</span><span class="t">&gt;</span>
    $<span class="p">24</span><span class="t">&lt;span&gt;</span>/mo<span class="t">&lt;/span&gt;</span>
  <span class="t">&lt;/div&gt;</span>
  <span class="t">&lt;ul&gt;</span>
    <span class="t">&lt;li&gt;</span>{features[0]}<span class="t">&lt;/li&gt;</span>
    <span class="t">&lt;li&gt;</span>{features[1]}<span class="t">&lt;/li&gt;</span>
    <span class="t">&lt;li&gt;</span>{features[2]}<span class="t">&lt;/li&gt;</span>
  <span class="t">&lt;/ul&gt;</span>

<span class="c">  /* .cta { radius: 12px } */</span>
  <span class="t">&lt;button</span> <span class="a">class</span>=<span class="s">"cta"</span><span class="t">&gt;</span>
    {cta.label}
  <span class="t">&lt;/button&gt;</span>
<span class="t">&lt;/article&gt;</span></div>
    <div class="u325-ui" aria-hidden="true"><small>PRO</small><h4>Pro</h4><p>Everything, for your team</p><div class="u325-pr">$24<span>/mo</span></div><ul><li>Unlimited projects</li><li>Real-time collaboration</li><li>Priority support</li></ul><div class="u325-bt">Get started</div></div>
    <div class="u325-ring" aria-hidden="true"></div>
  </div>
</div>
`,
      css: `

.u325{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#EEF0F6;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u325-st{position:absolute;inset:0;--x:-200px;--y:-200px;--r:0px;cursor:none;touch-action:none}
.u325-code,.u325-ui{position:absolute;left:40px;top:28px;width:260px;height:284px;border-radius:22px}
.u325-code{background:#0D1117;font:600 9.6px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;color:#C9D1D9;padding:18px 18px;white-space:pre;overflow:hidden;box-shadow:inset 0 0 0 1px #30363D}
.u325-code .t{color:#7EE787}.u325-code .a{color:#79C0FF}.u325-code .s{color:#A5D6FF}.u325-code .c{color:#8B949E}.u325-code .p{color:#FFA657}
.u325-ui{background:#fff;padding:22px 22px 20px;box-shadow:0 20px 40px -24px rgba(30,40,80,.35);display:flex;flex-direction:column;-webkit-mask-image:radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0,transparent 96%,#000 100%);mask-image:radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0,transparent 96%,#000 100%);color:#1A1D2E}
.u325-ui small{font-size:10.5px;font-weight:800;letter-spacing:.14em;color:#5B4CF0}
.u325-ui h4{margin:4px 0 2px;font-size:22px;font-weight:850;letter-spacing:-.02em}
.u325-ui p{margin:0;font-size:11.5px;color:#6B7088;font-weight:600}
.u325-pr{margin:12px 0 10px;font-size:30px;font-weight:900;letter-spacing:-.03em}
.u325-pr span{font-size:12px;font-weight:700;color:#6B7088}
.u325-ui ul{list-style:none;margin:0 0 auto;padding:0;display:flex;flex-direction:column;gap:6px;font-size:11.5px;font-weight:650}
.u325-ui li::before{content:"✓";color:#5B4CF0;font-weight:900;margin-right:6px}
.u325-bt{height:38px;border-radius:12px;background:#5B4CF0;color:#fff;display:grid;place-items:center;font-size:13px;font-weight:800}
.u325-ring{position:absolute;left:0;top:0;width:calc(var(--r) * 2);height:calc(var(--r) * 2);margin:calc(var(--r) * -1) 0 0 calc(var(--r) * -1);border-radius:50%;box-shadow:0 0 0 2px #7EE787,0 0 18px rgba(126,231,135,.55);pointer-events:none;transform:translate(var(--x),var(--y));opacity:var(--ro,0);transition:opacity .2s}
.u325-ring::after{content:"</>";position:absolute;right:-6px;top:4px;padding:1px 5px;border-radius:999px;background:#7EE787;color:#0D1117;font:800 9px/1.4 ui-monospace,Menlo,monospace}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u325');
  var st = root.querySelector('.u325-st'), ui = root.querySelector('.u325-ui');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var r = 0, rT = 0, pos = null, full = false, raf = 0;
  // 카드(.u325-ui)의 마스크 좌표는 카드 기준, 렌즈 고리 좌표는 무대 기준입니다
  function apply() {
    var p = pos || { x: 170, y: 170 };
    ui.style.setProperty('--x', (p.x - 40) + 'px'); ui.style.setProperty('--y', (p.y - 28) + 'px'); ui.style.setProperty('--r', r.toFixed(1) + 'px');
    st.style.setProperty('--x', p.x + 'px'); st.style.setProperty('--y', p.y + 'px'); st.style.setProperty('--r', Math.min(r, 70).toFixed(1) + 'px');
    st.style.setProperty('--ro', pos && !full && r > 4 ? '1' : '0');
  }
  function frame() {
    raf = 0;
    if (!root.isConnected) return;
    r += (rT - r) * (rm ? 1 : 0.2);
    if (Math.abs(rT - r) < 0.3) r = rT;
    apply();
    if (r !== rT) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  function loc(e) { var b = st.getBoundingClientRect(), k = st.offsetWidth / (b.width || 1); return { x: (e.clientX - b.left) * k, y: (e.clientY - b.top) * k }; }
  st.addEventListener('pointermove', function (e) { pos = loc(e); if (!full) rT = 56; kick(); apply(); });
  st.addEventListener('pointerleave', function () { if (!full) { pos = null; rT = 0; } kick(); });
  st.addEventListener('click', function (e) { pos = loc(e); full = !full; rT = full ? 420 : 56; kick(); });
  apply();
})();
  })();

  scope.ready();
  return scope.controller;
}
