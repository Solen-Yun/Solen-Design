/* Component metadata only — the live demo and gallery preview live in
   link-shortener-demo.jsx, the framework source texts and the prompt in
   link-shortener-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "link-shortener",
  name: "链接缩短折叠",
  href: "link-shortener.html",
  title: "链接缩短折叠",
  description: "340×340 链接缩短工具：粘贴长地址点 Shorten，长链接字符向中间折叠消失，短链接弹出；Copy 复制反馈；Recent links 列表记录。",

  cardDescription: "长链折叠成短链，复制有反馈。",

  demoHint: "粘长链接点 Shorten 看折叠，Copy 复制。",



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
