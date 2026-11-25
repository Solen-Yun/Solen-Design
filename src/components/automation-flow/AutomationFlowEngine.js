// src/lib/motion-core/automation-flow.mjs
import { createSurface } from "./motion-runtime";
var DEFAULT_STEPS = [
  { title: "Form submitted", idle: "Website contact form", done: "A sales inquiry came in" },
  { title: "Classify with AI", idle: "Detect intent", done: "Sales · 92% sure" },
  { title: "Alert sales", idle: "#sales channel", done: "Owner assigned" },
  { title: "Add to contacts", idle: "Leads", done: "1 new lead added" }
];
var POS = [[95, 68], [95, 142], [17, 236], [173, 236]];
var COL = ["#F59E0B", "#8B5CF6", "#10B981", "#0EA5E9"];
var ICO = [
  '<rect x="3" y="2" width="8" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5h4M5 7.5h4M5 10h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
  '<path d="M7 1.5l1.3 3.2 3.2 1.3-3.2 1.3L7 10.5 5.7 7.3 2.5 6l3.2-1.3z" fill="currentColor"/><circle cx="11" cy="11" r="1.4" fill="currentColor"/>',
  '<path d="M3.5 9.5V6.5a3.5 3.5 0 0 1 7 0v3l1 1.5h-9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5.8 12.5h2.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  '<circle cx="7" cy="5" r="2.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 12.5c.6-2.4 2.3-3.6 4.5-3.6s3.9 1.2 4.5 3.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
];
var markup = `<div class="af-stage">
  <div class="af-card">
    <div class="af-hd"><div><b>Auto-sort new inquiries</b><small>On · 24 runs today</small></div><button type="button" class="af-run"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 1.5l6 3.5-6 3.5z" fill="currentColor"/></svg><span></span></button></div>
    <svg class="af-cv" viewBox="0 0 340 340" aria-hidden="true"><path d="M170 112 V142"/><path d="M170 186 C170 214 92 206 92 236"/><path d="M170 186 C170 214 248 206 248 236"/><circle r="4"/><circle r="4"/><circle r="4"/></svg>
    <div class="af-ls" role="list"></div>
    <div class="af-ft" role="status"></div>
  </div>
</div>`;
var css = `
:root {
  color-scheme: light;
  --af-page: #F4F2EE;
  --af-surface: #FFFFFF;
  --af-surface-2: #F5F3EF;
  --af-surface-3: #EAE7E1;
  --af-ink: #16151B;
  --af-ink-2: #57535F;
  --af-ink-3: #8E8A97;
  --af-line: rgba(22, 21, 27, 0.09);
  --af-line-2: rgba(22, 21, 27, 0.17);
  --af-accent: #6A57F2;
  --af-accent-2: #2F8FE0;
  --af-accent-soft: rgba(106, 87, 242, 0.12);
  --af-accent-ink: #FFFFFF;
  --af-mint: #119C72;
  --af-warn: #D6731E;
  --af-danger: #D93A55;
  --af-glass: rgba(255, 255, 255, 0.58);
  --af-glass-line: rgba(255, 255, 255, 0.85);
  --af-shadow: rgba(40, 30, 80, 0.14);
  --af-shadow-strong: rgba(40, 30, 80, 0.3);
  --af-grad: linear-gradient(120deg, #7B61FF, #3D8BFF 55%, #1FB89A);
  --af-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --af-spring: cubic-bezier(0.34, 1.45, 0.64, 1);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --af-page: #07080D;
    --af-surface: #13141C;
    --af-surface-2: #1A1B25;
    --af-surface-3: #252632;
    --af-ink: #F4F0E8;
    --af-ink-2: rgba(244, 240, 232, 0.68);
    --af-ink-3: rgba(244, 240, 232, 0.42);
    --af-line: rgba(255, 255, 255, 0.08);
    --af-line-2: rgba(255, 255, 255, 0.16);
    --af-accent: #B7A4FF;
    --af-accent-2: #7DB4FF;
    --af-accent-soft: rgba(183, 164, 255, 0.15);
    --af-accent-ink: #0B0C12;
    --af-mint: #7EE8C0;
    --af-warn: #FFB26B;
    --af-danger: #FF7D8C;
    --af-glass: rgba(255, 255, 255, 0.07);
    --af-glass-line: rgba(255, 255, 255, 0.18);
    --af-shadow: rgba(0, 0, 0, 0.45);
    --af-shadow-strong: rgba(0, 0, 0, 0.72);
    --af-grad: linear-gradient(120deg, #B7A4FF, #7DB4FF 55%, #A5F2D3);
  }
}

.af-stage {
  position: relative;
  width: 340px;
  height: 340px;
  margin: 0 auto;
  color: var(--af-ink);
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
  -webkit-tap-highlight-color: transparent;
  word-break: keep-all;
  overflow-wrap: break-word;
}
/* The card visuals sit one level below the scene root: the docs demo
   stage strips the background of .motion-body's first child, so the
   340x340 board itself must not be that child. */
.af-card {
  position: absolute;
  inset: 0;
  border-radius: 30px;
  overflow: hidden;
  background:
    radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--af-ink) 12%, transparent) 1px, transparent 0) 0 0 / 14px 14px,
    var(--af-surface);
  box-shadow: 0 0 0 1px var(--af-line), 0 30px 60px -36px var(--af-shadow-strong);
}
.af-stage * { box-sizing: border-box; }
.af-stage :where(button) { font: inherit; color: inherit; cursor: pointer; }
.af-stage :focus-visible { outline: 2px solid var(--af-accent); outline-offset: 3px; }

.af-hd { position: absolute; left: 18px; right: 16px; top: 16px; display: flex; align-items: center; gap: 8px; }
.af-hd div { margin-right: auto; }
.af-hd b { display: block; font-size: 14px; font-weight: 900; letter-spacing: -0.02em; }
.af-hd small { display: flex; align-items: center; gap: 5px; margin-top: 2px; font-size: 10px; font-weight: 750; color: var(--af-ink-3); }
.af-hd small::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #10B981; }
.af-run {
  display: inline-flex; align-items: center; gap: 5px; height: 30px; padding: 0 12px 0 10px;
  border: 0; border-radius: 999px; background: var(--af-ink); color: var(--af-surface);
  font: inherit; font-size: 11px; font-weight: 850; cursor: pointer; white-space: nowrap;
}
.af-run svg { width: 10px; height: 10px; }
.af-run:disabled { opacity: 0.6; cursor: default; }
.af-run:focus-visible { outline: 2px solid var(--af-accent); outline-offset: 2px; }
.af-cv { position: absolute; left: 0; top: 0; width: 340px; height: 340px; pointer-events: none; }
.af-cv path { fill: none; stroke: var(--af-line); stroke-width: 2; transition: stroke 0.3s; }
.af-cv path.is-on { stroke: color-mix(in srgb, var(--af-accent) 60%, transparent); }
.af-cv circle { fill: var(--af-accent); opacity: 0; filter: drop-shadow(0 0 4px var(--af-accent)); }
.af-nd {
  position: absolute; width: 150px; padding: 8px 9px; border-radius: 13px; background: var(--af-surface);
  box-shadow: 0 0 0 1px var(--af-line), 0 8px 18px -12px var(--af-shadow-strong);
  display: flex; gap: 8px; align-items: flex-start;
  transition: box-shadow 0.3s, transform 0.3s;
}
.af-nd.is-run {
  box-shadow: 0 0 0 1.5px var(--af-accent), 0 10px 24px -10px color-mix(in srgb, var(--af-accent) 60%, transparent);
  transform: translateY(-1px);
}
.af-nd.is-done { box-shadow: 0 0 0 1px color-mix(in srgb, #10B981 55%, transparent), 0 8px 18px -12px var(--af-shadow-strong); }
.af-ic { flex: none; width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; color: #fff; }
.af-ic svg { width: 14px; height: 14px; }
.af-tx { flex: 1; min-width: 0; }
.af-tx b { display: block; font-size: 11px; font-weight: 850; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.af-tx span { display: block; margin-top: 1px; font-size: 9.5px; font-weight: 650; color: var(--af-ink-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.3s; }
.af-nd.is-done .af-tx span { color: var(--af-ink-2); }
.af-s { flex: none; width: 14px; height: 14px; margin-top: 1px; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--af-line); position: relative; }
.af-nd.is-run .af-s {
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--af-accent) 25%, transparent);
  border: 2px solid transparent; border-top-color: var(--af-accent); box-sizing: border-box;
  animation: af-sp 0.7s linear infinite;
}
@keyframes af-sp { to { transform: rotate(360deg); } }
.af-nd.is-done .af-s { background: #10B981; box-shadow: none; }
.af-nd.is-done .af-s::after {
  content: ""; position: absolute; left: 4.5px; top: 2.5px; width: 3px; height: 6px;
  border: solid #fff; border-width: 0 1.6px 1.6px 0; transform: rotate(45deg);
}
.af-ms { position: absolute; right: 8px; bottom: -14px; font-size: 9px; font-weight: 800; color: #059669; opacity: 0; transition: opacity 0.3s; font-variant-numeric: tabular-nums; }
.af-nd.is-done .af-ms { opacity: 1; }
.af-ft {
  position: absolute; left: 50%; bottom: 14px; transform: translate(-50%, 8px);
  padding: 6px 12px; border-radius: 999px; background: #059669; color: #fff;
  font-size: 10.5px; font-weight: 850; white-space: nowrap;
  opacity: 0; transition: opacity 0.3s, transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.af-ft.is-on { opacity: 1; transform: translate(-50%, 0); }
@media (prefers-reduced-motion: reduce) {
  .af-nd.is-run .af-s { animation: none; }
  .af-ft, .af-nd { transition: none; }
}
`;
function createAutomationFlow(host, initial) {
  const scope = createSurface(host, { width: 340, height: 340, css, markup }, initial);
  const { root, on, reduced, setTimeout, requestAnimationFrame } = scope;
  const run = root.querySelector(".af-run");
  const lb = run.querySelector("span");
  const ls = root.querySelector(".af-ls");
  const ft = root.querySelector(".af-ft");
  const P = root.querySelectorAll(".af-cv path");
  const D = root.querySelectorAll(".af-cv circle");
  let options = { ...initial };
  let steps = DEFAULT_STEPS.map((step, i) => ({ ...step, ...options.steps?.[i] }));
  const doc = host.ownerDocument;
  const nodes = DEFAULT_STEPS.map((step, i) => {
    const node = doc.createElement("div");
    node.className = "af-nd";
    node.setAttribute("role", "listitem");
    node.style.left = POS[i][0] + "px";
    node.style.top = POS[i][1] + "px";
    node.innerHTML = '<span class="af-ic" style="background:' + COL[i] + '"><svg viewBox="0 0 14 14" aria-hidden="true">' + ICO[i] + '</svg></span><span class="af-tx"><b></b><span></span></span><span class="af-s" aria-hidden="true"></span><em class="af-ms"></em>';
    node.querySelector("b").textContent = steps[i].title;
    node.querySelector(".af-tx span").textContent = steps[i].idle;
    ls.appendChild(node);
    return node;
  });
  const texts = () => nodes.map((node, i) => node.querySelector(".af-tx span"));
  let gen = 0;
  function rest() {
    nodes.forEach((node, i) => {
      node.classList.remove("is-run", "is-done");
      texts()[i].textContent = steps[i].idle;
    });
    P.forEach((p) => p.classList.remove("is-on"));
    D.forEach((c) => { c.style.opacity = 0; });
    ft.classList.remove("is-on");
  }
  function later(g, ms, fn) {
    setTimeout(() => { if (g === gen && root.isConnected) fn(); }, reduced() ? Math.min(ms, 60) : ms);
  }
  function flow(g, k, ms, done) {
    const p = P[k], c = D[k], L = p.getTotalLength(), t0 = performance.now();
    p.classList.add("is-on");
    if (reduced()) { done(); return; }
    c.style.opacity = 1;
    (function frame(now) {
      if (g !== gen) return;
      const q = Math.min(1, (now - t0) / ms);
      const e = q < 0.5 ? 2 * q * q : 1 - (-2 * q + 2) ** 2 / 2;
      const pt = p.getPointAtLength(L * e);
      c.setAttribute("cx", pt.x);
      c.setAttribute("cy", pt.y);
      if (q < 1) requestAnimationFrame(frame);
      else { c.style.opacity = 0; done(); }
    })(t0);
  }
  function step(g, i, ms, after) {
    const node = nodes[i];
    node.classList.add("is-run");
    later(g, ms, () => {
      node.classList.remove("is-run");
      node.classList.add("is-done");
      texts()[i].textContent = steps[i].done;
      node.querySelector(".af-ms").textContent = (ms / 1000).toFixed(1) + " s";
      after();
    });
  }
  function go() {
    const g = ++gen;
    const t0 = performance.now();
    rest();
    run.disabled = true;
    lb.textContent = "Running";
    step(g, 0, 300, () => {
      flow(g, 0, 520, () => {
        step(g, 1, 1100, () => {
          let left = 2;
          const end = () => {
            if (--left) return;
            run.disabled = false;
            lb.textContent = "Run again";
            ft.textContent = "Run finished · " + ((performance.now() - t0) / 1000).toFixed(1) + " s";
            ft.classList.add("is-on");
            options.onComplete?.();
          };
          flow(g, 1, 640, () => step(g, 2, 500, end));
          flow(g, 2, 640, () => step(g, 3, 800, end));
        });
      });
    });
  }
  on(run, "click", go);
  lb.textContent = "Run";
  rest();
  return {
    update(next) {
      options = { ...options, ...next };
      const heading = root.querySelector(".af-hd b");
      if (options.heading) heading.textContent = options.heading;
      const status = root.querySelector(".af-hd small");
      if (options.status) status.textContent = options.status;
      if (next.steps) {
        steps = DEFAULT_STEPS.map((step, i) => ({ ...step, ...(options.steps?.[i] ?? {}) }));
        nodes.forEach((node, i) => {
          node.querySelector("b").textContent = steps[i].title;
          const span = texts()[i];
          if (!node.classList.contains("is-run") && !node.classList.contains("is-done")) {
            span.textContent = steps[i].idle;
          }
        });
      }
      scope.controller.update(next);
    },
    destroy() { scope.destroy(); },
  };
}
function mountAutomationFlow(host, options = {}) {
  return createAutomationFlow(host, options);
}
export {
  mountAutomationFlow
};
