// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountStampCard(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u353">
  <div class="u353-cd"><div class="u353-in">
    <div class="u353-fr"><div class="u353-tt"><b>Solen Coffee</b><span>Buy ten, get one free</span></div><div class="u353-gd"></div></div>
    <div class="u353-bk" aria-live="polite"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M14 22h28v16a12 12 0 0 1-12 12h-4a12 12 0 0 1-12-12z" fill="#fff" stroke="#3E2A1E" stroke-width="3"/><path d="M42 26h4a6 6 0 0 1 0 12h-4" fill="none" stroke="#3E2A1E" stroke-width="3"/><path d="M22 8q4 4 0 8M30 6q4 4 0 8" stroke="#C2410C" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg><b>One free drink</b><span>Show this screen at the counter</span></div>
  </div></div>
  <svg class="u353-stp" viewBox="0 0 54 70" aria-hidden="true"><rect x="19" y="0" width="16" height="30" rx="7" fill="#8C5A33"/><rect x="10" y="28" width="34" height="14" rx="4" fill="#A86E3E"/><rect x="6" y="40" width="42" height="12" rx="3" fill="#C2410C"/></svg>
  <div class="u353-ft"><span class="u353-n" aria-live="polite"></span><span class="u353-bar"><i></i></span><button type="button" class="u353-go">Stamp</button></div>
</div>
`,
      css: `

