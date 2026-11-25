// 文档页右侧目录的帆船效果：与「帆船滚动目录」组件同一套视觉与运动
// （航线在船心处右弯、当前项向右让位、弹簧移动、倾斜转向、水波），
// 但绑定文档自己的 h3 小节与页面滚动，不渲染组件自带的演示正文。

const SHIP_PATHS = [
  'M7 65C29 75 66 73 93 57L92 64C72 83 32 88 14 73Z',
  'M8 65C32 72 65 69 93 57M14 73C36 80 70 76 92 64',
  'M29 13V71M56 3V69M79 12V64',
  'M29 17C19 14 14 19 18 28L29 32Z',
  'M29 34C16 28 11 38 18 47L29 51Z',
  'M29 53C19 47 15 56 23 66L29 70Z',
  'M56 8C46 3 39 9 42 20L56 25Z',
  'M56 29C40 22 35 32 43 44L56 49Z',
  'M56 51C41 44 37 54 46 65L56 69Z',
  'M80 16Q92 30 95 48L80 56Z',
  'M1 61L29 48M8 65L29 58M29 69L56 38M56 68L79 42M29 13L34 12V16H29M56 3H62V7H56',
];
// Paths 2, 3 and 11 are outline-only; the rest are white fills.
const STROKE_ONLY = new Set([1, 2, 10]);

