/* Component metadata only — the live demo and gallery preview live in
   domain-search-demo.jsx, the framework source texts and the prompt in
   domain-search-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "domain-search",
  name: "域名可用性搜索",
  href: "domain-search.html",
  title: "域名可用性搜索",
  description: "340×340 域名搜索：输入想要的名称，.com/.io/.app/.co/.dev 各行依次自下升起，每行先转圈再显示价格与 Add 按钮；已占用显示 Taken 禁用。",

  cardDescription: "多后缀依次查询转圈出价。",

  demoHint: "输入名称看五行依次查询与出价。",



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
