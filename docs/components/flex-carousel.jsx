/* Component metadata only — the live demo and gallery preview live in
   flex-carousel-demo.jsx, the framework source texts and the prompt in
   flex-carousel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with flex-carousel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ src: string; alt?: string; title?: string; subtitle?: string }[]", default: "内置 12 张摄影卡", description: "无限长廊里的卡片；宽度默认跟随图片自身比例；精确默认素材以代码内嵌为准" },
  { name: "preset", type: '"liquid" | "ribbon" | "vortex" | "arch"', default: '"liquid"', description: "透镜形态预设；下面各透镜参数可单独覆盖预设值" },
  { name: "intro", type: '"rise" | "bloom" | "spin" | "deal" | "fade"', default: '"rise"', description: "首次入场动画；reduced motion 下强制 fade" },
  { name: "cardHeight", type: "number", default: "0.5", description: "卡片高度占容器高度的比例" },
  { name: "gap", type: "number", default: "12", description: "卡片间距（px）" },
  { name: "radius", type: "number", default: "0", description: "卡片圆角（px）" },
  { name: "fit", type: '"natural" | "square" | "portrait" | "landscape"', default: '"natural"', description: "卡片比例来源；natural 用图片自身比例" },
  { name: "lensWidth", type: "number", default: "预设值（liquid 0.74）", description: "透镜横向半宽占宽度比例" },
  { name: "lensHeight", type: "number", default: "预设值（liquid 1.18）", description: "透镜纵向半高占宽度比例" },
  { name: "tilt", type: "number", default: "预设值（liquid 62）", description: "透镜旋转角（度）" },
  { name: "roundness", type: "number", default: "预设值（liquid 1）", description: "超椭圆圆度 0–1，1 为标准椭圆" },
  { name: "bend", type: "number", default: "预设值（liquid 0.34）", description: "穿过透镜时像素的弯曲强度" },
  { name: "reach", type: "number", default: "预设值（liquid 0.38）", description: "透镜边缘衰减带宽度" },
  { name: "curl", type: '"twist" | "rise" | "fall"', default: "预设值（liquid twist）", description: "边缘涡旋方向；twist 两侧相反" },
  { name: "dispersion", type: "number", default: "预设值（liquid 0.45）", description: "RGB 色散条纹强度" },
  { name: "liquid", type: "number", default: "预设值（liquid 0）", description: "速度驱动的透镜果冻形变 0–1" },
  { name: "followCursor", type: "boolean", default: "预设值（liquid false）", description: "悬停时透镜跟随指针" },
  { name: "squeeze", type: "number", default: "0.2", description: "高速运动时卡片宽度的压缩幅度 0–1" },
  { name: "focusOnClick", type: "boolean", default: "true", description: "点击居中卡片进入放大聚焦模式" },
  { name: "autoplay", type: "boolean", default: "false", description: "空闲时每 interval 秒前进一张" },
  { name: "interval", type: "number", default: "4", description: "自动播放间隔（秒）" },
  { name: "captions", type: "boolean", default: "true", description: "行下方显示标题与滚动数字计数" },
  { name: "captureWheel", type: "boolean", default: "true", description: "允许纵向滚轮驱动轮播" },
  { name: "onChange", type: "(index: number, item) => void", default: "—", description: "居中卡片变化时回调" },
  { name: "onSelect", type: "(index: number, item) => void", default: "—", description: "激活/点击居中卡片时回调" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "flex-carousel",
  name: "液态玻璃边缘轮播",
  href: "flex-carousel.html",
  title: "液态玻璃边缘轮播",
  description:
    "一条无限循环的照片长廊穿过两侧看不见的「液态玻璃」：卡片在边缘被超椭圆透镜弯折、卷曲并撕出 RGB 色散条纹，到中央恢复成锐利平面。WebGL2 双通道渲染——卡片先画进离屏纹理，再由透镜着色器整屏位移色散。弹簧物理吸附居中，支持拖拽甩动、滚轮、键盘方向键与 Home/End；点击居中卡进入放大聚焦（其余卡片滑出淡出），标题与滚动数字计数在行下方；四种透镜预设、五种入场动画、自动播放与 reduced-motion 回退齐备。",
  tags: ["React", "WebGL", "着色器", "轮播"],

  cardDescription: "照片长廊流经两侧液态玻璃，边缘弯折色散、中央锐利吸附。",

  demoHint: "拖拽甩动看卡片在边缘熔弯，点击居中卡放大；切预设看四种透镜性格。",

  api: API,
};
