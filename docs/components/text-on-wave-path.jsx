/* Component metadata only — the live demo and gallery preview live in
   text-on-wave-path-demo.jsx, the framework source texts and the prompt in
   text-on-wave-path-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "text-on-wave-path",
  name: "波浪路径文字",
  href: "text-on-wave-path.html",
  title: "波浪路径文字",
  description: "340×320 一行文字沿起伏波浪无尽头流动；调 Height 与 Speed 两个滑杆，曲线即时重画，每个字母随路径倾斜。",

  cardDescription: "文字沿波浪流动，双滑杆实时重画。",

  demoHint: "调高度与速度看曲线重画。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "320",
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
