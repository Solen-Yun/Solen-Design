// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountLiquidWaveOnboarding(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u383">
  <svg class="u383-wv" viewBox="0 0 300 500" preserveAspectRatio="none" aria-hidden="true"><path/></svg>
  <button class="u383-sk" type="button">Skip</button>
  <div class="u383-ct" aria-live="polite"><div class="u383-ill" aria-hidden="true"></div><h3></h3><p></p></div>
  <div class="u383-ft"><div class="u383-dots" aria-hidden="true"><i></i><i></i><i></i></div><button class="u383-nx" type="button">Next</button></div>
</div>
`,
      css: `

.u383{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:36px;background:var(--bg,#5F3DC4);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;color:#fff}
.u383-wv{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.u383-ct{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:70px 26px 30px;text-align:center}
.u383-ill{position:relative;width:170px;height:170px}
.u383-ill i{position:absolute;border-radius:50%;background:rgba(255,255,255,.9)}
.u383-ct>*{transition:opacity .45s,transform .7s var(--ux-spring)}
.u383.is-out .u383-ct>*{opacity:0;transform:translateY(-20px)}
.u383.is-in .u383-ct>*{opacity:0;transform:translateY(30px);transition:none}
.u383-ct h3{margin:30px 0 0;font-size:24px;font-weight:880;letter-spacing:-.04em}
.u383-ct p{margin:10px 0 0;font-size:14.5px;line-height:1.6;opacity:.85}
.u383-ct>:nth-child(2){transition-delay:.06s}
.u383-ct>:nth-child(3){transition-delay:.12s}
.u383-sk{position:absolute;right:18px;top:18px;z-index:2;border:0;background:none;color:rgba(255,255,255,.8);font-size:13px;font-weight:700}
.u383-ft{position:absolute;left:24px;right:24px;bottom:26px;z-index:2;display:flex;align-items:center;justify-content:space-between}
.u383-dots{display:flex;gap:6px}
.u383-dots i{width:8px;height:8px;border-radius:4px;background:rgba(255,255,255,.4);transition:width .45s var(--ux-spring),background-color .3s}
.u383-dots i.on{width:24px;background:#fff}
.u383-nx{height:46px;padding:0 22px;border:0;border-radius:999px;background:#fff;color:var(--fg,#5F3DC4);font-size:14px;font-weight:850;transition:transform .35s var(--ux-spring),color .4s}
.u383-nx:active{transform:scale(.94)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u383');
  var path = root.querySelector('.u383-wv path'), ill = root.querySelector('.u383-ill'), h = root.querySelector('h3'), p = root.querySelector('.u383-ct p'), nx = root.querySelector('.u383-nx');
  var dots = Array.prototype.slice.call(root.querySelectorAll('.u383-dots i'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PAGES = [['Start calmly', 'Begin with ten minutes a day to catch your breath.'], ['Watch it add up', 'Look back on your mood and sleep at a glance.'], ['Keep going together', 'Share small goals with friends and cheer each other on.']];
  var BG = ['#5F3DC4', '#0C8599', '#E8590C'];
  var ILL = [
    [[60, 60, 50, 50], [20, 30, 24, 24], [118, 110, 30, 30]],
    [[20, 100, 26, 50], [56, 70, 26, 80], [92, 40, 26, 110], [128, 86, 26, 64]],
    [[30, 50, 60, 60], [80, 50, 60, 60], [62, 112, 46, 46]]
  ];
  var cur = 0, busy = false;
  function fill(i) {
    root.style.setProperty('--bg', BG[i]); root.style.setProperty('--fg', BG[i]);
    h.textContent = PAGES[i][0]; p.textContent = PAGES[i][1];
    ill.innerHTML = ILL[i].map(function (r, k) { return '<i style="left:' + r[0] + 'px;top:' + r[1] + 'px;width:' + r[2] + 'px;height:' + r[3] + 'px;border-radius:' + (i === 1 ? '10px' : '50%') + ';opacity:' + (1 - k * 0.2) + '"></i>'; }).join('');
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    nx.textContent = i === PAGES.length - 1 ? 'Get started' : 'Next';
  }
  // 물결 마루가 아래(500)에서 위(-60)로 오르며 출렁입니다
  function wave(y, t, amp) {
    var pts = [];
    for (var x = 0; x <= 300; x += 10) pts.push(x + ' ' + (y + Math.sin(x / 38 + t * 9) * amp + Math.sin(x / 17 - t * 6) * amp * 0.35).toFixed(1));
    return 'M0 520 L' + pts.join(' L') + ' L300 520 Z';
  }
  function go(n) {
    if (busy || n === cur) return;
    busy = true;
    root.classList.add('is-out');
    path.setAttribute('fill', BG[n]);
    var t0 = performance.now(), D = rm ? 1 : 1100;
    (function f(now) {
      if (!root.isConnected) return;
      var k = Math.max(0, Math.min(1, (now - t0) / D)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      path.setAttribute('d', wave(520 - e * 600, k, 26 * Math.sin(k * Math.PI)));
      if (k < 1) { requestAnimationFrame(f); return; }
      cur = n;
      root.classList.remove('is-out'); root.classList.add('is-in');
      fill(n);
      path.setAttribute('d', '');
      void root.offsetWidth;
      root.classList.remove('is-in');
      busy = false;
    })(t0);
  }
  nx.addEventListener('click', function () { go((cur + 1) % PAGES.length); });
  root.querySelector('.u383-sk').addEventListener('click', function () { go(PAGES.length - 1); });
  fill(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
