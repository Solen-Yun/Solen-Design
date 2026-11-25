/* Component metadata only — the live demo and gallery preview live in
   dark-veil-demo.jsx, the framework source texts and the prompt in
   dark-veil-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dark-veil-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#6b12ff"', description: "丝绸的色调，任意 CSS 颜色；同时决定光晕与明色模式的墨色" },
  { name: "speed", type: "number", default: "0.5", description: "动画时钟倍率，控制布料的漂移快慢" },
  { name: "scale", type: "number", default: "1", description: "纹理缩放（越大越细密），下限 0.1" },
  { name: "rotation", type: "number", default: "0", description: "整幅纹理的静态旋转角度（度）" },
  { name: "flow", type: "number", default: "1", description: "布料的呼吸强度：慢旋转、漂移与潜在向量游走，下限 0" },
  { name: "warp", type: "number", default: "0", description: "正弦扭曲强度，下限 0" },
  { name: "variation", type: "number", default: "0", description: "种子偏移，换一片稳定的花纹；0 保持经典图案" },
  { name: "brightness", type: "number", default: "1", description: "整体增益，下限 0" },
  { name: "sheen", type: "number", default: "0", description: "指针光源的高光强度，下限 0" },
  { name: "glow", type: "number", default: "0.4", description: "模糊 mip 层出的泛光强度，下限 0" },
  { name: "grain", type: "number", default: "0.03", description: "动态胶片颗粒幅度，下限 0" },
  { name: "quality", type: "number", default: "0.5", description: "场分辨率比例 0.25–1；大容器还会被总像素上限再压" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "指针弯折空间、拖拽拉丝与高光追光" },
  { name: "mouseStrength", type: "number", default: "1", description: "指针影响力的倍率，下限 0" },
  { name: "intro", type: "boolean", default: "true", description: "挂载后 1.8s 的揭开动画" },
  { name: "fade", type: "number", default: "0", description: "四边向容器边缘的羽化 0–1" },
  { name: "opacity", type: "number", default: "1", description: "整体不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "明色页面用的墨色渲染：在浅底上画深色丝绸" },
  { name: "paused", type: "boolean", default: "false", description: "冻结动画时钟（交互缓动仍继续）" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比，钳到 2" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
];

export default {
  id: "dark-veil",
  name: "暗幕丝绸光",
  href: "dark-veil.html",
  title: "暗幕丝绸光",
  description:
    "黑暗里一匹会呼吸的丝绸光：片元着色器里的一个微型固定神经网络把坐标加潜在向量折成柔光纹理，第二趟合成上色——色调泛光、跟随指针的镜面高光、动态颗粒与四边羽化。指针在局部把空间绕光标弯折，快速拖动像拉扯丝绸一样把纹理拉出剪切；1.8s 揭开入场，明色模式可画在浅底上。帧循环稳定后自睡，场分辨率按 quality 缩放并有总像素上限。",
  tags: ["React", "CSS", "WebGL", "背景"],

  cardDescription: "指针弯折空间、拖拽拉丝的一片暗色丝绸光，神经网络逐像素织出来。",

  demoHint: "快速划过画布看丝绸被拉扯，开光泽看高光追着光标走；换色调、拉高扭曲试试别的花色。",

  api: API,
};
