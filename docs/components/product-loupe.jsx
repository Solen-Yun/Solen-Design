/* Component metadata only — the live demo and gallery preview live in
   product-loupe-demo.jsx, the framework source texts and the prompt in
   product-loupe-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "product-loupe",
  name: "放大镜看腕表",
  href: "product-loupe.html",
  title: "放大镜看腕表",
  description: "340×340 腕表商品图：悬停出现圆形放大镜跟随光标，镜内倍率放大表盘细节（字母、刻度、指针尖）；点击锁定/解锁放大镜。",

  cardDescription: "放大镜跟随倍率看表盘细节。",

  demoHint: "悬停看放大细节，点击锁定。",



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
