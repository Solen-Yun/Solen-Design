/* Component metadata only — the live demo and gallery preview live in
   specular-button-demo.jsx, the framework source texts and the prompt in
   specular-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with specular-button-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: '"Get Started"', description: "按钮内容，文字或其他元素" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"lg"', description: "内边距与字号三档" },
  { name: "radius", type: "number", default: "18", description: "圆角（px），超过高度一半即为胶囊" },
  { name: "tint", type: "string", default: '"#ffffff"', description: "玻璃体的颜色，任意 CSS 颜色写法" },
  { name: "tintOpacity", type: "number", default: "0.04", description: "玻璃体填充强度，0 全透明玻璃到 1 实心按钮" },
  { name: "blur", type: "number", default: "0", description: "按钮背后内容的背景模糊（px）" },
  { name: "textColor", type: "string", default: '"#f5f5f5"', description: "文字颜色" },
  { name: "lineColor", type: "string", default: '"#ffffff"', description: "边缘流光的颜色" },
  { name: "baseColor", type: "string", default: '"#525252"', description: "光下常驻的发丝描线颜色" },
  { name: "intensity", type: "number", default: "1", description: "边缘流光亮度" },
  { name: "idleIntensity", type: "number", default: "0.35", description: "光标离开时保留的常亮比例 0–1" },
  { name: "shineSize", type: "number", default: "10", description: "光斑满强度时覆盖的边缘长度（沿轮廓的角度）" },
  { name: "shineFade", type: "number", default: "34", description: "光斑向两侧渐隐的长度（沿轮廓的角度）" },
  { name: "thickness", type: "number", default: "1.2", description: "亮边宽度（px）" },
  { name: "glow", type: "number", default: "1", description: "亮边四周与玻璃内的柔光，0 只剩清晰描线" },
  { name: "followMouse", type: "boolean", default: "true", description: "光斑贴着边缘游向光标最近的位置" },
  { name: "proximity", type: "number", default: "250", description: "光斑开始跟随并提亮的距离（px）" },
  { name: "autoAnimate", type: "boolean", default: "false", description: "光标不在时流光自动绕边环行" },
  { name: "speed", type: "number", default: "0.35", description: "环行速度（圈/秒）" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用按钮" },
  { name: "onClick", type: "MouseEventHandler", default: "—", description: "点击回调" },
  { name: "type", type: '"button" | "submit" | "reset"', default: '"button"', description: "原生按钮 type" },
  { name: "className", type: "string", default: '""', description: "按钮附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "按钮内联样式" },
];

export default {
  id: "specular-button",
  name: "镜面流光按钮",
  href: "specular-button.html",
  title: "镜面流光按钮",
  description:
    "按钮边缘的镜面流光：光斑沿圆角描边带惯性游向光标，靠近点亮、离开回到角落常亮，底部一根发丝描线始终可见，按下时光斑变宽提亮；玻璃底色与背景模糊可选，光标不在时可让流光自动环行。WebGL2 SDF 渲染，帧循环空闲自睡。",
  tags: ["React", "CSS", "WebGL", "按钮"],

  cardDescription: "边缘流光随光标游走、靠近点亮，按下提亮。",

  demoHint: "移动鼠标看光斑贴边跟随，按下看光斑变宽提亮；亮度、光斑与辉光可调。",

  api: API,
};
