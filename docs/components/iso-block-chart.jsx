/* Component metadata only — the live demo and gallery preview live in
   iso-block-chart-demo.jsx, the framework source texts and the prompt in
   iso-block-chart-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "iso-block-chart",
  name: "等距数据方块图",
  href: "iso-block-chart.html",
  title: "等距数据方块图",
  description:
    "四个地区六个月的数据排成一座等距投影的方块城：进场时从前排向后逐排升起，切换 Orders/Visits 芯片时波浪错峰重新调平，悬停只保留所在行列的颜色、其余变灰并浮起数值气泡。",

  cardDescription: "悬停方块只保留所在行列的颜色，切换芯片时整座方块城波浪重平。",

  demoHint: "悬停方块看行列高亮与数值气泡，点上方芯片切换指标；「减少动态」时直接呈现最终高度。",



  api: [
    { name: "heading", type: "string", default: '"By region"', description: "头部标题文案" },
    { name: "metric", type: "0 | 1", default: "0", description: "初始/受控指标（0=Orders、1=Visits）；外部更新触发波浪重平但不回调" },
    { name: "onMetricChange", type: "(metric) => void", default: "—", description: "用户点击芯片切换指标时回调一次" },
    { name: "height", type: "number", default: "340", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时跳过升起动画直接呈现最终高度" },
  ],
};
