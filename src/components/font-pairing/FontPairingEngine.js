// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountFontPairing(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u303">
  <div class="u303-ps" role="radiogroup" aria-label="Font pairing"></div>
  <div class="u303-sr" role="radiogroup"><span>Scale ratio</span></div>
  <div class="u303-pv"><div class="u303-tx"><h3>Big stories from small shops</h3><h4>A neighborhood bakery goes online</h4><p>The bread we bake every morning now comes to your door. Order by 9 PM the night before.</p></div><div class="u303-rl" aria-hidden="true"></div></div>
  <div class="u303-ft"><code class="u303-cs"></code><button type="button" class="u303-cp">Copy CSS</button></div>
</div>
`,
      css: `

.u303{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);--hf:system-ui,sans-serif;--hw:800;--bf:system-ui,sans-serif;--r:1.25}
.u303-ps{position:absolute;left:12px;right:12px;top:12px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.u303-pr{display:flex;flex-direction:column;align-items:center;gap:1px;height:50px;justify-content:center;border:0;border-radius:12px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:9.5px;font-weight:800;cursor:pointer;transition:box-shadow .2s,background .2s}
.u303-pr b{font-size:17px;line-height:1.1;color:var(--ux-ink)}
.u303-pr[aria-checked="true"]{background:var(--ux-surface);box-shadow:inset 0 0 0 2px var(--ux-ink)}
.u303-sr{position:absolute;left:12px;right:12px;top:70px;display:flex;align-items:center;gap:4px;font-size:10px;font-weight:800;color:var(--ux-ink-3)}
.u303-sr>span{margin-right:auto}
.u303-sc{height:24px;padding:0 8px;border:0;border-radius:7px;background:none;color:var(--ux-ink-3);font:inherit;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;font-weight:800;cursor:pointer}
.u303-sc[aria-checked="true"]{background:var(--ux-ink);color:var(--ux-surface)}
.u303-pv{position:absolute;left:12px;right:12px;top:102px;bottom:56px;display:flex;gap:10px;padding:14px;border-radius:16px;background:var(--ux-surface-2);overflow:hidden}
.u303-tx{flex:1;min-width:0;transition:filter .2s,opacity .2s}
.u303-tx.is-sw{filter:blur(4px);opacity:.3}
.u303-tx h3{margin:0;font-family:var(--hf);font-weight:var(--hw);font-size:calc(11.5px * var(--r) * var(--r) * var(--r));line-height:1.15;letter-spacing:-.02em;transition:font-size .45s cubic-bezier(.3,1.1,.4,1)}
.u303-tx h4{margin:10px 0 0;font-family:var(--hf);font-weight:var(--hw);font-size:calc(11.5px * var(--r));line-height:1.25;color:var(--ux-ink-2);transition:font-size .45s cubic-bezier(.3,1.1,.4,1)}
.u303-tx p{margin:6px 0 0;font-family:var(--bf);font-size:11.5px;line-height:1.55;font-weight:500;color:var(--ux-ink-2)}
.u303-rl{flex:none;width:44px;display:flex;flex-direction:column;justify-content:flex-start;gap:6px;padding-left:8px;border-left:1px dashed var(--ux-line);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;font-weight:800;color:var(--ux-ink-3)}
.u303-rl span{display:flex;align-items:center;gap:4px}
.u303-rl span i{display:block;height:3px;border-radius:2px;background:var(--ux-accent);transition:width .45s cubic-bezier(.3,1.1,.4,1)}
.u303-ft{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;gap:8px}
.u303-ft code{flex:1;min-width:0;padding:9px 10px;border-radius:10px;background:var(--ux-surface-2);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;color:var(--ux-ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u303-cp{flex:none;height:34px;padding:0 12px;border:0;border-radius:10px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:11px;font-weight:850;cursor:pointer;transition:background .3s}
.u303-cp.is-ok{background:#059669}
.u303 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u303-tx,.u303-tx h3,.u303-tx h4,.u303-rl span i{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u303');
  var ps = root.querySelector('.u303-ps'), sr = root.querySelector('.u303-sr'), tx = root.querySelector('.u303-tx'), rl = root.querySelector('.u303-rl'), cs = root.querySelector('.u303-cs'), cp = root.querySelector('.u303-cp');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [이름, 제목 글꼴, 제목 굵기, 본문 글꼴]
  var PR = [['Modern', 'system-ui,sans-serif', 800, 'system-ui,sans-serif'], ['Editorial', 'Georgia,serif', 700, 'system-ui,sans-serif'], ['Tech', 'ui-monospace,Menlo,monospace', 700, 'system-ui,sans-serif'], ['Classic', 'Georgia,serif', 700, 'Georgia,serif']];
  var SC = [1.125, 1.25, 1.333, 1.5], pr = 0, sc = 1, BASE = 16;
  var P = PR.map(function (p, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u303-pr'; b.setAttribute('role', 'radio'); b.innerHTML = '<b>Aa</b><span></span>'; b.firstChild.style.fontFamily = p[1]; b.firstChild.style.fontWeight = p[2]; b.lastChild.textContent = p[0]; b.addEventListener('click', function () { setPr(i); }); ps.appendChild(b); return b; });
  var S = SC.map(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u303-sc'; b.setAttribute('role', 'radio'); b.textContent = s; b.addEventListener('click', function () { sc = i; sync(); }); sr.appendChild(b); return b; });
  var R = ['h1', 'h2', 'p'].map(function (n) { var s = document.createElement('span'); s.innerHTML = '<i></i><em style="font-style:normal"></em>'; rl.appendChild(s); return s; });
  function sync() {
    var r = SC[sc], p = PR[pr];
    root.style.setProperty('--r', r); root.style.setProperty('--hf', p[1]); root.style.setProperty('--hw', p[2]); root.style.setProperty('--bf', p[3]);
    P.forEach(function (b, i) { b.setAttribute('aria-checked', i === pr); }); S.forEach(function (b, i) { b.setAttribute('aria-checked', i === sc); });
    // 오른쪽 눈금: 단계별 실제 크기(px)를 막대 길이와 숫자로 보여 줍니다
    [Math.pow(r, 3), r, 1].forEach(function (k, i) { var px = Math.round(BASE * k); R[i].querySelector('i').style.width = Math.min(28, px * .6) + 'px'; R[i].querySelector('em').textContent = px; });
    cs.textContent = '--font-head:' + p[1].split(',')[0] + '; --scale:' + r + ';';
  }
  function setPr(i) {
    if (i === pr) return; pr = i;
    if (rm) { sync(); return; }
    // 글꼴이 바뀔 때는 잠깐 흐려졌다가 새 글꼴로 또렷해집니다
    tx.classList.add('is-sw'); setTimeout(function () { sync(); tx.classList.remove('is-sw'); }, 190);
  }
  var T = 0;
  cp.addEventListener('click', function () {
    var p = PR[pr], css = ':root {\n  --font-head: ' + p[1] + ';\n  --font-body: ' + p[3] + ';\n  --scale: ' + SC[sc] + ';\n}';
    try { navigator.clipboard && navigator.clipboard.writeText(css).catch(function () {}); } catch (e) {}
    cp.classList.add('is-ok'); cp.textContent = 'Copied'; clearTimeout(T); T = setTimeout(function () { cp.classList.remove('is-ok'); cp.textContent = 'Copy CSS'; }, 1500);
  });
  sync();
})();
  })();

  scope.ready();
  return scope.controller;
}
