// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPipCornerThrow(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u347">
  <div class="u347-sb" aria-hidden="true"><span>9:41</span><i></i></div>
  <div class="u347-sp"></div>
  <div class="u347-in"><b>Beach sunset time-lapse</b><small>Solen Channel · 12K views</small><div class="u347-ch" aria-hidden="true"><span>Like</span><span>Share</span><span>Save</span></div></div>
  <ul class="u347-ls"></ul>
  <div class="u347-vid" tabindex="0" role="group" aria-label="Video, drag to move">
    <div class="u347-sc"></div><div class="u347-pb"><i></i></div>
    <button class="u347-mini" type="button" aria-label="Minimize"><svg viewBox="0 0 18 18"><rect x="2" y="3" width="14" height="11" rx="2"/><rect x="9" y="8.5" width="5.5" height="4" rx="1" fill="#fff" stroke="none"/></svg></button>
    <div class="u347-ov"><button class="u347-pp" type="button" aria-label="Play or pause"><svg viewBox="0 0 30 30"><path d="M11 9v12M19 9v12"/></svg></button><button class="u347-ex" type="button" aria-label="Expand"><svg viewBox="0 0 30 30"><path d="M8 13V8h5M22 17v5h-5M8 8l6 6M22 22l-6-6"/></svg></button></div>
  </div>
  <button class="u347-tab" type="button" aria-label="Bring back the video"></button>
</div>
`,
      css: `

