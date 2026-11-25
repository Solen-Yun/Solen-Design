// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountLineMaskReveal(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u237">
  <p class="u237-k"><span>SS26 · CAMPAIGN</span><span>LOOKBOOK</span></p>
  <h3 class="u237-h"><svg class="u237-u" viewBox="0 0 210 22" aria-hidden="true"><path d="M3 14c30-8 62-9 96-5s70 6 108-4"/></svg></h3>
  <div class="u237-ft">
    <span class="u237-ct"><b>01</b> / 03</span>
    <button class="u237-re" type="button">Replay</button>
    <button class="u237-pv" type="button" aria-label="Previous copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
    <button class="u237-nx" type="button" aria-label="Next copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
</div>
`,
      css: `

.u237{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;flex-direction:column;padding:22px 22px 18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u237-k{margin:0;display:flex;justify-content:space-between;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;color:var(--ux-ink-3)}
.u237-h{position:relative;margin:22px 0 0;height:178px}
.u237-cp{position:absolute;left:0;top:0;right:0}
.u237-ln{display:block;overflow:hidden;padding:0 0 .06em;font-size:44px;line-height:1.04;font-weight:860;letter-spacing:-.055em}
.u237-ln:nth-child(3) .u237-in{color:var(--ux-accent)}
.u237-in{display:inline-block;transform:translateY(108%) rotate(4deg);transform-origin:0 100%}
.u237-cp.is-in .u237-in{transform:none;transition:transform .9s cubic-bezier(.2,.9,.2,1) calc(var(--i) * 95ms)}
.u237-cp.is-out .u237-in{transform:translateY(-108%) rotate(-2deg);transition:transform .55s cubic-bezier(.6,0,.4,1) calc(var(--i) * 55ms)}
.u237-u{position:absolute;left:-4px;top:150px;width:210px;height:22px;overflow:visible;fill:none;stroke:var(--ux-accent);stroke-width:4;stroke-linecap:round;stroke-dasharray:240;stroke-dashoffset:240;transition:stroke-dashoffset .2s ease}
.u237.is-drawn .u237-u{stroke-dashoffset:0;transition:stroke-dashoffset .7s cubic-bezier(.6,0,.2,1)}
.u237-ft{margin-top:auto;display:flex;align-items:center;gap:8px}
.u237-ct{flex:1;font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u237-ct b{color:var(--ux-ink)}
.u237-re{height:38px;padding:0 14px;border:0;border-radius:999px;background:var(--ux-surface-2);font-size:13px;font-weight:700;color:var(--ux-ink-2);transition:transform .35s var(--ux-spring)}
.u237-pv,.u237-nx{width:38px;height:38px;border:0;border-radius:50%;display:grid;place-items:center;background:var(--ux-ink);color:var(--ux-page);transition:transform .35s var(--ux-spring)}
.u237-pv{background:var(--ux-surface-2);color:var(--ux-ink)}
.u237-re:active,.u237-pv:active,.u237-nx:active{transform:scale(.9)}
.u237-ft svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u237');
  var h = root.querySelector('.u237-h'), ct = root.querySelector('.u237-ct b');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COPY = [['Dress light,', 'walk', 'further'], ['A room where', 'the light', 'lingers'], ['Start small,', 'make things', 'that last']];
  var cur = -1, t1 = 0;
  var blocks = COPY.map(function (lines) {
    var b = document.createElement('span');
    b.className = 'u237-cp';
    b.setAttribute('aria-hidden', 'true');
    lines.forEach(function (txt, i) {
      var ln = document.createElement('span'), inn = document.createElement('span');
      ln.className = 'u237-ln'; inn.className = 'u237-in'; inn.textContent = txt; inn.style.setProperty('--i', i);
      ln.appendChild(inn); b.appendChild(ln);
    });
    h.insertBefore(b, h.firstChild);
    return b;
  });
  // 밑줄은 마지막 줄 길이에 맞춰 늘입니다
  function underline(i) {
    var last = blocks[i].querySelectorAll('.u237-in')[2];
    root.querySelector('.u237-u').style.width = Math.max(80, last.offsetWidth + 10) + 'px';
  }
  function show(i, replay) {
    clearTimeout(t1);
    root.classList.remove('is-drawn');
    var prev = cur;
    cur = i;
    ct.textContent = String(i + 1).padStart(2, '0');
    h.setAttribute('aria-label', COPY[i].join(' '));
    blocks.forEach(function (b, k) {
      if (k === prev && (k !== i || replay)) { b.classList.remove('is-in'); b.classList.add('is-out'); }
      else if (k !== i) b.classList.remove('is-in', 'is-out');
    });
    var b = blocks[i];
    var enter = function () {
      if (!root.isConnected) return;
      b.classList.remove('is-out');
      // 아래 자리로 순간 이동한 다음 다음 프레임에 올라오게 합니다
      b.style.visibility = 'hidden';
      void b.offsetWidth;
      b.style.visibility = '';
      b.classList.add('is-in');
      underline(i);
      t1 = setTimeout(function () { if (root.isConnected) root.classList.add('is-drawn'); }, rm ? 0 : 950);
    };
    if (replay && !rm) setTimeout(enter, 520); else enter();
  }
  root.querySelector('.u237-nx').addEventListener('click', function () { show((cur + 1) % COPY.length); });
  root.querySelector('.u237-pv').addEventListener('click', function () { show((cur + COPY.length - 1) % COPY.length); });
  root.querySelector('.u237-re').addEventListener('click', function () { show(cur, true); });
  requestAnimationFrame(function () { show(0); });
})();
  })();

  scope.ready();
  return scope.controller;
}