const toc = document.querySelector(".toc");
const nav = toc?.querySelector("nav");
if (toc && nav) {
  /* 几何按组件引擎的相对关系等比缩放（约 0.7）：条目左缘起算，
     航线在其左 34px，弯顶再右 18px，船心在条目左 18px，船 44px。 */
  const ROUTE_X = 14;   // 航线基线 x（相对 .toc）
  const BEND_X = 32;    // 航线在船心处右弯到的 x
  const SHIP_HALF = 22; // 44px 船的一半，translateY(c - SHIP_HALF)
  const ANCHOR_Y = 180; // 阅读锚点：标题越过视口顶部该值即算当前小节
  const HEAD_OFFSET = 92; // 跳转后标题距视口顶部的距离

  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOutCubic = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  toc.insertAdjacentHTML("beforeend", `
  <svg class="ship-route" aria-hidden="true" focusable="false">
    <line class="ship-baseline" x1="${ROUTE_X}" y1="0" x2="${ROUTE_X}" y2="0" stroke="#aaaaaa" stroke-width="1.1" stroke-dasharray="3 3"></line>
    <circle class="ship-end" r="3.5" fill="#ffffff" stroke="#aaaaaa" stroke-width="1.1"></circle>
    <circle class="ship-end-dot" r="1" fill="#aaaaaa"></circle>
    <circle class="ship-end" r="3.5" fill="#ffffff" stroke="#aaaaaa" stroke-width="1.1"></circle>
    <circle class="ship-end-dot" r="1" fill="#aaaaaa"></circle>
    <path class="ship-curve" d="" fill="none" stroke="#aaaaaa" stroke-width="1.1" stroke-dasharray="3 3"></path>
  </svg>
  <svg class="ship" viewBox="0 0 100 88" width="44" height="44" aria-hidden="true" focusable="false">
    <ellipse class="ship-ripple" cx="51" cy="79" rx="24" ry="6" fill="none" stroke="#9b9b9b" stroke-width="0.65"></ellipse>
    <ellipse class="ship-ripple" cx="51" cy="79" rx="45" ry="12.5" fill="none" stroke="#9b9b9b" stroke-width="0.65"></ellipse>
    <g fill="#ffffff" stroke="#454545" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
      ${SHIP_PATHS.map((d, i) => STROKE_ONLY.has(i) ? `<path d="${d}" fill="none"></path>` : `<path d="${d}"></path>`).join("")}
    </g>
  </svg>`);

  const routeSvg = toc.querySelector(".ship-route");
  const baseline = routeSvg.querySelector(".ship-baseline");
  const ends = [...routeSvg.querySelectorAll(".ship-end")];
  const endDots = [...routeSvg.querySelectorAll(".ship-end-dot")];
  const curve = routeSvg.querySelector(".ship-curve");
  const ship = toc.querySelector(".ship");
  const ripples = [...ship.querySelectorAll(".ship-ripple")];

  let links = [], heads = [], headTops = [], shipSlots = [];
  let routeTop = 0, routeBottom = 0;

  // 目录条目由 chrome.js 按当前文档的 h3 动态重建，重建后重新绑定与测量。
  // 标题按位置从当前可见的文档小节取，不依赖锚点 id（id 会有重置时序问题）。
  function bind() {
    links = [...nav.querySelectorAll("a")];
    const section = document.querySelector('#docs-body section:not([hidden])');
    heads = [...(section?.querySelectorAll("h3") ?? [])];
    links.forEach((a, i) => a.addEventListener("click", e => { e.preventDefault(); jumpTo(i); }));
    measure();
    setActiveFromScroll();
  }

  function measure() {
    const tocBox = toc.getBoundingClientRect();
    const pageTop = window.scrollY;
    headTops = heads.map(h => h ? h.getBoundingClientRect().top + pageTop : -1);
    shipSlots = links.map(a => {
      const r = a.getBoundingClientRect();
      return r.top - tocBox.top + r.height / 2;
    });
    if (shipSlots.length) {
      const navBox = nav.getBoundingClientRect();
      /* 航线向上下各伸出 36px，给 54px 的曲线端留出与组件一致的行程。 */
      routeTop = navBox.top - tocBox.top - 36;
      routeBottom = navBox.bottom - tocBox.top + 36;
    }
    baseline.setAttribute("y1", String(routeTop));
    baseline.setAttribute("y2", String(routeBottom));
    ends[0].setAttribute("cx", String(ROUTE_X));
    ends[0].setAttribute("cy", String(routeTop));
    endDots[0].setAttribute("cx", String(ROUTE_X));
    endDots[0].setAttribute("cy", String(routeTop));
    ends[1].setAttribute("cx", String(ROUTE_X));
    ends[1].setAttribute("cy", String(routeBottom));
    endDots[1].setAttribute("cx", String(ROUTE_X));
    endDots[1].setAttribute("cy", String(routeBottom));
    applyHeight();
  }

  // 阅读区高度变化会拖动目录高度，端点与曲线跟着更新。
  function applyHeight() {
    routeSvg.setAttribute("viewBox", `0 0 ${toc.offsetWidth} ${Math.max(1, toc.offsetHeight)}`);
  }

  let active = -1;
  function setActive(i) {
    if (i === active || !links[i]) return;
    active = i;
    links.forEach((a, k) => {
      if (k === i) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
    const r = links[i].getBoundingClientRect();
    const tocBox = toc.getBoundingClientRect();
    targetY = r.top - tocBox.top + r.height / 2;
  }

  // --- sailing state ---
  let y = 0, vy = 0, targetY = 0, roll = 0, yaw = 0, phase = 0;
  let scrollSpeed = 0, prevScroll = 0;
  let jump = null, lockActive = false;
  let last = 0, raf = 0;

  function curveFor(c) {
    return `M${ROUTE_X} ${routeTop} L${ROUTE_X} ${c - 54} C${ROUTE_X} ${c - 30} ${BEND_X} ${c - 30} ${BEND_X} ${c} C${BEND_X} ${c + 30} ${ROUTE_X} ${c + 30} ${ROUTE_X} ${c + 54} L${ROUTE_X} ${routeBottom}`;
  }

  function interruptJump() {
    jump = null;
    lockActive = false;
  }

  function jumpTo(i) {
    if (!heads[i]) return;
    const to = Math.max(0, headTops[i] - HEAD_OFFSET);
    if (media.matches) {
      interruptJump();
      window.scrollTo(0, to);
      setActive(i);
      y = targetY;
      roll = 0; yaw = 0;
      return;
    }
    setActive(i);
    jump = { from: window.scrollY, to, t: 0, dur: clamp(.65 + Math.abs(to - window.scrollY) / 4200, .65, 1.45) };
  }

  function setActiveFromScroll() {
    if (lockActive || !headTops.length) return;
    const anchor = window.scrollY + ANCHOR_Y;
    let idx = 0;
    for (let i = 0; i < headTops.length; i++) if (headTops[i] >= 0 && headTops[i] <= anchor) idx = i;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= max - 1) idx = headTops.length - 1;
    setActive(idx);
  }

  function step(dt) {
    const still = media.matches;
    if (jump) {
      jump.t += dt;
      const k = easeInOutCubic(Math.min(1, jump.t / jump.dur));
      window.scrollTo(0, jump.from + (jump.to - jump.from) * k);
      if (jump.t >= jump.dur) { jump = null; lockActive = false; }
    } else {
      setActiveFromScroll();
    }
    if (dt > 0) {
      const speed = clamp((window.scrollY - prevScroll) / dt, -16000, 16000);
      scrollSpeed += (speed - scrollSpeed) * (1 - Math.exp(-dt * 10));
    }
    prevScroll = window.scrollY;
    if (!still) phase += dt;
    // Damped spring, semi-implicit Euler, capped step.
    const sdt = Math.min(.032, dt);
    vy += (180 * (targetY - y) - 24 * vy) * sdt;
    y += vy * sdt;
    if (Math.abs(targetY - y) < .1 && Math.abs(vy) < .2) { y = targetY; vy = 0; }
    if (still) { y = targetY; vy = 0; }
    // Lean and yaw follow velocity, smoothed scroll speed and a gentle sway.
    const rollTarget = clamp(vy * .035 + scrollSpeed * .012, -20, 20) + (still ? 0 : Math.sin(phase * 1.8) * 1.4);
    const yawTarget = clamp(vy * .05 + scrollSpeed * .06, -48, 48) + (still ? 0 : Math.sin(phase * .9) * 3);
    const lerp = 1 - Math.exp(-dt * 12);
    roll += (rollTarget - roll) * lerp;
    yaw += (yawTarget - yaw) * lerp;
    if (still) { roll = 0; yaw = 0; }
  }

  function draw() {
    const still = media.matches;
    // 与组件一致的行程限制：船心不越过航线端点内收 54px 的范围。
    const cMin = routeTop + 54, cMax = routeBottom - 54;
    const c = clamp(y + (still ? 0 : Math.sin(phase * 2.2) * .85), cMin, cMax);
    curve.setAttribute("d", curveFor(c));
    ship.style.transform = `translateY(${c - SHIP_HALF}px) perspective(300px) rotateY(${yaw}deg) rotateZ(${roll}deg)`;
    ripples.forEach((r, i) => {
      if (still) { r.style.opacity = "0"; return; }
      const p = (phase / 2.4 + i / 2) % 1;
      r.setAttribute("rx", String(24 + 42 * p));
      r.setAttribute("ry", String(6 + 13 * p));
      r.style.opacity = String(Math.pow(Math.sin(p * Math.PI), 2) * .24);
    });
  }

  function frame(now) {
    const dt = last ? Math.min(.032, (now - last) / 1000) : 0;
    last = now;
    if (links.length) { step(dt); draw(); }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // Direct input cancels a running jump; the reader takes over.
  ["wheel", "touchmove"].forEach(type => window.addEventListener(type, interruptJump, { passive: true }));
  window.addEventListener("keydown", e => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) interruptJump();
  });
  window.addEventListener("resize", measure);
  new MutationObserver(() => { interruptJump(); bind(); }).observe(nav, { childList: true });
  new MutationObserver(() => { measure(); setActiveFromScroll(); }).observe(toc, { attributes: true, attributeFilter: ["hidden"] });

  prevScroll = window.scrollY;
  bind();
  /* 与组件的首帧定位一致：船先吸附到当前小节，不从 0 冲过去。 */
  y = targetY;
}
