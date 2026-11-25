/* Component metadata only — the live demo and gallery preview live in
   synced-multiples-demo.jsx, the framework source texts and the prompt in
   synced-multiples-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "synced-multiples",
  name: "同步光标小多图",
  href: "synced-multiples.html",
  title: "同步光标小多图",
  description: "300×480 小多图看板：访客/转化/平均停留/响应时间四张小图共享同一 30 天轴，首次自左向右画线；悬停任一图出现同步竖线光标与四图联动读数；Compare 叠加上一期虚线。",

  cardDescription: "四图同步光标联动读数。",

  demoHint: "悬停看同步光标与读数，开 Compare。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
