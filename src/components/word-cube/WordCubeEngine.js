// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountWordCube(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 282,
      responsive: false,
      markup: `
<div class="ux u338">
  <p class="u338-k">What we do</p>
  <div class="u338-main">
    <div class="u338-sc"><div class="u338-cube" aria-live="polite"></div></div>
    <div class="u338-ar">
      <button class="u338-up" type="button" aria-label="Previous word"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg></button>
      <button class="u338-dn" type="button" aria-label="Next word"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
    </div>
  </div>
  <p class="u338-d"></p>
  <div class="u338-ft"><div class="u338-dots" role="group" aria-label="Pick a word"></div><div class="u338-bar" aria-hidden="true"><i></i></div></div>
</div>
`,
      css: `

.u338{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:282px;display:flex;flex-direction:column;padding:22px 20px 18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u338-k{margin:0;font-size:12px;font-weight:750;color:var(--ux-ink-3)}
.u338-main{display:flex;align-items:center;gap:12px;margin-top:22px}
.u338-sc{flex:1;height:72px;perspective:520px}
.u338-cube{position:relative;width:100%;height:72px;transform-style:preserve-3d;transform:translateZ(-36px) rotateX(var(--r,0deg));transition:transform .9s cubic-bezier(.5,-.25,.3,1.3)}
.u338-f{position:absolute;inset:0;display:flex;align-items:center;padding:0 18px;border-radius:16px;background:var(--ux-ink);color:var(--ux-page);font-size:42px;font-weight:880;letter-spacing:-.05em;backface-visibility:hidden;transition:filter .9s}
.u338-f:nth-child(1){transform:rotateX(0deg) translateZ(36px)}
.u338-f:nth-child(2){transform:rotateX(-90deg) translateZ(36px);background:var(--ux-accent);color:var(--ux-accent-ink)}
.u338-f:nth-child(3){transform:rotateX(-180deg) translateZ(36px)}
.u338-f:nth-child(4){transform:rotateX(-270deg) translateZ(36px);background:var(--ux-accent);color:var(--ux-accent-ink)}
.u338-f:not(.on){filter:brightness(.55)}
.u338-ar{display:flex;flex-direction:column;gap:6px}
.u338-up,.u338-dn{width:36px;height:33px;border:0;border-radius:11px;display:grid;place-items:center;background:var(--ux-surface-2);color:var(--ux-ink);transition:transform .35s var(--ux-spring)}
.u338-up:active,.u338-dn:active{transform:scale(.9)}
.u338-ar svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.u338-d{position:relative;height:48px;margin:18px 0 0;overflow:hidden;font-size:16px;line-height:1.5;font-weight:650;color:var(--ux-ink-2)}
.u338-d span{position:absolute;left:0;right:0;top:0;transition:transform .7s var(--ux-spring),opacity .4s}
.u338-d span.out{transform:translateY(-100%);opacity:0}
.u338-d span.in{transform:translateY(100%);opacity:0}
.u338-ft{margin-top:auto;display:flex;align-items:center;gap:10px}
.u338-dots{display:flex;gap:6px}
.u338-dot{width:26px;height:26px;border:0;border-radius:50%;background:transparent;display:grid;place-items:center}
.u338-dot::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--ux-line-2);transition:background-color .3s,transform .4s var(--ux-spring)}
.u338-dot[aria-pressed="true"]::before{background:var(--ux-ink);transform:scale(1.3)}
.u338-bar{flex:1;height:3px;border-radius:3px;background:var(--ux-line);overflow:hidden}
.u338-bar i{display:block;height:100%;width:100%;background:var(--ux-accent);transform-origin:0 50%;transform:scaleX(0)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u338');
  var cube = root.querySelector('.u338-cube'), desc = root.querySelector('.u338-d'), dotsEl = root.querySelector('.u338-dots'), bar = root.querySelector('.u338-bar i');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WORDS = ['Plan', 'Design', 'Build', 'Run'];
  var DESC = ['We break the problem down and set the order', 'We draw screens you want to touch', 'We build it fast and solid', 'We stay with you after launch'];
  var faces = WORDS.map(function (w) { var f = document.createElement('span'); f.className = 'u338-f'; f.textContent = w; cube.appendChild(f); return f; });
  var dots = WORDS.map(function (w, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'u338-dot'; b.setAttribute('aria-label', w); b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () { go(i - idx); });
    dotsEl.appendChild(b);
    return b;
  });
  var idx = 0, turns = 0, hold = false, timer = 0, anim = null;
  // 단어가 바뀔 때마다 상자를 90도씩 더 굴립니다(돌아가지 않고 같은 방향으로 계속 구릅니다)
  function go(step) {
    if (!step) return;
    idx = (idx + step + 4 * 10) % 4;
    turns += step;
    cube.style.setProperty('--r', (turns * 90) + 'deg');
    faces.forEach(function (f, k) { f.classList.toggle('on', k === idx); f.setAttribute('aria-hidden', String(k !== idx)); });
    dots.forEach(function (d, k) { d.setAttribute('aria-pressed', String(k === idx)); });
    var old = desc.querySelector('span:not(.out)'), n = document.createElement('span');
    n.textContent = DESC[idx]; n.className = 'in';
    desc.appendChild(n);
    if (old) { old.className = 'out'; setTimeout(function () { old.remove(); }, 700); }
    requestAnimationFrame(function () { requestAnimationFrame(function () { n.className = ''; }); });
    restart();
  }
  function restart() {
    clearTimeout(timer);
    if (anim) anim.cancel();
    if (rm || !bar.animate) return;
    anim = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 2600, easing: 'linear', fill: 'forwards' });
    if (hold) anim.pause();
    timer = setTimeout(function tick() { if (!root.isConnected) return; if (hold) { timer = setTimeout(tick, 300); return; } go(1); }, 2600);
  }
  root.querySelector('.u338-up').addEventListener('click', function () { go(-1); });
  root.querySelector('.u338-dn').addEventListener('click', function () { go(1); });
  cube.addEventListener('pointerenter', function () { hold = true; if (anim) anim.pause(); });
  cube.addEventListener('pointerleave', function () { hold = false; if (anim) anim.play(); });
  faces[0].classList.add('on');
  dots[0].setAttribute('aria-pressed', 'true');
  var first = document.createElement('span'); first.textContent = DESC[0]; desc.appendChild(first);
  faces.forEach(function (f, k) { if (k) f.setAttribute('aria-hidden', 'true'); });
  restart();
})();
  })();

  scope.ready();
  return scope.controller;
}
