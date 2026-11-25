/* Component metadata only — the live demo and gallery preview live in
   drift-wall-demo.jsx, the framework source texts and the prompt in
   drift-wall-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with drift-wall-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ image: string; title?: string; href?: string }[]", default: "内置 15 张占位图", description: "砖块数据，按列轮转分配；带 href 渲染成新标签页链接；精确默认素材以代码内嵌为准" },
  { name: "columns", type: "number", default: "5", description: "墙面纵向列数" },
  { name: "tileWidth", type: "number", default: "200", description: "砖块宽度（px）" },
  { name: "tileHeight", type: "number", default: "132", description: "砖块高度（px）" },
  { name: "gap", type: "number", default: "18", description: "砖块间距（px）" },
  { name: "radius", type: "number", default: "14", description: "砖块圆角（px）" },
  { name: "tilt", type: "number", default: "16", description: "平面的静态 rotateX（度），让墙向后倾" },
  { name: "turn", type: "number", default: "-14", description: "平面的静态 rotateY（度）" },
  { name: "roll", type: "number", default: "0", description: "平面的静态 rotateZ（度）" },
  { name: "perspective", type: "number", default: "1200", description: "墙面 CSS 透视距离（px）" },
  { name: "depth", type: "number", default: "120", description: "平面的静态 translateZ 推离量（px）" },
  { name: "speed", type: "number", default: "42", description: "基础漂移速度（px/s）" },
  { name: "direction", type: '"up" | "down"', default: '"up"', description: "整体漂移方向；列与列之间交替反向" },
  { name: "variance", type: "number", default: "0.45", description: "各列速度的差异幅度 0–1" },
  { name: "parallax", type: "number", default: "0.6", description: "指针驱动的平面倾斜强度，0 关闭" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "指针悬停在墙上时冻结所有列" },
  { name: "lift", type: "number", default: "64", description: "悬停砖块朝观察者抬起的 translateZ（px）" },
  { name: "fade", type: "number", default: "0.6", description: "边缘遮罩开始淡出的位置 0–1，越小渐隐越宽" },
  { name: "dim", type: "number", default: "0.55", description: "静止砖块的不透明度" },
  { name: "grayscale", type: "boolean", default: "false", description: "静止砖块以灰度渲染" },
  { name: "overlayColor", type: "string", default: '"#060010"', description: "静止砖块上遮罩纱的颜色" },
  { name: "className", type: "string", default: '""', description: "墙面附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "墙面内联样式（与组件令牌合并）" },
];

export default {
  id: "drift-wall",
  name: "透视漂移砖墙",
  href: "drift-wall.html",
  title: "透视漂移砖墙",
  description:
    "一面永远漂流的透视砖墙：图片砖块按列分布在向后倾斜的 3D 平面上，相邻列以各自速度反向漂移、无缝循环，边缘用径向与线性双遮罩渐隐进背景。指针移动让整面墙微微倾身（带阻尼的视差），悬停的砖块抬出墙面、褪去灰度与遮罩纱，所在列停下；pauseOnHover 可冻结全墙，prefers-reduced-motion 下漂移与视差全部冻结。悬停命中用 elementFromPoint 解析，砖块本身不拦截指针，避免抬升后被命中测试卡住。",
  tags: ["React", "CSS 3D", "requestAnimationFrame"],

  cardDescription: "倾斜砖墙无限漂流，悬停砖块抬出墙面、褪纱点亮。",

  demoHint: "移动指针看墙倾身，悬停砖块看抬起与定格；调速度、列数和边缘渐隐。",

  api: API,
};
