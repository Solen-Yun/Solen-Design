/* Component metadata only — the live demo and gallery preview live in
   xray-code-lens-demo.jsx, the framework source texts and the prompt in
   xray-code-lens-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "xray-code-lens",
  name: "透视代码镜",
  href: "xray-code-lens.html",
  title: "透视代码镜",
  description: "340×340 定价卡场景：悬停卡片时圆形透视镜跟随光标，镜内显示构成该卡的 HTML/CSS 源码（等宽绿字），镜外是普通渲染卡。",

  cardDescription: "透镜内显示卡片源码。",

  demoHint: "悬停卡片看镜内源码。",



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
