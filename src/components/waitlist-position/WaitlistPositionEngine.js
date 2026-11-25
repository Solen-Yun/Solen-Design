// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountWaitlistPosition(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 340,
      responsive: false,
      markup: `
<div class="ux u365">
  <div class="u365-v u365-v1">
    <div class="u365-ic" aria-hidden="true"><svg viewBox="0 0 26 26"><path d="M13 3l2.6 6.4 6.9.5-5.3 4.4 1.7 6.7L13 17.3 7.1 21l1.7-6.7-5.3-4.4 6.9-.5z" fill="#fff"/></svg></div>
    <h3>Beta waitlist</h3><p>Invites go out in the order people join</p>
    <div class="u365-fm"><input class="u365-in" type="email" placeholder="Email address" aria-label="Email" autocomplete="off"><button type="button" class="u365-go" disabled><i aria-hidden="true"></i><span>Join</span></button></div>
  </div>
  <div class="u365-v u365-v2" aria-hidden="true">
    <small>Your position</small>
    <div class="u365-nm" aria-live="polite"><em>#</em><span class="u365-num"></span></div>
    <div class="u365-q" aria-hidden="true"><span class="u365-me"></span></div>
    <p>Move up 100 spots for every friend who joins</p>
    <div class="u365-bs"><button type="button" class="u365-lk">Copy link</button><button type="button" class="u365-iv">Invite a friend</button></div>
  </div>
</div>
`,
      css: `

.u365{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:340px;border-radius:30px;overflow:hidden;background:radial-gradient(80% 60% at 50% 0%,color-mix(in srgb,#F59E0B 14%,transparent),transparent 70%),var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u365-v{position:absolute;inset:0;padding:30px 24px;display:flex;flex-direction:column;transition:opacity .35s,transform .5s cubic-bezier(.3,1.2,.5,1)}
/* 첫 화면은 내용 묶음을 카드 세로 가운데에 둡니다 */
.u365-v1{text-align:center;justify-content:center;padding-bottom:36px}
.u365.is-in .u365-v1{opacity:0;transform:translateY(-14px) scale(.97);pointer-events:none}
.u365-v2{opacity:0;transform:translateY(16px);pointer-events:none;text-align:center}
.u365.is-in .u365-v2{opacity:1;transform:none;pointer-events:auto;transition-delay:.15s}
.u365-ic{width:52px;height:52px;margin:6px auto 0;border-radius:16px;background:linear-gradient(135deg,#FBBF24,#F97316);display:grid;place-items:center;box-shadow:0 14px 26px -12px #F97316}
.u365-ic svg{width:26px;height:26px}
.u365 h3{margin:14px 0 0;font-size:20px;font-weight:900;letter-spacing:-.035em}
.u365-v1>p{margin:5px 0 0;font-size:11px;font-weight:650;color:var(--ux-ink-3)}
.u365-fm{display:flex;gap:6px;margin-top:22px;padding:5px;border-radius:15px;background:var(--ux-surface-2);box-shadow:inset 0 0 0 1px var(--ux-line);transition:box-shadow .2s}
.u365-fm:focus-within{box-shadow:inset 0 0 0 2px #F59E0B}
.u365-in{flex:1;min-width:0;height:38px;padding:0 10px;border:0;background:none;color:var(--ux-ink);font:inherit;font-size:12.5px;font-weight:700;outline:none}
.u365-in::placeholder{color:var(--ux-ink-3);font-weight:600}
.u365-go{position:relative;flex:none;min-width:84px;height:38px;border:0;border-radius:11px;background:var(--ux-ink);color:var(--ux-surface);font:inherit;font-size:12px;font-weight:850;cursor:pointer;transition:opacity .2s}
.u365-go:disabled{opacity:.3;cursor:not-allowed}
.u365-go i{display:none;width:15px;height:15px;margin:0 auto;border-radius:50%;border:2px solid color-mix(in srgb,var(--ux-surface) 35%,transparent);border-top-color:var(--ux-surface);animation:u365-sp .7s linear infinite}
.u365-go.is-busy i{display:block}
.u365-go.is-busy span{display:none}
@keyframes u365-sp{to{transform:rotate(360deg)}}
/* 둘째 화면은 순번 묶음을 위쪽과 아래 버튼 사이 가운데에 둡니다 */
.u365-v2 small{margin-top:auto;font-size:11px;font-weight:800;color:var(--ux-ink-3)}
.u365-nm{position:relative;display:flex;justify-content:center;align-items:baseline;margin-top:4px;font-size:46px;font-weight:900;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.u365-nm em{font-style:normal;font-size:24px;color:#F59E0B;margin-right:2px}
.u365-dg{display:inline-block;height:1.1em;overflow:hidden;line-height:1.1;vertical-align:bottom}
.u365-dg span{display:block;transition:transform .55s cubic-bezier(.3,1.2,.5,1)}
.u365-fl{position:absolute;right:30px;top:6px;font-size:14px;font-weight:900;color:#10B981;letter-spacing:0;animation:u365-fl 1s ease-out forwards}
@keyframes u365-fl{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-24px)}}
.u365-q{position:relative;height:16px;margin:16px 6px 0}
.u365-q i{position:absolute;top:5px;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:var(--ux-surface-3)}
.u365-me{position:absolute;top:0;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:#F59E0B;box-shadow:0 0 0 4px color-mix(in srgb,#F59E0B 25%,transparent);transition:left .6s cubic-bezier(.3,1.3,.5,1)}
.u365-v2>p{margin:12px 0 0;font-size:10.5px;font-weight:650;color:var(--ux-ink-2)}
.u365-bs{display:flex;gap:6px;margin-top:auto}
.u365-bs button{flex:1;height:42px;border:0;border-radius:12px;font:inherit;font-size:12px;font-weight:850;cursor:pointer}
.u365-iv{background:var(--ux-ink);color:var(--ux-surface)}
.u365-lk{background:var(--ux-surface-2);color:var(--ux-ink);box-shadow:inset 0 0 0 1px var(--ux-line)}
.u365 button:focus-visible{outline:2px solid #F59E0B;outline-offset:2px}
@media (prefers-reduced-motion: reduce){.u365-v,.u365-dg span,.u365-me{transition:none}.u365-fl{display:none}.u365-go i{animation:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u365');
  var inp = root.querySelector('.u365-in'), go = root.querySelector('.u365-go'), v2 = root.querySelector('.u365-v2'), num = root.querySelector('.u365-num'), nm = root.querySelector('.u365-nm'), q = root.querySelector('.u365-q'), me = root.querySelector('.u365-me'), iv = root.querySelector('.u365-iv'), lk = root.querySelector('.u365-lk');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var START = 1284, pos = START, inv = 0;
  for (var i = 0; i < 18; i++) { var d = document.createElement('i'); d.style.left = (i / 17 * 100) + '%'; q.insertBefore(d, me); }
  var cells = [];
  function draw(n) {
    var s = n.toLocaleString('en-US');
    while (cells.length < s.length) { var d = document.createElement('span'); d.className = 'u365-dg'; d.innerHTML = '<span></span>'; num.appendChild(d); cells.push({ el: d, ch: null }); }
    while (cells.length > s.length) cells.pop().el.remove();
    s.split('').forEach(function (ch, k) {
      var c = cells[k]; if (c.ch === ch) return; var inner = c.el.firstChild;
      if (/\d/.test(ch)) { if (c.ch === null || !/\d/.test(c.ch)) inner.innerHTML = '0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9'; inner.style.transform = 'translateY(' + (-+ch * 1.1) + 'em)'; } else { inner.textContent = ch; inner.style.transform = 'none'; }
      c.ch = ch;
    });
  }
  // 내 점: 순번이 작을수록 왼쪽(앞)으로 갑니다
  function place() { me.style.left = Math.max(4, Math.min(100, pos / START * 82 + 12)) + '%'; }
  inp.addEventListener('input', function () { go.disabled = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value.trim()); });
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !go.disabled) go.click(); });
  go.addEventListener('click', function () {
    if (go.disabled || go.classList.contains('is-busy')) return;
    go.classList.add('is-busy');
    setTimeout(function () {
      go.classList.remove('is-busy'); root.classList.add('is-in'); v2.setAttribute('aria-hidden', 'false'); root.querySelector('.u365-v1').setAttribute('aria-hidden', 'true');
      place();
      // 0에서 빠르게 올라가 내 순번에서 멈춥니다
      if (rm) { draw(pos); return; }
      var t0 = performance.now();
      (function f(now) { var k = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - k, 3); draw(Math.round(pos * e)); if (k < 1) requestAnimationFrame(f); })(t0);
    }, rm ? 0 : 650);
  });
  iv.addEventListener('click', function () {
    if (pos <= 100) return;
    inv++; pos -= 100; draw(pos); place();
    if (!rm) { var f = document.createElement('span'); f.className = 'u365-fl'; f.textContent = '−100'; f.setAttribute('aria-hidden', 'true'); nm.appendChild(f); setTimeout(function () { f.remove(); }, 1000); }
  });
  lk.addEventListener('click', function () { try { navigator.clipboard && navigator.clipboard.writeText('https://example.com/r/minji').catch(function () {}); } catch (e) {} });
  draw(0);
})();
  })();

  scope.ready();
  return scope.controller;
}
