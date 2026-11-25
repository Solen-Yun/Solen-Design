/* Component metadata only — the live demo and gallery preview live in
   grid-motion-demo.jsx, the framework source texts and the prompt in
   grid-motion-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with grid-motion-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: '(string | { src: string; alt?: string } | ReactNode | null)[]', default: "[]", description: "瓷砖内容并循环铺满墙面：文本、图片地址/对象、任意节点、空位" },
  { name: "rows", type: "number", default: "4", description: "漂移行数，1–12" },
  { name: "aspectRatio", type: "number", default: "1.33", description: "瓷砖宽高比，0.3–4" },
  { name: "gap", type: "number", default: "16", description: "瓷砖间距（px），≥ 0" },
  { name: "radius", type: "number", default: "14", description: "瓷砖圆角（px），≥ 0" },
  { name: "angle", type: "number", default: "-12", description: "整面墙的旋转角（度）" },
  { name: "tilt", type: "number", default: "0", description: "3D 后仰角（度），0–75" },
  { name: "speed", type: "number", default: "24", description: "行漂移速度（px/s）" },
  { name: "direction", type: '"alternate" | "left" | "right"', default: '"alternate"', description: "行漂移方向：相邻反向 / 全部向左 / 全部向右" },
  { name: "parallax", type: "number", default: "0.5", description: "0–1：行随指针滑动的幅度（相邻行反向）" },
  { name: "spotlight", type: "number", default: "0.6", description: "0–1：光标点亮光池的半径" },
  { name: "dim", type: "number", default: "0.35", description: "0–1：光池外瓷砖压暗的程度" },
  { name: "grayscale", type: "boolean", default: "false", description: "光池外瓷砖去饱和" },
  { name: "fade", type: "number", default: "0.5", description: "0–1：边缘羽化宽度；0 关闭遮罩" },
  { name: "tileColor", type: "string", default: "—", description: "覆盖主题的瓷砖底色" },
  { name: "textColor", type: "string", default: "—", description: "覆盖主题的瓷砖文字色" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "瓷砖底色、文字与描边的明暗主题" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "grid-motion",
  name: "斜墙砖光",
  href: "grid-motion.html",
  title: "斜墙砖光",
  description:
    "一面倾斜的瓷砖长墙（文本/图片/任意节点循环铺满）永远漂移：相邻行反向滚动、速度各有快慢错开步调，指针滑动时各行以不同惯性反向滑移（视差），光标处点亮一圈光池、其余瓷砖压暗（可选去饱和）；纯 React + CSS transform 实现，按周期无缝换行、倾斜 3D 后仰时对光标做透视反投影保证光池落点准确，边缘羽化、明暗两套主题。",
  tags: ["React", "CSS"],

  cardDescription: "斜置瓷砖墙相邻行反向漂移，光标处点亮一圈、其余压暗。",

  demoHint: "左右扫动指针看各行反向滑移；调 tilt 到 40° 拉出 3D 进深；开 grayscale 看光池唯一有色。",

  api: API,
};
