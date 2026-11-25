/* Component metadata only — the live demo and gallery preview live in
   blob-cursor-demo.jsx, the framework source texts and the prompt in
   blob-cursor-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with blob-cursor-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "material", type: '"chrome" | "jelly" | "pearl" | "ink"', default: '"chrome"', description: "液面材质：镜面铬 / 果冻清漆 / 珍珠虹彩 / 平面墨色" },
  { name: "color", type: "string", default: '"#3B82F6"', description: "液珠基色，非法值回退白色" },
  { name: "size", type: "number", default: "140", description: "液珠直径（px）12–400" },
  { name: "morph", type: "number", default: "0", description: "轮廓呼吸成瓣形的幅度 0–1" },
  { name: "morphSpeed", type: "number", default: "0.4", description: "瓣形变化的节奏 0–1" },
  { name: "depth", type: "number", default: "1", description: "3D 凸面穹顶高度 0–1" },
  { name: "trail", type: "number", default: "16", description: "弹性拖尾节数 0–16" },
  { name: "lag", type: "number", default: "0.55", description: "追指针的迟滞 0–1，越大越懒" },
  { name: "goo", type: "number", default: "1", description: "部件间的融合倾向 0–1" },
  { name: "stretch", type: "number", default: "0.6", description: "拖尾链节的软硬 0–1" },
  { name: "wobble", type: "number", default: "1", description: "接触时的晃动与回弹 0–1" },
  { name: "drip", type: "number", default: "0", description: "高速甩动时甩出液滴的程度 0–1" },
  { name: "splash", type: "boolean", default: "true", description: "点击时爆出液滴" },
  { name: "splashCount", type: "number", default: "6", description: "每次爆出的液滴数 1–32" },
  { name: "splashSpeed", type: "number", default: "0.5", description: "爆出速度 0–1" },
  { name: "splashSize", type: "number", default: "0.5", description: "液滴大小 0–1" },
  { name: "splashGravity", type: "number", default: "0", description: "液滴的下坠重力 0–1" },
  { name: "regrow", type: "number", default: "0.5", description: "损失的体积回流的速度 0–1" },
  { name: "shine", type: "number", default: "1", description: "反光材质的抛光程度 0–1" },
  { name: "shadow", type: "boolean", default: "false", description: "在地面平面上投出柔和阴影" },
  { name: "blend", type: "string", default: '"normal"', description: "根节点混合模式：normal / difference / exclusion / multiply / screen / overlay" },
  { name: "hideCursor", type: "boolean", default: "true", description: "隐藏宿主的原生光标" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根节点内联样式" },
];

export default {
  id: "blob-cursor",
  name: "液态金属光标",
  href: "blob-cursor.html",
  title: "液态金属光标",
  description:
    "一颗会流动的液态金属追着光标跑：八个核心球加一条弹性拖尾在着色器里用 smooth-min SDF 融成连续曲面，从 2D 距离场八步步进出穹顶高度、写入 gl_FragDepth 得到真实 3D 凸面与法线，铬 / 果冻 / 珍珠虹彩 / 墨色四种材质；快速甩动拉长液珠，点击爆出液滴并损失体积、液滴落回后重新聚拢长回，悬停按钮会膨胀。体积守恒的液体模拟 + PMREM 环境反射，静止后帧循环自睡。",
  tags: ["React", "CSS", "Three", "光标"],

  cardDescription: "液态金属追着光标跑，甩动拉长、点击爆成液滴再聚拢长回。",

  demoHint: "划过按钮看液珠膨胀，快速甩动看拖尾，点击爆出液滴看体积回流；材质四选一，goo 调低看珠子散开。",

  api: API,
};
