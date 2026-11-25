// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountClipRevealPhotos(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u282">
  <div class="u282-sc" tabindex="0" aria-label="Photo set, scroll to view">
    <p class="u282-k">A year of scenes</p><p class="u282-s">Four photos</p>
    <div class="u282-list"></div>
  </div>
</div>
`,
      css: `

.u282{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u282-sc{position:absolute;inset:0;overflow-y:auto;padding:22px 16px 80px;scrollbar-width:none;outline:none}
.u282-sc::-webkit-scrollbar{display:none}
.u282-k{margin:0;font-size:24px;font-weight:880;letter-spacing:-.04em}
.u282-s{margin:2px 0 220px;font-size:12.5px;font-weight:700;color:var(--ux-ink-3)}
.u282-ph{margin:0 0 44px}
.u282-fr{position:relative;height:300px;border-radius:20px;overflow:hidden;clip-path:inset(0 calc(var(--c,1) * 46%) 0 calc(var(--c,1) * 46%) round 20px)}
.u282-img{position:absolute;inset:-6%;transform:scale(calc(1 + var(--c,1) * .3))}
.u282-cap{margin-top:10px;opacity:calc(1 - var(--c,1) * 3);transform:translateY(calc(var(--c,1) * 30px))}
.u282-cap b{display:block;font-size:16px;font-weight:850}
.u282-cap span{font-size:12px;font-weight:700;color:var(--ux-ink-3)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u282');
  var sc = root.querySelector('.u282-sc'), list = root.querySelector('.u282-list');
  var PH = [['Dawn sea', 'Gangneung · 5:40 AM'], ['Misty forest', 'Odaesan · 7:10 AM'], ['Sunset bridge', 'Seoul · 6:25 PM'], ['Field of falling stars', 'Pyeongchang · 11:50 PM']];
  var ART = [
    'linear-gradient(#FFD8A8 0,#FFC078 30%,#74C0FC 55%,#1C7ED6 100%)',
    'radial-gradient(60% 40% at 50% 30%,rgba(255,255,255,.8),transparent 70%),linear-gradient(#C3D0C8,#5C7F6B 70%,#2B4B3A)',
    'radial-gradient(30% 20% at 70% 45%,#FFE066,transparent 70%),linear-gradient(#5F3DC4,#E8590C 55%,#343A40 56%,#212529)',
    'radial-gradient(1.5px 1.5px at 20% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 60% 30%,#fff,transparent),radial-gradient(1px 1px at 80% 15%,#fff,transparent),radial-gradient(1px 1px at 40% 40%,#fff,transparent),linear-gradient(#0B1340,#3B2C7A 60%,#1B4332 61%,#081C15)'
  ];
  var items = PH.map(function (p, i) {
    var el = document.createElement('figure');
    el.className = 'u282-ph';
    el.innerHTML = '<div class="u282-fr" role="img"><div class="u282-img"></div></div><figcaption class="u282-cap"><b></b><span></span></figcaption>';
    el.querySelector('.u282-img').style.background = ART[i];
    el.querySelector('.u282-fr').setAttribute('aria-label', p[0]);
    el.querySelector('b').textContent = p[0];
    el.querySelector('span').textContent = p[1];
    list.appendChild(el);
    return el;
  });
  var raf = 0;
  // 사진 윗변이 화면 아래쪽 90%에서 45% 지점까지 올라오는 동안 틈이 닫힘(1)에서 열림(0)으로 갑니다
  function draw() {
    raf = 0;
    var vh = sc.clientHeight, top = sc.scrollTop;
    items.forEach(function (el) {
      var y = el.offsetTop - top, c = Math.max(0, Math.min(1, (y - vh * 0.42) / (vh * 0.48)));
      el.style.setProperty('--c', c.toFixed(3));
    });
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
