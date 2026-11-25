/* Component metadata only — the live demo and gallery preview live in
   hammerhead-chart-demo.jsx, the framework source texts and the prompt in
   hammerhead-chart-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "hammerhead-chart",
  name: "字符鲨鱼追踪价格路径",
  href: "hammerhead-chart.html",
  title: "字符鲨鱼追踪价格路径",
  description:
    "黑底字符终端图表：左侧K线与成交量，右侧三条预测路径叠成概率锥，一条 ASCII 锤头鲨沿当前路径游动并点亮标签；指针可指挥它追路径或在历史区自由游动，标签与方向键也能换路径。",

  cardDescription: "ASCII 锤头鲨在概率锥里追踪价格路径，指针可指挥它游。",

  demoHint: "指针在锥区上下移动换路径，移到左侧K线区鲨鱼自由跟随；点标签或用方向键、Home/End 选择；约 4.3 秒游完一条并点亮标签。",



  api: [
    { name: "height", type: "number", default: "720", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；静态呈现当前档，交互结果不变" },
  ],
};
