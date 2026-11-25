// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDetailSidePanel(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u273">
  <div class="u273-hd">Customers</div>
  <ul class="u273-ls"></ul>
  <div class="u273-ov" aria-hidden="true"></div>
  <aside class="u273-pn" aria-hidden="true">
    <div class="u273-tb"><button type="button" class="u273-pv" aria-label="Previous customer"><svg viewBox="0 0 11 11" aria-hidden="true"><path d="M2 7l3.5-3.5L9 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button type="button" class="u273-nx" aria-label="Next customer"><svg viewBox="0 0 11 11" aria-hidden="true"><path d="M2 4l3.5 3.5L9 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span class="u273-ix"></span><button type="button" class="u273-x" aria-label="Close panel"><svg viewBox="0 0 11 11" aria-hidden="true"><path d="M2.5 2.5l6 6M8.5 2.5l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></div>
    <div class="u273-bd" aria-live="polite"></div>
  </aside>
</div>
`,
      css: `

.u273{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u273-hd{position:absolute;left:18px;top:18px;font-size:16px;font-weight:900;letter-spacing:-.03em}
.u273-ls{position:absolute;left:10px;right:10px;top:52px;bottom:10px;margin:0;padding:0;list-style:none}
.u273-rw{display:flex;align-items:center;gap:10px;width:100%;height:52px;padding:0 10px;border:0;border-radius:13px;background:none;color:var(--ux-ink);font:inherit;text-align:left;cursor:pointer;transition:background .2s,box-shadow .2s}
.u273-rw:hover,.u273-rw.g-hov{background:var(--ux-surface-2)}
.u273-rw.is-on{background:color-mix(in srgb,var(--ux-accent) 10%,transparent);box-shadow:inset 3px 0 0 var(--ux-accent)}
.u273-rw:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-2px}
.u273-av{flex:none;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:12px;font-weight:850}
.u273-rw div{flex:1;min-width:0}
.u273-rw b{display:block;font-size:12px;font-weight:850}
.u273-rw small{display:block;font-size:10px;font-weight:650;color:var(--ux-ink-3)}
.u273-rw em{flex:none;padding:2px 7px;border-radius:999px;background:var(--ux-surface-2);font-style:normal;font-size:9.5px;font-weight:850;color:var(--ux-ink-2)}
.u273-ov{position:absolute;inset:0;background:rgba(10,10,20,.12);opacity:0;pointer-events:none;transition:opacity .3s}
.u273.is-open .u273-ov{opacity:1;pointer-events:auto}
.u273-pn{position:absolute;top:8px;right:8px;bottom:8px;width:208px;display:flex;flex-direction:column;border-radius:22px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),-16px 0 40px -18px rgba(0,0,0,.35);transform:translateX(calc(100% + 16px));transition:transform .45s cubic-bezier(.3,1.1,.4,1);overflow:hidden}
.u273.is-open .u273-pn{transform:none}
.u273-tb{display:flex;align-items:center;gap:3px;padding:10px 10px 6px}
.u273-tb button{width:28px;height:28px;border:0;border-radius:8px;background:var(--ux-surface-2);color:var(--ux-ink-2);display:grid;place-items:center;cursor:pointer}
.u273-tb button:disabled{opacity:.35;cursor:default}
.u273-tb svg{width:11px;height:11px}
.u273-tb span{margin-right:auto;margin-left:6px;font-size:10px;font-weight:800;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u273-bd{position:relative;flex:1;overflow:hidden}
.u273-pg{position:absolute;inset:0;padding:6px 14px 14px;transition:transform .4s cubic-bezier(.3,1.1,.4,1),opacity .3s}
.u273-pg.is-in{transition:none}
.u273-pg .u273-av{width:44px;height:44px;font-size:16px}
.u273-pg h4{margin:10px 0 0;font-size:15px;font-weight:900}
.u273-pg>small{display:block;margin-top:1px;font-size:10.5px;font-weight:650;color:var(--ux-ink-3)}
.u273-kv{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px}
.u273-kv div{padding:8px 9px;border-radius:10px;background:var(--ux-surface-2)}
.u273-kv small{display:block;font-size:9px;font-weight:800;color:var(--ux-ink-3)}
.u273-kv b{display:block;margin-top:2px;font-size:12px;font-weight:900;font-variant-numeric:tabular-nums}
.u273-pg h5{margin:14px 0 6px;font-size:10px;font-weight:850;color:var(--ux-ink-3)}
.u273-ac{display:flex;align-items:center;gap:7px;margin-top:5px;font-size:10.5px;font-weight:700;color:var(--ux-ink-2)}
.u273-ac::before{content:"";flex:none;width:6px;height:6px;border-radius:50%;background:var(--ux-accent)}
.u273 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u273-pn,.u273-pg,.u273-ov{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u273');
  var ls = root.querySelector('.u273-ls'), pn = root.querySelector('.u273-pn'), bd = root.querySelector('.u273-bd'), ix = root.querySelector('.u273-ix'), pv = root.querySelector('.u273-pv'), nx = root.querySelector('.u273-nx'), x = root.querySelector('.u273-x'), ov = root.querySelector('.u273-ov');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [이름, 회사, 요금제, 누적 결제, 팀원 수]
  var C = [['Seoyeon Kim', 'Studio Moment', 'Pro', '$1,284', 3], ['Junho Lee', 'Plant Lab', 'Team', '$3,920', 12], ['Haeun Park', 'Daily Florist', 'Free', '$0', 0], ['Minjun Choi', 'Runway Coffee', 'Pro', '$642', 2], ['Yuna Jung', 'Notebook Club', 'Team', '$2,160', 7]];
  var COL = ['#EC4899', '#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6'];
  var ACT = ['Upgraded their plan', 'Invited 2 teammates', 'Changed payment method'];
  var R = C.map(function (c, i) {
    var li = document.createElement('li'), b = document.createElement('button'); b.type = 'button'; b.className = 'u273-rw';
    b.innerHTML = '<span class="u273-av" style="background:' + COL[i] + '"></span><div><b></b><small></small></div><em></em>';
    b.querySelector('.u273-av').textContent = c[0].charAt(0); b.querySelector('b').textContent = c[0]; b.querySelector('small').textContent = c[1]; b.querySelector('em').textContent = c[2];
    b.addEventListener('click', function () { show(i, 0); });
    li.appendChild(b); ls.appendChild(li); return b;
  });
  var cur = -1;
  function page(i) {
    var c = C[i], d = document.createElement('div'); d.className = 'u273-pg';
    d.innerHTML = '<span class="u273-av" style="background:' + COL[i] + '"></span><h4></h4><small></small><div class="u273-kv"><div><small></small><b></b></div><div><small></small><b></b></div></div><h5></h5>';
    d.querySelector('.u273-av').textContent = c[0].charAt(0); d.querySelector('h4').textContent = c[0]; d.querySelector('small').textContent = c[1] + ' · ' + c[2];
    var kv = d.querySelectorAll('.u273-kv div'); kv[0].querySelector('small').textContent = 'Lifetime value'; kv[0].querySelector('b').textContent = c[3]; kv[1].querySelector('small').textContent = 'Seats'; kv[1].querySelector('b').textContent = c[4] + '';
    d.querySelector('h5').textContent = 'Recent activity';
    ACT.forEach(function (a, k) { if ((i + k) % 3 === 2) return; var p = document.createElement('div'); p.className = 'u273-ac'; p.textContent = a; d.appendChild(p); });
    return d;
  }
  // 다음은 아래에서, 이전은 위에서 들어오게 갈아 끼웁니다
  function show(i, dir) {
    var open = root.classList.contains('is-open');
    if (i === cur && open) return;
    var old = bd.firstChild, nw = page(i);
    if (old && open && dir && !rm) {
      nw.classList.add('is-in'); nw.style.transform = 'translateY(' + (dir * 40) + 'px)'; nw.style.opacity = '0'; bd.appendChild(nw); void nw.offsetWidth;
      nw.classList.remove('is-in'); nw.style.transform = ''; nw.style.opacity = ''; old.style.transform = 'translateY(' + (-dir * 40) + 'px)'; old.style.opacity = '0';
      setTimeout(function () { old.remove(); }, 420);
    } else { bd.innerHTML = ''; bd.appendChild(nw); }
    cur = i;
    R.forEach(function (b, k) { b.classList.toggle('is-on', k === i); b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    ix.textContent = (i + 1) + ' of ' + C.length; pv.disabled = i === 0; nx.disabled = i === C.length - 1;
    root.classList.add('is-open'); pn.setAttribute('aria-hidden', 'false');
  }
  function close() { root.classList.remove('is-open'); pn.setAttribute('aria-hidden', 'true'); if (cur >= 0) R[cur].focus({ preventScroll: true }); }
  pv.addEventListener('click', function () { if (cur > 0) show(cur - 1, -1); });
  nx.addEventListener('click', function () { if (cur < C.length - 1) show(cur + 1, 1); });
  x.addEventListener('click', close); ov.addEventListener('click', close);
  root.addEventListener('keydown', function (e) {
    if (!root.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'j' || e.key === 'J') nx.click();
    if (e.key === 'k' || e.key === 'K') pv.click();
  });
})();
  })();

  scope.ready();
  return scope.controller;
}
