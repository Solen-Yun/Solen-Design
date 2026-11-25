// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTestimonialColumns(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u207">
  <div class="u207-hd"><h3>Loved by teams</h3><p><i aria-hidden="true">★★★★★</i><b>4.9</b>2,341 reviews</p></div>
  <div class="u207-wl"></div>
</div>
`,
      css: `
.ux,.ux *,.ux *::before,.ux *::after{box-sizing:border-box}
.ux{
  font-family:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Segoe UI",Roboto,"Noto Sans KR",sans-serif;
  color:var(--ux-ink);-webkit-font-smoothing:antialiased;letter-spacing:-.01em;
  -webkit-tap-highlight-color:transparent;
  word-break:keep-all;overflow-wrap:break-word;
}
:where(.ux) :is(button,input,textarea,select){font:inherit;color:inherit}
:where(.ux) button{cursor:pointer}
.ux :focus-visible{outline:2px solid var(--ux-accent);outline-offset:3px}
.ux [hidden]{display:none!important}

@media (prefers-reduced-motion:reduce){
  .ux,.ux *,.ux *::before,.ux *::after{
    animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important;scroll-behavior:auto!important;
  }
}

.u207{position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72))}
body{display:grid;place-items:center}
.u207-hd{position:absolute;left:0;right:0;top:0;z-index:2;padding:26px 20px 10px;text-align:center}
.u207-hd h3{margin:0;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u207-hd p{display:inline-flex;align-items:center;gap:5px;margin:6px 0 0;font-size:11px;font-weight:800;color:var(--ux-ink-2)}
.u207-hd p b{font-size:13px;font-weight:900;color:var(--ux-ink)}
.u207-hd p i{font-style:normal;color:#F59E0B;letter-spacing:-1px}
.u207-wl{position:absolute;left:12px;right:12px;top:88px;bottom:0;display:grid;grid-template-columns:1fr 1fr;gap:9px;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 14%,#000 82%,transparent);mask-image:linear-gradient(transparent,#000 14%,#000 82%,transparent)}
.u207-co{position:relative;overflow:hidden}
.u207-tr{display:flex;flex-direction:column;gap:9px;animation:u207-up var(--t) linear infinite;animation-direction:var(--dir)}
.u207-co:hover .u207-tr,.u207-co.g-hov .u207-tr,.u207-co.is-hold .u207-tr{animation-play-state:paused}
.u207.is-off .u207-tr{animation-play-state:paused}
@keyframes u207-up{to{transform:translateY(calc(-50% - 4.5px))}}
.u207-cd{padding:12px 11px;border-radius:16px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);transition:transform .3s cubic-bezier(.3,1.4,.5,1),box-shadow .3s,background .3s}
.u207-cd.is-hl{transform:translateY(-3px) scale(1.02);background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 14px 26px -14px var(--ux-shadow-strong)}
.u207-cd i{display:block;font-style:normal;font-size:10px;color:#F59E0B;letter-spacing:-1px}
.u207-cd p{margin:5px 0 0;font-size:11px;line-height:1.5;font-weight:600;color:var(--ux-ink-2)}
.u207-cd mark{background:linear-gradient(transparent 55%,color-mix(in srgb,#FACC15 45%,transparent) 55%);color:var(--ux-ink);font-weight:750}
.u207-pp{display:flex;align-items:center;gap:7px;margin-top:9px}
.u207-av{flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:10px;font-weight:850}
.u207-pp b{display:block;font-size:10.5px;font-weight:850;color:var(--ux-ink)}
.u207-pp small{display:block;font-size:9px;font-weight:650;color:var(--ux-ink-3)}
@media (prefers-reduced-motion: reduce){.u207-tr{animation:none}.u207-wl{overflow-y:auto}.u207-co{overflow:visible}}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
    var root = document.querySelector('.u207');
    var wl = root.querySelector('.u207-wl');
    var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var R = [['Seoyun Kim', 'Startup founder', 'Since we adopted it, <mark>our meetings were cut in half.</mark> Everyone checks progress on their own.'], ['Junho Lee', 'Frontend developer', 'It barely needs setup. <mark>The whole team moved over in 10 minutes.</mark>'], ['Haeun Park', 'Marketer', 'Seeing every campaign date on one screen means <mark>nothing slips anymore.</mark>'], ['Minjae Jung', 'Product designer', '<mark>Design reviews got so much faster.</mark> I love that comments sit right on the screen.'], ['Yuna Choi', 'Support lead', 'Inquiries sort themselves, so <mark>our reply time dropped 40%.</mark>'], ['Doyun Han', 'Solo founder', 'Even working alone, things stay organized <mark>as if I had a team.</mark> And the price is easy.'], ['Jia Yoon', 'HR manager', 'With onboarding as a template, new hires say <mark>their first week got easier.</mark>'], ['Taemin Oh', 'Data analyst', '<mark>No more building reports by hand every week.</mark> They pile up on their own.']];
    var AC = ['#6366F1', '#0EA5E9', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#14B8A6'];
    function card(i, dup) {
      var d = document.createElement('figure'); d.className = 'u207-cd'; d.style.margin = '0';
      if (dup) d.setAttribute('aria-hidden', 'true');
      d.innerHTML = '<i aria-hidden="true">★★★★★</i><p></p><figcaption class="u207-pp"><span class="u207-av" style="background:' + AC[i] + '" aria-hidden="true"></span><span><b></b><small></small></span></figcaption>';
      d.querySelector('p').innerHTML = R[i][2]; d.querySelector('.u207-av').textContent = R[i][0].charAt(0); d.querySelector('b').textContent = R[i][0]; d.querySelector('small').textContent = R[i][1];
      return d;
    }
    // 每列四张卡连排两次，滚过半程时画面复原，形成无缝循环
    [[0, 2, 4, 6], [1, 3, 5, 7]].forEach(function (ids, c) {
      var co = document.createElement('div'); co.className = 'u207-co';
      var tr = document.createElement('div'); tr.className = 'u207-tr';
      tr.style.setProperty('--t', c ? '30s' : '24s'); tr.style.setProperty('--dir', c ? 'reverse' : 'normal');
      [0, 1].forEach(function (rep) { ids.forEach(function (i) { tr.appendChild(card(i, rep === 1 && !rm)); }); });
      if (rm) Array.prototype.slice.call(tr.children, 4).forEach(function (n) { n.remove(); });
      co.appendChild(tr); wl.appendChild(co);
      co.addEventListener('focusin', function () { co.classList.add('is-hold'); }); co.addEventListener('focusout', function () { co.classList.remove('is-hold'); });
      // 悬停暂停的列里，抬起指针所在的卡片
      var hl = null;
      function mark(c) { if (hl === c) return; if (hl) hl.classList.remove('is-hl'); hl = c; if (c) c.classList.add('is-hl'); }
      co.addEventListener('pointermove', function (e) { var y = e.clientY; mark(Array.prototype.filter.call(tr.children, function (c) { var r = c.getBoundingClientRect(); return y >= r.top && y <= r.bottom; })[0] || null); });
      co.addEventListener('pointerleave', function () { mark(null); });
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { root.classList.toggle('is-off', !es[0].isIntersecting); }).observe(root);
  })();

  scope.ready();
  return scope.controller;
}
