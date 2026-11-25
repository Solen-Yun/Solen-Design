// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountWordFillParagraph(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u260">
  <div class="u260-sc" tabindex="0" aria-label="Intro text, scroll to read">
    <div class="u260-run"><div class="u260-pin"><p class="u260-k">Why we work</p><p class="u260-p"></p><button class="u260-nx" type="button">Next story →</button><span class="u260-pg" aria-hidden="true"><i></i></span></div></div>
  </div>
</div>
`,
      css: `

.u260{--ux-page:light-dark(#FFFFFF,#0B0C12);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u260-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u260-sc::-webkit-scrollbar{display:none}
.u260-run{height:900px}
.u260-pin{position:sticky;top:0;height:330px;display:flex;flex-direction:column;padding:22px 22px 18px}
.u260-k{margin:0;font-size:12px;font-weight:750;color:var(--ux-ink-3)}
.u260-p{margin:10px 0 0;font-size:23px;line-height:1.38;font-weight:820;letter-spacing:-.04em}
.u260-w{color:color-mix(in oklab,var(--ux-ink) calc(var(--f,0) * 100%),var(--ux-line-2));transition:color .15s}
.u260-w.em{color:color-mix(in oklab,var(--ux-accent) calc(var(--f,0) * 100%),var(--ux-line-2))}
.u260-w.em.on{text-shadow:0 0 18px color-mix(in srgb,var(--ux-accent) 45%,transparent)}
.u260-nx{margin-top:auto;align-self:flex-start;height:38px;padding:0 16px;border:0;border-radius:999px;background:var(--ux-ink);color:var(--ux-page);font-size:13px;font-weight:750;opacity:0;transform:translateY(12px);transition:opacity .35s,transform .5s var(--ux-spring);pointer-events:none}
.u260.is-done .u260-nx{opacity:1;transform:none;pointer-events:auto}
.u260-pg{position:absolute;right:14px;top:24px;width:3px;height:90px;border-radius:3px;background:var(--ux-line)}
.u260-pg i{display:block;width:100%;height:100%;border-radius:3px;background:var(--ux-ink);transform-origin:50% 0;transform:scaleY(0)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u260');
  var sc = root.querySelector('.u260-sc'), p = root.querySelector('.u260-p'), pg = root.querySelector('.u260-pg i');
  var TEXT = 'We spend our days making *complex things* simple. Because we believe one button, one sentence can *save someone’s afternoon*.';
  // *로 감싼 구절은 강조 단어입니다
  var words = [];
  TEXT.split('*').forEach(function (chunk, ci) {
    chunk.split(' ').forEach(function (w) {
      if (!w) return;
      if (words.length) p.appendChild(document.createTextNode(' '));
      var s = document.createElement('span');
      s.className = 'u260-w' + (ci % 2 ? ' em' : '');
      s.textContent = w;
      p.appendChild(s);
      words.push(s);
    });
  });
  var raf = 0;
  function draw() {
    raf = 0;
    var max = sc.scrollHeight - sc.clientHeight, t = max ? sc.scrollTop / max : 0, f = t * 1.15 * words.length;
    words.forEach(function (w, i) {
      var v = Math.max(0, Math.min(1, f - i));
      w.style.setProperty('--f', v.toFixed(2));
      w.classList.toggle('on', v >= 1);
    });
    pg.style.transform = 'scaleY(' + Math.min(1, t * 1.15).toFixed(3) + ')';
    root.classList.toggle('is-done', t * 1.15 >= 1);
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
