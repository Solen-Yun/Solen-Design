/* Component metadata only — the live demo and gallery preview live in
   curved-loop-demo.jsx, the framework source texts and the prompt in
   curved-loop-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with curved-loop-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "marqueeText", type: "string", default: '""', description: "沿路径循环的文字，重复之间以空格相接" },
  { name: "shape", type: '"arc" | "wave" | "circle" | "ellipse" | "line"', default: '"arc"', description: '文字行进的路径；circle 闭合成圆环、ellipse 是宽椭圆环（横向半轴 700、纵向半轴 = curveAmount），均按周长凑整数圈无缝衔接' },
  { name: "color", type: "string", default: '"currentColor"', description: "文字颜色（outline 时为描边色），默认跟随环境文字色" },
  { name: "separator", type: "string", default: '""', description: "重复之间的间隔符，如 ✦ 或 /；留空则只用空格相接" },
  { name: "separatorColor", type: "string", default: "—", description: "间隔符单独着色，不设则与文字同色" },
  { name: "direction", type: '"left" | "right"', default: '"left"', description: "行进方向；圆环上 right 为顺时针，甩动拖拽会把方向甩成投掷方向" },
  { name: "speed", type: "number", default: "2", description: "行进速度，0 静止、只响应拖拽与滚动加速" },
  { name: "scrollBoost", type: "number", default: "0", description: "页面滚动的瞬时加速幅度，随后缓动回落；0 关闭" },
  { name: "curveAmount", type: "number", default: "400", description: "路径弯曲程度：弧线是中部下沉量（负值上拱），波浪是浪高" },
  { name: "fontSize", type: "number", default: "96", description: "1440 宽设计稿下的字号（px），整体随容器缩放" },
  { name: "fontWeight", type: "number | string", default: "700", description: "字重" },
  { name: "letterSpacing", type: "number", default: "0", description: "字间距（px），与 fontSize 同尺度" },
  { name: "edgeFade", type: "number", default: "0", description: "两侧渐隐比例 0–1，1 时只剩中部完全可见" },
  { name: "outline", type: "boolean", default: "false", description: "文字以描边渲染而非实心" },
  { name: "interactive", type: "boolean", default: "true", description: "可抓取拖拽并甩动；圆环跟随指针转圈，松手后缓动回常速" },
  { name: "pauseOnHover", type: "boolean", default: "false", description: "悬停时缓停，移开恢复" },
  { name: "className", type: "string", default: "—", description: "附加在文字上的类名，例如换字体" },
];

export default {
  id: "curved-loop",
  name: "弧线跑马灯",
  href: "curved-loop.html",
  title: "弧线跑马灯",
  description:
    "沿 SVG 路径行进的跑马灯：弧线、波浪、直线与闭合圆环四种路径，文字随速度自走、可抓取甩动（圆环跟着指针转圈），页面滚动瞬时加速后回落；支持描边空心字、独立着色的间隔符与两侧渐隐。文字沿周长按实测宽度无缝复制，离屏停帧。",
  tags: ["React", "CSS", "SVG", "跑马灯"],

  cardDescription: "文字沿弧线循环行进，可抓取甩动。",

  demoHint: "抓取文字甩一把看惯性，切路径形状、调速度与弯曲；滚轮会瞬时加速。",

  api: API,
};
