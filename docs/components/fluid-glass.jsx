/* Component metadata only — the live demo and gallery preview live in
   fluid-glass-demo.jsx, the framework source texts and the prompt in
   fluid-glass-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with fluid-glass-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Look closer."', description: "被玻璃折射的标题文字，同时也是读屏文案" },
  { name: "textColor", type: "string", default: "—", description: "文字颜色；不设用容器的计算色" },
  { name: "fontFamily", type: "string", default: "—", description: "文字字体；不设用容器的" },
  { name: "fontWeight", type: "number", default: "600", description: "文字字重" },
  { name: "fontSize", type: "number", default: "—", description: "字号（px）；不设则自适应铺满" },
  { name: "src", type: "string", default: "—", description: "被折射的图片或视频地址" },
  { name: "fit", type: '"cover" | "contain"', default: '"cover"', description: "媒体在容器内的填充方式" },
  { name: "background", type: "string", default: '"transparent"', description: "文字/媒体底下的背景色" },
  { name: "shape", type: "string", default: '"torus"', description: "起始形状：lens / blob / cube / pill / torus / prism / diamond" },
  { name: "shapes", type: "string[]", default: "—", description: "点击形变的循环序列；不设为全部七种形状" },
  { name: "size", type: "number", default: "260", description: "玻璃体直径（px），下限 16，并受容器限制" },
  { name: "refraction", type: "number", default: "1", description: "折射强度 0–2（ior 1.0–2.0）" },
  { name: "dispersion", type: "number", default: "0.35", description: "色散（边缘彩色条纹）强度 0–1" },
  { name: "reflection", type: "number", default: "1", description: "影棚反射强度 0–2" },
  { name: "frost", type: "number", default: "0", description: "内部磨砂程度 0–1" },
  { name: "color", type: "string", default: '"#ffffff"', description: "玻璃染色（hex / rgb）" },
  { name: "tint", type: "number", default: "0", description: "染色强度 0–1，随光程加深" },
  { name: "shadow", type: "number", default: "0.5", description: "投影与焦散光斑强度 0–1" },
  { name: "elevation", type: "number", default: "0.4", description: "玻璃体离内容平面的高度 0–3" },
  { name: "interaction", type: '"follow" | "static" | "drag"', default: '"follow"', description: "跟随指针、固定不动，或可拖拽" },
  { name: "smoothness", type: "number", default: "0.5", description: "弹簧柔度 0–1，0 硬朗、1 慵懒" },
  { name: "wobble", type: "number", default: "0.5", description: "挤压拉伸与形变涟漪的能量 0–1" },
  { name: "spin", type: "number", default: "0.3", description: "持续旋转速度（rad/s）" },
  { name: "idle", type: "boolean", default: "true", description: "无人交互时缓慢漂移" },
  { name: "morphOnClick", type: "boolean", default: "true", description: "点击形变到循环里的下一个形状" },
  { name: "onShapeChange", type: "(shape: string) => void", default: "—", description: "形变落定后回调" },
  { name: "position", type: "[number, number]", default: "[0.5, 0.5]", description: "在容器内的相对锚点（static / drag 模式）" },
  { name: "intro", type: "boolean", default: "true", description: "缩放入场" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限 0.5–3（另有约 5MP 预算）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在画布之上的 DOM 内容（层本身可穿透点击）" },
];

export default {
  id: "fluid-glass",
  name: "折射玻璃透镜",
  href: "fluid-glass.html",
  title: "折射玻璃透镜",
  description:
    "悬浮在页面上的光线步进 3D 玻璃体：折射背后的标题、图片或视频，边缘色散出彩条，朝向面带影棚反射，下方投出带焦散光斑的软影；七种形状点击涟漪形变，跟随指针、可拖拽甩动带边缘反弹、挤压拉伸随速度变形，内部可磨砂；空闲缓慢漂移、稳定后降频自睡，尊重系统减动效。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "光线步进玻璃体折射标题与媒体，点击在七种形状间熔变。",

  demoHint: "移动指针看玻璃追随与折射；点玻璃在形状间熔变；拖互动方式换成拖拽甩一下。",

  api: API,
};
