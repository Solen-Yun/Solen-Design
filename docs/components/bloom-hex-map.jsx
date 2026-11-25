/* Component metadata only — the live demo and gallery preview live in
   bloom-hex-map-demo.jsx, the framework source texts and the prompt in
   bloom-hex-map-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "bloom-hex-map",
  name: "北上樱花六边形图",
  href: "bloom-hex-map.html",
  title: "北上樱花六边形图",
  description: "340×340 十七个地区六边形地图：樱花前线自济州向北推进到江原，格子从蓓蕾到满开随日期变色；拖动日期轴观察推进，悬停看各区详情。",

  cardDescription: "六边形地图樱花北上推进。",

  demoHint: "拖日期轴看前线北上，悬停看详情。",



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
