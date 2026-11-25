// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountBlurInQuote(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 330,
      responsive: false,
      markup: `
<div class="ux u388">
  <span class="u388-qm" aria-hidden="true">&ldquo;</span>
  <div class="u388-st"><blockquote class="u388-q in" aria-live="polite"></blockquote><div class="u388-by"></div></div>
  <div class="u388-ft">
    <div class="u388-dots" role="group" aria-label="Pick a quote"></div>
    <button class="u388-pv" type="button" aria-label="Previous quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
    <button class="u388-nx" type="button" aria-label="Next quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
</div>
`,
      css: `

.u388{--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:330px;display:flex;flex-direction:column;padding:22px 22px 16px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden}
.u388-qm{position:absolute;right:16px;top:-6px;font:900 120px/1 Georgia,serif;color:var(--ux-accent-soft);pointer-events:none}
.u388-st{position:relative;flex:1}
.u388-q{position:absolute;left:0;right:0;top:4px;margin:0;font-size:22px;line-height:1.42;font-weight:780;letter-spacing:-.035em;color:var(--ux-ink)}
.u388-w{display:inline-block;filter:blur(10px);opacity:0;transform:translateY(-10px) scale(1.12);transition:filter .7s var(--ux-ease),opacity .6s var(--ux-ease),transform .9s var(--ux-spring);transition-delay:calc(var(--i) * 55ms)}
.u388-q.in .u388-w{filter:none;opacity:1;transform:none}
.u388-q.out .u388-w{filter:blur(8px);opacity:0;transform:translate(var(--dx),8px) scale(.92);transition-duration:.45s;transition-delay:calc(var(--r) * 1ms)}
.u388-by{position:absolute;left:0;bottom:0;display:flex;align-items:center;gap:10px;overflow:hidden;height:44px}
.u388-by>div{transition:transform .6s var(--ux-spring),opacity .4s}
.u388-by.swap>div{transform:translateY(100%);opacity:0;transition:none}
.u388-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--a1),var(--a2))}
.u388-by b{display:block;font-size:14px;font-weight:800}
.u388-role{font-size:12px;font-weight:650;color:var(--ux-ink-3)}
.u388-ft{display:flex;align-items:center;gap:8px;margin-top:14px}
.u388-dots{display:flex;gap:2px;flex:1}
.u388-dot{position:relative;flex:1;height:22px;border:0;background:none;padding:0}
.u388-dot::before{content:"";position:absolute;left:0;right:0;top:9px;height:4px;border-radius:4px;background:var(--ux-line-2)}
.u388-dot i{position:absolute;left:0;top:9px;height:4px;width:100%;border-radius:4px;background:var(--ux-ink);transform-origin:0 50%;transform:scaleX(0)}
.u388-dot.past i{transform:scaleX(1)}
.u388-pv,.u388-nx{width:36px;height:36px;border:0;border-radius:50%;display:grid;place-items:center;background:var(--ux-surface-2);color:var(--ux-ink);transition:transform .35s var(--ux-spring)}
.u388-pv:active,.u388-nx:active{transform:scale(.9)}
.u388-ft svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u388');
  var st = root.querySelector('.u388-st'), by = root.querySelector('.u388-by'), dotsEl = root.querySelector('.u388-dots');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var Q = [['Simplicity is not taking things away but keeping only what matters.', 'Harin Kim', 'Product designer'], ['The time a user waits is part of the design too.', 'Doyun Park', 'Interaction designer'], ['Good motion goes unnoticed and helps you understand.', 'Seojun Lee', 'Motion designer']];
  var AV = [['#FF8A5B', '#B49CFF'], ['#38D9A9', '#3D8BFF'], ['#FFD166', '#FF6B9D']];
  var cur = -1, timer = 0, anim = null, hold = false, DUR = 5200;
  var dots = Q.map(function (q, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'u388-dot'; b.setAttribute('aria-label', (i + 1) + ' of 3');
    b.innerHTML = '<i></i>';
    b.addEventListener('click', function () { show(i); });
    dotsEl.appendChild(b);
    return b;
  });
  function build(i) {
    var q = document.createElement('blockquote');
    q.className = 'u388-q';
    q.setAttribute('aria-live', 'polite');
    Q[i][0].split(' ').forEach(function (w, k) {
      if (k) q.appendChild(document.createTextNode(' '));
      var s = document.createElement('span');
      s.className = 'u388-w'; s.textContent = w;
      s.style.setProperty('--i', k);
      s.style.setProperty('--r', Math.round(Math.random() * 160));
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 16).toFixed(1) + 'px');
      q.appendChild(s);
    });
    return q;
  }
  function show(i) {
    if (i === cur) return;
    var old = st.querySelector('.u388-q:not(.out)');
    if (old) { old.classList.remove('in'); old.classList.add('out'); old.removeAttribute('aria-live'); setTimeout(function () { old.remove(); }, 700); }
    cur = i;
    var q = build(i);
    st.insertBefore(q, by);
    setTimeout(function () { if (root.isConnected) q.classList.add('in'); }, old && !rm ? 260 : 20);
    by.classList.add('swap');
    by.innerHTML = '<div><i class="u388-av" style="--a1:' + AV[i][0] + ';--a2:' + AV[i][1] + ';display:block"></i></div><div><b class="u388-nm"></b><span class="u388-role"></span></div>';
    by.querySelector('.u388-nm').textContent = Q[i][1];
    by.querySelector('.u388-role').textContent = Q[i][2];
    void by.offsetWidth;
    setTimeout(function () { by.classList.remove('swap'); }, 360);
    dots.forEach(function (d, k) { d.classList.toggle('past', k < i); d.setAttribute('aria-current', String(k === i)); });
    run();
  }
  // 지금 점이 차오르는 동안 기다렸다가 다음으로 넘어갑니다
  function run() {
    clearTimeout(timer);
    if (anim) anim.cancel();
    var bar = dots[cur].querySelector('i');
    if (rm || !bar.animate) return;
    anim = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: DUR, fill: 'forwards' });
    if (hold) anim.pause();
    anim.onfinish = function () { if (root.isConnected) show((cur + 1) % Q.length); };
  }
  root.querySelector('.u388-nx').addEventListener('click', function () { show((cur + 1) % Q.length); });
  root.querySelector('.u388-pv').addEventListener('click', function () { show((cur + Q.length - 1) % Q.length); });
  st.addEventListener('pointerenter', function () { hold = true; if (anim) anim.pause(); });
  st.addEventListener('pointerleave', function () { hold = false; if (anim) anim.play(); });
  st.querySelector('.u388-q').remove();
  show(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
