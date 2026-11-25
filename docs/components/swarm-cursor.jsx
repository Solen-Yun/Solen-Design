/* Component metadata only — the live demo and gallery preview live in
   swarm-cursor-demo.jsx, the framework source texts and the prompt in
   swarm-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with swarm-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "count", type: "number", default: "800", description: "粒子数量 1–2000" },
  { name: "size", type: "number", default: "2.6", description: "粒子基础尺寸（px）0.5–16" },
  { name: "shape", type: '"dot" | "square" | "streak"', default: '"dot"', description: "粒子形状：圆点 / 方块 / 长条" },
  { name: "color", type: "string", default: "—", description: "粒子颜色；不设则暗色底用白、亮色底用近黑" },
  { name: "accentColor", type: "string", default: "—", description: "高速或闪烁粒子的提亮色；不设则与 color 相同" },
  { name: "spread", type: "number", default: "90", description: "蜂群绕锚点的聚拢半径（px）20–400" },
  { name: "speed", type: "number", default: "1", description: "搅动、环绕与游走的整体节奏 0–4" },
  { name: "swirl", type: "number", default: "0.6", description: "涡度增强与流场持续性 0–1" },
  { name: "tail", type: "number", default: "0.5", description: "外圈粒子的松散与滞后程度 0–1" },
  { name: "trail", type: "number", default: "0.6", description: "粒子沿速度方向的拉伸 0–3" },
  { name: "wander", type: "number", default: "0.5", description: "流场里卷曲噪声的翻搅 0–2" },
  { name: "depth", type: "number", default: "0.7", description: "Z 轴浮沉带来的缩放、虚化与明暗 0–1" },
  { name: "targets", type: "string", default: '"a, button, [data-swarm-target]"', description: "悬停时触发环绕的选择器" },
  { name: "idle", type: '"roam" | "gather" | "hide"', default: '"roam"', description: "指针离开后蜂群的去处：游走 / 聚在中心 / 淡出" },
  { name: "clickEffect", type: '"burst" | "pulse" | "none"', default: '"burst"', description: "点击行为：炸开 / 涟漪 / 无" },
  { name: "hideCursor", type: "boolean", default: "false", description: "隐藏原生光标，用一颗粒子代替" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从全屏散开收拢成蜂群" },
  { name: "enabled", type: "boolean", default: "true", description: "false 时停住模拟，画一帧静止群像" },
  { name: "lightMode", type: "boolean", default: "false", description: "亮色宿主用的墨色粒子（也是默认色来源）" },
  { name: "dpr", type: "number", default: "—", description: "DPR 覆盖；默认取 devicePixelRatio 并钳到 2" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在画布上层、供蜂群环绕的宿主内容" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "swarm-cursor",
  name: "粒子蜂群光标",
  href: "swarm-cursor.html",
  title: "粒子蜂群光标",
  description:
    "最多两千颗粒子组成的液态蜂群：底层是一套 CPU 网格流体（半拉格朗日平流、涡度增强、12 步 Jacobi 压力），蜂群被流场卷成漩涡、绕指针聚拢，悬停到按钮时按圆角矩形分流成环浇上去，点击炸开或推出一圈涟漪；粒子带 Z 轴浮沉、速度拉伸与高速提亮，GPU 实例化渲染并按深度排序。开场从全屏散开收拢，指针离开后按 roam/gather/hide 各自去处。",
  tags: ["React", "CSS", "WebGL", "光标"],

  cardDescription: "粒子蜂群绕着光标打旋，悬停按钮时分流成环浇上去，点击炸开再聚拢。",

  demoHint: "划动看蜂群跟流、悬停按钮看分流成环，点击切换炸开与涟漪；count、形状与 idle 去处可调。",

  api: API,
};
