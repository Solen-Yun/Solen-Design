/* Component metadata only — the live demo and gallery preview live in
   terminal-demo-demo.jsx, the framework source texts and the prompt in
   terminal-demo-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "terminal-demo",
  name: "自打字终端演示",
  href: "terminal-demo.html",
  title: "自打字终端演示",
  description: "340×340 落地页终端窗口：安装命令逐字符手打，回车后下载与安装行快速滚出并打出成功输出；Get started 按钮与重播按钮可交互。",

  cardDescription: "命令逐字符打出，回车后输出滚出。",

  demoHint: "看命令自动打字与输出；点重播再来一遍。",



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
