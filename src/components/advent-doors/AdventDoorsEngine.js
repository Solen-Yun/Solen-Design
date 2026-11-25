// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountAdventDoors(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u364">
  <div class="u364-sn" aria-hidden="true"></div>
  <div class="u364-hd"><b>Little doors of December</b><span class="u364-n" aria-live="polite"></span></div>
  <div class="u364-gd"></div>
  <div class="u364-msg" aria-live="polite"></div>
</div>
`,
      css: `

.u364{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:linear-gradient(170deg,#1B3A5C,#0E2238);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#F1F7FF}
.u364-sn{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1.5px),radial-gradient(circle,rgba(255,255,255,.45) 1px,transparent 1.5px);background-size:60px 60px,37px 37px;animation:u364-snow 9s linear infinite}
@keyframes u364-snow{to{background-position:20px 60px,-10px 74px}}
.u364-hd{position:absolute;left:20px;right:20px;top:16px;display:flex;justify-content:space-between;font-size:12.5px;font-weight:850}
.u364-hd span{font-size:11px;color:#A5D8FF;font-variant-numeric:tabular-nums}
.u364-gd{position:absolute;left:18px;right:18px;top:44px;bottom:44px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr);gap:8px;perspective:700px}
.u364-c{position:relative;border-radius:10px;background:#FFF9DB;box-shadow:inset 0 3px 8px rgba(0,0,0,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-align:center;overflow:visible}
.u364-c svg{width:30px;height:30px}
.u364-c small{font-size:8.5px;font-weight:800;color:#7A4E2D;line-height:1.15;padding:0 3px;word-break:keep-all}
.u364-d{position:absolute;inset:0;border:0;padding:0;border-radius:10px;cursor:pointer;transform-origin:0 50%;transition:transform .7s cubic-bezier(.3,1.25,.5,1);font:inherit;color:#fff;display:grid;place-items:center;font-size:20px;font-weight:900;text-shadow:0 2px 0 rgba(0,0,0,.2);box-shadow:inset 0 0 0 2px rgba(255,255,255,.25);backface-visibility:hidden;-webkit-backface-visibility:hidden}
.u364-d::after{content:"";position:absolute;right:7px;top:50%;width:5px;height:5px;margin-top:-2.5px;border-radius:50%;background:#FFD43B}
.u364-d.is-open{transform:rotateY(-112deg)}
.u364-d.is-lock{cursor:not-allowed}
.u364-d.is-lock::before{content:"";position:absolute;right:6px;top:6px;width:10px;height:8px;border-radius:2px;background:rgba(255,255,255,.8);box-shadow:0 -5px 0 -2px rgba(255,255,255,.8)}
.u364-d.is-shake{animation:u364-sh .45s}
@keyframes u364-sh{20%,60%{transform:rotate(-4deg)}40%,80%{transform:rotate(4deg)}}
.u364-d:focus-visible{outline:2px solid #FFD43B;outline-offset:2px}
.u364-msg{position:absolute;left:18px;right:18px;bottom:12px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:999px;background:rgba(255,255,255,.1);font-size:11.5px;font-weight:750;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .35s cubic-bezier(.3,1.5,.5,1)}
.u364-msg.is-on{opacity:1;transform:none}
@media (prefers-reduced-motion: reduce){.u364-sn{animation:none}.u364-d{transition:none}.u364-d.is-shake{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u364');
  var gd = root.querySelector('.u364-gd'), num = root.querySelector('.u364-n'), msg = root.querySelector('.u364-msg');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GIFT = ['Hot cocoa', 'Glitter stickers', 'Three tangerines', 'Wool mittens', 'A box of cookies', 'Snowman keyring', 'A candle', 'A postcard', 'A pair of socks', 'A candy cane', 'A tiny tree', 'A gift box'];
  var COL = ['#E03131', '#2B8A3E', '#1971C2', '#C2255C', '#E8590C', '#5F3DC4'];
  var ICON = ['<path d="M8 12h14v8a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z" fill="#A0522D"/><path d="M22 14h2a3 3 0 0 1 0 6h-2" fill="none" stroke="#A0522D" stroke-width="2"/><path d="M12 9q2-3 0-5M17 9q2-3 0-5" stroke="#ADB5BD" stroke-width="1.6" fill="none"/>', '<path d="M16 3l3.5 8 8.5.8-6.4 5.6 1.9 8.4L16 21.5 8.5 25.8l1.9-8.4L4 11.8l8.5-.8z" fill="#FCC419"/>', '<circle cx="10" cy="20" r="6" fill="#FD7E14"/><circle cx="21" cy="21" r="6" fill="#FF922B"/><circle cx="16" cy="12" r="6" fill="#F76707"/>', '<path d="M9 8h9v14l3 4h-12z" fill="#E03131"/><rect x="8" y="22" width="14" height="4" rx="1" fill="#fff"/>', '<rect x="5" y="10" width="22" height="16" rx="2" fill="#C08552"/><circle cx="11" cy="16" r="3" fill="#7A4E2D"/><circle cx="20" cy="19" r="3" fill="#7A4E2D"/>', '<circle cx="16" cy="21" r="7" fill="#fff" stroke="#ADB5BD"/><circle cx="16" cy="10" r="5" fill="#fff" stroke="#ADB5BD"/><path d="M16 11l3 1-3 1z" fill="#FD7E14"/>', '<rect x="11" y="12" width="10" height="16" rx="2" fill="#F8F0E3"/><path d="M16 4q3 4 0 7q-3-3 0-7" fill="#FCC419"/>', '<rect x="5" y="9" width="22" height="15" rx="2" fill="#fff" stroke="#ADB5BD"/><path d="M5 10l11 8 11-8" fill="none" stroke="#E03131" stroke-width="1.6"/>', '<path d="M10 5h8v13l6 5-3 4-11-7z" fill="#1971C2"/><path d="M10 9h8" stroke="#fff" stroke-width="2"/>', '<path d="M20 28V10a5 5 0 0 0-10 0" stroke="#E03131" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M20 28V10a5 5 0 0 0-10 0" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="3 3"/>', '<path d="M16 3l7 10h-4l6 9h-18l6-9h-4z" fill="#2B8A3E"/><rect x="14" y="22" width="4" height="5" fill="#7A4E2D"/>', '<rect x="6" y="12" width="20" height="15" rx="2" fill="#C2255C"/><rect x="5" y="9" width="22" height="5" rx="1" fill="#E64980"/><path d="M16 9v18" stroke="#FCC419" stroke-width="3"/>'];
  // 오늘은 7일: 1~7일은 열 수 있고 8~12일은 잠겨 있습니다
  var TODAY = 7, left = TODAY, msgT = 0;
  function info() { num.textContent = left + ' doors left'; }
  function say(s) { msg.textContent = s; msg.classList.add('is-on'); clearTimeout(msgT); msgT = setTimeout(function () { msg.classList.remove('is-on'); }, 1800); }
  for (var i = 0; i < 12; i++) (function (i) {
    var day = i + 1, cell = document.createElement('div'); cell.className = 'u364-c';
    cell.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true">' + ICON[i] + '</svg><small>' + GIFT[i] + '</small>';
    var d = document.createElement('button'); d.type = 'button'; d.className = 'u364-d' + (day > TODAY ? ' is-lock' : ''); d.textContent = day; d.style.background = 'linear-gradient(145deg,' + COL[i % COL.length] + ',' + COL[(i + 2) % COL.length] + ')';
    d.setAttribute('aria-label', day + (day > TODAY ? ' door, still locked' : ' door, open'));
    d.addEventListener('click', function () {
      if (day > TODAY) { d.classList.remove('is-shake'); void d.offsetWidth; d.classList.add('is-shake'); say('Not yet · ' + (day - TODAY) + ' days to go'); return; }
      if (d.classList.contains('is-open')) return;
      d.classList.add('is-open'); d.setAttribute('aria-expanded', 'true'); left--; info(); say(GIFT[i]);
    });
    cell.appendChild(d); gd.appendChild(cell);
  })(i);
  info();
})();
  })();

  scope.ready();
  return scope.controller;
}
