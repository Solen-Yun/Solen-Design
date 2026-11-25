/* Component metadata only — the live demo and gallery preview live in
   dither-veil-demo.jsx, the framework source texts and the prompt in
   dither-veil-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dither-veil-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "src", type: "string", default: "内置风景照", description: "要显影的图片地址，任意可用 crossOrigin 匿名加载的 URL 或 data URI" },
  { name: "fit", type: '"contain" | "cover"', default: '"contain"', description: "照片在画布中的填充方式；contain 留白处印底色" },
  { name: "pattern", type: '"bayer" | "noise" | "lines" | "atkinson" | "floyd"', default: '"floyd"', description: "抖动图案：有序矩阵 / 生成蓝噪声 / 雕版斜线 / 真误差扩散两种" },
  { name: "pixelSize", type: "number", default: "2", description: "抖动单元格尺寸（CSS px，最小 1）" },
  { name: "levels", type: "number", default: "2", description: "色调量化级数；2 即纯 1-bit 黑白" },
  { name: "palette", type: '"duotone" | "rgb"', default: '"duotone"', description: "双色调按明度取墨/纸两色；rgb 按通道量化出彩色抖动" },
  { name: "inkColor", type: "string", default: '"#120f17"', description: "深色油墨" },
  { name: "paperColor", type: "string", default: '"#f4f1ea"', description: "纸面颜色" },
  { name: "contrast", type: "number", default: "1.15", description: "围绕中灰的对比斜率" },
  { name: "brightness", type: "number", default: "0", description: "对比之后的亮度偏移" },
  { name: "revealRadius", type: "number", default: "200", description: "指针烧穿半径（px）" },
  { name: "softness", type: "number", default: "0.6", description: "笔刷软边占半径的比例 0–1" },
  { name: "linger", type: "number", default: "1", description: "烧穿的格子重新织回的秒数；0 立即闭合" },
  { name: "rimColor", type: "string", default: '"#a78bfa"', description: "显影边界网点颜色" },
  { name: "rim", type: "number", default: "0", description: "边界彩色网点带宽 0–0.95，0 关闭" },
  { name: "reverse", type: "boolean", default: "false", description: "反转显影方向：光标改为把抖动印回来" },
  { name: "wander", type: "boolean", default: "false", description: "指针离开时烧穿点自行游走" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击触发扩张冲击波，短暂掀开照片" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "dither-veil",
  name: "抖动显影帷幕",
  href: "dither-veil.html",
  title: "抖动显影帷幕",
  description:
    "一张照片被印成粗颗粒的 1-bit 抖动版画：Bayer 矩阵、程序生成蓝噪声、雕版斜线或逐像素误差扩散四种网点；指针划过时软边胶囊轨迹把抖动烧穿、露出全彩原图，轨迹按 linger 秒逐格织回，点击掀起扩张冲击波，开场时网点从中心按抖动边缘扩散成形。半分辨率掩膜双缓冲 ping-pong，误差扩散在 CPU 蛇形扫描后缓存成纹理，帧循环静止自睡。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "指针烧穿 1-bit 抖动版画，彩色照片从网点里显影又织回。",

  demoHint: "划过画面看彩色显影与织回；切换网点图案、点按画面掀起冲击波，打开游走看自动烧穿。",

  api: API,
};
