/* Component metadata only — the live demo and gallery preview live in
   site-preloader-demo.jsx, the framework source texts and the prompt in
   site-preloader-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "site-preloader",
  name: "计数站点预载",
  href: "site-preloader.html",
  title: "计数站点预载",
  description: "340×340 作品集站点进入场景：大百分比带小停顿地爬到 100，细进度条充填；满载后预载层向上收起露出站点（Studio Nara 品牌与导航），提供重播。",

  cardDescription: "百分比爬升，满载后预载层收起。",

  demoHint: "看预载到站点揭示；点重播。",



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
