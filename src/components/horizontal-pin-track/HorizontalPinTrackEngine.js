// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountHorizontalPinTrack(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u241">
  <div class="u241-sc" tabindex="0" aria-label="Stages, scroll to move along">
    <div class="u241-run">
      <div class="u241-pin">
        <p class="u241-k">Four stages of an idea</p>
        <div class="u241-vp"><div class="u241-tr"></div></div>
        <div class="u241-ft"><div class="u241-bar" aria-hidden="true"><i></i></div><div class="u241-dots" aria-hidden="true"></div></div>
      </div>
    </div>
    <div class="u241-after">That’s all four</div>
  </div>
</div>
`,
      css: `

.u241{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u241-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u241-sc::-webkit-scrollbar{display:none}
.u241-pin{position:sticky;top:0;height:330px;overflow:hidden;display:flex;flex-direction:column;padding:22px 0 20px;box-sizing:border-box}
.u241-k{margin:0 22px;font-size:14px;font-weight:850;letter-spacing:-.02em;color:var(--ux-ink)}
/* 패널 띠는 카드 테두리에서 안쪽으로 들어온 둥근 창 안에서만 흐릅니다 */
.u241-vp{margin:14px 16px 0;border-radius:22px;overflow:hidden}
.u241-tr{display:flex;gap:10px;will-change:transform}
.u241-p{position:relative;flex:none;width:252px;height:206px;padding:20px;border-radius:22px;overflow:hidden;color:#fff;box-sizing:border-box}
.u241-n{position:absolute;right:10px;bottom:-26px;font-size:150px;line-height:1;font-weight:900;letter-spacing:-.06em;opacity:.25;will-change:transform}
.u241-sh{position:absolute;left:20px;bottom:20px;width:64px;height:64px;will-change:transform}
.u241-p b{display:block;font-size:26px;font-weight:880;letter-spacing:-.04em}
.u241-p span{display:block;margin-top:4px;font-size:13.5px;font-weight:650;opacity:.88}
.u241-ft{display:flex;align-items:center;gap:10px;margin:auto 22px 0}
.u241-bar{flex:1;height:4px;border-radius:4px;background:var(--ux-line-2);overflow:hidden}
.u241-bar i{display:block;height:100%;background:var(--ux-ink);transform-origin:0 50%;transform:scaleX(0)}
.u241-dots{display:flex;gap:5px}
.u241-dots i{width:7px;height:7px;border-radius:50%;background:var(--ux-line-2);transition:background-color .3s,transform .4s var(--ux-spring)}
.u241-dots i.on{background:var(--ux-ink);transform:scale(1.3)}
.u241-after{height:120px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;font-weight:800;color:var(--ux-ink-3)}
.u241-after::before{content:"";width:18px;height:18px;border-radius:50%;background:var(--ux-surface-2) url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 18 18%27%3E%3Cpath d=%27M5 9.3l2.6 2.6L13 6.6%27 fill=%27none%27 stroke=%27%2310B981%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") center/100% no-repeat;box-shadow:inset 0 0 0 1px var(--ux-line)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u241');
  var sc = root.querySelector('.u241-sc'), run = root.querySelector('.u241-run'), vp = root.querySelector('.u241-vp'), tr = root.querySelector('.u241-tr'), bar = root.querySelector('.u241-bar i'), dots = root.querySelector('.u241-dots');
  var PANELS = [['Seed', 'Write down a small idea'], ['Sprout', 'Shape it so others can see'], ['Stem', 'Build it piece by piece'], ['Fruit', 'Put it in people’s hands']];
  var BG = ['#845EF7', '#20C997', '#FF922B', '#F03E3E'];
  var SH = ['<circle cx="32" cy="32" r="14" fill="#fff"/>', '<path d="M32 56V30M32 34c-10 0-16-8-16-16 10 0 16 6 16 16zM32 30c8 0 14-6 14-14-8 0-14 6-14 14z" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>', '<path d="M32 60V8M32 26l-14-10M32 40l14-12" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/>', '<circle cx="24" cy="38" r="14" fill="#fff"/><circle cx="42" cy="28" r="11" fill="#fff" opacity=".7"/>'];
  var panels = PANELS.map(function (p, i) {
    var el = document.createElement('section');
    el.className = 'u241-p'; el.style.background = BG[i];
    el.innerHTML = '<span class="u241-n" aria-hidden="true">0' + (i + 1) + '</span><b></b><span></span><svg class="u241-sh" viewBox="0 0 64 64" aria-hidden="true">' + SH[i] + '</svg>';
    el.querySelector('b').textContent = p[0];
    el.querySelector('span:not(.u241-n)').textContent = p[1];
    tr.appendChild(el);
    dots.appendChild(document.createElement('i'));
    return el;
  });
  var dist = 0, raf = 0;
  // 가로로 움직일 거리만큼 세로 길이를 늘려 둡니다
  function measure() {
    dist = Math.max(0, tr.scrollWidth - vp.clientWidth);
    run.style.height = (330 + dist) + 'px';
  }
  function draw() {
    raf = 0;
    var y = Math.min(dist, sc.scrollTop), p = dist ? y / dist : 0;
    tr.style.transform = 'translateX(' + (-y).toFixed(1) + 'px)';
    panels.forEach(function (el, i) {
      var c = el.offsetLeft - y, f = c / 262;
      el.querySelector('.u241-n').style.transform = 'translateX(' + (f * 26).toFixed(1) + 'px)';
      el.querySelector('.u241-sh').style.transform = 'translateX(' + (f * -18).toFixed(1) + 'px) rotate(' + (f * -14).toFixed(1) + 'deg)';
    });
    bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    var cur = Math.round(p * (panels.length - 1));
    Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === cur); });
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  measure(); draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
