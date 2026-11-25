// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountExplodedAssembly(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u294">
  <div class="u294-sc" tabindex="0" aria-label="Exploded view, scroll to assemble">
    <div class="u294-run"><div class="u294-st">
      <p class="u294-k">Look inside</p>
      <div class="u294-iso" aria-hidden="true"><span class="u294-L k"></span><span class="u294-L y"></span><span class="u294-L b"></span><span class="u294-L d"></span><span class="u294-L g"></span></div>
      <div class="u294-lbs" aria-hidden="true"></div>
      <p class="u294-ok">Assembled</p>
    </div></div>
  </div>
</div>
`,
      css: `

.u294{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:radial-gradient(90% 60% at 50% 40%,var(--ux-surface),var(--ux-surface-2));box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u294-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u294-sc::-webkit-scrollbar{display:none}
.u294-run{height:1200px}
.u294-st{position:sticky;top:0;height:500px}
.u294-k{position:absolute;left:20px;top:20px;margin:0;font-size:20px;font-weight:880;letter-spacing:-.03em}
.u294-ok{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:13px;font-weight:800;color:var(--ux-mint);opacity:var(--done,0)}
.u294-iso{position:absolute;left:50%;top:56%;width:0;height:0;transform:rotateX(58deg) rotateZ(-38deg);transform-style:preserve-3d}
.u294-L{position:absolute;left:-60px;top:-110px;width:120px;height:220px;border-radius:22px;transform:translateZ(var(--z));transition:none}
.u294-L.g{background:linear-gradient(135deg,rgba(255,255,255,.75),rgba(200,220,255,.35));box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.9),0 0 0 1px var(--ux-line-2)}
.u294-L.d{background:linear-gradient(135deg,#1B1E3A,#0B0C12);box-shadow:0 0 0 1px rgba(0,0,0,.3)}
.u294-L.d::after{content:"";position:absolute;inset:8px;border-radius:16px;background:radial-gradient(70% 50% at 30% 30%,#7048E8,transparent 70%),radial-gradient(60% 50% at 80% 80%,#15AABF,transparent 70%),#151626;opacity:var(--on,0);transition:opacity .5s}
.u294-L.b{background:#1E7A4F;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}
.u294-L.b::before{content:"";position:absolute;left:20px;top:24px;width:46px;height:46px;border-radius:6px;background:#2B2D33;box-shadow:54px 10px 0 -10px #C0A060,0 80px 0 -14px #2B2D33,40px 120px 0 -16px #C0A060}
.u294-L.y{background:linear-gradient(135deg,#ADB5BD,#868E96);border-radius:16px;left:-48px;top:-80px;width:96px;height:160px}
.u294-L.y::after{content:"";position:absolute;inset:16px;border:2px dashed rgba(255,255,255,.4);border-radius:10px}
.u294-L.k{background:linear-gradient(135deg,#E9ECEF,#CED4DA);box-shadow:inset 0 0 0 1.5px rgba(0,0,0,.08),0 20px 30px rgba(0,0,0,.15)}
.u294-lb{position:absolute;left:186px;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:var(--ux-ink-2);white-space:nowrap;transform:translateY(-50%);transform-origin:0 50%}
.u294-lb::before{content:"";width:28px;height:1.5px;background:var(--ux-line-2)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u294');
  var sc = root.querySelector('.u294-sc'), st = root.querySelector('.u294-st'), lbs = root.querySelector('.u294-lbs');
  var layers = Array.prototype.slice.call(root.querySelectorAll('.u294-L')).reverse();
  var PARTS = ['Cover glass', 'Display', 'Logic board', 'Battery', 'Back panel'];
  var SPREAD = [200, 140, 80, 30, 0], TIGHT = [14, 11, 7, 4, 0];
  var labels = PARTS.map(function (p) { var l = document.createElement('span'); l.className = 'u294-lb'; l.textContent = p; lbs.appendChild(l); return l; });
  st.querySelector('.u294-iso').setAttribute('aria-label', PARTS.join(', '));
  var raf = 0;
  // 위층부터 차례로 내려와 맞물립니다. 이름표는 자기 층 높이를 따라가다 접힙니다
  function draw() {
    raf = 0;
    var max = sc.scrollHeight - sc.clientHeight, p = max ? Math.min(1, sc.scrollTop / max) : 0;
    layers.forEach(function (L, i) {
      var start = (layers.length - 1 - i) * 0.14, k = Math.max(0, Math.min(1, (p - start) / 0.4)), e = k * k * (3 - 2 * k);
      var z = SPREAD[i] + (TIGHT[i] - SPREAD[i]) * e;
      L.style.setProperty('--z', z.toFixed(1) + 'px');
      var lb = labels[i];
      lb.style.top = (280 - z * 0.72 - (4 - i) * 6).toFixed(1) + 'px';
      lb.style.opacity = (1 - e * 1.3).toFixed(2);
      lb.style.transform = 'translateY(-50%) scaleX(' + (1 - e * 0.6).toFixed(2) + ')';
    });
    var done = p > 0.92 ? 1 : 0;
    st.style.setProperty('--done', done);
    layers[1].style.setProperty('--on', done);
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
