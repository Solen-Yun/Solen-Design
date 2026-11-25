// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountAvatarStackJoin(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u210">
  <span class="u210-tg"><i aria-hidden="true"></i>Thursday 8 PM · Live</span>
  <h3>Ship a site in 30 minutes</h3>
  <p class="u210-sb">45 min · Free · Replay included</p>
  <div><div class="u210-st" aria-label="People who signed up"><span class="u210-mo">+1.2k</span><span class="u210-nm" aria-hidden="true"></span></div></div>
  <div class="u210-ct"><b class="u210-num"></b> people signed up</div>
  <button type="button" class="u210-jn"><i aria-hidden="true"></i><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.5l2.6 2.6L11 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span></button>
</div>
`,
      css: `

.u210{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(80% 60% at 50% 0%,var(--ux-accent-soft),transparent 70%),var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);text-align:center}
.u210-tg{display:inline-flex;align-items:center;gap:6px;margin-top:40px;padding:4px 10px;border-radius:999px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:10px;font-weight:850;color:var(--ux-accent)}
.u210 h3{margin:12px 30px 0;font-size:21px;line-height:1.25;font-weight:900;letter-spacing:-.04em}
.u210-sb{margin:6px 0 0;font-size:11px;font-weight:700;color:var(--ux-ink-3)}
.u210-st{position:relative;display:inline-flex;align-items:center;height:52px;margin-top:20px;padding:0 6px 0 16px}
.u210-av{position:relative;flex:none;width:38px;height:38px;margin-left:-10px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:13px;font-weight:850;box-shadow:0 0 0 3px var(--ux-surface);transition:margin .45s cubic-bezier(.3,1.3,.5,1),transform .45s cubic-bezier(.3,1.5,.5,1),opacity .3s}
.u210-av.is-new{margin-left:-48px;transform:scale(.2);opacity:0}
.u210-av.is-gone{margin-left:-48px;transform:scale(.2);opacity:0}
.u210-st.is-fan .u210-av{margin-left:3px}
.u210-av.is-hl{transform:translateY(-4px) scale(1.08);z-index:2}
.u210-av.is-me{background:var(--ux-grad)}
.u210-av.is-me::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:2px solid var(--ux-accent);animation:u210-ring .9s ease-out forwards}

