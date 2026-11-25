/* Component metadata only — the live demo and gallery preview live in
   magnet-lines-demo.jsx, the framework source texts and the prompt in
   magnet-lines-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with magnet-lines-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "spacing", type: "number", default: "30", description: "未指定 rows/columns 时的网格间距（px），≥ 4" },
  { name: "rows", type: "number", default: "—", description: "显式行数 1–400；给定时按宽高比推导列数" },
  { name: "columns", type: "number", default: "—", description: "显式列数 1–400；给定时按宽高比推导行数" },
  { name: "containerSize", type: "number | string", default: "—", description: "让场地变正方形（数字为 px，字符串为 CSS 尺寸），否则铺满容器" },
  { name: "lineColor", type: "string", default: '"#efefef"', description: "每根磁针的基础颜色；接受任意 CSS 颜色" },
  { name: "accentColor", type: "string", default: "—", description: "受激时混入的第二颜色；磁针默认配玫瑰色北半段" },
  { name: "lineWidth", type: "number | string", default: "2", description: "磁针粗细（px 或 CSS 尺寸），≥ 0.25" },
  { name: "lineHeight", type: "number | string", default: "18", description: "磁针长度（px 或 CSS 尺寸），≥ 1" },
  { name: "baseAngle", type: "number", default: "-10", description: "静止角（度），在竖直偏移 90° 与散布扰动之前" },
  { name: "mode", type: '"orbit" | "attract" | "spiral" | "dipole"', default: '"orbit"', description: "指针响应：切向环绕、直指、45° 扭转或偶极场" },
  { name: "shape", type: '"line" | "arrow" | "needle"', default: '"line"', description: "每格的形状：直线、箭头或双色磁针" },
  { name: "rainbow", type: "boolean", default: "false", description: "按朝向取彩虹色，代替固定颜色" },
  { name: "radius", type: "number", default: "200", description: "指针影响的高斯半径（px），≥ 1" },
  { name: "fade", type: "number", default: "0.65", description: "远离指针的磁针变暗程度 0–1" },
  { name: "edgeFade", type: "number", default: "0", description: "容器边缘的羽化过渡 0–1" },
  { name: "stretch", type: "number", default: "0.4", description: "靠近指针时的伸长量 0–2" },
  { name: "reach", type: "number", default: "0", description: "超出该距离（px）后磁针回到静止不受影响" },
  { name: "scatter", type: "number", default: "0", description: "逐针种子的静止角扰动 0–1（满值 ±90°）" },
  { name: "inertia", type: "number", default: "0.35", description: "弹簧惰性；1 最拖沓，0 立即贴合，范围 0–1" },
  { name: "bounce", type: "number", default: "0.3", description: "弹簧过冲量 0–1" },
  { name: "ripple", type: "number", default: "0.3", description: "指针影响随距离向外传播的延迟量" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击让全场磁针转一整圈并伴随行进闪光带" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时一圈揭示波从中心扫醒全场" },
  { name: "idle", type: "boolean", default: "false", description: "指针离开后幽灵光标继续游走搅动场地" },
  { name: "tiltX", type: "number", default: "0", description: "绕 x 轴的透视倾角 −70–70°" },
  { name: "tiltY", type: "number", default: "0", description: "绕 y 轴的透视倾角 −70–70°" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限，夹在 0.5–3" },
  { name: "className", type: "string", default: '""', description: "场地附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "场地内联样式" },
];

export default {
  id: "magnet-lines",
  name: "磁针阵列",
  href: "magnet-lines.html",
  title: "磁针阵列",
  description:
    "一整面磁针阵列：每根磁针像小指南针一样带弹簧惰性地转向指针，影响按距离延迟传播形成涟漪，点击从点击处滚出 520px/s 的波前、途经的磁针整转一圈并打亮一道高斯闪光带；orbit/attract/spiral/dipole 四种响应场（偶极场随指针运动方向翻极），line/arrow/needle 三种形状，rainbow 按朝向取色，scatter 让静止姿态永不机械对齐，idle 模式在你离开后放幽灵光标游走；tiltX/tiltY 把网格投进透视并按深度淡出；WebGL2 实例化渲染，单格上限 3 万，重排时角度无缝迁移，静止自睡。",
  tags: ["React", "CSS", "WebGL", "指针"],

  cardDescription: "满场磁针随指针摆动，点击一圈闪光波扫过全场。",

  demoHint: "快速划过看涟漪式摆动，点击看整转闪光波；换 dipole 模式并晃动指针看磁针翻极，tilt 配透视。",

  api: API,
};
