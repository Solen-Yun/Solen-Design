/* Component metadata only — the live demo and gallery preview live in
   kanban-drag-demo.jsx, the framework source texts and the prompt in
   kanban-drag-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "kanban-drag",
  name: "拖拽看板卡片",
  href: "kanban-drag.html",
  title: "拖拽看板卡片",
  description: "340×340 看板：To do / In progress / Done 三列，拿起卡片轻微倾斜抬升，拖到目标列时列内让出缺口，松手落位；键盘方向键等价移动。",

  cardDescription: "卡片拖拽跨列，落位让缺口。",

  demoHint: "拖一张卡跨列看让位与落位。",



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
