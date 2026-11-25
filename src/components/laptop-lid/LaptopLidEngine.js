// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountLaptopLid(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u334">
  <div class="u334-shadow" aria-hidden="true"></div>
  <div class="u334-st" aria-hidden="true"><div class="u334-sc">
    <div class="u334-base"><div class="u334-kb"></div><div class="u334-tp"></div><div class="u334-edge"></div></div>
    <div class="u334-lid">
      <div class="u334-out"><svg viewBox="0 0 24 24"><path d="M7 4h4v12h6v4H7z" fill="#fff"/></svg></div>
      <div class="u334-scr"><div class="u334-dsp">
        <div class="u334-boot"><b></b><div class="u334-bar"><i></i></div></div>
        <div class="u334-desk"><div class="u334-menu">10:24</div><div class="u334-win"></div><div class="u334-dock"><i style="background:#7B61FF"></i><i style="background:#3D8BFF"></i><i style="background:#22C3A6"></i><i style="background:#FF8787"></i><i style="background:#FCC419"></i></div></div>
        <div class="u334-glare"></div>
      </div></div>
    </div>
  </div></div>
  <button type="button" class="u334-hit" role="slider" aria-label="Laptop lid, drag up and down or press to open and close" aria-valuemin="0" aria-valuemax="112" aria-valuenow="0"></button>
</div>
`,
      css: `

