// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountKeyholeZoom(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u340">
  <div class="u340-sc" tabindex="0" aria-label="Exhibition intro, scroll to enter">
    <div class="u340-run"><div class="u340-st">
      <span class="u340-moon" aria-hidden="true"></span><span class="u340-hill" aria-hidden="true"></span>
      <div class="u340-tt"><b>The night beyond the door</b><span>Winter exhibition 2026</span></div>
      <svg class="u340-door" viewBox="0 0 340 330" aria-hidden="true"><path class="u340-wood" fill-rule="evenodd"/></svg>
      <span class="u340-hint" aria-hidden="true">Scroll down to peek inside</span>
    </div></div>
  </div>
</div>
`,
      css: `

.u340{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:28px;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u340-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u340-sc::-webkit-scrollbar{display:none}
.u340-run{height:1000px}
.u340-st{position:sticky;top:0;height:330px;overflow:hidden;background:radial-gradient(80% 60% at 50% 100%,#3B2C7A,#0B0B24 70%)}
.u340-moon{position:absolute;right:70px;top:60px;width:46px;height:46px;border-radius:50%;background:#FFF3C4;box-shadow:0 0 30px #FFE58A}
.u340-star{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff;animation:u340-tw 2s ease-in-out infinite alternate}
@keyframes u340-tw{from{opacity:.25}to{opacity:1}}
.u340-hill{position:absolute;left:-20px;right:-20px;bottom:-40px;height:120px;border-radius:50% 50% 0 0;background:#151135}
.u340-tt{position:absolute;left:0;right:0;top:120px;text-align:center;color:#fff;opacity:var(--o,0);transform:translateY(calc((1 - var(--o,0)) * 20px))}
.u340-tt b{display:block;font-size:30px;font-weight:880;letter-spacing:-.04em}
.u340-tt span{font-size:12.5px;font-weight:700;opacity:.75}
.u340-door{position:absolute;inset:0;width:100%;height:100%;filter:blur(var(--bl,0px));opacity:var(--do,1)}
.u340-wood{fill:#8C5A3C}
.u340-hint{position:absolute;left:0;right:0;bottom:18px;text-align:center;font-size:12px;font-weight:800;color:#FFE8CC;opacity:var(--ho,1)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u340');
  var sc = root.querySelector('.u340-sc'), st = root.querySelector('.u340-st'), wood = root.querySelector('.u340-wood');
  for (var i = 0; i < 26; i++) {
    var s = document.createElement('span');
    s.className = 'u340-star'; s.setAttribute('aria-hidden', 'true');
    s.style.left = (Math.random() * 100).toFixed(1) + '%'; s.style.top = (Math.random() * 60).toFixed(1) + '%';
    s.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
    st.insertBefore(s, st.firstChild);
  }
  // 열쇠구멍(원 + 아래로 벌어진 사다리꼴)을 문 판 위에 구멍으로 뚫고, 스크롤만큼 키웁니다
  function hole(k) {
    var cx = 170, cy = 140, r = 22 * k, w1 = 9 * k, w2 = 20 * k, h = 52 * k;
    var c = 'M' + (cx + r) + ' ' + cy + 'A' + r + ' ' + r + ' 0 1 0 ' + (cx - r) + ' ' + cy + 'A' + r + ' ' + r + ' 0 1 0 ' + (cx + r) + ' ' + cy + 'Z';
    var t = 'M' + (cx - w1) + ' ' + (cy + r * 0.6) + 'L' + (cx - w2) + ' ' + (cy + r * 0.6 + h) + 'L' + (cx + w2) + ' ' + (cy + r * 0.6 + h) + 'L' + (cx + w1) + ' ' + (cy + r * 0.6) + 'Z';
    return 'M-400 -400H740V730H-400Z' + c + t;
  }
  var raf = 0;
  function draw() {
    raf = 0;
    var max = sc.scrollHeight - sc.clientHeight, p = max ? Math.min(1, sc.scrollTop / max) : 0, e = p * p;
    wood.setAttribute('d', hole(1 + e * 24));
    st.style.setProperty('--bl', (p * 6).toFixed(1) + 'px');
    st.style.setProperty('--do', (1 - Math.max(0, p - 0.7) / 0.3).toFixed(2));
    st.style.setProperty('--o', Math.max(0, (p - 0.65) / 0.35).toFixed(2));
    st.style.setProperty('--ho', Math.max(0, 1 - p * 5).toFixed(2));
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
