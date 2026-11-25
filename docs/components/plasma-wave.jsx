/* Component metadata only — the live demo and gallery preview live in
   plasma-wave-demo.jsx, the framework source texts and the prompt in
   plasma-wave-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with plasma-wave-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "[string, string]", default: '["#A855F7", "#06B6D4"]', description: "两条等离子带各自的颜色；缺省回退另一条，再回退内置默认" },
  { name: "speed", type: "number", default: "1", description: "总时间倍率；0 冻结" },
  { name: "speed1", type: "number", default: "0.05", description: "第一条带的波动相位速度" },
  { name: "speed2", type: "number", default: "0.05", description: "第二条带的波动相位速度" },
  { name: "dir2", type: "number", default: "1", description: "第二条带的相位方向；-1 与第一条带逆向互穿" },
  { name: "bend1", type: "number", default: "1", description: "第一条带的卷曲幅度" },
  { name: "bend2", type: "number", default: "0.5", description: "第二条带的卷曲幅度" },
  { name: "thickness", type: "number", default: "0.3", description: "管的粗细半径，下限 0.02" },
  { name: "focalLength", type: "number", default: "1.25", description: "透视焦距；越小视野越广" },
  { name: "rotationDeg", type: "number", default: "0", description: "整个场景的旋转角（度）" },
  { name: "xOffset", type: "number", default: "0", description: "取景横向偏移（px）" },
  { name: "yOffset", type: "number", default: "0", description: "取景纵向偏移（px）" },
  { name: "brightness", type: "number", default: "1", description: "整体曝光倍率" },
  { name: "glow", type: "number", default: "1", description: "辉光泛光强度" },
  { name: "core", type: "number", default: "0.6", description: "白热灯芯强度 0–1" },
  { name: "grain", type: "number", default: "0.03", description: "胶片颗粒强度，≥0" },
  { name: "quality", type: "number", default: "1", description: "渲染分辨率比例 0.25–1；总量超 240 万像素自动收敛" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "鼠标处等离子鼓包隆起，一圈光镜跟随指针" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 1.8s 内卷曲幅度涨到满值" },
  { name: "fade", type: "number", default: "0", description: "容器四边柔化遮罩 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：光带印成墨线，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结运动但保留最后一帧画面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "plasma-wave",
  name: "等离子双带",
  href: "plasma-wave.html",
  title: "等离子双带",
  description:
    "两条等离子光带在暗场中相互穿插卷曲：SDF 光线步进画出两根起伏的发光管，粗渲染 1/3 分辨率铺底、边缘感知的细渲染只在光带轮廓处补全细节，四级辉光金字塔叠出泛光，管心过曝成白热灯芯；鼠标处光带隆起、一圈光镜跟随指针增亮。浮点 HDR 目标、像素预算约束、帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "两条白芯等离子光带互穿卷曲，辉光泛光，鼠标处隆起发亮。",

  demoHint: "移动鼠标看光带隆起与光镜跟随；调 bend 与 dir2 让两条带纠缠或逆向。",

  api: API,
};
