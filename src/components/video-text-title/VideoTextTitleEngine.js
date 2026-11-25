// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountVideoTextTitle(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u310 is-play">
  <div class="u310-k">2026 season collection</div>
  <h3 class="u310-t" data-s="0">Summer<br>is here</h3>
  <div class="u310-fd" aria-hidden="true"></div>
  <div class="u310-bt"><div role="group" aria-label="Choose scene" style="display:flex;gap:6px" class="u310-chs"></div><button type="button" class="u310-pp"><svg class="u310-pa" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx=".8" fill="currentColor"/><rect x="7" y="1.5" width="3" height="9" rx=".8" fill="currentColor"/></svg><svg class="u310-pl" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor"/></svg></button></div>
</div>
`,
      css: `

.u310{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);--mx:50%;--my:50%}
.u310-k{position:absolute;left:0;right:0;top:34px;text-align:center;font-size:10.5px;font-weight:850;letter-spacing:.14em;color:var(--ux-ink-3)}
.u310-t{position:absolute;left:0;right:0;top:58px;margin:0;text-align:center;font-size:92px;line-height:.92;font-weight:950;letter-spacing:-.06em;color:transparent;-webkit-background-clip:text;background-clip:text;background-size:240% 240%;background-position:var(--bx,30%) var(--by,40%);transition:background-position .6s cubic-bezier(.2,.8,.3,1)}
.u310-t[data-s="0"]{background-image:radial-gradient(30% 40% at 30% 30%,#E0F2FE,transparent 70%),repeating-linear-gradient(170deg,#0EA5E9 0 14px,#0284C7 14px 30px,#38BDF8 30px 40px),linear-gradient(#7DD3FC,#0369A1)}
.u310-t[data-s="1"]{background-image:radial-gradient(22% 28% at 60% 62%,#FEF3C7,#FB923C 40%,transparent 70%),linear-gradient(180deg,#7C3AED,#EC4899 45%,#F97316 70%,#7C2D12)}
.u310-t[data-s="2"]{background-image:radial-gradient(20% 30% at 70% 20%,#FEF9C3,transparent 70%),repeating-linear-gradient(80deg,#14532D 0 10px,#166534 10px 22px,#22C55E 22px 26px),linear-gradient(#86EFAC,#14532D)}
.u310.is-play .u310-t{animation:u310-flow 9s linear infinite}
/* 커서를 올린 동안은 흐름을 멈추고 커서 쪽 장면을 보여 줍니다 */
.u310 .u310-t.is-hov{animation:none}
@keyframes u310-flow{0%{background-position:0% 30%}50%{background-position:100% 70%}100%{background-position:0% 30%}}
.u310-fd{position:absolute;inset:0;background:var(--ux-surface);opacity:0;pointer-events:none;transition:opacity .25s}
.u310.is-swap .u310-fd{opacity:.85}
.u310-bt{position:absolute;left:18px;right:18px;bottom:22px;display:flex;align-items:center;gap:6px}
.u310-ch{border:0;padding:7px 12px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:11.5px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background .2s,color .2s}
.u310-ch i{width:10px;height:10px;border-radius:50%}
.u310-ch.is-on{background:var(--ux-ink);color:var(--ux-surface);box-shadow:none}
.u310-pp{margin-left:auto;width:34px;height:34px;border:0;border-radius:50%;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink);display:grid;place-items:center;cursor:pointer}
.u310-pp svg{width:12px;height:12px}
.u310-pp .u310-pl{display:none}
.u310:not(.is-play) .u310-pp .u310-pl{display:block}
.u310:not(.is-play) .u310-pp .u310-pa{display:none}
.u310-ch:focus-visible,.u310-pp:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u310.is-play .u310-t{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u310');
  var t = root.querySelector('.u310-t'), chs = root.querySelector('.u310-chs'), pp = root.querySelector('.u310-pp');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SC = ['Ocean', 'Sunset', 'Forest'], DOT = ['#0EA5E9', '#F97316', '#22C55E'], B = [];
  SC.forEach(function (s, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u310-ch'; b.innerHTML = '<i style="background:' + DOT[i] + '"></i>' + s;
    b.addEventListener('click', function () { pick(i); }); chs.appendChild(b); B.push(b);
  });
  // 장면을 바꿀 때 잠깐 덮었다 걷어 자연스럽게 넘깁니다
  function pick(i) {
    B.forEach(function (b, k) { b.classList.toggle('is-on', k === i); b.setAttribute('aria-pressed', k === i); });
    if (rm || t.dataset.s === String(i)) { t.dataset.s = i; return; }
    root.classList.add('is-swap');
    setTimeout(function () { t.dataset.s = i; root.classList.remove('is-swap'); }, 230);
  }
  function setPlay(on) { root.classList.toggle('is-play', on && !rm); pp.setAttribute('aria-label', on ? 'Pause' : 'Play'); }
  pp.addEventListener('click', function () { setPlay(!root.classList.contains('is-play')); });
  // 커서 쪽으로 글자 속 장면을 끌어옵니다
  t.addEventListener('pointerenter', function () { t.classList.add('is-hov'); });
  t.addEventListener('pointerleave', function () { t.classList.remove('is-hov'); });
  t.addEventListener('pointermove', function (e) { var r = t.getBoundingClientRect(); t.style.setProperty('--bx', (20 + 60 * (e.clientX - r.left) / r.width).toFixed(1) + '%'); t.style.setProperty('--by', (20 + 60 * (e.clientY - r.top) / r.height).toFixed(1) + '%'); });
  pick(0); setPlay(!rm);
})();
  })();

  scope.ready();
  return scope.controller;
}
