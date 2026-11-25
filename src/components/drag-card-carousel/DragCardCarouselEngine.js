// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDragCardCarousel(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u339">
  <div class="u339-hd"><b>Popular templates this week</b><button type="button" class="u339-pv" aria-label="Previous card"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2.5L4.5 7 9 11.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button type="button" class="u339-nx" aria-label="Next card"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2.5L9.5 7 5 11.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
  <div class="u339-tr" tabindex="0" aria-label="Template list, drag sideways to browse"><div class="u339-rw"></div></div>
  <div class="u339-pg" aria-hidden="true"><i></i></div>
</div>
`,
      css: `

.u339{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u339-hd{position:absolute;left:20px;right:16px;top:20px;display:flex;align-items:center;gap:6px}
.u339-hd b{margin-right:auto;font-size:15px;font-weight:900;letter-spacing:-.025em}
.u339-hd button{width:32px;height:32px;border:0;border-radius:50%;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink);display:grid;place-items:center;cursor:pointer;transition:opacity .2s,transform .15s}
.u339-hd button:active{transform:scale(.92)}
.u339-hd button:disabled{opacity:.35;cursor:default}
.u339-hd button svg{width:14px;height:14px}
.u339-hd button:focus-visible,.u339-tr:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u339-tr{position:absolute;left:0;right:0;top:66px;height:214px;overflow:hidden;cursor:grab;touch-action:pan-y;user-select:none}
.u339-tr.is-drag{cursor:grabbing}
.u339-rw{display:flex;gap:12px;padding:0 20px;will-change:transform}
.u339-cd{flex:none;width:196px;border-radius:18px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 12px 24px -16px var(--ux-shadow-strong);overflow:hidden;transition:transform .3s}
.u339-th{height:132px;position:relative}
.u339-th::before{content:"";position:absolute;left:14px;right:14px;top:16px;height:14px;border-radius:7px;background:rgba(255,255,255,.65)}
.u339-th::after{content:"";position:absolute;left:14px;width:58%;top:40px;height:46px;border-radius:9px;background:rgba(255,255,255,.4)}
.u339-mt{padding:10px 12px}
.u339-mt b{display:block;font-size:13px;font-weight:850}
.u339-mt span{display:flex;justify-content:space-between;margin-top:3px;font-size:10.5px;font-weight:650;color:var(--ux-ink-3)}
.u339-pg{position:absolute;left:20px;right:20px;bottom:24px;height:4px;border-radius:2px;background:var(--ux-line);overflow:hidden}
.u339-pg i{display:block;height:100%;border-radius:2px;background:var(--ux-ink);transition:width .3s,transform .3s}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u339');
  var tr = root.querySelector('.u339-tr'), rw = root.querySelector('.u339-rw'), pv = root.querySelector('.u339-pv'), nx = root.querySelector('.u339-nx'), bar = root.querySelector('.u339-pg i');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var C = [['Startup landing', 'Harin Kim', '2.4k'], ['Portfolio', 'Doyun Lee', '1.9k'], ['Online course', 'Seoyeon Park', '1.6k'], ['Café menu', 'Minjun Choi', '1.2k'], ['Event invite', 'Yuna Jung', '980'], ['Blog', 'Jiho Han', '870']];
  var G = ['linear-gradient(135deg,#818CF8,#C084FC)', 'linear-gradient(135deg,#FDBA74,#F472B6)', 'linear-gradient(135deg,#5EEAD4,#3B82F6)', 'linear-gradient(135deg,#FCD34D,#F97316)', 'linear-gradient(135deg,#F9A8D4,#A78BFA)', 'linear-gradient(135deg,#86EFAC,#14B8A6)'];
  C.forEach(function (c, i) { var d = document.createElement('div'); d.className = 'u339-cd'; d.innerHTML = '<div class="u339-th" style="background:' + G[i] + '"></div><div class="u339-mt"><b></b><span><span></span><span>♥ ' + c[2] + '</span></span></div>'; d.querySelector('b').textContent = c[0]; d.querySelector('.u339-mt>span>span').textContent = c[1]; rw.appendChild(d); });
  // 카드 196 + 간격 12 = 한 칸, 마지막 카드 오른쪽 끝이 여백 20에 닿는 곳까지만 갑니다
  var STEP = 208, x = 0, tw = 0, maxX = Math.max(0, C.length * STEP - 12 + 40 - 340);
  function paint() {
    rw.style.transform = 'translateX(' + (-x).toFixed(1) + 'px)';
    var p = maxX ? x / maxX : 0; bar.style.width = (100 / C.length * 2) + '%'; bar.style.transform = 'translateX(' + (p * (C.length / 2 - 1) * 100) + '%)';
    pv.disabled = x <= 1; nx.disabled = x >= maxX - 1;
  }
  // x를 목표 위치로 부드럽게 옮깁니다
  function glide(to) {
    to = Math.max(0, Math.min(maxX, to)); cancelAnimationFrame(tw);
    if (rm) { x = to; paint(); return; }
    var from = x, t0 = performance.now(), d = Math.min(650, 260 + Math.abs(to - from) * 0.9);
    (function f(now) { var k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3); x = from + (to - from) * e; paint(); if (k < 1) tw = requestAnimationFrame(f); })(t0);
  }
  function snap(v) { var target = x + v * 0.28; return Math.round(target / STEP) * STEP; }
  var drag = null;
  tr.addEventListener('pointerdown', function (e) { cancelAnimationFrame(tw); drag = { sx: e.clientX, x0: x, k: 340 / tr.getBoundingClientRect().width, h: [[performance.now(), e.clientX]] }; tr.classList.add('is-drag'); try { tr.setPointerCapture(e.pointerId); } catch (er) {} });
  tr.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var d = (drag.sx - e.clientX) * drag.k, nxv = drag.x0 + d;
    // 끝을 넘어가면 고무줄처럼 덜 따라옵니다
    if (nxv < 0) nxv = nxv / 3; else if (nxv > maxX) nxv = maxX + (nxv - maxX) / 3;
    x = nxv; paint(); drag.h.push([performance.now(), e.clientX]); if (drag.h.length > 6) drag.h.shift();
  });
  function up() {
    if (!drag) return;
    var h = drag.h, a = h[0], b = h[h.length - 1], dt = (b[0] - a[0]) / 1000, v = dt > 0.01 ? -(b[1] - a[1]) * drag.k / dt : 0;
    drag = null; tr.classList.remove('is-drag'); glide(snap(Math.max(-1800, Math.min(1800, v))));
  }
  tr.addEventListener('pointerup', up); tr.addEventListener('pointercancel', up);
  pv.addEventListener('click', function () { glide(Math.round(x / STEP) * STEP - STEP); });
  nx.addEventListener('click', function () { glide(Math.round(x / STEP) * STEP + STEP); });
  tr.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); nx.click(); } if (e.key === 'ArrowLeft') { e.preventDefault(); pv.click(); } });
  paint();
})();
  })();

  scope.ready();
  return scope.controller;
}
