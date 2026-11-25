/* Component metadata only — the live demo and gallery preview live in
   scroll-expand-video-demo.jsx, the framework source texts and the prompt in
   scroll-expand-video-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "scroll-expand-video",
  name: "滚动展开视频",
  href: "scroll-expand-video.html",
  title: "滚动展开视频",
  description: "300×480 落地页场景：标题下的小圆角视频随滚动向两侧展开变宽、保持圆角，配「1 minute is enough」文案与模拟播放条；下方特性列表滚动入场。",

  cardDescription: "视频随滚动由小变大展开。",

  demoHint: "纵向滚动看视频展开。",



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
