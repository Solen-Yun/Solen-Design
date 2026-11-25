/* Component metadata only — the live demo and gallery preview live in
   web-threads-demo.jsx, the framework source texts and the prompt in
   web-threads-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with web-threads-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#5227FF", "#FF9FFC"]', description: "丝线调色板，最多 6 个 CSS 颜色，沿编织方向线性插值" },
  { name: "coreColor", type: "string", default: '"#FFFFFF"', description: "交叠热芯与悬停提亮的颜色" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: '"transparent" 保持透明；给颜色则着色器内不透明合成' },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：丝线印成墨迹，适合浅色页面" },
  { name: "threadCount", type: "number", default: "6", description: "丝线数量，clamp 1–24" },
  { name: "speed", type: "number", default: "0.2", description: "编织相位速度，0 冻结" },
  { name: "frequency", type: "number", default: "5", description: "每条线横向的波数" },
  { name: "spread", type: "number", default: "0.18", description: "丝线离开束点的散开幅度" },
  { name: "taper", type: "number", default: "1", description: "沿序号的振幅递增" },
  { name: "position", type: "number", default: "0.5", description: "编织中线的纵向位置，0–1" },
  { name: "pinch", type: "number", default: "0.5", description: "束点（收束顶点）的横向位置，0–1" },
  { name: "nodes", type: "number", default: "1", description: "横向束点数，clamp 1–6" },
  { name: "angle", type: "number", default: "0", description: "整体旋转角（度）" },
  { name: "glow", type: "number", default: "0.02", description: "丝线辉光强度（按线数自动配平）" },
  { name: "falloff", type: "number", default: "0.6", description: "辉光距离衰减幂，下限 0.05" },
  { name: "thickness", type: "number", default: "1.1", description: "丝线宽度，下限 0.05" },
  { name: "brightness", type: "number", default: "0.6", description: "整体亮度，下限 0" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "depth", type: "number", default: "0", description: "束点处的前后交叠层次，0–1" },
  { name: "pulses", type: "number", default: "0", description: "沿线流动亮珠的强度，下限 0" },
  { name: "mirror", type: "boolean", default: "true", description: "相邻相位交替（编织感）" },
  { name: "shimmer", type: "boolean", default: "false", description: "每条线缓慢相位微颤" },
  { name: "fade", type: "number", default: "0", description: "左右边缘渐隐，0–1" },
  { name: "grain", type: "number", default: "0.05", description: "胶片颗粒强度（也可传布尔，true 即 0.05）" },
  { name: "intro", type: "boolean", default: "true", description: "丝线逐笔画入" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标点亮并抬起最近的丝线" },
  { name: "mouseStrength", type: "number", default: "0.5", description: "悬停抬起与其余丝线沉静的强度，0–1" },
  { name: "pulseOnClick", type: "boolean", default: "true", description: "点击沿线送出光涌（最多 3 个）" },
  { name: "paused", type: "boolean", default: "false", description: "冻结编织相位但保留悬停" },
  { name: "dpr", type: "number", default: "2", description: "画布像素比上限，下限 0.5" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "web-threads",
  name: "网织光丝",
  href: "web-threads.html",
  title: "网织光丝",
  description:
    "穿过发光束点的丝线编织：最多 24 条正弦丝线共享一条收束包络，在束点处聚合再散开，像一张光的网；光标点亮并抬起触碰的丝线、其余丝线沉静退后，点击从落点沿丝线送出竞速到边缘的光涌。整幅画面由单一片元着色器解析求值（无几何），逐笔入场、编织相位交替、束点前后层次、浅色墨迹输出俱全，安静三帧后自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "丝线在光束点间穿织，光标点亮丝线，点击送出竞速光涌。",

  demoHint: "在丝线上移动看哪条被点亮抬起，点击落点一侧看光涌沿线竞速到边缘；束点数、线数与色板可调。",

  api: API,
};
