/* Component metadata only — the live demo and gallery preview live in
   strands-demo.jsx, the framework source texts and the prompt in
   strands-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with strands-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "colors", type: "string[]", default: "7 色默认调色板", description: "映射到 7 个灯带角色（红/橙/琥珀/暖白/青/蓝/深蓝）的调色板，1–8 个十六进制色" },
  { name: "count", type: "number", default: "3", description: "灯带上的脊线数量 1–3" },
  { name: "speed", type: "number", default: "1", description: "动画时钟速率" },
  { name: "amplitude", type: "number", default: "1", description: "灯带轴线的弯曲幅度" },
  { name: "waviness", type: "number", default: "1", description: "扭转的相位调制" },
  { name: "thickness", type: "number", default: "1", description: "光带厚度缩放" },
  { name: "glow", type: "number", default: "1", description: "边缘辉光与光晕强度" },
  { name: "taper", type: "number", default: "1", description: "鼓包宽度缩放（最小 0.05）" },
  { name: "spread", type: "number", default: "1", description: "冷暖两族光带的交叉过渡" },
  { name: "hueShift", type: "number", default: "0", description: "最终色相旋转（以圈为单位 0–1）" },
  { name: "intensity", type: "number", default: "1", description: "整体亮度" },
  { name: "saturation", type: "number", default: "1", description: "最终调色的饱和度倍率" },
  { name: "opacity", type: "number", default: "1", description: "画布输出透明度" },
  { name: "scale", type: "number", default: "1", description: "整体缩放（最小 0.05）" },
  { name: "glass", type: "boolean", default: "true", description: "渲染折射玻璃球；关闭则只剩裸灯带" },
  { name: "refraction", type: "number", default: "1", description: "玻璃透镜强度 0–1.8" },
  { name: "dispersion", type: "number", default: "1", description: "折射的色差镶边" },
  { name: "glassSize", type: "number", default: "1", description: "球体半径倍率" },
  { name: "rim", type: "number", default: "1", description: "边缘环、雾面与高光强度" },
  { name: "energy", type: "number", default: "0.65", description: "静息活跃度基线 0–1" },
  { name: "listening", type: "boolean", default: "false", description: "驱动一段程序化的语音包络带动鼓包" },
  { name: "level", type: "number", default: "—", description: "外部活跃度（0–1），覆盖 energy；可接实时音频电平" },
  { name: "interactive", type: "boolean", default: "true", description: "悬停时增亮并使球体倾向指针" },
  { name: "clickPulse", type: "boolean", default: "true", description: "点击时向玻璃注入弹簧脉冲" },
  { name: "intro", type: "boolean", default: "true", description: "播放 1.4 秒的成长入场" },
  { name: "lightMode", type: "boolean", default: "false", description: "浅色页面下的墨水渲染" },
  { name: "maxDevicePixelRatio", type: "number", default: "2", description: "DPR 上限（最小 0.5）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "strands",
  name: "光缆球体",
  href: "strands.html",
  title: "光缆球体",
  description:
    "磨砂玻璃球内两条光谱光带（暖红橙一族、冷青蓝一族）沿三次曲线缠绕，汇聚处鼓起一记光滑的隆包：活跃度（energy / 语音包络 / 外接电平）驱动隆包吞吐，悬停使球体倾向指针并增亮，点击向玻璃注入弹簧脉冲；球体按 refraction 透镜折射光带并做色差分光，浅色模式转为纸面墨水与柔影。单趟 WebGL2 全屏片元渲染，上下文丢失可恢复。",
  tags: ["React", "WebGL", "图形"],

  cardDescription: "光谱光缆在磨砂球里扭动，汇聚处像在呼吸吞吐。",

  demoHint: "在球上滑动看它倾斜增亮；点一下注入脉冲，打开聆听模式看隆包说话。",

  api: API,
};
