// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountAccordionImagePanels(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 320,
      responsive: false,
      markup: `
<div class="ux u389" role="group" aria-label="Trip themes"></div>
`,
      css: `

.u389{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:320px;display:flex;gap:6px;padding:12px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u389-p{position:relative;flex:1 1 0;min-width:0;border:0;padding:0;border-radius:18px;overflow:hidden;background:var(--bg);color:#fff;text-align:left;transition:flex-grow .6s cubic-bezier(.3,1,.3,1)}
.u389-p.on{flex-grow:5}
.u389-p::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(0,0,0,.55));pointer-events:none}
.u389-lb{position:absolute;left:50%;bottom:16px;z-index:1;white-space:nowrap;font-size:14px;font-weight:850;transform-origin:0 0;transform:rotate(-90deg) translate(0,-50%);transition:transform .5s var(--ux-spring),left .5s var(--ux-spring),bottom .5s,font-size .4s}
.u389-p.on .u389-lb{left:16px;bottom:74px;transform:none;font-size:22px}
.u389-ds{position:absolute;left:16px;right:16px;bottom:16px;z-index:1;display:flex;flex-direction:column;align-items:flex-start;gap:8px;opacity:0;transform:translateY(12px);transition:opacity .2s,transform .4s var(--ux-spring)}
.u389-p.on .u389-ds{opacity:1;transform:none;transition-delay:.25s}
.u389-ds span{max-width:100%;font-size:12.5px;font-weight:650;opacity:.9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u389-ds i{flex:none;font-style:normal;padding:6px 10px;border-radius:999px;background:#fff;color:#111;font-size:11.5px;font-weight:800}
.u389-p:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u389');
  var P = [['Peaks', 'Sunrise hike on the ridge'], ['Ocean', 'Surfing with the sound of waves'], ['Desert', 'Stargazing on the dunes'], ['Forest', 'Walking mossy trails'], ['City', 'A night walk through the lights']];
  var BG = ['linear-gradient(#FFC078,#E8590C 40%,#5C3D2E 70%,#2B2118)', 'linear-gradient(#A5D8FF,#1C7ED6 55%,#0B7285)', 'radial-gradient(30% 20% at 70% 25%,#FFF3BF,transparent 70%),linear-gradient(#FFD8A8,#F59F00 55%,#C2410C)', 'radial-gradient(60% 40% at 50% 20%,#D3F9D8,transparent 70%),linear-gradient(#2F9E44,#1B4332)', 'radial-gradient(2px 2px at 30% 30%,#FFE066,transparent),radial-gradient(2px 2px at 60% 50%,#FFE066,transparent),linear-gradient(#1B1035,#364FC7 70%,#0B0C12)'];
  var cur = 0;
  var ps = P.map(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'u389-p';
    b.style.setProperty('--bg', BG[i]);
    b.innerHTML = '<span class="u389-lb"></span><span class="u389-ds"><span></span><i>' + 'Explore' + '</i></span>';
    b.querySelector('.u389-lb').textContent = p[0];
    b.querySelector('.u389-ds span').textContent = p[1];
    b.addEventListener('pointerenter', function () { open(i); });
    b.addEventListener('focus', function () { open(i); });
    b.addEventListener('click', function () { open(i); });
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = Math.max(0, Math.min(P.length - 1, cur + d));
      open(n); ps[n].focus();
    });
    root.appendChild(b);
    return b;
  });
  function open(i) {
    cur = i;
    ps.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-expanded', String(k === i)); });
  }
  open(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
