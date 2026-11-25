// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountMapPinDrop(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 350,
      responsive: false,
      markup: `
<div class="ux u344">
  <button class="u344-map" type="button" aria-label="Map, tap to drop a pin">
    <svg viewBox="0 0 340 350" aria-hidden="true" preserveAspectRatio="none">
      <rect class="u344-blk" x="14" y="20" width="96" height="70" rx="8"/><rect class="u344-blk" x="130" y="20" width="80" height="120" rx="8"/><rect class="u344-blk" x="230" y="30" width="100" height="60" rx="8"/>
      <rect class="u344-park" x="230" y="110" width="96" height="90" rx="12"/><rect class="u344-blk" x="14" y="110" width="96" height="90" rx="8"/><rect class="u344-blk" x="130" y="160" width="80" height="60" rx="8"/>
      <path class="u344-riv" d="M-10 300 C80 250 160 330 360 270"/>
      <path class="u344-rd" d="M0 100 H340 M120 0 V350 M220 0 V260 M0 210 C120 200 220 230 340 214"/>
      <path class="u344-rd s" d="M60 100 V210 M270 90 V110 M170 140 V160"/>
    </svg>
  </button>
  <span class="u344-tip">Tap the map to pick a spot</span>
  <span class="u344-rip" aria-hidden="true"></span>
  <span class="u344-sh" aria-hidden="true" hidden></span>
  <button class="u344-pin" type="button" aria-label="Remove the pin" hidden><svg viewBox="0 0 36 48"><path d="M18 2C9.2 2 3 8.6 3 17c0 11 15 29 15 29s15-18 15-29C33 8.6 26.8 2 18 2z" fill="#F03E3E"/><circle cx="18" cy="17" r="6" fill="#fff"/></svg></button>
  <div class="u344-card" role="status"><div><b class="u344-a"></b><span class="u344-d"></span></div><button class="u344-ok" type="button">Choose this spot</button></div>
</div>
`,
      css: `

.u344{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:350px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u344-map{position:absolute;inset:0;border:0;padding:0;background:color-mix(in srgb,#E9E5DA 70%,var(--ux-surface));cursor:crosshair}
.u344-map svg{position:absolute;inset:0;width:100%;height:100%}
.u344-blk{fill:color-mix(in srgb,#D9D3C4 70%,var(--ux-surface-3))}
.u344-park{fill:color-mix(in srgb,#9BD48D 60%,var(--ux-surface))}
.u344-riv{fill:none;stroke:color-mix(in srgb,#7CC4F5 75%,var(--ux-surface));stroke-width:22;stroke-linecap:round}
.u344-rd{fill:none;stroke:var(--ux-surface);stroke-width:9;stroke-linecap:round}
.u344-rd.s{stroke-width:5}
.u344-tip{position:absolute;left:50%;top:14px;transform:translateX(-50%);padding:7px 12px;border-radius:999px;background:var(--ux-surface);box-shadow:0 6px 16px -8px var(--ux-shadow-strong);font-size:12px;font-weight:700;color:var(--ux-ink-2);white-space:nowrap;pointer-events:none;transition:opacity .3s}
.u344.has .u344-tip{opacity:0}
.u344-pin{position:absolute;left:0;top:0;width:36px;height:48px;margin:-46px 0 0 -18px;border:0;padding:0;background:none;cursor:pointer;z-index:2}
.u344-pin svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 3px 3px rgba(0,0,0,.25))}
.u344-sh{position:absolute;left:0;top:0;width:22px;height:8px;margin:-4px 0 0 -11px;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(1.5px)}
.u344-rip{position:absolute;left:0;top:0;width:60px;height:24px;margin:-12px 0 0 -30px;border-radius:50%;border:2px solid var(--ux-danger);opacity:0}
.u344-rip.go{animation:u344-rip .8s var(--ux-ease)}
@keyframes u344-rip{0%{opacity:.9;transform:scale(.2)}100%{opacity:0;transform:scale(1.6)}}
.u344-card{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;gap:10px;padding:12px 12px 12px 14px;border-radius:18px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 16px 30px -14px var(--ux-shadow-strong);transform:translateY(120%);transition:transform .55s var(--ux-spring);z-index:3}
.u344.has .u344-card{transform:none}
.u344-card div{flex:1;min-width:0}
.u344-card b{display:block;font-size:14px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u344-card span{font-size:12px;font-weight:650;color:var(--ux-ink-3)}
.u344-ok{flex:none;height:36px;padding:0 12px;border:0;border-radius:11px;background:var(--ux-ink);color:var(--ux-page);font-size:12.5px;font-weight:750}
.u344-ok.done{background:var(--ux-mint);color:var(--ux-accent-ink)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u344');
  var map = root.querySelector('.u344-map'), pin = root.querySelector('.u344-pin'), sh = root.querySelector('.u344-sh'), rip = root.querySelector('.u344-rip');
  var aEl = root.querySelector('.u344-a'), dEl = root.querySelector('.u344-d'), ok = root.querySelector('.u344-ok');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ADDR = [['41 Yeonmujang-gil, Seongsu', 'Café · 6 min walk'], ['12-4 Euljiro 3-ga', 'Printing alley · 11 min walk'], ['98 Hannam-daero', 'Bus stop · 3 min walk'], ['7 Poeun-ro, Mangwon', 'Han River park gate · 9 min walk']];
  var OK = ok.textContent;
  function at(el, x, y) { el.style.left = x + 'px'; el.style.top = y + 'px'; }
  // 핀은 위에서 떨어져 튕기고, 그림자는 높이에 반비례해 커집니다
  function drop(x, y) {
    at(pin, x, y); at(sh, x, y); at(rip, x, y);
    pin.hidden = false; sh.hidden = false;
    var a = ADDR[(x > 170 ? 1 : 0) + (y > 160 ? 2 : 0)];
    aEl.textContent = a[0]; dEl.textContent = a[1];
    ok.textContent = OK; ok.classList.remove('done');
    root.classList.add('has');
    if (rm || !pin.animate) return;
    pin.animate([{ transform: 'translateY(-220px)', opacity: 0 }, { transform: 'translateY(-200px)', opacity: 1, offset: 0.1 }, { transform: 'translateY(0) scale(1.15,.82)', offset: 0.55, easing: 'ease-out' }, { transform: 'translateY(-22px) scale(.95,1.05)', offset: 0.75, easing: 'ease-in' }, { transform: 'translateY(0) scale(1.05,.95)', offset: 0.9 }, { transform: 'none' }], { duration: 760, easing: 'cubic-bezier(.55,0,1,.45)' });
    sh.animate([{ transform: 'scale(.2)', opacity: 0.2 }, { transform: 'scale(1.2)', opacity: 1, offset: 0.55 }, { transform: 'scale(.7)', opacity: 0.6, offset: 0.75 }, { transform: 'none', opacity: 1 }], { duration: 760 });
    rip.classList.remove('go');
    setTimeout(function () { void rip.offsetWidth; rip.classList.add('go'); }, 400);
  }
  map.addEventListener('click', function (e) {
    var r = root.getBoundingClientRect(), k = root.offsetWidth / (r.width || 1);
    var x = e.detail === 0 ? 170 : (e.clientX - r.left) * k, y = e.detail === 0 ? 150 : (e.clientY - r.top) * k;
    drop(Math.round(Math.max(20, Math.min(320, x))), Math.round(Math.max(56, Math.min(260, y))));
  });
  pin.addEventListener('click', function () {
    root.classList.remove('has');
    var done = function () { pin.hidden = true; sh.hidden = true; };
    if (rm || !pin.animate) { done(); return; }
    pin.animate([{ transform: 'none' }, { transform: 'translateY(8px) scale(1.1,.85)', offset: 0.2 }, { transform: 'translateY(-260px) rotate(25deg)', opacity: 0 }], { duration: 520, easing: 'cubic-bezier(.4,0,.8,.4)' }).onfinish = done;
    sh.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.2)' }], { duration: 400, fill: 'forwards' }).onfinish = function () { sh.style.opacity = ''; };
  });
  ok.addEventListener('click', function () { ok.textContent = 'Set as the meeting spot'; ok.classList.add('done'); });
})();
  })();

  scope.ready();
  return scope.controller;
}
