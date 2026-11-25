// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountCollapsingLargeTitle(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 500,
      responsive: false,
      markup: `
<div class="ux u332">
  <div class="u332-bar"><span class="u332-st" aria-hidden="true">Inbox</span><button class="u332-ed" type="button">Edit</button></div>
  <div class="u332-sc" tabindex="0" aria-label="Inbox list">
    <h3 class="u332-lt">Inbox</h3>
    <div class="u332-sw"><label class="u332-se"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><input type="search" placeholder="Search mail" aria-label="Search mail"></label></div>
    <ul class="u332-ul"></ul>
  </div>
</div>
`,
      css: `

.u332{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:500px;border-radius:36px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u332-bar{position:absolute;left:0;right:0;top:0;z-index:2;height:54px;display:flex;align-items:center;justify-content:center;transition:background-color .25s,box-shadow .25s}
.u332.is-stuck .u332-bar{background:color-mix(in srgb,var(--ux-surface) 78%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 1px 0 var(--ux-line)}
.u332-st{font-size:15.5px;font-weight:800;opacity:var(--so,0);transform:translateY(calc((1 - var(--so,0)) * 8px))}
.u332-ed{position:absolute;right:18px;top:17px;border:0;background:none;padding:0;font-size:14.5px;font-weight:650;color:var(--ux-accent)}
.u332-sc{position:absolute;inset:0;overflow-y:auto;padding-top:54px;scrollbar-width:none;outline:none}
.u332-sc::-webkit-scrollbar{display:none}
.u332-lt{margin:0;padding:0 18px;font-size:32px;font-weight:880;letter-spacing:-.04em;transform-origin:0 100%;transform:scale(var(--ls,1));opacity:var(--lo,1)}
.u332-sw{height:var(--sh,46px);margin:0 16px;overflow:hidden}
.u332-se{display:flex;align-items:center;gap:8px;height:38px;margin-top:8px;padding:0 12px;border-radius:12px;background:var(--ux-surface-2);opacity:var(--sop,1);transform:scaleY(var(--ssy,1));transform-origin:50% 0}
.u332-se svg{width:16px;height:16px;fill:none;stroke:var(--ux-ink-3);stroke-width:2;stroke-linecap:round}
.u332-se input{flex:1;min-width:0;border:0;background:none;outline:none;font-size:14.5px;color:var(--ux-ink)}
.u332-ul{margin:8px 0 0;padding:0 0 30px;list-style:none}
.u332-li{display:flex;gap:12px;padding:12px 18px;border-bottom:1px solid var(--ux-line)}
.u332-li i{flex:none;width:9px;height:9px;margin-top:6px;border-radius:50%;background:var(--ux-accent)}
.u332-li:nth-child(n+4) i{background:transparent}
.u332-li div{flex:1;min-width:0}
.u332-li b{display:flex;justify-content:space-between;font-size:14px;font-weight:800}
.u332-li b span{font-size:11.5px;font-weight:650;color:var(--ux-ink-3)}
.u332-li p{margin:2px 0 0;font-size:13px;color:var(--ux-ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u332');
  var sc = root.querySelector('.u332-sc'), ul = root.querySelector('.u332-ul');
  var MAIL = [['Design team', 'Sharing the Friday review deck', '9:12 AM'], ['Bank alerts', 'This month’s card statement', '8:40 AM'], ['Jiyun', 'Free this weekend?', 'Yesterday'], ['Bookstore', 'Your book order has shipped', 'Yesterday'], ['Minho', 'I tidied up the minutes', 'Tuesday'], ['Yoga studio', 'Next week’s class schedule', 'Tuesday'], ['Sua', 'Sending the photos!', 'Monday'], ['Airline', 'Your boarding pass is ready', 'Monday'], ['Newsletter', '5 reads for this week', 'Sunday']];
  MAIL.forEach(function (m) {
    var li = document.createElement('li');
    li.className = 'u332-li';
    li.innerHTML = '<i aria-hidden="true"></i><div><b><em></em><span></span></b><p></p></div>';
    li.querySelector('em').textContent = m[0]; li.querySelector('em').style.fontStyle = 'normal';
    li.querySelector('b span').textContent = m[2];
    li.querySelector('p').textContent = m[1];
    ul.appendChild(li);
  });
  var raf = 0;
  // 0~46px: 검색창이 눌리듯 접히고, 그동안 큰 제목이 막대 밑으로 들어가 사라진 뒤 작은 제목이 나타납니다
  function draw() {
    raf = 0;
    var y = sc.scrollTop;
    var s = Math.max(0, Math.min(1, y / 46));
    root.style.setProperty('--sh', (46 * (1 - s)).toFixed(1) + 'px');
    root.style.setProperty('--sop', (1 - s * 1.6).toFixed(2));
    root.style.setProperty('--ssy', (1 - s * 0.5).toFixed(2));
    // 큰 제목이 막대 밑으로 들어가며 완전히 사라진 뒤에야 작은 제목이 나타나, 두 제목이 겹쳐 보이지 않습니다
    var t = Math.max(0, Math.min(1, (y - 2) / 22));
    root.style.setProperty('--lo', (1 - t).toFixed(2));
    root.style.setProperty('--so', Math.max(0, Math.min(1, (y - 26) / 18)).toFixed(2));
    root.style.setProperty('--ls', y < 0 ? (1 + Math.min(0.12, -y / 400)).toFixed(3) : (1 - Math.min(0.08, y / 300)).toFixed(3));
    root.classList.toggle('is-stuck', y > 20);
  }
  sc.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
})();
  })();

  scope.ready();
  return scope.controller;
}
