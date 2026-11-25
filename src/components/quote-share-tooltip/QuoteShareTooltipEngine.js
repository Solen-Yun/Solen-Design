// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountQuoteShareTooltip(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u220">
  <div class="u220-ar"><small>Design notes</small><h3>Thinking small-screen first</h3><p></p></div>
  <div class="u220-tip" role="toolbar" aria-label="Quote tools">
    <button type="button" class="u220-hl" aria-label="Highlight"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 2.5l4 4-6 6H3.5v-4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M2 14.5h12" stroke="#FDE047" stroke-width="2" stroke-linecap="round"/></svg></button>
    <button type="button" class="u220-cp" aria-label="Copy"><svg class="u220-cpi" viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 3.2V3a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><svg class="u220-ok" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="#4ADE80" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button type="button" class="u220-sh" aria-label="Share"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 10V2.5M5 5.5l3-3 3 3M3 9v3.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="u220-toast" role="status"></div>
</div>
`,
      css: `

.u220{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u220-ar{position:absolute;inset:0;padding:30px 26px}
.u220-ar small{font-size:10px;font-weight:850;letter-spacing:.08em;color:var(--ux-accent)}
.u220-ar h3{margin:6px 0 14px;font-size:19px;font-weight:900;letter-spacing:-.035em}
.u220-ar p{margin:0;font-size:13px;line-height:1.75;font-weight:600;color:var(--ux-ink-2)}
.u220-s{cursor:text;border-radius:3px;background-image:linear-gradient(color-mix(in srgb,#FDE047 75%,transparent),color-mix(in srgb,#FDE047 75%,transparent));background-repeat:no-repeat;background-size:0% 42%;background-position:0 88%;transition:background-size .6s cubic-bezier(.3,.9,.3,1),background-color .2s,color .2s}
.u220-s.is-hl{background-size:100% 42%;color:var(--ux-ink)}
.u220-s.is-sel{background-color:color-mix(in srgb,var(--ux-accent) 22%,transparent);color:var(--ux-ink)}
.u220-tip{position:absolute;left:0;top:0;display:flex;gap:2px;padding:4px;border-radius:12px;background:var(--ux-ink);box-shadow:0 10px 24px -10px var(--ux-shadow-strong);transform:translate(-50%,-100%) scale(.85);transform-origin:50% 100%;opacity:0;pointer-events:none;transition:opacity .15s,transform .25s cubic-bezier(.3,1.6,.5,1);z-index:3}
.u220-tip::after{content:"";position:absolute;left:50%;bottom:-5px;margin-left:-5px;border:5px solid transparent;border-bottom:0;border-top-color:var(--ux-ink)}
.u220-tip.is-on{opacity:1;pointer-events:auto;transform:translate(-50%,calc(-100% - 8px)) scale(1)}
.u220-tip button{width:30px;height:28px;border:0;border-radius:8px;background:none;color:var(--ux-surface);display:grid;place-items:center;cursor:pointer}
.u220-tip button:hover{background:rgba(255,255,255,.14)}
.u220-tip button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-2px}
.u220-tip svg{width:15px;height:15px}
.u220-cp .u220-ok{display:none}
.u220-cp.is-ok .u220-ok{display:block}
.u220-cp.is-ok .u220-cpi{display:none}
.u220-toast{position:absolute;left:50%;bottom:16px;padding:8px 14px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-size:11px;font-weight:800;transform:translate(-50%,40px);opacity:0;transition:transform .35s cubic-bezier(.3,1.5,.5,1),opacity .2s;white-space:nowrap}
.u220-toast.is-on{transform:translate(-50%,0);opacity:1}
@media (prefers-reduced-motion: reduce){.u220-s,.u220-tip,.u220-toast{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u220');
  var p = root.querySelector('.u220-ar p'), tip = root.querySelector('.u220-tip'), hl = root.querySelector('.u220-hl'), cp = root.querySelector('.u220-cp'), sh = root.querySelector('.u220-sh'), toast = root.querySelector('.u220-toast');
  var S = ['The smaller the screen, the more courage it takes to cut.', 'Keep only what matters and it looks tidy on big screens too.', 'When every button and sentence finds its place, people never get lost.', 'Good layout works quietly without drawing attention.'];
  var cur = null, tt = 0;
  S.forEach(function (s, i) { var sp = document.createElement('span'); sp.className = 'u220-s'; sp.textContent = s; p.appendChild(sp); if (i < S.length - 1) p.appendChild(document.createTextNode(' ')); });
  var SP = Array.prototype.slice.call(p.querySelectorAll('.u220-s'));
  // 고른 문장(또는 드래그한 구간) 위 가운데에 툴팁을 띄웁니다
  function show(rect, el) {
    var r = root.getBoundingClientRect(), k = root.offsetWidth / (r.width || 1);
    tip.style.left = Math.max(56, Math.min(284, (rect.left + rect.width / 2 - r.left) * k)) + 'px';
    tip.style.top = Math.max(42, (rect.top - r.top) * k) + 'px';
    tip.classList.add('is-on'); cp.classList.remove('is-ok');
    SP.forEach(function (s) { s.classList.toggle('is-sel', s === el); }); cur = el;
  }
  function hide() { tip.classList.remove('is-on'); SP.forEach(function (s) { s.classList.remove('is-sel'); }); cur = null; }
  SP.forEach(function (s) {
    s.addEventListener('click', function (e) {
      e.stopPropagation();
      var sel = window.getSelection && window.getSelection();
      if (sel && !sel.isCollapsed && root.contains(sel.anchorNode)) return;
      if (cur === s) { hide(); return; }
      // 여러 줄에 걸친 문장은 첫 줄 위에 띄웁니다
      var rs = s.getClientRects(); show(rs[0] || s.getBoundingClientRect(), s);
    });
  });
  // 실제로 드래그해 고른 경우: 고른 구간의 문장을 찾아 그 위에 띄웁니다
  p.addEventListener('mouseup', function () {
    var sel = window.getSelection && window.getSelection();
    if (!sel || sel.isCollapsed || !p.contains(sel.anchorNode)) return;
    var rg = sel.getRangeAt(0), el = sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('.u220-s');
    show(rg.getClientRects()[0] || rg.getBoundingClientRect(), el);
  });
  hl.addEventListener('click', function () { if (cur) cur.classList.toggle('is-hl'); hide(); });
  function note(msg) { clearTimeout(tt); toast.textContent = msg; toast.classList.add('is-on'); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 1600); }
  cp.addEventListener('click', function () {
    var text = cur ? cur.textContent : '';
    try { if (navigator.clipboard && text) navigator.clipboard.writeText('“' + text + '”').catch(function () {}); } catch (e) {}
    cp.classList.add('is-ok'); note('Quote copied');
    setTimeout(hide, 700);
  });
  sh.addEventListener('click', function () { if (navigator.share && cur) { navigator.share({ text: cur.textContent }).catch(function () {}); } else cp.click(); });
  root.querySelector('.u220-ar').addEventListener('click', function (e) { if (!e.target.closest('.u220-s')) hide(); });
})();
  })();

  scope.ready();
  return scope.controller;
}
