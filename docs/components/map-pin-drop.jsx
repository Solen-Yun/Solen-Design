/* Component metadata only — the live demo and gallery preview live in
   map-pin-drop-demo.jsx, the framework source texts and the prompt in
   map-pin-drop-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "map-pin-drop",
  name: "弹跳地图图钉",
  href: "map-pin-drop.html",
  title: "弹跳地图图钉",
  description: "340×350 地图选点：点地图空白处，图钉自上方落下插入地面并回弹一次，阴影随高度缩放；确定按钮就绪并可重置。",

  cardDescription: "图钉落下插地回弹，阴影联动。",

  demoHint: "点地图任意处落钉。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "350",
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
