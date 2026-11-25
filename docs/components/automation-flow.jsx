/* Component metadata only — the live demo and gallery preview live in
   automation-flow-demo.jsx, the framework source texts and the prompt in
   automation-flow-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "automation-flow",
  name: "分步自动化流程",
  href: "automation-flow.html",
  title: "分步自动化流程",
  description:
    "340×340 的自动化运行看板：四个步骤节点由 SVG 连接线串成分支流程，按下 Run 后发光圆点沿线滑行、节点转圈后写回结果，两条分支并行完成，每步显示耗时、底部胶囊给出总耗时，浅色深色两套令牌。",

  cardDescription: "按 Run 看流程依序点亮，圆点沿连接线飞行，双分支并行完成后给出总耗时。",

  demoHint: "按右上角 Run 播放完整流程；「减少动态」时圆点跳过、步骤直出，最终状态不变。",



  api: [
    { name: "heading", type: "string", default: '"Auto-sort new inquiries"', description: "头部标题文案" },
    { name: "status", type: "string", default: '"On · 24 runs today"', description: "标题下方的状态行文案" },
    { name: "steps", type: "Partial<{title,idle,done}>[]", default: "内置四步文案", description: "至多 4 条的节点文案覆盖；几何与图标固定为四步" },
    { name: "onComplete", type: "() => void", default: "—", description: "整次运行结束后回调一次" },
    { name: "height", type: "number", default: "340", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时圆点跳过、步骤直出" },
  ],
};
