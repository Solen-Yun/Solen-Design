// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountVelocitySkewList(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u351">
  <div class="u351-hd"><b>Weekend plans</b><span class="u351-g" aria-hidden="true">Scroll speed<svg viewBox="0 0 44 26"><path d="M4 24a18 18 0 0 1 36 0"/><line x1="22" y1="24" x2="22" y2="9"/></svg></span></div>
  <div class="u351-sc" tabindex="0" aria-label="Weekend plans"><ul class="u351-ls"></ul></div>
</div>
`,
      css: `

.u351{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;display:flex;flex-direction:column;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u351-hd{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 10px}
.u351-hd b{font-size:17px;font-weight:850}
.u351-g{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:750;color:var(--ux-ink-3)}
.u351-g svg{width:44px;height:26px;overflow:visible}
.u351-g path{fill:none;stroke:var(--ux-line-2);stroke-width:4;stroke-linecap:round}
.u351-g line{stroke:var(--ux-danger);stroke-width:2.5;stroke-linecap:round;transform-box:view-box;transform-origin:22px 24px}
.u351-sc{flex:1;overflow-y:auto;padding:4px 16px 16px;scrollbar-width:none;outline:none}
.u351-sc::-webkit-scrollbar{display:none}
.u351-ls{margin:0;padding:0;list-style:none;display:grid;gap:10px;transform-origin:50% 50%;will-change:transform}
.u351-it{display:flex;align-items:center;gap:12px;height:68px;padding:0 14px;border-radius:18px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u351-it i{flex:none;width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,var(--a),var(--b))}
.u351-it b{display:block;font-size:14.5px;font-weight:780}
.u351-it span{font-size:12px;font-weight:650;color:var(--ux-ink-3)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u351');
  var sc = root.querySelector('.u351-sc'), ls = root.querySelector('.u351-ls'), needle = root.querySelector('.u351-g line');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ITEMS = ['Seoul Forest walk', 'Euljiro film lab', 'Mangwon market tteokbokki', 'Seongsu studio visit', 'Han River sunset ride', 'Tea in Ikseon-dong', 'Bukchon alley photos', 'Yeonnam park picnic', 'Seochon bookshop tour', 'Namsan night walk'];
  var C = [['#FF8787', '#FFD43B'], ['#74C0FC', '#B197FC'], ['#63E6BE', '#4DABF7'], ['#FFA94D', '#F783AC'], ['#A9E34B', '#38D9A9']];
  ITEMS.forEach(function (t, i) {
    var li = document.createElement('li');
    li.className = 'u351-it';
    li.innerHTML = '<i style="--a:' + C[i % 5][0] + ';--b:' + C[i % 5][1] + '"></i><div><b></b><span>' + (1 + (i * 7) % 5) + '.' + (i * 3 % 10) + ' km · ' + (30 + i * 15) + ' min</span></div>';
    li.querySelector('b').textContent = t;
    ls.appendChild(li);
  });
  var lastY = 0, lastT = 0, vel = 0, skew = 0, sv = 0, raf = 0;
  sc.addEventListener('scroll', function () {
    var now = performance.now(), dt = Math.max(8, now - (lastT || now - 16));
    var v = (sc.scrollTop - lastY) / dt;
    lastY = sc.scrollTop; lastT = now;
    vel = vel * 0.6 + v * 0.4;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  // 속도를 목표 기울기로 바꾸고, 스프링으로 따라가게 해 멈출 때 한 번 흔들립니다
  function tick() {
    raf = 0;
    if (!root.isConnected) return;
    if (performance.now() - lastT > 60) vel *= 0.6;
    var target = rm ? 0 : Math.max(-10, Math.min(10, -vel * 3.2));
    sv += (target - skew) * 0.2; sv *= 0.72; skew += sv;
    ls.style.transform = 'skewY(' + skew.toFixed(2) + 'deg) scaleY(' + (1 + Math.min(0.06, Math.abs(skew) * 0.006)).toFixed(3) + ')';
    needle.style.transform = 'rotate(' + Math.max(-80, Math.min(80, -88 + Math.min(1, Math.abs(vel) / 3) * 176)).toFixed(1) + 'deg)';
    if (Math.abs(skew) > 0.02 || Math.abs(sv) > 0.02 || Math.abs(vel) > 0.01) raf = requestAnimationFrame(tick);
    else { ls.style.transform = ''; needle.style.transform = 'rotate(-88deg)'; }
  }
  needle.style.transform = 'rotate(-88deg)';
})();
  })();

  scope.ready();
  return scope.controller;
}
