// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountReadingFocus(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u368 is-f">
  <div class="u368-hd"><span>Reading mode · <span class="u368-n" aria-hidden="true"><i></i></span><span class="u368-n2"> / 5</span></span><button class="u368-off" type="button" aria-pressed="false">Focus off</button></div>
  <p class="u368-p" tabindex="0" aria-label="Paragraph, use the up and down arrows to move between sentences"><span class="u368-bar" aria-hidden="true"></span></p>
</div>
`,
      css: `

.u368{--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;display:flex;flex-direction:column;padding:18px 18px 16px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u368-hd{display:flex;align-items:center;justify-content:space-between}
.u368-hd span{font-size:12px;font-weight:750;color:var(--ux-ink-3)}
.u368-n{display:inline-flex;height:16px;overflow:hidden;font:700 12px/16px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ux-ink)}
.u368-n i{display:block;font-style:normal;transition:transform .5s var(--ux-spring)}
.u368-off{height:30px;padding:0 11px;border:0;border-radius:999px;background:var(--ux-surface-2);font-size:12px;font-weight:700;color:var(--ux-ink-2)}
.u368-p{position:relative;margin:12px 0 0;padding-left:16px;font-size:16.5px;line-height:1.66;font-weight:620;letter-spacing:-.02em;color:var(--ux-ink);outline:none;border-radius:8px}
.u368-p:focus-visible{box-shadow:0 0 0 2px var(--ux-accent)}
.u368-s{transition:opacity .45s var(--ux-ease),filter .45s var(--ux-ease),color .45s}
.u368.is-f .u368-s{opacity:.25;filter:blur(1.2px)}
.u368.is-f .u368-s.on{opacity:1;filter:none}
.u368-bar{position:absolute;left:0;top:0;width:4px;height:0;border-radius:4px;background:var(--ux-accent);opacity:0;transition:transform .55s var(--ux-spring),height .55s var(--ux-spring),opacity .3s}
.u368.is-f .u368-bar{opacity:1}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u368');
  var p = root.querySelector('.u368-p'), bar = root.querySelector('.u368-bar'), nEl = root.querySelector('.u368-n i'), off = root.querySelector('.u368-off');
  var SENT = ['When reading long text, the eye loses its way more often than you think.', 'Keeping just one sentence sharp makes it clear where to read next.', 'Blurring the rest is not about hiding it but about showing the order.', 'The focus follows your hand smoothly.', 'Once you are done, you can see the whole thing again at any time.'];
  var cur = 0, focusOn = true;
  nEl.innerHTML = SENT.map(function (_, i) { return '<b style="display:block;font-weight:inherit">' + (i + 1) + '</b>'; }).join('');
  var spans = SENT.map(function (s, i) {
    if (i) p.appendChild(document.createTextNode(' '));
    var e = document.createElement('span');
    e.className = 'u368-s'; e.textContent = s;
    e.addEventListener('pointerenter', function () { set(i); });
    p.appendChild(e);
    return e;
  });
  // 문장이 여러 줄에 걸쳐도 첫 줄 위부터 마지막 줄 아래까지를 막대 길이로 씁니다(배율을 되돌려 계산)
  function place() {
    var s = spans[cur], rects = s.getClientRects(), pr = p.getBoundingClientRect(), k = p.offsetHeight / (pr.height || 1);
    if (!rects.length) return;
    var top = (rects[0].top - pr.top) * k, bottom = (rects[rects.length - 1].bottom - pr.top) * k;
    bar.style.transform = 'translateY(' + (top + 3).toFixed(1) + 'px)';
    bar.style.height = Math.max(8, bottom - top - 6).toFixed(1) + 'px';
  }
  function set(i) {
    cur = Math.max(0, Math.min(SENT.length - 1, i));
    spans.forEach(function (s, k) { s.classList.toggle('on', k === cur); });
    nEl.style.transform = 'translateY(' + (-16 * cur) + 'px)';
    place();
  }
  p.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    set(cur + d);
  });
  off.addEventListener('click', function () {
    focusOn = !focusOn;
    root.classList.toggle('is-f', focusOn);
    off.textContent = focusOn ? 'Focus off' : 'Focus on';
    off.setAttribute('aria-pressed', String(!focusOn));
  });
  requestAnimationFrame(function () { set(0); });
})();
  })();

  scope.ready();
  return scope.controller;
}
