/* Component metadata only — the live demo and gallery preview live in
   advent-doors-demo.jsx, the framework source texts and the prompt in
   advent-doors-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "advent-doors",
  name: "降临节日历",
  href: "advent-doors.html",
  title: "降临节日历",
  description: "340×340 冬日日历：雪落背景上 12 扇小门，点今天之前的任意一扇门绕铰链开合，露出内里小图与一句话；未到的日子不可开。",

  cardDescription: "小门绕铰链开合露惊喜。",

  demoHint: "点已到的门看开合与内容。",



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
