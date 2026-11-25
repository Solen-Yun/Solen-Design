/* Component metadata only — the live demo and gallery preview live in
   molten-metal-demo.jsx, the framework source texts and the prompt in
   molten-metal-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with molten-metal-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#5227FF", "#FF9FFC"]', description: "核心色之前的渐变色带（最多取前五项）；接受任意 CSS 颜色" },
  { name: "coreColor", type: "string", default: '"#FFFFFF"', description: "色带最热的一档——白热灯丝芯的颜色" },
  { name: "backgroundColor", type: "string", default: '"transparent"', description: "不透明背景色；transparent 保持画布透底" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅底墨水渲染，代替深底发光" },
  { name: "speed", type: "number", default: "0.35", description: "蠕动与旋流的时间倍率" },
  { name: "scale", type: "number", default: "4", description: "场缩放，越大灯丝越密；≥ 0.1" },
  { name: "detail", type: "number", default: "3", description: "折叠迭代层数 1–8（小数层淡出）" },
  { name: "glow", type: "number", default: "1.6", description: "灯丝整体亮度，≥ 0" },
  { name: "thickness", type: "number", default: "1", description: "灯丝衰减指数 0.2–3；越大芯越细越锐" },
  { name: "swirl", type: "number", default: "1", description: "折叠沿 x 的扭转强度" },
  { name: "turbulence", type: "number", default: "0.2", description: "递归折叠矩阵的强度" },
  { name: "haze", type: "number", default: "0.75", description: "抬升黑场 0–1，越大暗部灯丝越多" },
  { name: "brightness", type: "number", default: "1.3", description: "黑场之后的增益，≥ 0" },
  { name: "colorMode", type: '"molten" | "ember" | "frost"', default: '"molten"', description: "渐变枢轴位置：0.5 / 0.3 / 0.7" },
  { name: "rotation", type: "number", default: "0", description: "场旋转角度（度）" },
  { name: "offsetX", type: "number", default: "0", description: "沿 x 平移（已按宽高比校正）" },
  { name: "offsetY", type: "number", default: "0", description: "沿 y 平移" },
  { name: "drift", type: "number", default: "0.3", description: "整体朝指针偏移的幅度，≥ 0" },
  { name: "grain", type: "number", default: "0.05", description: "动态胶片颗粒 ≥ 0；布尔值按 true→0.05 / false→0 处理" },
  { name: "opacity", type: "number", default: "1", description: "画布整体透明度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "2.4 秒的灼烧揭示开场，带一道亮边扫过" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "开启热迹拖尾与指向指针的漂移" },
  { name: "mouseStrength", type: "number", default: "0.5", description: "热迹强度 0–1" },
  { name: "flareOnClick", type: "boolean", default: "true", description: "点击激起快升缓落的亮斑（同时最多 8 个）" },
  { name: "paused", type: "boolean", default: "false", description: "冻结时间，渲染一帧定格" },
  { name: "dpr", type: "number", default: "2", description: "画布 DPR 上限，≥ 0.5" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "molten-metal",
  name: "白热熔丝",
  href: "molten-metal.html",
  title: "白热熔丝",
  description:
    "满屏涌动的白热熔丝：递归折叠干涉场叠出蜿蜒灯丝，沿渐变色带爬向白热灯芯，色带由 colors（最多五色）加 coreColor 组成，molten/ember/frost 三种枢轴重排渐变；指针拖过留下 0.9 秒衰减的热迹（灯丝受热变粗变亮、整场向指针漂移），点击激起 1.8 秒快升缓落的亮斑；2.4 秒对数尺度开场从黑暗里烧出图案并带一道亮边；lightMode 浅底墨水、backgroundColor 可不透明；单 pass WebGL2 全屏着色器，静止后跳过渲染，时间冻结只出定格帧。",
  tags: ["React", "CSS", "WebGL", "熔岩"],

  cardDescription: "白热熔丝蜿蜒蠕动，指针拖过留下衰减的热迹。",

  demoHint: "拖过画面看灯丝发热变粗、拖尾渐灭，点击激亮斑；切 ember/frost 换渐变枢轴，thickness 调灯芯锐度。",

  api: API,
};
