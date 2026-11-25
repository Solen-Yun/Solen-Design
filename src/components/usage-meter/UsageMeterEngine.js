// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountUsageMeter(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u299">
  <div class="u299-wn" role="status"><i aria-hidden="true">!</i><span class="u299-wt"></span></div>
  <div class="u299-hd"><div><b>Usage this month</b><small>Pro plan · resets Nov 1</small></div><button type="button" class="u299-fc" role="switch" aria-checked="false">Forecast<i aria-hidden="true"></i></button></div>
  <div class="u299-ls"></div>
  <button type="button" class="u299-up" tabindex="-1">Upgrade</button>
</div>
`,
      css: `

.u299{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u299-wn{position:absolute;left:10px;right:10px;top:10px;z-index:2;display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:13px;background:color-mix(in srgb,#F59E0B 16%,var(--ux-surface));box-shadow:inset 0 0 0 1px color-mix(in srgb,#F59E0B 40%,transparent);color:#92400E;font-size:10.5px;font-weight:800;transform:translateY(-150%);transition:transform .45s cubic-bezier(.3,1.3,.5,1)}
.u299.is-warn .u299-wn{transform:none}
.u299-wn i{flex:none;width:16px;height:16px;border-radius:50%;background:#F59E0B;color:#fff;font-style:normal;font-size:10px;font-weight:900;display:grid;place-items:center}
.u299-hd{position:absolute;left:20px;right:16px;top:22px;display:flex;align-items:flex-start;transition:transform .45s cubic-bezier(.3,1.3,.5,1)}
.u299.is-warn .u299-hd{transform:translateY(36px)}
.u299-hd div{margin-right:auto}
.u299-hd b{display:block;font-size:16px;font-weight:900;letter-spacing:-.03em}
.u299-hd small{display:block;margin-top:2px;font-size:10px;font-weight:700;color:var(--ux-ink-3)}
.u299-fc{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 4px 0 10px;border:0;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:10.5px;font-weight:800;cursor:pointer}
.u299-fc i{position:relative;width:28px;height:18px;border-radius:9px;background:var(--ux-surface-3);transition:background .2s}
.u299-fc i::after{content:"";position:absolute;left:2px;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .25s cubic-bezier(.3,1.5,.5,1)}
.u299-fc[aria-checked="true"] i{background:var(--ux-accent)}
.u299-fc[aria-checked="true"] i::after{transform:translateX(10px)}
.u299-ls{position:absolute;left:20px;right:20px;top:84px;transition:transform .45s cubic-bezier(.3,1.3,.5,1)}
.u299.is-warn .u299-ls{transform:translateY(26px)}
.u299-rw{position:relative;padding:10px 0 12px}
.u299-rw+.u299-rw{border-top:1px solid var(--ux-line)}
.u299-tp{display:flex;align-items:baseline;justify-content:space-between;font-size:11.5px;font-weight:850}
.u299-tp span{font-size:10.5px;font-weight:750;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u299-tp span b{color:var(--ux-ink);font-weight:900}
.u299-tr{position:relative;height:10px;margin-top:8px;border-radius:5px;background:var(--ux-surface-3)}
.u299-fl{position:absolute;left:0;top:0;bottom:0;border-radius:5px;background:var(--ux-accent);transition:width .6s cubic-bezier(.3,1,.4,1),background .4s}
.u299-fl.is-hi{background:#F59E0B}
.u299-fl.is-max{background:#E11D48}
.u299-fx{position:absolute;top:0;bottom:0;border-radius:0 5px 5px 0;background:repeating-linear-gradient(90deg,var(--c) 0 4px,transparent 4px 7px);opacity:.55;transform:scaleX(0);transform-origin:0 50%;transition:transform .7s cubic-bezier(.3,1,.4,1)}
.u299.is-fc .u299-fx{transform:none}
.u299-lm{position:absolute;right:0;top:-3px;width:2px;height:16px;border-radius:1px;background:var(--ux-ink-2)}
.u299-ov{display:block;height:0;overflow:hidden;font-size:9.5px;font-weight:850;color:#E11D48;transition:height .3s,margin .3s}
.u299.is-fc .u299-ov.is-on{height:14px;margin-top:5px}
.u299-tt{position:absolute;top:-22px;padding:3px 7px;border-radius:7px;background:var(--ux-ink);color:var(--ux-surface);font-size:9.5px;font-weight:800;white-space:nowrap;transform:translateX(-50%);opacity:0;pointer-events:none;transition:opacity .15s;font-variant-numeric:tabular-nums}
.u299-rw:hover .u299-tt,.u299-rw.g-hov .u299-tt{opacity:1}
.u299-up{position:absolute;left:20px;right:20px;bottom:16px;height:40px;border:0;border-radius:12px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:12px;font-weight:850;cursor:pointer;opacity:0;transform:translateY(10px);transition:opacity .3s,transform .4s cubic-bezier(.3,1.4,.5,1);pointer-events:none}
.u299.is-warn .u299-up{opacity:1;transform:none;pointer-events:auto}
.u299 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u299-wn,.u299-hd,.u299-ls,.u299-fl,.u299-fx,.u299-ov,.u299-up{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u299');
  var ls = root.querySelector('.u299-ls'), fc = root.querySelector('.u299-fc'), up = root.querySelector('.u299-up'), wt = root.querySelector('.u299-wt');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [이름, 한도, 지금 값, 하루 평균 증가, 단위]
  var R = [['API calls', 100000, 76300, 1900, ''], ['Storage', 50, 22.4, 0.3, 'GB'], ['Seats', 10, 7, 0, '']];
  var TODAY = 18, END = 31;
  var OV = ['Over limit by Oct ', ''];
  wt.textContent = 'You’re close to your limit · upgrade for more instantly';
  function fmt(v, r) { return (r[1] >= 1000 ? Math.round(v).toLocaleString('en-US') : (Math.round(v * 10) / 10)) + r[4]; }
  var rows = R.map(function (r) {
    var d = document.createElement('div'); d.className = 'u299-rw';
    d.innerHTML = '<div class="u299-tp"><span class="u299-nm"></span><span><b></b> / <i style="font-style:normal"></i></span></div><div class="u299-tr"><span class="u299-fl"></span><span class="u299-fx"></span><span class="u299-lm" aria-hidden="true"></span><span class="u299-tt"></span></div><em class="u299-ov" style="font-style:normal"></em>';
    d.querySelector('.u299-nm').textContent = r[0]; d.querySelector('i').textContent = fmt(r[1], r);
    var tr = d.querySelector('.u299-tr'); tr.setAttribute('role', 'progressbar'); tr.setAttribute('aria-label', r[0]); tr.setAttribute('aria-valuemin', 0); tr.setAttribute('aria-valuemax', r[1]);
    ls.appendChild(d);
    return { r: r, v: r[2], d: d, fl: d.querySelector('.u299-fl'), fx: d.querySelector('.u299-fx'), b: d.querySelector('b'), tt: d.querySelector('.u299-tt'), ov: d.querySelector('.u299-ov'), tr: tr };
  });
  function draw() {
    var warn = false;
    rows.forEach(function (o) {
      var r = o.r, p = Math.min(1, o.v / r[1]);
      o.fl.style.width = (p * 100).toFixed(2) + '%'; o.fl.classList.toggle('is-hi', p >= .8 && p < 1); o.fl.classList.toggle('is-max', p >= 1);
      o.b.textContent = fmt(o.v, r); o.tr.setAttribute('aria-valuenow', Math.round(o.v));
      o.tt.textContent = fmt(o.v, r) + ' of ' + Math.round(p * 100) + '%'; o.tt.style.left = (p * 100) + '%';
      // 이달 말 예상치: 지금 값 + 남은 날 × 하루 평균
      var proj = o.v + (END - TODAY) * r[3], pp = Math.min(1, proj / r[1]);
      o.fx.style.left = (p * 100) + '%'; o.fx.style.width = Math.max(0, (pp - p) * 100) + '%'; o.fx.style.setProperty('--c', proj > r[1] ? '#E11D48' : 'var(--ux-accent)');
      var over = proj > r[1] && r[3] > 0, day = over ? TODAY + Math.ceil((r[1] - o.v) / r[3]) : 0;
      o.ov.classList.toggle('is-on', over); o.ov.textContent = over ? OV[0] + day + OV[1] : '';
      if (p >= .8) warn = true;
    });
    root.classList.toggle('is-warn', warn); up.tabIndex = warn ? 0 : -1;
  }
  fc.addEventListener('click', function () { var on = fc.getAttribute('aria-checked') !== 'true'; fc.setAttribute('aria-checked', on); root.classList.toggle('is-fc', on); });
  // API 호출은 계속 늘어납니다 (실시간처럼)
  (function tick() {
    if (!root.isConnected) return;
    var o = rows[0]; if (o.v < 84000 && !rm) { o.v += 300 + Math.random() * 500; draw(); }
    setTimeout(tick, 450);
  })();
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
