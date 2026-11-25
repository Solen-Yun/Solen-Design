/* Component metadata only — the live demo and gallery preview live in
   light-pillar-demo.jsx, the framework source texts and the prompt in
   light-pillar-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with light-pillar-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "topColor", type: "string", default: '"#5227FF"', description: "光柱上端的颜色；任意 CSS 颜色" },
  { name: "bottomColor", type: "string", default: '"#FF9FFC"', description: "光柱底部的颜色；任意 CSS 颜色" },
  { name: "intensity", type: "number", default: "1", description: "最终亮度倍率，下限 0" },
  { name: "rotationSpeed", type: "number", default: "0.3", description: "相机环绕速度，0 冻结" },
  { name: "flow", type: "number", default: "1", description: "内部噪声流动速度" },
  { name: "interactive", type: "boolean", default: "true", description: "光柱随鼠标倾斜与平移" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击沿柱轴发出光环，最多同时 3 道" },
  { name: "glowAmount", type: "number", default: "0.002", description: "光线步进能量尺度，下限 0" },
  { name: "bloom", type: "number", default: "0.5", description: "mip 光晕强度，下限 0" },
  { name: "pillarWidth", type: "number", default: "3", description: "光柱半径（世界单位），下限 0.05" },
  { name: "pillarHeight", type: "number", default: "0.4", description: "噪声场的纵向拉伸" },
  { name: "pillarRotation", type: "number", default: "25", description: "柱轴倾角（度）" },
  { name: "twist", type: "number", default: "0.4", description: "噪声域旋转量" },
  { name: "detail", type: "number", default: "4", description: "扭曲层数，clamp 1–6" },
  { name: "noiseIntensity", type: "number", default: "0.5", description: "胶片颗粒强度，下限 0" },
  { name: "fade", type: "number", default: "0", description: "四边渐隐比例，clamp 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 2.1s 点火扫亮显影" },
  { name: "mixBlendMode", type: "string", default: '"screen"', description: "容器混合模式" },
  { name: "quality", type: '"low" | "medium" | "high"', default: '"high"', description: "渲染尺度档位（0.35 / 0.5 / 0.6），帧率低时自动降档" },
  { name: "resolution", type: "number", default: "按 quality", description: "显式渲染倍率，clamp 0.25–2，优先于 quality" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面墨彩输出（近灰配色自动转深墨）" },
  { name: "paused", type: "boolean", default: "false", description: "冻结环绕与流动；交互仍渲染" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "light-pillar",
  name: "光柱旋涡",
  href: "light-pillar.html",
  title: "光柱旋涡",
  description:
    "暗色空间里一根缓慢环绕的光柱：光线步进穿过扭曲的周期场，能量沿柱身凝成层叠光带缓缓上升，底部到顶部由双色渐变换算；挂载时一道亮锋沿柱轴扫过把柱身点燃，光标带着柱身倾斜平移，点击沿轴心送出一圈圈上行的光环。双通道渲染——低尺度离屏场 + 双三次上采样合成，mip 光晕取 3–6 级，帧率过低自动降渲染档、空闲后回升；默认 screen 混合叠在宿主背景上，浅色页面可切墨彩输出。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "双色光柱缓缓旋转上升，点击送出沿轴光环。",

  demoHint: "移动鼠标看柱身倾斜，点击送出上行光环；双色、宽度、倾角与泛光可调。",

  api: API,
};
