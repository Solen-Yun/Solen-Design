/* Component metadata only — the live demo and gallery preview live in
   share-dialog-demo.jsx, the framework source texts and the prompt in
   share-dialog-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "share-dialog",
  name: "分享权限对话框",
  href: "share-dialog.html",
  title: "分享权限对话框",
  description: "340×340 文档分享对话框：共享人列表、通用权限按钮点开选项列表；选 Anyone with the link 时锁图标旋成地球、说明文字切换；复制链接与 Copy 反馈可用。",

  cardDescription: "权限切换锁旋成地球，复制链接反馈。",

  demoHint: "点通用权限切换 Anyone with the link，复制链接。",



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
