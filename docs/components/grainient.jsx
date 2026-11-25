/* Component metadata only — the live demo and gallery preview live in
   grainient-demo.jsx, the framework source texts and the prompt in
   grainient-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with grainient-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#120f17", "#2a0f0a", "#9a3412", "#f97316", "#fed7aa"]', description: "渐变色标（任意 CSS 颜色），Lab 空间插值；最多 8 个" },
  { name: "type", type: '"linear" | "radial"', default: '"linear"', description: "渐变几何：斜向扫过 / 缓慢旋转的径向光晕" },
  { name: "angle", type: "number", default: "55", description: "线性渐变方向（度）" },
  { name: "bands", type: "number", default: "1", description: "色带重复次数，1–8；相邻循环镜像拼接" },
  { name: "speed", type: "number", default: "1", description: "流场时钟速度；0 冻结" },
  { name: "flow", type: "number", default: "0.8", description: "0–3：噪声漂移对场的扭曲强度" },
  { name: "scale", type: "number", default: "1", description: "0.25–3：扭曲纹样的缩放" },
  { name: "softness", type: "number", default: "1", description: "0–1：色标过渡柔化；0 为硬分界" },
  { name: "silk", type: "number", default: "0.35", description: "0–1：缎面棱线受光" },
  { name: "grainAmount", type: "number", default: "0.08", description: "0–0.5：胶片颗粒强度" },
  { name: "grainSize", type: "number", default: "1.2", description: "0.5–4：颗粒团大小；1 为细颗粒" },
  { name: "grainAnimated", type: "boolean", default: "true", description: "颗粒以 24fps 重掷" },
  { name: "contrast", type: "number", default: "1", description: "0.2–2：明度对比（以 0.55 为轴）" },
  { name: "saturation", type: "number", default: "1", description: "0–2：色度倍率" },
  { name: "variation", type: "number", default: "0", description: "≥ 0：种子偏移，多个实例互不相同" },
  { name: "interactive", type: "boolean", default: "true", description: "开启光标搅动" },
  { name: "stir", type: "number", default: "1", description: "0–2：光标对水流的推动强度" },
  { name: "clickSwirl", type: "boolean", default: "true", description: "点击在流场里旋出一个涡旋" },
  { name: "intro", type: "boolean", default: "true", description: "播放 1.6 秒的径向显影入场" },
  { name: "lightMode", type: "boolean", default: "false", description: "把同一色板重推导为提亮降饱和的纸感色" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（上限 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "grainient",
  name: "颗粒渐变流",
  href: "grainient.html",
  title: "颗粒渐变流",
  description:
    "会呼吸的颗粒渐变：最多 8 个色标在 Lab 空间插值成线性或缓慢旋转的径向渐变，两层值噪声让它像绸缎一样流动并带棱线受光，末屏叠 24fps 的细/团粒胶片颗粒；光标划过时局部推动水流（最多 24 段拖尾），点击旋出涡旋，可调色带数、柔化、对比饱和，白纸色板一键重推导。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "缓慢流动的 Lab 渐变覆着活颗粒，光标搅动水流、点击旋出涡旋。",

  demoHint: "按住光标在渐变里搅动，点击旋出涡旋；调 grainSize 看颗粒结团，type 换径向看慢速旋转。",

  api: API,
};
