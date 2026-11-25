/* Component metadata only — the live demo and gallery preview live in
   side-rays-demo.jsx, the framework source texts and the prompt in
   side-rays-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with side-rays-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "rayColor1", type: "string", default: '"#FFC46B"', description: "第一层光色，扇形上半侧；3/6 位 hex 或 rgb()/rgba()，解析失败回退白" },
  { name: "rayColor2", type: "string", default: '"#96c8ff"', description: "第二层光色，扇形下半侧" },
  { name: "blend", type: "number", default: "0.6", description: "两层混色比例，0 纯第一色、1 纯第二色（clamp 0–1）" },
  { name: "origin", type: '"top-right" | "top-left" | "bottom-right" | "bottom-left" | "right" | "left"', default: '"top-right"', description: '光扇入射的角或侧：top-right / top-left / bottom-right / bottom-left / right / left，未知值回退 top-right' },
  { name: "speed", type: "number", default: "2.5", description: "光柱闪烁摇曳速度，0 冻结" },
  { name: "intensity", type: "number", default: "2", description: "亮度" },
  { name: "spread", type: "number", default: "2", description: "扇形张角（clamp 0.1–8）" },
  { name: "density", type: "number", default: "5", description: "光柱密度（clamp 1–40），越大越细密" },
  { name: "sharpness", type: "number", default: "0.5", description: "光柱边缘锐度，0 柔雾到 1 锐利" },
  { name: "tilt", type: "number", default: "0", description: "整扇偏转角（度，clamp ±180）" },
  { name: "falloff", type: "number", default: "1.6", description: "距离衰减速度，越小射得越远（clamp 0.2–6）" },
  { name: "glow", type: "number", default: "1", description: "入射处辉光强度" },
  { name: "saturation", type: "number", default: "1", description: "饱和度，0 为灰度" },
  { name: "dust", type: "number", default: "0", description: "光内漂浮尘埃量 0–1，只在光柱内可见" },
  { name: "followMouse", type: "boolean", default: "true", description: "光扇带弹簧惯性偏向光标，光标下的光柱提亮" },
  { name: "mouseInfluence", type: "number", default: "0.5", description: "跟随幅度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时光扇从光源长出（挂载时读取，后续变更不重播）" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：光印成软彩墨，适合浅色页面" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "画布像素比上限（clamp 0.5–3）" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "side-rays",
  name: "双色光扇",
  href: "side-rays.html",
  title: "双色光扇",
  description:
    "从角落或侧面射入的双色光扇：上下半扇各持一色渐变混合，噪声光柱随时间闪烁摇曳，光内尘埃漂浮；整扇带弹簧惯性偏向光标、光标下光柱提亮。暗底辉光与浅色彩墨两种输出，帧循环空闲自睡。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "双色光扇偏向光标，光柱摇曳尘埃漂浮。",

  demoHint: "移动鼠标看光扇偏向与光柱提亮；颜色、混合、流速、张角与密度可调。",

  api: API,
};
