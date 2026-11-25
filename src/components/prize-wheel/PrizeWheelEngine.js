// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPrizeWheel(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u331">
  <div class="u331-wh" role="img" aria-label="Prize wheel, drag to flick"><svg viewBox="-120 -120 240 240" aria-hidden="true"><g class="u331-rot"></g></svg></div>
  <svg class="u331-pt" viewBox="0 0 26 36" aria-hidden="true"><circle cx="13" cy="8" r="7" fill="#F8F9FA"/><path d="M5 10 L13 34 L21 10 Z" fill="#F8F9FA"/><circle cx="13" cy="8" r="3" fill="#FA5252"/></svg>
  <div class="u331-ft"><button type="button" class="u331-go">Spin</button><div class="u331-rs" aria-live="polite"></div></div>
</div>
`,
      css: `

.u331{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(90% 80% at 50% 35%,#5F3DC4,#2B1A6B 75%);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#fff}
.u331-wh{position:absolute;left:50%;top:40px;width:240px;height:240px;margin-left:-120px;border-radius:50%;cursor:grab;touch-action:none;filter:drop-shadow(0 14px 20px rgba(0,0,0,.45))}
.u331-wh:active{cursor:grabbing}
.u331-wh svg{width:100%;height:100%;display:block}
.u331-pt{position:absolute;left:50%;top:26px;width:26px;height:36px;margin-left:-13px;transform-origin:50% 8px;pointer-events:none;filter:drop-shadow(0 3px 3px rgba(0,0,0,.4))}
.u331-ft{position:absolute;left:0;right:0;bottom:16px;display:flex;align-items:center;justify-content:center;gap:12px}
.u331-go{border:0;padding:9px 20px;border-radius:999px;background:#FCC419;color:#2B1A6B;font:inherit;font-size:13px;font-weight:900;cursor:pointer;box-shadow:0 6px 0 #E67700}
.u331-go:active{transform:translateY(3px);box-shadow:0 3px 0 #E67700}
.u331-go:focus-visible{outline:2px solid #fff;outline-offset:3px}
.u331-rs{min-width:96px;font-size:13px;font-weight:800;opacity:0;transform:translateY(6px);transition:opacity .3s,transform .4s cubic-bezier(.3,1.6,.5,1)}
.u331-rs.is-on{opacity:1;transform:none}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u331');
  var wh = root.querySelector('.u331-wh'), g = wh.querySelector('.u331-rot'), pt = root.querySelector('.u331-pt'), go = root.querySelector('.u331-go'), rs = root.querySelector('.u331-rs');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SEG = ['Coffee', 'Miss', 'Cookie', 'Sticker', 'Miss', '10%', 'Cake', 'Again'];
  var COL = ['#FF6B6B', '#495057', '#FCC419', '#51CF66', '#868E96', '#4DABF7', '#F783AC', '#9775FA'], N = 8, R = 112;
  var h = '';
  SEG.forEach(function (s, i) {
    var a0 = (i / N) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / N) * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2;
    h += '<path class="u331-s" d="M0 0 L' + (Math.cos(a0) * R).toFixed(2) + ' ' + (Math.sin(a0) * R).toFixed(2) + ' A' + R + ' ' + R + ' 0 0 1 ' + (Math.cos(a1) * R).toFixed(2) + ' ' + (Math.sin(a1) * R).toFixed(2) + ' Z" fill="' + COL[i] + '" stroke="#fff" stroke-width="2"/>';
    h += '<text transform="rotate(' + (am * 180 / Math.PI + 90).toFixed(2) + ') translate(0 -74)" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" font-family="system-ui,-apple-system,sans-serif">' + s + '</text>';
  });
  for (var k = 0; k < N; k++) { var a = (k / N) * 2 * Math.PI - Math.PI / 2; h += '<circle cx="' + (Math.cos(a) * (R - 6)).toFixed(2) + '" cy="' + (Math.sin(a) * (R - 6)).toFixed(2) + '" r="3" fill="#FFF3BF"/>'; }
  h += '<circle r="' + (R + 4) + '" fill="none" stroke="#FFD43B" stroke-width="8"/><circle r="22" fill="#fff"/><circle r="12" fill="#FCC419"/>';
  g.innerHTML = h;
  var segs = g.querySelectorAll('.u331-s');
  var ang = 0, vel = 0, flap = 0, raf = 0, last = 0, spinning = false, lastSeg = 0;
  function apply() { g.setAttribute('transform', 'rotate(' + ang.toFixed(2) + ')'); pt.style.transform = 'rotate(' + flap.toFixed(1) + 'deg)'; }
  // 바늘 아래(위쪽 0도)에 있는 칸 번호
  function under() { var a = ((-ang % 360) + 360) % 360; return Math.floor(a / (360 / N)) % N; }
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.033, Math.max(0, (now - last) / 1000)); last = now;
    if (!drag) {
      vel *= Math.pow(0.42, dt); if (Math.abs(vel) < 260) vel -= Math.sign(vel) * 60 * dt;
      ang += vel * dt;
    }
    // 칸 경계를 지날 때마다 바늘을 젖혔다가 스프링처럼 돌아오게 합니다
    var seg = Math.floor(ang / (360 / N));
    if (seg !== lastSeg) { flap = Math.max(-28, Math.min(28, -Math.sign(vel || 1) * Math.min(28, 8 + Math.abs(vel) / 40))); lastSeg = seg; }
    flap *= Math.pow(0.0005, dt);
    apply();
    if (!drag && spinning && Math.abs(vel) < 6) { spinning = false; vel = 0; finish(); }
    if (drag || spinning || Math.abs(flap) > 0.3) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function finish() {
    var i = under();
    [].forEach.call(segs, function (s, j) { s.style.filter = j === i ? 'brightness(1.25) drop-shadow(0 0 6px #fff)' : 'brightness(.75)'; });
    rs.textContent = 'Result: ' + SEG[i]; rs.classList.add('is-on');
  }
  function start(v) {
    [].forEach.call(segs, function (s) { s.style.filter = ''; }); rs.classList.remove('is-on');
    if (rm) { ang += Math.sign(v) * (720 + Math.random() * 360); apply(); finish(); return; }
    vel = v; spinning = true; kick();
  }
  go.addEventListener('click', function () { if (spinning) return; start(900 + Math.random() * 500); });
  // 끌기: 바퀴 가운데를 기준으로 각도를 따라 돌리고, 놓을 때의 각속도로 튕깁니다
  var drag = null;
  function angAt(e) { var r = wh.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
  wh.addEventListener('pointerdown', function (e) { drag = { la: angAt(e), hist: [[performance.now(), ang]] }; spinning = false; vel = 0; rs.classList.remove('is-on'); [].forEach.call(segs, function (s) { s.style.filter = ''; }); try { wh.setPointerCapture(e.pointerId); } catch (_) {} kick(); });
  wh.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var a = angAt(e), d = a - drag.la; if (d > 180) d -= 360; if (d < -180) d += 360;
    drag.la = a; ang += d; drag.hist.push([performance.now(), ang]); if (drag.hist.length > 40) drag.hist.shift(); if (rm) apply();
  });
  // 놓기 직전 0.12초 동안 돈 각도로 튕기는 속도를 정합니다(마지막 순간 멈칫해도 튕김이 살아 있게)
  function end() {
    if (!drag) return;
    var h2 = drag.hist, now = performance.now(), j = h2.length - 1; while (j > 0 && now - h2[j][0] < 120) j--;
    var v = (ang - h2[j][1]) / Math.max(0.05, (now - h2[j][0]) / 1000); drag = null;
    if (Math.abs(v) > 120) start(Math.max(-1800, Math.min(1800, v * 1.3))); else kick();
  }
  wh.addEventListener('pointerup', end); wh.addEventListener('pointercancel', end);
  apply();
})();
  })();

  scope.ready();
  return scope.controller;
}
