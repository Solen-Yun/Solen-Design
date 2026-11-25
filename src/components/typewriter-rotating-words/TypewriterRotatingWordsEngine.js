// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountTypewriterRotatingWords(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 340,
      height: 272,
      responsive: false,
      markup: `
<div class="ux u307">
  <p class="u307-k">SOLEN DESIGN · STUDIO</p>
  <p class="u307-line"><span class="u307-a">What we build together is</span> <span class="u307-sr"></span><span class="u307-b"><span class="u307-w" aria-hidden="true"></span><span class="u307-caret" aria-hidden="true"></span><span class="u307-tail">.</span></span></p>
  <div class="u307-chips" role="group" aria-label="Change the word">
    <button class="u307-chip" type="button" aria-pressed="true" style="--k:var(--ux-accent)">products</button>
    <button class="u307-chip" type="button" aria-pressed="false" style="--k:var(--ux-mint)">experiences</button>
    <button class="u307-chip" type="button" aria-pressed="false" style="--k:var(--ux-warn)">brands</button>
    <button class="u307-chip" type="button" aria-pressed="false" style="--k:var(--ux-accent-2)">tomorrow</button>
  </div>
</div>
`,
      css: `

.u307{--ux-ease:cubic-bezier(.22,1,.36,1);--ux-spring:cubic-bezier(.34,1.56,.64,1);--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:340px;height:272px;display:flex;flex-direction:column;padding:24px 22px 18px;border-radius:28px;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);overflow:hidden;--c:var(--ux-accent)}
.u307::after{content:"";position:absolute;right:-60px;top:-70px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c) 26%,transparent),transparent 70%);transition:background .6s var(--ux-ease);pointer-events:none}
.u307-k{position:relative;margin:0;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;color:var(--ux-ink-3)}
.u307-line{position:relative;margin:16px 0 0;min-height:100px;font-size:31px;line-height:1.24;font-weight:820;letter-spacing:-.045em}
.u307-a{display:block;color:var(--ux-ink-2)}
.u307-b{display:inline;white-space:nowrap}
.u307-w{position:relative;color:var(--ux-ink);background:linear-gradient(var(--c),var(--c)) 0 100%/100% .14em no-repeat;padding-bottom:.04em;transition:background-size .3s var(--ux-ease)}
.u307-w:empty{padding:0}
.u307-caret{display:inline-block;width:3px;height:.95em;margin:0 2px 0 3px;vertical-align:-.1em;border-radius:2px;background:var(--c);animation:u307-blink 1s steps(1) infinite;transition:background-color .4s}
.u307.is-typing .u307-caret{animation:none}
@keyframes u307-blink{50%{opacity:0}}
.u307-tail{color:var(--ux-ink)}
.u307-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.u307-chips{position:relative;margin-top:auto;display:flex;flex-wrap:wrap;gap:6px}
.u307-chip{height:34px;padding:0 13px;border:0;border-radius:999px;background:var(--ux-surface-2);font-size:13px;font-weight:700;color:var(--ux-ink-2);box-shadow:inset 0 0 0 1px var(--ux-line);transition:background-color .3s,color .3s,box-shadow .3s,transform .35s var(--ux-spring)}
.u307-chip:hover{color:var(--ux-ink)}
.u307-chip:active{transform:scale(.93)}
.u307-chip[aria-pressed="true"]{background:var(--k);color:#fff;box-shadow:none}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u307');
  var line = root.querySelector('.u307-line'), wEl = root.querySelector('.u307-w'), sr = root.querySelector('.u307-sr');
  var chips = Array.prototype.slice.call(root.querySelectorAll('.u307-chip'));
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WORDS = ['products', 'experiences', 'brands', 'tomorrow'];
  var COLORS = ['var(--ux-accent)', 'var(--ux-mint)', 'var(--ux-warn)', 'var(--ux-accent-2)'];
  var CHO = [0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139, 0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147, 0x3148, 0x3149, 0x314A, 0x314B, 0x314C, 0x314D, 0x314E];
  var cur = 0, timer = 0, hold = false, busy = false;
  // 한글 음절은 초성 → 초성+중성 → 받침까지 세 단계로 나눠 칩니다(입력기가 조합하는 모습)
  function frames(word) {
    var out = [], pre = '';
    Array.from(word).forEach(function (ch) {
      var c = ch.charCodeAt(0) - 0xAC00;
      if (c >= 0 && c < 11172) {
        var jong = c % 28, base = ch.charCodeAt(0) - jong;
        out.push(pre + String.fromCharCode(CHO[Math.floor(c / 588)]));
        out.push(pre + String.fromCharCode(base));
        if (jong) out.push(pre + ch);
      } else out.push(pre + ch);
      pre += ch;
    });
    return out;
  }
  function wait(ms, fn) { clearTimeout(timer); timer = setTimeout(function () { if (root.isConnected) fn(); }, ms); }
  function go(i, manual) {
    if (busy && !manual) return;
    busy = true;
    cur = i;
    chips.forEach(function (c, k) { c.setAttribute('aria-pressed', String(k === i)); });
    var target = WORDS[i], seq = frames(target);
    root.classList.add('is-typing');
    if (rm) { wEl.textContent = target; done(); return; }
    // 지우기: 뒤에서 한 글자씩
    (function del() {
      var s = wEl.textContent;
      if (s.length) { wEl.textContent = s.slice(0, -1); wait(55, del); return; }
      root.style.setProperty('--c', COLORS[i]);
      var k = 0;
      wait(220, function type() {
        wEl.textContent = seq[k++];
        if (k < seq.length) wait(70 + Math.random() * 70, type); else done();
      });
    })();
  }
  function done() {
    root.classList.remove('is-typing');
    root.style.setProperty('--c', COLORS[cur]);
    sr.textContent = WORDS[cur];
    busy = false;
    next();
  }
  function next() { wait(2300, function () { if (hold) { next(); return; } go((cur + 1) % WORDS.length); }); }
  chips.forEach(function (c, i) { c.addEventListener('click', function () { if (i !== cur || busy) go(i, true); }); });
  line.addEventListener('pointerenter', function () { hold = true; });
  line.addEventListener('pointerleave', function () { hold = false; });
  wEl.textContent = '';
  go(0, true);
})();
  })();

  scope.ready();
  return scope.controller;
}
