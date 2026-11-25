/* Component metadata only — the live demo and gallery preview live in
   install-command-tabs-demo.jsx, the framework source texts and the prompt in
   install-command-tabs-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "install-command-tabs",
  name: "包管理器安装页签",
  href: "install-command-tabs.html",
  title: "包管理器安装页签",
  description: "340×340 文档安装卡：npm/pnpm/yarn/bun 页签切换时胶囊滑到当前项，安装命令里只有变化的部分做字符翻转，其余保持稳定；Copy 按钮与 Next steps 区可用。",

  cardDescription: "页签滑动，命令仅变字符翻转。",

  demoHint: "切包管理器看差异字符翻转，点复制。",



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
