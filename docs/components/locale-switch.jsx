/* Component metadata only — the live demo and gallery preview live in
   locale-switch-demo.jsx, the framework source texts and the prompt in
   locale-switch-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "locale-switch",
  name: "语言切换文案互换",
  href: "locale-switch.html",
  title: "语言切换文案互换",
  description: "340×340 站点页头场景：地球按钮下拉语言列表，选 Korean/English/Japanese 后菜单、标题、描述与按钮文案交叉淡入淡出切换，旗帜/缩写同步。",

  cardDescription: "选语言全站文案交叉切换。",

  demoHint: "切三种语言看文案交叉切换。",



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
