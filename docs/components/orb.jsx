/* Component metadata only — the live demo and gallery preview live in
   orb-demo.jsx, the framework source texts and the prompt in
   orb-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with orb-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: '["#9c43fe", "#4cc2e9", "#101499"]', description: "三色：光环起点色、涡流终点色（两者沿环旋混）与深部底色；接受任意 CSS 颜色" },
  { name: "hue", type: "number", default: "0", description: "整体色相旋转角度（度）" },
  { name: "backgroundColor", type: "string", default: '"#000000"', description: "光环背后的背景色；其明度决定走深色或浅色渲染路径" },
  { name: "size", type: "number", default: "1", description: "光环缩放 0.1–3，值越大画面上越小" },
  { name: "glow", type: "number", default: "1", description: "环光衰减 0.1–5，越大光晕铺得越开" },
  { name: "bleed", type: "number", default: "1", description: "环体向内外晕开的程度 0–4" },
  { name: "wobble", type: "number", default: "1", description: "环半径噪声起伏幅度，≥0" },
  { name: "highlight", type: "number", default: "1", description: "环绕亮光与尾迹的亮度，≥0" },
  { name: "trail", type: "number", default: "1", description: "亮光身后的彗尾长度，≥0；0 关闭尾迹" },
  { name: "tiltX", type: "number", default: "0", description: "绕 x 轴的平面倾角，−70–70 度" },
  { name: "tiltY", type: "number", default: "0", description: "绕 y 轴的平面倾角，−70–70 度" },
  { name: "speed", type: "number", default: "1", description: "呼吸噪声与旋流的时间倍率" },
  { name: "hoverIntensity", type: "number", default: "1", description: "悬停增亮、环体前伸与唤醒的倍率，≥0" },
  { name: "rotateOnHover", type: "boolean", default: "true", description: "悬停时整个场缓慢旋转" },
  { name: "forceHoverState", type: "boolean", default: "false", description: "把悬停唤醒态常开，适合静态缩略图" },
  { name: "followCursor", type: "boolean", default: "true", description: "指针靠近时环绕亮光朝指针方向偏转" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击环内触发回声脉冲与整体回弹" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时播放 1.1 秒的绽放开场" },
  { name: "opacity", type: "number", default: "1", description: "画布整体透明度 0–1" },
  { name: "paused", type: "boolean", default: "false", description: "冻结时间，只渲染一帧定格" },
  { name: "dpr", type: "number", default: "—", description: "覆盖画布的设备像素比（封顶 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "orb",
  name: "呼吸光环",
  href: "orb.html",
  title: "呼吸光环",
  description:
    "一圈会呼吸的旋色光环：rim 半径随 3D 单纯形噪声起伏，亮光沿环轨跑动并拖彗尾，指针靠近时环体增亮、缓缓旋转并向指针方向软性拉伸（弹簧回中），点击环内打出回声脉冲并整体回弹一次；tiltX/tiltY 把整场投影到斜平面做出伪 3D；背景明度自动切换深浅两套渲染路径；单 pass WebGL2 全屏片元着色器，DPR 封顶 2，离屏与隐藏页自动停帧。",
  tags: ["React", "CSS", "WebGL", "光效"],

  cardDescription: "呼吸的旋色光环，亮光绕环拖尾，环体朝指针拉伸。",

  demoHint: "把指针贴近光环看它醒过来、朝你伸过来；点一下环内看回声脉冲；倾斜与彗尾长度可调。",

  api: API,
};
