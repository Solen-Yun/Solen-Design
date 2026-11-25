/* Component metadata only — the live demo and gallery preview live in
   parallax-mountains-demo.jsx, the framework source texts and the prompt in
   parallax-mountains-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "parallax-mountains",
  name: "层叠山峦视差",
  href: "parallax-mountains.html",
  title: "层叠山峦视差",
  description: "300×500 登山叙事：滚动时天空、远山、近山、森林以不同速度移动形成纵深，太阳随滚动下落、色调渐暗；正文三段随层切换。",

  cardDescription: "多层山峦不同速视差，太阳随滚下落。",

  demoHint: "纵向滚动看视差与日落。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
