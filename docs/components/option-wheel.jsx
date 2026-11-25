/* Component metadata only — the live demo and gallery preview live in
   option-wheel-demo.jsx, the framework source texts and the prompt in
   option-wheel-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with option-wheel-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "string[]", default: "内置 12 个音乐流派名", description: "滚轮上的选项文字，按顺序排列" },
  { name: "defaultSelected", type: "number", default: "3", description: "初始选中项下标（非受控）" },
  { name: "onChange", type: "(index: number, item: string) => void", default: "—", description: "选中项变化时回调" },
  { name: "textColor", type: "string", default: '"#a6a6a6"', description: "远处选项的文字颜色" },
  { name: "activeColor", type: "string", default: '"#ffffff"', description: "居中选项的文字颜色，邻项向它渐变" },
  { name: "side", type: '"left" | "right"', default: '"left"', description: "列表锚定在哪一侧，右侧整体镜像" },
  { name: "fontSize", type: "number", default: "3", description: "选项字号（rem）" },
  { name: "spacing", type: "number", default: "1.4", description: "行高为字号的倍数" },
  { name: "curve", type: "number", default: "1", description: "弧线深度；0 是直列表，越大卷得越弯" },
  { name: "tilt", type: "number", default: "6", description: "每行卷曲角度（deg），决定滚轮半径" },
  { name: "blur", type: "number", default: "2", description: "离中心每远一行增加的模糊（px）" },
  { name: "fade", type: "number", default: "0.25", description: "离中心每远一行降低的不透明度" },
  { name: "minOpacity", type: "number", default: "0.05", description: "远处选项的不透明度下限" },
  { name: "smoothing", type: "number", default: "200", description: "指数平滑时间常数（ms），越小越跟手" },
  { name: "inset", type: "number", default: "80", description: "距锚定边的水平间距（px）" },
  { name: "loop", type: "boolean", default: "false", description: "无限循环滚动" },
  { name: "draggable", type: "boolean", default: "true", description: "可拖拽转轮" },
  { name: "soundUrl", type: "string", default: '""', description: "选中的哒声音频地址（可选）" },
  { name: "soundVolume", type: "number", default: "0.5", description: "哒声音量 0–1" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "option-wheel",
  name: "滚轮弧形选择器",
  href: "option-wheel.html",
  title: "滚轮弧形选择器",
  description:
    "把选项排在一个看不见的圆上：居中项最亮最大，两侧按 tilt 卷曲、按距离渐隐加模糊；滚轮一格走一项、触摸板连续滑动、拖拽直接转轮、方向键步进、点远处选项走最短路径，指数平滑缓冲后自动吸附到最近一项，支持无限循环与左右两侧镜像。",
  tags: ["React", "CSS", "交互", "选择器"],

  cardDescription: "选项排在弧形滚轮上，滚、拖、点、按都能转，自动吸附居中。",

  demoHint: "用滚轮一格一格转，再按住拖一把；把 loop 打开试试无限循环，tilt 调大看卷曲。",

  api: API,
};
