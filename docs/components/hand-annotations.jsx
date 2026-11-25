/* Component metadata only — the live demo and gallery preview live in
   hand-annotations-demo.jsx, the framework source texts and the prompt in
   hand-annotations-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "hand-annotations",
  name: "手绘批注",
  href: "hand-annotations.html",
  title: "手绘批注",
  description: "340×300 分季计划备忘：四个按钮为关键词添加手绘批注——下划线、圈选、方框、取消线，每条笔画画两遍带轻微抖动像手绘；再点擦除。",

  cardDescription: "手绘批注画两遍带抖动。",

  demoHint: "点四个按钮看批注，再点擦除。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "300",
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
