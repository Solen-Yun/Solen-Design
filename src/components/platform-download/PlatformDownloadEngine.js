// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPlatformDownload(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u393">
  <div class="u393-tp"><small>Desktop app</small><h3>The same workspace, anywhere</h3></div>
  <div class="u393-tl" role="tablist" aria-label="Operating system"><span class="u393-pl" aria-hidden="true"></span></div>
  <div><button type="button" class="u393-dl"><span class="u393-sw"></span></button></div>
  <div class="u393-mt"></div>
  <div class="u393-st"></div>
  <div class="u393-ar" aria-hidden="true"><svg viewBox="0 0 26 26"><path d="M5 21L20 6M11 6h9v9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Open here</div>
</div>
`,
      css: `

.u393{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(70% 50% at 50% 0%,var(--ux-accent-soft),transparent 70%),var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);text-align:center}
.u393-tp{padding-top:26px}
.u393-tp small{font-size:10px;font-weight:850;letter-spacing:.08em;color:var(--ux-accent)}
.u393-tp h3{margin:4px 0 0;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u393-tl{position:relative;display:inline-flex;margin-top:16px;padding:3px;border-radius:12px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u393-pl{position:absolute;left:3px;top:3px;bottom:3px;width:calc((100% - 6px) / 3);border-radius:9px;background:var(--ux-surface);box-shadow:0 1px 4px -1px var(--ux-shadow-strong),0 0 0 1px var(--ux-line);transition:transform .35s cubic-bezier(.3,1.3,.5,1)}
.u393-tb{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:5px;width:84px;height:30px;border:0;border-radius:9px;background:none;color:var(--ux-ink-3);font:inherit;font-size:11px;font-weight:800;cursor:pointer;transition:color .2s}
.u393-tb[aria-selected="true"]{color:var(--ux-ink)}
.u393-tb svg{width:13px;height:13px}
.u393-dl{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:9px;width:236px;height:54px;margin-top:18px;border:0;border-radius:16px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:14px;font-weight:850;cursor:pointer;overflow:hidden;transition:background .35s,transform .15s}
.u393-dl:active{transform:scale(.98)}
.u393-dl.is-ok{background:#059669}
.u393-sw{position:relative;display:block;height:22px;overflow:hidden}
.u393-sw>span{display:flex;align-items:center;gap:9px;height:22px;transition:transform .4s cubic-bezier(.3,1.3,.5,1),opacity .3s}
.u393-sw>span.is-in{position:absolute;left:0;right:0;top:0;transform:translateY(100%);opacity:0;transition:none}
.u393-sw>span.is-out{transform:translateY(-100%);opacity:0}
.u393-sw svg{width:18px;height:18px;flex:none}
.u393-mt{position:relative;height:16px;margin-top:9px;overflow:hidden;font-size:10.5px;font-weight:700;color:var(--ux-ink-3)}
.u393-mt>span{position:absolute;left:0;right:0;top:0;transition:transform .4s cubic-bezier(.3,1.3,.5,1),opacity .3s}
.u393-mt>span.is-in{transform:translateY(100%);opacity:0;transition:none}
.u393-mt>span.is-out{transform:translateY(-100%);opacity:0}
.u393-st{display:flex;justify-content:center;gap:8px;margin-top:16px;padding:0 18px;text-align:left}
.u393-sp{flex:1;padding:9px 9px;border-radius:12px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);opacity:.4;transform:translateY(6px);transition:opacity .35s,transform .45s cubic-bezier(.3,1.4,.5,1),box-shadow .3s}
.u393-sp.is-on{opacity:1;transform:none;box-shadow:inset 0 0 0 1.5px var(--ux-accent)}
.u393-sp i{display:inline-grid;place-items:center;width:17px;height:17px;border-radius:50%;background:var(--ux-accent);color:#fff;font-style:normal;font-size:9.5px;font-weight:900}
.u393-sp b{display:block;margin-top:5px;font-size:10.5px;font-weight:850}
.u393-sp small{display:block;margin-top:1px;font-size:9px;line-height:1.3;font-weight:650;color:var(--ux-ink-3)}
.u393-ar{position:absolute;right:16px;top:12px;display:flex;flex-direction:column;align-items:flex-end;gap:2px;color:var(--ux-accent);font-size:9.5px;font-weight:850;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .4s;pointer-events:none}
.u393.is-got .u393-ar{opacity:1;transform:none}
.u393-ar svg{width:26px;height:26px;animation:u393-bo .8s ease-in-out infinite alternate}
@keyframes u393-bo{to{transform:translate(3px,-4px)}}
.u393 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u393-pl,.u393-sw>span,.u393-mt>span,.u393-sp,.u393-ar{transition:none}.u393-ar svg{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u393');
  var tl = root.querySelector('.u393-tl'), pl = root.querySelector('.u393-pl'), dl = root.querySelector('.u393-dl'), sw = root.querySelector('.u393-sw'), mt = root.querySelector('.u393-mt'), st = root.querySelector('.u393-st');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [이름, 버튼 문구, 버전 줄]
  var OS = [['macOS', 'Download for Mac', 'v2.4.1 · 128MB · macOS 12+'], ['Windows', 'Download for Windows', 'v2.4.1 · 142MB · Windows 10+'], ['Linux', 'Download for Linux', 'v2.4.1 · .deb · .AppImage']];
  var STEPS = [['Open the file', 'Open the installer you downloaded'], ['Install', 'A few clicks and you’re done'], ['Sign in', 'Pick up right where you left off']];
  // 상표 대신 쓰는 단순한 기기 그림
  var IC = ['<svg viewBox="0 0 18 18" aria-hidden="true"><rect x="2.5" y="3.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M1 14.5h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>', '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2.5 4l5.5-.8v5.3H2.5zM9.3 3l6.2-.9v6.4H9.3zM2.5 9.6H8v5.2l-5.5-.8zM9.3 9.6h6.2V16l-6.2-.9z" fill="currentColor"/></svg>', '<svg viewBox="0 0 18 18" aria-hidden="true"><rect x="2" y="3" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 7.5l2 1.5-2 1.5M8.5 11.5h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'];
  var CHK = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9.5l3.2 3.2L14 5.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var T = OS.map(function (o, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u393-tb'; b.setAttribute('role', 'tab'); b.innerHTML = IC[i] + '<span></span>'; b.lastChild.textContent = o[0];
    b.querySelector('svg').style.cssText = 'width:13px;height:13px';
    b.addEventListener('click', function () { pick(i); });
    tl.appendChild(b); return b;
  });
  var S = STEPS.map(function (s, i) { var d = document.createElement('div'); d.className = 'u393-sp'; d.innerHTML = '<i>' + (i + 1) + '</i><b></b><small></small>'; d.querySelector('b').textContent = s[0]; d.querySelector('small').textContent = s[1]; st.appendChild(d); return d; });
  // 새 문구를 아래에서 올리고 옛 문구는 위로 빼냅니다
  function swap(box, html) {
    var old = box.firstElementChild, nw = document.createElement('span'); nw.innerHTML = html;
    if (!old || rm) { box.innerHTML = ''; box.appendChild(nw); return; }
    nw.className = 'is-in'; box.appendChild(nw); void nw.offsetWidth; nw.className = ''; old.className = 'is-out'; setTimeout(function () { old.remove(); }, 420);
  }
  var cur = -1, got = false, sub = [];
  function reset() { got = false; root.classList.remove('is-got'); dl.classList.remove('is-ok'); sub.forEach(clearTimeout); sub = []; S.forEach(function (s) { s.classList.remove('is-on'); }); }
  function pick(i) {
    if (i === cur) return;
    cur = i; reset();
    T.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
    pl.style.transform = 'translateX(' + i * 100 + '%)';
    swap(sw, IC[i] + '<span></span>'); sw.lastElementChild.lastChild.textContent = OS[i][1];
    swap(mt, ''); mt.lastElementChild.textContent = OS[i][2];
  }
  dl.addEventListener('click', function () {
    if (got) return;
    got = true; dl.classList.add('is-ok'); root.classList.add('is-got');
    swap(sw, CHK + '<span></span>'); sw.lastElementChild.lastChild.textContent = 'Your download has started';
    S.forEach(function (s, k) { sub.push(setTimeout(function () { s.classList.add('is-on'); }, rm ? 0 : 350 + k * 450)); });
  });
  // 접속한 기기를 짐작해 첫 탭을 고릅니다
  var ua = navigator.userAgent || '', guess = /Win/.test(ua) ? 1 : /Linux|X11/.test(ua) && !/Android/.test(ua) ? 2 : 0;
  pick(guess);
})();
  })();

  scope.ready();
  return scope.controller;
}
