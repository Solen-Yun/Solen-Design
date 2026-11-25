/* Component metadata only — the live demo and gallery preview live in
   flying-posters-demo.jsx, the framework source texts and the prompt in
   flying-posters-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with flying-posters-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "(string | { image: string })[]", default: "[]", description: "海报图片，居中裁切后打包进图集，循环铺满柱列" },
  { name: "planeWidth", type: "number", default: "320", description: "海报宽度（世界单位，最小 10）" },
  { name: "planeHeight", type: "number", default: "320", description: "海报高度（世界单位，最小 10）" },
  { name: "distortion", type: "number", default: "3", description: "翻页扭曲的渐进程度 0–50，海报逐角卷曲而非刚体翻转" },
  { name: "scrollEase", type: "number", default: "0.01", description: "滚动趋向目标的缓动系数 0.001–1，越大跟手越快" },
  { name: "cameraFov", type: "number", default: "45", description: "相机视场角（度，10–120）" },
  { name: "cameraZ", type: "number", default: "20", description: "相机距离（世界单位，最小 1）" },
  { name: "gap", type: "number", default: "5 个世界单位", description: "循环列内海报的纵向间距" },
  { name: "columns", type: "number", default: "1", description: "并列柱数 1–8" },
  { name: "columnGap", type: "number", default: "40", description: "柱与柱的横向间距（世界单位）" },
  { name: "alternate", type: "boolean", default: "true", description: "奇数列反向滚动" },
  { name: "radius", type: "number", default: "0", description: "海报圆角（世界单位）" },
  { name: "rotation", type: "number", default: "180", description: "一个循环内海报翻越的总角度（度）" },
  { name: "axis", type: '"vertical" | "horizontal" | "diagonal"', default: '"vertical"', description: "翻转围绕的轴" },
  { name: "speed", type: "number", default: "0", description: "自动漂移速度（世界单位/秒，负值反向）" },
  { name: "lean", type: "number", default: "0", description: "速度驱动的整墙侧倾强度 0–2" },
  { name: "fade", type: "number", default: "0", description: "屏幕上下边缘的淡出范围 0–1，0 关闭" },
  { name: "shading", type: "number", default: "0", description: "背转海报的压暗程度 0–1" },
  { name: "wheel", type: "boolean", default: "true", description: "允许滚轮驱动墙面" },
  { name: "drag", type: "boolean", default: "true", description: "允许纵向拖拽驱动墙面" },
  { name: "pageScroll", type: "number", default: "0", description: "页面滚动增量按比例喂给墙面" },
  { name: "onItemClick", type: "(item, index: number) => void", default: "—", description: "点击命中海报时回调（拖拽过的手势不算点击）" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "flying-posters",
  name: "翻滚海报墙",
  href: "flying-posters.html",
  title: "翻滚海报墙",
  description:
    "一条永不停的 3D 海报柱：海报随滚动沿无缝循环上升，途中绕所选轴翻页，扭曲参数让翻转逐角卷曲而不是刚体转动，背转面按朝向压暗，整墙随速度侧倾。WebGL2 实例化渲染——共用一张四边形网格，每格海报一个实例；图片居中裁切打包成正方形图集。滚轮、拖拽、页面滚动比例与自动漂移共用同一套缓动目标，点击海报由 CPU 端命中测试还原 GPU 布局触发回调，reduced-motion 下关掉漂移与侧倾。",
  tags: ["React", "WebGL", "实例化渲染"],

  cardDescription: "海报柱无限翻滚上升，翻转逐角卷曲、背转压暗。",

  demoHint: "拖拽或滚轮翻海报，点击任意海报看命中回调；调扭曲和轴向看翻转性格。",

  api: API,
};
