/* Component metadata only — the live demo and gallery preview live in
   light-tunnel-demo.jsx, the framework source texts and the prompt in
   light-tunnel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with light-tunnel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "cableColor", type: "string", default: '"#ffffff"', description: "静息光纤颜色；任意 CSS 颜色" },
  { name: "pulseColor", type: "string", default: '"#ffffff"', description: "彗星颜色；任意 CSS 颜色" },
  { name: "tunnelColor", type: "string", default: '"#ffffff"', description: "光纤之间乳白体色" },
  { name: "tunnelOpacity", type: "number", default: "0", description: "体色强度，clamp 0–1" },
  { name: "speed", type: "number", default: "0.1", description: "线束旋转漂移速度，0 冻结" },
  { name: "flowDirection", type: '"inward" | "outward"', default: '"inward"', description: "彗星行进方向，未知值回退 inward" },
  { name: "pulseSpeed", type: "number", default: "2", description: "彗星速度，下限 0" },
  { name: "pulseLength", type: "number", default: "0.28", description: "彗星尾长，clamp 0.02–1" },
  { name: "pulseBlend", type: "number", default: "0.6", description: "头尾包络形状，clamp 0–1" },
  { name: "pulseWidth", type: "number", default: "1", description: "彗星描边宽度，clamp 0.1–3" },
  { name: "pulseDensity", type: "number", default: "0.5", description: "光纤携带彗星的概率，clamp 0–1" },
  { name: "cableCount", type: "number", default: "56", description: "环向光纤数，clamp 4–200" },
  { name: "thickness", type: "number", default: "0.35", description: "光纤描边宽度，clamp 0.05–2" },
  { name: "rimWidth", type: "number", default: "0.15", description: "描边外晕宽度，clamp 0–1" },
  { name: "waviness", type: "number", default: "0.3", description: "格元的深度波纹，下限 0" },
  { name: "sway", type: "number", default: "0.5", description: "整束缓慢摆动幅度，下限 0" },
  { name: "bend", type: "number", default: "0.4", description: "隧道轴弯曲幅度，下限 0" },
  { name: "size", type: "number", default: "1", description: "隧道变焦倍率，下限 0.05" },
  { name: "centerX", type: "number", default: "0", description: "隧道口横向偏移（半短边单位）" },
  { name: "centerY", type: "number", default: "0", description: "隧道口纵向偏移（半短边单位）" },
  { name: "glow", type: "number", default: "1", description: "彗星光晕强度，下限 0" },
  { name: "fadeNear", type: "number", default: "0.5", description: "内侧渐隐起始半径，下限 0.001" },
  { name: "fadeFar", type: "number", default: "2", description: "外侧渐隐结束半径，下限 0.01" },
  { name: "brightness", type: "number", default: "1", description: "输出亮度，下限 0" },
  { name: "colorVariance", type: "boolean", default: "true", description: "每根光纤的亮度差异" },
  { name: "grain", type: "boolean", default: "false", description: "开启胶片颗粒" },
  { name: "grainIntensity", type: "number", default: "0.05", description: "颗粒强度，下限 0" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，clamp 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标牵引隧道轴向" },
  { name: "mouseStrength", type: "number", default: "0.1", description: "牵引强度，下限 0" },
  { name: "clickSurge", type: "boolean", default: "true", description: "点击送出一道涌动光环" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 1.8s 深度显影" },
  { name: "variation", type: "number", default: "0", description: "光纤哈希种子，换个值换一束纹理" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面墨彩输出" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "渲染像素比，上限 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "light-tunnel",
  name: "光纤彗星隧道",
  href: "light-tunnel.html",
  title: "光纤彗星隧道",
  description:
    "迎面望进一根光纤束隧道：数十根发丝级缆线按对数深度铺向远方，彗星沿着各自的缆线竞速，整束缓慢摆动、深度波纹起伏；光标牵引隧道轴向弯折，点击送出一道沿深度奔涌的光环，随机 hash 让每根缆线有自己的抖动、相位与明暗。远端按像素间距自动 LOD 成均质光雾避免锯齿，深度显影、双向彗星、乳白体色、颗粒与墨彩输出齐备，空闲后帧循环自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "光纤隧道里彗星竞速，光标牵引轴向，点击涌动光环。",

  demoHint: "移动鼠标牵引隧道，点击送出涌动光环；缆线数、彗星速度与密度可调。",

  api: API,
};
