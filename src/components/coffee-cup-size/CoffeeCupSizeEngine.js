// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountCoffeeCupSize(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u313">
  <div class="u313-hd"><b>Americano</b><span class="u313-pr" aria-live="polite"></span></div>
  <div class="u313-st">
    <svg viewBox="0 0 200 220" aria-hidden="true">
      <g><path class="u313-steam" d="M86 40c-6-8 6-14 0-24"/><path class="u313-steam" d="M110 40c-6-8 6-14 0-24"/></g>
      <rect class="u313-pour" x="96" y="0" width="8" height="150" rx="4"/>
      <g class="u313-cup">
        <defs><clipPath id="u313-c"><path class="u313-cp" d="M58 64h84l-10 146H68z"/></clipPath></defs>
        <g class="u313-clip" clip-path="url(#u313-c)"><rect class="u313-cof" x="40" y="0" width="120" height="220"/><rect class="u313-foam" x="40" y="0" width="120" height="14"/></g>
        <path class="u313-glass" d="M58 64h84l-10 146H68z"/>
        <path class="u313-sleeve" d="M62 120h76l-3 40H65z"/>
      </g>
    </svg>
  </div>
  <div class="u313-sizes" role="group" aria-label="Size"><button class="u313-sz" type="button" aria-pressed="false">Small</button><button class="u313-sz" type="button" aria-pressed="true">Regular</button><button class="u313-sz" type="button" aria-pressed="false">Large</button></div>
  <div class="u313-row"><span>Shots</span><div class="u313-step"><button class="u313-pm" type="button" aria-label="Remove a shot">−</button><span class="u313-n">2</span><button class="u313-pm" type="button" aria-label="Add a shot">+</button></div></div>
  <div class="u313-row"><button class="u313-milk" type="button" aria-pressed="false"><i aria-hidden="true"></i>Add milk</button></div>
  <button class="u313-add" type="button">Add</button>
</div>
`,
      css: `

