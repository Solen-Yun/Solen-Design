// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountRidgeline(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u395">
  <div class="u395-hd"><div><b>Daily temperature</b><small>Example city</small></div><div class="u395-sg" role="group" aria-label="Year"><button type="button" class="u395-yb is-on" aria-pressed="true">2005</button><button type="button" class="u395-yb" aria-pressed="false">2025</button></div></div>
  <svg class="u395-sv" viewBox="0 0 300 480"><g class="u395-ax" aria-hidden="true"></g><g class="u395-rs"></g><line class="u395-mn"/><g class="u395-hzs"></g></svg>
  <div class="u395-in" aria-live="polite"></div>
</div>
`,
      css: `

.u395{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u395-hd{position:absolute;left:20px;right:16px;top:16px;display:flex;justify-content:space-between;align-items:center}
.u395-hd b{display:block;font-size:13.5px;font-weight:900}
.u395-hd small{font-size:9.5px;font-weight:700;color:var(--ux-ink-3)}
.u395-sg{display:flex;padding:3px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u395-yb{border:0;padding:4px 10px;border-radius:999px;background:none;color:var(--ux-ink-2);font:inherit;font-size:11px;font-weight:800;cursor:pointer;transition:background .2s,color .2s;font-variant-numeric:tabular-nums}
.u395-yb.is-on{background:var(--ux-ink);color:var(--ux-surface)}
.u395-yb:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u395-sv{position:absolute;left:0;top:0;width:300px;height:480px}
.u395-rd{transition:opacity .25s}
.u395-rd path:first-child{stroke:var(--ux-surface);stroke-width:1.2}
.u395.is-f .u395-rd{opacity:.22}
.u395.is-f .u395-rd.is-hl{opacity:1}
.u395-ml{font-size:10px;font-weight:800;fill:var(--ux-ink-2);text-anchor:end}
.u395-tk{font-size:9px;font-weight:700;fill:var(--ux-ink-3);text-anchor:middle;font-variant-numeric:tabular-nums}
.u395-hz{fill:transparent;cursor:default}
.u395-mn{stroke:var(--ux-ink);stroke-width:1.6;stroke-dasharray:3 3;opacity:0;transition:opacity .2s}
.u395-in{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);padding:6px 12px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:10.5px;font-weight:800;white-space:nowrap;font-variant-numeric:tabular-nums}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u395');
  var rs = root.querySelector('.u395-rs'), hzs = root.querySelector('.u395-hzs'), ax = root.querySelector('.u395-ax'), mn = root.querySelector('.u395-mn'), info = root.querySelector('.u395-in'), ybs = root.querySelectorAll('.u395-yb');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // 달마다 평균과 퍼짐(예시 값). 2025년은 대부분 달이 1~2도 따뜻합니다
  var MEAN = [[-3, -1, 5, 12, 17, 22, 25, 26, 21, 14, 6, -1], [-1.5, 1, 7, 13.5, 19, 23.5, 26.8, 27.5, 23, 15.5, 7.5, 0.5]];
  var SD = [4, 4.2, 4.5, 4, 3.5, 3, 2.4, 2.4, 3, 3.6, 4, 4.2];
  var X0 = 52, X1 = 284, T0 = -16, T1 = 36, B0 = 116, STEP = 25, HMAX = 54, NS = 70;
  var cur = MEAN[0].slice(), grow = MON.map(function () { return rm ? 1 : 0; }), hov = -1, R = [];
  function xOf(t) { return X0 + (t - T0) / (T1 - T0) * (X1 - X0); }
  function g(x, m, s) { return Math.exp(-(x - m) * (x - m) / (2 * s * s)); }
  // 밀도: 큰 봉우리 하나에 작은 어깨를 달아 달마다 모양이 조금씩 다릅니다
  function dens(i, t) { var m = cur[i], s = SD[i], sh = (i % 3 - 1) * 0.9 * s; return 0.78 * g(t, m, s) + 0.32 * g(t, m + sh, s * 0.55); }
  function colOf(m) { var k = Math.max(0, Math.min(1, (m + 5) / 33)); return 'hsl(' + (215 - k * 205).toFixed(0) + ' 75% ' + (62 - k * 6).toFixed(0) + '%)'; }
  var tk = '';
  [-10, 0, 10, 20, 30].forEach(function (t) { tk += '<line x1="' + xOf(t).toFixed(1) + '" y1="62" x2="' + xOf(t).toFixed(1) + '" y2="' + (B0 + 11 * STEP + 4) + '" stroke="currentColor" stroke-opacity=".08"/><text class="u395-tk" x="' + xOf(t).toFixed(1) + '" y="' + (B0 + 11 * STEP + 18) + '">' + t + '°</text>'; });
  ax.innerHTML = tk;
  MON.forEach(function (m, i) {
    var gEl = document.createElementNS('http://www.w3.org/2000/svg', 'g'); gEl.setAttribute('class', 'u395-rd');
    gEl.innerHTML = '<path/><path fill="none" stroke-width="1.6"/><text class="u395-ml" x="' + (X0 - 8) + '" y="' + (B0 + i * STEP - 3) + '">' + m + '</text>';
    rs.appendChild(gEl);
    var hz = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); hz.setAttribute('class', 'u395-hz'); hz.setAttribute('x', 0); hz.setAttribute('y', B0 + i * STEP - STEP); hz.setAttribute('width', 300); hz.setAttribute('height', STEP);
    hz.addEventListener('pointerenter', function () { setHov(i); }); hz.addEventListener('pointerleave', function () { if (hov === i) setHov(-1); });
    hzs.appendChild(hz);
    R.push({ g: gEl, fill: gEl.firstChild, line: gEl.children[1] });
  });
  function paint() {
    MON.forEach(function (m, i) {
      var b = B0 + i * STEP, pts = [];
      for (var k = 0; k <= NS; k++) { var t = T0 + (T1 - T0) * k / NS; pts.push(xOf(t).toFixed(1) + ' ' + (b - dens(i, t) * HMAX * grow[i]).toFixed(1)); }
      var line = 'M' + pts.join(' L');
      R[i].fill.setAttribute('d', line + ' L' + X1 + ' ' + b + ' L' + X0 + ' ' + b + ' Z'); R[i].fill.setAttribute('fill', colOf(cur[i])); R[i].fill.setAttribute('fill-opacity', '.85');
      R[i].line.setAttribute('d', line); R[i].line.setAttribute('stroke', colOf(cur[i]));
    });
    if (hov >= 0) { var x = xOf(cur[hov]); mn.setAttribute('x1', x.toFixed(1)); mn.setAttribute('x2', x.toFixed(1)); mn.setAttribute('y1', B0 + hov * STEP - HMAX - 4); mn.setAttribute('y2', B0 + hov * STEP); }
  }
  var year = 0;
  function setHov(i) {
    hov = i; root.classList.toggle('is-f', i >= 0); mn.style.opacity = i >= 0 ? 1 : 0;
    R.forEach(function (r, k) { r.g.classList.toggle('is-hl', k === i); });
    if (i < 0) { info.textContent = 'Hover a month'; return; }
    var d = MEAN[1][i] - MEAN[0][i];
    info.textContent = MON[i] + ' · mean ' + cur[i].toFixed(1) + '°' + (year ? '  ·  ' + 'vs 20 yrs ago ' + (d >= 0 ? '+' : '') + d.toFixed(1) + '°' : '');
    paint();
  }
  var tw = 0;
  function morph(y) {
    year = y; var from = cur.slice(), t0 = performance.now();
    cancelAnimationFrame(tw);
    (function f(now) {
      var k = rm ? 1 : Math.min(1, (now - t0) / 900);
      // 능선마다 조금씩 늦게 출발해 물결처럼 밀려납니다
      cur = from.map(function (v, i) { var kk = Math.max(0, Math.min(1, (k * 1.5 - i * 0.04))), e = kk < 0.5 ? 4 * kk * kk * kk : 1 - Math.pow(-2 * kk + 2, 3) / 2; return v + (MEAN[y][i] - v) * e; });
      paint(); if (hov >= 0) setHov(hov);
      if (k < 1 || cur.some(function (v, i) { return Math.abs(v - MEAN[y][i]) > 0.01; })) tw = requestAnimationFrame(f);
    })(t0);
  }
  ybs.forEach(function (b, i) { b.addEventListener('click', function () { ybs.forEach(function (x, j) { x.classList.toggle('is-on', j === i); x.setAttribute('aria-pressed', j === i); }); morph(i); }); });
  // 키보드: 차트에 초점을 두고 위/아래 화살표로 달을 고릅니다
  var sv = root.querySelector('.u395-sv'); sv.setAttribute('tabindex', '0');
  sv.addEventListener('keydown', function (e) { var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0; if (e.key === 'Escape') { setHov(-1); return; } if (!d) return; e.preventDefault(); setHov(hov < 0 ? 0 : (hov + d + 12) % 12); });
  sv.addEventListener('blur', function () { setHov(-1); });
  // 처음 보일 때 1월부터 차례로 능선이 솟아오릅니다
  if (!rm && 'IntersectionObserver' in window) {
    var done = false, io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || done) return; done = true; io.disconnect();
      var t0 = performance.now();
      (function f(now) { var el = (now - t0) / 1000, all = true; grow = grow.map(function (v, i) { var k = Math.max(0, Math.min(1, (el - i * 0.07) / 0.6)); if (k < 1) all = false; return 1 - Math.pow(1 - k, 3); }); paint(); if (!all) requestAnimationFrame(f); })(t0);
    });
    io.observe(root);
  } else grow = grow.map(function () { return 1; });
  paint(); setHov(-1);
})();
  })();

  scope.ready();
  return scope.controller;
}
