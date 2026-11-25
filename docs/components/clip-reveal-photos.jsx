/* Component metadata only — the live demo and gallery preview live in
   clip-reveal-photos-demo.jsx, the framework source texts and the prompt in
   clip-reveal-photos-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "clip-reveal-photos",
  name: "裂缝展开照片",
  href: "clip-reveal-photos.html",
  title: "裂缝展开照片",
  description: "300×500 滚动相册：照片滚入视口时中间一道窄缝向两侧展开露出全图，内部图像反向缩放，看起来像从缝里长出来；四张照片依次播放。",

  cardDescription: "窄缝向两侧展开露出照片。",

  demoHint: "滚动看四张照片依次裂开展开。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
