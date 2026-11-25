/* Solen Design — 模型思考强度滑块：自包含交互核心。
   引擎只依赖 gsap；样式随组件内嵌，挂载到宿主的 shadow root。 */

import { gsap } from "gsap";

/* 场景用色 —— 明亮基调，组件内自持，不读外部样式。 */
const TOKENS = {
  "--theme-accent": "#339CFF",
  "--theme-accent-hover": "#2563EB",
  "--theme-bg": "#FFFFFF",
  "--theme-elevated": "#FFFFFF",
  "--theme-fg": "#1F2937",
  "--theme-text-secondary": "#707784",
  "--theme-border": "#E6E8EC",
  "--theme-hover": "#F4F4F6",
  "--theme-selection": "#DCEBFE",
};

const STOPS = [
  { value: "simple", label: "简单" },
  { value: "medium", label: "中度" },
  { value: "deep", label: "深度" },
];

const CSS = `
:host{display:block}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
.solen-effort-stage{display:flex;align-items:center;justify-content:center;min-height:var(--motion-height,420px);padding:24px 16px;background:var(--theme-bg)}
.solen-effort-panel{width:264px;max-width:100%}
.solen-effort{--effort-ratio:0;--effort-hue:calc(210 + var(--effort-ratio)*var(--effort-ratio)*63);min-width:0}
.solen-effort-track{position:relative;display:block;width:100%;height:30px;padding:0;border:0;border-radius:999px;corner-shape:round;background:color-mix(in srgb,var(--theme-fg) 10%,var(--theme-bg));overflow:hidden;cursor:grab;touch-action:none;appearance:none}
.solen-effort[data-dragging] .solen-effort-track{cursor:grabbing}
.solen-effort-track:focus-visible{outline:2px solid color-mix(in srgb,var(--theme-fg) 60%,transparent);outline-offset:2px}
.solen-effort-fill{position:absolute;inset:0;pointer-events:none;clip-path:inset(0 calc((100% - 32px)*(1 - var(--effort-ratio))) 0 0 round 999px)}
.solen-effort-fill canvas{width:100%;height:100%;display:block}
.solen-effort-dots{position:absolute;inset:0 16px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;transition:opacity 300ms}
.solen-effort-dots span{width:4px;height:4px;border-radius:50%;corner-shape:round;background:color-mix(in srgb,var(--theme-fg) 30%,transparent)}
.solen-effort[data-maximum] .solen-effort-dots{opacity:0}
.solen-effort-thumb{position:absolute;left:calc((100% - 32px)*var(--effort-ratio) + 3px);top:2px;width:26px;height:26px;border-radius:var(--effort-jelly-left,50%) var(--effort-jelly-right,50%) var(--effort-jelly-right,50%) var(--effort-jelly-left,50%)/50%;corner-shape:round;border:1px solid color-mix(in srgb,var(--theme-fg) 10%,transparent);background:#fafafa;box-shadow:0 1px 3px #0002;pointer-events:none;scale:var(--effort-press,1);transform:translateX(var(--effort-jelly-offset,0px)) skewX(var(--effort-jelly-skew,0deg)) scale(var(--effort-jelly-x,1),var(--effort-jelly-y,1));transform-origin:center;transition:border-color 180ms,box-shadow 180ms}
.solen-effort-track:hover .solen-effort-thumb{border-color:color-mix(in srgb,var(--theme-fg) 20%,transparent)}
.solen-effort[data-dragging] .solen-effort-thumb{transition-duration:0ms;box-shadow:0 2px 5px #0003}
.solen-effort-stops{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:center;margin-top:6px;font-size:11px}
.solen-effort-stops button{min-width:32px;justify-self:center;padding:3px 2px;background:transparent;border:0;color:var(--theme-text-secondary);cursor:pointer;font:inherit;font-size:11px;border-radius:calc(3px*var(--solen-corner-scale,1.6))}
.solen-effort-stops button:first-child{justify-self:start}
.solen-effort-stops button:last-child{justify-self:end}
.solen-effort-stops button[aria-pressed="true"]{color:hsl(var(--effort-hue) 75% 43%);font-weight:600}
.solen-effort-stops button:focus-visible{outline:2px solid var(--theme-fg);outline-offset:2px}
.solen-effort[data-disabled]{opacity:.5;pointer-events:none}
`;

