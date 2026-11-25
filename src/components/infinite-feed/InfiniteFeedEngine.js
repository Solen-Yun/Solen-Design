// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountInfiniteFeed(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 350,
      responsive: false,
      markup: `
<div class="ux u384">
  <div class="u384-hd">Feed</div>
  <div class="u384-sc" tabindex="0" aria-label="Feed" aria-busy="false"><div class="u384-ls"></div><div class="u384-ld" aria-hidden="true"><i></i><i></i><i></i></div></div>
  <button class="u384-new" type="button" tabindex="-1"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 12V2M3 6l4-4 4 4"/></svg><span></span></button>
</div>
`,
      css: `

.u384{--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:350px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u384-hd{position:absolute;left:0;right:0;top:0;z-index:2;height:50px;display:flex;align-items:center;padding:0 18px;background:color-mix(in srgb,var(--ux-surface) 85%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 1px 0 var(--ux-line);font-size:17px;font-weight:850}
.u384-sc{position:absolute;inset:0;overflow-y:auto;padding:58px 14px 14px;scrollbar-width:none;outline:none}
.u384-sc::-webkit-scrollbar{display:none}
.u384-ls{display:grid;gap:10px}
.u384-c{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;background:var(--ux-surface-2)}
.u384-c.in{animation:u384-in .55s var(--ux-spring) both;animation-delay:var(--d)}
@keyframes u384-in{from{opacity:0;transform:translateY(24px) scale(.96)}}
.u384-c.fresh{animation:u384-in .55s var(--ux-spring) both,u384-glow 1.6s ease .3s}
@keyframes u384-glow{0%,100%{box-shadow:none}30%{box-shadow:0 0 0 2px var(--ux-accent),0 0 20px color-mix(in srgb,var(--ux-accent) 35%,transparent)}}
.u384-c i{flex:none;width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,var(--a),var(--b))}
.u384-c b{display:block;font-size:14px;font-weight:780}
.u384-c span{font-size:12px;font-weight:650;color:var(--ux-ink-3)}
.u384-ld{display:flex;justify-content:center;gap:6px;height:0;overflow:hidden;transition:height .3s}
.u384.is-load .u384-ld{height:44px;padding-top:16px}
.u384-ld i{width:9px;height:9px;border-radius:50%;background:var(--ux-ink-3);animation:u384-b .6s ease-in-out infinite alternate}
.u384-ld i:nth-child(2){animation-delay:.15s}
.u384-ld i:nth-child(3){animation-delay:.3s}
@keyframes u384-b{to{transform:translateY(-8px);background:var(--ux-accent)}}
.u384-new{position:absolute;left:50%;top:58px;z-index:3;height:34px;padding:0 14px 0 10px;border:0;border-radius:999px;display:flex;align-items:center;gap:6px;background:var(--ux-accent);color:var(--ux-accent-ink);font-size:12.5px;font-weight:800;box-shadow:0 10px 20px -8px var(--ux-shadow-strong);transform:translate(-50%,-120px);transition:transform .55s var(--ux-spring)}
.u384.has-new .u384-new{transform:translate(-50%,0)}
.u384-new svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u384');
  var sc = root.querySelector('.u384-sc'), ls = root.querySelector('.u384-ls'), nb = root.querySelector('.u384-new');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WORDS = ['Today’s sunset', 'A new bakery', 'Weekend hiking route', 'Cat update', 'What I’m reading', 'Rainy streets', 'First film photo', 'Homemade pasta', 'Han River bike ride', 'Tidying the studio', 'New sneakers', 'Morning walk'];
  var C = [['#FFC9C9', '#FFA8A8'], ['#D0EBFF', '#A5D8FF'], ['#D3F9D8', '#8CE99A'], ['#FFF3BF', '#FFD43B'], ['#E5DBFF', '#B197FC']];
  var n = 0, loading = false, pending = 0, loads = 0;
  function card(fresh, delay) {
    var i = n++, el = document.createElement('div');
    el.className = 'u384-c ' + (fresh ? 'fresh' : 'in');
    el.style.setProperty('--d', (delay || 0) + 'ms');
    var c = C[i % C.length];
    el.innerHTML = '<i style="--a:' + c[0] + ';--b:' + c[1] + '"></i><div><b></b><span></span></div>';
    el.querySelector('b').textContent = WORDS[i % WORDS.length];
    el.querySelector('span').textContent = (fresh ? 1 : 5 + i * 7) + ' min ago';
    return el;
  }
  function more() {
    if (loading) return;
    loading = true;
    root.classList.add('is-load'); sc.setAttribute('aria-busy', 'true');
    setTimeout(function () {
      if (!root.isConnected) return;
      for (var k = 0; k < 3; k++) ls.appendChild(card(false, rm ? 0 : k * 110));
      loading = false; loads += 1;
      root.classList.remove('is-load'); sc.setAttribute('aria-busy', 'false');
      // 두 번째로 불러온 뒤에는 위쪽에 새 글이 쌓였다고 알립니다
      if (loads === 2) setTimeout(function () { pending = 3; nb.querySelector('span').textContent = pending + ' new posts'; nb.tabIndex = 0; root.classList.add('has-new'); }, 600);
    }, rm ? 200 : 1000);
  }
  sc.addEventListener('scroll', function () { if (sc.scrollTop + sc.clientHeight > sc.scrollHeight - 30) more(); }, { passive: true });
  nb.addEventListener('click', function () {
    root.classList.remove('has-new'); nb.tabIndex = -1;
    sc.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' });
    setTimeout(function () {
      for (var k = 0; k < pending; k++) { var el = card(true); el.style.setProperty('--d', (k * 90) + 'ms'); ls.insertBefore(el, ls.children[k]); }
      pending = 0;
    }, rm ? 0 : 450);
  });
  for (var k = 0; k < 4; k++) ls.appendChild(card(false, k * 60));
})();
  })();

  scope.ready();
  return scope.controller;
}
