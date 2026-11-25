/* Component metadata only — the live demo and gallery preview live in
   platform-download-demo.jsx, the framework source texts and the prompt in
   platform-download-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "platform-download",
  name: "平台感知下载区",
  href: "platform-download.html",
  title: "平台感知下载区",
  description: "340×340 应用下载区：检测当前平台并把该平台的大下载按钮置顶展示；上方 Desktop/iOS/Android 页签切换时按钮图标与文字翻转更新，其余平台为次级链接。",

  cardDescription: "按平台置顶下载按钮，页签切换。",

  demoHint: "切平台看按钮翻转更新。",



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
