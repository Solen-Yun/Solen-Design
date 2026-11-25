/* Component metadata only — the live demo and gallery preview live in
   line-waves-demo.jsx, the framework source texts and the prompt in
   line-waves-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with line-waves-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color1", type: "string", default: '"#ffffff"', description: "渐变第一站颜色；3/6 位 hex 或 rgb()" },
  { name: "color2", type: "string", default: '"#ffffff"', description: "渐变第二站颜色" },
  { name: "color3", type: "string", default: '"#ffffff"', description: "渐变第三站颜色" },
  { name: "colorCycleSpeed", type: "number", default: "1", description: "色彩沿场循环的速度" },
  { name: "speed", type: "number", default: "0.3", description: "波浪行进速度，0 冻结" },
  { name: "lineCount", type: "number", default: "72", description: "线条数量，clamp 2–400" },
  { name: "lineWidth", type: "number", default: "1.3", description: "线宽（设备像素），clamp 0.25–12" },
  { name: "glow", type: "number", default: "0.6", description: "光带内线条外晕强度，下限 0" },
  { name: "brightness", type: "number", default: "1", description: "输出亮度，下限 0" },
  { name: "highlight", type: "number", default: "1", description: "光带强度，clamp 0–1" },
  { name: "highlightWidth", type: "number", default: "1", description: "光带宽度，clamp 0.2–5" },
  { name: "warpIntensity", type: "number", default: "1", description: "褶皱强度，clamp 0–3" },
  { name: "warpScale", type: "number", default: "1", description: "褶皱尺度，clamp 0.2–4" },
  { name: "rotation", type: "number", default: "-33", description: "整场旋转角（度）" },
  { name: "edgeFade", type: "number", default: "0", description: "四边渐隐比例，clamp 0–1" },
  { name: "enableMouseInteraction", type: "boolean", default: "true", description: "光标推开线条" },
  { name: "mouseInfluence", type: "number", default: "2", description: "透镜强度，clamp 0–3" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击落下扩散涟漪，最多同时 4 圈" },
  { name: "intro", type: "boolean", default: "true", description: "首次挂载 1.8s 左起显影" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面墨线输出" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "像素比上限，clamp 0.5–3；总像素预算 240 万" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "line-waves",
  name: "线浪光带",
  href: "line-waves.html",
  title: "线浪光带",
  description:
    "一片绸缎般的细线浪：上百根抗锯齿发丝线被三重正弦域扭曲揉出褶皱，三色渐变沿场缓慢循环，一道柔光带像月光一样在线浪上漂移，褶皱压缩的棱线自动亮起；光标把线条推开成透镜，点击落进一圈圈扩散的涟漪。fwidth 逐像素抗锯齿在任意线密度下保持锐利，远处自动并线不糊；240 万像素预算约束 DPR，首屏左起显影，浅色页面可切墨线输出，空闲后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "绸缎细线浪上漂着月光带，点击落下扩散涟漪。",

  demoHint: "移动鼠标推开线条，点击落下涟漪；三色、线数、光带与褶皱可调。",

  api: API,
};
