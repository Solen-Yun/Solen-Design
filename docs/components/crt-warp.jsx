/* Component metadata only — the live demo and gallery preview live in
   crt-warp-demo.jsx, the framework source texts and the prompt in
   crt-warp-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with crt-warp-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "color", type: "string", default: '"#c755f7"', description: "等离子墨色（任意 CSS 颜色）" },
  { name: "backgroundColor", type: "string", default: '"#120f17"', description: "荧屏底色；transparent 或 alpha-0 颜色输出透明预乘画布" },
  { name: "lightMode", type: "boolean", default: "false", description: "亮色覆盖观感，替换发光荧光体" },
  { name: "speed", type: "number", default: "0.5", description: "等离子演化速度" },
  { name: "variation", type: "number", default: "0", description: "场种子；每次点击在其上加一个频道" },
  { name: "waveAmplitude", type: "number", default: "0.3", description: "等离子场幅度，≥ 0" },
  { name: "waveFrequency", type: "number", default: "2.5", description: "等离子场频率，≥ 0.01" },
  { name: "levels", type: "number", default: "3", description: "色阶数量（海报化分层）2–12" },
  { name: "columns", type: "number", default: "80", description: "虚拟像素列数 8–400，行数按 0.56 单元宽高比换算" },
  { name: "persistence", type: "number", default: "0.4", description: "余辉持久度 0–0.98" },
  { name: "curvature", type: "number", default: "0.25", description: "桶形弯曲（0 = 平面）" },
  { name: "corners", type: "number", default: "0", description: "圆角遮罩 0–1" },
  { name: "scanlineStrength", type: "number", default: "0.6", description: "扫描线缝隙加深 0–1" },
  { name: "scanlineFrequency", type: "number", default: "200", description: "扫描线行数 20–1200" },
  { name: "mask", type: '"none" | "aperture" | "shadow" | "slot"', default: '"aperture"', description: "荧光罩类型：孔径格栅/阴影罩/槽形罩/无" },
  { name: "maskStrength", type: "number", default: "0.3", description: "荧光罩对比 0–1" },
  { name: "bloom", type: "number", default: "1.5", description: "辉光强度，≥ 0" },
  { name: "bloomRadius", type: "number", default: "1", description: "辉光模糊半径，≥ 0.05" },
  { name: "rgbShift", type: "number", default: "0.003", description: "水平色散（RGB 分离）" },
  { name: "noise", type: "number", default: "0.1", description: "颗粒强度，≥ 0" },
  { name: "flicker", type: "number", default: "0.15", description: "60Hz 亮度闪烁，≥ 0" },
  { name: "interference", type: "number", default: "0.2", description: "干扰条纹与逐行抖动，≥ 0" },
  { name: "vignette", type: "number", default: "0.3", description: "四角暗角 0–1" },
  { name: "brightness", type: "number", default: "1", description: "输出增益，≥ 0" },
  { name: "intro", type: "boolean", default: "true", description: "1.6 秒开机：显影、预热、聚焦" },
  { name: "mouseReact", type: "boolean", default: "true", description: "光标扭动画面（磁体涡旋）" },
  { name: "mouseStrength", type: "number", default: "0.5", description: "磁体涡旋强度，≥ 0" },
  { name: "changeOnClick", type: "boolean", default: "true", description: "点击滚屏换台并带静噪爆点" },
  { name: "dpr", type: "number", default: "2", description: "设备像素比上限，≥ 0.5" },
  { name: "fps", type: "number", default: "60", description: "帧率上限，≥ 1" },
  { name: "paused", type: "boolean", default: "false", description: "冻结等离子时间（静帧）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "crt-warp",
  name: "曲面荧屏等离子",
  href: "crt-warp.html",
  title: "曲面荧屏等离子",
  description:
    "WebGL2 四通道管线的曲面 CRT：低分辨率虚拟像素网格上七项正弦等离子海报化成少数色阶，余辉持久度让亮格拖尾衰减；显示通道按真实设备像素画光束形扫描线，孔径/阴影/槽形荧光罩按色相加权，桶形弯曲、圆角、RGB 色散与纯度瓣、辉光、工频条、闪烁、颗粒与暗角一次收尾；光标像磁体把画面拧出涡旋，点击滚屏换台带撕裂与静噪，1.6 秒开机显影预热聚焦。",
  tags: ["React", "CSS", "WebGL", "图形"],

  cardDescription: "块状等离子在弧面荧光屏上发光，扫描线与荧光罩一应俱全。",

  demoHint: "点击换台看滚屏静噪，移动光标拧出涡旋；换荧光罩与色阶数看质感差异。",

  api: API,
};
