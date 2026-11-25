/* Component metadata only — the live demo and gallery preview live in
   noise-demo.jsx, the framework source texts and the prompt in
   noise-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with noise-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "opacity", type: "number", default: "0.2", description: "颗粒层不透明度 0–1" },
  { name: "size", type: "number", default: "1", description: "颗粒缩放，贴图按 256 × size px 铺排，下限 0.5" },
  { name: "fps", type: "number", default: "24", description: "每秒重排颗粒的次数 0–60；0 冻结" },
  { name: "blendMode", type: '"normal" | "overlay" | "soft-light" | "multiply" | "screen" | "difference"', default: '"overlay"', description: "与底下内容的混合模式" },
  { name: "contrast", type: "number", default: "0.6", description: "颗粒对比度 0–1" },
  { name: "colored", type: "boolean", default: "false", description: "RGB 各通道独立取样的彩色噪点，默认灰度" },
  { name: "dust", type: "number", default: "0", description: "灰尘颗粒与发丝密度 0–1" },
  { name: "scratches", type: "number", default: "0", description: "胶片划痕出现频率 0–1，同时最多 3 条" },
  { name: "scanlines", type: "number", default: "0", description: "扫描线图层不透明度 0–1" },
  { name: "flicker", type: "number", default: "0", description: "随机曝光闪烁深度 0–1" },
  { name: "fixed", type: "boolean", default: "false", description: "定位改为 fixed，做整页颗粒覆盖" },
  { name: "zIndex", type: "number", default: "—", description: "覆盖层 z-index" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "noise",
  name: "胶片颗粒噪点",
  href: "noise.html",
  title: "胶片颗粒噪点",
  description:
    "盖在照片或页面上的胶片颗粒：256×256 程序化噪点贴图（三角分布 + 固定种子，contrast 控制对比、colored 出彩色斑点）按 fps 随机重排，六种混合模式叠加；可加灰尘颗粒与发丝、时隐时现的竖向划痕、滚动的 CRT 扫描线和曝光闪烁。灰尘用独立 Canvas 按密度绘制，帧循环离屏暂停，减少动态时整帧冻结，支持 fixed 整页覆盖。",
  tags: ["React", "Canvas", "动效", "背景"],

  cardDescription: "从细腻胶片颗粒到灰尘划痕、电视雪花的一层质感覆盖。",

  demoHint: "拉高 dust 和 scratches 看胶片脏点，contrast 拉满换电视雪花；换混合模式看颗粒怎样咬进画面。",

  api: API,
};
