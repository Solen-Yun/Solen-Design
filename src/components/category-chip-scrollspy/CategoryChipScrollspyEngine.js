// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountCategoryChipScrollspy(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u242">
  <div class="u242-sc" tabindex="0" aria-label="Menu">
    <div class="u242-hr" aria-hidden="true"></div>
    <div class="u242-if"><h3>Neighborhood Salad Bar</h3><p>★ 4.9 · Delivery 20–30 min · $12 minimum</p></div>
    <div class="u242-cb"><nav class="u242-cr" aria-label="Menu categories"><span class="u242-ul" aria-hidden="true"></span></nav></div>
    <div class="u242-bd"></div><div class="u242-end" aria-hidden="true"></div>
  </div>
</div>
`,
      css: `

.u242{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u242-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.u242-sc::-webkit-scrollbar{display:none}
.u242-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:32px}
.u242-hr{height:150px;background:linear-gradient(150deg,#86EFAC,#22C55E);position:relative}
.u242-hr::after{content:"";position:absolute;left:50%;top:44%;width:96px;height:56px;margin-left:-48px;border-radius:0 0 48px 48px;background:#FEFCE8;box-shadow:inset 0 -10px 0 #FDE68A}
.u242-if{padding:14px 18px 10px}
.u242-if h3{margin:0;font-size:18px;font-weight:900;letter-spacing:-.03em}
.u242-if p{margin:4px 0 0;font-size:10.5px;font-weight:700;color:var(--ux-ink-3)}
.u242-cb{position:sticky;top:0;z-index:2;background:var(--ux-surface);transition:box-shadow .25s}
.u242-cb.is-stuck{box-shadow:0 8px 16px -12px var(--ux-shadow-strong)}
.u242-cr{position:relative;display:flex;gap:4px;padding:8px 14px 9px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--ux-line)}
.u242-cr::-webkit-scrollbar{display:none}
.u242-ch{flex:none;height:32px;padding:0 12px;border:0;border-radius:999px;background:none;color:var(--ux-ink-3);font:inherit;font-size:12px;font-weight:850;cursor:pointer;white-space:nowrap;transition:color .2s}
.u242-ch[aria-current="true"]{color:var(--ux-ink)}
.u242-ch:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-2px}
.u242-ul{position:absolute;left:0;bottom:6px;height:32px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);transition:transform .35s cubic-bezier(.3,1.2,.5,1),width .35s cubic-bezier(.3,1.2,.5,1);z-index:-1}
.u242-cr>.u242-ch{position:relative;z-index:1}
.u242-sx{padding:14px 18px 4px}
.u242-sx h4{margin:0 0 6px;font-size:14px;font-weight:900}
.u242-it{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--ux-line)}
.u242-it div{flex:1;min-width:0}
.u242-it b{display:block;font-size:12.5px;font-weight:800}
.u242-it span{display:block;margin-top:2px;font-size:11.5px;font-weight:850;color:var(--ux-ink-2);font-variant-numeric:tabular-nums}
.u242-it i{flex:none;width:58px;height:58px;border-radius:14px}
.u242-end{height:160px}
@media (prefers-reduced-motion: reduce){.u242-ul,.u242-cb{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u242');
  var sc = root.querySelector('.u242-sc'), cb = root.querySelector('.u242-cb'), cr = root.querySelector('.u242-cr'), ul = root.querySelector('.u242-ul'), bd = root.querySelector('.u242-bd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SEC = [['Popular', [['Salmon poke', '$14.90'], ['Chicken salad', '$11.90']]], ['Salads', [['Caesar salad', '$10.90'], ['Cobb salad', '$12.50'], ['Greek salad', '$11.50']]], ['Poke', [['Tuna poke', '$15.90'], ['Tofu poke', '$12.90']]], ['Wraps', [['Chicken wrap', '$9.90'], ['Avocado sandwich', '$10.50']]], ['Drinks', [['Lemonade', '$4.50'], ['Kombucha', '$5.00']]], ['Desserts', [['Greek yogurt', '$4.90'], ['Oat cookie', '$2.50']]]];
  var COL = ['#FDBA74', '#86EFAC', '#FCA5A5', '#FDE68A', '#93C5FD', '#F9A8D4'];
  var uid = 'u242' + Math.random().toString(36).slice(2, 7);
  var S = [], C = [];
  SEC.forEach(function (s, i) {
    var sx = document.createElement('section'); sx.className = 'u242-sx'; sx.id = uid + i; sx.innerHTML = '<h4></h4>'; sx.firstChild.textContent = s[0];
    s[1].forEach(function (m, k) { var it = document.createElement('div'); it.className = 'u242-it'; it.innerHTML = '<div><b></b><span></span></div><i style="background:linear-gradient(135deg,' + COL[i] + ',color-mix(in srgb,' + COL[i] + ' 60%,#fff))"></i>'; it.querySelector('b').textContent = m[0]; it.querySelector('span').textContent = m[1]; sx.appendChild(it); });
    bd.appendChild(sx); S.push(sx);
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u242-ch'; b.textContent = s[0]; b.setAttribute('aria-controls', sx.id);
    b.addEventListener('click', function () { go(i); });
    cr.appendChild(b); C.push(b);
  });
  var cur = -1, lock = 0;
  // 밑줄 알약을 지금 칩으로 옮기고, 칩 줄을 그 칩이 가운데쯤 오도록 밀어 줍니다
  function mark(i) {
    if (i === cur) return; cur = i;
    C.forEach(function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    var b = C[i]; ul.style.width = b.offsetWidth + 'px'; ul.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    var x = b.offsetLeft - (cr.clientWidth - b.offsetWidth) / 2, x0 = cr.scrollLeft, t0 = performance.now();
    x = Math.max(0, Math.min(cr.scrollWidth - cr.clientWidth, x));
    (function f(now) { var k = rm ? 1 : Math.min(1, (now - t0) / 320), e = 1 - Math.pow(1 - k, 3); cr.scrollLeft = x0 + (x - x0) * e; if (k < 1) requestAnimationFrame(f); })(t0);
  }
  function barH() { return cb.offsetHeight; }
  // 스크롤 위치에서 지금 구역을 찾습니다 (칩 줄 아래 화면 위쪽 3분의 1 선을 기준으로, 맨 끝에 닿으면 마지막 구역)
  function spy() {
    cb.classList.toggle('is-stuck', cb.offsetTop - sc.scrollTop <= 0.5);
    if (Date.now() < lock) return;
    var y = sc.scrollTop + barH() + (sc.clientHeight - barH()) * 0.3, i = 0;
    S.forEach(function (s, k) { if (s.offsetTop <= y) i = k; });
    if (sc.scrollTop >= sc.scrollHeight - sc.clientHeight - 2) i = S.length - 1;
    mark(i);
  }
  function go(i) {
    mark(i); lock = Date.now() + (rm ? 0 : 700);
    var to = S[i].offsetTop - barH() + 2, y0 = sc.scrollTop, t0 = performance.now();
    (function f(now) { var k = rm ? 1 : Math.min(1, (now - t0) / 600), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; sc.scrollTop = y0 + (to - y0) * e; if (k < 1) requestAnimationFrame(f); })(t0);
  }
  sc.addEventListener('scroll', spy, { passive: true });
  mark(0); requestAnimationFrame(function () { cur = -1; mark(0); spy(); });
})();
  })();

  scope.ready();
  return scope.controller;
}
