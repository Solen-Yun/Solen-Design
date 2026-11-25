// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountMobileDrillMenu(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u286">
  <div class="u286-top"><b><i aria-hidden="true"></i>Tidy</b><button type="button" class="u286-bg" aria-expanded="false"><span aria-hidden="true"><i></i><i></i><i></i></span></button></div>
  <div class="u286-pg" aria-hidden="true"><h3>Make today's work<br>lighter</h3><i></i></div>
  <nav class="u286-mn"><div class="u286-nb"><button type="button" class="u286-bk" aria-label="Back" hidden><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2.5L4.5 7 9 11.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span class="u286-tt"></span></div><div class="u286-vw"></div><div class="u286-ft"><span>Log in</span><span>Start free</span></div></nav>
</div>
`,
      css: `

.u286{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u286-top{position:absolute;left:0;right:0;top:0;z-index:3;display:flex;align-items:center;height:56px;padding:0 14px 0 18px;background:var(--ux-surface)}
.u286-top b{margin-right:auto;display:flex;align-items:center;gap:6px;font-size:14px;font-weight:900}
.u286-top b i{width:16px;height:16px;border-radius:5px;background:var(--ux-grad)}
.u286-bg{width:38px;height:38px;border:0;border-radius:12px;background:var(--ux-surface-2);display:grid;place-items:center;cursor:pointer}
.u286-bg:focus-visible,.u286-it:focus-visible,.u286-bk:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u286-bg span{position:relative;width:16px;height:12px}
.u286-bg i{position:absolute;left:0;width:16px;height:2px;border-radius:1px;background:var(--ux-ink);transition:transform .35s cubic-bezier(.3,1.4,.5,1),opacity .2s,top .35s}
.u286-bg i:nth-child(1){top:0}.u286-bg i:nth-child(2){top:5px}.u286-bg i:nth-child(3){top:10px}
.u286.is-open .u286-bg i:nth-child(1){top:5px;transform:rotate(45deg)}
.u286.is-open .u286-bg i:nth-child(2){opacity:0;transform:scaleX(.2)}
.u286.is-open .u286-bg i:nth-child(3){top:5px;transform:rotate(-45deg)}
.u286-pg{position:absolute;left:0;right:0;top:56px;bottom:0;padding:30px 20px;transition:filter .3s,opacity .3s}
.u286.is-open .u286-pg{filter:blur(2px);opacity:.4}
.u286-pg h3{margin:0;font-size:26px;line-height:1.15;font-weight:900;letter-spacing:-.04em}
.u286-pg i{display:block;height:150px;margin-top:20px;border-radius:18px;background:linear-gradient(140deg,var(--ux-accent-soft),var(--ux-surface-2))}
.u286-mn{position:absolute;left:0;right:0;top:56px;bottom:0;z-index:2;background:var(--ux-surface);clip-path:inset(0 0 100% 0);transition:clip-path .45s cubic-bezier(.7,0,.2,1);overflow:hidden}
.u286.is-open .u286-mn{clip-path:inset(0 0 0 0)}
.u286-nb{display:flex;align-items:center;gap:6px;height:40px;padding:0 12px;border-bottom:1px solid var(--ux-line)}
.u286-bk{width:30px;height:30px;border:0;border-radius:9px;background:var(--ux-surface-2);color:var(--ux-ink);display:grid;place-items:center;cursor:pointer;transition:opacity .25s,transform .3s}
.u286-bk[hidden]{display:grid;opacity:0;transform:translateX(-6px);pointer-events:none}
.u286-bk svg{width:14px;height:14px}
.u286-tt{font-size:12px;font-weight:850;color:var(--ux-ink-2)}
.u286-vw{position:absolute;left:0;right:0;top:40px;bottom:96px}
.u286-ls{position:absolute;inset:0;padding:8px 10px;margin:0;list-style:none;transition:transform .38s cubic-bezier(.2,.8,.2,1),opacity .3s}
.u286-it{display:flex;align-items:center;width:100%;height:50px;padding:0 10px;border:0;border-radius:12px;background:none;color:var(--ux-ink);font:inherit;font-size:16px;font-weight:800;letter-spacing:-.02em;cursor:pointer;text-align:left;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .35s cubic-bezier(.3,1.3,.5,1),background .2s}
.u286-it:hover{background:var(--ux-surface-2)}
.u286-it svg{margin-left:auto;width:14px;height:14px;color:var(--ux-ink-3)}
.u286-ls.is-in .u286-it{opacity:1;transform:none}
.u286-ft{position:absolute;left:16px;right:16px;bottom:22px;display:grid;grid-template-columns:1fr 1fr;gap:8px;opacity:0;transition:opacity .3s .25s}
.u286.is-open .u286-ft{opacity:1}
.u286-ft span{height:42px;border-radius:13px;display:grid;place-items:center;font-size:12.5px;font-weight:850;background:var(--ux-surface-2)}
.u286-ft span:last-child{background:var(--ux-ink);color:var(--ux-surface)}
@media (prefers-reduced-motion: reduce){.u286-mn,.u286-ls,.u286-it{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u286');
  var bg = root.querySelector('.u286-bg'), vw = root.querySelector('.u286-vw'), bk = root.querySelector('.u286-bk'), tt = root.querySelector('.u286-tt'), mn = root.querySelector('.u286-mn');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TREE = {t: 'Menu', c: [{t: 'Product', c: [{t: 'Collaboration'}, {t: 'AI tools', c: [{t: 'Summaries'}, {t: 'Translation'}, {t: 'Meeting notes'}]}, {t: 'Integrations'}]}, {t: 'Pricing'}, {t: 'Customers', c: [{t: 'Startups'}, {t: 'Enterprise'}]}, {t: 'Blog'}, {t: 'Support'}]};
  var stack = [TREE], open = false;
  var ARW = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2.5L9.5 7 5 11.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // 목록 하나를 만들어 끼웁니다. dir: 1이면 오른쪽에서 들어오고, -1이면 왼쪽에서 돌아옵니다
  function render(dir) {
    var node = stack[stack.length - 1], old = vw.querySelector('.u286-ls:not(.is-out)');
    var ul = document.createElement('ul'); ul.className = 'u286-ls';
    node.c.forEach(function (ch, i) {
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.className = 'u286-it'; b.style.transitionDelay = (0.04 * i + 0.05) + 's';
      b.innerHTML = '<span></span>' + (ch.c ? ARW : ''); b.firstChild.textContent = ch.t;
      if (ch.c) b.setAttribute('aria-label', ch.t + ' submenu');
      b.addEventListener('click', function () { if (ch.c) { stack.push(ch); render(1); } });
      li.appendChild(b); ul.appendChild(li);
    });
    if (dir && !rm) ul.style.transform = 'translateX(' + (dir * 100) + '%)';
    vw.appendChild(ul);
    if (old) {
      old.classList.add('is-out');
      if (rm) old.remove(); else { old.style.transform = 'translateX(' + (-dir * 30) + '%)'; old.style.opacity = 0; setTimeout(function () { old.remove(); }, 400); }
    }
    requestAnimationFrame(function () { requestAnimationFrame(function () { ul.style.transform = ''; ul.classList.add('is-in'); }); });
    tt.textContent = node.t; bk.hidden = stack.length < 2;
  }
  bk.addEventListener('click', function () { if (stack.length > 1) { stack.pop(); render(-1); } });
  bg.addEventListener('click', function () {
    open = !open; root.classList.toggle('is-open', open);
    bg.setAttribute('aria-expanded', open); bg.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { stack = [TREE]; vw.innerHTML = ''; render(0); }
  });
  bg.setAttribute('aria-label', 'Open menu');
})();
  })();

  scope.ready();
  return scope.controller;
}