.u353{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:linear-gradient(170deg,#F4EDE4,#E6D5C3);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#3E2A1E}
.u353-cd{position:absolute;left:24px;right:24px;top:30px;height:206px;perspective:900px}
.u353-in{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.4,1.3,.5,1)}
.u353.is-done .u353-in{transform:rotateY(180deg)}
.u353-fr,.u353-bk{position:absolute;inset:0;border-radius:20px;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 16px 30px -16px rgba(62,42,30,.55)}
.u353-fr{background:#FFFBF4;padding:16px 18px;display:flex;flex-direction:column}
.u353-fr::before{content:"";position:absolute;right:0;top:0;bottom:0;width:30px;border-radius:0 20px 20px 0;background:repeating-linear-gradient(#C08552 0 6px,#A86E3E 6px 12px);opacity:.2}
.u353-tt b{display:block;font-size:16px;font-weight:900;letter-spacing:-.01em}
.u353-tt span{font-size:10.5px;font-weight:700;color:#9C7B62}
.u353-gd{margin-top:12px;display:grid;grid-template-columns:repeat(5,1fr);gap:9px;padding-right:22px}
.u353-sl{position:relative;aspect-ratio:1;border-radius:50%;border:2px dashed #D9C4AE;display:grid;place-items:center}
.u353-sl svg{width:58%;height:58%;opacity:.25}
.u353-ink{position:absolute;inset:-4px;border-radius:50%;opacity:0;transform:rotate(var(--r)) scale(1.4)}
.u353-ink.is-on{opacity:1;transform:rotate(var(--r)) scale(1);transition:transform .12s ease-out,opacity .08s}
.u353-ink svg{width:100%;height:100%;opacity:1}
.u353-bk{transform:rotateY(180deg);background:radial-gradient(circle at 30% 20%,#FFE8CC,#FFD8A8);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center}
.u353-bk svg{width:60px;height:60px}
.u353-bk b{font-size:20px;font-weight:900}
.u353-bk span{font-size:11px;font-weight:700;color:#9C5A1E}
.u353-stp{position:absolute;left:0;top:0;width:54px;height:70px;pointer-events:none;opacity:0;filter:drop-shadow(0 10px 8px rgba(0,0,0,.25))}
.u353-ft{position:absolute;left:24px;right:24px;bottom:24px;display:flex;align-items:center;gap:12px}
.u353-bar{flex:1;height:8px;border-radius:4px;background:rgba(62,42,30,.12);overflow:hidden}
.u353-bar i{display:block;height:100%;width:0;border-radius:4px;background:linear-gradient(90deg,#C2410C,#F08C00);transition:width .45s cubic-bezier(.3,1.3,.5,1)}
.u353-n{font-size:11.5px;font-weight:800;font-variant-numeric:tabular-nums;min-width:70px}
.u353-go{border:0;padding:9px 16px;border-radius:999px;background:#3E2A1E;color:#FFFBF4;font:inherit;font-size:12.5px;font-weight:850;cursor:pointer;white-space:nowrap}
.u353-go:focus-visible{outline:2px solid #3E2A1E;outline-offset:3px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u353');
  var gd = root.querySelector('.u353-gd'), stp = root.querySelector('.u353-stp'), go = root.querySelector('.u353-go'), bar = root.querySelector('.u353-bar i'), num = root.querySelector('.u353-n');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CUP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" fill="none" stroke="#3E2A1E" stroke-width="2"/><path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2" fill="none" stroke="#3E2A1E" stroke-width="2"/></svg>';
  // 찍힌 도장: 테두리가 살짝 거친 원 + 가운데 컵 + 둘레 글자
  var INK = '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="none" stroke="#D9480F" stroke-width="3" stroke-dasharray="40 2 30 3 50 2"/><circle cx="30" cy="30" r="20" fill="none" stroke="#D9480F" stroke-width="1.4"/><path d="M20 26h16v7a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7z" fill="#D9480F" opacity=".9"/><path d="M36 28h3a3.5 3.5 0 0 1 0 7h-3" fill="none" stroke="#D9480F" stroke-width="2.4"/><text x="30" y="17" text-anchor="middle" font-size="5.5" font-weight="900" fill="#D9480F" font-family="system-ui" letter-spacing="1">SOLEN</text></svg>';
  var S = [], n = 0, busy = false;
  for (var i = 0; i < 10; i++) { var sl = document.createElement('div'); sl.className = 'u353-sl'; sl.innerHTML = CUP + '<span class="u353-ink" style="--r:' + ((Math.random() - 0.5) * 34).toFixed(0) + 'deg">' + INK + '</span>'; gd.appendChild(sl); S.push(sl); }
  function info() { num.textContent = n + '/10 collected'; bar.style.width = (n * 10) + '%'; go.textContent = n >= 10 ? 'New card' : 'Stamp'; }
  // 도장 내려오기 → 꾹(찌그러짐) → 잉크 남기고 들어 올림
  function stamp() {
    if (busy) return;
    if (n >= 10) { root.classList.remove('is-done'); n = 0; S.forEach(function (s) { s.querySelector('.u353-ink').classList.remove('is-on'); }); info(); return; }
    busy = true;
    var sl = S[n], r = sl.getBoundingClientRect(), rb = root.getBoundingClientRect(), k = root.offsetWidth / (rb.width || 1);
    var x = (r.left - rb.left) * k + r.width * k / 2 - 27, y = (r.top - rb.top) * k + r.height * k / 2 - 64;
    var ink = sl.querySelector('.u353-ink');
    function land() { ink.classList.add('is-on'); n++; info(); if (n >= 10) setTimeout(function () { root.classList.add('is-done'); }, rm ? 0 : 450); }
    if (rm || !stp.animate) { land(); busy = false; return; }
    stp.style.opacity = '1';
    stp.animate([
      { transform: 'translate(' + (x + 20) + 'px,' + (y - 60) + 'px) scale(1.25) rotate(8deg)', opacity: 0 },
      { transform: 'translate(' + x + 'px,' + (y - 10) + 'px) scale(1.1)', opacity: 1, offset: 0.4 },
      { transform: 'translate(' + x + 'px,' + (y + 2) + 'px) scale(1.04,.92)', offset: 0.55 },
      { transform: 'translate(' + x + 'px,' + (y - 50) + 'px) scale(1.15)', opacity: 1, offset: 0.85 },
      { transform: 'translate(' + (x - 10) + 'px,' + (y - 70) + 'px) scale(1.2)', opacity: 0 }
    ], { duration: 560, easing: 'ease-in-out' }).onfinish = function () { stp.style.opacity = '0'; busy = false; };
    setTimeout(land, 300);
  }
  go.addEventListener('click', stamp);
  // 단골손님처럼 이미 여섯 칸이 찍힌 쿠폰에서 시작합니다
  for (n = 0; n < 6; n++) S[n].querySelector('.u353-ink').classList.add('is-on');
  info();
})();
  })();

  scope.ready();
  return scope.controller;
}
