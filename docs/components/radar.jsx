/* Component metadata only — the live demo and gallery preview live in
   radar-demo.jsx, the framework source texts and the prompt in
   radar-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with radar-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#3ef09a"', description: "磷光余辉的主色，任意 CSS 颜色值，解析失败回退白" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "合成在荧光屏下的背景色，支持 rgba()/transparent" },
  { name: "mode", type: '"sweep" | "pulse"', default: '"sweep"', description: "旋转扫描线，或从圆心外扩的脉冲波前" },
  { name: "speed", type: "number", default: "1", description: "扫描速度倍率；0 冻结，负值反向（sweep 模式）" },
  { name: "trail", type: "number", default: "0.35", description: "余辉衰减时长 0.02–1；越大拖尾越久" },
  { name: "scale", type: "number", default: "0.9", description: "雷达盘相对容器的尺寸，≥0.05" },
  { name: "ringCount", type: "number", default: "6", description: "距离环数 1–24" },
  { name: "spokeCount", type: "number", default: "12", description: "径向辐条数 0–72" },
  { name: "ticks", type: "boolean", default: "true", description: "表圈刻度与轴线量程刻度" },
  { name: "targets", type: "number", default: "6", description: "游动目标数 0–16，出界后从边缘重新入场" },
  { name: "clutter", type: "number", default: "0.35", description: "余辉里的气象杂波密度 0–1" },
  { name: "glow", type: "number", default: "1", description: "辉光泛光强度（需浮点渲染目标）" },
  { name: "brightness", type: "number", default: "1", description: "整体曝光倍率" },
  { name: "gridOpacity", type: "number", default: "1", description: "网格亮度 0–2" },
  { name: "lineWidth", type: "number", default: "1", description: "线条宽度 0.25–4" },
  { name: "tilt", type: "number", default: "0", description: "相机俯仰角（度）0–80" },
  { name: "centerX", type: "number", default: "0.5", description: "雷达盘中心的水平位置 0–1" },
  { name: "centerY", type: "number", default: "0.5", description: "雷达盘中心的垂直位置 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标也是一个目标，扫过留回波，盘面下发热增亮" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 2.2s 内网格与扫描线逐层点亮" },
  { name: "grain", type: "number", default: "0.03", description: "胶片颗粒强度，≥0" },
  { name: "fade", type: "number", default: "0", description: "容器四边柔化遮罩 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：雷达印成墨线，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结运动但保留最后一帧画面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比；长边渲染上限 2560px" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "radar",
  name: "雷达余辉",
  href: "radar.html",
  title: "雷达余辉",
  description:
    "一块带透视俯角的荧光雷达盘：解析法在倾斜平面上画出环、辐条、刻度与表圈（屏幕空间导数抗锯齿），旋转扫描线留下指数衰减的磷光余辉，杂波噪声在新鲜余辉里结成气象斑点；最多 16 个游动目标被扫到时亮起并留下渐弱的回波与外扩环，光标也是一个目标——扫过留尾、盘面发热。五级辉光金字塔、开场逐层点亮、帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "倾斜视角的雷达盘，扫描线拖出磷光余辉，扫过目标亮起回波。",

  demoHint: "把光标停在扫描线上等它扫过你——看回波与热度；切 pulse 模式换成外扩波前。",

  api: API,
};
