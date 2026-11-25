// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountCircularThemeSwitch(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u219">
  <div class="u219-pg u219-lt"></div>
  <div class="u219-pg u219-dk is-dark" aria-hidden="true"></div>
</div>
`,
      css: `

.u219{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong)}
.u219-pg{position:absolute;inset:0;padding:14px 16px;background:var(--bg);color:var(--fg);--bg:#F7F7FA;--fg:#14151A;--card:#fff;--mut:#7A7D8C;--ln:#E7E8EE;--ac:#4F46E5}
.u219-pg.is-dark{--bg:#0D0E14;--fg:#ECEDF5;--card:#171925;--mut:#8C90A6;--ln:#262938;--ac:#A5B4FC}
.u219-dk{clip-path:circle(0px at var(--cx,300px) var(--cy,30px));transition:clip-path .7s cubic-bezier(.65,0,.35,1);pointer-events:none}
.u219.is-on .u219-dk{clip-path:circle(520px at var(--cx,300px) var(--cy,30px));pointer-events:auto}
.u219-nv{display:flex;align-items:center;gap:12px;height:32px;font-size:11px;font-weight:750;color:var(--mut)}
.u219-nv b{margin-right:auto;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:900;color:var(--fg)}
.u219-nv b i{width:14px;height:14px;border-radius:50%;background:var(--ac)}
.u219-tg{width:32px;height:32px;border:0;border-radius:10px;background:var(--card);box-shadow:inset 0 0 0 1px var(--ln);color:var(--fg);display:grid;place-items:center;cursor:pointer}
.u219-tg:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
.u219-tg svg{width:16px;height:16px;transition:transform .6s cubic-bezier(.3,1.4,.5,1)}
.u219-dk .u219-tg svg{transform:rotate(-90deg)}
.u219-h{margin:16px 0 10px;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u219-kp{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.u219-kp div{padding:9px 10px;border-radius:12px;background:var(--card);box-shadow:inset 0 0 0 1px var(--ln)}
.u219-kp small{display:block;font-size:9.5px;font-weight:800;color:var(--mut)}
.u219-kp b{font-size:15px;font-weight:900;font-variant-numeric:tabular-nums}
.u219-ch{margin-top:8px;padding:10px 12px;border-radius:14px;background:var(--card);box-shadow:inset 0 0 0 1px var(--ln)}
.u219-ch small{font-size:9.5px;font-weight:800;color:var(--mut)}
.u219-ch svg{display:block;width:100%;height:112px;margin-top:4px}
@media (prefers-reduced-motion: reduce){.u219-dk{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u219');
  var lt = root.querySelector('.u219-lt'), dk = root.querySelector('.u219-dk');
  var SUN = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="currentColor"/><g stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 1.5v1.4M8 13.1v1.4M1.5 8h1.4M13.1 8h1.4M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1"/></g></svg>';
  var MOON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 9.8A5.6 5.6 0 0 1 6.2 2.5a5.6 5.6 0 1 0 7.3 7.3z" fill="currentColor"/></svg>';
  // 같은 페이지를 밝은 판과 어두운 판 두 장으로 만들고, 어두운 판을 원으로 열고 닫습니다
  function page(dark) {
    return '<div class="u219-nv"><b><i></i>Pulse</b><span>Dashboard</span><span>Reports</span><button type="button" class="u219-tg">' + (dark ? MOON : SUN) + '</button></div>' +
      '<h3 class="u219-h">October summary</h3><div class="u219-kp"><div><small>Visits</small><b>18.4k</b></div><div><small>Sign-ups</small><b>1,206</b></div><div><small>Conversion</small><b>6.5%</b></div></div>' +
      '<div class="u219-ch"><small>Weekly visits</small><svg viewBox="0 0 280 112" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--ac)" stop-opacity=".35"/><stop offset="1" stop-color="var(--ac)" stop-opacity="0"/></linearGradient></defs><path d="M0 84 C30 70 50 92 80 66 S130 40 160 54 S220 20 280 26 L280 112 L0 112 Z" fill="url(#g)"/><path d="M0 84 C30 70 50 92 80 66 S130 40 160 54 S220 20 280 26" fill="none" stroke="var(--ac)" stroke-width="2.5"/></svg></div>';
  }
  lt.innerHTML = page(false); dk.innerHTML = page(true);
  // 그라디언트 id가 페이지 안에서 겹치지 않게 바꿉니다
  var uid = 'u219' + Math.random().toString(36).slice(2, 7);
  [lt, dk].forEach(function (pg, i) { var g = pg.querySelector('linearGradient'); g.id = uid + i; pg.querySelector('path').setAttribute('fill', 'url(#' + uid + i + ')'); });
  var on = false, T = [lt.querySelector('.u219-tg'), dk.querySelector('.u219-tg')];
  function sync() {
    root.classList.toggle('is-on', on); dk.setAttribute('aria-hidden', !on); lt.setAttribute('aria-hidden', on);
    T[0].tabIndex = on ? -1 : 0; T[1].tabIndex = on ? 0 : -1;
    T.forEach(function (t) { t.setAttribute('aria-label', on ? 'Switch to light mode' : 'Switch to dark mode'); t.setAttribute('aria-pressed', on); });
  }
  T.forEach(function (t) {
    t.addEventListener('click', function () {
      // 원의 중심 = 누른 버튼의 가운데
      var r = root.getBoundingClientRect(), b = t.getBoundingClientRect(), k = root.offsetWidth / (r.width || 1);
      root.style.setProperty('--cx', ((b.left + b.width / 2 - r.left) * k).toFixed(0) + 'px'); root.style.setProperty('--cy', ((b.top + b.height / 2 - r.top) * k).toFixed(0) + 'px');
      on = !on; sync(); (on ? T[1] : T[0]).focus({ preventScroll: true });
    });
  });
  sync();
})();
  })();

  scope.ready();
  return scope.controller;
}
