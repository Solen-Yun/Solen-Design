// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDirectionAwareTiles(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u335"><div class="u335-gd" role="group" aria-label="Nine project tiles"></div></div>
`,
      css: `

.u335{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#F1EEE8;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);padding:18px}
.u335-gd{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:8px;width:100%;height:100%}
.u335-t{position:relative;overflow:hidden;border-radius:12px;padding:0;border:0;cursor:pointer;font:inherit;color:#fff}
.u335-t>i{position:absolute;inset:0}
.u335-ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;gap:2px;padding:10px;background:rgba(20,18,30,.82);text-align:left;transform:translate(0,-101%)}
.u335-ov.is-anim{transition:transform .32s cubic-bezier(.3,.8,.3,1)}
.u335-ov b{font-size:12px;font-weight:800;line-height:1.2;word-break:keep-all}
.u335-ov span{font-size:9.5px;font-weight:650;opacity:.7}
.u335-ov em{font-style:normal;font-size:10px;font-weight:800;margin-top:4px;color:#FFD8A8}
.u335-t:focus-visible{outline:2px solid #1E1B2E;outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u335-ov.is-anim{transition:opacity .2s}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u335');
  var gd = root.querySelector('.u335-gd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TT = [['House of Wind', 'Architecture'], ['Salt Studio', 'Branding'], ['Night Library', 'App'], ['Blue Garden', 'Exhibition'], ['Paper Workshop', 'Packaging'], ['Slow Post', 'Web'], ['Sea Cinema', 'Film'], ['Little Bakery', 'Branding'], ['Forest Sounds', 'Music']];
  var ART = ['linear-gradient(160deg,#ADB5BD,#343A40)', 'linear-gradient(#F8F9FA 0 40%,#CED4DA 40%)', 'radial-gradient(circle at 60% 30%,#FFE066 0 12%,#1B1F3B 13%)', 'linear-gradient(#A5D8FF 0 45%,#2F9E44 45%)', 'linear-gradient(135deg,#F8F0E3 0 50%,#D9B482 50%)', 'linear-gradient(#FFA8A8 0 55%,#C92A2A 55%)', 'linear-gradient(#1864AB 0 60%,#FCC419 60% 63%,#0B3D91 63%)', 'linear-gradient(150deg,#FFE8CC,#E8590C)', 'linear-gradient(160deg,#B2F2BB,#087F5B)'];
  // 변 번호: 0 위, 1 오른쪽, 2 아래, 3 왼쪽. 막이 그 변 바깥에 있을 때의 위치
  var OUT = ['translate(0,-101%)', 'translate(101%,0)', 'translate(0,101%)', 'translate(-101%,0)'];
  var T = TT.map(function (w, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u335-t'; b.setAttribute('aria-label', w[0] + ', ' + w[1]);
    b.innerHTML = '<i style="background:' + ART[i] + '"></i><span class="u335-ov" aria-hidden="true"><span>' + w[1] + '</span><b>' + w[0] + '</b><em>' + 'View →' + '</em></span>';
    gd.appendChild(b);
    var o = { el: b, ov: b.querySelector('.u335-ov') };
    b.addEventListener('focus', function () { show(o, 0); });
    b.addEventListener('blur', function () { hide(o, 2); });
    return o;
  });
  // 커서가 들어온(나간) 변: 타일 가운데에서 본 커서 각도로 정합니다(가로세로 비율 보정)
  function side(o, x, y) {
    var r = o.el.getBoundingClientRect(), dx = (x - r.left - r.width / 2) / r.width, dy = (y - r.top - r.height / 2) / r.height;
    return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0);
  }
  function show(o, s) {
    o.ov.classList.remove('is-anim'); o.ov.style.transform = rm ? 'none' : OUT[s]; o.ov.style.opacity = rm ? '0' : '';
    void o.ov.offsetWidth;
    o.ov.classList.add('is-anim'); o.ov.style.transform = 'none'; o.ov.style.opacity = '';
  }
  function hide(o, s) { o.ov.classList.add('is-anim'); if (rm) o.ov.style.opacity = '0'; else o.ov.style.transform = OUT[s]; }
  var cur = null;
  // 시연처럼 이벤트가 바둑판 상자로 올 때도 맞도록 실제 좌표 아래의 타일을 찾아 들고 나는 것을 판단합니다
  function at(e) { var el = document.elementFromPoint(e.clientX, e.clientY), t = el && el.closest && el.closest('.u335-t'); for (var i = 0; i < T.length; i++) if (T[i].el === t) return T[i]; return null; }
  function move(e) {
    var o = at(e);
    if (o === cur) return;
    if (cur) hide(cur, side(cur, e.clientX, e.clientY));
    if (o) show(o, side(o, e.clientX, e.clientY));
    cur = o;
  }
  root.addEventListener('pointermove', move);
  root.addEventListener('pointerleave', function (e) { if (cur) { hide(cur, side(cur, e.clientX, e.clientY)); cur = null; } });
})();
  })();

  scope.ready();
  return scope.controller;
}
