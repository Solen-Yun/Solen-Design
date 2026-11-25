/* Component metadata only — the live demo and gallery preview live in
   laser-flow-demo.jsx, the framework source texts and the prompt in
   laser-flow-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with laser-flow-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "surfaceRef", type: "React.RefObject<Element>", default: "—", description: "指向被浇注内容的 ref；其矩形与圆角决定表面几何，梁会钳制在其内部" },
  { name: "beamPosition", type: "number", default: "0.6", description: "梁的水平位置占宽度比例 0–1" },
  { name: "surfaceLevel", type: "number", default: "1", description: "未提供 ref 时的表面高度占容器高度比例 0–1" },
  { name: "color", type: "string", default: '"#3847ff"', description: "基础颜色；整套 16 色调色板由它的色相推导" },
  { name: "intensity", type: "number", default: "1.8", description: "全局亮度增益（最小 0）" },
  { name: "beamWidth", type: "number", default: "1.5", description: "梁核宽度缩放 0.2–5" },
  { name: "flare", type: "number", default: "1.5", description: "裙边/溢流的鼓包高度与铺展 0.2–4" },
  { name: "spread", type: "number", default: "1.5", description: "流动前沿与扇面向两侧铺展的距离 0.1–4" },
  { name: "spill", type: "number", default: "1", description: "沿侧缘浇下的方向性溢流（最小 0）" },
  { name: "fog", type: "number", default: "0.2", description: "雾团密度（最小 0）" },
  { name: "dust", type: "number", default: "1.6", description: "沿表面流动的尘埃粒子（最小 0）" },
  { name: "streaks", type: "number", default: "1.5", description: "浇注流线的亮度（最小 0）" },
  { name: "dots", type: "number", default: "1", description: "雾面点阵强度（最小 0）" },
  { name: "pulse", type: "number", default: "1.5", description: "梁裙的呼吸起伏（最小 0）" },
  { name: "speed", type: "number", default: "1.5", description: "动画时钟速率" },
  { name: "seed", type: "number", default: "3", description: "雾与火花的噪声偏移，让多个实例各不相同" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "指针透镜增亮并迸出火花" },
  { name: "revealImage", type: "string", default: "—", description: "仅在指针附近、梁的蓝色雾面范围内点亮的图片" },
  { name: "revealRadius", type: "number", default: "220", description: "显影衰减半径（px，最小 1）" },
  { name: "revealOpacity", type: "number", default: "0.6", description: "显影强度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "播放下落 → 溅射回弹 → 流动前沿的入场（约 5 秒）" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "浅色输出仅保留色相的墨水 alpha，便于浅色页面合成" },
  { name: "paused", type: "boolean", default: "false", description: "冻结动画时钟" },
  { name: "dpr", type: "number", default: "min(devicePixelRatio, 2)", description: "渲染比率覆盖，最长边不超过 2048" },
  { name: "className", type: "string", default: '""', description: "附加类名（随 rest 属性铺到容器上）" },
  { name: "...rest", type: "HTMLAttributes", default: "—", description: "其余 div 属性透传到容器" },
];

export default {
  id: "laser-flow",
  name: "激光流光",
  href: "laser-flow.html",
  title: "激光流光",
  description:
    "一道体积激光从上方落到你的内容上：命中瞬间弹簧回弹迸光，流动前沿向两侧奔涌，溢流顺着表面和圆角倾泻而下；域扭曲 fbm 雾在梁中漂移，尘埃沿表面流动，指针透镜周围迸出火花，还可在指针附近点亮一张显影图。表面几何来自 surfaceRef 指向的 DOM 元素（矩形 + 圆角实时测量），调色板由单一基色在 HSV 空间推导出 16 色。单趟 WebGL2 渲染。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "激光浇在你的内容上，溅射回弹后顺表面与圆角流光。",

  demoHint: "等入场浇完看溢流爬过圆角；移动指针迸火花，换颜色整套装调色板一起变。",

  api: API,
};
