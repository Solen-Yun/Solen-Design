/* Component metadata only — the live demo and gallery preview live in
   image-optimizer-demo.jsx, the framework source texts and the prompt in
   image-optimizer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "image-optimizer",
  name: "图片压缩优化器",
  href: "image-optimizer.html",
  title: "图片压缩优化器",
  description: "340×340 图片优化工具：切换 WebP/AVIF 格式或拖动质量滑杆，原图与结果尺寸实时变化、节省百分比更新，下载按钮就绪。",

  cardDescription: "格式与质量联动尺寸与节省比。",

  demoHint: "拖质量、切格式看尺寸与节省比。",



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
