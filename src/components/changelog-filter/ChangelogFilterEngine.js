// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountChangelogFilter(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u271">
  <div class="u271-hd"><h3>What's new</h3><p>A new version ships every Tuesday</p><div class="u271-cs" role="radiogroup" aria-label="Update type"><span class="u271-pl" aria-hidden="true"></span></div></div>
  <div class="u271-sc" tabindex="0" aria-label="Update list"><div class="u271-tl"></div></div>
</div>
`,
      css: `

.u271{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u271-hd{position:absolute;left:0;right:0;top:0;z-index:2;padding:24px 18px 12px;background:linear-gradient(var(--ux-surface) 82%,transparent)}
.u271-hd h3{margin:0;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u271-hd p{margin:3px 0 0;font-size:10.5px;font-weight:650;color:var(--ux-ink-3)}
.u271-cs{position:relative;display:flex;gap:2px;margin-top:14px;padding:3px;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u271-pl{position:absolute;top:3px;bottom:3px;left:3px;width:calc((100% - 12px) / 4);border-radius:999px;background:var(--ux-surface);box-shadow:0 2px 6px -2px var(--ux-shadow-strong),0 0 0 1px var(--ux-line);transition:transform .4s cubic-bezier(.3,1.3,.5,1)}
.u271-ch{position:relative;flex:1;height:28px;border:0;border-radius:999px;background:none;color:var(--ux-ink-3);font:inherit;font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap;transition:color .25s;display:inline-flex;align-items:center;justify-content:center;gap:4px}
.u271-ch.is-on{color:var(--ux-ink)}
.u271-ch:focus-visible{outline:2px solid var(--ux-accent);outline-offset:1px}
.u271-ch i{font-style:normal;font-size:9px;font-weight:850;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u271-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;padding:128px 16px 24px 10px}
.u271-sc::-webkit-scrollbar{display:none}
.u271-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:32px}
.u271-tl{position:relative}
.u271-tl::before{content:"";position:absolute;left:15px;top:12px;bottom:6px;width:2px;border-radius:1px;background:var(--ux-line)}
.u271-en{display:grid;grid-template-rows:1fr;opacity:1;transition:grid-template-rows .45s cubic-bezier(.3,.8,.3,1),opacity .3s,transform .45s cubic-bezier(.3,.8,.3,1)}
.u271-en.is-off{grid-template-rows:0fr;opacity:0;transform:translateX(10px)}
.u271-en>div{min-height:0;overflow:hidden}
/* 점과 퍼지는 고리가 접히는 상자 가장자리에 잘리지 않도록 안쪽 여백을 둡니다 */
.u271-in{position:relative;padding:6px 0 10px 32px}
.u271-dt{position:absolute;left:10px;top:10px;width:12px;height:12px;border-radius:50%;background:var(--ux-surface);box-shadow:inset 0 0 0 2px var(--c)}
.u271-dt.is-new{background:var(--c)}
.u271-dt.is-new::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--c);animation:u271-p 1.8s ease-out infinite}
@keyframes u271-p{from{transform:scale(.6);opacity:.9}to{transform:scale(1.5);opacity:0}}
.u271-mt{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:800;color:var(--ux-ink-3)}
.u271-mt b{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;color:var(--ux-ink-2)}
.u271-tg{padding:2px 7px;border-radius:999px;background:color-mix(in srgb,var(--c) 14%,transparent);color:var(--c);font-size:9.5px;font-weight:850}
.u271-nw{margin-left:auto;padding:2px 6px;border-radius:5px;background:var(--ux-ink);color:var(--ux-surface);font-size:9px;font-weight:850}
.u271-in h4{margin:6px 0 0;font-size:13.5px;font-weight:850;letter-spacing:-.02em;line-height:1.3}
.u271-in p{margin:4px 0 0;font-size:11px;line-height:1.5;font-weight:600;color:var(--ux-ink-2)}
.u271-im{position:relative;height:74px;margin-top:9px;border-radius:12px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--ux-line)}
.u271-im.k1{background:linear-gradient(135deg,#EEF2FF,#FAE8FF)}
.u271-im.k2{background:linear-gradient(135deg,#1E1B4B,#0F172A)}
.u271-im i{position:absolute;left:12px;height:7px;border-radius:4px}
.u271-im.k1 i{background:#A5B4FC}.u271-im.k2 i{background:#475569}
.u271-im i:nth-child(1){top:14px;width:46%}.u271-im i:nth-child(2){top:28px;width:70%;opacity:.7}.u271-im i:nth-child(3){top:42px;width:58%;opacity:.7}
.u271-im em{position:absolute;right:12px;bottom:10px;width:34px;height:34px;border-radius:10px;background:var(--ux-grad)}
@media (prefers-reduced-motion: reduce){.u271-en,.u271-pl{transition:none}.u271-dt.is-new::after{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u271');
  var cs = root.querySelector('.u271-cs'), pl = root.querySelector('.u271-pl'), tl = root.querySelector('.u271-tl');
  var CH = ['All', 'New', 'Improved', 'Fixed'], CC = ['', '#7C3AED', '#2563EB', '#EA580C'];
  // [종류, 버전, 날짜, 제목, 설명, 그림]
  var E = [[1, 'v3.2', 'Oct 14', 'AI now summarizes meeting notes', 'When a meeting ends, decisions and to-dos are boiled down to three lines.', 1], [3, 'v3.1.2', 'Oct 9', 'Cursor jumping while typing Korean', 'Fixed final consonants being typed twice.'], [2, 'v3.1', 'Oct 2', 'Search is twice as fast', 'Results show up instantly even for teams with thousands of docs.'], [1, 'v3.0', 'Sep 24', 'Dark mode', 'Turn it on in Settings › Display. It can follow your system, too.', 2], [3, 'v2.9.4', 'Sep 18', 'Duplicate notifications', 'Removed the double alerts that appeared when reopening the mobile app.'], [2, 'v2.9', 'Sep 10', 'Shared link previews', 'Paste a link and its title and thumbnail appear with it.']];
  var B = CH.map(function (c, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u271-ch'; b.setAttribute('role', 'radio');
    var n = i ? E.filter(function (e) { return e[0] === i; }).length : E.length;
    b.innerHTML = '<span></span><i>' + n + '</i>'; b.firstChild.textContent = c;
    b.addEventListener('click', function () { pick(i); });
    b.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); var k = (i + d + CH.length) % CH.length; pick(k); B[k].focus(); } });
    cs.appendChild(b); return b;
  });
  var R = E.map(function (e, i) {
    var w = document.createElement('div'); w.className = 'u271-en';
    w.innerHTML = '<div><div class="u271-in" style="--c:' + CC[e[0]] + '"><span class="u271-dt' + (i ? '' : ' is-new') + '"></span><div class="u271-mt"><b></b><span></span><span class="u271-tg"></span></div><h4></h4><p></p>' + (e[5] ? '<div class="u271-im k' + e[5] + '" aria-hidden="true"><i></i><i></i><i></i><em></em></div>' : '') + '</div></div>';
    var mt = w.querySelector('.u271-mt');
    mt.children[0].textContent = e[1]; mt.children[1].textContent = '· ' + e[2]; mt.children[2].textContent = CH[e[0]];
    if (!i) { var nw = document.createElement('span'); nw.className = 'u271-nw'; nw.textContent = 'New'; mt.appendChild(nw); }
    w.querySelector('h4').textContent = e[3]; w.querySelector('p').textContent = e[4];
    tl.appendChild(w); return w;
  });
  var cur = -1;
  // 칩 폭이 모두 같아서 알약은 (자기 폭 + 간격) × 순번만큼만 옮기면 됩니다
  function pill() { pl.style.transform = 'translateX(calc(' + cur * 100 + '% + ' + cur * 2 + 'px))'; }
  function pick(i) {
    if (i === cur) return;
    cur = i;
    B.forEach(function (b, k) { b.classList.toggle('is-on', k === i); b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; });
    pill();
    // 걸러진 소식은 높이를 0으로 접어 아래 소식이 자연스럽게 올라오게 합니다
    R.forEach(function (w, k) { var off = i && E[k][0] !== i; w.classList.toggle('is-off', off); w.setAttribute('aria-hidden', off); });
  }
  pick(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
