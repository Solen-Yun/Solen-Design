// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTodayPopup(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u311">
  <div class="u311-pg" aria-hidden="true"><nav><b>SHOP</b><span>New in</span><span>Best</span><span>Sale</span></nav><i></i><i></i></div>
  <div class="u311-dim" aria-hidden="true"></div>
  <div class="u311-md" role="dialog" aria-modal="true" aria-label="Events">
    <div class="u311-vp"><div class="u311-tr"></div><span class="u311-pn" aria-live="polite"></span><div class="u311-dt" aria-hidden="true"></div></div>
    <div class="u311-ft"><button type="button" class="u311-td">Don’t show today</button><button type="button" class="u311-cl">Close</button></div>
  </div>
  <button type="button" class="u311-gf" aria-label="Show events again" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="9" width="17" height="11.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 9h19v3.5h-19zM12 9v11.5M12 9c-1.5-4-6-4.5-6-1.8C6 9 12 9 12 9zm0 0c1.5-4 6-4.5 6-1.8C18 9 12 9 12 9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></button>
  <div class="u311-tt" role="status">See you tomorrow</div>
</div>
`,
      css: `

.u311{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u311-pg{position:absolute;inset:0;padding:22px 18px}
.u311-pg nav{display:flex;gap:14px;font-size:12px;font-weight:800;color:var(--ux-ink-2)}
.u311-pg nav b{margin-right:auto;font-weight:900;color:var(--ux-ink)}
.u311-pg i{display:block;margin-top:12px;height:140px;border-radius:16px;background:var(--ux-surface-2)}
.u311-pg i+i{height:100px}
.u311-dim{position:absolute;inset:0;background:rgba(10,10,20,.45);transition:opacity .35s}
.u311.is-off .u311-dim{opacity:0;pointer-events:none}
.u311-md{position:absolute;left:26px;right:26px;top:66px;border-radius:22px;overflow:hidden;background:var(--ux-surface);box-shadow:0 30px 60px -20px rgba(0,0,0,.5);transform-origin:50% 50%;animation:u311-up .55s cubic-bezier(.3,1.4,.5,1) .3s backwards;transition:transform .55s cubic-bezier(.6,0,.3,1),opacity .4s .15s}
@keyframes u311-up{from{transform:translateY(40px) scale(.9);opacity:0}}
.u311.is-off .u311-md{transform:translate(var(--gx),var(--gy)) scale(.08);opacity:0;pointer-events:none}
.u311-vp{position:relative;height:300px;overflow:hidden;touch-action:pan-y;cursor:grab}
.u311-tr{display:flex;height:100%;will-change:transform}
.u311-sl{flex:none;width:100%;height:100%;padding:26px 22px;box-sizing:border-box;color:#fff;display:flex;flex-direction:column;position:relative;overflow:hidden}
.u311-sl small{font-size:11px;font-weight:850;letter-spacing:.04em;opacity:.85}
.u311-sl b{margin-top:6px;font-size:28px;line-height:1.15;font-weight:900;letter-spacing:-.04em}
.u311-sl span{margin-top:auto;font-size:11px;font-weight:750;opacity:.9}
.u311-sl::after{content:"";position:absolute;right:-30px;bottom:40px;width:150px;height:150px;border-radius:40px;background:rgba(255,255,255,.18);transform:rotate(18deg)}
.u311-pn{position:absolute;right:12px;bottom:12px;padding:3px 8px;border-radius:999px;background:rgba(0,0,0,.3);color:#fff;font-size:10px;font-weight:850;font-variant-numeric:tabular-nums}
.u311-dt{position:absolute;left:0;right:0;bottom:16px;display:flex;justify-content:center;gap:5px;pointer-events:none}
.u311-dt i{width:6px;height:6px;border-radius:3px;background:rgba(255,255,255,.5);transition:width .3s,background .3s}
.u311-dt i.is-on{width:18px;background:#fff}
.u311-ft{display:flex;border-top:1px solid var(--ux-line)}
.u311-ft button{flex:1;height:46px;border:0;background:none;color:var(--ux-ink-2);font:inherit;font-size:12px;font-weight:800;cursor:pointer}
.u311-ft button+button{border-left:1px solid var(--ux-line);color:var(--ux-ink)}
.u311-gf{position:absolute;right:16px;bottom:16px;width:52px;height:52px;border:0;border-radius:50%;background:linear-gradient(135deg,#F43F5E,#F97316);color:#fff;display:grid;place-items:center;cursor:pointer;box-shadow:0 12px 24px -10px #F43F5E;transform:scale(0);transition:transform .45s cubic-bezier(.3,1.7,.5,1)}
.u311.is-off .u311-gf{transform:none;transition-delay:.45s}
.u311-gf svg{width:24px;height:24px}
.u311-gf.is-bump{animation:u311-bp .5s cubic-bezier(.3,1.7,.5,1)}
@keyframes u311-bp{40%{transform:scale(1.2)}}
.u311-tt{position:absolute;right:76px;bottom:28px;padding:7px 11px;border-radius:10px;background:var(--ux-ink);color:var(--ux-surface);font-size:11px;font-weight:800;white-space:nowrap;opacity:0;transform:translateX(8px);transition:opacity .3s,transform .4s}
.u311-tt.is-on{opacity:1;transform:none}
.u311 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-2px}
@media (prefers-reduced-motion: reduce){.u311-md{animation:none;transition:opacity .2s}.u311.is-off .u311-md{transform:none}.u311-gf,.u311-tt{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u311');
  var vp = root.querySelector('.u311-vp'), tr = root.querySelector('.u311-tr'), pn = root.querySelector('.u311-pn'), dt = root.querySelector('.u311-dt'), md = root.querySelector('.u311-md'), td = root.querySelector('.u311-td'), cl = root.querySelector('.u311-cl'), gf = root.querySelector('.u311-gf'), tt = root.querySelector('.u311-tt');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [작은 제목, 큰 제목, 아래 줄]
  var BN = [['Fall sale', 'Up to 70% off', 'Oct 14 – Oct 20'], ['First order', '15% coupon + free shipping', 'Yours the moment you sign up'], ['App only', 'Daily deals at 10 AM', 'Turn on alerts so you don’t miss out']];
  var G = ['linear-gradient(150deg,#F97316,#E11D48)', 'linear-gradient(150deg,#6366F1,#A855F7)', 'linear-gradient(150deg,#0EA5E9,#14B8A6)'];
  BN.forEach(function (b, i) { var s = document.createElement('div'); s.className = 'u311-sl'; s.style.background = G[i]; s.innerHTML = '<small></small><b></b><span></span>'; s.children[0].textContent = b[0]; s.children[1].textContent = b[1]; s.children[2].textContent = b[2]; tr.appendChild(s); var d = document.createElement('i'); dt.appendChild(d); });
  var D = dt.children, n = BN.length, cur = 0, x = 0, W = 248, auto = 0, off = false;
  function paint(anim) { tr.style.transition = anim && !rm ? 'transform .5s cubic-bezier(.3,1,.3,1)' : 'none'; tr.style.transform = 'translateX(' + (-cur * 100) + '%)'; Array.prototype.forEach.call(D, function (d, i) { d.classList.toggle('is-on', i === cur); }); pn.textContent = (cur + 1) + ' / ' + n; }
  function go(i) { cur = (i + n) % n; paint(true); arm(); }
  function arm() { clearTimeout(auto); if (rm || off) return; auto = setTimeout(function () { if (root.isConnected) go(cur + 1); }, 2800); }
  // 끌기: 손을 따라 움직이고, 충분히 끌었으면 다음 장으로 넘깁니다
  var drag = null;
  vp.addEventListener('pointerdown', function (e) { clearTimeout(auto); drag = { x: e.clientX, k: W / vp.getBoundingClientRect().width, d: 0 }; try { vp.setPointerCapture(e.pointerId); } catch (er) {} });
  vp.addEventListener('pointermove', function (e) { if (!drag) return; drag.d = (e.clientX - drag.x) * drag.k; tr.style.transition = 'none'; tr.style.transform = 'translateX(calc(' + (-cur * 100) + '% + ' + drag.d.toFixed(1) + 'px))'; });
  function up() { if (!drag) return; var d = drag.d; drag = null; if (d < -40) go(cur + 1); else if (d > 40) go(cur - 1); else { paint(true); arm(); } }
  vp.addEventListener('pointerup', up); vp.addEventListener('pointercancel', up);
  // 오늘 하루 보지 않기: 팝업을 선물 버튼 자리로 빨아들입니다
  function hide(today) {
    off = true; clearTimeout(auto);
    var mr = md.getBoundingClientRect(), gr = gf.getBoundingClientRect(), k = root.offsetWidth / (root.getBoundingClientRect().width || 1);
    md.style.setProperty('--gx', ((gr.left + gr.width / 2 - (mr.left + mr.width / 2)) * k).toFixed(0) + 'px'); md.style.setProperty('--gy', ((gr.top + gr.height / 2 - (mr.top + mr.height / 2)) * k).toFixed(0) + 'px');
    root.classList.add('is-off'); md.setAttribute('aria-hidden', 'true'); gf.tabIndex = 0;
    setTimeout(function () { gf.classList.remove('is-bump'); void gf.offsetWidth; gf.classList.add('is-bump'); gf.focus({ preventScroll: true }); if (today) { tt.classList.add('is-on'); setTimeout(function () { tt.classList.remove('is-on'); }, 2200); } }, rm ? 0 : 520);
  }
  td.addEventListener('click', function () { hide(true); });
  cl.addEventListener('click', function () { hide(false); });
  gf.addEventListener('click', function () { off = false; tt.classList.remove('is-on'); root.classList.remove('is-off'); md.removeAttribute('aria-hidden'); gf.tabIndex = -1; td.focus({ preventScroll: true }); arm(); });
  root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !off) hide(false); if (!off && e.key === 'ArrowRight') go(cur + 1); if (!off && e.key === 'ArrowLeft') go(cur - 1); });
  paint(false); arm();
})();
  })();

  scope.ready();
  return scope.controller;
}
