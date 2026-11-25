// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountMorphingButtonForm(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 260,
      responsive: false,
      markup: `
<div class="ux u274" data-s="idle">
  <p class="u274-k">One design letter every Thursday</p>
  <div class="u274-sh" role="group">
    <button class="u274-lb" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>Get the newsletter</button>
    <div class="u274-fm"><input class="u274-in" type="email" placeholder="Email address" aria-label="Email address" autocomplete="email"><button class="u274-go" type="button" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
    <div class="u274-sp" aria-hidden="true"><svg viewBox="0 0 54 54"><circle class="r" cx="27" cy="27" r="21"/><path class="c" d="M19 27.5l5.5 5.5L35 22"/></svg></div>
    <div class="u274-dn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Subscribed</div>
  </div>
  <p class="u274-msg" role="status"></p>
  <button class="u274-re" type="button">Try again</button>
</div>
`,
      css: `

.u274{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u274-k{margin:0;font-size:13.5px;font-weight:700;color:var(--ux-ink-2)}
.u274-sh{position:relative;width:var(--w,200px);height:54px;border:0;padding:0;border-radius:27px;background:var(--ux-ink);color:var(--ux-page);overflow:hidden;transition:width .6s cubic-bezier(.3,1.25,.4,1),background-color .4s;cursor:pointer}
.u274[data-s="form"] .u274-sh{--w:300px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1.5px var(--ux-line-2);cursor:default}
.u274[data-s="busy"] .u274-sh,.u274[data-s="ok"] .u274-sh{--w:54px;background:var(--ux-ink)}
.u274[data-s="done"] .u274-sh{--w:170px;background:var(--ux-mint);cursor:default}
.u274-lb,.u274-fm,.u274-sp,.u274-dn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s;pointer-events:none}
.u274[data-s="idle"] .u274-lb,.u274[data-s="form"] .u274-fm,.u274[data-s="busy"] .u274-sp,.u274[data-s="ok"] .u274-sp,.u274[data-s="done"] .u274-dn{opacity:1;pointer-events:auto;transition-delay:.18s}
.u274-lb{font-size:15px;font-weight:800;gap:8px}
.u274-lb svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.u274-fm{justify-content:space-between;padding:0 5px 0 18px}
.u274-in{flex:1;min-width:0;height:100%;border:0;background:none;outline:none;font-size:15px;color:var(--ux-ink)}
.u274-go{flex:none;width:44px;height:44px;border:0;border-radius:50%;display:grid;place-items:center;background:var(--ux-ink);color:var(--ux-page);transition:transform .35s var(--ux-spring)}
.u274-go:active{transform:scale(.9)}
.u274-go svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.u274-sp svg{width:54px;height:54px}
.u274-sp .r{fill:none;stroke:var(--ux-page);stroke-width:3;stroke-linecap:round;stroke-dasharray:40 200;transform-origin:27px 27px;animation:u274-rot .8s linear infinite}
.u274[data-s="ok"] .u274-sp .r{stroke-dasharray:200 0;animation:none;transition:stroke-dasharray .35s}
.u274-sp .c{fill:none;stroke:var(--ux-page);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .35s var(--ux-ease) .2s}
.u274[data-s="ok"] .u274-sp .c{stroke-dashoffset:0}
@keyframes u274-rot{to{transform:rotate(360deg)}}
.u274-dn{gap:6px;font-size:15px;font-weight:800;color:var(--ux-accent-ink)}
.u274-dn svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.u274.is-bad .u274-sh{animation:u274-no .45s}
@keyframes u274-no{20%{transform:translateX(-9px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(3px)}}
/* 안내 문구와 다시 해 보기는 묶음 밖에 띄워, 보이는 제목과 버튼이 카드 세로 가운데에 오게 합니다 */
.u274-msg{position:absolute;left:0;right:0;top:calc(50% + 58px);height:16px;margin:0;text-align:center;font-size:12px;font-weight:700;color:var(--ux-danger)}
.u274-re{position:absolute;left:50%;top:calc(50% + 52px);transform:translateX(-50%);height:30px;padding:0 12px;border:0;border-radius:999px;background:none;font-size:12px;font-weight:700;color:var(--ux-ink-3);opacity:0;pointer-events:none;transition:opacity .3s}
.u274[data-s="done"] .u274-re{opacity:1;pointer-events:auto}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u274');
  var input = root.querySelector('.u274-in'), msg = root.querySelector('.u274-msg');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function state(s) { root.setAttribute('data-s', s); }
  root.querySelector('.u274-lb').addEventListener('click', function () {
    state('form'); msg.textContent = '';
    setTimeout(function () { input.focus(); }, 350);
  });
  function send() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
      msg.textContent = 'Please check the email format';
      root.classList.remove('is-bad'); void root.offsetWidth; root.classList.add('is-bad');
      return;
    }
    msg.textContent = '';
    // 버튼이 동그라미로 줄어 기다린 뒤 체크, 그다음 완료 알약으로 펴집니다
    state('busy');
    setTimeout(function () {
      if (!root.isConnected) return;
      state('ok');
      setTimeout(function () { if (root.isConnected) { state('done'); msg.textContent = ''; root.querySelector('.u274-dn').setAttribute('aria-label', 'Subscribed'); } }, rm ? 100 : 900);
    }, rm ? 100 : 1100);
  }
  root.querySelector('.u274-go').addEventListener('click', send);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); send(); }
    if (e.key === 'Escape') { state('idle'); msg.textContent = ''; root.querySelector('.u274-lb').focus(); }
  });
  root.addEventListener('animationend', function () { root.classList.remove('is-bad'); });
  root.querySelector('.u274-re').addEventListener('click', function () { input.value = ''; state('idle'); });
})();
  })();

  scope.ready();
  return scope.controller;
}
