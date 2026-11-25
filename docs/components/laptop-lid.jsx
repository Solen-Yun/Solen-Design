/* Component metadata only — the live demo and gallery preview live in
   laptop-lid-demo.jsx, the framework source texts and the prompt in
   laptop-lid-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "laptop-lid",
  name: "开盖唤醒笔记本",
  href: "laptop-lid.html",
  title: "开盖唤醒笔记本",
  description: "340×340 桌面笔记本：合盖平躺，拖动屏幕上缘绕铰链 3D 开合；越过角度屏幕亮起 logo 与进度条直至桌面时钟 10:24。",

  cardDescription: "拖盖 3D 开合，过角度开机。",

  demoHint: "拖屏幕上缘开盖看开机。",



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
