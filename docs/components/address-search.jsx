/* Component metadata only — the live demo and gallery preview live in
   address-search-demo.jsx, the framework source texts and the prompt in
   address-search-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "address-search",
  name: "地址搜索填单",
  href: "address-search.html",
  title: "地址搜索填单",
  description: "340×340 配送表单：地址输入触发结果列表展开，匹配片段加粗；选中后地址行自动填充，Detail/Save 字段就绪。",

  cardDescription: "搜地址匹配加粗，选中自动填单。",

  demoHint: "输入 street 名看列表，选中看填单。",



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
