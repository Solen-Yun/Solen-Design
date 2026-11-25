// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSplitCurtainMenu(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<nav class="ux u312" aria-label="Main menu">
  <button class="u312-it" type="button" data-d="Browse 24 projects">WORK</button>
  <button class="u312-it" type="button" data-d="The story of a small studio">ABOUT</button>
  <button class="u312-it" type="button" data-d="Let’s talk about a new project">CONTACT</button>
</nav>
`,
      css: `

.u312{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;flex-direction:column;justify-content:center;padding:14px 18px;border-radius:28px;background:var(--ux-ink);box-shadow:0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u312-it{position:relative;display:block;width:100%;height:96px;border:0;padding:0;background:none;text-align:left;color:var(--ux-page);cursor:pointer;--o:0}
.u312-it+.u312-it{border-top:1px solid color-mix(in srgb,var(--ux-page) 14%,transparent)}
.u312-h{position:absolute;left:0;right:0;top:50%;height:56px;margin-top:-28px;font-size:56px;line-height:56px;font-weight:900;letter-spacing:-.05em;white-space:nowrap;transition:transform .5s cubic-bezier(.3,1.3,.4,1)}
.u312-h.t{clip-path:inset(0 0 50% 0);transform:translateY(calc(var(--o) * -1px))}
.u312-h.b{clip-path:inset(50% 0 0 0);transform:translateY(calc(var(--o) * 1px))}
.u312-it:nth-child(2) .u312-h{color:var(--ux-accent)}
.u312-it:nth-child(2) .u312-h.t,.u312-it:nth-child(2) .u312-h.b{color:var(--ux-page)}
.u312-d{position:absolute;left:0;right:0;top:50%;height:22px;margin-top:-11px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;letter-spacing:-.01em;color:color-mix(in srgb,var(--ux-page) 80%,transparent);opacity:calc(var(--o) / 18);transform:scaleY(calc(.3 + var(--o) / 26));transition:transform .5s cubic-bezier(.3,1.3,.4,1),opacity .3s}
.u312-d::before{content:"";width:18px;height:2px;border-radius:2px;background:var(--ux-accent)}
.u312-n{position:absolute;right:0;top:12px;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:color-mix(in srgb,var(--ux-page) 40%,transparent)}
.u312-it:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-2px;border-radius:12px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u312');
  var its = Array.prototype.slice.call(root.querySelectorAll('.u312-it'));
  // 단어를 위·아래 두 장으로 겹쳐 두고, 사이에 설명 줄을 끼웁니다
  its.forEach(function (it, i) {
    var w = it.textContent.trim(), d = it.getAttribute('data-d');
    it.textContent = '';
    it.setAttribute('aria-label', w + ', ' + d);
    it.innerHTML = '<span class="u312-d" aria-hidden="true"></span><span class="u312-h t" aria-hidden="true"></span><span class="u312-h b" aria-hidden="true"></span><span class="u312-n" aria-hidden="true">0' + (i + 1) + '</span>';
    it.querySelector('.u312-d').textContent = d;
    it.querySelectorAll('.u312-h').forEach(function (h) { h.textContent = w; });
    it.addEventListener('pointermove', function (e) {
      var r = it.getBoundingClientRect(), y = (e.clientY - r.top) / (r.height || 1);
      open(it, 10 + 12 * (1 - Math.min(1, Math.abs(y - 0.5) * 2)));
    });
    it.addEventListener('pointerleave', function () { if (document.activeElement !== it) open(it, 0); });
    it.addEventListener('focus', function () { open(it, 18); });
    it.addEventListener('blur', function () { open(it, 0); });
    it.addEventListener('click', function () { its.forEach(function (o) { if (o !== it) open(o, 0); }); open(it, 22); });
  });
  function open(it, o) { it.style.setProperty('--o', o.toFixed(1)); }
})();
  })();

  scope.ready();
  return scope.controller;
}
