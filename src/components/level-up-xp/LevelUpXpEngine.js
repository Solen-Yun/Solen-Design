// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountLevelUpXp(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u372">
  <div class="u372-pf"><div class="u372-av" aria-hidden="true">S<span class="u372-ring"></span><span class="u372-ring"></span></div><div class="u372-nm"><b>Solen</b><span>Steady explorer</span></div><div class="u372-lv" aria-live="polite"><small>LEVEL</small><span class="u372-lw"><span class="u372-ls"></span></span></div></div>
  <div class="u372-bar" role="progressbar" aria-label="Experience" aria-valuemin="0" aria-valuemax="100"><div class="u372-fill"></div></div>
  <div class="u372-nx"><span class="u372-xp"></span><span class="u372-to"></span></div>
  <div class="u372-bn" aria-hidden="true">Level up!</div>
  <div class="u372-acts"></div>
</div>
`,
      css: `

.u372{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:linear-gradient(165deg,#1A1B3A,#2B1F5C);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#F1EFFF}
.u372-pf{position:absolute;left:24px;right:24px;top:30px;display:flex;align-items:center;gap:14px}
.u372-av{position:relative;width:64px;height:64px;flex:none;border-radius:50%;background:linear-gradient(135deg,#9775FA,#4DABF7);display:grid;place-items:center;font-size:26px;font-weight:900;box-shadow:0 0 0 3px #1A1B3A,0 0 0 5px #9775FA}
.u372-ring{position:absolute;inset:-6px;border-radius:50%;border:3px solid #FFD43B;opacity:0;pointer-events:none}
.u372.is-up .u372-ring{animation:u372-ring .9s ease-out}
.u372.is-up .u372-ring:nth-child(2){animation-delay:.18s}
@keyframes u372-ring{from{transform:scale(.8);opacity:1}to{transform:scale(2.2);opacity:0}}
.u372-nm b{display:block;font-size:17px;font-weight:900}
.u372-nm span{font-size:11px;font-weight:700;color:#B1A7F0}
.u372-lv{margin-left:auto;text-align:center}
.u372-lv small{display:block;font-size:9.5px;font-weight:800;letter-spacing:.14em;color:#B1A7F0}
.u372-lw{display:block;height:34px;overflow:hidden}
.u372-ls{display:block;transition:transform .55s cubic-bezier(.3,1.5,.5,1)}
.u372-ls i{display:block;height:34px;font-style:normal;font-size:30px;line-height:34px;font-weight:900;font-variant-numeric:tabular-nums;color:#FFD43B}
.u372-bar{position:absolute;left:24px;right:24px;top:122px;height:18px;border-radius:9px;background:rgba(255,255,255,.1);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.u372-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:9px;background:linear-gradient(90deg,#7950F2,#4DABF7 70%,#63E6BE);transition:width .5s cubic-bezier(.3,1.2,.5,1)}
.u372-fill::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%);transform:translateX(-100%)}
.u372.is-gain .u372-fill::after{animation:u372-shine .7s ease-out}
@keyframes u372-shine{to{transform:translateX(100%)}}
.u372.is-full .u372-bar{box-shadow:0 0 0 2px #FFD43B,0 0 18px rgba(255,212,59,.7)}
.u372-nx{position:absolute;left:24px;right:24px;top:146px;display:flex;justify-content:space-between;font-size:10.5px;font-weight:750;color:#B1A7F0;font-variant-numeric:tabular-nums}
.u372-acts{position:absolute;left:24px;right:24px;bottom:26px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.u372-a{height:62px;border:0;border-radius:16px;background:rgba(255,255,255,.08);color:#F1EFFF;font:inherit;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1);transition:background .2s,transform .15s}
.u372-a:hover{background:rgba(255,255,255,.14)}
.u372-a:active{transform:scale(.95)}
.u372-a b{font-size:12px;font-weight:800}
.u372-a span{font-size:10.5px;font-weight:800;color:#63E6BE}
.u372-a:focus-visible{outline:2px solid #FFD43B;outline-offset:2px}
.u372-fly{position:absolute;left:0;top:0;padding:2px 7px;border-radius:999px;background:#63E6BE;color:#0B3D2E;font-size:11px;font-weight:900;pointer-events:none;white-space:nowrap}
.u372-bn{position:absolute;left:50%;top:186px;transform:translate(-50%,10px) scale(.7);padding:8px 18px;border-radius:999px;background:linear-gradient(90deg,#FCC419,#FF922B);color:#3B1F00;font-size:16px;font-weight:900;opacity:0;pointer-events:none;transition:opacity .25s,transform .45s cubic-bezier(.3,1.8,.5,1);box-shadow:0 10px 24px -8px rgba(252,196,25,.7)}
.u372.is-up .u372-bn{opacity:1;transform:translate(-50%,0) scale(1)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u372');
  var bar = root.querySelector('.u372-bar'), fill = root.querySelector('.u372-fill'), ls = root.querySelector('.u372-ls'), xpT = root.querySelector('.u372-xp'), toT = root.querySelector('.u372-to'), acts = root.querySelector('.u372-acts');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ACT = [['Write a post', 40], ['Comment', 15], ['Check in', 25]];
  var lv = 7, xp = 60, need = 100, busy = 0;
  for (var i = 0; i < 30; i++) { var n = document.createElement('i'); n.textContent = i + 1; ls.appendChild(n); }
  function info(anim) {
    ls.style.transition = anim ? '' : 'none'; ls.style.transform = 'translateY(' + (-(lv - 1) * 34) + 'px)';
    fill.style.width = Math.min(100, xp / need * 100) + '%'; bar.setAttribute('aria-valuenow', Math.round(xp / need * 100));
    xpT.textContent = xp + ' / ' + need + ' XP'; toT.textContent = 'To next level ' + Math.max(0, need - xp);
  }
  function gain(v) {
    xp += v; root.classList.remove('is-gain'); void root.offsetWidth; root.classList.add('is-gain');
    if (xp >= need) {
      // 가득 찬 막대를 잠깐 보여 준 뒤 레벨을 올리고, 남은 경험치부터 다시 채웁니다
      fill.style.width = '100%'; root.classList.add('is-full');
      setTimeout(function () {
        xp -= need; lv++; need += 20; root.classList.remove('is-full'); root.classList.add('is-up');
        fill.style.transition = 'none'; fill.style.width = '0%'; void fill.offsetWidth; fill.style.transition = '';
        info(true);
        setTimeout(function () { root.classList.remove('is-up'); }, 1600);
      }, rm ? 0 : 650);
      xpT.textContent = need + ' / ' + need + ' XP';
      return;
    }
    info(true);
  }
  ACT.forEach(function (a) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u372-a'; b.innerHTML = '<b>' + a[0] + '</b><span>+' + a[1] + ' XP</span>';
    b.addEventListener('click', function () {
      if (rm) { gain(a[1]); return; }
      // +XP 꼬리표가 버튼에서 막대 끝으로 포물선을 그리며 날아가 꽂힙니다
      var rb = root.getBoundingClientRect(), k = root.offsetWidth / (rb.width || 1), br = b.getBoundingClientRect(), fr = fill.getBoundingClientRect();
      var x0 = (br.left - rb.left + br.width / 2) * k, y0 = (br.top - rb.top) * k, x1 = Math.max(40, (fr.right - rb.left) * k), y1 = (fr.top - rb.top) * k + 9;
      var f = document.createElement('span'); f.className = 'u372-fly'; f.textContent = '+' + a[1] + ' XP'; root.appendChild(f);
      f.animate([{ transform: 'translate(' + x0 + 'px,' + y0 + 'px) translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(' + ((x0 + x1) / 2) + 'px,' + (Math.min(y0, y1) - 50) + 'px) translate(-50%,-50%) scale(1.1)', opacity: 1, offset: 0.5 }, { transform: 'translate(' + x1 + 'px,' + y1 + 'px) translate(-50%,-50%) scale(.5)', opacity: 0.2 }], { duration: 650, easing: 'cubic-bezier(.4,0,.6,1)' }).onfinish = function () { f.remove(); gain(a[1]); };
    });
    acts.appendChild(b);
  });
  info(false);
})();
  })();

  scope.ready();
  return scope.controller;
}
