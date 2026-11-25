// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountShimmerGradientText(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u263" data-s="0">
  <div class="u263-sws" role="group" aria-label="Color set"></div>
  <h3 class="u263-h">Long meeting notes,<br>summed up in <em>three lines</em></h3>
  <button type="button" class="u263-ask"><span>Ask</span></button>
  <div class="u263-chat" aria-live="polite"><div class="u263-q">Give me the key points from this week's meetings</div><div class="u263-a"><span class="u263-ans"></span></div></div>
</div>
`,
      css: `

.u263{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);--g:linear-gradient(90deg,#6366F1,#22D3EE,#A855F7,#6366F1)}
.u263[data-s="1"]{--g:linear-gradient(90deg,#F43F5E,#F59E0B,#22C55E,#3B82F6,#A855F7,#F43F5E)}
.u263[data-s="2"]{--g:linear-gradient(90deg,#92400E,#F59E0B,#FDE68A,#D97706,#92400E)}
.u263-sws{position:absolute;left:18px;top:16px;display:flex;gap:5px}
.u263-sw{border:0;padding:5px 10px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:10.5px;font-weight:800;cursor:pointer}
.u263-sw.is-on{background:var(--ux-ink);color:var(--ux-surface);box-shadow:none}
.u263-sw:focus-visible,.u263-ask:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u263-h{position:absolute;left:22px;right:22px;top:56px;margin:0;font-size:27px;line-height:1.2;font-weight:900;letter-spacing:-.045em}
.u263-h em,.u263-ask span{font-style:normal;background:var(--g);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:u263-flow 5s linear infinite}
@keyframes u263-flow{to{background-position:-300% 0}}
.u263-ask{position:absolute;left:22px;top:140px;height:34px;padding:0 15px;border:0;border-radius:999px;background:var(--ux-surface);box-shadow:inset 0 0 0 1.5px var(--ux-line),0 6px 16px -10px var(--ux-shadow-strong);font:inherit;font-size:12px;font-weight:900;cursor:pointer}
.u263-chat{position:absolute;left:18px;right:18px;bottom:18px;display:flex;flex-direction:column;gap:7px}
.u263-q{align-self:flex-end;max-width:80%;padding:8px 12px;border-radius:14px 14px 4px 14px;background:var(--ux-accent);color:#fff;font-size:11.5px;font-weight:700;opacity:0;transform:translateY(6px);transition:opacity .3s,transform .3s}
.u263-a{align-self:flex-start;max-width:88%;padding:9px 12px;border-radius:14px 14px 14px 4px;background:var(--ux-surface-2);font-size:11.5px;line-height:1.5;font-weight:650;opacity:0;transform:translateY(6px);transition:opacity .3s .15s,transform .3s .15s}
.u263.is-chat .u263-q,.u263.is-chat .u263-a{opacity:1;transform:none}
.u263-sh{background:linear-gradient(90deg,var(--ux-ink-3) 0 40%,var(--ux-ink) 50%,var(--ux-ink-3) 60% 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:u263-sh 1.5s linear infinite;font-weight:800}
@keyframes u263-sh{from{background-position:100% 0}to{background-position:-150% 0}}
@media (prefers-reduced-motion: reduce){.u263-h em,.u263-ask span,.u263-sh{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u263');
  var sws = root.querySelector('.u263-sws'), ask = root.querySelector('.u263-ask'), ans = root.querySelector('.u263-ans');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SET = ['Light', 'Rainbow', 'Gold'], B = [], t = 0;
  SET.forEach(function (n, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u263-sw'; b.textContent = n;
    b.addEventListener('click', function () { root.dataset.s = i; B.forEach(function (x, k) { x.classList.toggle('is-on', k === i); x.setAttribute('aria-pressed', k === i); }); });
    sws.appendChild(b); B.push(b);
  });
  B[0].classList.add('is-on'); B[0].setAttribute('aria-pressed', 'true');
  // 질문하면 반짝이는 ‘생각하는 중…’을 보여 주다가 답이 오면 반짝임을 멈추고 문장으로 바꿉니다
  function answer() { ans.className = 'u263-ans'; ans.textContent = 'Launch is set for Nov 3, pricing stays the same, and design review wraps up by Wednesday.'; }
  ask.addEventListener('click', function () {
    clearTimeout(t); root.classList.add('is-chat');
    ans.className = 'u263-ans u263-sh'; ans.textContent = 'Thinking…';
    t = setTimeout(answer, rm ? 300 : 2400);
  });
  root.classList.add('is-chat'); answer();
})();
  })();

  scope.ready();
  return scope.controller;
}
