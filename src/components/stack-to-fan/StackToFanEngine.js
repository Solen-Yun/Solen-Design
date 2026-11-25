// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStackToFan(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u369"></div>
`,
      css: `

.u369{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:28px;background:var(--ux-surface-2);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u369-p{position:absolute;left:50%;top:50%;width:96px;height:112px;margin:-56px 0 0 -48px;border:0;padding:7px 7px 24px;border-radius:6px;background:#fff;box-shadow:0 10px 20px -10px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.05);transition:transform .7s cubic-bezier(.3,1.2,.4,1);transition-delay:var(--dl,0ms)}
.u369-p i{display:block;width:100%;height:100%;border-radius:2px;background:var(--bg)}
.u369-p span{position:absolute;left:0;right:0;bottom:5px;text-align:center;font:600 10.5px/1 ui-rounded,-apple-system,sans-serif;color:#555}
.u369-p:focus-visible{outline:2px solid var(--ux-accent);outline-offset:3px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u369');
  var CAP = ['Sea', 'Alley', 'Sunset', 'Forest path', 'Snow', 'Flowers'];
  var BG = ['linear-gradient(#74C0FC,#1C7ED6)', 'linear-gradient(135deg,#FFD8A8,#E8590C)', 'linear-gradient(#FFD43B,#F76707 55%,#5F3DC4)', 'linear-gradient(#B2F2BB,#2F9E44)', 'linear-gradient(#F1F3F5,#ADB5BD)', 'radial-gradient(circle at 40% 40%,#FFDEEB,#E64980)'];
  // 순서(order)의 마지막이 맨 위 사진입니다
  var order = [0, 1, 2, 3, 4, 5], spread = false, hover = false;
  var tilt = CAP.map(function () { return (Math.random() - 0.5) * 16; });
  var ps = CAP.map(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'u369-p';
    b.innerHTML = '<i style="--bg:' + BG[i] + '"></i><span></span>';
    b.querySelector('span').textContent = c;
    b.addEventListener('click', function () { tap(i); });
    b.addEventListener('pointerenter', function () { hover = true; if (!spread) place(); });
    b.addEventListener('pointerleave', function () { hover = false; if (!spread) place(); });
    root.appendChild(b);
    return b;
  });
  function place() {
    order.forEach(function (i, z) {
      var b = ps[i], t;
      b.style.zIndex = spread ? 1 : z + 1;
      if (spread) {
        var col = z % 3, row = Math.floor(z / 3);
        t = 'translate(' + ((col - 1) * 104) + 'px,' + ((row - 0.5) * 124) + 'px) rotate(0deg)';
        b.style.setProperty('--dl', (z * 40) + 'ms');
        b.setAttribute('aria-label', CAP[i] + ', tap to gather with this on top');
      } else {
        var k = z - (order.length - 1);
        t = hover ? 'translate(' + (k * 16) + 'px,' + (k * -3) + 'px) rotate(' + (k * 7 + 2) + 'deg)' : 'translate(' + (k * 1.5) + 'px,' + (k * -1.5) + 'px) rotate(' + tilt[i] + 'deg)';
        b.style.setProperty('--dl', ((order.length - 1 - z) * 30) + 'ms');
        b.setAttribute('aria-label', 'Photo stack, tap to spread');
        b.tabIndex = z === order.length - 1 ? 0 : -1;
      }
      if (spread) b.tabIndex = 0;
      b.style.transform = t;
    });
  }
  function tap(i) {
    if (!spread) { spread = true; hover = false; place(); return; }
    // 누른 사진을 맨 위로 보내고 다시 더미로 모읍니다
    order = order.filter(function (x) { return x !== i; }).concat(i);
    tilt = tilt.map(function () { return (Math.random() - 0.5) * 16; });
    tilt[i] = (Math.random() - 0.5) * 6;
    spread = false; place();
    ps[i].focus({ preventScroll: true });
  }
  place();
})();
  })();

  scope.ready();
  return scope.controller;
}
