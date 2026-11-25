/* Component metadata only — the live demo and gallery preview live in
   micro-slats-demo.jsx, the framework source texts and the prompt in
   micro-slats-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with micro-slats-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "preset", type: '"swell" | "tide" | "storm" | "signal"', default: '"swell"', description: "预设浪型；未显式给定的波动参数继承预设值" },
  { name: "color", type: "string", default: '"#A855F7"', description: "板条基础颜色；接受任意 CSS 颜色" },
  { name: "glintColor", type: "string", default: '"#ffffff"', description: "浪尖高光与墨水辉光颜色" },
  { name: "backgroundColor", type: "string", default: '"#000000"', description: "垫在板条后的背景色" },
  { name: "slatWidth", type: "number", default: "10", description: "板条宽度（px），夹在 1–64" },
  { name: "slatHeight", type: "number", default: "25", description: "板条高度（px），夹在 2–240" },
  { name: "gap", type: "number", default: "3", description: "板条间距（px），夹在 0–64" },
  { name: "roundness", type: "number", default: "0.75", description: "圆角比例 0–1 × 板条短边" },
  { name: "scale", type: "number", default: "—", description: "波形空间尺度（默认取预设）；越小浪越大，≥ 0.05" },
  { name: "speed", type: "number", default: "—", description: "波浪时间倍率（默认取预设）" },
  { name: "direction", type: "number", default: "—", description: "波浪行进方向（度，默认取预设）" },
  { name: "chop", type: "number", default: "—", description: "二次谐波陡峭度 0–1.5（默认取预设）" },
  { name: "stretch", type: "number", default: "—", description: "浪谷缩短板条的幅度 0–0.95（默认取预设）" },
  { name: "glint", type: "number", default: "—", description: "浪尖高光强度 ≥ 0（默认取预设）" },
  { name: "contrast", type: "number", default: "—", description: "明暗曲线指数 0.2–4（默认取预设）" },
  { name: "perspective", type: "number", default: "—", description: "地平线收缩 0–1（默认取预设）；0 是平面墙" },
  { name: "fog", type: "number", default: "—", description: "远端雾霭 0–1（默认取预设）" },
  { name: "interactive", type: "boolean", default: "true", description: "开启指针流体搅动与点击飞溅" },
  { name: "cursorStrength", type: "number", default: "1", description: "流体墨迹辉光亮度 0–3" },
  { name: "cursorSize", type: "number", default: "40", description: "流体笔刷半径（px），夹在 4–600" },
  { name: "swirl", type: "number", default: "0", description: "涡度增强 0–2，给流体加卷曲" },
  { name: "trail", type: "number", default: "1.4", description: "流体残留 0.1–10；同时决定流体保持活跃的时长" },
  { name: "lean", type: "number", default: "0", description: "板条随水流倾斜的程度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时一道揭示带扫入整面墙" },
  { name: "introDuration", type: "number", default: "1.5", description: "开场时长（秒），≥ 0.2" },
  { name: "paused", type: "boolean", default: "false", description: "冻结波浪与流体时间" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "micro-slats",
  name: "微板条海",
  href: "micro-slats.html",
  title: "微板条海",
  description:
    "数千枚圆角小板条组成的透视浪海：离屏场通道按每板条一像素评估四列带真实色散关系的方向波，屏幕通道把每枚板条画成抗锯齿胶囊——浪峰拉长并闪 glint 高光、浪谷缩短、远处沉入雾霭地平线；指针拖动驱动一块 96 格的 GPU 流体（速度 + 墨迹），弯折邻近板条并留下辉光尾迹，点击激起三道旋转喷流；swell/tide/storm/signal 四套预设捆好浪型，单项参数可覆盖；ogl 做 WebGL2 管线，450 万像素预算，静止与离屏自睡，减弱动效时渲染静态墙面。",
  tags: ["React", "CSS", "WebGL", "ogl"],

  cardDescription: "小板条墙起伏成透视浪海，浪尖闪光，指针搅出墨流。",

  demoHint: "拖过板条墙看它弯腰并拖出墨迹，点击激三道喷流；切 storm 感受风浪，swirl/lean 加旋涡。",

  api: API,
};
