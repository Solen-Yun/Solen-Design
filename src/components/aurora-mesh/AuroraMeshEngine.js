// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountAuroraMesh(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u319">
  <canvas width="72" height="72" aria-hidden="true"></canvas>
  <div class="u319-gr" aria-hidden="true"></div>
  <div class="u319-pl" role="group" aria-label="Palette"></div>
  <div class="u319-tx"><small>Living background</small><b>Light at dawn</b><span>The light drifts slowly after your cursor</span></div>
</div>
`,
      css: `

.u319{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#050B1F;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#fff}
.u319 canvas{position:absolute;inset:-8%;width:116%;height:116%;filter:blur(18px) saturate(1.15)}
.u319-gr{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;pointer-events:none}
.u319-pl{position:absolute;right:14px;top:14px;display:flex;gap:6px;padding:5px;border-radius:999px;background:rgba(255,255,255,.12);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.u319-p{width:24px;height:24px;border:0;padding:0;border-radius:50%;background:var(--g);box-shadow:0 0 0 2px transparent;transition:box-shadow .25s,transform .3s var(--ux-spring)}
.u319-p[aria-pressed="true"]{box-shadow:0 0 0 2px #fff;transform:scale(1.08)}
.u319-p:focus-visible{outline:2px solid #fff;outline-offset:3px}
.u319-tx{position:absolute;left:22px;bottom:22px;right:22px;pointer-events:none}
.u319-tx small{font-size:11.5px;font-weight:750;letter-spacing:.02em;opacity:.8}
.u319-tx b{display:block;margin-top:8px;font-size:30px;font-weight:880;letter-spacing:-.04em;line-height:1.05;text-shadow:0 2px 24px rgba(0,0,0,.25)}
.u319-tx span{display:block;margin-top:6px;font-size:13px;opacity:.85}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u319');
  var cv = root.querySelector('canvas'), cx = cv.getContext('2d'), pl = root.querySelector('.u319-pl'), gr = root.querySelector('.u319-gr');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PAL = [['Aurora', '#050B1F', ['#00F5A0', '#00D9F5', '#7B61FF', '#24FE41', '#2EC5FF']], ['Sunset', '#1A0B1F', ['#FF6B6B', '#FFD93D', '#FF8E3C', '#C44569', '#F8B500']], ['Ocean', '#031926', ['#00A8E8', '#007EA7', '#00F5D4', '#3A86FF', '#80FFDB']]];
  var S = 72;
  function rgb(h) { var n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  // 지금 색과 목표 색을 따로 두고 매 프레임 조금씩 다가가 팔레트가 녹아들 듯 바뀝니다
  var col = PAL[0][2].map(rgb), bg = rgb(PAL[0][1]), tCol = col.map(function (c) { return c.slice(); }), tBg = bg.slice();
  var B = [0, 1, 2, 3, 4].map(function (i) { return { bx: 0.2 + (i * 0.37) % 0.7, by: 0.25 + (i * 0.53) % 0.6, x: 0.5, y: 0.5, r: 0.38 + (i % 3) * 0.08, ph: i * 1.7, sp: 0.18 + i * 0.03 }; });
  var ptr = null, follow = { x: 0.5, y: 0.5 };
  PAL.forEach(function (p, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u319-p';
    b.style.setProperty('--g', 'linear-gradient(135deg,' + p[2][0] + ',' + p[2][2] + ')');
    b.setAttribute('aria-label', p[0]); b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(pl.children, function (x, k) { x.setAttribute('aria-pressed', String(k === i)); });
      tCol = p[2].map(rgb); tBg = rgb(p[1]);
      if (rm) { col = tCol.map(function (c) { return c.slice(); }); bg = tBg.slice(); draw(0); }
    });
    pl.appendChild(b);
  });
  // 필름 결: 작은 무작위 점 그림을 한 번 만들어 배경 무늬로 깝니다
  (function () {
    var n = document.createElement('canvas'); n.width = n.height = 96; var c = n.getContext('2d'), d = c.createImageData(96, 96);
    for (var i = 0; i < d.data.length; i += 4) { var v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    c.putImageData(d, 0, 0); gr.style.backgroundImage = 'url(' + n.toDataURL() + ')';
  })();
  function mix(a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; }
  function draw(t) {
    cx.globalCompositeOperation = 'source-over';
    cx.fillStyle = 'rgb(' + bg.map(Math.round).join(',') + ')'; cx.fillRect(0, 0, S, S);
    cx.globalCompositeOperation = 'lighter';
    B.forEach(function (b, i) {
      var x = b.bx + Math.sin(t * b.sp + b.ph) * 0.18, y = b.by + Math.cos(t * b.sp * 0.8 + b.ph * 1.3) * 0.16;
      // 커서가 있으면 모든 빛이 그쪽으로 조금 기울고, 첫 빛은 커서를 늦게 따라옵니다
      if (ptr) { x += (ptr.x - x) * 0.18; y += (ptr.y - y) * 0.18; }
      if (i === 0) { x = follow.x; y = follow.y; }
      var c = col[i], g = cx.createRadialGradient(x * S, y * S, 0, x * S, y * S, b.r * S);
      g.addColorStop(0, 'rgba(' + c.map(Math.round).join(',') + ',.85)');
      g.addColorStop(1, 'rgba(' + c.map(Math.round).join(',') + ',0)');
      cx.fillStyle = g; cx.fillRect(0, 0, S, S);
    });
  }
  var vis = true, raf = 0, last = 0, t = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now; t += dt;
    var k = 1 - Math.pow(0.02, dt);
    col = col.map(function (c, i) { return mix(c, tCol[i], k); }); bg = mix(bg, tBg, k);
    var aim = ptr || { x: 0.3 + Math.sin(t * 0.21) * 0.15, y: 0.35 + Math.cos(t * 0.17) * 0.12 };
    follow.x += (aim.x - follow.x) * (1 - Math.pow(0.15, dt)); follow.y += (aim.y - follow.y) * (1 - Math.pow(0.15, dt));
    draw(t);
    raf = requestAnimationFrame(frame);
  }
  function run() { if (rm) { draw(2); return; } if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  root.addEventListener('pointermove', function (e) { var r = root.getBoundingClientRect(); ptr = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }; if (rm) draw(2); });
  root.addEventListener('pointerleave', function () { ptr = null; });
  run();
})();
  })();

  scope.ready();
  return scope.controller;
}
