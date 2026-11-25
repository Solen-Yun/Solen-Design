/* Component metadata only — the live demo and gallery preview live in
   pixel-trail-demo.jsx, the framework source texts and the prompt in
   pixel-trail-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with pixel-trail-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "gridSize", type: "number", default: "40", description: "较长边上的格子数量" },
  { name: "trailSize", type: "number", default: "0.1", description: "笔刷半径占 512px 拖尾纹理的比例" },
  { name: "maxAge", type: "number", default: "250", description: "一次触点的存活时长（ms）" },
  { name: "interpolate", type: "number", default: "5", description: "指针采样之间补插的印章数，0 关闭" },
  { name: "easingFunction", type: "(x: number) => number", default: "identity", description: "触点强度坡道的缓动函数" },
  { name: "gooeyFilter", type: "{ strength?: number }", default: "{ strength: 2 }", description: "液态融合强度；置空或 0 得到硬边像素" },
  { name: "color", type: "string", default: '"#ffffff"', description: "像素主体颜色（任意 CSS 颜色）" },
  { name: "trailColor", type: "string", default: "—", description: "新触点的颜色；像素随老化从 trailColor 渐变到 color" },
  { name: "shape", type: '"square" | "circle" | "diamond"', default: '"square"', description: "硬边模式下的格子形状" },
  { name: "gap", type: "number", default: "0.08", description: "格子间缝隙 0–0.9" },
  { name: "decay", type: '"fade" | "shrink" | "dither"', default: '"fade"', description: "硬边模式下像素消亡方式：淡出 / 缩小 / 抖动消失" },
  { name: "flow", type: "number", default: "0", description: "指针速度带进拖尾的比例 0–1" },
  { name: "gravity", type: "number", default: "0", description: "拖尾点的下坠重力 -1–1" },
  { name: "sparkle", type: "number", default: "0", description: "老化像素的随机闪烁 0–1" },
  { name: "clickBurst", type: "boolean", default: "false", description: "点击时炸出一圈 14 个触点" },
  { name: "shine", type: "number", default: "0.6", description: "斜面光照与镜面高光强度 0–1" },
  { name: "glow", type: "number", default: "0.4", description: "从拖尾纹理采样的底部光晕 0–1" },
  { name: "imageSrc", type: "string", default: "—", description: "逐格采样的调色图片（居中裁方）" },
  { name: "dpr", type: "number", default: "—", description: "DPR 覆盖；默认取 devicePixelRatio 并钳到 2" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "pixel-trail",
  name: "像素流体拖尾",
  href: "pixel-trail.html",
  title: "像素流体拖尾",
  description:
    "一格一格的亮像素跟在光标后面：指针轨迹画进一张离屏拖尾纹理（径向渐变、按触点年龄增减强度），网格着色器再用高斯加权的 metaball 场把相邻格子融成一坨会流动的软泥——从梯度求法线做斜面与镜面高光，新触点用 trailColor、老化后渐变回主色；关掉融合就是带缝隙、可淡出/缩小/抖动消亡的硬边像素。支持指针速度与重力的拖尾惯性、点击炸开一圈、逐格采样的调色图片。",
  tags: ["React", "CSS", "WebGL", "光标"],

  cardDescription: "光标划过亮起一串像素，相邻格子融成会流动的软泥。",

  demoHint: "划动看像素泥融合流动，关掉 gooey 看硬边像素；开重力让泥点往下淌，点击炸开一圈。",

  api: API,
};
