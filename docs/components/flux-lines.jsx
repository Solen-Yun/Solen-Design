/* Component metadata only — the live demo and gallery preview live in
   flux-lines-demo.jsx, the framework source texts and the prompt in
   flux-lines-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with flux-lines-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#ffffff", "#ffffff", "#ffffff"]', description: "灯丝调色板，最多 8 色沿场插值互混" },
  { name: "speed", type: "number", default: "0.5", description: "磁力线翻涌速度，0 冻结" },
  { name: "scale", type: "number", default: "1.6", description: "场缩放，越大线越密" },
  { name: "turbulence", type: "number", default: "1", description: "脊线的横向扰动幅度" },
  { name: "fluidity", type: "number", default: "0.1", description: "软最小值平滑度，越大两套脊线融得越狠" },
  { name: "rimWidth", type: "number", default: "0.2", description: "等值线周围发光带的宽度" },
  { name: "sharpness", type: "number", default: "2.5", description: "辉光衰减指数" },
  { name: "shimmer", type: "number", default: "1.5", description: "沿线漂移的亮度调制" },
  { name: "glow", type: "number", default: "2", description: "整体发光强度" },
  { name: "lineWidth", type: "number", default: "1", description: "锐利芯线宽度（px），0 关闭" },
  { name: "flowDirection", type: '"up" | "down" | "left" | "right"', default: '"down"', description: "场的流动方向" },
  { name: "opacity", type: "number", default: "1", description: "线条不透明度，clamp 0–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "光标磁铁弯折并点亮附近灯丝" },
  { name: "mouseStrength", type: "number", default: "1", description: "磁铁拉力强度，下限 0" },
  { name: "mouseRadius", type: "number", default: "0.35", description: "磁铁影响半径（占高度比），下限 0.01" },
  { name: "mouseDampening", type: "number", default: "0.15", description: "磁铁跟随延迟（秒），0 立即贴合" },
  { name: "clickSwirl", type: "boolean", default: "true", description: "点击把场拧成衰减的旋涡" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时灯丝 1.8s 淡入" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色模式：印成墨线，适合浅色页面" },
  { name: "transparent", type: "boolean", default: "true", description: "透明画布；false 时叠在 backgroundColor 上" },
  { name: "backgroundColor", type: "string", default: "—", description: "不透明底色，任意 CSS 颜色字符串" },
  { name: "paused", type: "boolean", default: "false", description: "冻结流动但保留交互" },
  { name: "dpr", type: "number", default: "devicePixelRatio", description: "画布像素比覆盖，clamp 至 2" },
  { name: "mixBlendMode", type: "CSSProperties[\"mixBlendMode\"]", default: "—", description: "合并进容器样式的混合模式" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "flux-lines",
  name: "磁力发光线",
  href: "flux-lines.html",
  title: "磁力发光线",
  description:
    "翻涌的磁力线场：细发光丝沿值噪声脊线流淌，平时隐没，光标磁铁经过时弯折、提亮并显影附近的灯丝，点击把整片场拧成衰减旋涡。两套山脊反向漂移经软最小值熔接，调色板沿场交叉渐变（最多 8 色），暗底加法发光、浅色页可印成墨线；帧循环空闲自睡，磁铁跟随带阻尼。",
  tags: ["React", "WebGL", "CSS", "背景"],

  cardDescription: "光标磁铁弯折并点亮磁力线，点击拧出衰减旋涡。",

  demoHint: "在场上移动看灯丝被磁铁弯折点亮，点击拧出旋涡；磁铁半径、拉力与辉光可调。",

  api: API,
};
