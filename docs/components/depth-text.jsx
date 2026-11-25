/* Component metadata only — the live demo and gallery preview live in
   depth-text-demo.jsx, the framework source texts and the prompt in
   depth-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with depth-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: '"Elevate"', description: "每一层重复的文字" },
  { name: "layers", type: "number", default: "34", description: "挤出层数 2–64" },
  { name: "depth", type: "number", default: "2.4", description: "层间 Z 间距（px）0–12" },
  { name: "faceColor", type: "string", default: '"currentColor"', description: "正面颜色" },
  { name: "depthColor", type: "string", default: '"#7c3aed"', description: "挤出品向它混合（实心）或淡入它（渐变）的颜色" },
  { name: "gradientDepth", type: "boolean", default: "false", description: "层按透明度渐隐，而不是实心混色" },
  { name: "tilt", type: "number", default: "7.5", description: "基础倾角幅度（deg）0–12" },
  { name: "pointerTracking", type: "boolean", default: "true", description: "文字块朝指针转向" },
  { name: "smoothing", type: "number", default: "0.14", description: "每帧旋转追随比例 0.02–0.35" },
  { name: "perspective", type: "number", default: "900", description: "根节点 CSS perspective（px）300–2000" },
  { name: "autoOrbit", type: "boolean", default: "true", description: "空闲时按利萨茹曲线缓慢漂移视角" },
  { name: "orbitSpeed", type: "number", default: "0.35", description: "漂移转速（圈/秒）0–2" },
  { name: "hoverPush", type: "number", default: "0", description: "悬停把挤出品向内压的幅度 0–1；按住再加四分之一" },
  { name: "float", type: "boolean", default: "false", description: "未被悬停时整块上下漂浮" },
  { name: "fontSize", type: "string", default: '"clamp(3rem, 12vw, 7rem)"', description: "每层的字号，任意 CSS 长度" },
  { name: "fontWeight", type: "number", default: "900", description: "每层的字重" },
  { name: "shadow", type: "boolean", default: "true", description: "最深层投影 + 正面接触阴影" },
  { name: "outline", type: "boolean", default: "false", description: "层用描边渲染而不是填充" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时用 1.2s 从正面长出挤出深度" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
  { name: "style", type: "CSSProperties", default: "{}", description: "根节点内联样式覆盖" },
];

export default {
  id: "depth-text",
  name: "立体层深文字",
  href: "depth-text.html",
  title: "立体层深文字",
  description:
    "几十份文字副本沿 Z 轴堆成实体挤出块：正面朝指针转向或空闲利萨茹漂移，悬停（按住更狠）把整块深度压进去再弹回，可开启无人交互时的上下漂浮；实心模式把正面颜色逐层混向深色，渐变模式逐层透明消隐，还有描边模式；入场 1.2 秒从正面长出全部深度，帧循环静止后自睡，滚出视口停帧。",
  tags: ["React", "CSS", "文字"],

  cardDescription: "文字堆成几十层的 3D 挤出块，随指针转向、悬停压入回弹。",

  demoHint: "移动指针看转向，按住看深度压入；开渐变/描边换挤出质感，开漂浮看无人时的呼吸。",

  api: API,
};
