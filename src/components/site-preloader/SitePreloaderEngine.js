// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountSitePreloader(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u256">
  <div class="u256-site">
    <div class="u256-nv" data-s style="--d:.15s"><b>Studio Nara</b><span><span>Work</span><span>About</span><span>Contact</span></span></div>
    <div class="u256-ph" data-s style="--d:.25s" aria-hidden="true"></div>
    <h3 class="u256-hd" data-s style="--d:.45s">We build spaces<br>and brands together</h3>
    <div class="u256-sb" data-s style="--d:.6s">Seoul · since 2016</div>
  </div>
  <div class="u256-ld" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100">
    <div class="u256-hf u256-a"></div><div class="u256-hf u256-b"></div>
    <div class="u256-bn">Studio Nara</div>
    <div class="u256-ct"><small>Loading work</small><div class="u256-n"><span>0</span><i>%</i></div><div class="u256-br"><i></i></div></div>
  </div>
  <button type="button" class="u256-re">Reload</button>
</div>
`,
      css: `

.u256{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:#F4F1EA;box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:#1C1A17}
.u256-site{position:absolute;inset:0;padding:18px}
.u256-nv{display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:800}
.u256-nv b{font-size:13px;font-weight:900;letter-spacing:-.02em}
.u256-nv span{display:flex;gap:12px;color:#5E5A52}
.u256-ph{position:absolute;left:18px;right:18px;top:52px;height:150px;border-radius:14px;overflow:hidden;background:linear-gradient(160deg,#D8C3A5,#8E7C68 60%,#4B4037)}
.u256-ph::before{content:"";position:absolute;left:18%;top:22%;width:40%;height:78%;background:linear-gradient(#EFE6D8,#CDBBA2);border-radius:80px 80px 0 0;box-shadow:60px 20px 0 -6px #B9A386}
.u256-ph::after{content:"";position:absolute;right:12%;top:16%;width:34px;height:34px;border-radius:50%;background:#F7EBD3;opacity:.9}
.u256-hd{position:absolute;left:18px;right:18px;top:214px;margin:0;font-size:26px;line-height:1.12;font-weight:900;letter-spacing:-.04em}
.u256-sb{position:absolute;left:18px;bottom:20px;font-size:10.5px;font-weight:700;color:#7A746A}
.u256-site [data-s]{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d)}
.u256-site .u256-ph[data-s]{transform:scale(1.08);clip-path:inset(12% 8% 12% 8% round 14px);transition:opacity .6s,transform 1.2s cubic-bezier(.2,.8,.2,1),clip-path 1.1s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d)}
.u256.is-open .u256-site [data-s]{opacity:1;transform:none;clip-path:inset(0 0 0 0 round 14px)}
.u256-ld{position:absolute;inset:0;z-index:2;pointer-events:none}
.u256-hf{position:absolute;left:0;right:0;height:50.5%;background:#1C1A17;transition:transform .9s cubic-bezier(.76,0,.24,1)}
.u256-hf.u256-a{top:0}
.u256-hf.u256-b{bottom:0}
.u256.is-open .u256-a{transform:translateY(-101%)}
.u256.is-open .u256-b{transform:translateY(101%)}
.u256-ct{position:absolute;left:20px;right:20px;bottom:26px;color:#F4F1EA;transition:opacity .3s}
.u256.is-open .u256-ct{opacity:0}
.u256-ct small{display:block;font-size:10.5px;font-weight:700;color:#A8A196}
.u256-n{font-size:74px;line-height:.9;font-weight:900;letter-spacing:-.05em;font-variant-numeric:tabular-nums}
.u256-n i{font-style:normal;font-size:24px;margin-left:2px;vertical-align:top}
.u256-br{margin-top:12px;height:2px;background:rgba(244,241,234,.18)}
.u256-br i{display:block;height:100%;width:0;background:#F4F1EA}
.u256-bn{position:absolute;left:20px;top:20px;color:#F4F1EA;font-size:13px;font-weight:900;transition:opacity .3s}
.u256.is-open .u256-bn{opacity:0}
.u256-re{position:absolute;right:14px;bottom:14px;z-index:3;border:0;padding:6px 11px;border-radius:999px;background:#1C1A17;color:#F4F1EA;font:inherit;font-size:10.5px;font-weight:800;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .3s .6s}
.u256.is-open .u256-re{opacity:1;pointer-events:auto}
.u256-re:focus-visible{outline:2px solid #1C1A17;outline-offset:2px}
.u256.is-snap *{transition:none!important}
@media (prefers-reduced-motion: reduce){.u256-hf,.u256-site [data-s]{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u256');
  var ld = root.querySelector('.u256-ld'), n = root.querySelector('.u256-n span'), bar = root.querySelector('.u256-br i'), re = root.querySelector('.u256-re');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches, t = 0;
  // 실제 로딩처럼 고르지 않게: 잠깐 멈추기도 하고 몇 칸씩 뛰기도 합니다
  function load() {
    clearTimeout(t);
    root.classList.add('is-snap'); root.classList.remove('is-open'); void root.offsetWidth; root.classList.remove('is-snap');
    var v = 0;
    if (rm) { set(100); root.classList.add('is-open'); return; }
    (function step() {
      if (!root.isConnected) return;
      v = Math.min(100, v + (Math.random() < 0.18 ? 0 : 2 + Math.floor(Math.random() * (v > 80 ? 4 : 9))));
      set(v);
      if (v < 100) t = setTimeout(step, Math.random() < 0.12 ? 260 : 45);
      else t = setTimeout(function () { root.classList.add('is-open'); }, 300);
    })();
  }
  function set(v) { n.textContent = v; bar.style.width = v + '%'; ld.setAttribute('aria-valuenow', v); }
  re.addEventListener('click', load);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { threshold: 0.4 });
    io.observe(root);
  } else load();
})();
  })();

  scope.ready();
  return scope.controller;
}
