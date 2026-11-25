/* Component metadata only — the live demo and gallery preview live in
   cubes-demo.jsx, the framework source texts and the prompt in
   cubes-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with cubes-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "gridSize", type: "number", default: "10", description: "正方形网格每边的方块数，取整后 1–40" },
  { name: "gap", type: "number", default: "0.18", description: "方块间距占格子的比例 0–0.9" },
  { name: "faceColor", type: "string", default: '"#120F17"', description: "方块面颜色" },
  { name: "edgeColor", type: "string", default: '"#ffffff"', description: "方块棱线颜色" },
  { name: "edgeWidth", type: "number", default: "1", description: "棱线宽度（px）" },
  { name: "edgeStyle", type: '"solid" | "dashed" | "dotted" | "none"', default: '"solid"', description: "棱线样式：实线 / 虚线 / 点线 / 无线" },
  { name: "faceOpacity", type: "number", default: "1", description: "面透明度 0–1，棱线保持不透明" },
  { name: "shading", type: "number", default: "0.6", description: "侧面朝棱线色变暗的程度" },
  { name: "maxAngle", type: "number", default: "45", description: "方块转向指针的最大角度（度）" },
  { name: "radius", type: "number", default: "3", description: "指针影响半径（格数），≥ 0.5" },
  { name: "speed", type: "number", default: "1", description: "转向弹簧的响应速度，≥ 0.05" },
  { name: "bounce", type: "number", default: "0.4", description: "转向弹簧的过冲 0–1" },
  { name: "brush", type: "number", default: "1", description: "快速扫过时带动方块旋转的力度" },
  { name: "perspective", type: "number", default: "0", description: "透视强度 0–1；0 为正交视角" },
  { name: "autoAnimate", type: "boolean", default: "true", description: "指针闲置时由幽灵光标维持动画" },
  { name: "rippleOnClick", type: "boolean", default: "true", description: "点击产生向外扩散的涟漪" },
  { name: "rippleColor", type: "string", default: '"#ffffff"', description: "涟漪闪光颜色" },
  { name: "rippleSpeed", type: "number", default: "1", description: "涟漪扩散速度，≥ 0.05" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时方块从中心向外成波生长并转正" },
  { name: "paused", type: "boolean", default: "false", description: "冻结模拟但不销毁引擎" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（钳制到 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
];

export default {
  id: "cubes",
  name: "方块阵列注视",
  href: "cubes.html",
  title: "方块阵列注视",
  description:
    "一片描线立方体阵列：指针经过时方块各自转向注视、快速扫过把旋转梳进阵列，点击落下一圈向外扩散并闪光的涟漪；指针闲置三秒后幽灵光标接管，李萨如轨迹让阵列自己活着。WebGL2 实例化渲染，一个立方体几何体画出整片网格，棱线用 UV 导数解析生成（实线、虚线、点线、无线四种），视角正交或透视可切，帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "3D"],

  cardDescription: "描线方块阵列注视指针，扫过成波、点击扩散涟漪，闲置时自己游走。",

  demoHint: "移动并快速扫过阵列，点击看涟漪；调半径与最大转角感受注视范围，切换虚实点线棱线。",

  api: API,
};