/* 阻尼弹簧近似为缓动函数：springEase(stiffness, damping, duration)。 */
function springEase(stiffness, damping, duration) {
  const decay = damping / 2;
  const frequency = Math.sqrt(stiffness - decay * decay);
  return (progress) => {
    if (progress === 0 || progress === 1) return progress;
    const time = progress * duration;
    return 1 - Math.exp(-decay * time) * (Math.cos(frequency * time) + (decay / frequency) * Math.sin(frequency * time));
  };
}

/* 位置滑行的采样弹簧曲线（500ms 不超调）。 */
const SPRING = [
  [0, 0], [0.02, 0.015], [0.04, 0.0532], [0.06, 0.1065], [0.08, 0.1686],
  [0.1, 0.2351], [0.13, 0.3363], [0.16, 0.4332], [0.2, 0.5495], [0.24, 0.648],
  [0.28, 0.7287], [0.33, 0.807], [0.38, 0.8646], [0.44, 0.9128], [0.5, 0.9447],
  [0.57, 0.968], [0.65, 0.9834], [0.74, 0.9924], [0.85, 0.9975], [1, 1],
];
const glideEase = (progress) => {
  const end = SPRING.findIndex(([x]) => x >= progress);
  if (end <= 0) return end === 0 ? 0 : 1;
  const [x0, y0] = SPRING[end - 1];
  const [x1, y1] = SPRING[end];
  return y0 + ((y1 - y0) * (progress - x0)) / (x1 - x0);
};
const returnEase = springEase(400, 23, 0.72);

