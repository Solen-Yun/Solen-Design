/* Component metadata only — the live demo and gallery preview live in
   glass-surface-demo.jsx, the framework source texts and the prompt in
   glass-surface-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with glass-surface-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "面板内容，居中摆放" },
  { name: "width", type: "number | string", default: "200", description: "面板宽度（px 或 CSS 长度）" },
  { name: "height", type: "number | string", default: "80", description: "面板高度（px 或 CSS 长度）" },
  { name: "borderRadius", type: "number", default: "20", description: "圆角（px），异形模式下被遮罩替代" },
  { name: "borderWidth", type: "number", default: "0.07", description: "折射边圈占短边比例" },
  { name: "brightness", type: "number", default: "50", description: "位移贴图内板的亮度（0–100），影响内部光学平移" },
  { name: "opacity", type: "number", default: "0.93", description: "位移贴图内板的不透明度" },
  { name: "blur", type: "number", default: "11", description: "贴图内板的模糊（px），决定边缘折射向内衰减的柔度" },
  { name: "displace", type: "number", default: "0", description: "折射结果的额外高斯平滑（最终 feGaussianBlur）" },
  { name: "backgroundOpacity", type: "number", default: "0", description: "玻璃底下的底色不透明度" },
  { name: "saturation", type: "number", default: "1", description: "折射背景的饱和度倍率" },
  { name: "distortionScale", type: "number", default: "-180", description: "基础位移强度（负值向内弯）" },
  { name: "redOffset", type: "number", default: "0", description: "红通道的附加位移（色散）" },
  { name: "greenOffset", type: "number", default: "10", description: "绿通道的附加位移" },
  { name: "blueOffset", type: "number", default: "20", description: "蓝通道的附加位移" },
  { name: "xChannel", type: '"R" | "G" | "B" | "A"', default: '"R"', description: "驱动水平位移的贴图通道" },
  { name: "yChannel", type: '"R" | "G" | "B" | "A"', default: '"G"', description: "驱动竖直位移的贴图通道" },
  { name: "mixBlendMode", type: "string", default: '"difference"', description: "贴图两道渐变的混合模式" },
  { name: "refraction", type: "boolean", default: "true", description: "启用折射；不可用时回退磨砂" },
  { name: "renderer", type: '"auto" | "webgl"', default: '"auto"', description: "强制 WebGL 渲染，或自动选择" },
  { name: "backdrop", type: "HTMLElement | Ref", default: "—", description: "WebGL 层折射的 image/video/canvas 元素或 ref" },
  { name: "shape", type: "string", default: "—", description: "图片地址；其轮廓即玻璃形状（含描边与辉光）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "根元素内联样式" },
];

export default {
  id: "glass-surface",
  name: "液态玻璃面板",
  href: "glass-surface.html",
  title: "液态玻璃面板",
  description:
    "弯折背后画面的液态玻璃面板：边缘位移贴图驱动逐通道折射，带红绿蓝色散；三档渲染——WebGL2 直接采样指定的背景元素、SVG backdrop-filter 位移滤镜、以及磨砂兜底；传 shape 图片时把面板裁成任意轮廓的玻璃，附距离场描边与柔光；贴图随尺寸变化重生成，位移参数全部实时可调。",
  tags: ["React", "CSS", "WebGL", "SVG"],

  cardDescription: "边缘折射带色散的玻璃面板，可裁成任意 logo 形状。",

  demoHint: "拖动滑块看色散与扭曲变化；换个混合模式、调边圈宽度；打开完整预览看玻璃面板裁成异形。",

  api: API,
};
