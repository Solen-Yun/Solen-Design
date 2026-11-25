/* Component metadata only — the live demo and gallery preview live in
   glass-icons-demo.jsx, the framework source texts and the prompt in
   glass-icons-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with glass-icons-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ id?: string; label: string; icon: ReactNode; color?: string; href?: string; target?: string; onClick?: () => void; className?: string }[]", default: "[]", description: "图标条目；color 用内置色名或任意 CSS 渐变，带 href 渲染成链接" },
  { name: "size", type: "number", default: "82", description: "单块玻璃的边长（px，最小 24）" },
  { name: "gap", type: "number", default: "66", description: "玻璃块间距（px）" },
  { name: "columns", type: "number", default: "3", description: "每行块数，容器最大宽度据此推导" },
  { name: "roundness", type: "number", default: "0.6", description: "圆角程度 0–1" },
  { name: "refraction", type: "number", default: "0.8", description: "玻璃后方色板的折射强度 0–1.5" },
  { name: "bevel", type: "number", default: "0.6", description: "玻璃边缘斜面宽度 0–1" },
  { name: "dispersion", type: "number", default: "0", description: "折射的色散分离程度 0–1" },
  { name: "frost", type: "number", default: "0.2", description: "色板柔化与玻璃模糊程度 0–1" },
  { name: "shine", type: "number", default: "0.85", description: "边缘高光强度 0–1" },
  { name: "tint", type: "string", default: '"#dfdfdf"', description: "玻璃染色" },
  { name: "tintOpacity", type: "number", default: "0.2", description: "玻璃染色不透明度 0–1" },
  { name: "iconColor", type: "string", default: "—", description: "图标颜色；默认白色，浅色无板主题下自动换深色" },
  { name: "plate", type: '"tilt" | "offset" | "circle" | "none"', default: '"tilt"', description: "色板姿态：斜置、偏移、圆形、无板" },
  { name: "tilt", type: "number", default: "30", description: "tilt 色板的倾斜角（deg）" },
  { name: "spread", type: "number", default: "0.5", description: "色板偏移幅度 0–1" },
  { name: "hover", type: '"lift" | "float" | "press" | "none"', default: '"press"', description: "悬停行为：抬升、悬浮、按压，或无" },
  { name: "parallax", type: "number", default: "1", description: "色板跟随指针的视差量 0–1" },
  { name: "labels", type: '"hover" | "always" | "none"', default: '"hover"', description: "标签何时显示" },
  { name: "intro", type: "boolean", default: "true", description: "进入视口时逐块错峰入场" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "标签/边缘/阴影配色" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "glass-icons",
  name: "液态玻璃图标排",
  href: "glass-icons.html",
  title: "液态玻璃图标排",
  description:
    "一排液态玻璃图标：后方色板被玻璃折射弯折、可加色散分离，边缘斜面描出高光，光向跟着指针走；WebGL2 SDF 着色器绘制，无 GL 时回退 backdrop-filter 加预烘焙折射贴图；弹簧引擎驱动抬升/悬浮/按压三种悬停与进入视口的错峰入场，色板支持斜置/偏移/圆形/无板四种姿态。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "玻璃后面的色板被折射弯折，光随指针走，悬停整块会动。",

  demoHint: "在图标上移动指针看光向追踪；换色板姿态与悬停行为，拉高 dispersion 看色散。",

  api: API,
};
