/* Component metadata only — the live demo and gallery preview live in
   acid-squares-demo.jsx, the framework source texts and the prompt in
   acid-squares-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with acid-squares-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#120f17"', description: "瓦片基色" },
  { name: "accentColor", type: "string", default: '"#ff4fb8"', description: "主光源颜色：高光与漫反射染色" },
  { name: "secondaryColor", type: "string", default: '"#3b6bff"', description: "副光源颜色" },
  { name: "tileSize", type: "number", default: "1", description: "瓦片尺寸倍率，clamp 0.2–5" },
  { name: "gap", type: "number", default: "0.12", description: "瓦片间距 0–0.6，0 为紧贴" },
  { name: "roundness", type: "number", default: "0.25", description: "圆角程度 0–1" },
  { name: "softness", type: "number", default: "0.5", description: "倒角宽度 0–1" },
  { name: "bulge", type: "number", default: "0.3", description: "瓦片拱起的鼓包程度 0–1.5" },
  { name: "rotation", type: "number", default: "35", description: "瓦片网格旋转角度（度）" },
  { name: "gloss", type: "number", default: "0.6", description: "高光锐度与强度 0–1" },
  { name: "waves", type: "number", default: "1", description: "环境涌浪幅度，≥ 0" },
  { name: "waveScale", type: "number", default: "1", description: "涌浪空间频率 0.1–5，越大越密" },
  { name: "speed", type: "number", default: "0.6", description: "整体动画速度倍率，≥ 0" },
  { name: "shape", type: '"square" | "round"', default: '"square"', description: "瓦片距离场形状：方形/圆形" },
  { name: "pulse", type: "number", default: "1", description: "波纹幅度，≥ 0；0 时关闭自动与点击波纹" },
  { name: "pulseSpeed", type: "number", default: "0.45", description: "波纹环向外扩散的速度" },
  { name: "pulseSpacing", type: "number", default: "1", description: "自动波纹的间隔倍率 0.2–6，越大越稀" },
  { name: "pulseWidth", type: "number", default: "1", description: "波纹环的宽度 0.1–5" },
  { name: "pulseOrigin", type: '"center" | "random"', default: '"center"', description: "自动波纹的出生点：中心/随机" },
  { name: "brightness", type: "number", default: "1", description: "输出亮度倍率，≥ 0" },
  { name: "lighting", type: '"split" | "backlit" | "overhead"', default: '"split"', description: "双光源布光预设" },
  { name: "tilt", type: "number", default: "0.7", description: "相机俯仰 0–1，0 接近俯视、1 接近平视" },
  { name: "zoom", type: "number", default: "1", description: "相机缩放 0.3–4" },
  { name: "depth", type: "number", default: "10", description: "远处淡出距离 2–40" },
  { name: "grain", type: "number", default: "0.12", description: "胶片颗粒强度，≥ 0" },
  { name: "fade", type: "number", default: "0", description: "画布四边的羽化 0–1" },
  { name: "opacity", type: "number", default: "1", description: "画布不透明度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时播放 3 秒浮现与从原点扫开的瓦片点亮动画" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "悬停凹陷、相机跟随与点击波纹的总开关" },
  { name: "hoverEffect", type: '"press" | "lift" | "none"', default: '"press"', description: "悬停时压低/抬起瓦片或无效果" },
  { name: "mouseStrength", type: "number", default: "1", description: "悬停凹陷深度倍率，≥ 0" },
  { name: "mouseRadius", type: "number", default: "0.35", description: "悬停凹陷半径 0.02–2" },
  { name: "pulseOnClick", type: "boolean", default: "true", description: "点击时在落点生成一圈波纹" },
  { name: "detail", type: '"low" | "medium" | "high"', default: '"medium"', description: "网格细分档位（150/210/280）" },
  { name: "lightMode", type: "boolean", default: "false", description: "亮色摄影棚观感，替换默认暗色玻璃感" },
  { name: "paused", type: "boolean", default: "false", description: "冻结动画（仍响应 props 变化重绘）" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比上限（默认 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "acid-squares",
  name: "酸性方格波光",
  href: "acid-squares.html",
  title: "酸性方格波光",
  description:
    "WebGL2 透视地面上的一片亮面圆角方格：三组正弦涌浪起伏场地，自动与点击生成的波纹环向外滚动，光标在地面压出柔软凹陷并带着相机微微偏转；瓦片由双点光源照亮，倒角、鼓包、菲涅尔轮辋光、胶片颗粒与远端淡出共同构成酸性光泽；intro 从原点扫开逐格点亮，prefers-reduced-motion 直接落定为静帧。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "透视地面的亮面方格随涌浪起伏，波纹环滚过、光标压出凹陷。",

  demoHint: "在地面点击甩出波纹，悬停压出凹陷；形状、布光、瓦片尺寸与旋转随手调。",

  api: API,
};