/* 轨道星场：对角柔光带 + 64 个星点，相位随强度与拖速积分推进。 */
function createEffortField(canvas, getRatio) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let phase = 0;
  let lastTime = 0;
  const stars = Array.from({ length: 64 }, (_, i) => ({
    x: (i * 0.61803398875) % 1,
    y: (i * 0.754877666) % 1,
    size: 0.35 + (i % 5) * 0.13,
    speed: 0.3 + (i % 7) * 0.1,
  }));
  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (time = 0, still = false, motionBoost = 1) => {
    if (!ctx || width <= 0 || height <= 0) return;
    const ratio = getRatio();
    if (!still) phase += Math.min(Math.max(time - lastTime, 0), 0.05) * (0.16 + ratio * 0.85) * Math.max(1, motionBoost);
    lastTime = time;
    const hue = 210 + ratio * ratio * 63;
    const fill = 32 + (width - 32) * ratio;
    ctx.clearRect(0, 0, width, height);
    const base = ctx.createLinearGradient(0, 0, Math.max(fill, 32), 0);
    base.addColorStop(0, "#30343a");
    base.addColorStop(0.28, `hsl(${hue - 12} 38% 47%)`);
    base.addColorStop(0.65, `hsl(${hue} 79% 70%)`);
    base.addColorStop(1, `hsl(${hue + 5} 88% 70%)`);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let band = 0; band < 7; band++) {
      ctx.beginPath();
      for (let x = 0; x <= width + 4; x += 4) {
        const y = height * (0.12 + band * 0.15) + Math.sin(x * 0.034 + phase + band * 1.8) * 5 + Math.sin(x * 0.079 - phase * 0.6 + band) * 2 - x * 0.035;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2 + (band % 3) * 2;
      ctx.strokeStyle = `hsla(${hue + band * 2} 90% 87% / ${0.06 + ratio * 0.025})`;
      ctx.stroke();
    }
    const glowX = fill * (0.6 + Math.sin(phase * 0.7) * 0.12);
    const glow = ctx.createRadialGradient(glowX, height * 0.7, 0, glowX, height * 0.7, 46);
    glow.addColorStop(0, `hsla(${hue - 12} 100% 88% / .35)`);
    glow.addColorStop(1, `hsla(${hue} 100% 80% / 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    for (const [i, star] of stars.entries()) {
      const x = (((star.x + phase * star.speed * 0.08) % 1) + 1) % 1 * width;
      const y = (((star.y - phase * star.speed * 0.04) % 1) + 1) % 1 * height;
      const fade = Math.min(1, x / 55);
      const twinkle = 0.45 + Math.sin(phase * 2 + i * 1.9) * 0.25;
      ctx.fillStyle = `rgba(255,255,255,${fade * twinkle * (0.4 + ratio * 0.6)})`;
      ctx.beginPath();
      ctx.ellipse(x, y, star.size * (1 + ratio * 0.5), star.size * 0.65, -0.45, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    const shade = ctx.createLinearGradient(0, 0, Math.max(fill, 32), 0);
    shade.addColorStop(0, "rgba(36,39,44,.8)");
    shade.addColorStop(0.45, "rgba(36,39,44,0)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  };
  const observer = new ResizeObserver(() => {
    resize();
    draw(lastTime, true);
  });
  observer.observe(canvas);
  resize();
  return { draw, dispose: () => observer.disconnect() };
}

/* 滑块运动状态机：位置滑行、按压、速度果冻变形、星场加速。 */
function createEffortMotion(root, canvas, initialRatio, initialReducedMotion) {
  const state = { ratio: initialRatio, press: 1, body: 0, lean: 0, boost: 1 };
  let targetRatio = initialRatio;
  let reduced = initialReducedMotion;
  let attached = false;
  let disposed = false;
  let positionTween;
  let pressTween;
  let shapeTween;
  let boostTween;
  const field = createEffortField(canvas, () => state.ratio);
  const variables = () => ({
    "--effort-ratio": String(state.ratio),
    "--effort-press": String(state.press),
    "--effort-jelly-x": String(1 + state.body),
    "--effort-jelly-y": String(1 - state.body * 0.3),
    "--effort-jelly-offset": `${-state.lean * 9}px`,
    "--effort-jelly-skew": `${-state.lean * 12}deg`,
    "--effort-jelly-left": `${50 + state.lean * 32}%`,
    "--effort-jelly-right": `${50 - state.lean * 24}%`,
  });
  const paint = () => {
    if (disposed) return;
    for (const [name, value] of Object.entries(variables())) root.style.setProperty(name, value);
    if (reduced) field.draw(gsap.ticker.time, true);
  };
  const draw = (time) => {
    if (!document.hidden) field.draw(time, false, state.boost);
  };
  const syncTicker = () => {
    if (attached) gsap.ticker.remove(draw);
    attached = !reduced;
    field.draw(gsap.ticker.time, true);
    if (attached) gsap.ticker.add(draw);
  };
  const stopTweens = () => {
    positionTween?.kill();
    pressTween?.kill();
    shapeTween?.kill();
    boostTween?.kill();
  };
  syncTicker();
  paint();
  return {
    moveTo(ratio, immediate) {
      targetRatio = Math.max(0, Math.min(1, ratio));
      positionTween?.kill();
      positionTween = gsap.to(state, {
        ratio: targetRatio,
        duration: immediate || reduced ? 0 : 0.5,
        ease: glideEase,
        onUpdate: paint,
      });
    },
    press() {
      pressTween?.kill();
      pressTween = gsap.to(state, { press: reduced ? 1 : 0.96, duration: reduced ? 0 : 0.08, onUpdate: paint });
    },
    drag(velocity) {
      if (reduced || disposed) return;
      const speed = Math.min(3.5, Math.abs(velocity));
      const deformation = Math.min(0.46, 0.045 + speed * 0.17);
      const lean = Math.sign(velocity) * deformation;
      shapeTween?.kill();
      shapeTween = gsap.timeline({ onUpdate: paint })
        .to(state, { body: deformation, lean, duration: 0.09, ease: "power2.out" })
        .to(state, { body: 0, lean: 0, duration: 0.72, ease: returnEase }, ">0.07");
      boostTween?.kill();
      boostTween = gsap.to(state, { boost: 1 + Math.min(2.2, 0.55 + speed * 0.6), duration: 0.12, ease: "power2.out" });
    },
    release() {
      pressTween?.kill();
      shapeTween?.kill();
      boostTween?.kill();
      pressTween = gsap.to(state, { press: 1, duration: reduced ? 0 : 0.32, ease: "power2.out", onUpdate: paint });
      shapeTween = gsap.to(state, { body: 0, lean: 0, duration: reduced ? 0 : 0.72, ease: returnEase, onUpdate: paint });
      boostTween = gsap.to(state, { boost: 1, duration: reduced ? 0 : 0.7, ease: "power2.out" });
    },
    setReducedMotion(next) {
      if (next === reduced) return;
      reduced = next;
      stopTweens();
      Object.assign(state, { ratio: targetRatio, press: 1, body: 0, lean: 0, boost: 1 });
      paint();
      syncTicker();
    },
    dispose() {
      disposed = true;
      stopTweens();
      gsap.ticker.remove(draw);
      field.dispose();
    },
  };
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function mountReasoningEffortSlider(target, initial = {}) {
  const owner = target.ownerDocument;
  const browser = owner.defaultView;
  let options = { ...initial };
  let destroyed = false;

  const element = owner.createElement("div");
  element.dataset.motionSurface = "";
  element.dataset.motionComponent = "reasoning-effort-slider";
  element.style.cssText = "display:block;position:relative;min-width:0;width:100%;";
  for (const [name, token] of Object.entries(TOKENS)) element.style.setProperty(name, token);
  const shadow = element.attachShadow({ mode: "open" });
  const style = owner.createElement("style");
  style.textContent = CSS;
  shadow.append(style);
  target.append(element);

  const stage = owner.createElement("div");
  stage.className = "solen-effort-stage";
  const panel = owner.createElement("div");
  panel.className = "solen-effort-panel";
  const root = owner.createElement("div");
  root.className = "solen-effort";
  const track = owner.createElement("button");
  track.type = "button";
  track.className = "solen-effort-track";
  track.setAttribute("role", "slider");
  track.setAttribute("aria-label", "推理强度");
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", String(STOPS.length - 1));
  const fill = owner.createElement("div");
  fill.className = "solen-effort-fill";
  fill.setAttribute("aria-hidden", "true");
  const canvas = owner.createElement("canvas");
  fill.append(canvas);
  const dots = owner.createElement("div");
  dots.className = "solen-effort-dots";
  dots.setAttribute("aria-hidden", "true");
  for (let i = 0; i < STOPS.length; i++) dots.append(owner.createElement("span"));
  const thumb = owner.createElement("span");
  thumb.className = "solen-effort-thumb";
  thumb.setAttribute("aria-hidden", "true");
  track.append(fill, dots, thumb);
  const stopsRow = owner.createElement("div");
  stopsRow.className = "solen-effort-stops";
  const stopButtons = STOPS.map((stop) => {
    const button = owner.createElement("button");
    button.type = "button";
    button.textContent = stop.label;
    button.setAttribute("aria-pressed", "false");
    stopsRow.append(button);
    return button;
  });
  root.append(track, stopsRow);
  panel.append(root);
  stage.append(panel);
  shadow.append(stage);

  /* 状态：value 是已提交档位，preview 是 0..2 的连续预览值。 */
  let value = STOPS.some((stop) => stop.value === options.value) ? options.value : "medium";
  let preview = STOPS.findIndex((stop) => stop.value === value);
  let dragging = false;
  let gesture = null;
  let disposed = false;

  const systemMedia = browser.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => options.reducedMotion ?? systemMedia.matches;
  const motion = createEffortMotion(root, canvas, preview / (STOPS.length - 1), reduced());
  const dispatch = (name, detail) => element.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));

  const paint = () => {
    const index = clamp(Math.round(preview), 0, STOPS.length - 1);
    root.toggleAttribute("data-dragging", dragging);
    root.toggleAttribute("data-maximum", index === STOPS.length - 1);
    root.toggleAttribute("data-disabled", Boolean(options.disabled));
    track.setAttribute("aria-valuenow", String(index));
    track.setAttribute("aria-valuetext", STOPS[index].label);
    track.setAttribute("aria-disabled", options.disabled ? "true" : "false");
    for (const [i, button] of stopButtons.entries()) button.setAttribute("aria-pressed", String(i === index));
  };

  const syncMotion = () => motion.moveTo(preview / (STOPS.length - 1), dragging);

  const commit = (index) => {
    const next = clamp(Math.round(index), 0, STOPS.length - 1);
    preview = next;
    paint();
    syncMotion();
    const nextValue = STOPS[next].value;
    if (nextValue !== value) {
      value = nextValue;
      options.onValueChange?.(nextValue);
      dispatch("thinking-change", { value: nextValue });
    }
  };

  const cancel = () => {
    dragging = false;
    gesture = null;
    preview = STOPS.findIndex((stop) => stop.value === value);
    paint();
    syncMotion();
    motion.release();
  };

  const ratioFromEvent = (event) => {
    const rect = track.getBoundingClientRect();
    if (rect.width <= 32) return 0;
    return clamp((event.clientX - rect.left - 16) / (rect.width - 32), 0, 1);
  };

  track.addEventListener("pointerdown", (event) => {
    if (options.disabled || destroyed) return;
    if (!event.isPrimary || event.button !== 0) {
      event.preventDefault();
      return;
    }
    track.setPointerCapture(event.pointerId);
    gesture = { id: event.pointerId, startX: event.clientX, lastX: event.clientX, time: event.timeStamp, moved: false };
    preview = ratioFromEvent(event) * (STOPS.length - 1);
    dragging = false;
    paint();
    syncMotion();
    motion.press();
  });
  track.addEventListener("pointermove", (event) => {
    const current = gesture;
    if (!current || event.pointerId !== current.id || options.disabled) return;
    if (!current.moved && Math.abs(event.clientX - current.startX) < 4) return;
    current.moved = true;
    if (!dragging) {
      dragging = true;
      paint();
    }
    const velocity = (event.clientX - current.lastX) / Math.max(8, event.timeStamp - current.time);
    motion.drag(velocity);
    current.lastX = event.clientX;
    current.time = event.timeStamp;
    preview = ratioFromEvent(event) * (STOPS.length - 1);
    paint();
    syncMotion();
  });
  const finishGesture = (event) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    gesture = null;
    dragging = false;
    commit(preview);
    paint();
    motion.release();
  };
  track.addEventListener("pointerup", finishGesture);
  track.addEventListener("pointercancel", () => {
    if (gesture) cancel();
  });
  track.addEventListener("lostpointercapture", () => {
    if (gesture) cancel();
  });
  track.addEventListener("keydown", (event) => {
    if (options.disabled) return;
    const index = clamp(Math.round(preview), 0, STOPS.length - 1);
    let next = index;
    if (["ArrowRight", "ArrowUp", "PageUp"].includes(event.key)) next = index + 1;
    else if (["ArrowLeft", "ArrowDown", "PageDown"].includes(event.key)) next = index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = STOPS.length - 1;
    else return;
    event.preventDefault();
    event.stopPropagation();
    commit(next);
  });
  for (const [index, button] of stopButtons.entries()) {
    button.addEventListener("click", () => {
      if (!options.disabled && !destroyed) commit(index);
    });
  }

  const syncMedia = () => {
    motion.setReducedMotion(reduced());
  };
  systemMedia.addEventListener("change", syncMedia);

  const applyHeight = () => {
    element.style.setProperty("--motion-height", `${options.height ?? 420}px`);
  };
  applyHeight();
  paint();
  syncMotion();

  return {
    element,
    root: shadow,
    update(next = {}) {
      if (destroyed) return;
      const previousValue = value;
      options = { ...options, ...next };
      applyHeight();
      if (STOPS.some((stop) => stop.value === options.value) && options.value !== previousValue) {
        value = options.value;
        preview = STOPS.findIndex((stop) => stop.value === value);
        paint();
        syncMotion();
        return;
      }
      paint();
      if (next.reducedMotion !== undefined) syncMedia();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      systemMedia.removeEventListener("change", syncMedia);
      motion.dispose();
      element.remove();
    },
  };
}
