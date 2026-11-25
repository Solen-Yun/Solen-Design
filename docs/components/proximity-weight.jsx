/* Component metadata only — the live demo and gallery preview live in
   proximity-weight-demo.jsx, the framework source texts and the prompt in
   proximity-weight-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "proximity-weight",
  name: "邻近加权字母",
  href: "proximity-weight.html",
  title: "邻近加权字母",
  description: "340×340 可变字体标题：每个字母的字重与大小随与光标的距离变化，粗体隆起随光标滚过词面；离开回落。",

  cardDescription: "字母按距离变重变大隆起。",

  demoHint: "移动光标看粗体隆起滚动。",



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
