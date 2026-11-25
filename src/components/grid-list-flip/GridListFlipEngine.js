// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountGridListFlip(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 350,
      responsive: false,
      markup: `
<div class="ux u308">
  <div class="u308-hd"><b>Albums</b><div class="u308-vs" role="group" aria-label="View">
    <button class="u308-v" type="button" aria-pressed="true" aria-label="Grid view"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg></button>
    <button class="u308-v" type="button" aria-pressed="false" aria-label="List view"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12"/></svg></button>
  </div></div>
  <div class="u308-g"></div>
</div>
`,
      css: `

.u308{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:350px;display:flex;flex-direction:column;padding:16px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u308-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.u308-hd b{font-size:18px;font-weight:850}
.u308-vs{display:flex;gap:2px;padding:3px;border-radius:11px;background:var(--ux-surface-2)}
.u308-v{width:34px;height:28px;border:0;border-radius:8px;display:grid;place-items:center;background:none;color:var(--ux-ink-3)}
.u308-v[aria-pressed="true"]{background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line)}
.u308-v svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.u308-g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.u308-it{display:flex;flex-direction:column;min-width:0}
.u308-ph{aspect-ratio:1;border-radius:14px;background:var(--bg);transform-origin:0 0}
.u308-tx{display:none;min-width:0}
.u308-tx b{display:block;font-size:14px;font-weight:780;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u308-tx span{font-size:12px;font-weight:650;color:var(--ux-ink-3)}
.u308.is-list .u308-g{grid-template-columns:1fr;gap:6px}
.u308.is-list .u308-it{flex-direction:row;align-items:center;gap:12px}
.u308.is-list .u308-ph{width:38px;height:38px;aspect-ratio:auto;border-radius:10px;flex:none}
.u308.is-list .u308-tx{display:block}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u308');
  var g = root.querySelector('.u308-g'), vs = Array.prototype.slice.call(root.querySelectorAll('.u308-v'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PH = [['Jeju sea', '12 photos'], ['Kyoto alleys', '24 photos'], ['Seorak autumn', '18 photos'], ['Busan at night', '9 photos'], ['Paris morning', '31 photos'], ['Namhae sunset', '15 photos']];
  var BG = ['linear-gradient(#74C0FC,#1C7ED6)', 'linear-gradient(135deg,#FFD8A8,#E8590C)', 'linear-gradient(135deg,#FFA94D,#C92A2A)', 'linear-gradient(#364FC7,#0B0C12)', 'linear-gradient(135deg,#FFDEEB,#BAC8FF)', 'linear-gradient(#FFD43B,#F76707 60%,#5F3DC4)'];
  var items = PH.map(function (p, i) {
    var it = document.createElement('div');
    it.className = 'u308-it';
    it.innerHTML = '<span class="u308-ph" role="img"></span><span class="u308-tx"><b></b><span></span></span>';
    var ph = it.querySelector('.u308-ph');
    ph.style.setProperty('--bg', BG[i]); ph.setAttribute('aria-label', p[0]);
    it.querySelector('b').textContent = p[0];
    it.querySelector('.u308-tx span').textContent = p[1];
    g.appendChild(it);
    return { it: it, ph: ph, tx: it.querySelector('.u308-tx') };
  });
  function rel(el) {
    var r = el.getBoundingClientRect(), rr = root.getBoundingClientRect(), k = root.offsetWidth / (rr.width || 1);
    return { x: (r.left - rr.left) * k, y: (r.top - rr.top) * k, w: r.width * k, h: r.height * k };
  }
  // FLIP: 사진의 이전 자리·크기를 재고, 새 배치에서 그만큼 되돌린 뒤 제자리로 풀어 줍니다
  function setView(list) {
    var before = items.map(function (o) { return rel(o.ph); });
    root.classList.toggle('is-list', list);
    vs.forEach(function (b, i) { b.setAttribute('aria-pressed', String((i === 1) === list)); });
    if (rm) return;
    items.forEach(function (o, i) {
      var a = before[i], b = rel(o.ph);
      var sx = a.w / b.w, sy = a.h / b.h;
      o.ph.animate([{ transform: 'translate(' + (a.x - b.x) + 'px,' + (a.y - b.y) + 'px) scale(' + sx + ',' + sy + ')', borderRadius: (list ? 14 / sx : 10 / sx) + 'px' }, { transform: 'none' }], { duration: 560, delay: i * 25, easing: 'cubic-bezier(.3,1.15,.4,1)', fill: 'backwards' });
      if (list) o.tx.animate([{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 300 + i * 30, fill: 'backwards' });
    });
  }
  vs.forEach(function (b, i) { b.addEventListener('click', function () { if ((i === 1) !== root.classList.contains('is-list')) setView(i === 1); }); });
})();
  })();

  scope.ready();
  return scope.controller;
}
