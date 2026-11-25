// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSlopeChart(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u359">
  <div class="u359-hd"><b>Team satisfaction</b><div class="u359-seg" role="group" aria-label="View"><button type="button" class="u359-md is-on" aria-pressed="true">Score</button><button type="button" class="u359-md" aria-pressed="false">Rank</button></div></div>
  <svg class="u359-sv" viewBox="0 0 340 340">
    <line class="u359-ax" x1="112" y1="66" x2="112" y2="276"/><line class="u359-ax" x1="228" y1="66" x2="228" y2="276"/>
    <text class="u359-at" x="112" y="58">Last yr</text><text class="u359-at" x="228" y="58">This yr</text>
    <g class="u359-g"></g>
  </svg>
  <div class="u359-in" aria-live="polite"></div>
</div>
`,
      css: `

.u359{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u359-hd{position:absolute;left:20px;right:18px;top:16px;display:flex;justify-content:space-between;align-items:center}
.u359-hd b{font-size:14px;font-weight:900}
.u359-seg{display:flex;padding:3px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u359-md{border:0;padding:4px 11px;border-radius:999px;background:none;color:var(--ux-ink-2);font:inherit;font-size:11px;font-weight:800;cursor:pointer;transition:background .2s,color .2s}
.u359-md.is-on{background:var(--ux-ink);color:var(--ux-surface)}
.u359-md:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u359-sv{position:absolute;left:0;top:0;width:340px;height:340px}
.u359-ax{stroke:var(--ux-line);stroke-width:2}
.u359-at{font-size:10.5px;font-weight:800;fill:var(--ux-ink-3);text-anchor:middle}
.u359-it{cursor:pointer;transition:opacity .25s}
.u359-it .u359-ln{fill:none;stroke-width:2.4;stroke-linecap:round}
.u359-it .u359-hz{fill:none;stroke:transparent;stroke-width:14}
.u359-it circle{transform-box:fill-box;transform-origin:center}
.u359-it text{font-size:11px;font-weight:700;fill:var(--ux-ink-2)}
.u359-it text tspan{font-weight:900;fill:var(--ux-ink)}
.u359.is-f .u359-it{opacity:.14}
.u359.is-f .u359-it.is-hl{opacity:1}
.u359.is-f .u359-it.is-hl .u359-ln{stroke-width:3.4}
.u359-in{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);padding:6px 12px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:11px;font-weight:800;white-space:nowrap;font-variant-numeric:tabular-nums}
.u359-in em{font-style:normal}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u359');
  var g = root.querySelector('.u359-g'), info = root.querySelector('.u359-in'), mds = root.querySelectorAll('.u359-md');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NAME = ['Eng', 'Design', 'Sales', 'Mktg', 'HR', 'Finance', 'Support', 'Planning'];
  var A = [72, 68, 75, 61, 70, 58, 52, 66], B = [81, 74, 63, 70, 66, 60, 69, 58];
  var XL = 112, XR = 228, mode = 0, hov = -1, IT = [];
  function rankOf(arr) { var o = arr.map(function (v, i) { return i; }).sort(function (a, b) { return arr[b] - arr[a]; }), r = []; o.forEach(function (i, k) { r[i] = k; }); return r; }
  var RA = rankOf(A), RB = rankOf(B);
  function yv(v) { return 270 - (v - 50) / 35 * 196; }
  function yr(k) { return 76 + k * 27; }
  // 목표 위치: 점수 모드는 값, 순위 모드는 등수 자리
  function targets() { return NAME.map(function (n, i) { return mode ? [yr(RA[i]), yr(RB[i])] : [yv(A[i]), yv(B[i])]; }); }
  // 이름표가 겹치지 않게 위아래로 조금씩 밀어 냅니다(선 끝 점은 제자리)
  function relax(ys) {
    var o = ys.map(function (y, i) { return { i: i, y: y }; }).sort(function (a, b) { return a.y - b.y; });
    for (var it = 0; it < 30; it++) for (var k = 1; k < o.length; k++) { var d = o[k].y - o[k - 1].y; if (d < 14) { var m = (14 - d) / 2; o[k].y += m; o[k - 1].y -= m; } }
    var out = []; o.forEach(function (p) { out[p.i] = p.y; }); return out;
  }
  NAME.forEach(function (n, i) {
    var it = document.createElementNS('http://www.w3.org/2000/svg', 'g'); it.setAttribute('class', 'u359-it');
    var c = B[i] > A[i] ? '#10B981' : '#F43F5E';
    it.innerHTML = '<line class="u359-hz"/><line class="u359-ln" stroke="' + c + '" pathLength="1"/><circle r="4" fill="' + c + '"/><circle r="4" fill="' + c + '"/><text text-anchor="end"></text><text></text>';
    it.addEventListener('pointerenter', function () { setHov(i); });
    it.addEventListener('pointerleave', function () { if (hov === i) setHov(-1); });
    g.appendChild(it);
    var el = it.children;
    IT.push({ g: it, hz: el[0], ln: el[1], c1: el[2], c2: el[3], t1: el[4], t2: el[5], y1: 0, y2: 0 });
  });
  function label() {
    var t = targets(), L = relax(t.map(function (p) { return p[0]; })), R = relax(t.map(function (p) { return p[1]; }));
    IT.forEach(function (o, i) {
      var a = mode ? '#' + (RA[i] + 1) : A[i], b = mode ? '#' + (RB[i] + 1) : B[i];
      o.t1.innerHTML = NAME[i] + ' <tspan>' + a + '</tspan>'; o.t2.innerHTML = '<tspan>' + b + '</tspan> ' + NAME[i];
      o.L = L[i]; o.R = R[i];
    });
  }
  function place(k) {
    IT.forEach(function (o) {
      [o.hz, o.ln].forEach(function (l) { l.setAttribute('x1', XL); l.setAttribute('x2', XR); l.setAttribute('y1', o.y1.toFixed(1)); l.setAttribute('y2', o.y2.toFixed(1)); });
      o.c1.setAttribute('cx', XL); o.c1.setAttribute('cy', o.y1.toFixed(1)); o.c2.setAttribute('cx', XR); o.c2.setAttribute('cy', o.y2.toFixed(1));
      o.t1.setAttribute('x', XL - 9); o.t1.setAttribute('y', (o.ly1 + 3.8).toFixed(1)); o.t2.setAttribute('x', XR + 9); o.t2.setAttribute('y', (o.ly2 + 3.8).toFixed(1));
    });
  }
  var tw = 0;
  function go(anim) {
    var t = targets(); label();
    var from = IT.map(function (o) { return [o.y1, o.y2, o.ly1, o.ly2]; });
    cancelAnimationFrame(tw);
    if (!anim || rm) { IT.forEach(function (o, i) { o.y1 = t[i][0]; o.y2 = t[i][1]; o.ly1 = o.L; o.ly2 = o.R; }); place(); return; }
    var t0 = performance.now();
    (function f(now) {
      var k = Math.min(1, (now - t0) / 650), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      IT.forEach(function (o, i) { o.y1 = from[i][0] + (t[i][0] - from[i][0]) * e; o.y2 = from[i][1] + (t[i][1] - from[i][1]) * e; o.ly1 = from[i][2] + (o.L - from[i][2]) * e; o.ly2 = from[i][3] + (o.R - from[i][3]) * e; });
      place();
      if (k < 1) tw = requestAnimationFrame(f);
    })(t0);
  }
  function setHov(i) {
    hov = i; root.classList.toggle('is-f', i >= 0);
    IT.forEach(function (o, k) { o.g.classList.toggle('is-hl', k === i); });
    if (i < 0) { info.textContent = 'Hover a line to compare'; return; }
    var d = B[i] - A[i];
    info.innerHTML = NAME[i] + ' ' + A[i] + ' → ' + B[i] + ' <em style="color:' + (d > 0 ? '#10B981' : '#F43F5E') + '">(' + (d > 0 ? '+' : '') + d + ')</em>';
  }
  mds.forEach(function (b, k) { b.addEventListener('click', function () { mode = k; mds.forEach(function (x, j) { x.classList.toggle('is-on', j === k); x.setAttribute('aria-pressed', j === k); }); go(true); }); });
  go(false); setHov(-1);
  // 처음 보일 때 선을 왼쪽에서 오른쪽으로 차례로 긋습니다
  if (!rm) {
    IT.forEach(function (o) { o.ln.style.strokeDasharray = '1'; o.ln.style.strokeDashoffset = '1'; o.c2.style.opacity = 0; o.t2.style.opacity = 0; });
    var drawn = false;
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || drawn) return; drawn = true; io.disconnect();
      IT.forEach(function (o, i) {
        var d = 200 + i * 110;
        o.ln.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 520, delay: d, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).onfinish = function () { o.ln.style.strokeDasharray = ''; o.ln.style.strokeDashoffset = ''; };
        o.c2.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 300, delay: d + 460, fill: 'forwards' });
        o.t2.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: d + 460, fill: 'forwards' });
      });
    }) : null;
    if (io) io.observe(root); else IT.forEach(function (o) { o.ln.style.strokeDasharray = ''; o.ln.style.strokeDashoffset = ''; o.c2.style.opacity = ''; o.t2.style.opacity = ''; });
  }
})();
  })();

  scope.ready();
  return scope.controller;
}
