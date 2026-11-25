/* Component metadata only — the live demo and gallery preview live in
   sticker-peel-demo.jsx, the framework source texts and the prompt in
   sticker-peel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with sticker-peel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "imageSrc", type: "string", default: "—", description: "贴纸图源；透明区域会成为模切轮廓，抠掉的洞不可抓取" },
  { name: "width", type: "number", default: "200", description: "贴纸宽度（px），下限 16；高度按图片比例" },
  { name: "rotate", type: "number", default: "0", description: "静止时的旋转角度（度）" },
  { name: "peelDirection", type: "number", default: "0", description: "默认撕揭方向（度，0 为向上撕）" },
  { name: "peelBackHoverPct", type: "number", default: "25", description: "悬停时撕口行进的幅度 0–100（占撕揭跨度）" },
  { name: "peelBackActivePct", type: "number", default: "40", description: "按住时撕口打开的幅度 0–100" },
  { name: "curlRadius", type: "number", default: "12", description: "卷曲圆柱半径（px），下限 2" },
  { name: "finish", type: '"gloss" | "matte" | "holo"', default: '"gloss"', description: "正面材质：亮面 / 哑面 / 全息镭射" },
  { name: "backColor", type: "string", default: '"#d4d4d8"', description: "贴纸背面的颜色" },
  { name: "lightingIntensity", type: "number", default: "0.5", description: "高光强度，holo 时也控制镭射能量 0–1" },
  { name: "shadowIntensity", type: "number", default: "0.6", description: "接触阴影与卷边阴影强度 0–1" },
  { name: "followPointer", type: "boolean", default: "true", description: "悬停时撕口朝指针方向偏转" },
  { name: "draggable", type: "boolean", default: "true", description: "可抓取、拖拽、抛掷并参与层级堆叠" },
  { name: "swing", type: "number", default: "1", description: "拖拽时抓点的钟摆甩动幅度 0–3" },
  { name: "friction", type: "number", default: "0.5", description: "抛出后的摩擦减速 0–1" },
  { name: "bounce", type: "number", default: "0.35", description: "撞到容器边缘的反弹系数 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时 1.1s 的撕起再落定开场" },
  { name: "initialPosition", type: '"center" | { x: number; y: number }', default: '"center"', description: "在父容器中的初始位置（相对中心）" },
  { name: "onDragStart", type: "() => void", default: "—", description: "拖拽真正开始时回调" },
  { name: "onDragEnd", type: "() => void", default: "—", description: "松手后回调" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（钳制到 2）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "sticker-peel",
  name: "贴纸撕揭",
  href: "sticker-peel.html",
  title: "贴纸撕揭",
  description:
    "一张真的能撕的模切贴纸：透明区域成为轮廓，悬停时撕口从最近的边翘起、按住时沿抓点方向卷开，可以抓着甩动像钟摆一样荡、抛出去带惯性摩擦与边缘反弹；卷边是圆柱卷曲网格，背面有独立颜色与柔影，正面支持亮面、哑面、全息镭射三种材质。WebGL2 四通道渲染（接触阴影、卷边软影、正反面、带景深的卷边），光照点随指针移动。",
  tags: ["React", "CSS", "WebGL", "贴纸"],

  cardDescription: "能从任意边撕起的模切贴纸，可抓取抛掷甩荡，正面有全息镭射质感。",

  demoHint: "悬停贴纸边缘看撕口翘起，按住边缘撕开并甩动；抛向四壁看反弹，切换 holo 材质转动光照。",

  api: API,
};
