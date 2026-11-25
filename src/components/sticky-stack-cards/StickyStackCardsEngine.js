// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStickyStackCards(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u223">
  <div class="u223-sc" tabindex="0" aria-label="Features, scroll to browse">
    <p class="u223-k">How it works</p>
    <div class="u223-list"></div>
    <div class="u223-end"><button type="button">Get started</button></div>
  </div>
</div>
`,
      css: `

.u223{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--ux-surface-2);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u223-sc{position:absolute;inset:0;overflow-y:auto;padding:22px 16px 30px;scrollbar-width:none;outline:none}
.u223-sc::-webkit-scrollbar{display:none}
.u223-k{margin:0 4px 14px;font-size:22px;font-weight:880;letter-spacing:-.04em}
.u223-c{position:sticky;height:330px;margin-bottom:24px;padding:20px;border-radius:24px;color:#fff;transform-origin:50% 0;will-change:transform;box-shadow:0 -10px 30px -18px rgba(0,0,0,.35);display:flex;flex-direction:column}
.u223-c i{font:800 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;opacity:.7;font-style:normal}
.u223-c b{display:block;margin-top:auto;font-size:26px;line-height:1.15;font-weight:880;letter-spacing:-.04em}
.u223-c p{margin:8px 0 0;font-size:14px;line-height:1.5;opacity:.85}
.u223-art{position:absolute;right:18px;top:18px;width:90px;height:90px;border-radius:26px;background:rgba(255,255,255,.18);transform:rotate(12deg)}
.u223-art::after{content:"";position:absolute;inset:22px;border-radius:50%;background:rgba(255,255,255,.35)}
.u223-sh{position:absolute;inset:0;border-radius:inherit;background:#000;opacity:0;pointer-events:none}
.u223-end{height:120px;display:grid;place-items:center}
.u223-end button{height:44px;padding:0 22px;border:0;border-radius:999px;background:var(--ux-ink);color:var(--ux-page);font-size:14px;font-weight:800}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u223');
  var sc = root.querySelector('.u223-sc'), list = root.querySelector('.u223-list');
  var CARDS = [['01', 'Plan in one place', 'Gather scattered notes and docs onto one board.'], ['02', 'Refine together', 'Comments and versions stay in the same spot.'], ['03', 'Share instantly', 'Show it beyond your team with a single link.'], ['04', 'Check the numbers', 'Get a summary of the response every morning.']];
  var BG = ['linear-gradient(150deg,#7048E8,#4C6EF5)', 'linear-gradient(150deg,#F76707,#F59F00)', 'linear-gradient(150deg,#0CA678,#15AABF)', 'linear-gradient(150deg,#E64980,#BE4BDB)'];
  var cards = CARDS.map(function (c, i) {
    var el = document.createElement('article');
    el.className = 'u223-c';
    el.style.top = (14 + i * 12) + 'px';
    el.style.background = BG[i];
    el.innerHTML = '<span class="u223-art" aria-hidden="true"></span><i></i><b></b><p></p><span class="u223-sh" aria-hidden="true"></span>';
    el.querySelector('i').textContent = c[0];
    el.querySelector('b').textContent = c[1];
    el.querySelector('p').textContent = c[2];
    list.appendChild(el);
    return el;
  });
  var raf = 0;
  // 카드마다 뒤에 쌓인 카드 수(소수 포함)만큼 줄이고 어둡게 합니다
  function draw() {
    raf = 0;
    var top = sc.getBoundingClientRect().top, k = sc.offsetHeight / (sc.getBoundingClientRect().height || 1);
    var pos = cards.map(function (c) { return (c.getBoundingClientRect().top - top) * k; });
    cards.forEach(function (c, i) {
      var depth = 0;
      for (var j = i + 1; j < cards.length; j++) {
        var stick = 14 + j * 12, d = (pos[j] - stick) / 330;
        depth += Math.max(0, Math.min(1, 1 - d));
      }
      c.style.transform = 'scale(' + (1 - depth * 0.06).toFixed(3) + ')';
      c.querySelector('.u223-sh').style.opacity = (depth * 0.18).toFixed(3);
    });
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  requestAnimationFrame(draw);
})();
  })();

  scope.ready();
  return scope.controller;
}
