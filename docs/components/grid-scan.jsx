/* Component metadata only — the live demo and gallery preview live in
   grid-scan-demo.jsx, the framework source texts and the prompt in
   grid-scan-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with grid-scan-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "linesColor", type: "string", default: '深色 "#4d4757" / 浅色 "#d4d4d8"', description: "网格线颜色（任意 CSS 颜色）" },
  { name: "scanColor", type: "string", default: '深色 "#7dd3fc" / 浅色 "#0284c7"', description: "扫描光束与能量的颜色" },
  { name: "cells", type: "number", default: "8", description: "房间高度方向的格子数，2–40" },
  { name: "lineThickness", type: "number", default: "1", description: "线宽倍率，0.5–4" },
  { name: "lineStyle", type: '"solid" | "dashed" | "dotted"', default: '"solid"', description: "网格线样式：实线 / 虚线 / 点阵" },
  { name: "depth", type: "number", default: "3", description: "房间进深（按格子取整），0.5–12" },
  { name: "depthFade", type: "number", default: "0.6", description: "0–1：线向深处衰减的程度" },
  { name: "parallax", type: "number", default: "1", description: "0–3：视点随视线漂移的幅度" },
  { name: "points", type: "boolean", default: "true", description: "格子里的确定性散布闪烁点" },
  { name: "reflection", type: "number", default: "0.35", description: "0–1：地板镜面反射强度" },
  { name: "shading", type: "number", default: "0.7", description: "0–1：灯照明暗与扫描溢光" },
  { name: "scanDirection", type: '"forward" | "backward" | "pingpong"', default: '"forward"', description: "扫描方向：向里 / 向外 / 往返" },
  { name: "scanDuration", type: "number", default: "2.4", description: "单次扫描时长（秒），0.3–20" },
  { name: "scanDelay", type: "number", default: "1.6", description: "两次扫描的间隔（秒），0–30" },
  { name: "scanWidth", type: "number", default: "1", description: "扫描核心带厚度倍率，0.2–5" },
  { name: "trail", type: "number", default: "0.5", description: "0–1：扫描平面后方拖尾长度" },
  { name: "glow", type: "number", default: "0.6", description: "0–1.5：泛光强度；0 跳过泛光通道" },
  { name: "autoScan", type: "boolean", default: "true", description: "按 scanDelay 自动重复扫描" },
  { name: "interactive", type: "boolean", default: "true", description: "指针视角、悬停光斑与点击" },
  { name: "clickEffect", type: '"ping" | "scan" | "none"', default: '"ping"', description: "点击行为：扩散声呐环 / 立即扫描 / 无" },
  { name: "enableWebcam", type: "boolean", default: "false", description: "开启人脸追踪：运行时加载检测脚本与权重并打开摄像头" },
  { name: "showPreview", type: "boolean", default: "false", description: "显示右下角镜像摄像头预览卡与状态标签" },
  { name: "modelsPath", type: "string", default: "代码内置权重地址", description: "检测模型权重的加载地址" },
  { name: "enableGyro", type: "boolean", default: "false", description: "设备姿态（陀螺仪）驱动视线" },
  { name: "intro", type: "boolean", default: "true", description: "首扫描 2.2 秒内显影出整个房间" },
  { name: "lightMode", type: "boolean", default: "false", description: "白纸墨痕渲染，默认色随主题切换" },
  { name: "dpr", type: "number", default: "—", description: "覆盖设备像素比（上限 2）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];

export default {
  id: "grid-scan",
  name: "扫描网格房",
  href: "grid-scan.html",
  title: "扫描网格房",
  description:
    "单着色器光线投射的 3D 线框房间：视点悬在入口内侧随指针或陀螺仪漂移，激光扫描面沿进深往返扫过并点亮经过的格子（带拖尾、体积雾与泛光），光标射线在墙面上投下光斑，点击激起声呐扩散环或立即扫描；地板镜面反射、格子散点闪烁、四角折痕明暗；可选摄像头人脸追踪接管视线（脚本与权重运行时按代码内置地址加载），支持白纸墨痕主题。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "激光扫描面来回扫亮 3D 网格房，光标即光斑、点击起声呐环。",

  demoHint: "移动指针看墙面光斑与视点漂移；点击放声呐环，clickEffect 换成立即扫描；调 depth 与 cells 改房间形状。",

  api: API,
};
