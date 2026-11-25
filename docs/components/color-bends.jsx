/* Component metadata only — the live demo and gallery preview live in
   color-bends-demo.jsx, the framework source texts and the prompt in
   color-bends-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with color-bends-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "rotation", type: "number", default: "90", description: "域旋转角度（度）" },
  { name: "speed", type: "number", default: "0.2", description: "漂移与色带相位的时间倍率" },
  { name: "colors", type: "string[]", default: "[]", description: "色带配色（hex，3 或 6 位）；最多 8 个，空数组进入 RGB 通道分色模式" },
  { name: "transparent", type: "boolean", default: "true", description: "透明预乘输出（alpha 来自色带覆盖）；关闭为不透明填充" },
  { name: "autoRotate", type: "number", default: "0", description: "在 rotation 之上每秒叠加的旋转角度" },
  { name: "scale", type: "number", default: "1", description: "域尺度，越大纹理越细" },
  { name: "frequency", type: "number", default: "1", description: "正弦折叠频率" },
  { name: "warpStrength", type: "number", default: "1", description: "色带扭曲混合 0–1（> 1 放大扭曲）" },
  { name: "mouseInfluence", type: "number", default: "1", description: "域被光标吸引的强度" },
  { name: "parallax", type: "number", default: "0.5", description: "光标带来的域平移量" },
  { name: "noise", type: "number", default: "0.15", description: "逐帧叠加的颗粒强度" },
  { name: "iterations", type: "number", default: "1", description: "正弦折叠次数 1–5" },
  { name: "intensity", type: "number", default: "1.5", description: "颜色输出倍率" },
  { name: "bandWidth", type: "number", default: "6", description: "色带的柔和度/宽度" },
  { name: "className", type: "string", default: "—", description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "color-bends",
  name: "色带流动",
  href: "color-bends.html",
  title: "色带流动",
  description:
    "three.js 正交全屏平面 + 自定义 ShaderMaterial 渲染的流动色带：域经旋转、透镜压扁与正弦折叠（1–5 次迭代）后，每个色标用带相位差的行波掩码取色，最多 8 色互相渗透、空色板回退 RGB 通道分色；输出为透明预乘画布可直接叠在页面上，光标以缓动拉拽域心并带视差平移，ResizeObserver 自适应、离屏与隐藏页自动暂停。",
  tags: ["React", "CSS", "Three", "图形"],

  cardDescription: "色带在正弦折叠的域里缓慢流动，色相彼此渗透。",

  demoHint: "移动光标看域被轻轻拉拽；换配色、加迭代次数与扭曲强度看纹理变形。",

  api: API,
};