.u313{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;display:flex;flex-direction:column;padding:20px;border-radius:30px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u313-hd{display:flex;justify-content:space-between;align-items:baseline}
.u313-hd b{font-size:19px;font-weight:850;letter-spacing:-.03em}
.u313-pr{display:flex;height:22px;overflow:hidden;font:800 16px/22px ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums}
.u313-pr .c{display:inline-block;width:.62em;height:22px;overflow:hidden}
.u313-pr .c span{display:block;transition:transform .5s var(--ux-spring)}
.u313-pr small{font-size:12px;font-family:inherit;margin-left:2px;color:var(--ux-ink-3)}
.u313-st{position:relative;flex:1;display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px}
.u313-st svg{width:200px;height:220px;overflow:visible}
.u313-cup{transform-box:view-box;transform-origin:100px 212px;transition:transform .6s cubic-bezier(.3,1.4,.5,1)}
.u313-glass{fill:color-mix(in srgb,var(--ux-ink) 4%,transparent);stroke:var(--ux-ink-2);stroke-width:3}
.u313-sleeve{fill:#C9A27A}
.u313-cof{fill:var(--cof,#7A4A26);transition:fill .5s}
.u313-foam{fill:#F4EBDD;transition:opacity .4s}
.u313-pour{fill:var(--cof,#7A4A26);opacity:0}
.u313-pour.on{animation:u313-pour .7s ease}
@keyframes u313-pour{0%{opacity:0;transform:scaleY(0)}20%,70%{opacity:1;transform:none}100%{opacity:0;transform:translateY(40px) scaleY(.2)}}
.u313-steam{fill:none;stroke:var(--ux-ink-3);stroke-width:2.5;stroke-linecap:round;opacity:.5;animation:u313-st 2.4s ease-in-out infinite}
.u313-steam:nth-child(2){animation-delay:.8s}
@keyframes u313-st{0%{opacity:0;transform:translateY(8px)}50%{opacity:.5}100%{opacity:0;transform:translateY(-10px)}}
.u313-sizes{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:4px;border-radius:14px;background:var(--ux-surface-2)}
.u313-sz{height:36px;border:0;border-radius:10px;background:none;font-size:13px;font-weight:750;color:var(--ux-ink-3);transition:background-color .25s,color .25s}
.u313-sz[aria-pressed="true"]{background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 4px 10px -6px var(--ux-shadow-strong)}
.u313-row{display:flex;align-items:center;justify-content:space-between;margin-top:12px;font-size:13.5px;font-weight:750}
.u313-step{display:flex;align-items:center;gap:10px}
.u313-pm{width:32px;height:32px;border:0;border-radius:50%;background:var(--ux-surface-2);font-size:18px;color:var(--ux-ink)}
.u313-n{min-width:14px;text-align:center;font-variant-numeric:tabular-nums}
.u313-milk{display:flex;align-items:center;gap:8px;border:0;background:none;padding:0;font-size:13.5px;font-weight:750;color:var(--ux-ink)}
.u313-milk i{position:relative;width:38px;height:22px;border-radius:999px;background:var(--ux-surface-3);transition:background-color .3s}
.u313-milk i::after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .4s var(--ux-spring)}
.u313-milk[aria-pressed="true"] i{background:#C9A27A}
.u313-milk[aria-pressed="true"] i::after{transform:translateX(16px)}
.u313-add{height:46px;margin-top:14px;border:0;border-radius:15px;background:var(--ux-ink);color:var(--ux-page);font-size:14px;font-weight:800}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u313');
  var cup = root.querySelector('.u313-cup'), cof = root.querySelector('.u313-cof'), foam = root.querySelector('.u313-foam'), pour = root.querySelector('.u313-pour'), pr = root.querySelector('.u313-pr'), nEl = root.querySelector('.u313-n');
  var szs = Array.prototype.slice.call(root.querySelectorAll('.u313-sz')), pms = root.querySelectorAll('.u313-pm'), milkB = root.querySelector('.u313-milk');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cid = 'u313-c' + Math.random().toString(36).slice(2, 7);
  root.querySelector('clipPath').id = cid;
  root.querySelector('.u313-clip').setAttribute('clip-path', 'url(#' + cid + ')');
  // 크기별 컵 배율(가로, 세로)과 가격
  var SIZE = [[0.82, 0.74, 3800], [1, 1, 4300], [1.12, 1.22, 4800]];
  var size = 1, shots = 2, milk = false, level = 0, fillY = 210;
  function color() { var c = ['#B07A4A', '#8E5A30', '#6E4222', '#4E2C15', '#3A1F0E'][Math.min(4, shots)]; return milk ? 'color-mix(in srgb,' + c + ' 70%,#F4EBDD)' : c; }
  function price() { return SIZE[size][2] + Math.max(0, shots - 2) * 500 + (milk ? 500 : 0); }
  function renderPrice() {
    var s = price().toLocaleString('en-US');
    if (pr.children.length !== s.length + 1) {
      pr.innerHTML = '';
      Array.from(s).forEach(function (ch) { var c = document.createElement('span'); c.className = 'c'; c.innerHTML = /\d/.test(ch) ? '<span>' + '0123456789'.split('').join('<br>') + '</span>' : '<span>' + ch + '</span>'; pr.appendChild(c); });
      var w = document.createElement('small'); w.textContent = ' KRW'; pr.appendChild(w);
    }
    Array.from(s).forEach(function (ch, i) { if (/\d/.test(ch)) pr.children[i].firstChild.style.transform = 'translateY(' + (-22 * +ch) + 'px)'; });
  }
  // 컵을 새 크기로 바꾼 뒤 커피를 위에서 따르며 수위를 맞춥니다
  function render(poured) {
    var s = SIZE[size];
    cup.style.transform = 'scale(' + s[0] + ',' + s[1] + ')';
    root.style.setProperty('--cof', color());
    var target = 210 - (34 + shots * 12 + (milk ? 28 : 0)) * 1.2;
    target = Math.max(78, target);
    var from = fillY;
    fillY = target;
    var y0 = from, t0 = performance.now(), D = rm ? 1 : 700;
    if (poured && !rm) { pour.classList.remove('on'); void pour.getBoundingClientRect(); pour.classList.add('on'); }
    (function f(now) {
      if (!root.isConnected) return;
      var k = Math.min(1, Math.max(0, (now - t0) / D)), e = 1 - Math.pow(1 - k, 3), y = y0 + (target - y0) * e;
      cof.setAttribute('y', y.toFixed(1));
      foam.setAttribute('y', (y - 2).toFixed(1));
      foam.style.opacity = milk ? 1 : 0;
      if (k < 1) requestAnimationFrame(f);
    })(t0);
    nEl.textContent = shots;
    renderPrice();
  }
  szs.forEach(function (b, i) { b.addEventListener('click', function () { size = i; szs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); render(true); }); });
  pms[0].addEventListener('click', function () { if (shots > 1) { shots -= 1; render(false); } });
  pms[1].addEventListener('click', function () { if (shots < 4) { shots += 1; render(true); } });
  milkB.addEventListener('click', function () { milk = !milk; milkB.setAttribute('aria-pressed', String(milk)); render(milk); });
  render(true);
})();
  })();

  scope.ready();
  return scope.controller;
}
