// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountScrollspyToc(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u275">
  <div class="u275-sc" tabindex="0" aria-label="Document body"></div>
  <nav class="u275-toc" aria-label="Contents"><p>On this page</p><ul class="u275-ul"><span class="u275-mk" aria-hidden="true"></span></ul></nav>
</div>
`,
      css: `

.u275{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u275-sc{position:relative;flex:1;overflow-y:auto;padding:14px 12px 120px 18px;scrollbar-width:none;outline:none}
.u275-sc::-webkit-scrollbar{display:none}
.u275-sec{padding:8px 0 14px}
.u275-sec h4{margin:0;font-size:16px;font-weight:850;letter-spacing:-.02em}
.u275-sec p{margin:6px 0 0;font-size:13px;line-height:1.65;color:var(--ux-ink-2)}
.u275-sec i{display:block;height:60px;margin-top:8px;border-radius:10px;background:repeating-linear-gradient(90deg,var(--ux-surface-2) 0 46%,transparent 46% 50%)}
.u275-toc{position:relative;flex:none;width:118px;padding:16px 12px 16px 16px;border-left:1px solid var(--ux-line)}
.u275-toc p{margin:0 0 8px;font-size:11px;font-weight:750;color:var(--ux-ink-3)}
.u275-ul{position:relative;margin:0;padding:0 0 0 10px;list-style:none}
.u275-ul::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;border-radius:2px;background:var(--ux-line)}
.u275-ti{display:block;width:100%;padding:6px 0;border:0;background:none;text-align:left;font-size:12.5px;font-weight:650;color:var(--ux-ink-3);transition:color .25s}
.u275-ti.on{color:var(--ux-ink);font-weight:800}
.u275-mk{position:absolute;left:0;top:0;width:2px;border-radius:2px;background:var(--ux-accent);transition:transform .35s var(--ux-spring),height .35s var(--ux-spring)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u275');
  var sc = root.querySelector('.u275-sc'), ul = root.querySelector('.u275-ul'), mk = root.querySelector('.u275-mk');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SEC = [['Getting started', 'Installing takes a single line. Run the command and the files you need are added to your project along with a default config.'], ['Theming', 'It uses two sets of color tokens, light and dark. Map them to your project’s variables and they follow along.'], ['Components', 'Common pieces like buttons, inputs and menus are collected here. Take only the ones you need.'], ['Accessibility', 'Every element works with the keyboard and carries names for screen readers.'], ['Deploying', 'The build output is static files. Upload them to any host as they are.']];
  var secs = [], items = [];
  SEC.forEach(function (s, i) {
    var el = document.createElement('section');
    el.className = 'u275-sec';
    el.innerHTML = '<h4></h4><p></p>' + (i % 2 ? '' : '<i aria-hidden="true"></i>');
    el.querySelector('h4').textContent = s[0];
    el.querySelector('p').textContent = s[1];
    sc.appendChild(el); secs.push(el);
    var li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.className = 'u275-ti'; b.textContent = s[0];
    b.addEventListener('click', function () { sc.scrollTo({ top: el.offsetTop - 6, behavior: rm ? 'auto' : 'smooth' }); });
    li.appendChild(b); ul.appendChild(li); items.push(b);
  });
  var raf = 0;
  // 장마다 화면에 보이는 비율을 재서, 보이는 장 목차 항목들 위로 막대를 걸칩니다
  function draw() {
    raf = 0;
    var top = sc.scrollTop, bot = top + sc.clientHeight, first = -1, last = -1, best = -1, bestV = 0;
    secs.forEach(function (s, i) {
      var a = s.offsetTop, b = a + s.offsetHeight, vis = Math.max(0, Math.min(b, bot) - Math.max(a, top)) / s.offsetHeight;
      if (vis > 0.12) { if (first < 0) first = i; last = i; }
      if (vis > bestV) { bestV = vis; best = i; }
    });
    if (first < 0) first = last = Math.max(0, best);
    items.forEach(function (b, i) { b.classList.toggle('on', i === best); if (i === best) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    var y0 = items[first].parentNode.offsetTop, y1 = items[last].parentNode.offsetTop + items[last].parentNode.offsetHeight;
    mk.style.transform = 'translateY(' + y0 + 'px)';
    mk.style.height = (y1 - y0) + 'px';
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  requestAnimationFrame(draw);
})();
  })();

  scope.ready();
  return scope.controller;
}
