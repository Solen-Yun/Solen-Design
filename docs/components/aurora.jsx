/* Component metadata only — the live demo and gallery preview live in
   aurora-demo.jsx, the framework source texts and the prompt in
   aurora-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with aurora-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colorStops", type: "string[]", default: '["#5227FF", "#7cff67", "#5227FF"]', description: "渐变色标（任意 CSS 颜色）；最多 5 个，单色自我首尾相接" },
  { name: "amplitude", type: "number", default: "1", description: "帷幕下缘的波浪高度，≥ 0" },
  { name: "blend", type: "number", default: "0.5", description: "帷幕边缘的柔和度 0–1" },
  { name: "speed", type: "number", default: "1", description: "飘动的时间倍率" },
  { name: "time", type: "number", default: "—", description: "自驱时间轴（uTime = time × speed × 0.1），替换内部时钟" },
  { name: "height", type: "number", default: "0.45", description: "帷幕从边缘垂下的深度 0–1（视口高度比例）" },
  { name: "scale", type: "number", default: "1", description: "噪声空间频率，≥ 0.1" },
  { name: "glow", type: "number", default: "0.6", description: "帷幕密度与下缘衰减，≥ 0" },
  { name: "brightness", type: "number", default: "1", description: "输出增益；< 1 变暗，> 1 加深" },
  { name: "layers", type: "number", default: "1", description: "视差帷幕层数 1–3" },
  { name: "direction", type: '"top" | "bottom"', default: '"top"', description: "帷幕悬挂的边缘：顶部/底部" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "帷幕向光标处隆起" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 2.4 秒淡入显现" },
  { name: "opacity", type: "number", default: "1", description: "画布不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "半透明墨色帷幕，适配亮色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结飘动（仍渲染一帧）" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比上限（默认 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "aurora",
  name: "极光顶幕",
  href: "aurora.html",
  title: "极光顶幕",
  description:
    "WebGL2 全屏三角渲染的极光帷幕：最多三层 simplex 噪声扭出的柔软丝带从页面顶缘垂下，色相沿 oklab 渐变随时间滑动、逐层放慢视差，光标经过时下缘轻轻隆起；screen 混合叠在透明画布上，可翻到底缘、切亮色墨幕模式，2.4 秒 intro 淡入，dither 消色带，prefers-reduced-motion 落定静帧。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "柔静的极光从页面顶缘流过，色相滑动、随光标隆起。",

  demoHint: "移动光标看帷幕隆起跟随；加层数看视差，切方向与亮色模式看不同版式。",

  api: API,
};
