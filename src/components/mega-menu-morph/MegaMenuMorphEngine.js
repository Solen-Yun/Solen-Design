// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountMegaMenuMorph(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u354">
  <nav class="u354-nav" aria-label="Main menu"><button class="u354-tab" type="button" aria-expanded="false">Products</button><button class="u354-tab" type="button" aria-expanded="false">Developers</button><button class="u354-tab" type="button" aria-expanded="false">Company</button></nav>
  <span class="u354-car" aria-hidden="true"></span>
  <div class="u354-pn"><div class="u354-ct"></div></div>
</div>
`,
      css: `

.u354{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;padding:14px;border-radius:28px;background:linear-gradient(160deg,color-mix(in srgb,var(--ux-accent) 12%,var(--ux-surface)),var(--ux-surface) 60%);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u354-nav{position:relative;display:flex;justify-content:center;gap:2px;padding:4px;border-radius:999px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line)}
.u354-tab{height:36px;padding:0 14px;border:0;border-radius:999px;background:none;font-size:13.5px;font-weight:750;color:var(--ux-ink-2);transition:color .2s,background-color .2s}
.u354-tab[aria-expanded="true"]{color:var(--ux-ink);background:var(--ux-surface-2)}
.u354-pn{position:absolute;left:0;top:64px;width:var(--w,200px);height:var(--h,100px);border-radius:18px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 24px 40px -18px var(--ux-shadow-strong);transform:translateX(var(--x,70px));opacity:0;pointer-events:none;transition:transform .45s cubic-bezier(.3,1.1,.4,1),width .45s cubic-bezier(.3,1.1,.4,1),height .45s cubic-bezier(.3,1.1,.4,1),opacity .25s}
.u354.is-open .u354-pn{opacity:1;pointer-events:auto}
.u354.no-t .u354-pn{transition:opacity .25s}
.u354-car{position:absolute;top:58px;left:0;width:14px;height:14px;background:var(--ux-surface);box-shadow:-1px -1px 0 var(--ux-line);transform:translateX(var(--cx,100px)) rotate(45deg);border-radius:3px 0 0 0;opacity:0;transition:transform .45s cubic-bezier(.3,1.1,.4,1),opacity .25s;z-index:2}
.u354.is-open .u354-car{opacity:1}
.u354.no-t .u354-car{transition:opacity .25s}
.u354-ct{position:absolute;inset:0;overflow:hidden;border-radius:18px}
.u354-pg{position:absolute;left:0;top:0;padding:10px;display:grid;gap:2px;transition:transform .45s cubic-bezier(.3,1.1,.4,1),opacity .3s}
.u354-pg.l{transform:translateX(-40px);opacity:0}
.u354-pg.r{transform:translateX(40px);opacity:0}
.u354-it{display:flex;align-items:center;gap:10px;width:100%;padding:8px;border:0;border-radius:12px;background:none;text-align:left;white-space:nowrap}
.u354-it:hover{background:var(--ux-surface-2)}
.u354-it i{flex:none;width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--a),var(--b))}
.u354-it b{display:block;font-size:13.5px;font-weight:780}
.u354-it span{font-size:11.5px;font-weight:600;color:var(--ux-ink-3)}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u354');
  var tabs = Array.prototype.slice.call(root.querySelectorAll('.u354-tab')), pn = root.querySelector('.u354-pn'), ct = root.querySelector('.u354-ct'), nav = root.querySelector('.u354-nav');
  var MENU = [[['Payments', 'Online checkout in one line'], ['Settlement', 'Reconciled automatically every day'], ['Subscriptions', 'Recurring billing and invoices'], ['Analytics', 'Revenue flow at a glance']], [['Docs', 'Getting started and API'], ['Examples', 'Ready-to-use code'], ['Status', 'Live service status']], [['About', 'How we work'], ['Careers', 'Come work with us']]];
  var G = [['#748FFC', '#B197FC'], ['#38D9A9', '#4DABF7'], ['#FFA94D', '#F783AC'], ['#FFD43B', '#69DB7C']];
  var cur = -1, closeT = 0;
  var pages = MENU.map(function (items, mi) {
    var pg = document.createElement('div');
    pg.className = 'u354-pg r';
    items.forEach(function (it, k) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'u354-it'; b.tabIndex = -1;
      b.innerHTML = '<i style="--a:' + G[(k + mi) % 4][0] + ';--b:' + G[(k + mi) % 4][1] + '"></i><div><b></b><span></span></div>';
      b.querySelector('b').textContent = it[0]; b.querySelector('span').textContent = it[1];
      pg.appendChild(b);
    });
    ct.appendChild(pg);
    return pg;
  });
  // 판의 크기는 내용에 맞추고, 가운데는 메뉴 항목 아래에 오도록(카드 안을 넘지 않게) 놓습니다
  function open(i) {
    clearTimeout(closeT);
    if (i === cur) return;
    var wasOpen = cur >= 0, dir = i > cur ? 1 : -1;
    root.classList.toggle('no-t', !wasOpen);
    pages.forEach(function (pg, k) {
      pg.className = 'u354-pg' + (k === i ? '' : k < i ? ' l' : ' r');
      if (k === cur && k !== i) pg.className = 'u354-pg ' + (dir > 0 ? 'l' : 'r');
      Array.prototype.forEach.call(pg.children, function (b) { b.tabIndex = k === i ? 0 : -1; });
    });
    var pg = pages[i], w = pg.scrollWidth, h = pg.scrollHeight;
    var t = tabs[i], cx = nav.offsetLeft + t.offsetLeft + t.offsetWidth / 2;
    var x = Math.max(0, Math.min(root.clientWidth - 28 - w, cx - 14 - w / 2));
    root.style.setProperty('--w', w + 'px'); root.style.setProperty('--h', h + 'px');
    pn.style.setProperty('--w', w + 'px'); pn.style.setProperty('--h', h + 'px'); pn.style.setProperty('--x', (x + 14) + 'px');
    root.style.setProperty('--cx', (cx - 7) + 'px');
    pn.style.left = '0';
    root.querySelector('.u354-car').style.setProperty('--cx', (cx - 7) + 'px');
    tabs.forEach(function (tb, k) { tb.setAttribute('aria-expanded', String(k === i)); });
    cur = i;
    root.classList.add('is-open');
    if (!wasOpen) requestAnimationFrame(function () { root.classList.remove('no-t'); });
  }
  function close() {
    closeT = setTimeout(function () {
      root.classList.remove('is-open'); cur = -1;
      tabs.forEach(function (tb) { tb.setAttribute('aria-expanded', 'false'); });
    }, 220);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('pointerenter', function () { open(i); });
    t.addEventListener('click', function () { if (cur === i) close(); else open(i); });
  });
  root.addEventListener('pointerleave', close);
  pn.addEventListener('pointerenter', function () { clearTimeout(closeT); });
  root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cur >= 0) { var t = tabs[cur]; close(); t.focus(); } });
})();
  })();

  scope.ready();
  return scope.controller;
}
