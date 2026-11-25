// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDrumTimePicker(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u362">
  <p class="u362-al" aria-live="polite"></p>
  <p class="u362-sub"><span class="u362-left"></span> · Repeats on weekdays</p>
  <div class="u362-pk">
    <span class="u362-band" aria-hidden="true"></span>
    <div class="u362-col ap" tabindex="0" role="listbox" aria-label="AM or PM"><ul></ul></div>
    <div class="u362-col" tabindex="0" role="listbox" aria-label="Hour"><ul></ul></div>
    <div class="u362-col" tabindex="0" role="listbox" aria-label="Minute"><ul></ul></div>
  </div>
</div>
`,
      css: `

.u362{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;flex-direction:column;padding:18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u362-al{margin:0;font-size:20px;font-weight:850;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.u362-sub{margin:2px 0 0;font-size:12.5px;font-weight:700;color:var(--ux-ink-3)}
.u362-pk{position:relative;display:flex;justify-content:center;gap:4px;margin-top:auto;height:216px;-webkit-mask-image:linear-gradient(transparent,#000 30%,#000 70%,transparent);mask-image:linear-gradient(transparent,#000 30%,#000 70%,transparent)}
.u362-band{position:absolute;left:0;right:0;top:90px;height:36px;border-radius:12px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u362-col{position:relative;width:76px;height:216px;overflow-y:auto;scroll-snap-type:y mandatory;scrollbar-width:none;perspective:300px;outline:none;border-radius:12px}
.u362-col::-webkit-scrollbar{display:none}
.u362-col:focus-visible{box-shadow:inset 0 0 0 2px var(--ux-accent)}
.u362-col ul{margin:0;padding:90px 0;list-style:none}
.u362-col li{height:36px;display:flex;align-items:center;justify-content:center;scroll-snap-align:center;font-size:22px;font-weight:750;color:var(--ux-ink);font-variant-numeric:tabular-nums;transform-style:preserve-3d;backface-visibility:hidden}
.u362-col.ap li{font-size:17px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u362');
  var cols = Array.prototype.slice.call(root.querySelectorAll('.u362-col')), al = root.querySelector('.u362-al'), left = root.querySelector('.u362-left');
  var AP = ['AM', 'PM'];
  var DATA = [AP, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []];
  for (var m = 0; m < 60; m += 5) DATA[2].push(String(m).padStart(2, '0'));
  var IH = 36, sel = [0, 6, 6];
  cols.forEach(function (c, ci) {
    var ul = c.querySelector('ul');
    DATA[ci].forEach(function (v, k) { var li = document.createElement('li'); li.textContent = v; li.setAttribute('role', 'option'); ul.appendChild(li); });
    var raf = 0, t = 0;
    c.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; bend(c, ci); });
      clearTimeout(t);
      t = setTimeout(function () { pick(c, ci); }, 120);
    }, { passive: true });
    c.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      c.scrollTo({ top: Math.max(0, Math.min(DATA[ci].length - 1, sel[ci] + d)) * IH, behavior: 'smooth' });
    });
  });
  // 가운데에서 멀수록 원통 뒤로 넘어가듯 기울이고 흐리게 합니다
  function bend(c, ci) {
    var mid = c.scrollTop + 108;
    Array.prototype.forEach.call(c.querySelectorAll('li'), function (li, k) {
      var d = (k * IH + 90 + 18 - mid) / IH, a = Math.max(-80, Math.min(80, d * 22));
      li.style.transform = 'rotateX(' + (-a).toFixed(1) + 'deg) translateZ(' + (-Math.abs(d) * 4).toFixed(1) + 'px)';
      li.style.opacity = Math.max(0.15, 1 - Math.abs(d) * 0.28).toFixed(2);
    });
  }
  function pick(c, ci) {
    var k = Math.max(0, Math.min(DATA[ci].length - 1, Math.round(c.scrollTop / IH)));
    sel[ci] = k;
    Array.prototype.forEach.call(c.querySelectorAll('li'), function (li, j) { li.setAttribute('aria-selected', String(j === k)); });
    text();
  }
  function text() {
    var hour = DATA[1][sel[1]], mm = DATA[2][sel[2]];
    al.textContent = 'Alarm ' + hour + ':' + mm + ' ' + AP[sel[0]];
    var target = (hour % 12 + (sel[0] ? 12 : 0)) * 60 + (+mm), now = 22 * 60 + 40, diff = (target - now + 1440) % 1440;
    var h = Math.floor(diff / 60), m = diff % 60;
    left.textContent = 'Rings in ' + h + ' h ' + m + ' min';
  }
  // 처음 값: 오전 7:30
  [0, 6, 6].forEach(function (k, ci) { cols[ci].scrollTop = k * IH; bend(cols[ci], ci); pick(cols[ci], ci); });
})();
  })();

  scope.ready();
  return scope.controller;
}
