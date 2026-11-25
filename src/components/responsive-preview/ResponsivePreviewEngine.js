// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountResponsivePreview(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u257">
  <div class="u257-tb"><div class="u257-sg" role="group" aria-label="Device"></div><span class="u257-px" aria-live="polite"></span></div>
  <div class="u257-ru" aria-hidden="true"></div>
  <div class="u257-st"><div class="u257-fr"><div class="u257-pg"><div class="u257-nv"><b><i></i>Orbit</b><span>Features</span><span>Pricing</span><span>Contact</span><em class="u257-hb"></em></div><div class="u257-hr"><h4>A site that looks good anywhere</h4><span>Get started</span></div><div class="u257-gd"><i></i><i></i><i></i></div></div></div><span class="u257-hd" role="slider" tabindex="0" aria-label="Preview width" aria-valuemin="320" aria-valuemax="1440"></span></div>
</div>
`,
      css: `

.u257{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface-2);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u257-tb{position:absolute;left:14px;right:14px;top:14px;display:flex;align-items:center;gap:6px}
.u257-sg{display:flex;padding:3px;border-radius:11px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u257-dv{width:36px;height:28px;border:0;border-radius:8px;background:none;color:var(--ux-ink-3);display:grid;place-items:center;cursor:pointer;transition:background .2s,color .2s}
.u257-dv[aria-pressed="true"]{background:var(--ux-ink);color:var(--ux-surface)}
.u257-dv svg{width:15px;height:15px}
.u257-px{margin-left:auto;padding:4px 9px;border-radius:8px;background:var(--ux-surface);box-shadow:inset 0 0 0 1px var(--ux-line);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;font-weight:800;font-variant-numeric:tabular-nums}
.u257-ru{position:absolute;left:14px;right:14px;top:54px;height:16px}
.u257-ru i{position:absolute;top:0;height:16px;border-left:1.5px solid var(--ux-ink-3);font-style:normal;font-size:8.5px;font-weight:800;color:var(--ux-ink-3);padding-left:3px;line-height:10px;transition:color .2s,border-color .2s}
.u257-ru i.is-flash{animation:u257-fl .7s ease}
@keyframes u257-fl{30%{color:var(--ux-accent);border-color:var(--ux-accent);transform:scaleY(1.3)}}
.u257-st{position:absolute;left:14px;top:74px;bottom:14px;right:14px}
.u257-fr{position:relative;height:100%;border-radius:12px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 12px 24px -16px var(--ux-shadow-strong);overflow:hidden;container-type:inline-size;transition:width .5s cubic-bezier(.3,1.1,.4,1)}
.u257-fr.is-drag{transition:none}
.u257-hd{position:absolute;top:50%;width:14px;height:44px;margin:-22px 0 0 2px;border-radius:7px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 2px 6px -2px var(--ux-shadow-strong);cursor:ew-resize;touch-action:none;display:grid;place-items:center;transition:left .5s cubic-bezier(.3,1.1,.4,1)}
.u257-hd.is-drag{transition:none}
.u257-hd::before{content:"";width:4px;height:18px;border-left:1.5px solid var(--ux-ink-3);border-right:1.5px solid var(--ux-ink-3)}
.u257-hd:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u257-pg{padding:10px 12px}
.u257-nv{display:flex;align-items:center;gap:8px;font-size:9px;font-weight:800;color:var(--ux-ink-2)}
.u257-nv b{margin-right:auto;display:flex;align-items:center;gap:4px;font-size:10px;font-weight:900;color:var(--ux-ink)}
.u257-nv b i{width:10px;height:10px;border-radius:3px;background:var(--ux-grad)}
.u257-hb{display:none;width:20px;height:16px;border-radius:5px;background:var(--ux-surface-2);position:relative}
.u257-hb::before{content:"";position:absolute;left:5px;right:5px;top:5px;height:6px;border-top:1.5px solid var(--ux-ink-2);border-bottom:1.5px solid var(--ux-ink-2)}
.u257-hr{margin-top:14px}
.u257-hr h4{margin:0;font-size:17px;line-height:1.2;font-weight:900;letter-spacing:-.03em;transition:font-size .3s}
.u257-hr span{display:inline-block;margin-top:8px;padding:5px 10px;border-radius:999px;background:var(--ux-ink);color:var(--ux-surface);font-size:9px;font-weight:850}
.u257-gd{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px}
.u257-gd i{display:block;height:64px;border-radius:9px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);transition:height .3s}
.u257-gd i:nth-child(1){background:linear-gradient(135deg,#C7D2FE,#E0E7FF)}
.u257-gd i:nth-child(2){background:linear-gradient(135deg,#FBCFE8,#FCE7F3)}
.u257-gd i:nth-child(3){background:linear-gradient(135deg,#A7F3D0,#D1FAE5)}
@container (max-width:200px){.u257-gd{grid-template-columns:1fr 1fr}.u257-gd i:nth-child(3){grid-column:span 2;height:40px}.u257-nv>span{display:none}.u257-hb{display:block}}
@container (max-width:140px){.u257-gd{grid-template-columns:1fr}.u257-gd i{height:34px}.u257-gd i:nth-child(3){grid-column:auto;height:34px}.u257-hr h4{font-size:13px}}
.u257 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u257-fr,.u257-hd,.u257-hr h4,.u257-gd i{transition:none}.u257-ru i.is-flash{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u257');
  var sg = root.querySelector('.u257-sg'), px = root.querySelector('.u257-px'), ru = root.querySelector('.u257-ru'), st = root.querySelector('.u257-st'), fr = root.querySelector('.u257-fr'), hd = root.querySelector('.u257-hd');
  var DV = [['Desktop', 1280], ['Tablet', 768], ['Mobile', 390]];
  var IC = ['<rect x="1.5" y="2.5" width="12" height="8" rx="1.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 13.5h5M7.5 10.5v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>', '<rect x="3" y="1.5" width="9" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 11.5h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>', '<rect x="4.5" y="1.5" width="6" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.8 11.5h1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'];
  // 미리보기 상자 폭(실제 px)과 보여 주는 화면 폭(가상 px)을 잇습니다: 108px ↔ 320, 꽉 찬 폭 ↔ 1440
  var MIN = 320, MAX = 1440, W = 312 - 18, WMIN = 108, BP = [[640, 'sm'], [768, 'md'], [1024, 'lg'], [1280, 'xl']];
  function toPx(v) { return WMIN + (v - MIN) / (MAX - MIN) * (W - WMIN); }
  function toV(p) { return MIN + (p - WMIN) / (W - WMIN) * (MAX - MIN); }
  var B = DV.map(function (d, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u257-dv'; b.setAttribute('aria-label', d[0]); b.innerHTML = '<svg viewBox="0 0 15 15" aria-hidden="true">' + IC[i] + '</svg>'; b.addEventListener('click', function () { set(d[1]); }); sg.appendChild(b); return b; });
  var R = BP.map(function (b) { var t = document.createElement('i'); t.style.left = toPx(b[0]) + 'px'; t.textContent = b[1]; ru.appendChild(t); return t; });
  var v = 1280, zone = -1;
  function zoneOf(x) { var z = 0; BP.forEach(function (b, i) { if (x >= b[0]) z = i + 1; }); return z; }
  function set(nv) {
    v = Math.max(MIN, Math.min(MAX, Math.round(nv))); var p = toPx(v);
    fr.style.width = p + 'px'; hd.style.left = p + 'px';
    px.textContent = v + 'px'; hd.setAttribute('aria-valuenow', v);
    B.forEach(function (b, i) { b.setAttribute('aria-pressed', DV[i][1] === v); });
    // 중단점을 지나면 눈금자 표시를 반짝입니다
    var z = zoneOf(v);
    if (zone >= 0 && z !== zone) { var t = R[Math.min(z, zone)]; if (t) { t.classList.remove('is-flash'); void t.offsetWidth; t.classList.add('is-flash'); } }
    zone = z;
  }
  var drag = null;
  hd.addEventListener('pointerdown', function (e) { var r = st.getBoundingClientRect(); drag = { k: st.offsetWidth / r.width, left: r.left }; fr.classList.add('is-drag'); hd.classList.add('is-drag'); try { hd.setPointerCapture(e.pointerId); } catch (er) {} });
  hd.addEventListener('pointermove', function (e) { if (!drag) return; set(toV((e.clientX - drag.left) * drag.k)); });
  function up() { drag = null; fr.classList.remove('is-drag'); hd.classList.remove('is-drag'); }
  hd.addEventListener('pointerup', up); hd.addEventListener('pointercancel', up);
  hd.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 40 : e.key === 'ArrowLeft' ? -40 : 0; if (d) { e.preventDefault(); set(v + d); } });
  set(1280);
})();
  })();

  scope.ready();
  return scope.controller;
}
