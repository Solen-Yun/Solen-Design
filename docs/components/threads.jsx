/* Component metadata only — the live demo and gallery preview live in
   threads-demo.jsx, the framework source texts and the prompt in
   threads-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with threads-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "number[] | string", default: "[1, 1, 1]", description: "线条基色：0–1 的 [r,g,b] 或任意 CSS 颜色字符串" },
  { name: "accentColor", type: "number[] | string", default: "—", description: "线条向 fray 端渐变的目标色；省略时回退基色" },
  { name: "amplitude", type: "number", default: "1.7", description: "散开段的波高" },
  { name: "distance", type: "number", default: "0.4", description: "线束占画幅的比例，0–1" },
  { name: "enableMouseInteraction", type: "boolean", default: "false", description: "允许光标倾斜波相位/振幅并拨开线束" },
  { name: "lineCount", type: "number", default: "90", description: "线条数量，clamp 1–400" },
  { name: "thickness", type: "number", default: "0.6", description: "线条宽度倍率" },
  { name: "softness", type: "number", default: "1.3", description: "靠近散开端的额外柔化" },
  { name: "speed", type: "number", default: "0.6", description: "波动速度，0 冻结" },
  { name: "waves", type: "number", default: "1.05", description: "每条线上的波数，下限 0" },
  { name: "split", type: "number", default: "0.04", description: "开始波动的位置，0–1（0 即从根部起）" },
  { name: "fray", type: "number", default: "0.5", description: "每条线分裂点的散布量，0–1" },
  { name: "angle", type: "number", default: "25", description: "线束方向角（度）" },
  { name: "seed", type: "number", default: "0", description: "噪声种子；不同值重织线条形态" },
  { name: "parting", type: "number", default: "0", description: "光标拨开线条的强度，0–1（需开启鼠标交互）" },
  { name: "taper", type: "number", default: "0.85", description: "散开尾端的淡出，0–1" },
  { name: "brightness", type: "number", default: "1.4", description: "线条密度/疏透度（alpha 曲线），clamp 0.25–2" },
  { name: "fade", type: "number", default: "0", description: "边缘渐隐，0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度，0–1" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动但保留光标拨动" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "...rest", type: "attributes", default: "—", description: "其余属性透传到容器" },
];

export default {
  id: "threads",
  name: "纤维流丝",
  href: "threads.html",
  title: "纤维流丝",
  description:
    "一束沿固定角度铺开的平行细线，根部笔直、远端散成噪声波动的细丝并渐细渐淡，颜色沿束从基色渐变到点缀色；开启交互后光标像拨开草叶一样把线束局部推开。逐线实例化的三角条带渲染，噪声近端粗波与远端细波交叉过渡，帧循环空闲自睡。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "一束细丝随风流动、远端散开渐淡，光标可拨开线束。",

  demoHint: "开启鼠标交互后在线束上移动，看线条像草叶一样被拨开再合拢；线数、散开与颜色可调。",

  api: API,
};
