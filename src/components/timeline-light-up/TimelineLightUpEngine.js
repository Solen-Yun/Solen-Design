// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTimelineLightUp(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u370">
  <div class="u370-sc" tabindex="0" aria-label="History, scroll to view">
    <p class="u370-k">How we got here</p>
    <div class="u370-tl"><span class="u370-ln" aria-hidden="true"><i></i></span></div>
  </div>
</div>
`,
      css: `

.u370{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u370-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u370-sc::-webkit-scrollbar{display:none}
.u370-k{margin:0;padding:22px 20px 0;font-size:22px;font-weight:880;letter-spacing:-.04em}
.u370-tl{position:relative;margin:30px 0 0;padding:20px 0 220px}
.u370-ln{position:absolute;left:50%;top:0;bottom:180px;width:3px;margin-left:-1.5px;border-radius:3px;background:var(--ux-line)}
.u370-ln i{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:3px;background:linear-gradient(var(--ux-accent),var(--ux-accent-2));transform-origin:50% 0;transform:scaleY(var(--p,0))}
.u370-ln i::after{content:"";position:absolute;left:50%;bottom:-6px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:var(--ux-accent-2);box-shadow:0 0 14px var(--ux-accent-2);transform:scaleY(calc(1 / max(var(--p,0), .02)))}
.u370-ev{position:relative;height:150px}
.u370-dot{position:absolute;left:50%;top:10px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:var(--ux-surface);box-shadow:0 0 0 3px var(--ux-line-2);transition:box-shadow .3s,transform .45s var(--ux-spring),background-color .3s}
.u370-ev.on .u370-dot{background:var(--ux-accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--ux-accent) 25%,transparent);transform:scale(1.15)}
.u370-cd{position:absolute;top:0;width:118px;padding:10px 12px;border-radius:14px;background:var(--ux-surface-2);opacity:0;transition:opacity .4s,transform .6s var(--ux-spring)}
.u370-ev:nth-child(odd) .u370-cd{right:calc(50% + 20px);transform:translateX(-24px)}
.u370-ev:nth-child(even) .u370-cd{left:calc(50% + 20px);transform:translateX(24px)}
.u370-ev.on .u370-cd{opacity:1;transform:none}
.u370-cd b{display:block;font:850 18px/1.1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ux-accent)}
.u370-cd span{display:block;margin-top:4px;font-size:13px;font-weight:700}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u370');
  var sc = root.querySelector('.u370-sc'), tl = root.querySelector('.u370-tl'), ln = root.querySelector('.u370-ln');
  var EV = [['2019', 'A two-person studio'], ['2020', 'First app launched'], ['2022', '100,000 users'], ['2024', 'Our third office'], ['2026', 'Here and now']];
  var evs = EV.map(function (e) {
    var el = document.createElement('div');
    el.className = 'u370-ev';
    el.innerHTML = '<span class="u370-dot" aria-hidden="true"></span><div class="u370-cd"><b></b><span></span></div>';
    el.querySelector('b').textContent = e[0];
    el.querySelector('span:not(.u370-dot)').textContent = e[1];
    tl.appendChild(el);
    return el;
  });
  var raf = 0;
  // 선 끝은 화면 높이의 60% 지점을 따라가고, 끝이 지난 점은 켜집니다
  function draw() {
    raf = 0;
    var tip = sc.scrollTop + sc.clientHeight * 0.6 - tl.offsetTop - ln.offsetTop, h = ln.offsetHeight;
    var p = Math.max(0, Math.min(1, tip / h));
    ln.style.setProperty('--p', p.toFixed(4));
    evs.forEach(function (el) { el.classList.toggle('on', el.offsetTop + 18 <= tip); });
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  requestAnimationFrame(draw);
})();
  })();

  scope.ready();
  return scope.controller;
}
