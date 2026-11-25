/* Component metadata only — the live demo and gallery preview live in
   accordion-gallery-demo.jsx, the framework source texts and the prompt in
   accordion-gallery-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with accordion-gallery-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ image: string; label?: string; link?: string; alt?: string }[]", default: "DEFAULT_ITEMS", description: "画廊照片：地址 + 标签 + 可选链接（展开面板的锚点目标）+ 可选 alt" },
  { name: "defaultIndex", type: "number", default: "2", description: "初始展开的面板序号，夹取到范围内" },
  { name: "accentColor", type: "string", default: '"#ffffff"', description: "标签竖条与键盘聚焦环的颜色" },
  { name: "overlayColor", type: "string", default: '"#060010"', description: "收起照片的压暗色与底部渐变色" },
  { name: "textColor", type: "string", default: '"#ffffff"', description: "标签文字颜色" },
  { name: "height", type: "number", default: "460", description: "轨道高度（px）；竖向模式 ×1.6" },
  { name: "gap", type: "number", default: "10", description: "面板间距（px）" },
  { name: "radius", type: "number", default: "16", description: "面板圆角（px）" },
  { name: "expandRatio", type: "number", default: "0.52", description: "展开面板占轨道的比例，0.2–0.9" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "手风琴的方向" },
  { name: "duration", type: "number", default: "0.6", description: "补间时长（秒）" },
  { name: "ease", type: "string", default: '"power3.out"', description: "所有补间的缓动名" },
  { name: "parallax", type: "number", default: "0.5", description: "收起图像随展开序号漂移的幅度" },
  { name: "tilt", type: "number", default: "8", description: "收起面板 3D 甩开的角度（度）" },
  { name: "stagger", type: "number", default: "0.06", description: "竖条与文字先后滑入的间隔（秒）" },
  { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "悬停展开还是仅点击/聚焦展开" },
  { name: "showLabels", type: "boolean", default: "true", description: "展开面板上的竖条与标签" },
  { name: "grayscale", type: "boolean", default: "true", description: "收起照片置灰；展开的那张始终彩色" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "accordion-gallery",
  name: "悬停展开画廊",
  href: "accordion-gallery.html",
  title: "悬停展开画廊",
  description:
    "一排会呼吸的照片手风琴：悬停、点击或方向键选中的面板长到占据大半轨道，其余收窄成薄条并向两侧 3D 甩开、置灰压暗；展开面板滑入发光竖条与标签，图像随展开序号做视差漂移；所有变化走一条 GSAP 时间线（flex-grow + rotateY/rotateX + 滤镜变量），窄屏自动堆叠成竖列，减少动态时直接跳到位。",
  tags: ["React", "CSS", "GSAP", "画廊"],

  cardDescription: "悬停哪张哪张展开，其余甩开置灰，标签竖条随之滑入。",

  demoHint: "在面板间来回悬停看展开与视差漂移；切竖向和点击触发各试一遍；把倾斜拉大看 3D 甩角。",

  api: API,
};
