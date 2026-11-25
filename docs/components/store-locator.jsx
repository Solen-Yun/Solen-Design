/* Component metadata only — the live demo and gallery preview live in
   store-locator-demo.jsx, the framework source texts and the prompt in
   store-locator-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "store-locator",
  name: "门店定位联动",
  href: "store-locator.html",
  title: "门店定位联动",
  description: "340×340 门店查找场景：上半地图（简化 SVG 城市块与门店 pin），下半门店列表；悬停列表项对应 pin 弹跳放大，点击列表项地图居中该 pin、列表项高亮。",

  cardDescription: "列表与地图 pin 双向联动。",

  demoHint: "悬停/点击列表看 pin 联动。",



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
