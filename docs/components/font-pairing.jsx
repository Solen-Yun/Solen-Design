/* Component metadata only — the live demo and gallery preview live in
   font-pairing-demo.jsx, the framework source texts and the prompt in
   font-pairing-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "font-pairing",
  name: "字体配对与字阶",
  href: "font-pairing.html",
  title: "字体配对与字阶",
  description: "340×340 字体设置：选 Modern/Editorial/Tech/Classic 配对，预览的标题与正文字体轻微模糊后锐化切换；字号比例滑杆联动预览缩放；CSS 可复制。",

  cardDescription: "配对模糊锐化切换，字阶联动预览。",

  demoHint: "切四个配对看模糊锐化，拖比例看缩放。",



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
