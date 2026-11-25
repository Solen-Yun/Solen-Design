// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountChapterNumberRoll(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u390">
  <div class="u390-side" aria-hidden="true">
    <span class="u390-lb">CH</span>
    <div class="u390-num"><div class="u390-strip"></div></div>
    <div class="u390-tt"></div>
    <svg class="u390-g" viewBox="0 0 40 40"><circle class="t" cx="20" cy="20" r="16"/><circle class="v" cx="20" cy="20" r="16"/></svg>
  </div>
  <div class="u390-sc" tabindex="0" aria-label="Text, scroll to read"></div>
</div>
`,
      css: `

.u390{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u390-side{flex:none;width:118px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-right:1px solid var(--ux-line);background:var(--ux-surface-2)}
.u390-lb{font:800 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;color:var(--ux-ink-3)}
.u390-num{position:relative;width:96px;height:78px;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 22%,#000 78%,transparent);mask-image:linear-gradient(transparent,#000 22%,#000 78%,transparent)}
.u390-strip{position:absolute;left:0;right:0;top:0;will-change:transform}
.u390-strip span{display:block;height:78px;font:900 70px/78px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:-.06em;text-align:center;color:var(--ux-ink)}
.u390-g{width:40px;height:40px;margin-top:4px}
.u390-g circle{fill:none;stroke-width:4}
.u390-g .t{stroke:var(--ux-line-2)}
.u390-g .v{stroke:var(--ux-accent);stroke-linecap:round;transform:rotate(-90deg);transform-origin:20px 20px}
.u390-tt{position:relative;width:100%;height:20px;overflow:hidden;text-align:center}
.u390-tt span{position:absolute;left:0;right:0;font-size:13px;font-weight:800;transition:transform .45s var(--ux-spring),opacity .3s}
.u390-tt span.out{transform:translateY(-100%);opacity:0}
.u390-tt span.in{transform:translateY(100%);opacity:0}
.u390-sc{flex:1;overflow-y:auto;padding:16px 16px 140px;scrollbar-width:none;outline:none}
.u390-sc::-webkit-scrollbar{display:none}
.u390-sec{padding:6px 0 30px}
.u390-sec b{display:block;font-size:16px;font-weight:850}
.u390-sec p{margin:6px 0 0;font-size:13.5px;line-height:1.75;color:var(--ux-ink-2)}
.u390-sec i{display:block;height:70px;margin-top:10px;border-radius:12px;background:var(--ux-surface-2)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u390');
  var sc = root.querySelector('.u390-sc'), strip = root.querySelector('.u390-strip'), tt = root.querySelector('.u390-tt'), gv = root.querySelector('.u390-g .v');
  var CH = [['Seed', 'Every story began with a tiny question. Why is this button always so confusing?'], ['Watching', 'We spent a week watching how people really use the screen. Their hands paused in unexpected places.'], ['Trying', 'We built twenty different shapes and tested them one by one. Most failed, but two remained.'], ['Refining', 'We blended the two into one and kept trimming until it needed no explanation.']];
  var secs = CH.map(function (c, i) {
    var s = document.createElement('section');
    s.className = 'u390-sec';
    s.innerHTML = '<b></b><p></p><i aria-hidden="true"></i>';
    s.querySelector('b').textContent = String(i + 1).padStart(2, '0') + ' · ' + c[0];
    s.querySelector('p').textContent = c[1];
    sc.appendChild(s);
    var n = document.createElement('span'); n.textContent = String(i + 1).padStart(2, '0'); strip.appendChild(n);
    return s;
  });
  var C = 2 * Math.PI * 16, cur = -1, raf = 0;
  gv.style.strokeDasharray = C;
  function title(i) {
    var old = tt.querySelector('span:not(.out)'), n = document.createElement('span');
    n.textContent = CH[i][0]; n.className = 'in'; tt.appendChild(n);
    if (old) { old.className = 'out'; setTimeout(function () { old.remove(); }, 450); }
    requestAnimationFrame(function () { requestAnimationFrame(function () { n.className = ''; }); });
  }
  // 장 위치를 소수로 계산해(1.4장 = 1장에서 40% 읽음) 숫자 띠를 그만큼 굴립니다
  function draw() {
    raf = 0;
    var y = sc.scrollTop + 20, f = 0;
    secs.forEach(function (s, i) { if (y >= s.offsetTop) f = i + Math.min(1, (y - s.offsetTop) / s.offsetHeight); });
    var i = Math.min(CH.length - 1, Math.floor(f)), inCh = f - i;
    var roll = Math.max(0, Math.min(CH.length - 1, i + Math.max(0, inCh - 0.75) / 0.25));
    strip.style.transform = 'translateY(' + (-78 * roll).toFixed(1) + 'px)';
    gv.style.strokeDashoffset = (C * (1 - Math.min(1, inCh))).toFixed(1);
    if (i !== cur) { cur = i; title(i); }
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
