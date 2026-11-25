// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSharedElementDetail(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u328">
  <p class="u328-k">Where to next?</p>
  <div class="u328-ls"></div>
  <div class="u328-dt" role="dialog" aria-modal="false">
    <div class="u328-hero"></div>
    <div class="u328-ttl"><b></b><span></span></div>
    <div class="u328-body"><p></p><div class="u328-meta"><i></i><i></i><i></i><span></span></div><button class="u328-go" type="button">Book now</button></div>
  </div>
  <button class="u328-x" type="button" aria-label="Close"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
</div>
`,
      css: `

.u328{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--ux-surface-2);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u328-k{margin:0;padding:20px 18px 12px;font-size:22px;font-weight:880;letter-spacing:-.04em}
.u328-ls{display:grid;gap:12px;padding:0 14px}
.u328-card{position:relative;height:118px;border:0;padding:0;border-radius:20px;overflow:hidden;text-align:left;color:#fff;transition:transform .3s var(--ux-spring),opacity .2s}
.u328-card:active{transform:scale(.97)}
.u328-card.hide{opacity:0}
.u328-card .im{position:absolute;inset:0;background:var(--bg)}
.u328-card .tx{position:absolute;left:16px;bottom:14px}
.u328-card b{display:block;font-size:20px;font-weight:880;letter-spacing:-.03em;text-shadow:0 2px 10px rgba(0,0,0,.25)}
.u328-card span{font-size:12.5px;font-weight:650;opacity:.9}
.u328-dt{position:absolute;inset:0;z-index:3;background:var(--ux-surface);visibility:hidden;overflow:hidden}
.u328.is-open .u328-dt{visibility:visible}
.u328-hero{position:absolute;left:0;top:0;width:300px;height:250px;background:var(--bg);transform-origin:0 0}
.u328-ttl{position:absolute;left:20px;top:192px;color:#fff;transform-origin:0 100%}
.u328-ttl b{display:block;font-size:30px;font-weight:900;letter-spacing:-.04em;text-shadow:0 2px 14px rgba(0,0,0,.25)}
.u328-ttl span{font-size:14px;font-weight:700;opacity:.9}
.u328-body{position:absolute;left:0;right:0;top:250px;padding:18px 20px}
.u328-body>*{opacity:0;transform:translateY(16px)}
.u328.is-in .u328-body>*{opacity:1;transform:none;transition:opacity .4s,transform .6s var(--ux-spring)}
.u328.is-in .u328-body>:nth-child(2){transition-delay:.06s}
.u328.is-in .u328-body>:nth-child(3){transition-delay:.12s}
.u328-body p{margin:0;font-size:14px;line-height:1.7;color:var(--ux-ink-2)}
.u328-meta{display:flex;align-items:center;gap:8px;margin-top:12px;font-size:12.5px;font-weight:700;color:var(--ux-ink-3)}
.u328-meta i{width:24px;height:24px;margin-right:-14px;border-radius:50%;border:2px solid var(--ux-surface);background:linear-gradient(135deg,#FFA8A8,#748FFC)}
.u328-go{width:100%;height:46px;margin-top:16px;border:0;border-radius:14px;background:var(--ux-ink);color:var(--ux-page);font-size:14px;font-weight:800}
.u328-x{position:absolute;left:14px;top:14px;z-index:4;width:36px;height:36px;border:0;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.35);color:#fff;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;transform:scale(.6);transition:opacity .25s,transform .4s var(--ux-spring);pointer-events:none}
.u328.is-in .u328-x{opacity:1;transform:none;pointer-events:auto}
.u328-x svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u328');
  var ls = root.querySelector('.u328-ls'), dt = root.querySelector('.u328-dt'), hero = root.querySelector('.u328-hero'), ttl = root.querySelector('.u328-ttl'), x = root.querySelector('.u328-x');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PLACES = [['Iceland', '7 days chasing auroras', 'Ice caves, black sand beaches and green light slicing across the night sky. A full loop of the island along the Ring Road.'], ['Morocco', 'Three nights in the desert', 'A journey that starts in the alleys of Marrakech and ends counting stars on the dunes of the Sahara.'], ['Kyoto', 'Temples in autumn leaves', 'Walk empty gardens early in the morning, then rest slowly in a tea house in the afternoon.']];
  var BG = ['radial-gradient(60% 40% at 60% 30%,#63E6BE,transparent 70%),linear-gradient(#0B1340,#1E3A5F 60%,#0B0C12)', 'radial-gradient(30% 22% at 75% 30%,#FFE066,transparent 70%),linear-gradient(#F59F00,#E8590C 50%,#C2410C 51%,#9A3412)', 'radial-gradient(50% 40% at 30% 70%,#E03131,transparent 70%),linear-gradient(135deg,#FFA94D,#C92A2A 60%,#5C3D2E)'];
  var cards = PLACES.map(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'u328-card';
    b.innerHTML = '<span class="im"></span><span class="tx"><b></b><span></span></span>';
    b.querySelector('.im').style.setProperty('--bg', BG[i]);
    b.querySelector('b').textContent = p[0];
    b.querySelector('.tx span').textContent = p[1];
    b.addEventListener('click', function () { open(i); });
    ls.appendChild(b);
    return b;
  });
  var cur = -1, busy = false;
  function rect(el) { var r = el.getBoundingClientRect(), rr = root.getBoundingClientRect(), k = root.offsetWidth / (rr.width || 1); return { x: (r.left - rr.left) * k, y: (r.top - rr.top) * k, w: r.width * k, h: r.height * k }; }
  // 카드 자리에서 시작해 전체로 커지는 잘라내기 + 사진·제목 FLIP을 함께 돌립니다
  function frames(c) {
    var clip0 = 'inset(' + c.y + 'px ' + (300 - c.x - c.w) + 'px ' + (500 - c.y - c.h) + 'px ' + c.x + 'px round 20px)', clip1 = 'inset(0px 0px 0px 0px round 30px)';
    return {
      dt: [{ clipPath: clip0 }, { clipPath: clip1 }],
      hero: [{ transform: 'translate(' + c.x + 'px,' + c.y + 'px) scale(' + (c.w / 300) + ',' + (c.h / 250) + ')' }, { transform: 'none' }],
      ttl: [{ transform: 'translate(' + (c.x + 16 - 20) + 'px,' + (c.y + c.h - 14 - 242) + 'px) scale(.68)' }, { transform: 'none' }]
    };
  }
  function run(f, reverse, done) {
    var o = { duration: 560, easing: 'cubic-bezier(.3,1.05,.35,1)', fill: 'both', direction: reverse ? 'reverse' : 'normal' };
    if (rm || !dt.animate) { done(); return; }
    dt.animate(f.dt, o); hero.animate(f.hero, o);
    ttl.animate(f.ttl, o).onfinish = done;
  }
  function open(i) {
    if (busy || cur >= 0) return;
    busy = true; cur = i;
    var p = PLACES[i];
    hero.style.setProperty('--bg', BG[i]);
    ttl.querySelector('b').textContent = p[0]; ttl.querySelector('span').textContent = p[1];
    dt.querySelector('p').textContent = p[2];
    dt.querySelector('.u328-meta span').textContent = (120 + i * 87) + ' interested';
    dt.setAttribute('aria-label', p[0]);
    var c = rect(cards[i]);
    root.classList.add('is-open');
    cards[i].classList.add('hide');
    run(frames(c), false, function () { busy = false; root.classList.add('is-in'); x.focus({ preventScroll: true }); });
  }
  x.addEventListener('click', function () {
    if (busy || cur < 0) return;
    busy = true;
    root.classList.remove('is-in');
    var c = rect(cards[cur]), i = cur;
    setTimeout(function () {
      run(frames(c), true, function () {
        root.classList.remove('is-open'); cards[i].classList.remove('hide');
        dt.getAnimations && dt.getAnimations().forEach(function (a) { a.cancel(); });
        hero.getAnimations && hero.getAnimations().forEach(function (a) { a.cancel(); });
        ttl.getAnimations && ttl.getAnimations().forEach(function (a) { a.cancel(); });
        busy = false; cur = -1; cards[i].focus({ preventScroll: true });
      });
    }, rm ? 0 : 160);
  });
})();
  })();

  scope.ready();
  return scope.controller;
}
