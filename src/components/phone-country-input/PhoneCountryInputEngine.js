// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountPhoneCountryInput(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u209">
  <div class="u209-wr">
    <h3>Verify it’s you</h3>
    <label>Mobile number</label>
    <div class="u209-fd"><button type="button" class="u209-cc" aria-haspopup="listbox" aria-expanded="false" aria-label="Choose country"><em></em><b></b><svg viewBox="0 0 9 9" aria-hidden="true"><path d="M1.5 3l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button><input class="u209-in" type="tel" inputmode="numeric" aria-label="Mobile number" autocomplete="off"><svg class="u209-ck" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10"/><path d="M6 10.3l2.6 2.6L14 7.5"/></svg></div>
    <div class="u209-ht" aria-live="polite"></div>
    <div class="u209-dd"><input class="u209-sr" type="search" placeholder="Search countries" aria-label="Search countries"><div class="u209-ls" role="listbox"></div></div>
  </div>
  <button type="button" class="u209-go" disabled>Send code</button>
</div>
`,
      css: `

.u209{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u209-wr{position:absolute;left:22px;right:22px;top:30px}
.u209 h3{margin:0;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u209 label{display:block;margin-top:22px;font-size:11px;font-weight:800;color:var(--ux-ink-2)}
.u209-fd{position:relative;display:flex;margin-top:6px;height:48px;border-radius:14px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1.5px var(--ux-line);transition:box-shadow .2s}
.u209-fd:focus-within{box-shadow:inset 0 0 0 2px var(--ux-accent)}
.u209.is-ok .u209-fd{box-shadow:inset 0 0 0 2px #10B981}
.u209.is-bad .u209-fd{box-shadow:inset 0 0 0 2px #F59E0B}
.u209-cc{flex:none;display:flex;align-items:center;gap:5px;padding:0 9px 0 12px;border:0;border-right:1px solid var(--ux-line);background:none;color:var(--ux-ink);font:inherit;font-size:13px;font-weight:800;cursor:pointer}
.u209-cc em{display:inline-block;font-style:normal;font-size:18px;line-height:1;transition:transform .45s cubic-bezier(.3,1.5,.5,1)}
.u209-cc em.is-spin{transform:rotateY(360deg) scale(1.15)}
.u209-cc b{font-weight:850;font-variant-numeric:tabular-nums}
.u209-cc svg{width:9px;height:9px;color:var(--ux-ink-3);transition:transform .25s}
.u209.is-open .u209-cc svg{transform:rotate(180deg)}
.u209-in{flex:1;min-width:0;padding:0 38px 0 12px;border:0;background:none;color:var(--ux-ink);font:inherit;font-size:14px;font-weight:750;letter-spacing:.02em;outline:none;font-variant-numeric:tabular-nums}
.u209-in::placeholder{color:var(--ux-ink-3);font-weight:600}
.u209-ck{position:absolute;right:13px;top:14px;width:20px;height:20px;pointer-events:none}
.u209-ck circle{fill:#10B981;transform:scale(0);transform-origin:center;transform-box:fill-box;transition:transform .35s cubic-bezier(.3,1.7,.5,1)}
.u209-ck path{fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:14;stroke-dashoffset:14;transition:stroke-dashoffset .3s ease .2s}
.u209.is-ok .u209-ck circle{transform:none}
.u209.is-ok .u209-ck path{stroke-dashoffset:0}
.u209-ht{height:0;overflow:hidden;font-size:10.5px;font-weight:750;color:#B45309;transition:height .25s,margin .25s}
.u209.is-bad .u209-ht{height:16px;margin-top:6px}
.u209-dd{position:absolute;left:0;top:122px;z-index:3;width:220px;padding:6px;border-radius:15px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 18px 36px -14px var(--ux-shadow-strong);transform-origin:20% 0;transform:scale(.94) translateY(-4px);opacity:0;pointer-events:none;transition:transform .22s cubic-bezier(.3,1.5,.5,1),opacity .15s}
.u209.is-open .u209-dd{transform:none;opacity:1;pointer-events:auto}
.u209-sr{width:100%;height:30px;margin-bottom:4px;padding:0 10px;border:0;border-radius:9px;background:var(--ux-surface-2);color:var(--ux-ink);font:inherit;font-size:11.5px;font-weight:700;outline:none;box-sizing:border-box}
.u209-op{display:flex;align-items:center;gap:8px;width:100%;height:30px;padding:0 9px;border:0;border-radius:8px;background:none;color:var(--ux-ink);font:inherit;font-size:12px;font-weight:750;cursor:pointer;text-align:left}
.u209-op:hover,.u209-op.g-hov,.u209-op[aria-selected="true"]{background:var(--ux-surface-2)}
.u209-op[hidden]{display:none}
.u209-op em{font-style:normal;font-size:16px}
.u209-op span{flex:1}
.u209-op small{font-size:11px;font-weight:800;color:var(--ux-ink-3);font-variant-numeric:tabular-nums}
.u209-go{position:absolute;left:22px;right:22px;bottom:24px;height:46px;border:0;border-radius:13px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:13px;font-weight:850;transition:opacity .25s}
.u209-go:disabled{opacity:.3}
.u209 button:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u209-cc em,.u209-dd,.u209-ht,.u209-ck circle,.u209-ck path{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u209');
  var cc = root.querySelector('.u209-cc'), fl = cc.querySelector('em'), code = cc.querySelector('b'), inp = root.querySelector('.u209-in'), ht = root.querySelector('.u209-ht'), sr = root.querySelector('.u209-sr'), ls = root.querySelector('.u209-ls'), go = root.querySelector('.u209-go');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // [코드, 국기, 이름, 국가 번호, 자리 묶음, 예시]
  var C = [['KR', '🇰🇷', 'South Korea', '+82', [3, 4, 4], '010-1234-5678'], ['US', '🇺🇸', 'United States', '+1', [3, 3, 4], '(415) 555-0132'], ['JP', '🇯🇵', 'Japan', '+81', [3, 4, 4], '090-1234-5678'], ['GB', '🇬🇧', 'United Kingdom', '+44', [5, 6], '07700 900123']];
  var cur = 0;
  var O = C.map(function (c, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'u209-op'; b.setAttribute('role', 'option');
    b.innerHTML = '<em aria-hidden="true">' + c[1] + '</em><span></span><small>' + c[3] + '</small>'; b.querySelector('span').textContent = c[2];
    b.addEventListener('click', function () { pick(i); setOpen(false); inp.focus({ preventScroll: true }); });
    ls.appendChild(b); return b;
  });
  // 숫자만 남겨 그 나라 묶음대로 다시 끼웁니다 (미국은 괄호 모양)
  function fmt(d) {
    var g = C[cur][4], out = [], k = 0;
    g.forEach(function (n) { if (k < d.length) out.push(d.slice(k, k + n)); k += n; });
    if (k < d.length) out[out.length - 1] += d.slice(k);
    if (C[cur][0] === 'US' && d.length > 3) return '(' + out[0] + ') ' + out.slice(1).join('-');
    return out.join(C[cur][0] === 'GB' ? ' ' : '-');
  }
  function need() { return C[cur][4].reduce(function (a, b) { return a + b; }, 0); }
  function check() {
    var d = inp.value.replace(/\D/g, ''); inp.value = fmt(d);
    // 넘치면 바로, 모자라면 칸을 떠난 뒤(또는 나라를 바꾼 뒤)에 알려 줍니다
    var ok = d.length === need(), bad = d.length > 0 && !ok && (d.length > need() || ht.dataset.blur === '1');
    root.classList.toggle('is-ok', ok); root.classList.toggle('is-bad', bad); go.disabled = !ok;
    ht.textContent = C[cur][2] + ' numbers have ' + need() + ' digits';
  }
  function pick(i) {
    if (i === cur && code.textContent) return;
    var d = inp.value.replace(/\D/g, '');
    cur = i; fl.textContent = C[i][1]; code.textContent = C[i][3]; inp.placeholder = C[i][5];
    O.forEach(function (o, k) { o.setAttribute('aria-selected', k === i); });
    if (!rm) { fl.classList.remove('is-spin'); void fl.offsetWidth; fl.classList.add('is-spin'); setTimeout(function () { fl.classList.remove('is-spin'); }, 460); }
    // 나라를 바꾸면 이미 쓴 숫자도 새 형식으로 다시 묶고, 자릿수가 다르면 바로 알려 줍니다
    ht.dataset.blur = d ? '1' : ''; inp.value = d; check();
  }
  function setOpen(v) { root.classList.toggle('is-open', v); cc.setAttribute('aria-expanded', v); if (v) { sr.value = ''; filter(); setTimeout(function () { sr.focus({ preventScroll: true }); }, 60); } }
  function filter() { var q = sr.value.trim().toLowerCase(); O.forEach(function (o, i) { o.hidden = q && (C[i][2] + C[i][0] + C[i][3]).toLowerCase().indexOf(q) < 0; }); }
  cc.addEventListener('click', function () { setOpen(!root.classList.contains('is-open')); });
  sr.addEventListener('input', filter);
  root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-open')) { setOpen(false); cc.focus(); } });
  inp.addEventListener('input', function () { ht.dataset.blur = ''; check(); });
  inp.addEventListener('blur', function () { ht.dataset.blur = '1'; check(); });
  pick(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
