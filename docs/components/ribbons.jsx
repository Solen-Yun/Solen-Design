/* Component metadata only — the live demo and gallery preview live in
   ribbons-demo.jsx, the framework source texts and the prompt in
   ribbons-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ribbons-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#3847ff", "#7c84ff", "#c7cbff"]', description: "一条丝带一个颜色，最多 12 条；每项接受任意 CSS 颜色" },
  { name: "thickness", type: "number", default: "30", description: "最大描边宽度（px）" },
  { name: "length", type: "number", default: "1.4", description: "丝带长度 / 拖尾迟滞 0.1–5" },
  { name: "spread", type: "number", default: "18", description: "相邻丝带头部的横向错位（px）" },
  { name: "stiffness", type: "number", default: "0.5", description: "头部弹簧的频率 0–1" },
  { name: "bounce", type: "number", default: "0.5", description: "弹簧阻尼 0–1，0 临界阻尼最稳、1 回弹震颤最弹" },
  { name: "shape", type: '"lens" | "comet" | "even"', default: '"lens"', description: "宽度轮廓：两头尖的透镜 / 彗尾渐细 / 均匀圆头" },
  { name: "wave", type: "number", default: "0", description: "沿丝带 travelling 的三个鼓包起伏 0–1" },
  { name: "softness", type: "number", default: "0", description: "边缘额外的羽化 0–1" },
  { name: "fade", type: "boolean", default: "false", description: "丝带向尾部渐隐" },
  { name: "opacity", type: "number", default: "1", description: "整体描边不透明度 0–1" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "画布清屏颜色（任意 CSS 颜色）" },
  { name: "dpr", type: "number", default: "—", description: "DPR 覆盖；默认取 devicePixelRatio 并钳到 2" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "ribbons",
  name: "弹簧丝带拖尾",
  href: "ribbons.html",
  title: "弹簧丝带拖尾",
  description:
    "几条有弹性的丝带追着光标跑：每条头部是一个阻尼弹簧（stiffness 定频率、bounce 定回弹），身后 50 个节点逐节跟随，轨迹经 Catmull-Rom 样条 4 倍重采样后按宽度轮廓（透镜 / 彗尾 / 均匀）挤出成三角带描边，抗锯齿边缘、可加 traveling 波浪与尾部渐隐；固定 1/120s 步长的模拟保证任何帧率下手感一致。指针事件穿透宿主，颜色增减实时增减丝带。",
  tags: ["React", "CSS", "WebGL", "光标"],

  cardDescription: "几条弹簧丝带绕着光标甩动，快速划圈会回弹震颤后归位。",

  demoHint: "缓慢移动看丝带弹簧跟随，快速画圈看回弹震颤；bounce 拉满最弹、拉零最稳，开 wave 看丝带起伏。",

  api: API,
};
