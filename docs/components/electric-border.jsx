/* Component metadata only — the live demo and gallery preview live in
   electric-border-demo.jsx, the framework source texts and the prompt in
   electric-border-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with electric-border-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "被电弧边框包裹的内容" },
  { name: "color", type: "string", default: '"#7df9ff"', description: "电流的基础颜色，同时决定内核色与默认辉光色" },
  { name: "glowColor", type: "string", default: "—", description: "外侧辉光雾的颜色；不设则跟随 color" },
  { name: "speed", type: "number", default: "1", description: "电流爬行与事件触发的速度；0 冻结动态" },
  { name: "chaos", type: "number", default: "0.5", description: "电流与电火花的锯齿剧烈程度 0–2" },
  { name: "spread", type: "number", default: "0.6", description: "电流偏离边框游走的幅度 0–2" },
  { name: "thickness", type: "number", default: "1.5", description: "电流主线的核心宽度（px），下限 0.25" },
  { name: "strands", type: "number", default: "3", description: "同时存在的电流条数 1–6，受热时会临时加流" },
  { name: "glow", type: "number", default: "0.6", description: "边框外环境辉光的强度 0–3" },
  { name: "intensity", type: "number", default: "0.8", description: "整体亮度倍率" },
  { name: "arcs", type: "number", default: "1", description: "电火花每秒生成概率；0 关闭电火花" },
  { name: "flicker", type: "number", default: "0.5", description: "整框亮度的随机呼吸闪烁 0–1" },
  { name: "borderRadius", type: "number", default: "24", description: "边框圆角（px），同时应用到容器上" },
  { name: "offset", type: "number", default: "0", description: "把描迹的框向外扩多少 px，让电流略微悬在框外" },
  { name: "active", type: "boolean", default: "true", description: "总开关；false 会把整个效果柔和地淡出" },
  { name: "intro", type: "boolean", default: "true", description: "挂载与重新激活时电流沿周长扫一圈点亮" },
  { name: "interactive", type: "boolean", default: "true", description: "启用光标增亮、点击脉冲与光标处引弧" },
  { name: "cursorRadius", type: "number", default: "90", description: "光标周围热度区的半径（px）" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "暗色为加色辉光，亮色为纸面墨线式渲染" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "electric-border",
  name: "电弧边框",
  href: "electric-border.html",
  title: "电弧边框",
  description:
    "把任何内容裹进一圈活的电流：数条噪声驱动的电弧贴着圆角边框爬行、变宽变细，光标靠近时过热增亮、加流，点击沿周长发出一圈脉冲并从点击处引出弓形电火花；挂载时电流沿边框扫一圈点亮，亮色主题切换成纸面墨线式渲染。WebGL2 距离场 + 多倍频值噪声着色器实现，像素预算限制大框开销，画布 64px 外扩让辉光与火花可以越出边框。",
  tags: ["React", "CSS", "WebGL", "边框"],

  cardDescription: "电流贴着边框爬行，光标靠近过热增亮，点击引出弓形电火花。",

  demoHint: "用光标贴着边框扫动看增亮与加流，点击边框打出一圈脉冲；调 spread 与 chaos 改变电流形态。",

  api: API,
};
