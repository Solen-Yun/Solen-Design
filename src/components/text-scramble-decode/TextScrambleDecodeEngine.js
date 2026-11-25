// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTextScrambleDecode(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 296,
      responsive: false,
      markup: `
<div class="ux u245">
  <p class="u245-k"><i aria-hidden="true"></i>DECODE<b class="u245-st" role="status">Decoded</b></p>
  <h3 class="u245-h"></h3>
  <div class="u245-ft">
    <div class="u245-ps" role="group" aria-label="Pick a line">
      <button class="u245-p" type="button" aria-pressed="true" aria-label="First line">01</button>
      <button class="u245-p" type="button" aria-pressed="false" aria-label="Second line">02</button>
      <button class="u245-p" type="button" aria-pressed="false" aria-label="Third line">03</button>
    </div>
    <div class="u245-sps" role="group" aria-label="Decode speed">
      <button class="u245-sp" type="button" aria-pressed="false">Slow</button>
      <button class="u245-sp" type="button" aria-pressed="true">Normal</button>
      <button class="u245-sp" type="button" aria-pressed="false">Fast</button>
    </div>
  </div>
</div>
`,
      css: `

.u245{--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:296px;display:flex;flex-direction:column;padding:22px 20px 18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u245::before{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 3px,color-mix(in srgb,var(--ux-ink) 3.5%,transparent) 3px 4px)}
.u245-k{position:relative;display:flex;align-items:center;gap:8px;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;color:var(--ux-ink-3)}
.u245-k i{position:relative;flex:none;width:7px;height:7px;border-radius:50%;background:var(--ux-mint);box-shadow:0 0 0 3px color-mix(in srgb,var(--ux-mint) 22%,transparent);transition:background-color .3s,box-shadow .3s}
.u245-k i::after{content:"";position:absolute;inset:-1px;border-radius:50%;border:1.5px solid var(--ux-accent);opacity:0}
.u245.is-run .u245-k i{background:var(--ux-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--ux-accent) 18%,transparent)}
.u245.is-run .u245-k i::after{animation:u245-ping 1s cubic-bezier(.2,.6,.4,1) infinite}
@keyframes u245-ping{0%{transform:scale(1);opacity:.75}100%{transform:scale(2.6);opacity:0}}
@media (prefers-reduced-motion: reduce){.u245.is-run .u245-k i::after{animation:none}}
.u245-k b{margin-left:auto;font-weight:600;color:var(--ux-ink-2)}
.u245-h{position:relative;margin:18px 0 0;min-height:112px;font-size:30px;line-height:1.22;font-weight:820;letter-spacing:-.045em;color:var(--ux-ink);cursor:default}
.u245-w{white-space:nowrap}
.u245-c{position:relative;display:inline-block}
.u245-c b{font-weight:inherit;transition:color .6s var(--ux-ease)}
.u245-c i{position:absolute;left:50%;top:.08em;transform:translateX(-50%);font:600 .82em/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;font-style:normal;color:var(--ux-accent);opacity:0}
.u245-c.s b,.u245-c.z b{visibility:hidden}
.u245-c.s i{opacity:.9}
.u245-c.f b{color:var(--ux-accent);transition:none}
.u245-ft{position:relative;margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:10px}
.u245-ps,.u245-sps{display:flex;gap:4px;padding:4px;border-radius:14px;background:var(--ux-surface-2)}
.u245-p,.u245-sp{height:32px;border:0;border-radius:10px;background:transparent;font-size:12.5px;font-weight:700;color:var(--ux-ink-3);transition:background-color .25s,color .25s,transform .35s var(--ux-spring)}
.u245-p{width:34px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.u245-sp{padding:0 9px}
.u245-p:hover,.u245-sp:hover{color:var(--ux-ink)}
.u245-p:active,.u245-sp:active{transform:scale(.92)}
.u245-p[aria-pressed="true"],.u245-sp[aria-pressed="true"]{background:var(--ux-surface);color:var(--ux-ink);box-shadow:0 0 0 1px var(--ux-line),0 4px 10px -6px var(--ux-shadow-strong)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u245');
  var h = root.querySelector('.u245-h'), st = root.querySelector('.u245-st');
  var ps = Array.prototype.slice.call(root.querySelectorAll('.u245-p'));
  var sps = Array.prototype.slice.call(root.querySelectorAll('.u245-sp'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LINES = ['We read the signal hidden in noise', 'Scattered data becomes a story', 'Complex work, folded into one line'];
  var GLYPH = '!<>-_/[]{}=+~^?#%&@$01';
  var SPEED = [1800, 1100, 640];
  var cur = 0, dur = SPEED[1], raf = 0, cells = [], running = false;
  // 글자마다 최종 글자(자리 잡기용)와 돌아가는 기호를 겹쳐 두어, 해독 중에도 줄바꿈이 흔들리지 않습니다
  function build(text) {
    h.setAttribute('aria-label', text);
    h.textContent = '';
    cells = [];
    text.split(' ').forEach(function (word, wi) {
      if (wi) h.appendChild(document.createTextNode(' '));
      var w = document.createElement('span');
      w.className = 'u245-w';
      w.setAttribute('aria-hidden', 'true');
      Array.from(word).forEach(function (ch) {
        var c = document.createElement('span'), b = document.createElement('b'), g = document.createElement('i');
        c.className = 'u245-c z';
        b.textContent = ch;
        c.appendChild(b); c.appendChild(g); w.appendChild(c);
        cells.push({ el: c, g: g });
      });
      h.appendChild(w);
    });
  }
  function run() {
    cancelAnimationFrame(raf);
    var n = cells.length, t0 = performance.now();
    if (rm) { cells.forEach(function (c) { c.el.className = 'u245-c'; }); st.textContent = 'Decoded'; return; }
    // 시작은 무작위, 확정은 왼쪽부터 차례로 옵니다
    cells.forEach(function (c, i) {
      c.a = Math.random() * dur * 0.3;
      c.r = dur * (0.32 + 0.68 * i / Math.max(1, n - 1)) + Math.random() * 90;
      c.n = 0; c.done = false; c.el.className = 'u245-c z';
    });
    running = true;
    root.classList.add('is-run');
    st.textContent = 'Decoding';
    (function f(now) {
      if (!root.isConnected) return;
      var t = now - t0, left = 0;
      cells.forEach(function (c) {
        if (c.done) return;
        if (t >= c.r) {
          c.done = true; c.el.className = 'u245-c f';
          setTimeout(function () { c.el.classList.remove('f'); }, 40);
          return;
        }
        left += 1;
        if (t >= c.a) {
          if (c.el.classList.contains('z')) c.el.className = 'u245-c s';
          if (now - c.n > 55) { c.n = now; c.g.textContent = GLYPH.charAt(Math.random() * GLYPH.length | 0); }
        }
      });
      if (left) { raf = requestAnimationFrame(f); return; }
      running = false;
      root.classList.remove('is-run');
      st.textContent = 'Decoded';
    })(t0);
  }
  function pick(i) {
    cur = i;
    ps.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
    build(LINES[i]);
    run();
  }
  ps.forEach(function (b, i) { b.addEventListener('click', function () { pick(i); }); });
  sps.forEach(function (b, i) {
    b.addEventListener('click', function () {
      dur = SPEED[i];
      sps.forEach(function (x, k) { x.setAttribute('aria-pressed', String(k === i)); });
    });
  });
  // 제목에 커서를 올리면 같은 문장을 한 번 더 해독합니다
  h.addEventListener('pointerenter', function () { if (!running) run(); });
  build(LINES[0]);
  run();
})();
  })();

  scope.ready();
  return scope.controller;
}
