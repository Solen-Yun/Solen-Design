// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountMorphingCursor(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u314">
  <div class="u314-tb">
    <button type="button" class="u314-ib" data-k="btn" aria-label="Like"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>
    <button type="button" class="u314-ib" data-k="btn" aria-label="Share"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15V4M7 9l5-5 5 5M5 14v5h14v-5"/></svg></button>
    <button type="button" class="u314-ib" data-k="btn" aria-label="Save"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></button>
    <button type="button" class="u314-fb" data-k="btn">Follow</button>
  </div>
  <p class="u314-tx" data-k="text">Motion adds story to a screen. When the cursor takes on the shape of what it points at, your fingertip knows what it can do before you click.</p>
  <div class="u314-row"><div class="u314-ph" data-k="img" aria-hidden="true"></div><a class="u314-ln" href="#" data-k="link">Learn more</a></div>
  <div class="u314-cur" aria-hidden="true"><span class="u314-cl"></span></div>
</div>
`,
      css: `

.u314{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#F7F5F0;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#22201C;cursor:none;padding:22px;display:flex;flex-direction:column;gap:16px}
.u314 *{cursor:none}
.u314-tb{display:flex;gap:8px;align-items:center}
.u314-ib{width:42px;height:42px;border:0;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(34,32,28,.08);display:grid;place-items:center;color:#22201C;padding:0}
.u314-ib svg{width:18px;height:18px}
.u314-fb{margin-left:auto;height:38px;padding:0 18px;border:0;border-radius:999px;background:#22201C;color:#F7F5F0;font:inherit;font-size:13px;font-weight:750}
.u314-tx{margin:0;font-size:14px;line-height:1.6;font-weight:550;color:#3B3832;word-break:keep-all}
.u314-row{display:flex;gap:14px;align-items:flex-end;margin-top:auto}
.u314-ph{width:150px;height:104px;border-radius:16px;background:linear-gradient(140deg,#FFB86B,#F06595 60%,#845EF7)}
.u314-ln{font-size:14px;font-weight:800;color:#22201C;text-decoration:underline;text-underline-offset:4px;padding:6px 0}
.u314-ib:focus-visible,.u314-fb:focus-visible,.u314-ln:focus-visible{outline:2px solid #845EF7;outline-offset:3px}
.u314-cur{position:absolute;left:0;top:0;width:16px;height:16px;margin:0;border-radius:999px;background:rgba(34,32,28,.85);pointer-events:none;z-index:5;display:grid;place-items:center;color:#fff;font-size:12px;font-weight:800;opacity:0;transition:width .28s cubic-bezier(.3,1.4,.5,1),height .28s cubic-bezier(.3,1.4,.5,1),border-radius .28s,background .2s,opacity .2s;mix-blend-mode:normal}
.u314-cur.is-on{opacity:1}
.u314-cur.is-btn{background:rgba(34,32,28,.1)}
.u314-cur.is-text{background:#845EF7}
.u314-cur.is-img{background:rgba(255,255,255,.92);color:#22201C;box-shadow:0 10px 24px -8px rgba(0,0,0,.4)}
.u314-cur.is-link{background:#845EF7}
.u314-cur span{opacity:0;transition:opacity .2s;white-space:nowrap}
.u314-cur.is-img span,.u314-cur.is-link span{opacity:1}
@media (prefers-reduced-motion: reduce){.u314-cur{transition:opacity .2s}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u314');
  var cur = root.querySelector('.u314-cur'), cl = root.querySelector('.u314-cl');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pos = { x: 170, y: 300 }, sp = { x: 170, y: 300 }, vel = { x: 0, y: 0 }, mode = '', box = null, raf = 0, last = 0;
  root.querySelector('.u314-ln').addEventListener('click', function (e) { e.preventDefault(); });
  function rel(e) { var r = root.getBoundingClientRect(), k = root.offsetWidth / (r.width || 1); return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k, k: k, r: r }; }
  function set(m, el, p) {
    mode = m; cur.className = 'u314-cur is-on' + (m ? ' is-' + m : '');
    box = null;
    if (m === 'btn') { var b = el.getBoundingClientRect(); box = { x: (b.left - p.r.left) * p.k, y: (b.top - p.r.top) * p.k, w: b.width * p.k, h: b.height * p.k, rad: getComputedStyle(el).borderRadius }; }
    cl.textContent = m === 'img' ? 'View' : m === 'link' ? '→' : '';
  }
  // 커서의 크기와 위치: 버튼이면 버튼 상자(손끝 쪽으로 15% 끌림), 글이면 가는 막대, 사진이면 큰 원, 링크면 중간 원
  function target() {
    if (mode === 'btn' && box) { var cxp = box.x + box.w / 2, cyp = box.y + box.h / 2; return { x: cxp + (pos.x - cxp) * 0.15, y: cyp + (pos.y - cyp) * 0.15, w: box.w + 8, h: box.h + 8, r: box.rad }; }
    if (mode === 'text') return { x: pos.x, y: pos.y, w: 3, h: 24, r: '2px' };
    if (mode === 'img') return { x: pos.x, y: pos.y, w: 64, h: 64, r: '999px' };
    if (mode === 'link') return { x: pos.x, y: pos.y, w: 30, h: 30, r: '999px' };
    return { x: pos.x, y: pos.y, w: 16, h: 16, r: '999px' };
  }
  function frame(now) {
    raf = 0;
    if (!root.isConnected) return;
    var dt = Math.min(0.033, Math.max(0, (now - last) / 1000)); last = now;
    var t = target();
    if (rm) { sp.x = t.x; sp.y = t.y; }
    else { vel.x += ((t.x - sp.x) * 420 - vel.x * 30) * dt; vel.y += ((t.y - sp.y) * 420 - vel.y * 30) * dt; sp.x += vel.x * dt; sp.y += vel.y * dt; }
    cur.style.width = t.w + 'px'; cur.style.height = t.h + 'px'; cur.style.borderRadius = t.r;
    cur.style.transform = 'translate(' + (sp.x - t.w / 2).toFixed(1) + 'px,' + (sp.y - t.h / 2).toFixed(1) + 'px)';
    if (Math.abs(t.x - sp.x) + Math.abs(t.y - sp.y) > 0.2 || Math.abs(vel.x) + Math.abs(vel.y) > 1) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  root.addEventListener('pointermove', function (e) {
    var p = rel(e); pos.x = p.x; pos.y = p.y;
    // 시연처럼 이벤트가 바깥 상자로 올 때도 맞도록, 실제 좌표 아래의 요소로 판단합니다
    var hitEl = document.elementFromPoint(e.clientX, e.clientY) || e.target, el = hitEl.closest && hitEl.closest('[data-k]');
    var m = el && root.contains(el) ? el.getAttribute('data-k') : '';
    if (m !== mode || (m === 'btn' && (!box || el !== set.last))) { set(m, el, p); set.last = el; }
    if (!cur.classList.contains('is-on')) { sp.x = p.x; sp.y = p.y; cur.classList.add('is-on'); }
    kick();
  });
  root.addEventListener('pointerleave', function () { cur.classList.remove('is-on'); mode = ''; set.last = null; });
})();
  })();

  scope.ready();
  return scope.controller;
}
