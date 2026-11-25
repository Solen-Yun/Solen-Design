/* Component metadata only — the live demo and gallery preview live in
   paper-crumple-demo.jsx, the framework source texts and the prompt in
   paper-crumple-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with paper-crumple-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "src", type: "string", default: "（必填）", description: "印在纸面上的图片地址，需要允许跨域加载；缺失或加载失败回退为普通图片并触发 onError" },
  { name: "alt", type: "string", default: '"Crumplable image"', description: "回退图片的 alt，也是可聚焦按钮 aria-label 的开头" },
  { name: "backSrc", type: "string", default: '""', description: "纸背面的图片地址；留空显示 paperColor" },
  { name: "width", type: "number", default: "320", description: "纸面原始宽度（px）" },
  { name: "height", type: "number", default: "400", description: "纸面原始高度（px）" },
  { name: "sceneHeight", type: "number", default: "560", description: "根容器高度（px）" },
  { name: "imageFit", type: '"cover" | "contain"', default: '"cover"', description: "图片铺进纸面的方式" },
  { name: "releaseBehavior", type: '"restore" | "creased" | "stay"', default: '"restore"', description: "松手后的行为：弹回平整、保留折痕记忆、或停在揉皱状态" },
  { name: "crumpleAmount", type: "number", default: "0.85", description: "按住时揉皱的深度 0–1，对应预计算折痕路径的进度" },
  { name: "crumpleDuration", type: "number", default: "0.55", description: "按住时揉皱弹簧的时长（秒）" },
  { name: "releaseDuration", type: "number", default: "0.4", description: "松手后各弹簧的时长（秒）" },
  { name: "foldCount", type: "number", default: "6", description: "折痕导向线数量，钳制在 3–16" },
  { name: "foldSharpness", type: "number", default: "0.6", description: "棱线锐利度 0–1，影响铰链刚度与法线混合" },
  { name: "wrinkleDepth", type: "number", default: "0.65", description: "纸面压缩强度 0–2" },
  { name: "creaseStrength", type: "number", default: "0.18", description: "creased 松手时保留峰值褶皱的比例 0–1" },
  { name: "paperColor", type: "string", default: '"#f4f0e8"', description: "无 backSrc 时纸背面的颜色" },
  { name: "roughness", type: "number", default: "0.92", description: "材质粗糙度 0–1" },
  { name: "paperTexture", type: "number", default: "0.08", description: "纸纹凹凸强度 0–1" },
  { name: "lightIntensity", type: "number", default: "1.8", description: "方向光强度" },
  { name: "lightAngle", type: "number", default: "-35", description: "光源方位角（度）" },
  { name: "shadow", type: "boolean", default: "true", description: "是否渲染柔和投影" },
  { name: "shadowOpacity", type: "number", default: "0.08", description: "投影浓度 0–1" },
  { name: "draggable", type: "boolean", default: "true", description: "允许按住拖动纸团" },
  { name: "dragRotation", type: "number", default: "10", description: "速度倾斜的最大角度（度），钳制 0–60" },
  { name: "dragRadius", type: "number", default: "180", description: "纸团离中心的最远距离（px）" },
  { name: "returnToOrigin", type: "boolean", default: "true", description: "松手后回正，而不是顺速度滑走" },
  { name: "rotation", type: "number", default: "0", description: "纸面常驻旋转角（度）" },
  { name: "seed", type: "number", default: "7", description: "随机种子：顶点抖动、三角形翻边与折痕导向都由它决定" },
  { name: "detail", type: "number", default: "64", description: "网格精度，内部折算并钳制到 8–24 段" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用交互并中止当前按持" },
  { name: "resetKey", type: "number", default: "0", description: "改动此值会把纸面重置为平整" },
  { name: "onStateChange", type: '(state: "flat" | "holding" | "crumpled" | "creased") => void', default: "—", description: "交互状态回调" },
  { name: "onError", type: "(error: Error) => void", default: "—", description: "加载或 WebGL 失败时回调" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "paper-crumple",
  name: "揉纸持握变形",
  href: "paper-crumple.html",
  title: "揉纸持握变形",
  description:
    "把一张图片变成可以揉的纸：按住时纸面沿预计算的折痕路径（随机导向线 + Verlet 约束求解，同一 seed 结果可复现）塌陷成带棱线的 3D 纸团，可拖着走并带速度倾斜；松手按三种行为收场——弹回平整、保留折痕记忆、或停在揉皱态。three.js WebGL 渲染双面材质与纸纹凹凸，自带软投影、键盘操作（空格按持、方向键移动、Esc 复位）、加载失败回退为普通图片。",
  tags: ["React", "WebGL", "three", "交互"],

  cardDescription: "按住把图片揉成 3D 纸团，松手弹回或留下折痕。",

  demoHint: "按住图片揉一揉再拖着走；切松手行为、调揉皱深度，Esc 可复位。",

  api: API,
};
