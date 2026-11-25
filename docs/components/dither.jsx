/* Component metadata only — the live demo and gallery preview live in
   dither-demo.jsx, the framework source texts and the prompt in
   dither-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dither-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "waveSpeed", type: "number", default: "0.05", description: "波纹图案的滚动速度" },
  { name: "waveFrequency", type: "number", default: "3", description: "fbm 每个八度的频率倍率" },
  { name: "waveAmplitude", type: "number", default: "0.3", description: "fbm 每个八度的振幅倍率" },
  { name: "waveColor", type: "[number, number, number] | string", default: "[0.5, 0.5, 0.5]", description: "波纹颜色：0–1 线性 RGB 数组或任意 CSS 颜色" },
  { name: "backgroundColor", type: '[number, number, number] | string | "transparent"', default: "[0, 0, 0]", description: "底色；传字符串 \"transparent\" 切换为透明 alpha 输出" },
  { name: "colorNum", type: "number", default: "4", description: "普通/透明模式的量化色阶数，下限 2" },
  { name: "pixelSize", type: "number", default: "2", description: "抖动单元格边长（设备像素），下限 1" },
  { name: "disableAnimation", type: "boolean", default: "false", description: "冻结波纹时钟" },
  { name: "enableMouseInteraction", type: "boolean", default: "true", description: "启用光标轨迹场" },
  { name: "mouseRadius", type: "number", default: "1", description: "轨迹影响半径（纵横比单位）" },
  { name: "ditherMode", type: '"bayer" | "bayer4" | "bayer2" | "halftone" | "lines" | "crosshatch" | "noise" | "none"', default: '"bayer"', description: "阈值图案：8×8/4×4/2×2 Bayer、半调圆点、横纹、编织斜纹、白噪或纯量化" },
  { name: "palette", type: "(string | number[])[]", default: "—", description: "2–8 色的调色板模式；给了就接管 colorNum 的色阶输出" },
  { name: "scale", type: "number", default: "1", description: "图案缩放，下限 0.05" },
  { name: "contrast", type: "number", default: "1", description: "场对比度（绕 0.5 拉伸）" },
  { name: "brightness", type: "number", default: "0", description: "场亮度偏移" },
  { name: "mouseEffect", type: '"erase" | "reveal" | "ripple"', default: '"erase"', description: "光标对波纹的作用：擦除、显影或行波扰动" },
  { name: "mouseStrength", type: "number", default: "1", description: "光标影响强度，下限 0" },
  { name: "trail", type: "number", default: "0.5", description: "轨迹余晖 0–1；0 只留当前点" },
  { name: "clickRipple", type: "boolean", default: "true", description: "点击激起扩散冲击环" },
  { name: "intro", type: "boolean", default: "true", description: "挂载后 1.8s 的径向揭幕" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比，钳到 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "dither",
  name: "抖动波纹场",
  href: "dither.html",
  title: "抖动波纹场",
  description:
    "复古抖动波纹：两趟 WebGL2 渲染——域扭曲 fbm 噪声按单元格写入离屏纹理，再经 8×8/4×4/2×2 Bayer、半调圆点、横纹、编织斜纹或白噪阈值量化成有限的色阶；支持调色板多色、透明 alpha、普通底色三种输出。光标带余晖轨迹，可擦出洞、显影亮纹或掀起行波，点击激发扩散冲击环，入场径向揭幕。帧循环安静后自睡，离屏暂停。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "Bayer、半调与编织斜纹里的复古波纹场，光标擦出洞、点击起涟漪。",

  demoHint: "切八种阈值图案看完全不同的颗粒质感；按住光标划出洞，点击看波纹被冲击环顶弯。",

  api: API,
};
