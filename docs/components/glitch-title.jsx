/* Component metadata only — the live demo and gallery preview live in
   glitch-title-demo.jsx, the framework source texts and the prompt in
   glitch-title-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "glitch-title",
  name: "信号故障标题",
  href: "glitch-title.html",
  title: "信号故障标题",
  description: "340×300 电视噪声场景：点标题后字母切成横带错位滑出，红青通道分离再合拢；信号强度滑杆调节故障频率；REC 角标闪烁。",

  cardDescription: "字母横带错位，红青通道分离。",

  demoHint: "点标题触发故障，拖信号强度看频率。",



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
