/* Component metadata only — the live demo and gallery preview live in
   index-scrubber-demo.jsx, the framework source texts and the prompt in
   index-scrubber-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "index-scrubber",
  name: "通讯录索引刷选",
  href: "index-scrubber.html",
  title: "通讯录索引刷选",
  description: "300×480 通讯录：右侧字母索引上下刷动时，指尖左侧浮现大字母气泡，列表平滑跳到对应首字母分组。",

  cardDescription: "刷字母索引，气泡跟随列表跳转。",

  demoHint: "沿右侧索引上下刷看气泡与跳转。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
