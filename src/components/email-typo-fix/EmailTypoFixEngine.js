// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountEmailTypoFix(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u264">
  <div class="u264-in-w">
    <h3>Create account</h3>
    <label>Email</label>
    <div class="u264-fd"><input class="u264-in" type="email" aria-label="Email" autocomplete="off" spellcheck="false" placeholder="you@example.com"><svg class="u264-ck" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10"/><path d="M6 10.3l2.6 2.6L14 7.5"/></svg></div>
    <div class="u264-dms" role="group" aria-label="Suggested domains"></div>
    <button type="button" class="u264-fx" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5L15 14H1z" fill="currentColor"/><path d="M8 6v3.5M8 11.6v.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg><span>Did you mean <b class="u264-sg"></b>?</span></button>
  </div>
  <div class="u264-ft"><small>We’ll send you a sign-in link</small><button type="button" class="u264-go" disabled>Continue</button></div>
</div>
`,
      css: `

.u264{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u264-in-w{position:absolute;left:22px;right:22px;top:30px}
.u264 h3{margin:0;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u264 label{display:block;margin-top:22px;font-size:11px;font-weight:800;color:var(--ux-ink-2)}
.u264-fd{position:relative;margin-top:6px}
.u264-in{width:100%;height:46px;padding:0 40px 0 14px;border:0;border-radius:13px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1.5px var(--ux-line);color:var(--ux-ink);font:inherit;font-size:13.5px;font-weight:700;outline:none;box-sizing:border-box;transition:box-shadow .2s}
.u264-in:focus{box-shadow:inset 0 0 0 2px var(--ux-accent)}
.u264.is-ok .u264-in{box-shadow:inset 0 0 0 2px #10B981}
.u264-ck{position:absolute;right:12px;top:13px;width:20px;height:20px}
.u264-ck circle{fill:#10B981;transform:scale(0);transform-origin:center;transform-box:fill-box;transition:transform .35s cubic-bezier(.3,1.7,.5,1)}
.u264-ck path{fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:14;stroke-dashoffset:14;transition:stroke-dashoffset .3s ease .2s}
.u264.is-ok .u264-ck circle{transform:none}
.u264.is-ok .u264-ck path{stroke-dashoffset:0}
.u264-dms{display:flex;gap:5px;flex-wrap:wrap;height:0;overflow:hidden;opacity:0;transition:height .3s cubic-bezier(.3,1,.4,1),opacity .2s,margin .3s}
.u264.is-at .u264-dms{height:30px;opacity:1;margin-top:8px}
.u264-dm{height:28px;padding:0 10px;border:0;border-radius:999px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);color:var(--ux-ink-2);font:inherit;font-size:11px;font-weight:800;cursor:pointer;transform:translateY(-6px);opacity:0;transition:transform .35s cubic-bezier(.3,1.5,.5,1),opacity .2s,background .2s}
.u264.is-at .u264-dm{transform:none;opacity:1}
.u264-dm:hover,.u264-dm.g-hov{background:var(--ux-accent-soft);color:var(--ux-accent)}
.u264-fx{display:flex;align-items:center;gap:7px;width:100%;margin-top:8px;padding:10px 12px;border:0;border-radius:12px;background:color-mix(in srgb,#F59E0B 13%,transparent);color:var(--ux-ink);font:inherit;font-size:12px;font-weight:700;text-align:left;cursor:pointer;transform-origin:50% 0;transform:translateY(-8px) scaleY(.6);opacity:0;pointer-events:none;transition:transform .35s cubic-bezier(.3,1.4,.5,1),opacity .2s}
.u264.is-typo .u264-fx{transform:none;opacity:1;pointer-events:auto}
.u264-fx svg{flex:none;width:16px;height:16px;color:#D97706}
.u264-fx b{font-weight:850}
.u264-fx mark{background:none;color:#D97706;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}
.u264-ft{position:absolute;left:22px;right:22px;bottom:24px}
.u264-ft small{display:block;margin-bottom:8px;font-size:10.5px;font-weight:650;color:var(--ux-ink-3);text-align:center}
.u264-go{width:100%;height:46px;border:0;border-radius:13px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:13px;font-weight:850;transition:opacity .25s}
.u264-go:disabled{opacity:.3}
.u264-in.is-fix{animation:u264-fx .5s ease}
@keyframes u264-fx{30%{background:color-mix(in srgb,#10B981 16%,transparent)}}
.u264 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u264-dms,.u264-dm,.u264-fx,.u264-ck circle,.u264-ck path{transition:none}.u264-in.is-fix{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u264');
  var inp = root.querySelector('.u264-in'), dms = root.querySelector('.u264-dms'), fx = root.querySelector('.u264-fx'), sg = root.querySelector('.u264-sg'), go = root.querySelector('.u264-go');
  var DOM = ['gmail.com', 'naver.com', 'kakao.com', 'icloud.com', 'outlook.com', 'hanmail.net', 'daum.net', 'yahoo.com', 'hotmail.com'];
  DOM.slice(0, 4).forEach(function (d) { var b = document.createElement('button'); b.type = 'button'; b.className = 'u264-dm'; b.textContent = '@' + d; b.addEventListener('click', function () { inp.value = inp.value.split('@')[0] + '@' + d; inp.focus({ preventScroll: true }); check(); }); dms.appendChild(b); });
  Array.prototype.forEach.call(dms.children, function (b, i) { b.style.transitionDelay = i * 0.04 + 's'; });
  // 두 글자 사이 편집 거리 (뒤바뀐 이웃 글자는 한 번으로 셉니다)
  function dist(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }
  var fixTo = '';
  function check() {
    var v = inp.value.trim(), at = v.indexOf('@'), dom = at >= 0 ? v.slice(at + 1).toLowerCase() : '';
    root.classList.toggle('is-at', at > 0 && !dom);
    var best = null;
    if (/\.[a-z]{2,}$/.test(dom) && DOM.indexOf(dom) < 0) DOM.forEach(function (d) { var k = dist(dom, d); if (k <= 2 && (!best || k < best[1])) best = [d, k]; });
    fixTo = best ? v.slice(0, at + 1) + best[0] : '';
    root.classList.toggle('is-typo', !!best); fx.tabIndex = best ? 0 : -1;
    if (best) {
      // 고칠 글자만 표시합니다
      sg.innerHTML = ''; var d = best[0], k = 0;
      while (k < d.length && d[k] === dom[k]) k++;
      var e = 0; while (e < d.length - k && d[d.length - 1 - e] === dom[dom.length - 1 - e]) e++;
      sg.appendChild(document.createTextNode(v.slice(0, at + 1) + d.slice(0, k))); var m = document.createElement('mark'); m.textContent = d.slice(k, d.length - e); sg.appendChild(m); sg.appendChild(document.createTextNode(d.slice(d.length - e)));
    }
    var ok = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) && !best;
    root.classList.toggle('is-ok', ok); go.disabled = !ok;
  }
  fx.addEventListener('click', function () { if (!fixTo) return; inp.value = fixTo; inp.classList.remove('is-fix'); void inp.offsetWidth; inp.classList.add('is-fix'); check(); inp.focus({ preventScroll: true }); });
  inp.addEventListener('input', check);
})();
  })();

  scope.ready();
  return scope.controller;
}
