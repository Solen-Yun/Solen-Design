// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountMarkerHighlight(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 318,
      responsive: false,
      markup: `
<div class="ux u281">
  <p class="u281-k">Design notes · ch. 3</p>
  <p class="u281-p">A good interface <mark>can be used without explanation</mark>, leaves <mark>a quiet way back</mark> when you slip, and above all <mark>moves at a human pace.</mark></p>
  <div class="u281-ft">
    <div class="u281-pens" role="group" aria-label="Pen color">
      <button class="u281-pen" type="button" aria-pressed="true" aria-label="Yellow" style="--c:#FFD43B"><i></i></button>
      <button class="u281-pen" type="button" aria-pressed="false" aria-label="Mint" style="--c:#38D9A9"><i></i></button>
      <button class="u281-pen" type="button" aria-pressed="false" aria-label="Pink" style="--c:#FF6B9D"><i></i></button>
    </div>
    <button class="u281-again" type="button">Redraw</button>
  </div>
</div>
`,
      css: `

@property --u281-m{syntax:"<color>";inherits:true;initial-value:#FFD43B}
.u281{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:318px;display:flex;flex-direction:column;padding:22px 22px 18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;--u281-m:#FFD43B;transition:--u281-m .7s var(--ux-ease)}
.u281-k{margin:0;font-size:12px;font-weight:750;color:var(--ux-ink-3)}
.u281-p{margin:12px 0 0;font-size:19.5px;line-height:1.62;font-weight:650;letter-spacing:-.025em;color:var(--ux-ink-2)}
.u281-p mark{color:var(--ux-ink);border-radius:3px;
  background-image:linear-gradient(100deg,transparent .15em,color-mix(in srgb,var(--u281-m) 58%,transparent) .3em,color-mix(in srgb,var(--u281-m) 52%,transparent) calc(100% - .3em),transparent calc(100% - .1em));
  background-repeat:no-repeat;background-position:0 72%;background-size:0% 62%;transition:background-size var(--d,.6s) cubic-bezier(.55,.1,.3,1) var(--w,0s)}
.u281.is-on .u281-p mark{background-size:100% 62%}
.u281.is-off .u281-p mark{transition:background-size .35s ease;background-size:0% 62%}
.u281-ft{margin-top:auto;display:flex;align-items:center;gap:8px}
.u281-pens{display:flex;gap:6px;flex:1}
.u281-pen{position:relative;width:36px;height:36px;border:0;border-radius:12px;background:var(--ux-surface-2);display:grid;place-items:center;transition:transform .35s var(--ux-spring),box-shadow .25s}
.u281-pen i{width:12px;height:22px;border-radius:3px 3px 6px 6px;background:var(--c);transform:rotate(30deg);box-shadow:inset 0 -6px 0 rgba(0,0,0,.18)}
.u281-pen[aria-pressed="true"]{box-shadow:0 0 0 2px var(--ux-ink)}
.u281-pen:active{transform:scale(.9)}
.u281-again{height:38px;padding:0 15px;border:0;border-radius:999px;background:var(--ux-ink);color:var(--ux-page);font-size:13px;font-weight:750;transition:transform .35s var(--ux-spring)}
.u281-again:active{transform:scale(.93)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u281');
  var marks = Array.prototype.slice.call(root.querySelectorAll('mark'));
  var pens = Array.prototype.slice.call(root.querySelectorAll('.u281-pen'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0;
  // 구절 길이만큼 긋는 시간을 늘리고, 앞 구절이 끝나면 다음 구절을 시작합니다
  function timing() {
    var at = 0.25;
    marks.forEach(function (m) {
      var d = Math.min(1.4, 0.25 + m.textContent.length * 0.045);
      m.style.setProperty('--d', d.toFixed(2) + 's');
      m.style.setProperty('--w', at.toFixed(2) + 's');
      at += d + 0.12;
    });
  }
  function draw() {
    clearTimeout(t);
    root.classList.remove('is-on');
    root.classList.add('is-off');
    t = setTimeout(function () {
      if (!root.isConnected) return;
      root.classList.remove('is-off');
      void root.offsetWidth;
      root.classList.add('is-on');
    }, rm ? 0 : 380);
  }
  pens.forEach(function (p) {
    p.addEventListener('click', function () {
      pens.forEach(function (x) { x.setAttribute('aria-pressed', String(x === p)); });
      root.style.setProperty('--u281-m', p.style.getPropertyValue('--c'));
    });
  });
  root.querySelector('.u281-again').addEventListener('click', draw);
  timing();
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('is-on'); }); });
})();
  })();

  scope.ready();
  return scope.controller;
}
