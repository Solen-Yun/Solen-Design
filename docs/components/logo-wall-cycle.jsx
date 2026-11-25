/* Component metadata only — the live demo and gallery preview live in
   logo-wall-cycle-demo.jsx, the framework source texts and the prompt in
   logo-wall-cycle-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "logo-wall-cycle",
  name: "轮换客户标志墙",
  href: "logo-wall-cycle.html",
  title: "轮换客户标志墙",
  description: "340×340 落地页客户标志网格：每隔几秒一枚标志向上模糊退场、新标志自下锐化入场，同一标志不重复出现；顶部计数与查看案例链接可交互。",

  cardDescription: "网格里标志逐格模糊轮换。",

  demoHint: "停留看标志不断轮换，悬停暂停。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "340",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
