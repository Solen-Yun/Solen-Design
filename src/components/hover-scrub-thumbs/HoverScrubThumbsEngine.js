// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountHoverScrubThumbs(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u366"><div class="u366-hd">Recommended</div><div class="u366-ls"></div></div>
`,
      css: `

.u366{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:#F8F9FB;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#1B1E28;padding:18px 16px}
.u366-hd{font-size:16px;font-weight:850;letter-spacing:-.02em;margin:2px 4px 12px}
.u366-ls{display:flex;flex-direction:column;gap:12px}
.u366-it{display:flex;gap:10px;align-items:flex-start}
.u366-th{position:relative;width:146px;height:92px;flex:none;border-radius:12px;overflow:hidden;background:#000;cursor:ew-resize;touch-action:pan-y;outline:none}
.u366-th:focus-visible{box-shadow:0 0 0 3px #4C6EF5}
.u366-th canvas{width:100%;height:100%;display:block}
.u366-du{position:absolute;right:6px;bottom:8px;padding:1px 5px;border-radius:4px;background:rgba(0,0,0,.7);color:#fff;font:700 9.5px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;transition:opacity .2s}
.u366-bar{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.3);opacity:0;transition:opacity .2s}
.u366-bar i{display:block;height:100%;width:0;background:#FA5252}
.u366-tip{position:absolute;top:6px;left:0;padding:2px 6px;border-radius:5px;background:rgba(0,0,0,.75);color:#fff;font:700 9.5px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;transform:translateX(-50%);opacity:0;transition:opacity .15s;pointer-events:none}
.u366-th.is-on .u366-bar,.u366-th.is-on .u366-tip{opacity:1}
.u366-th.is-on .u366-du{opacity:0}
.u366-tx b{display:block;font-size:13px;font-weight:800;line-height:1.3;word-break:keep-all}
.u366-tx span{display:block;margin-top:3px;font-size:10.5px;font-weight:600;color:#7A7F92;word-break:keep-all}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u366');
  var ls = root.querySelector('.u366-ls');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var VID = [['Sunrise time-lapse', '3 minutes of sun rising over the sea', 192], ['Bike commute', 'A morning ride along the river', 254], ['The moment it blooms', 'Six hours in one minute', 61]];
  var dpr = Math.min(2, window.devicePixelRatio || 1), W = 146, H = 92;
  function mix(a, b, t) { return 'rgb(' + a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }).join(',') + ')'; }
  // 장면 세 가지: t(0~1) 위치의 한 장면을 그립니다
  var SCENES = [
    function (g, t) {
      var sk = g.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, mix([20, 24, 60], [120, 190, 255], t)); sk.addColorStop(1, mix([90, 50, 90], [255, 214, 165], t));
      g.fillStyle = sk; g.fillRect(0, 0, W, H);
      var sy = 70 - t * 52; g.fillStyle = mix([255, 120, 80], [255, 240, 200], t); g.beginPath(); g.arc(W / 2, sy, 11 + t * 2, 0, 6.2832); g.fill();
      g.fillStyle = mix([20, 30, 70], [40, 110, 190], t); g.fillRect(0, 64, W, H - 64);
      g.fillStyle = 'rgba(255,230,180,' + (0.3 + t * 0.4).toFixed(2) + ')'; for (var k = 0; k < 5; k++) g.fillRect(W / 2 - 18 + k * 2, 68 + k * 5, 36 - k * 4, 1.6);
    },
    function (g, t) {
      g.fillStyle = '#BDE0FE'; g.fillRect(0, 0, W, H);
      var off = t * 260;
      g.fillStyle = '#95D5B2'; for (var k = -1; k < 6; k++) { var x = ((k * 46 - off * 0.4) % 276 + 276) % 276 - 40; g.beginPath(); g.arc(x, 56, 26, Math.PI, 0); g.fill(); }
      g.fillStyle = '#4DABF7'; g.fillRect(0, 62, W, 10);
      g.fillStyle = '#ADB5BD'; g.fillRect(0, 72, W, 20);
      g.fillStyle = '#F8F9FA'; for (var j = -1; j < 8; j++) { var lx = ((j * 24 - off) % 192 + 192) % 192 - 24; g.fillRect(lx, 81, 12, 2); }
      var bx = 18 + t * 104, by = 70, wr = 7, rot = t * 40;
      g.strokeStyle = '#212529'; g.lineWidth = 1.6;
      [bx - 10, bx + 10].forEach(function (cx0) { g.beginPath(); g.arc(cx0, by, wr, 0, 6.2832); g.stroke(); g.beginPath(); g.moveTo(cx0 + Math.cos(rot) * wr, by + Math.sin(rot) * wr); g.lineTo(cx0 - Math.cos(rot) * wr, by - Math.sin(rot) * wr); g.stroke(); });
      g.beginPath(); g.moveTo(bx - 10, by); g.lineTo(bx - 2, by - 10); g.lineTo(bx + 10, by); g.lineTo(bx - 2, by); g.closePath(); g.moveTo(bx - 2, by - 10); g.lineTo(bx + 6, by - 12); g.stroke();
      g.fillStyle = '#FA5252'; g.beginPath(); g.ellipse(bx - 1, by - 20, 4, 7, 0.3, 0, 6.2832); g.fill();
      g.fillStyle = '#FFD8A8'; g.beginPath(); g.arc(bx + 1, by - 30, 4, 0, 6.2832); g.fill();
    },
    function (g, t) {
      var bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#2B2D42'); bg.addColorStop(1, '#141522'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
      g.strokeStyle = '#51CF66'; g.lineWidth = 3; g.beginPath(); g.moveTo(W / 2, H); g.quadraticCurveTo(W / 2 - 4, 70, W / 2, 46); g.stroke();
      g.fillStyle = '#40C057'; g.beginPath(); g.ellipse(W / 2 - 12, 74, 11, 4, -0.5, 0, 6.2832); g.fill();
      var open = t * t * (3 - 2 * t), n = 7;
      for (var k = 0; k < n; k++) {
        var a = k / n * Math.PI * 2 - Math.PI / 2, len = 6 + open * 16, wd = 3 + open * 5;
        g.save(); g.translate(W / 2, 40); g.rotate(a * open + (1 - open) * (-Math.PI / 2 + (k - 3) * 0.08));
        g.fillStyle = 'hsl(' + (330 + k * 4) + ',80%,' + (55 + open * 15) + '%)'; g.beginPath(); g.ellipse(len * 0.6, 0, len * 0.6, wd, 0, 0, 6.2832); g.fill(); g.restore();
      }
      g.fillStyle = '#FFD43B'; g.beginPath(); g.arc(W / 2, 40, 2 + open * 4, 0, 6.2832); g.fill();
    }
  ];
  function fmt(s) { s = Math.round(s); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
  VID.forEach(function (v, i) {
    var it = document.createElement('div'); it.className = 'u366-it';
    it.innerHTML = '<div class="u366-th" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="' + v[2] + '" aria-valuenow="0"><canvas></canvas><span class="u366-du">' + fmt(v[2]) + '</span><span class="u366-bar"><i></i></span><span class="u366-tip"></span></div><div class="u366-tx"><b>' + v[0] + '</b><span>' + v[1] + '</span></div>';
    ls.appendChild(it);
    var th = it.querySelector('.u366-th'), c = th.querySelector('canvas'), g = c.getContext('2d'), bar = th.querySelector('.u366-bar i'), tip = th.querySelector('.u366-tip');
    th.setAttribute('aria-label', v[0] + ' preview, skim side to side');
    c.width = W * dpr; c.height = H * dpr; g.scale(dpr, dpr);
    var COVER = [0.85, 0.45, 0.95][i], cur = COVER, want = COVER, raf = 0;
    function paint(t) { SCENES[i](g, t); }
    // 훑을 때 장면이 살짝 늦게 따라와 부드럽게 넘어갑니다
    function frame() { raf = 0; cur += (want - cur) * (rm ? 1 : 0.35); if (Math.abs(want - cur) < 0.002) cur = want; paint(cur); if (cur !== want) raf = requestAnimationFrame(frame); }
    function to(t, on) {
      want = t; th.classList.toggle('is-on', on);
      if (on) { bar.style.width = (t * 100).toFixed(1) + '%'; tip.textContent = fmt(t * v[2]); tip.style.left = Math.max(18, Math.min(W - 18, t * W)) + 'px'; th.setAttribute('aria-valuenow', Math.round(t * v[2])); }
      if (!raf) raf = requestAnimationFrame(frame);
    }
    th.addEventListener('pointermove', function (e) { var r = th.getBoundingClientRect(); to(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), true); });
    th.addEventListener('pointerleave', function () { to(COVER, false); });
    th.addEventListener('keydown', function (e) { var d = { ArrowRight: 0.1, ArrowLeft: -0.1 }[e.key]; if (d === undefined) return; e.preventDefault(); to(Math.max(0, Math.min(1, (th.classList.contains('is-on') ? want : 0) + d)), true); });
    th.addEventListener('blur', function () { to(COVER, false); });
    paint(COVER);
  });
})();
  })();

  scope.ready();
  return scope.controller;
}
