/* Component metadata only — the live demo and gallery preview live in
   shape-waves-demo.jsx, the framework source texts and the prompt in
   shape-waves-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with shape-waves-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '""', description: "可选文字遮罩：只有字形外的格点会渲染，字形内的格点隐藏" },
  { name: "fontFamily", type: "string", default: "'Geist, \"Geist Sans\", system-ui, sans-serif'", description: "遮罩文字的字体族" },
  { name: "fontWeight", type: "number", default: "500", description: "遮罩文字的字重" },
  { name: "textSize", type: "number", default: "0.6", description: "遮罩字号占画布高的比例，超宽时按 90% 宽度等比缩小" },
  { name: "shapes", type: '"mixed" | "squares" | "circles" | "triangles"', default: '"mixed"', description: "格点形状；mixed 三形混排，固定形状时越暗的格点越小" },
  { name: "cellSize", type: "number", default: "10", description: "格点间距（CSS px），下限 2" },
  { name: "dotSize", type: "number", default: "0.75", description: "形状半径占半格比例，clamp 0.1–1" },
  { name: "color", type: "string", default: '"#929292"', description: "形状静息色" },
  { name: "hoverColor", type: "string", default: '"#ffffff"', description: "波峰与涟漪推亮的颜色" },
  { name: "backgroundColor", type: "string", default: '"#000000"', description: "形状之间的底色，同时内联在根节点" },
  { name: "speed", type: "number", default: "1", description: "噪声波滚动速度，0 冻结环境运动" },
  { name: "scale", type: "number", default: "1", description: "噪声缩放，越大越细碎，下限 0.05" },
  { name: "contrast", type: "number", default: "1", description: "三级亮度带的对比度" },
  { name: "brightness", type: "number", default: "0.4", description: "静息亮度偏置" },
  { name: "flow", type: "number", default: "0", description: "噪声场漂移速度（格/秒）" },
  { name: "direction", type: "number", default: "0", description: "漂移方向（度）" },
  { name: "fade", type: "number", default: "0.25", description: "边缘超椭圆衰减，0 关闭" },
  { name: "interactive", type: "boolean", default: "true", description: "指针移动注入涟漪" },
  { name: "splashRadius", type: "number", default: "40", description: "涟漪注入半径（CSS px）" },
  { name: "splashStrength", type: "number", default: "0.4", description: "涟漪注入强度" },
  { name: "glow", type: "number", default: "0.35", description: "辉光强度；0 跳过整条辉光管线" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从中心向外扫入（带过冲）" },
  { name: "introDuration", type: "number", default: "1.6", description: "扫入时长（秒），下限 0.1" },
  { name: "introKey", type: "number", default: "0", description: "递增以重播扫入" },
  { name: "paused", type: "boolean", default: "false", description: "冻结环境运动但保留画面与涟漪" },
  { name: "onError", type: "(error: Error) => void", default: "—", description: "WebGPU 初始化或帧失败时回调；组件退化为纯背景色" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "shape-waves",
  name: "形状波涌",
  href: "shape-waves.html",
  title: "形状波涌",
  description:
    "一片三角、圆、方组成的格点场，亮度随滚动的噪声波分三级起伏；指针划过时向水波场注入高斯水花，涟漪逐格传播、把途经格点推向高亮色。文字可作遮罩只留字形内的格点，WebGPU 渲染加半分辨率辉光，挂载时从中心带过冲扫入。",
  tags: ["React", "WebGPU", "CSS", "背景"],

  cardDescription: "格点形状场里波涌亮起，指针划过泛起逐格涟漪。",

  demoHint: "快速划过格点场看涟漪逐格扩散；形状、格距、辉光与水花强度可调，试试输入文字做遮罩。",

  api: API,
};
