/* Component metadata only — the live demo and gallery preview live in
   ballpit-demo.jsx, the framework source texts and the prompt in
   ballpit-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ballpit-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "count", type: "number", default: "200", description: "球数，clamp 1–4000" },
  { name: "colors", type: "(string | number)[]", default: '["#ffffff"]', description: "球的配色（hex 字符串或 0xRRGGBB 数字）；空数组回退白色" },
  { name: "material", type: '"satin" | "matte" | "gloss" | "frosted" | "metal"', default: '"satin"', description: "表面材质预设" },
  { name: "minSize", type: "number", default: "0.5", description: "最小球半径" },
  { name: "maxSize", type: "number", default: "1", description: "最大球半径" },
  { name: "gravity", type: "number", default: "0.5", description: "重力强度（0 = 失重漂浮）" },
  { name: "friction", type: "number", default: "0.9975", description: "每 60Hz 帧的速度阻尼 0.5–1" },
  { name: "wallBounce", type: "number", default: "0.95", description: "撞墙弹性 0–1" },
  { name: "bounce", type: "number", default: "0.85", description: "球间碰撞弹性 0–1" },
  { name: "depth", type: "number", default: "2", description: "球池沿 z 的深度，≥ 0" },
  { name: "drift", type: "number", default: "0", description: "随机游走力，≥ 0" },
  { name: "followCursor", type: "boolean", default: "true", description: "光标球推开周围球" },
  { name: "cursorSize", type: "number", default: "1", description: "光标球半径，≥ 0（0 隐藏）" },
  { name: "grab", type: "boolean", default: "true", description: "按下拾取球，拖动再松手甩出" },
  { name: "clickEffect", type: '"burst"', default: '"burst"', description: "快速点击的冲量效果" },
  { name: "lightColor", type: "string", default: '"#ffffff"', description: "点光源颜色" },
  { name: "lightIntensity", type: "number", default: "1", description: "光功率；大于 20 按瓦特读入（/200）" },
  { name: "exposure", type: "number", default: "1", description: "色调映射曝光，≥ 0" },
  { name: "shadows", type: "number", default: "0.6", description: "接触空腔暗部 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时球从上方落进池里" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比上限（默认 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "ballpit",
  name: "球池物理场",
  href: "ballpit.html",
  title: "球池物理场",
  description:
    "WebGL2 实例化球体 + CPU 物理的球池：球从上方落进刚性盒子里堆叠，逐像素解析光线求交写深度、GGX PBR 加三点位摄影棚环境与清漆层，接触空腔按邻球累积做软阴影；光标是实体球推开球堆，按下拾取拖拽松手甩出，快速点击径向炸开并让点光源闪到落点；样式全部内联在 JS 里，空间网格宽相 + 迭代冲量求解器稳定到 4000 球。",
  tags: ["React", "WebGL", "物理", "图形"],

  cardDescription: "软光球池里推球、抓球、炸球，真实堆叠与滚动。",

  demoHint: "拖动光标球推球，按住抓一颗球甩出去，快速点击炸开球堆；换材质与配色看光影。",

  api: API,
};
