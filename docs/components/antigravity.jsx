/* Component metadata only — the live demo and gallery preview live in
   antigravity-demo.jsx, the framework source texts and the prompt in
   antigravity-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with antigravity-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "count", type: "number", default: "1500", description: "粒子数量，clamp 1–20000" },
  { name: "magnetRadius", type: "number", default: "9", description: "光标捕获半径，≥ 0" },
  { name: "ringRadius", type: "number", default: "7", description: "光环半径，≥ 0" },
  { name: "waveSpeed", type: "number", default: "0.4", description: "环上锥形波的行进速度" },
  { name: "waveAmplitude", type: "number", default: "1", description: "环波幅度，≥ 0" },
  { name: "waveCount", type: "number", default: "3", description: "环上的波瓣数量，≥ 0" },
  { name: "particleSize", type: "number", default: "0.9", description: "粒子基础尺寸，≥ 0" },
  { name: "lerpSpeed", type: "number", default: "0.05", description: "弹簧趋近目标的快慢 0.001–1" },
  { name: "color", type: "string", default: "—", description: "单色调色板；设置后覆盖 colors" },
  { name: "colors", type: "string[]", default: '["#5227FF", "#FF9FFC", "#B497CF"]', description: "调色板色标（hex / rgb() / rgba()）" },
  { name: "colorMode", type: '"conic" | "radial" | "random"', default: '"conic"', description: "粒子取色方式：绕环角度/离环距离/每粒随机" },
  { name: "colorSpeed", type: "number", default: "0.05", description: "锥形取色的色相旋转速度" },
  { name: "autoAnimate", type: "boolean", default: "true", description: "指针静止后光标自动漂移" },
  { name: "particleVariance", type: "number", default: "1", description: "粒子间的尺寸/呼吸差异，≥ 0" },
  { name: "rotationSpeed", type: "number", default: "0", description: "被捕获粒子的公转速度" },
  { name: "depthFactor", type: "number", default: "1", description: "深度视差与雾化强度，≥ 0" },
  { name: "pulseSpeed", type: "number", default: "3", description: "每颗粒子的呼吸频率" },
  { name: "particleShape", type: '"capsule" | "sphere" | "box" | "tetrahedron"', default: '"capsule"', description: "粒子外形" },
  { name: "fieldStrength", type: "number", default: "10", description: "环外散布带的紧凑程度，≥ 0" },
  { name: "ambient", type: "number", default: "0.25", description: "环外粒子的尺寸/透明度 0–1" },
  { name: "interactive", type: "boolean", default: "true", description: "指针驱动光标；关闭后只走自动漂移" },
  { name: "clickBurst", type: "boolean", default: "true", description: "按住后松开向外炸开粒子" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时粒子从下方升起并淡入" },
  { name: "lightMode", type: "boolean", default: "false", description: "调色板亮度封顶，适配亮色背景" },
  { name: "opacity", type: "number", default: "1", description: "画布不透明度 0–1" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限 0.5–3（另有 240 万像素预算）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "antigravity",
  name: "环升粒子场",
  href: "antigravity.html",
  title: "环升粒子场",
  description:
    "WebGL2 实例化的粒子场：静止时粒子按抖动网格漂着呼吸，光标靠近时被磁力捕获、升成一圈带锥形波的光环并从 oklab 调色板取色，按住充能把环收紧加速，松手向外炸开一圈冲量；胶囊/球/方盒/四面体四种外形带速度拖尾与深度视差，指针静止 2 秒后自动漂移接管，KHR 并行编译着色器、上下文丢失自动重建。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "粒子被光标升成发光光环，按住充能、松手炸开。",

  demoHint: "画一圈慢移光标看粒子跟环，按住再松手把粒子炸开；换外形与取色模式看色相旋转。",

  api: API,
};
