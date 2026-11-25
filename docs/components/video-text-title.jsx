/* Component metadata only — the live demo and gallery preview live in
   video-text-title-demo.jsx, the framework source texts and the prompt in
   video-text-title-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "video-text-title",
  name: "文字透景视频标题",
  href: "video-text-title.html",
  title: "文字透景视频标题",
  description: "340×340 hero：大标题字母内透出动态场景（海洋/日落/森林三选一），场景流动仅在字内可见；底部分类胶囊切换场景。",

  cardDescription: "场景透过大标题字母流动。",

  demoHint: "点胶囊切场景看字内画面变化。",



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