.u334{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:linear-gradient(180deg,#E8ECF4 0 58%,#D3C3AE 58% 100%);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u334::before{content:"";position:absolute;left:0;right:0;top:58%;height:14px;background:linear-gradient(rgba(0,0,0,.08),transparent)}
.u334-shadow{position:absolute;left:50%;top:244px;width:250px;height:40px;margin-left:-125px;border-radius:50%;background:radial-gradient(closest-side,rgba(40,30,20,.35),transparent);transition:opacity .3s}
.u334-st{position:absolute;left:50%;top:190px;width:0;height:0;perspective:760px;perspective-origin:0 -120px}
.u334-sc{position:absolute;left:0;top:0;transform-style:preserve-3d;transform:rotateX(62deg)}
.u334-base,.u334-lid{position:absolute;left:-110px;width:220px;height:146px;transform-style:preserve-3d}
.u334-base{top:-73px;border-radius:9px;background:linear-gradient(#C9CED8,#B4BAC6);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5)}
.u334-kb{position:absolute;left:16px;right:16px;top:14px;height:72px;border-radius:5px;background:#2A2D35;display:grid;grid-template-columns:repeat(12,1fr);gap:2.4px;padding:4px}
.u334-kb i{border-radius:2px;background:#3D414B;box-shadow:0 0 calc(var(--bl,0) * 6px) rgba(140,200,255,calc(var(--bl,0) * .9));transition:box-shadow .5s}
.u334-tp{position:absolute;left:72px;right:72px;top:94px;height:42px;border-radius:6px;background:#BEC4CF;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.u334-edge{position:absolute;left:0;right:0;bottom:-8px;height:8px;border-radius:0 0 8px 8px;background:#9298A6;transform-origin:50% 0;transform:rotateX(-90deg)}
.u334-lid{top:-73px;transform-origin:50% 0;transform:translateZ(1px) rotateX(calc(var(--a,0) * 1deg))}
.u334-out,.u334-scr{position:absolute;inset:0;border-radius:9px;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.u334-out{background:linear-gradient(160deg,#D4D9E2,#AEB5C2);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center}
.u334-out svg{width:30px;height:30px;opacity:.55}
.u334-scr{transform:rotateX(180deg);background:#15171C;padding:7px;box-shadow:inset 0 0 0 1px #000}
.u334-dsp{position:relative;width:100%;height:100%;border-radius:4px;overflow:hidden;background:#000}
.u334-boot,.u334-desk{position:absolute;inset:0;opacity:0;transition:opacity .5s}
.u334-boot{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
.u334-boot b{width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#7B61FF,#3D8BFF);box-shadow:0 0 18px rgba(123,97,255,.7)}
.u334-bar{width:70px;height:3px;border-radius:2px;background:#333;overflow:hidden}
.u334-bar i{display:block;height:100%;width:0;background:#fff;transition:width 1.1s ease}
.u334-desk{background:radial-gradient(120% 90% at 20% 0,#FFB4A2,#B5838D 45%,#6D6875);}
.u334-menu{position:absolute;left:0;right:0;top:0;height:9px;background:rgba(255,255,255,.35);display:flex;justify-content:flex-end;padding:0 5px;font:700 6px/9px system-ui;color:#2A2233}
.u334-win{position:absolute;left:22px;top:24px;width:112px;height:70px;border-radius:5px;background:rgba(255,255,255,.92);box-shadow:0 6px 14px -4px rgba(0,0,0,.4);transform:scale(.6);opacity:0;transition:transform .5s cubic-bezier(.3,1.5,.5,1) .3s,opacity .3s .3s}
.u334-win::before{content:"";position:absolute;left:5px;top:5px;width:18px;height:4px;border-radius:2px;background:radial-gradient(circle at 2px 2px,#FF6B6B 1.6px,transparent 2px),radial-gradient(circle at 9px 2px,#FCC419 1.6px,transparent 2px),radial-gradient(circle at 16px 2px,#51CF66 1.6px,transparent 2px)}
.u334-win::after{content:"";position:absolute;left:8px;right:8px;top:16px;height:44px;background:repeating-linear-gradient(#E9ECF2 0 5px,transparent 5px 10px)}
.u334-dock{position:absolute;left:50%;bottom:4px;width:70px;height:11px;margin-left:-35px;border-radius:4px;background:rgba(255,255,255,.4);display:flex;gap:3px;align-items:center;justify-content:center}
.u334-dock i{width:7px;height:7px;border-radius:2px}
.u334.is-boot .u334-boot{opacity:1}
.u334.is-boot .u334-bar i{width:100%}
.u334.is-on .u334-boot{opacity:0}
.u334.is-on .u334-desk{opacity:1}
.u334.is-on .u334-win{transform:none;opacity:1}
.u334-glare{position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.14),transparent 40%);pointer-events:none}
.u334-hit{position:absolute;left:50%;top:40px;width:240px;height:200px;margin-left:-120px;border:0;padding:0;background:transparent;cursor:grab;touch-action:none;border-radius:14px}
.u334-hit:active{cursor:grabbing}
.u334-hit:focus-visible{outline:2px solid #3D8BFF;outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u334-win,.u334-boot,.u334-desk,.u334-bar i{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u334');
  var lid = root.querySelector('.u334-lid'), hit = root.querySelector('.u334-hit'), kb = root.querySelector('.u334-kb'), sh = root.querySelector('.u334-shadow');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (var i = 0; i < 60; i++) kb.appendChild(document.createElement('i'));
  // 뚜껑 각도 a(0 = 닫힘, 112 = 활짝). 화면 면은 뚜껑 안쪽(뒤집힌 면)에 붙어 있어 열릴수록 앞으로 보입니다
  var a = 0, target = 0, vel = 0, MAX = 112, bootT = 0, state = 0;
  function apply() {
    lid.style.setProperty('--a', a.toFixed(2));
    kb.style.setProperty('--bl', Math.max(0, Math.min(1, (a - 60) / 40)).toFixed(2));
    sh.style.opacity = (0.6 + a / MAX * 0.4).toFixed(2);
    hit.setAttribute('aria-valuenow', Math.round(a)); hit.setAttribute('aria-valuetext', Math.round(a) + '° open');
    // 70도를 넘으면 부팅, 40도 아래로 내려가면 잠듭니다
    if (a > 70 && state === 0) { state = 1; root.classList.add('is-boot'); clearTimeout(bootT); bootT = setTimeout(function () { if (state === 1) { state = 2; root.classList.add('is-on'); } }, rm ? 0 : 1300); }
    if (a < 40 && state) { state = 0; clearTimeout(bootT); root.classList.remove('is-boot', 'is-on'); }
  }
  var raf = 0, last = 0;
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.033, Math.max(0, (now - last) / 1000)); last = now;
    // 경첩 스프링: 약간 튕기며 목표 각도에 멈춥니다
    vel += ((target - a) * 90 - vel * 13) * dt; a += vel * dt;
    if (a < 0) { a = 0; vel = Math.abs(vel) * 0.25; }
    apply();
    if (Math.abs(target - a) > 0.05 || Math.abs(vel) > 0.05) raf = requestAnimationFrame(frame); else { a = target; apply(); }
  }
  function go(t) { target = Math.max(0, Math.min(MAX, t)); if (rm) { a = target; apply(); return; } if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  var drag = null, moved = false;
  hit.addEventListener('pointerdown', function (e) { drag = { y: e.clientY, a: a }; moved = false; try { hit.setPointerCapture(e.pointerId); } catch (_) {} });
  hit.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var k = root.offsetWidth / (root.getBoundingClientRect().width || 1), dy = (e.clientY - drag.y) * k;
    if (Math.abs(dy) > 4) moved = true;
    if (moved) { var t = Math.max(0, Math.min(MAX, drag.a - dy * 0.75)); a = t; target = t; vel = 0; apply(); }
  });
  function up() { if (!drag) return; drag = null; if (moved) go(a > 45 ? (a > 100 ? MAX : Math.max(a, 96)) : 0); }
  hit.addEventListener('pointerup', up); hit.addEventListener('pointercancel', up);
  hit.addEventListener('click', function () { if (moved) { moved = false; return; } go(target > 45 ? 0 : MAX); });
  hit.addEventListener('keydown', function (e) {
    var d = { ArrowUp: 10, ArrowRight: 10, ArrowDown: -10, ArrowLeft: -10, Home: -MAX, End: MAX }[e.key];
    if (d === undefined) return; e.preventDefault(); go(target + d);
  });
  apply();
})();
  })();

  scope.ready();
  return scope.controller;
}
