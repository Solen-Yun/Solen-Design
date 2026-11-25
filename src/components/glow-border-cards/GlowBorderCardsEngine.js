// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountGlowBorderCards(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u228"><div class="u228-gd" role="list" aria-label="Four feature cards"></div></div>
`,
      css: `

.u228{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#0A0B10;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#E9ECF5;padding:18px;--x:-500px;--y:-500px;--o:0}
.u228-gd{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:100%}
.u228-c{position:relative;border-radius:18px;padding:1.5px;background:radial-gradient(160px circle at var(--cx) var(--cy),rgba(132,94,247,calc(var(--o) * 1)),rgba(77,171,247,calc(var(--o) * .5)) 40%,transparent 70%),rgba(255,255,255,.08)}
.u228-in{position:relative;height:100%;border-radius:16.5px;background:radial-gradient(220px circle at var(--cx) var(--cy),rgba(132,94,247,calc(var(--o) * .14)),transparent 60%),#12141C;padding:14px;display:flex;flex-direction:column;gap:6px;overflow:hidden}
.u228-ic{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.u228-ic svg{width:16px;height:16px}
.u228-in b{margin-top:auto;font-size:13.5px;font-weight:800}
.u228-in span{font-size:11px;font-weight:600;color:#8A90A6;word-break:keep-all}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u228');
  var gd = root.querySelector('.u228-gd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CARDS = [['Fast deploys', 'One push, worldwide'], ['Live analytics', 'Numbers that move instantly'], ['Secure auth', 'Sign in without passwords'], ['Auto scaling', 'Handles any rush']];
  var IC = ['<path d="M5 19l7-14 7 14-7-3z" fill="#B197FC"/>', '<path d="M4 18V9M10 18V5M16 18v-6M22 18H2" stroke="#74C0FC" stroke-width="2.2" stroke-linecap="round"/>', '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" fill="#63E6BE"/>', '<path d="M4 14l4-4 4 4 8-8M14 6h6v6" stroke="#FFA94D" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'];
  var C = CARDS.map(function (c, i) {
    var el = document.createElement('div'); el.className = 'u228-c'; el.setAttribute('role', 'listitem');
    el.innerHTML = '<div class="u228-in"><span class="u228-ic"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + IC[i] + '</svg></span><b>' + c[0] + '</b><span>' + c[1] + '</span></div>';
    gd.appendChild(el); return el;
  });
  var p = { x: -500, y: -500 }, o = 0, oT = 0, raf = 0, last = 0;
  // 카드마다 자기 상자 기준 커서 좌표(--cx, --cy)를 넣어, 한 점 조명이 여러 카드를 함께 비추게 합니다
  function apply() {
    var rb = root.getBoundingClientRect(), k = root.offsetWidth / (rb.width || 1);
    C.forEach(function (el) {
      var r = el.getBoundingClientRect(), lx = p.x - (r.left - rb.left) * k, ly = p.y - (r.top - rb.top) * k;
      el.style.setProperty('--cx', lx.toFixed(1) + 'px'); el.style.setProperty('--cy', ly.toFixed(1) + 'px'); el.style.setProperty('--o', o.toFixed(3));
      el.firstChild.style.setProperty('--cx', (lx - 1.5).toFixed(1) + 'px'); el.firstChild.style.setProperty('--cy', (ly - 1.5).toFixed(1) + 'px');
    });
  }
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
    o += (oT - o) * (rm ? 1 : Math.min(1, dt * (oT ? 8 : 2.5)));
    apply();
    if (Math.abs(oT - o) > 0.005) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  root.addEventListener('pointermove', function (e) { var b = root.getBoundingClientRect(), k = root.offsetWidth / (b.width || 1); p = { x: (e.clientX - b.left) * k, y: (e.clientY - b.top) * k }; oT = 1; apply(); kick(); });
  root.addEventListener('pointerleave', function () { oT = 0; kick(); });
  apply();
})();
  })();

  scope.ready();
  return scope.controller;
}
