/* Component metadata only — the live demo and gallery preview live in
   map-clusters-demo.jsx, the framework source texts and the prompt in
   map-clusters-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "map-clusters",
  name: "地图聚合拆分",
  href: "map-clusters.html",
  title: "地图聚合拆分",
  description: "340×340 街区地图：140 家咖啡馆按缩放级别聚成带数字的簇；滚轮放大时簇逐级拆分成小簇与单 pin；缩小时重新聚合，全部带过渡。",

  cardDescription: "缩放拆分聚合簇。",

  demoHint: "滚轮缩放看簇拆分与聚合。",



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
