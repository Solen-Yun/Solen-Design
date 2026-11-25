// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTrustBadges(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u243">
  <div class="u243-hd"><b>Why you can trust us</b><small>Customer data is protected to international standards</small></div>
  <div class="u243-gd"></div>
</div>
`,
      css: `

.u243{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u243-hd{position:absolute;left:20px;right:20px;top:24px}
.u243-hd b{display:block;font-size:17px;font-weight:900;letter-spacing:-.03em}
.u243-hd small{display:block;margin-top:4px;font-size:11px;font-weight:650;color:var(--ux-ink-3)}
.u243-gd{position:absolute;left:14px;right:14px;top:84px;bottom:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;perspective:700px}
.u243-bg{position:relative;padding:0;border:0;background:none;font:inherit;color:inherit;cursor:pointer;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.3,1.2,.4,1)}
.u243-bg.is-flip{transform:rotateY(180deg)}
.u243-bg:focus-visible{outline:2px solid var(--ux-accent);outline-offset:3px;border-radius:16px}
.u243-f,.u243-b{position:absolute;inset:0;border-radius:16px;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden}
.u243-f{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u243-f::after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-12deg);animation:u243-sh 5.5s ease-in-out infinite;animation-delay:var(--d)}
@keyframes u243-sh{0%,70%{left:-60%}90%,100%{left:130%}}
.u243-sd{width:42px;height:46px;display:grid;place-items:center;color:var(--c)}
.u243-sd svg{width:42px;height:46px}
.u243-f b{font-size:13px;font-weight:900;letter-spacing:-.01em}
.u243-f small{font-size:9.5px;font-weight:750;color:var(--ux-ink-3)}
.u243-b{transform:rotateY(180deg);display:flex;flex-direction:column;padding:11px 12px;text-align:left;background:var(--ux-surface);box-shadow:inset 0 0 0 1.5px var(--c)}
.u243-b b{font-size:12px;font-weight:900}
.u243-b span{margin-top:3px;font-size:10px;line-height:1.4;font-weight:700;color:var(--ux-ink-2)}
.u243-b small{margin-top:2px;font-size:9.5px;font-weight:650;color:var(--ux-ink-3)}
.u243-vf{display:inline-flex;align-items:center;gap:5px;align-self:flex-start;height:26px;margin-top:auto;padding:0 10px;border:0;border-radius:8px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:10px;font-weight:850;cursor:pointer}
.u243-vf i{display:none;width:11px;height:11px;border-radius:50%;border:2px solid color-mix(in srgb,var(--ux-surface) 35%,transparent);border-top-color:var(--ux-surface);animation:u243-sp .7s linear infinite}
.u243-vf.is-busy i{display:block}
.u243-vf.is-ok{background:#059669}
@keyframes u243-sp{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion: reduce){.u243-bg{transition:none}.u243-f::after,.u243-vf i{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u243');
  var gd = root.querySelector('.u243-gd');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [이름, 앞면 설명, 뒷면 기관, 범위·기간]
  var BG = [['ISO 27001', 'Info security', 'Certified by ISO', 'All services · until Mar 2027'], ['SOC 2', 'Security & uptime', 'Type II audit report', 'Audited externally every year'], ['GDPR', 'Privacy', 'EU privacy rules', 'DPA available'], ['ISMS-P', 'Korean infosec', 'Certified by KISA', 'Until Nov 2026']];
  var COL = ['#2563EB', '#7C3AED', '#0D9488', '#E11D48'];
  var SHIELD = '<svg viewBox="0 0 42 46" aria-hidden="true"><path d="M21 3l15 5.5v11.5c0 11-6.6 18.8-15 22.5C12.6 38.8 6 31 6 20V8.5z" fill="color-mix(in srgb,currentColor 14%,transparent)" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M14.5 22.5l4.5 4.5 9-9.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  BG.forEach(function (g, i) {
    var b = document.createElement('div'); b.className = 'u243-bg'; b.style.setProperty('--c', COL[i]); b.style.setProperty('--d', (i * 1.1) + 's'); b.tabIndex = 0; b.setAttribute('role', 'button'); b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', g[0] + ' — details');
    b.innerHTML = '<div class="u243-f"><span class="u243-sd">' + SHIELD + '</span><b></b><small></small></div><div class="u243-b"><b></b><span></span><small></small><button type="button" class="u243-vf" tabindex="-1"><i aria-hidden="true"></i><em style="font-style:normal"></em></button></div>';
    b.querySelector('.u243-f b').textContent = g[0]; b.querySelector('.u243-f small').textContent = g[1];
    b.querySelector('.u243-b b').textContent = g[0]; b.querySelector('.u243-b span').textContent = g[2]; b.querySelector('.u243-b small').textContent = g[3];
    var vf = b.querySelector('.u243-vf'), vl = vf.querySelector('em'); vl.textContent = 'Verify';
    function flip() { var on = !b.classList.contains('is-flip'); b.classList.toggle('is-flip', on); b.setAttribute('aria-pressed', on); vf.tabIndex = on ? 0 : -1; }
    b.addEventListener('click', function (e) { if (e.target.closest('.u243-vf')) return; flip(); });
    b.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target === b) { e.preventDefault(); flip(); } });
    // 확인: 잠깐 돌다가 확인한 시각을 찍습니다
    vf.addEventListener('click', function (e) {
      e.stopPropagation(); if (vf.classList.contains('is-busy') || vf.classList.contains('is-ok')) return;
      vf.classList.add('is-busy'); vl.textContent = 'Checking…';
      setTimeout(function () { vf.classList.remove('is-busy'); vf.classList.add('is-ok'); vl.textContent = 'Valid · just checked'; }, rm ? 0 : 900);
    });
    gd.appendChild(b);
  });
})();
  })();

  scope.ready();
  return scope.controller;
}
