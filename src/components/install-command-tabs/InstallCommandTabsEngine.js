// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountInstallCommandTabs(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u272">
  <div class="u272-hd"><b>Quick start</b><small>Install and render your first screen in a minute</small></div>
  <div class="u272-bx"><div class="u272-tl" role="tablist" aria-label="Package manager"><span class="u272-pl" aria-hidden="true"></span></div><div class="u272-cm" role="tabpanel"><code><i aria-hidden="true">$</i><span class="a"></span><b><span class="b"></span></b></code><button type="button" class="u272-cp" aria-label="Copy command"><span class="u272-tt" aria-hidden="true"></span></button></div></div>
  <div class="u272-nx"><small>Next</small><div class="u272-cd" aria-hidden="true"><div class="c"></div><div><span class="k">import</span> { Dock } <span class="k">from</span> <span class="s">'solen-design/react'</span></div><div>&lt;Dock /&gt;</div></div></div>
</div>
`,
      css: `

.u272{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u272-hd{position:absolute;left:20px;right:20px;top:22px}
.u272-hd b{display:block;font-size:17px;font-weight:900;letter-spacing:-.03em}
.u272-hd small{display:block;margin-top:3px;font-size:11px;font-weight:650;color:var(--ux-ink-3)}
.u272-bx{position:absolute;left:14px;right:14px;top:82px;border-radius:16px;background:#0F1117;box-shadow:0 0 0 1px #262A36,0 18px 34px -18px rgba(0,0,0,.5);color:#E5E7EB}
.u272-tl{position:relative;display:flex;gap:2px;padding:8px 8px 0}
.u272-pl{position:absolute;left:8px;bottom:-1px;height:2px;border-radius:1px;background:#A78BFA;transition:transform .35s cubic-bezier(.3,1.3,.5,1),width .35s cubic-bezier(.3,1.3,.5,1)}
.u272-tb{height:30px;padding:0 11px;border:0;border-radius:8px 8px 0 0;background:none;color:#8B90A3;font:inherit;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;font-weight:700;cursor:pointer;transition:color .2s}
.u272-tb[aria-selected="true"]{color:#F3F4F6}
.u272-tb:focus-visible{outline:2px solid #A78BFA;outline-offset:-2px}
.u272-cm{display:flex;align-items:center;gap:8px;padding:14px 10px 14px 14px;border-top:1px solid #262A36}
.u272-cm code{flex:1;min-width:0;white-space:nowrap;overflow:hidden;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;font-weight:600}
.u272-cm code i{font-style:normal;color:#6B7280;margin-right:8px}
.u272-cm code span{display:inline-block;white-space:pre;transition:opacity .2s,filter .2s,transform .25s}
.u272-cm code span.is-out{opacity:0;filter:blur(3px);transform:translateY(-4px)}
.u272-cm code span.is-in{animation:u272-in .3s ease backwards}
@keyframes u272-in{from{opacity:0;filter:blur(3px);transform:translateY(4px)}}
.u272-cm code b{font-weight:600;color:#C4B5FD}
.u272-cp{position:relative;flex:none;width:32px;height:32px;border:0;border-radius:9px;background:#1E2230;color:#C7CAD6;display:grid;place-items:center;cursor:pointer;transition:background .2s,color .2s}
.u272-cp.is-ok{background:#064E3B;color:#6EE7B7}
.u272-cp svg{width:14px;height:14px}
.u272-cp:focus-visible{outline:2px solid #A78BFA;outline-offset:2px}
.u272-tt{position:absolute;right:-6px;bottom:calc(100% + 6px);padding:3px 8px;border-radius:7px;background:#F3F4F6;color:#0F1117;font-size:10px;font-weight:850;white-space:nowrap;opacity:0;transform:translateY(4px);pointer-events:none;transition:opacity .2s,transform .3s cubic-bezier(.3,1.6,.5,1)}
.u272-cp.is-ok .u272-tt{opacity:1;transform:none}
.u272-nx{position:absolute;left:14px;right:14px;top:206px}
.u272-nx>small{font-size:10px;font-weight:850;color:var(--ux-ink-3)}
.u272-cd{margin:6px 0 0;padding:10px 12px;border-radius:13px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10.5px;line-height:1.7;color:var(--ux-ink-2)}
.u272-cd div{opacity:.25;transform:translateX(-6px);transition:opacity .35s,transform .45s cubic-bezier(.3,1.3,.5,1)}
.u272.is-next .u272-cd div{opacity:1;transform:none}
.u272-cd .k{color:#9333EA}.u272-cd .s{color:#059669}.u272-cd .c{color:var(--ux-ink-3)}
@media (prefers-reduced-motion: reduce){.u272-pl,.u272-cm code span,.u272-cd div,.u272-tt{transition:none}.u272-cm code span.is-in{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u272');
  var tl = root.querySelector('.u272-tl'), pl = root.querySelector('.u272-pl'), A = root.querySelector('.u272-cm .a'), Bs = root.querySelector('.u272-cm .b'), cp = root.querySelector('.u272-cp'), tt = root.querySelector('.u272-tt');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [도구, 앞부분, 패키지]
  var PM = [['npm', 'npm install ', 'solen-design'], ['pnpm', 'pnpm add ', 'solen-design'], ['yarn', 'yarn add ', 'solen-design'], ['bun', 'bun add ', 'solen-design']];
  root.querySelector('.u272-cd .c').textContent = '// Import it anywhere in your app';
  tt.textContent = 'Copied';
  var COPY = '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="4.5" y="4.5" width="7.5" height="7.5" rx="1.7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 9.5V3.2c0-.4.3-.7.7-.7h6.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', OK = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.5l2.6 2.6L11 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  cp.insertAdjacentHTML('afterbegin', COPY);
  var T = PM.map(function (p, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u272-tb'; b.setAttribute('role', 'tab'); b.textContent = p[0]; b.addEventListener('click', function () { pick(i); }); b.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); var k = (i + d + PM.length) % PM.length; pick(k); T[k].focus(); } }); tl.appendChild(b); return b; });
  var cur = -1;
  // 앞부분만 바뀌므로 그 글자만 흐렸다가 새로 씁니다
  function pick(i) {
    if (i === cur) return;
    var first = cur < 0; cur = i;
    T.forEach(function (b, k) { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
    var b = T[i]; pl.style.width = b.offsetWidth + 'px'; pl.style.transform = 'translateX(' + (b.offsetLeft - 8) + 'px)';
    Bs.textContent = PM[i][2];
    if (first || rm) { A.textContent = PM[i][1]; return; }
    A.classList.remove('is-in'); A.classList.add('is-out');
    setTimeout(function () { A.textContent = PM[i][1]; A.classList.remove('is-out'); void A.offsetWidth; A.classList.add('is-in'); }, 180);
    try { localStorage.setItem('u272-pm', i); } catch (e) {}
  }
  var Tm = 0;
  cp.addEventListener('click', function () {
    var cmd = PM[cur][1] + PM[cur][2];
    try { navigator.clipboard && navigator.clipboard.writeText(cmd).catch(function () {}); } catch (e) {}
    cp.classList.add('is-ok'); cp.querySelector('svg').outerHTML = OK; root.classList.add('is-next');
    Array.prototype.forEach.call(root.querySelectorAll('.u272-cd div'), function (d, k) { d.style.transitionDelay = (0.15 + k * 0.12) + 's'; });
    clearTimeout(Tm); Tm = setTimeout(function () { cp.classList.remove('is-ok'); cp.querySelector('svg').outerHTML = COPY; }, 1600);
  });
  var saved = 0; try { saved = +localStorage.getItem('u272-pm') || 0; } catch (e) {}
  pick(Math.max(0, Math.min(3, saved)));
  // 처음 그릴 때 탭 폭을 못 잴 수 있어 다음 프레임에 알약 위치를 다시 맞춥니다
  requestAnimationFrame(function () { var b = T[cur]; pl.style.width = b.offsetWidth + 'px'; pl.style.transform = 'translateX(' + (b.offsetLeft - 8) + 'px)'; });
})();
  })();

  scope.ready();
  return scope.controller;
}
