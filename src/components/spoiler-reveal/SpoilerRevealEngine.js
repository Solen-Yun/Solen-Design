// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSpoilerReveal(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u396">
  <p class="u396-b"><small>Minji</small>Did you see that movie? At the end <span class="u396-sp" tabindex="0" role="button" aria-label="Spoiler, tap to show">the detective was the killer all along</span>. Gave me chills.</p>
  <p class="u396-b me">I haven’t seen it yet!! Just tell me one thing. <span class="u396-sp" tabindex="0" role="button" aria-label="Spoiler, tap to show">Is there a post-credits scene?</span></p>
  <button class="u396-hide" type="button">Hide again</button>
  <canvas class="u396-cv" aria-hidden="true"></canvas>
</div>
`,
      css: `

.u396{--ux-ease:cubic-bezier(.22,1,.36,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;flex-direction:column;gap:10px;padding:18px 16px 14px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u396-b{position:relative;max-width:88%;margin:0;padding:11px 14px;border-radius:20px 20px 20px 6px;background:var(--ux-surface-2);font-size:14.5px;line-height:1.6;font-weight:550}
.u396-b small{display:block;font-size:11.5px;font-weight:750;color:var(--ux-ink-3)}
.u396-b.me{align-self:flex-end;border-radius:20px 20px 6px 20px;background:var(--ux-accent);color:var(--ux-accent-ink)}
.u396-sp{position:relative;border-radius:4px;color:transparent;cursor:pointer;outline:none;transition:color .5s var(--ux-ease) .1s}
.u396-sp:focus-visible{box-shadow:0 0 0 2px var(--ux-accent)}
.u396-sp.open{color:inherit;cursor:text}
.u396-cv{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.u396-hide{align-self:center;margin-top:auto;height:34px;padding:0 14px;border:0;border-radius:999px;background:var(--ux-surface-2);font-size:12.5px;font-weight:750;color:var(--ux-ink-2)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u396');
  var cv = root.querySelector('.u396-cv'), ctx = cv.getContext('2d');
  var sps = Array.prototype.slice.call(root.querySelectorAll('.u396-sp'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, parts = [], vis = true;
  function size() { W = root.offsetWidth; H = root.offsetHeight; cv.width = W * dpr; cv.height = H * dpr; }
  // 구절이 걸친 줄마다 상자를 잡고(배율을 되돌린 px), 그 안에 입자를 뿌립니다
  function boxes(sp) {
    var rr = root.getBoundingClientRect(), k = W / (rr.width || 1);
    return Array.prototype.map.call(sp.getClientRects(), function (r) { return { x: (r.left - rr.left) * k, y: (r.top - rr.top) * k + 2, w: r.width * k, h: r.height * k - 4 }; });
  }
  function seed(sp, i) {
    var light = sp.closest('.me');
    boxes(sp).forEach(function (b) {
      var n = Math.round(b.w * b.h / 9);
      for (var j = 0; j < n; j++) {
        var x = b.x + Math.random() * b.w, y = b.y + Math.random() * b.h;
        parts.push({ s: i, hx: x, hy: y, x: x, y: y, vx: 0, vy: 0, a: Math.random(), r: 0.6 + Math.random() * 0.9, out: false, lt: light });
      }
    });
  }
  function build() { parts = []; size(); sps.forEach(function (sp, i) { if (!sp.classList.contains('open')) seed(sp, i); }); }
  function frame(t) {
    if (!root.isConnected) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var dark = getComputedStyle(root).color;
    parts.forEach(function (p) {
      if (p.out) { p.x += p.vx; p.y += p.vy; p.vx *= 0.94; p.vy *= 0.94; p.a -= 0.025; }
      else if (p.back) { p.x += (p.hx - p.x) * 0.12; p.y += (p.hy - p.y) * 0.12; if (Math.abs(p.hx - p.x) < 0.5) p.back = false; }
      else { p.x = p.hx + Math.sin(t / 300 + p.hy) * 0.8; p.y = p.hy + Math.cos(t / 260 + p.hx) * 0.8; p.a = 0.45 + 0.55 * Math.abs(Math.sin(t / 400 + p.hx * 3)); }
      if (p.a <= 0) return;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.a));
      ctx.fillStyle = p.lt ? '#fff' : dark;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    });
    parts = parts.filter(function (p) { return !p.out || p.a > 0; });
    if (vis) requestAnimationFrame(frame);
  }
  function reveal(sp, cx, cy) {
    var i = sps.indexOf(sp);
    if (sp.classList.contains('open')) return;
    sp.classList.add('open');
    sp.removeAttribute('role'); sp.removeAttribute('aria-label'); sp.removeAttribute('tabindex');
    parts.forEach(function (p) {
      if (p.s !== i) return;
      var dx = p.x - cx, dy = p.y - cy, d = Math.max(4, Math.hypot(dx, dy));
      p.out = true; p.vx = dx / d * (2 + Math.random() * 3); p.vy = dy / d * (2 + Math.random() * 3) - 0.5;
      if (rm) p.a = 0;
    });
  }
  sps.forEach(function (sp) {
    sp.addEventListener('click', function (e) {
      var rr = root.getBoundingClientRect(), k = W / (rr.width || 1);
      var b = boxes(sp)[0];
      var cx = e.detail === 0 ? b.x + b.w / 2 : (e.clientX - rr.left) * k, cy = e.detail === 0 ? b.y + b.h / 2 : (e.clientY - rr.top) * k;
      reveal(sp, cx, cy);
    });
    sp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sp.click(); } });
  });
  root.querySelector('.u396-hide').addEventListener('click', function () {
    sps.forEach(function (sp, i) {
      if (!sp.classList.contains('open')) return;
      sp.classList.remove('open');
      sp.setAttribute('role', 'button'); sp.setAttribute('tabindex', '0'); sp.setAttribute('aria-label', 'Spoiler, tap to show');
      var start = parts.length;
      seed(sp, i);
      // 새로 뿌린 입자는 바깥에서 모여들며 덮습니다
      parts.slice(start).forEach(function (p) { var a = Math.random() * Math.PI * 2; p.x = p.hx + Math.cos(a) * 60; p.y = p.hy + Math.sin(a) * 60; p.back = !rm; if (rm) { p.x = p.hx; p.y = p.hy; } });
    });
  });
  new IntersectionObserver(function (en) { var was = vis; vis = en[0].isIntersecting; if (vis && !was) requestAnimationFrame(frame); }).observe(root);
  requestAnimationFrame(function () { build(); requestAnimationFrame(frame); });
})();
  })();

  scope.ready();
  return scope.controller;
}
