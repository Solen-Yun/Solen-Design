// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPadlockToggle(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 300,
      responsive: false,
      markup: `
<div class="ux u350">
  <button class="u350-lk" type="button" aria-label="Document lock" aria-pressed="true">
    <span class="u350-ring" aria-hidden="true"></span>
    <svg viewBox="0 0 96 112" aria-hidden="true">
      <path class="u350-sh" d="M28 70 V40 a20 20 0 0 1 40 0 V60"/>
      <g class="u350-bd"><rect x="12" y="52" width="72" height="56" rx="16"/><g class="u350-kh"><circle cx="48" cy="76" r="7"/><rect x="45" y="78" width="6" height="13" rx="3"/></g></g>
    </svg>
  </button>
  <p class="u350-f">Q2 budget.pdf</p>
  <p class="u350-st"><i class="u350-tag">Private</i><span class="u350-ds">Only you can view</span></p>
  <div class="u350-ppl" aria-hidden="true">
    <span class="u350-av" style="--i:0;--a:#8E95A8;--b:#5B6275"></span><span class="u350-av" style="--i:1;--a:#FF8A5B;--b:#FFD166"></span><span class="u350-av" style="--i:2;--a:#38D9A9;--b:#3D8BFF"></span><span class="u350-av" style="--i:3;--a:#B49CFF;--b:#FF6B9D"></span><span class="u350-av" style="--i:4;--a:#74C0FC;--b:#5C7CFA"></span>
  </div>
</div>
`,
      css: `

.u350{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:300px;display:flex;flex-direction:column;align-items:center;padding:22px 20px 24px;box-sizing:border-box;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;--c:var(--ux-ink)}
.u350.is-open{--c:var(--ux-mint)}
.u350-lk{position:relative;width:96px;height:112px;border:0;padding:0;background:none;border-radius:20px;cursor:pointer}
.u350-lk:focus-visible{outline:2px solid var(--ux-accent);outline-offset:6px}
.u350-lk svg{position:relative;width:100%;height:100%;overflow:visible}
.u350-sh{fill:none;stroke:var(--c);stroke-width:9;stroke-linecap:round;transition:stroke .35s}
.u350-bd{transform-box:view-box;transform-origin:48px 108px}
.u350-bd>rect{fill:var(--c);transition:fill .35s}
.u350-kh{transform-box:view-box;transform-origin:48px 80px}
.u350-kh *{fill:var(--ux-surface)}
/* 열릴 때 몸통 뒤에서 둥근 빛 고리가 한 번 퍼집니다 */
.u350-ring{position:absolute;left:50%;top:72%;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--ux-mint) 35%,transparent),transparent 70%);opacity:0;pointer-events:none}
.u350.is-pulse .u350-ring{animation:u350-ring .8s ease-out}
@keyframes u350-ring{0%{opacity:1;transform:scale(.6)}100%{opacity:0;transform:scale(1.7)}}
.u350-f{margin:14px 0 0;font-size:15px;font-weight:800}
.u350-st{display:flex;align-items:center;gap:6px;margin:6px 0 0;font-size:13px;font-weight:650;color:var(--ux-ink-3)}
.u350-st i{font-style:normal;padding:3px 8px;border-radius:999px;background:var(--ux-surface-2);font-size:11.5px;font-weight:800;color:var(--ux-ink-2);transition:background-color .3s,color .3s}
.u350.is-open .u350-st i{background:color-mix(in srgb,var(--ux-mint) 18%,transparent);color:var(--ux-mint)}
.u350-ppl{display:flex;margin-top:auto;height:32px}
.u350-av{width:32px;height:32px;margin-left:-8px;border-radius:50%;border:2.5px solid var(--ux-surface);box-sizing:border-box;background:linear-gradient(135deg,var(--a),var(--b));opacity:0;transform:translateX(-10px) scale(.5);transition:opacity .3s,transform .5s var(--ux-spring)}
.u350-av:first-child{margin-left:0;opacity:1;transform:none}
.u350.is-open .u350-av{opacity:1;transform:none;transition-delay:calc(var(--i) * 70ms + .35s)}
@media (prefers-reduced-motion: reduce){.u350-av,.u350-sh,.u350-bd>rect{transition:none}.u350.is-pulse .u350-ring{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u350');
  var lk = root.querySelector('.u350-lk'), sh = root.querySelector('.u350-sh'), bd = root.querySelector('.u350-bd'), kh = root.querySelector('.u350-kh');
  var tag = root.querySelector('.u350-tag'), ds = root.querySelector('.u350-ds');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var open = false, A = [];
  // 고리의 왼쪽 다리는 길어서 열려도 몸통 안에 남고, 오른쪽 다리만 몸통 밖으로 빠져 틈이 생깁니다
  var UP = 'translateY(-15px)';
  function play(el, frames, opt) { if (rm || !el.animate) { el.style.transform = frames[frames.length - 1].transform; return; } var a = el.animate(frames, Object.assign({ fill: 'forwards' }, opt)); A.push(a); }
  lk.addEventListener('click', function () {
    open = !open;
    A.forEach(function (a) { a.commitStyles && a.commitStyles(); a.cancel(); }); A = [];
    root.classList.toggle('is-open', open);
    lk.setAttribute('aria-pressed', String(!open));
    tag.textContent = open ? 'Shared' : 'Private';
    ds.textContent = open ? 'Anyone with the link can view' : 'Only you can view';
    if (open) {
      // 1) 열쇠를 돌리듯 열쇠 구멍이 돌고 2) 고리가 튀어 올라 살짝 넘쳤다 자리 잡습니다
      play(kh, [{ transform: getComputedStyle(kh).transform === 'none' ? 'none' : getComputedStyle(kh).transform }, { transform: 'rotate(-90deg)' }], { duration: 220, easing: 'cubic-bezier(.4,0,.2,1)' });
      play(sh, [{ transform: 'none' }, { transform: 'translateY(-19px)', offset: 0.55 }, { transform: UP }], { duration: 480, delay: 200, easing: 'cubic-bezier(.2,.9,.3,1)' });
      play(bd, [{ transform: 'none' }, { transform: 'translateY(2px) scale(1.02,.97)', offset: 0.3 }, { transform: 'none' }], { duration: 360, delay: 200, easing: 'ease-out' });
      if (!rm) { root.classList.remove('is-pulse'); void root.offsetWidth; root.classList.add('is-pulse'); }
    } else {
      // 고리가 떨어져 딸깍 걸리고, 몸통이 눌렸다 올라온 뒤 열쇠 구멍이 돌아옵니다
      play(sh, [{ transform: UP }, { transform: 'translateY(-21px)', offset: 0.25 }, { transform: 'translateY(1.5px)', offset: 0.75 }, { transform: 'none' }], { duration: 440, easing: 'cubic-bezier(.5,0,.4,1)' });
      play(bd, [{ transform: 'none', offset: 0 }, { transform: 'none', offset: 0.62 }, { transform: 'translateY(2px) scale(1.04,.94)', offset: 0.78 }, { transform: 'none' }], { duration: 560 });
      play(kh, [{ transform: 'rotate(-90deg)' }, { transform: 'none' }], { duration: 220, delay: 380, easing: 'cubic-bezier(.4,0,.2,1)' });
    }
  });
  root.addEventListener('animationend', function () { root.classList.remove('is-pulse'); });
})();
  })();

  scope.ready();
  return scope.controller;
}
