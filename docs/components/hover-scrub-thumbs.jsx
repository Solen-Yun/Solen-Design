/* Component metadata only — the live demo and gallery preview live in
   hover-scrub-thumbs-demo.jsx, the framework source texts and the prompt in
   hover-scrub-thumbs-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "hover-scrub-thumbs",
  name: "悬停刷帧缩略",
  href: "hover-scrub-thumbs.html",
  title: "悬停刷帧缩略",
  description: "300×480 视频列表：光标在缩略图上左右移动时，缩略图内的场景按光标位置逐帧步进（日出到日落的瞬间预览），离开回到封面。",

  cardDescription: "缩略图按光标位置刷帧。",

  demoHint: "在缩略图上左右移动看刷帧。",



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
