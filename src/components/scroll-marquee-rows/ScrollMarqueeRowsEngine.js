// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountScrollMarqueeRows(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u394">
  <div class="u394-sc" tabindex="0" aria-label="Moving text rows, scroll to change their speed"><div class="u394-run"><div class="u394-st" aria-hidden="true"></div></div></div>
  <span class="u394-hint" aria-hidden="true">Scroll to change the speed</span>
</div>
`,
      css: `

.u394{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:28px;background:var(--ux-ink);box-shadow:0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;color:var(--ux-page)}
.u394-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u394-sc::-webkit-scrollbar{display:none}
.u394-run{height:2400px}
.u394-st{position:sticky;top:0;height:330px;display:flex;flex-direction:column;justify-content:center;gap:8px;overflow:hidden}
.u394-row{display:flex;white-space:nowrap;will-change:transform}
.u394-row span{flex:none;padding-right:.3em;font-size:52px;line-height:1.05;font-weight:900;letter-spacing:-.04em}
.u394-row:nth-child(2) span{font-size:30px;font-weight:800;color:var(--ux-accent);letter-spacing:-.03em}
.u394-row:nth-child(3) span{color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--ux-page) 70%,transparent)}
.u394-hint{position:absolute;left:0;right:0;bottom:16px;text-align:center;font-size:11.5px;font-weight:750;color:color-mix(in srgb,var(--ux-page) 50%,transparent)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u394');
  var sc = root.querySelector('.u394-sc'), st = root.querySelector('.u394-st');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ROWS = ['DESIGN · MOTION · CODE · ', 'Interfaces that speak in motion · ', 'SOLEN DESIGN · 2026 · '];
  var rows = ROWS.map(function (t, i) {
    var r = document.createElement('div');
    r.className = 'u394-row';
    for (var k = 0; k < 4; k++) { var s = document.createElement('span'); s.textContent = t; r.appendChild(s); }
    st.appendChild(r);
    return { el: r, x: -Math.random() * 200, dir: i % 2 ? 1 : -1, w: 0 };
  });
  st.setAttribute('aria-label', ROWS.join(' '));
  var lastY = 0, boost = 0, sign = 1, last = 0, vis = true, skew = 0;
  sc.addEventListener('scroll', function () {
    var dy = sc.scrollTop - lastY;
    lastY = sc.scrollTop;
    boost = Math.min(40, boost + Math.abs(dy) * 0.25);
    if (dy) sign = dy > 0 ? 1 : -1;
  }, { passive: true });
  // 기본 흐름(초당 30px)에 스크롤 속도를 더하고, 스크롤 방향에 따라 흐름을 뒤집습니다
  function frame(now) {
    if (!root.isConnected) return;
    var dt = Math.max(0, Math.min(50, now - (last || now))) / 16.7;
    last = now;
    boost *= Math.pow(0.92, dt);
    skew += ((boost > 1 ? sign * Math.min(8, boost * 0.35) : 0) - skew) * 0.15 * dt;
    rows.forEach(function (r) {
      if (!r.w) r.w = r.el.firstChild.offsetWidth;
      r.x += r.dir * sign * (0.5 + boost) * dt;
      if (r.x < -r.w) r.x += r.w;
      if (r.x > 0) r.x -= r.w;
      r.el.style.transform = 'translateX(' + r.x.toFixed(1) + 'px) skewX(' + (-skew * r.dir).toFixed(2) + 'deg)';
    });
    if (vis && !rm) requestAnimationFrame(frame);
  }
  new IntersectionObserver(function (en) { var was = vis; vis = en[0].isIntersecting; if (vis && !was) requestAnimationFrame(frame); }).observe(root);
  requestAnimationFrame(frame);
})();
  })();

  scope.ready();
  return scope.controller;
}
