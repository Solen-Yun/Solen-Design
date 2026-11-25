/* Component metadata only — the live demo and gallery preview live in
   beams-demo.jsx, the framework source texts and the prompt in
   beams-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with beams-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#ffffff"', description: "光带染色（任意 CSS 颜色）" },
  { name: "beamWidth", type: "number", default: "140", description: "单条光带宽度（px），≥ 8" },
  { name: "rotation", type: "number", default: "30", description: "光带场旋转角度（度）" },
  { name: "speed", type: "number", default: "1", description: "波纹行进速度" },
  { name: "waveLength", type: "number", default: "233", description: "沿光带的波纹间距（px），≥ 20" },
  { name: "depth", type: "number", default: "1", description: "波纹陡峭度（法线倾斜），≥ 0" },
  { name: "sharpness", type: "number", default: "0.6", description: "高光锐度 0–1，越大越锐" },
  { name: "twist", type: "number", default: "0", description: "逐带扭转振荡 0–2" },
  { name: "fillLight", type: "number", default: "0.3", description: "自下而上的补光强度 0–1.5" },
  { name: "glow", type: "number", default: "0.6", description: "辉光强度，≥ 0" },
  { name: "brightness", type: "number", default: "1.6", description: "输出增益，≥ 0" },
  { name: "variation", type: "number", default: "0", description: "波纹种子；换任意数字重排光带" },
  { name: "grain", type: "number", default: "0.35", description: "胶片颗粒，≥ 0" },
  { name: "quality", type: "number", default: "0.75", description: "场渲染分辨率比例 0.25–1" },
  { name: "mouseInteraction", type: "boolean", default: "true", description: "高光与主光跟随光标" },
  { name: "mouseStrength", type: "number", default: "1", description: "光标邻近增亮强度，≥ 0" },
  { name: "intro", type: "boolean", default: "true", description: "挂载时主光自下而上扫亮（1.6 秒）" },
  { name: "fade", type: "number", default: "0", description: "屏幕四边羽化 0–1" },
  { name: "opacity", type: "number", default: "1", description: "画布不透明度 0–1" },
  { name: "lightMode", type: "boolean", default: "false", description: "墨色透明输出，适配亮色页面" },
  { name: "backgroundColor", type: "string", default: "—", description: "容器背景色（默认透明）" },
  { name: "paused", type: "boolean", default: "false", description: "冻结波纹时钟（仍渲染一帧）" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比上限（默认 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "beams",
  name: "暗河光带",
  href: "beams.html",
  title: "暗河光带",
  description:
    "WebGL2 双通道渲染的光带暗河：倾斜的平行丝带上逐带噪声波纹翻出 GGX 镜面高光，主光在 1.6 秒 intro 里自下而上扫亮全场并跟随光标沿带轴滑行，热核写入 mipmap 通道抽成四级辉光，ACES 胶片色调映射 + 颗粒收尾；场分辨率由 quality 缩放并限 160 万像素，lightMode 输出墨色透明光带适配亮色页面。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "暗色丝带上高光流淌，主光跟着光标把光带逐条点亮。",

  demoHint: "移动光标看高光沿带滑行、邻近增亮；调旋转/带宽/锐度重排光带，切亮色模式看墨色版。",

  api: API,
};
