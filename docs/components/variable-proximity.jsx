/* Component metadata only — the live demo and gallery preview live in
   variable-proximity-demo.jsx, the framework source texts and the prompt in
   variable-proximity-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with variable-proximity-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "label", type: "string", default: '""', description: "文字内容；按空格拆词" },
  { name: "fromFontVariationSettings", type: "string", default: `"'wght' 400, 'opsz' 9"`, description: "远离指针时的可变轴状态" },
  { name: "toFontVariationSettings", type: "string", default: `"'wght' 1000, 'opsz' 40"`, description: "贴近指针时插值到的可变轴状态" },
  { name: "containerRef", type: "RefObject", default: "—", description: "作用域容器；指针不在其范围内时不响应" },
  { name: "radius", type: "number", default: "50", description: "指针影响半径（px）" },
  { name: "falloff", type: '"linear" | "exponential" | "gaussian"', default: '"linear"', description: "强度随距离的衰减曲线" },
  { name: "smoothing", type: "number", default: "0.2", description: "跟随迟滞 0–1；0 即时，越大越黏" },
  { name: "fromColor", type: "string", default: "—", description: "远离时的字色；与 toColor 一起启用染色" },
  { name: "toColor", type: "string", default: "—", description: "贴近时的字色" },
  { name: "scale", type: "number", default: "1", description: "满强度时的放大倍数（1 不放大）" },
  { name: "lift", type: "number", default: "0", description: "满强度时的上浮距离（em）" },
  { name: "idleWave", type: "boolean", default: "false", description: "指针离开 500ms 后开始扫波浪" },
  { name: "fontSize", type: "number | string", default: "—", description: "字号（数字按 px）；缺省继承" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "onClick", type: "function", default: "—", description: "透传给根节点的点击回调" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "variable-proximity",
  name: "距离感应字重",
  href: "variable-proximity.html",
  title: "距离感应字重",
  description:
    "可变字重的指针感应场：每个字母按与指针的距离在轻/重两档可变轴之间连续插值，线性、指数、高斯三种衰减曲线可选，还能随压力染色、放大、上浮；指针离开可交给一道横扫的待机波浪，容器 ref 能把作用域圈进指定区块；rAF 落定自睡，减动效下关闭波浪。",
  tags: ["React", "CSS", "可变字体"],

  cardDescription: "字母字重随指针距离连续变重变轻，离开后交给波浪呼吸。",

  demoHint: "横移指针看字重曲线差异；把半径调大做整句连动，开 idleWave 移开后看波浪。",

  api: API,
};
