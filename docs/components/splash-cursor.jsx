/* Component metadata only — the live demo and gallery preview live in
   splash-cursor-demo.jsx, the framework source texts and the prompt in
   splash-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with splash-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#4f8cff", "#2dd4bf", "#ffd166"]', description: "墨水调色板，随时间平滑插值（关闭 rainbow 时使用）" },
  { name: "rainbow", type: "boolean", default: "true", description: "循环整个色轮取墨色，而不是走调色板" },
  { name: "colorSpeed", type: "number", default: "1", description: "墨色循环速度" },
  { name: "intensity", type: "number", default: "1", description: "每次划动的注墨量" },
  { name: "size", type: "number", default: "1", description: "泼溅半径倍率" },
  { name: "force", type: "number", default: "1", description: "划动与爆点的推力倍率" },
  { name: "swirl", type: "number", default: "3", description: "涡度强化强度，越大漩涡越多" },
  { name: "trail", type: "number", default: "1", description: "墨迹存留时间，越大拖尾越长" },
  { name: "momentum", type: "number", default: "1", description: "流速存留时间" },
  { name: "shading", type: "number", default: "1", description: "法线明暗深度 0–1" },
  { name: "glow", type: "number", default: "0", description: "泛光强度 0–1，亮墨发光" },
  { name: "quality", type: '"low" | "medium" | "high"', default: '"high"', description: "模拟分辨率与压力迭代档位" },
  { name: "clickSplash", type: "boolean", default: "true", description: "点击炸出花瓣冲击与墨滴王冠" },
  { name: "intro", type: "boolean", default: "true", description: "挂载后自动扫一笔演示效果" },
  { name: "contained", type: "boolean", default: "false", description: "只在父盒内追踪指针并改为绝对定位" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "暗色为亮墨叠在页面上，亮色为白底吸墨" },
  { name: "zIndex", type: "number", default: "50", description: "根元素 z-index" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "splash-cursor",
  name: "流体泼墨光标",
  href: "splash-cursor.html",
  title: "流体泼墨光标",
  description:
    "跟着指针跑的 GPU 流体：WebGL2 稳定流体解算（涡度强化 + Jacobi 压力求解 + 半浮点双缓冲），划动沿运动线段注入速度与墨水，点击炸出花瓣状冲击波和七滴墨的王冠；墨色按色轮循环或在调色板间插值，泛光让亮墨发光，暗色主题输出发光墨、亮色主题输出白底吸墨；支持 low/medium/high 三档分辨率、容器内追踪、挂载自动演示笔画，空闲后自睡并清屏，上下文丢失自动重建。",
  tags: ["React", "WebGL", "GLSL", "光标"],

  cardDescription: "流体墨水跟着指针打转，点击炸出花瓣泼溅。",

  demoHint: "在面板里划圈搅出漩涡，点击砸一朵泼溅；关掉 rainbow 用固定调色板，glow 拉高看亮墨发光。",

  api: API,
};
