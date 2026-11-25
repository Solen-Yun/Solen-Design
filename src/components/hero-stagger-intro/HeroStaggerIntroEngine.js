// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountHeroStaggerIntro(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u216">
  <div class="u216-nav" data-s style="--d:0"><span class="u216-lg"><i aria-hidden="true"></i>Lumen</span><span>Product</span><span>Pricing</span><span>Blog</span><b>Get started</b></div>
  <div class="u216-bd" data-s style="--d:180"><span><i aria-hidden="true"></i>Version 2.0 is out</span></div>
  <h3 class="u216-h"></h3>
  <p class="u216-p" data-s style="--d:620">From planning to launch, every scattered tool in one place.</p>
  <div class="u216-ct" data-s style="--d:760"><span>Start free</span><span>Watch demo</span></div>
  <div class="u216-sc" data-s style="--d:900" aria-hidden="true"><div class="u216-sb"><i></i><i></i><i></i><i></i><i></i></div><div class="u216-mn"><small>This week</small><div class="u216-bars"><i style="height:40%"></i><i style="height:62%"></i><i style="height:48%"></i><i style="height:74%"></i><i style="height:92%"></i><i style="height:58%"></i></div></div></div>
  <button type="button" class="u216-re"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.2 6a3.8 3.8 0 1 0 1.1-2.7M2 1.6v2.2h2.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Replay</button>
</div>
`,
      css: `

.u216{--ux-ease:cubic-bezier(.22,1,.36,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(120% 70% at 50% 0%,var(--ux-accent-soft),transparent 60%),var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);perspective:700px}
.u216-nav{position:absolute;left:16px;right:16px;top:14px;display:flex;align-items:center;gap:12px;font-size:10.5px;font-weight:700;color:var(--ux-ink-2)}
.u216-lg{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:900;color:var(--ux-ink);margin-right:auto}
.u216-lg i{width:14px;height:14px;border-radius:5px;background:var(--ux-grad)}
.u216-nav b{padding:5px 10px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-weight:800}
.u216-bd{position:absolute;left:0;right:0;top:56px;display:flex;justify-content:center}
.u216-bd span{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:10px;font-weight:800;color:var(--ux-ink-2)}
.u216-bd span i{width:6px;height:6px;border-radius:50%;background:var(--ux-mint)}
.u216-h{position:absolute;left:0;right:0;top:82px;margin:0;text-align:center;font-size:25px;line-height:1.18;font-weight:900;letter-spacing:-.04em}
.u216-ln{display:block}
.u216-w{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .08em}
.u216-w>span{display:inline-block}
.u216-p{position:absolute;left:30px;right:30px;top:150px;margin:0;text-align:center;font-size:11.5px;line-height:1.5;font-weight:600;color:var(--ux-ink-2)}
.u216-ct{position:absolute;left:0;right:0;top:180px;display:flex;justify-content:center;gap:8px}
.u216-ct span{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 13px;border-radius:999px;font-size:11px;font-weight:800}
.u216-ct span:first-child{background:var(--ux-accent);color:#fff;box-shadow:0 8px 18px -8px var(--ux-accent)}
.u216-ct span:last-child{background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink)}
.u216-sc{position:absolute;left:28px;right:28px;top:228px;height:150px;border-radius:14px 14px 0 0;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 -10px 40px -18px var(--ux-shadow-strong);display:grid;grid-template-columns:62px 1fr;overflow:hidden;transform-origin:50% 100%}
.u216-sb{background:var(--ux-surface-2);padding:10px 8px;display:flex;flex-direction:column;gap:6px}
.u216-sb i{height:6px;border-radius:3px;background:var(--ux-line)}
.u216-sb i:first-child{width:60%;background:var(--ux-accent)}
.u216-mn{padding:10px 12px}
.u216-mn small{font-size:8.5px;font-weight:800;color:var(--ux-ink-3)}
.u216-bars{display:flex;align-items:flex-end;gap:5px;height:56px;margin-top:6px}
.u216-bars i{flex:1;border-radius:3px 3px 0 0;background:color-mix(in srgb,var(--ux-accent) 35%,transparent)}
.u216-bars i:nth-child(5){background:var(--ux-accent)}
.u216-re{position:absolute;right:12px;bottom:12px;z-index:3;display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 10px;border:0;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:10.5px;font-weight:800;cursor:pointer;opacity:.92}
.u216-re svg{width:11px;height:11px}
.u216-re:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
/* 등장 전 상태 → .is-in 이 붙으면 각자 정해진 지연 뒤에 제자리로 */
.u216 [data-s]{opacity:0;transform:translateY(14px);transition:opacity .55s var(--ux-ease),transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--d) * 1ms)}
.u216 .u216-nav[data-s]{transform:translateY(-12px)}
.u216 .u216-w>span{transform:translateY(105%);transition:transform .75s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--d) * 1ms)}
.u216 .u216-sc[data-s]{transform:translateY(46px) rotateX(24deg) scale(.94);filter:blur(6px);transition:opacity .6s,transform 1.1s cubic-bezier(.2,.8,.2,1),filter .9s;transition-delay:calc(var(--d) * 1ms)}
.u216.is-in [data-s]{opacity:1;transform:none;filter:none}
.u216.is-in .u216-w>span{transform:none}
.u216.is-snap [data-s],.u216.is-snap .u216-w>span{transition:none}
@media (prefers-reduced-motion: reduce){.u216 [data-s],.u216 .u216-w>span{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u216');
  var h = root.querySelector('.u216-h'), re = root.querySelector('.u216-re');
  var WORDS = [['Finish', 'your', 'team’s'], ['work', 'in', 'one', 'place']];
  // 제목: 낱말마다 가림 상자를 두고, 안쪽 글자가 아래에서 밀려 올라오게 합니다
  var d = 300;
  WORDS.forEach(function (line) {
    var ln = document.createElement('span'); ln.className = 'u216-ln';
    line.forEach(function (w, i) {
      var box = document.createElement('span'), inner = document.createElement('span');
      box.className = 'u216-w'; inner.textContent = w; inner.style.setProperty('--d', d); d += 70;
      box.appendChild(inner); ln.appendChild(box); if (i < line.length - 1) ln.appendChild(document.createTextNode(' '));
    });
    h.appendChild(ln);
  });
  h.setAttribute('aria-label', WORDS.map(function (l) { return l.join(' '); }).join(' '));
  function play() {
    root.classList.add('is-snap'); root.classList.remove('is-in'); void root.offsetWidth;
    root.classList.remove('is-snap'); requestAnimationFrame(function () { root.classList.add('is-in'); });
  }
  re.addEventListener('click', play);
  // 화면에 처음 들어올 때 한 번 재생합니다
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: 0.35 });
    io.observe(root);
  } else root.classList.add('is-in');
})();
  })();

  scope.ready();
  return scope.controller;
}
