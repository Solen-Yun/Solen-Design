/* Component metadata only — the live demo and gallery preview live in
   ripple-distortion-demo.jsx, the framework source texts and the prompt in
   ripple-distortion-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ripple-distortion-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "src", type: "string", default: "内置风景照", description: "水面下的图片地址，任意可用 crossOrigin 匿名加载的 URL 或 data URI" },
  { name: "brushSize", type: "number", default: "150", description: "水波精灵直径（px）" },
  { name: "strength", type: "number", default: "0.2", description: "采样推移幅度（UV 比例）" },
  { name: "swirl", type: "number", default: "1", description: "单位位移的方向旋转圈数" },
  { name: "rings", type: "number", default: "4", description: "每颗水波内的同心波脊数" },
  { name: "spread", type: "number", default: "5", description: "水波一生中扩张的距离" },
  { name: "fade", type: "number", default: "3", description: "水波衰减到近零的秒数，下限 0.15" },
  { name: "spacing", type: "number", default: "15", description: "悬停模式下两次落点间的最小指针位移（px）" },
  { name: "dispersion", type: "number", default: "0", description: "红蓝推移量的色散分离" },
  { name: "glint", type: "number", default: "0", description: "波峰镜面高光强度" },
  { name: "tint", type: "string", default: '"#a855f7"', description: "渗入扰动区域的颜色" },
  { name: "tintAmount", type: "number", default: "0.1", description: "渗色强度 0–1" },
  { name: "grayscale", type: "boolean", default: "true", description: "未扰动区域保持灰度" },
  { name: "highlightColor", type: "string", default: '"#ffffff"', description: "高光颜色" },
  { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "落波方式：指针移动或点击" },
  { name: "clickStrength", type: "number", default: "2", description: "点击水波的尺寸倍率" },
  { name: "quality", type: '"low" | "medium" | "high"', default: '"low"', description: "位移场分辨率系数：0.4 / 0.7 / 1.0" },
  { name: "enabled", type: "boolean", default: "true", description: "落波总开关" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "ripple-distortion",
  name: "水波折射扰动",
  href: "ripple-distortion.html",
  title: "水波折射扰动",
  description:
    "指针在水面上落下一圈圈涟漪：最多 100 颗同心波脊的实例化水波精灵加法累加成位移场，合成趟沿场的方向推移并旋转采样，色散分裂红蓝边缘，镜面高光照亮波峰，染色只渗入扰动区域而其余保持灰度；水波扩张、按 fade 秒衰减留下渐逝尾迹。悬停按间距落波或点击落大波，quality 档缩放位移场分辨率。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "指针划过水面，涟漪扭曲照片又渐渐平息。",

  demoHint: "快速划过看尾迹叠加；切换点击模式点出大涟漪，拉高 glint 看波峰反光。",

  api: API,
};
