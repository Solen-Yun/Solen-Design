/* Component metadata only — the live demo and gallery preview live in
   particle-text-demo.jsx, the framework source texts and the prompt in
   particle-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with particle-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Solen"', description: "粒子拼出的文字" },
  { name: "particleSize", type: "number", default: "2", description: "基础粒子尺寸（px）" },
  { name: "density", type: "number", default: "4", description: "采样网格步长（px），越小越密" },
  { name: "color", type: "string", default: '"currentColor"', description: "粒子基色；currentColor 继承容器文字色" },
  { name: "highlightColor", type: "string", default: '"#ff5a36"', description: "运动发热时移向的高亮色，也是辉光与扫描线颜色" },
  { name: "highlightMode", type: '"motion" | "gradient"', default: '"motion"', description: "motion 按位移发热变色；gradient 固定水平渐变" },
  { name: "shape", type: '"circle" | "square" | "line"', default: '"circle"', description: "粒子形状；line 为随速度取向的短线" },
  { name: "intro", type: '"gather" | "rain" | "spiral" | "scan"', default: '"gather"', description: "入场编排：四方汇聚、天降雨点、螺旋卷入、扫描线掠过" },
  { name: "scatter", type: "number", default: "180", description: "汇聚/螺旋起点离目标的距离（px）" },
  { name: "gatherDuration", type: "number", default: "1600", description: "入场基础时长（ms）" },
  { name: "stagger", type: "number", default: "420", description: "粒子间随机延迟幅度（ms）" },
  { name: "clickBurst", type: "boolean", default: "true", description: "点击把粒子炸开，弹簧拉回" },
  { name: "burstStrength", type: "number", default: "1", description: "爆炸力度倍率，0 关闭" },
  { name: "pointerRepel", type: "number", default: "40", description: "粒子躲避指针的推力（px）" },
  { name: "repelRadius", type: "number", default: "120", description: "指针排斥半径（px）" },
  { name: "idleDrift", type: "number", default: "0.7", description: "空闲呼吸漂移幅度（px），0 冻结" },
  { name: "trigger", type: '"mount" | "hover" | "click"', default: '"mount"', description: "首次聚字之后，什么操作重播入场" },
  { name: "fontSize", type: "number | string", default: '"clamp(3rem, 12vw, 8rem)"', description: "采样用字号；超宽自动缩小到容器 92%" },
  { name: "fontWeight", type: "number", default: "800", description: "采样用字重" },
  { name: "fontFamily", type: "string", default: '"inherit"', description: "字体族；inherit 读容器字体" },
  { name: "glow", type: "boolean", default: "true", description: "亮粒子后面的柔光晕" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "particle-text",
  name: "粒子聚散文字",
  href: "particle-text.html",
  title: "粒子聚散文字",
  description:
    "文字被离屏采样成数千颗粒子：四种入场（四方汇聚、天降雨点、螺旋卷入、扫描线掠过）把粒子送进字形，指针推开粒子、点击炸开再由弹簧拉回，空闲呼吸漂移；运动位移让粒子向高亮色发热变色，12 色调 × 8 透明度分桶批量绘制，帧循环稳定后自睡，离屏暂停。",
  tags: ["React", "Canvas", "粒子", "文字"],

  cardDescription: "文字由数千漂移粒子聚成，点击炸开再弹回，指针推开粒子。",

  demoHint: "切换入场方式看四种聚字编排；点击画面看爆炸回弹；拖动指针推开粒子；调粒子尺寸与密度看颗粒粗细。",

  api: API,
};
