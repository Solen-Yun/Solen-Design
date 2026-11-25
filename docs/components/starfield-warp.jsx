/* Component metadata only — the live demo and gallery preview live in
   starfield-warp-demo.jsx, the framework source texts and the prompt in
   starfield-warp-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "starfield-warp",
  name: "按住星光加速",
  href: "starfield-warp.html",
  title: "按住星光加速",
  description: "340×330 星空场景：星星自中心向外飞出；按住不放速度渐增直至星光拉伸成蓝移长条；松开减速复原。文案 Hold to warp。",

  cardDescription: "按住星光加速成蓝移长条。",

  demoHint: "按住看星光拉伸，松开复原。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
