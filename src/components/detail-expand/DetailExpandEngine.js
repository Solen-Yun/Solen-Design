// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

export function mountDetailExpand(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 300,
      height: 480,
      responsive: false,
      markup: `
<div class="ux u288">
  <div class="u288-sc" tabindex="0" aria-label="Product page">
    <div class="u288-ph" aria-hidden="true"><svg viewBox="0 0 150 150"><path d="M50 22 L75 30 L100 22 L132 40 L120 70 L106 64 L106 132 L44 132 L44 64 L30 70 L18 40Z" fill="#F5F5F4" stroke="#A8A29E" stroke-width="1.5" stroke-linejoin="round"/><path d="M75 30 L75 132" stroke="#D6D3D1" stroke-width="1.2"/><path d="M62 26 L75 44 L88 26" fill="none" stroke="#A8A29E" stroke-width="1.5" stroke-linejoin="round"/><circle cx="75" cy="60" r="1.8" fill="#A8A29E"/><circle cx="75" cy="80" r="1.8" fill="#A8A29E"/><circle cx="75" cy="100" r="1.8" fill="#A8A29E"/></svg></div>
    <div class="u288-if"><h3>Daily linen shirt</h3><div class="u288-pr"><em>20%</em><b>$39</b><s>$48</s></div><small>Free shipping · Arrives tomorrow</small></div>
    <h4 class="u288-st">Details</h4>
    <div class="u288-dt"><div class="u288-in">
      <div class="u288-bn"><b>Light, breezy linen</b><span>An everyday shirt you can wear all summer without worrying about wrinkles</span></div>
      <div class="u288-bk"><h5>Colors</h5><div class="u288-sw"><i style="background:#F5F5F4"></i><i style="background:#D6CFC4"></i><i style="background:#A3B8C8"></i><i style="background:#3F4A3C"></i></div></div>
      <div class="u288-bk"><h5>Size</h5><table class="u288-tb"><tr><th></th><th>S</th><th>M</th><th>L</th><th>XL</th></tr><tr><td>Shoulder</td><td>44</td><td>46</td><td>48</td><td>50</td></tr><tr><td>Chest</td><td>54</td><td>56</td><td>58</td><td>61</td></tr><tr><td>Length</td><td>72</td><td>74</td><td>76</td><td>78</td></tr></table></div>
      <div class="u288-bk"><h5>Care</h5><p>Cold hand wash · Dry in shade · Low iron</p></div>
      <div class="u288-md">Model 178 cm · wearing L</div>
    </div></div>
    <button type="button" class="u288-mr" aria-expanded="false"><span></span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <div class="u288-rv"><b>Reviews 128</b><p>“Not too thick, just right”</p></div>
  </div>
</div>
`,
      css: `

.u288{--ux-surface:light-dark(#FFFFFF,#13141C);--ux-surface-2:light-dark(#F5F3EF,#1A1B25);--ux-surface-3:light-dark(#EAE7E1,#252632);--ux-ink:light-dark(#16151B,#F4F0E8);--ux-ink-2:light-dark(#57535F,rgba(244,240,232,.68));--ux-ink-3:light-dark(#8E8A97,rgba(244,240,232,.42));--ux-line:light-dark(rgba(22,21,27,.09),rgba(255,255,255,.08));--ux-line-2:light-dark(rgba(22,21,27,.17),rgba(255,255,255,.16));--ux-accent:light-dark(#6A57F2,#B7A4FF);--ux-accent-2:light-dark(#2F8FE0,#7DB4FF);--ux-accent-soft:light-dark(rgba(106,87,242,.12),rgba(183,164,255,.15));--ux-accent-ink:light-dark(#FFFFFF,#0B0C12);--ux-mint:light-dark(#119C72,#7EE8C0);--ux-warn:light-dark(#D6731E,#FFB26B);--ux-danger:light-dark(#D93A55,#FF7D8C);--ux-glass:light-dark(rgba(255,255,255,.58),rgba(255,255,255,.07));--ux-glass-line:light-dark(rgba(255,255,255,.85),rgba(255,255,255,.18));--ux-shadow:light-dark(rgba(40,30,80,.14),rgba(0,0,0,.45));--ux-shadow-strong:light-dark(rgba(40,30,80,.3),rgba(0,0,0,.72));--ux-grad:light-dark(linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A),linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3));position:relative;width:300px;height:480px;border-radius:32px;overflow:hidden;background:var(--ux-surface);box-shadow:0 0 0 1px var(--ux-line),0 30px 60px -36px var(--ux-shadow-strong);color:var(--ux-ink)}
.u288-sc{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.u288-sc::-webkit-scrollbar{display:none}
.u288-sc:focus-visible{outline:2px solid var(--ux-accent);outline-offset:-4px;border-radius:32px}
.u288-ph{position:relative;height:200px;background:linear-gradient(160deg,#E7E5E4,#D6D3D1)}
.u288-ph svg{position:absolute;left:50%;top:50%;width:150px;height:150px;transform:translate(-50%,-46%)}
.u288-if{padding:16px 18px 6px}
.u288-if h3{margin:0;font-size:16px;font-weight:850;letter-spacing:-.02em}
.u288-pr{display:flex;align-items:baseline;gap:6px;margin-top:6px}
.u288-pr em{font-style:normal;font-size:17px;font-weight:900;color:#E11D48}
.u288-pr b{font-size:17px;font-weight:900}
.u288-pr s{font-size:11px;font-weight:650;color:var(--ux-ink-3)}
.u288-if small{display:block;margin-top:6px;font-size:10.5px;font-weight:750;color:#059669}
.u288-st{margin:14px 0 0;padding:14px 18px 0;border-top:8px solid var(--ux-surface-2);font-size:13px;font-weight:900}
.u288-dt{position:relative;height:170px;overflow:hidden;margin-top:10px;transition:height .65s cubic-bezier(.3,.8,.25,1)}
.u288-dt::after{content:"";position:absolute;left:0;right:0;bottom:0;height:110px;background:linear-gradient(transparent,var(--ux-surface) 88%);pointer-events:none;transition:opacity .4s}
.u288.is-open .u288-dt::after{opacity:0}
.u288-bn{margin:0 14px;height:150px;border-radius:16px;background:linear-gradient(140deg,#F5F5F4,#E7E5E4);display:flex;flex-direction:column;justify-content:flex-end;padding:16px;color:#292524}
.u288-bn b{font-size:19px;font-weight:900;letter-spacing:-.03em}
.u288-bn span{margin-top:4px;font-size:10.5px;font-weight:650;color:#57534E}
.u288-bk{margin:16px 18px 0}
.u288-bk h5{margin:0 0 8px;font-size:11px;font-weight:850;color:var(--ux-ink-2)}
.u288-sw{display:flex;gap:8px}
.u288-sw i{width:34px;height:34px;border-radius:10px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.u288-tb{width:100%;border-collapse:collapse;font-size:10.5px;font-weight:700;text-align:center}
.u288-tb th,.u288-tb td{padding:6px 0;border-bottom:1px solid var(--ux-line)}
.u288-tb th{color:var(--ux-ink-3);font-weight:800}
.u288-tb td:first-child{text-align:left;color:var(--ux-ink-3);font-weight:800}
.u288-bk p{margin:0;font-size:10.5px;line-height:1.5;font-weight:650;color:var(--ux-ink-2)}
.u288-md{margin:16px 14px 6px;height:120px;border-radius:16px;background:linear-gradient(180deg,#D6D3D1,#A8A29E);display:flex;align-items:flex-end;padding:12px;font-size:10px;font-weight:800;color:#fff}
.u288-mr{display:flex;align-items:center;justify-content:center;gap:6px;width:calc(100% - 28px);height:42px;margin:6px 14px 0;border:0;border-radius:12px;background:var(--ux-surface);box-shadow:inset 0 0 0 1.5px var(--ux-ink);color:var(--ux-ink);font:inherit;font-size:12px;font-weight:850;cursor:pointer;position:relative;z-index:1}
.u288-mr:focus-visible{outline:2px solid var(--ux-accent);outline-offset:2px}
.u288-mr svg{width:12px;height:12px;transition:transform .35s}
.u288.is-open .u288-mr svg{transform:rotate(180deg)}
.u288-rv{margin:18px 0 0;padding:14px 18px 34px;border-top:8px solid var(--ux-surface-2)}
.u288-rv b{font-size:13px;font-weight:900}
.u288-rv p{margin:8px 0 0;padding:10px 12px;border-radius:12px;background:var(--ux-surface-2);font-size:11px;font-weight:650;color:var(--ux-ink-2)}
@media (prefers-reduced-motion: reduce){.u288-dt,.u288-dt::after,.u288-mr svg{transition:none}}

body{display:grid;place-items:center}
`,
    },
    options,
  );
  const { document, window, requestAnimationFrame, IntersectionObserver, matchMedia } = scope;

  (function () {
(function () {
  var root = document.querySelector('.u288');
  var sc = root.querySelector('.u288-sc'), dt = root.querySelector('.u288-dt'), inn = root.querySelector('.u288-in'), mr = root.querySelector('.u288-mr'), st = root.querySelector('.u288-st'), lb = mr.querySelector('span');
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SHUT = 170, open = false, uid = 'u288' + Math.random().toString(36).slice(2, 7);
  dt.id = uid; mr.setAttribute('aria-controls', uid);
  function sync() { lb.textContent = open ? 'Show less' : 'Show more details'; mr.setAttribute('aria-expanded', open); root.classList.toggle('is-open', open); }
  // 스크롤 상자 안을 부드럽게 옮깁니다 (smooth 옵션은 데모 재생과 겹치면 끊겨서 직접 그립니다)
  function scrollTo(y, ms) {
    if (rm) { sc.scrollTop = y; return; }
    var y0 = sc.scrollTop, t0 = performance.now();
    (function f(now) { var k = Math.min(1, (now - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; sc.scrollTop = y0 + (y - y0) * e; if (k < 1) requestAnimationFrame(f); })(t0);
  }
  mr.addEventListener('click', function () {
    open = !open; sync();
    if (open) { dt.style.height = inn.offsetHeight + 'px'; return; }
    // 접을 때는 상세정보 제목이 보이는 곳으로 함께 돌아가 읽던 자리를 잃지 않게 합니다
    dt.style.height = SHUT + 'px';
    scrollTo(Math.max(0, st.offsetTop - 12), 650);
  });
  sync();
})();
  })();

  scope.ready();
  return scope.controller;
}
