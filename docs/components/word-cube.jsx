/* Component metadata only — the live demo and gallery preview live in
   word-cube-demo.jsx, the framework source texts and the prompt in
   word-cube-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "word-cube",
  name: "滚动词立方",
  href: "word-cube.html",
  title: "滚动词立方",
  description: "340×282 hero 场景：关键词置于 3D 立方体的一面，每次切换立方体向下滚动一面向下一面；滚动中顶面变暗、正面亮起；What we do 文案固定。",

  cardDescription: "3D 立方体滚动切换关键词。",

  demoHint: "看立方体滚动换词。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "282",
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
