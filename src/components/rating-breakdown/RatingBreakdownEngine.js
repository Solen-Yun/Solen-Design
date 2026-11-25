// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountRatingBreakdown(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u261">
  <div class="u261-tp"><div class="u261-av"><b>4.6</b><span class="u261-st" aria-hidden="true">★★★★★<i>★★★★★</i></span><small>1,248 reviews</small></div><div class="u261-bs"></div></div>
  <div class="u261-hd"><span class="u261-tt"></span></div>
  <div class="u261-ls" aria-live="polite"></div>
</div>
`,
      css: `

.u261{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u261-tp{position:absolute;left:18px;right:18px;top:18px;display:flex;gap:16px;align-items:center}
.u261-av{flex:none;width:96px;text-align:center}
.u261-av b{display:block;font-size:36px;line-height:1;font-weight:900;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.u261-st{position:relative;display:inline-block;margin-top:5px;font-size:14px;letter-spacing:1px;line-height:1;color:var(--ux-line)}
.u261-st i{position:absolute;left:0;top:0;overflow:hidden;white-space:nowrap;color:#F59E0B;font-style:normal;width:0;transition:width 1s cubic-bezier(.3,.8,.3,1) .2s}
.u261-av small{display:block;margin-top:5px;font-size:10px;font-weight:700;color:var(--ux-ink-3)}
.u261-bs{flex:1;display:flex;flex-direction:column;gap:3px}
.u261-br{display:flex;align-items:center;gap:7px;height:19px;padding:0 6px;margin:0 -6px;border:0;border-radius:7px;background:none;color:var(--ux-ink-2);font:inherit;font-size:10px;font-weight:800;cursor:pointer;transition:opacity .25s,background .2s}
.u261-br:hover,.u261-br.g-hov{background:var(--ux-surface-2)}
.u261-br:focus-visible{outline:2px solid var(--ux-accent);outline-offset:1px}
.u261-br>span:first-child{width:22px;text-align:left;font-variant-numeric:tabular-nums}
.u261-br em{flex:1;height:7px;border-radius:4px;background:var(--ux-surface-3);overflow:hidden}
.u261-br em i{display:block;height:100%;border-radius:4px;background:#F59E0B;transform:scaleX(0);transform-origin:0 50%;transition:transform .8s cubic-bezier(.3,1.1,.4,1)}
.u261-br>span:last-child{width:30px;text-align:right;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u261.is-f .u261-br{opacity:.38}
.u261.is-f .u261-br.is-on{opacity:1;background:var(--ux-surface-2)}
.u261-hd{position:absolute;left:18px;right:18px;top:132px;display:flex;align-items:center;font-size:11.5px;font-weight:850}
.u261-hd span{margin-left:6px;font-size:10px;color:var(--ux-ink-3);font-weight:750}
.u261-ls{position:absolute;left:14px;right:14px;top:156px;bottom:12px;overflow:hidden}
.u261-rv{padding:10px 11px;margin-bottom:7px;border-radius:13px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);animation:u261-in .4s cubic-bezier(.3,1.2,.5,1) backwards}
@keyframes u261-in{from{opacity:0;transform:translateY(10px)}}
.u261-rv header{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:800;color:var(--ux-ink-3)}
.u261-rv header i{font-style:normal;color:#F59E0B;letter-spacing:-.5px}
.u261-rv p{margin:4px 0 0;font-size:11px;line-height:1.4;font-weight:650}
.u261-hp{margin-left:auto;display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px;border:0;border-radius:999px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:9.5px;font-weight:800;cursor:pointer;transition:background .2s,color .2s}
.u261-hp[aria-pressed="true"]{background:var(--ux-ink);color:var(--ux-surface);box-shadow:none}
.u261-hp svg{width:10px;height:10px;transition:transform .35s cubic-bezier(.3,1.8,.5,1)}
.u261-hp[aria-pressed="true"] svg{transform:rotate(-12deg) scale(1.2)}
.u261-hp:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u261-st i,.u261-br em i{transition:none}.u261-rv{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u261');
  var bs = root.querySelector('.u261-bs'), ls = root.querySelector('.u261-ls'), tt = root.querySelector('.u261-tt'), star = root.querySelector('.u261-st i');
  var N = [902, 228, 62, 32, 24], TOTAL = 1248;
  var RV = [[5, 'K.', 'My second order. The color matches the photos exactly.'], [5, 'L.', 'Lighter than expected and very breathable.'], [4, 'P.', 'Runs a little large. Size down one.'], [4, 'C.', 'Fast shipping and neat packaging.'], [3, 'J.', 'Fine, but it wrinkles a bit easily.'], [2, 'H.', 'Shrank slightly after washing.'], [1, 'Y.', 'Arrived with a missing button.']];
  var help = RV.map(function (r, i) { return [12, 8, 21, 3, 5, 9, 14][i]; }), mine = RV.map(function () { return false; });
  var B = N.map(function (n, i) {
    var s = 5 - i, b = document.createElement('button'); b.type = 'button'; b.className = 'u261-br'; b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span></span><em><i></i></em><span></span>';
    b.firstChild.textContent = s + '★'; b.lastChild.textContent = Math.round(n / TOTAL * 100) + '%';
    b.querySelector('i').style.transitionDelay = (0.15 + i * 0.07) + 's';
    b.addEventListener('click', function () { pick(cur === s ? 0 : s); });
    bs.appendChild(b); return b;
  });
  var cur = -1;
  function stars(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
  // 리뷰 목록을 그 별점으로 다시 그립니다
  function pick(s) {
    if (s === cur) return;
    cur = s; root.classList.toggle('is-f', s > 0);
    B.forEach(function (b, i) { var on = 5 - i === s; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    tt.textContent = s ? s + '-star reviews' : 'All reviews';
    ls.innerHTML = '';
    RV.forEach(function (r, i) {
      if (s && r[0] !== s) return;
      var d = document.createElement('article'); d.className = 'u261-rv'; d.style.animationDelay = ls.children.length * 0.06 + 's';
      d.innerHTML = '<header><i aria-label="' + r[0] + '/5">' + stars(r[0]) + '</i><span></span><button type="button" class="u261-hp"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 4.5h1.6v4H1.5zM3.1 8.5h3.8l1.5-3.4-.4-.8H5.6l.4-2.2-.6-.6L3.1 4.5" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg><span></span></button></header><p></p>';
      d.querySelector('header>span').textContent = r[1]; d.querySelector('p').textContent = r[2];
      var hb = d.querySelector('.u261-hp');
      function hs() { hb.setAttribute('aria-pressed', mine[i]); hb.lastChild.textContent = 'Helpful ' + (help[i] + (mine[i] ? 1 : 0)); }
      hb.addEventListener('click', function () { mine[i] = !mine[i]; hs(); });
      hs(); ls.appendChild(d);
    });
  }
  // 처음 보일 때 별과 막대를 채웁니다
  function fill() { star.style.width = (4.6 / 5 * 100) + '%'; B.forEach(function (b, i) { b.querySelector('i').style.transform = 'scaleX(' + (N[i] / N[0]).toFixed(3) + ')'; }); }
  pick(0);
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); requestAnimationFrame(fill); } }); io.observe(root); } else fill();
})();
  })();

  scope.ready();
  return scope.controller;
}
