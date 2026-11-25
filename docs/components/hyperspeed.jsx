/* Component metadata only — the live demo and gallery preview live in
   hyperspeed-demo.jsx, the framework source texts and the prompt in
   hyperspeed-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with hyperspeed-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "curve", type: '"straight" | "gentle" | "winding" | "hills" | "racing" | "deep"', default: '"winding"', description: "道路形态六选一，未知值回退 winding" },
  { name: "curvature", type: "number", default: "1", description: "整体弯曲幅度，下限 0" },
  { name: "speed", type: "number", default: "1", description: "基础车速倍率，0 冻结画面" },
  { name: "boost", type: "number", default: "3", description: "冲刺时的最高车速倍率，下限 1" },
  { name: "fov", type: "number", default: "90", description: "基础视场角（度），clamp 20–170" },
  { name: "boostFov", type: "number", default: "130", description: "冲刺时视场角弹向的目标值" },
  { name: "lanes", type: "number", default: "3", description: "单向车道数" },
  { name: "roadWidth", type: "number", default: "10", description: "单向路面宽（世界单位），下限 1" },
  { name: "medianWidth", type: "number", default: "2", description: "中央隔离带宽" },
  { name: "density", type: "number", default: "40", description: "单向车流密度，clamp 0–160" },
  { name: "trailLength", type: "number", default: "1", description: "光尾长度倍率，下限 0.05" },
  { name: "lightSize", type: "number", default: "1", description: "车灯光管尺寸倍率，下限 0.1" },
  { name: "poles", type: "number", default: "20", description: "单侧路灯数量，clamp 0–80" },
  { name: "poleHeight", type: "number", default: "1", description: "路灯高度倍率，下限 0.1" },
  { name: "dust", type: "number", default: "100", description: "星尘粒子数，clamp 0–1500" },
  { name: "glow", type: "number", default: "0.6", description: "泛光强度，0 关闭整条泛光链" },
  { name: "reflections", type: "number", default: "0.5", description: "路面镜像倒影层强度" },
  { name: "steer", type: "number", default: "0.35", description: "镜头随鼠标偏转的幅度" },
  { name: "tailColors", type: "string[]", default: "主题尾灯色", description: "尾灯调色板，最多 8 色循环" },
  { name: "headColors", type: "string[]", default: "主题前灯色", description: "前灯调色板，最多 8 色循环" },
  { name: "poleColors", type: "string[]", default: "主题路灯色", description: "路灯调色板，最多 8 色循环" },
  { name: "roadColor", type: "string", default: "按主题", description: "路面色；暗色 #08080a / 浅色 #efeff2" },
  { name: "roadOpacity", type: "number", default: "0.1", description: "路面不透明度 0–1" },
  { name: "lineColor", type: "string", default: "按主题", description: "车道线色；暗色 #25252d / 浅色 #d0d0d7" },
  { name: "background", type: "string", default: '"transparent"', description: "画面底色；transparent 保留透明背景" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "混合方式与默认配色家族" },
  { name: "interactive", type: "boolean", default: "true", description: "响应按住冲刺与鼠标转向" },
  { name: "boosting", type: "boolean", default: "false", description: "受控冲刺：置 true 等效按住" },
  { name: "onBoostStart", type: "() => void", default: "—", description: "冲刺开始时回调（interactive 开启时）" },
  { name: "onBoostEnd", type: "() => void", default: "—", description: "冲刺结束时回调" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "hyperspeed",
  name: "夜路光尾跃迁",
  href: "hyperspeed.html",
  title: "夜路光尾跃迁",
  description:
    "夜色里的双向高速：对向车流的品红光尾扑面而来，同向的青蓝光尾奔向远方，路灯与星尘一起在弯道上拉出轨迹；六种路形在顶点着色器里实时弯曲，鼠标转向，按住冲刺时车速倍增、光尾拉伸、视场推宽，松手缓缓复原。实例化几何 + 自定义着色器 + 五级泛光，暗色叠加辉光与浅色正色两种主题，路面倒影、调色板与路形全部可调，离屏自动停帧。",
  tags: ["React", "Three.js", "背景"],

  cardDescription: "夜路光尾铺满画面，按住冲刺拉成超时空跃迁。",

  demoHint: "按住画面冲刺、移动鼠标转向；路形、车速、车流密度、光尾长度与辉光可调。",

  api: API,
};
