/* Component metadata only — the live demo and gallery preview live in
   soft-aurora-demo.jsx, the framework source texts and the prompt in
   soft-aurora-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with soft-aurora-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "speed", type: "number", default: "0.6", description: "噪声流动与色相循环速度，0 冻结" },
  { name: "scale", type: "number", default: "1.5", description: "噪声缩放，下限 0.01；也会略微提高内部分辨率" },
  { name: "brightness", type: "number", default: "1.0", description: "整体能量倍数，下限 0" },
  { name: "color1", type: "string", default: '"#f7f7f7"', description: "第一层（底层）颜色，hex 或 rgb()/rgba()" },
  { name: "color2", type: "string", default: '"#e100ff"', description: "第二层颜色，hex 或 rgb()/rgba()" },
  { name: "noiseFrequency", type: "number", default: "2.5", description: "基础噪声频率，下限 0.01" },
  { name: "noiseAmplitude", type: "number", default: "1.0", description: "噪声振幅，下限 0" },
  { name: "bandHeight", type: "number", default: "0.5", description: "光幕的纵向位置/高度" },
  { name: "bandSpread", type: "number", default: "1.0", description: "光幕衰减的柔和度，下限 0" },
  { name: "octaveDecay", type: "number", default: "0.1", description: "每层八度噪声的振幅衰减，下限 0" },
  { name: "layerOffset", type: "number", default: "0", description: "两层噪声之间的时间偏移" },
  { name: "colorSpeed", type: "number", default: "1.0", description: "色板色相循环速度" },
  { name: "spectrum", type: "number", default: "1", description: "余弦渐变色板的显色比例，0–1" },
  { name: "tilt", type: "number", default: "0", description: "整片天空的旋转角（度），clamp ±90" },
  { name: "enableMouseInteraction", type: "boolean", default: "true", description: "光场随光标漂移并在接近时避让弯曲" },
  { name: "mouseInfluence", type: "number", default: "0.25", description: "漂移与避让强度，下限 0" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击沿光幕发出光带脉冲（最多 4 条）" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时光幕展开落定（2s）" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：极光印成彩墨，适合浅色页面" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "soft-aurora",
  name: "柔和极光",
  href: "soft-aurora.html",
  title: "柔和极光",
  description:
    "两层层叠的极光光幕：3D Perlin 噪声驱动的软光带经余弦渐变调色，色相随时间缓慢轮转；整片天空随光标漂移，光标靠近时光幕像被风吹开一样局部弯折，点击沿光幕送出一条渐宽渐暗的光带。浅色模式印成彩墨；内部分辨率按噪声密度自适应，帧循环空闲自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "双层噪声极光缓慢涌动，光标吹弯光幕，点击送出光带。",

  demoHint: "移动光标看整片光幕漂移、贴近看局部避让，点击沿光幕发一条光带；色板、幕高与倾斜可调。",

  api: API,
};
