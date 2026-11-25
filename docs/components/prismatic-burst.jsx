/* Component metadata only — the live demo and gallery preview live in
   prismatic-burst-demo.jsx, the framework source texts and the prompt in
   prismatic-burst-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with prismatic-burst-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: "—", description: "光谱色板，最多 64 色沿光线循环；不设用内置余弦光谱" },
  { name: "intensity", type: "number", default: "2", description: "整体亮度，≥0" },
  { name: "speed", type: "number", default: "0.5", description: "动画相位速度；0 冻结" },
  { name: "animationType", type: '"rotate" | "rotate3d" | "hover"', default: '"rotate3d"', description: "闲置动画：摆旋 / 三维翻滚 / 面向鼠标" },
  { name: "distort", type: "number", default: "0", description: "光线弯曲幅度，≥0，上限 50" },
  { name: "rayCount", type: "number", default: "0", description: "把光束梳成 N 条独立光线；0 为连续光场" },
  { name: "rayWidth", type: "number", default: "1", description: "光线粗细 0.2–2.5" },
  { name: "zoom", type: "number", default: "1", description: "相机缩放；越小越拉远，≥0.05" },
  { name: "twist", type: "number", default: "0", description: "光场绕中心的螺旋扭度" },
  { name: "flow", type: "number", default: "0", description: "颜色沿光线流动的速度" },
  { name: "centerFade", type: "number", default: "1", description: "可见范围的径向衰减 0.5–3" },
  { name: "grain", type: "number", default: "0.8", description: "噪声/抖动量 0.3–1" },
  { name: "glow", type: "number", default: "0", description: "辉光泛光强度，≥0" },
  { name: "offset", type: "{ x, y }", default: "—", description: "爆辉中心的平移；数字或 px 字符串" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "鼠标提亮、视差与点击光环" },
  { name: "mouseStrength", type: "number", default: "0.5", description: "鼠标抬亮与倾斜的强度，≥0" },
  { name: "hoverDampness", type: "number", default: "0.25", description: "指针平滑滞后 0–1" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击发出外扩光环（最多 4 条）并给相位一脚加速" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时显影前锋从中心向外冲出（2.4s）" },
  { name: "fade", type: "number", default: "0", description: "容器四边柔化遮罩 0–1" },
  { name: "quality", type: '"low" | "medium" | "high"', default: '"high"', description: "渲染分辨率档位（0.35 / 0.5 / 0.7）" },
  { name: "resolution", type: "number", default: "—", description: "显式分辨率比例，覆盖 quality，0.2–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：爆辉印成颜料墨，适合浅色页面" },
  { name: "mixBlendMode", type: "string", default: "—", description: "画布的 CSS mix-blend-mode" },
  { name: "paused", type: "boolean", default: "false", description: "冻结运动但保留最后一帧画面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "prismatic-burst",
  name: "棱镜爆辉",
  href: "prismatic-burst.html",
  title: "棱镜爆辉",
  description:
    "从中心炸开的一束棱镜光：44 步噪声抖动的光线步进叠出体积光束，光谱颜色沿射线深度循环（内置余弦光谱或自定义色板），可梳成离散光线、加螺旋扭度与弯曲；三维翻滚/摆旋/面向鼠标三种姿态，光束朝指针倾斜并在指针处提亮，点击发出外扩光环并给相位一脚加速；四级辉光泛光、自适应分辨率调速器、显影前锋开场、帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "向四周炸开的棱镜光束，随鼠标倾斜，点击泛起外扩光环。",

  demoHint: "在画面里连点几下看光环外扩与相位加速；rayCount 梳出离散光线最出效果。",

  api: API,
};
