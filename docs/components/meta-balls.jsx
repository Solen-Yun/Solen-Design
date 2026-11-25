/* Component metadata only — the live demo and gallery preview live in
   meta-balls-demo.jsx, the framework source texts and the prompt in
   meta-balls-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with meta-balls-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "color", type: "string", default: '"#ffffff"', description: "液态球群的颜色" },
  { name: "cursorBallColor", type: "string", default: '"#ffffff"', description: "光标球的颜色；与球群融合时颜色会互相渗入" },
  { name: "speed", type: "number", default: "0.3", description: "球群锚点扫过各自轨迹的速度" },
  { name: "enableMouseInteraction", type: "boolean", default: "true", description: "光标球跟随指针、点击迸散是否生效" },
  { name: "hoverSmoothness", type: "number", default: "0.1", description: "光标球跟随指针的灵敏度 0–1" },
  { name: "animationSize", type: "number", default: "30", description: "舞台的世界高度（单位数），决定球的尺寸与迸散半径" },
  { name: "ballCount", type: "number", default: "15", description: "模拟的球数，取整后 0–50" },
  { name: "clumpFactor", type: "number", default: "1", description: "球群向中心聚拢的程度" },
  { name: "cursorBallSize", type: "number", default: "3", description: "光标球半径（世界单位）" },
  { name: "enableTransparency", type: "boolean", default: "false", description: "透明画布背景，否则画布自带不透明底色" },
  { name: "variant", type: '"solid" | "outline" | "contour"', default: '"solid"', description: "实心填充 / 边缘描线 / 同心等值线圈三种渲染" },
  { name: "motion", type: '"orbit" | "lava" | "drift"', default: '"orbit"', description: "球群锚点的编排：环绕 / 熔岩灯上下翻滚 / 双正弦漂移" },
  { name: "gooeyness", type: "number", default: "0.5", description: "场的融合指数与阈值塑造 0–1，越大越容易粘连成大液团" },
  { name: "stickiness", type: "number", default: "0.5", description: "相近球之间拉出液桥的吸附力 0–1" },
  { name: "stretch", type: "number", default: "0.5", description: "高速球沿速度方向拉长形变的幅度 0–1" },
  { name: "wobble", type: "number", default: "0.5", description: "形变弹簧的回弹幅度，高值会抖动过冲 0–1" },
  { name: "lineWidth", type: "number", default: "1.5", description: "outline / contour 变体的描线宽度（px）" },
  { name: "rings", type: "number", default: "4", description: "contour 变体的等值线圈数，0–12" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击把附近的球迸散，并让光标球鼓一下" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时错峰飞入并放大的开场" },
  { name: "paused", type: "boolean", default: "false", description: "冻结模拟但不销毁引擎" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（钳制 0.5–2）" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "meta-balls",
  name: "液态融合球",
  href: "meta-balls.html",
  title: "液态融合球",
  description:
    "一整片会互相吞噬的液体：球群按环绕、熔岩灯或漂移三种编排游走，靠近时拉出液桥、融合、分开时拉丝收细；一颗光标球追着指针游动，把球群顶开、染上自己的颜色，点击把附近的球迸散再聚拢。WebGL2 有符号距离场渲染，物理在 240Hz 子步推进，形变弹簧让高速的球沿速度拉长抖动；支持实心、描线、等值线圈三种渲染与透明背景。",
  tags: ["React", "CSS", "WebGL", "液态"],

  cardDescription: "一群液球互相融合拉丝，光标球追着指针顶开液团，点击迸散。",

  demoHint: "在舞台上移动、点击光标；切换 orbit / lava / drift 看三种编排，调 gooeyness 与 stickiness 感受融合与液桥。",

  api: API,
};
