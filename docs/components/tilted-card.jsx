/* Component metadata only — the live demo and gallery preview live in
   tilted-card-demo.jsx, the framework source texts and the prompt in
   tilted-card-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with tilted-card-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "imageSrc", type: "string", default: "—", description: "正面图片地址；不传时只渲染 children" },
  { name: "altText", type: "string", default: '"Tilted card image"', description: "图片 alt，也是无障碍标签的兜底" },
  { name: "captionText", type: "string", default: '""', description: "悬停时跟随指针的字幕条文案" },
  { name: "containerHeight", type: "string | number", default: '"300px"', description: "外层容器高度" },
  { name: "containerWidth", type: "string | number", default: '"100%"', description: "外层容器宽度" },
  { name: "imageHeight", type: "string | number", default: '"300px"', description: "卡面高度" },
  { name: "imageWidth", type: "string | number", default: '"300px"', description: "卡面宽度" },
  { name: "scaleOnHover", type: "number", default: "1.05", description: "悬停放大倍率，下限 0.5" },
  { name: "rotateAmplitude", type: "number", default: "12", description: "最大倾斜角（deg），0–60" },
  { name: "showTooltip", type: "boolean", default: "true", description: "悬停显示字幕条（需 captionText）" },
  { name: "overlayContent", type: "ReactNode", default: "null", description: "浮在卡面上方的 3D 内容" },
  { name: "displayOverlayContent", type: "boolean", default: "false", description: "是否渲染 overlayContent" },
  { name: "overlayDepth", type: "number", default: "30", description: "浮层的 translateZ（px）" },
  { name: "children", type: "ReactNode", default: "—", description: "图片之上的正面内容" },
  { name: "backContent", type: "ReactNode", default: "null", description: "背面内容；传入即启用翻转" },
  { name: "flipOnClick", type: "boolean", default: "true", description: "点击翻转（需 backContent）" },
  { name: "flipped", type: "boolean", default: "—", description: "受控翻转状态，配合 onFlip 使用" },
  { name: "onFlip", type: "(next: boolean) => void", default: "—", description: "翻转后回调" },
  { name: "radius", type: "number | string", default: "15", description: "圆角（px 或 CSS 长度）" },
  { name: "perspective", type: "number | string", default: "800", description: "CSS perspective（px 或长度）" },
  { name: "smoothness", type: "number", default: "0.6", description: "弹簧柔度 0–1，0 硬朗、1 慢而弹" },
  { name: "glare", type: "number", default: "0.5", description: "眩光强度 0–1" },
  { name: "glareColor", type: "string", default: '"#ffffff"', description: "眩光颜色（hex / rgb）" },
  { name: "shadow", type: "number", default: "0.5", description: "投影强度 0–1" },
  { name: "parallax", type: "number", default: "1", description: "图层与图片视差的倍率" },
  { name: "axis", type: '"both" | "horizontal" | "vertical"', default: '"both"', description: "参与倾斜的轴" },
  { name: "reverse", type: "boolean", default: "false", description: "反向倾斜，背离指针" },
  { name: "trackWindow", type: "boolean", default: "false", description: "指针在窗口任意位置都驱动倾斜" },
  { name: "floating", type: "boolean", default: "false", description: "空闲时缓慢漂浮" },
  { name: "gyroscope", type: "boolean", default: "true", description: "触屏设备上用设备倾斜驱动" },
  { name: "intro", type: "boolean", default: "true", description: "首次可见时淡入" },
  { name: "introDelay", type: "number", default: "0", description: "淡入延迟（ms）" },
  { name: "onClick", type: "(event) => void", default: "—", description: "点击回调，同时启用键盘激活" },
  { name: "className", type: "string", default: '""', description: "figure 附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "figure 内联样式" },
];

export default {
  id: "tilted-card",
  name: "悬浮倾斜展示卡",
  href: "tilted-card.html",
  title: "悬浮倾斜展示卡",
  description:
    "向指针倾斜的 3D 卡片：弹簧物理驱动 rotateX/rotateY，眩光沿倾斜方向扫过卡面、1px 边环随光渐亮、投影随抬升偏移放大、不同 depth 的图层做视差，字幕条追着指针带速度倾斜；可选点击 180° 翻到背面（受控/非受控）、窗口级追踪、触屏陀螺仪、空闲漂浮与入场淡入；240Hz 子步积分，帧循环稳定后自睡。",
  tags: ["React", "CSS"],

  cardDescription: "卡片向指针倾斜，眩光扫面、图层视差，点击翻面。",

  demoHint: "绕着卡面移动看眩光方向与图层视差；点一下翻到背面；开漂浮和窗口追踪换个用法。",

  api: API,
};
