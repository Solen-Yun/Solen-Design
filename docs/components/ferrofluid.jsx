/* Component metadata only — the live demo and gallery preview live in
   ferrofluid-demo.jsx, the framework source texts and the prompt in
   ferrofluid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with ferrofluid-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#ffffff", "#ffffff", "#ffffff"]', description: "三盏棚灯的颜色：主灯/条灯/补光（最多 3 个）" },
  { name: "speed", type: "number", default: "0.5", description: "流场漂移速度，0 冻结" },
  { name: "scale", type: "number", default: "1.6", description: "液面视野缩放，clamp 0.2–6" },
  { name: "spikeHeight", type: "number", default: "1", description: "尖峰峰值高度，下限 0" },
  { name: "sharpness", type: "number", default: "2.5", description: "尖峰锐利度，clamp 0.6–6" },
  { name: "turbulence", type: "number", default: "1", description: "流场扰动与点阵晃动，下限 0" },
  { name: "fluidity", type: "number", default: "0.5", description: "弹簧阻尼松紧（0 硬–1 软），clamp 0–1" },
  { name: "tilt", type: "number", default: "48", description: "相机俯仰角（度），clamp 10–70" },
  { name: "magnetism", type: "number", default: "1", description: "基础磁场强度，下限 0" },
  { name: "variation", type: "number", default: "0", description: "流场种子；只换涌动布局不改质感" },
  { name: "flowDirection", type: '"up" | "down" | "left" | "right" | "none"', default: '"down"', description: "流场的流动方向" },
  { name: "brightness", type: "number", default: "1", description: "反射曝光，下限 0" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标顶出冠形隆起并吸引尖峰" },
  { name: "mouseStrength", type: "number", default: "1", description: "光标场强，下限 0" },
  { name: "mouseRadius", type: "number", default: "0.22", description: "光标影响半径（占世界高度比），clamp 0.02–2" },
  { name: "mouseDampening", type: "number", default: "0.15", description: "光标跟随延迟（秒），0 立即贴合" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击发出扩张的环形波" },
  { name: "intro", type: "boolean", default: "true", description: "尖峰从中心长出（2.4s）" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：印成墨面，适合浅色页面" },
  { name: "transparent", type: "boolean", default: "true", description: "透明画布；false 时叠在 color 上" },
  { name: "color", type: "string", default: "—", description: "基底/底色，任意 CSS 颜色字符串" },
  { name: "opacity", type: "number", default: "1", description: "输出不透明度，clamp 0–1" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流场与弹簧但保留渲染" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "mixBlendMode", type: "CSSProperties[\"mixBlendMode\"]", default: "—", description: "合并进容器样式的混合模式" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "ferrofluid",
  name: "磁流体尖峰",
  href: "ferrofluid.html",
  title: "磁流体尖峰",
  description:
    "透视里的磁流体海：GPU 高度场弹簧模拟驱动三重六边点阵尖峰随流场涌起塌落，光标顶出冠形隆起把附近尖峰吸过来，点击炸开一圈扩张的环形波；三通道管线（模拟→包围盒加速→光线步进渲染，FOV 38°、俯仰可调、间隙自适应步长 + 二分精修），棚灯面板反射、菲涅尔、边缘光与距离雾收尾；入场尖峰从中心长出，浅色页可印成墨面，浮点纹理缺失自动回退并整帧落定。",
  tags: ["React", "WebGL", "物理模拟", "背景"],

  cardDescription: "磁流体海面尖峰涌动，光标顶起冠形隆起，点击炸开环形波。",

  demoHint: "移动光标顶起冠形隆起看尖峰被吸过来，点击炸一圈环形波；锐利度与俯仰角可调。",

  api: API,
};
