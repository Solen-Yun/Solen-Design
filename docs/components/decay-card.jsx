/* Component metadata only — the live demo and gallery preview live in
   decay-card-demo.jsx, the framework source texts and the prompt in
   decay-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with decay-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "image", type: "string", default: "DEFAULT_IMAGE", description: "要熔蚀的照片；缺省用一张内置占位照片，精确素材以代码内嵌为准" },
  { name: "width", type: "number", default: "300", description: "卡片宽度（px）" },
  { name: "height", type: "number", default: "400", description: "卡片高度（px）" },
  { name: "intensity", type: "number", default: "0.5", description: "撕裂强度，夹取 0–2" },
  { name: "sensitivity", type: "number", default: "0.5", description: "多快的指针速度就开始撕裂 0–1" },
  { name: "hoverDecay", type: "number", default: "0.05", description: "悬停时保底的撕裂程度 0–1" },
  { name: "recovery", type: "number", default: "0.6", description: "撕裂愈合的时间常数，下限 0.05" },
  { name: "grain", type: "number", default: "0.25", description: "噪声频率 0–1；越大撕裂越细碎" },
  { name: "detail", type: "number", default: "5", description: "湍流倍频数，取整夹取 1–8" },
  { name: "pattern", type: "number", default: "4", description: "撕裂图案的种子；每个值形状都不同" },
  { name: "idle", type: "number", default: "0.35", description: "静止时边缘呼吸的强度 0–1" },
  { name: "flow", type: "number", default: "0", description: "噪声场随时间流动的速度 0–2" },
  { name: "chroma", type: "number", default: "0", description: "撕裂时的 RGB 分离强度 0–2" },
  { name: "travel", type: "number", default: "50", description: "视差跟随在多少 px 后开始软化" },
  { name: "tilt", type: "number", default: "10", description: "卡片朝光标倾斜的角度，夹取 0–45" },
  { name: "scope", type: '"window" | "card"', default: '"window"', description: "跟踪整个窗口的光标，还是仅卡片悬停时" },
  { name: "radius", type: "number", default: "0", description: "卡片圆角（px），同样作用于回退图" },
  { name: "grayscale", type: "boolean", default: "false", description: "照片置灰" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在卡片底部的说明内容" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "decay-card",
  name: "撕裂熔融图片卡",
  href: "decay-card.html",
  title: "撕裂熔融图片卡",
  description:
    "一张会熔掉的照片卡：WebGL2 里用双层带种子的 simplex 湍流场位移像素，指针划得越快撕裂越狠，RGB 沿撕裂方向分离、边缘材料烧穿成透明，松手后按恢复速率自愈；静止时边缘仍有噪声呼吸，光标还带视差平移与倾斜；画布外溢 124% 让熔渣越过卡边，WebGL 不可用或图片加载失败回退为普通图，减动效时停掉流动与视差。",
  tags: ["React", "CSS", "WebGL", "图片"],

  cardDescription: "指针划过照片就撕裂熔融、RGB 分离，停下来又慢慢愈合。",

  demoHint: "在页面上快速甩动指针看撕裂加剧，停下看它愈合；切 card 范围只在卡上悬停生效。",

  api: API,
};