.u347{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:36px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;color:var(--ux-ink)}
.u347-sb{height:30px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-size:12px;font-weight:800}
.u347-sb i{width:22px;height:10px;border-radius:3px;box-shadow:inset 0 0 0 1.5px var(--ux-ink);background:linear-gradient(90deg,var(--ux-ink) 70%,transparent 0) 2px 2px/16px 6px no-repeat}
.u347-sp{height:169px;transition:height .5s cubic-bezier(.3,1,.4,1)}
.u347.is-pip .u347-sp{height:0}
.u347-in{padding:12px 16px 0}
.u347-in b{display:block;font-size:15px;font-weight:850;letter-spacing:-.02em}
.u347-in small{display:block;margin-top:3px;font-size:11.5px;color:var(--ux-ink-3)}
.u347-ch{display:flex;gap:6px;margin-top:10px}
.u347-ch span{padding:6px 11px;border-radius:999px;background:var(--ux-surface-2);font-size:11.5px;font-weight:750}
.u347-ls{list-style:none;margin:12px 0 0;padding:0 16px;display:grid;gap:10px}
.u347-ls li{display:flex;gap:10px;align-items:center}
.u347-ls i{flex:none;width:96px;height:54px;border-radius:10px;background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 40%,#fff))}
.u347-ls b{display:block;font-size:12.5px;font-weight:800}
.u347-ls small{font-size:11px;color:var(--ux-ink-3)}
.u347-vid{position:absolute;left:0;top:0;width:300px;height:169px;transform-origin:0 0;border-radius:var(--r,0);overflow:hidden;background:#0B0C12;touch-action:none;box-shadow:0 18px 30px -12px rgba(0,0,0,var(--sh,0));z-index:5}
.u347.is-pip .u347-vid{cursor:grab}
.u347-vid:focus-visible{outline:3px solid var(--ux-accent);outline-offset:-3px}
.u347-sc{position:absolute;inset:0;background:linear-gradient(#FF9A62 0,#F7617E 42%,#7B4AA8 58%,#1E2A5A 59%,#0E1734)}
.u347-sc::before{content:"";position:absolute;left:55%;top:34%;width:44px;height:44px;margin-left:-22px;border-radius:50%;background:radial-gradient(#FFF3BF,#FFD43B 55%,rgba(255,212,59,0) 72%);animation:u347-sun 9s ease-in-out infinite alternate}
.u347-sc::after{content:"";position:absolute;left:-20%;right:-20%;top:59%;bottom:0;background:repeating-linear-gradient(170deg,rgba(255,255,255,.08) 0 2px,transparent 2px 12px);animation:u347-wave 3s linear infinite}
@keyframes u347-sun{to{transform:translateY(16px)}}
@keyframes u347-wave{to{transform:translateX(24px)}}
.u347.is-paused .u347-sc::before,.u347.is-paused .u347-sc::after,.u347.is-paused .u347-pb i{animation-play-state:paused}
.u347-pb{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.25)}
.u347-pb i{display:block;height:100%;width:100%;background:#FF4D4F;transform-origin:0 50%;animation:u347-prog 40s linear infinite}
@keyframes u347-prog{from{transform:scaleX(0)}}
.u347-mini{position:absolute;right:10px;top:10px;width:34px;height:34px;border:0;border-radius:10px;background:rgba(0,0,0,.4);display:grid;place-items:center;transition:opacity .25s}
.u347-mini svg,.u347-ov svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.u347.is-pip .u347-mini{opacity:0;pointer-events:none}
.u347-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:28px;background:rgba(0,0,0,.45);opacity:0;pointer-events:none;transition:opacity .25s}
.u347.is-ov .u347-ov{opacity:1;pointer-events:auto}
.u347-ov button{width:56px;height:56px;border:0;border-radius:50%;background:rgba(255,255,255,.18);display:grid;place-items:center}
.u347-ov svg{width:30px;height:30px}
.u347-tab{position:absolute;top:0;width:26px;height:56px;border:0;padding:0;background:var(--ux-ink);color:var(--ux-surface);display:grid;place-items:center;font-size:16px;font-weight:900;z-index:6;opacity:0;pointer-events:none;transition:opacity .2s}
.u347-tab.on{opacity:1;pointer-events:auto}
.u347-mini:focus-visible,.u347-ov button:focus-visible,.u347-tab:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u347');
  var vid = root.querySelector('.u347-vid'), tab = root.querySelector('.u347-tab'), ls = root.querySelector('.u347-ls'), pp = root.querySelector('.u347-pp');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var REL = [['Three hours of waves', '#1C7ED6'], ['Dawn forest walk', '#2B8A3E'], ['Night city drive', '#5F3DC4'], ['Snowy cabin', '#868E96']];
  REL.forEach(function (r, i) {
    var li = document.createElement('li');
    li.innerHTML = '<i style="--c:' + r[1] + '"></i><span><b></b><small></small></span>';
    li.querySelector('b').textContent = r[0]; li.querySelector('small').textContent = '' + (i + 2) * 3 + 'K views';
    ls.appendChild(li);
  });
  var W = 300, H = 500, PW = 150, PH = 84.5, M = 12, TOP = 42;
  // 모드: full(위 고정), pip(네 모서리), stash(옆 가장자리에 반쯤 숨김)
  var mode = 'full', side = 1, corner = [1, 1], P = { x: 0, y: 30, s: 1, vx: 0, vy: 0, vs: 0 }, raf = 0, last = 0, drag = null, ovT = 0;
  function target() {
    if (mode === 'full') return [0, 30, 1];
    var y = corner[1] ? H - M - PH : TOP;
    if (mode === 'stash') return [side < 0 ? -PW + 26 : W - 26, y, 0.5];
    return [corner[0] ? W - M - PW : M, y, 0.5];
  }
  function paint() {
    vid.style.transform = 'translate(' + P.x.toFixed(1) + 'px,' + P.y.toFixed(1) + 'px) scale(' + P.s.toFixed(4) + ')';
    var k = Math.max(0, Math.min(1, (1 - P.s) / 0.5));
    vid.style.setProperty('--r', (k * 24).toFixed(1) + 'px'); vid.style.setProperty('--sh', (k * 0.45).toFixed(2));
    var t = target();
    tab.classList.toggle('on', mode === 'stash' && !drag);
    tab.style.left = (side < 0 ? 0 : W - 26) + 'px'; tab.style.top = (t[1] + (PH - 56) / 2) + 'px';
    tab.style.borderRadius = side < 0 ? '0 12px 12px 0' : '12px 0 0 12px';
    tab.textContent = side < 0 ? '›' : '‹';
  }
  function step(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.03, Math.max(0, (now - last) / 1000)); last = now;
    if (!drag) {
      var t = target();
      P.vx += (240 * (t[0] - P.x) - 25 * P.vx) * dt; P.vy += (240 * (t[1] - P.y) - 25 * P.vy) * dt; P.vs += (300 * (t[2] - P.s) - 30 * P.vs) * dt;
      P.x += P.vx * dt; P.y += P.vy * dt; P.s += P.vs * dt;
      if (Math.abs(t[0] - P.x) + Math.abs(t[1] - P.y) < 0.3 && Math.abs(P.vx) + Math.abs(P.vy) < 4 && Math.abs(t[2] - P.s) < 0.001) { P.x = t[0]; P.y = t[1]; P.s = t[2]; P.vx = P.vy = P.vs = 0; paint(); return; }
    }
    paint();
    raf = requestAnimationFrame(step);
  }
  function run() { if (rm) { var t = target(); P.x = t[0]; P.y = t[1]; P.s = t[2]; paint(); return; } if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } }
  function setMode(m) { mode = m; root.classList.toggle('is-pip', m !== 'full'); root.classList.remove('is-ov'); run(); }
  root.querySelector('.u347-mini').addEventListener('click', function (e) { e.stopPropagation(); corner = [1, 1]; setMode('pip'); });
  root.querySelector('.u347-ex').addEventListener('click', function (e) { e.stopPropagation(); setMode('full'); });
  pp.addEventListener('click', function (e) { e.stopPropagation(); root.classList.toggle('is-paused'); clearTimeout(ovT); ovT = setTimeout(function () { root.classList.remove('is-ov'); }, 2500); });
  tab.addEventListener('click', function () { corner = [side < 0 ? 0 : 1, corner[1]]; setMode('pip'); });
  // 끌기: 손을 바로 따라가고, 놓으면 0.18초 뒤 위치를 내다봐 모서리나 가장자리를 고릅니다
  var k = 1, sx = 0, sy = 0, ox = 0, oy = 0, moved = false, hist = [];
  vid.addEventListener('pointerdown', function (e) {
    if (mode === 'full' || e.target.closest('button')) return;
    var r = root.getBoundingClientRect(); k = root.offsetWidth / (r.width || 1);
    drag = true; moved = false; sx = e.clientX; sy = e.clientY; ox = P.x; oy = P.y; hist = [[performance.now(), P.x, P.y]];
    try { vid.setPointerCapture(e.pointerId); } catch (er) { /* 무시 */ }
  });
  vid.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = (e.clientX - sx) * k, dy = (e.clientY - sy) * k;
    if (Math.hypot(dx, dy) > 5) moved = true;
    P.x = Math.max(-PW + 10, Math.min(W - 10, ox + dx)); P.y = Math.max(32, Math.min(H - PH - 4, oy + dy));
    hist.push([performance.now(), P.x, P.y]); if (hist.length > 6) hist.shift();
    paint();
  });
  function up() {
    if (!drag) return;
    drag = null;
    if (!moved) {
      if (mode === 'stash') { tab.click(); return; }
      root.classList.toggle('is-ov'); clearTimeout(ovT); ovT = setTimeout(function () { root.classList.remove('is-ov'); }, 2500);
      run(); return;
    }
    var a = hist[0], b = hist[hist.length - 1], dt = (b[0] - a[0]) / 1000;
    P.vx = dt > 0.005 ? (b[1] - a[1]) / dt : 0; P.vy = dt > 0.005 ? (b[2] - a[2]) / dt : 0;
    var cx = P.x + P.vx * 0.18 + PW / 2, cy = P.y + P.vy * 0.18 + PH / 2;
    corner = [cx < W / 2 ? 0 : 1, cy < H / 2 ? 0 : 1];
    if (cx < 24 || cx > W - 24) { side = cx < W / 2 ? -1 : 1; setMode('stash'); } else setMode('pip');
  }
  vid.addEventListener('pointerup', up);
  vid.addEventListener('pointercancel', up);
  vid.addEventListener('keydown', function (e) {
    if (mode === 'full' || e.target !== vid) return;
    var m = { ArrowLeft: [0, null], ArrowRight: [1, null], ArrowUp: [null, 0], ArrowDown: [null, 1] }[e.key];
    if (!m) return;
    e.preventDefault();
    if (m[0] != null) corner[0] = m[0]; if (m[1] != null) corner[1] = m[1];
    setMode('pip');
  });
  paint();
})();
  })();

  scope.ready();
  return scope.controller;
}
