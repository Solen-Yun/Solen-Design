/* Component metadata only — the live demo and gallery preview live in
   quote-share-tooltip-demo.jsx, the framework source texts and the prompt in
   quote-share-tooltip-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "quote-share-tooltip",
  name: "划词分享提示条",
  href: "quote-share-tooltip.html",
  title: "划词分享提示条",
  description: "340×340 博客文章场景：拖选一句话（或点按既有高亮句）后，上方弹出国小工具条（Highlight / Copy / Share）；高亮给选区涂色，Copy 提示已复制，Share 弹出分享行。",

  cardDescription: "拖选文字弹工具条，高亮/复制/分享即点即用。",

  demoHint: "拖选一句看工具条弹出；点 Highlight/Copy/Share 看反馈。",



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
