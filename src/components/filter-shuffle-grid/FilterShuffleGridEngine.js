// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountFilterShuffleGrid(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 350,
      responsive: false,
      markup: `
<div class="ux u292">
  <div class="u292-fs" role="group" aria-label="Shape filter"></div>
  <p class="u292-n" aria-live="polite"></p>
  <div class="u292-g"></div>
</div>
`,
      css: `

.u292{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:350px;display:flex;flex-direction:column;padding:16px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u292-fs{display:flex;gap:5px;flex-wrap:wrap}
.u292-f{height:32px;padding:0 12px;border:0;border-radius:999px;background:var(--ux-surface-2);font-size:12.5px;font-weight:750;color:var(--ux-ink-2);transition:background-color .25s,color .25s}
.u292-f[aria-pressed="true"]{background:var(--ux-ink);color:var(--ux-page)}
.u292-n{margin:8px 0 0;font-size:11.5px;font-weight:700;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u292-g{position:relative;flex:1;margin-top:8px}
.u292-t{position:absolute;left:0;top:0;width:68px;height:68px;border-radius:16px;display:grid;place-items:center;background:var(--bg);transition:transform .6s cubic-bezier(.3,1.25,.4,1),opacity .35s}
.u292-t.out{opacity:0}
.u292-t svg{width:30px;height:30px;fill:rgba(255,255,255,.9)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u292');
  var fs = root.querySelector('.u292-fs'), g = root.querySelector('.u292-g'), nEl = root.querySelector('.u292-n');
  var CATS = ['All', 'Circle', 'Square', 'Triangle'];
  var SHAPE = ['', '<circle cx="15" cy="15" r="12"/>', '<rect x="4" y="4" width="22" height="22" rx="4"/>', '<path d="M15 3l13 23H2z"/>'];
  var KINDS = [1, 2, 3, 1, 3, 2, 2, 1, 3, 1, 2, 3];
  var BG = ['#FF8787', '#FFA94D', '#FFD43B', '#69DB7C', '#38D9A9', '#4DABF7', '#748FFC', '#DA77F2', '#F783AC', '#A9E34B', '#3BC9DB', '#9775FA'];
  var cat = 0;
  var tiles = KINDS.map(function (k, i) {
    var t = document.createElement('div');
    t.className = 'u292-t';
    t.style.setProperty('--bg', BG[i]);
    t.innerHTML = '<svg viewBox="0 0 30 30" aria-hidden="true">' + SHAPE[k] + '</svg>';
    t.setAttribute('role', 'img'); t.setAttribute('aria-label', CATS[k]);
    g.appendChild(t);
    return { el: t, k: k, slot: i, shown: true };
  });
  var chips = CATS.map(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'u292-f'; b.textContent = c; b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () { if (cat !== i) apply(i); });
    fs.appendChild(b);
    return b;
  });
  function xy(slot) { return [(slot % 4) * 76, Math.floor(slot / 4) * 76]; }
  // 남는 타일에 앞에서부터 새 칸 번호를 매기고, 사라지는 타일은 제자리에서 작아집니다
  function apply(c) {
    cat = c;
    chips.forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === c)); });
    var n = 0;
    tiles.forEach(function (t) {
      var keep = c === 0 || t.k === c;
      var was = t.shown;
      t.shown = keep;
      if (keep) {
        var p = xy(n);
        t.el.style.transitionDelay = (n * 35) + 'ms';
        if (!was) { t.el.style.transition = 'none'; t.el.style.transform = 'translate(' + p[0] + 'px,' + p[1] + 'px) scale(0)'; void t.el.offsetWidth; t.el.style.transition = ''; }
        t.el.classList.remove('out');
        t.el.style.transform = 'translate(' + p[0] + 'px,' + p[1] + 'px)';
        t.el.removeAttribute('aria-hidden');
        n += 1;
      } else {
        var cur = t.el.style.transform.replace(/ scale\([^)]*\)/, '');
        t.el.style.transitionDelay = '0ms';
        t.el.classList.add('out');
        t.el.style.transform = cur + ' scale(.2)';
        t.el.setAttribute('aria-hidden', 'true');
      }
    });
    nEl.textContent = n + ' showing';
  }
  tiles.forEach(function (t, i) { var p = xy(i); t.el.style.transition = 'none'; t.el.style.transform = 'translate(' + p[0] + 'px,' + p[1] + 'px)'; });
  void g.offsetWidth;
  tiles.forEach(function (t) { t.el.style.transition = ''; });
  apply(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
