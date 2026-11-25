/* Component metadata only — the live demo and gallery preview live in
   topography-demo.jsx, the framework source texts and the prompt in
   topography-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with topography-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#4f7cff"', description: "等高线颜色，3/6 位 hex" },
  { name: "lineCount", type: "number", default: "22", description: "单位高程的等高线数量，clamp 2–80" },
  { name: "lineWidth", type: "number", default: "1.2", description: "线宽（设备像素），下限 0.2" },
  { name: "majorLines", type: "boolean", default: "true", description: "每第 5 条线加宽提亮" },
  { name: "elevation", type: "number", default: "1", description: "地形高度倍率，clamp 0–3" },
  { name: "foreground", type: "number", default: "0.2", description: "近场压平权重，0–1" },
  { name: "scale", type: "number", default: "1", description: "地形缩放，clamp 0.2–5" },
  { name: "detail", type: "number", default: "0.35", description: "细噪声细节，0–1" },
  { name: "tilt", type: "number", default: "32", description: "相机俯仰角（度），clamp 12–90，带缓动" },
  { name: "speed", type: "number", default: "0.25", description: "在地形上漫游的速度，0 停止漂移" },
  { name: "direction", type: '"forward" | "backward" | "left" | "right"', default: '"forward"', description: "漫游方向" },
  { name: "morph", type: "number", default: "0.2", description: "漂移时地形重塑速率" },
  { name: "glow", type: "number", default: "0.6", description: "辉光强度，0 跳过整条辉光管线" },
  { name: "depthOfField", type: "number", default: "0.4", description: "离焦距离的模糊量，0–1" },
  { name: "fog", type: "number", default: "0.35", description: "距离雾衰减，0–1" },
  { name: "brightness", type: "number", default: "1", description: "线条整体亮度，下限 0" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "启用拾取、悬停效果与视差" },
  { name: "hoverEffect", type: '"lift" | "trace" | "light"', default: '"lift"', description: "光标对地形的作用：隆起 / 描亮一条等高线 / 悬灯" },
  { name: "mouseRadius", type: "number", default: "1", description: "笔刷/灯/热度半径，下限 0.1" },
  { name: "mouseStrength", type: "number", default: "0.6", description: "笔刷目标高度与热度强度，下限 0" },
  { name: "trail", type: "number", default: "0.3", description: "隆起痕迹的存留时长（衰减 τ 0.25–3.25s），0–1" },
  { name: "parallax", type: "number", default: "0.5", description: "相机朝光标的倾斜量，0–1" },
  { name: "clickEffect", type: '"pulse" | "peak"', default: '"pulse"', description: "点击效果：扩散环脉冲 / 留下持久山峰" },
  { name: "markers", type: '"none" | "plus" | "dots"', default: '"none"', description: "地形上的测绘标记点" },
  { name: "glitch", type: "number", default: "0", description: "扫描线故障强度，0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时相机从地形中升起（2.8s）" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：线条印成彩墨，适合浅色页面" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "topography",
  name: "等高线地形",
  href: "topography.html",
  title: "等高线地形",
  description:
    "一片只用发光等高线绘制的 3D 地形：噪声高度场无限漫游，主等高线加粗，辉光、雾与景深营造纵深；光标射线拾取地表，把脚下局部隆起（或描亮一条等高线、或挂一盏灯），点击在地表送出扩散环或堆起持久山峰，可选测绘标记点与扫描线故障。块状网格地形分块烘焙，帧循环安静后自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "发光等高线织成流动山地，光标隆起山丘，点击荡开环波。",

  demoHint: "在地面上移动看山丘随光标隆起又平复，点击荡开环波或堆起山峰；悬停模式、线数与辉光可调。",

  api: API,
};
