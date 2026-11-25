// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountBlockPageBuilder(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u297">
  <div class="u297-sd"><small>Blocks</small></div>
  <div class="u297-tp"><b class="u297-ct"></b><span class="u297-sv"></span></div>
  <div class="u297-cv"><div class="u297-em">Press a block on the left to start your page</div><ul class="u297-ls"></ul></div>
</div>
`,
      css: `

.u297{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface-2);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u297-sd{position:absolute;left:10px;top:10px;bottom:10px;width:86px;padding:10px 7px;border-radius:18px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line)}
.u297-sd small{display:block;padding:0 4px 6px;font-size:9.5px;font-weight:850;color:var(--ux-ink-3)}
.u297-pk{display:flex;flex-direction:column;align-items:center;gap:4px;width:100%;margin-bottom:5px;padding:6px 0 5px;border:0;border-radius:11px;background:var(--ux-surface-2);color:var(--ux-ink-2);font:inherit;font-size:9.5px;font-weight:800;cursor:pointer;transition:transform .15s,background .2s}
.u297-pk:hover,.u297-pk.g-hov{background:var(--ux-accent-soft);color:var(--ux-accent)}
.u297-pk:active{transform:scale(.95)}
.u297-pk i{display:block;width:44px;height:22px;border-radius:5px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);position:relative;overflow:hidden}
.u297-tp{position:absolute;left:106px;right:12px;top:14px;display:flex;align-items:center;gap:6px;font-size:10px;font-weight:800;color:var(--ux-ink-3)}
.u297-tp b{margin-right:auto;color:var(--ux-ink);font-weight:900}
.u297-tp span{display:inline-flex;align-items:center;gap:4px}
.u297-tp span::before{content:"";width:6px;height:6px;border-radius:50%;background:#10B981}
.u297-tp span.is-blink{animation:u297-bl .6s ease}
@keyframes u297-bl{40%{opacity:.2}}
.u297-cv{position:absolute;left:106px;right:12px;top:36px;bottom:10px;padding:8px;border-radius:16px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line);overflow:hidden}
.u297-em{position:absolute;inset:8px;display:grid;place-items:center;padding:0 20px;border:1.5px dashed var(--ux-line);border-radius:12px;text-align:center;font-size:10.5px;font-weight:700;color:var(--ux-ink-3)}
.u297-ls{position:relative;margin:0;padding:0;list-style:none}
.u297-bl{position:relative;display:grid;grid-template-rows:1fr;margin-bottom:5px;transition:grid-template-rows .4s cubic-bezier(.3,1,.4,1),opacity .3s,margin .4s}
.u297-bl>div{min-height:0;overflow:hidden}
.u297-bl.is-new,.u297-bl.is-gone{grid-template-rows:0fr;opacity:0;margin-bottom:0}
.u297-wf{position:relative;padding:7px;border-radius:10px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);transition:box-shadow .2s}
.u297-bl:hover .u297-wf,.u297-bl.g-hov .u297-wf,.u297-bl:focus-within .u297-wf{box-shadow:inset 0 0 0 1.5px var(--ux-accent)}
.u297-wf small{position:absolute;left:7px;top:-1px;padding:1px 5px;border-radius:0 0 5px 5px;background:var(--ux-accent);color:#fff;font-size:7.5px;font-weight:850;opacity:0;transition:opacity .2s}
.u297-bl:hover .u297-wf small,.u297-bl.g-hov .u297-wf small,.u297-bl:focus-within .u297-wf small{opacity:1}
.u297-wf i{display:block;border-radius:3px;background:var(--ux-surface-3)}
.u297-ac{position:absolute;right:5px;top:5px;display:flex;gap:2px;opacity:0;transition:opacity .2s}
.u297-bl:hover .u297-ac,.u297-bl.g-hov .u297-ac,.u297-bl:focus-within .u297-ac{opacity:1}
.u297-ac button{width:20px;height:20px;border:0;border-radius:6px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line);color:var(--ux-ink-2);display:grid;place-items:center;cursor:pointer}
.u297-ac button svg{width:9px;height:9px}
.u297-rm:hover,.u297-rm.g-hov{color:#E11D48}
.u297 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:1px}
@media (prefers-reduced-motion: reduce){.u297-bl{transition:none}.u297-tp span.is-blink{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u297');
  var sd = root.querySelector('.u297-sd'), ls = root.querySelector('.u297-ls'), em = root.querySelector('.u297-em'), ct = root.querySelector('.u297-ct'), sv = root.querySelector('.u297-sv');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BK = ['Hero', 'Features', 'Pricing', 'Reviews', 'Footer'];
  // 블록마다 다른 뼈대 그림 (줄·칸 모양)
  var WF = [
    '<i style="width:60%;height:9px"></i><i style="width:84%;height:5px;margin-top:5px"></i><i style="width:30%;height:10px;margin-top:6px;border-radius:5px;background:var(--ux-accent)"></i>',
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px"><i style="height:22px"></i><i style="height:22px"></i><i style="height:22px"></i></div>',
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;align-items:end"><i style="height:24px"></i><i style="height:30px;background:color-mix(in srgb,var(--ux-accent) 45%,var(--ux-surface-3))"></i><i style="height:24px"></i></div>',
    '<div style="display:flex;gap:5px;align-items:center"><i style="width:16px;height:16px;border-radius:50%"></i><div style="flex:1"><i style="width:90%;height:5px"></i><i style="width:60%;height:5px;margin-top:4px"></i></div></div>',
    '<div style="display:flex;gap:6px"><i style="width:22%;height:6px"></i><i style="width:22%;height:6px"></i><i style="width:22%;height:6px"></i></div>'
  ];
  var MINI = ['<i style="position:absolute;left:6px;top:5px;width:22px;height:4px;border-radius:2px;background:var(--ux-surface-3)"></i><i style="position:absolute;left:6px;top:12px;width:12px;height:5px;border-radius:2px;background:var(--ux-accent)"></i>', '<i style="position:absolute;left:5px;right:5px;top:6px;height:10px;border-radius:2px;background:repeating-linear-gradient(90deg,var(--ux-surface-3) 0 10px,transparent 10px 13px)"></i>', '<i style="position:absolute;left:8px;top:5px;width:8px;height:12px;border-radius:2px;background:var(--ux-surface-3)"></i><i style="position:absolute;left:18px;top:3px;width:8px;height:14px;border-radius:2px;background:var(--ux-accent)"></i><i style="position:absolute;left:28px;top:5px;width:8px;height:12px;border-radius:2px;background:var(--ux-surface-3)"></i>', '<i style="position:absolute;left:6px;top:6px;width:9px;height:9px;border-radius:50%;background:var(--ux-surface-3)"></i><i style="position:absolute;left:18px;top:8px;width:20px;height:4px;border-radius:2px;background:var(--ux-surface-3)"></i>', '<i style="position:absolute;left:5px;right:5px;bottom:4px;height:4px;border-radius:2px;background:var(--ux-surface-3)"></i>'];
  BK.forEach(function (n, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u297-pk'; b.innerHTML = '<i aria-hidden="true">' + MINI[i] + '</i><span></span>'; b.lastChild.textContent = n; b.setAttribute('aria-label', n + ' — add'); b.addEventListener('click', function () { add(i); }); sd.appendChild(b); });
  var ICU = '<svg viewBox="0 0 9 9" aria-hidden="true"><path d="M2 6l2.5-2.5L7 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>', ICD = '<svg viewBox="0 0 9 9" aria-hidden="true"><path d="M2 3l2.5 2.5L7 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>', ICX = '<svg viewBox="0 0 9 9" aria-hidden="true"><path d="M2 2l5 5M7 2L2 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  function saved() { var n = ls.querySelectorAll('.u297-bl:not(.is-gone)').length; ct.textContent = n + ' blocks'; em.style.display = n ? 'none' : ''; sv.textContent = 'Saved'; sv.classList.remove('is-blink'); void sv.offsetWidth; sv.classList.add('is-blink'); }
  // 위치를 바꾸면 바뀌기 전 자리에서 새 자리로 미끄러지게 합니다
  function flip(fn) {
    var L = Array.prototype.slice.call(ls.children), y0 = L.map(function (l) { return l.offsetTop; }); fn();
    if (rm) return;
    L.forEach(function (l, k) { var dy = y0[k] - l.offsetTop; if (!dy) return; l.animate([{ transform: 'translateY(' + dy + 'px)' }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.3,1.2,.5,1)' }); });
  }
  function add(i) {
    var li = document.createElement('li'); li.className = 'u297-bl is-new';
    li.innerHTML = '<div><div class="u297-wf"><small></small>' + WF[i] + '<div class="u297-ac"><button type="button" class="u297-up" aria-label="Move up">' + ICU + '</button><button type="button" class="u297-dn" aria-label="Move down">' + ICD + '</button><button type="button" class="u297-rm" aria-label="Delete">' + ICX + '</button></div></div></div>';
    li.querySelector('small').textContent = BK[i];
    li.querySelector('.u297-up').addEventListener('click', function () { var p = li.previousElementSibling; if (p) flip(function () { ls.insertBefore(li, p); }); saved(); });
    li.querySelector('.u297-dn').addEventListener('click', function () { var n = li.nextElementSibling; if (n) flip(function () { ls.insertBefore(n, li); }); saved(); });
    li.querySelector('.u297-rm').addEventListener('click', function () { li.classList.add('is-gone'); setTimeout(function () { li.remove(); }, rm ? 0 : 420); saved(); });
    ls.appendChild(li); void li.offsetWidth; li.classList.remove('is-new'); saved();
  }
  ct.textContent = 0 + ' blocks';
})();
  })();

  scope.ready();
  return scope.controller;
}
