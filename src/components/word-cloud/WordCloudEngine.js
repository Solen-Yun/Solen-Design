// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountWordCloud(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u399">
  <div class="u399-hd"><b>Café review keywords</b><div class="u399-sg" role="group" aria-label="Month"><button type="button" class="u399-mo is-on" aria-pressed="true">Jan</button><button type="button" class="u399-mo" aria-pressed="false">Apr</button><button type="button" class="u399-mo" aria-pressed="false">Jul</button></div></div>
  <div class="u399-ws"></div>
  <div class="u399-ft"><span class="u399-in" aria-live="polite"></span><div class="u399-lg"></div></div>
</div>
`,
      css: `

.u399{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u399-hd{position:absolute;left:20px;right:16px;top:16px;display:flex;justify-content:space-between;align-items:center;z-index:2}
.u399-hd b{font-size:13.5px;font-weight:900}
.u399-sg{display:flex;padding:3px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u399-mo{border:0;padding:4px 11px;border-radius:999px;background:none;color:var(--ux-ink-2);font:inherit;font-size:11px;font-weight:800;cursor:pointer;transition:background .2s,color .2s}
.u399-mo.is-on{background:var(--ux-ink);color:var(--ux-surface)}
.u399-mo:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u399-w{position:absolute;left:0;top:0;border:0;padding:0;background:none;font:inherit;font-size:34px;font-weight:850;line-height:1.15;letter-spacing:-.02em;white-space:nowrap;color:var(--c);cursor:default;transform-origin:0 0;transition:transform .75s cubic-bezier(.3,1.15,.4,1),opacity .4s;will-change:transform}
.u399-w.is-out{opacity:0;pointer-events:none}
.u399-w:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px;border-radius:4px}
.u399.is-f .u399-w{opacity:.14}
.u399.is-f .u399-w.is-hl{opacity:1}
.u399.is-f .u399-w.is-out{opacity:0}
.u399-ft{position:absolute;left:14px;right:14px;bottom:12px;display:flex;flex-direction:column;align-items:center;gap:6px;z-index:2}
.u399-in{font-size:10.5px;font-weight:800;color:var(--ux-ink-2);font-variant-numeric:tabular-nums;white-space:nowrap}
.u399-lg{display:flex;gap:2px}
.u399-lg button{border:0;padding:3px 7px;border-radius:8px;background:none;color:var(--ux-ink-2);font:inherit;font-size:10px;font-weight:750;cursor:default}
.u399-lg button:hover,.u399-lg button.g-hov,.u399-lg button:focus-visible{background:var(--ux-surface-2);outline:none}
.u399-lg i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:4px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u399');
  var ws = root.querySelector('.u399-ws'), info = root.querySelector('.u399-in'), lg = root.querySelector('.u399-lg'), mos = root.querySelectorAll('.u399-mo');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [단어, 갈래, [1월, 4월, 7월 언급 수]] (예시 값)
  var W = [['americano', 0, [90, 80, 95]], ['latte', 0, [70, 65, 40]], ['hot cocoa', 0, [60, 12, 0]], ['strawberry', 0, [20, 75, 15]], ['cold brew', 0, [12, 35, 85]], ['lemonade', 0, [0, 22, 60]], ['mulled wine', 0, [45, 0, 0]], ['shaved ice', 1, [0, 15, 80]], ['cake', 1, [55, 50, 35]], ['croffle', 1, [40, 45, 30]], ['macaron', 1, [25, 35, 20]], ['cherry menu', 1, [0, 70, 0]], ['terrace', 2, [6, 55, 50]], ['window seat', 2, [35, 30, 25]], ['outlets', 2, [40, 40, 40]], ['air con', 2, [0, 6, 65]], ['cozy', 2, [55, 10, 0]], ['vibe', 2, [65, 70, 60]], ['friendly', 3, [50, 55, 50]], ['wait time', 3, [30, 45, 55]], ['price', 3, [35, 30, 35]], ['parking', 3, [25, 25, 30]]];
  var CAT = ['Drinks', 'Desserts', 'Space', 'Service'], COL = ['#6366F1', '#EC4899', '#0D9488', '#D97706'];
  var BASE = 34, CXY = [170, 166], BOX = [14, 52, 326, 284], month = 0, hov = null, EL = [], POS = [];
  var mc = document.createElement('canvas').getContext('2d');
  W.forEach(function (w, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u399-w is-out'; b.textContent = w[0]; b.style.setProperty('--c', COL[w[1]]);
    b.addEventListener('pointerenter', function () { setHov({ w: i }); }); b.addEventListener('pointerleave', function () { setHov(null); });
    b.addEventListener('focus', function () { setHov({ w: i }); }); b.addEventListener('blur', function () { setHov(null); });
    ws.appendChild(b); EL.push(b);
  });
  lg.innerHTML = CAT.map(function (c, i) { return '<button type="button"><i style="background:' + COL[i] + '"></i>' + c + '</button>'; }).join('');
  lg.querySelectorAll('button').forEach(function (b, i) { b.addEventListener('pointerenter', function () { setHov({ c: i }); }); b.addEventListener('pointerleave', function () { setHov(null); }); b.addEventListener('focus', function () { setHov({ c: i }); }); b.addEventListener('blur', function () { setHov(null); }); });
  function sizeOf(v) { return 11 + Math.pow(v / 95, 0.85) * 22; }
  // 배치: 큰 단어부터 가운데에서 나선을 따라 돌며 겹치지 않는 첫 자리에 앉힙니다
  function layout(m) {
    var fam = getComputedStyle(root).fontFamily, out = [], placed = [];
    var order = W.map(function (w, i) { return i; }).filter(function (i) { return W[i][2][m] > 0; }).sort(function (a, b) { return W[b][2][m] - W[a][2][m]; });
    order.forEach(function (i) {
      var fs = sizeOf(W[i][2][m]); mc.font = '850 ' + fs + 'px ' + fam;
      var w = mc.measureText(W[i][0]).width + 4, h = fs * 1.15, ok = null;
      for (var t = 0; t < 140 && !ok; t += 0.12) {
        var r = 3.2 * t, x = CXY[0] + r * Math.cos(t) * 1.45 - w / 2, y = CXY[1] + r * Math.sin(t) - h / 2;
        if (x < BOX[0] || y < BOX[1] || x + w > BOX[2] || y + h > BOX[3]) continue;
        if (placed.every(function (p) { return x + w + 3 < p[0] || p[0] + p[2] + 3 < x || y + h + 1 < p[1] || p[1] + p[3] + 1 < y; })) ok = [x, y, w, h];
      }
      if (ok) { placed.push(ok); out[i] = { x: ok[0], y: ok[1], k: fs / BASE }; }
    });
    return out;
  }
  function apply(m, first) {
    var L = layout(m);
    W.forEach(function (w, i) {
      var b = EL[i], p = L[i], was = !b.classList.contains('is-out');
      b.style.transitionDelay = rm ? '0s' : (i % 7) * 0.025 + 's';
      if (p) {
        // 새로 들어오는 단어는 제자리에서 작게 시작해 톡 커집니다
        if (!was && !rm) { b.style.transition = 'none'; b.style.transform = 'translate(' + (p.x + 20 * p.k) + 'px,' + (p.y + 12 * p.k) + 'px) scale(' + (p.k * 0.2) + ')'; void b.offsetWidth; b.style.transition = ''; }
        b.classList.remove('is-out'); b.style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px) scale(' + p.k.toFixed(3) + ')';
        b.tabIndex = 0; b.setAttribute('aria-label', w[0] + ' ' + w[2][m]);
      } else {
        b.classList.add('is-out'); b.tabIndex = -1;
        if (was && POS[i]) b.style.transform = 'translate(' + (POS[i].x + 20 * POS[i].k) + 'px,' + (POS[i].y + 10 * POS[i].k) + 'px) scale(' + (POS[i].k * 0.3).toFixed(3) + ')';
      }
    });
    POS = L;
  }
  function setHov(h) {
    hov = h; root.classList.toggle('is-f', !!h);
    var cat = h ? (h.c != null ? h.c : W[h.w][1]) : -1;
    EL.forEach(function (b, i) { b.classList.toggle('is-hl', W[i][1] === cat); });
    if (!h) { info.textContent = 'Hover a word'; return; }
    if (h.c != null) { var s = 0; W.forEach(function (w) { if (w[1] === h.c) s += w[2][month]; }); info.textContent = CAT[h.c] + ' · ' + s + ' mentions'; return; }
    var w = W[h.w], v = w[2][month], d = month ? v - w[2][month - 1] : null;
    info.textContent = w[0] + ' · ' + v + ' mentions' + (d == null ? '' : '  (' + (d >= 0 ? '+' : '') + d + ')');
  }
  mos.forEach(function (b, i) { b.addEventListener('click', function () { month = i; mos.forEach(function (x, j) { x.classList.toggle('is-on', j === i); x.setAttribute('aria-pressed', j === i); }); apply(i); if (hov) setHov(hov); }); });
  apply(0, true); setHov(null);
  // 글꼴이 늦게 들어오면 폭이 달라지므로 한 번 더 배치합니다
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (root.isConnected) apply(month); });
})();
  })();

  scope.ready();
  return scope.controller;
}
