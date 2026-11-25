// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSectionColorShift(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u329">
  <div class="u329-sc" tabindex="0" aria-label="Flavors, scroll to browse">
    <div class="u329-stage" aria-hidden="true"><p class="u329-k">Four sparkling flavors</p><div class="u329-can"><div class="u329-lab"><i>SPARKLING</i><b></b></div></div><div class="u329-dots"></div></div>
    <div class="u329-secs"></div>
  </div>
</div>
`,
      css: `

.u329{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--bg,#FF8A65);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;color:#1B1B22}
.u329-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u329-sc::-webkit-scrollbar{display:none}
.u329-stage{position:sticky;top:0;height:500px;display:flex;align-items:flex-start;justify-content:center;padding-top:74px;pointer-events:none}
.u329-can{position:relative;width:104px;height:196px;border-radius:26px 26px 22px 22px;background:linear-gradient(90deg,rgba(0,0,0,.25),rgba(255,255,255,.35) 30%,rgba(255,255,255,.05) 55%,rgba(0,0,0,.28)),var(--can,#E64A19);box-shadow:0 30px 40px -24px rgba(0,0,0,.45);transform:rotate(var(--r,0deg));overflow:hidden}
.u329-can::before{content:"";position:absolute;left:8px;right:8px;top:0;height:14px;border-radius:0 0 8px 8px;background:linear-gradient(#E9ECEF,#ADB5BD)}
.u329-lab{position:absolute;left:0;right:0;top:64px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,.9);transform:translateX(var(--lx,0px))}
.u329-lab b{font-size:16px;font-weight:900;letter-spacing:-.02em;color:var(--can,#E64A19)}
.u329-lab i{font-size:9px;font-style:normal;font-weight:800;letter-spacing:.2em;color:#555}
.u329-k{position:absolute;left:20px;top:20px;margin:0;font-size:13px;font-weight:800;opacity:.75}
.u329-dots{position:absolute;right:18px;top:50%;display:flex;flex-direction:column;gap:7px;transform:translateY(-50%)}
.u329-dots i{width:6px;height:6px;border-radius:50%;background:rgba(0,0,0,.25);transition:transform .3s,background-color .3s}
.u329-dots i.on{background:#1B1B22;transform:scale(1.5)}
.u329-secs{position:relative;margin-top:-500px}
.u329-sec{height:420px;display:flex;flex-direction:column;justify-content:flex-end;padding:0 22px 30px}
.u329-sec:first-child{height:500px}
.u329-sec b{font-size:30px;font-weight:900;letter-spacing:-.04em}
.u329-sec span{font-size:14px;font-weight:700;opacity:.75}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u329');
  var sc = root.querySelector('.u329-sc'), secs = root.querySelector('.u329-secs'), lab = root.querySelector('.u329-lab b'), dots = root.querySelector('.u329-dots');
  var FLAV = [['Grapefruit', 'A bright, bittersweet morning'], ['Green grape', 'A light, fizzy afternoon'], ['Blueberry', 'A deep, sweet evening'], ['Peach', 'A soft end to the night']];
  var BG = [[255, 171, 145], [192, 235, 117], [165, 180, 252], [255, 200, 221]];
  var CAN = ['#E64A19', '#5C940D', '#4C3BCF', '#D6336C'];
  var els = FLAV.map(function (f) {
    var s = document.createElement('section');
    s.className = 'u329-sec';
    s.innerHTML = '<b></b><span></span>';
    s.querySelector('b').textContent = f[0];
    s.querySelector('span').textContent = f[1];
    secs.appendChild(s);
    dots.appendChild(document.createElement('i'));
    return s;
  });
  var raf = 0, shown = -1;
  // 섹션 경계 사이에서는 두 색을 스크롤 비율만큼 섞습니다
  function draw() {
    raf = 0;
    var max = sc.scrollHeight - sc.clientHeight, f = max ? sc.scrollTop / max * (FLAV.length - 1) : 0;
    var i = Math.min(FLAV.length - 2, Math.floor(f)), t = f - i;
    var c = BG[i].map(function (v, k) { return Math.round(v + (BG[i + 1][k] - v) * t); });
    root.style.setProperty('--bg', 'rgb(' + c.join(',') + ')');
    var cur = Math.round(f);
    root.style.setProperty('--r', ((f - cur) * 24).toFixed(1) + 'deg');
    root.style.setProperty('--lx', ((f - cur) * -60).toFixed(1) + 'px');
    if (cur !== shown) {
      shown = cur;
      root.style.setProperty('--can', CAN[cur]);
      lab.textContent = FLAV[cur][0];
      Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === cur); });
    }
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
