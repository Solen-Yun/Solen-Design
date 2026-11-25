/* Component metadata only — the live demo and gallery preview live in
   balatro-demo.jsx, the framework source texts and the prompt in
   balatro-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with balatro-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color1", type: "string", default: '"#DE443B"', description: "第一色颜料（hex / rgb()）" },
  { name: "color2", type: "string", default: '"#006BB4"', description: "第二色颜料" },
  { name: "color3", type: "string", default: '"#162325"', description: "色带间隙色" },
  { name: "contrast", type: "number", default: "3.5", description: "色带锐度 0.5–10，越大分色越利" },
  { name: "lighting", type: "number", default: "0.4", description: "色带边缘的亮泽强度 0–1.5" },
  { name: "swirl", type: "number", default: "0.25", description: "漩涡基础扭转 0–1" },
  { name: "speed", type: "number", default: "1", description: "颜料流动速度，≥ 0" },
  { name: "rotationSpeed", type: "number", default: "0", description: "额外整体旋转 -10–10" },
  { name: "scale", type: "number", default: "1", description: "花纹尺度 0.2–5，越大纹理越细" },
  { name: "detail", type: "number", default: "5", description: "域迭代次数 1–8，越大纹理越缠" },
  { name: "offset", type: "[number, number]", default: "[0, 0]", description: "漩涡中心偏移" },
  { name: "pixelSize", type: "number", default: "1.5", description: "像素块基础尺寸 0–24" },
  { name: "crt", type: "number", default: "0", description: "CRT 扫描线与边缘衰减 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "指针转向与搅动颜料的总开关" },
  { name: "mouseStrength", type: "number", default: "1", description: "搅动/转向力度 0–3" },
  { name: "clickSwirl", type: "boolean", default: "true", description: "点击丢进漩涡涡眼" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时从收拢的漩涡舒展开（2.2 秒）" },
  { name: "lightMode", type: "boolean", default: "false", description: "间隙色提亮趋白" },
  { name: "opacity", type: "number", default: "1", description: "画布不透明度 0–1" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限 0.5–3" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "balatro",
  name: "像素颜料漩涡",
  href: "balatro.html",
  title: "像素颜料漩涡",
  description:
    "WebGL2 三通道管线复刻的像素颜料漩涡：低分辨率块网格上三色颜料无限旋转，RG16F 流场让指针拖动真实搅动颜料（分段沉积、指数衰减自清），点击丢进带方向感的涡眼扭转图案，挂载时从收拢漩涡舒展开；可开 CRT 档渲染真实逐设备像素扫描线与边缘衰减，240 万像素预算自动放大块面，prefers-reduced-motion 降速并跳过涡眼与 intro。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "三色颜料在像素块上旋转成漩涡，拖动搅动、点击下涡眼。",

  demoHint: "按住拖动搅动颜料，点击丢涡眼；调对比/尺度/迭代看花纹变化，开 CRT 看扫描线。",

  api: API,
};
