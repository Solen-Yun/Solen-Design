/* Component metadata only — the live demo and gallery preview live in
   text-loop-demo.jsx, the framework source texts and the prompt in
   text-loop-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with text-loop-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"React ✦ Bits"', description: "沿路径循环的文字，重复之间以间隔符相连" },
  { name: "shape", type: '"wave" | "line" | "arch" | "circle" | "infinity"', default: '"wave"', description: "内置路径：波浪、直线、拱桥、闭合圆环与无穷环" },
  { name: "path", type: "string", default: "—", description: "自定义 SVG d 字符串（1200×520 设计空间），同时替换两条带的路径" },
  { name: "speed", type: "number", default: "90", description: "沿路径行进的速度（px/s），0 静止、只响应拖拽" },
  { name: "direction", type: '"forward" | "reverse"', default: '"forward"', description: "行进方向" },
  { name: "separator", type: "string", default: '"✦"', description: "重复之间的间隔符，前后各接一个不换行空格；留空用三个空格相接" },
  { name: "curviness", type: "number", default: "90", description: "路径弯曲程度，缩放各形状的振幅或半径" },
  { name: "tilt", type: "number", default: "0", description: "整条带的旋转角度（°），绕设计稿中心" },
  { name: "fontSize", type: "number", default: "46", description: "字号（px）" },
  { name: "fontWeight", type: "number", default: "800", description: "字重" },
  { name: "letterSpacing", type: "number", default: "2", description: "字间距（px）" },
  { name: "uppercase", type: "boolean", default: "true", description: "文字转大写" },
  { name: "color", type: "string", default: "—", description: "文字颜色（outline 时为描边色）；不设则彩带上用白、无彩带时跟随环境文字色" },
  { name: "ribbon", type: "boolean", default: "true", description: "在文字下绘制彩色带子" },
  { name: "ribbonColor", type: "string", default: '"#5227FF"', description: "主彩带的颜色" },
  { name: "ribbonWidth", type: "number", default: "86", description: "彩带的描边宽度（设计稿 px）" },
  { name: "edgeFade", type: "number", default: "0", description: "两侧渐隐比例 0–1（渐隐区 = 值 × 0.3 宽度）" },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "悬停时缓停，移开恢复" },
  { name: "cross", type: "boolean", default: "false", description: "叠加第二条带子，反向行进并与主带交叉" },
  { name: "crossColor", type: "string", default: "—", description: "交叉带的颜色（无彩带时也是交叉文字的颜色）" },
  { name: "crossAngle", type: "number", default: "16", description: "两条带的夹角（°），围绕 tilt 对半分配" },
  { name: "draggable", type: "boolean", default: "false", description: "可抓取拖拽；圆环跟随指针转圈，松手有惯性甩动" },
  { name: "scrollBoost", type: "number", default: "0", description: "页面滚动的瞬时加速幅度，随后缓动回落；0 关闭" },
  { name: "outline", type: "boolean", default: "false", description: "文字以描边渲染而非实心" },
  { name: "outlineWidth", type: "number", default: "1.5", description: "描边模式的线宽" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "根元素内联样式" },
];

export default {
  id: "text-loop",
  name: "曲线路径文字流",
  href: "text-loop.html",
  title: "曲线路径文字流",
  description:
    "沿 SVG 路径行进的无缝文字跑马灯：波浪、直线、拱桥、圆环与无穷环五种路径，或传入自定义 d；默认铺一条紫色彩带，文字实测宽度后按路径长度无缝复制。可叠加一条反向交叉带并投下交集阴影，悬停缓停、抓取甩动（圆环绕指针转圈）、页面滚动瞬时加速；支持描边空心字与两侧渐隐，离屏停帧。",
  tags: ["React", "CSS", "SVG", "GSAP", "跑马灯"],

  cardDescription: "文字沿曲线路径循环行进，彩带上可叠反向交叉带。",

  demoHint: "切路径形状、调弯曲与速度；抓取文字甩一把，滚轮会瞬时加速。",

  api: API,
};
