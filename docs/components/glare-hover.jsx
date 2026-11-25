/* Component metadata only — the live demo and gallery preview live in
   glare-hover-demo.jsx, the framework source texts and the prompt in
   glare-hover-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with glare-hover-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "width", type: "number | string", default: '"auto"', description: "面板宽度，数字按 px" },
  { name: "height", type: "number | string", default: '"auto"', description: "面板高度，数字按 px" },
  { name: "background", type: "string", default: '"transparent"', description: "面板底色，任意 CSS 颜色或渐变" },
  { name: "borderRadius", type: "string", default: '"10px"', description: "面板圆角" },
  { name: "borderColor", type: "string", default: '"transparent"', description: "1px 描边的颜色" },
  { name: "children", type: "ReactNode", default: "—", description: "被扫光覆盖的面板内容" },
  { name: "glareColor", type: "string", default: '"#ffffff"', description: "光带的颜色" },
  { name: "glareOpacity", type: "number", default: "0.5", description: "光带峰值不透明度 0–1" },
  { name: "glareAngle", type: "number", default: "-45", description: "光带行进方向（deg）" },
  { name: "glareSize", type: "number", default: "30", description: "光带厚度占面板对角线的百分比" },
  { name: "softness", type: "number", default: "0.6", description: "光带轮廓的柔和度 0–1" },
  { name: "variant", type: '"streak" | "twin" | "sheen"', default: '"streak"', description: "光带轮廓预设：单条主光、一主一辅双光带、整面柔光幕" },
  { name: "blendMode", type: "string", default: '"screen"', description: "光带层的 mix-blend-mode" },
  { name: "rimGlint", type: "boolean", default: "true", description: "随主光带同步滑过 1px 边框的滑光" },
  { name: "mode", type: '"hover" | "follow" | "click" | "loop"', default: '"hover"', description: "触发方式：进出场扫过、跟随光标、点击闪扫、定时循环" },
  { name: "transitionDuration", type: "number", default: "650", description: "一次完整横扫的基准时长（ms），按实际行程比例缩放，下限 120" },
  { name: "interval", type: "number", default: "3", description: "loop 模式的扫光间隔（s），下限 0.5" },
  { name: "playOnce", type: "boolean", default: "false", description: "hover 模式进入时扫一次，离开不再扫出" },
  { name: "intro", type: "boolean", default: "false", description: "首次 ≥40% 进入视口时自动扫一次（每次挂载只一次）" },
  { name: "className", type: "string", default: '""', description: "面板附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "面板内联样式" },
];

export default {
  id: "glare-hover",
  name: "扫光悬停",
  href: "glare-hover.html",
  title: "扫光悬停",
  description:
    "一层会随光标方向扫过面板的光带：进入时从光标来的一侧横扫到另一侧，离开时朝离开侧扫出；33 段渐变光带由轮廓曲线在 JS 里生成（单光 / 双光 / 柔光幕三种预设），screen 等混合模式叠在内容上，1px 边框上还有一圈同步滑过的滑光。follow 模式让光带以弹簧跟随光标、整层淡入淡出，click 模式点击闪扫，loop 模式定时循环且离屏暂停；键盘 focus-visible 也会触发一次。帧循环自睡，减少动态时全部静默。",
  tags: ["React", "CSS", "悬停", "光效"],

  cardDescription: "一道光带顺着光标来向扫过面板，边框上还有一圈同步滑光。",

  demoHint: "从面板不同侧进入看扫光方向；切 follow 用弹簧跟手，click 点击闪扫，loop 定时循环。",

  api: API,
};
