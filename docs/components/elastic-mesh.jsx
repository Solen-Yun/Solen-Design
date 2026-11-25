/* Component metadata only — the live demo and gallery preview live in
   elastic-mesh-demo.jsx, the framework source texts and the prompt in
   elastic-mesh-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with elastic-mesh-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Squish"', description: "要充气膨胀的文字；\\n 换行；设置 src 时忽略" },
  { name: "src", type: "string", default: '""', description: "改为充气一张图片（logo），crossOrigin 匿名加载" },
  { name: "fontFamily", type: "string", default: '"system-ui, sans-serif"', description: "栅格化文字用的字体族" },
  { name: "fontWeight", type: "number", default: "900", description: "栅格化文字用的字重" },
  { name: "color", type: "string", default: '"#3b5bff"', description: "表面基色（任意 CSS 颜色）" },
  { name: "imageColors", type: "boolean", default: "true", description: "图片模式下用图片自身颜色上色" },
  { name: "material", type: '"balloon" | "chrome" | "jelly" | "clay"', default: '"balloon"', description: "表面材质观感：气球 / 镀铬 / 果冻发光 / 哑光黏土" },
  { name: "inflate", type: "number", default: "1", description: "膨胀饱满度 0.1–3" },
  { name: "stiffness", type: "number", default: "0.5", description: "果冻回弹的硬度 0–1" },
  { name: "wobble", type: "number", default: "0.6", description: "阻尼松紧——高值抖动更久 0–1" },
  { name: "grabRadius", type: "number", default: "70", description: "抓取、压陷与戳动的衰减半径（px），10–400" },
  { name: "stretch", type: "number", default: "0.5", description: "拖拽拉长到绷紧的极限 0–1" },
  { name: "press", type: "number", default: "0.5", description: "悬停压陷与点击戳动的深度 0–1" },
  { name: "shadow", type: "number", default: "0.5", description: "投影强度 0–1" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时字母/部件按错峰弹簧依次弹出" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "投影颜色与棚灯明暗平衡" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（钳制到 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "elastic-mesh",
  name: "果冻膨胀网格",
  href: "elastic-mesh.html",
  title: "果冻膨胀网格",
  description:
    "把文字或 logo 栅格化成一只充气的软体：距离场算出轮廓，多级松弛解出鼓起的充气高度场，480Hz 弹簧网格让整块形状像果冻一样被按压、戳动、拉扯到绷紧再弹回；悬停指尖压陷表面，快速点击激起涟漪，字母按错峰弹簧逐个弹出。WebGL2 着色器以棚灯环境反射渲染气球、镀铬、果冻发光、黏土四种材质，帧循环稳定后自睡。",
  tags: ["React", "CSS", "WebGL", "物理模拟"],

  cardDescription: "文字/logo 充气成软弹果冻，悬停压陷、拖拽拉扯、点击戳出涟漪。",

  demoHint: "在文字上悬停、按住拖拽再松手，快速点击看涟漪；切换四种材质并调硬度、抖动、拉伸。",

  api: API,
};
