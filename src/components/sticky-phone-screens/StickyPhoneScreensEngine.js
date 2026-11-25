// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStickyPhoneScreens(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u377">
  <div class="u377-ph" aria-hidden="true"><div class="u377-scr"></div></div>
  <span class="u377-st" aria-hidden="true"><i></i></span>
  <div class="u377-sc" tabindex="0" aria-label="Feature details, scroll to read"></div>
</div>
`,
      css: `

.u377{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u377-ph{position:absolute;left:16px;top:50%;width:118px;height:236px;margin-top:-118px;border-radius:24px;background:#0B0C12;padding:6px;box-shadow:0 20px 30px -16px var(--ux-shadow-strong);transition:transform .5s var(--ux-spring)}
.u377-ph.tilt{transform:rotate(-4deg) scale(.97)}
.u377-scr{position:relative;width:100%;height:100%;border-radius:19px;overflow:hidden;background:#F1F3F5}
.u377-s{position:absolute;inset:0;padding:22px 9px 9px;transform:translateY(100%);transition:transform .55s cubic-bezier(.3,.9,.3,1)}
.u377-s.on{transform:none}
.u377-s.up{transform:translateY(-30%);opacity:.4;transition:transform .55s cubic-bezier(.3,.9,.3,1),opacity .55s}
.u377-s i{display:block;border-radius:7px;margin-bottom:6px}
.u377-st{position:absolute;left:142px;top:50%;width:3px;height:120px;margin-top:-60px;border-radius:3px;background:var(--ux-line)}
.u377-st i{position:absolute;left:0;top:0;width:3px;height:25%;border-radius:3px;background:var(--ux-accent);transition:transform .45s var(--ux-spring)}
.u377-sc{position:absolute;left:152px;right:0;top:0;bottom:0;overflow-y:auto;padding:0 16px 0 8px;scrollbar-width:none;outline:none}
.u377-sc::-webkit-scrollbar{display:none}
.u377-f{height:300px;display:flex;flex-direction:column;justify-content:center;opacity:.3;transition:opacity .4s}
.u377-f:first-child{height:400px;padding-top:100px}
.u377-f:last-child{height:420px;padding-bottom:120px}
.u377-f.on{opacity:1}
.u377-f small{font:800 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ux-accent)}
.u377-f b{display:block;margin-top:6px;font-size:18px;line-height:1.2;font-weight:850;letter-spacing:-.03em}
.u377-f p{margin:6px 0 0;font-size:13px;line-height:1.55;color:var(--ux-ink-2)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u377');
  var sc = root.querySelector('.u377-sc'), scr = root.querySelector('.u377-scr'), ph = root.querySelector('.u377-ph'), bar = root.querySelector('.u377-st i');
  var FEAT = [['Today at a glance', 'Plans, weather and to-dos gathered on the first screen.'], ['Easy sorting', 'Just drag and drop to put your lists in order.'], ['Shared notes', 'Edit the same note with family in real time.'], ['Quiet alerts', 'A gentle nudge only when it truly matters.']];
  // 기능마다 휴대폰 화면을 도형으로 그립니다
  var SCREENS = [
    '<i style="height:46px;background:linear-gradient(135deg,#74C0FC,#4DABF7)"></i><i style="height:26px;background:#fff"></i><i style="height:26px;background:#fff"></i><i style="height:60px;background:#FFE066"></i>',
    '<i style="height:24px;background:#fff;width:90%"></i><i style="height:24px;background:#B2F2BB;transform:translateX(8px) rotate(-3deg)"></i><i style="height:24px;background:#fff"></i><i style="height:24px;background:#fff;width:80%"></i><i style="height:24px;background:#fff"></i>',
    '<i style="height:100px;background:#FFF3BF"></i><i style="height:14px;width:60%;background:#D0BFFF"></i><i style="height:14px;width:40%;background:#99E9F2"></i>',
    '<i style="height:120px;background:transparent"></i><i style="height:34px;border-radius:12px;background:#fff;box-shadow:0 4px 10px rgba(0,0,0,.1)"></i>'
  ];
  var BGS = ['#E7F5FF', '#EBFBEE', '#FFF9DB', '#F3F0FF'];
  var screens = SCREENS.map(function (h, i) { var s = document.createElement('div'); s.className = 'u377-s'; s.style.background = BGS[i]; s.innerHTML = h; scr.appendChild(s); return s; });
  var feats = FEAT.map(function (f, i) {
    var el = document.createElement('section');
    el.className = 'u377-f';
    el.innerHTML = '<small>0' + (i + 1) + '</small><b></b><p></p>';
    el.querySelector('b').textContent = f[0];
    el.querySelector('p').textContent = f[1];
    sc.appendChild(el);
    return el;
  });
  var cur = -1, raf = 0;
  function show(i) {
    if (i === cur) return;
    var prev = cur;
    cur = i;
    screens.forEach(function (s, k) { s.classList.toggle('on', k === i); s.classList.toggle('up', k < i); });
    feats.forEach(function (f, k) { f.classList.toggle('on', k === i); });
    bar.style.transform = 'translateY(' + (i * 100) + '%)';
    if (prev >= 0) { ph.classList.add('tilt'); setTimeout(function () { ph.classList.remove('tilt'); }, 260); }
  }
  // 화면 가운데에 가장 가까운 설명을 지금 기능으로 봅니다
  function draw() {
    raf = 0;
    var mid = sc.scrollTop + sc.clientHeight / 2, best = 0, bd = 1e9;
    feats.forEach(function (f, k) {
      var c = f.offsetTop + f.offsetHeight / 2 + (k === 0 ? 50 : 0) - (k === feats.length - 1 ? 60 : 0), d = Math.abs(c - mid);
      if (d < bd) { bd = d; best = k; }
    });
    show(best);
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
