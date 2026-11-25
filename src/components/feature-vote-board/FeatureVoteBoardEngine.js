// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountFeatureVoteBoard(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u248">
  <div class="u248-hd"><div><b>What we build next</b><small>We build in order of votes</small></div><span>+ Suggest</span></div>
  <ol class="u248-ls"></ol>
</div>
`,
      css: `

.u248{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u248-hd{position:absolute;left:20px;right:18px;top:20px;display:flex;align-items:flex-start}
.u248-hd div{margin-right:auto}
.u248-hd b{display:block;font-size:16px;font-weight:900;letter-spacing:-.03em}
.u248-hd small{display:block;margin-top:3px;font-size:10.5px;font-weight:650;color:var(--ux-ink-3)}
.u248-hd span{height:28px;padding:0 11px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-size:10.5px;font-weight:850;display:inline-flex;align-items:center;white-space:nowrap}
.u248-ls{position:absolute;left:14px;right:14px;top:74px;margin:0;padding:0;list-style:none}
.u248-it{position:relative;display:flex;align-items:center;gap:11px;height:46px;margin-bottom:6px;padding:0 10px 0 6px;border-radius:14px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);will-change:transform}
.u248-it.is-mv{z-index:2;box-shadow:inset 0 0 0 1px var(--ux-line),0 12px 24px -12px var(--ux-shadow-strong)}
.u248-up{position:relative;flex:none;width:40px;height:36px;border:0;border-radius:10px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;cursor:pointer;transition:background .2s,color .2s,box-shadow .2s}
.u248-up:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u248-up svg{width:11px;height:11px;transition:transform .35s cubic-bezier(.3,1.8,.5,1)}
.u248-up.is-on{background:var(--ux-accent);color:#fff;box-shadow:none}
.u248-up.is-on svg{transform:translateY(-1px)}
.u248-up.is-pop svg{animation:u248-hop .45s cubic-bezier(.3,1.6,.5,1)}
@keyframes u248-hop{40%{transform:translateY(-5px)}}
.u248-nm{position:relative;display:block;height:13px;overflow:hidden;font-size:11px;font-weight:900;line-height:13px;font-variant-numeric:tabular-nums}
.u248-nm span{display:block;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.u248-pl{position:absolute;left:50%;top:-4px;font-size:10px;font-weight:900;color:var(--ux-accent);pointer-events:none;animation:u248-pl .8s ease-out forwards}
@keyframes u248-pl{from{transform:translate(-50%,0);opacity:1}to{transform:translate(-50%,-18px);opacity:0}}
.u248-tx{flex:1;min-width:0}
.u248-tx b{display:block;font-size:12.5px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u248-bd{display:inline-flex;align-items:center;gap:4px;margin-top:3px;font-size:9.5px;font-weight:800;color:var(--c)}
.u248-bd::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--c)}
.u248-rk{flex:none;font-size:10px;font-weight:850;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion: reduce){.u248-it,.u248-nm span,.u248-up svg{transition:none!important;animation:none!important}.u248-pl{display:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u248');
  var ls = root.querySelector('.u248-ls');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [이름, 표, 상태]
  var D = [['Google Calendar sync', 42, 0], ['Dark mode calendar', 39, 1], ['Home screen widget', 37, 2], ['Export to CSV', 37, 2], ['Per-team permissions', 22, 3]];
  var ST = [['In progress', '#2563EB'], ['Planned', '#7C3AED'], ['Under review', '#D97706'], ['Received', '#64748B']];
  var items = D.map(function (d, i) {
    var li = document.createElement('li'); li.className = 'u248-it';
    li.innerHTML = '<button type="button" class="u248-up" aria-pressed="false"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 8l4-4.5L10 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="u248-nm"><span></span></span></button><div class="u248-tx"><b></b><span class="u248-bd"></span></div><span class="u248-rk"></span>';
    li.querySelector('b').textContent = d[0];
    var bd = li.querySelector('.u248-bd'); bd.textContent = ST[d[2]][0]; bd.style.setProperty('--c', ST[d[2]][1]);
    var it = { el: li, name: d[0], n: d[1], base: d[1], i: i, on: false, btn: li.querySelector('.u248-up'), nm: li.querySelector('.u248-nm') };
    it.nm.firstChild.textContent = d[1];
    it.btn.addEventListener('click', function () { vote(it); });
    ls.appendChild(li); return it;
  });
  function label(it) { it.btn.setAttribute('aria-label', it.name + ', ' + it.n + ' votes' + (it.on ? ', remove vote' : ', vote')); }
  // 숫자는 위·아래로 굴려 바꿉니다
  function roll(it, up) {
    var box = it.nm, old = box.firstChild, nw = document.createElement('span');
    nw.textContent = it.n;
    if (rm) { box.replaceChild(nw, old); return; }
    nw.style.transform = 'translateY(' + (up ? 100 : -100) + '%)'; nw.style.position = 'absolute'; nw.style.left = '0'; nw.style.right = '0'; nw.style.top = '0';
    box.appendChild(nw); void nw.offsetWidth;
    old.style.transform = 'translateY(' + (up ? -100 : 100) + '%)'; nw.style.transform = 'none';
    setTimeout(function () { if (old.parentNode) old.remove(); nw.style.position = ''; }, 360);
  }
  function order() {
    var s = items.slice().sort(function (a, b) { return b.n - a.n || a.i - b.i; });
    // 옮기기 전 위치를 재고, 순서를 바꾼 뒤 그 차이만큼 되돌려 놓았다가 풀어 줍니다
    var top0 = items.map(function (it) { return it.el.offsetTop; });
    s.forEach(function (it, k) { ls.appendChild(it.el); it.el.querySelector('.u248-rk').textContent = '#' + (k + 1); });
    if (rm) return;
    items.forEach(function (it, k) {
      var dy = top0[k] - it.el.offsetTop;
      if (!dy) return;
      it.el.style.transition = 'none'; it.el.style.transform = 'translateY(' + dy + 'px)';
      if (dy > 0) it.el.classList.add('is-mv');
      void it.el.offsetWidth;
      it.el.style.transition = 'transform .55s cubic-bezier(.3,1.25,.5,1)'; it.el.style.transform = '';
      setTimeout(function () { it.el.classList.remove('is-mv'); }, 560);
    });
  }
  function vote(it) {
    it.on = !it.on; it.n = it.base + (it.on ? 1 : 0);
    it.btn.classList.toggle('is-on', it.on); it.btn.setAttribute('aria-pressed', it.on);
    roll(it, it.on); label(it);
    if (it.on && !rm) {
      it.btn.classList.remove('is-pop'); void it.btn.offsetWidth; it.btn.classList.add('is-pop');
      var p = document.createElement('span'); p.className = 'u248-pl'; p.textContent = '+1'; p.setAttribute('aria-hidden', 'true'); it.btn.appendChild(p); setTimeout(function () { p.remove(); }, 820);
    }
    setTimeout(order, rm ? 0 : 260);
  }
  items.forEach(label); order();
})();
  })();

  scope.ready();
  return scope.controller;
}
