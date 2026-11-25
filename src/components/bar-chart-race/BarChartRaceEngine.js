// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountBarChartRace(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u246">
  <div class="u246-hd"><b>Drink sales ranking</b><span>Unit: 10k cups</span></div>
  <div class="u246-yr" aria-live="polite"></div>
  <div class="u246-ch"></div>
  <div class="u246-ct">
    <button type="button" class="u246-pp"><svg class="u246-pa" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.6" height="12" rx="1" fill="currentColor"/><rect x="8.4" y="1" width="3.6" height="12" rx="1" fill="currentColor"/></svg><svg class="u246-pl" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9.5-5.5z" fill="currentColor"/></svg></button>
    <div class="u246-sl" role="slider" tabindex="0" aria-label="Year" aria-valuemin="2019" aria-valuemax="2026"><div class="u246-fl"></div><div class="u246-th"></div></div>
  </div>
</div>
`,
      css: `

.u246{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u246-hd{position:absolute;left:20px;right:20px;top:18px;display:flex;justify-content:space-between;align-items:baseline}
.u246-hd b{font-size:14px;font-weight:900}
.u246-hd span{font-size:10.5px;font-weight:700;color:var(--ux-ink-3)}
.u246-yr{position:absolute;right:18px;bottom:56px;font-size:58px;font-weight:900;letter-spacing:-.05em;line-height:1;color:var(--ux-ink);opacity:.1;font-variant-numeric:tabular-nums;pointer-events:none}
.u246-ch{position:absolute;left:16px;right:20px;top:48px;height:228px;overflow:hidden}
.u246-r{position:absolute;left:0;right:0;top:0;height:30px;display:flex;align-items:center;will-change:transform}
.u246-r b{flex:none;width:78px;padding-right:8px;text-align:right;font-size:11.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u246-bar{flex:none;height:24px;border-radius:7px;background:var(--c);box-shadow:inset 0 -3px 0 rgba(0,0,0,.12)}
.u246-v{margin-left:6px;font-size:11px;font-weight:800;color:var(--ux-ink-2);font-variant-numeric:tabular-nums}
.u246-ct{position:absolute;left:20px;right:20px;bottom:18px;display:flex;align-items:center;gap:12px}
.u246-pp{flex:none;width:34px;height:34px;border:0;border-radius:50%;background:var(--ux-ink);color:var(--ux-surface);display:grid;place-items:center;cursor:pointer}
.u246-pp svg{width:14px;height:14px}
.u246-pp .u246-pl{display:none}
.u246-pp.is-paused .u246-pl{display:block}
.u246-pp.is-paused .u246-pa{display:none}
.u246-pp:focus-visible{outline:2px solid var(--ux-accent);outline-offset:3px}
.u246-sl{position:relative;flex:1;height:34px;cursor:pointer;touch-action:none;border-radius:8px}
.u246-sl::before{content:"";position:absolute;left:0;right:0;top:15px;height:4px;border-radius:2px;background:var(--ux-line)}
.u246-fl{position:absolute;left:0;top:15px;height:4px;border-radius:2px;background:var(--ux-accent)}
.u246-tk{position:absolute;top:24px;width:1px;height:4px;background:var(--ux-ink-3);opacity:.5}
.u246-th{position:absolute;top:9px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--ux-surface);box-shadow:0 0 0 3px var(--ux-accent),0 4px 10px -3px var(--ux-shadow-strong)}
.u246-sl:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u246');
  var ch = root.querySelector('.u246-ch'), yr = root.querySelector('.u246-yr'), pp = root.querySelector('.u246-pp'), sl = root.querySelector('.u246-sl'), fl = root.querySelector('.u246-fl'), th = root.querySelector('.u246-th');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NAMES = ['Americano', 'Latte', 'Cold brew', 'Matcha latte', 'Milk tea', 'Lemonade', 'Grapefruit', 'Vanilla latte'];
  var COL = ['#6366F1', '#F59E0B', '#10B981', '#84CC16', '#A855F7', '#EAB308', '#F43F5E', '#0EA5E9'];
  // 해마다의 판매량(예시 값). 콜드브루와 말차라테가 해마다 치고 올라옵니다
  var V = [[120, 128, 135, 140, 146, 150, 153, 156], [95, 100, 104, 108, 110, 112, 113, 115], [20, 38, 60, 82, 104, 121, 138, 152], [30, 34, 45, 63, 80, 102, 118, 130], [70, 75, 72, 66, 62, 58, 55, 52], [50, 48, 52, 56, 58, 60, 57, 55], [40, 55, 64, 68, 66, 63, 60, 56], [60, 63, 66, 70, 74, 79, 86, 98]];
  var Y0 = 2019, N = 8, SHOW = 6, RH = 37, BW = 172, SPY = 1.5;
  var t = rm ? N - 1 : 0, playing = !rm, drag = false, hold = 0, R = [], scale = 160;
  for (var k = 0; k < N; k++) { var tk = document.createElement('i'); tk.className = 'u246-tk'; tk.style.left = (k / (N - 1) * 100) + '%'; sl.appendChild(tk); }
  NAMES.forEach(function (n, i) {
    var r = document.createElement('div'); r.className = 'u246-r'; r.style.setProperty('--c', COL[i]);
    r.innerHTML = '<b>' + n + '</b><span class="u246-bar"></span><span class="u246-v"></span>';
    ch.appendChild(r); R.push({ el: r, bar: r.querySelector('.u246-bar'), v: r.querySelector('.u246-v'), y: SHOW * RH, o: 0 });
  });
  function val(i) { var a = Math.floor(t), b = Math.min(N - 1, a + 1), f = t - a; return V[i][a] + (V[i][b] - V[i][a]) * f; }
  function setPlay(p) { playing = p; pp.classList.toggle('is-paused', !p); pp.setAttribute('aria-label', p ? 'Pause' : 'Play'); }
  // 한 프레임: 지금 값으로 순위를 매기고, 각 줄은 제 순위 자리로 부드럽게 미끄러집니다
  function paint(dt, snap) {
    var vals = NAMES.map(function (n, i) { return val(i); });
    var order = vals.map(function (v, i) { return i; }).sort(function (a, b) { return vals[b] - vals[a]; });
    var mx = vals[order[0]] * 1.08; scale += snap ? mx - scale : (mx - scale) * Math.min(1, dt * 4);
    order.forEach(function (i, rank) {
      var o = R[i], ty = rank < SHOW ? rank * RH : SHOW * RH + 8, to = rank < SHOW ? 1 : 0, k = snap ? 1 : Math.min(1, dt * (drag ? 16 : 10));
      o.y += (ty - o.y) * k; o.o += (to - o.o) * k;
      o.el.style.transform = 'translateY(' + o.y.toFixed(1) + 'px)'; o.el.style.opacity = o.o.toFixed(2); o.el.style.zIndex = 10 - rank;
      o.bar.style.width = Math.max(4, vals[i] / scale * BW).toFixed(1) + 'px'; o.v.textContent = Math.round(vals[i]);
    });
    var y = Y0 + Math.floor(t + 1e-4); if (yr.textContent !== String(y)) yr.textContent = y;
    var p = t / (N - 1) * 100; fl.style.width = p + '%'; th.style.left = p + '%';
    sl.setAttribute('aria-valuenow', y); sl.setAttribute('aria-valuetext', y + '');
  }
  var raf = 0, last = 0, vis = true;
  function frame(now) {
    raf = 0;
    if (!root.isConnected || !vis) return;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
    if (playing && !drag) {
      if (t >= N - 1) { hold += dt; if (hold > 1.6) { t = 0; hold = 0; } }
      else t = Math.min(N - 1, t + dt / SPY);
    }
    paint(dt, rm);
    raf = requestAnimationFrame(frame);
  }
  function run() { if (!raf && vis) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; run(); }).observe(root);
  function seek(x) { var r = sl.getBoundingClientRect(); t = Math.max(0, Math.min(1, (x - r.left) / r.width)) * (N - 1); hold = 0; }
  sl.addEventListener('pointerdown', function (e) { drag = true; setPlay(false); try { sl.setPointerCapture(e.pointerId); } catch (er) {} seek(e.clientX); run(); });
  sl.addEventListener('pointermove', function (e) { if (drag) seek(e.clientX); });
  function up() { drag = false; }
  sl.addEventListener('pointerup', up); sl.addEventListener('pointercancel', up);
  sl.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
    if (e.key === 'Home') t = 0; else if (e.key === 'End') t = N - 1; else if (d) t = Math.max(0, Math.min(N - 1, Math.round(t) + d)); else return;
    e.preventDefault(); setPlay(false); run();
  });
  pp.addEventListener('click', function () { if (!playing && t >= N - 1) t = 0; setPlay(!playing); run(); });
  setPlay(playing); paint(0, true); run();
})();
  })();

  scope.ready();
  return scope.controller;
}
