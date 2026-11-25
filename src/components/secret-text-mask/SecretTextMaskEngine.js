// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSecretTextMask(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u346">
  <div class="u346-l u346-a" aria-hidden="true"></div>
  <div class="u346-l u346-b" aria-hidden="true"></div>
  <div class="u346-ring" aria-hidden="true"></div>
  <button type="button" class="u346-hit" aria-label="Find the hidden sentence, press to reveal it all"></button>
</div>
`,
      css: `

.u346{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#F5F1E8;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);cursor:none}
.u346-l{position:absolute;inset:0;padding:30px 26px;display:flex;flex-direction:column;justify-content:center;gap:2px;font-size:56px;line-height:1.06;font-weight:900;letter-spacing:-.04em;word-break:keep-all;pointer-events:none}
.u346-a{color:#1D1A16}
.u346-b{background:#1D1A16;color:#FFD43B;clip-path:ellipse(var(--rx,0px) var(--ry,0px) at var(--x,170px) var(--y,170px))}
.u346-b span:nth-child(2n){color:#FF8787}
.u346-hit{position:absolute;inset:0;border:0;padding:0;background:transparent;cursor:none;border-radius:inherit}
.u346-hit:focus-visible{outline:2px solid #1D1A16;outline-offset:-6px}
.u346-ring{position:absolute;left:0;top:0;border-radius:50%;box-shadow:0 0 0 1.5px rgba(255,212,59,.9);pointer-events:none;opacity:0;transition:opacity .2s}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u346');
  var la = root.querySelector('.u346-a'), lb = root.querySelector('.u346-b'), ring = root.querySelector('.u346-ring'), hit = root.querySelector('.u346-hit');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A = ['Even', 'an ordinary', 'button', 'hides a story'];
  var B = ['Tiny', 'motions', 'can move', 'a heart'];
  A.forEach(function (w) { var s = document.createElement('span'); s.textContent = w; la.appendChild(s); });
  B.forEach(function (w) { var s = document.createElement('span'); s.textContent = w; lb.appendChild(s); });
  hit.setAttribute('aria-description', B.join(' '));
  var pos = { x: 170, y: 170 }, sp = { x: 170, y: 170 }, v = { x: 0, y: 0 }, r = 0, rT = 0, full = false, raf = 0, last = 0;
  // 창은 스프링으로 커서를 따라오고, 빠를수록 움직이는 방향으로 타원처럼 늘어납니다
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.033, Math.max(0, (now - last) / 1000)); last = now;
    if (rm) { sp.x = pos.x; sp.y = pos.y; r = rT; }
    else {
      v.x += ((pos.x - sp.x) * 260 - v.x * 24) * dt; v.y += ((pos.y - sp.y) * 260 - v.y * 24) * dt; sp.x += v.x * dt; sp.y += v.y * dt;
      r += (rT - r) * Math.min(1, dt * (full ? 5 : 12));
    }
    var spd = Math.min(1, Math.hypot(v.x, v.y) / 1600), ang = Math.atan2(v.y, v.x);
    var rx = r * (1 + spd * 0.35 * Math.abs(Math.cos(ang))), ry = r * (1 + spd * 0.35 * Math.abs(Math.sin(ang)));
    lb.style.setProperty('--x', sp.x.toFixed(1) + 'px'); lb.style.setProperty('--y', sp.y.toFixed(1) + 'px'); lb.style.setProperty('--rx', rx.toFixed(1) + 'px'); lb.style.setProperty('--ry', ry.toFixed(1) + 'px');
    ring.style.width = (rx * 2) + 'px'; ring.style.height = (ry * 2) + 'px'; ring.style.transform = 'translate(' + (sp.x - rx).toFixed(1) + 'px,' + (sp.y - ry).toFixed(1) + 'px)';
    ring.style.opacity = !full && r > 4 ? '1' : '0';
    if (Math.abs(pos.x - sp.x) + Math.abs(pos.y - sp.y) > 0.3 || Math.abs(rT - r) > 0.3 || Math.hypot(v.x, v.y) > 2) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function loc(e) { var b = root.getBoundingClientRect(), k = root.offsetWidth / (b.width || 1); return { x: (e.clientX - b.left) * k, y: (e.clientY - b.top) * k }; }
  root.addEventListener('pointermove', function (e) { var q = loc(e); if (!rT && !full) { sp.x = q.x; sp.y = q.y; } pos = q; if (!full) rT = 66; kick(); });
  root.addEventListener('pointerleave', function () { if (!full) { rT = 0; kick(); } });
  hit.addEventListener('click', function (e) { full = !full; if (e.detail) pos = loc(e); rT = full ? 520 : 66; kick(); });
  hit.addEventListener('focus', function () { if (!full && !rT) { pos = { x: 170, y: 170 }; sp.x = 170; sp.y = 170; rT = 66; kick(); } });
  hit.addEventListener('blur', function () { if (!full) { rT = 0; kick(); } });
})();
  })();

  scope.ready();
  return scope.controller;
}
