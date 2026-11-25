/* Component metadata only — the live demo and gallery preview live in
   magic-rings-demo.jsx, the framework source texts and the prompt in
   magic-rings-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with magic-rings-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#A855F7"', description: "环渐变的内侧颜色；接受任意 CSS 颜色" },
  { name: "colorTwo", type: "string", default: '"#6366F1"', description: "环族外侧过渡到的颜色" },
  { name: "ringCount", type: "number", default: "6", description: "环的数量，夹在 1–12" },
  { name: "motion", type: '"pulse" | "ripple" | "breathe"', default: '"pulse"', description: "运动模型：错峰搏动、单波前逐环推进或正弦胀缩" },
  { name: "speed", type: "number", default: "1", description: "运动的时间倍率；0 定格，≥ 0" },
  { name: "lineThickness", type: "number", default: "2", description: "环线核心宽度（CSS px），≥ 0.25，随 DPR 缩放" },
  { name: "glow", type: "number", default: "1", description: "光晕强度 0–3，控制每条环线的柔光" },
  { name: "baseRadius", type: "number", default: "0.35", description: "首环半径（平面单位，1 = 最短边），≥ 0.01" },
  { name: "radiusStep", type: "number", default: "0.1", description: "每环的半径增量，≥ 0" },
  { name: "expansion", type: "number", default: "0.1", description: "每个周期内环向外鼓出的幅度" },
  { name: "taper", type: "number", default: "1.5", description: "按环序号的亮度衰减，≥ 0.5" },
  { name: "rotation", type: "number", default: "0", description: "角向包络的基础旋转角度（度）" },
  { name: "spin", type: "number", default: "0", description: "持续自旋速率（×0.6 rad/s），相邻环反向交替" },
  { name: "tilt", type: "number", default: "0", description: "平面倾角（度，−80–80），带透视的前倾" },
  { name: "dispersion", type: "number", default: "0", description: "光晕色散 0–1，分离出 RGB 重影" },
  { name: "grain", type: "number", default: "0", description: "合成层的动态胶片颗粒 0–1" },
  { name: "opacity", type: "number", default: "1", description: "画布整体透明度 0–1" },
  { name: "followMouse", type: "boolean", default: "false", description: "环心随指针滑动" },
  { name: "mouseInfluence", type: "number", default: "0.2", description: "followMouse 开启时环心的跟随幅度" },
  { name: "hoverScale", type: "number", default: "1.2", description: "悬停时环族的缩放，≥ 0.5" },
  { name: "hoverIntensity", type: "number", default: "1", description: "悬停增亮/加粗的倍率，≥ 0" },
  { name: "parallax", type: "number", default: "0.05", description: "逐环指针位移与平面摆动强度" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击发射冲击波环（同时最多 3 道）" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时逐环扫入" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "深底发光或浅底墨水两套渲染" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限，夹在 0.5–3" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "magic-rings",
  name: "魔环脉冲",
  href: "magic-rings.html",
  title: "魔环脉冲",
  description:
    "一簇向外脉动的发光同心环：pulse 错峰搏动、ripple 单波前逐环推进、breathe 正弦胀缩三种运动模型；光晕走半分辨率 RGBA16F 离屏 + tone map + 颗粒抖动合成，环线用 128 段实例化三角带并按屏幕空间导数保持像素宽度；悬停整族放大、指针附近的环线加粗增亮，点击打出冲击波环并高斯鼓起途经的每一环；dispersion 做 RGB 色散重影，tilt 倾斜透视，浅色主题渲染纸面墨水；支持并行着色器编译、失上下文重建与静止自睡。",
  tags: ["React", "CSS", "WebGL", "光环"],

  cardDescription: "发光同心环逐环脉动，点击打出膨胀的冲击波。",

  demoHint: "点击打冲击波看它途经的环鼓起来；把指针移近看环族放大、线条变粗；切 ripple/breathe 与浅色主题。",

  api: API,
};
