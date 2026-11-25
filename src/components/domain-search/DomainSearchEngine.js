// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDomainSearch(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u300">
  <div class="u300-hd"><b>Find a domain</b><span class="u300-ct" aria-label="Cart" role="img"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 2.5h2l1.6 8h7.4l1.5-5.5H4.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.3" cy="13.2" r="1.2" fill="currentColor"/><circle cx="11.6" cy="13.2" r="1.2" fill="currentColor"/></svg><i></i></span></div>
  <label class="u300-sb"><svg viewBox="0 0 15 15" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 10l3.5 3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><input class="u300-in" placeholder="Type the name you want" aria-label="Domain name" autocomplete="off" spellcheck="false"></label>
  <ul class="u300-ls" aria-live="polite"><li class="u300-em">Type a name and we’ll find addresses you can use</li></ul>
</div>
`,
      css: `

.u300{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u300-hd{position:absolute;left:18px;right:16px;top:18px;display:flex;align-items:center}
.u300-hd b{margin-right:auto;font-size:15px;font-weight:900}
.u300-ct{position:relative;width:34px;height:34px;border-radius:11px;background:var(--ux-surface-2);display:grid;place-items:center;color:var(--ux-ink-2)}
.u300-ct svg{width:16px;height:16px}
.u300-ct i{position:absolute;right:-4px;top:-4px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:var(--ux-accent);color:#fff;font-style:normal;font-size:9.5px;font-weight:900;line-height:17px;text-align:center;box-sizing:border-box;transform:scale(0);transition:transform .3s cubic-bezier(.3,1.7,.5,1)}
.u300-ct i.is-on{transform:none}
.u300-ct i.is-bump{animation:u300-bp .45s cubic-bezier(.3,1.7,.5,1)}
@keyframes u300-bp{40%{transform:scale(1.45)}}
.u300-sb{position:absolute;left:14px;right:14px;top:62px;display:flex;align-items:center;gap:8px;height:44px;padding:0 6px 0 14px;border-radius:14px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1.5px var(--ux-line);transition:box-shadow .2s}
.u300-sb:focus-within{box-shadow:inset 0 0 0 2px var(--ux-accent)}
.u300-sb svg{flex:none;width:15px;height:15px;color:var(--ux-ink-3)}
.u300-in{flex:1;min-width:0;height:100%;border:0;background:none;color:var(--ux-ink);font:inherit;font-size:13px;font-weight:750;outline:none}
.u300-in::placeholder{color:var(--ux-ink-3);font-weight:600}
.u300-ls{position:absolute;left:14px;right:14px;top:116px;bottom:12px;margin:0;padding:0;list-style:none}
.u300-em{padding:30px 20px;text-align:center;font-size:11px;font-weight:700;color:var(--ux-ink-3)}
.u300-rw{display:flex;align-items:center;gap:8px;height:40px;padding:0 6px 0 12px;margin-bottom:4px;border-radius:12px;background:var(--ux-surface-2);animation:u300-in .4s cubic-bezier(.3,1.3,.5,1) backwards;transition:opacity .3s}
@keyframes u300-in{from{opacity:0;transform:translateY(10px)}}
.u300-rw b{flex:1;min-width:0;font-size:12.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u300-rw b em{font-style:normal;color:var(--ux-accent)}
.u300-rw.is-taken{opacity:.5}
.u300-rw.is-taken b{text-decoration:line-through;text-decoration-color:var(--ux-ink-3)}
.u300-sp{flex:none;width:16px;height:16px;border-radius:50%;border:2px solid color-mix(in srgb,var(--ux-accent) 25%,transparent);border-top-color:var(--ux-accent);animation:u300-sp .7s linear infinite;box-sizing:border-box}
@keyframes u300-sp{to{transform:rotate(360deg)}}
.u300-pr{font-size:10.5px;font-weight:800;color:var(--ux-ink-2);font-variant-numeric:tabular-nums;animation:u300-fd .3s}
.u300-tk{padding:2px 8px;border-radius:999px;background:var(--ux-surface-3);font-size:9.5px;font-weight:850;color:var(--ux-ink-3);animation:u300-fd .3s}
@keyframes u300-fd{from{opacity:0}}
.u300-ad{height:28px;min-width:50px;padding:0 10px;border:0;border-radius:9px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:11px;font-weight:850;cursor:pointer;animation:u300-fd .3s;transition:background .25s}
.u300-ad[aria-pressed="true"]{background:#059669}
.u300 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u300-rw,.u300-pr,.u300-tk,.u300-ad{animation:none}.u300-sp{animation:none}.u300-ct i{transition:none}.u300-ct i.is-bump{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u300');
  var inp = root.querySelector('.u300-in'), ls = root.querySelector('.u300-ls'), cnt = root.querySelector('.u300-ct i'), em = root.querySelector('.u300-em');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [끝자리, 쓸 수 있으면 1, 1년 가격]
  var TL = [['.com', 0, 14], ['.io', 1, 39], ['.app', 1, 16], ['.co', 1, 25], ['.dev', 1, 15]];
  var cart = {}, T = 0, gen = 0;
  function count() { var n = Object.keys(cart).length; cnt.textContent = n; cnt.classList.toggle('is-on', n > 0); }
  // 입력이 멈추면 다시 찾고, 줄마다 확인이 조금씩 늦게 끝나게 합니다
  function search() {
    var name = inp.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''), g = ++gen;
    ls.innerHTML = '';
    if (!name) { ls.appendChild(em); return; }
    TL.forEach(function (t, i) {
      var li = document.createElement('li'); li.className = 'u300-rw'; li.style.animationDelay = i * 0.06 + 's';
      li.innerHTML = '<b></b><span class="u300-sp" aria-hidden="true"></span>';
      var b = li.querySelector('b'); b.textContent = name; var e = document.createElement('em'); e.textContent = t[0]; b.appendChild(e);
      ls.appendChild(li);
      setTimeout(function () {
        if (g !== gen || !root.isConnected) return;
        li.querySelector('.u300-sp').remove();
        var full = name + t[0];
        if (!t[1]) { li.classList.add('is-taken'); var tk = document.createElement('span'); tk.className = 'u300-tk'; tk.textContent = 'Taken'; li.appendChild(tk); return; }
        var pr = document.createElement('span'); pr.className = 'u300-pr'; pr.textContent = '$' + t[2].toLocaleString('en-US') + '/yr'; li.appendChild(pr);
        var ad = document.createElement('button'); ad.type = 'button'; ad.className = 'u300-ad'; li.appendChild(ad);
        function lab() { var on = !!cart[full]; ad.textContent = on ? 'Added' : 'Add'; ad.setAttribute('aria-pressed', on); ad.setAttribute('aria-label', full + ' ' + (on ? 'Added' : 'Add')); }
        ad.addEventListener('click', function () { if (cart[full]) delete cart[full]; else cart[full] = 1; lab(); count(); cnt.classList.remove('is-bump'); void cnt.offsetWidth; cnt.classList.add('is-bump'); });
        lab();
      }, rm ? 0 : 500 + i * 260);
    });
  }
  inp.addEventListener('input', function () { clearTimeout(T); T = setTimeout(search, rm ? 0 : 300); });
  count();
})();
  })();

  scope.ready();
  return scope.controller;
}
