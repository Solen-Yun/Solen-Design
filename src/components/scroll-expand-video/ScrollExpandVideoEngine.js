// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountScrollExpandVideo(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u247">
  <div class="u247-sc" tabindex="0" aria-label="Page with an intro video">
    <div class="u247-hd"><small>One minute is enough</small><h3>See how work flows,<br>in one video</h3></div>
    <div class="u247-pin"><div class="u247-st"><div class="u247-v">
      <div class="u247-sn" aria-hidden="true"></div>
      <span class="u247-st2" aria-live="polite"><i aria-hidden="true"></i><span class="u247-sl"></span></span>
      <div class="u247-cap">Requests reach the right person instantly</div>
      <div class="u247-ui" aria-hidden="true"><span class="u247-pb"><svg class="u247-pl" viewBox="0 0 10 10"><path d="M2 1v8l7-4z" fill="#fff"/></svg><svg class="u247-pa" viewBox="0 0 10 10"><rect x="1.5" y="1" width="2.6" height="8" rx=".6" fill="#fff"/><rect x="5.9" y="1" width="2.6" height="8" rx=".6" fill="#fff"/></svg></span><span class="u247-tr"><i></i></span><span class="u247-tm">0:00</span></div>
    </div><div class="u247-hint" aria-hidden="true"><span>Scroll down</span><svg viewBox="0 0 10 10"><path d="M2.5 3.5 5 6l2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div></div>
    <div class="u247-ft"><b>What's different</b><span>Work in flows, not alerts.</span></div>
  </div>
</div>
`,
      css: `

.u247{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u247-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.u247-sc::-webkit-scrollbar{display:none}
.u247-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:32px}
.u247-hd{padding:112px 24px 24px;text-align:center}
.u247-hd small{font-size:10px;font-weight:850;letter-spacing:.06em;color:var(--ux-accent)}
.u247-hd h3{margin:8px 0 0;font-size:23px;line-height:1.2;font-weight:900;letter-spacing:-.04em}
.u247-pin{height:640px}
/* 다 커진 영상이 카드 세로 가운데에 오도록 붙는 위치를 잡습니다 */
.u247-st{position:sticky;top:126px;display:flex;flex-direction:column;align-items:center}
/* 커져도 둥근 모서리를 지키며, 카드 양옆에 12px 여백을 남기고 멈춥니다 */
.u247-v{position:relative;width:calc(186px + 90px * var(--p,0));height:calc(132px + 96px * var(--p,0));border-radius:calc(22px - 2px * var(--p,0));overflow:hidden;background:#0B1026;box-shadow:0 20px 40px -22px rgba(0,0,0,.6)}
.u247-sn{position:absolute;inset:-20%;background:radial-gradient(40% 50% at 30% 40%,#6366F1,transparent 70%),radial-gradient(35% 45% at 72% 60%,#EC4899,transparent 70%),radial-gradient(40% 40% at 55% 25%,#22D3EE,transparent 70%);filter:blur(6px);animation:u247-m 8s ease-in-out infinite alternate;animation-play-state:paused}
.u247.is-play .u247-sn{animation-play-state:running}
@keyframes u247-m{50%{transform:translate(6%,-4%) scale(1.08) rotate(6deg)}100%{transform:translate(-5%,5%) scale(1.02) rotate(-4deg)}}
.u247-ui{position:absolute;left:10px;right:10px;bottom:10px;display:flex;align-items:center;gap:8px;color:#fff;font-size:10px;font-weight:800}
.u247-pb{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.18);backdrop-filter:blur(6px);display:grid;place-items:center;flex:none}
.u247-pb svg{width:10px;height:10px}
.u247-pb .u247-pa{display:none}
.u247.is-play .u247-pb .u247-pa{display:block}
.u247.is-play .u247-pb .u247-pl{display:none}
.u247-tr{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.25);overflow:hidden}
.u247-tr i{display:block;height:100%;width:0;background:#fff}
.u247-tm{font-variant-numeric:tabular-nums;opacity:.85}
.u247-cap{position:absolute;left:0;right:0;bottom:44px;text-align:center;color:#fff;font-size:12px;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,.4);opacity:0;transform:translateY(6px);transition:opacity .4s,transform .4s}
.u247.is-play .u247-cap{opacity:1;transform:none}
.u247-st2{position:absolute;left:12px;top:12px;padding:3px 8px;border-radius:999px;background:rgba(0,0,0,.35);color:#fff;font-size:9.5px;font-weight:800;display:flex;align-items:center;gap:5px}
.u247-st2 i{width:6px;height:6px;border-radius:50%;background:#94A3B8}
.u247.is-play .u247-st2 i{background:#F43F5E;box-shadow:0 0 0 3px rgba(244,63,94,.3)}
.u247-hint{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:14px;font-size:9.5px;font-weight:800;color:var(--ux-ink-3);transition:opacity .3s}
.u247-hint svg{width:10px;height:10px;animation:u247-bob 1.4s ease-in-out infinite}
@keyframes u247-bob{50%{transform:translateY(3px)}}
.u247-ft{padding:0 24px 40px;text-align:center}
.u247-ft b{display:block;font-size:15px;font-weight:900}
.u247-ft span{font-size:11px;font-weight:600;color:var(--ux-ink-2)}
@media (prefers-reduced-motion: reduce){.u247-sn,.u247-hint svg{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u247');
  var sc = root.querySelector('.u247-sc'), v = root.querySelector('.u247-v'), bar = root.querySelector('.u247-tr i'), tm = root.querySelector('.u247-tm'), sl = root.querySelector('.u247-sl'), hint = root.querySelector('.u247-hint');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var play = false, t = 0, raf = 0, last = 0, LEN = 92;
  // 스크롤 진행(0~1)을 --p로 넘겨 크기와 모서리를 바꾸고, 거의 다 커지면 재생합니다
  function onScroll() {
    var p = Math.max(0, Math.min(1, sc.scrollTop / 260));
    v.style.setProperty('--p', p.toFixed(3)); hint.style.opacity = p > 0.05 ? 0 : 1;
    setPlay(p > 0.92);
  }
  function setPlay(on) {
    if (on === play) return;
    play = on; root.classList.toggle('is-play', on); sl.textContent = on ? 'Playing' : 'Paused';
    if (on && !raf && !rm) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }
  function frame(now) {
    raf = 0;
    if (!play || !root.isConnected) return;
    t = (t + Math.min(0.05, (now - last) / 1000)) % LEN; last = now;
    bar.style.width = (t / LEN * 100).toFixed(2) + '%';
    tm.textContent = Math.floor(t / 60) + ':' + ('0' + Math.floor(t % 60)).slice(-2);
    raf = requestAnimationFrame(frame);
  }
  sc.addEventListener('scroll', onScroll, { passive: true });
  sl.textContent = 'Paused'; onScroll();
})();
  })();

  scope.ready();
  return scope.controller;
}