.u210-tg i{width:6px;height:6px;border-radius:50%;background:#E11D48;animation:u210-lv 1.4s ease-in-out infinite}
@keyframes u210-lv{50%{opacity:.3}}
@keyframes u210-ring{from{transform:scale(1);opacity:1}to{transform:scale(1.9);opacity:0}}
.u210-mo{flex:none;margin-left:6px;height:26px;padding:0 9px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);font-size:10.5px;font-weight:850;color:var(--ux-ink-2);display:inline-flex;align-items:center}
.u210-nm{position:absolute;top:-16px;padding:3px 7px;border-radius:7px;background:var(--ux-ink);color:var(--ux-surface);font-size:9.5px;font-weight:800;white-space:nowrap;transform:translateX(-50%);opacity:0;transition:opacity .15s,left .2s;pointer-events:none}
.u210-nm.is-on{opacity:1}
.u210-ct{margin-top:6px;font-size:12px;font-weight:750;color:var(--ux-ink-2)}
.u210-ct b{display:inline-flex;font-weight:900;color:var(--ux-ink);font-variant-numeric:tabular-nums}
.u210-dg{display:inline-block;height:1.2em;overflow:hidden;vertical-align:bottom;line-height:1.2}
.u210-dg span{display:block;transition:transform .5s cubic-bezier(.3,1.3,.5,1)}
.u210-jn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-width:170px;height:44px;margin-top:18px;padding:0 20px;border:0;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:13px;font-weight:850;cursor:pointer;transition:background .3s,transform .15s}
.u210-jn:active{transform:scale(.97)}
.u210-jn:focus-visible{outline:2px solid var(--ux-accent);outline-offset:3px}
.u210-jn i{display:none;width:15px;height:15px;border-radius:50%;border:2px solid color-mix(in srgb,var(--ux-surface) 35%,transparent);border-top-color:var(--ux-surface);animation:u210-sp .7s linear infinite}
.u210-jn.is-busy i{display:block}
.u210-jn.is-done{background:#059669}
.u210-jn svg{width:14px;height:14px;display:none}
.u210-jn.is-done svg{display:block}
@keyframes u210-sp{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion: reduce){.u210-av,.u210-dg span{transition:none}.u210-av.is-me::after,.u210-jn i,.u210-tg i{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u210');
  var st = root.querySelector('.u210-st'), mo = root.querySelector('.u210-mo'), nm = root.querySelector('.u210-nm'), num = root.querySelector('.u210-num'), jn = root.querySelector('.u210-jn'), lb = jn.querySelector('span');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NM = ['Seoyeon', 'Doyun', 'Haeun', 'Siwoo', 'Jia', 'Junho', 'Yuna', 'Minjae', 'Seojun', 'Sua', 'Taemin', 'Yerin'];
  var COL = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#0EA5E9', '#8B5CF6', '#EF4444', '#14B8A6', '#F97316', '#3B82F6', '#A855F7', '#22C55E'];
  var MAX = 6, k = 0, count = 1246, joined = false, hover = false, vis = true;
  function av(name, col, me) { var a = document.createElement('span'); a.className = 'u210-av' + (me ? ' is-me' : ''); a.textContent = name.charAt(0); a.dataset.n = name; if (!me) a.style.background = col; a.setAttribute('aria-hidden', 'true'); return a; }
  function list() { return Array.prototype.filter.call(st.children, function (c) { return c.classList.contains('u210-av') && !c.classList.contains('is-gone'); }); }
  // 맨 앞에 끼워 넣고, 넘치는 맨 뒤 사람은 접어서 빼냅니다
  function push(a) {
    a.classList.add('is-new'); st.insertBefore(a, st.firstChild);
    void a.offsetWidth; a.classList.remove('is-new');
    var L = list();
    if (L.length > MAX) { var z = L[L.length - 1]; z.classList.add('is-gone'); setTimeout(function () { z.remove(); }, rm ? 0 : 460); }
  }
  // 숫자는 자리마다 굴립니다
  var cells = [];
  function draw() {
    var s = count.toLocaleString('en-US');
    while (cells.length < s.length) { var d = document.createElement('span'); d.className = 'u210-dg'; d.innerHTML = '<span></span>'; num.appendChild(d); cells.push({ el: d, ch: '' }); }
    s.split('').forEach(function (ch, i) {
      var c = cells[i]; if (c.ch === ch) return; var inner = c.el.firstChild;
      if (/\d/.test(ch)) { if (!/\d/.test(c.ch)) inner.innerHTML = '0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9'; inner.style.transform = 'translateY(' + (-+ch * 1.2) + 'em)'; } else { inner.textContent = ch; inner.style.transform = 'none'; }
      c.ch = ch;
    });
    num.setAttribute('aria-label', s);
  }
  for (var i = MAX - 1; i >= 0; i--) { st.insertBefore(av(NM[i], COL[i]), st.firstChild); } k = MAX;
  st.insertBefore(mo, null); st.appendChild(nm);
  draw();
  (function loop() {
    if (!root.isConnected) return;
    if (vis && !hover && !rm) { push(av(NM[k % NM.length], COL[k % COL.length])); k++; count++; draw(); }
    setTimeout(loop, 2400);
  })();
  // 묶음 위에서는 부채처럼 벌리고, 포인터 아래 사람 이름을 띄웁니다
  st.addEventListener('pointerenter', function () { hover = true; st.classList.add('is-fan'); });
  st.addEventListener('pointerleave', function () { hover = false; st.classList.remove('is-fan'); nm.classList.remove('is-on'); list().forEach(function (a) { a.classList.remove('is-hl'); }); });
  st.addEventListener('pointermove', function (e) {
    var L = list(), hit = null;
    L.forEach(function (a) { var r = a.getBoundingClientRect(); if (e.clientX >= r.left && e.clientX <= r.right) hit = a; });
    L.forEach(function (a) { a.classList.toggle('is-hl', a === hit); });
    if (!hit) { nm.classList.remove('is-on'); return; }
    // 벌어지는 중에도 따라가도록 위치는 이름표를 띄울 때 바로 잽니다
    var sr = st.getBoundingClientRect(), r = hit.getBoundingClientRect(), s = st.offsetWidth / (sr.width || 1);
    nm.textContent = hit.dataset.n; nm.style.left = ((r.left + r.width / 2 - sr.left) * s).toFixed(0) + 'px'; nm.classList.add('is-on');
  });
  function label() { lb.textContent = joined ? 'You’re in · #' + count.toLocaleString('en-US') + '' : 'Save my seat'; }
  jn.addEventListener('click', function () {
    if (joined || jn.classList.contains('is-busy')) return;
    jn.classList.add('is-busy'); lb.textContent = '';
    setTimeout(function () {
      jn.classList.remove('is-busy'); jn.classList.add('is-done'); joined = true;
      count++; draw(); push(av('Me', '', true)); label();
    }, rm ? 0 : 750);
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(root);
  label();
})();
  })();

  scope.ready();
  return scope.controller;
}
