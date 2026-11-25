// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountCitedAiAnswer(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u224">
  <div class="u224-q">How do I raise landing page conversion?</div>
  <p class="u224-an" aria-live="off"></p>
  <div class="u224-sr"><small>Sources</small><div class="u224-sl"></div></div>
</div>
`,
      css: `

.u224{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u224-q{position:absolute;right:16px;top:16px;max-width:240px;padding:8px 12px;border-radius:14px 14px 4px 14px;background:var(--ux-ink);color:var(--ux-surface);font-size:11.5px;font-weight:750}
.u224-an{position:absolute;left:16px;right:16px;top:58px;font-size:12px;line-height:1.75;font-weight:600;color:var(--ux-ink-2)}
.u224-an>span{transition:color .2s,background-size .3s;background:linear-gradient(transparent 88%,color-mix(in srgb,var(--ux-accent) 70%,transparent) 88%) no-repeat 0 0/0 100%}
.u224-an>span.is-hl{color:var(--ux-ink);background-size:100% 100%}
.u224-ct{display:inline-grid;place-items:center;min-width:15px;height:15px;margin:0 1px;padding:0 3px;border:0;border-radius:5px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:9px;font-weight:900;line-height:1;vertical-align:1px;cursor:pointer;transition:background .15s,color .15s}
.u224-ct.is-on{background:var(--ux-accent);color:#fff;box-shadow:none}
.u224-ct:focus-visible{outline:2px solid var(--ux-accent);outline-offset:1px}
.u224-pv{position:absolute;z-index:3;width:218px;padding:10px 11px;border-radius:13px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 18px 34px -12px var(--ux-shadow-strong);transform:translate(-50%,calc(-100% - 6px)) scale(.94);transform-origin:50% 100%;opacity:0;pointer-events:none;transition:opacity .15s,transform .22s cubic-bezier(.3,1.5,.5,1)}
.u224-pv.is-on{opacity:1;transform:translate(-50%,calc(-100% - 6px))}
.u224-pv.is-below{transform:translate(-50%,24px) scale(.94);transform-origin:50% 0}
.u224-pv.is-below.is-on{transform:translate(-50%,24px)}
.u224-pv header{display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:800;color:var(--ux-ink-3)}
.u224-pv header i{width:16px;height:16px;border-radius:5px;display:grid;place-items:center;color:#fff;font-style:normal;font-size:9px;font-weight:900}
.u224-pv b{display:block;margin-top:5px;font-size:11px;font-weight:850}
.u224-pv p{margin:4px 0 0;font-size:10px;line-height:1.5;font-weight:600;color:var(--ux-ink-2)}
.u224-pv mark{background:color-mix(in srgb,#FACC15 50%,transparent);color:var(--ux-ink);border-radius:3px;padding:0 1px}
.u224-sr{position:absolute;left:16px;right:16px;bottom:16px}
.u224-sr>small{font-size:10px;font-weight:850;color:var(--ux-ink-3)}
.u224-sl{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px}
.u224-sc{padding:8px;border-radius:12px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);cursor:pointer;transition:transform .25s cubic-bezier(.3,1.5,.5,1),box-shadow .2s,background .2s}
.u224-sc.is-on{transform:translateY(-4px);background:var(--ux-surface);box-shadow:0 0 0 1.5px var(--ux-accent),0 10px 20px -12px var(--ux-shadow-strong)}
.u224-sc header{display:flex;align-items:center;gap:5px}
.u224-sc header i{flex:none;width:16px;height:16px;border-radius:5px;display:grid;place-items:center;color:#fff;font-style:normal;font-size:9px;font-weight:900}
.u224-sc header em{font-style:normal;font-size:9px;font-weight:900;color:var(--ux-ink-3)}
.u224-sc b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:5px;font-size:10px;line-height:1.35;font-weight:800}
.u224-sc small{display:block;margin-top:3px;font-size:8.5px;font-weight:700;color:var(--ux-ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u224-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u224-an>span,.u224-pv,.u224-sc{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u224');
  var an = root.querySelector('.u224-an'), sl = root.querySelector('.u224-sl');
  // [문장, 쓴 출처 번호들]
  var A = [['Your first screen should say what you do in one sentence.', [1]], ['Button copy that promises an outcome beats a plain “Get started.”', [2]], ['Fewer sign-up fields is better; asking for just an email had the highest completion.', [2, 3]], ['Put real customer quotes and numbers close to the button.', [1]]];
  // [글자, 주소, 제목, 인용 앞, 인용, 인용 뒤]
  var SRC = [['S', 'solen.dev', 'Five habits of great landing pages', 'Visitors stay only if within 3 seconds they know ', 'what the product does', '.'], ['C', 'cro-weekly.com', '120 button copy tests', 'Copy that ', 'promised an outcome', ' got 31% more clicks than “Start free.”'], ['F', 'formlab.io', 'Sign-up form length report', 'Asking only for email ', 'had the highest completion', '.']];
  var COL = ['#6366F1', '#F59E0B', '#10B981'];
  var pv = document.createElement('div'); pv.className = 'u224-pv'; pv.setAttribute('role', 'tooltip'); pv.innerHTML = '<header><i></i><span></span></header><b></b><p></p>'; root.appendChild(pv);
  var SEN = [], CT = [];
  A.forEach(function (a, i) {
    var s = document.createElement('span'); s.textContent = a[0]; an.appendChild(s); SEN.push(s);
    a[1].forEach(function (n) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'u224-ct'; b.textContent = n; b.setAttribute('aria-label', SRC[n - 1][1] + ' — view source');
      b.addEventListener('pointerenter', function () { cite(b, i, n); }); b.addEventListener('focus', function () { cite(b, i, n); });
      b.addEventListener('pointerleave', clear); b.addEventListener('blur', clear);
      an.appendChild(b); CT.push(b);
    });
    an.appendChild(document.createTextNode(' '));
  });
  var SC = SRC.map(function (s, k) {
    var c = document.createElement('div'); c.className = 'u224-sc'; c.tabIndex = 0;
    c.innerHTML = '<header><i style="background:' + COL[k] + '">' + s[0] + '</i><em>' + (k + 1) + '</em></header><b></b><small></small>'; c.querySelector('b').textContent = s[2]; c.querySelector('small').textContent = s[1];
    // 출처 카드: 그 출처를 쓴 문장을 모두 표시합니다
    function on() { clear(); c.classList.add('is-on'); A.forEach(function (a, i) { if (a[1].indexOf(k + 1) >= 0) SEN[i].classList.add('is-hl'); }); CT.forEach(function (b) { b.classList.toggle('is-on', +b.textContent === k + 1); }); }
    c.addEventListener('pointerenter', on); c.addEventListener('focus', on); c.addEventListener('pointerleave', clear); c.addEventListener('blur', clear);
    sl.appendChild(c); return c;
  });
  function clear() { pv.classList.remove('is-on'); SEN.forEach(function (s) { s.classList.remove('is-hl'); }); CT.forEach(function (b) { b.classList.remove('is-on'); }); SC.forEach(function (c) { c.classList.remove('is-on'); }); }
  function cite(b, i, n) {
    clear(); var s = SRC[n - 1];
    SEN[i].classList.add('is-hl'); b.classList.add('is-on'); SC[n - 1].classList.add('is-on');
    pv.querySelector('i').textContent = s[0]; pv.querySelector('i').style.background = COL[n - 1]; pv.querySelector('header span').textContent = s[1]; pv.querySelector('b').textContent = s[2];
    var p = pv.querySelector('p'); p.innerHTML = ''; p.appendChild(document.createTextNode(s[3])); var m = document.createElement('mark'); m.textContent = s[4]; p.appendChild(m); p.appendChild(document.createTextNode(s[5]));
    // 번호 배지 위에 띄우되 상자 밖으로 나가지 않게 둡니다
    var rr = root.getBoundingClientRect(), k = 340 / (rr.width || 340), br = b.getBoundingClientRect();
    var top = (br.top - rr.top) * k; pv.style.left = Math.max(125, Math.min(215, (br.left + br.width / 2 - rr.left) * k)) + 'px'; pv.style.top = top + 'px';
    // 위에 자리가 없으면(질문 말풍선과 겹치면) 배지 아래로 띄웁니다
    pv.classList.toggle('is-below', top < 150);
    pv.classList.add('is-on');
  }
})();
  })();

  scope.ready();
  return scope.controller;
}
