// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTextOnWavePath(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 320,
      responsive: false,
      markup: `
<div class="ux u382">
  <div class="u382-sea"><svg viewBox="0 0 340 150" aria-hidden="true"><path class="u382-fill"/><path class="u382-ln"/><text class="u382-tx"><textPath></textPath></text></svg></div>
  <input class="u382-in" type="text" maxlength="36" value="drifting along slowly today" aria-label="Text on the wave">
  <div class="u382-ctl"><span>Height</span><input class="u382-h" type="range" min="0" max="40" value="20" aria-label="Wave height"><span>Speed</span><input class="u382-s" type="range" min="0" max="120" value="40" aria-label="Flow speed"></div>
</div>
`,
      css: `

.u382{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:320px;display:flex;flex-direction:column;padding:16px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u382-sea{position:relative;height:150px;margin:0 -16px;background:linear-gradient(180deg,transparent 40%,color-mix(in srgb,var(--ux-accent-2) 10%,transparent))}
.u382-sea svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.u382-ln{fill:none;stroke:color-mix(in srgb,var(--ux-accent-2) 45%,transparent);stroke-width:1.5;stroke-dasharray:3 5}
.u382-fill{fill:color-mix(in srgb,var(--ux-accent-2) 9%,transparent)}
.u382-tx{font-size:21px;font-weight:850;letter-spacing:-.01em;fill:var(--ux-ink)}
.u382-in{width:100%;height:42px;margin-top:6px;padding:0 14px;border:0;border-radius:13px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:14.5px;font-weight:650;color:var(--ux-ink);outline:none}
.u382-in:focus{box-shadow:inset 0 0 0 2px var(--ux-accent)}
.u382-ctl{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:8px 12px;margin-top:12px;font-size:12px;font-weight:700;color:var(--ux-ink-3)}
.u382-ctl input{width:100%;margin:0;accent-color:var(--ux-accent-2)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u382');
  var ln = root.querySelector('.u382-ln'), fill = root.querySelector('.u382-fill'), tp = root.querySelector('textPath'), tx = root.querySelector('.u382-tx');
  var input = root.querySelector('.u382-in'), hR = root.querySelector('.u382-h'), sR = root.querySelector('.u382-s');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pid = 'u382-p' + Math.random().toString(36).slice(2, 7);
  ln.id = pid;
  tp.setAttribute('href', '#' + pid);
  var amp = 20, ampNow = 20, speed = 40, phase = 0, off = 0, unit = 0, last = 0;
  function setText() {
    var s = (input.value.trim() || ' ') + '  ·  ';
    tp.textContent = s + s + s + s;
    unit = 0;
  }
  // 곡선을 매 프레임 새로 그립니다. 높이는 슬라이더 값으로 부드럽게 따라갑니다
  function draw(now) {
    if (!root.isConnected) return;
    var dt = Math.max(0, Math.min(50, now - (last || now))) / 1000;
    last = now;
    ampNow += (amp - ampNow) * 0.08;
    phase += dt * 1.6;
    var d = '', pts = [];
    for (var i = 0; i <= 60; i++) {
      var x = -60 + i * 8, y = 78 + ampNow * Math.sin(x / 52 + phase) + ampNow * 0.25 * Math.sin(x / 23 - phase * 1.4);
      pts.push(x.toFixed(1) + ' ' + y.toFixed(1));
    }
    d = 'M' + pts.join(' L');
    ln.setAttribute('d', d);
    fill.setAttribute('d', d + ' L420 150 L-60 150 Z');
    if (!unit) { try { unit = tx.getComputedTextLength() / 4; } catch (e) { unit = 300; } }
    off = (off + dt * speed) % (unit || 300);
    tp.setAttribute('startOffset', (-off).toFixed(1));
    if (!rm) requestAnimationFrame(draw);
  }
  input.addEventListener('input', setText);
  hR.addEventListener('input', function () { amp = +hR.value; if (rm) { ampNow = amp; draw(performance.now()); } });
  sR.addEventListener('input', function () { speed = +sR.value; });
  setText();
  requestAnimationFrame(draw);
})();
  })();

  scope.ready();
  return scope.controller;
}
