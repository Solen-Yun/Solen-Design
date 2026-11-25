// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const smoothstep = (min, max, value) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

const DEFAULTS = {
  items: [],
  speed: 0.55,
  direction: "up",
  animationMode: "auto",
  radius: 170,
  cardWidth: 100,
  cardHeight: 100,
  verticalSpacing: 60,
  perspective: 1000,
  cardsPerTurn: 7,
  rotation: 0,
  cardTilt: 0,
  cardRadius: 10,
  centerScale: 1.2,
  edgeFade: 0.3,
  edgeBlur: 6,
  pauseOnHover: true,
  imageFit: "cover",
  grayscale: 0,
};

export function mountInfiniteSpiral(target, options = {}) {
  const scope = createSurface(
    target,
    {
      width: 900,
      height: 480,
      responsive: false,
      markup: `
<div class="infinite-spiral"><div class="infinite-spiral__stage" role="list" aria-label="Infinite spiral gallery"></div></div>
`,
      css: `
.infinite-spiral{position:relative;width:100%;height:var(--motion-height,480px);min-height:320px;overflow:hidden;isolation:isolate}
.infinite-spiral__stage{position:absolute;inset:0;transform-style:preserve-3d}
.infinite-spiral__item{position:absolute;top:50%;left:50%;display:block;width:var(--infinite-spiral-card-width);height:var(--infinite-spiral-card-height);overflow:hidden;border:1px solid rgb(255 255 255/.24);border-radius:var(--infinite-spiral-card-radius);background:rgb(255 255 255/.08);box-shadow:0 14px 38px rgb(8 6 18/.2);transform-style:preserve-3d;backface-visibility:hidden;will-change:transform,opacity,filter;text-decoration:none}
.infinite-spiral__image{position:absolute;inset:0;display:block;width:100%;height:100%;object-position:center;user-select:none}
@media (prefers-reduced-motion:reduce){.infinite-spiral__item{transition:none}}
`,
    },
    options,
  );
  const { document, window, on, requestAnimationFrame, cancelAnimationFrame, ResizeObserver, IntersectionObserver, matchMedia } = scope;
  const controller = scope.controller;

  const settings = { ...DEFAULTS, ...options };

  const root = document.querySelector(".infinite-spiral");
  const stage = root.querySelector(".infinite-spiral__stage");

  let cards = [];
  let images = [];
  let builtKey = "";
  function build() {
    const key = JSON.stringify(settings.items) + "|" + settings.imageFit;
    if (key === builtKey) return;
    builtKey = key;
    stage.textContent = "";
    cards = [];
    images = [];
    const items = settings.items.map((item, index) =>
      typeof item === "string"
        ? { src: item, alt: `Spiral image ${index + 1}` }
        : { alt: `Spiral image ${index + 1}`, ...item },
    );
    items.forEach((item, index) => {
      const card = document.createElement(item.href ? "a" : "div");
      card.className = "infinite-spiral__item";
      if (item.href) {
        card.href = item.href;
        if (item.target) card.target = item.target;
        if (item.target === "_blank") card.rel = "noreferrer";
      }
      card.setAttribute("role", "listitem");
      card.setAttribute("aria-label", item.label ?? item.alt);
      const image = document.createElement("img");
      image.className = "infinite-spiral__image";
      image.src = item.src;
      image.alt = item.alt;
      image.loading = index < 6 ? "eager" : "lazy";
      image.draggable = false;
      image.style.objectFit = settings.imageFit;
      card.appendChild(image);
      stage.appendChild(card);
      cards.push(card);
      images.push(image);
    });
  }

  function applyChrome() {
    root.style.perspective = `${settings.perspective}px`;
    root.style.setProperty("--infinite-spiral-card-width", `${settings.cardWidth}px`);
    root.style.setProperty("--infinite-spiral-card-height", `${settings.cardHeight}px`);
    root.style.setProperty("--infinite-spiral-card-radius", `${settings.cardRadius}px`);
    images.forEach((image) => {
      image.style.filter = `grayscale(${Math.min(1, Math.max(0, settings.grayscale))})`;
    });
    const drag = settings.animationMode === "drag" || settings.animationMode === "all";
    root.style.cursor = drag ? "grab" : "default";
    root.style.touchAction = drag ? "pan-x" : "auto";
    root.style.userSelect = drag ? "none" : "auto";
  }

  /* Motion state — one shared progress drives every card. */
  let progress = 0;
  let targetProgress = 0;
  let autoSpeed = 0;
  let hovered = false;
  let visible = true;
  let dragging = false;
  let lastPointerY = 0;
  let dragMoved = false;
  let rafId = 0;
  let previous = 0;

  let bounds = root.getBoundingClientRect();
  const resizeObserver = new ResizeObserver(() => {
    bounds = root.getBoundingClientRect();
  });
  resizeObserver.observe(root);
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    { threshold: 0.02 },
  );
  intersectionObserver.observe(root);

  const scrollEnabled = () => settings.animationMode === "scroll" || settings.animationMode === "all";
  let lastScrollY = window.scrollY;
  function handleScroll() {
    const nextScrollY = window.scrollY;
    const scrollDelta = nextScrollY - lastScrollY;
    lastScrollY = nextScrollY;
    if (!scrollEnabled() || !visible || scrollDelta === 0) return;
    const speedMultiplier = Math.max(settings.speed, 0) / 0.55;
    targetProgress += clamp(
      (scrollDelta * speedMultiplier) / Math.max(settings.verticalSpacing * 2, 1),
      -1.5,
      1.5,
    );
    if (media.matches) draw();
  }
  on(window, "scroll", handleScroll, { passive: true });

  function draw() {
    const count = cards.length;
    if (!count) return;
    const half = count / 2;
    const width = Math.max(bounds.width, 1);
    const height = Math.max(bounds.height, 1);
    const fit = Math.min(1, width / (settings.cardWidth * 2.8), height / (settings.cardHeight * 2.35));
    const responsiveRadius = Math.min(settings.radius, Math.max(72, width * 0.36)) * fit;
    const fadeStart = clamp(1 - settings.edgeFade, 0, 0.98);
    const turnSize = Math.max(settings.cardsPerTurn, 1);

    cards.forEach((card, index) => {
      let offset = index - progress;
      offset = modulo(offset + half, count) - half;

      const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
      const opacity = 1 - smoothstep(fadeStart, 1, edge);
      const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
      const scale = (1 + (settings.centerScale - 1) * focus) * fit;
      const angle = offset * (360 / turnSize) + settings.rotation;
      const angleRadians = (angle * Math.PI) / 180;
      const x = Math.sin(angleRadians) * responsiveRadius;
      const z = Math.cos(angleRadians) * responsiveRadius;
      const depthScale = clamp(settings.perspective / Math.max(settings.perspective - z, 1), 0.72, 1.45);
      const visualScale = scale * depthScale;
      const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
      const blur = settings.edgeBlur * smoothstep(0.35, 1, edge);
      card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * settings.verticalSpacing * fit}px, 0) rotateZ(${settings.cardTilt}deg) scale(${visualScale})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
      card.style.zIndex = String(Math.round(depth * 100000) + index);
      card.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
    });
  }

  function tick(time) {
    rafId = 0;
    const delta = Math.min((time - previous) / 1000, 0.05);
    previous = time;

    const autoEnabled = settings.animationMode === "auto" || settings.animationMode === "all";
    const motionPaused = dragging || (settings.pauseOnHover && hovered);
    const directionMultiplier = settings.direction === "down" ? -1 : 1;
    const desiredAutoSpeed =
      autoEnabled && visible && !media.matches && !motionPaused
        ? settings.speed * directionMultiplier
        : 0;
    const speedBlend = 1 - Math.exp(-delta * 7);
    autoSpeed += (desiredAutoSpeed - autoSpeed) * speedBlend;
    targetProgress += autoSpeed * delta;

    const followBlend = 1 - Math.exp(-delta * (dragging ? 22 : 11));
    progress += (targetProgress - progress) * followBlend;

    draw();
    rafId = requestAnimationFrame(tick);
  }
  function run() {
    if (!rafId) {
      previous = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  const dragEnabled = () => settings.animationMode === "drag" || settings.animationMode === "all";
  function stopDragging(event) {
    if (!dragging) return;
    dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.cursor = dragEnabled() ? "grab" : "default";
  }
  on(root, "mouseenter", () => {
    hovered = true;
  });
  on(root, "mouseleave", () => {
    hovered = false;
  });
  on(root, "pointerdown", (event) => {
    if (!dragEnabled() || event.button !== 0) return;
    dragging = true;
    dragMoved = false;
    lastPointerY = event.clientY;
    targetProgress = progress;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  });
  on(root, "pointermove", (event) => {
    if (!dragging) return;
    const pointerDelta = event.clientY - lastPointerY;
    lastPointerY = event.clientY;
    if (Math.abs(pointerDelta) > 0.5) dragMoved = true;
    targetProgress -= pointerDelta / Math.max(settings.verticalSpacing, 1);
    if (media.matches) draw();
  });
  on(root, "pointerup", stopDragging);
  on(root, "pointercancel", stopDragging);
  on(root, "click", (event) => {
    if (!dragMoved) return;
    event.preventDefault();
    event.stopPropagation();
    dragMoved = false;
  }, true);
  media.addEventListener("change", () => {
    cancelAnimationFrame(rafId);
    rafId = 0;
    draw();
    run();
  });

  build();
  applyChrome();
  draw();
  run();

  return {
    element: controller.element,
    root: controller.root,
    destroy: controller.destroy,
    update(next) {
      Object.assign(settings, next ?? {});
      build();
      applyChrome();
      controller.update({ height: next?.height });
      draw();
    },
  };
}
