/* Component metadata only — the live demo and gallery preview live in
   sticky-phone-screens-demo.jsx, the framework source texts and the prompt in
   sticky-phone-screens-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "sticky-phone-screens",
  name: "跟文手机屏",
  href: "sticky-phone-screens.html",
  title: "跟文手机屏",
  description: "300×500 产品特性场景：左侧手机 mockup 钉住，右侧特性文案滚动时手机屏内容自下滑入切换到对应特性屏。",

  cardDescription: "特性滚动，手机屏跟随切换。",

  demoHint: "滚动右栏看手机屏切换。",



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
