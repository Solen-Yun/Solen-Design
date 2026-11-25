/* Component metadata only — the live demo and gallery preview live in
   plasma-demo.jsx, the framework source texts and the prompt in
   plasma-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with plasma-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#a6a3b8"', description: "缎面颜色，任意 CSS 颜色值，解析失败回退默认灰紫" },
  { name: "speed", type: "number", default: "1", description: "褶皱扭曲上涌的速度；0 冻结" },
  { name: "direction", type: '"forward" | "reverse" | "pingpong"', default: '"forward"', description: "时间方向；pingpong 在 10s 区间内往返缓动" },
  { name: "scale", type: "number", default: "1", description: "相机缩放，越小越拉远，≥0.1" },
  { name: "twist", type: "number", default: "1", description: "褶皱绕轴螺旋的拧度" },
  { name: "wave", type: "number", default: "1", description: "褶皱横向起伏幅度，≥0" },
  { name: "softness", type: "number", default: "0.5", description: "0–1；偏小是丝缕，偏大是厚缎" },
  { name: "shine", type: "number", default: "1", description: "高光缎面反光的强度" },
  { name: "brightness", type: "number", default: "1", description: "整体曝光倍率" },
  { name: "grain", type: "number", default: "0.04", description: "胶片颗粒强度，≥0" },
  { name: "quality", type: "number", default: "0.75", description: "体积渲染分辨率比例，0.25–1；总量超 160 万像素自动收敛" },
  { name: "mouseInteractive", type: "boolean", default: "true", description: "体积带惯性转向鼠标，指针下方发热增亮" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 1.6s 内淡入并漂移到位" },
  { name: "fade", type: "number", default: "0", description: "容器四边柔化遮罩 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：缎面印成墨色晕染，适合浅色页面" },
  { name: "paused", type: "boolean", default: "false", description: "冻结运动但保留最后一帧画面" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布渲染像素比" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "plasma",
  name: "缎光褶皱",
  href: "plasma.html",
  title: "缎光褶皱",
  description:
    "暗场里缓缓翻涌的缎面：60 步体积光线步进渲染一圈绕轴螺旋的褶皱，密度与缎面反光分通道累积，高光带随相位流动；整个体积以弹簧惯性朝鼠标偏转，指针下方局部发热增亮。RGBA16F 浮点目标、8bit 自动抖动去色带、体积像素预算约束，帧循环稳定后自睡；暗底辉光与浅色墨染两种输出。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "暗场中翻涌的缎面褶皱，体积光随鼠标偏转、指针下发热。",

  demoHint: "移动鼠标看缎面带惯性偏转、指针下泛热；调拧度与丝滑度重塑布料质感。",

  api: API,
};
