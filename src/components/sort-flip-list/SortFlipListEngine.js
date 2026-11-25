// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSortFlipList(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 350,
      responsive: false,
      markup: `
<div class="ux u317">
  <div class="u317-ss" role="group" aria-label="Sort by">
    <button class="u317-s" type="button" aria-pressed="true">Name<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 8V2M2 5l3-3 3 3"/></svg></button>
    <button class="u317-s" type="button" aria-pressed="false">Price<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 8V2M2 5l3-3 3 3"/></svg></button>
    <button class="u317-s" type="button" aria-pressed="false">Rating<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 8V2M2 5l3-3 3 3"/></svg></button>
  </div>
  <ul class="u317-ls" aria-live="polite"></ul>
</div>
`,
      css: `

.u317{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:350px;display:flex;flex-direction:column;padding:16px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u317-ss{display:flex;gap:4px;padding:4px;border-radius:13px;background:var(--ux-surface-2)}
.u317-s{flex:1;height:32px;border:0;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:4px;background:none;font-size:12.5px;font-weight:750;color:var(--ux-ink-3)}
.u317-s[aria-pressed="true"]{background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line)}
.u317-s svg{width:10px;height:10px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;transition:transform .35s var(--ux-spring);opacity:0}
.u317-s[aria-pressed="true"] svg{opacity:1}
.u317-s.desc svg{transform:rotate(180deg)}
.u317-ls{position:relative;margin:10px 0 0;padding:0;list-style:none}
.u317-r{position:absolute;left:0;right:0;top:0;height:44px;display:flex;align-items:center;gap:8px;padding:0 8px;border-radius:12px;background:var(--ux-surface);transition:transform .6s cubic-bezier(.3,1.1,.4,1),box-shadow .3s}
.u317-r.up{z-index:2;box-shadow:0 10px 22px -12px var(--ux-shadow-strong)}
.u317-r.dn{z-index:0;opacity:.9}
.u317-r i{flex:none;width:28px;height:28px;border-radius:9px;background:linear-gradient(135deg,var(--a),var(--b))}
.u317-r b{flex:1;min-width:0;font-size:13px;font-weight:750;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u317-r span{flex:none;text-align:right;font:650 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u317-r span.p{width:66px}
.u317-r span.s{width:40px}
.u317-r span.k{color:var(--ux-ink);font-weight:800}
.u317-r em{width:26px;font-style:normal;font:700 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;text-align:right;opacity:0;transition:opacity .3s}
.u317-r em.show{opacity:1}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u317');
  var ls = root.querySelector('.u317-ls'), ss = Array.prototype.slice.call(root.querySelectorAll('.u317-s'));
  var DATA = [['Wireless earbuds', 129000, 4.6], ['Mechanical keyboard', 89000, 4.8], ['Smartwatch', 299000, 4.3], ['Portable speaker', 59000, 4.1], ['Laptop stand', 39000, 4.7], ['Power bank', 45000, 4.4]];
  var C = [['#FFA8A8', '#FFD43B'], ['#A5D8FF', '#B197FC'], ['#96F2D7', '#4DABF7'], ['#FFC078', '#F783AC'], ['#C0EB75', '#38D9A9'], ['#D0BFFF', '#74C0FC']];
  var key = 0, desc = false, order = DATA.map(function (_, i) { return i; });
  var rows = DATA.map(function (d, i) {
    var li = document.createElement('li');
    li.className = 'u317-r';
    li.innerHTML = '<i style="--a:' + C[i][0] + ';--b:' + C[i][1] + '"></i><b></b><span class="p"></span><span class="s"></span><em aria-hidden="true"></em>';
    li.querySelector('b').textContent = d[0];
    li.querySelector('.p').textContent = d[1].toLocaleString() + ' KRW';
    li.querySelector('.s').textContent = '★ ' + d[2].toFixed(1);
    ls.appendChild(li);
    return li;
  });
  ls.style.height = (DATA.length * 48) + 'px';
  // 새 순서 자리로 옮기고, 올라간 줄은 앞으로·내려간 줄은 뒤로 겹치게 합니다
  function place(prev) {
    order.forEach(function (idx, pos) {
      var r = rows[idx], was = prev ? prev.indexOf(idx) : pos, d = was - pos;
      r.style.transform = 'translateY(' + (pos * 48) + 'px)';
      r.classList.toggle('up', d > 0); r.classList.toggle('dn', d < 0);
      var em = r.querySelector('em');
      em.textContent = d > 0 ? '▲' + d : d < 0 ? '▼' + (-d) : '';
      em.style.color = d > 0 ? 'var(--ux-mint)' : 'var(--ux-danger)';
      em.classList.toggle('show', !!d);
      r.querySelector('.p').classList.toggle('k', key === 1);
      r.querySelector('.s').classList.toggle('k', key === 2);
    });
    setTimeout(function () { rows.forEach(function (r) { r.classList.remove('up', 'dn'); r.querySelector('em').classList.remove('show'); }); }, 1300);
  }
  function sort(k) {
    if (k === key) desc = !desc; else { key = k; desc = k > 0; }
    ss.forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === key)); b.classList.toggle('desc', i === key && desc); });
    var prev = order.slice();
    order.sort(function (a, b) {
      var x = DATA[a][key], y = DATA[b][key];
      var c = key === 0 ? String(x).localeCompare(String(y), 'en') : x - y;
      return desc ? -c : c;
    });
    place(prev);
  }
  ss.forEach(function (b, i) { b.addEventListener('click', function () { sort(i); }); });
  order.sort(function (a, b) { return DATA[a][0].localeCompare(DATA[b][0], 'en'); });
  place(null);
})();
  })();

  scope.ready();
  return scope.controller;
}
