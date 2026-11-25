// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountHoverPreviewList(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u276">
  <div class="u276-hd" aria-hidden="true"><span>Selected work</span><span>2023—26</span></div>
  <ul class="u276-ls" aria-label="Work list"></ul>
  <div class="u276-pv" aria-hidden="true"><div class="u276-st"></div></div>
</div>
`,
      css: `

.u276{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:#111;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#F2EFEA;padding:22px 18px}
.u276-hd{display:flex;justify-content:space-between;font-size:10.5px;font-weight:750;letter-spacing:.12em;color:#8D8880;margin-bottom:10px;text-transform:uppercase}
.u276-ls{list-style:none;margin:0;padding:0;border-top:1px solid #2A2826}
.u276-it{border-bottom:1px solid #2A2826}
.u276-a{display:flex;align-items:baseline;gap:8px;width:100%;padding:16px 2px 15px;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;transition:transform .35s cubic-bezier(.3,1.3,.5,1),color .25s}
.u276-a b{font-size:22px;font-weight:800;letter-spacing:-.03em;flex:1;white-space:nowrap}
.u276-a span{font-size:10.5px;font-weight:650;color:#8D8880}
.u276-a i{font-style:normal;font-size:16px;opacity:0;transform:translateX(-8px);transition:opacity .25s,transform .3s}
.u276-ls.is-hov .u276-a{color:#5C5852}
.u276-ls.is-hov .u276-a.is-on{color:#F2EFEA;transform:translateX(10px)}
.u276-a.is-on i{opacity:1;transform:none}
.u276-a:focus-visible{outline:2px solid #F2EFEA;outline-offset:2px}
.u276-pv{position:absolute;left:0;top:0;width:120px;height:150px;border-radius:6px;overflow:hidden;pointer-events:none;opacity:0;transform:scale(.6);transition:opacity .25s,transform .35s cubic-bezier(.3,1.4,.5,1);z-index:3;box-shadow:0 20px 40px -16px rgba(0,0,0,.8)}
.u276-pv.is-on{opacity:1;transform:scale(1)}
.u276-st{position:absolute;left:0;top:0;width:100%;transition:transform .5s cubic-bezier(.6,0,.2,1)}
.u276-st i{display:block;width:120px;height:150px}
@media (prefers-reduced-motion: reduce){.u276-st{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u276');
  var ls = root.querySelector('.u276-ls'), pv = root.querySelector('.u276-pv'), st = root.querySelector('.u276-st');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WK = [['House of Wind', 'Architecture', '2026'], ['Salt Studio', 'Branding', '2025'], ['Night Library', 'App', '2025'], ['Blue Garden', 'Exhibition', '2024'], ['Paper Workshop', 'Packaging', '2024'], ['Slow Post Office', 'Web', '2023']];
  var ART = ['linear-gradient(160deg,#DEE2E6,#868E96 60%,#343A40)', 'linear-gradient(#FFF 0 30%,#E9ECEF 30% 70%,#CED4DA 70%)', 'radial-gradient(circle at 50% 30%,#FFE066 0 14%,#1B1F3B 15%)', 'linear-gradient(#A5D8FF 0 40%,#2F9E44 40%)', 'linear-gradient(135deg,#F8F0E3 0 50%,#D9B482 50%)', 'linear-gradient(#FFA8A8 0 50%,#C92A2A 50%)'];
  ART.forEach(function (a) { var i = document.createElement('i'); i.style.background = a; st.appendChild(i); });
  var cur = -1, pos = { x: 0, y: 0 }, sp = { x: 0, y: 0 }, vx = 0, raf = 0, last = 0, anchored = false;
  var B = WK.map(function (w, i) {
    var li = document.createElement('li'); li.className = 'u276-it';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u276-a';
    b.innerHTML = '<b>' + w[0] + '</b><span>' + w[1] + ' · ' + w[2] + '</span><i aria-hidden="true">→</i>';
    li.appendChild(b); ls.appendChild(li);
    b.addEventListener('pointerenter', function () { pick(i); });
    b.addEventListener('focus', function () { anchored = true; pick(i); var r = b.getBoundingClientRect(), rr = root.getBoundingClientRect(), k = root.offsetWidth / (rr.width || 1); pos.x = 200; pos.y = (r.top - rr.top) * k + r.height * k / 2; if (!pv.classList.contains('is-on')) { sp.x = pos.x; sp.y = pos.y; } kick(); });
    b.addEventListener('blur', function () { if (anchored) { anchored = false; pick(-1); } });
    return b;
  });
  // 사진 띠는 세로로 쌓여 있고, 고른 줄 번호만큼 위로 밀어 그 사진이 창에 보이게 합니다
  function pick(i) {
    if (i === cur) return;
    cur = i;
    B.forEach(function (b, j) { b.classList.toggle('is-on', j === i); });
    ls.classList.toggle('is-hov', i >= 0);
    pv.classList.toggle('is-on', i >= 0);
    if (i >= 0) st.style.transform = 'translateY(' + (-i * 150) + 'px)';
  }
  // 미리보기는 커서보다 살짝 늦게(스프링) 따라오고, 가로 속도만큼 기울어집니다
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.033, Math.max(0, (now - last) / 1000)); last = now;
    var tx = pos.x + 18, ty = pos.y - 75, k = rm ? 1 : Math.min(1, dt * 9);
    var nx = sp.x + (tx - sp.x) * k; vx = (nx - sp.x) / Math.max(dt, 0.001); sp.x = nx; sp.y += (ty - sp.y) * k;
    var tilt = Math.max(-12, Math.min(12, vx * 0.02));
    pv.style.left = sp.x.toFixed(1) + 'px'; pv.style.top = sp.y.toFixed(1) + 'px'; pv.style.rotate = (rm ? 0 : tilt).toFixed(2) + 'deg';
    if (Math.abs(tx - sp.x) + Math.abs(ty - sp.y) > 0.5 || Math.abs(tilt) > 0.2) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  root.addEventListener('pointermove', function (e) {
    var r = root.getBoundingClientRect(), k = root.offsetWidth / (r.width || 1);
    pos.x = Math.min(170, (e.clientX - r.left) * k); pos.y = (e.clientY - r.top) * k; anchored = false;
    // 시연처럼 목록 상자로 이벤트가 올 때도 줄을 고를 수 있게 좌표로 찾습니다
    var hitEl = document.elementFromPoint(e.clientX, e.clientY), b = hitEl && hitEl.closest && hitEl.closest('.u276-a');
    pick(b ? B.indexOf(b) : -1);
    if (cur >= 0 && !pv.dataset.seen) { pv.dataset.seen = 1; sp.x = pos.x + 18; sp.y = pos.y - 75; }
    kick();
  });
  root.addEventListener('pointerleave', function () { pick(-1); delete pv.dataset.seen; });
})();
  })();

  scope.ready();
  return scope.controller;
}
