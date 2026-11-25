// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountProximityWeight(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u357">
  <div class="u357-tx" aria-hidden="true"></div>
  <button type="button" class="u357-hit" aria-label="Headline that thickens near the cursor, press to flip the mode"></button>
  <div class="u357-md" aria-live="polite"></div>
</div>
`,
      css: `

.u357{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#101014;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#F4F1EA}
.u357-tx{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0;pointer-events:none;font-family:system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic",sans-serif}
.u357-ln{display:flex;justify-content:center}
.u357-c{display:inline-block;text-align:center;font-size:40px;line-height:1.18;letter-spacing:-.02em;font-weight:var(--w,400);transform:scale(var(--s,1));color:hsl(40 30% calc(60% + var(--k,0) * 36%))}
.u357-hit{position:absolute;inset:0;border:0;padding:0;background:transparent;cursor:crosshair;border-radius:inherit}
.u357-hit:focus-visible{outline:2px solid #F4F1EA;outline-offset:-6px}
.u357-md{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);padding:4px 11px;border-radius:999px;background:rgba(244,241,234,.1);font-size:11px;font-weight:750;color:rgba(244,241,234,.75);pointer-events:none}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u357');
  var tx = root.querySelector('.u357-tx'), hit = root.querySelector('.u357-hit'), md = root.querySelector('.u357-md');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LINES = ['Come closer', 'and letters', 'breathe deep'];
  var C = [];
  LINES.forEach(function (l) {
    var ln = document.createElement('div'); ln.className = 'u357-ln'; tx.appendChild(ln);
    l.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'u357-c'; s.textContent = ch === ' ' ? ' ' : ch; ln.appendChild(s); C.push({ el: s, w: 400, tw: 400, k: 0, x: 0, y: 0 }); });
  });
  hit.setAttribute('aria-description', LINES.join(' '));
  // 글자 칸 폭을 가장 굵을 때(900) 기준으로 고정해 두면 굵기가 바뀌어도 줄이 흔들리지 않습니다
  function measure() {
    var rb = root.getBoundingClientRect(), k = root.offsetWidth / (rb.width || 1);
    C.forEach(function (c) { c.el.style.width = ''; c.el.style.setProperty('--w', 900); });
    C.forEach(function (c) { c.el.style.width = Math.ceil(c.el.getBoundingClientRect().width * k * 0.94) + 'px'; });
    C.forEach(function (c) { c.el.style.setProperty('--w', Math.round(c.w)); var r = c.el.getBoundingClientRect(); c.x = (r.left + r.width / 2 - rb.left) * k; c.y = (r.top + r.height / 2 - rb.top) * k; });
  }
  var ptr = null, inv = false, raf = 0, last = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)), busy = false; last = now;
    C.forEach(function (c) {
      // 거리 0~110px 사이에서 부드럽게(코사인) 영향이 줄어듭니다
      var f = 0;
      if (ptr) { var d = Math.hypot(c.x - ptr.x, (c.y - ptr.y) * 1.3); f = d < 110 ? 0.5 + 0.5 * Math.cos(d / 110 * Math.PI) : 0; }
      var tw = inv ? 800 - f * 700 : 300 + f * 600, tk = inv ? 1 - f : f;
      var a = rm ? 1 : Math.min(1, dt * (ptr ? 14 : 4));
      c.w += (tw - c.w) * a; c.k += (tk - c.k) * a;
      if (Math.abs(tw - c.w) > 1) busy = true;
      c.el.style.setProperty('--w', Math.round(c.w / 10) * 10);
      c.el.style.setProperty('--s', (1 + (inv ? (1 - f) : f) * 0.12).toFixed(3));
      c.el.style.setProperty('--k', c.k.toFixed(3));
    });
    if (busy) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  root.addEventListener('pointermove', function (e) { var b = root.getBoundingClientRect(), k = root.offsetWidth / (b.width || 1); ptr = { x: (e.clientX - b.left) * k, y: (e.clientY - b.top) * k }; kick(); });
  root.addEventListener('pointerleave', function () { ptr = null; kick(); });
  hit.addEventListener('click', function () { inv = !inv; md.textContent = inv ? 'Lighter near' : 'Bolder near'; C.forEach(function (c) { if (!ptr) c.w = inv ? 800 : 300; }); kick(); });
  md.textContent = 'Bolder near';
  C.forEach(function (c) { c.w = 300; });
  measure(); kick();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (root.isConnected) measure(); });
})();
  })();

  scope.ready();
  return scope.controller;
}
