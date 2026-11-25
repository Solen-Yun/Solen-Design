/* Component metadata only — the live demo and gallery preview live in
   prism-demo.jsx, the framework source texts and the prompt in
   prism-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with prism-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "height", type: "number", default: "3.5", description: "棱锥高（世界单位），≥0.1" },
  { name: "baseWidth", type: "number", default: "5.5", description: "方形底面边长，≥0.1" },
  { name: "animationType", type: '"rotate" | "rotate3d" | "hover" | "static"', default: '"rotate"', description: "闲置动画：摆旋 / 三维翻滚 / 面向鼠标悬停 / 静止" },
  { name: "glow", type: "number", default: "1", description: "光的累积强度，≥0" },
  { name: "offset", type: "{ x: number, y: number }", default: "—", description: "在画面中的平移偏移" },
  { name: "noise", type: "number", default: "0", description: "颜色噪点/颗粒量，≥0" },
  { name: "scale", type: "number", default: "3.6", description: "相机缩放；越大越近，≥0.1" },
  { name: "hueShift", type: "number", default: "0", description: "整个光谱的色相旋转（度）" },
  { name: "colorFrequency", type: "number", default: "1", description: "棱锥内光谱条带的密度，≥0" },
  { name: "colors", type: "string[]", default: "—", description: "自定义色板，最多 8 色平滑循环；不设用内置光谱" },
  { name: "saturation", type: "number", default: "1.5", description: "输出饱和度，≥0" },
  { name: "timeScale", type: "number", default: "0.5", description: "闲置动画速度；0 静止" },
  { name: "interactive", type: "boolean", default: "true", description: "棱锥朝鼠标倾斜" },
  { name: "hoverStrength", type: "number", default: "2", description: "倾斜幅度倍率，≥0" },
  { name: "inertia", type: "number", default: "0.05", description: "跟随平滑度 0.001–1；越小越飘" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时辉光 1.4s 内点燃" },
  { name: "resolution", type: "number", default: "0.5", description: "渲染分辨率比例 0.25–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：棱镜印成光谱墨，适合浅色页面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "prism",
  name: "棱镜光谱",
  href: "prism.html",
  title: "棱镜光谱",
  description:
    "一座发光的体积棱锥：100 步加性光线步进穿过方形棱锥内部，相位正弦光谱（或自定义色板纹理）在体内折出彩色条带，近面处体积吸收提亮，过曝色调映射成辉光晶体。四种动画姿态——摆旋、三维翻滚、面向鼠标悬停、静止；色相旋转、饱和度、噪点与光谱密度可调，帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "体积棱锥内部折出光谱条带，随鼠标倾斜旋转，辉光晶莹。",

  demoHint: "移动鼠标看棱锥带惯性倾斜；换动画姿态与自定义色板感受不同性格。",

  api: API,
};
