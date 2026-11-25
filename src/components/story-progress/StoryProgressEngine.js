// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStoryProgress(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u376">
  <div class="u376-cube"></div>
  <button class="u376-hit" type="button" aria-label="Previous scene"></button>
  <button class="u376-hit" type="button" aria-label="Next scene, hold to pause"></button>
  <span class="u376-sr" role="status" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></span>
</div>
`,
      css: `

.u376{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:#000;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;perspective:900px;color:#fff}
.u376-cube{position:absolute;inset:0;transform-style:preserve-3d;transform:translateZ(-150px) rotateY(var(--ry,0deg));transition:transform .7s cubic-bezier(.5,0,.25,1)}
.u376-face{position:absolute;inset:0;backface-visibility:hidden;overflow:hidden}
.u376-face:nth-child(1){transform:rotateY(0deg) translateZ(150px)}
.u376-face:nth-child(2){transform:rotateY(90deg) translateZ(150px)}
.u376-sc{position:absolute;inset:0;background:var(--bg);transition:opacity .35s}
.u376-sc b{position:absolute;left:20px;bottom:40px;font-size:28px;font-weight:900;letter-spacing:-.04em;text-shadow:0 2px 14px rgba(0,0,0,.3)}
.u376-bars{position:absolute;left:10px;right:10px;top:10px;display:flex;gap:4px;transition:opacity .3s}
.u376-bars i{flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.35);overflow:hidden}
.u376-bars i b{display:block;height:100%;background:#fff;transform-origin:0 50%;transform:scaleX(var(--p,0))}
.u376-hd{position:absolute;left:12px;top:22px;display:flex;align-items:center;gap:8px;transition:opacity .3s}
.u376-hd i{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 0 0 2px #fff}
.u376-hd b{font-size:13.5px;font-weight:750}
.u376-hd span{font-size:12px;opacity:.7}
.u376.is-hold .u376-bars,.u376.is-hold .u376-hd{opacity:0}
.u376-hit{position:absolute;top:60px;bottom:0;border:0;padding:0;background:none;z-index:5}
.u376-hit:first-of-type{left:0;width:33%}
.u376-hit:last-of-type{right:0;width:67%}
.u376-hit:focus-visible{outline:2px solid #fff;outline-offset:-6px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u376');
  var cube = root.querySelector('.u376-cube'), hits = root.querySelectorAll('.u376-hit'), sr = root.querySelector('.u376-sr');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var USERS = [['Sua', '2h ago', ['Jeju sea', 'Today’s sky', 'Dinner']], ['Minho', '5h ago', ['New studio', 'First coffee']]];
  var BG = [['linear-gradient(#74C0FC,#1864AB)', 'linear-gradient(#FFD8A8,#F783AC)', 'radial-gradient(circle at 50% 60%,#FFA94D,#C92A2A)'], ['linear-gradient(135deg,#E9ECEF,#868E96)', 'radial-gradient(circle at 50% 40%,#D9B38C,#5C3D2E)']];
  var AV = [['#FFA8A8', '#FFD43B'], ['#74C0FC', '#B197FC']];
  var DUR = 3200, u = 0, s = 0, t = 0, last = 0, hold = false, raf = 0, faces = [];
  // 사람마다 정육면체의 한 면을 씁니다
  USERS.forEach(function (us, ui) {
    var f = document.createElement('div');
    f.className = 'u376-face';
    var bars = us[2].map(function () { return '<i><b></b></i>'; }).join('');
    f.innerHTML = '<div class="u376-sc"><b></b></div><div class="u376-bars">' + bars + '</div><div class="u376-hd"><i style="--a:' + AV[ui][0] + ';--b:' + AV[ui][1] + '"></i><div><b></b> <span></span></div></div>';
    f.querySelector('.u376-hd b').textContent = us[0];
    f.querySelector('.u376-hd span').textContent = us[1];
    cube.appendChild(f);
    faces.push(f);
  });
  function render() {
    var f = faces[u], sc = f.querySelector('.u376-sc');
    sc.style.setProperty('--bg', BG[u][s]);
    sc.querySelector('b').textContent = USERS[u][2][s];
    f.querySelectorAll('.u376-bars i b').forEach(function (b, k) { b.style.setProperty('--p', k < s ? 1 : k > s ? 0 : Math.min(1, t / DUR).toFixed(3)); });
  }
  function to(nu, ns) {
    if (nu !== u) { cube.style.setProperty('--ry', (nu > u ? -90 : 0) + 'deg'); }
    u = Math.max(0, Math.min(USERS.length - 1, nu)); s = ns; t = 0;
    render();
  }
  function next() {
    if (s < USERS[u][2].length - 1) to(u, s + 1);
    else if (u < USERS.length - 1) to(u + 1, 0);
    else { cube.style.setProperty('--ry', '0deg'); to(0, 0); }
  }
  function prev() {
    if (s > 0) to(u, s - 1);
    else if (u > 0) { cube.style.setProperty('--ry', '0deg'); u -= 1; to(u, USERS[u][2].length - 1); }
    else to(0, 0);
  }
  function tick(now) {
    if (!root.isConnected) return;
    var dt = Math.max(0, Math.min(50, now - (last || now)));
    last = now;
    if (!hold && !rm) { t += dt; if (t >= DUR) next(); else render(); }
    raf = requestAnimationFrame(tick);
  }
  // 오른쪽: 짧게 누르면 다음, 길게 누르면 멈춤. 왼쪽: 이전
  var downAt = 0, holdT = 0;
  hits[1].addEventListener('pointerdown', function () { downAt = performance.now(); holdT = setTimeout(function () { hold = true; root.classList.add('is-hold'); sr.textContent = 'Paused'; }, 260); });
  function release() { clearTimeout(holdT); if (hold) { setTimeout(function () { hold = false; root.classList.remove('is-hold'); sr.textContent = ''; }, 0); } }
  hits[1].addEventListener('pointerup', release);
  hits[1].addEventListener('pointercancel', release);
  hits[1].addEventListener('click', function () { if (performance.now() - downAt < 260 || !downAt) next(); downAt = 0; });
  hits[0].addEventListener('click', prev);
  render();
  raf = requestAnimationFrame(tick);
})();
  })();

  scope.ready();
  return scope.controller;
}
