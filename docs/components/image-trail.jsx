/* Component metadata only — the live demo and gallery preview live in
   image-trail-demo.jsx, the framework source texts and the prompt in
   image-trail-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with image-trail-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "string[]", default: "[]", description: "图片地址列表，拖尾按顺序轮播投放" },
  { name: "size", type: "number | string", default: "190", description: "图框宽度（px），数字按 px" },
  { name: "aspectRatio", type: "number", default: "1.1", description: "图框宽高比（宽/高）" },
  { name: "radius", type: "number | string", default: "15", description: "图框圆角，数字按 px" },
  { name: "threshold", type: "number", default: "80", description: "两次投放之间光标需移动的距离（px）" },
  { name: "lifetime", type: "number", default: "0.4", description: "默认模式下图片停留时长（s），之后淡出" },
  { name: "appearScale", type: "number", default: "1", description: "图片出现时的初始缩放" },
  { name: "zoom", type: "number", default: "1", description: "内层图初始放大倍率，大于 1 时先裁切再松弛回 1" },
  { name: "flash", type: "number", default: "0", description: "内层图的初始提亮量（亮度 = 1 + flash × 1.5）" },
  { name: "exitScale", type: "number", default: "0.2", description: "淡出时缩到的大小" },
  { name: "drift", type: "number", default: "0", description: "沿光标方向的惯性漂移，大于 0 时入场更长、离场继续滑行" },
  { name: "rotation", type: "number", default: "0", description: "投放时随机旋转的角度范围（deg）" },
  { name: "sizeVariance", type: "number", default: "0", description: "每次投放的随机大小浮动 0–1" },
  { name: "alignToMotion", type: "boolean", default: "false", description: "图片朝向对齐光标运动方向" },
  { name: "stack", type: "number", default: "0", description: "保留最新 N 张不淡出并回收更旧的；0 走 lifetime 淡出" },
  { name: "tilt", type: "number", default: "0", description: "朝光标方向的 3D 倾斜（deg）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
];

export default {
  id: "image-trail",
  name: "图片拖尾",
  href: "image-trail.html",
  title: "图片拖尾",
  description:
    "光标走到哪里，图片就跟到哪里：指针每移动超过阈值就沿路径投下一张图，先落在平滑后的指针位置再追上真实指针，随后按设定淡出；一套参数展开多种内置形态——随机旋转或对齐运动方向、随机大小浮动、内层图先放大提亮再松弛、朝指针的 3D 倾斜、沿运动方向的惯性漂移、以及保留最新 N 张的堆叠模式。时间线由 GSAP 驱动，重投放先杀旧补间，减少动态时整条拖尾静默。",
  tags: ["React", "GSAP", "光标", "动效"],

  cardDescription: "光标每走一段就投下一张图，旋转、漂移、堆叠多种形态可调。",

  demoHint: "在舞台上随意画圈与折线看投放节奏；开漂移看图片顺方向滑行，开堆叠保留最近几张。",

  api: API,
};
