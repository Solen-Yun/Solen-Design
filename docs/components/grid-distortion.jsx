/* Component metadata only — the live demo and gallery preview live in
   grid-distortion-demo.jsx, the framework source texts and the prompt in
   grid-distortion-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with grid-distortion-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "imageSrc", type: "string", default: "—（必填）", description: "网格背后的图片：任意 URL 或 data URI；变更即重载纹理" },
  { name: "grid", type: "number", default: "15", description: "网格列数，2–120；行数按宽高比推导" },
  { name: "radius", type: "number", default: "0.18", description: "光标笔刷半径（相对容器宽），0.01–1" },
  { name: "strength", type: "number", default: "0.15", description: "笔刷增益与扭曲上限，≥ 0" },
  { name: "relaxation", type: "number", default: "0.96", description: "位移的逐帧衰减系数，0–0.995；越小回弹越快" },
  { name: "mode", type: '"drag" | "push" | "swirl"', default: '"drag"', description: "笔刷性质：顺笔拖拽 / 径向推开 / 切向拧转" },
  { name: "softness", type: "number", default: "0", description: "0–1：块状位移向双线性平滑位移过渡" },
  { name: "chroma", type: "number", default: "0", description: "0–2：位移块的 RGB 撕裂色差" },
  { name: "idle", type: "number", default: "0.3", description: "0–1：静置 2.5 秒后幽灵光标的强度；0 关闭" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击激起一圈向外扩散的波纹" },
  { name: "intro", type: "boolean", default: "true", description: "首次加载时先打散再归位并淡入" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "grid-distortion",
  name: "网格扭曲显影",
  href: "grid-distortion.html",
  title: "网格扭曲显影",
  description:
    "图片背景被切成方块网格：光标拖过时格子顺着笔势拖拽/推开/拧转（三档笔刷），位移经 tanh 软限幅、按 relaxation 逐帧回弹；点击激起扩散波纹，静置 2.5 秒后有幽灵光标沿 Lissajous 路径保持画面流动；位移场为 CPU 模拟逐帧上传的 RG32F 纹理，着色器按块采样并可切换块状/平滑混合与 RGB 色差；首次加载先打散再显影归位。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "图片随光标碎成方块拖拽回弹，静置后幽灵光标让画面持续流动。",

  demoHint: "快速拖拽看方块撕裂回弹；切 push/swirl 换笔刷手感；停手 2.5 秒看幽灵光标自己作画；点击放波纹。",

  api: API,
};
