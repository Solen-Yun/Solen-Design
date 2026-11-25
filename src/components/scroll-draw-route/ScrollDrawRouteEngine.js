// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountScrollDrawRoute(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u318">
  <div class="u318-sc" tabindex="0" aria-label="Travel route, scroll to follow">
    <div class="u318-hd"><b>Autumn Asia loop</b><span>5 cities · 14 days</span></div>
    <div class="u318-map"><svg viewBox="0 0 300 1180" aria-hidden="true"><path class="u318-guide"/><path class="u318-route"/><g class="u318-dots"></g><path class="u318-pl" d="M12 0L-8 -8L-4 0L-8 8z"/></svg></div>
  </div>
</div>
`,
      css: `

.u318{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:30px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u318-sc{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;outline:none}
.u318-sc::-webkit-scrollbar{display:none}
.u318-hd{position:sticky;top:0;z-index:3;padding:18px 20px 14px;background:linear-gradient(var(--ux-surface) 70%,transparent)}
.u318-hd b{display:block;font-size:20px;font-weight:880;letter-spacing:-.03em}
.u318-hd span{font-size:12.5px;font-weight:700;color:var(--ux-ink-3)}
.u318-map{position:relative;height:1180px;margin-top:-30px}
.u318-map svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.u318-guide{fill:none;stroke:var(--ux-line-2);stroke-width:3;stroke-dasharray:2 8;stroke-linecap:round}
.u318-route{fill:none;stroke:var(--ux-accent);stroke-width:4;stroke-linecap:round}
.u318-dot{fill:var(--ux-surface);stroke:var(--ux-line-2);stroke-width:3;transition:stroke .3s}
.u318-dot.on{stroke:var(--ux-accent)}
.u318-dotc{fill:var(--ux-accent);transform-box:fill-box;transform-origin:50% 50%;transform:scale(0);transition:transform .45s var(--ux-spring)}
.u318-dotc.on{transform:scale(1)}
.u318-pl{fill:var(--ux-ink)}
.u318-card{position:absolute;width:132px;padding:10px 12px;border-radius:14px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 12px 24px -14px var(--ux-shadow-strong);opacity:0;transform:translateY(10px) scale(.9);transition:opacity .35s,transform .5s var(--ux-spring)}
.u318-card.on{opacity:1;transform:none}
.u318-card b{display:block;font-size:15px;font-weight:850}
.u318-card span{font-size:11.5px;font-weight:700;color:var(--ux-ink-3)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u318');
  var NS = 'http://www.w3.org/2000/svg';
  var sc = root.querySelector('.u318-sc'), map = root.querySelector('.u318-map'), guide = root.querySelector('.u318-guide'), route = root.querySelector('.u318-route'), pl = root.querySelector('.u318-pl'), gd = root.querySelector('.u318-dots');
  var STOPS = [['Seoul', 'Depart 10.03'], ['Tokyo', '10.05 · 2 nights'], ['Taipei', '10.08 · 3 nights'], ['Bangkok', '10.12 · 4 nights'], ['Bali', 'Arrive 10.16']];
  var PTS = [[70, 120], [220, 340], [80, 560], [215, 790], [110, 1040]];
  var d = 'M' + PTS[0][0] + ' ' + PTS[0][1];
  for (var i = 1; i < PTS.length; i++) { var a = PTS[i - 1], b = PTS[i], my = (a[1] + b[1]) / 2; d += ' C' + a[0] + ' ' + my + ' ' + b[0] + ' ' + my + ' ' + b[0] + ' ' + b[1]; }
  guide.setAttribute('d', d); route.setAttribute('d', d);
  var L = route.getTotalLength();
  route.style.strokeDasharray = L + ' ' + L;
  // 높이(y)마다 경로 길이를 미리 재 두고, 화면 가운데 높이에 맞는 길이까지 그립니다
  var table = [];
  for (var s = 0; s <= 200; s++) { var p = route.getPointAtLength(L * s / 200); table.push([p.y, L * s / 200]); }
  var stops = PTS.map(function (pt, i) {
    var c = document.createElementNS(NS, 'circle'), cc = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'u318-dot'); c.setAttribute('cx', pt[0]); c.setAttribute('cy', pt[1]); c.setAttribute('r', 10);
    cc.setAttribute('class', 'u318-dotc'); cc.setAttribute('cx', pt[0]); cc.setAttribute('cy', pt[1]); cc.setAttribute('r', 5);
    gd.appendChild(c); gd.appendChild(cc);
    var card = document.createElement('div');
    card.className = 'u318-card';
    card.style.top = (pt[1] - 22) + 'px';
    card.style.left = (pt[0] > 150 ? pt[0] - 160 : pt[0] + 22) + 'px';
    card.innerHTML = '<b></b><span></span>';
    card.querySelector('b').textContent = STOPS[i][0];
    card.querySelector('span').textContent = STOPS[i][1];
    map.appendChild(card);
    var len = 0;
    table.forEach(function (t) { if (Math.abs(t[0] - pt[1]) < Math.abs(PTS[i][1] - (route.getPointAtLength(len).y))) len = t[1]; });
    return { c: c, cc: cc, card: card, len: i === 0 ? 0 : len };
  });
  var raf = 0;
  function lenAt(y) {
    if (y <= table[0][0]) return 0;
    for (var i = 1; i < table.length; i++) if (table[i][0] >= y) return table[i - 1][1] + (table[i][1] - table[i - 1][1]) * (y - table[i - 1][0]) / Math.max(0.01, table[i][0] - table[i - 1][0]);
    return L;
  }
  function draw() {
    raf = 0;
    var y = sc.scrollTop + sc.clientHeight * 0.55 - map.offsetTop + 30, len = Math.max(0, Math.min(L, lenAt(y)));
    route.style.strokeDashoffset = (L - len).toFixed(1);
    var p = route.getPointAtLength(len), q = route.getPointAtLength(Math.min(L, len + 2));
    var ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
    pl.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')');
    stops.forEach(function (s) { var on = len >= s.len - 2; s.c.classList.toggle('on', on); s.cc.classList.toggle('on', on); s.card.classList.toggle('on', on); });
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
