/* Component metadata only — the live demo and gallery preview live in
   iridescence-demo.jsx, the framework source texts and the prompt in
   iridescence-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with iridescence-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "number[] | string", default: "[1, 1, 1]", description: "叠在干涉色带上的染色；0–1 数组或任意 CSS 颜色" },
  { name: "speed", type: "number", default: "1", description: "褶皱流动速度" },
  { name: "amplitude", type: "number", default: "0.1", description: "画面随鼠标反向视差的幅度" },
  { name: "mouseReact", type: "boolean", default: "true", description: "开启鼠标视差、搅动与光晕" },
  { name: "scale", type: "number", default: "1", description: "纹理密度，越大越密，下限 0.05" },
  { name: "detail", type: "number", default: "8", description: "干涉迭代次数，clamp 1–24" },
  { name: "rotation", type: "number", default: "0", description: "纹理旋转角（度）" },
  { name: "warp", type: "number", default: "1", description: "迭代内部褶皱耦合强度" },
  { name: "hueShift", type: "number", default: "0", description: "最终颜色绕灰轴旋转角（度）" },
  { name: "saturation", type: "number", default: "1", description: "饱和度，下限 0" },
  { name: "brightness", type: "number", default: "1.5", description: "最终亮度倍率，下限 0" },
  { name: "contrast", type: "number", default: "1", description: "中灰对比度，下限 0" },
  { name: "stir", type: "number", default: "0.5", description: "鼠标划过对褶皱的搅动强度，下限 0" },
  { name: "sheen", type: "number", default: "0.3", description: "跟随鼠标的柔光亮度" },
  { name: "clickSwirl", type: "boolean", default: "true", description: "点击生成旋转涡旋，最多同时 6 个" },
  { name: "grain", type: "number", default: "0", description: "胶片颗粒，clamp 0–1" },
  { name: "fade", type: "number", default: "0", description: "四边渐隐比例（按短边计），clamp 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "resolution", type: "number", default: "1", description: "在 DPR 之上的渲染倍率，clamp 0.1–2" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动；交互仍然响应" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "iridescence",
  name: "虹彩液面",
  href: "iridescence.html",
  title: "虹彩液面",
  description:
    "一整面缓慢折叠的薄膜干涉色：像浮在水面上的油膜，色带随时间漂移舒卷；鼠标划过时一块隐藏的速度场被搅起，褶皱顺着笔迹弯折再缓缓松开，点击旋出一个渐生渐灭的涡旋，光标周围还带一圈柔和的顺光。WebGL2 单程序渲染，速度场在 CPU 上松弛衰减并作为纹理回灌着色器；染色、色相旋转、饱和、对比、颗粒、边缘渐隐全部可调，暂停时流动冻结但交互仍然响应，空闲后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "油膜般的干涉色随鼠标搅动，点击旋出涡旋。",

  demoHint: "划过画面搅动褶皱，点击旋出涡旋；染色、密度、搅动与色相可调。",

  api: API,
};
