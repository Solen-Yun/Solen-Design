// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountUnsavedChangesBar(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u250">
  <nav class="u250-nv"><a href="#" aria-current="page">General</a><a href="#">Orders</a><a href="#">Products</a></nav>
  <div class="u250-fm">
    <label>Store name<input class="u250-in" value="Daily Florist" aria-label="Store name" autocomplete="off"></label>
    <div class="u250-rw"><div><b>Low stock alerts</b><small>Notify me when 5 or fewer are left</small></div><button type="button" class="u250-sw" role="switch" aria-checked="false" aria-label="Low stock alerts"></button></div>
    <span class="u250-lb">Brand color</span><div class="u250-cs" role="radiogroup"></div>
  </div>
  <div class="u250-br" role="status"><span class="u250-tx"></span><button type="button" class="u250-cx" tabindex="-1">Discard</button><button type="button" class="u250-sv" tabindex="-1"><i aria-hidden="true"></i><b>Save</b></button></div>
</div>
`,
      css: `

.u250{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u250-nv{position:absolute;left:0;right:0;top:0;display:flex;gap:4px;height:54px;align-items:center;padding:0 16px;border-bottom:1px solid var(--ux-line)}
.u250-nv a{padding:7px 11px;border-radius:9px;color:var(--ux-ink-3);font-size:12px;font-weight:800;text-decoration:none;cursor:pointer}
.u250-nv a[aria-current]{background:var(--ux-surface-2);color:var(--ux-ink)}
.u250-fm{position:absolute;left:18px;right:18px;top:70px}
.u250-fm label,.u250-lb{display:block;font-size:11px;font-weight:800;color:var(--ux-ink-2)}
.u250-in{display:block;width:100%;height:40px;margin-top:6px;padding:0 12px;border:0;border-radius:11px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1.5px var(--ux-line);color:var(--ux-ink);font:inherit;font-size:12.5px;font-weight:700;outline:none;box-sizing:border-box}
.u250-in:focus{box-shadow:inset 0 0 0 2px var(--ux-accent)}
.u250-rw{display:flex;align-items:center;gap:10px;margin-top:16px;padding:12px;border-radius:13px;background:var(--ux-surface-2)}
.u250-rw div{flex:1}
.u250-rw b{display:block;font-size:12px;font-weight:850}
.u250-rw small{display:block;margin-top:1px;font-size:10px;font-weight:650;color:var(--ux-ink-3)}
.u250-sw{position:relative;flex:none;width:40px;height:24px;border:0;border-radius:12px;background:var(--ux-surface-3);cursor:pointer;transition:background .2s}
.u250-sw::after{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .25s cubic-bezier(.3,1.5,.5,1)}
.u250-sw[aria-checked="true"]{background:var(--ux-accent)}
.u250-sw[aria-checked="true"]::after{transform:translateX(16px)}
.u250-lb{margin-top:16px}
.u250-cs{display:flex;gap:8px;margin-top:7px}
.u250-cl{width:30px;height:30px;border:0;border-radius:50%;cursor:pointer;box-shadow:inset 0 0 0 2px rgba(255,255,255,.4);transition:transform .2s cubic-bezier(.3,1.6,.5,1),box-shadow .2s}
.u250-cl[aria-checked="true"]{transform:scale(1.1);box-shadow:0 0 0 2px var(--ux-surface),0 0 0 4px var(--ux-ink)}
.u250 .is-flash{animation:u250-fl .8s ease}
@keyframes u250-fl{25%{box-shadow:0 0 0 3px color-mix(in srgb,#F59E0B 60%,transparent)}}
.u250-br{position:absolute;left:8px;right:8px;top:8px;z-index:3;display:flex;align-items:center;gap:6px;height:44px;padding:0 6px 0 14px;border-radius:14px;background:var(--ux-ink);color:var(--ux-surface);font-size:11.5px;font-weight:800;transform:translateY(-140%);transition:transform .45s cubic-bezier(.3,1.3,.5,1),background .3s}
.u250.is-dirty .u250-br{transform:none}
.u250-br.is-warn{animation:u250-sh .45s;background:#BE123C}
@keyframes u250-sh{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.u250-br.is-ok{background:#059669}
.u250-br span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u250-br button{height:32px;padding:0 12px;border:0;border-radius:9px;font:inherit;font-size:11.5px;font-weight:850;cursor:pointer}
.u250-cx{background:color-mix(in srgb,var(--ux-surface) 14%,transparent);color:var(--ux-surface)}
.u250-sv{position:relative;min-width:52px;background:var(--ux-surface);color:var(--ux-ink)}
.u250-sv i{display:none;width:13px;height:13px;margin:0 auto;border-radius:50%;border:2px solid color-mix(in srgb,var(--ux-ink) 25%,transparent);border-top-color:var(--ux-ink);animation:u250-sp .7s linear infinite}
.u250-sv.is-busy i{display:block}
.u250-sv.is-busy b{display:none}
.u250-br.is-ok button{visibility:hidden}
@keyframes u250-sp{to{transform:rotate(360deg)}}
.u250 button:focus-visible,.u250 a:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u250-br,.u250-sw::after,.u250-cl{transition:none}.u250-br.is-warn,.u250 .is-flash{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u250');
  var inp = root.querySelector('.u250-in'), sw = root.querySelector('.u250-sw'), cs = root.querySelector('.u250-cs'), br = root.querySelector('.u250-br'), tx = root.querySelector('.u250-tx'), cx = root.querySelector('.u250-cx'), sv = root.querySelector('.u250-sv');
  var COL = ['#E11D48', '#F59E0B', '#10B981', '#6366F1'];
  var C = COL.map(function (c, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u250-cl'; b.setAttribute('role', 'radio'); b.style.background = c; b.setAttribute('aria-label', c + ' color'); b.addEventListener('click', function () { now.color = i; paint(); diff(); }); cs.appendChild(b); return b; });
  // 저장된 값과 지금 값을 비교해 바뀐 개수를 셉니다
  var saved = { name: inp.value, alert: false, color: 0 }, now = { name: inp.value, alert: false, color: 0 };
  function paint() { inp.value = now.name; sw.setAttribute('aria-checked', now.alert); C.forEach(function (b, i) { b.setAttribute('aria-checked', i === now.color); }); }
  function changed() { return ['name', 'alert', 'color'].filter(function (k) { return now[k] !== saved[k]; }); }
  function diff() {
    var n = changed().length;
    br.classList.remove('is-ok', 'is-warn');
    tx.textContent = 'Unsaved changes: ' + n + '';
    root.classList.toggle('is-dirty', n > 0); cx.tabIndex = sv.tabIndex = n ? 0 : -1;
  }
  inp.addEventListener('input', function () { now.name = inp.value; diff(); });
  sw.addEventListener('click', function () { now.alert = !now.alert; paint(); diff(); });
  // 저장하지 않고 떠나려 하면 바를 흔들어 붙잡습니다
  Array.prototype.forEach.call(root.querySelectorAll('.u250-nv a'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!changed().length) return;
      tx.textContent = 'Save or discard first';
      br.classList.remove('is-warn'); void br.offsetWidth; br.classList.add('is-warn');
      setTimeout(function () { if (br.classList.contains('is-warn')) diff(); }, 1600);
      sv.focus({ preventScroll: true });
    });
  });
  cx.addEventListener('click', function () {
    var ch = changed(); now = { name: saved.name, alert: saved.alert, color: saved.color }; paint();
    ch.forEach(function (k) { var el = k === 'name' ? inp : k === 'alert' ? sw : C[now.color]; el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash'); });
    diff();
  });
  sv.addEventListener('click', function () {
    if (sv.classList.contains('is-busy')) return;
    sv.classList.add('is-busy');
    setTimeout(function () {
      sv.classList.remove('is-busy'); saved = { name: now.name, alert: now.alert, color: now.color };
      br.classList.remove('is-warn'); br.classList.add('is-ok'); tx.textContent = 'Saved';
      setTimeout(function () { root.classList.remove('is-dirty'); cx.tabIndex = sv.tabIndex = -1; }, 900);
    }, 750);
  });
  paint(); diff();
})();
  })();

  scope.ready();
  return scope.controller;
}
